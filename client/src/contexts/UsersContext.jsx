/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

import { useAuth } from "./AuthContext";

const UsersContext = createContext();

const initialState = {
  currentUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function UsersProvider({ children }) {
  const { loggedInUser } = useAuth();

  const [{ currentUser }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });
  }, [loggedInUser]);

  async function checkForExistingUser(email) {
    try {
      const res = await fetch(`/api/users?email=${email}`);
      const data = await res.json();
      return data[0] ? true : false;
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

  return (
    <UsersContext.Provider
      value={{
        addNewUser,
        updateUserInformation,
        checkForExistingUser,
        currentUser,
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
