import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import * as actions from '../redux/actions'
import { useDispatch,useSelector } from "react-redux";
import { baseURL } from "../../../env";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  //   padding:'20px'
  },
  container:{
      // padding:'50px'
  },
  tbheading:{
      color:'#FFFFFF'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    display: 'flex',
  },
  
}));

const UpdateSchedule = (props) => {
  const classes = useStyles();

  console.log("Update Schedule Props",props.data);
  const [subject,setSubject] = useState(props.data.subject);
  const [date,setDate] = useState(props.data.date);
  const [startTime,setStartTime] = useState(props.data.startTime);
  const [endTime,setEndTime] = useState(props.data.endTime);
  const [preview,setPreview] =useState(props.previewOnUpdate)
  const userId = useSelector(state=>{ return state.consultantReducer.userId});
  const dispatch = useDispatch();

  const submit = async(subject,date,startTime,endTime)=>{
    const data={
      id:props.data.id,
      subject:subject,
      startDate:date+"T"+startTime,
      endDate:date+"T"+endTime,
    }
    
    axios.put(baseURL+`/schedule?scheduleId=${props.data.id}`,data)
    .then(res=>{
      console.log("update response from updateSchedule",res.data)
      // console.log("Checking put request of update schedule",res.data);
      dispatch(actions.submitUpdateRecord(true))
    }
    )

    // dispatch(actions.updateScheduleRecord(data))
    //  dispatch(actions.submitUpdateRecord(true))
    
    
   //clearing input fields after submitting put request
      subjectId.value="";
      dateId.value="";
      stimeId.value="";
      etimeId.value="";
  }

  return (
    <>
    
    <Grid container>
          <Grid item md={6} xs={6}>
          
        <Paper elevation={3} style={{marginTop:"20px"}} >  
        <form  noValidate autoComplete="off" style={{padding:'30px'}}>
        
        <Typography component="p" variant="h5" color="primary">Update Schedule</Typography>
        <TextField
            id="subjectId"
            label="Subject"
            fullWidth
            defaultValue={props.data.subject}
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
            defaultValue={props.data.date}
            
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
            defaultValue={props.data.startTime}
            // defaultValue="07:30"
            onChange={(e)=>{setStartTime(e.target.value)}}
            fullWidth
           
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
            defaultValue={props.data.endTime}
            fullWidth
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
      
      
        <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px" }}
            fullWidth
            onClick={()=>submit(subject,date,startTime,endTime)}            
          >
            Update
          </Button>
       </form>   
       
        </Paper>
            </Grid>
            <Grid item md={1} ></Grid>
          <Grid item md={6} xs={8}>
             
          </Grid>

        </Grid>
    </>
  );
};

export default UpdateSchedule;
