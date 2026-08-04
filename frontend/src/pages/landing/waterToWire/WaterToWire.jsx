"use client";

import React, { useState } from 'react';
import { FiZap, FiArrowRight, FiChevronUp, FiChevronDown, FiArrowDown } from 'react-icons/fi';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import Image from 'next/image';
import waterToWire from "../../../../public/landing/waterToWire/waterToWire.png";
import PowerEvacuationSection from './export default function PowerEvacuationSection() {';

export default function WaterToWireSection() {
  // Step cards dataset matching the design
  const stepsData = [
    {
      id: 'headworks',
      title: 'HEADWORKS',
      subtitle: 'Boulder Lined Weir',
      summary: 'Diversion , Intake , Settling',
      componentsLabel: 'HEADWORKS COMPONENTS',
      details: [
        { label: 'DIVERSION WEIR', value: 'BOULDER LINED, 15 M' },
        { label: 'SPILLWAY', value: 'FREE OVERFLOW, 2.5M × 2.5M' },
        { label: 'HEADRACE CULVERT', value: 'RCC, 61.5 M × 1.6 M × 1.5 M' },
        { label: 'SETTLING BASIN', value: 'DOUBLE BAY, 35.0 M × 6.5 M × 3.9 M' },
        { label: 'APPROACH CULVERT', value: 'RCC, 100 M, 1.6 M × 1.5 M' },
        { label: 'APPROACH DIVERGED', value: 'RCC, 2 NOS, 28 M, 1.1 M × 1.5M' },
        { label: 'INTAKE', value: 'SIDE INTAKE, 2 NOS, 2.0M ×1.6 M' },
      ]
    },
    {
      id: 'headrace-tunnel',
      title: 'HEADRACE TUNNEL',
      subtitle: '2,020 M',
      summary: 'Inverted D-Shaped • 2.2 M × 2.5 M',
      componentsLabel: 'HEADRACE TUNNEL COMPONENTS',
      details: [
        { label: 'TUNNEL TYPE', value: 'INVERTED D-SHAPED, SHOTCRETE LINED' },
        { label: 'TOTAL LENGTH', value: '2,020 METERS' },
        { label: 'CROSS SECTION', value: '2.2 M WIDE × 2.5 M HIGH' },
        { label: 'EXCAVATION', value: 'DRILL AND BLAST METHOD' },
      ]
    },
    {
      id: 'surge-shaft',
      title: 'SURGE SHAFT',
      subtitle: '25 M',
      summary: 'Simple Cylindrical • Ø 4.5 M',
      componentsLabel: 'SURGE SHAFT COMPONENTS',
      details: [
        { label: 'TYPE', value: 'SIMPLE CYLINDRICAL RCC SHAFT' },
        { label: 'HEIGHT', value: '25 METERS' },
        { label: 'INTERNAL DIAMETER', value: 'Ø 4.5 METERS' },
        { label: 'GATE CHAMBER', value: 'UNDERGROUND INCLINED SHAFT' },
      ]
    },
    {
      id: 'penstock',
      title: 'PENSTOCK',
      subtitle: '1,490 M',
      summary: 'Steel • Ø 1.2 M (Before Bifurcation)',
      componentsLabel: 'PENSTOCK COMPONENTS',
      details: [
        { label: 'MATERIAL', value: 'HIGH GRADE STRUCTURAL STEEL' },
        { label: 'TOTAL LENGTH', value: '1,490 METERS' },
        { label: 'DIAMETER', value: 'Ø 1.2 M (REDUCING AT BIFURCATION)' },
        { label: 'ANCHOR BLOCKS', value: 'RCC CONCRETE BLOCKS (8 NOS)' },
      ]
    }
  ];

  // Active expanded card ID (default set to 'headworks')
  const [activeCardId, setActiveCardId] = useState('headworks');

  // Toggle or select card for expansion
  const handleToggleCard = (id) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  const activeStep = stepsData.find((step) => step.id === activeCardId);

  return (
    <section 
      className="max-w-[1440px] mx-auto bg-[white] py-16 px-4 sm:px-6 lg:px-8  antialiased text-[#45484D]"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--textColorOnLightBg': '#45484D',
      }}
    >

        
      <div className=" mx-auto">

        {/* Top Header Label */}
   <HrLineWithHeadingText text="Water to Wire System"></HrLineWithHeadingText>

        {/* Main Background Canvas Container with Subtle Grid Pattern */}
        <div className="relative  rounded-[16px] overflow-hidden p-6 sm:p-10 border border-[#E5E5EA] shadow-xs backdrop-blur-xs">
          

                            <Image
        src={waterToWire}
        width={100}
        height={100}
        unoptimized
        alt="Water to Wire System"
        className="w-full absolute top-0 left-0 h-full object-cover"
        >
        </Image>

          {/* Canvas Subtitle */}
          <h3 className="text-xs sm:text-sm font-bold tracking-wider text-slate-600 uppercase mb-8 relative z-10">
            WATER INTAKE & CONVEYANCE
          </h3>

          {/* TOP STEP CARDS FLOW GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10 items-stretch">
            {stepsData.map((step, index) => {
              const isActive = activeCardId === step.id;

              return (
                <div key={step.id} className="relative flex flex-col justify-between">
                  {/* Card Box */}
                  <div 
                    onClick={() => handleToggleCard(step.id)}
                    className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full shadow-xs hover:shadow-md ${
                      isActive 
                        ? 'border-[#1E7EBB] ring-2 ring-sky-200/60 shadow-md' 
                        : 'border-slate-100 hover:border-sky-200'
                    }`}
                  >
                    <div>
                      {/* Icon Badge */}
                      <div className="w-9 h-9 rounded-xl bg-[#eaf4fc] text-[#1E7EBB] flex items-center justify-center mb-5">
                        <FiZap className="w-5 h-5 fill-[#1E7EBB]/20" />
                      </div>

                      {/* Header Title */}
                      <h4 className="text-xs font-bold tracking-wider text-[#1E7EBB] uppercase mb-1">
                        {step.title}
                      </h4>

                      {/* Main Subtitle */}
                      <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug mb-2">
                        {step.subtitle}
                      </p>

                      {/* Summary Text */}
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
                        {step.summary}
                      </p>
                    </div>

                    {/* View Details Action Link */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1E7EBB]">
                      <span>View Details</span>
                      {isActive ? (
                        <FiChevronUp className="w-3.5 h-3.5 text-[#1E7EBB]" />
                      ) : (
                        <FiChevronDown className="w-3.5 h-3.5 text-[#1E7EBB]" />
                      )}
                    </div>
                  </div>

                  {/* Flow Arrow (Visible on Desktop between cards) */}
                  {index < stepsData.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-[#1E7EBB]">
                      <FiArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* BOTTOM EXPANDABLE DETAILS PANEL */}
          {activeStep && (
            <div className="mt-8 relative z-10 animate-fadeIn">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-sm">
                
                {/* Details Section Label */}
                <h5 className="text-[11px] font-bold tracking-wider text-[#1E7EBB] uppercase mb-5">
                  {activeStep.componentsLabel}
                </h5>

                {/* Grid of Component Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {activeStep.details.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#f4f8fc]/80 p-3.5 rounded-xl border border-sky-100/60 flex flex-col justify-center"
                    >
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                        {item.label}
                      </span>
                      <span className="text-xs font-bold text-slate-700 tracking-tight">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* ELEVATION DROP BADGE PILL AT BOTTOM */}
          <div className="mt-12 flex justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#fff8eb] border border-[#fde68a] text-amber-700 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-2xs">
              <FiArrowDown className="w-4 h-4 text-amber-600" />
              <span>690.10 m elevation drop</span>
            </div>
          </div>

<PowerEvacuationSection></PowerEvacuationSection>
        </div>
      </div>
    </section>
  );
}