import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button"
import HighlightText from "./HighlightText";
import Instructor from "../../../assets/Images/Instructor.png"

const InstructorSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-20 mt-16" >
      <div className="" >
        <img src={Instructor} alt="" className="shadow-[-16px_-12px_0px_0px_]" />
      </div>

      <div className="flex flex-col gap-8 items-start">
        <div className="text-4xl font-bold w-[50%]" >
          Become an <HighlightText text={"instructor"} />
        </div>

        <div className="text-[16px] text-richblack-300" >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In aliquid
          eligendi minus amet ut nemo quo ex nostrum corporis soluta hic quas
          ipsa, provident laboriosam?
        </div>

        <div className="">
          <CTAButton active={true}>
            <div className="flex gap-2 items-center">
              Start Teaching Today <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
