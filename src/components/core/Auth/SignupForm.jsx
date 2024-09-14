import React, { useState } from "react";
import Tab from "../../common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authApi";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    }

    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));

    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // console.log(accountType)

  // console.log(formData)
  return (
    <div className="">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <label>
            <p className="text-richblack-50">
              First Name <span className="text-[#ff000085]">*</span>
            </p>
            <input
              type="text"
              className="bg-richblack-800 p-3 w-full rounded-lg text-richblack-5 outline-none"
              placeholder="Enter first name"
              name="firstName"
              onChange={handleOnChange}
              value={firstName}
            />
          </label>
          <label>
            <p className="text-richblack-50">
              Last Name <span className="text-[#ff000085]">*</span>
            </p>
            <input
              type="text"
              className="bg-richblack-800 p-3 w-full rounded-lg text-richblack-5 outline-none"
              placeholder="Enter last name"
              name="lastName"
              onChange={handleOnChange}
              value={lastName}
            />
          </label>
        </div>

        <label>
          <p className="text-richblack-50">
            Email address <span className="text-[#ff000085]">*</span>
          </p>
          <input
            type="email"
            className="bg-richblack-800 p-3 w-full  rounded-lg text-richblack-5 outline-none"
            placeholder="Enter email"
            name="email"
            onChange={handleOnChange}
            value={email}
          />
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <label>
            <p className="text-richblack-50">
              Create Password <span className="text-[#ff000085]">*</span>
            </p>
            <input
              type="password"
              className="bg-richblack-800 p-3 w-full rounded-lg text-richblack-5 outline-none"
              placeholder="Enter password"
              name="password"
              onChange={handleOnChange}
              value={password}
            />
          </label>

          <label>
            <p className="text-richblack-50">
              Confirm Password <span className="text-[#ff000085]">*</span>
            </p>
            <input
              type="password"
              className="bg-richblack-800 p-3 w-full rounded-lg text-richblack-5 outline-none"
              placeholder="Enter confirm password"
              name="confirmPassword"
              onChange={handleOnChange}
              value={confirmPassword}
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
