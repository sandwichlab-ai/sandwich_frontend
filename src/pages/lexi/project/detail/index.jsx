import React, { useState, useEffect, useRef } from 'react';
import { Steps, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import LexiForm from '../../../../components/lexi-form';
import AdCard, { AdCampaign, AdSets } from '../../../../components/ad-card';
import http from '../../../../utils/axiosInstance';

import './index.scss';
import { useStore } from '../../../../stores/routeStore';
import LexiModal from '../../../../components/lexi-modal';
import dayjs from 'dayjs';
import { stepOtions, countryList } from './config';

const ProjectEdit = observer(() => {
  const navigate = useNavigate();
  const { id, mode } = useParams();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = useState(0); // steps 状态控制
  const {
    projectList,
    projectList: { currentProject },
  } = useStore();
  const projectData = useRef({});
  const fetchRef = useRef(null);
  const projectGoal = useRef('');
  const [brandList, setBrandList] = useState([]);
  const [hidden, setHidden] = useState({});
  const [showModal, setShowModal] = useState(false);

  // 第一次进入编辑页面，如果没有 projectList，那么init
  useEffect(() => {
    projectList.getCurrentProject(id);
  }, []);

  // 如果跳转到step3，开始轮询; 如果跳转到step1，获取brandList
  useEffect(() => {
    if (current === 0) {
      fetchBrandList();
    } else if (current === 2 && currentProject?.getADProposal) {
      if (adsets.length !== 5 || loadingLen !== 0) {
        getADProposal();
      }
    }
  }, [current]);

  const getADProposal = async () => {
    const status = await currentProject.getADProposal(id);
    if (status === 'RUNNING') {
      setTimeout(async () => {
        await getADProposal();
      }, 10 * 1000);
    } else if (status === 'PENDING') {
      setForceUpdate((prev) => prev + 1);
    }
  };

  // 当 currentProject 更新时触发
  useEffect(() => {
    if (mode === 'edit' && id && currentProject) {
      setCurrent(2);
    }
  }, [currentProject]);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1); // 强制更新
  }, [brandList]);

  const adsets = currentProject?.proposal || [];
  const loadingLen = adsets.filter((item) => item.status === 0).length;
  // const selectedLen = adsets.filter((item) => item.selected === 0).length;
  if (adsets.length === 5 && !loadingLen) {
    clearInterval(fetchRef.current);
  }

  const fetchBrandList = async () => {
    const res = await http.get('https://api-dev.sandwichlab.ai/api/brand/all');
    setBrandList(
      (res.data || []).map((item) => ({
        value: item.id + '', // TODO 后端返回的是number
        label: item.name,
      }))
    );
  };

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
              text: 'I am a musician and I want to promote my music on Spotify and get more listeners.',
            },
            {
              text: 'We sell cleanning equipments and we seek more B2B collaborations, I want to gain more inquiry  messages on Meta.',
            },
            {
              text: 'I want to increase sales of my essential oil store.',
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
              text: `The song I want to promote fuses <span class="text-bold">Hip-Hop with the futuristic vibe of electronic beats</span>, creating a sound that's both dynamic and immersive. <span class="text-bold">It is perfect for playlists that celebrate innovation and rhythm.</span>`,
            },
            {
              text: 'We seek partnerships with organizations such as <span class="text-bold">genetic engineering, medical devices, drug research, genomics, cell therapy, oncology drugs, vaccines,, clinical trials, biomaterials, and generic drugs.</span>',
            },
            {
              text: 'Our essential oils are <span class="text-bold">100% pure and natural</span>, made from <span class="text-bold">selected plant-based ingredients with no synthetic additives.</span> Known for their <span class="text-bold">therapeutic properties,</span> they are perfect for <span class="text-bold">aromatherapy, skincare, and DIY use, with an average order value of $50.</span>',
            },
          ],
          rules: [{ required: true, message: 'Budget is required' }],
        },
        {
          type: 'select',
          label: 'Brand Introduction',
          name: ['introduction', 'brand_id'],
          rules: [{ required: true, message: 'Select at least one country' }],
          options: brandList,
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
        // 调用API，获得setiings的值，做一些操作，之后调用handleStepSubmitCommon进行到下一步
        const {
          data: { project_goal },
        } = await http.post('/api/project/goal', values.introduction);
        projectList.updateCurrentProject({
          update_at: '',
          ...values,
        });
        projectGoal.current = project_goal;
        setHidden(project_goal !== 'website');
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
          name: ['settings', 'website_url'],
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
          options: countryList,
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
        const curProjectData = { ...currentProject, ...values };
        console.log('....curProjectData.....', curProjectData);
        const { introduction, settings, project_name } = curProjectData;
        if (mode === 'add') {
          await projectList.addProject({
            ...curProjectData,
            project_goal: projectGoal.current,
          });
          const list = projectList.list.slice(0); // 显示访问list，触发mobx的依赖追踪
          // 当projectList更新的时候，那么更新 ProjectData
          projectData.current =
            list.find((item) => item.id === curProjectData.id) || {};
        } else {
          await projectList.updateProject(id, {
            project_name,
            project_goal: projectGoal.current,
            ...introduction,
            ...settings,
            start_date: +dayjs(settings.start_date).format('X'),
            end_date: +dayjs(settings.end_date).format('X'),
          });
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
                project={currentProject}
              ></AdCampaign>
            </AdCard>
          ),
        },
        {
          type: 'custom',
          children: (
            <AdCard title='Ad Sets Details'>
              <AdSets key={forceUpdate} project={currentProject}></AdSets>
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
          label: 'Launch Draft',
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
        await currentProject.lauchDraft();
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
        data={currentProject}
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
