import React, { useState, useEffect } from 'react';
import { Flex, Input, Select, Form, Button, Row, Col, Carousel, Modal } from 'antd';
import AccountContent from '../AccountContent.jsx';
import Examples from "../../../../components/examples/index.jsx"
import meta from '../../../../assets/images/meta.png';
import { useStore } from '../../../../stores/routeStore';
import { observer } from 'mobx-react-lite';
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import { useNavigate } from 'react-router-dom';
import '../index.css';

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

function Detail(props) {
  const { TextArea } = Input;

  const [accountCnt, setAccountCnt] = useState(1);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accontText, setAccountText] = useState("Ad Account Connect")
  const [btnWidth, setBtnWidth] = useState(412)
  const [brandName, setBrandName] = useState("lucy")
  const [brandIntro, setBrandIntro] = useState("")
  const [account, setAccount] = useState({});

  const { brandList } = useStore();

  const navigate = useNavigate()

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
    // // 监听 Auth 事件
    // Hub.listen('auth', handleAuthEvents);

    // return () => {
    //   // Hub.remove('auth', handleAuthEvents);
    // };
  }, [navigate]);

  useEffect(() => {
    brandList.init()
  })

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
    setIsModalOpen(false);
  };

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
    console.log("select brand change", e);
    setBrandName(e)
  }

  const handleSumbit = () => {
    console.log("submit");
  }

  const setAddAccount = (account) => {
    console.log("account is: ", account)
    account.key = 1;
    setAccount(account);
    setIsModalOpen(false)
  }

  const handleUpdate = () => {
    console.log("126 brand name", brandName)
    const result = {
      brandName: brandName,
      brandIntro: brandIntro,
      account: account
    }
    console.log("info: ", props.editLocation)
    let current = brandList.list.filter((item) => {
      console.log("item is: ", item.name)
      if (item.name == props.editLocation.state) {
        return result
      }
    })

    /**
     *     id: types.identifierNumber, // brand ID
    name: types.string, // brand 名称
    status: types.enumeration('Status', ['isRunning', 'draft', 'editing']), // 0 表示
    updateTime: types.string, // 更新时间（ISO 日期格式）
     */

    const submitRes = {
      id: `${result.account.accountId}`,
      name: `${result.brandName}`,
      status: "draft",
      updateTime: `${Date.now()}`,
    }

    console.log("result", result, current, submitRes)
    brandList.updateBrand(result.account.key, submitRes)
    console.log("list is: ", brandList.list)
    navigate("/lexi/brands")
    // props.brandsList.update(result)
  }

  return (
    <div className='content'>
      <div className='addtional__information'>

        <div className="brand__container">

          <Form.Item
            label="Brand Name"
            name="brandname"
            rules={[{ required: true, message: 'Please input brand name!' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              defaultValue="lucy"
              style={{ width: 680, height: 50 }}
              onChange={handleChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </Form.Item>


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
              <TextArea
                showCount={renderCount}
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

      <div className='account__connection' onClick={() => setIsModalOpen(true)}>
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
          {/* <button className='content__btn'>cancel</button> */}
          {/* <button className='content__btn'>save</button> */}
          {props.mode == "create" && <Button disabled={submitDisabled} width="412" height="56" onClick={handleSumbit}>
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

      <Modal title="Selected Ad Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AccountContent accountData={data} setIsOpen={setIsModalOpen} setAccount={setAddAccount} />
      </Modal>
    </div>
  );
}

export default Detail;
