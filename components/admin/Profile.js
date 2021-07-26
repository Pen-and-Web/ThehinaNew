import React from 'react'
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
// import {baseURL, imgUrl} from '../../env'

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
const Profile = (props) => {
    const classes = useStyles();

    return (
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
                        Profile
                        </Typography>
                    
            </Breadcrumbs>
            
           <Grid container spacing={3}  style={{marginTop:'10px'}} >
               <Grid item xs={12} md={4}>
                        <Paper elevation={3} style={{padding:'30px'}} > 
                                <Grid item xs={12} >
                                    <Avatar alt="profile image"    style={{width:'100px',height:'100px',borderRadius:'50%'}}  />
                                    {/* src={`${imgUrl}/${userDetail.imageUrl}`} */}
                                </Grid>

                                <Grid item xs={12} style={{marginTop:'10px'}}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {props.userDetail.name}
                                </Typography>
                                <Typography  component="p" gutterBottom>
                                {props.userDetail.email}
                                </Typography>
                                </Grid>
                        </Paper>
                </Grid>
                <Grid item xs={6} md={8}>
                
                </Grid>
           </Grid>
       
           
            
        </>
    )
}

export default Profile;