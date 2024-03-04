import { useNavigate } from "react-router-dom";

import { useUsers } from "../../contexts/UsersContext";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useUsers();

  const {
    firstName,
    lastName,
    gender,
    email,
    phoneNumber,
    dob,
    photoSource,
    id,
  } = currentUser;

  const BASE_SOURCE = "../../imgs/users/";

  function generateGenderString(gender) {
    if (gender === "0") return "Male";
    if (gender === "1") return "Female";
    if (gender === "2") return "Non-binary";
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
    <div className="p-5 mt-10 w-1/2 ml-10">
      <h1>Your Profile</h1>
      <button
        className="btn btn-primary mt-5 mb-5"
        onClick={() => navigate("edit")}
      >
        Edit details
      </button>
      <div className="grid-cols-3 grid gap-5 p-10">
        <img
          alt="user image"
          src={`${BASE_SOURCE}${photoSource}.jpeg`}
          className="rounded-lg opacity-85"
        />
        <ul className="flex flex-col gap-5 mt-10 text-lg font-semibold justify-self-center">
          <li>Name:</li>
          <li>User ID:</li>
          <li>Date of birth:</li>
          <li>Gender:</li>
          <li>Email:</li>
          <li>Phone number:</li>
        </ul>
        <ul className="flex flex-col gap-5 mt-10 text-lg">
          <li className="font-bold tracking-widest">{`${firstName} ${lastName}`}</li>
          <li>{id}</li>
          <li>
            {dateCleaner(dob)} ({getAge(dob)}y)
          </li>
          <li>{generateGenderString(gender)}</li>
          <li>{email}</li>
          <li>{phoneNumber}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetails;
