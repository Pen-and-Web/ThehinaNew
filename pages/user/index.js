import Head from "next/head";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import * as actions from "../../redux-thunk/actions";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Nav from "../../components/Nav";
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import {baseURL, imgUrl} from '../../env'
import {parseCookies} from 'nookies'
import jwt_decode from "jwt-decode";
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




const bookConsultation = ({userDetail}) => {
  

  const router = useRouter();
  const id = router.query.id; 
  const startDate =router.query.start;
  const endDate = router.query.end;
  const slotId = router.query.slotId;
  const [userName,setUserName] = useState(userDetail.name);
  const [email,setEmail] = useState(userDetail.email);
  const [aim,setAim] = useState("");
  const [consultantDetail,setConsultantDetail] = useState({})


  const [open, setOpen] = React.useState(false);
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
    console.log("user id",userDetail.id);
    console.log(startDate,endDate)
    const clientData = {
      clientId:userDetail.id,
      name:userName,
      email:email,
      aim:aim
    }
    const consultantData={
      consultantId:id,
      name:consultantDetail?consultantDetail.name:"",
      email:consultantDetail?consultantDetail.email:""
    }
    const data = {
      
      clientData,
      consultantData,
      startDate:startDate,
      endDate:endDate,
      slotId:slotId,
      
    }
    
    

   axios.post(baseURL+`/appointment`,data)
    .then(res=>{
     console.log("response",res.data)
        setOpen(true)
        
    })
    .catch(err=>console.log(err,""))

    
  }

  useEffect(()=>consultantData(),[])
  console.log(consultantDetail.email,"Checking set consultant detail on page reload")
  return (
    <>
    
    

      <div>
        <Head>
          <title>Appointment</title>
        </Head>
      </div>
      <Grid container>
        {/* <Nav  userDetail={userDetail} /> */}
        <Grid item xs={4} md={4}></Grid>

        <Grid item md={4} xs={4} style={{ marginTop: "50px" }}>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" style={{color:"#155724"}} onClose={(e)=>{e.preventDefault(); router.push('https://www.tap.company/kw/en/collect')}}>
          Message
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" gutterBottom>
           Appointment has been created.
          </Typography>
          <center><Button align="center" color="primary" onClick={()=>{router.push('https://www.tap.company/kw/en/collect')}}>Submit</Button></center>
        </DialogContent>
           </Dialog>
          <Card style={{ padding: "20px", border: "1px solid #DADCE0" }}>
            <Typography align="center">
              <img src="/logo.png" width={200} height={150} />
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              style={{ marginBottom: "10px", marginTop: "-20px" }}
              align="center"
              color="primary"
            >
              Book appointment
            </Typography>

            <form noValidate autoComplete="off" style={{ padding: "20px" }}>
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
              />

              {/* <TextField
                id="email"
                label="National Id#"
                type="email"
                fullWidth
                value={userDetail.email}
                style={{ marginTop: "10px" }}
                size="small"
                autoComplete="current-email"
                variant="outlined"
              /> */}

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
              />
            </form>
            <CardActions style={{ justifyContent: "center", padding: "20px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#842ED9", color: "white" }}
                fullWidth
                onClick={() => submit()}
              >
                Book Appointment
              </Button>
            </CardActions>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                color="primary"
                
                onClick={(e) =>{e.preventDefault(); router.push("/consultation")}}
              >
                Back
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};
bookConsultation.layout = "admin";
export default bookConsultation;


bookConsultation.getInitialProps = (ctx)=>{
 

  try{
   
    const cookie = parseCookies(ctx);
      // const user = cookie.User?"Admin":"";
      const decoded = jwt_decode(cookie.Token);
      console.log("decoder",decoded.role)
      const role = decoded.role;
      if(role !== 'User' ){
        //as token is valid but when user use a valid token then this condition will
        //check whether decrypted token contain admin as a role otherwise redirect to login page
        console.log("user as a role condition works=> not User")
        const {res} = ctx;
        res.writeHead(302,{Location:"/"})
        res.end()
      }

      return{
        userDetail: decoded
      }
  
      
      }
      catch(err){
      
        //it handles invalid token error 
        //when token is remove or invalid then it redirect to login page
        // console.log(err)
        const {res} = ctx;
        res.writeHead(302,{Location:"/"})
        res.end()
      }

      
}
