import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { ButtonBase, Grid, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { baseURL, imgUrl } from "../../env";
import { set } from "js-cookie";
import UpdateProfile from "./UpdateProfile";
import { ArrowBackIosIcon } from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const userDetail = useSelector((state) => {
    return state.clientReducer.clientDetail.user;
  });
  const [component, setComponent] = useState("profile");

  return (
    <>
      {component === "profile" ? (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary" className={classes.link}>
              <HomeIcon className={classes.icon} />
              Dashboard
            </Typography>
            <Typography
              color="textPrimary"
              className={classes.link}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              <AccountCircleIcon className={classes.icon} />
              Profile
            </Typography>
          </Breadcrumbs>

          {userDetail ? (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item md={6}>
                <Paper
                  elevation={3}
                  style={{ padding: "10px", backgroundColor: "#FFFFFF" }}
                >
                  <Grid container spacing={1} style={{ marginTop: "10px" }}>
                    <Grid item xs={11} md={11}>
                      <Avatar
                        alt="profile picture"
                        src={`${imgUrl}/${userDetail.imageUrl}`}
                        style={{ width: "170px", height: "170px" }}
                      />
                    </Grid>

                    <Grid item xs={1} md={1} align="right">
                      {/* <IconButton
                        align="right"
                        onClick={() => {
                          setComponent("updateProfile");
                        }}
                      >
                        <EditIcon />
                      </IconButton> */}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={5}
                      style={{ marginTop: "10px", backgroundColor: "#F8F8F8" }}
                    >
                      <ListItem style={{ borderBottom: "0.2px solid #FFFFFF" }}>
                        <ListItemIcon align="left">
                          <Typography component="p">Name :</Typography>
                        </ListItemIcon>
                        <ListItemText align="left">
                          <Typography
                            component="p"
                            style={{ fontWeight: "500" }}
                            color="primary"
                          >
                            {userDetail.name}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem style={{ borderBottom: "0.2px solid #FFFFFF" }}>
                        <ListItemIcon align="left">
                          <Typography component="p">Id :</Typography>
                        </ListItemIcon>
                        <ListItemText align="left">
                          <Typography
                            component="p"
                            style={{ fontWeight: "500", color: "#707070" }}
                          >
                            {userDetail.idNumber}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon align="left">
                          <Typography
                            component="p"
                            style={{ marginRight: "10px" }}
                          >
                            Date of Birth :
                          </Typography>
                        </ListItemIcon>
                        <ListItemText
                          align="left"
                          sytle={{ marginTop: "20px", textAlign: "justify" }}
                        >
                          <Typography
                            component="p"
                            style={{ fontWeight: "500", color: "#707070" }}
                          >
                            {userDetail.dateOfBirth}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={7}
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#F8F8F8",
                        borderLeft: "0.2px solid #FFFFFF",
                      }}
                    >
                      <ListItem style={{ borderBottom: "0.2px solid #FFFFFF" }}>
                        <ListItemIcon
                          align="left"
                          style={{ marginRight: "10px" }}
                        >
                          <Typography component="p">Arabic Name :</Typography>
                        </ListItemIcon>
                        <ListItemText>
                          <Typography
                            component="p"
                            style={{ fontWeight: "500" }}
                            color="primary"
                          >
                            {userDetail.arabicName}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon
                          align="left"
                          style={{ marginRight: "10px" }}
                        >
                          <Typography component="p">Email :</Typography>
                        </ListItemIcon>
                        <ListItemText align="left">
                          <Typography
                            component="p"
                            style={{ fontWeight: "500", color: "#707070" }}
                          >
                            {userDetail.email}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          ) : null}
        </>
      ) : component === "updateProfile" ? (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary" className={classes.link}>
              <HomeIcon className={classes.icon} />
              Dashboard
            </Typography>
            <Typography
              color="textPrimary"
              className={classes.link}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              <AccountCircleIcon className={classes.icon} />
              Edit Profile
            </Typography>
          </Breadcrumbs>
          <IconButton
            onClick={() => {
              setComponent("profile");
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <UpdateProfile />
        </>
      ) : null}
    </>
  );
};

export default Profile;
