import connectDB from "../../middleware/mongodb";
import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import { DragHandleRounded } from "@material-ui/icons";
const formidable = require("formidable");
import fs from "fs";

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

// var storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: function (req, file, cb) {
//     console.log("Storage Request: ", req.body);
//     console.log("file:", file.name);
//     // return "abc";
//     // crypto.pseudoRandomBytes(16, function (err, raw) {
//     //   if (err) return cb(err);
//     cb(null, file.name);
//     // });
//   },
// });

// const uploading = multer({ storage: storage }).single("file");
let uniqueFileName = null;

const saveFile = async (file) => {
  //console.log("file:",file)
  if(file !== undefined && file?.name !== ''){
    const data = fs.readFileSync(file.path);
    uniqueFileName = `${Date.now()}-${file.name}`;
    console.log(uniqueFileName, "NAME FILE");
    fs.writeFileSync(`./public/uploads/${uniqueFileName}`, data);
    await fs.unlinkSync(file.path);
    //return;
  }
  
};

//register.use(uploading);

// register.post(async (req, res) => {
//   try {
//     const { name, email, imageUrl, password, role, type } = req.body;
// console.log("Request.Body: ", req.body);
// console.log("Request.files: ", req.files);
// res.send("abc");
const register = async (req, res) => {
  if (req.method === "POST") {
    const myFunction = () =>
      form.parse(req, async (err, fields, files) => {
        //   res.writeHead(200, { "content-type": "application/json" });
        req.body = fields;
        req.files = files;
        // console.log("files: ",files);
        // uploading(req, res, function (err) {
        //   //const { name } = req.body;
        //   //console.log("Uploading Body: ", name);
        //   //console.log("File: ", req.files);
        //   //res.send(name);
        // });
        // await saveFile(files.file);

        try {
          const {
            name,
            arabicName,
            email,
            password,
            role,
            mainDomain,
            status,
            summaryOfExpertise,
            hourPrice,
            phoneNumber,
            idNumber,
            idType,
            region,
            gender,
            IBAN,
            dateOfBirth,
            userSituation,
            explanation,
          } = req.body;
          //console.log("Files: ", req.files);
          if (name && email && password && role) {
            let user = await User.findOne({ email });
            if (!user) {
              await saveFile(files.file);
              var mailOptions;
              if (role === "User") {
                mailOptions = {
                  from: "testusapp12@gmail.com",
                  to: email,
                  subject: "Welcome to Thehina",
                  html: "<h1>Welcome</h1><p>You are a part of Thehina group now. You can login to proceed.</p>",
                };
              } else if (role === "Consultant") {
                mailOptions = {
                  from: "testusapp12@gmail.com",
                  to: email,
                  subject: "Welcome to Thehina",
                  html: "<h1>Welcome</h1><p>Your registration request has been submitted. Please wait while we verify your identity.</p>",
                };
              }
              let passwordhash = await bcrypt.hashSync(password, 10);
              //console.log(passwordhash, "passwordhash");
              //console.log("image in try", imageUrl);
              //console.log(Date.now(), "NAME FILE2");
              var newUser = new User({
                name,
                email,
                imageUrl: uniqueFileName,
                password: passwordhash,
                role,
                mainDomain,
                status: role === "User" ? true : false,
                arabicName,
                summaryOfExpertise,
                hourPrice,
                phoneNumber,
                idNumber,
                idType,
                region,
                gender,
                IBAN,
                dateOfBirth,
                userSituation,
                explanation,
              });
              //console.log(newUser, "newUser");
              //Create New User
              var usercreated = await newUser.save();
              //console.log(usercreated, "usercreated");
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
              return res.status(200).json({
                token: jwt.sign(
                  {
                    id: usercreated._id,
                    name: usercreated.name,
                    arabicName: usercreated.arabicName,
                    email: usercreated.email,
                    role: usercreated.role,
                  },
                  process.env.jwtKey
                ),
                role: usercreated.role,
                imageUrl: usercreated.imageUrl,
              });
            } else {
              return res.status(422).json({ message: "User already exists!" });
            }
          } else {
            return res.status(422).json({ message: "Data Incomplete!" });
          }
        } catch (error) {
          console.log(error, "test");
          res.send(error);
          // done();
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

export default connectDB(register);
