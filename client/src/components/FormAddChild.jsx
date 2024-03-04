/* eslint-disable react/prop-types */
import { useRef } from "react";

import { useUsers } from "../contexts/UsersContext";

const FormAddChild = ({ handler }) => {
  const { addChild } = useUsers();

  const firstNameInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const newChildDetails = {
      firstName: firstNameInputRef.current.value,
    };

    addChild(newChildDetails);

    handler(false);

    firstNameInputRef.current.value = null;
  }
  return (
    <div className="p-10">
      <h2 className="mt-5">Add child</h2>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mt-5">
          <div>
            <label htmlFor="family-nickname" className="label">
              Child&apos;s first name
            </label>
            <input
              type="text"
              id="first-name"
              ref={firstNameInputRef}
              className="input input-bordered"
            />
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

export default FormAddChild;
