/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const HomeAppContext = createContext();

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "":
      return { ...state };
    default:
      throw new Error("Unknown action type");
  }
}

function HomeAppProvider({ children }) {
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

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <HomeAppContext.Provider value={{ addNewUser }}>
      {children}
    </HomeAppContext.Provider>
  );
}

function useHomeApp() {
  const context = useContext(HomeAppContext);
  if (context === undefined)
    throw new Error("HomeAppContext was used outside the HomeAppProvider;");
  return context;
}

export { HomeAppProvider, useHomeApp };
