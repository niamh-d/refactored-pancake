/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import { useUsers } from "../contexts/UsersContext";

const FormInviteGuardian = ({ handler }) => {
  const { inviteGuardian } = useUsers();

  const guardianEmailInputRef = useRef();
  const guardianEmailInputTwoRef = useRef();
  const roleSelectRef = useRef();

  const [emailsAreMatching, setEmailsAreMatching] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const email = guardianEmailInputRef.current.value.trim();

    if (email === "") return;
    if (email !== guardianEmailInputTwoRef.current.value.trim()) {
      setEmailsAreMatching(false);
      return;
    }

    inviteGuardian({ email, role: roleSelectRef.current.value });

    handler(false);
  }
  return (
    <div className="p-10">
      <h2 className="mt-5">Invite guardian</h2>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mt-5">
          <p>
            If a user with the provided email exists they will receive your
            invitation to join as a guardian.
          </p>
          <div>
            <label htmlFor="role" className="label">
              Role
            </label>

            <select
              className="select select-bordered max-w-xs text-lg"
              type="text"
              id="role"
              ref={roleSelectRef}
            >
              <option value="primary">Primary Guardian</option>
              <option value="extended">Extended Family</option>
              <option value="third">Friend/Neighbor</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="label">
              Guardian email
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="type guardian email"
              ref={guardianEmailInputRef}
              className="input input-bordered"
            />
          </div>
          <div>
            <label htmlFor="email-confirm" className="label">
              Confirm email
            </label>
            <input
              required
              type="email"
              id="email-confirm"
              placeholder="confirm guardian email"
              ref={guardianEmailInputTwoRef}
              className={`input input-bordered ${
                emailsAreMatching ? null : "input-error"
              }`}
            />
            {!emailsAreMatching && <p className="mt-5">Emails must match</p>}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-44 mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInviteGuardian;
