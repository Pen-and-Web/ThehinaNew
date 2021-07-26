import mongoose from "mongoose";
import moment from "moment";

var Schema = mongoose.Schema;

// var schedule = new Schema({
//   consultantId: {
//     type: String,
//     required: false,
//   },
//   appointments: {
//     type: [
//       {
//         consultantId: { type: String },
//         name: { type: String },
//         email: { type: String },
//       },
//     ],
//   },
// });

var schedule = new Schema({
  consultantId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  availability:{
    type: Boolean,
    required: false,
    default: true
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

var Schedule = mongoose.model("Schedule", schedule);

export default Schedule;
