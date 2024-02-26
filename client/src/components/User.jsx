import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FakeAuthContext";
import { useUsers } from "../contexts/UsersContext";

function User() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentUser } = useUsers();

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
