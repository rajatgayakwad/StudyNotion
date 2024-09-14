import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authApi";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div className="flex items-center justify-center text-white h-[80vh]">
      {loading ? (
        <div></div>
      ) : (
        <div className="max-w-[450px] mx-auto flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>

          <p className="text-lg text-richblack-300">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col w-full">
            {!emailSent && (
              <label>
                <p className="text-sm mb-1 text-richblack-50">
                  Email Address <span className="text-[#df3232]">*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="p-3 rounded-lg bg-richblack-800 border w-full border-richblack-800"
                />
              </label>
            )}

            <button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div>
            <Link to={"/login"}>
              <p className="flex items-center gap-2">
                {" "}
                <IoArrowBack /> Back to login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
