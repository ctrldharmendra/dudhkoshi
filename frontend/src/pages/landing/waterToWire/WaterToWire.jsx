"use client";

import React, { useState } from 'react';
import { FiArrowRight, FiChevronUp, FiChevronDown, FiArrowDown } from 'react-icons/fi';
import { ImPower } from "react-icons/im";

import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import Image from 'next/image';
import waterToWire from "../../../../public/landing/waterToWire/waterToWire.png";
import PowerEvacuationSection from './PowerEvacuationSection';
import { FaNetworkWired } from 'react-icons/fa';
import { GiFlameTunnel } from 'react-icons/gi';
import { SiSaltproject } from 'react-icons/si';
import { LiaProjectDiagramSolid } from 'react-icons/lia';

export default function WaterToWireSection() {
  // Step cards dataset matching the design
  const stepsData = [
    {
      id: 'headworks',
      title: 'HEADWORKS',
      subtitle: 'Barrage',
      icon: <FaNetworkWired   />,
      summary: 'Diversion, Intake, Desanding',
      componentsLabel: 'HEADWORKS COMPONENTS',
      details: [
        { label: 'DIVERSION WEIR (BARRAGE)', value: 'BARRAGE, WIDTH 87.85 M, FSL/WEIR LEVEL 789 MASL, MDDL 781 MASL' },
        { label: 'BARRAGE GATES', value: '12.0 M × 7.0 M, 4 NOS RADIAL GATES' },
        { label: 'UNDER SLUICE GATES', value: '4.0 M × 5.0 M, 2 NOS RADIAL GATES' },
        { label: 'SPILLWAY GATES', value: '12.0 M × 4 M (4 NOS) & 4.0 M × 7 M (2 NOS)' },
        { label: 'STILLING BASIN', value: '80.00 M LENGTH' },
        { label: 'INTAKE', value: 'SIDE INTAKE, 3 NOS, 7.5 M × 6.5 M' },
        { label: 'GRAVEL TRAP', value: '2 NOS 8.1 M × 14 M + 1 NO 8.7 M × 14 M (MIDDLE BAY)' },
        { label: 'APPROACH CANAL', value: '3.5 M × 3.5 M — LENGTHS: 86.912 M (RIGHT), 100.151 M (MIDDLE), 113.541 M (LEFT)' },
        { label: 'DESANDING CHAMBER', value: 'SURFACE, 3 BAYS (2 HOPPERS EACH), 115 M × 13.50 M × 14.75 M' },
        { label: 'HEADRACE CULVERT', value: "NULL" },
        { label: 'APPROACH DIVERGED', value: "NULL" },
      ]
    },
    {
      id: 'headrace-tunnel',
      title: 'HEADRACE TUNNEL',
      subtitle: '4,791 M',
      icon: <GiFlameTunnel   />,
      summary: 'Concrete Lined Inverted D-Shaped • 5.6 M Finished Dia.',
      componentsLabel: 'HEADRACE TUNNEL COMPONENTS',
      details: [
        { label: 'TUNNEL TYPE', value: 'CONCRETE LINED, INVERTED D-SHAPED' },
        { label: 'TOTAL LENGTH', value: '4,791 METERS' },
        { label: 'FINISHED DIAMETER', value: '5.6 METERS' },
        { label: 'EXCAVATION', value: "NULL" },
      ]
    },
    {
      id: 'surge-shaft',
      title: 'SURGE SHAFT',
      subtitle: '69 M',
      icon: <SiSaltproject    />,
      summary: 'Restricted Orifice • Ø 16.0 M',
      componentsLabel: 'SURGE SHAFT COMPONENTS',
      details: [
        { label: 'TYPE', value: 'RESTRICTED ORIFICE SURGE SHAFT' },
        { label: 'HEIGHT', value: '69 METERS' },
        { label: 'INTERNAL DIAMETER', value: 'Ø 16.0 METERS' },
        { label: 'ORIFICE DIAMETER', value: 'Ø 3.0 METERS' },
        { label: 'GATE CHAMBER', value: "NULL" },
      ]
    },
    {
      id: 'penstock',
      title: 'PENSTOCK',
      subtitle: 'Underground',
      summary: 'Ø 4.6 M • Surge Shaft to Powerhouse',
      icon: <LiaProjectDiagramSolid     />,
      componentsLabel: 'PENSTOCK COMPONENTS',
      details: [
        { label: 'MATERIAL', value: "NULL" },
        { label: 'TYPE', value: 'UNDERGROUND' },
        { label: 'LENGTH (SURGE SHAFT → DROP SHAFT)', value: '80 METERS' },
        { label: 'DROP SHAFT LENGTH', value: '96.97 METERS' },
        { label: 'INCLINED PENSTOCK TUNNEL LENGTH', value: '96.62 METERS' },
        { label: 'INTERNAL DIAMETER', value: 'Ø 4.6 METERS' },
        { label: 'ANCHOR BLOCKS', value: "NULL" },
      ]
    }
  ];

  // Active expanded card ID (default set to 'headworks')
  const [activeCardId, setActiveCardId] = useState('headworks');

  // Toggle or select card for expansion
  const handleToggleCard = (id) => {
    setActiveCardId((prev) => (prev === id ? "NULL" : id));
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
                       {
                         step.icon
                       }
                      </div>

                      {/* Header Title */}
                      <h4 className="text-xs font-bold tracking-wider text-[#186596] uppercase mb-1">
                        {step.title}
                      </h4>

                      {/* Main Subtitle */}
                      <p className="text-sm sm:text-base text-[#45484D] font-bold leading-8 mb-2">
                        {step.subtitle}
                      </p>

                      {/* Summary Text */}
                      <p className="text-[14px] text-slate-600 text-[#45484D] font-medium leading-relaxed mb-4">
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
                <h5 className="text-[10px] font-medium tracking-wider text-[#1E7EBB] uppercase mb-5">
                  {activeStep.componentsLabel}
                </h5>

                {/* Grid of Component Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {activeStep.details.map((item, idx) => (
                    <div 
                      key={idx}
                      className="rounded-r-[4px] border-l-[0.5px] border-l-[#1E7EBB] bg-[#E9F2F8]/58 p-[10px] flex flex-col justify-center"
                    >
                      <span className="text-[10px] leading-[20px] font-[Hind] font-medium text-slate-400 tracking-wider uppercase mb-1">
                        {item.label}
                      </span>
                      <span className="font-['Times_New_Roman'] font-normal text-[12px] leading-[20px] tracking-[0px] align-middle uppercase text-slate-700">
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
            <div className="inline-flex items-center gap-2 bg-[#FEF5E7] border border-[#FCE1B3] text-amber-700 font-[Manrope] font-medium text-[12px] leading-[20px] tracking-[2px] align-middle px-6 py-2.5 rounded-full shadow-2xs">
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