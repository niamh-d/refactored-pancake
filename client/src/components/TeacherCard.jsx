/* eslint-disable react/prop-types */
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Tooltip from "@mui/material/Tooltip";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const TeacherCard = ({ teacher }) => {
  const {
    firstName,
    lastName,
    schoolName,
    schoolEmail,
    city,
    streetAddress,
    schoolPhoneNo,
    websiteURL,
    email,
    mobileNo,
  } = teacher;

  return (
    <div className="mt-10 p-5 rounded-lg ml-auto mr-auto w-96 shadow-lg">
      <div className="mt-5 p-5">
        <ul className="flex flex-col text-xl gap-3">
          <li className="pt-3 pb-3">
            <span className="font-bold text-3xl uppercase tracking-wider">
              {lastName}
            </span>
            <span className="text-2xl tracking-wider">, {firstName}</span>
          </li>
          <li className="flex gap-3 justify-self-center font-semibold">
            <Tooltip title="School" placement="left">
              <SchoolIcon />
            </Tooltip>
            {schoolName}
          </li>
          <li className="flex gap-3 justify-self-center">
            <Tooltip title="Email" placement="left">
              <ContactMailIcon />
            </Tooltip>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
          <li className="flex gap-3 justify-self-center">
            <Tooltip title="Mobile/Cellphone no." placement="left">
              <PhoneIphoneIcon />
            </Tooltip>
            <a href={`tel:${mobileNo}`}>{mobileNo}</a>
          </li>
          <li className="flex gap-3 justify-self-center">
            <Tooltip title="Address" placement="left">
              <LocationCityIcon />
            </Tooltip>
            <span>{`${city}, ${streetAddress}`}</span>
          </li>
          <li className="flex gap-3 justify-self-center">
            <Tooltip title="Website" placement="left">
              <LanguageIcon />
            </Tooltip>
            <a target="_blank" href={websiteURL}>
              Open website
            </a>
          </li>
          <li className="flex gap-3 justify-self-center">
            <Tooltip title="Shcool phone no." placement="left">
              <LocalPhoneIcon />
            </Tooltip>
            <a href={`tel:${schoolPhoneNo}`}>{schoolPhoneNo}</a>
          </li>
          <li className="flex gap-3 justify-self-center">
            <Tooltip title="Email" placement="left">
              <AlternateEmailIcon />
            </Tooltip>
            <a href={`mailto:${schoolEmail}`}>{schoolEmail}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherCard;
