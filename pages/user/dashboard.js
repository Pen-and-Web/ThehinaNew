import Head from "next/head";
// import SideBar from "../../components/admin/SideBar";
import Cookies from "js-cookie";
import React, { useState,useEffect } from "react";
import Dashboard from "../../components/user/Dashboard";
import Nav from '../../components/Nav'
import jwt_decode from "jwt-decode";
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import { useRouter } from "next/router";
import MainLayout from '../../components/Layout'

const dashboard = ({userDetail}) => {

  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
     {/* <Nav userDetail={userDetail} /> */}
    
     <Dashboard userDetail={userDetail} />
    
     
    </>
  );
}; 

dashboard.getInitialProps = (ctx)=>{
  try{
    const cookie = parseCookies(ctx);
      // const user = cookie.User?"Admin":"";
      const decoded = jwt_decode(cookie.Token);
      console.log("decoder",decoded.role)
      const role = decoded.role;
      if(role !== 'User' ){
        //as token is valid but when user use a valid token then this condition will
        //check whether decrypted token contain admin as a role otherwise redirect to login page
        console.log("User as a role condition works=> not User")
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
        console.log("Invalid Token")
        const {res} = ctx;
        res.writeHead(302,{Location:"/"})
        res.end()
      }

      
}
export default dashboard;
