import React, { useState, useEffect } from 'react';
import { Flex, Input, Select, Form, Button, Row, Col, Carousel, Modal } from 'antd';
import AccountContent from '../accountContent.jsx';
import Examples from "../../../../components/examples/index.jsx"
import meta from '../../../../assets/images/meta.png';
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
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accontText, setAccountText] = useState("Ad Account Connect")
  const [btnWidth, setBtnWidth] = useState(412)
  
  useEffect(() => {
    console.log("mode change", props.mode)
     if(props.mode == 'add') {
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
    console.log('changed', e.target.value);
  };

  const onExampleChange = (e) => {
    console.log("example change", e.target);
  }

  const renderCount = ({ count, maxLength }) => (
    <div style={{ position: 'absolute', bottom: '-2000px', left: '0', color: 'blue' }}>
      {count} / {maxLength}
    </div>
  );

  const handleChange = () => {}

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
        <Examples examples = {examples}/>

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

          <button>{props.mode!="edit" && <span>+</span>} {props.mode != "edit" && "Ad Account Connection"}
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
          {props.mode == "create" && <Button disabled={submitDisabled} width="412" height="56">
             Save and create ads now
          </Button>}

          {props.mode == "edit" && 
          <div className="edit__btn--group">
            <Button disabled={false} width="196" height="56" id="detail__cancel--btn">
             Cancel
          </Button>
          <Button disabled={false}  width="196" height="56" id="detail__submit--btn">
             Update
          </Button>
        </div>
          
          }
        </div>
      </div>

      <Modal title="Selected Ad Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AccountContent accountData={data}/>
      </Modal>
    </div>
  );
}

export default Detail;
