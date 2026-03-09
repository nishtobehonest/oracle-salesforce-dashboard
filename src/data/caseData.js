// Oracle vs Salesforce Competitive Strategy Case Study Data
// Sources: Oracle & Salesforce Annual Reports, IDC/Gartner CRM Reports (public data)

// ── FINANCIALS ──────────────────────────────────────────────────────────────

export const revenueData = [
  { year: '2015', oracle: 38.2, salesforce: 6.7 },
  { year: '2016', oracle: 37.0, salesforce: 8.4 },
  { year: '2017', oracle: 37.7, salesforce: 10.5 },
  { year: '2018', oracle: 39.8, salesforce: 13.3 },
  { year: '2019', oracle: 39.5, salesforce: 17.1 },
  { year: '2020', oracle: 39.1, salesforce: 21.3 },
  { year: '2021', oracle: 40.5, salesforce: 26.5 },
  { year: '2022', oracle: 42.4, salesforce: 29.0 }, // Oracle FY ends May
  { year: '2023', oracle: 49.9, salesforce: 31.4 },
  { year: '2024', oracle: 52.9, salesforce: 34.9 },
];

export const growthData = [
  { year: '2016', oracle: -3.1, salesforce: 25.4 },
  { year: '2017', oracle: 1.9, salesforce: 25.0 },
  { year: '2018', oracle: 5.6, salesforce: 26.7 },
  { year: '2019', oracle: -0.8, salesforce: 28.6 },
  { year: '2020', oracle: -1.0, salesforce: 24.6 },
  { year: '2021', oracle: 3.6, salesforce: 24.4 },
  { year: '2022', oracle: 4.7, salesforce: 9.4 },
  { year: '2023', oracle: 17.7, salesforce: 8.3 },
  { year: '2024', oracle: 6.0, salesforce: 11.2 },
];

export const marginData = [
  { year: '2015', oracle: 80.2, salesforce: 71.3 },
  { year: '2016', oracle: 79.8, salesforce: 72.5 },
  { year: '2017', oracle: 79.2, salesforce: 73.6 },
  { year: '2018', oracle: 77.6, salesforce: 73.8 },
  { year: '2019', oracle: 77.1, salesforce: 73.4 },
  { year: '2020', oracle: 76.8, salesforce: 72.8 },
  { year: '2021', oracle: 78.6, salesforce: 73.3 },
  { year: '2022', oracle: 74.2, salesforce: 73.0 },
  { year: '2023', oracle: 71.8, salesforce: 73.0 },
  { year: '2024', oracle: 71.5, salesforce: 76.9 },
];

// ── MARKET SHARE ────────────────────────────────────────────────────────────

export const crmMarketShare2024 = [
  { name: 'Salesforce', value: 21.8, color: '#00A1E0' },
  { name: 'Microsoft', value: 5.9, color: '#737373' },
  { name: 'SAP', value: 4.8, color: '#1C7C54' },
  { name: 'Oracle', value: 4.2, color: '#C74634' },
  { name: 'ServiceNow', value: 3.1, color: '#81B5A1' },
  { name: 'Others', value: 60.2, color: '#CBD5E1' },
];

export const crmMarketShareTrend = [
  { year: '2018', salesforce: 19.5, oracle: 6.1, microsoft: 3.8, sap: 5.2, others: 65.4 },
  { year: '2019', salesforce: 20.1, oracle: 5.7, microsoft: 4.2, sap: 5.0, others: 65.0 },
  { year: '2020', salesforce: 19.8, oracle: 5.4, microsoft: 4.8, sap: 4.9, others: 65.1 },
  { year: '2021', salesforce: 21.2, oracle: 4.9, microsoft: 5.3, sap: 4.8, others: 63.8 },
  { year: '2022', salesforce: 22.1, oracle: 4.6, microsoft: 5.6, sap: 4.8, others: 62.9 },
  { year: '2023', salesforce: 21.7, oracle: 4.4, microsoft: 5.8, sap: 4.7, others: 63.4 },
  { year: '2024', salesforce: 21.8, oracle: 4.2, microsoft: 5.9, sap: 4.8, others: 63.3 },
];

