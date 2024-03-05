/* eslint-disable react/prop-types */
import CakeIcon from "@mui/icons-material/Cake";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";

const BASE_SOURCE = "../../imgs/users/";

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

function dateCleaner(date) {
  const m = Number(date.slice(5, 7)) - 1;
  const d = new Date(date.slice(0, 4), m, date.slice(8, 10));
  return d.toDateString().slice(4);
}

const AdminPersonRow = ({ person }) => {
  const { gender, firstName, lastName, dob, photoSource } = person;

  return (
    <li className="flex gap-5 text-xl items-center">
      {photoSource && (
        <img
          alt="user image"
          src={`${BASE_SOURCE}${photoSource}.jpeg`}
          className="rounded-lg opacity-85 w-20"
        />
      )}
      <span
        className={`badge ${gender === "0" ? "badge-accent" : gender === "1" ? "badge-info" : "badge-warning"} pl-3 pr-3 pt-4 pb-4 text-xl`}
      >
        {`${firstName} ${lastName || ""}`}
      </span>
      {person.isAdminUser === 1 && (
        <Tooltip title="Family Admin">
          <StarIcon />
        </Tooltip>
      )}
      <div className="flex align-middle gap-3">
        <CakeIcon />
        <p>
          <span className="font-semibold tracking-wider">
            {dateCleaner(dob).slice(0, 6)}
          </span>
          <span className="font-light">
            {dateCleaner(dob).slice(6, 11)} ({getAge(dob)}y)
          </span>
        </p>
      </div>
    </li>
  );
};

export default AdminPersonRow;
