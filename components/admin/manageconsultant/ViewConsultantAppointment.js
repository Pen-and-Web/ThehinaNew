import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { appointmentDetails } from '../../consultant/redux/actions';
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
import {baseURL} from '../../../env';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export const ViewConsultantAppointment = ({userId}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
        console.log(userId,"id is")
    const [appointmentDetail,setAppointmentDetail] = useState([]);
    const [feedback,setFeedback] = useState("");

    const getAppointment = async() => {
        await axios.get(baseURL+`/appointment?consultantId=${userId}`)
              .then(response=>{             
                  setAppointmentDetail(response.data.Appointments)                  
              })
              .catch(err=>console.log(err))
      }

    useEffect(()=>{getAppointment()},[])

    setTimeout(() => {
      console.log("Appointment refresh checking")
      getAppointment();
      
    }, 10000);
    return (

        <div>
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                    <DialogTitle id="customized-dialog-title" style={{color:"#4AAF51"}} onClose={(e)=>{setOpen(false)}}>
                        Feedback
                    </DialogTitle>
                    <DialogContent dividers style={{width:'400px'}}>
                        <Typography variant="body2" gutterBottom >
                           {feedback}
                        </Typography>          
                    </DialogContent>
                </Dialog>
            
             <TableContainer component={Paper} className={classes.container} elevation={3} style={{marginTop:'10px'}}>
              <Table className={classes.table} size="small" aria-label="a dense table"  >
                <TableHead style={{backgroundColor:'#2B4B80'}}>
                  <TableRow>
                    <TableCell><Typography style={{color:'white'}}   >Client Name</Typography></TableCell>
                    <TableCell align="left"   style={{color:'white'}}><Typography variant="button"  >Email</Typography></TableCell>
                    <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Time</Typography></TableCell>
                    <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Date</Typography></TableCell>
                    <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Status</Typography></TableCell>
                    <TableCell align="center" style={{color:'white'}}><Typography variant="button" >Rating</Typography></TableCell>
                    <TableCell align="center" style={{color:'white'}}><Typography variant="button" >Review</Typography></TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
               
                  {
                    
                    appointmentDetail.length>0?
                    appointmentDetail.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                      {row.clientData.name}
                      </TableCell>
                      <TableCell align="left">{row.clientData.email}</TableCell>
                      <TableCell align="left">{row.startDate.slice(11,16)}-{row.endDate.slice(11,16) }</TableCell>
                      <TableCell align="left">{row.endDate.slice(0,10)}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="center">                          
                          
                          <Rating
                                
                                value={row.stars}
                                id="starId"
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                
                             />
                          
                          
                          </TableCell>
                      <TableCell align="center"> 
                            { row.feedback?
                            
                            <IconButton onClick={()=>{setOpen(true),setFeedback(row.feedback)}}><VisibilityIcon color="primary"  /></IconButton>
                            :null
                            }
                      </TableCell>
                      </TableRow>
                         
                   
                  ))
                  
                  :

                  appointmentDetail.length===0? 
                  <TableRow > 
                      
                  <TableCell >   
                  </TableCell>  
                  <TableCell >             
                       
                  </TableCell>  
                  <TableCell >             
                      
                  </TableCell>  
                  <TableCell >             
                  <CircularProgress/>    
                  </TableCell> 
                  </TableRow>                   
                   :
                 null
                  }
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    )
}
