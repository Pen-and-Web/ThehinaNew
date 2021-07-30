import {
  CLIENTDETAIL,
  CLIENTID,
  CLIENTAPPOINTMENT_DETAILS,
  BOOKAPPOINTMENTDATA,
  SWITCHCOMPONENT,
  BOOKAPPOINTMENTDETAIL,
  UPDATE_PROFILE,
} from "./types";

const clientState = {
  clientDetail: {},
  clientId: "",
  clientAppointment: [],
  bookSlotData: {},
  switchComponent: false,
  bookAppointmentDetail: {},
  updateProfile: false,
};

const clientReducer = (state = clientState, { type, payload }) => {
  switch (type) {
    case CLIENTDETAIL:
      return {
        ...state,
        clientDetail: payload,
      };
    case CLIENTID:
      return {
        ...state,
        clientId: payload,
      };

    case CLIENTAPPOINTMENT_DETAILS:
      // console.log(payload, "data in client action");

      return {
        ...state,
        clientAppointment: payload,
      };
    case BOOKAPPOINTMENTDATA:
      // console.log(payload, "data in client action");

      return {
        ...state,
        bookSlotData: payload,
      };

    case SWITCHCOMPONENT:
      return {
        ...state,
        switchComponent: payload,
      };
    case BOOKAPPOINTMENTDETAIL:
      return {
        ...state,
        bookAppointmentDetail: payload,
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

export default clientReducer;
