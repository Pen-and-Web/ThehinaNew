import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useRouter } from "next/router";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Avatar from "@material-ui/core/Avatar";
import { MenuItem } from "@material-ui/core";
import Profile from "../user/Profile";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./redux/actions";
import axios from "axios";
import Appointment from "./appointment/Appointment";
import BookIcon from "@material-ui/icons/Book";
import ConsultantCard from "./ConsultantCard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Link from "next/link";
import { baseURL, imgUrl } from "../../env";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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
      backgroundColor: "#7C1CDE",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&$selected:hover": {
      backgroundColor: "#A86BE6",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    // "&:hover": {
    //   backgroundColor: "#2B4B80",
    //   color: "white",
    //   "& .MuiListItemIcon-root": {
    //     color: "white"
    //   }
    // }
  },
  selected: {},
})(MuiListItem);

export default function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(2);
  const [component, setComponent] = useState("bookAppointment");
  const [hide, setHide] = useState(true);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openM = Boolean(anchorEl);
  const dispatch = useDispatch();

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
    setHide(true);
  };

  const getUserDetail = () => {
    dispatch(actions.clientId(props.userDetail.id));
    axios.get(baseURL + `/user?id=${props.userDetail.id}`).then((response) => {
      // dispatching user detail
      dispatch(actions.clientDetail(response.data));
      dispatch(actions.updateProfile(false));
    });
  };
  const userInfo = useSelector((state) => {
    return state.clientReducer.clientDetail.user;
  });
  const updateProfile = useSelector((state) => {
    return state.clientReducer.updateProfile;
  });
  useEffect(() => getUserDetail(), [updateProfile]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        style={{
          backgroundColor: "white",
          height: "70px",
          borderBottom: "0.2px solid #DED3D1",
        }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="primary"
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
		<Button onClick={() => router.push("/")}>
              {hide === true ? (
                <img
                  src="https://thehina.com/assets/img/logo/logo.png"
                  height="40%"
                />
              ) : null}
		</Button>
            </Typography>
          

          {userInfo ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography
                  variant="h5"
                  style={{
                    marginRight: "9px",
                    color: "#730DDC",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  Customer
                </Typography>
                <Avatar
                  alt="profile picture"
                  src={`${imgUrl}/${userInfo.imageUrl}`}
                  className={classes.large}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                style={{ marginTop: "50px" }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openM}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setComponent("profile"), setSelectedIndex(0);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    cookie.remove("Token");
                    router.push("/");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Avatar alt="profile picture" className={classes.large} />
          )}
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
        style={{ zIndex: "0" }}
      >
        <div className={classes.toolbar} style={{ height: "70px" }}>
          <Button onClick={() => router.push("/consultation")}>
            <Typography variant="h6" noWrap>
              <img
                src="https://thehina.com/assets/img/logo/logo.png"
                // style={{marginBottom:'13px'}}
                height="40%"
              />
            </Typography>
          </Button>
          <IconButton onClick={handleDrawerClose} color="primary">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{ marginTop: "30px", zIndex: "0" }}
        >
          {/* <ListItem button >
                        <ListItemIcon>
                          { userInfo?
                          <Avatar alt="profile picture"
                          src={`${imgUrl}/${userInfo.imageUrl}`} 
                          className={classes.large}
                          
                          style={{marginRight:"10px",marginLeft:"-10px"}}
                          />
                        
                          :null}
                        </ListItemIcon>                          
                        <ListItemText disableTypography  primary={userInfo?.name} style={{marginLeft:'10px'}} />                                                
                    </ListItem>
                    */}
          <ListItem
            button
            selected={selectedIndex === 0}
            style={{ marginTop: "50px" }}
            onClick={() => {
              setComponent("profile"), setSelectedIndex(0);
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>

            <ListItemText disableTypography primary="Client Profile" />
          </ListItem>
          <Divider />

          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={() => {
              setComponent("appointmentDetail"), setSelectedIndex(1);
            }}
          >
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>

            <ListItemText disableTypography primary="Schdule Appointment" />
          </ListItem>
          <Divider />

          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={() => {
              setComponent("bookAppointment"), setSelectedIndex(2);
            }}
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>

            <ListItemText disableTypography primary="Book Appointment" />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content} style={{ justifyContent: "center" }}>
        <div className={classes.toolbar} />
        {component === "profile" ? (
          <Profile />
        ) : component === "appointmentDetail" ? (
          <Appointment />
        ) : component === "bookAppointment" ? (
          <ConsultantCard />
        ) : null}
      </main>
    </div>
  );
}
