"use client";

import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    /* Constrain height & enable scrolling if more than 3 items */
    <div className="flex flex-col gap-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="rounded-[8px] bg-[linear-gradient(180deg,#DDECF5_50.57%,#FFFFFF_104.6%)] p-[1px]"
          >
            <div
              className={`rounded-[7px] overflow-hidden transition-all duration-200 ${
                isOpen
                  ? "accordionBg"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-normal align-middle uppercase text-[var(--primaryTextColorLanding3,#186596)]">
                  {item.title}
                </span>

                <span className="text-[var(--landingPagePrimaryColor,#1E7EBB)]">
                  {isOpen ? (
                    <FiChevronUp className="w-4 h-4" />
                  ) : (
                    <FiChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              {isOpen && item.content && (
                <div className="px-5 pb-5 font-[Hind] text-[14px] font-normal leading-[20px] tracking-normal align-middle text-[var(--primaryTextColorLanding,#45484D)]">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
