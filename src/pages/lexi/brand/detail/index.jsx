import React, { useState, useEffect } from 'react';
import { Flex, Input, Select, Form, Button, Row, Col, Carousel, Modal } from 'antd';
import AccountContent from '../AccountContent.jsx';
import Examples from "../../../../components/examples/index.jsx"
import LexiForm from "../../../../components/lexi-form"
import meta from '../../../../assets/images/meta.png';
import { useStore } from '../../../../stores/routeStore';
import { observer } from 'mobx-react-lite';
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import axiosInstance from '../../../../utils/axiosInstance.js';
import FacebookLogin from 'react-facebook-login';

const data = [
  {
    key: '1',
    name: 'John Brown',
    accountId: 32,
    accountStatus: 'Active',
  },
  {
    key: '2',
    name: 'Jim Green',
    accountId: 42,
    accountStatus: 'Active',
  },
  {
    key: '3',
    name: 'Joe Black',
    accountId: 32,
    accountStatus: 'Active',
  },
  {
    key: '4',
    name: 'Disabled User',
    accountId: 99,
    accountStatus: 'InActive',
  },
  {
    key: '5',
    name: 'Sandwich Lab',
    accountId: 34,
    accountStatus: 'Active',
  },
];

const examples = [
  "I am a divorce lawyer1 based in ....",
  "I am a divorce lawyer2 based in ....",
  "I am a divorce lawyer3 based in ....",
  "I am a divorce lawyer4 based in ...."
]

