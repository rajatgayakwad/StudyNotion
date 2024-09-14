import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "./../Upload";
import IconBtn from "../../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (edit || view) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValue = getValues();
    if (
      currentValue.lectureTitle !== modalData.title ||
      currentValue.lectureDesc !== modalData.description ||
      currentValue.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        handleEditSubSection();
      }

      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid  h-screen w-screen place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg p-5 bg-richblack-700" >
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"}  {add && "Adding"}  {edit && "Editing"} Lecture{" "}
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 className="text-2xl text-richblue-5" />
          </button>
        </div>

        <form  className="space-y-8 px-8 py-10" onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name={"lectureVideo"}
            label={"Lecture Vide"}
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="flex flex-col space-y-2" >
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title
            </label>
            <input
                disabled={view || loading}
              type="text"
              id="lectureTitle"
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="bg-richblack-700 p-3 w-full rounded-lg text-richblack-5 outline-none"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>

          {/* lecture description */}
          <div className="flex flex-col gap-2" >
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter lecture description"
              {...register("lectureDesc", { required: true })}
              className="bg-richblack-700 p-3 w-full  resize-x-none min-h-[130px] rounded-lg text-richblack-5 outline-none"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture description is required
              </span>
            )}
          </div>

          {!view && (
            <div>
              <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              ></IconBtn>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
