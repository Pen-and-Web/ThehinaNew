import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid,FormControl,Input,Card,Paper,TextField,Button,Typography,InputLabel,Select,CircularProgress,MenuItem} from "@material-ui/core";
import Image from 'next/image'
import { useDispatch } from "react-redux";
import * as actions from "../../redux-thunk/actions";
import { useRouter } from "next/router";
import { CardActions, CardContent, Divider } from "@material-ui/core";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  formControl: {
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

  const [dateOfBirth, setDateOfBirth] = useState("1990-12-12");
  const [errorDOB,setErrorDOB] = useState(false);

  const [image, setImage] = useState("");
  const [errorImage,setErrorImage] = useState(false);


  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [region, setRegion] = useState('');
  const [errorRegion,setErrorRegion] = useState(false);
  const [loader,setLoader] = useState(false);

  const [btnDisable,setBtnDisable] = useState(false);
  const [errorAlert,setErrorAlert] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");


  const submitSignup = async (idType,idNumber,name, arabicName, email,password,phoneNumber,dateOfBirth,gender,region,role) => {
    setLoader(true);
    setBtnDisable(true);
    setErrorAlert(false)

    //concatinate country code with phone Number
    phoneNumber=countryCode+phoneNumber;

    if(errorIdNo===true||errorName===true|| errorPhoneNumber===true||  errorEmail===true|| errorPassword===true || errorGender===true || idType==="" ||  idNumber===""|| name===""|| arabicName==="" || email==="" || password===""|| gender==="" ||phoneNumber==="" || region==="" || dateOfBirth==="" ){
      setLoader(false);
      setBtnDisable(false);

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
      // console.log("No error")
      dispatch(actions.userSignup({ idType,idNumber,name, arabicName, email,password,phoneNumber,dateOfBirth,gender,region,image,role}))
      .then((response) => {
        
        setLoader(false);
        setBtnDisable(false);
        if(response.token){          
          router.push("/");
        }   
        if(response.error){
          if(response.error.message){
            setErrorMessage(response.error.message)
          }
          else{
            setErrorMessage(response.error)
          }
         
          setErrorAlert(true)
        } 
            
        console.log("SignUp Response: ", response);
      })
      .catch((error) => {
        setLoader(false);
        console.log("SignUp Error: ", error);
      });
    }

    // userIdType.value="";
    // userIdNumber.value="";
    // userEName.value="";
    // userAName.value="";
    // userEmail.value="";
    // userPassword.value="";
    // userDate.value="";
    // userGender.value="";
    // userCountryCode.value="";
    // userMobileNumber.value="";
    // userRegion.value="";
    // userImage.value="";
  };

  
  const mailformat =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const alphabets = /^[a-zA-Z ]*$/;
  const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\/#?!@$%^&*-]).{8,}$/;
  const arregex = /[\u0600-\u06FF]/;

  return (
    <>
      <Paper elevation={3} style={{ padding: "10px", border: "1px solid #DADCE0" }}>
      <Typography   align="center">
       <img
            src="https://thehina.com/assets/img/logo/logo.png"
            
            height="40%"
          />
      </Typography>
      <Typography
          variant="h5"
          component="h2"
          align="center"
          style={{color:"#7b40c0",marginTop:'20px',marginBottom:'10px',padding:'10px',fontWeight:"500"}}          
        >Create Thehina Admin Account          
        </Typography>  
        
        <Grid container  spacing={1} style={{padding:"18px"}} >
          
        <Grid item md={4} xs={3}>
          {/* <FormControl>
                <InputLabel htmlFor="idType">Id Type</InputLabel>
                    <Select
                      fullWidth
                      native
                      id="userIdType"
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
                      
                      <MenuItem value={"Saudi National Id"}>Saudia National Id</MenuItem>
                      <MenuItem value={"Saudi Iqama"}>Saudi Iqama</MenuItem>
                      <MenuItem value={"No Saudi Id or Iqama"}>No Saudi Id or Iqama</MenuItem>
                    </Select>
              </FormControl> */}
          <FormControl className={classes.formControl}>
            <InputLabel id="userIdType">Id Type</InputLabel>
            <Select
              labelId="userIdType"
              id="userIdType"
                      value={idType || 'Select Id'}

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
              <MenuItem value={"Saudi National Id"}>Saudia National Id</MenuItem>
              <MenuItem value={"Saudi Iqama"}>Saudi Iqama</MenuItem>
              <MenuItem value={"No Saudi Id or Iqama"}>No Saudi Id or Iqama</MenuItem>
            </Select>
         </FormControl>
            </Grid>
        
        <Grid item md={8} xs={9}>
                <TextField
                  label="Id Number"
                  id="userIdNumber"
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
         
          <Grid item  md={6} xs={12}>
        <TextField          
              label="Full Name in English"
              id="userEName"             
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

        <Grid item md={6} xs={12}>
            <TextField
              label="Full Name in Arabic"
              id="userAName"
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
           
        
        <Grid item md={6} xs={12}> 
        <TextField
             label="Email"
             type="email"
             id="userEmail"
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
         
          
        
        <Grid item md={6} xs={12}>
            <TextField              
              type="password"
              label="Password"
              id="userPassword"
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
          <Grid item md={6} xs={6} style={{ marginTop: '10px' }}>
          <TextField
              id="userDate"
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
          <Grid item md={6} xs={6} style={{ marginTop: '10px' }}>
            <InputLabel htmlFor="Gender">Gender</InputLabel>
            <Select
              fullWidth
              id="userGender"
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

        <Grid item md={3} xs={3} style={{ marginTop: '10px' }}>
            <InputLabel htmlFor="idType">Country Code</InputLabel>
                <Select
                  fullWidth
                  native
                  id="userCountryCode"
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

          <Grid item md={9} xs={9} style={{ marginTop: '10px' }}> 
        <TextField                     
            label="Mobile Number"
            id="userMobileNumber"
            type="number"
            fullWidth
            style={{marginTop:"10px"}}
            size="small"            
            variant="outlined"
            value={phoneNumber}
            onChange={e=>{
              setPhoneNumber(e.target.value)
              if(e.target.value.length===9){
                setErrorPhoneNumber(false)
              }            
              else{
                setErrorPhoneNumber(true)
              }
              
          }}
           error={errorPhoneNumber===true?true:null}
           helperText={errorPhoneNumber===true?"Please provide a valid mobile number":null}
          /> 
        </Grid>
        <Grid item md={12} xs={12} style={{ marginTop: '10px' }}>
            <InputLabel htmlFor="region">Region/District Type</InputLabel>
            <Select
              fullWidth
              native
              id="userRegion"
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
                    id="userImage"
                    type="file"
                    hidden
                    defaultValue={image}
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
              {btnDisable===false?
                  <Button
                  variant="contained" color="primary"
                  fullWidth
                  style={{marginTop: "8px",color:"white",backgroundColor:"#7b40c0",textTransform:"capitalize"}}
                  type="submit"
                  onClick={() => {                     
                    submitSignup(idType,idNumber,name, arabicName, email,password,phoneNumber,dateOfBirth,gender,region,"Admin")}}
                >
                  Sign Up
                </Button>
                :
                <Button
                  variant="contained" color="primary"
                  fullWidth
                  style={{marginTop: "8px",color:"white",backgroundColor:"#7b40c0",textTransform:"capitalize"}}
                >
                  Sign Up
                </Button>               
            }
                  
                  </CardActions>
                  {loader === true ? (
                        <center>
                          <CircularProgress color="primary" />
                        </center>
                      ) : null}
                  {errorAlert===true?<Alert severity="error">{errorMessage}</Alert>:null}
                  <CardContent>
                  <Typography variant="body2" gutterBottom style={{color:'#A599B2',marginTop:'-7px'}}>By creating an account, you agree to our Terms & conditions and Privacy policy</Typography>
                  </CardContent>
              
               
                <CardActions style={{ justifyContent: "center" }}>
                    <Button
                        style={{ marginTop: "10px",color:"#DA71D4",textTransform:"capitalize" }}
                        onClick={() => router.push("/login")}
                      >
                        Already have an account?
                    </Button>
                </CardActions>

            </Grid>


        </Grid>
        
     
      </Paper>
    </>
  );
};

export default UserSignup;
