import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircleOutlined,
  CheckOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ChatButton from '../func-button/chat-button';
// import { ReactComponent as Loading } from '../../assets/images/loading.svg';
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
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/routeStore';
import { useParams } from 'react-router-dom';
import EditFormItem from '../lexi-form/edit-form-item';
import Loading from '../loading/loading';

const { RangePicker } = DatePicker;
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};


function AdCard({ title, children }) {
  return (
    <div className='ad-card'>
      <header className='text-bold'>{title}</header>
      {children}
    </div>
  );
}

export function AdCardItem({ children }) {
  return (
    <div className='ad-card__content'>
      <div className='ad-card__content__title text-[#333] font-medium'>
        Sandwichlab-NewSongPromotion-1119
      </div>
      <div className='ad-card__content__lists'>{children}</div>
    </div>
  );
}

export const AdCampaign = ({ project }) => {
  const projectData = useRef({});

  const campaign = project?.campaign || {};
  return (
    <AdCardItem>
      <div className='flex justify-between mt-[20px]'>
        <EditFormItem
          className='flex text-[#333]'
          label='Duration: '
          onConfirm={(values) => {
            projectData.current.updateAdProposal({
              start_date: dayjs(values[0]).format('YYYY-MM-DD'),
              end_date: dayjs(values[1]).format('YYYY-MM-DD'),
            });
          }}
          value={`${campaign.start_date}-${campaign.end_date}`}
        >
          <Form.Item name='date' className='mr-2'>
            <RangePicker
              size='small'
              value={[dayjs(campaign.start_date), dayjs(campaign.end_date)]}
            />
          </Form.Item>
        </EditFormItem>
        <EditFormItem
          className='flex text-[#333]'
          label='Daily budget: '
          onConfirm={(values) => {
            projectData.current.updateAdProposal({
              daily_budget: values.daily,
            });
          }}
          value={`$${campaign.daily_budget}`}
        >
          <Form.Item name='daily' className='mr-2'>
            <InputNumber size='small' value={campaign.daily_budget} />
          </Form.Item>
        </EditFormItem>
        <div className='text-[14px] flex'>
          <span className='mr-2'>Ad sets choices: </span>
          <span className='flex'>{campaign.max_num_of_adsets}</span>
        </div>
      </div>
    </AdCardItem>
  );
};

export const AdSets = ({ project }) => {
  const [selected, setSelected] = useState({});
  const [active, setActive] = useState(0); // 当前可见的卡片
  const { proposal = [] } = project || {};
  const brandId = project?.introduction?.brand_id;
  const handleUpdateSetItem = (data) => {
    project.updateAdProposal(data);
  };
  return (
    <div className='ad-sets'>
      <AdSetsStatus
        data={proposal || []}
        active={active}
        setActive={setActive}
      />
      <div className='ad-sets-cards'>
        <div className='ad-card__content'>
          <AdSetsItem
            data={proposal?.[active] || {}}
            active={active}
            selected={selected}
            setSelected={setSelected}
            handleUpdateSetItem={handleUpdateSetItem}
            brandId={brandId}
          ></AdSetsItem>
        </div>
      </div>
    </div>
  );
};

