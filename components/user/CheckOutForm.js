import Head from "next/head";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import Typography from "@material-ui/core/Typography";
import axios from 'axios'
import {baseURL, imgUrl} from '../../env'
import { useDispatch,useSelector } from "react-redux";

const CheckOutForm = () => {
   const [cardName,setCardName] = useState("test user")
   const [cardNumber,setCardNumber] = useState("5123450000000008")
   const [expirationMonth,setExpirationMonth] = useState("12")
   const [expirationYear,setExpirationYear] = useState("21")
   const [cvc,setCvc] = useState("124")
   const [country ,setCountry] = useState("Kuwait")
   const [city ,setCity] = useState("Kuwait city")
   const [street ,setStreet] = useState("Salim")
   const [addressLine1 ,setAddressLine1] = useState("Salmiya, 21")
   const [avenue ,setAvenue] = useState("Gulf")
   const appointmentDetail = useSelector(state=>{ return state.clientReducer.bookAppointmentDetail});
   const [cardToken,setCardToken] = useState("");
   const submit=()=>{
    const cardDetail={
      clientId:appointmentDetail.clientData.clientId,
      consultantId:appointmentDetail.consultantData.consultantId,
      name:cardName,
      cardNumber:cardNumber,
      month:expirationMonth,
      year:expirationYear,
      cvc:cvc,
      country:country,
      city:city,
      street:street,
      addressLine1:addressLine1,
      avenue:avenue,
      price:50
    }
    console.log(cardDetail,"card detail");

          axios.post(baseURL+`/checkOut`,cardDetail)
          .then(res=>console.log(res.data))
          .catch(err=>console.log(err))

  }
  
  var tap = Tapjsli('pk_test_zUctx7PYf3oiXkHn6MeTJ9Qm');
    //    pk_test_EtHFV4BuPQokJT6jiROls87Y
      var elements = tap.elements({});
      var style = {
        base: {
          color: '#535353',
          lineHeight: '18px',
          fontFamily: 'sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: 'rgba(0, 0, 0, 0.26)',
            fontSize:'15px'
          }
        },
        invalid: {
          color: 'red'
        }
      };
      // // input labels/placeholders
      var labels = {
          cardNumber:"Card Number",
          expirationDate:"MM/YY",
          cvv:"CVV",
          cardHolder:"Card Holder Name"
        };
        
      // //payment options
      var paymentOptions = {
        currencyCode:["KWD","USD","SAR"],
        labels : labels,
        TextDirection:'ltr'
      }
      // //create element, pass style and payment options
      var card = elements.create('card', {style: style},paymentOptions);
    const mount=()=>{  
      card.mount('#element-container')
    var form = document.getElementById('form-container');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      tap.createToken(card).then(function(result) {
        // console.log(result);
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('error-handler');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          var errorElement = document.getElementById('success');
          errorElement.style.display = "block";
          var tokenElement = document.getElementById('token');
          tokenElement.textContent = result.id;
          // console.log(result.id);
          // setCardToken(result.id);
          // console.log("card token",cardToken);
        }
      });
    }); }

    useEffect(()=>mount(),[])

      card.addEventListener('change', function(event) {
        if(event.BIN){
          console.log("BIN ",event.BIN)
        }
        if(event.loaded){
          console.log("UI loaded :"+event.loaded);
          console.log("current currency is :"+card.getCurrency())
        }
        var displayError = document.getElementById('error-handler');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
        
      });

      // Handle form submission
      
  



  return (
    <>
    
    

      <div>
        <Head>
          <title>Checkout</title>
        </Head>
      </div>
      
      <Grid container >
      <Grid item md={4 }  style={{ marginTop: "5px" }}>
          <Card style={{  border: "1px solid #DADCE0" }} elevation={3}>
         
          {appointmentDetail?
               <Grid container spacing={1}>
                  <Grid item md={12} xs={12} style={{backgroundColor:"#7F22DF",height:"50px",padding:'10px'}}>
                  <Typography variant="h6" style={{color:"white"}} align="center" >
                      Appointment Detail
                      </Typography>
                  </Grid>
                    <Grid container style={{padding:'30px'}}>
                        <Grid item md={12} xs={12} style={{marginTop:"10px"}}>
                                <InputLabel htmlFor="Gender">Client Name     </InputLabel>
                                <Typography component="p"  color="primary" style={{marginTop:'5px',marginLeft:'5px'}}>
                                {appointmentDetail.clientData.name}
                                  </Typography>
                                
                        </Grid>
                        <Grid item md={12} xs={12} style={{marginTop:"10px"}}>
                                <InputLabel htmlFor="Gender">Consultant Name   </InputLabel>
                                <Typography component="p"  color="primary" style={{marginTop:'5px',marginLeft:'5px'}}>
                                {appointmentDetail.consultantData.name} 
                                  </Typography>
                        </Grid>  
                        <Grid item md={12} xs={12} style={{marginTop:"10px"}}>
                                <InputLabel htmlFor="Gender">Meeting Detail   </InputLabel>
                                <Typography component="p"  color="primary" style={{marginTop:'5px',marginLeft:'5px'}}>
                                {appointmentDetail.startDate.slice(11,16)} - {appointmentDetail.endDate.slice(11,16)}
                                  </Typography>
                        </Grid>                   
                      </Grid>
                </Grid>     
           :
           null}
          </Card>
       </Grid>
      <Grid item md={1} ></Grid> 

      <Grid item md={6}  style={{ marginTop: "5px" }}>
      <form id="form-container" method="post" action="/charge">
            <div id="element-container"></div>
            <div id="error-handler" role="alert"></div>
            <div id="success" style={{display:'none',position:'relative',float: 'left'}}>
                  Success! Your token is <span id="token"></span>
            </div>
            <button color="primary" variant="outlined" id="tap-btn">Submit</button>
        </form>
       
{/*      
          <Card style={{  border: "1px solid #DADCE0" }} elevation={3}>    
          
               <Grid container >
                <Grid item md={12} xs={12} style={{backgroundColor:"#3E4EB8"}} >
                    <Typography variant="h6" align="center" style={{color:"white",height:"70px",padding:'20px',fontWeight:"600"}} >
                      Card Payment
                      </Typography>
                  </Grid>
                   
                    <Grid item md={12} xs={12} >
                      <Grid container spacing={1} style={{padding:'30px'}}>
                      <Grid item md={12} xs={12}>
                        <TextField
                            id="cardName"
                            value={cardName}
                            
                            label="Name on card"
                            type="text"
                            fullWidth
                            onChange={e=>setCardName(e.target.value)}
                            />                           
                        </Grid>

                        <Grid item md={12} xs={12}>
                        <TextField
                            id="pin"
                            label="Card Number"
                            value={cardNumber}
                            onChange={e=>setCardNumber(e.target.value)}

                            type="text"
                            fullWidth
                            />                           
                        </Grid>
                        
                      <Grid item md={3} xs={4}>
                          <TextField
                            id="month"
                            label="MM"   
                            value={expirationMonth}
                            onChange={e=>setExpirationMonth(e.target.value)}

                            /> 
                      </Grid>
                      <Grid item md={3} xs={4}>
                            <TextField
                            id="year"
                            label="YY" 
                            value={expirationYear}
                            onChange={e=>setExpirationYear(e.target.value)}

                            /> 
                            </Grid>
                      <Grid item md={3} xs={4}>
                            <TextField
                            id="cvc"
                            label="CVC"   
                            value={cvc}
                            onChange={e=>setCvc(e.target.value)}

                            />    
                      </Grid>
                        </Grid>                       
                    </Grid>


                    <Grid item md={12} xs={12} style={{marginTop:'10px'}} >
                      <InputLabel style={{marginLeft:'10px'}}>Country or Region </InputLabel>

                      <Grid container spacing={1} style={{padding:"30px"}}>
                      <Grid item md={4} xs={4}>                   
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <Select
                          fullWidth
                          native
                          value={country}
                          onChange={e=>setCountry(e.target.value)}

                        >
                          <option aria-label="None" value="Kuwait" />
                          <option value={"kuwait"}>Kuwait</option>
                          <option value={"bahrain"}>Bahrain</option>

                          <option value={"egypt"}>Egypt</option>
                          <option value={"jordan"}>Jordan</option>

                          <option value={"lebanon"}>Lebanon</option>
                          <option value={"oman"}>Oman</option>

                          <option value={"qatar"}>Qatar</option>
                          <option value={"saudiArabia"}>Saudi Arabia</option>

                          <option value={"unitedArabEmirates"}>United Arab Emirates</option>
                        </Select>                                     
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                            id="city"
                            label="City"
                            type="text"
                            fullWidth
                            value={city}
                            onChange={e=>setCity(e.target.value)}

                            />                           
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                            id="street"
                            label="Street"
                            type="text"
                            fullWidth
                            value={street}
                            onChange={e=>setStreet(e.target.value)}

                            />                           
                      </Grid>
                      <Grid item md={4} xs={4}>
                      <TextField
                            id="addressLine1"
                            label="AddressLine1"
                            type="text"
                            fullWidth
                            value={addressLine1}
                            onChange={e=>setAddressLine1(e.target.value)}

                            />  
                      </Grid>
                      <Grid item md={4} xs={4}>
                      <TextField
                            id="avenue"
                            label="Avenue"
                            type="text"
                            fullWidth
                            value={avenue}
                            onChange={e=>setAvenue(e.target.value)}

                            />  
                      </Grid>
                    </Grid>
                    </Grid>
                    </Grid>     


                    <Grid item md={12} xs={12} align="right" style={{padding:"20px"}} >
                      <Button onClick={(e)=>submit()}  fullWidth style={{backgroundColor:"#3D79FF",color:"white"}}>Pay Now 50SAR</Button>
                    </Grid>

                   

          </Card> */}
      
        </Grid>
        
        
      </Grid>

    </>
  );
};

export default CheckOutForm;
