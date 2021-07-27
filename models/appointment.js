import mongoose from "mongoose";
import moment from "moment";

var Schema = mongoose.Schema;

var appointment = new Schema({
  clientData: {
    clientId: { type: String },
    name: { type: String },
    email: { type: String },
  },
  consultantData: {
    consultantId: { type: String },
    name: { type: String },
    email: { type: String },
  },
  startDate: {
    type: String,
    required: false,
  },
  endDate: {
    type: String,
    required: false,
  },
  aim: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false,
  },
  slotId: {
    type: String,
    required: false,
  },
  stars: {
    type: Number,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
  messageTime: {
    type: String,
    default: moment().format("h:mm:ss a"),
  },
  messageDate: {
    type: String,
    default: moment().format("MMMM Do YYYY"),
  },
});

mongoose.models = {};

var Appointment = mongoose.model("Appointment", appointment);

export default Appointment;
