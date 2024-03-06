/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";

import { useAuth } from "../contexts/AuthContext";
import { useUsers } from "../contexts/UsersContext";

function User() {
  const BASE_SOURCE = "../../imgs/users/";

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentUser, currentFamily } = useUsers();

  function handleClick() {
    logout();
    navigate("/");
  }

  if (!currentUser) return;

  const { firstName, lastName, photoSource } = currentUser;

  return (
    <div className="flex gap-5 items-center">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col">
          <span className="tracking-widest font-light text-xl">
            {`${firstName} ${lastName}`}
          </span>

          {currentUser.family && (
            <div className="flex gap-2 font-semibold">
              <Tooltip title={`Family ${currentFamily.familyName}`}>
                <HomeIcon />
              </Tooltip>
              <span>{currentFamily.familyName}</span>
              <span className="font-light">
                {" "}
                {currentUser.adminFamily ? "(Admin)" : null}
              </span>
            </div>
          )}
        </div>

        <div className="ml-3 w-14">
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
