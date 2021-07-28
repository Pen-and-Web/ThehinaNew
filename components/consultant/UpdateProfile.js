import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import * as actions from "./redux/actions";
import { baseURL } from "../../env";
import Alert from "@material-ui/lab/Alert";
import BankAccount from './BankAccount'
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tbheading: {
    color: "#FFFFFF",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    display: "flex",
  },
}));

const UpdateProfile = () => {
  const classes = useStyles();
  const userDetail = useSelector((state) => {
    return state.consultantReducer.userLoggedInDetail.user;
  });
  const [nationalId, setNationalId] = useState(userDetail.idNumber);
  const [name, setName] = useState(userDetail.name);
  const [arabicName, setArabicName] = useState(userDetail.arabicName);
  const [dob, setDob] = useState(userDetail.dateOfBirth);
  const [mainDomain, setMainDomain] = useState(userDetail.mainDomain);
  const [hourPrice, setHourPrice] = useState(userDetail.hourPrice);
  const [phoneNumber, setPhoneNumber] = useState(userDetail.phoneNumber);
  const [iban, setIban] = useState(userDetail.IBAN);
  const [summaryOfExpertise, setSummaryOfExpertise] = useState(
    userDetail.summaryOfExpertise
  );
  const [successAlert, setSuccessAlert] = useState(false);

  const dispatch = useDispatch();

  const updateProfile = () => {
    const body = {
      idNumber: nationalId,
      name: name,
      arabicName: arabicName,
      dateOfBirth: dob,
      mainDomain: mainDomain,
      hourPrice: hourPrice,
      phoneNumber: phoneNumber,
      IBAN: iban,
      summaryOfExpertise: summaryOfExpertise,
    };
    axios.patch(baseURL + `/user?id=${userDetail._id}`, body).then((res) => {
      if (res.data.message === "User was updated successfully!") {
        setSuccessAlert(true);
        dispatch(actions.updateProfile(true));
      }
    });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Paper elevation={3} style={{ marginTop: "20px" }}>
            <form noValidate autoComplete="off" style={{ padding: "30px" }}>
              <Typography component="p" variant="h5" color="primary">
                Update Profile
              </Typography>
              <Grid container spacing={1}>
                {/* <Grid item  md={3}  >
        <Avatar alt="profile picture" 
          src={`/uploads/${userDetail.imageUrl}`}
          style={{width:"170px",height:"170px"}}
          />
          
      </Grid>
      <Grid item md={1} xs={1}>
        <Button
          variant="contained"
          component="label"
          >
         <EditIcon />
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e)=>{setProfilePicture(e.target.value)}}
          />
        </Button>
      </Grid>
      <Grid item md={8} xs={8} ></Grid> */}
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    defaultValue={userDetail.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    style={{ marginTop: "30px" }}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="subjectId"
                    label="Arabic Name"
                    fullWidth
                    defaultValue={userDetail.arabicName}
                    onChange={(e) => {
                      setArabicName(e.target.value);
                    }}
                    style={{ marginTop: "30px" }}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id="dateId"
                    label="National Id"
                    type="text"
                    defaultValue={userDetail.idNumber}
                    onChange={(e) => {
                      setNationalId(e.target.value);
                    }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id="dateId"
                    label="DOB"
                    type="date"
                    defaultValue={userDetail.dateOfBirth}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id="dateId"
                    label="Main domain"
                    type="text"
                    defaultValue={userDetail.mainDomain}
                    onChange={(e) => {
                      setMainDomain(e.target.value);
                    }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="dateId"
                    label="Hour Price"
                    type="text"
                    defaultValue={userDetail.hourPrice}
                    onChange={(e) => {
                      setHourPrice(e.target.value);
                    }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    id="dateId"
                    label="Mobile Number"
                    type="text"
                    defaultValue={userDetail.phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {/* <Grid item md={4} xs={12}>
                  <TextField
                    id="dateId"
                    label="IBAN"
                    type="text"
                    defaultValue={userDetail.IBAN}
                    onChange={(e) => {
                      setIban(e.target.value);
                    }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid> */}
                <Grid item md={12} xs={12}>
                  <TextField
                    id="dateId"
                    label="Summary of expertise"
                    type="text"
                    defaultValue={userDetail.summaryOfExpertise}
                    onChange={(e) => {
                      setSummaryOfExpertise(e.target.value);
                    }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px" }}
                  fullWidth
                  onClick={() => {
                    updateProfile();
                  }}
                >
                  Update
                </Button>
                {successAlert === true ? (
                  <Alert severity="success">
                    Profile information is updated!
                  </Alert>
                ) : null}
              </Grid>
            </form>
          </Paper>
        </Grid>
        
        <Grid item md={6} xs={12} style={{ marginTop: "20px" }}>
          <BankAccount />
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateProfile;
