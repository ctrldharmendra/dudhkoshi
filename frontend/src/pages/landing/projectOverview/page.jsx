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
        { parameter: "Installed Capacity", value: "95.7 MW", formula: "formula : P=ρ·g·Q·Hₙ·η" },
        { parameter: "Gross Head", value: "144.5 m", formula: "formula : H_g = Z_intake - Z_powerhouse" },
        { parameter: "Net Head", value: "NULL", formula: "formula : H_n = H_g - ∑hf" },
        { parameter: "Design Discharge", value: "83.5 m³/s", formula: "formula : Q = A·v" },
        { parameter: "Type of Scheme", value: "Run-of-River (6-hour Peaking)", formula: "" },
      ],
      note: "It is a 95.7 MW, 6-hour peaking run-of-river hydropower project located in Solukhumbu, Koshi Province. The project utilizes the Dudhkoshi River to generate clean and reliable energy for Nepal."
    },
    conveyance: {
      title: "Water Conveyance",
      icon: FiDroplet,
      data: [
        { parameter: "Headrace Tunnel Length", value: "4,791 m", formula: "formula : L_t" },
        { parameter: "Headrace Tunnel Type", value: "Concrete Lined Inverted D-Shaped", formula: "" },
        { parameter: "Tunnel Diameter", value: "5.6 m (finished)", formula: "formula : D = 2·r" },
        { parameter: "Surge Shaft Type", value: "Restricted Orifice Surge Shaft", formula: "" },
        { parameter: "Surge Shaft Height", value: "69 m", formula: "" },
        { parameter: "Surge Shaft Internal Diameter", value: "16.0 m", formula: "" },
        { parameter: "Penstock Type", value: "Underground", formula: "" },
        { parameter: "Penstock Length", value: "80 m (Surge Shaft–Drop Shaft) + 96.97 m (Drop Shaft) + 96.62 m (Inclined Penstock Tunnel)", formula: "formula : L_p" },
        { parameter: "Penstock Internal Diameter", value: "4.6 m", formula: "" },
      ],
      note: "Designed with underground tunneling structures to minimize environmental impact while maintaining optimum hydraulic efficiency."
    },
    powerhouse: {
      title: "Powerhouse",
      icon: FiHome,
      data: [
        { parameter: "Powerhouse Type", value: "Surface Powerhouse", formula: "" },
        { parameter: "Dimensions (L x W x H)", value: "55m x 26.5m x 35.3m", formula: "formula : V = L·W·H" },
        { parameter: "Design Tailwater Level", value: "644.5 masl", formula: "" },
        { parameter: "Tailrace Tunnels", value: "2 nos., 94.30 m long, 5.5m x 3.45m each", formula: "" },
      ],
      note: "Houses state-of-the-art control units and multi-stage generating equipment engineered for high-head operational efficiency."
    },
    turbine: {
      title: "Turbine & Generator",
      icon: FiCpu,
      data: [
        { parameter: "Turbine Type", value: "Vertical Axis Francis", formula: "" },
        { parameter: "Number of Units", value: "2 Units", formula: "" },
        { parameter: "Rated Output per Unit", value: "47.845 MW", formula: "" },
        { parameter: "Installed Capacity", value: "95.7 MW", formula: "" },
        { parameter: "Rated Efficiency", value: "NULL", formula: "formula : η_overall" },
        { parameter: "Generator Output", value: "NULL", formula: "formula : S = P / PF" },
      ],
      note: "Vertical axis Francis turbines selected for the project's head and discharge conditions."
    },
    evacuation: {
      title: "Power Evacuation",
      icon: FiShare2,
      data: [
        { parameter: "Transmission Voltage", value: "TBD — not provided for Dudhkoshi-2", formula: "" },
        { parameter: "Interconnection Point", value: "TBD — not provided for Dudhkoshi-2", formula: "" },
        { parameter: "Transmission Line Length", value: "TBD — not provided for Dudhkoshi-2", formula: "formula : L_line" },
      ],
      note: "Power evacuation details for this project have not yet been provided by the client — placeholder values above must be replaced before publishing."
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
      id="projectOverview"
    >
      <div className="max-w-[1438px] mx-auto">
        
          <div className="text-center max-w-3xl mx-auto mb-16">


          <StyledSubHeadingWithPill text="Project Overview"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="font-['Manrope'] font-bold text-[32px] leading-[44px] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4">
Project Overview
          </h2>

          {/* Subtitle */}
          <p className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]">
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
                      <span style={{letterSpacing:"0.6px"}} className="font-libertinus sm:col-span-4 font-bold text-[11px] tracking-tighter text-[#8E8E93] text-left sm:text-right">
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