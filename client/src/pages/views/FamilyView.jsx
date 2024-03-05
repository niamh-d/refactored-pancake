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
      <p>
        You are currently not a member of a family. Set up a family from the
        Admin Panel or accept an invitation to join a family.
      </p>
    );

  const { members } = currentFamily;
  const primaries = members.filter((guardian) => guardian.isPrimaryGuardian);
  const familyAdmin = members.filter((guardian) => guardian.isAdminUser);
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
