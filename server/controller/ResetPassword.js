const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")

// ṛesetPasswordToken

exports.resetPasswordToken = async (req, res) => {
  try {
    // get email
    const { email } = req.body;

    // check user for this email, email validation
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your email is not registered with us",
      });
    }

    // generate token
    const token = crypto.randomUUID();

    // update user by adding token  and  expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // create url

    const url = `http://localhost:5173/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${url}`
    );

    res.status(200).json({
        success: true,
        message: "Email sent successfully, please check email and change  pwd"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(
        {
            success: false,
            message: "something went wrong while sending email"
        }
    )
  }
};

// resetPassword

exports.resetPassword = async(req, res) => {
    try {

        const {password, confirmPassword, token} = req.body
        
        if(password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password not matching"
            })
        }


        // get user details form db using toke
        const userDetails = await User.findOne({token: token})
        
        if(!userDetails) {
            return res.json({
                success: false,
                message: "Token is invalid"
            })
        }
        
        // token time check
        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired, please regenerate your token"
            })
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password
        await User.findOneAndUpdate({token: token}, {password: hashedPassword},{new: true})

        res.status(200).json(
            {
                success: true,
                message: "password reset successfully"
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: ""
        })
    }
}