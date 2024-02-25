/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  credentialsAreInvalid: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        credentialsAreInvalid: false,
      };
    case "signup":
      console.log("hello");
      return {
        ...state,
        isAuthenticated: true,
        credentialsAreInvalid: false,
      };
    case "invalid":
      return { ...state, credentialsAreInvalid: true };
    case "logout":
      return { ...state, isAuthenticated: false };
    default:
      throw new Error("Unknown action.");
  }
}

const FAKE_USER = {
  email: "jane@email.com",
  password: "jj000",
};

function AuthProvider({ children }) {
  const [{ isAuthenticated, credentialsAreInvalid }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email !== FAKE_USER.email || FAKE_USER.password !== password)
      dispatch({ type: "invalid" });
    if (email === FAKE_USER.email && FAKE_USER.password === password)
      dispatch({ type: "login" });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  function signup() {
    dispatch({ type: "signup" });
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, credentialsAreInvalid, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
