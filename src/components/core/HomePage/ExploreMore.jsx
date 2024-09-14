import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const ExploreMore = () => {
  const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className=" relative  flex flex-col items-center gap-8 mb-5">
      <div className="font-bold text-4xl text-center">
        Unlock the <HighlightText text={"Power of Code"} />
      </div>

      <p className="text-center text-richblue-300 text-md">
        Learn to build anything You can imagine
      </p>

      <div className=" hidden  lg:flex items-center gap-2 p-2 w-fit  bg-richblack-800  rounded-full">
        {tabsName.map((element, index) => {
          return (
            <div
              key={index}
              className={` text-[16px] flex items-center gap-2 px-4 py-2 ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              }  rounded-full  transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[130px]"></div>

      <div className="flex flex-wrap items-center justify-center gap-8  lg:gap-10 lg:absolute lg:bottom-0 lg:translate-y-[50%]  lg:justify-between" >
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
