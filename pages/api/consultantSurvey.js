import connectDB from "../../middleware/mongodb";
import Schedule from "../../models/schedule";
import Appointment from "../../models/appointment";
import Activity from "../../models/activities";
import User from "../../models/user";
import ConsultantSurvey from "../../models/consultantSurvey";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testusapp12@gmail.com",
    pass: "Test@123",
  },
});

const consultantSurvey = async (req, res) => {
  if (req.method === "POST") {
    const {
      userId,
      appointmentId,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
      answer7,
    } = req.body;

    try {
      const check = await ConsultantSurvey.findOne({ appointmentId });
      console.log("Check: ", check);
      if (check) {
        res.status(201).json({ message: "Survey already submitted!" });
      } else {
        var newSurvey = new ConsultantSurvey({
          userId,
          appointmentId,
          "question1.answer": answer1,
          "question2.answer": answer2,
          "question3.answer": answer3,
          "question4.answer": answer4,
          "question5.answer": answer5,
          "question6.answer": answer6,
          "question7.answer": answer7,
        });
        console.log("newSurvey :", newSurvey);

        var newSurveycreated = await newSurvey.save();

        let user = await User.findById({ _id: userId });
        console.log("user:", user);

        var newActivity = new Activity({
          message: `${user.name}(${user.role}) submitted the survey!`,
        });
        await newActivity.save();

        var mailAdmin = {
          from: "testusapp12@gmail.com",
          to: "thehinaa@gmail.com",
          // to: "official.farhanbhatti@gmail.com",
          subject: "Thehina: Update",
          html: `<h1>Activity</h1><p>${user.name}(${user.role}) submitted the survey!</p>`,
        };

        transporter.sendMail(mailAdmin, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        var mailUser = {
          from: "testusapp12@gmail.com",
          to: user.email,
          // to: "official.farhanbhatti@gmail.com",
          subject: "Thehina: Survey",
          html: `<h1>Survey</h1><p>Thank you for taking out your time to submit the survey!</p>`,
        };

        transporter.sendMail(mailUser, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res.status(200).json({
          newSurveycreated,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (req.method === "GET") {
    const { surveyId } = req.query;

    try {
      if (surveyId) {
        let survey = await ClientSurvey.find({ surveyId });
        if (survey) {
          res.status(200).json({
            survey,
          });
        } else {
          res.status(404).json({
            message: "Survey Not Found!",
          });
        }
      } else {
        let survey = await ClientSurvey.find();
        res.status(200).json({
          survey,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  }
};

export default connectDB(consultantSurvey);
