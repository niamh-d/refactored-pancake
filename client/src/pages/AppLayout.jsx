import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import InnerAppNav from "../components/InnerAppNav";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <>
      <main>
        <AppHeader />
        <InnerAppNav />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
