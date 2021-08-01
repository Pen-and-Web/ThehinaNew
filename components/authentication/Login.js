import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import * as actions from "../../redux-thunk/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { CardActions } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import grey from "@material-ui/core/colors/grey";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Router from "next/router";
import NProgress from "nprogress";
import ResetPassword from "./ResetPassword";
import { Alert, AlertTitle } from "@material-ui/lab";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [component, setComponent] = useState("login");
  const inherit = grey["#fafafa"]; // #f44336

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const submitSignin = async (email, password) => {
    setErrorMessage("")
    setLoader(true);
    await dispatch(actions.login({ email, password }))
      .then((response) => {
        console.log("Login response ", response);
        // response.error?.message ===
        // "Currently you can not sign in to this application!"
        //   ? setOpen(true)
        //   : null;
          if(response.error){
            if(response.error.error){
            setErrorMessage(response.error.error)
            setOpen(true)
            }
            if(response.error.message){
              setErrorMessage(response.error.message)
              setOpen(true)
            }
            
          }
          // if(response.status===500){
          // if(response.error){
          //     setErrorMessage(response.error)
          //     setOpen(true)
          //     console.log("123")
          //   }
          // }
          
        
        if (response.role === "User") {
          setLoader(true);
          router.push("/thehina");
        } else if (response.role === "Consultant") {
          setLoader(true);
          router.push("/consultant");
        } else if (response.role === "SuperAdmin") {
          setLoader(true);
          // console.log("3");
          router.push("/admin");
        }
        else if (response.role === "Admin") {
          setLoader(true);
          // console.log("3");
          router.push("/subadmin");
        } else {
         
            setLoader(false);
            // setErrorMessage("Internal Server Error")
            // setOpen(true)
         
          
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log("Forbidden error message");
        console.log("Login Error: ", error.response);
      });
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          style={{ color: "#E23545" }}
          onClose={handleClose}
        >
          Login Error
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        </DialogContent>
      </Dialog>

      <Card
        elevation={3}
        style={{
          padding: "20px",
          border: "1px solid #DADCE0",
          marginTop: "40px",
        }}
      >
        <Typography align="center">
          <img
            src="https://thehina.com/assets/img/logo/logo.png"
            height="40%"
          />
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          style={{ marginTop: "20px", marginBottom: "20px", color: "#730DDC" }}
          align="center"
        >
          Sign in
        </Typography>

        <form noValidate autoComplete="off">
          <TextField
            id="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ marginTop: "10px" }}
            size="small"
            autoComplete="current-email"
            variant="outlined"
          />

          <TextField
            id="password"
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ marginTop: "10px" }}
            size="small"
            autoComplete="current-password"
            variant="outlined"
          />
        </form>

        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "12px",
              color: "white",
              backgroundColor: "#7b40c0",
              textTransform:"capitalize"
            }}
            disabled={!email || !password}
            onClick={() => submitSignin(email, password)}
            size="large"
            fullWidth
          >
            Login
          </Button>
        </CardActions>
        {loader === true ? (
          <center>
            <CircularProgress color="primary" />
          </center>
        ) : null}
        {alert === true ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {responseMessage}
          </Alert>
        ) : null}
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            style={{ marginTop: "12px", color: "#7b40c0",textTransform:"capitalize" }}
            onClick={() => router.push("/signup")}
          >
            Don't have an account? Sign up.
          </Button>
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            style={{ color: "#DA71D4",textTransform:"capitalize" }}
            onClick={() => router.push("/resetpassword")}
          >
            Forgotten account?
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Login;
