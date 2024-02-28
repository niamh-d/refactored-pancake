import { useUsers } from "../../contexts/UsersContext";

const ProfileView = () => {
  const { currentUser } = useUsers();

  const { firstName, lastName, gender, email, phoneNumber, dob, photoSource } =
    currentUser;

  const BASE_SOURCE = "../../imgs/users/";

  function generateGenderString(gender) {
    if (gender === "0") return "Male";
    if (gender === "1") return "Female";
    if (gender === "2") return "Non-binary";
  }

  function dateCleaner(date) {
    const d = new Date(date.slice(0, 4), date.slice(5, 7), date.slice(8, 10));
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
      <div className="p-5 mt-10 w-1/2">
        <h1>User Profile</h1>
        <div className="grid-cols-3 grid gap-5 p-10">
          <img
            alt="user image"
            src={`${BASE_SOURCE}${photoSource}.jpeg`}
            className="rounded-lg"
          />
          <ul className="flex flex-col gap-5 mt-10 text-lg font-semibold justify-self-end">
            <li>Name:</li>
            <li>Date of birth:</li>
            <li>Gender:</li>
            <li>Email:</li>
            <li>Phone number:</li>
          </ul>
          <ul className="flex flex-col gap-5 mt-10 text-lg">
            <li className="font-bold tracking-widest">{`${firstName} ${lastName}`}</li>
            <li>
              {" "}
              {dateCleaner(dob)} ({getAge(dob)}y)
            </li>
            <li>{generateGenderString(gender)}</li>
            <li>{email}</li>
            <li>{phoneNumber}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProfileView;
