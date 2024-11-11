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
      window.open(`https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`)  
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
      // axios.post('http://localhost:5000/auth/login', { code:"123" })
      // .then(response => {}).catch(error => {
      // console.error('Error during login:', error);
      // });
    })

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
  
     
      if (code) {
        // 发送 code 到服务器或进行后续处理
        console.log("Authorization code:", code);
        axios.post('http://localhost:5000/auth/contact', { code })
    .then(response => {
      const { user, token } = response.data;
      // 持久化到 localStorage 或者更新到应用状态
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', token);
    })
    .catch(error => {
      console.error('Error during login:', error);
    });


      //   // 在此处调用你的后端服务，交换该 code 换取用户访问令牌
      //   fetch("https://your-backend.com/auth/facebook", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ code }),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log("Token data:", data);
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching token:", error);
      //     });
      // } else {
      //   console.error("Authorization code not found.");
      // }
      }
    }, [location]);

  const handleSubmit = () => {
    console.log("sign request")
    // window.open("https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=https://auth0.sandwichlab.ai/oauth2/callback")
    axios.get("https://auth0.sandwichlab.ai/oauth2/login").then(
      res => {
        console.log("res is: ", res)
      // debugger
    }).catch(error => {
      console.log("error is: ",error)
    })
    
    axios.get("https://auth0.sandwichlab.ai/oauth2/authorize?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=https://auth0.sandwichlab.ai/oauth2/callback").then(
      res => {
        console.log("res is: ", res)
      // debugger
    }
    ).catch(
      error => {
        console.log("error is: ", error)
        // debugger
      }
    ) 
    // navigate('/profile')
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


      {/* <button onClick = {() => handleFacebookLogin()}>auth</button> */}
      
    </div>
  );
}

export default AuthComponent;