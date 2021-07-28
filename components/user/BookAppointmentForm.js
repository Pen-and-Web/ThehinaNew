import Head from "next/head";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import { baseURL } from "../../env";
import CheckOutForm from './CheckOutForm'
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../user/redux/actions'

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
  const [component,setComponent] = useState("appointment")
  const handleClose = () => {
    setOpen(false);
  };
 const consultantData=()=>{
    axios.get(baseURL+`/user?id=${id}`)
    .then(res=>{
      console.log("consultant detail",res.data);
      setConsultantDetail(res.data.user)
    })
 }
  

  const  submit = ()=>{
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
    }
    
    
    // comment for testing payment api
   axios.post(baseURL+`/appointment`,data)
    .then(res=>{
        setOpen(true)
        // setComponent('checkOut')     
      //   if(dispatch(actions.bookAppointmentDetail(data))){
      //     setComponent('checkOut')
      // }   
    })
    .catch(err=>console.log(err,""))
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
       
     
        <Grid item md={5} xs={12} style={{ marginTop: "5px",marginLeft:'5px' }}>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" style={{color:"#155724"}} onClose={(e)=>{setOpen(false)}}>
          Message
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" gutterBottom>
           Appointment has been created.
          </Typography>
          <center><Button align="center" color="primary" onClick={()=>{setOpen(false)}}>Submit</Button></center>
        </DialogContent>
           </Dialog>
          <Card style={{ padding: "10px", border: "1px solid #DADCE0" }} elevation={3}>
            <Typography align="center">
              <img src="/logo.png" width={150}  />
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              style={{ marginBottom: "5px", marginTop: "-20px" }}
              align="center"
              color="primary"
            >
              Book Appointment
            </Typography>

            <form noValidate autoComplete="off" style={{ padding: "10px" }}>
              <TextField
                id="username"
                label="User Name"
                type="text"
                fullWidth
                style={{ marginTop: "10px" }}
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                autoComplete="current-username"
                variant="outlined"
                size="small"
              />


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

              <TextField
                id="aim"
                
                label="Aim of Consultation"
                fullWidth
                style={{ marginTop: "10px" }}
                value={aim}
                onChange={(e)=>setAim(e.target.value)}
                autoComplete="current-password"
                variant="outlined"
                size="small"
              />
            </form>
            <CardActions  style={{justifyContent:"flex-end" , padding: "20px" }}>
            <Button
                variant="contained"
                color="secondart"
               
                onClick={()=>dispatch(actions.switchComponent(true)) }
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                style={{ backgroundColor: "#842ED9", color: "white" }}
                
                onClick={() => submit()}
              >
                Book Appointment
              </Button>
            </CardActions>
           
          </Card>
        </Grid>

        <Grid item md={3}></Grid>
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
