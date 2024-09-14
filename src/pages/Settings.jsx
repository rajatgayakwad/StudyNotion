import React from "react";

import ChangeProfilePicture from "../components/core/Settings/ChangeProfilePicture";
import EditProfile from "../components/core/Settings/EditProfile";
import UpdatePasswordSection from "../components/core/Settings/UpdatePasswordSection";
import DeleteAccount from "../components/core/Settings/DeleteAccount";

const Settings = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl text-richblack-5">Edit Profile</h1>

      {/* section 1 */}
      <ChangeProfilePicture />

      {/* section 2 */}
      <EditProfile />

      {/* section - 3 */}
      <UpdatePasswordSection />

      {/* section - 4 */}
      <DeleteAccount/>
    </div>
  );
};

export default Settings;
