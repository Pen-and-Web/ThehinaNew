import mongoose from "mongoose";
import moment from "moment";

var Schema = mongoose.Schema;

var user = new Schema({
  name: {
    type: String,
    required: true,
  },
  arabicName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  // token: {
  //   type: String,
  //   required: false,
  // },
  since: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
  mainDomain: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
  summaryOfExpertise: {
    type: String,
    required: false,
  },
  hourPrice: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  idNumber: {
    type: String,
    required: false,
  },
  idType: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  IBAN: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: String,
    required: false,
  },
  userSituation: {
    type: String,
    required: false,
  },
  explanation: {
    type: String,
    required: false,
  },
  resetPasswordToken: String,
});

mongoose.models = {};

var User = mongoose.model("User", user);

export default User;
