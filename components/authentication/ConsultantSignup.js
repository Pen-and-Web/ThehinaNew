import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Input, Card, InputLabel, TextField, CardActions, Button, Typography, Select, Paper,CircularProgress} from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../redux-thunk/actions";
import { useRouter } from "next/router";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import purple from "@material-ui/core/colors/purple";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Alert from '@material-ui/lab/Alert';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
    margin: {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

const ConsultantSignup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const submitSignup = async (
    name,
    arabicName,
    email,
    password,
    mainDomain,
    summaryOfExpertise,
    hourPrice,
    phoneNumber,
    idNumber,
    idType,
    region,
    gender,
    IBAN,
    dateOfBirth,
    role
  ) => {
    phoneNumber = countryCode + phoneNumber;
    hourPrice = hourPrice + "SAR";
    setLoader(true);
    setBtnDisable(true);
    setDisable(true);
    setErrorAlert(false)
    if (
      errorIdType === true ||
      errorIdNumber === true ||
      errorName === true ||
      errorArabicName === true ||
      errorEmail === true ||
      errorPassword === true ||
      errorPhoneNumber === true ||
      errorMainDomain === true ||
      errorHourPrice === true ||
      errorSummaryOfExpertise === true ||
      idType === "" ||
      name === "" ||
      arabicName === "" ||
      email === "" ||
      password === "" ||
      mainDomain === "" ||
      summaryOfExpertise === "" ||
      hourPrice === "" ||
      phoneNumber === "" ||
      idNumber === "" ||
      idType === "" ||
      region === "" ||
      gender === "" ||
      dateOfBirth === ""
    ) {
      setDisable(false);
      setLoader(true);
      setBtnDisable(true);
      // console.log("found error");
      if (!idType) {
        setErrorIdType(true);
      }
      if (!idNumber) {
        setErrorIdNumber(true);
      }
      if (!name) {
        setErrorName(true);
      }
      if (!arabicName) {
        setErrorArabicName(true);
      }
      if (!email) {
        setErrorEmail(true);
      }
      if (!password) {
        setErrorPassword(true);
      }
      if (!countryCode) {
        setErrorCountryCode(true);
      }
      if (!phoneNumber) {
        setErrorPhoneNumber(true);
      }
      if (!mainDomain) {
        setErrorMainDomain(true);
      }
      if (!hourPrice) {
        setErrorHourPrice(true);
      }
      if (!summaryOfExpertise) {
        setErrorSummaryOfExpertise(true);
      }
      // if(!IBAN){
      //   setErrorIBAN(true)
      // }
      if (!gender) {
        setErrorGender(true);
      }
      if (!region) {
        setErrorRegion(true);
      }
    } else {
      // console.log("NO error");
      dispatch(
        actions.signup({
          name,
          arabicName,
          email,
          password,
          mainDomain,
          summaryOfExpertise,
          hourPrice,
          phoneNumber,
          idNumber,
          idType,
          region,
          gender,
          IBAN,
          dateOfBirth,
          image,
          role,
        })
      )
        .then((response) => {
          setLoader(false);
          setBtnDisable(false);
          if(response.token){          
            setSuccessAlert(true);
            setTimeout(function(){ router.push('/') }, 7000);
          }       
          // console.log("Consultant SignUp Response: ", response);
          if(response.error){
            if(response.error.message){
              setErrorMessage(response.error.message)
            }
            else{
              setErrorMessage(response.error)
            }
           
            setErrorAlert(true)
            
          }
        })
        .catch((error) => {
          // console.log("SignUp Error: ", error);
        });
    }
  };
  const [disable, setDisable] = useState(false);
  const [idType, setIdType] = useState("");
  const [errorIdType, setErrorIdType] = useState(false);

  const [IBAN, setIban] = useState("");
  const [errorIBAN, setErrorIBAN] = useState(false);

  const [idNumber, setIdNumber] = useState("");
  const [errorIdNumber, setErrorIdNumber] = useState(false);

  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);

  const [arabicName, setArabicName] = useState("");
  const [errorArabicName, setErrorArabicName] = useState(false);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState(false);

  const [countryCode, setCountryCode] = useState("");
  const [errorCountryCode, setErrorCountryCode] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [mainDomain, setMainDomain] = useState("");
  const [errorMainDomain, setErrorMainDomain] = useState(false);

  const [hourPrice, setHourPrice] = useState("");
  const [errorHourPrice, setErrorHourPrice] = useState(false);

  const [summaryOfExpertise, setSummaryOfExpertise] = useState("");
  const [errorSummaryOfExpertise, setErrorSummaryOfExpertise] = useState(false);

  const [image, setImage] = useState("");

  const [region, setRegion] = useState("");
  const [errorRegion, setErrorRegion] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState("1993-05-24");

  const [loader,setLoader] = useState(false);
  const [btnDisable,setBtnDisable] = useState(false);
  const [successAlert,setSuccessAlert] = useState(false);
  const [errorAlert,setErrorAlert] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  
  const alphabets = /^[a-zA-Z ]*$/;
  const mailformat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\/#?!@$%^&*-]).{8,}$/;
  const arregex = /[\u0600-\u06FF]/;

  return (
    <>
      <Paper elevation={3} style={{ padding: "10px", border: "1px solid #DADCE0" }}>
        <Typography align="center">
          <img
            src="https://thehina.com/assets/img/logo/logo.png"
            height="40%"
          />
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          style={{ marginTop: "20px", marginBottom: "20px", color: "#7b40c0",fontWeight:"500" }}
          align="center"
        >
          Create Your Consultant Account
        </Typography>
        
        <Grid container spacing={1} style={{ padding: "18px" }}>
          <Grid item md={3}>
            <InputLabel htmlFor="idType">Id Type</InputLabel>
            <Select
              fullWidth
              native
              value={idType}
              onChange={(e) => {
                setIdType(e.target.value);
                if (!e.target.value) {
                  setErrorIdType(true);
                } else {
                  setErrorIdType(false);
                }
              }}
              error={errorIdType === true ? true : null}
            >
              <option aria-label="None" value="" ></option>
              <option value={"Saudi National Id"}>Saudia National Id</option>
              <option value={"Saudi Iqama"}>Saudi Iqama</option>
              <option value={"No Saudi Id or Iqama"}>No Saudi Id or Iqama</option>
            </Select>
          </Grid>

          <Grid item md={9}>
            <TextField
              label="Id Number"
              type="number"
              value={idNumber}
              onChange={(e) => {
                setIdNumber(e.target.value);
                if (e.target.value.length > 10) {
                  setErrorIdNumber(true);
                }
                if (e.target.value.length < 11) {
                  setErrorIdNumber(true);
                }
                if (e.target.value.length === 10) {
                  setErrorIdNumber(false);
                }
              }}
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              autoComplete="fullName"
              variant="outlined"
              error={errorIdNumber === true ? true : null}
              helperText={
                errorIdNumber === true
                  ? "Please provide a valid ID number"
                  : null
              }
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              label="Full Name in English"
              type="text"
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              autoComplete="fullName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.length > 20) {
                  setErrorName(true);
                }
                if (e.target.value.length < 20) {
                  setErrorName(false);
                }
              }}
              error={errorName === true ? true : null}
              helperText={errorName === true ? "" : null}
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.match(mailformat)) {
                  setEmail(e.target.value);
                  setErrorEmail(false);
                } else {
                  setErrorEmail(true);
                }
              }}
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              autoComplete="current-email"
              variant="outlined"
              error={errorEmail === true ? true : null}
              helperText={
                errorEmail === true
                  ? "Please enter a Valid email address"
                  : null
              }
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.match(PASSWORD_REGEX)) {
                  setPassword(e.target.value);
                  setErrorPassword(false);
                } else {
                  setErrorPassword(true);
                }
              }}
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              autoComplete="current-password"
              variant="outlined"
              error={errorPassword === true ? true : null}
              helperText={
                errorPassword === true
                  ? "Password should have at least 8 characters, including one upper case, one lower case, one digit and one special character."
                  : null
              }
            />
          </Grid>
          <Grid item md={6} style={{ marginTop: "10px" }}>
            <TextField
              id="date"
              label="DOB"
              type="date"
              fullWidth
              defaultValue={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </Grid>

          <Grid item md={6} style={{ marginTop: "10px" }}>
            <InputLabel htmlFor="Gender">Gender</InputLabel>
            <Select
              fullWidth
              native
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                if (!e.target.value) {
                  setErrorGender(true);
                } else {
                  setErrorGender(false);
                }
              }}
              error={errorGender === true ? true : null}
            >
              <option aria-label="None" value="" />
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </Select>
          </Grid>

          <Grid item md={3} style={{ marginTop: "10px" }}>
            <InputLabel htmlFor="idType">Country Code</InputLabel>
            <Select
              fullWidth
              native
              value={countryCode}
              error={errorCountryCode === true ? true : null}
              onChange={(e) => {
                setCountryCode(e.target.value);
                if (!e.target.value) {
                  setErrorCountryCode(true);
                } else {
                  setErrorCountryCode(false);
                }
              }}
            >
              <option aria-label="None" value="" />
              <option value={"+966"}>+966</option>
            </Select>
          </Grid>

          <Grid item md={9} style={{ marginTop: "10px" }}>
            <TextField
              label="Mobile Number"
              type="number"
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (e.target.value.length > 9) {
                  setErrorPhoneNumber(true);
                }
                if (e.target.value.length === 9) {
                  setErrorPhoneNumber(false);
                } else if (e.target.value.length <= 9) {
                  setErrorPhoneNumber(true);
                }
              }}
              error={errorPhoneNumber === true ? true : null}
              helperText={
                errorPhoneNumber === true
                  ? "Please provide a valid mobile number"
                  : null
              }
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              label="Main Domain"
              type="text"
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              variant="outlined"
              value={mainDomain}
              onChange={(e) => {
                setMainDomain(e.target.value);
                if (e.target.value.length >= 30) {
                  setErrorMainDomain(true);
                } else if (e.target.value.length < 30) {
                  setErrorMainDomain(false);
                }
              }}
              error={errorMainDomain === true ? true : null}
              helperText={
                errorMainDomain === true
                  ? "Character length must be less than 30"
                  : null
              }
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              label="Hour Price"
              type="number"
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              variant="outlined"
              value={hourPrice}
              onChange={(e) => {
                setHourPrice(e.target.value);
                if (e.target.value.length > 4) {
                  setErrorHourPrice(true);
                } else if (e.target.value.length < 5) {
                  setErrorHourPrice(false);
                }
              }}
              error={errorHourPrice === true ? true : null}
              helperText={errorHourPrice === true ? "Invalid Hour Price" : null}
            />
          </Grid>

          <Grid item md={12}>
            <TextField
              label="Summary of Expertise"
              type="text"
              fullWidth
              style={{ marginTop: "10px" }}
              size="small"
              autoComplete="fullName"
              value={summaryOfExpertise}
              onChange={(e) => {
                setSummaryOfExpertise(e.target.value);
                if (e.target.value.length >= 1000) {
                  setErrorSummaryOfExpertise(true);
                } else if (e.target.value.length < 1000) {
                  setErrorSummaryOfExpertise(false);
                }
              }}
              error={errorSummaryOfExpertise === true ? true : null}
              helperText={
                errorSummaryOfExpertise === true
                  ? "Character length must be less than 10000"
                  : null
              }
              variant="outlined"
            />
          </Grid>
          {/* <Grid item md={12}>
                <TextField
                            label="Bank IBAN"
                            type="text"
                            value={IBAN}
                            onChange={e=>{
                              setIban(e.target.value)
                              if(e.target.value.length>24){
                                setErrorIBAN(true)
                              }
                              if(e.target.value.length===25){
                                setErrorIBAN(false)
                              }
                              else if(e.target.value.length<25){
                                setErrorIBAN(true)
                              }

                            }}
                            error={errorIBAN===true?true:null}
                            helperText={errorIBAN===true?"Invalid Bank Account Number":null}

                            fullWidth
                            style={{marginTop:"10px"}}
                            size="small"
                            variant="outlined"
                />
          </Grid> */}

          <Grid item md={12} style={{ marginTop: "10px" }}>
            <InputLabel htmlFor="region">Region/District Type</InputLabel>
            <Select
              fullWidth
              native
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                if (!e.target.value) {
                  setErrorRegion(true);
                } else {
                  setErrorRegion(false);
                }
              }}
              error={errorRegion === true ? true : null}
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

              <option value={"Outside Saudia Arabia"}>
                Outside Saudia Arabia
              </option>
            </Select>
          </Grid>

          <Grid item md={4} style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              component="label"
              style={{ color: "white", backgroundColor: "#7b40c0" }}
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
          <Grid item md={8} style={{ marginLeft: "-100px" }}>
            <InputLabel component="p">{image ? image.name : null}</InputLabel>
          </Grid>

          <Grid item md={12}>
            <CardActions style={{ justifyContent: "center", padding: "20px" }}>
            {btnDisable===false?
              <Button
                style={{ color: "white", backgroundColor: "#7b40c0",textTransform:"capitalize" }}
                variant="contained"
                fullWidth
                disabled={
                  !idType ||
                  !name ||
                  !arabicName ||
                  !email ||
                  !password ||
                  !mainDomain ||
                  !summaryOfExpertise ||
                  !hourPrice ||
                  !phoneNumber ||
                  !idNumber ||
                  !idType ||
                  !region ||
                  !gender ||
                  !dateOfBirth
                }
                // onClick={() => submitSignup(userName, email, password,type,"Consultant")}
                onClick={() =>
                  submitSignup(
                    name,
                    arabicName,
                    email,
                    password,
                    mainDomain,
                    summaryOfExpertise,
                    hourPrice,
                    phoneNumber,
                    idNumber,
                    idType,
                    region,
                    gender,
                    IBAN,
                    dateOfBirth,
                    "Consultant"
                  )
                }
              >
                Sign Up
              </Button>
              :
              <Button
                style={{ color: "white", backgroundColor: "#7b40c0",textTransform:"capitalize" }}
                variant="contained"
                fullWidth
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
            {successAlert===true?<Alert severity="success">Your Request has been submitted. Please wait until admin approved your request!</Alert>:null}
            {errorAlert===true?<Alert severity="error">{errorMessage}</Alert>:null}

            <CardActions style={{ justifyContent: "center" }}>
              <Button
                style={{ marginTop: "10px", color: "#DA71D4",textTransform:"capitalize" }}
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

export default ConsultantSignup;
