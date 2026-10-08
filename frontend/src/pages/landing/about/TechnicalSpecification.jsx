import React from 'react';
import Accordion from './Accordion';
import { BiWater } from "react-icons/bi";
import { ImPower } from "react-icons/im";
import { IoCarOutline, IoWaterOutline } from "react-icons/io5";
import technicalSpecificationIMG from "../../../../public/landing/realImage/9.png";
// import technicalSpecificationIMG from "../../../../public/landing/aboutUsTechnicalSpecification.png";
import Image from 'next/image';
import SpatialConstraintsSection from './SpatialConstraintsSection';
import MissionStrategySection from './MissionStrategySection';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
// import StatsBanner from './StatsBanner';
import StyledSubHeadingWithPill from '../components/StyledSubHeadingWithPill';
import { MdOutlineWater } from 'react-icons/md';
import { HiOutlineClock } from 'react-icons/hi';
import { LiaMountainSolid } from 'react-icons/lia';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { BsHouseGearFill } from 'react-icons/bs';

export default async function TechnicalSpecification({footerData}) {
  // Accordion Data Array (Easily add more items to test scrollability)
  let data = null;
  const BaseUrl = process.env.BASE_CONTENT_URL;
  const BASE_API = process.env.BASE_API;


const iconMap = {
  ImPower,
  MdOutlineWater,
  IoWaterOutline,
  HiOutlineClock,
  LiaMountainSolid,
  IoCarOutline,
  RiLightbulbFlashLine,
  BsHouseGearFill,
};



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

  try {
      const res = await fetch(`${BASE_API}/api/admin/aboutus/technicalspc`,
        {
          cache: "no-store",
        }
      )
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const json = await res.json()
      data = json?.data
  } catch (error) {
console.log(error)
    return <div className='text-[19px] text-center p-[12px] heroSection'>Some Content Could Not be Loaded. </div>
  }


  return (
    <>
    <section 
      className="w-full aboutUsBg py-16 px-4 sm:px-6 lg:px-8 antialiased"
      id="aboutUs"
    >
      <div className="max-w-[1438px] mx-auto">
        
        {/* Top Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">


          <StyledSubHeadingWithPill text="About us"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="font-['Manrope'] font-bold text-[32px] leading-[44px] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4" >
            Empowering Nepal With <br className="hidden sm:inline" /> Clean Hydropower Solutions
          </h2>

          {/* Subtitle */}
          <p className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]" >
           {footerData?.aboutUsPara}
          </p>
        </div>

        {/* Section Label */}
        <div className="mb-4">
             <HrLineWithHeadingText text="   TECHNICAL SPECIFICATION"></HrLineWithHeadingText>

        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[45px] items-stretch" >
          
          {/* Left Column: Blue Feature Card (4 cols on lg screens) */}
          <div className="lg:col-span-4 bg-[var(--landingPagePrimaryColor)] text-white rounded-3xl p-10 flex flex-col justify-between shadow-sm" data-aos="zoom-in">
           
              <p className="font-['Manrope'] font-bold font-[900px] text-[16px] leading-[20px] tracking-[0px] align-middle text-white uppercase mb-3">
               {data?.[0]?.title}
              </p>
              <h3 className="font-['Manrope'] font-[500px] text-[24px] leading-[64px] tracking-[0%] mb-4"  >
              {data?.[0]?.title2}
              </h3>
              <p className="text-[20px] text-white leading-relaxed font-normal">
                {data?.[0]?.title3}
              </p>
            

            {/* Dam Image Thumbnail */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-inner border border-white/20 h-44">
              <Image 
                src={data?.[0]?.image ? `${BaseUrl}/${data?.[0]?.image}` : null}
                width={400}
                height={400}
                 loading="lazy"
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
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between" data-aos="flip-up">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-6">
            
                    {(() => {
  const Icon = iconMap[data?.[1]?.icon];
  return Icon ? <Icon className="w-5 h-5 fill-[#175F8C]" /> : null;
})()}

                    
                  </div>
                  <p className="text-base font-bold text-[var(--textColorOnLightBg)] leading-5 tracking-normal">{data?.[1]?.title}</p>
                  <p className="font-[Manrope] text-[32px] font-normal leading-[33px] tracking-normal text-[var(--landingPageTertiaryColor)] mt-[16px]">
                   {data?.[1]?.title2} 
                   {/* <span className="font-[Manrope] text-[32px] font-normal leading-[33px] tracking-normal align-middle text-[#45484D]">MW</span> */}



                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E9F2F8]">
                  <span className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-normal align-middle text-[var(--landingPagePrimaryColor)] uppercase" >
                 {data?.[1]?.title3}
                  </span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between" data-aos="flip-up">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-6" data-aos="flip-up">
      
      {(() => {
  const Icon = iconMap[data?.[2]?.icon];
  return Icon ? <Icon className="w-5 h-5 fill-[#175F8C]" /> : null;
})()}

                  </div>
                  <p className="text-base font-bold text-[var(--textColorOnLightBg)] leading-5 tracking-normal">{data?.[2]?.title}</p>
                  <p className="number-animation animate--50 font-[Manrope] text-[32px] font-normal leading-[33px] tracking-normal align-middle text-[var(--landingPageTertiaryColor)] mt-[16px]">
                    {data?.[2]?.title2}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E9F2F8]">
                  <span className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-normal align-middle text-[var(--landingPagePrimaryColor)] uppercase">
              {data?.[2]?.title3}
                  </span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between" data-aos="flip-up">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FFF8E7] flex items-center justify-center text-amber-500 mb-6">
                                        {(() => {
  const Icon = iconMap[data?.[3]?.icon];
  return Icon ? <Icon className="w-5 h-5 fill-[#175F8C]" /> : null;
})()}

                  </div>
                  <p className="text-base font-bold text-[var(--textColorOnLightBg)] leading-5 tracking-normal">{data?.[3]?.title}</p>
                  <p className="font-[Manrope] text-[32px] font-normal leading-[33px] tracking-normal text-[var(--landingPageTertiaryColor)] mt-[16px]">
                    {data?.[3]?.title2}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E9F2F8]">
                  <span className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-normal align-middle text-[var(--landingPagePrimaryColor)] uppercase">
                    {data?.[3]?.title3}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Card: Unshakable Foundations + Accordion Component */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center" data-aos="zoom-in-down">
              
              {/* Left text inside bottom card */}
              <div className="md:col-span-5">
                <span className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-normal align-middle text-[var(--landingPagePrimaryColor)] uppercase">EST {footerData?.estd}</span>
                <h4 className="font-[Manrope] text-[24px] font-bold leading-[40px] tracking-normal align-middle text-[var(--textColorOnLightBg)] mt-2 mb-3">
                  Unshakable Foundations
                </h4>
                <p className="font-[Hind] text-[14px] font-normal leading-[20px] tracking-normal align-middle text-[var(--primaryTextColorLanding)]">
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
    <SpatialConstraintsSection footerData={footerData}></SpatialConstraintsSection>
    <MissionStrategySection footerData={footerData}></MissionStrategySection>
    {/* <StatsBanner></StatsBanner> */}
    </>
  );
}