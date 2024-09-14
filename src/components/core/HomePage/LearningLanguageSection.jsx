import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[140px] mb-16">
      <div className="flex flex-col gap-5 items-center justify-center ">
        <div className="text-4xl text-center font-semibold">
          Your Swiss knife for <HighlightText text={"learing any language"} />
        </div>

        <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col lg:flex-row items-center p-3  justify-center">
          <img
            src={know_your_progress}
            alt=""
            className=" object-contain lg:-mr-32 "
          />
          <img src={compare_with_others} alt="" className=" object-contain" />
          <img
            src={plan_your_lesson}
            alt=""
            className=" object-contain lg:-ml-36 "
          />
        </div>

        <div className=" w-fit">
          <CTAButton active={true} linkto={"/login"}>
            Learn more
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
