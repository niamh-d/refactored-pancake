import { useState } from "react";

import AddHomeIcon from "@mui/icons-material/AddHome";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { useUsers } from "../../contexts/UsersContext";
import FormAddFamily from "../../components/FormAddFamily";
import FormAddChild from "../../components/FormAddChild";

const AdminView = () => {
  const { currentFamily, currentUser } = useUsers();

  const { adminFamily } = currentUser;

  const [addFamilyFormIsOpen, setAddFamilyFormIsOpen] = useState(false);
  const [addChildFormIsOpen, setAddChildFormIsOpen] = useState(false);

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Admin Panel</h1>
        {!adminFamily && (
          <>
            <p className="mt-10 text-xl">
              You&apos;re currently not an admin user.
            </p>
            {!addFamilyFormIsOpen && (
              <button
                className="btn btn-primary mt-8 text-xl"
                onClick={() => setAddFamilyFormIsOpen(true)}
              >
                <AddHomeIcon /> Add family
              </button>
            )}
          </>
        )}
        {adminFamily && (
          <>
            <p className="mt-10 text-lg">
              You&apos;re the admin of family{" "}
              <span className="uppercase tracking-wider font-semibold">
                {currentFamily.nickname}
              </span>{" "}
              (#{currentFamily.id}).
            </p>
            {!addChildFormIsOpen && (
              <button
                className="btn btn-primary mt-8 text-xl"
                onClick={() => setAddChildFormIsOpen(true)}
              >
                <PersonAddAlt1Icon />
                Add child
              </button>
            )}
          </>
        )}
      </div>
      {!adminFamily && addFamilyFormIsOpen && <FormAddFamily />}
      {adminFamily && addChildFormIsOpen && (
        <FormAddChild handler={setAddChildFormIsOpen} />
      )}
    </section>
  );
};

export default AdminView;
