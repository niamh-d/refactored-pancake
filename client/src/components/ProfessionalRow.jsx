/* eslint-disable react/prop-types */

import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const ProfessionalRow = ({ professional, handler }) => {
  const { firstName, lastName, id } = professional;

  const workplaceName = professional.clinicName || professional.schoolName;

  const clickHandler = () => handler(id);

  return (
    <li className="flex gap-3 items-center">
      <span className="font-semibold uppercase tracking-wider">{lastName}</span>
      <span> {firstName}</span>
      <button className="btn btn-accent btn-sm" onClick={clickHandler}>
        <Tooltip title="Open details">
          <InfoIcon style={{ fill: "white" }} />
        </Tooltip>
        {workplaceName}
      </button>
    </li>
  );
};

export default ProfessionalRow;
