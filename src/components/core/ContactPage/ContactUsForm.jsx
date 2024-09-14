import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CountryCode from "../../../data/countrycode.json";
import { apiconnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    console.log("DATA CONTACT US", data);

    try {
      setLoading(true);
      const response = await apiconnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      //   const response = { status: "OK" };
      console.log("CONTACT FORM RESPONSE", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* firstname */}
          <div className="flex flex-col flex-1">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              {...register("firstName", { required: true })}
              className="p-3 rounded-lg bg-richblack-700 outline-none"
            />
            {errors.firstName && <span>Please enter your name</span>}
          </div>

          {/* last name */}
          <div className="flex flex-col flex-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              {...register("lastName", { required: true })}
              className="p-3 rounded-lg bg-richblack-700 outline-none"
            />
            {errors.lastName && <span>Please enter your name</span>}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter last name"
            {...register("email", { required: true })}
            className="p-3 rounded-lg bg-richblack-700 outline-none"
          />
          {errors.email && <span>Please enter your email</span>}
        </div>

        <div>
          <label htmlFor="phoneNo">Phone Number</label>
          <div className="flex items-center gap-4">
            <select
              className="bg-richblack-700 w-[14%] outline-none p-3 rounded-lg"
              name="dropdown"
              id="dropdown"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, idx) => (
                <option className="bg-richblack-700" value={ele.code} key={idx}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="p-3 rounded-lg flex-1 bg-richblack-700 outline-none"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter phone number" },
                maxLength: { value: 10, message: "Invalid phone number" },
                minLength: { value: 8, message: "Invalid phone number" },
              })}
            />
          </div>
          {errors.phoneNo && errors.phoneNo.message}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            className="p-3 w-full rounded-lg bg-richblack-700 outline-none"
            rows={7}
            {...register("message", { required: true })}
            placeholder="Enter you message here..."
          ></textarea>
          {errors.message && <span>Please enter your message</span>}
        </div>

        <button
          type="submit"
          className="bg-yellow-100 text-black font-semibold p-3 w-full rounded-lg"
        >
          Send message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
