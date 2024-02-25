import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <p className="text-4xl tracking-widest">
          <span className="uppercase">kø</span>do
        </p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
