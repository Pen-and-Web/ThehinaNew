import React, {useEffect, useState}  from "react";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch,useSelector } from "react-redux";
import * as actions from '../actions/actions'
import HomeIcon from '@material-ui/icons/Home';
import { green } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PeopleIcon from '@material-ui/icons/People';
import { Grid } from "@material-ui/core";
import ViewListIcon from '@material-ui/icons/ViewList';
import { ViewConsultantAppointment } from "./ViewConsultantAppointment";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import GroupIcon from '@material-ui/icons/Group';
import {baseURL} from '../../../env'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    marginTop:"10px"
  },
  table: {
      minWidth: 300,
        },
    
    tbheading:{
        color:'#FFFFFF'
    },
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }));
  

const Consultants = () =>{
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [refreshRecordOnUpdateStatus,setRefreshRecordOnUpdateStatus] = useState(false);
    const [component,setComponent] = useState("consultant");
    const [userId,setUserId] = useState(null);
    const [loader,setLoader] = useState(false);
    const getConsultant = () => {
      axios.get(baseURL+'/user?role=Consultant')
          .then(response=>{
           
            dispatch(actions.consultant(response.data.user));
           
          })
          .catch(err=>console.log(err))
      }
    const getUser = () => {
      axios.get(baseURL+'/user?role=User')
      .then(response=>{

        dispatch(actions.user(response.data.user));
      
        console.log("User Array on api call",response.data.user);
      })
      .catch(err=>console.log(err))
    }
    const updateStatus= (id,value)=>{
      //here false means next time when we have to change status ,current status will be set false instead to true

        setRefreshRecordOnUpdateStatus(false)
        const statusChange={
          status:value
        }
       axios.patch(baseURL+`/user?id=${id}`,statusChange )
          .then(res=>{
            setRefreshRecordOnUpdateStatus(true)
          })
    }

    const data = useSelector(state=>{ return state.adminReducer.consultantData});
    const client = useSelector(state=>{ return state.adminReducer.userData});

      useEffect(()=>{
        console.log("Checking consultant refresh")
      getConsultant();getUser()
      },[refreshRecordOnUpdateStatus])    


      setTimeout(() => {
       
        console.log("Checking function calling");
      getConsultant()
      
    }, 60000);
    return(
        <>
    {component==="consultant"?
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
                        Consultants
                        </Typography>
                    
            </Breadcrumbs>
           
                <Card className={classes.root} elevation={3}>                       
                  <Grid container>                    
                    <Grid item md={10} xs={10}>
                        <Typography color="textSecondary" style={{marginTop:'10px',marginLeft:'10px'}}>
                        Total Consultant
                      </Typography>  
                    </Grid>
                    <Grid item md={2} xs={2} style={{marginTop:'10px'}}>
                      <GroupIcon color="primary" />
                    </Grid>
                  
                  
                      <Grid item md={6} xs={6} align="center">
                        <Typography variant="h5"  component="h2" style={{color:"#7b40c0"}} >
                          {data?.length} 
                        </Typography>
                      </Grid>         
                  </Grid>
              </Card>
           
        
        
        <Grid container style={{marginTop:'10px'}}>
          <Grid item xs={12} md={12}>
            <TableContainer className={classes.container} component={Paper} elevation={3}  >    
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead style={{backgroundColor:'#2B4B80'}}>
                    <TableRow>
                      <TableCell style={{color:'white'}}>Name</TableCell>
                      <TableCell align="left"   style={{color:'white'}}>Email</TableCell>
                      <TableCell align="left"  style={{color:'white'}}>Main Domain</TableCell>
                      <TableCell align="left"  style={{color:'white'}}>Hour Price</TableCell>
                      {/* <TableCell align="left"  style={{color:'white'}}>Phone Number</TableCell> */}
                      {/* <TableCell align="left"  style={{color:'white'}}>IBAN</TableCell> */}
                      <TableCell align="left"  style={{color:'white'}}>Status</TableCell>
                      <TableCell align="left"  style={{color:'white'}}>Change Status</TableCell>

                      <TableCell align="center"  style={{color:'white'}}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    {data.length>0?
                    
                    data.map((row) => (
                     
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.mainDomain}</TableCell>
                        <TableCell align="left">{row.hourPrice}</TableCell>
                        {/* <TableCell align="left">{row.phoneNumber}</TableCell> */}
                        {/* <TableCell align="left">{row.IBAN}</TableCell> */}
                        <TableCell align="left">{row.status===true?"Approve":"Decline"}</TableCell>
                        <TableCell align="left"> 
                          <IconButton aria-label="approval" onClick={()=>updateStatus(row._id,"true")} ><DoneIcon  style={{ color: green[500] }}/></IconButton>
                          <IconButton aria-label="decline" onClick={()=>updateStatus(row._id,"false")}><ClearIcon  color="secondary"/></IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton aria-label="viewappointment" color="primary" onClick={()=>{setComponent("viewconsultant"),setUserId(row._id)}}><ViewListIcon /></IconButton>
                          <IconButton aria-label="delete" onClick={()=>dispatch(actions.deleteConsultant(row._id,row.role))}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                    :
                    data.length===0? 
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
            
          </Grid>
      </Grid>
      
      </div>   
       :
      component==="viewconsultant"?
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
                        View Appointments
                        </Typography>
                    
            </Breadcrumbs>
            <IconButton    onClick={()=>{setComponent("consultant")}} color="primary">
               <ArrowBackIosIcon />
            </IconButton>
            <ViewConsultantAppointment userId={userId} />        
         
            
      </div>

      :
      null 
       
      } 
        </>

    )
}

export default Consultants;