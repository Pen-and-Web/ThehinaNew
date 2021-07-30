import {
  USERDETAIL,
  SCHEDULEDETAILS,
  DELETE_SCHEDULERECORD,
  USERID,
  UPDATE_SCHEDULERECORD,
  SubmitUpdateRecord,
  SUBMITUPDATERECORD_APPOINTMENT,
  APPOINTMENT_DETAILS,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENTRECORD,
  NEW_SCHEDULE,
  UPDATE_PROFILE,
} from "./types";
import axios from "axios";
// import { useDispatch } from 'react-redux';
import { baseURL } from "../../../env";
export const userDetail = (data) => {
  // console.log("User Logged in information action", data);
  return {
    type: USERDETAIL,
    payload: data,
  };
};

export const userId = (data) => {
  // console.log("User Logged in information action", data);
  return {
    type: USERID,
    payload: data,
  };
};

export const scheduleDetails = (data) => {
  // console.log("data in schedule detail is ", data);

  return {
    type: SCHEDULEDETAILS,
    payload: data,
  };
};

export const deleteScheduleRecord = (consultantId, scheduleId) => {
  axios
    .delete(
      baseURL +
        `/schedule?consultantId=${consultantId}&scheduleId=${scheduleId}`
    )
    .then((res) => {
      // console.log(res.data)
    })
    .catch((err) => console.log(err));

  return {
    type: DELETE_SCHEDULERECORD,
    payload: scheduleId,
  };
};

//implementing socket io
export const newSchedule = (schedule) => {
  return {
    type: NEW_SCHEDULE,
    payload: schedule,
  };
};

//

export const submitUpdateRecord = (value) => {
  // console.log("submitUpdateRecord", value);
  return {
    type: SubmitUpdateRecord,
    payload: value,
  };
};

export const updateScheduleRecord = (data) => {
  // console.log(data);
  // const dispatch = useDispatch();

  axios.put(baseURL`/schedule?scheduleId=${data.id}`, data).then((response) => {
    // console.log("asdasds", response.data);
  });
  return {
    type: UPDATE_SCHEDULERECORD,
  };
};

export const submitUpdateRecordAppointment = (value) => {
  // console.log("submitUpdateRecord", value);
  return {
    type: SUBMITUPDATERECORD_APPOINTMENT,
    payload: value,
  };
};

export const appointmentDetails = (data) => {
  return {
    type: APPOINTMENT_DETAILS,
    payload: data,
  };
};
export const deleteAppointmentRecord = (appointmentId, consultantId) => {
  axios
    .delete(
      baseURL +
        `/appointment?appointmentId=${appointmentId}&consultantId=${consultantId}`
    )
    .then((res) => {
      // console.log(res.data)
    })
    .catch((err) => console.log(err));

  return {
    type: DELETE_APPOINTMENTRECORD,
    payload: appointmentId,
  };
};

export const updateAppointment = (id, statusValue) => {
  const statusChange = {
    status: statusValue,
  };

  axios
    .patch(baseURL + `/appointment?id=${id}`, statusChange)
    .then((res) => console.log(res.data));

  return {
    type: UPDATE_APPOINTMENT,
  };
};

export const updateProfile = (value) => {
  return {
    type: UPDATE_PROFILE,
    payload: value,
  };
};
