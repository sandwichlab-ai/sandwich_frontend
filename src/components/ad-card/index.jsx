import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircleOutlined,
  CheckOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ChatButton from '../func-button/chat-button';
import './index.scss';
import {
  DatePicker,
  Col,
  Row,
  Upload,
  Input,
  message,
  InputNumber,
  Form,
} from 'antd';
import dayjs from 'dayjs';
import EditFormItem from '../lexi-form/edit-form-item';
import Loading from '../loading/loading';
import { testUserStatus } from '../../utils/axiosInstance';

const { RangePicker } = DatePicker;

function AdCard({ title, children }) {
  return (
    <div className='ad-card'>
      <header className='text-bold text-[#333333]'>{title}</header>
      {children}
    </div>
  );
}

export function AdCardItem({ children, title }) {
  return (
    <div className='ad-card__content'>
      <div className='ad-card__content__title text-[#333] font-medium'>
        {title}
      </div>
      <div className='ad-card__content__lists'>{children}</div>
    </div>
  );
}

export const AdCampaign = ({ project }) => {
  const campaign = project?.campaign || {};
  const [date, setDate] = useState([
    dayjs(campaign.start_date, 'X'),
    dayjs(campaign.end_date, 'X'),
  ]);
  return (
    <AdCardItem title={project?.introduction?.project_name}>
      <div className='flex justify-between mt-[20px]'>
        <EditFormItem
          className='flex text-[#333]'
          label='Duration: '
          onConfirm={(values) => {
            project.updateAdProposal({
              start_date: values.date[0].format('X'),
              end_date: values.date[1].format('X'),
            });
          }}
          value={`${dayjs(campaign.start_date, 'X').format(
            'YYYY-MM-DD'
          )}-${dayjs(campaign.end_date, 'X').format('YYYY-MM-DD')}`}
        >
          <Form.Item name='date'>
            <RangePicker
              size='small'
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
            />
          </Form.Item>
        </EditFormItem>
        <EditFormItem
          className='flex text-[#333]'
          label='Daily budget: '
          onConfirm={(values) => {
            project.updateAdProposal({
              daily_budget: values.daily,
            });
          }}
          value={`$${campaign.daily_budget}`}
        >
          <Form.Item name='daily'>
            <InputNumber size='small' value={campaign.daily_budget} />
          </Form.Item>
        </EditFormItem>
        <div className='text-[14px] flex'>
          <span className='mr-2'>Ad sets choices: </span>
          <span className='flex'>{campaign.max_num_of_ad_sets}</span>
        </div>
      </div>
    </AdCardItem>
  );
};

export const AdSets = ({ project, handleUpdateSetItem }) => {
  const [selected, setSelected] = useState({});
  const [imageUrl, setImageUrl] = useState({});
  const [active, setActive] = useState(0); // 当前可见的卡片
  const { proposal = [], status } = project || {};
  return (
    <div className='ad-sets'>
      <AdSetsStatus
        data={proposal || []}
        active={active}
        status={status}
        selected={selected}
        setActive={setActive}
      />
      <div className='ad-sets-cards'>
        <div className='ad-card__content'>
          <AdSetsItem
            status={status}
            data={proposal?.[active] || {}}
            active={active}
            selected={selected}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            projectID={project?.project_id}
            brandID={project?.introduction?.brand_id}
            setSelected={setSelected}
            handleUpdateSetItem={handleUpdateSetItem}
          ></AdSetsItem>
        </div>
      </div>
    </div>
  );
};

