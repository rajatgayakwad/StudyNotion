import React from "react";

import frameImg from "../../../assets/Images/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, description1, description2, formType, image }) => {
  return (
    <div className=" mt-10 ">
      <div className="flex flex-col-reverse lg:flex-row p-3 justify-between items-center  max-w-[1260px]">
        <div className="flex flex-col max-w-[450px] mx-auto px-4 py-4  ">
          <h1 className="text-white text-4xl font-bold">{title}</h1>

          <p className="flex flex-col gap-1">
            <span className="text-richblack-300">{description1}</span>
            <span className=" italic font-mono text-richblue-300">{description2}</span>
          </p>

          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>

        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 ">
          <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img
            src={image}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Template;
