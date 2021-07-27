import Head from "next/head";
import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  Grid,
  Typography,
  InputLabel,
  TextField,
  Box,
  Divider,
  Paper ,
  CircularProgress 
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { useRouter } from "next/router";
import axios from "axios";
import { baseURL, imgUrl } from "../../env";

const consultantsurvey = () => {
  <Head>
    <title>Consultant Survey</title>
  </Head>;
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const router = useRouter();
  const appointmentId = router.query.index;
  const getAppointmentDetail = async () => {
    console.log(appointmentId, "helllo");
    if (appointmentId) {
      await axios
        .get(baseURL + `/appointment?appointmentId=${appointmentId}`)
        .then((res) => {
          setAppointmentDetail(res.data.Appointments);
          console.log(res.data.Appointments);
        });
    }
  };

  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [a4, setA4] = useState("");
  const [a5, setA5] = useState("");
  const [a6, setA6] = useState("");
  const [a7, setA7] = useState("");

  const [loader,setLoader] = useState(false);
  const [alert,setAlert] = useState(false);
  const [errorAlert,setErrorAlert] = useState(false);
  const [errorFields,setErrorFields] = useState(false);

  const submit = (a1, a2, a3, a4, a5, a6, a7) => {
    if(!a1 || !a2 || !a3 || !a4 || !a5 || !a6 || !a7){
      setErrorFields(true);
    }
    else{
      errorFields?setErrorFields(false):null;
        setLoader(true);
        const data = {
          userId: appointmentDetail.consultantData.consultantId,
          appointmentId: appointmentDetail._id,
          answer1: a1,
          answer2: a2,
          answer3: a3,
          answer4: a4,
          answer5: a5,
          answer6: a6,
          answer7: a7,
        };
        axios
          .post(baseURL + "/consultantSurvey", data)
          .then((res) =>{
            console.log(res);
            res.statusText==="OK"? setLoader(false) :null;   
            res.statusText==="OK"? setAlert(true) :null;   
            
            res.statusText==="Created"? setErrorAlert(true) :null;
            res.statusText==="Created"? setLoader(false) :null;  
            })
          .catch((err) =>{ console.log(err, ""); setLoader(false)});
    }
     
  };
  useEffect(() => {
    getAppointmentDetail();
  }, [appointmentId]);
  return (
    <>
     <Head>
      <title>Consultant Survey</title>
    </Head>
      <Grid container style={{ marginTop: "70px" }}>
        <Grid item md={3}></Grid>
       
        <Grid item md={6} >
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
            Consultant Satisfaction Survey
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

          <Grid item md={12} style={{ marginTop: "20px" }}>

            <InputLabel>
              How satisfied are you with the session in general?
            </InputLabel>
            <Select
              fullWidth
              native
              value={a1}
              id="answer1"
              onChange={(e) => setA1(e.target.value)}
            >
              <option aria-label="none"></option>
              <option value={"Very Satisfied"}>Very Satisfied</option>
              <option value={"Satisfied"}>Satisfied</option>
              <option value={"Neither satisfied nor dissatisfied"}>
                Neither satisfied nor dissatisfied
              </option>
              <option value={"Dissatisfied"}>Dissatisfied</option>
              <option value={"Very Dissatisfied"}>Very Dissatisfied</option>
            </Select>
          </Grid>

          <Grid item md={12} style={{ marginTop: "20px" }}>
            <InputLabel>
              The extent to which the customer is able to explain his problem?
            </InputLabel>
            <Select
              fullWidth
              native
              value={a2}
              id="a2"
              onChange={(e) => setA2(e.target.value)}
            >
              <option aria-label="none"></option>
              <option value={"Satisfactory"}>Satisfactory</option>
              <option value={"Not Satisfactory"}>Not Satisfactory</option>
            </Select>
          </Grid>

          <Grid item md={12} style={{ marginTop: "20px" }}>
            <InputLabel>
              The extent of the client's knowledge of the work environment?
            </InputLabel>
            <Select
              fullWidth
              native
              value={a3}
              id="a3"
              onChange={(e) => setA3(e.target.value)}
            >
              <option aria-label="none"></option>
              <option value={"Good"}>Good</option>
              <option value={"Very Good"}>Very Good</option>
              <option value={"Intermediate"}>Intermediate</option>
              <option value={"Poor"}>Poor</option>
              <option value={"Very Bad"}>Very Bad</option>
            </Select>
          </Grid>
          <Grid item md={12} style={{ marginTop: "20px" }}>
            <InputLabel>
              The level of the client's interaction in the session with the
              advisor?
            </InputLabel>
            <Select
              fullWidth
              native
              value={a4}
              id="a4"
              onChange={(e) => setA4(e.target.value)}
            >
              <option aria-label="none"></option>
              <option value={"Good"}>Good</option>
              <option value={"Very Good"}>Very Good</option>
              <option value={"Intermediate"}>Intermediate</option>
              <option value={"Poor"}>Poor</option>
              <option value={"Very Bad"}>Very Bad</option>
            </Select>
          </Grid>
          <Grid item md={12} style={{ marginTop: "20px" }}>
            <InputLabel>
              How satisfied are you with the idea proposed by the customer?
            </InputLabel>
            <Select
              fullWidth
              native
              value={a5}
              id="a5"
              onChange={(e) => setA5(e.target.value)}
            >
              <option aria-label="none"></option>
              <option value={"Very Satisfied"}>Very Satisfied</option>
              <option value={"Satisfied"}>Satisfied</option>
              <option value={"Neither satisfied nor dissatisfied"}>
                Neither satisfied nor dissatisfied
              </option>
              <option value={"Dissatisfied"}>Dissatisfied</option>
              <option value={"Very Dissatisfied"}>Very Dissatisfied</option>
            </Select>
          </Grid>
          <Grid item md={12} style={{ marginTop: "20px" }}>
            <InputLabel>Is the idea feasible?</InputLabel>
            <Select
              fullWidth
              native
              value={a6}
              id="a6"
              onChange={(e) => setA6(e.target.value)}
            >
              <option aria-label="none"></option>
              <option value={"Yes"}>Yes</option>
              <option value={"No"}>No</option>
            </Select>
          </Grid>
          <Grid item md={12} style={{ marginTop: "20px" }}>
            <InputLabel>
              Is there anything that bothered you in the session? If yes, please
              explain.
            </InputLabel>
            <TextField
              margin="dense"
              type="text"
              fullWidth
              value={a7}
              id="a7"
              onChange={(e) => setA7(e.target.value)}
            />
          </Grid>
        
          <Box style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px",color: "white",backgroundColor: "#7b40c0" }}
              onClick={() => submit(a1, a2, a3, a4, a5, a6, a7)}
            >
              Submit
            </Button>         
            
          </Box>
          <center>
           {loader===true?<CircularProgress />:null}
           {errorAlert===true?<Alert severity="error">Survey Already Submitted</Alert>:null}</center>
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

export default consultantsurvey;
