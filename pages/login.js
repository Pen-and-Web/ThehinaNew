import React, { useState } from "react";
import Head from "next/head";
import * as actions from "../redux-thunk/actions";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import Login from "../components/authentication/Login";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));
const login = () => {
  const classes = useStyles();

  return (
    <div >
      <Head>
        <title>Login Page</title>
      </Head>

      <Grid container style={{padding:'30px'}} >
        <Grid item  md={4} ></Grid>

       

        <Grid item md={4} xs={12}  style={{marginTop:'50px'}}>
         <Login />
        </Grid>

        <Grid item md={4}></Grid>
      </Grid>
    </div>
  );
};

export default login;
