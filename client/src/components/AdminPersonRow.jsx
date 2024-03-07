/* eslint-disable react/prop-types */
import CakeIcon from "@mui/icons-material/Cake";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { useUsers } from "../contexts/UsersContext";

const BASE_SOURCE = "../../imgs/users/";

const pronounsStr = (pronouns) => {
  if (pronouns === "0") return "he/him";
  if (pronouns === "1") return "she/her";
  if (pronouns === "2") return "they/them";
};

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

const AdminPersonRow = ({ person, showRemove }) => {
  const { removeGuardian } = useUsers();

  const { gender, firstName, lastName, dob, photoSource, pronouns, id } =
    person;

  const removeHandler = () => removeGuardian(id);

  return (
    <li className="flex gap-5 text-xl items-center">
      {showRemove && (
        <Tooltip title={`Remove ${firstName} from family`}>
          <PersonRemoveIcon
            onClick={removeHandler}
            className="cursor-pointer"
          />
        </Tooltip>
      )}
      {photoSource && (
        <img
          alt="user image"
          src={`${BASE_SOURCE}${photoSource}.jpeg`}
          className="rounded-lg opacity-85 w-20"
        />
      )}
      <span
        className={`badge ${gender === "0" ? "badge-accent" : gender === "1" ? "badge-info" : "badge-warning"} pl-2 pr-2 pt-5 pb-5 text-xl rounded-lg`}
      >
        {`${firstName} ${lastName || ""}`} ({pronounsStr(pronouns)})
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
