import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SET_CURRENTUSER
} from "./types";
import {baseURL} from '../env'

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/login`,
        data: {
          email,
          password,
        },
      });
      console.log("Login Response Action: ", response.data);
      if (response.status === 200) {
        const token = response.data.token;
        const role= response.data.role;

        // localStorage.setItem("Token", JSON.stringify(token));
        Cookies.set("Token", token);
       
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token,role },
        });
        return { token,role };
      }
    } catch (e) {
      console.log("Login Error Action: ", e.response.data);
      let error = e.response.data;
      dispatch({
        type: LOGIN_FAIL,
        payload: { error },
      });
      return { error };
    }
  };
};

// export const signup = ({ name, email,image, password,role }) => {
  export const signup = ({name,arabicName,email,password,mainDomain,summaryOfExpertise,hourPrice,phoneNumber,idNumber,idType,region,gender,IBAN,dateOfBirth,image,role }) => {

    console.log("action in image",image);

  const formData = new FormData();
  formData.append("file",image);
  formData.append("name",name);
  formData.append("arabicName",arabicName);

  formData.append("email",email);
  formData.append("password",password);
  formData.append("mainDomain",mainDomain);

  formData.append("summaryOfExpertise",summaryOfExpertise);
  formData.append("hourPrice",hourPrice);
  formData.append("phoneNumber",phoneNumber);

  formData.append("idNumber",idNumber);
  formData.append("idType",idType);
  formData.append("region",region);
  
  formData.append("gender",gender);
  formData.append("IBAN",IBAN);
  formData.append("dateOfBirth",dateOfBirth);
  

  formData.append("role",role);
  console.log("FORM DATA",formData);
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/register`,
        headers:{"Content-Type":'multipart/form-data'},
        data: formData
        //  {
        //   name,
        //   email,
        //   formData,
        //   password,
        //   role: role
        // },
      });
      console.log("Signup Response Action: ", response);
      if (response.status === 200) {

        const token = response.data.token;
        // const role = response.data.formData.role;
        const formData = response.data.formData;
        console.log(token);
        // localStorage.setItem("Token", JSON.stringify(token));
        Cookies.set("Token", token);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: {formData,role,token},
          // { token,role,formData }
        });
        return {formData,token,role};
      }
    } catch (e) {
      console.log("Signup Error Action: ", e.response.data);
      let error = e.response.data;
      dispatch({
        type: SIGNUP_FAIL,
        payload: { error },
      });
      return { error };
    }
  };
};

export const userSignup = ({ idType,idNumber,name, arabicName, email,password,phoneNumber,dateOfBirth,gender,region,image,role }) => {
  console.log("action in image",image);

  const formData = new FormData();
  formData.append("file",image);
  formData.append("idType",idType);
  formData.append("idNumber",idNumber);

  formData.append("name",name);
  formData.append("arabicName",arabicName);
  formData.append("email",email);
  formData.append("password",password);
  formData.append("phoneNumber",phoneNumber);
  formData.append("dateOfBirth",dateOfBirth);
  formData.append("gender",gender);
  formData.append("region",region);
  formData.append("role",role);
  console.log("FORM DATA",formData);

  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/register`,
        headers:{"Content-Type":'multipart/form-data'},
        data: formData
        //  {
        //   name,
        //   email,
        //   formData,
        //   password,
        //   role: role
        // },
      });
      console.log("Signup Response Action: ", response);
      if (response.status === 200) {

        const token = response.data.token;
        // const role = response.data.formData.role;
        const formData = response.data.formData;
        console.log(token);
        // localStorage.setItem("Token", JSON.stringify(token));
        Cookies.set("Token", token);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: {formData,role,token},
          // { token,role,formData }
        });
        return {formData,token,role};
      }
    } catch (e) {
      console.log("Signup Error Action: ", e.response.data);
      let error = e.response.data;
      dispatch({
        type: SIGNUP_FAIL,
        payload: { error },
      });
      return { error };
    }
  };
};
export const currentUser = (data)=>{
  return{
    type:SET_CURRENTUSER,
    payload:data
  }
}