/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import { useUsers } from "../../contexts/UsersContext";

import ProfessionalRow from "../../components/ProfessionalRow";
import TeacherCard from "../../components/TeacherCard";

const SchoolView = () => {
  const { currentTeachers, getTeachers } = useUsers();

  const [showDetailsIsOpen, setShowDetailsIsOpen] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState(null);

  useEffect(() => {
    getTeachers();
  }, []);

  const showDetails = (id) => {
    if (id) {
      const teacher = currentTeachers.filter((teacher) => teacher.id === id)[0];
      setTeacherDetails(teacher);
      setShowDetailsIsOpen(true);
    } else {
      setShowDetailsIsOpen(false);
      setTeacherDetails(null);
    }
  };

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Children&apos;s Education</h1>
        <div className="grid grid-cols-2 gap-5">
          {!currentTeachers && null}
          <div className="mt-10 p-5">
            <h2 className="mb-5">Teachers</h2>
            <ul className="mt-2 flex flex-col gap-5 p-5">
              {currentTeachers.map((teacher) => (
                <ProfessionalRow
                  key={teacher.id}
                  professional={teacher}
                  handler={showDetails}
                />
              ))}
            </ul>
          </div>
          {showDetailsIsOpen && teacherDetails && (
            <TeacherCard teacher={teacherDetails} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SchoolView;
