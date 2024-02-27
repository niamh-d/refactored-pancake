/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useUsers } from "../contexts/UsersContext";

function User() {
  const navigate = useNavigate();
  const { logout, loggedInUser } = useAuth();
  const { currentUser, setCurrentUser } = useUsers();

  useEffect(() => {
    setCurrentUser(loggedInUser);
  }, [loggedInUser]);

  function handleClick() {
    logout();
    navigate("/");
  }

  if (!currentUser) return;

  return (
    <div>
      <span>Welcome, {currentUser.firstName}</span>
      <button className="btn btn-secondary ml-5" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default User;
