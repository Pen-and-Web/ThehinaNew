import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./redux/actions";
import { baseURL } from "../../env";
import Alert from "@material-ui/lab/Alert";
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


const BankAccount = () => {
  const classes = useStyles();
  const userDetail = useSelector((state) => {
    return state.consultantReducer.userLoggedInDetail.user;
  });
  const [countryCode, setcountryCode] = useState("SA");
  const [iban, setIban] = useState(userDetail.IBAN.slice(2,23));
  const [errorIban  , setErrorIban] = useState(false);
   

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

    

  const dispatch = useDispatch();

  const updateProfile = () => {

    if(!iban || errorIban){
      setErrorAlert(true);
    }
    else{
      setErrorAlert(false);
      const body = {     
        IBAN: countryCode+iban      
      };
      
      axios.patch(baseURL + `/user?id=${userDetail._id}`, body).then((res) => {
        if (res.data.message === "User was updated successfully!") {
          setSuccessAlert(true);
          dispatch(actions.updateProfile(true));
        }
      });
    }

   
  };

  return (
    <>
      
          <Paper elevation={3} >
            <form noValidate autoComplete="off" style={{ padding: "30px" }}>
              <Typography component="p" variant="h5" color="primary">
                Update your Bank Account Information
              </Typography>
              <Grid container spacing={1}>
              <Grid item md={1} xs={1}>
             
                  <TextField
                    id="dateId"
                    label="ISO"
                    type="text"
                    value={countryCode}
                    // onChange={(e) => {
                    //   setcountryCode(e.target.value);
                    // }}
                    fullWidth
                    style={{ marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>               
                <Grid item md={11} xs={11}>
                    <TextField
                        id="dateId"
                        label="IBAN"
                        type="number"
                        value={iban}
                        onChange={(e) => {
                            if(e.target.value.length<=22 || e.target.value.length===22)
                            {
                                setIban(e.target.value) 
                                setErrorIban(false)
                            }
                           if(e.target.value.length<22){
                               setErrorIban(true)
                           }
                                                                                
                        }}
                        error={errorIban === true ? true : null}
                        helperText={
                            errorIban === true
                            ? "Please provide a valid IBAN"
                            : null
                        }
                        fullWidth
                        style={{ marginTop: "15px" }}
                    />
                </Grid>      
                
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px" }}
                  
                  onClick={() => {
                    updateProfile();
                  }}
                >
                  Update
                </Button>
                <Grid item md={12} xs={12} style={{marginTop:"5px"}}>
                {successAlert === true ? (
                  <Alert severity="success">
                   Bank Account Information has been updated.
                  </Alert>
                ) : null}

                {errorAlert === true ? (
                <Alert severity="error">Please Provide a valid IBAN!</Alert>
                ) : null}
                </Grid>
              </Grid>
              </form>
              </Paper>
              
       
        
      
    </>
  );
};

export default BankAccount;
