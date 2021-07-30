import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useDispatch,useSelector } from "react-redux";
import io from "socket.io-client";
import {baseURL} from '../../../env'
import Alert from '@material-ui/lab/Alert';
import { Box } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));
const AddSchedule = () =>{
    
  const [subject,setSubject] = useState('');
  const [date,setDate] = useState('');
  const [startTime,setStartTime] = useState('');
  const [endTime,setEndTime] = useState('');
  const [successAlert,setSuccessAlert] = useState(false);
  const [errorAlert,setErrorAlert] = useState(false);
  const [requiredFieldAlert,setRequiredFieldAlert] = useState(false);
  const classes = useStyles();
  const userId = useSelector(state=>{ return state.consultantReducer.userId});

  

  const submitRequest = async (subject,date,startTime,endTime) => {
    setSuccessAlert(false);
    setErrorAlert(false);
    setRequiredFieldAlert(false)
    if(!subject || !date || !startTime || !endTime){       
      setRequiredFieldAlert(true);
    }
    else{
          const data={
            consultantId:userId,
            subject:subject,
            startDate:date+"T"+startTime,
            endDate: date+"T"+endTime
          }
          axios.post(baseURL+"/schedule",data)
            .then(res=>{
              // console.log(res,"add schedule response")
              if(res.statusText==="OK"){
                // console.log("OK Response")
                setSuccessAlert(true)
              }
            })
            .catch(err=>{
              err.response.data.message?setErrorAlert(true):setErrorAlert(false);
            })
             //clearing fields after submitting request
                    subjectId.value="";
                    dateId.value="";
                    stimeId.value="";
                    etimeId.value="";
    }
    
    
  }

  return(
        <> 
        <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary" className={classes.link}>   
                       <HomeIcon className={classes.icon} />
                        Dashboard
                    </Typography>    
                    <Typography color="textPrimary" className={classes.link}
                        color="inherit"
                        href="/getting-started/installation/"                       
                        className={classes.link}
                      >
                    <EventIcon className={classes.icon} />
                      Schedule Appointment
                    </Typography>                    
        </Breadcrumbs>
        
        <Grid container>
          <Grid item md={6} xs={6}>
          
        <Paper elevation={3} style={{marginTop:"20px"}} >  
        <form  noValidate autoComplete="off" style={{padding:'30px'}}>
        
        <Typography component="p" variant="h5" color="primary">Schedule an Appointment</Typography>
        <TextField
            id="subjectId"
            label="Subject"
            fullWidth
            value={subject}
            onChange={(e)=>{setSubject(e.target.value)}}
            style={{ marginTop: '30px' }}
            size="small"          
            variant="outlined"
            />
          
            <TextField
            id="dateId"
            label="Appointment Date"
            type="date"
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}
            fullWidth
            style={{marginTop:'15px'}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Grid container>
            <Grid item xs={6}>
          <TextField
            id="stimeId"
            label="Start Time"
            type="time"
            fullWidth
            value={startTime}
            onChange={(e)=>{setStartTime(e.target.value)}}
            style={{marginTop:'15px'}}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, 
            }}
          />
          </Grid>
          <Grid item xs={6}>         
           <TextField
            id="etimeId"
            label="End Time"
            type="time"
            fullWidth
            value={endTime}
            onChange={(e)=>{setEndTime(e.target.value)}}
            style={{marginTop:'15px',marginLeft:'10px'}}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, 
            }}
          />
          </Grid>

        </Grid>
      
        <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px" }}
            onClick={() => submitRequest(subject,date,startTime,endTime)}
           
            fullWidth
          >
            Submit
          </Button>
          <Box style={{marginTop:'5px'}}>
          {successAlert===true?
              <Alert severity="success">Schedule has been created!</Alert>
            :
            null
            }
            {errorAlert===true?
                    <Alert severity="error">Slot already created. Please change the Slot!</Alert>

            :
            null
            }  
            {requiredFieldAlert===true?
            <Alert severity="warning">Please fill all the required fields</Alert>
              :
              null
              } 
          </Box>
           
         
       </form>   
       
        </Paper>
            </Grid>
            <Grid item md={1} ></Grid>
          <Grid item md={6} xs={8}>
             
          </Grid>

        </Grid>
        </>
    )
}

export default AddSchedule;
