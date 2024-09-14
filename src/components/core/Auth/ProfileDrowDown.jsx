import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authApi";

const ProfileDrowDown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;
  return (
    <button className=" relative text-white" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-2">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className=" aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800" >
          <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div onClick={() => {
            setOpen(false)
            dispatch(logout(navigate))
          }} className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:ring-richblack-700 hover:text-richblack-25">
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDrowDown;
