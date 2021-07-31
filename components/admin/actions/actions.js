import {USER,DELETE_USER,CONSULTANT,DELETE_CONSULTANT,ACTIVITIES,ADMINDETAIL,ADMIN_ID,ADMIN,UPDATE_ADMINPROFILE} from '../types';
import axios from 'axios';
import {baseURL} from '../../../env'

export const user=(data)=>{
  return{
    type:USER,
    payload:data,
  }
}

export const deleteUser=(id,role)=>{
  axios.delete(baseURL+`/user?id=${id}&&role=${role}`)
  .then(response=>{
    // console.log(response);
  })
  .catch(err=>console.log(err))
  
  return{
    type:DELETE_USER,
    payload:id
  }  
}

export const consultant=(data)=>{
  // console.log("data in action",data)
  return{
    type:CONSULTANT,
    payload:data,
  }
}

export const deleteConsultant=(id,role)=>{
  axios.delete(baseURL+`/user?id=${id}&&role=${role}`)
      .then(response=>{
        // console.log(response.data);
      })
      .catch(err=>console.log(err))
  return{
    type:DELETE_CONSULTANT,
    payload:id,
  }
}



export const activities=(data)=>{
 
  return{
    type:ACTIVITIES,
    payload:data,
  }
}

export const admin=(data)=>{
  // console.log("data in action",data)
  return{
    type:ADMIN,
    payload:data,
  }
}

export const adminDetails=(data)=>{
  console.log("Admin Details in actions",data);
  return{
    type:ADMINDETAIL,
    payload:data,
  }
}


export const adminId=(id)=>{
  return{
    type:ADMIN_ID,
    payload:id,
  }
}


export const updateAdminProfile=(data)=>{
  return{
    type:UPDATE_ADMINPROFILE,
    payload:data,
  }
}