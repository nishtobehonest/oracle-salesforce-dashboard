import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { oracleRevenueMix, salesforceRevenueMix, oracleCloudTransition, businessModelComparison } from '../../data/caseData';
import InsightCard from '../InsightCard';

const ORACLE_COLOR = '#C74634';
const SF_COLOR = '#00A1E0';

const ATTRIBUTES = [
  { key: 'model', label: 'Business Model' },
  { key: 'deployment', label: 'Deployment' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'switchingCost', label: 'Switching Costs' },
  { key: 'rndIntensity', label: 'R&D Intensity' },
  { key: 'marginProfile', label: 'Gross Margin' },
  { key: 'customerSegment', label: 'Customer Segment' },
  { key: 'salesMotion', label: 'Sales Motion' },
  { key: 'keyStrength', label: 'Key Strength' },
  { key: 'keyWeakness', label: 'Key Weakness' },
];

export default function BusinessModel() {
  const o = businessModelComparison.oracle;
  const s = businessModelComparison.salesforce;

  return (
    <div className="space-y-8">
      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          icon="🔄"
          title="Forced Transition"
          insight="Oracle was forced to build a cloud offering only after Salesforce proved the SaaS model. This 'follower' position created a structural 10-year disadvantage."
          color="amber"
        />
        <InsightCard
          icon="🔒"
          title="Lock-in vs. Stickiness"
          insight="Oracle relies on contractual and technical lock-in (database, ERP). Salesforce builds stickiness through workflow dependency and platform extensibility."
          color="blue"
        />
        <InsightCard
          icon="📊"
          title="Oracle's Cloud Progress"
          insight="Cloud revenue grew from 8% (2016) to 44% (2024) of Oracle's total — driven largely by OCI growth and Cerner integration. Still behind pure-play SaaS peers."
          color="green"
        />
      </div>

      {/* Side-by-side comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-5">Business Model Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 pr-4 text-slate-500 font-medium text-xs uppercase tracking-wide w-40">Attribute</th>
                <th className="text-left py-2 px-4">
                  <span className="inline-flex items-center gap-1.5 text-red-700 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                    Oracle
                  </span>
                </th>
                <th className="text-left py-2 px-4">
                  <span className="inline-flex items-center gap-1.5 text-blue-700 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                    Salesforce
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ATTRIBUTES.map(({ key, label }, i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-slate-50/60' : ''}>
                  <td className="py-2.5 pr-4 text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</td>
                  <td className="py-2.5 px-4 text-slate-700">{o[key]}</td>
                  <td className="py-2.5 px-4 text-slate-700">{s[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Oracle revenue mix */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Oracle Revenue Mix (2016–2024)</h2>
          <p className="text-xs text-slate-500 mb-5">License revenue declining as cloud grows. Services (support) remains large and sticky.</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={oracleRevenueMix} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `$${v}B`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v, n) => [`$${v}B`, n.charAt(0).toUpperCase() + n.slice(1)]} />
              <Legend formatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)} />
              <Bar dataKey="license" name="license" stackId="a" fill="#F87171" />
              <Bar dataKey="cloud" name="cloud" stackId="a" fill={ORACLE_COLOR} />
              <Bar dataKey="services" name="services" stackId="a" fill="#CBD5E1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Salesforce revenue mix */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Salesforce Revenue Mix (2016–2024)</h2>
          <p className="text-xs text-slate-500 mb-5">~89% subscription revenue — pure-play SaaS. Services (implementation/training) kept lean.</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesforceRevenueMix} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `$${v}B`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v, n) => [`$${v}B`, n.charAt(0).toUpperCase() + n.slice(1)]} />
              <Legend formatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)} />
              <Bar dataKey="subscription" name="subscription" stackId="a" fill={SF_COLOR} />
              <Bar dataKey="services" name="services" stackId="a" fill="#CBD5E1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Oracle cloud transition */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Oracle's Cloud Transition (% of Revenue from Cloud)</h2>
        <p className="text-xs text-slate-500 mb-5">
          Cloud grew from 8% to 44% of Oracle's revenue in 8 years — accelerated by OCI expansion and Cerner. But still lags SaaS-native peers.
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={oracleCloudTransition} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 60]} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => [`${v}%`, 'Cloud % of Revenue']} />
            <Line
              type="monotone" dataKey="cloudPct" name="cloudPct"
              stroke={ORACLE_COLOR} strokeWidth={2.5} dot={{ r: 5, fill: ORACLE_COLOR }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
