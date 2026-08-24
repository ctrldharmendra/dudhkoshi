"use client";

import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

export default function Accordion({ items = [] }) {
  // Set the first item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    /* Constrain height & enable scrolling if more than 3 items */
    <div className="flex flex-col gap-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
      {items?.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-xl  transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'accordionBg'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none"
            >
              <span className="text-xs font-bold tracking-wider uppercase text-[var(--landingPagePrimaryColor,#1E7EBB)]">
                {item.title}
              </span>
              <span className="text-[var(--landingPagePrimaryColor,#1E7EBB)]">
                {isOpen ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
              </span>
            </button>

            {/* Expandable Content */}
            {isOpen && item.content && (
              <div className="px-5 pb-5 text-[15px] text-[var(--landingPageSecondaryColor,#64748b)] leading-relaxed font-normal">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}