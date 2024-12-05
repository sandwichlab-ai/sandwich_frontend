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
import ImgCrop from 'antd-img-crop';
import EditFormItem from '../lexi-form/edit-form-item';
import Loading from '../loading/loading';
import { testUserStatus } from '../../utils/axiosInstance';

const { RangePicker } = DatePicker;

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
  const campaign = project?.campaign || {};
  const [date, setDate] = useState([
    dayjs(campaign.start_date, 'X'),
    dayjs(campaign.end_date, 'X'),
  ]);
  return (
    <AdCardItem>
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
          <Form.Item name='date' className='mr-2'>
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
          <Form.Item name='daily' className='mr-2'>
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

export const AdSets = ({ project }) => {
  const [selected, setSelected] = useState({});
  const [active, setActive] = useState(0); // 当前可见的卡片
  const { proposal = [], status } = project || {};
  const handleUpdateSetItem = (data) => {
    project.updateAdProposal(data);
  };
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
  handleUpdateSetItem,
}) {
  const [curData, setCurData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const token = useRef('');
  const [imageUrl, setImageUrl] = useState(data.ad_creative_image_9x16_url);
  const [imageVideoUrl, setImageVideoUrl] = useState(
    data.ad_creative_video_9x16_url
  );
  const actionUrl = `https://api-dev.sandwichlab.ai/api/creative/${brandID}/upload`;

  useEffect(() => {
    testUserStatus().then((newToken) => {
      token.current = newToken;
    });
  }, []);
  useEffect(() => {
    setCurData(data);
  }, [data]);

  const beforeImageUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('only support image');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isLt5M & isImage;
  };

  const beforeVideoUpload = (file) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      message.error('only support image');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isLt5M & isVideo;
  };

  const handleImageChange = (info) => {
    console.log(1111111111);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const url = info.file.response?.data?.url;
      setImageUrl(url);

      // // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });
    }
  };

  const handleVideoChange = (info) => {
    if (info.file.status === 'uploading') {
      setVideoLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const url = info.file.response?.data?.url;
      setImageVideoUrl(url);
      // // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (url) => {
      //   setVideoLoading(false);
      //   setImageVideoUrl(url);
      // });
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

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

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
                  adset_id: data.ad_set_id,
                  ad_copywriting_title: curData.ad_copywriting_title,
                  ad_copywriting_body: curData.ad_copywriting_body,
                });
              }}
              value={
                <div>
                  <div className='my-[8px]'>Headline</div>
                  <div className='bg-[#9b62FE08] p-[12px] rounded-[12px] font-bold'>
                    {curData.ad_copywriting_title}
                  </div>
                  <div className='my-[8px]'>Primary text</div>
                  <div className='bg-[#9b62FE08] p-[12px] rounded-[12px]'>
                    {curData.ad_copywriting_body}
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
              <div>
                <div className='mb-2'>9:16(Feed) Add Image</div>
                <ImgCrop rotationSlider aspect={9 / 16}>
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
                      file_type: 'images', // 例如：文件类型
                      aspect: '9x16', // 例如：比例
                      ad_set: curData.ad_set_id, // 例如：set_id
                      project_id: projectID,
                    }}
                    headers={{
                      Authorization: token.current,
                    }}
                    // onPreview={onPreview}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt='avatar'
                        style={{
                          width: '100%',
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </ImgCrop>
              </div>
              <div>
                <div className='mb-2'>9:16(Feed) Add Video</div>
                <Upload
                  name='meta_file'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  action={actionUrl}
                  beforeUpload={beforeVideoUpload}
                  onChange={handleVideoChange}
                  data={{
                    // 传递额外的参数
                    file_type: 'videos', // 例如：文件类型
                    ratio: '9x16', // 例如：比例
                    set_id: curData.ad_set_id, // 例如：set_id
                    project_id: projectID,
                  }}
                  headers={{
                    Authorization: token.current,
                  }}
                >
                  {imageVideoUrl ? (
                    <img
                      src={imageVideoUrl}
                      alt='avatar'
                      style={{
                        width: '100%',
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
