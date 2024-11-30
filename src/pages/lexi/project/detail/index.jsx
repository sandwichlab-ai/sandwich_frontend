import React, { useState, useEffect } from 'react';
import { Steps, message, Row, Col, Form } from 'antd';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import LexiForm from '../../../../components/lexi-form';
import DashBoard from '../effect';
import LexiButton from '../../../../components/lexi-button';
import AdCard, { AdCampaign, AdSets } from '../../../../components/ad-card';

import './index.scss';
import { useStore } from '../../../../stores/routeStore';

const stepOtions = [
  { title: 'Ad Introduction' },
  { title: 'Ad Settings' },
  { title: 'Ad Proposal' },
];

const AdCampaignData = [
  {
    title: 'Goal on Meta',
    value: 'Traffic to website',
  },
  {
    title: 'Duration',
    value: '2024-11-15 - 2024-11-25',
  },
  {
    title: 'Daily budget',
    value: '$20',
  },
  {
    title: 'Ad sets choices',
    value: '1',
  },
];

const ProjectEdit = observer(() => {
  const { id, mode } = useParams();
  console.log('...ddd.....', id, mode);
  const [current, setCurrent] = useState(0); // steps 状态控制
  const [isDashboard, setIsDashboard] = useState(0);
  const { projectList } = useStore();
  const [projectData, setProjectData] = useState(
    (projectList.list || []).find((item) => item.id === +id) || {}
  );

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleStepSubmitCommon = (values) => {
    next();
  };

  const formConfigs = [
    {
      formConfig: [
        {
          type: 'input',
          label: 'Project name',
          name: 'name',
          rules: [{ required: true, message: 'Website is required' }],
        },
        {
          type: 'textarea',
          label: 'Goal of this advertisement',
          name: 'project_goal_description',
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
          rules: [{ required: true, message: 'Budget is required' }],
        },
        {
          type: 'textarea',
          label: 'Highlight your unique aspects and selling points',
          name: 'project_introduction',
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
          rules: [{ required: true, message: 'Budget is required' }],
        },
        {
          type: 'select',
          label: 'Brand Introduction',
          name: 'brand_id',
          rules: [{ required: true, message: 'Select at least one country' }],
          options: [
            { label: 'Brand 1', value: 1 },
            { label: 'Brand 2', value: 2 },
            { label: 'Brand 3', value: 3 },
            { label: 'Brand 4', value: 4 },
          ],
        },
        {

        }
      ],
      buttons: [
        {
          label: 'Generate Settings',
          type: 'submit',
        },
      ],
      onSubmit: (values) => {
        setProjectData((prev) => ({
          ...prev,
          id: 0,
          status: 'editing',
          updateTime: '',
          name: values.project_name,
          introduction: values,
        }));
        // 调用API，获得setiings的值，做一些操作，之后调用handleStepSubmitCommon进行到下一步
        handleStepSubmitCommon();
      },
    },
    {
      formConfig: [
        {
          type: 'input',
          label: 'The link to your website',
          extra:
            'Increasing traffic to your website is a better way to achieve your goal.',
          name: 'link',
          rules: [{ required: true, message: 'Website is required' }],
        },
        {
          type: 'number',
          label: 'Daily budget',
          name: 'daily_budget',
          addonBefore: '$',
          min: 1,
          defaultValue: 1,
          rules: [{ required: true, message: 'Budget is required' }],
        },
        {
          type: 'group',
          children: [
            {
              type: 'datePicker',
              label: 'Start date',
              name: 'start_date',
              rules: [{ required: true, message: 'Start date is required' }],
            },
            {
              type: 'datePicker',
              label: 'End date',
              name: 'end_date',
              rules: [{ required: false }],
            },
          ],
        },
        {
          type: 'select',
          label: 'Countries to Advertise',
          name: 'target_countries',
          rules: [{ required: true, message: 'Select at least one country' }],
          options: [
            { label: 'Country 1', value: 'Country 1' },
            { label: 'Country 2', value: 'Country 2' },
            { label: 'Country 3', value: 'Country 3' },
            { label: 'Country 4', value: 'Country 4' },
          ],
          mode: 'multiple',
          placeholder: 'Select countries',
        },
      ],
      buttons: [
        {
          label: 'Previous',
          type: 'button',
          onClick: prev,
        },
        {
          label: 'Generate Proposal',
          type: 'submit',
        },
      ],
      onSubmit: (values) => {
        //setIsDashboard(1);
        // ----- 调试完注释回来
        values.start_date = values.start_date.format('YYYY-MM-DD');
        values.end_date = values.end_date?.format('YYYY-MM-DD');
        const curProjectData = { ...projectData, settings: values };
        projectList.addProject(curProjectData);
        // 异步调用 addProject API，做一些操作，之后调用handleStepSubmitCommon进行到下一步
        setProjectData(curProjectData);
        handleStepSubmitCommon();
      },
    },
    {
      formConfig: [
        {
          type: 'custom',
          children: (
            <AdCard title='Ad Campaign'>
              <AdCampaign data={AdCampaignData}></AdCampaign>
            </AdCard>
          ),
        },
        {
          type: 'custom',
          children: (
            <AdCard title='Ad Sets Details'>
              <AdSets></AdSets>
            </AdCard>
          ),
        },
      ],
      buttons: [
        {
          label: 'Previous',
          type: 'button',
          onClick: prev,
        },
        {
          label: 'Lauch Draft',
          type: 'submit',
        },
      ],
      onSubmit: (values) => {
        handleStepSubmitCommon(values);
        setProjectData((prev) => Object.assign(prev, { proposal: values }));
      },
    },
  ];
  const { formConfig, buttons, onSubmit } = formConfigs[current];

  return (
    <div className='lexi-project-item'>

      <div>
        <Steps
          className='lexi-project-item__steps'
          size='small'
          current={current}
          items={stepOtions}
        />

        <LexiForm
          config={formConfig}
          buttonConfig={buttons}
          onSubmit={onSubmit}
          data={projectData}
        ></LexiForm>
      </div>


      {/* {
        // isDashboard && <div onClick={() => setIsDashboard(false)}>dashboard</div>
        isDashboard && <DashBoard isDashboard={isDashboard} setIsDashboard={(input) => {
          console.log("call back input", input)
          setIsDashboard(input)
        }} />
      } */}

    </div>
  );
});

export default ProjectEdit;
