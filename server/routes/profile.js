const express = require("express")
const { auth, isInstructor } = require("../middlewares/auth")
const {deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard} = require("../controller/Profile")

const router = express.Router()

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

// get enrolled course
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router