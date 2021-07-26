import React from 'react';
import { useState } from "react";
import clsx from 'clsx';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import MuiListItem from "@material-ui/core/ListItem";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from "next/router";
import Consultants from './manageconsultant/Consultants'
import Activities from './Activities'
import Users from './manageruser/Users'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import { MenuItem } from "@material-ui/core";
import Profile from './Profile';
import cookie from 'js-cookie'
import Router from 'next/router';
import NProgress from 'nprogress';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
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


const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "#4043bc",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white"
        }
      },
      "&$selected:hover": {
        backgroundColor: "#2B4B80",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white"
        }
      },
      // "&:hover": {
      //   backgroundColor: "#2B4B80",
      //   color: "white",
      //   "& .MuiListItemIcon-root": {
      //     color: "white"
      //   }
      // }
    },
    selected: {}
  })(MuiListItem);
  
export default function AdminDashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [component, setComponent] = useState('profile');
  const [hide,setHide] =useState(true);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openM = Boolean(anchorEl);

  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
    setHide(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setHide(true)
  };
  console.log("decodevddddddddddd",props.userDetail)
  return (
    

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        style={{backgroundColor:'white',height:'70px',borderBottom:"0.2px solid #DED3D1"}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
          <IconButton
            color="primary"
            // style={{backgroundColor:'white'}}
            aria-label="open drawer"
            onClick={handleDrawerOpen}

            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
        {hide===true?
          <img
            src="https://thehina.com/assets/img/logo/logo.png"
            
            height="40%"
          />:
          null}
          </Typography>
          

        <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography variant="h5"  style={{marginRight:'9px',color:'#730DDC',fontSize:'15px',fontWeight:"600"}}>
                 Admin
                </Typography>
                <Avatar alt="profile picture"  className={classes.large} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                style={{marginTop:'50px'}}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openM}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {setComponent('profile'), setSelectedIndex(0)}}>Profile</MenuItem>
                <MenuItem  
                  onClick={() =>{
                    
                    cookie.remove('Token');
                    router.push('/');
                    }}
                >Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{height:'70px'}} >
        <Typography variant="h6" noWrap>
          <img
            src="https://thehina.com/assets/img/logo/logo.png"
            // style={{marginBottom:'13px'}}
            height="40%"
          />
          </Typography>
          <IconButton onClick={handleDrawerClose} color="primary" >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav" aria-label="main mailbox folders" style={{marginTop:'30px'}}>
                    <ListItem button selected={selectedIndex === 0} onClick={() => {setComponent('profile') , setSelectedIndex(0)}}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>

                        <ListItemText disableTypography  primary="Profile" />
                    </ListItem>
                    <Divider  />
                    <ListItem button selected={selectedIndex === 1} onClick={() => {setComponent('consultant') , setSelectedIndex(1)}}> 
                        <ListItemIcon>
                           <DashboardIcon />
                        </ListItemIcon>

                        <ListItemText disableTypography   primary="Consultant" />
                    </ListItem>
                    <Divider />
                    <ListItem button selected={selectedIndex === 2} onClick={() => {setComponent('users'), setSelectedIndex(2)}}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>

                        <ListItemText variant="h3" disableTypography   primary="Clients" />
                    </ListItem>
                    <Divider />
                    <ListItem button selected={selectedIndex === 3} onClick={() => {setComponent('activities'), setSelectedIndex(3)}}>
                        <ListItemIcon>
                            <MailOutlineIcon />
                        </ListItemIcon>

                        <ListItemText variant="h3" disableTypography   primary="Activities" />
                    </ListItem>
        </List>    
      </Drawer>
    
      <main className={classes.content} style={{justifyContent:'center'}}>
        <div className={classes.toolbar}  />
        {
          component === 'profile' ?
          <Profile userDetail={props.userDetail} />
          :
          component === 'consultant' ?
          <Consultants />
          :          
          component === 'users' ?
          <Users /> 
          :
          component === 'activities' ?
          <Activities />      
          :
          null
        }
      </main>   
    </div>
        
  
  
  );
}