import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";

const InnerAppNav = () => {
  return (
    <nav className="navbar bg-base-100 p-5 flex justify-center mt-10">
      <ul className="flex gap-20 justify-around text-4xl">
        <li>
          <Tooltip title="Profile">
            <PersonIcon fontSize="inherit" />
          </Tooltip>
        </li>
        <li>
          <Tooltip title="Admin">
            <HomeIcon fontSize="inherit" />
          </Tooltip>
        </li>
        <li>
          <Tooltip title="Schedules">
            <AccessTimeIcon fontSize="inherit" />
          </Tooltip>
        </li>
        <li>
          <Tooltip title="School">
            <SchoolIcon fontSize="inherit" />
          </Tooltip>
        </li>

        <li>
          <Tooltip title="Health">
            <LocalHospitalIcon fontSize="inherit" />
          </Tooltip>
        </li>

        <li>
          <Tooltip title="Hobbies & Freetime">
            <SportsTennisIcon fontSize="inherit" />
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default InnerAppNav;
