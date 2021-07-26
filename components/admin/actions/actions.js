import {USER,DELETE_USER,CONSULTANT,DELETE_CONSULTANT,ACTIVITIES} from '../types';
import axios from 'axios';
import {baseURL} from '../../../env'
export const user=(data)=>{
  // console.log("data in action",data)
  return{
    type:USER,
    payload:data,
  }
}

export const deleteUser=(id,role)=>{
  axios.delete(baseURL+`/user?id=${id}&&role=${role}`)
  .then(response=>{
    console.log(response);
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
        console.log(response.data);
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
