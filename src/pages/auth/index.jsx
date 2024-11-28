import React, { useState, useEffect } from 'react';
import {
  useLocation,
  // useHistory
  useNavigate,
} from 'react-router-dom';
import { Row, Col, Card, Form, Input, Button, Tabs } from "antd";
// import { Auth } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth';
import axios from 'axios';
import image from '../../assets/images/logosandwich.png';
import fblogo from '../../assets/images/fblogo.png';
import './index.css';

const { TabPane } = Tabs;

function AuthComponent(props) {

  const [accountStatus, setAccountStatus] = useState(0);                     // 0 : sign up , 1 : login

  const [testData, setTestData] = useState([
    ['Full Name'],
    ['Your Email'],
    ['Password'],
  ]);
  const [formDataType, setFormDataType] = useState([
    ['input'],
    ['input'],
    ['input'],
  ]);
  const [formData, setFormData] = useState([['', ''], [''], ['']]);
  const [errorData, setErrorData] = useState([
    ['Full Name is required', 'Email is required'],
    ['Password is required'],
  ]);
  const [selectedInput, setSelectedInput] = useState([0, 0]);
  const [sumbitBtnPressed, setSubmitBtnPrssed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form values:", values);
  };

  const handleFacebookLogin = async () => {
    console.log('environment: ', process.env.NODE_ENV);
    const redirectUri =
      process.env.NODE_ENV == 'production'
        ? 'https://openidconnect.net/callback'
        : 'http://localhost:3000/auth';

    console.log('redirect uri is: ', redirectUri);

    // window.location.href = "https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=6cc58a4esgfbhngiq8437afip1&redirect_uri=https://openidconnect.net/callback";
    // window.open(`https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`)
    window.location.href = `https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`;
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
    console.log(
      'start time ',
      JSON.parse(localStorage.getItem('token_obj_header'))
    );
    if (
      localStorage.getItem('token_obj') != null &&
      localStorage.getItem('token_obj') != '[object Object]' &&
      localStorage.getItem('token_obj_header') != null
    ) {
      console.log(
        'auth part: ',
        JSON.parse(
          localStorage.getItem('token_obj'),
          'start time ',
          JSON.parse(localStorage.getItem('token_obj_header'))
        )
      );
      const dateHeader = JSON.parse(localStorage.getItem('token_obj_header'))[
        'date'
      ];
      console.log(
        'date header: ',
        dateHeader,
        JSON.parse(localStorage.getItem('token_obj_header'))
      );
      const dateObject = new Date(dateHeader);
      console.log('create time: ', dateObject);
      const expireData = JSON.parse(localStorage.getItem('token_obj'))[
        'expires_in'
      ];
      const expirationTime = new Date(dateObject.getTime() + 3600 * 1000);
      console.log(
        'date data: ',
        expirationTime,
        dateObject.getTime() + expireData * 1000,
        'current time',
        Date.now()
      );
    }
  });

  useEffect(() => {
    console.log("account status change:", accountStatus)
    if (accountStatus == 0) {
      setTestData([
        ['Full Name'],
        ['Your Email'],
        ['Password'],
      ]);
    } else {
      setTestData([
        ['Your Email'],
        ['Password'],
      ]);
    }
    console.log("form data is: ", formData)
  }, [accountStatus])

  const handleSubmit = () => {
    console.log('sign request');
    // window.location.href = `https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`

    //  window.location.assign("https://www.google.com");
    // 'https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=http://localhost:3000/lexi/brands'



    // window.open(
    //   'https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=http://localhost:3000/lexi/brands'
    // );



    // window.location.href = `https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=111cv6odnaocu71pr68qosr42t&redirect_uri=http://localhost:3000/auth`
    // window.open(
    //   'https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=https://test.sandwichlab.ai/profile'
    // );
    // window.open("https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=https://auth0.sandwichlab.ai/oauth2/callback")

    // window.addEventListener(
    //   'message',
    //   (event) => {
    //     console.log('event is: ', event);
    //     // debugger
    //     if (event.origin !== 'https://auth0.sandwichlab.ai') return;

    //     // 确保获取到token并保存
    //     const receivedToken = event.data.token;
    //     if (receivedToken) {
    //     }
    //   },
    //   { once: true }
    // );
  };
  const handleFormChange = () => { };
  const handleSelect = () => { };

  return (
    <div className='auth__container'>
      <img src={image} alt='logo' className='auth_logo' />

      <div className='content__container--auth'>
        {!accountStatus && <div style={{ marginTop: "8%" }}>
          <div className='auth__title'>Create an account</div>
          <div className='auth__title--note'>
            Already have an account?{' '}
            <a style={{ textDecoration: 'underline' }} onClick={() => setAccountStatus(1)}>Log in</a>{' '}
          </div>
        </div>}

        {accountStatus == 1 && <div style={{ marginTop: "8%" }}>
          <div className='auth__title'>Login</div>
          <div className='auth__title--note'>
            Don't have an account?{' '}
            <a style={{ textDecoration: 'underline' }} onClick={() => setAccountStatus(0)}>Sign up</a>{' '}
          </div>
        </div>}

        <div className='contact__form--auth'>
          {/* {accountStatus == 0 && <div style={{marginTop:"7%"}}>Enter your email address to create an account</div>} */}
          <div style={{ marginTop: "7%", textAlign: "center" }}>{accountStatus == 0 && "Enter your email address to create an account"}</div>
          <form>
            {testData.map((row, rowIndex) => {
              return (
                <div className='row' key={rowIndex}>
                  {row.map((col, index) => {
                    return (
                      <div className='auth__form--item' key={index}>
                        <label style={{ color: '#666666' }}>{col}</label>
                        {formDataType[rowIndex][index] === 'input' && (
                          <input
                            type='text'
                            placeholder={col}
                            onChange={(e) =>
                              handleFormChange(rowIndex, index, e.target)
                            }
                            onSelect={(e) =>
                              handleSelect(rowIndex, index, e.target.value)
                            }
                          />
                        )}
                        {sumbitBtnPressed && (
                          <label
                            style={{
                              color: 'red',
                              minHeight: '20px',
                              display: 'inline-block',
                            }}
                          >
                            {errorData[rowIndex][index]}
                          </label>
                        )}

                        {!sumbitBtnPressed && (
                          <label
                            style={{
                              color: 'red',
                              minHeight: '20px',
                              display: 'inline-block',
                            }}
                          ></label>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div className='btn__group--auth'>
              {!accountStatus && <button
                type='submit'
                onClick={handleSubmit}
                style={{ cursor: 'pointer' }}
              >
                {/* <a href="https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?client_id=111cv6odnaocu71pr68qosr42t&response_type=code&scope=email+openid+phone&redirect_uri=http://localhost:3000/lexi/brands"> */}
                Continue
                {/* </a> */}

              </button>}

              {accountStatus == 1 &&
                <button
                  type='submit'
                  onClick={
                    () => {
                      console.log("navigate")
                      navigate('/')
                    }
                  }
                  style={{ cursor: 'pointer' }}
                >
                  Log in
                </button>

              }
            </div>
            <div className='line-with-text'>
              <span>OR</span>
            </div>

            <div className='auth__signin--facebook'>
              <button
                type='submit'
                onClick={() => {
                  console.log("navigate")
                  navigate('/')
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={fblogo} width='32px' height='32px' />
                <span>{accountStatus == 0 ? "Sign-up" : "Log in"} with Facebook</span>
              </button>
              <a href="https://www.google.com" />
            </div>
          </form>

          {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <Row style={{ width: "100%", height: "40%" }} justify="center">
        <Col xs={24} sm={18} md={12} lg={8}>
                <Form form={form} onFinish={handleFinish} layout="vertical">
                  <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: "请输入用户名!" }]}
                  >
                    <Input placeholder="请输入用户名" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ required: true, type: "email", message: "请输入有效的邮箱地址!" }]}
                  >
                    <Input placeholder="请输入邮箱" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: "请输入密码!" }]}
                  >
                    <Input.Password placeholder="请输入密码" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      注册
                    </Button>
                  </Form.Item>
                </Form>     
        </Col>
      </Row>
      <div className='auth__signin--facebook'>
              <button
                type='submit'
                onClick={handleSubmit}
                style={{ cursor: 'pointer' }}
              >
                <img src={fblogo} width='32px' height='32px' />
                <span>Sign-up with Facebook</span>
              </button>
            </div>
    </div>
           */}


        </div>
        <div className='contact__form--notes'>
          By signing up you agree to the{' '}
          <a style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
            Term of use{' '}
          </a>{' '}
          and{' '}
          <a style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
            Privacy Policy.{' '}
          </a>
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
