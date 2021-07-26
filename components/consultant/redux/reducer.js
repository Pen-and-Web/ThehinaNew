import { scheduleDetails } from "./actions";
import {
  USERDETAIL,
  SCHEDULEDETAILS,
  DELETE_SCHEDULERECORD,
  USERID,
  SubmitUpdateRecord,
  APPOINTMENT_DETAILS,
  SUBMITUPDATERECORD_APPOINTMENT,
  DELETE_APPOINTMENTRECORD,
  NEW_SCHEDULE,
  UPDATE_PROFILE,
} from "./types";

const consultantState = {
  userLoggedInDetail: {},
  userId: "",
  scheduleDetails: [],
  submitUpdateRecord: false,
  submitUpdateRecordAppointment: false,
  appointmentDetails: [],
  updateProfile: false,
};

const consultantReducer = (state = consultantState, { type, payload }) => {
  switch (type) {
    case USERDETAIL:
      return {
        ...state,
        userLoggedInDetail: payload,
      };
    case USERID:
      return {
        ...state,
        userId: payload,
      };
    case SCHEDULEDETAILS:
      return {
        ...state,
        scheduleDetails: payload,
      };
    //socket io
    case NEW_SCHEDULE:
      return {
        ...state,
        scheduleDetails: [...scheduleDetails, payload],
      };
    //end here
    case DELETE_SCHEDULERECORD:
      console.log(payload, "payload delete");
      console.log(state.scheduleDetails, "schedule");
      return {
        ...state,
        scheduleDetails: state.scheduleDetails.filter(
          (record) => record._id !== payload
        ),
      };
    case SubmitUpdateRecord:
      console.log(payload, "SubmitUpdateRecord");
      return {
        ...state,
        submitUpdateRecord: payload,
      };
    case SUBMITUPDATERECORD_APPOINTMENT:
      console.log(payload, "SubmitUpdateRecord");
      return {
        ...state,
        submitUpdateRecordAppointment: payload,
      };

    case APPOINTMENT_DETAILS:
      return {
        ...state,
        appointmentDetails: payload,
      };
    case DELETE_APPOINTMENTRECORD:
      console.log(payload, " appointment payload delete");
      console.log(state.appointmentDetails, "appointment");
      return {
        ...state,
        appointmentDetails: state.appointmentDetails.filter(
          (record) => record._id !== payload
        ),
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        updateProfile: payload,
      };
    default:
      return state;
  }
};

export default consultantReducer;
