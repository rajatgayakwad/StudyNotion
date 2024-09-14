import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import NastedView from "./NastedView";
import { BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true);

    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
      // console.log("edit", result)
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    // console.log(result)
    if (result) {
      // console.log("section result", result)
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblue-5" htmlFor="sectionName">
            Section name
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            placeholder="Add a section to build your course"
            className="bg-richblack-700 p-3 w-full rounded-lg text-richblack-5 outline-none"
            {...register("sectionName", { required: true })}
          />
          {errors.sectioName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        <div className="mt-10 flex items-end gap-x-4">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit a section" : "Create section"}
            outline={true}
            customClasses={"text-yellow-50"}
          >
            <GrAddCircle size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className=" underline text-richblack-300 text-sm"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NastedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          onClick={goBack}
        >
          Back
        </button>
        <IconBtn text={"Next"} onClick={goToNext}>
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
