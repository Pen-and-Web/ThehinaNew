import connectDB from "../../middleware/mongodb";
import Schedule from "../../models/schedule";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const formidable = require("formidable");

// const form = formidable({ multiples: false });
const form = new formidable.IncomingForm();

const test = async (req, res) => {
  if (req.method === "POST") {
    console.log("Request:12 ");
    // res.send("abc");
    // const { name, email, imageUrl, password, role, type } = req.body;
    // console.log("Request: ", req.body);
    // form.parse(req, (err, fields, files) => {
    //   if (err) return reject(err);
    //   console.log(fields, files);
    //   res.status(200).json({ fields, files });
    // });
    form.parse(req, (err, fields, files) => {
      //   res.writeHead(200, { "content-type": "application/json" });
      req.body = fields;
      req.files = files;

      console.log(req.body, "-------------");
      console.log(req.files, "-------------");
      res.send(JSON.stringify({ fields, files }, null, 2));
    });
    return;
    // res.send("abc");
    // try {

    // } catch (error) {
    //   return res.status(500).json({ error: error });
    // }
  }
};
export const config = {
  api: {
    bodyParser: false,
  },
};
export default connectDB(test);
