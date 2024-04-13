import React, { useState } from 'react';

  const TabView = ({ tabs,children }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabClick = (index) => {
      setActiveTab(index);
    };
  
    return (
      <div className='mt-3'>
        <div className="tab-header">
          <TabHeader
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          />
        </div>
        <div className="tab-content">
          {children[activeTab]}
        </div>
      </div>
    );
  };

const TabHeader = ({ tabs, activeTab, onTabClick }) => {
  
    return (
      <ul className="tab-header-list">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => onTabClick(index)}
          >
            {tab}
          </li>
        ))}
      </ul>
    );
  };


export default TabView;