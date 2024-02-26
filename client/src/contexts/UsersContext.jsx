/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const UsersContext = createContext();

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "":
      return { ...state };
    default:
      throw new Error("Unknown action type");
  }
}

function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <UsersContext.Provider value={{ addNewUser }}>
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
