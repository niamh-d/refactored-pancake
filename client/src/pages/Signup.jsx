import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useHomeApp } from "../contexts/HomeAppContext";
import { useAuth } from "../contexts/FakeAuthContext";

import Footer from "../components/Footer";
import PageNav from "../components/PageNav";

const Signup = () => {
  const navigate = useNavigate();
  const { addNewUser } = useHomeApp();
  const { signup } = useAuth();

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const starterDate = new Date("1990-01-01");

  const [date, setDate] = useState(starterDate);

  function handleSubmit(e) {
    e.preventDefault();

    const credentials = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      dob: date.toISOString().substring(0, 10),
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    addNewUser(credentials);
    signup();
    navigate("/app", { replace: true });
  }

  return (
    <div>
      <>
        <main>
          <PageNav />
          <section className="app-container">
            <div className="grid grid-cols-2 gap-2">
              <div className="image-box">
                <img src="../../imgs/signup.jpg" />
              </div>
              <div className="p-5">
                <h2 className="text-4xl font-semibold tracking-wide">
                  Sign up
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="form-control mt-10 p-10"
                >
                  <div>
                    <label htmlFor="first-name" className="label">
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      ref={firstNameInputRef}
                      className="input input-bordered"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="label">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      ref={lastNameInputRef}
                      className="input input-bordered"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      ref={emailInputRef}
                      className="input input-bordered"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      ref={passwordInputRef}
                      className="input input-bordered"
                    />
                    <label htmlFor="date" className="label">
                      Date of birth
                    </label>
                    <DatePicker
                      id="date"
                      onChange={(date) => setDate(date)}
                      selected={date}
                      dateFormat="dd/MM/yyyy"
                      className="input input-bordered"
                    />
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary mt-5">
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    </div>
  );
};

export default Signup;
