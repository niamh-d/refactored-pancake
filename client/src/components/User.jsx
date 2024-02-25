import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function User() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <span>Welcome, xx</span>
      <button className="btn btn-secondary ml-5" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default User;
