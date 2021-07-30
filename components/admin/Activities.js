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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch,useSelector } from "react-redux";
import HomeIcon from '@material-ui/icons/Home';
import { green } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PeopleIcon from '@material-ui/icons/People';
import { Grid } from "@material-ui/core";
import ViewListIcon from '@material-ui/icons/ViewList';
import Card from '@material-ui/core/Card';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import * as actions from './actions/actions'
import GroupIcon from '@material-ui/icons/Group';
import {baseURL} from '../../env'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    marginTop:"30px"
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
  

const Activities = () =>{
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const getActivities = () => {
        axios.get(baseURL+'/activities')
            .then(response=>{
                // console.log(response.data);
              dispatch(actions.activities(response.data.activities));
            })
            .catch(err=>console.log(err))
        }

    const activities = useSelector(state=>{ return state.adminReducer.activities});

    useEffect(()=>{getActivities()},[])
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
                        <MailOutlineIcon className={classes.icon} />
                        Email Activities
                        </Typography>
                    
            </Breadcrumbs>
            
        
       
        <Grid container style={{marginTop:'10px'}}>
          <Grid item xs={12} md={12}>
            <TableContainer className={classes.container} component={Paper} elevation={3}  >    
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead style={{backgroundColor:'#2B4B80'}}>
                    <TableRow>
                      <TableCell style={{color:'white'}}>Time</TableCell>
                      <TableCell align="left"   style={{color:'white'}}>Date</TableCell>
                      <TableCell align="left"  style={{color:'white'}}>Message</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                    activities.length>0?
                    activities.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {row.messageTime}
                        </TableCell>
                        <TableCell align="left">{row.messageDate}</TableCell>
                        <TableCell align="left">{row.message}</TableCell>
                        
                      </TableRow>
                    ))
                    :
                    activities.length===0? 
                    <TableRow > 
                        
                    <TableCell >   
                    </TableCell>  
                      
                    <TableCell align="center">             
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

export default Activities;