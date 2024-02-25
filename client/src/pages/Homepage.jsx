import { Link } from "react-router-dom";

import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <>
      <main>
        <PageNav />
        <section>
          <h1>Homepage</h1>
          <button type="button" className="btn btn-primary">
            <Link to="/login" className="cta">
              Get managing
            </Link>
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