function AdSetsStatus({ data, active, setActive, selected, status }) {
  const renderIcon = (item, index) => {
    if (active === index) {
      if (selected[item.ad_set_id]) {
        return (
          <CheckCircleOutlined
            style={{ color: '#8c68ff', fontSize: '16px', lineHeight: '16px' }}
          />
        );
      } else if (status === 'RUNNING') {
        return <Loading type='primary' />;
      } else {
        return <div className='icon-rounded icon-rounded--active'></div>;
      }
    } else {
      if (selected[item.ad_set_id]) {
        return (
          <CheckCircleOutlined
            style={{ color: '#00000025', fontSize: '16px' }}
          />
        );
      } else if (status === 'RUNNING') {
        return <Loading />;
      } else {
        return <div className='icon-rounded'></div>;
      }
    }
  };
  return (
    <div className='ad-sets-status flex justify-center'>
      {data.map((item, index) => (
        <div
          key={index}
          className='mx-[24px] mt-5 flex items-center cursor-pointer'
          onClick={() => {
            setActive(index);
          }}
        >
          <div className='flex items-center'>{renderIcon(item, index)}</div>
          <div className='ml-1'>Ad Set {index + 1}</div>
        </div>
      ))}
    </div>
  );
}

function AdSetsItem({
  data,
  projectID,
  brandID,
  active,
  status,
  selected,
  setSelected,
  imageUrl,
  setImageUrl,
  handleUpdateSetItem,
}) {
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState('images');
  const [ad_copywriting_title, setAd_copywriting_title] = useState('');
  const [ad_copywriting_body, setAd_copywriting_Body] = useState('');
  const token = useRef('');
  // TODO 改成类似selected那种，或者干脆放一起，不然会被替换掉
  // const [imageUrl, setImageUrl] = useState(data.creative_meta_data9x16?.url);
  const actionUrl = `https://api-dev.sandwichlab.ai/api/creative/${brandID}/upload`;
  useEffect(() => {
    testUserStatus().then((newToken) => {
      token.current = newToken;
    });
  }, []);
  useEffect(() => {
    setImageUrl({
      ...imageUrl,
      [data.ad_set_id]:
        imageUrl[data.ad_set_id] || data.creative_meta_data_9x16?.url,
    });
  }, [active]);

  const beforeImageUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (!isImage && !isVideo) {
      message.error('only support image or video');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('file must smaller than 5MB!');
      return false;
    }
    setFileType(isImage ? 'images' : 'videos');
    return true;
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const url = info.file.response?.data?.url;
      setLoading(false);
      setImageUrl({ ...imageUrl, [data.ad_set_id]: url });
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div
      className={`ad-sets__item${selected[data.ad_set_id] ? '--selected' : ''}`}
    >
      <div
        className='absolute right-0 top-0 cursor-pointer lexi-triangle'
        onClick={() => {
          if (status === 'RUNNING') {
            message.warning(
              'Current Ad Set is loading now, please select it after loading!'
            );
          } else {
            const newSelected = { ...selected };
            newSelected[data.ad_set_id] = !selected[data.ad_set_id];
            setSelected(newSelected);
            data.setSelectedProposal(!data.selected);
          }
        }}
      >
        <CheckOutlined
          style={{
            color: '#fff',
            position: 'absolute',
            top: '-20px',
            right: '-20px',
          }}
        />
      </div>
      <div className='ad-card__content__title'>
        Ad Set {active + 1 || 1}: {data.ad_set_title}
      </div>
      <Row gutter={29}>
        <Col span={16}>
          <div className='card-shadow h-[166px]'>
            <ChatButton
              className='absolute top-[40px] right-[24px]'
              handleConfirm={(value) => {
                handleUpdateSetItem({
                  ad_set_update: {
                    user_crowd_preference: value,
                    ad_set_proposal_id: data.ad_set_id,
                  },
                });
              }}
            ></ChatButton>
            <div className='font-bold'>Audience Description</div>
            <div
              className='my-[8px] overflow-scroll'
              style={{ height: 'calc(100% - 46px)' }}
            >
              {data.audience_description}
            </div>
          </div>
          <div className='flex px-[24px]'>
            <div className='w-[115px]'>
              <div className='ad-sets__info__label text-bold'>Age</div>
              <div className='ad-sets__info__value'>
                {data.age_range?.min} - {data.age_range?.max}
              </div>
            </div>
            <div className='w-[115px]'>
              <div className='ad-sets__info-label text-bold'>Gender</div>
              <div className='ad-sets__info-value'>
                {(data.genders || []).join(', ')}
              </div>
            </div>
            <div className='grow'>
              <div className='ad-sets__info-label text-bold'>Locations</div>
              <div className='ad-sets__info-value'>
                {(data.geo_locations || []).join(', ')}
              </div>
            </div>
          </div>
          <div className='px-[24px]'>
            <div className='font-bold mt-[24px] mb-[10px]'>Audience Tags</div>
            <div className='ad-sets_audience-tags__content'>
              {(data.audience_tags || []).map((item, index) => (
                <div
                  className='ad-sets_audience-tags__content__item'
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className='card-shadow h-[364px]'>
            <div className='text-bold'>Ad Copy</div>
            <ChatButton
              className='absolute top-[40px] right-[48px]'
              handleConfirm={(value) => {
                handleUpdateSetItem({
                  ad_set_update: {
                    user_copywriting_preference: value,
                    ad_set_proposal_id: data.ad_set_id,
                  },
                });
              }}
            ></ChatButton>
            <EditFormItem
              btnClassName='absolute top-[40px] right-[38px] bg-white'
              loadingClassName='h-[100%] flex items-center justify-center'
              className='h-[100%] overflow-scroll'
              rootClassName='h-[100%]'
              onConfirm={(values) => {
                handleUpdateSetItem({
                  ad_set_update: {
                    ad_copywriting_title,
                    ad_copywriting_body,
                    ad_set_proposal_id: data.ad_set_id,
                  },
                });
              }}
              value={
                <div className='text-[12px]'>
                  <div className='my-[8px]'>Headline</div>
                  <div className='bg-[#9b62FE08] p-[12px] rounded-[12px] font-bold'>
                    <div className='text-bold h-[16px] overflow-scroll'>
                      {data.ad_copywriting_title}
                    </div>
                  </div>
                  <div className='my-[8px]'>Primary text</div>
                  <div className='bg-[#9b62FE08] p-[12px] rounded-[12px]'>
                    <div className='overflow-scroll h-[176px]'>
                      {data.ad_copywriting_body}
                    </div>
                  </div>
                </div>
              }
            >
              <div className='text-[12px] w-[100%]'>
                <div className='my-[8px]'>Headline</div>
                <Input
                  value={ad_copywriting_title || data.ad_copywriting_title}
                  onChange={(e) => {
                    setAd_copywriting_title(e.target.value);
                  }}
                />
                <div className='my-[8px]'>Primary text</div>
                <Input.TextArea
                  rows={9}
                  value={ad_copywriting_body || data.ad_copywriting_body}
                  onChange={(e) => {
                    setAd_copywriting_Body(e.target.value);
                  }}
                />
              </div>
            </EditFormItem>
          </div>
          <div className='card-shadow'>
            <div className='text-bold'>Ad Creative</div>
            <div className='flex gap-3 mt-[5px]'>
              <div>
                <div className='mb-2'>9:16(Feed) Image or Video</div>
                <Upload
                  name='meta_file'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  action={actionUrl}
                  beforeUpload={beforeImageUpload}
                  onChange={handleImageChange}
                  data={{
                    // 传递额外的参数
                    file_type: fileType, // 例如：文件类型
                    aspect: '9x16', // 例如：比例
                    ad_set: data.ad_set_id, // 例如：set_id
                    project_id: projectID,
                  }}
                  headers={{
                    Authorization: token.current,
                  }}
                >
                  {imageUrl?.[data.ad_set_id] ? (
                    <img
                      src={
                        imageUrl[data.ad_set_id] ||
                        data.creative_meta_data_9x16?.url
                      }
                      alt='avatar'
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className='border-t pt-[20px] border-[#8C68FF1A]'>
        <div className='ad-sets__sub-title text-bold mb-[8px]'>
          Performance Estimation
        </div>
        {/* <Row> */}
        {/* <Col span={8}> */}
        <div className='flex'>
          <div className='mr-[16px]'>Audience size</div>
          <div className='text-bold'>
            {data.audience_size_range?.min} - {data.audience_size_range?.max}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdCard;
