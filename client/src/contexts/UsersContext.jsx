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
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_CURRENT_FAMILY":
      return { ...state, currentFamily: action.payload };
    case "SET_CURRENT_CHILDREN":
      return { ...state, currentChildren: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function UsersProvider({ children }) {
  const { loggedInUser } = useAuth();

  const [{ currentUser, currentFamily, currentChildren }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });
  }, [loggedInUser]);

  useEffect(() => {
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

    if (!currentUser || !currentFamily || currentUser.adminFamily) return;

    insertIntoUserFamilyID();
  }, [currentFamily, currentUser]);

  useEffect(() => {
    async function getFamily() {
      try {
        const res = await fetch(`/api/families?adminUser=${currentUser.id}`);
        const data = await res.json();

        const family = data[0];
        if (!family) return;

        dispatch({ type: "SET_CURRENT_FAMILY", payload: family });
      } catch (err) {
        console.error(err);
      }
    }

    if (!currentUser && !currentFamily) return;

    if (!currentUser && currentFamily) {
      dispatch({ type: "SET_CURRENT_FAMILY", payload: null });
      return;
    }

    if (currentUser && currentFamily) return;

    getFamily();
  }, [currentUser, currentFamily]);

  useEffect(() => {
    async function getChildren() {
      try {
        const res = await fetch(
          `/api/children?primaryGuardian=${currentUser.id}`
        );
        const data = await res.json();

        const children = data;
        if (!children.length) return;

        dispatch({ type: "SET_CURRENT_CHILDREN", payload: children });
      } catch (err) {
        console.error(err);
      }
    }

    if (!currentUser && !currentChildren.length) return;

    if (!currentUser && currentChildren.length) {
      dispatch({ type: "SET_CURRENT_CHILDREN", payload: [] });
      return;
    }

    if (currentUser && currentChildren.length) return;

    getChildren();
  }, [currentUser, currentChildren]);

  async function checkForExistingUser(email) {
    try {
      const res = await fetch(`/api/users/signup?email=${email}`);
      const data = await res.json();
      return data ? true : false;
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

  async function createRolesTable(id) {
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
      const res = await fetch("/api/families/members", options);
      const data = await res.json();
      console.log(data[0]);
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
      createRolesTable(id);
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
          primaryGuardian: currentUser.id,
        }),
      };
      const res = await fetch("/api/children", options);
      const data = await res.json();
      dispatch({ type: "SET_CURRENT_CHILDREN", payload: data });
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
        updateUserInformation,
        checkForExistingUser,
        currentUser,
        currentFamily,
        currentChildren,
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
