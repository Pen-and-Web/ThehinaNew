import React, { useState } from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AdminSignup from '../../components/authentication/AdminSignup'
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

const signup = () => {
const classes = useStyles();


  return (
    <>
      <div>
        <Head>
          <title>Admin Signup</title>
        </Head>
      </div>
  <Grid container style={{backgroundColor:"#F7F8FA"}} >

        <Grid item  md={3}   ></Grid>
    
        <Grid item md={6} xs={12}  style={{justifyContent:"center",padding:"40px"}}  >   
            <AdminSignup />
        </Grid>
          
        <Grid item  md={3}   ></Grid>
    
  </Grid>
    
    </>
  );
};

export default signup;