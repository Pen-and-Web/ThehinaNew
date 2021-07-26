import Head from "next/head";
import ConsultantDashboard from "../../components/consultant/ConsultantDashboard";
import {parseCookies} from 'nookies'
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";


const consultant = ({userDetail}) => {
  console.log("user Detail in consultant ",userDetail)
  return (
    <div>
      <Head>
        <title>Consultant Dashboard</title>
      </Head>
      
      <ConsultantDashboard userDetail={userDetail} />
      
    </div>
  );
};

export default consultant;


consultant.getInitialProps = (ctx)=>{
  try{
    const cookie = parseCookies(ctx);
      // const user = cookie.User?"Admin":"";
      const decoded = jwt_decode(cookie.Token);
      console.log("decoder",decoded.role)
      const role = decoded.role;
     
      if(role !== 'Consultant' ){
        //as token is valid but when user use a valid token then this condition will
        //check whether decrypted token contain admin as a role otherwise redirect to login page
        console.log("admin as a role condition works=> not admin")
        const {res} = ctx;
        res.writeHead(302,{Location:"/"})
        res.end()
      }

      return{
        userDetail: decoded
      }
  
      
      }
      catch(err){
        //it handles invalid token error 
        //when token is remove or invalid then it redirect to login page
        console.log("Invalid Token")
        const {res} = ctx;
        res.writeHead(302,{Location:"/"})
        res.end()
      }

      
}
