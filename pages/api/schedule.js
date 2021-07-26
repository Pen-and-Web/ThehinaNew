import connectDB from "../../middleware/mongodb";
import Schedule from "../../models/schedule";
import Appointment from "../../models/appointment";
import Activity from "../../models/activities";
import User from "../../models/user";
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

const schedule = async (req, res) => {
  if (req.method === "POST") {
    const { consultantId, subject, startDate, endDate } = req.body;

    try {
      const check = await Schedule.find({ consultantId, startDate, endDate });
      console.log("Check: ", check);
      if (check.length) {
        res.status(404).json({ message: "Slot overlap error" });
      } else {
        var newSchedule = new Schedule({
          consultantId,
          subject,
          startDate,
          endDate,
        });
        console.log("newSchedule :", newSchedule);
        let user = await User.findById({ _id: consultantId });
        console.log(user, "usercreated");
        var newActivity = new Activity({
          message: `${user.name} created an appointment slot.`,
        });
        await newActivity.save();
        var schedulecreated = await newSchedule.save();
        //console.log(schedulecreated, "usercreated");
        let schedule = await Schedule.find({ consultantId });

        var mailAdmin = {
          from: "testusapp12@gmail.com",
          to: "thehinaa@gmail.com",
          // to: "official.farhanbhatti@gmail.com",
          subject: "Thehina: Update",
          html: `<h1>Activity</h1><p>${user.name} created an appointment slot.</p>`,
        };

        transporter.sendMail(mailAdmin, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res.status(200).json({
          schedule,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (req.method === "GET") {
    const consultantId = req.query.consultantId;

    try {
      let schedule = await Schedule.find({ consultantId });
      if (schedule) {
        res.status(200).json({
          schedule: schedule,
        });
      } else {
        res.status(404).json({
          message: "Data Not Found!",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (req.method === "PUT") {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    //console.log("Request.Body: ", req.body);

    const scheduleId = req.query.scheduleId;
    const consultantId = req.query.consultantId;

    console.log("Check 1");
    const appointment = await Appointment.findOne({ slotId: scheduleId });
    console.log("Check 2");
    console.log("Appointment: ", appointment);
    if (appointment !== null) {
      await Appointment.findOneAndUpdate(
        { slotId: scheduleId },
        { startDate: req.body.startDate, endDate: req.body.endDate }
      );

      let date = req.body.startDate.split("T", 1);
      let startTime = req.body.startDate.split("T").slice(1);
      let endTime = req.body.endDate.split("T").slice(1);

      var newActivity = new Activity({
        message: `Meeting of ${appointment.clientData.name} with ${appointment.consultantData.name} was rescheduled!`,
      });
      await newActivity.save();

      const client = await User.findById({
        _id: appointment.clientData.clientId,
      });

      var mailClient = {
        from: "testusapp12@gmail.com",
        to: client.email,
        // to: "official.farhanbhatti@gmail.com",
        subject: "Thehina: Appointment",
        html: `<h1>Schedule Updated</h1><p>We are sorry for the inconvenience, your Appointment was rescheduled on ${date}, from ${startTime} to ${endTime} </p>`,
      };

      transporter.sendMail(mailClient, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      var mailAdmin = {
        from: "testusapp12@gmail.com",
        to: "thehinaa@gmail.com",
        // to: "official.farhanbhatti@gmail.com",
        subject: "Thehina: Update",
        html: `<h1>Activity</h1><p>Meeting of ${appointment.clientData.name} with ${appointment.consultantData.name} was updated!</p>`,
      };

      transporter.sendMail(mailAdmin, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      await Schedule.findByIdAndUpdate(scheduleId, req.body, {
        useFindAndModify: false,
      }).then(async (data) => {
        if (!data) {
          res.status(404).json({
            message: `Cannot update Schedule with id=${scheduleId}. Maybe Schedule was not found!`,
          });
        } else {
          var newActivity = new Activity({
            message: `Meeting of ${appointment.clientData.name} with ${appointment.consultantData.name} was updated!`,
          });
          await newActivity.save();
          var mailAdmin = {
            from: "testusapp12@gmail.com",
            to: "thehinaa@gmail.com",
            // to: "official.farhanbhatti@gmail.com",
            subject: "Thehina: Update",
            html: `<h1>Activity</h1><p>Meeting of ${appointment.clientData.name} with ${appointment.consultantData.name} was updated!</p>`,
          };

          transporter.sendMail(mailAdmin, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.status(200).json({
            message: `Meeting of ${appointment.clientData.name} with ${appointment.consultantData.name} was updated!`,
          });
        }
      });
    } else {
      console.log("Check 3");
      await Schedule.findByIdAndUpdate(scheduleId, req.body, {
        useFindAndModify: false,
      }).then(async (data) => {
        if (!data) {
          res.status(404).json({
            message: `Cannot update Schedule with id=${scheduleId}. Maybe Schedule was not found!`,
          });
        } else {
          const consultant = await User.findById({ _id: consultantId });
          console.log("Consultant: ", consultant);
          var newActivity = new Activity({
            message: `Appointment slot created by ${consultant.name} was updated!`,
          });
          await newActivity.save();
          var mailAdmin = {
            from: "testusapp12@gmail.com",
            to: "thehinaa@gmail.com",
            // to: "official.farhanbhatti@gmail.com",
            subject: "Thehina: Update",
            html: `<h1>Activity</h1><p>Appointment slot created by ${consultant.name} was updated!</p>`,
          };

          transporter.sendMail(mailAdmin, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.status(200).json({
            message: "Appointment slot successfully updated!",
          });
        }
      });
    }
  } else if (req.method === "DELETE") {
    const { scheduleId, consultantId } = req.query;

    if (scheduleId) {
      await Schedule.findByIdAndDelete(scheduleId);
      if (consultantId) {
        let schedule = await Schedule.find({ consultantId });

        return res.status(200).json({
          schedule,
        });
      } else {
        let schedule = await Schedule.find();

        return res.status(200).json({
          schedule,
        });
      }
    } else {
      await Schedule.deleteMany();
      let schedule = await Schedule.find();

      return res.status(200).json({
        schedule,
      });
    }
  }
};

export default connectDB(schedule);
