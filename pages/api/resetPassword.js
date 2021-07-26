import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testusapp12@gmail.com",
    pass: "Test@123",
  },
});

const resetPassword = async (req, res) => {
  if (req.method === "PATCH") {
    const email = req.body.email;

    let user = await User.findOne({ email });

    if (user) {
      const resetPasswordToken = crypto.randomBytes(32).toString("hex");
      console.log("Reset Password Token: ", resetPasswordToken);
      var mailOptions = {
        from: "testusapp12@gmail.com",
        to: email,
        subject: "Welcome to Thehina",
        html: `<h1>OTP</h1><p>${resetPasswordToken}</p>`,
      };
      await User.findOneAndUpdate({ email }, { resetPasswordToken })
        .then((data) => {
          console.log("data: ", data);
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res
                .status(404)
                .json({ message: "OTP could not be sent to your email!" });
            } else {
              console.log("Email sent: " + info.response);
              res
                .status(200)
                .json({ message: "OTP has been sent to your email address!" });
            }
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      return res
        .status(404)
        .json({ message: "User with this email does not exist!" });
    }
  } else if (req.method === "POST") {
    const { resetPasswordToken, email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      console.log("User: ", user);
      if (user.resetPasswordToken === resetPasswordToken) {
        if (password === confirmPassword) {
          let passwordhash = await bcrypt.hashSync(password, 10);

          await User.findOneAndUpdate(
            { email },
            { password: passwordhash, resetPasswordToken: "" }
          );

          res
            .status(200)
            .json({ message: "Your password is updated successfully!" });
        } else {
          res.status(406).json({
            message: "Your password does not match your confirm password!",
          });
        }
      } else {
        res.status(406).json({ message: "Invalid OTP!" });
      }
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  }
};

export default connectDB(resetPassword);
