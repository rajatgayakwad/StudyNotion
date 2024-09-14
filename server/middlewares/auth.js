const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

// auth

exports.auth = async (req, res, next) => {
  try {
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      messagee: "Something went wrong while validating the token",
    });
  }
};

// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students only",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      messagee: "User role can not be verified, please try again",
    });
  }
};

// isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      messagee: "User role can not be verified, please try again",
    });
  }
};

// isAdmin

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "User role can not be verified, please try again",
    });
  }
};
