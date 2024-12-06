import { useEffect, useState } from 'react';
import { DatePicker, Form, InputNumber, Space } from 'antd';
import Card from './card';
import AddCard from './addCard';
import LexiModal from '../../../../components/lexi-modal/index.jsx';
import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/routeStore.js';
import dayjs from 'dayjs';
import EditFormItem from '../../../../components/lexi-form/edit-form-item.jsx';

const { RangePicker } = DatePicker;

const cards = [
  {
    key: 'amount_spent',
    name: 'Amount Spent',
  },
  {
    key: 'days_left',
    name: 'Days Left',
  },
  {
    key: 'link_clicks',
    name: 'Link Clicks',
  },
  {
    key: 'impressions',
    name: 'Impressions',
  },
  {
    key: 'cpc',
    name: 'CPC',
  },
  {
    key: 'cpm',
    name: 'CPM',
  },
  {
    key: 'ctr',
    name: 'CTR',
  },
  {
    key: 'frequency',
    name: 'Frequency',
  },
];

function Effect(props) {
  const [isPublished, setIsPublished] = useState(false); // should be passed in from props
  const [showModal, setShowModal] = useState(false);
  const { id, mode } = useParams();
  const [date, setDate] = useState([
    dayjs().subtract(0, 'days'),
    dayjs().subtract(7, 'days'),
  ]);
  const { currentEffect } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    currentEffect.init(
      dayjs('2024-11-15').format('X'),
      dayjs('2024-11-25').format('X'),
      id
    );
  }, []);

  console.log('currentEffect is: ', currentEffect.toJSON?.());

  const handlePublish = () => {
    console.log('publish.......');
    setShowModal(true);
  };

  const handleOk = async () => {
    console.log('ok');
    await currentEffect.switchDisable(id);
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('cancel');
    setShowModal(false);
  };

  const handleDateChange = (dates) => {
    setDate(dates);
  };

  return (
    <div className='dashboard__container'>
      <div className='dashboard-header'>
        <span className='text-bold text-[24px]'>Ads Dashboard</span>
        <RangePicker value={date} onChange={handleDateChange} />
      </div>
      <div className='dashboard-promotion'>
        <div className='text-bold'>{currentEffect.project_name}</div>
        <div className='promotion-info'>
          <span>
            Duration:{' '}
            {dayjs(currentEffect.start_date, 'X').format('YYYY-MM-DD')} -{' '}
            {dayjs(currentEffect.end_date, 'X').format('YYYY-MM-DD')}
          </span>
          <span>Daily budget: $ {currentEffect.daily_budget}</span>
        </div>
      </div>

      <div className='dashboard-card'>
        {cards.map((item, index) => {
          return (
            <Card
              item={item}
              key={item.key}
              value={currentEffect?.[item.key]}
            />
          );
        })}
      </div>

      <div className='dashboard-publish'>
        <div className='add-publish'>
          <div className='add-publish-text'>
            <div className='text-control text-bold text-[16px]'>
              Lexi control
            </div>
            <div>Your adds has not been add it is a draft status on meta</div>
          </div>
          <div
            className={`add-publish-btn ${
              currentEffect.disable ? 'bg-[#8c68ff]' : 'bg-[#FF6F6F]'
            }`}
            onClick={handlePublish}
          >
            <div>Turn {currentEffect.disable ? 'on' : 'off'}</div>
          </div>
        </div>
        <div className='add-detail'>
          <div className='h-[120px] bg-[#fff] flex items-center px-[32px]'>
            <EditFormItem
              rootClassName='w-[100%]'
              className='flex text-[16px] text-[#333] w-[100%] justify-between items-center'
              label='Daily budget: '
              onConfirm={async (values) => {
                await currentEffect.update(id, {
                  daily_budget: values.daily,
                });
              }}
              value={
                <span className='text-[20px]'>
                  $ {currentEffect.daily_budget}
                </span>
              }
            >
              <Form.Item name='daily' className='m-0'>
                <InputNumber size='small' value={currentEffect.daily_budget} />
              </Form.Item>
            </EditFormItem>
          </div>

          <div className='h-[120px] bg-[#fff] flex items-center px-[32px]'>
            <EditFormItem
              rootClassName='w-[100%]'
              className='flex text-[16px] text-[#333] w-[100%] justify-between items-center'
              label='End date: '
              onConfirm={async (values) => {
                await currentEffect.update(id, {
                  end_date: +values.end_date.format('X'),
                });
              }}
              value={
                <span className='text-[20px]'>
                  {dayjs(currentEffect.end_date, 'X').format('YYYY-MM-DD')}
                </span>
              }
            >
              <Form.Item name='end_date' className='m-0'>
                <DatePicker
                  size='small'
                  value={dayjs(currentEffect.end_date, 'X').format(
                    'YYYY-MM-DD'
                  )}
                />
              </Form.Item>
            </EditFormItem>
          </div>
        </div>
      </div>

      <div className='effect-btn-container'>
        <button
          onClick={() => {
            console.log('dash board click triggered');
            navigate('/lexi/projects');
          }}
          className='effect-add-plan'
        >
          Check Ad Plan
        </button>
      </div>

      <LexiModal
        open={showModal}
        handleConfirm={handleOk}
        handleCancel={handleCancel}
        title={`Confirm to turn ${currentEffect.disable ? 'on' : 'off'} ads`}
        content={`Ads will ${
          currentEffect.disable ? 'on' : 'off'
        } running after being turned off`}
        showTitle={false}
      />
    </div>
  );
}

export default observer(Effect);
