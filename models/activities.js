import mongoose from "mongoose";
import moment from "moment";

var Schema = mongoose.Schema;

var activity = new Schema({
  message: {
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

var Activity = mongoose.model("Activity", activity);

export default Activity;
