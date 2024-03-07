/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import { useUsers } from "../../contexts/UsersContext";

import ProfessionalRow from "../../components/ProfessionalRow";
import DoctorCard from "../../components/DoctorCard";

const HealthView = () => {
  const { currentDoctors, getDoctors } = useUsers();

  const [showDetailsIsOpen, setShowDetailsIsOpen] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const doctorTypes = [...new Set(currentDoctors.map((doc) => doc.doctorType))];

  useEffect(() => {
    getDoctors();
  }, []);

  const showDetails = (id) => {
    if (id) {
      const doc = currentDoctors.filter((doc) => doc.id === id)[0];
      setDoctorDetails(doc);
      setShowDetailsIsOpen(true);
    } else {
      setShowDetailsIsOpen(false);
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
            <h2 className="mb-5">Healthcare professionals</h2>

            {doctorTypes.map((type) => (
              <div className="mt-3">
                <h3>{type}</h3>
                <ul className="mt-2 flex flex-col gap-5 p-5">
                  {currentDoctors
                    .filter((doc) => doc.doctorType === type)
                    .map((doc) => (
                      <ProfessionalRow
                        key={doc.id}
                        professional={doc}
                        handler={showDetails}
                      />
                    ))}
                </ul>
              </div>
            ))}
          </div>
          {showDetailsIsOpen && doctorDetails && (
            <DoctorCard doctor={doctorDetails} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HealthView;
