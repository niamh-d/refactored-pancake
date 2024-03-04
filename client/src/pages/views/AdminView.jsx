import { useUsers } from "../../contexts/UsersContext";
import FormAddFamily from "../../components/FormAddFamily";
import FormAddChild from "../../components/FormAddChild";

const AdminView = () => {
  const { currentFamily, currentUser } = useUsers();

  const { adminFamily } = currentUser;

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Admin Panel</h1>
        {!adminFamily && (
          <p className="mt-10 text-lg">
            You&apos;re currently not an admin user. Add a family.
          </p>
        )}
        {adminFamily && (
          <p className="mt-10 text-lg">
            You&apos;re the admin of family{" "}
            <span className="uppercase tracking-wider font-semibold">
              {currentFamily.nickname}
            </span>
            .
          </p>
        )}
      </div>
      {!adminFamily && <FormAddFamily />}
      {adminFamily && <FormAddChild />}
    </section>
  );
};

export default AdminView;
