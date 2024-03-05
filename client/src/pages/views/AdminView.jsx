import { useState } from "react";

import AddHomeIcon from "@mui/icons-material/AddHome";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

import { useUsers } from "../../contexts/UsersContext";
import FormAddFamily from "../../components/FormAddFamily";
import FormAddChild from "../../components/FormAddChild";
import AdminPersonRow from "../../components/AdminPersonRow";
import FormInviteGuardian from "../../components/FormInviteGuardian";

function filterChildrenByAge(children) {
  return children
    .slice()
    .sort((a, b) => a.dob.replaceAll("-", "") - b.dob.replaceAll("-", ""));
}

const AdminView = () => {
  const { currentFamily, currentUser, currentChildren } = useUsers();

  const { adminFamily } = currentUser;

  const [addFamilyFormIsOpen, setAddFamilyFormIsOpen] = useState(false);
  const [addChildFormIsOpen, setAddChildFormIsOpen] = useState(false);
  const [inviteGuardianFormIsOpen, setInviteGuardianFormIsOpen] =
    useState(false);

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Admin Panel</h1>
        <div className="grid grid-cols-3">
          <div>
            {!adminFamily && (
              <div>
                <p className="mt-10 text-xl">
                  You&apos;re currently not an admin user.
                </p>
                {!addFamilyFormIsOpen && (
                  <button
                    className="btn btn-secondary mt-8 text-xl"
                    onClick={() => setAddFamilyFormIsOpen(true)}
                  >
                    <AddHomeIcon /> Add family
                  </button>
                )}
              </div>
            )}
            {adminFamily && (
              <div>
                <p className="mt-10 text-lg">
                  You&apos;re the admin of family{" "}
                  <span className="uppercase tracking-wider font-semibold">
                    {currentFamily.familyName}
                  </span>{" "}
                  (#{currentFamily.id}).
                </p>
                {!inviteGuardianFormIsOpen && !addChildFormIsOpen && (
                  <button
                    className="btn  btn-secondary mt-8 text-xl"
                    onClick={() => setInviteGuardianFormIsOpen(true)}
                  >
                    <AddModeratorIcon />
                    Invite guardian
                  </button>
                )}
              </div>
            )}
            {!addChildFormIsOpen && !inviteGuardianFormIsOpen && (
              <button
                className="btn  btn-secondary mt-8 text-xl"
                onClick={() => setAddChildFormIsOpen(true)}
              >
                <PersonAddAlt1Icon />
                Add child
              </button>
            )}

            {!adminFamily && addFamilyFormIsOpen && <FormAddFamily />}
            {adminFamily && addChildFormIsOpen && (
              <FormAddChild handler={setAddChildFormIsOpen} />
            )}
            {adminFamily && inviteGuardianFormIsOpen && (
              <FormInviteGuardian handler={setInviteGuardianFormIsOpen} />
            )}
          </div>

          {adminFamily && currentChildren.length === 0 && (
            <p className="text-lg">You haven&apos;t added any children yet.</p>
          )}
          {currentChildren.length > 0 && (
            <div>
              <h3>Children:</h3>
              <ul className="flex flex-col gap-5 mt-5">
                {filterChildrenByAge(currentChildren).map((child) => (
                  <AdminPersonRow key={child.id} person={child} />
                ))}
              </ul>
            </div>
          )}
          {currentFamily.members && (
            <div>
              <h3>Other Guardians:</h3>
              <ul className="flex flex-col gap-5 mt-5">
                {currentFamily.members.map((guardian) =>
                  currentFamily.adminUser === guardian.id ? null : (
                    <AdminPersonRow key={guardian.id} person={guardian} />
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminView;
