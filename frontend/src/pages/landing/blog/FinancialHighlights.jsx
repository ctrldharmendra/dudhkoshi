import React from 'react';
import Link from 'next/link';

export default function FinancialHighlights() {
  const highlights = [
    { 
      label: 'Revenue Growth (YoY)', 
      value: '+18.5%', 
      isPositive: true 
    },
    { 
      label: 'Operating Margin', 
      value: '24.2%', 
      isPositive: false 
    },
    { 
      label: 'Dividend Yield', 
      value: '3.12%', 
      isPositive: false 
    },
  ];

  return (
    <div className="w-full max-w-sm bg-transparent font-sans antialiased">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-bold tracking-wide text-slate-600 uppercase">
          Financial Highlights
        </h3>
        <Link 
          href="#" 
          className="text-[11px] font-semibold text-blue-500 hover:text-blue-700 uppercase transition-colors"
        >
          View More
        </Link>
      </div>

      {/* Data List */}
      <div className="flex flex-col">
        {highlights?.map((item, index) => (
          <div 
            key={index}  
            className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-b-0"
          >
            {/* Label */}
            <span className="text-sm font-body text-slate-700 font-normal">
              {item.label}
            </span>

            {/* Value */}
            <span 
              className={`text-sm font-body font-medium ${
                item.isPositive ? 'text-emerald-600' : 'text-slate-800'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      
    </div>
  );
}