import connectDB from "../../middleware/mongodb";
import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
const formidable = require("formidable");
import fs from "fs";
import { removeFile } from "../../functions/removeFile";

const form = formidable({ multiples: false });
// const form = new formidable.IncomingForm();

// const register = nextConnect();
// register.use(middleware);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testusapp12@gmail.com",
    pass: "Test@123",
  },
});

let uniqueFileName = null;

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  uniqueFileName = `${Date.now()}-${file.name}`;
  console.log(uniqueFileName, "NAME FILE");
  fs.writeFileSync(`./public/uploads/${uniqueFileName}`, data);
  await fs.unlinkSync(file.path);

  //return;
};

const deleteFile = async (req, res) => {
  if (req.method === "POST") {
    const fileName = req.body.fileName;
    removeFile(fileName);
    if (removeFile) {
      res.status(200).json({ message: "File deleted!" });
    } else {
      res.status(404).json({ message: "File could not be deleted!" });
    }
  }
};

export default connectDB(deleteFile);
