import React, { useState } from "react";

import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../../services/operations/authApi";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="text-white mt-12">Loading...</div>;
  }
  return (
    <div className="" >
      <div className="h-full min-w-[222px] flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 text-richblack-300 ">
        <div className="flex flex-col">
          {sidebarLinks.map((link, i) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLinks key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        <div className="flex flex-col ">
          <SidebarLinks
            link={{ name: "Setting", path: "dashboard/settings" }}
            iconName={"VscSettingsGear"}
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="font-medium text-sm text-richblack-300 px-8 py-2"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>


      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  );
};

export default Sidebar;
