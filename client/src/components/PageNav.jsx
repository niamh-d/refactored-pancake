import { NavLink } from "react-router-dom";

import Logo from "./Logo";

function PageNav() {
  return (
    <nav className="navbar bg-base-100 p-5">
      <Logo />
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl z-50">
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
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
