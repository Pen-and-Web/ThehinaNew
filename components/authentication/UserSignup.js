import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import Image from 'next/image'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import * as actions from "../../redux-thunk/actions";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { CardActions, CardContent } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Link from 'next/link'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

export const UserSignup = () => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [idType, setIdType] = useState('');
  const [errorIdType,setErrorIdType] = useState(false);

  const [idNumber, setIdNumber] = useState('');
  const [errorIdNo, setErrorIdNo] = useState(false);

  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);

  const [arabicName, setArabicName] = useState("");
  const [errorArabicName,setErrorArabicName] = useState(false);

  const [countryCode, setCountryCode] = useState("");
  const [errorCountryCode, setErrorCountryCode] = useState(false);
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const [gender, setGender] = useState("");
  const [errorGender,setErrorGender] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState("1993-05-24");
  const [errorDOB,setErrorDOB] = useState(false);

  const [image, setImage] = useState("");
  const [errorImage,setErrorImage] = useState(false);


  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [region, setRegion] = useState('');
  const [errorRegion,setErrorRegion] = useState(false);


  const submitSignup = async (idType,idNumber,name, arabicName, email,password,phoneNumber,dateOfBirth,gender,region,role) => {
    //concatinate country code with phone Number
    phoneNumber=countryCode+phoneNumber;

    if(errorIdNo===true||errorName===true|| errorPhoneNumber===true||  errorEmail===true|| errorPassword===true || errorGender===true || idType==="" ||  idNumber===""|| name===""|| arabicName==="" || email==="" || password===""|| gender==="" ||phoneNumber==="" || region==="" || dateOfBirth==="" ){
      if(!idType) {
        setErrorIdType(true)
     }
      if(!idNumber) {
        setErrorIdNo(true)
     }
     if(!name){
       setErrorName(true)
     }
     if(!countryCode){
       setErrorCountryCode(true)
     }
     if(!phoneNumber){
       setErrorPhoneNumber(true)
     }
     if(!email){
       setErrorEmail(true)
     }
     if(!password){
       setErrorPassword(true)
     }
     if(!gender){
       setErrorGender(true)
     }
     if(!dateOfBirth){
       setErrorDOB(true)
     }
     if(!region){
       setErrorRegion(true)
     }
     if(!arabicName){
       setErrorArabicName(true)
     }
     if(!image){
       setErrorImage(true)
     }
    }
     else{
      console.log("No error")
      dispatch(actions.userSignup({ idType,idNumber,name, arabicName, email,password,phoneNumber,dateOfBirth,gender,region,image,role}))
      .then((response) => {
        console.log("SignUp Response: ", response);
        router.push("/");
      })
      .catch((error) => {
        console.log("SignUp Error: ", error);
      });
    }
    
  };

  
  const mailformat =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const alphabets = /^[a-zA-Z ]*$/;
  const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\/#?!@$%^&*-]).{8,}$/;
  const arregex = /[\u0600-\u06FF]/;

  return (
    <>
      <Card style={{ padding: "10px", border: "1px solid #DADCE0" }}>
      <Typography   align="center">
       <img
            src="https://thehina.com/assets/img/logo/logo.png"
            
            height="40%"
          />
      </Typography>
      <Typography
          variant="h5"
          component="h2"
          style={{color:"#7b40c0",marginTop:'20px',marginBottom:'10px'}}
          align="center"
        >
          Create User Account
        </Typography>  
     
        <Grid container  spacing={2} style={{padding:"20px"}} >
          
        <Grid item md={3}>
                <InputLabel htmlFor="idType">Id Type</InputLabel>
                    <Select
                      fullWidth
                      native
                      value={idType}
                      onChange={e=>{setIdType(e.target.value)
                        if(!e.target.value){
                          setErrorIdType(true)
                        }
                        else{
                          setErrorIdType(false)
                        }
                      
                      }}
                      error={errorIdType===true?true:null}
                    >
                      <option aria-label="None" value="" />
                      <option value={"sId"}>Saudia National Id</option>
                      
                    </Select>
            </Grid>
        
        <Grid item md={9}>
                <TextField
                  label="Id Number"
                  type="number"
                  value={idNumber}
                  onChange={e=>{
                    setIdNumber(e.target.value)                     
                    if(e.target.value.length===10){
                      setErrorIdNo(false)
                    }
                    else{
                      setErrorIdNo(true)
                    }
                   }}
                  
                  fullWidth
                  style={{marginTop:"10px"}}
                  size="small"
                  autoComplete="fullName"             
                  variant="outlined"
                  error={errorIdNo===true?true:null}
                  helperText={errorIdNo===true?"Please provide a valid ID number":null}
                />
          </Grid>
         
          <Grid item  md={6}>
        <TextField          
              label="Full Name in English"
                           
              fullWidth
              style={{marginTop:"10px"}}
              size="small"
                             
              autoComplete="fullName"             
              value={name}
              onChange={(e) => {
                if(e.target.value.length>20){setErrorName(true)}
                if(e.target.value.match(alphabets)){
                  
                  setName(e.target.value);
                }
                if(e.target.value.length<20){setErrorName(false)
              }}}
              error={errorName===true?true:null}
              helperText={errorName===true?"Please provide a valid user name":null}
              variant="outlined"
            />
        </Grid>

        <Grid item md={6}>
            <TextField
              label="Full Name in Arabic"
              type="text"
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              autoComplete="fullName"
              value={arabicName}
              onChange={(e) => {
                setArabicName(e.target.value);
                if (e.target.value.match(arregex)) {
                  setArabicName(e.target.value);
                  setErrorArabicName(false);
                } else {
                  setErrorArabicName(true);
                }
              }}
              variant="outlined"
              error={errorArabicName === true ? true : null}
              helperText={
                errorArabicName === true ? "Name must be in arabic" : null
              }
            />
          </Grid>
           
        
        <Grid item md={6}> 
        <TextField
             label="Email"
             type="email"
             
             value={email}
             onChange={(e) =>  {
               setEmail(e.target.value)
              if(e.target.value.match(mailformat)){
                  setEmail(e.target.value);
                  setErrorEmail(false)
              }
              else if(e.target.value.length===0){
                setErrorEmail(false)
              }
              else{
                setErrorEmail(true)
              }
                  
              }}
            error={errorEmail===true?true:null}
            helperText={errorEmail===true?"Please provide a valid email address":null}

            fullWidth
            style={{ marginTop: '10px' }}
            size="small"
                       
            variant="outlined"
            />
          </Grid>
         
          
        
        <Grid item md={6}>
            <TextField              
              type="password"
              label="Password"
              value={password}              
              onChange={(e) => {
                setPassword(e.target.value)                
                if(e.target.value.match(PASSWORD_REGEX)){
                  setPassword(e.target.value);
                  setErrorPassword(false)
                }
                else{
                  setErrorPassword(true)

                }
              }}
              fullWidth
              style={{ marginTop: '10px' }}
              size="small"
              autoComplete="current-password"           
              variant="outlined"
              error={errorPassword===true?true:null}
              helperText={errorPassword===true?"Password should have at least 8 characters, including one upper case, one lower case, one digit and one special character.":null}
              />
          </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
          <TextField
              id="date"
              label="DOB"
              type="date"              
              fullWidth   
              defaultValue={dateOfBirth}           
              onChange={e=>{
                setDateOfBirth(e.target.value)
              if(!dateOfBirth){
                setErrorDOB(true)
              }
              else{
                setErrorDOB(false)
              }
              }
              }
              error={errorDOB===true?true:null}
              helperText={errorDOB===true?"*Required Field":null}
            />
            </Grid>
          <Grid item md={6} style={{ marginTop: '10px' }}>
            <InputLabel htmlFor="Gender">Gender</InputLabel>
            <Select
              fullWidth
              native
              value={gender}
              error={errorGender===true?true:null}
              onChange={(e)=>{
                setGender(e.target.value)
                if(!e.target.value){
                  setErrorGender(true)
                }
                else{
                  setErrorGender(false)
                }
              
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </Select>
            </Grid>

        <Grid item md={3} style={{ marginTop: '10px' }}>
            <InputLabel htmlFor="idType">Country Code</InputLabel>
                <Select
                  fullWidth
                  native
                  value={countryCode}
                  error={errorCountryCode===true?true:null}
                  onChange={(e)=>{
                    setCountryCode(e.target.value)
                    if(!e.target.value){
                      setErrorCountryCode(true)
                    }
                    else{
                      setErrorCountryCode(false)
                    }                 
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"+966"}>+966</option>
                  
                </Select>
        </Grid>

          <Grid item md={9} style={{ marginTop: '10px' }}> 
        <TextField                     
            label="Mobile Number"
            type="number"
            fullWidth
            style={{marginTop:"10px"}}
            size="small"            
            variant="outlined"
            value={phoneNumber}
            onChange={e=>{
              setPhoneNumber(e.target.value)
              if(e.target.value.length>9){
              setErrorPhoneNumber(true)
              }            
              else{
                setPhoneNumber(e.target.value)
              }
              if(e.target.value.length<=9){
                setErrorPhoneNumber(false)
              }
          }}
           error={errorPhoneNumber===true?true:null}
           helperText={errorPhoneNumber===true?"Please provide a valid mobile number":null}
          /> 
        </Grid>
        <Grid item md={12} style={{ marginTop: '10px' }}>
            <InputLabel htmlFor="region">Region/District Type</InputLabel>
            <Select
              fullWidth
              native
              
              value={region}
              onChange={(e)=>{
                setRegion(e.target.value)
                if(!e.target.value){
                  setErrorRegion(true)
                }
                else{
                  setErrorRegion(false)
                }
              }}
              error={errorRegion===true?true:null}
            >
              <option aria-label="None" value="" />
              <option value={"Riyadh"}>Riyadh</option>
              <option value={"Jeddah"}>Jeddah</option>
              <option value={"Mecca"}>Mecca</option>
              <option value={"Madina Al Monawra"}> Madina Al Monawra </option>
              <option value={"Eastern region"}> Eastern region</option>
              <option value={"Al Qazeem"}>Al Qazeem</option>             
              <option value={"Aseer, Tabuk"}>Aseer, Tabuk</option>
              <option value={"Hail"}>Hail</option>
              <option value={"Northern Borders"}>Northern Borders</option>
              <option value={"Madina Al Monawra"}>Patio, Jazan</option>
              <option value={"Hoof"}>Hoof</option>
              <option value={"Najran"}>Najran</option>
              <option value={"Outside Saudia Arabia"}>Outside Saudia Arabia</option>
              <option value={"Outside Saudi Arabia"}>Outside Saudi Arabia</option>
              
            </Select>
            </Grid>

            
            <Grid item md={4} style={{ marginTop: '10px' }}>  
                <Button
                  variant="contained"
                  component="label"
                  style={{color:"white",backgroundColor:"#7b40c0"}}
                  >
                  <CameraAltIcon />
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                   
                  />
                </Button>
            </Grid>
            <Grid item md={8} style={{ marginLeft:'-100px' }}> 
              <InputLabel component="p" >{image?image.name:null}</InputLabel>
            </Grid>    
           
        
           

            <Grid item md={12}>
            <CardActions style={{justifyContent:'center'}}>
                  <Button
                    variant="contained" color="primary"
                    fullWidth
                    style={{marginTop: "8px",color:"white",backgroundColor:"#7b40c0"}}
                    type="submit"
                    onClick={() => {                     
                      submitSignup(idType,idNumber,name, arabicName, email,password,phoneNumber,dateOfBirth,gender,region,"User")}}
                  >
                    Sign Up
                  </Button>
                  </CardActions>
                
                  <CardContent>
                  <Typography variant="body2" gutterBottom style={{color:'#A599B2',marginTop:'-7px'}}>By creating an account, you agree to our Terms & conditions and Privacy policy</Typography>
                  </CardContent>
              
                <CardActions style={{justifyContent:'center'}}>
               
               
                  <Button
                    fullWidth
                    style={{ marginTop: "12px",backgroundColor:'#E0E0E0',color:'#7b40c0' }}
                    onClick={() => router.push("/signup/consultant")}
                  >
                    Register as Consultant
                </Button>
                  
                </CardActions>
                <CardActions style={{ justifyContent: "center" }}>
                    <Button
                        style={{ marginTop: "12px",color:"#DA71D4" }}
                        onClick={() => router.push("/login")}
                      >
                        Already have an account?
                    </Button>
                </CardActions>

            </Grid>


        </Grid>
        
     
      </Card>
    </>
  );
};

export default UserSignup;
