import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ZAxis, Cell,
} from 'recharts';
import { acquisitions, portfolioMatrix } from '../../data/caseData';
import InsightCard from '../InsightCard';

const ORACLE_COLOR = '#C74634';
const SF_COLOR = '#00A1E0';

const categoryColors = {
  'HCM/ERP': '#F97316',
  'CRM': '#EF4444',
  'Hardware/Java': '#64748B',
  'Marketing Cloud': '#A855F7',
  'Cloud ERP': '#F59E0B',
  'Data/AI': '#10B981',
  'Healthcare IT': '#0EA5E9',
  'Mobile': '#6366F1',
  'Social Media': '#EC4899',
  'Integration': '#14B8A6',
  'Analytics': '#8B5CF6',
  'Collaboration': '#F59E0B',
  'Commerce Cloud': '#84CC16',
  'Data Cloud': '#06B6D4',
};

export default function ProductStrategy() {
  const oracleData = portfolioMatrix.filter((d) => d.company === 'oracle');
  const sfData = portfolioMatrix.filter((d) => d.company === 'salesforce');

  const CustomTooltipScatter = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
          <p className="font-semibold text-slate-800 mb-1">{d.name}</p>
          <p className="text-slate-500">Market size: <span className="font-medium text-slate-700">${d.marketSize}B</span></p>
          <p className="text-slate-500">Competitive strength: <span className="font-medium text-slate-700">{d.strength}/10</span></p>
          <p className="text-slate-500">Est. revenue: <span className="font-medium text-slate-700">${d.revenue}B</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          icon="🎯"
          title="Acquisition Philosophy"
          insight="Oracle acquires to eliminate competitors (PeopleSoft, Siebel) and fill gaps. Salesforce acquires to build a platform ecosystem and expand TAM."
          color="slate"
        />
        <InsightCard
          icon="🏗️"
          title="Platform vs. Portfolio"
          insight="Salesforce's acquisitions (MuleSoft, Tableau, Slack) create compounding value via integration. Oracle's are often siloed, with limited cross-sell."
          color="blue"
        />
        <InsightCard
          icon="💸"
          title="Cerner: Oracle's Big Bet"
          insight="Oracle's $28B Cerner acquisition (2022) signals a healthcare vertical push — a $500B+ market where neither company has traditionally dominated."
          color="red"
        />
      </div>

      {/* Acquisition Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Acquisition Timeline</h2>
        <p className="text-xs text-slate-500 mb-6">Bubble size = deal value in USD billions. Hover for details.</p>

        <div className="space-y-6">
          {/* Oracle */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-slate-700">Oracle</span>
            </div>
            <div className="relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-red-100" />
              <div className="flex gap-4 overflow-x-auto pb-2 relative">
                {acquisitions.oracle.map((acq, i) => (
                  <div key={i} className="flex-shrink-0 w-36 group">
                    <div className="text-xs font-bold text-red-600 mb-1">{acq.year}</div>
                    <div
                      className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-xs cursor-default transition-shadow group-hover:shadow-md"
                      title={acq.rationale}
                    >
                      <div className="font-semibold text-slate-800 truncate">{acq.name}</div>
                      <div className="text-slate-500 mt-0.5">${acq.value}B</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700 font-medium">
                        {acq.category}
                      </span>
                      <div className="mt-1.5 text-slate-400 text-xs leading-tight hidden group-hover:block">
                        {acq.rationale}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Salesforce */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm font-semibold text-slate-700">Salesforce</span>
            </div>
            <div className="relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-blue-100" />
              <div className="flex gap-4 overflow-x-auto pb-2 relative">
                {acquisitions.salesforce.map((acq, i) => (
                  <div key={i} className="flex-shrink-0 w-36 group">
                    <div className="text-xs font-bold text-blue-600 mb-1">{acq.year}</div>
                    <div
                      className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-xs cursor-default transition-shadow group-hover:shadow-md"
                      title={acq.rationale}
                    >
                      <div className="font-semibold text-slate-800 truncate">{acq.name}</div>
                      <div className="text-slate-500 mt-0.5">${acq.value}B</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-700 font-medium">
                        {acq.category}
                      </span>
                      <div className="mt-1.5 text-slate-400 text-xs leading-tight hidden group-hover:block">
                        {acq.rationale}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Product Portfolio Matrix</h2>
        <p className="text-xs text-slate-500 mb-1">
          X = Market size ($B) · Y = Competitive strength (1–10) · Bubble size = estimated revenue
        </p>
        <p className="text-xs text-slate-500 mb-5">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />Oracle
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 ml-3 mr-1" />Salesforce
        </p>
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number" dataKey="marketSize" name="Market Size"
              tickFormatter={(v) => `$${v}B`} tick={{ fontSize: 11 }}
              label={{ value: 'Market Size ($B)', position: 'insideBottom', offset: -4, fontSize: 11, fill: '#94a3b8' }}
            />
            <YAxis
              type="number" dataKey="strength" name="Competitive Strength"
              domain={[0, 10]} tick={{ fontSize: 11 }}
              label={{ value: 'Competitive Strength', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: '#94a3b8' }}
            />
            <ZAxis type="number" dataKey="revenue" range={[400, 3000]} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
                  <p className="font-semibold mb-1">{d.name}</p>
                  <p className="text-slate-500">Market: <b>${d.marketSize}B</b> · Strength: <b>{d.strength}/10</b></p>
                  <p className="text-slate-500">Revenue: <b>~${d.revenue}B</b></p>
                </div>
              );
            }} />
            <Scatter data={oracleData} fill={ORACLE_COLOR} fillOpacity={0.75} name="Oracle" />
            <Scatter data={sfData} fill={SF_COLOR} fillOpacity={0.75} name="Salesforce" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
