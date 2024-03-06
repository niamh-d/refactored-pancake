/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

import { useAuth } from "./AuthContext";

const UsersContext = createContext();

const initialState = {
  currentUser: null,
  currentFamily: null,
  currentChildren: [],
  currentInvitations: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_CURRENT_FAMILY":
      return { ...state, currentFamily: action.payload };
    case "SET_CURRENT_FAMILY_MEMBERS":
      return {
        ...state,
        currentFamily: { ...state.currentFamily, members: action.payload },
      };
    case "SET_CURRENT_CHILDREN":
      return { ...state, currentChildren: action.payload };
    case "SET_INVITATIONS":
      return {
        ...state,
        currentInvitations: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function UsersProvider({ children }) {
  const { loggedInUser } = useAuth();

  const [
    { currentUser, currentFamily, currentChildren, currentInvitations },
    dispatch,
  ] = useReducer(reducer, initialState);

  // USE EFFECTS

  // ** SYNC LOGGED IN USER FROM AUTH CONTEXT WITH CURRENT USER IN THIS CONTEXT **

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });
  }, [loggedInUser]);

  // ** get invitations  **

  useEffect(() => {
    if (!currentUser && !currentInvitations.length) return;

    if (!currentUser && currentInvitations.length) {
      dispatch({ type: "SET_INVITATIONS", payload: [] });
      return;
    }

    if (!currentUser && !currentInvitations.length) return;

    getInvitations();
  }, [currentUser]);

  // ** insert family ID into user row for admin users upon creation of family  **

  useEffect(() => {
    if (!currentUser || !currentFamily || currentUser.adminFamily) return;

    insertIntoUserFamilyID();
  }, [currentFamily, currentUser]);

  // ** get current family  **

  useEffect(() => {
    if (!currentUser && !currentFamily) return;

    if (!currentUser && currentFamily) {
      dispatch({ type: "SET_CURRENT_FAMILY", payload: null });
      return;
    }

    if (currentUser && currentFamily) return;

    getFamily();
  }, [currentUser, currentFamily]);

  // ** get current children  **

  useEffect(() => {
    if (!currentUser && !currentChildren.length) return;

    if (!currentUser && currentChildren.length) {
      dispatch({ type: "SET_CURRENT_CHILDREN", payload: [] });
      return;
    }

    if (currentUser && currentChildren.length) return;

    getChildren();
  }, [currentUser, currentChildren]);

  // SIGN UP EXISTING USER CHECK

  async function checkForExistingUser(email) {
    try {
      const res = await fetch(`/api/users/signup?email=${email}`);
      const data = await res.json();
      return data ? true : false;
    } catch (err) {
      console.error(err);
    }
  }

  // USER FETCHES

  async function addNewUser(user) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      const res = await fetch("/api/users", options);
      const data = await res.json();
      dispatch({ type: "SET_CURRENT_USER", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  async function insertIntoUserFamilyID() {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...currentUser, adminFamily: currentFamily.id }),
    };
    const res = await fetch(`/api/users/${currentUser.id}`, options);
    const data = await res.json();
    dispatch({ type: "SET_CURRENT_USER", payload: data[0] });
  }

  async function updateUserInformation(details) {
    try {
      const updatedDetails = {
        ...currentUser,
        ...details,
      };

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      };
      const res = await fetch(`/api/users/${currentUser.id}`, options);
      const data = await res.json();
      dispatch({ type: "SET_CURRENT_USER", payload: data[0] });
    } catch (err) {
      console.error(err);
    }
  }

  // FAMILY FETCHES

  async function getFamily() {
    try {
      const res = await fetch(`/api/families?adminUser=${currentUser.id}`);
      const data = await res.json();

      const family = data[0];
      if (!family) return;

      dispatch({ type: "SET_CURRENT_FAMILY", payload: family });

      const familyId = family.id;

      fetchFamilyMembers(familyId);
    } catch (err) {
      console.error(err);
    }
  }

  async function addFamily(family) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...family, adminUser: currentUser.id }),
      };
      const res = await fetch("/api/families", options);
      const data = await res.json();
      const id = data.id;

      dispatch({ type: "SET_CURRENT_FAMILY", payload: data });
      await createFamilyMembersTable(id);
      fetchFamilyMembers(id);
    } catch (err) {
      console.error(err);
    }
  }

  // FAMILY MEMBERS

  async function fetchFamilyMembers(id) {
    try {
      const res = await fetch(`/api/families/members?familyId=${id}`);
      const data = await res.json();
      dispatch({
        type: "SET_CURRENT_FAMILY_MEMBERS",
        payload: data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function createFamilyMembersTable(id) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyId: id,
          adminUserId: currentUser.id,
        }),
      };
      await fetch("/api/families/members", options);
    } catch (err) {
      console.error(err);
    }
  }

  // CHILD FETCHES

  async function getChildren() {
    try {
      const res = await fetch(
        `/api/children?familyAdminGuardian=${currentUser.id}`
      );
      const data = await res.json();

      const children = data;
      if (!children.length) return;

      dispatch({ type: "SET_CURRENT_CHILDREN", payload: children });
    } catch (err) {
      console.error(err);
    }
  }

  async function addChild(child) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...child,
          primaryFamily: currentUser.adminFamily,
          familyAdminGuardian: currentUser.id,
        }),
      };
      const res = await fetch("/api/children", options);
      const data = await res.json();
      dispatch({ type: "SET_CURRENT_CHILDREN", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  // INVITATIONS FETCHES

  async function getInvitations() {
    const res = await fetch(`/api/invitations?loggedInUser=${currentUser.id}`);
    const data = await res.json();
    dispatch({ type: "SET_INVITATIONS", payload: data });
  }

  async function addInvitation(details) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };

      await fetch("/api/invitations", options);
    } catch (err) {
      console.error(err);
    }
  }

  async function inviteGuardian(guardian) {
    try {
      const { email, role } = guardian;
      const res = await fetch(`/api/users?email=${email}`);
      const data = await res.json();

      const invitationDetails = {
        invitor: currentUser.id,
        invitorName: `${currentUser.firstName} ${currentUser.lastName}`,
        invitorFamily: currentFamily.id,
        invitorFamilyName: currentFamily.familyName,
        inviteeRole: role,
        invitee: data.id,
        inviteeName: `${data.firstName} ${data.lastName}`,
      };

      if (data) addInvitation(invitationDetails);
    } catch (err) {
      console.error(err);
    }
  }

  async function closeInvite(id) {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inviteId: id, userId: currentUser.id }),
      };

      const res = await fetch("/api/invitations", options);
      const data = await res.json();
      dispatch({ type: "SET_INVITATIONS", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  async function acceptInvite(invite) {
    try {
      const details = {
        guardianId: invite.invitee,
        familyId: invite.invitorFamily,
        role: invite.inviteeRole,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };

      const res = await fetch("/api/families/members", options);
      const data = await res.json();

      closeInvite(invite.id);

      fetchFamilyMembers(data.id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <UsersContext.Provider
      value={{
        addNewUser,
        addFamily,
        addChild,
        inviteGuardian,
        closeInvite,
        acceptInvite,
        updateUserInformation,
        checkForExistingUser,
        currentUser,
        currentFamily,
        currentChildren,
        currentInvitations,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined)
    throw new Error("UsersContext was used outside the UsersProvider;");
  return context;
}

export { UsersProvider, useUsers };
