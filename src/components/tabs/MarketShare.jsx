import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { crmMarketShare2024, crmMarketShareTrend, cloudErpShare } from '../../data/caseData';
import InsightCard from '../InsightCard';

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export default function MarketShare() {
  return (
    <div className="space-y-8">
      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          icon="👑"
          title="CRM Dominance"
          insight="Salesforce holds ~22% of the global CRM market — 5× Oracle's ~4.2%. Despite Oracle's Siebel acquisition (2006), it never achieved CRM leadership."
          color="blue"
        />
        <InsightCard
          icon="🗄️"
          title="Oracle's Strongholds"
          insight="Oracle dominates database (~40% market share) and remains strong in cloud ERP. These categories weren't Salesforce's targets — different battlefields."
          color="red"
        />
        <InsightCard
          icon="⚔️"
          title="The Real Threat"
          insight="Microsoft (Dynamics + Azure) is emerging as the 2nd-biggest CRM challenger to Salesforce, not Oracle — underlining Oracle's failed CRM pivot."
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CRM Pie */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Global CRM Market Share (2024)</h2>
          <p className="text-xs text-slate-500 mb-5">Source: IDC / Gartner estimates. Total CRM market ~$97B.</p>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={crmMarketShare2024}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {crmMarketShare2024.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}%`, n]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CRM Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">CRM Market Share Trend (2018–2024)</h2>
          <p className="text-xs text-slate-500 mb-5">Oracle's CRM share declined as Microsoft grew. Salesforce held steady ~21–22%.</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={crmMarketShareTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v, n) => [`${v}%`, n.charAt(0).toUpperCase() + n.slice(1)]} />
              <Legend formatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)} />
              <Bar dataKey="salesforce" name="salesforce" fill="#00A1E0" stackId="a" />
              <Bar dataKey="microsoft" name="microsoft" fill="#737373" stackId="a" />
              <Bar dataKey="sap" name="sap" fill="#1C7C54" stackId="a" />
              <Bar dataKey="oracle" name="oracle" fill="#C74634" stackId="a" />
              <Bar dataKey="others" name="others" fill="#CBD5E1" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cloud segment share */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Cloud Segment Market Share by Category</h2>
        <p className="text-xs text-slate-500 mb-5">
          Oracle leads ERP/SCM cloud; Salesforce dominates CRM. Neither company leads in the other's core segment.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={cloudErpShare} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="segment" tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v, n) => [`${v}%`, n.charAt(0).toUpperCase() + n.slice(1)]} />
            <Legend formatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)} />
            <Bar dataKey="oracle" name="oracle" fill="#C74634" />
            <Bar dataKey="salesforce" name="salesforce" fill="#00A1E0" />
            <Bar dataKey="sap" name="sap" fill="#1C7C54" />
            <Bar dataKey="microsoft" name="microsoft" fill="#737373" />
            <Bar dataKey="others" name="others" fill="#CBD5E1" />
            <Bar dataKey="workday" name="workday" fill="#FF6B35" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
