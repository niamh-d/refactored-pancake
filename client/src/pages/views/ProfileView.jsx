import { Outlet } from "react-router-dom";

const ProfileView = () => {
  return (
    <section className="app-container">
      <Outlet />
    </section>
  );
};

export default ProfileView;
