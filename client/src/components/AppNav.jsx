import { NavLink } from "react-router-dom";

import User from "./User";

import Logo from "./Logo";

const AppNav = () => {
  return (
    <nav className="navbar bg-base-100 p-5">
      <Logo />

      <User />
    </nav>
  );
};

export default AppNav;
