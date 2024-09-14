import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { BiSolidEdit } from "react-icons/bi";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-white flex flex-col gap-10 w-11/12 mx-auto overflow-auto">
      <h1 className="text-3xl">My Profile</h1>

      {/* section 1 */}
      <div className="flex items-center justify-between bg-richblack-800 p-10 rounded-md border border-richblack-700">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className=" aspect-square w-[78px] rounded-full object-cover "
          />
          <div className="flex gap-1 flex-col">
            <p className="text-xl font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text={"Edit"}
          onClick={() => {
            navigate("/dashboard/settings");
          }}
        >
          {" "}
          <BiSolidEdit />{" "}
        </IconBtn>
      </div>

      {/* section - 2 */}

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">About</h1>
          <IconBtn
            text={"Edit"}
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            {" "}
            <BiSolidEdit />{" "}
          </IconBtn>
        </div>
        <p className="text-richblack-300">
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* section - 3 */}

      <div className="flex flex-col  bg-richblack-800 p-10 rounded-md border border-richblack-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Personal Details</h1>
          <div>
            <IconBtn
              text={"Edit"}
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            >
              {" "}
              <BiSolidEdit />{" "}
            </IconBtn>
          </div>
        </div>

        <div className="w-[50%] flex flex-col justify-between gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-richblack-300 text-sm">First Name</p>
              <p className="text-richblack-5">{user?.firstName}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-richblack-300 text-sm">last Name</p>
              <p className="text-richblack-5">{user?.lastName}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-richblack-300 text-sm">Email</p>
              <p className="text-richblack-5">{user?.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-richblack-300 text-sm">Phone Number</p>
              <p className="text-richblack-5">
                {user.additionalDetails?.contactNumber ?? "Add Contact No."}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-richblack-300 text-sm">Gender</p>
              <p className="text-richblack-5">
                {user.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-richblack-300 text-sm">Date Of Birth</p>
              <p className="text-richblack-5">
                {user.additionalDetails?.dateOfBirth ?? "Add DOB"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
