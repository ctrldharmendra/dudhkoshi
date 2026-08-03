import React from 'react';
import { FiArrowRight, FiZap, FiDroplet, FiUsers, FiSun } from 'react-icons/fi';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';

export default function MissionStrategySection() {
  const cardsData = [
    {
      number: "01",
      title: "Deliver Sustainable Clean Energy",
      description: "Our journey began with a commitment to integrity. Every project is planned and executed with precision, ensuring a bedrock for long-term economic and environmental security.",
      linkText: "Explore Project Standards",
      linkUrl: "#"
    },
    {
      number: "02",
      title: "Build with Excellence & Innovation",
      description: "Our journey began with a commitment to integrity. Every project is planned and executed with precision, ensuring a bedrock for long-term economic and environmental security.",
      linkText: "View Details",
      linkUrl: "#"
    },
    {
      number: "03",
      title: "Empower Communities & Create Value",
      description: "To support local employment, uplift surrounding communities, and create long-term economic value for stakeholders, partners, and the nation.",
      linkText: "Comunity Impact Report",
      linkUrl: "#"
    }
  ];

  return (
    <section 
      className="w-full missionStrategyBg py-20 px-4 sm:px-6 lg:px-8  antialiased text-[#45484D]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading, Subtext, and Diagram Frame (5 Cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            
            {/* Top Heading Group */}
            <div>
   <HrLineWithHeadingText text="MISSION & STRATEGY"></HrLineWithHeadingText>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#334155] leading-tight mb-6">
                Deliver reliable renewable energy through sustainable hydropower development for Nepal’s future growth.
              </h2>

              <p className="text-xs sm:text-sm text-[var(--landingPageSecondaryColor)] leading-relaxed font-normal mb-8">
                We believe in power that respects the planet. Our strategy integrates technical excellence with deep social responsibility to create a resilient energy ecosystem.
              </p>
            </div>

            {/* Graphic Illustration Card Frame */}
            <div className="bg-[#BFCFD8]/60 p-5 rounded-[32px] border border-white/30 shadow-inner">
              <div className="bg-[#EBF2F7] rounded-2xl p-6 shadow-sm border border-white flex flex-col justify-between min-h-[300px]">
                
                {/* Upper Diagram Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <h4 className="text-xs font-bold text-[#1E7EBB] leading-snug">
                      Deliver reliable <br />
                      <span className="text-[#1E7EBB] border-b-2 border-[#1E7EBB] pb-0.5 inline-block">
                        renewable energy
                      </span>
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-2 leading-tight">
                      through sustainable hydropower development for Nepal's future growth.
                    </p>
                  </div>

                  {/* Circular Icon Ecosystem Graphic */}
                  <div className="relative flex items-center justify-center h-36 w-36 mx-auto">
                    {/* Concentric Ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#1E7EBB]/40"></div>
                    
                    {/* Center Icon */}
                    <div className="w-16 h-16 rounded-full bg-[#1E7EBB] flex items-center justify-center text-white shadow-md z-10">
                      <FiDroplet className="w-8 h-8" />
                    </div>

                    {/* Orbiting Satellite Icons */}
                    <div className="absolute -top-1 bg-white p-1.5 rounded-full shadow-xs border border-blue-100 text-[#1E7EBB]">
                      <FiDroplet className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute -right-1 bg-white p-1.5 rounded-full shadow-xs border border-blue-100 text-amber-500">
                      <FiZap className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute -bottom-1 bg-white p-1.5 rounded-full shadow-xs border border-blue-100 text-[#1E7EBB]">
                      <FiUsers className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute -left-1 bg-white p-1.5 rounded-full shadow-xs border border-blue-100 text-emerald-500">
                      <FiSun className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Metric Badges */}
                <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-200/60">
                  <div className="bg-white/80 p-2 rounded-xl flex items-center gap-2 border border-gray-100">
                    <div className="w-7 h-7 rounded-lg bg-[#1E7EBB] flex items-center justify-center text-white text-xs shrink-0">
                      <FiZap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#1E7EBB]">850+ MW</p>
                      <p className="text-[8px] text-gray-500 leading-none">Clean Energy</p>
                    </div>
                  </div>

                  <div className="bg-white/80 p-2 rounded-xl flex items-center gap-2 border border-gray-100">
                    <div className="w-7 h-7 rounded-lg bg-[#1E7EBB] flex items-center justify-center text-white text-xs shrink-0">
                      <FiDroplet className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#1E7EBB]">2.4M tons</p>
                      <p className="text-[8px] text-gray-500 leading-none">CO₂ Reduced</p>
                    </div>
                  </div>

                  <div className="bg-white/80 p-2 rounded-xl flex items-center gap-2 border border-gray-100">
                    <div className="w-7 h-7 rounded-lg bg-[#1E7EBB] flex items-center justify-center text-white text-xs shrink-0">
                      <FiUsers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#1E7EBB]">Stronger Nepal</p>
                      <p className="text-[8px] text-gray-500 leading-none">Sustainable Future</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: 3 Stacked Strategy Cards (7 Cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {cardsData.map((card, idx) => (
              <div 
                key={idx}
                className="bg-[var(--lightWhite)] hover:bg-[#D3DEE8]/90 transition-all duration-200 rounded-3xl p-7 md:p-8 border border-white/50 shadow-xs flex flex-col justify-between min-h-[170px]"
              >
                <div>
                  <span className="text-xs font-bold text-[var(--landingPagePrimaryColor)] block mb-2">
                    {card.number}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#334155] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--textColorOnLightBg)] leading-relaxed font-normal mb-5">
                    {card.description}
                  </p>
                </div>

                <div>
                  <a 
                    href={card.linkUrl}
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[var(--landingPagePrimaryColor)] hover:underline group"
                  >
                    <span>{card.linkText}</span>
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}