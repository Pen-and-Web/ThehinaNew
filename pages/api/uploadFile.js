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
import { saveFile } from "../../functions/saveFile";

const form = formidable({ multiples: false });

const uploadFile = async (req, res) => {
  if (req.method === "POST") {
    const myFunction = () =>
      form.parse(req, async (err, fields, files, query) => {
        req.body = fields;
        req.files = files;
        const { id } = req.query;

        try {
          const imageName = await saveFile(files.file);
          console.log("imageName: ", imageName);
          await User.findByIdAndUpdate(
            id,
            { imageUrl: imageName },
            {
              useFindAndModify: false,
            }
          );
          res.status(200).json({ message: "File Uploaded!" });
        } catch (error) {
          res.send(error);
        }
      });
    const myPromise = () =>
      new Promise((resolve, reject) => {
        myFunction();
        setTimeout(() => {
          resolve("foo");
        }, 50000);
      });
    await myPromise();
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default connectDB(uploadFile);
