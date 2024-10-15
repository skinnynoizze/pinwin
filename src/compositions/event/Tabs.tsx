import React, { useState } from 'react';

type TabProps = {
  tabs: { label: string; content: React.ReactNode }[];
};

const Tabs: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-bg-l1 rounded-lg shadow-md">
      <div className="flex border-b border-gray-600">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center font-semibold ${activeTab === index ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-2">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;