import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../services/operations/SettingsAPI";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      console.log("uploading....");
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  // console.log(imageFile)

  return (
    <div>
      <div className="flex items-center justify-between bg-richblack-800 p-10 rounded-md border border-richblack-700">
        <div className="flex items-center gap-4">
          <img
            src={ previewSource || user?.image}
            alt=""
            className=" aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg text-richblack-5">Change profile picture</p>
            <div className="flex  gap-5">
              <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                className="bg-richblack-700 text-richblack-100 py-3 px-4 rounded-lg font-semibold"
              >
                Select
              </button>
              <button
                onClick={handleFileUpload}
                className="bg-yellow-50 flex items-center gap-2 text-black py-3 px-4 rounded-lg font-semibold"
              >
                {
                    loading ? "Uploading..." : "Upload"
                }
                {
                    !loading && (
                        <FiUpload className="text-lg" />
                    )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
