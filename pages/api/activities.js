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

const activities = async (req, res) => {
  if (req.method === "POST") {
  } else if (req.method === "GET") {
    try {
      let activities = await Activity.find();
      if (activities) {
        res.status(200).json({
          activities,
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
  } else if (req.method === "DELETE") {
  }
};

export default connectDB(activities);
