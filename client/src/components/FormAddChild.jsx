/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUsers } from "../contexts/UsersContext";

const FormAddChild = ({ handler }) => {
  const { addChild } = useUsers();

  const firstNameInputRef = useRef(null);
  const genderSelectRef = useRef("1");

  const starterDate = new Date("2015-01-01");

  const [date, setDate] = useState(starterDate);

  async function handleSubmit(e) {
    e.preventDefault();

    const newChildDetails = {
      firstName: firstNameInputRef.current.value,
      gender: genderSelectRef.current.value,
      dob: date.toISOString().substring(0, 10),
    };

    addChild(newChildDetails);

    handler(false);

    firstNameInputRef.current.value = null;
  }
  return (
    <div className="p-10">
      <h2 className="mt-5">Add child</h2>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mt-5">
          <div>
            <label htmlFor="family-nickname" className="label">
              Child&apos;s first name
            </label>
            <input
              placeholder="type child's name here"
              type="text"
              id="first-name"
              ref={firstNameInputRef}
              className="input input-bordered"
            />
          </div>
          <div>
            <label htmlFor="gender" className="label">
              Gender
            </label>

            <select
              className="select select-bordered max-w-xs text-lg"
              type="text"
              id="gender"
              ref={genderSelectRef}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Non-binary</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="label">
              Date of birth
            </label>
            <DatePicker
              id="date"
              onChange={(date) => setDate(date)}
              selected={date}
              dateFormat="dd/MM/yyyy"
              className="input input-bordered"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-44 mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddChild;
