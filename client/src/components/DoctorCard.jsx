/* eslint-disable react/prop-types */
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Tooltip from "@mui/material/Tooltip";
import LanguageIcon from "@mui/icons-material/Language";
import ChatIcon from "@mui/icons-material/Chat";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function renderLanguageFlags(languages) {
  // const renderEmoji = (lang) => {
  //   switch (lang) {
  //     case "EN":
  //       return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  //     case "EE":
  //       return "🇪🇪";
  //     case "RU":
  //       return "🇷🇺";
  //     case "DE":
  //       return "🇩🇪";
  //     case "FI":
  //       return "🇫🇮";
  //     case "SV":
  //       return "🇸🇪";
  //   }
  // };

  function convertToEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return languages.split(",").map((lang) => convertToEmoji(lang));
}

const DoctorCard = ({ doctor }) => {
  const { firstName, lastName, clinicName, city, languages } = doctor;

  const languagesArr = renderLanguageFlags(languages);

  return (
    <div className="mt-10 p-5 rounded-lg ml-auto mr-auto w-96 shadow-lg">
      <div className="mt-5 p-5">
        <ul className="flex flex-col text-xl gap-2">
          <li className="pt-3 pb-3">
            <span className="font-bold text-3xl uppercase tracking-wider">
              {lastName}
            </span>
            <span className="text-2xl tracking-wider">, {firstName}</span>
          </li>
          <li className="flex gap-3 justify-self-center">
            {" "}
            <Tooltip title="Clinic" placement="left">
              <LocalHospitalIcon />
            </Tooltip>
            {clinicName}
          </li>
          <li className="flex gap-3 justify-self-center">
            <Tooltip title="City" placement="left">
              <LocationCityIcon />
            </Tooltip>
            <span>{city}</span>
          </li>
        </ul>
        <div className="flex gap-3 justify-self-center mt-3">
          <Tooltip title="Languages" placement="left">
            <ChatIcon />
          </Tooltip>
          <div className="flex gap-3 justify-self-center">
            {languagesArr.map((lang) => (
              <span key={lang}>{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
