import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import InnerAppNav from "../components/InnerAppNav";
import Footer from "../components/Footer";
import AnnouncementInvite from "../components/AnnouncementInvite";

import { useUsers } from "../contexts/UsersContext";

function AppLayout() {
  const { invitation } = useUsers();

  return (
    <>
      <main>
        <AppHeader />
        {invitation && <AnnouncementInvite invitation={invitation} />}
        <InnerAppNav />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
