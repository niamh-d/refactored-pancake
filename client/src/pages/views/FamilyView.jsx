import { useUsers } from "../../contexts/UsersContext";

import AdminPersonRow from "../../components/AdminPersonRow";

function filterChildrenByAge(children) {
  return children
    .slice()
    .sort((a, b) => a.dob.replaceAll("-", "") - b.dob.replaceAll("-", ""));
}

const FamilyView = () => {
  const { currentChildren, currentFamily } = useUsers();

  if (!currentFamily)
    return (
      <section className="app-container">
        <div className="p-5 mt-10">
          <h1>Family 404</h1>
          <p className="mt-5 text-xl">
            Family not found. You are currently{" "}
            <span className="font-semibold">not</span> a member of a family. Set
            up a family from the Admin Panel or accept an invitation from
            another user to join their family.
          </p>
        </div>
      </section>
    );

  const { members } = currentFamily;
  const primaries = members.filter((guardian) => guardian.isPrimaryGuardian);
  const extendeds = members.filter(
    (guardian) => guardian.isExtendedFamilyGuardian
  );
  const thirds = members.filter((guardian) => guardian.isThirdPartyGuardian);

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Family</h1>
        <div className="grid grid-cols-2 gap-y-10 mt-12">
          <div>
            <h2>Children</h2>
            {currentChildren && (
              <ul className="flex flex-col gap-5 mt-5">
                {filterChildrenByAge(currentChildren).map((child) => (
                  <AdminPersonRow key={child.id} person={child} />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2>Primary Guardians</h2>
            {members && primaries.length > 0 && (
              <ul className="flex flex-col gap-5 mt-5">
                {primaries.map((primary) => (
                  <AdminPersonRow key={primary.id} person={primary} />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2>Extended Family</h2>
            {members && extendeds.length > 0 && (
              <ul className="flex flex-col gap-5 mt-5">
                {extendeds.map((primary) => (
                  <AdminPersonRow key={primary.id} person={primary} />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2>Friends and Neighbors</h2>
            {members && thirds.length > 0 && (
              <ul className="flex flex-col gap-5 mt-5">
                {thirds.map((primary) => (
                  <AdminPersonRow key={primary.id} person={primary} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyView;
