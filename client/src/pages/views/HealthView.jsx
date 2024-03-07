/* eslint-disable react/jsx-key */
import { useEffect } from "react";

import { useUsers } from "../../contexts/UsersContext";

import Doctor from "../../components/Doctor";

const HealthView = () => {
  const { currentDoctors, getDoctors } = useUsers();

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Children&apos;s Health</h1>
        {!currentDoctors && null}
        <div className="mt-10 p-10">
          <h2>Doctors</h2>
          <ul className="mt-5">
            {currentDoctors.map((doctor) => (
              <Doctor key={doctor.id} doctor={doctor} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HealthView;
