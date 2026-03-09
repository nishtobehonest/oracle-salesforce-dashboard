export default function InsightCard({ icon, title, insight, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    slate: 'bg-slate-50 border-slate-200 text-slate-700',
  };

  return (
    <div className={`rounded-lg border p-4 ${colors[color]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{icon}</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{title}</p>
          <p className="text-sm leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  );
}
