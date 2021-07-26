import React, { useState } from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// import Card from "@material-ui/core/Card";
import UserSignup from '../../components/authentication/UserSignup'
import ConsultantSignup from '../../components/authentication/ConsultantSignup'

// import Button from "@material-ui/core/Button";
// import { useDispatch } from "react-redux";
// import * as actions from "../redux-thunk/actions";
import { useRouter } from "next/router";
// import Typography from '@material-ui/core/Typography';

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
          <title>Signup Page</title>
        </Head>
      </div>
  <Grid container  style={{backgroundColor:"#F7F8FA"}}  >

    <Grid item md={3}   ></Grid>
    
  
      
    <Grid item xs={12} md={6}   style={{padding:'40px'}} >
      <ConsultantSignup />
    </Grid>
   
    <Grid item  md={3}   ></Grid>
    
  </Grid>
    
    </>
  );
};

export default signup;