import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Flex, Input, Select, Form, Button, Row, Col, Carousel, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../../stores/routeStore';
import { useLocation, useParams } from 'react-router-dom';
import CardList from '../../../components/lexi-card';
import AccountContent from './AccountContent.jsx';
import Examples from "../../../components/examples/index.jsx"
import meta from '../../../assets/images/meta.png';
import Detail from './detail'
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import './index.css';

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

const Content = (props) => {

  const location = useLocation();
  const params = useParams();

  const { TextArea } = Input;
  const [mode, setMode] = useState("card")

  const [accountCnt, setAccountCnt] = useState(1);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const operationOptions = useMemo(() => [{
    key: 'rename',
    buttonName: 'Rename',
    icon: <EditOutlined />,
    modalTitle: 'Do you want to rename this Brand?',
    modalContent: `if you delete this brand, you won't be able to recover it later`,
    handleConfirm: (dataItem) => {
      brandList.removeProject(dataItem.id);
    }
  }, {
    key: 'delete',
    buttonName: 'Delete',
    icon: <DeleteOutlined />,
    modalTitle: 'Do you want to delete this brand?',
    modalContent: `if you delete this brand, you won't be able to recover it later`,
    handleConfirm: (dataItem) => {
      brandList.removeProject(dataItem.id);
    }
  }], [])
  const handleAddItem = useCallback(() => {
    console.log("add item")
    setMode("add");
  }, []);

  const { brandList } = useStore()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    console.log('code in profile: ', code);
    if (code) {
      // 如果 code 存在，则调用函数去换取 token
      console.log('code is: ', code);
      axios
        .get(`https://auth0.sandwichlab.ai/oauth2/callback?code=${code}`)
        .then((res) => {
          console.log('res is: ', res, res.data, res.data.error);
          if (res && res.data && !res.data.error) {
            localStorage.setItem('token_obj', JSON.stringify(res.data));
            if (res.headers) {
              localStorage.setItem(
                'token_obj_header',
                JSON.stringify(res.headers)
              );
            }
          } else if (res.data.error && res.data.error === 'invalid_grant') {
            console.log('expired invalid grant');
            // localStorage.removeItem("token_obj");
            // if(localStorage.getItem("token_obj_header")) {
            //     localStorage.removeItem("token_obj_header");
            // }
            // navigate("/auth");
          }
        })
        .catch((error) => {
          console.log('error is: ', error);
        });
    } else {
      console.error('Authorization code not found in URL.');
    }
    console.log("cur user: ", localStorage.getItem("token_obj"), localStorage.getItem("token_obj_header"))
    console.log("current path: ", location, params)
    console.log("brand list is: ", brandList)
    brandList.init();
    console.log("brand list is: ", brandList.list.map((el) => el.name))
    // useEffect(() => {
    //   projectList.init();
    // }, []);
  }, [])

  useEffect(() => {
    console.log("current path: ", location, location.pathname, params)
    if (location && location.pathname === '/lexi/brands/add') {
      setMode("add");
    } else if (location && location.pathname === '/lexi/brands/edit') {
      setMode("edit");
    } else {
      setMode("card")
    }
    console.log("current mode is: ", mode);
  }, [location, params])

  const list = brandList.list;

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

  const handleChange = () => { }

  // return 

  // <div className='content'>
  //   <div className='addtional__information'>
  //     <div className="brand__container">

  //   <Form.Item
  //     label="Brand Name" 
  //     name="brandname"
  //     rules={[{ required: true, message: 'Please input brand name!' }]}
  //     labelCol={{ span: 24 }} 
  //     wrapperCol={{ span: 24 }} 
  //   >
  //     <Select
  //   defaultValue="lucy"
  //   style={{ width: 680, height: 50 }}
  //   onChange={handleChange}
  //   options={[
  //     { value: 'jack', label: 'Jack' },
  //     { value: 'lucy', label: 'Lucy' },
  //     { value: 'Yiminghe', label: 'yiminghe' },
  //     { value: 'disabled', label: 'Disabled', disabled: true },
  //   ]}
  // />
  //   </Form.Item>


  //     </div>
  //   </div>

  //   <div className='content__bussiness'>


  //     <Row>
  //       <Col
  //        span={12}
  //       >
  //   <Form.Item
  //     label="Brand Introduction" 
  //     name="bussiness"
  //     rules={[{ required: true, message: 'Please describe your bussiness!' }]}
  //     labelCol={{ span: 24 }} 
  //     wrapperCol={{ span: 24 }} 
  //   >
  //       <TextArea
  //           showCount={renderCount}
  //           maxLength={5000}
  //           width={'60%'}
  //           onChange={onChange}
  //           placeholder='Examples: Sandwichlab is a lead AI company in social media marketing'
  //           style={{ height: 301, resize: 'none' }}
  //         />
  //   </Form.Item>
  //   </Col>

  //   <Col
  //        span={8}
  //       >
  //  <span>Examples</span>
  //     <Examples examples = {examples}/>

  //   </Col>
  //   </Row>



  //   </div>

  //   <div className='account__connection' onClick={() => setIsModalOpen(true)}>
  //     <span className='account__connection--title'>
  //       Ad Account Connection
  //     </span>
  //     <div className='account__connection--wrapper'>
  //       <img
  //         src={meta}
  //         alt='icon'
  //         className='meta__icon'
  //       />
  //       <input type='text' value='Meta Ads' />

  //       <button><span>+</span> {'Ad Account Connect`'}</button>
  //     </div>
  //   </div>

  //   <div className='content__profile--footer'>
  //     <div className='content__btn--group'>
  //       {/* <button className='content__btn'>cancel</button> */}
  //       {/* <button className='content__btn'>save</button> */}
  //       <Button disabled={submitDisabled} width="412" height="56">
  //          Save and create ads now
  //       </Button>
  //     </div>
  //   </div>

  //   <Modal title="Selected Ad Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  //     <AccountContent accountData={data}/>
  //   </Modal>
  // </div>

  // <Detail brandList={brandList}/>

  console.log("list is: ", list)
  if (mode == "card") {
    return <CardList list={list} handleAddItem={handleAddItem} addUrl='add' editUrl='edit' from="Brand" operationOptions={operationOptions}></CardList>
  } else if (mode == "add") {
    return <Detail brandList={brandList} mode="create" />
  } else if (mode == 'edit') {
    return <Detail brandList={brandList} editLocation={location} mode="edit" />
  }

}

export default observer(Content);
