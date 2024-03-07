/* eslint-disable react/prop-types */
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const Doctor = ({ doctor, handler }) => {
  const { firstName, lastName, clinicName, id } = doctor;

  const clickHandler = () => handler(id);

  return (
    <li className="flex gap-3 items-center">
      <span className="font-semibold uppercase tracking-wider">{lastName}</span>
      <span> {firstName}</span>
      <button className="btn btn-info btn-sm" onClick={clickHandler}>
        <Tooltip title="Open details">
          <InfoIcon />
        </Tooltip>
        {clinicName}
      </button>
    </li>
  );
};

export default Doctor;
