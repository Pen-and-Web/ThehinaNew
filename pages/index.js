import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Login from "../components/authentication/Login";
import Grid from "@material-ui/core/Grid";

const staticPage = () => {
	
	 const router = useRouter();

	  useEffect(()=>{router.push('/index.html')},[])
  
  return (
    <div>
      <Head>
         <title>Thehina</title>
      </Head>
     
      <Grid container style={{padding:'30px'}} >
        <Grid item  md={4} ></Grid>

       

        <Grid item md={4} xs={12}  style={{marginTop:'50px'}}>
        </Grid>

        <Grid item  md={4}></Grid>
      </Grid>
      
    </div>
  );
};

export default staticPage;
