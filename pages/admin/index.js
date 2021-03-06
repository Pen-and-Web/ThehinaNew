import Head from "next/head";
// import SideBar from "../../components/admin/SideBar";
import Cookies from "js-cookie";
import React, { useState,useEffect } from "react";
import jwt_decode from "jwt-decode";
import AdminDashboard from "../../components/admin/AdminDashboard";
import *  as  actions from "../../redux-thunk/actions"
import { useDispatch,useSelector } from "react-redux";
import {parseCookies} from 'nookies'


const admin = ({userDetail}) => {


  // console.log("value",userDetail)
  const dispatch = useDispatch();
 
  dispatch(actions.currentUser(userDetail));     
 
  return (
    <>
    <Head>
      <title>Thehina SuperAdmin</title>
    </Head>
      <AdminDashboard userDetail={userDetail} />
     
    </>
  );
}; 

admin.getInitialProps = (ctx)=>{
  try{
    const cookie = parseCookies(ctx);
      // const user = cookie.User?"Admin":"";
      const decoded = jwt_decode(cookie.Token);
      // console.log("decoder",decoded.role)
      const role = decoded.role;
      

      if( role !== 'SuperAdmin' ){
        //as token is valid but when user use a valid token then this condition will
        //check whether decrypted token contain admin as a role otherwise redirect to login page
        // console.log("admin as a role condition works=> not admin")
        const {res} = ctx;
        res.writeHead(302,{Location:"/"})
        res.end()
      }

      return{
        userDetail: decoded
      }
  
      
      }
      catch(err){
        //it handles invalid token error 
        //when token is remove or invalid then it redirect to login page
        // console.log("Invalid Token")
        const {res} = ctx;
        res.writeHead(302,{Location:"/"})
        res.end()
      }

      
}
export default admin;
