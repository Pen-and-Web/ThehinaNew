import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  darken,
  fade,
  lighten,
} from "@material-ui/core/styles/colorManipulator";
import Grid from '@material-ui/core/Grid';
import BookIcon from '@material-ui/icons/Book';
import Typography from "@material-ui/core/Typography";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import SubjectIcon from '@material-ui/icons/Subject';
import {

  Scheduler,
  // MonthView,
  // DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import axios from 'axios';

import Router from 'next/router';
import NProgress from 'nprogress';
import Link from 'next/link'
import {baseURL} from '../env'

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

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === "light"
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

const styles = (theme) => ({
  cell: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-child": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
  text: {
    padding: "0.5em",
    textAlign: "center",
  },
  sun: {
    color: "#FFEE58",
  },
  cloud: {
    color: "#90A4AE",
  },
  rain: {
    color: "#4FC3F7",
  },
  sunBack: {
    backgroundColor: "#FFFDE7",
  },
  cloudBack: {
    backgroundColor: "#ECEFF1",
  },
  rainBack: {
    backgroundColor: "#E1F5FE",
  },
  opacity: {
    opacity: "0.5",
  },
  appointment: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6,
    },
  },
  apptContent: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: "none",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    width: "400px",
  },
  tooltipText: {
    ...theme.typography.body2,
    display: "inline-block",
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: "middle",
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: "super",
  },
  textCenter: {
    textAlign: "center",
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  secondRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

const Appointment = withStyles(styles, { name: "Appointment" })(
  ({ classes, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      className={classes.appointment}
      
      // onClick={() => console.log("Rest Props 2: ", restProps)}
     
    />
  )
);

const AppointmentContent = withStyles(styles, { name: "AppointmentContent" })(
  ({ classes, ...restProps }) => (
    <Appointments.AppointmentContent
      {...restProps}
      className={classes.apptContent}
    />
  )
);

const FlexibleSpace = withStyles(styles, { name: "ToolbarRoot" })(
  ({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <div className={classes.flexContainer}>
        <Typography variant="h5" style={{ marginLeft: "10px" }}>
          <img src="/logo.png" style={{ width: "100px", height: "100px" }} />
        </Typography>
      </div>
    </Toolbar.FlexibleSpace>
  )
);

const Content = withStyles(style, { name: 'Content' })((
    
  {  children, appointments, classes, ...restProps}) => {
    const router = useRouter();
  
  return (

  <AppointmentTooltip.Content {...restProps} appointments={appointments}>
    
    <Grid container alignItems="center">
    <Grid item xs={2} className={classes.textCenter}>
      <SubjectIcon />
      </Grid>
      <Grid item xs={10}>
      <Typography >{restProps.appointmentData.subject}</Typography>
        </Grid>
      <Grid item xs={2} className={classes.textCenter}>
        <BookIcon />
      </Grid>
      <Grid item xs={10}>
        <Button
        color="primary"
        style={{ zIndex: "100" }}
        variant="contained"
        onClick={(e) =>{ 
          e.preventDefault();
          // router.push(`/user/`)
          // router.push(`/user/${restProps.appointmentData.consultantId}`)
          router.push({
            pathname: `/user`,
            query: {
              slotId:restProps.appointmentData._id,
              id: restProps.appointmentData.consultantId,
              start:restProps.appointmentData.startDate,
              end:restProps.appointmentData.endDate
            }
            ,
            shallow: true
          })
        }
      }
        fullWidth
      >
        Book Appointment
      </Button>
      {/* <Link
     
          href={{
            pathname: '/user',
            query: {
              slotId:restProps.appointmentData._id,
              id: restProps.appointmentData.consultantId,
              start:restProps.appointmentData.startDate,
              end:restProps.appointmentData.endDate
            }
          }}
        >
          <a  >
            <Button color="primary" style={{ zIndex: "100" }} variant="contained">Book Appointment</Button>
          </a>
      </Link> */}
      {/* {console.log("checking record id in calender",restProps.appointmentData)} */}
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
)});

const CommandButton = withStyles(style, { name: 'CommandButton' })(({
  classes, ...restProps
}) => (
  <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
));

export default class Calender extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      open: false,
      popupData: {},
    };

  }

  async  consultantData(){
    let data = await axios.get(baseURL+`/schedule?consultantId=${this.props.id}`)
    .then(res=>{
      this.setState({data:res.data})     
    })
  }
  componentDidMount(){
    this.consultantData();
   }
   componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.consultantData()
    }
   }
  
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }


  
  render() {
    const { data, open } = this.state;
    // console.log("id in calender",this.props.id);
    
    return (
     
      <div style={{ padding: "100px", marginTop: "-100px" }}>
        
        <Paper style={{ border: "1px solid #E0E0E0" }}>
          <Scheduler data={data.schedule}>
            {console.log("schedular",data.schedule)}
            {/* <EditingState onCommitChanges={this.commitChanges} /> */}
            <ViewState  />

            
            <WeekView startDayHour={9} endDayHour={19} />

            <Appointments
              appointmentComponent={Appointment}
              appointmentContentComponent={AppointmentContent}
            />
            
            <Toolbar flexibleSpaceComponent={FlexibleSpace} />
            
            <DateNavigator />
            
            {/* <EditRecurrenceMenu /> */}
          {
            this.props.isUser?
            <AppointmentTooltip
              contentComponent={Content}
              commandButtonComponent={CommandButton}
              showCloseButton
            />
            :
            null

          }
            {/* <AppointmentForm /> */}
           
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
