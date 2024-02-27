/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useUsers } from "../contexts/UsersContext";

function User() {
  const BASE_SOURCE = "../../imgs/users/";

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

  const { firstName, lastName, photoSource } = currentUser;

  return (
    <div className="flex gap-5 items-center">
      <div className="flex gap-3 items-center">
        <span className="tracking-wider font-extralight text-lg">
          {`${firstName} ${lastName}`}
        </span>

        <div className="w-14">
          <img
            alt="user image"
            src={`${BASE_SOURCE}${photoSource}.jpeg`}
            className="rounded-lg"
          />
        </div>
      </div>
      <button className="btn btn-secondary ml-5" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default User;
