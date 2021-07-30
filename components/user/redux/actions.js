import {
  CLIENTDETAIL,
  CLIENTID,
  CLIENTAPPOINTMENT_DETAILS,
  APPOINTMENT_FEEDBACK,
  BOOKAPPOINTMENTDATA,
  SWITCHCOMPONENT,
  BOOKAPPOINTMENTDETAIL,
  UPDATE_PROFILE,
} from "./types";
import axios from "axios";
import { baseURL } from "../../../env";
export const clientDetail = (data) => {
  // console.log("User Logged in information action", data);
  return {
    type: CLIENTDETAIL,
    payload: data,
  };
};

export const clientId = (data) => {
  // console.log("User Logged in information action", data);
  return {
    type: CLIENTID,
    payload: data,
  };
};

export const clientAppointmentDetails = (data) => {
  // console.log(data, "data in client action");
  return {
    type: CLIENTAPPOINTMENT_DETAILS,
    payload: data,
  };
};

export const appointmentFeedback = (appointmentId, starValue, feedback) => {
  // console.log("checking appointment id for feedback actions", appointmentId);
  // console.log("checking star value", starValue);
  // console.log("checking feedback", feedback);

  const feedbackData = {
    stars: starValue,
    feedback: feedback,
  };
  axios
    .patch(baseURL + `/appointment?id=${appointmentId}`, feedbackData)
    .then((res) => {
      // console.log(res.data, "checking response in action of feedback");
    });
  return {
    type: APPOINTMENT_FEEDBACK,
  };
};

//data from calender
export const bookAppointmentData = (
  slotId,
  consultantId,
  startDate,
  endDate
) => {
  // console.log(slotId, consultantId, startDate, endDate);

  const data = {
    sId: slotId,
    cId: consultantId,
    sDate: startDate,
    eDate: endDate,
  };
  return {
    type: BOOKAPPOINTMENTDATA,
    payload: data,
  };
};

//data from calender
export const switchComponent = (value) => {
  // console.log("status check", value);

  return {
    type: SWITCHCOMPONENT,
    payload: value,
  };
};

//data from book appointment form
export const bookAppointmentDetail = (detail) => {
  // console.log("Appointment detail", detail);

  return {
    type: BOOKAPPOINTMENTDETAIL,
    payload: detail,
  };
};

export const updateProfile = (value) => {
  return {
    type: UPDATE_PROFILE,
    payload: value,
  };
};
