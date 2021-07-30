import React, {useEffect, useState}  from "react";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
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
import {useSelector, useDispatch } from "react-redux";
import * as actions from '../actions/actions'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import { Grid } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { green } from '@material-ui/core/colors';
import {baseURL} from '../../../env'
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import GroupIcon from '@material-ui/icons/Group';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    marginTop:"10px"
  },
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
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }));

  


  
  

const Users = () =>{
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [refreshRecordOnUpdateStatus,setRefreshRecordOnUpdateStatus] = useState(false);
    
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
    
    
    
    const getUser = () => {
      axios.get(baseURL+'/user?role=User')
      .then(response=>{
        dispatch(actions.user(response.data.user));
        // console.log("User Array on api call",response.data.user);
      })
      .catch(err=>console.log(err))
    }
   
    const data = useSelector(state=>{ return state.adminReducer.userData});
    
    useEffect(()=>{
    getUser()
    },[refreshRecordOnUpdateStatus])    
    
    
      setTimeout(() => {
        // console.log("User refresh checking")
        getUser();
        
      }, 10000);
    
    
     
    return(
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
              <PeopleIcon className={classes.icon} />
              Users
              </Typography>
                    
            </Breadcrumbs>
        
            <Card className={classes.root} elevation={3}>                       
                <Grid container>                    
                  <Grid item md={10} xs={10}>
                      <Typography color="textSecondary" style={{marginTop:'10px',marginLeft:'10px'}}>
                      Total Client
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
        
    <Grid container  style={{marginTop:'10px'}}>
      <Grid item md={12}>
          <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead style={{backgroundColor:'#2B4B80'}}>
          <TableRow>
            <TableCell><Typography style={{color:'white'}} >Name</Typography></TableCell>
            <TableCell align="left"   style={{color:'white'}}><Typography variant="button"  >Email</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >User Type</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Phone Number</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Region</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}><Typography variant="button" >Status</Typography></TableCell>
            <TableCell align="left"  style={{color:'white'}}>Change Status</TableCell>
            <TableCell align="center"  style={{color:'white'}}><Typography variant="button"  >Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(data.length,"User List")} */}
          {data.length>0?
          data.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="left">{row.phoneNumber}</TableCell>
              <TableCell align="left">{row.region}</TableCell>
              <TableCell align="left">{row.status===true?"Approve":"Decline"}</TableCell>

              <TableCell align="left"> 
                <IconButton aria-label="approval" onClick={()=>updateStatus(row._id,"true")} ><DoneIcon   style={{ color: green[500] }}/></IconButton>
                <IconButton aria-label="decline" onClick={()=>updateStatus(row._id,"false")}><ClearIcon  color="secondary"/></IconButton>
              </TableCell>
              <TableCell align="center">
                  
                  <IconButton aria-label="delete" onClick={()=>dispatch(actions.deleteUser(row._id,row.role))}><DeleteIcon /></IconButton>
              </TableCell>
                 
            </TableRow>
          ))
          :
                    data.length===0? 
                    <TableRow > 
                    <TableCell ></TableCell>   
                    <TableCell ></TableCell>  
                    <TableCell ></TableCell>
                    
                    <TableCell align="right">             
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
    </>
    )
  }



export default Users;