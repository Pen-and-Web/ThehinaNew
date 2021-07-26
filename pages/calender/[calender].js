import Head from "next/head";
import Calender from '../../components/Calender'
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";

import {parseCookies} from 'nookies'
import jwt_decode from "jwt-decode";
import cookie from 'js-cookie'

const calender = () => {
const router = useRouter();
const id = router.query.calender; 
const isUser =cookie.get("Token");

console.log(id, "id")
  return (
    <>
      <Head>
        <title>Calender</title>
      </Head>
     
      {isUser?
         <Nav  isUser={isUser} />
         :
         <Nav/>
        }
    <Grid container style={{marginTop:"40px"}}>
      <Grid item md={12} style={{padding:'100px'}}>
         <Calender id={id} isUser={isUser}  />
      </Grid>
    </Grid>
      
      
    </>
  );
};

export default calender;

// calender.getInitialProps = (ctx)=>{
//   try{
//     const cookie = parseCookies(ctx);
//       // const user = cookie.User?"Admin":"";
//       const decoded = jwt_decode(cookie.Token);
//       console.log("decoder",decoded.role)
//       const role = decoded.role;
//       if(role !== 'User' ){
//         //as token is valid but when user use a valid token then this condition will
//         //check whether decrypted token contain admin as a role otherwise redirect to login page
//         console.log("user as a role condition works=> not User")
//         const {res} = ctx;
//         res.writeHead(302,{Location:"/"})
//         res.end()
//       }

//       return{
//         userDetail: decoded
//       }
  
      
//       }
//       catch(err){
//         //it handles invalid token error 
//         //when token is remove or invalid then it redirect to login page
//         // console.log(err)
//         const {res} = ctx;
//         res.writeHead(302,{Location:"/"})
//         res.end()
//       }

      
// }
