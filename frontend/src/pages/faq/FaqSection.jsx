"use client";

import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import HrLineWithHeadingText from '../landing/components/HrLineWithHeadingText';
import StyledSubHeadingWithPill from '../landing/components/StyledSubHeadingWithPill';


export default function FaqSection() {
  // Active Category State
  const [activeTab, setActiveTab] = useState('Technical');
  
  // Active Open Accordion Item (stores ID of expanded FAQ)
  const [openFaqId, setOpenFaqId] = useState('tech-1');

  // Categories List
  const categories = ['Technical', 'Environmental', 'Corporate'];

  // FAQ Data grouped by category
  const faqData = {
    Technical: [
      {
        id: 'tech-1',
        number: '1.',
        question: 'What is the Dudhkoshi-2 (Jaleswar) Hydroelectric Project?',
        answer: 'It is a 95.7 MW, 6-hour peaking run-of-river hydropower project located in Solukhumbu, Koshi Province. The project utilizes the Dudhkoshi River to generate clean and reliable energy for Nepal.',
      },
      {
        id: 'tech-2',
        number: '2.',
        question: 'Who owns and develops the project?',
        answer: 'The project is owned and developed by Dudhkoshi Hydro Power Pvt. Ltd., committed to developing sustainable energy infrastructure in Nepal.',
      },
      {
        id: 'tech-3',
        number: '3.',
        question: 'How much energy will the project generate annually?',
        answer: "The project will generate approximately 543.48 GWh of energy annually, including dry-season and wet-season production optimized for Nepal's power demand.",
      },
      {
        id: 'tech-4',
        number: '4.',
        question: 'What type of hydropower scheme is Dudhkoshi-2?',
        answer: 'It is a 6-hour peaking run-of-river (PRoR) hydropower scheme designed to supply stable energy during peak demand periods.',
      },
    ],
    Environmental: [
      {
        id: 'env-1',
        number: '1.',
        question: 'What measures are taken to mitigate environmental impact?',
        answer: 'Comprehensive Environmental Impact Assessments (EIA) have been conducted, incorporating fish ladders, minimum environmental flow releases, and active reforestation programs.',
      },
      {
        id: 'env-2',
        number: '2.',
        question: 'How will local aquatic life be protected?',
        answer: 'A dedicated environmental flow is maintained continuously downstream, alongside fish passage facilities to ensure uninterrupted aquatic migration.',
      },
    ],
    Corporate: [
      {
        id: 'corp-1',
        number: '1.',
        question: 'How can local communities participate or benefit?',
        answer: "The project supports local jobs, infrastructure development, community upliftment, and contributes to Nepal's overall energy security through clean, renewable power generation.",
      },
      {
        id: 'corp-2',
        number: '2.',
        question: 'What is the projected timeline for commercial operation?',
        answer: 'Commercial Operation Date (COD) is targeted following the completion of headworks, tunneling, powerhouse erection, and grid connection facilities.',
      },
    ],
  };

  const toggleAccordion = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const currentFaqs = faqData[activeTab] || [];

  return (
    <section className="w-full mt-[110px] bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-[#45484D]">

      <div className="text-center max-w-3xl mx-auto mb-16">


          <StyledSubHeadingWithPill text="Frequently Asked Questions"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="font-['Manrope'] font-bold text-[32px] leading-[44px] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4">
          Project FAQs
          </h2>

          {/* Subtitle */}
          <p className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]">
    Expert answers to our most frequently asked questions regarding hydro-infrastructure and sustainability initiatives.
          </p>
        </div>
      <div className="max-w-[1440px] mx-auto">
        
        {/* TOP HEADER & CATEGORY TABS ROW */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-8  gap-4 sm:gap-0">
          
          {/* Section Title */}
          <div>
   <HrLineWithHeadingText text="Common Inquiries"></HrLineWithHeadingText>

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
                    // Automatically open first FAQ when switching category
                    setOpenFaqId(faqData[category]?.[0]?.id || null);
                  }}
                  className={`text-xs sm:text-sm font-medium transition-all relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'text-[#1E7EBB] font-medium' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {category}
                  {isActive && (
                    <span  />
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
            {currentFaqs.map((faq) => {
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
                      {faq.number} {faq.question}
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

                  {/* Answer Body (Animated Expand) */}
                  {isOpen && (
                    <div className="font-body px-5 pb-6 sm:px-6 sm:pb-6 text-[15px] leading-relaxed font-normal border-t border-transparent">
                      {faq.answer}
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