export const cloudErpShare = [
  { segment: 'ERP Cloud', oracle: 28, salesforce: 2, sap: 32, microsoft: 18, others: 20 },
  { segment: 'HCM Cloud', oracle: 18, salesforce: 5, sap: 22, workday: 35, others: 20 },
  { segment: 'CRM Cloud', oracle: 5, salesforce: 38, microsoft: 11, sap: 8, others: 38 },
  { segment: 'SCM Cloud', oracle: 15, salesforce: 1, sap: 29, microsoft: 12, others: 43 },
];

// ── PRODUCT STRATEGY ─────────────────────────────────────────────────────────

export const acquisitions = {
  oracle: [
    { year: 2004, name: 'PeopleSoft', value: 10.3, category: 'HCM/ERP', rationale: 'Eliminate top competitor, gain HCM' },
    { year: 2006, name: 'Siebel Systems', value: 5.8, category: 'CRM', rationale: 'Enter CRM market, block Salesforce' },
    { year: 2010, name: 'Sun Microsystems', value: 7.4, category: 'Hardware/Java', rationale: 'Vertical integration, Java ownership' },
    { year: 2012, name: 'Eloqua', value: 0.9, category: 'Marketing Cloud', rationale: 'Build marketing automation suite' },
    { year: 2014, name: 'Responsys', value: 1.5, category: 'Marketing Cloud', rationale: 'B2C marketing to compete with ExactTarget' },
    { year: 2016, name: 'NetSuite', value: 9.3, category: 'Cloud ERP', rationale: 'Cloud ERP for SMB/mid-market' },
    { year: 2019, name: 'Dyn (DataScience)', value: 0.5, category: 'Data/AI', rationale: 'AI/ML capabilities' },
    { year: 2022, name: 'Cerner', value: 28.3, category: 'Healthcare IT', rationale: 'Healthcare vertical expansion' },
  ],
  salesforce: [
    { year: 2006, name: 'Sendia', value: 0.05, category: 'Mobile', rationale: 'Early mobile capabilities' },
    { year: 2011, name: 'Radian6', value: 0.3, category: 'Social Media', rationale: 'Social listening & marketing' },
    { year: 2013, name: 'ExactTarget', value: 2.5, category: 'Marketing Cloud', rationale: 'Build Marketing Cloud suite' },
    { year: 2016, name: 'Demandware', value: 2.8, category: 'Commerce Cloud', rationale: 'Enter e-commerce market' },
    { year: 2016, name: 'Krux', value: 0.7, category: 'Data Cloud', rationale: 'Data management platform' },
    { year: 2018, name: 'MuleSoft', value: 6.5, category: 'Integration', rationale: 'API/integration platform, expand TAM' },
    { year: 2019, name: 'Tableau', value: 15.7, category: 'Analytics', rationale: 'Data viz & analytics platform' },
    { year: 2021, name: 'Slack', value: 27.7, category: 'Collaboration', rationale: 'Compete with Microsoft Teams, work OS' },
  ],
};

export const portfolioMatrix = [
  // [name, marketSize (B), competitiveStrength (1-10), company, revenue (B)]
  { name: 'CRM', marketSize: 100, strength: 9.5, company: 'salesforce', revenue: 20 },
  { name: 'Marketing Cloud', marketSize: 65, strength: 8.0, company: 'salesforce', revenue: 5.5 },
  { name: 'Commerce Cloud', marketSize: 40, strength: 6.5, company: 'salesforce', revenue: 2 },
  { name: 'Integration (MuleSoft)', marketSize: 35, strength: 8.5, company: 'salesforce', revenue: 2.3 },
  { name: 'Analytics (Tableau)', marketSize: 30, strength: 7.5, company: 'salesforce', revenue: 2 },
  { name: 'Slack', marketSize: 25, strength: 6.5, company: 'salesforce', revenue: 1.8 },
  { name: 'Cloud ERP', marketSize: 90, strength: 7.0, company: 'oracle', revenue: 8 },
  { name: 'Database', marketSize: 85, strength: 9.5, company: 'oracle', revenue: 9.5 },
  { name: 'Cloud Infrastructure', marketSize: 700, strength: 4.5, company: 'oracle', revenue: 7 },
  { name: 'HCM Cloud', marketSize: 45, strength: 6.5, company: 'oracle', revenue: 3.5 },
  { name: 'Healthcare IT', marketSize: 55, strength: 5.5, company: 'oracle', revenue: 5.5 },
  { name: 'CRM (Oracle)', marketSize: 100, strength: 4.0, company: 'oracle', revenue: 2 },
];

