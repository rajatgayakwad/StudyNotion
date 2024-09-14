import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../services/operations/SettingsAPI";

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAccount = () => {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-4 justify-between bg-pink-900 p-10 rounded-md border-2 border-pink-700">
        <div className="flex items-start gap-5">
          <div className="bg-pink-700 aspect-square w-fit p-3 rounded-full">
            <FiTrash2 className="text-3xl text-pink-200" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-richblack-5">
              Delete Account
            </h2>
            <div className="w-3/5 text-pink-25">
              <p>Would you like to delete account?</p>
              <p>
                This account may contain Paid Courses. Deleting your account is
                permanent and will remove all the contain associated with it.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="w-fit cursor-pointer italic text-pink-300"
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
