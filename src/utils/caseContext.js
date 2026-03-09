import {
  revenueData,
  growthData,
  marginData,
  crmMarketShare2024,
  acquisitions,
  oracleRevenueMix,
  salesforceRevenueMix,
  oracleCloudTransition,
  businessModelComparison,
} from '../data/caseData.js';

const TAB_LABELS = {
  financials: 'Financials',
  'market-share': 'Market Share',
  'product-strategy': 'Product Strategy',
  'business-model': 'Business Model',
};

function serializeRevenue() {
  const rows = revenueData.map(
    (d) => `  ${d.year}: Oracle $${d.oracle}B, Salesforce $${d.salesforce}B`
  );
  return `Annual Revenue (USD Billions):\n${rows.join('\n')}`;
}

function serializeGrowth() {
  const rows = growthData.map(
    (d) => `  ${d.year}: Oracle ${d.oracle}%, Salesforce ${d.salesforce}%`
  );
  return `YoY Revenue Growth (%):\n${rows.join('\n')}`;
}

function serializeMargins() {
  const rows = marginData.map(
    (d) => `  ${d.year}: Oracle ${d.oracle}%, Salesforce ${d.salesforce}%`
  );
  return `Gross Margin (%):\n${rows.join('\n')}`;
}

function serializeMarketShare() {
  const rows = crmMarketShare2024.map((d) => `  ${d.name}: ${d.value}%`);
  return `CRM Market Share 2024:\n${rows.join('\n')}`;
}

function serializeAcquisitions() {
  const oracleRows = acquisitions.oracle.map(
    (a) => `  ${a.year} - ${a.name} ($${a.value}B, ${a.category}): ${a.rationale}`
  );
  const sfRows = acquisitions.salesforce.map(
    (a) => `  ${a.year} - ${a.name} ($${a.value}B, ${a.category}): ${a.rationale}`
  );
  return `Oracle Acquisitions:\n${oracleRows.join('\n')}\n\nSalesforce Acquisitions:\n${sfRows.join('\n')}`;
}

function serializeRevenueMix() {
  const oracleRows = oracleRevenueMix.map(
    (d) => `  ${d.year}: License $${d.license}B, Cloud $${d.cloud}B, Services $${d.services}B`
  );
  const sfRows = salesforceRevenueMix.map(
    (d) => `  ${d.year}: Subscription $${d.subscription}B, Services $${d.services}B`
  );
  const cloudRows = oracleCloudTransition.map(
    (d) => `  ${d.year}: ${d.cloudPct}% of revenue`
  );
  return (
    `Oracle Revenue Mix:\n${oracleRows.join('\n')}\n\n` +
    `Salesforce Revenue Mix:\n${sfRows.join('\n')}\n\n` +
    `Oracle Cloud % of Revenue:\n${cloudRows.join('\n')}`
  );
}

function serializeBusinessModel() {
  const o = businessModelComparison.oracle;
  const s = businessModelComparison.salesforce;
  const attrs = [
    'model', 'deployment', 'pricing', 'switchingCost',
    'rndIntensity', 'marginProfile', 'customerSegment',
    'salesMotion', 'keyStrength', 'keyWeakness',
  ];
  const rows = attrs.map(
    (k) => `  ${k}: Oracle="${o[k]}" | Salesforce="${s[k]}"`
  );
  return `Business Model Comparison:\n${rows.join('\n')}`;
}

export function buildSystemPrompt(activeTab) {
  const context = [
    serializeRevenue(),
    serializeGrowth(),
    serializeMargins(),
    serializeMarketShare(),
    serializeAcquisitions(),
    serializeRevenueMix(),
    serializeBusinessModel(),
  ].join('\n\n');

  const tabNote = activeTab
    ? `\nThe user is currently viewing the "${TAB_LABELS[activeTab] ?? activeTab}" tab of the dashboard.`
    : '';

  return `You are a concise enterprise software analyst helping with a Cornell DTI case study on Oracle vs Salesforce competitive strategy. You have access to the following data:

${context}
${tabNote}

Answer questions directly and analytically. Use specific numbers from the data when relevant. Keep responses focused and under 250 words unless a deeper breakdown is asked for. Do not use excessive bullet points — prefer short paragraphs. Do not mention that you're an AI.`;
}