// ── BUSINESS MODEL ────────────────────────────────────────────────────────────

export const oracleRevenueMix = [
  { year: '2016', license: 8.7, cloud: 2.9, services: 25.4 },
  { year: '2017', license: 7.6, cloud: 4.9, services: 25.2 },
  { year: '2018', license: 6.4, cloud: 6.8, services: 26.6 },
  { year: '2019', license: 5.6, cloud: 7.9, services: 26.0 },
  { year: '2020', license: 5.1, cloud: 8.4, services: 25.6 },
  { year: '2021', license: 5.3, cloud: 9.5, services: 25.7 },
  { year: '2022', license: 5.2, cloud: 12.4, services: 24.8 },
  { year: '2023', license: 4.1, cloud: 19.8, services: 26.0 },
  { year: '2024', license: 4.0, cloud: 23.4, services: 25.5 },
];

export const salesforceRevenueMix = [
  { year: '2016', subscription: 7.4, services: 1.0 },
  { year: '2017', subscription: 9.2, services: 1.3 },
  { year: '2018', subscription: 11.6, services: 1.7 },
  { year: '2019', subscription: 14.9, services: 2.2 },
  { year: '2020', subscription: 18.6, services: 2.7 },
  { year: '2021', subscription: 23.2, services: 3.3 },
  { year: '2022', subscription: 25.8, services: 3.2 },
  { year: '2023', subscription: 28.0, services: 3.4 },
  { year: '2024', subscription: 31.0, services: 3.9 },
];

export const oracleCloudTransition = [
  { year: '2016', cloudPct: 7.8 },
  { year: '2017', cloudPct: 13.0 },
  { year: '2018', cloudPct: 17.1 },
  { year: '2019', cloudPct: 20.0 },
  { year: '2020', cloudPct: 21.5 },
  { year: '2021', cloudPct: 23.5 },
  { year: '2022', cloudPct: 29.2 },
  { year: '2023', cloudPct: 39.7 },
  { year: '2024', cloudPct: 44.2 },
];

export const businessModelComparison = {
  oracle: {
    color: '#C74634',
    model: 'Hybrid (On-Prem → Cloud)',
    deployment: 'On-premise + Cloud (OCI)',
    pricing: 'License + subscription + support',
    switchingCost: 'Extremely high (core infra)',
    rndIntensity: '~15% of revenue',
    marginProfile: '~71% gross margin',
    customerSegment: 'Enterprise, Government, Healthcare',
    salesMotion: 'Direct enterprise sales + resellers',
    keyStrength: 'Database lock-in, ERP depth, vertical scale',
    keyWeakness: 'Cloud-native gap, legacy architecture burden',
  },
  salesforce: {
    color: '#00A1E0',
    model: 'Pure SaaS / Cloud-native',
    deployment: '100% Cloud (multi-tenant)',
    pricing: 'Per-user subscription',
    switchingCost: 'High (data + workflow dependency)',
    rndIntensity: '~16% of revenue',
    marginProfile: '~77% gross margin',
    customerSegment: 'SMB to Enterprise across all industries',
    salesMotion: 'Direct + partner ecosystem (ISVs, SIs)',
    keyStrength: 'CRM dominance, platform extensibility, AppExchange',
    keyWeakness: 'ERP gap, acquisition integration complexity',
  },
};
