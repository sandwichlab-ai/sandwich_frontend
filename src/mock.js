import Mock from 'mockjs';
// import dayjs from 'dayjs';

Mock.mock('/api/projects', 'get', [
  {
    project_id: '84b530e0-7f35-4046-aed2-383128d1aa00', // project id
    status: 'PENDING',
    updated_at: '2024-10-14', // 更新时间，设计稿上看有这个
    introduction: {
      project_name: 'New Song Promotion',
      project_introduction: '111',
      project_goal_description: '222',
      brand_id: 1,
    },
    settings: {
      link: 'xxxxxx',
      daily_budget: 20,
      start_date: '2024-10-20',
      end_date: '2024-10-28',
      target_countries: ['US'],
    },
  },
  {
    project_id: '2', // 品牌 id
    status: 'editing',
    updated_at: '2024-10-14', // 更新时间，设计稿上看有这个
    introduction: {
      project_name: 'Rapper John',
      project_introduction: '111',
      project_goal_description: '222',
      brand_id: 2,
    },
  },
]);

Mock.mock('/api/project/goal', 'post', {
  project_goal: 'WEBSITE_TRAFFIC',
});

Mock.mock('/api/project', 'post', {
  project_id: '3',
});

Mock.mock('/api/project/project_id', 'get', {
  project_id: '123e4567-e89b-12d3-a456-426614174000',
  project_name: 'Summer Campaign 2024',
  campaign_proposal: {
    project_goal: 'BRAND_AWARENESS',
    start_date: '2024-06-01',
    end_date: '2024-08-31',
    daily_budget: 1000.5,
    max_num_of_adsets: 3,
  },
  adset_proposals: [
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 0,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 2',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 1,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 3',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 0,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 4',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 0,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 4',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 1,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
  ],
});

Mock.mock('/api/project/project_id', 'post', {
  project_id: '123e4567-e89b-12d3-a456-426614174000',
  project_name: 'Summer Campaign 2024',
  campaign_proposal: {
    project_goal: 'BRAND_AWARENESS',
    start_date: '2024-10-01',
    end_date: '2024-11-30',
    daily_budget: 1000.5,
    max_num_of_adsets: 3,
  },
  adset_proposals: [
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 0,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 2',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 1,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 3',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 0,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 4',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 0,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
    {
      adset_id: '123e4567-e89b-12d3-a456-426614174001',
      adset_title: 'Young Urban Professionals 4',
      audience_description: 'Young professionals in metropolitan areas',
      audience_explanation:
        'This audience consists of career-focused individuals in urban settings',
      age_range: {
        min: 25,
        max: 34,
      },
      gender: ['M', 'F'],
      geo_locations: ['New York', 'Los Angeles', 'Chicago'],
      audience_tags: ['professionals', 'urban', 'high-income'],
      audience_size_range: {
        min: 1000000,
        max: 2000000,
      },
      daily_reach_size_range: {
        min: 50000,
        max: 100000,
      },
      daily_clicks_range: {
        min: 1000,
        max: 2000,
      },
      status: 1,
      ad_copywriting_title: 'Transform Your Career Path',
      ad_copywriting_body: 'Discover opportunities that match your ambition',
      ad_creative_image_square_url:
        'https://example.com/images/square/career.jpg',
      ad_creative_image_9x16_url:
        'https://example.com/images/portrait/career.jpg',
    },
  ],
});

Mock.mock('/api/project/project_id/submit', 'post', { status: '200' });
