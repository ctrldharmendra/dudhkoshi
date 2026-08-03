import React from 'react';
import Accordion from './Accordion';
import { FiZap, FiAirplay, FiDroplet } from 'react-icons/fi';
import technicalSpecificationIMG from "../../../../public/landing/aboutUsTechnicalSpecification.png";
import Image from 'next/image';
import SpatialConstraintsSection from './SpatialConstraintsSection';
import MissionStrategySection from './MissionStrategySection';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import StatsBanner from './StatsBanner';
import StyledSubHeadingWithPill from '../components/StyledSubHeadingWithPill';

export default function TechnicalSpecification() {
  // Accordion Data Array (Easily add more items to test scrollability)
  const accordionData = [
    {
      title: "TRANSPARENCY",
      content: "Investors, lenders, regulators, and communities get a clearer view of progress and project direction."
    },
    {
      title: "ACCOUNTABILITY",
      content: "We uphold rigorous internal checks and governance standards across all phases of engineering and operations."
    },
    {
      title: "ETHICAL VIEWS",
      content: "Prioritizing local communities and environmental sustainability in every strategic decision we take."
    },
    {
      title: "SUSTAINABILITY",
      content: "Minimizing ecological footprint while maximizing clean renewable energy output for long-term impact."
    }
  ];

  return (
    <>
    <section 
      className="w-full bg-[#F5FAFF] py-16 px-4 sm:px-6 lg:px-8 antialiased"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* About Us Pill Header */}
          {/* <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#1E7EBB]/30"></span>
            <span className="w-2 h-2 rounded-full bg-[var(--landingPagePrimaryColor)]"></span>
            <span className="border border-[var(--landingPagePrimaryColor)] text-[var(--landingPagePrimaryColor)] text-xs font-semibold px-4 py-1.5 rounded-full bg-white shadow-xs">
              About us 
            </span>
            <span className="w-2 h-2 rounded-full bg-[var(--landingPagePrimaryColor)]"></span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#1E7EBB]/30"></span>
          </div> */}

          <StyledSubHeadingWithPill text="About us"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--landingPageColorPrimary2)] tracking-tight leading-tight mb-4">
            Empowering Nepal With <br className="hidden sm:inline" /> Clean Hydropower Solutions
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-[var(--textColorOnLightBg)] leading-relaxed">
            Dudhkhoshi Hydropower Nepal Pvt. Ltd. operates the Dudhkhoshi-2 (Jaleshwor) project a 95.7 MW optimized facility engineered for the highest efficiency and reliability.
          </p>
        </div>

        {/* Section Label */}
        <div className="mb-4">
             <HrLineWithHeadingText text="   TECHNICAL SPECIFICATION"></HrLineWithHeadingText>

        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Blue Feature Card (4 cols on lg screens) */}
          <div className="lg:col-span-4 bg-[var(--landingPagePrimaryColor)] text-white rounded-3xl p-8 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-[11px] font-bold tracking-wider text-white/80 uppercase mb-3">
                DUDHKHOSHI HYDROPOWER
              </p>
              <h3 className="text-2xl font-bold mb-4 leading-snug">
                Engineering the Future
              </h3>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                Dudhkhoshi Hydropower Nepal Pvt. Ltd. operates the Dudhkhoshi-2 (Jaleshwor) project a 95.7 MW optimized facility engineered for the highest efficiency and reliability.
              </p>
            </div>

            {/* Dam Image Thumbnail */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-inner border border-white/20 h-44">
              <Image 
                src={technicalSpecificationIMG}
                width={100}
                height={100}
                unoptimized
                alt="Engineering Dam" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Grid of Stats + Foundation Section (8 cols on lg screens) */}
          <div className="lg:col-span-8 flex flex-col gap-6 justify-between">
            
            {/* Top Stat Cards (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Stat 1 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-6">
                    <FiZap className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-[var(--textColorOnLightBg)]">Installed Capacity</p>
                  <p className="text-2xl font-extrabold text-[var(--landingPagePrimaryColor)] mt-2">
                    95.7 <span className="text-base font-medium text-gray-500">MW</span>
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-50">
                  <span className="text-[10px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                    ANNUAL OUTPUT
                  </span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-6">
                    <FiAirplay className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-[var(--textColorOnLightBg)]">Design Discharge</p>
                  <p className="text-2xl font-extrabold text-[var(--landingPagePrimaryColor)] mt-2">
                    83.5 <span className="text-base font-medium text-gray-500">m³/s</span>
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-50">
                  <span className="text-[10px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                    PEAKING ROR
                  </span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FFF8E7] flex items-center justify-center text-amber-500 mb-6">
                    <FiDroplet className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-[var(--textColorOnLightBg)]">Gross Head</p>
                  <p className="text-2xl font-extrabold text-[var(--landingPagePrimaryColor)] mt-2">
                    144.5 <span className="text-base font-medium text-gray-500">M</span>
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-50">
                  <span className="text-[10px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                    HIGH-DROP HYDRO
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Card: Unshakable Foundations + Accordion Component */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left text inside bottom card */}
              <div className="md:col-span-5">
                <span className="text-[10px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                  EST . 2070 B.S.
                </span>
                <h4 className="text-xl font-bold text-[var(--textColorOnLightBg)] mt-2 mb-3">
                  Unshakable Foundations
                </h4>
                <p className="text-xs text-[var(--landingPageSecondaryColor)] leading-relaxed">
                  Our journey is built on a foundation of integrity, where every project is planned and executed with exact precision to create a lasting bedrock for both economic and environmental security.
                </p>
              </div>

              {/* Right side: Reusable Accordion Component */}
              <div className="md:col-span-7">
                <Accordion items={accordionData} />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
    <SpatialConstraintsSection></SpatialConstraintsSection>
    <MissionStrategySection></MissionStrategySection>
    <StatsBanner></StatsBanner>
    </>
  );
}