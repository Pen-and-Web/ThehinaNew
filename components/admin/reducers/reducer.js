import {USER,CONSULTANT,DELETE_USER, DELETE_CONSULTANT,ACTIVITIES,ADMIN,ADMINDETAIL,UPDATE_ADMINPROFILE} from '../types';

const adminState = {
    adminDetail:{},
    adminId:"",
    userData:[],
    consultantData:[],
    adminData:[],
    activities:[],
    updateAdminProfile: false,   
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
      console.log("Admin Details in actions",payload);
      return {
        ...state,
        adminDetail: payload,
      };
    case ACTIVITIES:
        return {
          ...state,
          activities: payload,
        };
    case UPDATE_ADMINPROFILE:
      return {
        ...state,
        updateAdminProfile: payload,
      };
    default:
      return state;   
  }
}

export default adminReducer;