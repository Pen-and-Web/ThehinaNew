import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import { useDispatch } from "react-redux";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {baseURL} from '../../../env'
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container:{
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



const ViewAppointment = ({data}) => {
  const [feedbackData,setFeedbackData] = useState({stars:null,feedback:""})
  const classes = useStyles();

const appointmentDetail = () =>{
  axios.get(baseURL+`/appointment?appointmentId=${data.id}`)
   .then(res=>setFeedbackData({stars:res.data.Appointments.stars,feedback:res.data.Appointments.feedback}))
 
}
console.log("Data status",data.status)
useEffect(()=>appointmentDetail(),[]) 
  return (
    <>
    
    <Grid container>
          <Grid item md={6} xs={6}>
          
        <Paper elevation={3} style={{marginTop:"20px"}} >  
        <form  noValidate autoComplete="off" style={{padding:'30px'}}>
          <TextField
            id="clientName"
            label="Client Name"
            fullWidth
            value={data.clientName}
            style={{ marginTop: '30px' }}
            size="small"          
            variant="outlined"
            />

          <TextField
            id="subjectId"
            label="Email"
            fullWidth
            value={data.email}
            style={{ marginTop: '30px' }}
            size="small"          
            variant="outlined"
            />

          
          
            <TextField
              id="dateId"
              label="Appointment Date"
              type="date"
              defaultValue={data.date}
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
            value={data.startTime}
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
            value={data.endTime}
            fullWidth
            style={{marginTop:'15px',marginLeft:'10px'}}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          </Grid>
          <Grid item xs={12} style={{marginTop:'15px'}}>
                <InputLabel htmlFor="idType">Status</InputLabel>
                    <Select
                      fullWidth
                      native                      
                    >
                      <option>{data.status}</option>
                    </Select>
            </Grid>
            <Grid item xs={12} style={{marginTop:'15px'}}>
            <Rating
              name="customized-empty"
              value={feedbackData?feedbackData.stars:null}
              id="starId"
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              
            />
            <br/>
            <InputLabel htmlFor="idType">Review: {feedbackData?feedbackData.feedback:null}</InputLabel>
            </Grid>
        </Grid>

          
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

export default ViewAppointment;
