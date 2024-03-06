import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUsers } from "../../contexts/UsersContext";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { currentUser, updateUserInformation } = useUsers();

  const BASE_SOURCE = "../../imgs/users/";

  const { firstName, lastName, gender, pronouns, sex, dob, photoSource } =
    currentUser;

  const firstNameInputRef = useRef(firstName);
  const lastNameInputRef = useRef(lastName);
  const sexSelectRef = useRef(sex);
  const genderSelectRef = useRef(gender);
  const pronounsSelectRef = useRef(pronouns);

  const starterDate = new Date(dob);

  const [date, setDate] = useState(starterDate);

  const [fnInputValue] = useState(firstName);
  const [lnInputValue] = useState(lastName);
  const [sexSelectValue] = useState(sex);
  const [genderSelectValue] = useState(gender);
  const [pronounsSelectValue] = useState(pronouns);

  function handleSubmit(e) {
    console.log(genderSelectRef.current.value);
    e.preventDefault();

    const credentials = {
      firstName: firstNameInputRef.current.value.trim(),
      lastName: lastNameInputRef.current.value.trim(),
      dob: date.toISOString().substring(0, 10),
      sex: sexSelectRef.current.value,
      gender: genderSelectRef.current.value,
      pronouns: pronounsSelectRef.current.value,
    };

    updateUserInformation(credentials);
    navigate(-1);
  }

  return (
    <div className="p-5 mt-10 ml-10">
      <h1>Edit Profile</h1>
      <div className="grid-cols-3 grid gap-2 p-10">
        <img
          alt="user image"
          src={`${BASE_SOURCE}${photoSource}.jpeg`}
          className="rounded-lg opacity-85 w-3/4"
        />
        <form onSubmit={handleSubmit} className="form-control mt-5 p-10">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="first-name" className="label">
                  First name
                </label>
                <input
                  type="text"
                  defaultValue={fnInputValue}
                  id="first-name"
                  ref={firstNameInputRef}
                  className="input input-bordered w-36"
                />
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
                  className="input input-bordered w-36"
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
                  defaultValue={genderSelectValue}
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Non-binary</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="last-name" className="label">
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  defaultValue={lnInputValue}
                  ref={lastNameInputRef}
                  className="input input-bordered w-36"
                />
              </div>
              <div>
                <label htmlFor="sex" className="label">
                  Sex
                </label>

                <select
                  className="select select-bordered max-w-xs text-lg"
                  type="text"
                  id="sex"
                  defaultValue={sexSelectValue}
                  ref={sexSelectRef}
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="pronouns" className="label">
                  Pronouns
                </label>

                <select
                  className="select select-bordered max-w-xs text-lg"
                  type="text"
                  id="pronouns"
                  defaultValue={pronounsSelectValue}
                  ref={pronounsSelectRef}
                >
                  <option value="0">He/him</option>
                  <option value="1">She/her</option>
                  <option value="2">They/Them</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button type="submit" className="btn btn-primary text-lg">
              Confirm details
            </button>
            <button
              type="button"
              className="btn btn-ghost ml-5"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
