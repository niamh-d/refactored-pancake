import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink to="/">
          <p className="text-5xl tracking-wider">
            <span className="uppercase">kø</span>do
          </p>
        </NavLink>
      </div>
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
