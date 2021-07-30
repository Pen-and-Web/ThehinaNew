import React from "react";
import {
  darken,
  fade,
  lighten,
} from "@material-ui/core/styles/colorManipulator";
import BookIcon from '@material-ui/icons/Book';
import SubjectIcon from '@material-ui/icons/Subject';
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import axios from 'axios';
import { baseURL } from "../../env";
import Alert from '@material-ui/lab/Alert';
import { useDispatch,useSelector } from "react-redux";
import * as actions from './redux/actions'
import {ListItem,ListItemText,ListItemAvatar,Avatar,Box,Paper,Grid,Typography,CircularProgress} from '@material-ui/core';


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
        backgroundColor:'#65d4e0'
      },
      backgroundColor: "#50bbc7",
    },
    bookedAppointment:{
      borderRadius: "10px",
      color: "white",
      backgroundColor: "#7b40c0",
      "&:hover": {
        opacity: 0.6,
        backgroundColor:'#6146AC'
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
    
    <div>
  {   
   
    restProps.data.availability=== false?
      <Appointments.Appointment
                {...restProps}
                className={classes.bookedAppointment}      
                onClick={() => console.log("",restProps)}     
            />
      :
      
      <Appointments.Appointment
                {...restProps}
                className={classes.appointment}      
                // onClick={() => console.log("Rest Props 2: ", restProps)}     
            />
        
  }   
    </div>
    
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
       <ListItem>
              <Box  borderRadius="50%"  style={{ width:'20px',height:'20px',backgroundColor:'#7b40c0',marginRight:'10px' }} >
              </Box>          
              <ListItemText primary="Booked"  />

              <Box  borderRadius="50%"  style={{ width:'20px',height:'20px',backgroundColor:'#50bbc7',marginRight:'10px',marginLeft:'10px' }}>
              </Box>
              <ListItemText primary="Available"  />
        </ListItem>      
       
        <Typography variant="h5" >
          <img src="/logo.png" style={{ width: "100px", height: "100px" }} />
        </Typography>
      </div>
      
    </Toolbar.FlexibleSpace>
  )
);

const Content = withStyles(style, { name: 'Content' })((
  {  children, appointments, classes, ...restProps}) => {
    const router = useRouter();
    const dispatch = useDispatch();
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
          style={{ zIndex: "100",color:"white",backgroundColor:'#730DDC',textTransform:"capitalize" }}
          variant="contained"
          onClick={() =>{           
            dispatch(actions.bookAppointmentData(restProps.appointmentData._id,restProps.appointmentData.consultantId,restProps.appointmentData.startDate,restProps.appointmentData.endDate));
            dispatch(actions.switchComponent(true))
          }
          }
        fullWidth
        >
            Request an Appointment
        </Button>
      
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

  async consultantData(){
    let data = await axios.get(baseURL+`/schedule?consultantId=${this.props.consultantId}`)
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
  

  render() {
    const { data, open } = this.state;
    // console.log(data.schedule,"Data schedule")
    // console.log(data.schedule?.length,"schedule length")
    return (
     
      <div style={{ padding: "100px", marginTop: "-100px" }}>     
         {data.schedule?.length===0?
          <Paper style={{ border: "1px solid #E0E0E0",padding:'20px' }} elevation={3}>
             <Alert severity="success">The consultant has not created any appointment slot.</Alert>
          </Paper>           
            :
          data.schedule?.length>0?
          <>
            <Typography variant="h6" color="primary">Total Slots: {data.schedule.length}</Typography>
              <Paper style={{ border: "1px solid #E0E0E0" }} elevation={3}>             
              <Scheduler data={data.schedule}>
                <ViewState  />           
                <WeekView startDayHour={9} endDayHour={19} />
                <Appointments
                  appointmentComponent={Appointment}
                  appointmentContentComponent={AppointmentContent}
                />            
                <Toolbar flexibleSpaceComponent={FlexibleSpace} />
                <DateNavigator />                
                <AppointmentTooltip
                  contentComponent={Content}
                  commandButtonComponent={CommandButton}
                  showCloseButton
                />           
              </Scheduler>
            </Paper>
          </>
            :
            <Grid container>
                <Grid item md={4} xs={4}></Grid>
                  <Grid item md={4} xs={4} align="center">
                    <CircularProgress />
                  </Grid>
                <Grid item md={4} xs={4}></Grid>
            </Grid>
        }
      </div>
    );
  }
}