function setToken() {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('idToken');
      console.log("token is: ", token, "header is: ", localStorage.getItem("accessToken"))
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

function Detail(props) {
  const { TextArea } = Input;

  const [accountCnt, setAccountCnt] = useState(1);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accontText, setAccountText] = useState("Ad Account Connect")
  const [btnWidth, setBtnWidth] = useState(412)
  const [brandName, setBrandName] = useState("")
  const [brandIntro, setBrandIntro] = useState("")
  const [account, setAccount] = useState({});
  const [realData, setRealData] = useState([]);
  const [fbUrl, setFbUrl] = useState("")

  const { brandList } = useStore();

  const navigate = useNavigate()
  const { id } = useParams();

  const [form] = Form.useForm();

  useEffect(() => {
    const handleAuthEvents = (data) => {
      const { event } = data.payload;

      if (event === 'signIn') {
        console.log('User signed in');
        navigate('/lexi/brand'); // 登录成功后跳转到 dashboard
      } else if (event === 'signUp') {
        console.log('User created account');
        navigate('/lexi/navigate'); // 注册成功后跳转到 welcome
      }
    };
  }, [navigate]);

  useEffect(() => {

    console.log("86 id is: ", id)
    if (brandName && brandName.length > 0) {
      console.log("enable false")
      setSubmitDisabled(false)
    } else {
      console.log("enable true")
      setSubmitDisabled(true)
    }
    // brandList.init()
  }, [brandName])

  useEffect(() => {

    if (id) {

      const fetchReq = async () => {
        setToken()
        axiosInstance.get(`https://api-dev.sandwichlab.ai/api/brand/?brand_id=${id}`).then(
          res => {
            console.log("89 res is: ", res)
            setAccount(res.data)
            setBrandName(res.data.name)
            setBrandIntro(res.data.description)
            // form.setFieldsValue({ "": res.data.name });
          }
        ).catch(
          err => {
            console.log("92 err is: ", err)
          }
        )
      }

      fetchReq()
    }

    // console.log("id changed", id)
    // const asyncBrandCall = async () => {
    //   await brandList.getBrand(id);
    //   //console.log("brand list is: ", brandList.list.map((el) => el.name));
    // }


    // asyncBrandCall()
  }, [id])

  const list = brandList.list.slice(0);

  useEffect(() => {
    console.log("mode change", props.mode)
    if (props.mode == 'add') {
      setAccountText("Ad Account Connect")
      setBtnWidth(412)
    } else {
      setAccountText("Edit")
      setBtnWidth(101)
    }
  }, [props.mode])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("cancel triggered")
    setIsModalOpen(false);
  };

  const handleClose = () => {
    // realData.push({ "id": 111 })
    // setRealData(realData)
    console.log("close triggered")
  }

  const onChange = (e) => {
    console.log('brand intro changed', e.target.value);
    setBrandIntro(e.target.value)
  };

  const onExampleChange = (e) => {
    console.log("example change", e.target);
  }

  const renderCount = ({ count, maxLength }) => (
    <div style={{ position: 'absolute', bottom: '-2000px', left: '0', color: 'blue' }}>
      {count} / {maxLength}
    </div>
  );

  const handleChange = (e) => {
    console.log("select brand change", e.target.value);
    setBrandName(e.target.value)
  }

  const handleSumbit = () => {
    console.log("submit");
    if (props.mode == "create") {
      console.log("add brand", brandName, brandIntro)
      // brandList.addBrand({
      //   name: brandName,
      //   status: "draft",
      //   updateTime: `${Date.now()}`,
      // })
      // console.log("list is: ", brandList.list)
      // navigate("/lexi/brands")

      console.log("id token", localStorage.getItem("idToken"))

      const result = {
        "name": brandName,
        "description": brandIntro,
        "goal": "123",
      }

      axiosInstance.post("https://api-dev.sandwichlab.ai/api/brand", result).then(
        res => {
          console.log("res is: ", res)
          navigate("/lexi/brands")
        }
      ).catch(
        error => {
          console.log("error is: ", error)
        }
      )

    } else {
      handleUpdate()
    }
  }

  const handleFacebookCallback = (response) => {
    if (response?.status === "unknown") {
      console.error('Sorry!', 'Something went wrong with facebook Login.', response);
      return;
    }
    console.log(response);
  }

  const setAddAccount = (account) => {
    console.log("account is: ", account)
    account.key = 1;
    setAccount(account);
    setIsModalOpen(false)
  }

  const handleUpdate = () => {
    console.log("126 brand name", brandName)

    const input = {
      "id": +id,
      "name": brandName,
      "brand_description": brandIntro,
      "description": brandIntro,
      "goal": "123",
    }

    setToken()

    axiosInstance.put(`https://api-dev.sandwichlab.ai/api/brand/`, input).then(
      res => {
        console.log("res is: ", res)
        navigate("/lexi/brands")
      }
    ).catch(
      error => {
        console.log("error is: ", error)
      }
    )

    // navigate("/lexi/brands")
    // props.brandsList.update(result)
  }

  return (
    <div className='content'>
      <div className='addtional__information'>

        <div className="brand__container">
          <Form
            form={form}
          >
            <Form.Item
              label="Brand Name"
              name="brandname"
              rules={[{ required: true, message: 'Please input brand name!' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <div style={{ display: "none" }}> {brandName} </div>
              <Input value={brandName} style={{ width: "60%" }} onChange={handleChange} />
            </Form.Item>

          </Form>


          {/* <LexiForm data={account} /> */}

        </div>
      </div>

      <div className='content__bussiness'>


        <Row>
          <Col
            span={12}
          >
            <Form.Item
              label="Brand Introduction"
              name="bussiness"
              rules={[{ required: true, message: 'Please describe your bussiness!' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <div style={{ display: "none" }}> {brandIntro} </div>
              <TextArea
                showCount={renderCount}
                value={brandIntro}
                maxLength={5000}
                width={'60%'}
                onChange={onChange}
                placeholder='Examples: Sandwichlab is a lead AI company in social media marketing'
                style={{ height: 301, resize: 'none' }}
              />
            </Form.Item>
          </Col>

          <Col
            span={8}
          >
            <span>Examples</span>
            <Examples examples={examples} />

          </Col>
        </Row>



      </div>

      <div className='account__connection' onClick={() => {
        setIsModalOpen(true) //isModalOpen

        setToken()
        axiosInstance.get(`https://api-dev.sandwichlab.ai/meta/fb/account`).then(
          res => {
            console.log("89 res is: ", res)
            if (res.data.oauthURL) {
              setFbUrl(res.data.oauthURL)

              // setIsModalOpen(true)
              let obj = window.open(res.data.oauthURL, '_blank')
              console.log("obj is: ", obj)
              console.log("obj is: ", obj.closed)
              var timer = setInterval(() => {
                axiosInstance.get(`https://api-dev.sandwichlab.ai/meta/fb/account`).then(
                  res => {
                    if (res.data.data) {
                      console.log("res is: ", res.data.data)
                      clearInterval(timer)
                      obj.close()
                      setIsModalOpen(false)
                    }
                  }
                ).catch()
              }, 500)


            } else {
              // console.log("92 err is: ", err)
              setRealData(res.data.data)
            }
            // setFbUrl()
            // setIsModalOpen(true)}
            // form.setFieldsValue({ "": res.data.name });
          }
        ).catch(
          err => {
            console.log("92 err is: ", err)
          }
        )

      }}>
        <span className='account__connection--title'>
          {/* Ad Account Connection */}
          {props.mode == "add" && <span>Ad Account Connection</span>}
          {props.mode == "edit" && <span>Edit</span>}
        </span>
        <div className='account__connection--wrapper'>
          <img
            src={meta}
            alt='icon'
            className='meta__icon'
          />
          <input type='text' value='Meta Ads' />

          <button>{props.mode != "edit" && <span>+</span>} {props.mode != "edit" && "Ad Account Connection"}
            {props.mode == "edit" && 'Edit'}</button>
          {props.mode == 'edit' && (
            <span className='account__connection--edit'>Sandwichlab</span>
          )}
        </div>
      </div>

      <div className='content__profile--footer'>
        <div className='content__btn--group'>

          {props.mode == "create" && submitDisabled && <Button disabled={true} id={"detail__create--disable"} width="412" height="56" onClick={handleSumbit}>
            Save and create ads now
          </Button>}
          {props.mode == "create" && !submitDisabled && <Button disabled={false} id={"detail__create--btn"} width="412" height="56" onClick={handleSumbit}>
            Save and create ads now
          </Button>}

          {props.mode == "edit" &&
            <div className="edit__btn--group">
              <Button disabled={false} width="196" height="56" id="detail__cancel--btn" onClick={() => {
                console.log("props is: ", props)
                navigate("/lexi/brands")
              }}>
                Cancel
              </Button>
              <Button disabled={false} width="196" height="56" id="detail__submit--btn" onClick={handleUpdate}>
                Update
              </Button>
            </div>

          }
        </div>
      </div>

      <Modal title="Selected Ad Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} afterClose={handleClose}>
        {realData.length > 0 && <AccountContent accountData={data} setIsOpen={setIsModalOpen} setAccount={setAddAccount} />}
        {(!realData || realData.length === 0) &&
          <div>111</div>
        }
      </Modal>
    </div>
  );
}

export default Detail;
