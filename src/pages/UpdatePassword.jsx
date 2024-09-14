import React, { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
//   const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="grid min-h-[calc(100vh - 3.5rem)] place-items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className=" max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new Password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {" "}
            Almost done. Enter your new password and youre all set.
          </p>

          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>{" "}
              </p>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handleOnChange}
                name="password"
                placeholder="new password"
                className="p-3 rounded-lg bg-richblack-800 outline-none text-richblack-50 border w-full border-richblack-800"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiFillEyeInvisible className="text-lg" />
                ) : (
                  <AiFillEye className="text-lg" />
                )}
              </span>
            </label>

            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>{" "}
              </p>
              <input
                type={setShowConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={handleOnChange}
                name="confirmPassword"
                placeholder="confirm password"
                className="p-3 rounded-lg bg-richblack-800 outline-none text-richblack-50 border w-full border-richblack-800"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (
                  <AiFillEyeInvisible className="text-lg" />
                ) : (
                  <AiFillEye className="text-lg" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50  py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to={"/login"}>
              <p className="text-richblack-5 flex items-center gap-x-2">
                {" "}
                <AiOutlineArrowLeft /> Back to login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
