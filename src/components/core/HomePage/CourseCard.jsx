import React from "react";
import { RiGroupFill } from "react-icons/ri";
import { FaNetworkWired } from "react-icons/fa6";

const CourseCard = ({ cardData, setCurrentCard, currentCard }) => {
  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`p-7  bg-richblack-800 max-w-[320px] flex flex-col gap-3 ${
        currentCard === cardData.heading ? "bg-white text-black shadow-[8px_12px_0px_0px_rgba(255,214,10)]" : ""
      } `}
    >
      <h1
        className={`${
          currentCard === cardData.heading ? "text-balck " : ""
        } font-semibold `}
      >
        {cardData.heading}
      </h1>
      <p className="text-richblack-200"> {cardData.description} </p>
      <div
        className={`flex justify-between  ${
          currentCard === cardData.heading
            ? "text-richblue-200"
            : "text-richblack-200"
        } `}
      >
        <p className="flex items-center gap-2" > <RiGroupFill/> {cardData.level}</p>
        <p className="flex items-center gap-2" > <FaNetworkWired/> Lessons</p>
      </div>
    </div>
  );
};

export default CourseCard;
