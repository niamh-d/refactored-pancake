import AppHeader from "../components/AppHeader";
import InnerAppNav from "../components/InnerAppNav";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <>
      <main>
        <AppHeader />
        <InnerAppNav />
        <div>AppLayout</div>
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
