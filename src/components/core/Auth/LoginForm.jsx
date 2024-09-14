import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authApi";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="lg:w-[30vw]">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2">
        <label>
          <p className="text-richblack-300">
            Email address <span className="text-[#e73434]">*</span>
          </p>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            name="email"
            placeholder="Enter email "
            className="p-3 bg-richblack-800 rounded-lg w-full text-richblack-5"
          />
        </label>
        <label>
          <p className="text-richblack-300">
            Password <span className="text-[#e73434]">*</span>
          </p>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            name="password"
            placeholder="Enter password"
            className="p-3 bg-richblack-800 rounded-lg w-full text-richblack-5"
          />
        </label>
        <Link to={"/forgot-password"}>
          <p className="text-richblue-200 text-sm text-end mb-3">
            Forgot Password
          </p>
        </Link>

        <button
          type="submit"
          className="bg-[#f8f00b] w-full p-3 rounded-full font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
