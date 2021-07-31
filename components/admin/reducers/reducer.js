import {USER,CONSULTANT,DELETE_USER, DELETE_CONSULTANT,ACTIVITIES,ADMIN,ADMINDETAIL} from '../types';

const adminState = {
    adminDetail:{},
    userData:[],
    consultantData:[],
    adminData:[],
    activities:[]   
}

const adminReducer = (state = adminState, { type, payload }) => {
  switch (type) {
    case USER:
      return {
        ...state,
        userData: payload,
      };
    case DELETE_USER:
      return {
        ...state,
        userData: state.userData.filter((user)=>user._id!==payload),
      };

    case CONSULTANT:
      return {
        ...state,
        consultantData: payload,
      };

    case DELETE_CONSULTANT:
      return {
        ...state,
        consultantData: state.consultantData.filter((user)=>user._id!==payload),
      };
    
    case ADMIN:
      return {
        ...state,
        adminData: payload,
      };
    case ADMINDETAIL:
      return {
        ...state,
        adminDetail: payload,
      };
    case ACTIVITIES:
        return {
          ...state,
          activities: payload,
        };
    default:
      return state;   
  }
}

export default adminReducer;