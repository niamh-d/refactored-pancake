import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import PageNav from "../components/PageNav";

import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, credentialsAreInvalid } = useAuth();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app/schedules", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    const credentials = {
      email: emailInputRef.current.value.trim(),
      password: passwordInputRef.current.value.trim(),
    };
    const { email, password } = credentials;

    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <>
      <main>
        <PageNav />
        <section className={styles["login-page"]}>
          <div className={styles["login-page__content"]}>
            <h1 className="text-4xl tracking-wider">Login to your account</h1>
            <form onSubmit={handleSubmit} className="form-control text-xl">
              <div>
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  ref={emailInputRef}
                  className={`input input-bordered ${
                    credentialsAreInvalid ? "input-error" : null
                  }`}
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  ref={passwordInputRef}
                  className={`input input-bordered ${
                    credentialsAreInvalid ? "input-error" : null
                  }`}
                />
              </div>
              {credentialsAreInvalid && (
                <div>
                  <p className="mt-5">Incorrect email and/or password.</p>
                </div>
              )}
              <div>
                <button type="primary" className="btn btn-primary mt-5">
                  Login
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
