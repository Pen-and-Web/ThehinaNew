import React, {useEffect, useState}  from "react";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
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
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/People';
import UpdateAppointment from './UpdateAppointment'
import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../redux/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { FeedbackOutlined } from "@material-ui/icons";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import {baseURL} from '../../../env'
const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);



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
  


const Appointment = () =>{
    const classes = useStyles();
    const [component,setComponent] = useState("appointment");
    const [id,setId] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const userId = useSelector(state=>{ return state.consultantReducer.userId});
    const [data,setData] = useState({id:"",clientName:"",email:"",startTime:"",endTime:"",date:"",status:""});
    const submitUpdateRecord = useSelector(state=>{ return state.consultantReducer.submitUpdateRecordAppointment});
    // const [previewOnUpdateRecord,setPreviewOnUpdateRecord] = useState(false);
    const [feedback,setFeedback] = useState({stars:null,review:null});
    const dispatch = useDispatch();

    const getAppointment = () => {
       axios.get(baseURL+`/appointment?consultantId=${userId}`)
            .then(response=>{
              // setPreviewOnUpdateRecord(false)

              dispatch(actions.appointmentDetails(response.data.Appointments))
              dispatch(actions.submitUpdateRecordAppointment(false))      
            })
            .catch(err=>console.log(err))
    }
    const appointmentRecords = useSelector(state=>{ return state.consultantReducer.appointmentDetails}); 
    
    const getRefreshAppointment= async()=>{
      await axios.get(baseURL+`/appointment?consultantId=${userId}`)
      .then(response=>{
        dispatch(actions.appointmentDetails(response.data.Appointments))
      })
   }
    useEffect(()=>{getAppointment()
      },[submitUpdateRecord,userId])
    //Preview updated record on Table
   

    // setTimeout(() => {
    //     console.log("Checking function calling");
    //   getRefreshAppointment()
      
    // }, 60000);
  
    return(  
      
        <>

              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                    <DialogTitle id="customized-dialog-title" style={{color:"#4AAF51",width:'400px'}} onClose={(e)=>{setOpen(false)}}>
                        Feedback
                        <Typography variant="body2"  gutterBottom style={{color:'#616466'}}>
                          
                          {feedback.review}
                          </Typography> 
                          <Typography   gutterBottom  >
                          
                         Rating
                          </Typography>
                        <Rating                        
                               value={feedback.stars}
                                id="starId"
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                
                             />         
                   
                    </DialogTitle>
                   
                    
                    
                </Dialog>


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
            <TableCell><Typography style={{color:'white'}}   >Client Name</Typography></TableCell>
            <TableCell align="left"   style={{color:'white'}}><Typography variant="button"  >Email</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Time</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Date</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Status</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Feedback</Typography></TableCell>

            <TableCell align="center" style={{color:'white'}}><Typography variant="button" >Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {
             appointmentRecords?
             appointmentRecords.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
              {row.clientData.name}
              </TableCell>
              <TableCell align="left">{row.clientData.email}</TableCell>
              <TableCell align="left">{row.startDate.slice(11,16)}-{row.endDate.slice(11,16) }</TableCell>
              <TableCell align="left">{row.endDate.slice(0,10)}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.feedback||row.stars?<IconButton color="primary" aria-label="feedbackIcon" onClick={()=>{setOpen(true),setFeedback({stars:row.stars,review:row.feedback})}} ><FeedbackIcon /></IconButton>:null}</TableCell>
              <TableCell align="center">
                  <IconButton  
                  // onClick={() => router.push("/consultant/client")}
                  onClick={()=>{setComponent("update"),setData({id:row._id,clientName:row.clientData.name,email:row.clientData.email,startTime:row.startDate.slice(11,16),endTime:row.endDate.slice(11,16),date:row.endDate.slice(0,10),status:row.status})}}                  
                  ><VisibilityIcon  color="primary"/></IconButton>
                 <IconButton color="secondary" aria-label="delete" onClick={()=>dispatch(actions.deleteAppointmentRecord(row._id,row.consultantId))}><DeleteIcon /></IconButton>
                  </TableCell>
            </TableRow>
          ))
          :
          <TableRow >
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell> <CircularProgress/> </TableCell>
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
                        Update Appointment
                        </Typography>
                    
            </Breadcrumbs>
            {/* on Update in update component condition in redux check of  submitUpdateRecord then it will return to appointment and trigger updated record.*/}
            {submitUpdateRecord===true?  setComponent("appointment") :null}
            {/* {submitUpdateRecord===true?  setPreviewOnUpdateRecord(true) :null} */}
            {/* condition ends here */}
     <IconButton    onClick={()=>{setComponent("appointment")}} color="primary">
          <ArrowBackIosIcon /></IconButton>
      <UpdateAppointment data={data}  />
    </>
    :
    <CircularProgress />
    
    }
  
    </>
   
    )
}

export default Appointment;