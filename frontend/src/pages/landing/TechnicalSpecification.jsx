'use client';

import { useState, useEffect } from 'react';
import { 
  FiTrendingUp, FiCpu, FiDroplet, 
  FiChevronDown, FiChevronUp, FiLayers, FiActivity,
  FiShield, FiInfo
} from 'react-icons/fi';
import { ImPower } from "react-icons/im";

import SectionBadge from '../../components/reusable/HeadingAndPara/SectionBage';
import MainHeading from '../../components/reusable/HeadingAndPara/MainHeading';
import SectionParagraph from '../../components/reusable/HeadingAndPara/SectionParagraph';

export default function TechnicalSpecifications() {
  // Accordion active state tracking (null or index)
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [badgeStyles, setBadgeStyles] = useState({});

  // Generate clean pastel random color configurations on initial mount
  useEffect(() => {
    const colorPalettes = [
      { bg: 'rgba(34, 197, 94, 0.1)', text: '#16a34a' },   // Emerald Green
      { bg: 'rgba(14, 165, 233, 0.1)', text: '#0284c7' },  // Sky Blue
      { bg: 'rgba(139, 92, 246, 0.1)', text: '#7c3aed' },  // Purple
      { bg: 'rgba(6, 182, 212, 0.1)', text: '#0891b2' },   // Cyan
      { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706' },  // Amber
    ];

    const getRandomPalette = () => colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    
    setBadgeStyles({
      nominal: getRandomPalette(),
      verified: getRandomPalette(),
      calculated: getRandomPalette(),
      optimal: getRandomPalette()
    });
  }, []);

  const topCards = [
    {
      icon: <ImPower className="text-xl" style={{ color: 'var(--color-primary)' }} />,
      label: 'INSTALLED CAPACITY',
      status: 'NOMINAL',
      statusKey: 'nominal',
      value: '21.40',
      unit: 'MW',
      subLabel: 'megawatts',
      formula: 'P = ρ · g · Q · H_n · η'
    },
    {
      icon: <FiTrendingUp className="text-xl" style={{ color: 'var(--color-secondary)' }} />,
      label: 'GROSS HEAD',
      status: 'VERIFIED',
      statusKey: 'verified',
      value: '690.10',
      unit: 'm',
      subLabel: 'meters',
      formula: 'H_g = z_intake - z_powerhouse'
    },
    {
      icon: <FiActivity className="text-xl" style={{ color: 'var(--color-accent)' }} />,
      label: 'NET HEAD',
      status: 'CALCULATED',
      statusKey: 'calculated',
      value: '679.92',
      unit: 'm',
      subLabel: 'meters',
      formula: 'H_n = H_g - Σ h_f'
    },
    {
      icon: <FiDroplet className="text-xl" style={{ color: 'var(--color-primary-dark)' }} />,
      label: 'DESIGN DISCHARGE',
      status: 'OPTIMAL',
      statusKey: 'optimal',
      value: '3.6',
      unit: 'm³/s',
      subLabel: 'cubic meters/sec',
      formula: 'Q = A · v'
    }
  ];

  const accordionData = [
    {
      title: 'Scheme & Capacity',
      icon: <FiZap className="text-lg text-sky-500" />,
      content: (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">TYPE OF SCHEME</span><span className="font-bold text-[var(--text-secondary)]">Run-of-River</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">INSTALLED CAPACITY</span><span className="font-bold text-[var(--text-secondary)]">21.40 MW</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">DESIGN DISCHARGE</span><span className="font-bold text-[var(--text-secondary)]">3.60 m³/s</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">GROSS HEAD</span><span className="font-bold text-[var(--text-secondary)]">690.10 m</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">NET HEAD AT DESIGN DISCHARGE</span><span className="font-bold text-[var(--text-secondary)]">679.92 m</span></div>
          <div className="mt-4 p-4 rounded-xl bg-sky-50/50 border border-sky-100 text-xs text-[var(--text-muted)] flex gap-2">
            <FiInfo className="text-sky-500 text-base flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-sky-600 font-bold"># NOTE:</strong> The exceptionally high head allows significant power generation with a relatively modest water discharge, minimizing environmental footprint while maximizing energy output.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Water Conveyance System',
      icon: <FiDroplet className="text-lg text-cyan-500" />,
      content: (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">APPROACH CULVERT LENGTH</span><span className="font-bold text-[var(--text-secondary)]">145 m</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">SETTLING BASIN TYPE</span><span className="font-bold text-[var(--text-secondary)]">Surface, Double Chamber Underground</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">HEADRACE TUNNEL LENGTH</span><span className="font-bold text-[var(--text-secondary)]">3,840 m</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">PENSTOCK PIPE DIAMETER</span><span className="font-bold text-[var(--text-secondary)]">1.4 m</span></div>
        </div>
      )
    },
    {
      title: 'Powerhouse',
      icon: <FiLayers className="text-lg text-indigo-500" />,
      content: (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">POWERHOUSE TYPE</span><span className="font-bold text-[var(--text-secondary)]">Surface Structure</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">LOCATION COORD</span><span className="font-bold text-[var(--text-secondary)]">Marsyangdi Valley Floor</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">TAILRACE TYPE</span><span className="font-bold text-[var(--text-secondary)]">Box Culvert to Natural Drainage</span></div>
        </div>
      )
    },
    {
      title: 'Turbine & Generator System',
      icon: <FiCpu className="text-lg text-purple-500" />,
      content: (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">TURBINE TYPE</span><span className="font-bold text-[var(--text-secondary)]">Pelton (Vertical Axis)</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">NUMBER OF UNITS</span><span className="font-bold text-[var(--text-secondary)]">2 Units</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">RATED EFFICIENCY</span><span className="font-bold text-[var(--text-secondary)]">91.5%</span></div>
        </div>
      )
    },
    {
      title: 'Power Evacuation',
      icon: <FiShield className="text-lg text-emerald-500" />,
      content: (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">TRANSMISSION LINE VOLTAGE</span><span className="font-bold text-[var(--text-secondary)]">132 kV</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">INTERCONNECTION POINT</span><span className="font-bold text-[var(--text-secondary)]">NEA Khudi Substation</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-[var(--text-muted)] font-medium">LINE LENGTH</span><span className="font-bold text-[var(--text-secondary)]">9.5 km</span></div>
        </div>
      )
    },
    {
      title: 'Why Nyadi Phidi Matters',
      icon: <FiInfo className="text-lg text-amber-500" />,
      content: (
        <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
          By producing an estimated 129.14 GWh of clean energy annually, this asset direct-feeds clean energy onto the national integrated power grid. It structurally displaces reliance on seasonal import networks and powers localized infrastructure building blocks seamlessly.
        </p>
      )
    }
  ];

  const handleToggle = (index) => {
    // FAQ style logic: toggles off if clicking open panel, otherwise expands selected panel and closes rest
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section className="w-full max-w-[1300px] mx-auto px-6 py-16">
      
      {/* Structural Headers Stack */}
      <div className="flex flex-col items-center">
        <SectionBadge text="TECHNICAL SPECIFICATIONS" />
        <MainHeading text="Project Overview" />
        <SectionParagraph text="Nyadi-Phidi Run-of-River Hydropower Project technical parameters and specifications." />
      </div>

      {/* --- TOP 4 SPEC CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-6">
        {topCards.map((card, idx) => (
          <div 
            key={idx} 
            className="bg-[var(--bg-card)] border border-[var(--border-secondary)] rounded-[var(--radius-md)] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Header row containing icon and status tag */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="p-2 bg-slate-50 border rounded-xl flex items-center justify-center">
                {card.icon}
              </div>
              <span 
                className="text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: badgeStyles[card.statusKey]?.bg || 'rgba(0,0,0,0.05)',
                  color: badgeStyles[card.statusKey]?.text || 'var(--text-muted)'
                }}
              >
                {card.status}
              </span>
            </div>

            {/* Main Value Display */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                {card.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[var(--primaryTextColor)] tracking-tight">
                  {card.value}
                </span>
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {card.unit}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                {card.subLabel}
              </span>
            </div>

            {/* Metric Mathematical Definition Field Box */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                Formula
              </span>
              <div className="font-mono text-xs bg-slate-50/80 px-2 py-1.5 rounded border border-slate-100 text-slate-600 overflow-x-auto select-all">
                {card.formula}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- EXCLUSIVE TOGGLE FAQ SYSTEM --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {accordionData.map((item, idx) => {
          const isOpen = activeAccordion === idx;
          return (
            <div 
              key={idx}
              className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden shadow-sm transition-all duration-200"
            >
              {/* Header Handle Button */}
              <button
                onClick={() => handleToggle(idx)}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-[var(--primaryTextColor)] bg-white/70 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                    {item.icon}
                  </div>
                  <span className="font-black text-[15px]">{item.title}</span>
                </div>
                <div className="text-slate-400 text-base">
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </button>

              {/* Dynamic Content Tray Body */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[500px] opacity-100 border-t border-slate-100/80' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-white">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}