export const stepOtions = [
  { title: 'Ad Introduction' },
  { title: 'Ad Settings' },
  { title: 'Ad Proposal' },
];

const countryCodeMapping = {
  US: 'United States',
  GB: 'United Kingdom',
  DE: 'Germany',
  IT: 'Italy',
  CA: 'Canada',
  AU: 'Australia',
  ES: 'Spain',
  GR: 'Greece',
  NL: 'Netherlands',
  DK: 'Denmark',
  SK: 'Slovakia',
  BE: 'Belgium',
  NO: 'Norway',
  FR: 'France',
  AT: 'Austria',
  BN: 'Brunei',
  CH: 'Switzerland',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  EE: 'Estonia',
  FI: 'Finland',
  HU: 'Hungary',
  LT: 'Lithuania',
  LV: 'Latvia',
  NZ: 'New Zealand',
  PL: 'Poland',
  PT: 'Portugal',
  RU: 'Russia',
  SG: 'Singapore',
  SM: 'San Marino',
  SI: 'Slovenia',
  SE: 'Sweden',
  TH: 'Thailand',
  TR: 'Turkey',
  TW: 'Taiwan',
  UA: 'Ukraine',
  MA: 'Morocco',
  MT: 'Malta',
};

export const countryList = [
  'United States',
  'Canada',
  'Czech Republic',
  'Iceland',
  'Australia',
  'Indonesia',
  'Malaysia',
  'Singapore',
  'Thailand',
  'Vietnam',
  'Philippines',
  'China',
  'Japan',
  'South Korea',
  'Saudi Arabia',
  'United Arab Emirates (UAE)',
  'Qatar',
  'Israel',
  'Chile',
  'Brazil',
  'Argentina',
].map((countryName) => {
  const countryCode = Object.keys(countryCodeMapping).find(
    (code) => countryCodeMapping[code] === countryName
  );

  return {
    label: countryName,
    value: countryCode || countryName, // Fallback to countryName if no code is found
  };
});
