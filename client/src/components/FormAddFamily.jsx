import { useRef } from "react";

import { useUsers } from "../contexts/UsersContext";

const FormAddFamily = () => {
  const { addFamily } = useUsers();

  const familyNicknameInputRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const newFamilyDetails = {
      nickname: familyNicknameInputRef.current.value,
    };

    addFamily(newFamilyDetails);
  }
  return (
    <div className="p-10">
      <h2 className="mt-5">Add family</h2>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mt-5">
          <div>
            <label htmlFor="family-nickname" className="label">
              Family Nickname
            </label>
            <input
              type="text"
              id="first-name"
              ref={familyNicknameInputRef}
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

export default FormAddFamily;
