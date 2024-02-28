import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";

import { NavLink } from "react-router-dom";

const AppIconsNavList = () => {
  return (
    <ul className="flex gap-20 justify-around text-4xl icons-nav">
      <li className="flex align-middle">
        <NavLink to="profile">
          <Tooltip title="Profile">
            <PersonIcon fontSize="inherit" />
          </Tooltip>
        </NavLink>
      </li>
      <li className="flex align-middle">
        <NavLink to="admin">
          <Tooltip title="Admin Panel">
            <HomeIcon fontSize="inherit" />
          </Tooltip>
        </NavLink>
      </li>
      <li className="flex align-middle">
        <NavLink to="schedules">
          <Tooltip title="Schedules">
            <AccessTimeIcon fontSize="inherit" />
          </Tooltip>
        </NavLink>
      </li>
      <li className="flex align-middle">
        <NavLink to="school">
          <Tooltip title="Schooling">
            <SchoolIcon fontSize="inherit" />
          </Tooltip>
        </NavLink>
      </li>
      <li className="flex align-middle">
        <NavLink to="health">
          <Tooltip title="Health">
            <LocalHospitalIcon fontSize="inherit" />
          </Tooltip>
        </NavLink>
      </li>
      <li className="flex align-middle">
        <NavLink to="hobbies">
          <Tooltip title="Hobbies & Freetime">
            <SportsTennisIcon fontSize="inherit" />
          </Tooltip>
        </NavLink>
      </li>
    </ul>
  );
};

export default AppIconsNavList;
