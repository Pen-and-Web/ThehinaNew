import React, { useState } from "react";
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
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../redux/actions'

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

const UpdateAppointment = ({data}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [status,setStatus] = useState("");
  console.log("data in update appointment ",data);
  const submit = async( status)=>{
    console.log("Status Value ",status)
    console.log("Object ID ",data.id)
    
    dispatch(actions.updateAppointment(data.id,status))
    dispatch(actions.submitUpdateRecordAppointment(true))

  }
  return (
    <>
    
    <Grid container>
          <Grid item md={6} xs={6}>
          
        <Paper elevation={3} style={{marginTop:"20px"}} >  
        <form  noValidate autoComplete="off" style={{padding:'30px'}}>
        
        <Typography component="p" variant="h5" color="primary">Update Client Appointment</Typography>
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
            // defaultValue="2017-05-24"
            defaultValue={data.date}
            
            // onChange={(e)=>{setDate(e.target.value)}}
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
            // defaultValue="07:30"
            // onChange={(e)=>{setStartTime(e.target.value)}}
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
            value={data.endTime}
            fullWidth
            // onChange={(e)=>{setEndTime(e.target.value)}}
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
                      value={status}
                      onChange={(e)=>setStatus(e.target.value)}
                    >
                      <option aria-label="None"  placeholder={data.status} />
                      <option value={"Approved"}>Approved</option>
                      <option value={"Declined"}>Declined</option>
                      <option value={"Resolved"}>Resolved</option>
                    </Select>
            </Grid>
        </Grid>
      
            {console.log("selected status",status)}
        <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px" }}
            fullWidth
            onClick={()=>submit(status)}            
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

export default UpdateAppointment;
