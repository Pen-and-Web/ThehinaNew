import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Login from "../components/authentication/Login";
import Grid from "@material-ui/core/Grid";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
	const storage = Cookies;
  const token = storage.get('Token');

  useEffect(() => {
    setLoading(false)
    if(token !== undefined && token !== null){
      const decoded = jwt_decode(token);
      console.log(decoded, "decoded")
      if(decoded.role === "User"){
        router.push('/thehina');
      } else if(decoded.role === "Consultant"){
        router.push('/consultant');
      } else if(decoded.role === "Admin"){
        router.push('/subadmin');
      } else {
        router.push('/admin');
      }
      }
  }, [])
	  
  return (loading ? (
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
      
    </div>) :
    "Loading..."
  );
};

export default Home;

