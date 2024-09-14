import React from "react";

const state = [
  {
    count: "5K",
    label: "Active Students",
  },
  {
    count: "10+", label: "Mentors"
  },
  {
    count: "200+",
    label: "Courses",
  },
  {
    count: "50+", label: "Awards"
  }
];
const StateComponent = () => {
  return <div className="bg-richblack-700" >
    {/* states */}
    <div className="flex flex-col max-w-[1260px] mx-auto w-11/12 text-white gap-10 justify-between" >
      <div className="grid grid-cols-2 md:grid-cols-4 text-center" >
        {
          state.map((data, idx) => (
            <div className="flex flex-col py-10" key={idx} >
              <h1 className="text-[30px] ring-richblack-5 font-bold" >{data.count}</h1>
              <h2 className=" font-semibold text-[16px] text-richblack-500">
                {data.label}
              </h2>
            </div>
          ))
        }
      </div>
    </div>
  </div>;
};

export default StateComponent;
