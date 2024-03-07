/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

const UsersContext = createContext();

const initialState = {
  currentUser: null,
  currentFamily: null,
  currentChildren: null,
  currentInvitations: null,
  isNonAdmin: false,
  currentDoctors: null,
  currentTeachers: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_CURRENT_FAMILY":
      return { ...state, currentFamily: action.payload };
    case "SET_CURRENT_GUARDIANS":
      return {
        ...state,
        currentFamily: { ...state.currentFamily, guardians: action.payload },
      };
    case "TOGGLE_NON_ADMIN":
      return { ...state, isNonAdmin: action.payload };
    case "SET_CURRENT_CHILDREN":
      return { ...state, currentChildren: action.payload };
    case "SET_CURRENT_DOCTORS":
      return { ...state, currentDoctors: action.payload };
    case "SET_CURRENT_TEACHERS":
      return { ...state, currentTeachers: action.payload };
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
  const navigate = useNavigate();

  const [
    {
      currentUser,
      currentFamily,
      currentDoctors,
      currentTeachers,
      currentChildren,
      currentInvitations,
      isNonAdmin,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // STATE RESET ON LOG OUT

  function stateReset() {
    dispatch({ type: "SET_CURRENT_CHILDREN", payload: null });
    dispatch({ type: "SET_CURRENT_FAMILY", payload: null });
    dispatch({ type: "SET_CURRENT_DOCTORS", payload: null });
    dispatch({ type: "SET_CURRENT_TEACHERS", payload: null });
    dispatch({ type: "SET_INVITATIONS", payload: null });
    dispatch({ type: "TOGGLE_NON_ADMIN", payload: false });
  }

  // USE EFFECTS

  // SYNC CURRENT USER IN THIS CONTEXT with LOGGED IN USER COMING FROM AUTH CONTEXT

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });

    if (!loggedInUser) stateReset();
  }, [loggedInUser]);

  // ** when current user changes, get invitations and get family**

  useEffect(() => {
    if (!currentUser) return;

    getInvitations();
    getFamily();
    getDoctors();
    getTeachers();
  }, [currentUser]);

  useEffect(() => {
    if (!currentFamily) return;
    if (currentChildren) return;

    getChildren();
  }, [currentFamily]);

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
      const res = await fetch(`/api/families?id=${currentUser.family}`);
      const data = await res.json();

      const family = data[0];
      if (!family) return;

      if (currentUser.family && !currentUser.adminFamily) {
        dispatch({ type: "TOGGLE_NON_ADMIN", payload: true });
      }

      dispatch({ type: "SET_CURRENT_FAMILY", payload: family });

      const familyId = family.id;

      fetchGuardians(familyId);
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
      createFamilyMembersTable(id);
      fetchGuardians(id);

      // ** insert family ID into user row for admin users upon creation of family  **
      updateUserInformation({
        adminFamily: currentFamily.id,
        family: currentFamily.id,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // FAMILY MEMBERS

  async function removeGuardian(guardianId) {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guardianId, familyId: currentUser.adminFamily }),
      };

      await fetch("/api/families/members", options);

      fetchGuardians(currentUser.adminFamily);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchGuardians(id) {
    try {
      const res = await fetch(`/api/families/members?familyId=${id}`);
      const data = await res.json();
      dispatch({
        type: "SET_CURRENT_GUARDIANS",
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
        `/api/children?familyAdminGuardian=${currentFamily.adminUser}`
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

  // DOCTOR FETCHES

  async function getDoctors() {
    try {
      const res = await fetch(`/api/health?familyId=${currentUser.family}`);
      const data = await res.json();

      dispatch({ type: "SET_CURRENT_DOCTORS", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  // TEACHER FETCHES

  async function getTeachers() {
    try {
      const res = await fetch(`/api/education?familyId=${currentUser.family}`);
      const data = await res.json();

      dispatch({ type: "SET_CURRENT_TEACHERS", payload: data });
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
      getInvitations();
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

      if (!data.family) addInvitation(invitationDetails);
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

      navigate("/app/profile", { replace: true });

      const res = await fetch("/api/families/members", options);
      const data = await res.json();

      updateUserInformation({
        family: invite.invitorFamily,
      });

      closeInvite(invite.id);

      fetchGuardians(data.id);
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
        removeGuardian,
        getDoctors,
        getTeachers,
        currentDoctors,
        currentTeachers,
        currentUser,
        currentFamily,
        currentChildren,
        currentInvitations,
        isNonAdmin,
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
