import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Flex, Input, Select, Form, Button, Row, Col, Carousel, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../../stores/routeStore';
import CardList from '../../../components/lexi-card';
import AccountContent from './accountContent.jsx';
import Examples from "../../../components/examples/index.jsx"
import meta from '../../../assets/images/meta.png';
import Detail from './detail'
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

function Content(props) {
  const { TextArea } = Input;

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
  },{
    key: 'delete',
    buttonName: 'Delete',
    icon: <DeleteOutlined />,
    modalTitle: 'Do you want to delete this brand?',
    modalContent: `if you delete this brand, you won't be able to recover it later`,
    handleConfirm: (dataItem) => {
      brandList.removeProject(dataItem.id);
    }
  }], [])
  const handleAddItem = useCallback(() => {}, []);

  const { brandList } = useStore()

  useEffect(() => {
    console.log("brand list is: ", brandList)
    brandList.init();
    console.log("brand list is: ", brandList.list.map((el) => el.name))
    // useEffect(() => {
    //   projectList.init();
    // }, []);
  }, [])

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

  const handleChange = () => {}

  return (
    
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


    <CardList list={list} handleAddItem={handleAddItem} addUrl='add' editUrl='edit' operationOptions={operationOptions}></CardList>
    
  );
}

export default Content;
