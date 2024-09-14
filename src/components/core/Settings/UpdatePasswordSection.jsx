import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../services/operations/SettingsAPI";

const UpdatePasswordSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = (data) => {
    // console.log(data);
    try {
        dispatch(changePassword(token, data))
    } catch (error) {
        console.log(error.message)
    }

  };
  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="flex flex-col gap-4 justify-between bg-richblack-800 p-10 rounded-md border border-richblack-700">
        <h1 className="text-lg text-richblack-5 font-semibold">Password</h1>

        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-richblack-5" htmlFor="oldPassword">
              {" "}
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="bg-richblack-700 p-3 w-full rounded-lg flex-1 text-richblack-5 outline-none"
              placeholder="Enter old password"
              {...register("oldPassword", { required: true })}
            />
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Current Password.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-richblack-5" htmlFor="oldPassword">
              {" "}
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="bg-richblack-700 p-3 w-full rounded-lg flex-1 text-richblack-5 outline-none"
              placeholder="Enter new password"
              {...register("newPassword", { required: true })}
            />
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your New Password.
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

export default UpdatePasswordSection;
