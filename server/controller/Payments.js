const { instance } = require("../config/razorpay");

const Course = require("../model/Course");
const User = require("../model/User");
const { paymentSuccessEmail } = require("../mail/template/paymentSuccessEmail");
const crypto = require("crypto")

const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/template/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const CourseProgress = require("../model/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;

  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await enrolledStudents(courses, userId, res);

    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }

  return res.status(200).json({
    success: false,
    message: "Payment Failed",
  });
};

const enrolledStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide data for courses or userId",
    });
  }

  for (const courseId of courses) {
    try {
      //find the course and enrolled the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }


      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: []
      })

      // find the student and add the course to their list of the enrolled course
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id
          },
        },
        { new: true }
      );

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      // console.log("Email sent successfully", emailResponse.response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

// // capture payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {
//   // get courseId and userId
//   const { course_id } = req.body;
//   const userId = req.user.id;

//   if (!course_id) {
//     return res.json({
//       success: false,
//       message: "Please valid course ID",
//     });
//   }

//   // valid course Details
//   let course;
//   try {
//     course = await Course.findById(course_id);
//     if (!course) {
//       return res.json({
//         success: false,
//         message: "could not find the course",
//       });
//     }

//     // user already pay for same course
//     const uid = new mongoose.Schema.Types.ObjectId(userId);
//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "Student is already enrolled",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

//   // order create
//   const amount = course.price;
//   const currency = "INR";

//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId: course_id,
//       userId,
//     },
//   };

//   try {
//     // initiate payment
//     const paymentresponse = await instance.orders.create(options);
//     console.log(paymentresponse);

//     res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentresponse.id,
//       currency: paymentresponse.currency,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Could not initiate order",
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   const webhookSecret = "12345678";

//   const signature = req.headers["x-razorpay-signature"];

//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     console.log("payment is authorised");

//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       // find the course and enroll the student in it

//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       );

//       if (!enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: "Course not found",
//         });
//       }

//       console.log(enrolledCourse);

//       //   find the student and add the course to their list enrolled course me
//       const enrolledStudent = await User.findOneAndUpdate(
//         { _id: userId },
//         {
//           $push: {
//             courses: courseId,
//           },
//         },
//         {
//           new: true,
//         }
//       );

//       console.log(enrolledStudent);

//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "Congratulations from Codehelp",
//         "Congratulations, you are onboarded into new codehelp course"
//       );

//       console.log(emailResponse);

//       res.status(200).json({
//         success: true,
//         message: "Signature verified and course added",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         sucess: false,
//         message: error.message,
//       });
//     }
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid request",
//     });
//   }
// };
