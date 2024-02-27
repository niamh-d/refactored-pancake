import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-1">
      <NavLink to="/">
        <p className="text-5xl tracking-wider">
          <span className="uppercase">kø</span>do
        </p>
      </NavLink>
    </div>
  );
};

export default Logo;
