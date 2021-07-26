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
  const classes = useStyles();
  const userId = useSelector(state=>{ return state.consultantReducer.userId});

  // console.log("Add appointment",props.userDetail)
  

  const submitRequest = async (subject,date,startTime,endTime) => {


     
    const data={
      // consultantId:props.userDetail.id,
      consultantId:userId,
      subject:subject,
      startDate:date+"T"+startTime,
      endDate: date+"T"+endTime
    }
    axios.post(baseURL+"/schedule",data)
    .then(res=>console.log(res.data))
    
    //clearing fields after submitting request
    subjectId.value="";
    dateId.value="";
    stimeId.value="";
    etimeId.value="";


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
            // defaultValue="2017-05-24"
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
            // defaultValue="07:30"
            fullWidth
            value={startTime}
            onChange={(e)=>{setStartTime(e.target.value)}}
            style={{marginTop:'15px'}}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          </Grid>
          <Grid item xs={6}>         
           <TextField
            id="etimeId"
            label="End Time"
            type="time"
            // defaultValue="07:30"
            fullWidth
            value={endTime}
            onChange={(e)=>{setEndTime(e.target.value)}}
            style={{marginTop:'15px',marginLeft:'10px'}}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          </Grid>

        </Grid>
      
      {console.log(date+"T"+startTime)}
      {console.log(date+"T"+endTime)}
        <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px" }}
            onClick={() => submitRequest(subject,date,startTime,endTime)}
           
            fullWidth
          >
            Submit
          </Button>
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
