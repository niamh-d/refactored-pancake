import { useRef } from "react";

import { useUsers } from "../../contexts/UsersContext";

const AdminView = () => {
  const { addFamily } = useUsers();

  const familyNicknameInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const newFamilyDetails = {
      nickname: familyNicknameInputRef.current.value,
    };

    addFamily(newFamilyDetails);
  }

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Admin Panel</h1>
        <p className="mt-10 text-lg">
          You&apos;re currently not an admin user. Add a family.
        </p>
        <div className="p-10">
          <h2 className="mt-5">Add a family</h2>
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
      </div>
    </section>
  );
};

export default AdminView;
