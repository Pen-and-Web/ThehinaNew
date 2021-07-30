import {USER,CONSULTANT,DELETE_USER, DELETE_CONSULTANT,ACTIVITIES} from '../types';


const adminState = {
    userData:[],
    consultantData:[],
    activities:[]
   
}
const adminReducer = (state = adminState, { type, payload }) => {
  switch (type) {
    case USER:
        // console.log("data in reducer",payload);

      return {
        ...state,
        userData: payload,
      };
      case DELETE_USER:
        // console.log("payload",payload);
        // console.log("state.user", state.userData);
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
        // console.log("payload",payload);
        // console.log("state.user", state.userData);
      return {
        ...state,
        consultantData: state.consultantData.filter((user)=>user._id!==payload),
      };
      case ACTIVITIES:
        console.log("Email activities",payload);
        // console.log("state.user", state.userData);
      return {
        ...state,
        activities: payload,
      };


    default:
      return state;
    
}
}

export default adminReducer;