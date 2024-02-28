import { NavLink, useNavigate } from "react-router-dom";

import Logo from "./Logo";

import { useAuth } from "../contexts/AuthContext";

function PageNav() {
  const { loggedInUser, logout } = useAuth();

  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar bg-base-100 p-5">
      <Logo />
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl z-50">
          {!loggedInUser && (
            <li>
              <details>
                <summary>Product & Pricing</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                  </li>
                  <li>
                    <NavLink to="/product">Product</NavLink>
                  </li>
                </ul>
              </details>
            </li>
          )}
          <li>
            {!loggedInUser && <NavLink to="/login">Login</NavLink>}
            {loggedInUser && (
              <NavLink to="app/schedules">Return to app</NavLink>
            )}
          </li>
        </ul>
        {loggedInUser && (
          <button className="btn btn-secondary ml-5" onClick={handleClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default PageNav;
