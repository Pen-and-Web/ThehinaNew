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
} from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { baseURL, imgUrl } from "../../env";

const survey = () => {
  <Head>
    <title>Client Survey</title>
  </Head>;
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const router = useRouter();
  const appointmentId = router.query.index;
  const getAppointmentDetail = async () => {
    if (appointmentId) {
      await axios
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

  const submit = () => {
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
    console.log(data, "Answer Details");
    axios
      .post(baseURL + "/clientSurvey", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err, ""));
  };
  useEffect(() => {
    getAppointmentDetail();
  }, [appointmentId]);
  return (
    <>
      <Grid container style={{ marginTop: "100px" }}>
        <Grid item md={3}></Grid>
        <Grid item md={6} xs={12}>
          <Typography
            variant="h5"
            align="center"
            style={{ marginBottom: "20px" }}
          >
            Please complete the Survey
          </Typography>

          <Grid item md={12}>
            <InputLabel htmlFor="question1" style={{ marginTop: "10px" }}>
              On a scale of 1 to 10, how satisfied are you with your in-store
              experience today?
            </InputLabel>
            <Select
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
            </Select>
          </Grid>
          <Grid item md={12}>
            <InputLabel htmlFor="question1" style={{ marginTop: "10px" }}>
              How likely are you to recommend our services to others?
            </InputLabel>
            <TextField
              margin="dense"
              type="text"
              fullWidth
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
            />
          </Grid>
          <Grid item md={12}>
            <InputLabel style={{ marginTop: "10px" }} htmlFor="q3">
              Rate your satisfaction with our team in resolving your issue
            </InputLabel>
            <Select
              fullWidth
              native
              value={q3}
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
            <InputLabel style={{ marginTop: "10px" }} htmlFor="q4">
              Did you feel that our team answered your inquiry promptly?
            </InputLabel>
            <Select
              fullWidth
              native
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
            <InputLabel style={{ marginTop: "10px" }} htmlFor="q5">
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
            <InputLabel style={{ marginTop: "10px" }}>
              How likely are you to purchase again from us?
            </InputLabel>
            <TextField
              margin="dense"
              type="text"
              fullWidth
              value={q6}
              onChange={(e) => setQ6(e.target.value)}
            />
          </Grid>
          <Grid item md={12}>
            <InputLabel style={{ marginTop: "10px" }}>
              How likely are you to return to our website?
            </InputLabel>
            <TextField
              margin="dense"
              type="text"
              fullWidth
              value={q7}
              onChange={(e) => setQ7(e.target.value)}
            />
          </Grid>
          <Box align="right" style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={() => submit()}
            >
              Submit
            </Button>
            <Button variant="contained">Cancel</Button>
          </Box>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>
    </>
  );
};

export default survey;
