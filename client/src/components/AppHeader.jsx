import User from "./User";
import Logo from "./Logo";

const AppHeader = () => {
  return (
    <header className="navbar bg-base-100 p-5">
      <Logo />
      <User />
    </header>
  );
};

export default AppHeader;
