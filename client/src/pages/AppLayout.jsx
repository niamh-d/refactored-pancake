import User from "../components/User";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <>
      <main>
        <User />
        <div>AppLayout</div>
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
