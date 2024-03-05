import { useState } from "react";

import AddHomeIcon from "@mui/icons-material/AddHome";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { useUsers } from "../../contexts/UsersContext";
import FormAddFamily from "../../components/FormAddFamily";
import FormAddChild from "../../components/FormAddChild";

const AdminView = () => {
  const { currentFamily, currentUser, currentChildren } = useUsers();

  const { adminFamily } = currentUser;

  const [addFamilyFormIsOpen, setAddFamilyFormIsOpen] = useState(false);
  const [addChildFormIsOpen, setAddChildFormIsOpen] = useState(false);

  function filterChildrenByAge(children) {
    return children
      .slice()
      .sort((a, b) => a.dob.replaceAll("-", "") - b.dob.replaceAll("-", ""));
  }

  function dateCleaner(date) {
    const m = Number(date.slice(5, 7)) - 1;
    const d = new Date(date.slice(0, 4), m, date.slice(8, 10));
    return d.toDateString().slice(4);
  }

  const getAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);

    const yearsDifference = today.getFullYear() - birthDate.getFullYear();

    const isBeforeBirthday =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());

    return isBeforeBirthday ? yearsDifference - 1 : yearsDifference;
  };

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Admin Panel</h1>
        <div className="grid grid-cols-2">
          <div>
            {!adminFamily && (
              <div>
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
                {!addChildFormIsOpen && (
                  <button
                    className="btn btn-primary mt-8 text-xl"
                    onClick={() => setAddChildFormIsOpen(true)}
                  >
                    <PersonAddAlt1Icon />
                    Add child
                  </button>
                )}
              </div>
            )}

            {!adminFamily && addFamilyFormIsOpen && <FormAddFamily />}
            {adminFamily && addChildFormIsOpen && (
              <FormAddChild handler={setAddChildFormIsOpen} />
            )}
          </div>

          {adminFamily && currentChildren.length === 0 && (
            <p className="text-lg">You haven&apos;t added any children yet.</p>
          )}
          {currentChildren.length > 0 && (
            <div>
              <h3>You&apos;re the primary guardian of:</h3>
              <ul className="flex flex-col gap-5 mt-5">
                {filterChildrenByAge(currentChildren).map((child) => (
                  <li
                    key={child.id}
                    className="flex gap-5 align-middle text-xl"
                  >
                    <span
                      className={`badge ${child.gender === "0" ? "badge-accent" : child.gender === "1" ? "badge-info" : "badge-warning"} pl-3 pr-3 pt-4 pb-4 text-xl`}
                    >
                      {child.firstName}
                    </span>
                    <span>{`${dateCleaner(child.dob)} (${getAge(child.dob)}y)`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminView;
