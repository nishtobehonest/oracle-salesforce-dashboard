import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { revenueData, growthData, marginData } from '../../data/caseData';
import InsightCard from '../InsightCard';

const ORACLE_COLOR = '#C74634';
const SF_COLOR = '#00A1E0';

const usdFormatter = (v) => `$${v}B`;
const pctFormatter = (v) => `${v}%`;

export default function Financials() {
  return (
    <div className="space-y-8">
      {/* Insights row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          icon="📈"
          title="Revenue Gap Narrowing"
          insight="Salesforce grew from $6.7B (2015) to $34.9B (2024), nearly 5× — while Oracle grew modestly from $38B to $53B."
          color="blue"
        />
        <InsightCard
          icon="⚡"
          title="Growth Rate Delta"
          insight="Salesforce averaged ~20% YoY growth (2015–2024) vs Oracle's ~3–4%. SaaS-native model structurally enables faster scaling."
          color="amber"
        />
        <InsightCard
          icon="💰"
          title="Margin Flip"
          insight="Salesforce gross margins surpassed Oracle by 2024 (77% vs 71%), reversing earlier assumptions about SaaS margin disadvantage."
          color="green"
        />
      </div>

      {/* Revenue comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Annual Revenue (USD Billions)</h2>
        <p className="text-xs text-slate-500 mb-5">Oracle FY ends May; Salesforce FY ends Jan. All figures approximate.</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={revenueData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={usdFormatter} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v, n) => [`$${v}B`, n === 'oracle' ? 'Oracle' : 'Salesforce']} />
            <Legend formatter={(v) => v === 'oracle' ? 'Oracle' : 'Salesforce'} />
            <Bar dataKey="oracle" name="oracle" fill={ORACLE_COLOR} radius={[3, 3, 0, 0]} />
            <Bar dataKey="salesforce" name="salesforce" fill={SF_COLOR} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth rate */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">YoY Revenue Growth (%)</h2>
          <p className="text-xs text-slate-500 mb-5">Salesforce consistently outpaced Oracle on growth velocity.</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growthData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={pctFormatter} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v, n) => [`${v}%`, n === 'oracle' ? 'Oracle' : 'Salesforce']} />
              <Legend formatter={(v) => v === 'oracle' ? 'Oracle' : 'Salesforce'} />
              <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="oracle" name="oracle" stroke={ORACLE_COLOR} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="salesforce" name="salesforce" stroke={SF_COLOR} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gross margin */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Gross Margin (%)</h2>
          <p className="text-xs text-slate-500 mb-5">Salesforce margins converged and surpassed Oracle by 2024 as scale improved.</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={marginData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="oracleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ORACLE_COLOR} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={ORACLE_COLOR} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="sfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SF_COLOR} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={SF_COLOR} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis domain={[65, 85]} tickFormatter={pctFormatter} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v, n) => [`${v}%`, n === 'oracle' ? 'Oracle' : 'Salesforce']} />
              <Legend formatter={(v) => v === 'oracle' ? 'Oracle' : 'Salesforce'} />
              <Area type="monotone" dataKey="oracle" name="oracle" stroke={ORACLE_COLOR} fill="url(#oracleGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="salesforce" name="salesforce" stroke={SF_COLOR} fill="url(#sfGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
