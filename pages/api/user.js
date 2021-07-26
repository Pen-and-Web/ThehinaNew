import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { removeFile } from "../../functions/removeFile";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testusapp12@gmail.com",
    pass: "Test@123",
  },
});

const user = async (req, res) => {
  if (req.method === "PATCH") {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    const id = req.query.id;
    const user = await User.findById(id);
    //console.log("User: ", user);
    var mailOptions;
    if (req.body?.status !== undefined) {
      if (req.body.status === true) {
        mailOptions = {
          from: "testusapp12@gmail.com",
          to: user.email,
          subject: "Thehina: Information",
          html: "<h1>Information</h1><p>You have been approved by the Admin. You can login to proceed.</p>",
        };
      } else if (req.body.status === false) {
        console.log("False");
        mailOptions = {
          from: "testusapp12@gmail.com",
          to: user.email,
          subject: "Thehina: Information",
          html: "<h1>Information</h1><p>You have been suspended/disapproved by the Admin.</p>",
        };
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({ message: "User was updated successfully!" });
      }
    });
  } else {
    if (req.method === "GET") {
      const id = req.query.id;
      const role = req.query.role;

      if (role) {
        let user = await User.find({ role });
        if (user) {
          res.status(200).json({
            user: user,
          });
        } else {
          res.status(404).json({
            message: "User Not Found!",
          });
        }
      } else if (id) {
        let user = await User.findById(id);
        if (user) {
          res.status(200).json({
            user: user,
          });
        } else {
          res.status(404).json({
            message: "User Not Found!",
          });
        }
      } else {
        let user = await User.find();
        res.status(200).json({
          user: user,
        });
      }
    } else {
      if (req.method === "DELETE") {
        // const id = req.query.id;
        // const role = req.query.role;

        const { id, role } = req.query;

        if (id) {
          const userInfo = await User.findById(id);
          if (userInfo) {
            const { imageUrl } = userInfo;
            if (imageUrl) {
              removeFile(imageUrl);
            }
          }
          await User.findByIdAndDelete(id);
          if (role) {
            let users = await User.find({ role });

            return res.status(200).json({
              users: users,
            });
          } else {
            let users = await User.find();

            return res.status(200).json({
              users: users,
            });
          }
        } else {
          await User.deleteMany();
          let users = await User.find();

          return res.status(200).json({
            users: users,
          });
        }
      } else {
        return res
          .status(422)
          .json({ message: "Request Method Not Supported!" });
      }
    }
  }
};

export default connectDB(user);
