import React, { useState, useEffect, useRef } from 'react';
import { Steps, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import LexiForm from '../../../../components/lexi-form';
import AdCard, { AdCampaign, AdSets } from '../../../../components/ad-card';
import axios from 'axios';

import './index.scss';
import { useStore } from '../../../../stores/routeStore';
import LexiModal from '../../../../components/lexi-modal';

const stepOtions = [
  { title: 'Ad Introduction' },
  { title: 'Ad Settings' },
  { title: 'Ad Proposal' },
];

const ProjectEdit = observer(() => {
  const navigate = useNavigate();
  const { id, mode } = useParams();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = useState(0); // steps 状态控制
  const { projectList } = useStore();
  const projectData = useRef({});
  const fetchRef = useRef(null);
  const [hidden, setHidden] = useState({});
  const [showModal, setShowModal] = useState(false);

  // 当 projectData.current 更新时触发
  useEffect(() => {
    setForceUpdate((prev) => prev + 1); // 强制更新
  }, [projectData.current]);

  const list = projectList.list.slice(0); // 显示访问list，触发mobx的依赖追踪
  // 当projectList更新的时候，那么更新 ProjectData
  if (id) {
    projectData.current = list.find((item) => item.id === id) || {};
  }
  const adsets = projectData.current.proposal || [];
  const loadingLen = adsets.filter((item) => item.status === 0).length;
  const selectedLen = adsets.filter((item) => item.selected === 0).length;
  if (adsets.length === 5 && !loadingLen) {
    clearInterval(fetchRef.current);
  }

  // 第一次进入编辑页面，如果没有 projectList，那么init
  useEffect(() => {
    if (!list.length) {
      projectList.init();
    }
  }, []);

  // 如果跳转到step3，开始轮询
  useEffect(() => {
    if (current === 2 && projectData.current.getADProposal) {
      if (adsets.length !== 5 || loadingLen !== 0) {
        projectData.current.getADProposal();
        // TODO 暂时注释掉
        // fetchRef.current = setInterval(async () => {
        //   await projectData.current.getADProposal();
        //   setForceUpdate((prev) => prev + 1); // 强制更新
        // }, 10 * 1000);
      }
    }
  }, [current]);

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
          name: ['introduction', 'project_name'],
          rules: [{ required: true, message: 'Website is required' }],
        },
        {
          type: 'textarea',
          label: 'Goal of this advertisement',
          name: ['introduction', 'project_goal_description'],
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
          name: ['introduction', 'project_introduction'],
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
          name: ['introduction', 'brand_id'],
          rules: [{ required: true, message: 'Select at least one country' }],
          options: [
            { label: 'Brand 1', value: 1 },
            { label: 'Brand 2', value: 2 },
            { label: 'Brand 3', value: 3 },
            { label: 'Brand 4', value: 4 },
          ],
        },
      ],
      buttons: [
        {
          label: 'Generate Settings',
          type: 'submit',
        },
      ],
      onSubmit: async (values) => {
        messageApi.open({
          type: 'loading',
          content: 'Action in progress..',
          duration: 0,
        });
        projectData.current = {
          id: 0,
          status: 'editing',
          updateTime: '',
          ...projectData.current,
          ...values,
        };
        // 调用API，获得setiings的值，做一些操作，之后调用handleStepSubmitCommon进行到下一步
        const {
          data: { project_goal },
        } = await axios.post('/api/project/goal', {
          ...values,
          user_id: 1,
        });
        setHidden(project_goal !== 'WEBSITE_TRAFFIC');
        messageApi.destroy();
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
          name: ['settings', 'link'],
          rules: [{ required: true, message: 'Website is required' }],
          hidden,
        },
        {
          type: 'number',
          label: 'Daily budget',
          name: ['settings', 'daily_budget'],
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
              name: ['settings', 'start_date'],
              rules: [{ required: true, message: 'Start date is required' }],
            },
            {
              type: 'datePicker',
              label: 'End date',
              name: ['settings', 'end_date'],
              rules: [{ required: true, message: 'End date is required' }],
            },
          ],
        },
        {
          type: 'select',
          label: 'Countries to Advertise',
          name: ['settings', 'target_countries'],
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
          onClick: () => {
            setShowModal(true);
          },
        },
        {
          label: 'Generate Proposal',
          type: 'submit',
        },
      ],
      onSubmit: async (values) => {
        messageApi.open({
          type: 'loading',
          content: 'Action in progress..',
          duration: 0,
        });
        const curProjectData = { ...projectData.current, ...values };
        projectData.current = curProjectData;
        if (mode === 'add') {
          await projectList.addProject(curProjectData);
          const list = projectList.list.slice(0); // 显示访问list，触发mobx的依赖追踪
          // 当projectList更新的时候，那么更新 ProjectData
          projectData.current =
            list.find((item) => item.id === curProjectData.id) || {};
        } else {
          await projectList.updateProject(id, curProjectData);
        }
        messageApi.destroy();
        // 异步调用 addProject API，做一些操作，之后调用handleStepSubmitCommon进行到下一步
        handleStepSubmitCommon();
      },
    },
    {
      formConfig: [
        {
          type: 'custom',
          children: (
            <AdCard title='Ad Campaign'>
              <AdCampaign
                key={forceUpdate}
                project={projectData.current}
              ></AdCampaign>
            </AdCard>
          ),
        },
        {
          type: 'custom',
          children: (
            <AdCard title='Ad Sets Details'>
              <AdSets key={forceUpdate} project={projectData.current}></AdSets>
            </AdCard>
          ),
        },
      ],
      buttons: [
        {
          label: 'Previous',
          type: 'button',
          onClick: () => {
            setShowModal(true);
          },
        },
        {
          label: 'Lauch Draft',
          type: 'submit',
        },
      ],
      onSubmit: async (values) => {
        // TODO selectLen 需要和 Ad sets choices 数量对应，这个也需要判断下，超出或者没有选择不能提交？这个放到 lauchDraft action里判断吧，这里好像不一定是最新的。
        // TODO 选择的时候也需要判断下

        // if (loadingLen !== 0) {
        //   // 如果还有adsets在loading，不能提交
        //   message.warning(
        //     'There are some Ad Sets that are loading now, please lauch it after loading!'
        //   );
        // } else
        // if (selectedLen === 0) {
        // message.warning('Please selected at least one ad set!');
        // } else {
        messageApi.open({
          type: 'loading',
          content: 'Action in progress..',
          duration: 0,
        });
        await projectData.current.lauchDraft();
        messageApi.destroy();
        // 成功的话跳转到 effect 页面
        navigate('/lexi/projects/effect/1');
        // }
      },
    },
  ];
  const { formConfig, buttons, onSubmit } = formConfigs[current];
  // 显示访问list，触发mobx的依赖追踪
  return (
    <div className='lexi-project-item'>
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
        data={projectData.current}
      ></LexiForm>
      {contextHolder}
      <LexiModal
        open={showModal}
        handleConfirm={() => {
          prev();
          setShowModal(false);
        }}
        handleCancel={() => setShowModal(false)}
        title='Confirm to go previous'
        content='The proposal will be regenerated after you leave this page'
      ></LexiModal>
    </div>
  );
});

export default ProjectEdit;
