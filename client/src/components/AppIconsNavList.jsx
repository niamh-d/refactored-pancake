/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import Diversity1Icon from "@mui/icons-material/Diversity1";

import { useUsers } from "../contexts/UsersContext";

const AppIconsNavList = () => {
  const { currentUser } = useUsers();

  const { adminFamily, family } = useUsers();

  return (
    <ul className="flex gap-20 justify-around text-4xl icons-nav">
      <li className="flex align-middle">
        <NavLink to="profile">
          <Tooltip title="Profile">
            <PersonIcon fontSize="inherit" />
          </Tooltip>
        </NavLink>
      </li>
      {family && !adminFamily && (
        <li className="flex align-middle">
          <NavLink to="admin">
            <Tooltip title="Admin Panel">
              <HomeIcon fontSize="inherit" />
            </Tooltip>
          </NavLink>
        </li>
      )}
      <li className="flex align-middle">
        <NavLink to="family">
          <Tooltip title="Family">
            <Diversity1Icon fontSize="inherit" />
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
