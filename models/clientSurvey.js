import mongoose from "mongoose";
import moment from "moment";

var Schema = mongoose.Schema;

var clientSurvey = new Schema({
  messageTime: {
    type: String,
    default: moment().format("h:mm:ss a"),
  },
  messageDate: {
    type: String,
    default: moment().format("MMMM Do YYYY"),
  },
  question1: {
    question: {
      type: String,
      default:
        "On a scale of 1 to 10, how satisfied are you with your in-store experience today?",
    },
    answer: { type: String },
  },
  question2: {
    question: {
      type: String,
      default:
        "How likely are you to recomment (insert product or service) to others?",
    },
    answer: { type: String },
  },
  question3: {
    question: {
      type: String,
      default: "Rate your satisfaction with our team in resolving your issue.",
    },
    answer: { type: String },
  },
  question4: {
    question: {
      type: String,
      default: "Did you feel that our team answered your inquiry promptly?",
    },
    answer: { type: String },
  },
  question5: {
    question: {
      type: String,
      default:
        "Do you agree or disagree that your issue was effectively resolved?",
    },
    answer: { type: String },
  },
  question6: {
    question: {
      type: String,
      default: "How likely are you to purchase again fro us?",
    },
    answer: { type: String },
  },
  question7: {
    question: {
      type: String,
      default: "How likely are you to return to our website?",
    },
    answer: { type: String },
  },
  userId: {
    type: String,
  },
  appointmentId: {
    type: String,
  },
});

mongoose.models = {};

var ClientSurvey = mongoose.model("ClientSurvey", clientSurvey);

export default ClientSurvey;
