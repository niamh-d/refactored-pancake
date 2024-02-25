import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FakeAuthContext";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, invalidCredentials } = useAuth();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    const credentials = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    const { email, password } = credentials;

    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <>
      <main>
        <PageNav />
        <form onSubmit={handleSubmit} className="form-control">
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
          </div>
          {invalidCredentials && (
            <div>
              <p>Incorrect email and/or password.</p>
            </div>
          )}
          <div>
            <button type="primary" className="btn btn-primary mt-5">
              Login
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
