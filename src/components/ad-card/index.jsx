import React, { useState } from 'react';

import './index.scss';
import { Col, Row } from 'antd';

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
      <div className='ad-card__content__title'>
        Sandwichlab-NewSongPromotion-1119
      </div>
      <div className='ad-card__content__lists'>{children}</div>
    </div>
  );
}

export function AdCampaign({ data }) {
  return (
    <AdCardItem>
      {data.map((item) => (
        <div className='ad-campaign__content__item'>
          {item.title}: {item.value}
        </div>
      ))}
    </AdCardItem>
  );
}

export function AdSets() {
  const [curSelect, setCurSelect] = useState(0);
  const data = [
    {
      id: 1,
      status: 0,
      title: 'Trap and Pop Music Enthusiasts',
      audienceSize: [89300000, 105100000],
      dailyReach: [3100, 9000],
      dailyClicks: [144, 415],
      audienceDescription: `This group is passionate about artists who blend trap and pop music elements, especially those that combine the strong rhythms and bass of trap with the catchy, accessible melodies of pop. Their interests closely align with the user's needs, with the target audience typically active on platforms like Spotify and Instagram, enjoying discovering new music and being influenced by social media. The selected tags accurately reflect the preferences of trap and pop music enthusiasts, covering relevant genres, artists, and platforms to ensure effective reach to the target group.`,
      age: [18, 44],
      gender: 'All genders',
      locations: ['United States', 'Canada'],
      audienceTags: [
        'Future',
        'EXO',
        'Gangsta rap',
        'Atlanta hip hop',
        'TomorrowWorld',
        'Ultra Music',
        'BigCityBeats',
        'Tidal',
        'Future',
        'EXO',
        'Gangsta rap',
        'Atlanta hip hop',
        'TomorrowWorld',
        'Ultra Music',
        'BigCityBeats',
        'Tidal',
        'Future',
        'EXO',
        'Gangsta rap',
        'Atlanta hip hop',
        'TomorrowWorld',
        'Ultra Music',
        'BigCityBeats',
        'Tidal',
      ],
      headline: '“Hit Play and Go with the Flow”',
      primaryText:
        '“Chill out and let the rhythm take over! The mix of trap bass and pop melodies will get you in the zone. Hit play on Spotify, start the track, and vibe with the music!”',
    },
    {
      id: 1,
      status: 1,
      title: 'Trap and Pop Music Enthusiasts',
      audienceSize: [89300000, 105100000],
      dailyReach: [3100, 9000],
      dailyClicks: [144, 415],
      audienceDescription: `This group is passionate about artists who blend trap and pop music elements, especially those that combine the strong rhythms and bass of trap with the catchy, accessible melodies of pop. Their interests closely align with the user's needs, with the target audience typically active on platforms like Spotify and Instagram, enjoying discovering new music and being influenced by social media. The selected tags accurately reflect the preferences of trap and pop music enthusiasts, covering relevant genres, artists, and platforms to ensure effective reach to the target group.`,
      age: [18, 44],
      gender: 'All genders',
      locations: ['United States', 'Canada'],
      headline: '“Hit Play and Go with the Flow”',
      primaryText:
        '“Chill out and let the rhythm take over! The mix of trap bass and pop melodies will get you in the zone. Hit play on Spotify, start the track, and vibe with the music!”',
    },
  ];
  return (
    <div className='ad-sets'>
      <AdSetsStatus data={data} />
      <div className='ad-sets-cards'>
        <div className='ad-card__content'>
          <AdSetsItem data={data[curSelect]}></AdSetsItem>
        </div>
      </div>
    </div>
  );
}

function AdSetsStatus({ data }) {
  return <div className='ad-sets-status'>ad sets status</div>;
}

function AdSetsItem({ data }) {
  return (
    <div className='ad-sets__item'>
      <div className='ad-card__content__title'>{data.title}</div>
      <Row>
        <Col span={16}>
          <div className='ad-sets__performance-estimation'>
            <div className='ad-sets__sub-title text-bold'>
              Performance Estimation
            </div>
            <Row>
              <Col span={8}>
                <div className='ad-sets__info'>
                  <div className='ad-sets__info-label'>Audience size</div>
                  <div className='ad-sets__info-value text-bold'>
                    {data.audienceSize[0]} - {data.audienceSize[1]}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className='ad-sets__info'>
                  <div className='ad-sets__info-label'>Daily Reach</div>
                  <div className='ad-sets__info-value text-bold'>
                    {data.dailyReach[0]} - {data.dailyReach[1]}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <div>Daily Clicks</div>
                  <div className='font-bold'>
                    {data.dailyClicks[0]} - {data.dailyClicks[1]}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row gutter={29}>
        <Col span={16}>
          <div className='mb-[20px]'>
            <div className='font-bold'>Audience Description</div>
            <div className='my-[8px]'>{data.audienceDescription}</div>
          </div>
          <Row className='ad-sets__person-image'>
            <Col span={8}>
              <div className='ad-sets__info'>
                <div className='ad-sets__info__label text-bold'>Age</div>
                <div className='ad-sets__info__value'>
                  {data.age[0]} - {data.age[1]}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className='ad-sets__info'>
                <div className='ad-sets__info-label text-bold'>Gender</div>
                <div className='ad-sets__info-value'>{data.gender}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className='ad-sets__info'>
                <div className='ad-sets__info-label text-bold'>Locations</div>
                <div className='ad-sets__info-value'>
                  {data.locations.join(', ')}
                </div>
              </div>
            </Col>
          </Row>
          <div className='ad-sets__audience-tags'>
            <div className='font-bold mt-[24px] mb-[10px]'>Audience Tags</div>
            <div className='ad-sets_audience-tags__content'>
              {data.audienceTags.map((item) => (
                <div className='ad-sets_audience-tags__content__item'>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className='text-bold'>Ad Copy</div>
          <div>
            <div>Headline</div>
            <div className='bg-[#9b62FE08] p-[16px] font-bold'>
              “Hit Play and Go with the Flow”
            </div>
          </div>
          <div>
            <div>Primary text</div>
            <div className='bg-[#9b62FE08] p-[16px]'>
              “Chill out and let the rhythm take over! The mix of trap bass and
              pop melodies will get you in the zone. Hit play on Spotify, start
              the track, and vibe with the music!”
            </div>
          </div>
          <div className='text-bold'>Ad Creative</div>
        </Col>
      </Row>
    </div>
  );
}
export default AdCard;
