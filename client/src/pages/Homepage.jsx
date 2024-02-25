import { Link } from "react-router-dom";

import styles from "./Homepage.module.css";

import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main>
      <PageNav />
      <section className={styles.homepage}>
        <div className={styles.homepage__content}>
          <h1 className="text-6xl tracking-wider">
            <span className="uppercase">kø</span>do
          </h1>
          <p className="text-2xl font-medium tracking-wide">
            The home management solution for busy parents. Get{" "}
            <span className="font-bold">KØdo</span>-ing!
          </p>
          <div className="flex gap-4 mt-10">
            <button type="button" className="btn btn-primary">
              <Link to="/signup">
                <span className=" text-lg font-semibold">Sign up</span>
              </Link>
            </button>
            <button type="button" className="btn btn-ghost">
              <Link to="/login">
                <span className="text-lg font-semibold">Log in</span>
              </Link>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
