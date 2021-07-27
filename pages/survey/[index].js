import Head from "next/head";
import React, { useState, useEffect } from "react";
import {
  Select,
  Box,
  Button,
  Typography,
  Grid,
  InputLabel,
  TextField,
  Divider,
  Paper ,
  CircularProgress,
  RadioGroup ,
  FormControlLabel,
  Radio 
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { useRouter } from "next/router";
import axios from "axios";
import { baseURL, imgUrl } from "../../env";

const survey = () => {
  
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const router = useRouter();
  const appointmentId = router.query.index;
  const getAppointmentDetail =  () => {
    if (appointmentId) {
       axios
        .get(baseURL + `/appointment?appointmentId=${appointmentId}`)
        .then((res) => {
          setAppointmentDetail(res.data.Appointments);
        });
    }
  };

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [q7, setQ7] = useState("");
  const [loader,setLoader] = useState(false);
  const [alert,setAlert] = useState(false);
  const [errorAlert,setErrorAlert] = useState(false);
  const [errorFields,setErrorFields] = useState(false);

  const submit = () => {
    if(!q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7){
      setErrorFields(true);
    }
    else{
      errorFields?setErrorFields(false):null;
      setLoader(true);
      const data = {
        userId: appointmentDetail.clientData.clientId,
        appointmentId: appointmentDetail._id,
        answer1: q1,
        answer2: q2,
        answer3: q3,
        answer4: q4,
        answer5: q5,
        answer6: q6,
        answer7: q7,
      };
      console.log("userID",appointmentDetail)
      console.log(data, "Answer Details");
      axios
        .post(baseURL + "/clientSurvey", data)
        .then((res) =>{
          console.log(res);
          res.statusText==="OK"? setLoader(false) :null; 
          res.statusText==="OK"? setAlert(true) :null;   
    
          res.statusText==="Created"? setErrorAlert(true) :null;
          res.statusText==="Created"? setLoader(false) :null;        
         })
        .catch((err) => console.log(err, ""));
    }
   
  };
  useEffect(() => {
    getAppointmentDetail();
  }, [appointmentId]);
  return (
    <>
    <Head>
      <title>Client Survey</title>
    </Head>
      <Grid container style={{ marginTop: "100px" }}>
        <Grid item md={3}></Grid>
       
        <Grid item md={6} xs={12}>
        <Paper elevation={3} style={{padding:'30px'}}>
        <Typography align="center">
          <img
            src="https://thehina.com/assets/img/logo/logo.png"
            height="40%"
          />
        </Typography>
        <Typography
            variant="h5"            
            style={{ marginBottom: "20px", color:"#7b40c0",marginTop:'30px' }}
          >
            Customer Satisfaction Survey
          </Typography>
          <Divider />
          {alert===false?
          <>
          <Typography
            component="p"           
            style={{ marginBottom: "20px",color:"#009688" }}
          >
            Tell us about your experience
          </Typography>
          {errorFields===true?<Alert severity="error">Please Fill all the required fields</Alert>:null}
          <Grid item md={12}>
            <InputLabel htmlFor="question1" style={{ marginTop: "20px" }}>
              On a scale of 1 to 10, how satisfied are you with your in-store
              experience today?
            </InputLabel>
            {/* <Select
              fullWidth
              native
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
            >
              <option aria-label="none"></option>
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"7"}>7</option>
              <option value={"8"}>8</option>
              <option value={"9"}>9</option>
              <option value={"10"}>10</option>
            </Select> */}
             <RadioGroup row aria-label="position" name="position" defaultValue="top" value={q1}  required onChange={(e) => setQ1(e.target.value)}>              
              <FormControlLabel
                value={"1"}
                control={<Radio color="primary" />}
                label="1"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"2"}
                control={<Radio color="primary" />}
                label="2"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"3"}
                control={<Radio color="primary" />}
                label="3"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"4"}
                control={<Radio color="primary" />}
                label="4"
                labelPlacement="end"
              />  
              <FormControlLabel
                value={"5"}
                control={<Radio color="primary" />}
                label="5"
                labelPlacement="end"
              />  
              <FormControlLabel
                value={"6"}
                control={<Radio color="primary" />}
                label="6"
                labelPlacement="end"
              />  
              <FormControlLabel
                value={"7"}
                control={<Radio color="primary" />}
                label="7"
                labelPlacement="end"
              />              
              <FormControlLabel
                value={"8"}
                control={<Radio color="primary" />}
                label="8"
                labelPlacement="end"
              />  
              <FormControlLabel
                value={"9"}
                control={<Radio color="primary" />}
                label="9"
                labelPlacement="end"
              />  
              <FormControlLabel
                value={"10"}
                control={<Radio color="primary" />}
                label="10"
                labelPlacement="end"
              />  
          </RadioGroup>
          </Grid>
          <Grid item md={12}>
            <InputLabel htmlFor="question1" style={{ marginTop: "20px" }}>
              How likely are you to recommend our services to others?
            </InputLabel>
            {/* <TextField
              margin="dense"
              type="text"
              fullWidth
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
            /> */}
            <RadioGroup row aria-label="position" name="position" required defaultValue="top" value={q2} onChange={(e) => setQ2(e.target.value)}>              
              <FormControlLabel
                value={"1"}
                control={<Radio color="primary" />}
                label="1"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"2"}
                control={<Radio color="primary" />}
                label="2"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"3"}
                control={<Radio color="primary" />}
                label="3"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"4"}
                control={<Radio color="primary" />}
                label="4"
                labelPlacement="end"
              />  
            </RadioGroup>
          </Grid>
          <Grid item md={12}>
            <InputLabel style={{ marginTop: "20px" }} htmlFor="q3">
              Rate your satisfaction with our team in resolving your issue?
            </InputLabel>
            <Select
              fullWidth
              native
              value={q3}
              required
              onChange={(e) => setQ3(e.target.value)}
              id="q3"
            >
              <option aria-label="none"></option>
              <option value={"Excellent"}>Excellent</option>
              <option value={"Good"}>Good</option>
              <option value={"Average"}>Average</option>
              <option value={"Bad"}>Bad</option>
            </Select>
          </Grid>
          <Grid item md={12}>
            <InputLabel style={{ marginTop: "20px" }} htmlFor="q4">
              Did you feel that our team answered your inquiry promptly?
            </InputLabel>
            <Select
              fullWidth
              native
              required
              value={q4}
              onChange={(e) => setQ4(e.target.value)}
              id="q4"
            >
              <option aria-label="none"></option>
              <option value={"Yes"}>Yes</option>
              <option value={"No"}>No</option>
            </Select>
          </Grid>
          <Grid item md={12}>
            <InputLabel style={{ marginTop: "20px" }} htmlFor="q5">
              Do you agree or disagree that your issue was effectively resolved?
            </InputLabel>
            <Select
              fullWidth
              native
              value={q5}
              onChange={(e) => setQ5(e.target.value)}
              id="q5"
            >
              <option aria-label="none"></option>
              <option value={"Agree"}>Agree</option>
              <option value={"Disagree"}>Disagree</option>
            </Select>
          </Grid>
          <Grid item md={12}>
            <InputLabel style={{ marginTop: "20px" }}>
              How likely are you to purchase again from us?
            </InputLabel>
            {/* <TextField
              margin="dense"
              type="text"
              fullWidth
              value={q6}
              onChange={(e) => setQ6(e.target.value)}
            /> */}
            <RadioGroup row aria-label="position" name="position" required defaultValue="top" value={q6} onChange={(e) => setQ6(e.target.value)}>              
              <FormControlLabel
                value={"1"}
                control={<Radio color="primary" />}
                label="1"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"2"}
                control={<Radio color="primary" />}
                label="2"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"3"}
                control={<Radio color="primary" />}
                label="3"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"4"}
                control={<Radio color="primary" />}
                label="4"
                labelPlacement="end"
              />              
          </RadioGroup>
          </Grid>
          <Grid item md={12}>
            <InputLabel style={{ marginTop: "20px" }}>
              How likely are you to return to our website?
            </InputLabel>
            {/* <TextField
              margin="dense"
              type="text"
              fullWidth
              value={q7}
              onChange={(e) => setQ7(e.target.value)}
            /> */}
            <RadioGroup row aria-label="position" name="position" required defaultValue="top" value={q7} onChange={(e) => setQ7(e.target.value)}>              
              <FormControlLabel
                value={"1"}
                control={<Radio color="primary" />}
                label="1"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"2"}
                control={<Radio color="primary" />}
                label="2"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"3"}
                control={<Radio color="primary" />}
                label="3"
                labelPlacement="end"
              />
              <FormControlLabel
                value={"4"}
                control={<Radio color="primary" />}
                label="4 "
                labelPlacement="end"
              />              
          </RadioGroup>
          </Grid>


          <Box  style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px",color: "white",backgroundColor: "#7b40c0" }}

              onClick={() => submit()}
            >
              Submit
            </Button>
          </Box>
         
          <center>
           {loader===true?<CircularProgress />:null}
           {errorAlert===true?<Alert severity="error">Survey Already Submitted</Alert>:null}
          
          </center>
          </>
           :
           <Alert severity="success">Thank you for completing our survey!</Alert>}
          </Paper>
        </Grid>
        
        
        <Grid item md={3}></Grid>
      </Grid>
    </>
  );
};

export default survey;
