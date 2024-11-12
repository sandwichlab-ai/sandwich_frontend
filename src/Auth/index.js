import React, { useState, useEffect } from "react";
import { useLocation, 
  // useHistory 
  useNavigate
} from "react-router-dom";
// import { Auth } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth'
import axios from 'axios';
import image from '../assets/images/loginlogo.png';
import fblogo from '../assets/images/fblogo.png'
import "./index.css";

function AuthComponent(props) {
  const [testData, setTestData] = useState([["Full name"], ["Your Email"], ["Password"]]);
    const [formDataType, setFormDataType] = useState([["input"], ["input"], ["input"]])
    const [formData, setFormData] = useState([["", ""], [""], [""]]);
    const [errorData, setErrorData] = useState([["Full name is required", "Email is required"], ["Password is required"]])
    const [selectedInput, setSelectedInput] = useState([0, 0])
    const [sumbitBtnPressed, setSubmitBtnPrssed] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    const handleFacebookLogin = async () => {
      console.log("environment: ", process.env.NODE_ENV)
      const redirectUri = process.env.NODE_ENV == "production"
  ? "https://openidconnect.net/callback"
  : "http://localhost:3000/auth";

   console.log("redirect uri is: ", redirectUri)

      // window.location.href = "https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=6cc58a4esgfbhngiq8437afip1&redirect_uri=https://openidconnect.net/callback";
      // window.open(`https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`)  
      window.location.href = `https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`
      //   const inputData = {
      //     // "client_id": "6fq4fehkakj1fvm8jocji3prdi",
      //     // "redirect_uri": "https://openidconnect.net/callback",
      //     // "scope": "openid",
      //     // "response_type": "code",
      //     // "state": "2ec45dc767d955a53b6c21c0705ab3db3bbbdc32",
      //     // "redirect_uri": "https://www.google.com"
      //     "response_type": "code",
      //     "client_id": "111cv6odnaocu71pr68qosr42t", // "6cc58a4esgfbhngiq8437afip1",
      //     "redirect_uri": redirectUri,
      // }
    };  

    useEffect(() => {
      // console.log("auth part: ", JSON.parse(localStorage.getItem("token_obj")))
      console.log("start time ", JSON.parse(localStorage.getItem("token_obj_header")))
      debugger
      if(localStorage.getItem("token_obj") != null && localStorage.getItem("token_obj") != "[object Object]" && localStorage.getItem("token_obj_header")!= null) {
          console.log("auth part: ", JSON.parse(localStorage.getItem("token_obj"),"start time ", JSON.parse(localStorage.getItem("token_obj_header"))))
          const dateHeader = JSON.parse(localStorage.getItem("token_obj_header"))['date'];
          console.log("date header: ", dateHeader, JSON.parse(localStorage.getItem("token_obj_header")))
          const dateObject = new Date(dateHeader);
          console.log("create time: ", dateObject)
          const expireData = JSON.parse(localStorage.getItem("token_obj"))['expires_in']
          const expirationTime = new Date(dateObject.getTime() + 3600 * 1000);
          console.log("date data: ", expirationTime, dateObject.getTime() + expireData * 1000,"current time", Date.now())
         

      
      }
    })

  const handleSubmit = () => {
    console.log("sign request")
    // window.location.href = `https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`
    window.open("https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=http://localhost:3000/profile")
    // window.open("https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=https://auth0.sandwichlab.ai/oauth2/callback")


    window.addEventListener("message", (event) => {
      console.log("event is: ", event)
      // debugger
      if (event.origin !== "https://auth0.sandwichlab.ai") return;

      // 确保获取到token并保存
      const receivedToken = event.data.token;
      if (receivedToken) {
       
      }
  }, { once: true });
  
  }  
  const handleFormChange = () => {}
  const handleSelect = () => {}
  

  return (
    <div className="auth__container">
      <img src={image} alt="logo" className="auth_logo" />

      <div className='ontent__container--auth'>        
            <div className="contact__form--auth">
                <form>
                    {testData.map((row, rowIndex) => {
                        return(
                            <div className="row" key={rowIndex}>
                                {row.map((col, index) => {
                                    return(
                                        <div className="auth__form--item" key={index}>
                                            <label style={{ color: "#666666" }}>{col}</label>
                                            {formDataType[rowIndex][index] === 'input' && <input 
                                                type="text" 
                                                placeholder={col} 
                                                style={
                                                    (sumbitBtnPressed && errorData[rowIndex][index].length > 0) ? {borderColor:'rgba(255, 0, 0, 0.8)'} :
                                                    selectedInput[0] === rowIndex && selectedInput[1] === index? {borderColor: 'rgba(140, 104, 255, 0.8)'} : {borderColor: 'rgba(140, 104, 255, 0.2)'}
                                                }
                                                onChange={(e) => handleFormChange(rowIndex, index, e.target)}
                                                onSelect={(e) => handleSelect(rowIndex, index, e.target.value)} 
                                                />
                                                }
                                           {sumbitBtnPressed && <label style={{ color: "red", minHeight: "20px", 
    display: "inline-block" }}>{errorData[rowIndex][index]}</label>  } 

    {!sumbitBtnPressed && <label style={{ color: "red", minHeight: "20px", 
    display: "inline-block" }}></label> }
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className="btn__group--auth">
                        <button 
                            type="submit" 
                            onClick={handleSubmit}
                            style={{cursor: "pointer"}}
                            >Continue</button>
                    </div>
                    <div className="line-with-text">
                      <span>OR</span>
                    </div>

                    <div className="auth__signin--facebook">
                    <button 
                            type="submit" 
                            onClick={handleSubmit}
                            style={{cursor: "pointer"}}
                            ><img src={fblogo} width="32px" height="32px"/> 
                            <span>Sign-up with Facebook</span>
                            </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default AuthComponent;