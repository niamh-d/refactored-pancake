/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import { useUsers } from "../../contexts/UsersContext";

import Doctor from "../../components/Doctor";
import DoctorCard from "../../components/DoctorCard";

const HealthView = () => {
  const { currentDoctors, getDoctors } = useUsers();

  const [showDeatilsIsOpen, setShowDeatilsIsOpen] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    getDoctors();
  }, []);

  const showDetails = (id) => {
    if (id) {
      const doc = currentDoctors.filter((doc) => doc.id === id)[0];
      setDoctorDetails(doc);
      setShowDeatilsIsOpen(true);
    } else {
      setShowDeatilsIsOpen(false);
      setDoctorDetails(null);
    }
  };

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Children&apos;s Health</h1>
        <div className="grid grid-cols-2 gap-5">
          {!currentDoctors && null}
          <div className="mt-10 p-5">
            <h2>Doctors</h2>
            <ul className="mt-5 flex flex-col gap-5 p-5">
              {currentDoctors.map((doctor) => (
                <Doctor key={doctor.id} doctor={doctor} handler={showDetails} />
              ))}
            </ul>
          </div>
          {showDeatilsIsOpen && doctorDetails && (
            <DoctorCard doctor={doctorDetails} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HealthView;
