import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUsers } from "../contexts/UsersContext";
import { useAuth } from "../contexts/AuthContext";

import Footer from "../components/Footer";
import PageNav from "../components/PageNav";

const Signup = () => {
  const navigate = useNavigate();
  const { addNewUser, checkForExistingUser } = useUsers();
  const { signup } = useAuth();

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordOneInputRef = useRef(null);
  const sexSelectRef = useRef(null);
  const genderSelectRef = useRef(null);
  const pronounsSelectRef = useRef(null);
  const passwordTwoInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);

  const starterDate = new Date("1990-01-01");

  const [date, setDate] = useState(starterDate);

  const [isAlreadyExistingUser, setIsAlreadyExistingUser] = useState(false);
  const [passwordsAreMatching, setPasswordsAreMatching] = useState(true);

  function confirmPasswordMatchingHandler() {
    if (
      passwordOneInputRef.current.value.length > 0 &&
      passwordTwoInputRef.current.value.length > 0
    ) {
      if (
        passwordOneInputRef.current.value === passwordTwoInputRef.current.value
      ) {
        setPasswordsAreMatching(true);
      } else {
        setPasswordsAreMatching(false);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsAlreadyExistingUser(false);

    const newUserDetails = {
      firstName: firstNameInputRef.current.value.trim(),
      lastName: lastNameInputRef.current.value.trim(),
      dob: date.toISOString().substring(0, 10),
      email: emailInputRef.current.value.trim(),
      password: passwordOneInputRef.current.value.trim(),
      sex: sexSelectRef.current.value,
      gender: genderSelectRef.current.value,
      pronouns: pronounsSelectRef.current.value,
    };

    if (await checkForExistingUser(newUserDetails.email)) {
      setIsAlreadyExistingUser(true);
      return;
    }

    if (
      passwordOneInputRef.current.value !== passwordTwoInputRef.current.value
    ) {
      setPasswordsAreMatching(false);
      return;
    }

    addNewUser(newUserDetails);
    signup();
    navigate("/app", { replace: true });
  }

  return (
    <>
      <main>
        <PageNav />
        <section className="app-container">
          <div className="grid grid-cols-2 gap-10">
            <div className="image-box">
              <img src="../../imgs/signup.jpg" />
            </div>
            <div className="p-5">
              <h2 className="text-4xl font-semibold tracking-wide">Sign up</h2>
              <p className="mt-5 text-lg">
                Supply the following information to create your account.
              </p>
              <form onSubmit={handleSubmit} className="form-control mt-5 p-10">
                <div className="grid grid-cols-3">
                  <div className="flex flex-col gap-3">
                    <div>
                      <label htmlFor="first-name" className="label">
                        First name
                      </label>
                      <input
                        required
                        type="text"
                        id="first-name"
                        ref={firstNameInputRef}
                        className="input input-bordered"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="label">
                        Email address
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        className="input input-bordered"
                      />
                      {isAlreadyExistingUser && (
                        <p className="mt-5">
                          There is an existing user already signed-up with this
                          email.
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="password" className="label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        ref={passwordOneInputRef}
                        className={`input input-bordered ${
                          passwordsAreMatching ? null : "input-error"
                        }`}
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="label">
                        Gender
                      </label>

                      <select
                        className="select select-bordered max-w-xs text-lg"
                        type="text"
                        id="gender"
                        ref={genderSelectRef}
                      >
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">Non-binary</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="pronouns" className="label">
                        Pronouns
                      </label>

                      <select
                        className="select select-bordered max-w-xs text-lg"
                        type="text"
                        id="pronouns"
                        ref={pronounsSelectRef}
                      >
                        <option value="0">He/him</option>
                        <option value="1">She/her</option>
                        <option value="2">They/Them</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
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
                      <label htmlFor="password-confirm" className="label">
                        Confirm password
                      </label>
                      <input
                        type="password"
                        id="password-confirm"
                        ref={passwordTwoInputRef}
                        className={`input input-bordered ${
                          passwordsAreMatching ? null : "input-error"
                        }`}
                        onChange={confirmPasswordMatchingHandler}
                      />
                      {!passwordsAreMatching && (
                        <p className="mt-5">Passwords must match</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="sex" className="label">
                        Sex
                      </label>

                      <select
                        className="select select-bordered max-w-xs text-lg"
                        type="text"
                        id="sex"
                        ref={sexSelectRef}
                      >
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="phone-number" className="label">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        id="phone-number"
                        ref={phoneNumberInputRef}
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    type="submit"
                    className={`btn btn-${
                      !passwordsAreMatching ? "disabled" : "primary"
                    }
                    text-lg`}
                  >
                    Sign up
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost ml-5"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
