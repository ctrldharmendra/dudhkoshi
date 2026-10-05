import React from 'react';
import { FiArrowRight, FiZap, FiDroplet, FiUsers, FiSun } from 'react-icons/fi';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import Image from 'next/image';
// import missionStrategyIMG from "../../../../public/landing/realImage/3.jpeg";
import missionStrategyIMG from "../../../../public/landing/about/rectangularHeroMain2.jpg";

export default function MissionStrategySection({ footerData }) {
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
      <div className="max-w-[1438px] mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading, Subtext, and Diagram Frame (5 Cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            
            {/* Top Heading Group */}
            <div>
   <HrLineWithHeadingText text="OUR MISSION & STRATEGY"></HrLineWithHeadingText>

              <h2 className="text-2xl text-[24px] font-bold text-[#45484D] leading-tight mb-6">
                Deliver reliable renewable energy through sustainable hydropower development for Nepal’s future growth.
              </h2>

              <p className="font-[Hind] font-normal text-[16px] leading-[20px] tracking-[0px] align-middle text-[var(--primaryTextColorLanding)] mb-8">
                We believe in power that respects the planet. Our strategy integrates technical excellence with deep social responsibility to create a resilient energy ecosystem.
              </p>
            </div>

            {/* Graphic Illustration Card Frame */}
            <div className="bg-[#DDECF5]/90 p-5 rounded-[32px] border border-white/90 shadow-inner"  data-aos="fade-up"
     data-aos-duration="4000">

              <div className="bg-[#EBF2F7] relative rounded-2xl p-6 shadow-sm overflow-hidden border border-white flex flex-col justify-between min-h-[300px]">
<Image  src={missionStrategyIMG} width={100} height={100} className="absolute hidden lg:flex  w-full rounded-[9px] top-0 left-0 z-0" alt="mountains"  unoptimized/>
                
                {/* Upper Diagram Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center z-[12]" >
                  <div>
                    <h4 className="text-[18px] font-bold text-[black] leading-snug">
                      Deliver reliable <br />
                      <span className="text-[#0972f6]  relative inline-block font-bold  after:absolute after:left-0 after:bottom-0 after:w-[31px] after:h-[2px] after:bg-[#0972f6] after:opacity-100 ">
                        renewable energy
                      </span>
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-2 leading-tight">
                      through sustainable hydropower development for Nepal's future growth.
                    </p>
                  </div>


                </div>

                {/* Bottom Metric Badges */}
                <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-200/60 z-[12]">
                  <div className="bg-white/80 p-2 rounded-xl flex items-center gap-2 border border-gray-100">
                    <div className="w-7 h-7 rounded-lg bg-[#0972f6] flex items-center justify-center text-white text-xs shrink-0">
                      <FiZap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#0972f6]">{footerData?.mw|| ""}</p>
                      <p className="text-[11px] text-gray-500 leading-none">Clean Energy</p>
                    </div>
                  </div>

                  <div className="bg-white/80 p-2 rounded-xl flex items-center gap-2 border border-gray-100">
                    <div className="w-7 h-7 rounded-lg bg-[#0972f6] flex items-center justify-center text-white text-xs shrink-0">
                      <FiDroplet className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#0972f6]">{footerData?.c02Reduced|| ""}</p>
                      <p className="text-[11px] text-gray-500 leading-none">CO₂ Reduced</p>
                    </div>
                  </div>

                  <div className="bg-white/80 p-2 rounded-xl flex items-center gap-2 border border-gray-100">
                    <div className="w-7 h-7 rounded-lg bg-[#0972f6] flex items-center justify-center text-white text-xs shrink-0">
                      <FiUsers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#0972f6]">Stronger Nepal</p>
                      <p className="text-[11px] text-gray-500 leading-none">Sustainable Future</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: 3 Stacked Strategy Cards (7 Cols on lg) */} 
          <div className="lg:col-span-7 flex flex-col gap-5"  >
            {cardsData.map((card, idx) => (
              <div 
                key={idx}
                className="bg-[var(--lightWhite)] transition-all duration-200 rounded-3xl p-7 md:p-8 border border-[#E9F2F8]/50 shadow-xs flex flex-col justify-between min-h-[170px]" data-aos="fade-left"
              >
                <div>
                  <span className="font-[Hind] font-medium text-[16px] leading-[20px] tracking-[0px] align-middle uppercase text-[var(--landingPagePrimaryColor)] block mb-2">
                    {card.number}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#334155] mb-3">
                    {card.title}
                  </h3>
                  <p className="font-[Hind] font-normal text-[16px] leading-[20px] tracking-[0px] align-middle text-[var(--textColorOnLightBg)] mb-5">
                    {card.description}
                  </p>
                </div>

                <div>
                  <a 
                    href={card.linkUrl}
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-[500px] text-[var(--landingPagePrimaryColor)]  group"
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