import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import '../index.css';
import LexiForm from '../../../../components/lexi-form/index.jsx';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/routeStore.js';
import AccountContention from '../../../../components/account-connection/account-connection.jsx';

const Detail = observer((props) => {
  const navigate = useNavigate();
  const { id, mode } = useParams();
  const { brandList } = useStore();
  const brandData = useRef({});
  const [messageApi, contextHolder] = message.useMessage();

  const list = brandList.list.slice(0); // 显示访问list，触发mobx的依赖追踪
  if (id) {
    brandData.current = list.find((item) => item.id === +id) || {};
  }

  // 第一次进入编辑页面，如果没有 projectList，那么init
  useEffect(() => {
    if (!list.length) {
      brandList.init();
    }
  }, []);

  const formConfig = [
    {
      type: 'input',
      label: 'Brand Name',
      name: 'name',
      rules: [{ required: true, message: 'Brand Name is required' }],
    },
    {
      type: 'textarea',
      label: 'Brand Introduction',
      name: 'description',
      rows: 6,
      withExamples: true,
      examples: [
        {
          text: 'I am a <span class="text-bold">divorce lawyer1</span> based in ....',
        },
        {
          text: 'I am a <span class="text-bold">divorce lawyer2</span> based in ....',
        },
        {
          text: 'I am a <span class="text-bold">divorce lawyer3</span> based in ....',
        },
      ],
      rules: [{ required: true, message: 'Brand introduction is required' }],
    },
    {
      type: 'custom',
      children: <AccountContention />,
    },
  ];

  const buttons = [
    {
      label: 'Cancel',
      type: 'button',
    },
    {
      label: 'Save Changes',
      type: 'submit',
    },
  ];

  const onSubmit = async () => {
    messageApi.open({
      type: 'loading',
      content: 'Action in progress..',
      duration: 0,
    });
  };

  return (
    <div>
      {contextHolder}
      <LexiForm
        config={formConfig}
        buttonConfig={buttons}
        onSubmit={onSubmit}
        data={brandData.current}
      ></LexiForm>
    </div>
    // <div className='content'>
    //   <div className='addtional__information'>
    //     <div className='brand__container'>
    //       <Form.Item
    //         label='Brand Name'
    //         name='brandname'
    //         rules={[{ required: true, message: 'Please input brand name!' }]}
    //         labelCol={{ span: 24 }}
    //         wrapperCol={{ span: 24 }}
    //       >
    //         <Select
    //           defaultValue='lucy'
    //           style={{ width: 680, height: 50 }}
    //           onChange={handleChange}
    //           options={[
    //             { value: 'jack', label: 'Jack' },
    //             { value: 'lucy', label: 'Lucy' },
    //             { value: 'Yiminghe', label: 'yiminghe' },
    //             { value: 'disabled', label: 'Disabled', disabled: true },
    //           ]}
    //         />
    //       </Form.Item>
    //     </div>
    //   </div>

    //   <div className='content__bussiness'>
    //     <Row>
    //       <Col span={12}>
    //         <Form.Item
    //           label='Brand Introduction'
    //           name='bussiness'
    //           rules={[
    //             { required: true, message: 'Please describe your bussiness!' },
    //           ]}
    //           labelCol={{ span: 24 }}
    //           wrapperCol={{ span: 24 }}
    //         >
    //           <TextArea
    //             showCount={renderCount}
    //             maxLength={5000}
    //             width={'60%'}
    //             onChange={onChange}
    //             placeholder='Examples: Sandwichlab is a lead AI company in social media marketing'
    //             style={{ height: 301, resize: 'none' }}
    //           />
    //         </Form.Item>
    //       </Col>

    //       <Col span={8}>
    //         <span>Examples</span>
    //         <Examples examples={examples} />
    //       </Col>
    //     </Row>
    //   </div>

    //   <div className='content__profile--footer'>
    //     <div className='content__btn--group'>
    //       {/* <button className='content__btn'>cancel</button> */}
    //       {/* <button className='content__btn'>save</button> */}
    //       {props.mode == 'create' && (
    //         <Button disabled={submitDisabled} width='412' height='56'>
    //           Save and create ads now
    //         </Button>
    //       )}

    //       {props.mode == 'edit' && (
    //         <div className='edit__btn--group'>
    //           <Button
    //             disabled={false}
    //             width='196'
    //             height='56'
    //             id='detail__cancel--btn'
    //           >
    //             Cancel
    //           </Button>
    //           <Button
    //             disabled={false}
    //             width='196'
    //             height='56'
    //             id='detail__submit--btn'
    //           >
    //             Update
    //           </Button>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   <Modal
    //     title='Selected Ad Account'
    //     open={isModalOpen}
    //     onOk={handleOk}
    //     onCancel={handleCancel}
    //   >
    //     <AccountContent accountData={data} />
    //   </Modal>
    // </div>
  );
});

export default Detail;
