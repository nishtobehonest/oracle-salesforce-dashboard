import { useState } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import Financials from './components/tabs/Financials';
import MarketShare from './components/tabs/MarketShare';
import ProductStrategy from './components/tabs/ProductStrategy';
import BusinessModel from './components/tabs/BusinessModel';
import ChatModal from './components/ChatModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('financials');

  const tabs = {
    financials: <Financials />,
    'market-share': <MarketShare />,
    'product-strategy': <ProductStrategy />,
    'business-model': <BusinessModel />,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {tabs[activeTab]}
      </main>
      <ChatModal activeTab={activeTab} />
    </div>
  );
}
