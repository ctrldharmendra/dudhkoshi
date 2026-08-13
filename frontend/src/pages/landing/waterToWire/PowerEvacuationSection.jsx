import React from 'react';
import { FiZap, FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { GoArrowRight } from 'react-icons/go';

export default function PowerEvacuationSection() {
  const cardsData = [
    {
      id: 'powerhouse',
      title: 'POWERHOUSE',
      subtitle: 'Surface',
      details: '55 M × 26.5 M × 35.3 M',
    },
    {
      id: 'grid-connection',
      title: 'GRID CONNECTION',
      subtitle: "null",
      details: "null", // Power Evacuation data (voltage, line length, conductor, hub) not provided for Dudhkoshi-2
    },
  ];


  return (
    <section 
      className="w-full py-12 font-sans antialiased text-[#45484D]"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <div className="mx-auto">
        
        {/* Main Background Canvas Container with Subtle Grid Pattern */}
        <div className="relative  overflow-hidden">
          
          {/* Subtle Background Radial Grid Pattern */}
          <div 
            className="absolute inset-0 rounded-[32px] pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#1E7EBB 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Canvas Subtitle Header */}
          <h3 className="text-xs sm:text-sm font-bold tracking-wider text-slate-600 uppercase mb-8 relative z-10">
            GENERATION & POWER EVACUATION
          </h3>

          {/* Cards Flow Container */}
          <div className="relative z-10 flex flex-col justify-between md:flex-row items-center justify-center gap-6 md:gap-12 py-2">
            
            {cardsData.map((card, index) => (
              <React.Fragment key={card.id}>
                {/* Individual Component Card */}
                <div className="w-full md:w-[396px] bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
                  
                  {/* Lightning Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4fc] text-[#1E7EBB] flex items-center justify-center mb-5">
                    <FiZap className="w-5 h-5 fill-[#1E7EBB]/20" />
                  </div>

                  {/* Card Title */}
                  <h4 className="text-xs font-bold tracking-wider text-[#1E7EBB] uppercase mb-1.5">
                    {card.title}
                  </h4>

                  {/* Card Subtitle */}
                  <p className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug mb-3">
                    {card.subtitle}
                  </p>

                  {/* Dimension/Details Text */}
                  <p className="text-[11px] sm:text-xs font-semibold text-[#1E7EBB] tracking-tight">
                    {card.details}
                  </p>

                </div>

                {/* Connecting Arrow between cards */}
                {index < cardsData.length - 1 && (
                  <div className="flex items-center justify-center text-[#1E7EBB] shrink-0 my-2 md:my-0">
                    {/* Horizontal Arrow for Desktop */}
                    <GoArrowRight className="hidden md:block w-[200px] h-7 " />
                    {/* Vertical Arrow for Mobile Devices */}
                    <FiArrowDown className="block md:hidden w-6 h-6 stroke-[2.2]" />
                  </div>
                )}
              </React.Fragment>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}