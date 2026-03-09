const TABS = [
  { id: 'financials', label: 'Financials' },
  { id: 'market-share', label: 'Market Share' },
  { id: 'product-strategy', label: 'Product Strategy' },
  { id: 'business-model', label: 'Business Model' },
];

export default function TabNav({ active, onChange }) {
  return (
    <div className="bg-white border-b border-slate-200 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex gap-0 -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-4 py-3.5 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                active === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
