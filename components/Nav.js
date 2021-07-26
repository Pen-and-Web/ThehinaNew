import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { List, ListItem, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'js-cookie'
import Router from 'next/router';
import NProgress from 'nprogress';

import { useState } from "react";


import { fade } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import jwt_decode from "jwt-decode";
import {parseCookies} from 'nookies'
import Link from 'next/link'

Router.onRouteChangeStart = () => {
  console.log('onRouteChangeStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  console.log('onRouteChangeComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  console.log('onRouteChangeError triggered');
  NProgress.done();
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = ({userDetail}) => {

  const router = useRouter();
  const classes = useStyles();
  const isUser =cookie.get("Token");

   

     
  return (
    

    <AppBar position="fixed" elevation={0} style={{ backgroundColor: "#FFFFFF",zIndex:"1" }}>
    <Toolbar>
    <MenuItem edge="start" className={classes.menuButton} onClick={(e) =>{e.preventDefault(); router.push("/consultation")}} >
          <img
            src="https://thehina.com/assets/img/logo/logo.png"
            style={{marginBottom:'13px'}}
            height="50%"
          />
          </MenuItem>
      <Typography className={classes.title} variant="h6" noWrap>
       
      </Typography>
     
      <div className={classes.grow} />
    {userDetail || isUser?
    <div className={classes.sectionDesktop}>
       
    <Button
    style={{textTransform: 'capitalize',color:'#2B4B80',fontWeight:'500'}}
    onClick={(e) =>{
      e.preventDefault();
      router.push('/consultation');
       }}
    >
    Consultants
    </Button> 
   
   
   

    <Button
     style={{textTransform: 'capitalize',color:'#2B4B80',fontWeight:'500'}}
     onClick={(e) =>{
      e.preventDefault();
      router.push('/user/dashboard');
       }}
    >
    Dashboard
    </Button>
    
    <Button
    
    style={{textTransform: 'capitalize',color:'#2B4B80',fontWeight:'500'}}
   
     
      onClick={(e) =>{
        e.preventDefault();
              cookie.remove('Token');
              router.push('/');
               }}
      
    >
    Logout
    </Button>
  </div>
  
       :
       <div className={classes.sectionDesktop}>

<Button
    style={{textTransform: 'capitalize',color:'#2B4B80',fontWeight:'500'}}
    onClick={(e) =>{
      e.preventDefault();
      router.push('/consultation');
       }}
   >
    Consultants
    </Button>
   
          <Button
    
    style={{textTransform: 'capitalize',color:'#2B4B80',fontWeight:'500'}}
    onClick={(e) =>{
      e.preventDefault();
      router.push('/');
       }}
    >
    Login
    </Button>
    </div>
  }
      
    </Toolbar>
  </AppBar>
  );
};

export default Nav;

