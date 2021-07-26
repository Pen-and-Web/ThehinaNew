import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import UpdateProfile from "./UpdateProfile";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { imgUrl } from "../../env";
const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const userDetail = useSelector((state) => {
    return state.consultantReducer.userLoggedInDetail.user;
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
            <Grid container spacing={1} style={{ marginTop: "10px" }}>
              <Grid item md={6} xs={12}>
                <Paper
                  elevation={3}
                  style={{ padding: "10px", backgroundColor: "#FFFFFF" }}
                >
                  <Grid container spacing={1} style={{ marginTop: "4px" }}>
                    <Grid item xs={11} md={11}>
                      <Avatar
                        alt="profile picture"
                        src={`${imgUrl}/${userDetail.imageUrl}`}
                        style={{ width: "170px", height: "170px" }}
                      />
                    </Grid>
                    <Grid item xs={1} md={1} align="right">
                      <IconButton
                        align="right"
                        onClick={() => {
                          setComponent("editProfile");
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={6}
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
                          <Typography component="p">
                            {userDetail.dateOfBirth}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      md={6}
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
                          <Typography component="p">
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
                          <Typography component="p">
                            {userDetail.email}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon
                          align="left"
                          style={{ marginRight: "10px" }}
                        >
                          <Typography component="p">IBAN :</Typography>
                        </ListItemIcon>
                        <ListItemText align="left">
                          <Typography component="p">
                            {userDetail.IBAN}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Grid>

                  </Grid>
                </Paper>
              </Grid>

              <Grid item md={6} xs={6}></Grid>

              <Grid item md={6} xs={12}>
                <Paper
                  elevation={3}
                  style={{ padding: "10px", backgroundColor: "#FFFFFF" }}
                >
                  <Grid item md={12} style={{ backgroundColor: "#F8F8F8" }}>
                    <ListItem>
                      <ListItemIcon
                        align="left"
                        style={{ marginRight: "10px" }}
                      >
                        <Typography component="p">Main Domain</Typography>
                      </ListItemIcon>
                    </ListItem>
                    <ListItem>
                      <Typography component="p">
                        {userDetail.mainDomain}
                      </Typography>
                    </ListItem>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    style={{ backgroundColor: "#F8F8F8", marginTop: "1px" }}
                  >
                    <ListItem>
                      <ListItemIcon align="left">
                        <Typography
                          component="p"
                          style={{ marginRight: "10px" }}
                        >
                          Hour Price :
                        </Typography>
                      </ListItemIcon>
                      <ListItemText align="left">
                        <Typography component="p">
                          {userDetail.hourPrice}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    style={{ backgroundColor: "#F8F8F8", marginTop: "1px" }}
                  >
                    <ListItemIcon align="left" style={{ marginRight: "10px" }}>
                      <Typography component="p">
                        Summary of Expertise
                      </Typography>
                    </ListItemIcon>
                    <ListItem>
                      <ListItemText
                        align="left"
                        sytle={{ marginTop: "20px", textAlign: "justify" }}
                      >
                        <Typography component="p">
                          {userDetail.summaryOfExpertise}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          ) : null}
        </>
      ) : component === "editProfile" ? (
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
              <EditIcon className={classes.icon} />
              Update Profile
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
