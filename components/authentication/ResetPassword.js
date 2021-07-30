import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { CardActions } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {baseURL, imgUrl} from '../../env'
import { useRouter } from "next/router";
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

const ResetPassword = () => {
  
  
 
    const router = useRouter();

  const [email,setEmail] = useState("");
  const [component,setComponent] = useState("resetPassword")

  //otp states
  const [otp,setOtp] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")

  const [loader,setLoader] = useState(false);

  const submit = () =>{
      const data = {
          email:email
      }
      axios.patch(baseURL+'/resetPassword',data)
      .then(res=>{setComponent("otp");})
      .catch(err=>console.log(""))
  }

  const otpSubmit=()=>{
    setLoader(true)
    const data = {
      email: email,
      resetPasswordToken: otp,
      password: newPassword,
      confirmPassword: confirmPassword
    }
    axios.post(baseURL+`/resetPassword`,data)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err,"reset password erro"))
    otpId.value ="";
    passwordId.value="";
    confirmPasswordId.value="";
    router.push('/')
  }
  return (
    <>    
  
    {component==="resetPassword"?
    
     <Card elevation={3} style={{ padding: "20px", border: "1px solid #DADCE0",marginTop:'40px' }}>
       <Typography  variant="h5"  >
        Find Your Account
      </Typography>
      <Divider/>
      <Typography  style={{marginTop:'10px'}} >
        Please enter your email address to search for your account
      </Typography>
       

      <form  noValidate autoComplete="off">
     
      <TextField
            id="email"
            label="Email"
            fullWidth          
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            style={{ marginTop: '10px' }}
            size="small"
            variant="outlined"
            />
        
        
      
      </form>
            
           
            <CardActions> 
          <Button
            variant="contained"
            style={{ marginTop: "12px",color:"white",backgroundColor:"#7b40c0" }}
            size="large"
            onClick={()=>submit()}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            style={{ marginTop: "12px",color:"white",backgroundColor:"#7b40c0" }}
            size="large"
            onClick={()=>router.push('/login')}
          >
            Cancel
          </Button>
          
         
          </CardActions>
         
          </Card>
    
    :
    component==="otp"?
    <>
    <Card elevation={3} style={{ padding: "20px", border: "1px solid #DADCE0",marginTop:'40px' }}>
       
      
      <Typography  style={{marginTop:'10px'}} >
        Please enter the otp we sent to your account
      </Typography>
      <Divider/>

      <form  noValidate autoComplete="off">
     
      <TextField
            id="otpId"
            label="Enter OTP"
            fullWidth
            value={otp}   
            onChange={(e)=>{setOtp(e.target.value)}}       
            style={{ marginTop: '10px' }}
            size="small"
            variant="outlined"
        />
        <TextField
            id="passwordId"
            label="Enter Password"
            fullWidth    
            type="password"
            value={newPassword}   
            onChange={(e)=>{setNewPassword(e.target.value)}}        
            style={{ marginTop: '10px' }}
            size="small"
            variant="outlined"
        />
        <TextField
            id="confirmPasswordId"
            label="Confirm Password"
            type="password"
            value={confirmPassword}   
            onChange={(e)=>{setConfirmPassword(e.target.value)}}  
            fullWidth          
            style={{ marginTop: '10px' }}
            size="small"
            variant="outlined"
        />
        
        
      
      </form>
            
           
            <CardActions> 
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "12px" }}
            size="large"
            onClick={()=>otpSubmit()}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            style={{ marginTop: "12px" }}
            size="large"
            onClick={()=>router.push('/login')}
          >
            Cancel
          </Button>
          
         
          </CardActions>
          {loader===true?
            <center><CircularProgress /></center>
          :null}
         
         
          </Card>
    </>
    :
    null
  }

    
    </>
  );
};

export default ResetPassword;
