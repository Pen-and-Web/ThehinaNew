import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Login from "../components/authentication/Login";
import Grid from "@material-ui/core/Grid";

const Home = () => {

  
  return (
    <div>
      <Head>
         <title>Thehina</title>
      </Head>
     
      <Grid container style={{padding:'30px'}} >
        <Grid item  md={4} ></Grid>

       

        <Grid item md={4} xs={12}  style={{marginTop:'50px'}}>
         <Login />
        </Grid>

        <Grid item  md={4}></Grid>
      </Grid>
      
    </div>
  );
};

export default Home;
