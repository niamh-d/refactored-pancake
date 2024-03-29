import { useRef } from "react";

import { useUsers } from "../contexts/UsersContext";

const FormAddFamily = ({ handler }) => {
  const { addFamily } = useUsers();

  const familyNameInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const newFamilyDetails = {
      familyName: familyNameInputRef.current.value,
    };

    addFamily(newFamilyDetails);
  }
  return (
    <div className="p-10">
      <h2 className="mt-5">Add family</h2>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mt-5">
          <div>
            <label htmlFor="family-name" className="label">
              Family Name
            </label>
            <input
              required
              type="text"
              id="family-name"
              ref={familyNameInputRef}
              className="input input-bordered"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="btn btn-primary w-44 mt-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-ghost w-33 mt-3"
              onClick={() => handler(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAddFamily;
