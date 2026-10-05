"use client";

import React, { useEffect, useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import HrLineWithHeadingText from '../landing/components/HrLineWithHeadingText';
import StyledSubHeadingWithPill from '../landing/components/StyledSubHeadingWithPill';
import { getFaqs } from '@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function FaqSection() {
const dispatch = useDispatch();

// Active Category State
const [activeTab, setActiveTab] = useState('Technical');

// Active Open Accordion Item
const [openFaqId, setOpenFaqId] = useState(null);

// Get FAQ data from Redux
const data = useSelector(
(state) => state?.landingPageAdmmin?.faqs
);

// Fetch FAQs
useEffect(() => {
dispatch(getFaqs());
}, [dispatch]);

// Create categories dynamically from API data
const categories = [
...new Set(data?.map((faq) => faq.category))
];

// Get FAQs belonging to active category
const currentFaqs =
data?.filter(
(faq) => faq.category === activeTab
) || [];

// Toggle accordion
const toggleAccordion = (id) => {
setOpenFaqId(
openFaqId === id ? null : id
);
};

return (
<section className="w-full mt-[110px] bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-[#45484D]">

  <div className="text-center max-w-full mx-auto mb-16">

    <StyledSubHeadingWithPill text="Frequently Asked Questions" />

    {/* Main Title */}
    <h2
      className="font-['Manrope'] font-bold text-[32px] leading-[44px] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4"
      data-aos="fade-up"
    >
      Project FAQs
    </h2>

    {/* Subtitle */}
    <p
      className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]"
      data-aos="fade-up"
    >
      Expert answers to our most frequently asked questions regarding
      hydro-infrastructure and sustainability initiatives.
    </p>

  </div>

  <div className="max-w-[1440px] mx-auto">

    {/* TOP HEADER & CATEGORY TABS ROW */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-8 gap-4 sm:gap-0">

      {/* Section Title */}
      <div>
        <HrLineWithHeadingText text="Common Inquiries" />
      </div>

      {/* Category Tabs */}
      <div className="font-body flex items-center gap-6 sm:gap-8 sm:w-auto pb-2 sm:pb-0 border-b-2 border-slate-100 px-[20px]">

        {categories.map((category) => {
          const isActive = activeTab === category;

          return (
            <button
              key={category}
              onClick={() => {
                setActiveTab(category);

                // Automatically open first FAQ
                // when switching category
                const firstFaq = data?.find(
                  (faq) => faq.category === category
                );

                setOpenFaqId(firstFaq?.id || null);
              }}
              className={`text-xs sm:text-sm font-medium transition-all relative py-1 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-[#1E7EBB] font-medium'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {category}

              {isActive && (
                <span />
              )}
            </button>
          );
        })}

      </div>

    </div>

    {/* CONTAINER CANVAS */}
    <div className="bg-[radial-gradient(165.62%_611.95%_at_-31.04%_123.76%,#DDF2FF_0%,#FFFFFF_40.92%,#DDF2FF_100%)] rounded-[32px] p-4 sm:p-8 md:p-10 border border-sky-100/60 transition-all duration-300">

      {/* FAQS LIST */}
      <div className="space-y-4">

        {currentFaqs.map((faq, index) => {
          const isOpen = openFaqId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden transition-all duration-200"
            >

              {/* Question Header */}
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="font-title w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors hover:bg-slate-50/50"
              >

                <span className="text-[14px] font-bold text-[#3E4145] pr-4 leading-snug">
                  {index + 1}. {faq.ques}
                </span>

                {/* Plus / Minus Icon */}
                <div className="shrink-0 text-slate-800">

                  {isOpen ? (
                    <FiMinus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  ) : (
                    <FiPlus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  )}

                </div>

              </button>

              {/* Answer */}
              {isOpen && (
                <div className="font-body px-5 pb-6 sm:px-6 sm:pb-6 text-[15px] leading-relaxed font-normal border-t border-transparent">
                  {faq.ans}
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>

  </div>

</section>


);
}