function AdSetsStatus({ data, active, setActive }) {
  const renderIcon = (item, index) => {
    if (active === index) {
      if (item.selected) {
        return (
          <CheckCircleOutlined
            style={{ color: '#8c68ff', fontSize: '16px', lineHeight: '16px' }}
          />
        );
      } else if (item.status === 0) {
        return <Loading type='primary' />;
      } else {
        return <div className='icon-rounded icon-rounded--active'></div>;
      }
    } else {
      if (item.selected) {
        return (
          <CheckCircleOutlined
            style={{ color: '#00000025', fontSize: '16px' }}
          />
        );
      } else if (item.status === 0) {
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

function AdSetsItem({ data, active, handleUpdateSetItem, brandId }) {
  const [curData, setCurData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [imageUrl1x1, setImageUrl1x1] = useState();
  const [imageUrl9x16, setImageUrl9x16] = useState();
  const [actionUrl, setActionUrl] = useState();
  const [fileType, setFileType] = useState(null);  // 用来存储动态获取的文件类型
  // TODO:域名替换？
  setActionUrl(`http://localhost:8080/api/${brandId}/upload`)

  useEffect(() => {
    setCurData(data);
  }, [data]);
  
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    const fileType = file.type.split('/')[0];
    setFileType(fileType); // 更新状态
    if (!isImage && !isVideo) {
      message.error('只能上传图片或视频!');
      return false;  // 阻止文件上传
    }
    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      message.error('Image must smaller than 50MB!');
    }

    return true;  // 允许文件上传
  };

  const handleChange = (info,setImage) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // TODO: 替换文件url
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImage(url);
      });
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
    <div className={`ad-sets__item${data.selected ? '--selected' : ''}`}>
      <div
        className='absolute right-0 top-0 cursor-pointer lexi-triangle'
        onClick={() => {
          if (data.status === 0) {
            message.warning(
              'Current Ad Set is loading now, please select it after loading!'
            );
          } else {
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
        Ad Set {active + 1 || 1}: {data.adset_title}
      </div>
      <Row gutter={29}>
        <Col span={16}>
          <div className='card-shadow'>
            <ChatButton
              className='absolute top-[40px] right-[24px]'
              handleConfirm={(value) => {
                handleUpdateSetItem({
                  user_crowd_preference: value,
                });
              }}
            ></ChatButton>
            <div className='font-bold'>Audience Description</div>
            <div className='my-[8px]'>{curData.audience_description}</div>
          </div>
          <div className='flex px-[24px]'>
            <div className='w-[115px]'>
              <div className='ad-sets__info__label text-bold'>Age</div>
              <div className='ad-sets__info__value'>
                {curData.age_range?.min} - {curData.age_range?.max}
              </div>
            </div>
            <div className='w-[115px]'>
              <div className='ad-sets__info-label text-bold'>Gender</div>
              <div className='ad-sets__info-value'>
                {(curData.gender || []).join(', ')}
              </div>
            </div>
            <div className='grow'>
              <div className='ad-sets__info-label text-bold'>Locations</div>
              <div className='ad-sets__info-value'>
                {(curData.geo_locations || []).join(', ')}
              </div>
            </div>
          </div>
          <div className='px-[24px]'>
            <div className='font-bold mt-[24px] mb-[10px]'>Audience Tags</div>
            <div className='ad-sets_audience-tags__content'>
              {(curData.audience_tags || []).map((item) => (
                <div className='ad-sets_audience-tags__content__item'>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className='card-shadow'>
            <div className='text-bold'>Ad Copy</div>
            <ChatButton
              className='absolute top-[40px] right-[48px]'
              handleConfirm={(value) => {
                handleUpdateSetItem({
                  user_copywriting_preference: value,
                });
              }}
            ></ChatButton>
            <EditFormItem
              btnClassName='absolute top-[40px] right-[38px]'
              onConfirm={(values) => {
                handleUpdateSetItem({
                  adset_id: data.adset_id,
                  ad_copywriting_title: data.ad_copywriting_title,
                  ad_copywriting_body: data.ad_copywriting_body,
                });
              }}
              value={
                <div>
                  <div className='my-[8px]'>Headline</div>
                  <div className='bg-[#9b62FE08] p-[12px] rounded-[12px] font-bold'>
                    {data.ad_copywriting_title}
                  </div>
                  <div className='my-[8px]'>Primary text</div>
                  <div className='bg-[#9b62FE08] p-[12px] rounded-[12px]'>
                    {data.ad_copywriting_body}
                  </div>
                </div>
              }
            >
              <div>
                <div className='my-[8px]'>Headline</div>
                <Input
                  value={curData.ad_copywriting_title}
                  onChange={(e) => {
                    setCurData({
                      ...curData,
                      ad_copywriting_title: e.target.value,
                    });
                  }}
                />
                <div className='my-[8px]'>Primary text</div>
                <Input.TextArea
                  rows={4}
                  value={curData.ad_copywriting_body}
                  onChange={(e) => {
                    setCurData({
                      ...curData,
                      ad_copywriting_body: e.target.value,
                    });
                  }}
                />
              </div>
            </EditFormItem>
          </div>
          <div className='card-shadow'>
            <div className='text-bold'>Ad Creative</div>
            <div className='flex gap-3 mt-[5px]'>
              {/* TODO kongming start */}
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action={actionUrl}
                beforeUpload={beforeUpload}
                onChange={(info) => handleChange(info, setImageUrl1x1)}
                data={{
                  // 传递额外的参数
                  file_type: fileType,  // 例如：文件类型
                  ratio: '1x1',        // 例如：比例
                  set_id: curData.adset_id,     // 例如：set_id
                }}
              >
                {imageUrl1x1 ? (
                  <img
                    src={imageUrl1x1}
                    alt='avatar'
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action={actionUrl}
                beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info,setImageUrl9x16)}
                data={{
                  // 传递额外的参数
                  file_type: fileType,  // 例如：文件类型
                  ratio: '9x16',        // 例如：比例
                  set_id: curData.adset_id,     // 例如：set_id
                }}
              >
                {imageUrl9x16 ? (
                  <img
                    src={imageUrl9x16}
                    alt='avatar'
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              {/* TODO kongming end */}
            </div>
          </div>
        </Col>
      </Row>
      <div className='border-t pt-[20px] border-[#8C68FF1A]'>
        <div className='ad-sets__sub-title text-bold mb-[8px]'>
          Performance Estimation
        </div>
        <Row>
          <Col span={8}>
            <div className='flex'>
              <div className='mr-[16px]'>Audience size</div>
              <div className='text-bold'>
                {curData.audience_size_range?.min} -{' '}
                {curData.audience_size_range?.max}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className='flex'>
              <div className='mr-[16px]'>Daily Reach</div>
              <div className='text-bold'>
                {curData.daily_reach_size_range?.min} -{' '}
                {curData.daily_reach_size_range?.max}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className='flex'>
              <div className='mr-[16px]'>Daily Clicks</div>
              <div className='text-bold'>
                {curData.daily_clicks_range?.min} -{' '}
                {curData.daily_clicks_range?.max}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default AdCard;
