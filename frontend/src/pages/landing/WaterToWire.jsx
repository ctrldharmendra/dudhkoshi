'use client';

import { useState, useEffect } from 'react';
import { 
  FiGitCommit, FiLayers, FiShield, FiCpu, 
  FiArrowRight, FiChevronDown, FiChevronUp 
} from 'react-icons/fi';
import SectionBadge from '../../components/reusable/HeadingAndPara/SectionBage';
import MainHeading from '../../components/reusable/HeadingAndPara/MainHeading';
import SectionParagraph from '../../components/reusable/HeadingAndPara/SectionParagraph';
import { FaNetworkWired } from 'react-icons/fa';


export default function WaterToWireSystem() {
  // Set HEADWORKS (index 0) active by default as shown in image_5e5583.jpg
  const [activeNode, setActiveNode] = useState(0);
  const [badgeColors, setBadgeColors] = useState([]);

  // Generate random pastel colors on component mount
  useEffect(() => {
    const randomPalettes = Array.from({ length: 6 }, () => {
      const hues = [200, 180, 260, 140, 35]; // Sky, Cyan, Indigo, Emerald, Amber
      const chosenHue = hues[Math.floor(Math.random() * hues.length)];
      return {
        bg: `hsla(${chosenHue}, 90%, 45%, 0.08)`,
        text: `hsla(${chosenHue}, 90%, 35%, 1)`,
        border: `hsla(${chosenHue}, 90%, 45%, 0.15)`
      };
    });
    setBadgeColors(randomPalettes);
  }, [activeNode]); // Regenerates on change as requested

  const systemNodes = [
    {
      id: '01',
      title: 'HEADWORKS',
      spec: 'Boulder Lined Weir',
      desc: 'Diversion, intake & settling',
      icon: <FaNetworkWired  />,
      components: [
        { name: 'DIVERSION WEIR', val: 'Boulder Lined, 15 m' },
        { name: 'SPILLWAY', val: 'Free overflow, 2.5 m × 2.5 m' },
        { name: 'INTAKE', val: 'Side Intake, 2 nos, 2.0 m × 1.6 m' },
        { name: 'APPROACH CULVERT', val: 'RCC, 100 m, 1.6 m × 1.5 m' },
        { name: 'APPROACH DIVERGED', val: 'RCC, 2 nos, 28 m, 1.1 m × 1.5 m' },
        { name: 'SETTLING BASIN', val: 'Double Bay, 35.0 m × 6.5 m × 3.9 m' },
        { name: 'HEADRACE CULVERT', val: 'RCC, 61.5 m × 1.6 m × 1.5 m' }
      ]
    },
    {
      id: '02',
      title: 'HEADRACE TUNNEL',
      spec: '2,020 m',
      desc: 'Inverted D-shaped • 2.2 m x 2.5 m',
      icon: <FiGitCommit />,
      components: [
        { name: 'EXCAVATION TYPE', val: 'Drill & Blast Method (DBM)' },
        { name: 'ROCK SUPPORT', val: 'Shotcrete with local rock bolting' },
        { name: 'LINING STRUCT', val: 'Inverted concrete pavement bedding' }
      ]
    },
    {
      id: '03',
      title: 'SURGE SHAFT',
      spec: '25 m',
      desc: 'Simple cylindrical • Ø 4.5 m',
      icon: <FiCpu />,
      components: [
        { name: 'SHAFT TYPE', val: 'Restricted Orifice Surge Tank' },
        { name: 'SURGE STRUCTURE', val: 'Reinforced Concrete Underground Lining' }
      ]
    },
    {
      id: '04',
      title: 'PENSTOCK',
      spec: '1,490 m',
      desc: 'Steel • Ø 1.2 m (before bifurcation)',
      icon: <FiShield />,
      components: [
        { name: 'MATERIAL SELECTION', val: 'High-tensile structural structural steel' },
        { name: 'BIFURCATION MANIFOLD', val: 'Dual branching branch to twin Pelton setups' }
      ]
    }
  ];

  const bottomNodes = [
    {
      id: '05',
      title: 'POWERHOUSE',
      spec: 'Surface',
      desc: '28.85 m × 19.50 m × 14.65 m',
      icon: <FiLayers />,
      colorClass: 'text-indigo-500 bg-indigo-50'
    },
    {
      id: '06',
      title: 'GRID CONNECTION',
      spec: '132 kV',
      desc: '19 km • BEAR conductor • Tarikuna NEA Hub',
      icon: <FiGitCommit />,
      colorClass: 'text-emerald-500 bg-emerald-50'
    }
  ];

  return (
    <section className="w-full max-w-[1300px] mx-auto px-6 py-16 ">
      
      {/* Dynamic Schematic Headers */}
      <div className="flex flex-col items-center text-center" >
        <SectionBadge text="SYSTEM BLOCK SCHEMATIC" />
        <MainHeading text="Water-to-Wire System" />
        <SectionParagraph text="System flow diagram • Key equipment parameters and dimension tracking matrices." />
      </div>

      {/* Main Schematic Terminal Blueprint Box */}
      <div className="w-full border border-slate-200/80 rounded-2xl shadow-sm p-6 md:p-8 mt-6" >
        
        {/* Section Tag 1: Upper Flow */}
        <div className="text-[10px] font-black tracking-widest text-sky-600 uppercase mb-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          WATER INTAKE & CONVEYANCE
        </div>

        {/* --- FLOW GRID SECTION 1 --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center relative" >
          {systemNodes.map((node, idx) => {
            const isSelected = activeNode === idx;
            const currentTheme = badgeColors[idx] || { bg: '#f1f5f9', text: '#334155', border: '#e2e8f0' };

            return (
              <div key={idx} className="flex items-center w-full group relative" data-aos="zoom-out">
                
                {/* Core Interactive Node Wrapper Card */}
                <div 
                  onClick={() => setActiveNode(isSelected ? null : idx)}
                  className={`w-full p-5 rounded-xl border text-center cursor-pointer transition-all duration-200 select-none ${
                    isSelected 
                      ? 'bg-white border-sky-500 shadow-md ring-2 ring-sky-500/10' 
                      : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Hexagon style round structural badge identifier placeholder */}
                  <div 
                    className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-lg mb-3 transition-colors border" 
                    style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, borderColor: currentTheme.border }}
                  >
                    {node.icon}
                  </div>

                  {/* Operational Index Marker Tag */}
                  <span className="text-[12px] font-mono tracking-wider text-slate-400 block mb-1">
                    {node.id}
                  </span>

                  <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest">
                    {node.title}
                  </h3>
                  
                  <div className="text-base font-black text-[var(--primaryTextColor)] mt-1 tracking-tight">
                    {node.spec}
                  </div>
                  
                  <p className="text-[13px] text-[var(--text-muted)] mt-1 line-clamp-1 font-medium">
                    {node.desc}
                  </p>

                  {/* Dropdown status toggler visual hint */}
                  <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-center gap-1 text-[14px] font-bold text-sky-600" >
                    <span>Components</span>
                    {isSelected ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>

                {/* Horizontal flow track pointer chevron spacer (Hidden on mobile cascades) */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 text-slate-300 text-sm pointer-events-none">
                    <FiArrowRight />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* --- DYNAMIC LOWER NESTED SUBCOMPONENTS DRAWER PANEL --- */}
        {activeNode !== null && systemNodes[activeNode]?.components && (
          <div className="mt-6 p-5 rounded-xl bg-[var(--bg-lighter)] border border-slate-100 transition-all duration-300">
            <div className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-3">
              {systemNodes[activeNode].title} COMPONENT SUB-SYSTEM ARCHITECTURE
            </div>
            
            {/* Grid display layout containing inline properties mapping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {systemNodes[activeNode].components.map((comp, cIdx) => (
                <div 
                  key={cIdx} 
                  className="bg-[var(--bg-light)] border border-slate-100 p-3.5 rounded-lg flex flex-col justify-between"
                >
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block">
                    {comp.name}
                  </span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-tight">
                    {comp.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ELEVATION INTERMEDIATE CAP ACCENT SEPARATOR GRID LINK --- */}
        <div className="my-8 flex justify-center w-full">
          <div className="inline-flex items-center gap-2 bg-indigo-50/70 border border-indigo-100/80 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
            690.10 m elevation drop
          </div>
        </div>

        {/* Section Tag 2: Lower Flow Generation Layout */}
        <div className="text-[10px] font-black tracking-widest text-indigo-600 uppercase mb-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          GENERATION & POWER EVACUATION
        </div>

        {/* --- FLOW GRID SECTION 2 --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl relative">
          {bottomNodes.map((node, idx) => (
            <div key={idx} className="flex items-center w-full relative">
              <div className="w-full p-5 bg-white border border-slate-100 rounded-xl flex items-start gap-4 shadow-sm">
                
                {/* Structural left element circle */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-slate-100 ${node.colorClass}`}>
                  {node.icon}
                </div>

                <div>
                  <span className="text-[9px] font-mono text-slate-400 block">
                    {node.id}
                  </span>
                  <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    {node.title}
                  </h3>
                  <div className="text-base font-black text-[var(--primaryTextColor)] tracking-tight">
                    {node.spec}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 font-medium leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>

              {/* Central connecting pointer */}
              {idx === 0 && (
                <div className="hidden md:flex absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 text-slate-300 text-sm pointer-events-none">
                  <FiArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- METRIC BASELINE ATTRIBUTE FOOTER ROW STRIP --- */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-baseline sm:justify-between gap-y-4">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
              TOTAL ELEVATION DROP
            </span>
            <div className="text-xl font-black text-slate-800 tracking-tight mt-0.5">
              690.10 <span className="text-xs font-bold text-slate-500">m</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
              PROJECT COORDINATES
            </span>
            <span className="font-mono text-xs text-slate-600 block mt-0.5 font-semibold">
              28°24'27"–28°26'12"N • 84°30'10"–84°31'43"E
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}