import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const TimelineSection = () => {
  const timeline = [
    {
      Logo: Logo1,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo3,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo4,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
  ];
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => {
            return (
              <div key={index} className="flex flex-row gap-6 ">
                <div className="w-[50px] h-[50px] bg-white rounded-full justify-center p-2 flex items-center">
                  <img src={element.Logo} alt="" />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className=" font-semibold text-[18px]">
                    {element.heading}
                  </h1>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className=" shadow-blue-300 shadow-[-5px_0px_10px_0px_blue] ">
          <div className=" relative shadow-blue-300 shadow-[15px_0px_10px_0px_blue] ">
            <img
              src={timelineImage}
              alt=""
              className=" object-cover h-fit shadow-[12px_7px_0px_0px_white]"
            />

            <div className=" absolute  left-[50%] translate-x-[-50%] translate-y-[-50%] bg-caribbeangreen-700 flex  gap-8 flex-col md:flex-row text-white uppercase py-10">
              <div className="flex gap-5 items-center md:border-r border-caribbeangreen-300 px-7">
                <p className="text-3xl font-bold">10</p>
                <p className="text-caribbeangreen-300 text-sm">
                  Years of Experience
                </p>
              </div>
              <div className="flex gap-5 items-center px-7  ">
                <p className="text-3xl font-bold">250</p>
                <p className="text-caribbeangreen-300 text-sm">
                  Type of courses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
