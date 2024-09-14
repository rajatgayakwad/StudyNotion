import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "./../../../../common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NastedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleleSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      const updateCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updateCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null);
  };

  return (
    <div>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nastedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center cursor-pointer justify-between border-b-2 border-richblack-600 py-2">
              <div className=" flex items-center gap-x-3">
                <RxDropdownMenu className="text-richblue-50 text-2xl" />
                <p className="text-richblue-50 font-semibold">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3 text-richblack-50">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit />
                </button>

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line />
                </button>

                <span className="text-richblack-50">|</span>
                <BiSolidDownArrow className={`text-xl text-richblack-300`} />
              </div>
            </summary>

            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?.id}
                  className="flex cursor-pointer py-2 border-richblack-600 items-center justify-between gap-x-3 border-b-2"
                  onClick={() => setViewSubSection(data)}
                >
                  <div className=" flex items-center gap-x-3">
                    <RxDropdownMenu className="text-richblue-50 text-2xl" />
                    <p className="text-richblue-50 font-semibold ">
                      {data.title}
                    </p>
                  </div>

                  <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-x-3 text-richblack-50">
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit />
                    </button>

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleleSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Lecture to Section */}

              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : (
        <div></div>
      )}

      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NastedView;
