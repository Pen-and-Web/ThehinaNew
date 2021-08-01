import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions/actions"
import { baseURL } from "../../env";
import Alert from "@material-ui/lab/Alert";
import Avatar from '@material-ui/core/Avatar';
import EditIcon from "@material-ui/icons/Edit";


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


const ProfilePicture = () => {
  const classes = useStyles();
  const adminDetail = useSelector((state) => {
    return state.adminReducer.adminDetail;
  });
  const [image, setImage] = useState("");
  const [errorImage  , setErrorImage] = useState(false);
   

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

    

  const dispatch = useDispatch();

  const updateProfile = () => {

    if(!image){
      setErrorAlert(true);
    }
    else{
      setErrorAlert(false);
      const body = {     
        file: image      
      };
    
      
      axios.post(baseURL + `/uploadFile?id=${adminDetail._id}`, body)
      .then((res) => {
        console.log("",res)
        // if (res.data.message === "User was updated successfully!") {
        //   setSuccessAlert(true);
        //   dispatch(actions.updateProfile(true));
        // }
      })
      .catch(err=>console.log(err))
    }

   
  };

  return (
    <>
      
          <Paper elevation={3} style={{ marginTop: "20px" }}>
            <form noValidate autoComplete="off" style={{ padding: "30px" }}>
              <Typography component="p" variant="h5" color="primary">
                Update your Profile Avatar
              </Typography>
              <Grid container spacing={1}>
               
        <Grid item md={6} xs={12} style={{ marginTop: "20px" }}>
                <Grid item  md={3}  >
                    <Avatar alt="profile picture" 
                    src={`/uploads/${adminDetail.imageUrl}`}
                    style={{width:"140px",height:"140px"}}
                    />          
                </Grid>

                <Grid item md={1} xs={1} style={{marginTop:'10px'}}>                    
                <input
                    id="adminImage"
                    type="file"
                    defaultValue={image}
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      setImage(e.target.files[0])   
                     }}                
                  />                  
                </Grid>
        </Grid>
                
      
        <Grid item md={12} xs={12}>      
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
         </Grid> 
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

export default ProfilePicture;
