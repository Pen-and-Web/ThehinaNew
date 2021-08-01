import Head from "next/head";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import {baseURL, imgUrl} from '../../env'
import CheckOutForm from './CheckOutForm'
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../user/redux/actions'
import { InputLabel } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
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
  }
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




const BookAppointmentForm = () => {
  
  const clientId = useSelector(state=>{return state.clientReducer.clientDetail.user._id}); 
  const clientName = useSelector(state=>{return state.clientReducer.clientDetail.user.name});
  const clientEmail = useSelector(state=>{return state.clientReducer.clientDetail.user.email});
  const id = useSelector(state=>{return state.clientReducer.bookSlotData.cId}); 
  const startDate =useSelector(state=>{return state.clientReducer.bookSlotData.sDate});
  const endDate = useSelector(state=>{return state.clientReducer.bookSlotData.eDate});
  const slotId = useSelector(state=>{return state.clientReducer.bookSlotData.sId});
  const [userName,setUserName] = useState(clientName);
  const [email,setEmail] = useState(clientEmail);
  const [aim,setAim] = useState("");
  const [consultantDetail,setConsultantDetail] = useState({})
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [fieldAlert, setFieldAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);

  const [errorMessage,setErrorMessage] =useState("")
  const [component,setComponent] = useState("appointment")
  const handleClose = () => {
    setOpen(false);
  };
 const consultantData=()=>{
    axios.get(baseURL+`/user?id=${id}`)
    .then(res=>{
      setConsultantDetail(res.data.user)
    })
 }


  const  submit = ()=>{
    setFieldAlert(false)
    setErrorAlert(false)
    setSuccessAlert(false)

    if(!email || !aim || !userName){
      setFieldAlert(true)
    }
    else{
          dispatch(actions.bookAppointmentDetail(data))
            const clientData = {
              clientId:clientId,
              name: userName,
              email:email,
              aim:aim
            }
            const consultantData={
              consultantId:consultantDetail?consultantDetail._id:"",
              name:consultantDetail?consultantDetail.name:"",
              email:consultantDetail?consultantDetail.email:"",
              hourPrice:consultantDetail?consultantDetail.hourPrice:""
            }
            const data = { 
              clientData,
              consultantData,
              startDate:startDate,
              endDate:endDate,
              slotId:slotId,
              aim:aim
            }
            
            
            // comment for testing payment api
          axios.post(baseURL+`/appointment`,data)
            .then(res=>{
              if(res.status===200){
                setSuccessAlert(true);
              }
              console.log(res,"")
                // setComponent('checkOut')     
              //   if(dispatch(actions.bookAppointmentDetail(data))){
              //     setComponent('checkOut')
              // }   
            })
            .catch(err=>{
              if(err.response.data.message){
                setErrorMessage(err.response.data.message)
                setErrorAlert(true)
              }
              console.log(err.response,"")
            })
    }
    
  }

  useEffect(()=>consultantData(),[])
  
  return (
    <>
      <div>
        <Head>
          <title>Appointment</title>
        </Head>
      </div>
      {component==="appointment"?
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
                   <AccountCircleIcon className={classes.icon} />
                   Book Appointment
                   </Typography>
               
       </Breadcrumbs>
       <IconButton onClick={()=>dispatch(actions.switchComponent(true))}><ArrowBackIosIcon/></IconButton>
     
     
      <Grid container>    
      
        <Grid item md={7} xs={12} style={{ marginTop: "5px",marginLeft:'10px' }} spacing={1}>

        {/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" style={{color:"#155724"}} onClose={(e)=>{setOpen(false)}}>
          Message
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" gutterBottom>
           Appointment has been created.
          </Typography>
          <center><Button align="center" color="primary" onClick={()=>{setOpen(false)}}>Submit</Button></center>
        </DialogContent>
           </Dialog> */}
          
           
          <Paper style={{  border: "1px solid #DADCE0" }} elevation={3}>
           
            <Typography
                  variant="h5"
                  component="h2"
                  style={{ marginTop:'30px' }}
                  align="center"
                  color="primary"
                >
                  Appointment Form
                </Typography>
                <Typography
                  component="p"
                  style={{ marginTop:'10px' }}
                  align="center"
                  color="primary"
                >
                  To schedule an appointment, please fill out the below information.
                </Typography>
        <Grid container spacing={1} style={{padding:'10px'}}>
        <Grid item md={12} xs={12}>
              <InputLabel>Consultant Information</InputLabel>
            </Grid>   
          <Grid item md={12} xs={12}>
                <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp"  src={`${imgUrl}/${consultantDetail?.imageUrl}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={consultantDetail?.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="primary"
                      >
                      Domain :
                      </Typography>
                      {" "}{consultantDetail?.mainDomain}
                  </React.Fragment>
                  }
                />
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        className={classes.inline}
                        color="primary"
                      >
                      Email :
                      </Typography>
                      {" "}{consultantDetail?.email}
                  </React.Fragment>
                  }
                />
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        className={classes.inline}
                        color="primary"
                      >
                      Hour Price :
                      </Typography>
                      {" "}{consultantDetail?.hourPrice}
                  </React.Fragment>
                  }
                />
              </ListItem>
           
          </Grid>
          <Grid item md={12} xs={12}>
             <Divider variant="inset" />
          </Grid>

            <Grid item md={12} xs={12} style={{ marginTop: "5px" }}>
              <InputLabel>Personal Contact Information</InputLabel>
            </Grid>     
              <Grid item md={6} xs={12} >
              
                  <TextField
                    id="username"
                    label="User Name"
                    type="text"
                    fullWidth                    
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    style={{ marginTop: "10px" }}
                    autoComplete="current-username"
                    variant="outlined"
                    size="small"
                  />
              </Grid>

              <Grid item md={6} xs={12}>
                  <TextField
                    id="email"
                    type="email"
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    style={{ marginTop: "10px" }}
                    size="small"                
                    variant="outlined"
                  />
              </Grid>
              <Grid item md={12} xs={12}>
                  <TextField
                    id="aim"
                    label="Reason for Appointment"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    value={aim}
                    onChange={(e)=>setAim(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
              </Grid>
          
          </Grid>
            
            
            <CardActions  style={{justifyContent:"flex-end" , padding: "20px" }}>
           
              <Button
                variant="outlined"
                style={{ backgroundColor: "#842ED9", color: "white" }}
                
                onClick={() => submit()}
              >
                Submit
              </Button>
        </CardActions>
        <Grid style={{padding:'10px'}}>
        {fieldAlert===true?<Alert severity="warning">Please fill all the required fields</Alert>:null}
        {successAlert===true?<Alert severity="warning">Appointment has been created.</Alert>:null}
        {errorAlert===true?<Alert severity="error">{errorMessage}</Alert>:null}
        </Grid>
          </Paper>
        </Grid>

        <Grid item md={3} xs={12} style={{ marginTop: "5px",marginLeft:'10px' }}>
          <Paper style={{  border: "1px solid #DADCE0" }} elevation={3}>
               
            <Grid container spacing={1} style={{padding:'10px'}}>
            <Grid item md={12} xs={12}>
              <InputLabel>Slot Information</InputLabel>
            </Grid> 
              <Grid item md={12} xs={12}>
                    <ListItem alignItems="flex-start">
                    <ListItemText
                      secondary={
                        <React.Fragment>
                           <Typography
                            component="span"
                            component="p"
                            className={classes.inline}
                            color="primary"
                          >
                           Date :
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            style={{marginLeft:'20px'}}
                            className={classes.inline}
                          >
                          {"   "}{startDate.slice(0,9)}
                          </Typography>
                          
                      </React.Fragment>
                      }
                    />
                    
                  </ListItem>
                
             
                    <ListItem alignItems="flex-start">
                    <ListItemText
                      secondary={
                        <React.Fragment>
                           <Typography
                            component="span"
                            component="p"
                            className={classes.inline}
                            color="primary"
                          >
                           Time Duration :
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            style={{marginLeft:'15px'}}
                            className={classes.inline}
                          >
                          {"   "}{startDate.slice(11,16)} - {endDate.slice(11,16)}
                          </Typography>
                          
                      </React.Fragment>
                      }
                    />
                    
                  </ListItem>
            
              </Grid>
                     
            </Grid>
        </Paper>
        </Grid>
        </Grid>
   
    </>
      :
      component==="checkOut"?
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
                        <AccountCircleIcon className={classes.icon} />
                        CheckOut
                        </Typography>
                    
            </Breadcrumbs>
            <IconButton onClick={()=>setComponent("appointment")}><ArrowBackIosIcon/></IconButton>
      <CheckOutForm />
      </>
      :
      null
    
    }   
    
    </>
  );
};

export default BookAppointmentForm;
