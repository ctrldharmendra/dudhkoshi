"use client";

import React, { useState } from 'react';
import { 
  FiZap, 
  FiDroplet, 
  FiHome, 
  FiCpu, 
  FiShare2 
} from 'react-icons/fi';
import StyledSubHeadingWithPill from '../components/StyledSubHeadingWithPill';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';

export default function ProjectOverviewSection() {
  // Tab Navigation items matching the sample icons & labels
  const tabs = [
    { id: 'scheme', label: 'Scheme & Capacity', icon: FiZap },
    { id: 'conveyance', label: 'Water Conveyance', icon: FiDroplet },
    { id: 'powerhouse', label: 'Powerhouse', icon: FiHome },
    { id: 'turbine', label: 'Turbine & Generator', icon: FiCpu },
    { id: 'evacuation', label: 'Power Evacuation', icon: FiShare2 },
  ];

  // Selected tab state
  const [activeTab, setActiveTab] = useState('scheme');

  // Specs dataset for each technical parameter
  const specsData = {
    scheme: {
      title: "Scheme and Capacity",
      icon: FiZap,
      data: [
        { parameter: "Installed Capacity", value: "21.40 MW", formula: "formula : P=ρ·g·Q·Hₙ·η" },
        { parameter: "Gross Head", value: "690.10 m", formula: "formula : H_g = Z_intake - Z_powerhouse" },
        { parameter: "Net Head", value: "679.92m", formula: "formula : H_n = H_g - ∑hf" },
        { parameter: "Design Discharge", value: "3.6m³/s", formula: "formula : Q = A·v" },
        { parameter: "Type of Scheme", value: "Run-of-River", formula: "" },
      ],
      note: "It is a 95.7 MW, 6-hour peaking run-of-river hydropower project located in Solukhumbu, Koshi Province. The project utilizes the Dudhkoshi River to generate clean and reliable energy for Nepal."
    },
    conveyance: {
      title: "Water Conveyance",
      icon: FiDroplet,
      data: [
        { parameter: "Headrace Tunnel Length", value: "4,250 m", formula: "formula : L_t" },
        { parameter: "Tunnel Diameter", value: "3.2 m", formula: "formula : D = 2·r" },
        { parameter: "Penstock Pipe Length", value: "820 m", formula: "formula : L_p" },
        { parameter: "Surge Tank Type", value: "Simple Shaft", formula: "" },
      ],
      note: "Designed with underground tunneling structures to minimize environmental impact while maintaining optimum hydraulic efficiency."
    },
    powerhouse: {
      title: "Powerhouse",
      icon: FiHome,
      data: [
        { parameter: "Powerhouse Type", value: "Surface Type", formula: "" },
        { parameter: "Dimensions (L x W x H)", value: "38m x 16m x 22m", formula: "formula : V = L·W·H" },
        { parameter: "Tailrace Type", value: "Open Channel", formula: "" },
      ],
      note: "Houses state-of-the-art control units and multi-stage generating equipment engineered for high-head operational efficiency."
    },
    turbine: {
      title: "Turbine & Generator",
      icon: FiCpu,
      data: [
        { parameter: "Turbine Type", value: "Pelton Wheel", formula: "" },
        { parameter: "Number of Units", value: "2 Units", formula: "" },
        { parameter: "Rated Efficiency", value: "92.5%", formula: "formula : η_overall" },
        { parameter: "Generator Output", value: "12.5 MVA per unit", formula: "formula : S = P / PF" },
      ],
      note: "High-efficiency vertical Pelton turbines selected specifically to handle varying seasonal silt conditions and heads."
    },
    evacuation: {
      title: "Power Evacuation",
      icon: FiShare2,
      data: [
        { parameter: "Transmission Voltage", value: "132 kV", formula: "" },
        { parameter: "Interconnection Point", value: "NEA Substation", formula: "" },
        { parameter: "Transmission Line Length", value: "18.5 km", formula: "formula : L_line" },
      ],
      note: "Power generated is stepped up and transmitted directly to the national grid via a double-circuit transmission line."
    }
  };

  const currentContent = specsData[activeTab];
  const ContentIcon = currentContent.icon;

  return (
    <section 
      className="w-full bg-[white] py-16 px-4 sm:px-6 lg:px-8  antialiased text-[#45484D]"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <div className="max-w-[1438px] mx-auto">
        
          <div className="text-center max-w-3xl mx-auto mb-16">


          <StyledSubHeadingWithPill text="Project Overview"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--landingPageColorPrimary2)] tracking-tight leading-tight mb-4">
Project Overview
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-[var(--textColorOnLightBg)] leading-relaxed">
Engineering design data and technical specifications for the Dudhkoshi-2 
Run-of-River Hydroelectric Scheme.
          </p>
        </div>

        {/* Technical Parameters Label */}
        <div className="mb-6">
   <HrLineWithHeadingText text="TECHNICAL PARAMETERS"></HrLineWithHeadingText>

        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: TAB NAVIGATION (4 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-[6px] text-left text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#1E7EBB]  border-slate-100 ring-1 ring-sky-100"
                      : "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/40 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1E7EBB]" : "text-slate-400"}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: SPECIFICATIONS CARD (8 Cols on lg) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[5px] border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-300">
              
              {/* Card Header Banner */}
              <div className="projectOverViewCardTopBg px-6 py-4 flex items-center gap-3 border-b border-sky-100">
                <div className="w-8 h-8 rounded-lg bg-[#1E7EBB] flex items-center justify-center text-white shrink-0">
                  <ContentIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#2C3E50]">
                  {currentContent.title}
                </h3>
              </div>

              {/* Data Table Rows */}
              <div className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex flex-col border-b border-slate-100 pb-2">
                  {currentContent.data.map((item, index) => (
                    <div 
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-12 items-center py-3 border-b border-slate-100 last:border-0 gap-1 sm:gap-2"
                    >
                      {/* Parameter Name */}
                      <span className="sm:col-span-4 text-xs font-semibold text-slate-600">
                        {item.parameter}
                      </span>

                      {/* Parameter Value */}
                      <span className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                        {item.value}
                      </span>

                      {/* Formula (Italicized style matching image) */}
                      <span className="sm:col-span-4 text-[11px] font-serif italic text-slate-400 text-left sm:text-right">
                        {item.formula}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Note Section */}
                {currentContent.note && (
                  <div className="pt-2 flex items-start gap-2 text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
                    <span className="font-bold text-slate-700 shrink-0">Note :</span>
                    <p>{currentContent.note}</p>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}