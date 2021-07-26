import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../components/admin/actions/actions";
import * as clientActions from "./redux/actions";
import Calender from "./Calender";
import BookAppointmentForm from "./BookAppointmentForm";
import {baseURL, imgUrl} from '../../env'
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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

const ConsultantCard = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [consultantId, setConsultantId] = useState("");
  const [component, setComponent] = useState("consultantCard");

  const getConsultant = () => {
    axios
      .get(baseURL + "/user?role=Consultant")
      .then((response) => {
        dispatch(actions.consultant(response.data.user));
      })
      .catch((err) => console.log(err));
  };

  const data = useSelector((state) => {
    return state.adminReducer.consultantData;
  });
  const switchComponent = useSelector((state) => {
    return state.clientReducer.switchComponent;
  });

  useEffect(() => {
    getConsultant();
  }, []);

  return (
    <>
      {component === "consultantCard" ? 
      (
        <Grid container>
          <Grid
            container
            spacing={10}
            style={{ margin: "0", backgroundColor: "#F5F6F9" }}
          >
            {data.length > 0 ? (
              data.map((postItem, index) => (
                <Grid item md={4} key={postItem._id}>
                  <Card elevation={3} style={{ maxWidth: "300px",maxHeight:"550px" }}>
                    {
                      // / <span style={{display:'flex',justifyContent:'center'}}> /
                    }
                    <CardActionArea className={classes.media}>
                      <img
                        style={{ maxWidth: "300px", objectFit: "cover" }}
                        src={`${imgUrl}/${postItem.imageUrl}`}
                        title="consult"
                      />
                    </CardActionArea>
                    {/* </span>  */}
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          style={{ textAlign: "center",height:'32px' }}
                        >
                          {postItem.name.slice(0,10)}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="primary"
                          component="p"
                          style={{ textAlign: "center",height:'32px' }}
                        >
                          {postItem.mainDomain}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ textAlign: "center",height:'20px' }}
                        >
                          {postItem.summaryOfExpertise.slice(0,20)?postItem.summaryOfExpertise.slice(0,100):postItem.summaryOfExpertise}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "10px",backgroundColor:'#7b40c0',color:'white',marginTop:'20px' }}
                        onClick={() => {
                          setComponent("calender"),
                            setConsultantId(postItem._id);
                        }}
                      >
                        Book Appointment
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <>
                <Grid item md={4} xs={4}></Grid>
                <Grid item md={4} xs={4} align="center">
                  <CircularProgress />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      ) 
      : 
      component === "calender" ? 
      (
        <>
        <IconButton onClick={()=>{setComponent('consultantCard')}}><ArrowBackIosIcon  style={{color:'#9c27b0'}}/></IconButton>
          {
            //  basically when we open tooltip  and press ok this condition will open booking form /
          }
          {switchComponent === true
            ? setComponent("bookAppointmentForm")
            : null}
          {switchComponent === true
            ? dispatch(clientActions.switchComponent(false))
            : null}
          <Calender consultantId={consultantId} />
        </>
      ) : component === "bookAppointmentForm" ? (
        <>
          {switchComponent === true ? setComponent("consultantCard") : null}
          {switchComponent === true
            ? dispatch(clientActions.switchComponent(false))
            : null}
          <BookAppointmentForm />
        </>
      ) : null}
    </>
  );
};

export default ConsultantCard;
