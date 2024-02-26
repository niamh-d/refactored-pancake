/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

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
  const [{ currentUser }, dispatch] = useReducer(reducer, initialState);

  async function addNewUser(user) {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      dispatch({ type: "SET_CURRENT_USER", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <UsersContext.Provider value={{ addNewUser, currentUser }}>
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
