import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import '../index.css';
import LexiForm from '../../../../components/lexi-form/index.jsx';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/routeStore.js';
import AccountContention from '../../../../components/account-connection/account-connection.jsx';

const Detail = observer((props) => {
  const { id, mode } = useParams();
  const {
    brandList,
    brandList: { list, currentBrand },
  } = useStore();

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const selectFbAc = useRef({});
  const setSelectedRow = (row) => {
    console.log('row is: ', row);
    selectFbAc.current = {
      ad_account_id: row.id,
      account_name: row.name,
      account_status: row.account_status,
      time_zone: row.timezone_name,
      page_id: row.page_id,
    };
  };

  // 第一次进入编辑页面，如果没有 projectList，那么init
  useEffect(() => {
    if (mode === 'edit' && id) {
      brandList.getCurrentBrand(id);
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
      rows: 10,
      withExamples: true,
      examples: [
        {
          text: 'I\'m <span class="text-bold">Claire</span>, an <span class="text-bold">indie musician</span> blending <span class="text-bold">soft rock, 70s soul, and lush R&B</span>. Starting at 13, my self-recorded songs led to the viral hit \'<span class="text-bold">Pretty Girl</span>\' and albums like Immunity and Sling. earning praise from <span class="text-bold">Rolling Stone and Pitchfork</span>, I\'ve <span class="text-bold">performed at Coachella and Newport Folk Festival</span>, sharing my sound with audiences worldwide.',
        },
        {
          text: 'We are <span class="text-bold">Airkey EnviroTech</span>. We provide <span class="text-bold">dust-free, sterile cleanroom solutions for high-tech industries worldwide</span>. With over <span class="text-bold">60 patents</span> and expertise in <span class="text-bold">medical, pharmaceutical, and semiconductor sectors</span>, we deliver high-quality products and services <span class="text-bold">trusted by Fortune 500 companies</span>. Guided by \'<span class="text-bold">Quality Changes the World</span>,\' we ensure top-tier clean environments for your needs',
        },
        {
          text: 'We are <span class="text-bold">doTERRA</span>. The brand was founded with a <span class="text-bold">mission to share the unique benefits of essential oils</span> with the world. Through the use of <span class="text-bold">certified pure therapeutic grade (CPTG) essential oils</span>, doTERRA offers products that <span class="text-bold">promote wellness, emotional health, and relaxation</span>. We are committed to helping individuals live better, healthier lives by <span class="text-bold">bringing the power of nature\'s oils into their everyday routines</span>',
        },
      ],
      rules: [{ required: true, message: 'Brand introduction is required' }],
    },
    {
      type: 'custom',
      children: (
        <AccountContention
          brand={currentBrand}
          setSelectedRow={setSelectedRow}
        />
      ),
    },
  ];

  const buttons = [
    {
      label: 'Save and create ads now',
      type: 'submit',
    },
  ];

  const onSubmit = async (values) => {
    messageApi.open({
      type: 'loading',
      content: 'Action in progress..',
      duration: 0,
    });
    if (mode === 'add') {
      await brandList.addBrand({
        ...values,
        ...selectFbAc.current,
        goal: '11',
      });
    } else {
      await brandList.updateBrand(id, {
        ...currentBrand,
        ...values,
        ...selectFbAc.current,
      });
    }
    messageApi.destroy();
    // 成功的话跳转到 project 添加页面
    navigate('/lexi/projects/add');
  };

  return (
    <div>
      {contextHolder}
      {(mode === 'add' || currentBrand) && (
        <LexiForm
          className='mt-[-32px]'
          config={formConfig}
          buttonConfig={buttons}
          onSubmit={onSubmit}
          data={currentBrand}
        ></LexiForm>
      )}
    </div>
  );
});

export default Detail;
