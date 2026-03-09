export default function Header() {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Oracle vs Salesforce
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Competitive Strategy Case Study · Enterprise Software Market
            </p>
          </div>
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              Oracle
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Salesforce
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
