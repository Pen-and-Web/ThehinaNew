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
import { Grid } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import UpdateSchedule from "./UpdateSchedule";
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../redux/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { PersonalVideoRounded } from "@material-ui/icons";
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
  


const ViewSchedule = () =>{
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [data,setData] = useState({id:"",subject:"",date:"",startTime:"",endTime:""});
    const [component,setComponent] = useState("appointment");
    const userId = useSelector(state=>{ return state.consultantReducer.userId});
    const submitUpdateRecord = useSelector(state=>{ return state.consultantReducer.submitUpdateRecord});


    const [previewOnUpdateRecord,setPreviewOnUpdateRecord] = useState(false);

    const getAppointment = () => {
      axios.get(baseURL+`/schedule?consultantId=${userId}`)
        .then(res=>{
          console.log("hjubjhbh")
          setPreviewOnUpdateRecord(false)
          console.log("response", res.data.schedule)
          console.log("Response.data view schedule",res.data.schedule);
          dispatch(actions.scheduleDetails(res.data.schedule))
          dispatch(actions.submitUpdateRecord(false))      
        })
          .catch(err=>console.log(err))
    }
    const scheduleRecords = useSelector(state=>{ return state.consultantReducer.scheduleDetails}); 
    
    useEffect(()=>{
      console.log("hjubjhbh")
      getAppointment()}
      ,[previewOnUpdateRecord])
    
     
    

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
                        <ViewListIcon className={classes.icon} />
                        Schedule List
                        </Typography>
                    
            </Breadcrumbs>   
      <Grid container>

      <Grid item md={8}>
    <TableContainer component={Paper} className={classes.container} elevation={3} style={{marginTop:'20px'}}>
      <Table className={classes.table} size="small" aria-label="a dense table"  >
        <TableHead style={{backgroundColor:'#2B4B80'}}>
          <TableRow>
            <TableCell><Typography style={{color:'white'}}   >Subject</Typography></TableCell>
            <TableCell align="center"  style={{color:'white'}}><Typography variant="button" >Date</Typography></TableCell>
            
            <TableCell align="center" style={{color:'white'}}><Typography variant="button" >Time</Typography></TableCell>
            <TableCell align="center" style={{color:'white'}}><Typography variant="button" >Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {scheduleRecords.length>0? 
        scheduleRecords.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.subject}
              </TableCell>
              <TableCell align="center">{row.endDate.slice(0,10)}</TableCell>
              <TableCell align="center">{row.startDate.slice(11,16)}-{row.endDate.slice(11,16) }</TableCell>
              
              
              <TableCell align="center">
                  <IconButton  onClick={()=>{setComponent("updateSchedule"),setData({id:row._id,subject:row.subject,date:row.endDate.slice(0,10),startTime:row.startDate.slice(11,16),endTime:row.endDate.slice(11,16)}) }}><VisibilityIcon  color="primary" /></IconButton>
                 <IconButton aria-label="delete" onClick={()=>dispatch(actions.deleteScheduleRecord(row.consultantId,row._id))} color="secondary"><DeleteIcon /></IconButton>
                  </TableCell>
            </TableRow>
          ))
        :
        <TableRow>
        <TableCell ></TableCell>
        <TableCell align="right">
         <CircularProgress />
        </TableCell>
        </TableRow>
        
        }
        </TableBody>
      </Table>
    </TableContainer>

      </Grid>

      </Grid>
      </div>
      :
      component==="updateSchedule"?
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
                        Update Schedule
                        </Typography>
                    
            </Breadcrumbs>
            {/* on Update in update component condition in redux check of  submitUpdateRecord then it will return to appointment and trigger updated record.*/}
            {submitUpdateRecord===true?  setComponent("appointment") :null}
            {submitUpdateRecord===true?  setPreviewOnUpdateRecord(true) :null}
            {/* condition ends here */}
     <IconButton    onClick={()=>{setComponent("appointment")}} color="primary">
          <ArrowBackIosIcon /></IconButton>
      <UpdateSchedule data={data} />
      </>
      :
      null
      }
        </>

    )
}

export default ViewSchedule;