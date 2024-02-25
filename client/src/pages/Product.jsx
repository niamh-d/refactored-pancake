import { Link } from "react-router-dom";

import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

export default function Product() {
  return (
    <>
      <main>
        <PageNav />
        <section className="app-container">
          <div className="grid grid-cols-2 gap-2">
            <div className="image-box">
              <img src="../../imgs/product.jpg" />
            </div>
            <div className="p-5">
              <h2 className="text-4xl font-semibold tracking-wide">Product</h2>
              <p className="text-xl mt-5 w-3/4 text-justify leading-loose">
                Ut faucibus pulvinar elementum integer enim neque volutpat ac.
                Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed.
                Non tellus orci ac auctor augue mauris augue. Metus vulputate eu
                scelerisque felis imperdiet proin fermentum. Est ultricies
                integer quis auctor elit. Cursus metus aliquam eleifend mi in
                nulla posuere. Libero volutpat sed cras ornare arcu dui. Eu
                volutpat odio facilisis mauris sit. Nunc congue nisi vitae
                suscipit tellus mauris a diam maecenas. Neque aliquam vestibulum
                morbi blandit cursus risus.
              </p>
              <div className="flex gap-4 mt-10">
                <button type="button" className="btn btn-primary">
                  <Link to="/signup">
                    <span className=" text-lg font-semibold">Sign up</span>
                  </Link>
                </button>
                <button type="button" className="btn btn-ghost">
                  <Link to="/pricing">
                    <span className="text-lg font-semibold">Pricing</span>
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
