import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/operations/SettingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];
const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = (data) => {
    // console.log("form data", data);
   try {
    dispatch(updateProfile(token, data))
   } catch (error) {
    console.log("ERROR MESSAGE - ", error.message)
   }
  };
  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="flex flex-col gap-4 justify-between bg-richblack-800 p-10 rounded-md border border-richblack-700">
        <h1 className="text-lg text-richblack-5 font-semibold">
          Personal Information
        </h1>

        <div className="flex items-center justify-between w-full gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="firstName" className="text-richblack-5">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name...."
              className="bg-richblack-700 p-3 w-full rounded-lg flex-1 text-richblack-5 outline-none"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your first name.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="lastName" className="text-richblack-5">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name...."
              className="bg-richblack-700 p-3 flex-1  rounded-lg text-richblack-5 outline-none"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
          </div>
          {errors.lastName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your first name.
            </span>
          )}
        </div>

        <div className="flex items-center justify-between w-full gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="dateOfBirth" className="text-richblack-5">
              Date Of Birth
            </label>
            <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
               className="bg-richblack-700 p-3 outline-none rounded-lg text-richblack-5"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />

            {errors.dateOfBirth && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="gender" className="text-richblack-5">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="bg-richblack-700 p-3 outline-none rounded-lg text-richblack-5"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((ele, i) => (
                <option value={ele} key={i}>
                  {" "}
                  {ele}{" "}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Date of Birth.
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="contactNumber" className="text-richblack-5">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number...."
              className="bg-richblack-700 p-3 w-full rounded-lg flex-1 text-richblack-5 outline-none"
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number.",
                },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.contactNumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="about" className="text-richblack-5">
              About
            </label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter BIO Details...."
              className="bg-richblack-700 p-3 flex-1  rounded-lg text-richblack-5 outline-none"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your About.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-x-8 mt-5 justify-end">
        <button
          type="button"
          className="bg-richblack-600 font-semibold text-richblack-100 py-3 px-4 rounded-lg"
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
        >
          {" "}
          Cancel{" "}
        </button>
        <button
          type="submit"
          className="bg-yellow-50 text-black font-semibold py-3 px-4 rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
