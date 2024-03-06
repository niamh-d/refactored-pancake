import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import InnerAppNav from "../components/InnerAppNav";
import Footer from "../components/Footer";
import AnnouncementInvites from "../components/AnnouncementInvites";

import { useUsers } from "../contexts/UsersContext";

function AppLayout() {
  const { currentInvitations } = useUsers();

  return (
    <>
      <main>
        <AppHeader />
        {currentInvitations && <AnnouncementInvites />}
        <InnerAppNav />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
