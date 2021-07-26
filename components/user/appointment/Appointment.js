import React, {useEffect, useState}  from "react";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios  from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import PeopleIcon from '@material-ui/icons/People';
import ViewAppointment from './ViewAppointment'
import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../redux/actions'
import FeedbackIcon from '@material-ui/icons/Feedback';
//popup modal box
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
//popup modal box 
import InputLabel from '@material-ui/core/InputLabel';

import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { FeedbackOutlined } from "@material-ui/icons";
import { baseURL } from "../../../env";
import { CircularProgress } from "@material-ui/core";
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
//star rating


const Appointment = () =>{
    const classes = useStyles();
    const [component,setComponent] = useState("appointment");
    const clientId = useSelector(state=>{ return state.clientReducer.clientId});

    const [data,setData] = useState({id:"",clientName:"",email:"",startTime:"",endTime:"",date:"",status:""});
    
    //dialogue box
    const [starValue,setStarValue] = useState(1);
    const [feedback,setFeedback] = useState("");
    const [open, setOpen] = React.useState(false);
    const [appointmentId,setAppointmentId]   = useState("");
    const handleClose = () => {
      setStarValue(0)
      setFeedback("")
      setOpen(false);
    };
    //dialogueBox end
    const dispatch = useDispatch();

    const getAppointment = async() => {
      await axios.get(baseURL+`/appointment?clientId=${clientId}`)
            .then(response=>{
              console.log(response,"response")

              dispatch(actions.clientAppointmentDetails(response.data.Appointments))
            })
            .catch(err=>console.log(err))
    }
    const clientAppointmentRecords = useSelector(state=>{ return state.clientReducer.clientAppointment}); 
    console.log("client appointment records",clientAppointmentRecords)
    useEffect(()=>{getAppointment()},[])

    // console.log("on preview button press refresh")},[previewOnUpdateRecord,userId])
    //Preview updated record on Table
   
    return(  
      
        <>

    {component==="appointment"?   
    <div>
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
                        <PeopleIcon className={classes.icon} />
                        Appointments
                        </Typography>
                    
            </Breadcrumbs>
   
    <TableContainer component={Paper} className={classes.container} elevation={3} style={{marginTop:'10px'}}>
      <Table className={classes.table} size="small" aria-label="a dense table"  >
        <TableHead style={{backgroundColor:'#2B4B80'}}>
          <TableRow>
            <TableCell><Typography style={{color:'white'}}   >Consultant Name</Typography></TableCell>
            <TableCell align="left"   style={{color:'white'}}><Typography variant="button"  >Email</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Time</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Date</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Status</Typography></TableCell>
            <TableCell align="center" style={{color:'white'}}><Typography variant="button" >Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientAppointmentRecords.length>0?
          clientAppointmentRecords.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
              {row.consultantData.name}
              </TableCell>
              <TableCell align="left">{row.consultantData.email}</TableCell>
              <TableCell align="left">{row.startDate.slice(11,16)}-{row.endDate.slice(11,16) }</TableCell>
              <TableCell align="left">{row.endDate.slice(0,10)}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="center">
                  <IconButton  
                  onClick={()=>{setComponent("update"),setData({id:row._id,clientName:row.clientData.name,email:row.clientData.email,startTime:row.startDate.slice(11,16),endTime:row.endDate.slice(11,16),date:row.endDate.slice(0,10),status:row.status})}}                  
                  ><VisibilityIcon  color="primary"/>
                  </IconButton>
                  {row.status==="Approved"?<IconButton  onClick={()=>{setOpen(true),setAppointmentId(row._id)}}> <FeedbackIcon  color="primary"/></IconButton>:null}
                  
                  </TableCell>
            </TableRow>
          ))
        :
        clientAppointmentRecords.length===0?
        <></>
        :
        <TableRow >
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell > <CircularProgress /></TableCell>

        </TableRow>
        }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    :
    component==="update"?
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
                        <EditIcon className={classes.icon} />
                        View Appointment
                        </Typography>
                    
            </Breadcrumbs>
            {/* on Update in update component condition in redux check of  submitUpdateRecord then it will return to appointment and trigger updated record.*/}
            
            {/* condition ends here */}
     <IconButton    onClick={()=>{setComponent("appointment")}} color="primary">
          <ArrowBackIosIcon /></IconButton>

        
      <ViewAppointment data={data}  />
    </>
    :
    null
    }


  {/* Feedback and survey dialogue box */}
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Rate your experience to help us improve our service quality.
          </DialogContentText>
          <Box component="fieldset" mb={3} borderColor="transparent">
         
        <Rating
          name="customized-empty"
          value={starValue}
          id="starId"
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          onChange={(e)=>setStarValue(e.target.value)}
        />

        <TextField
            autoFocus
            margin="dense"
            id="feedbackId"
            value={feedback}
            onChange={(e)=>setFeedback(e.target.value)}
            label="Describe your Experience (Optional)"
            type="text"
            fullWidth
          />
     

      </Box>
        </DialogContent>
       <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=> {
            dispatch(actions.appointmentFeedback(appointmentId,starValue,feedback)),handleClose()                    
            }                          
           } 
          color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
   

    )
}

export default Appointment;