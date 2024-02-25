import { Link } from "react-router-dom";

import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

export default function Pricing() {
  return (
    <>
      <main>
        <PageNav />
        <section className="app-container">
          <div className="grid grid-cols-2 gap-2">
            <div className="image-box">
              <img src="../../imgs/pricing.jpg" />
            </div>
            <div className="p-5">
              <h2 className="text-4xl font-semibold tracking-wide">Pricing</h2>
              <p className="text-xl mt-5 w-3/4 text-justify leading-loose">
                Morbi tristique senectus et netus et. Pellentesque elit eget
                gravida cum sociis natoque penatibus et magnis. In nibh mauris
                cursus mattis. Enim neque volutpat ac tincidunt vitae. Nec
                ultrices dui sapien eget mi proin. Diam maecenas sed enim ut. Et
                tortor at risus viverra adipiscing at. Tristique et egestas quis
                ipsum suspendisse ultrices gravida dictum.
              </p>
              <div className="flex gap-4 mt-10">
                <button type="button" className="btn btn-primary">
                  <Link to="/signup">
                    <span className=" text-lg font-semibold">
                      Free 14-day trial
                    </span>
                  </Link>
                </button>
                <button type="button" className="btn btn-ghost">
                  <Link to="/product">
                    <span className="text-lg font-semibold">Learn more</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
