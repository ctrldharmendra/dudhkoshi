"use client";

import React, { useEffect, useState } from 'react';
import { 
  FiZap, 
  FiDroplet, 
  FiHome, 
  FiCpu, 
  FiShare2 
} from 'react-icons/fi';
import { MdOutlineWater, MdWater } from "react-icons/md";
import StyledSubHeadingWithPill from '../components/StyledSubHeadingWithPill';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import { useDispatch, useSelector } from 'react-redux';
import { getTechnicalParameter } from '@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice';
import Loading from '../components/Loading';
import { HiOutlineCog, HiOutlineLightningBolt } from 'react-icons/hi';
import { IoCarOutline, IoWaterOutline } from 'react-icons/io5';
import { LiaMountainSolid } from 'react-icons/lia';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { BsHouseGearFill } from 'react-icons/bs';


export default function ProjectOverviewSection() {
  const tabs = [
    { id: 'scheme', label: 'Scheme & Capacity', icon: FiZap },
    { id: 'conveyance', label: 'Water Conveyance', icon: MdWater },
    { id: 'powerhouse', label: 'Powerhouse', icon: FiHome },
    { id: 'turbine', label: 'Turbine & Generator', icon: FiCpu },
    { id: 'evacuation', label: 'Power Evacuation', icon: FiShare2 }, ];

  const Icon = {
  lightning: HiOutlineLightningBolt,
  water: MdOutlineWater,
  drop: IoWaterOutline,
  turbine: HiOutlineCog,
  terrain: LiaMountainSolid,
  access: IoCarOutline,
  context: RiLightbulbFlashLine,
  house: BsHouseGearFill,
  };




  const dispatch = useDispatch();
  // Tab Navigation items matching the sample icons & labels
    // -------------------
    const technicalParameterData = useSelector((state) => state?.landingPageAdmmin?.technicalParameters);
    const technicalParametersLoading = useSelector((state) => state?.landingPageAdmmin?.technicalParametersLoading);


    const [activeTab, setActiveTab] = useState(null);

useEffect(() => {
  dispatch(getTechnicalParameter({}));
}, [dispatch]);

useEffect(() => {
  if (technicalParameterData?.length && activeTab === null) {
    setActiveTab(technicalParameterData[0].categoryId);
  }
}, [technicalParameterData, activeTab]);

// console.log(technicalParameterData?.[0]?.categoryId, "technicalParameterData?.[0]?.categoryId")
console.log(activeTab, "activeTab")

    const currentCategory = technicalParameterData?.find(
  (item) => item?.categoryId == activeTab 
);  

const currentContent = currentCategory?.contents || [];

const ContentIcon =
  Icon[currentCategory?.categoryIcon] || FiZap;

const ContentNoteCurrent =
  currentCategory?.categoryNote || "";


     // -------------------
 
        useEffect(() => {
      dispatch(getTechnicalParameter({}))
        }, [])
        // console.log(currentCategory, "currentCategory")
        // console.log(technicalParameterData, "technicalParameterData")
  
  //       categoryIcon
  // categoryId
  // categoryNote
  // categoryTitle
  // its content : 
  // {
  //     "contentId": 7,
  //     "contentTitle": "Installed Capacity",
  //     "contentData": "95.7 MW",
  //     "contentFormula": "P=ρ·g·Q·Hn·η"
  // }
 


  // console.log(currentContent, "currentContent")
  // console.log(ContentIcon, "ContentIcon")
  // console.log(ContentNoteCurrent, "ContentNoteCurrent")


  if(technicalParametersLoading || !currentContent){
  return <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
  <Loading />
</div>
  }
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
          <p className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]" data-aos="fade-up">
Engineering design data and technical specifications for the Dudhkoshi-2 
Run-of-River Hydroelectric Scheme.
          </p >
        </div>

        {/* Technical Parameters Label */}
        <div className="mb-6" >
   <HrLineWithHeadingText text="TECHNICAL PARAMETERS"></HrLineWithHeadingText>

        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" >
          
          {/* LEFT SIDE: TAB NAVIGATION (4 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" data-aos="zoom-in" >
            {technicalParameterData && technicalParameterData?.map((tab) => {
              const isActive = activeTab == tab?.categoryId;
            
             const IconComponent = Icon[tab.categoryIcon] || FiZap;

              return (
                <button 
                  key={tab.categoryId}
      onClick={() => setActiveTab(tab.categoryId)}

                  
                  className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-[6px] text-left font-[Hind] font-[500] text-[16px] sm:text-[14px] leading-[20px] tracking-[0px] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#1E7EBB]  border-slate-100 ring-1 ring-sky-100"
                      : "bg-transparent hover:text-slate-800 hover:bg-slate-200/40 border border-transparent" 
                  }`}
                >
                       <IconComponent
        className={`w-5 h-5 shrink-0 ${
          isActive ? "text-[#1E7EBB]" : "text-slate-500"
        }`}
      />
                  <span className="truncate font-[500]"
                        style={{
                          
    fontWeight: '500',

                        }}
                        >{tab.categoryTitle}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: SPECIFICATIONS CARD (8 Cols on lg) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[5px] border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-300" data-aos="zoom-in" >
              
              {/* Card Header Banner */}
              <div className="projectOverViewCardTopBg px-6 py-4 flex items-center gap-3 border-b border-sky-100" data-aos="zoom-in">
                <div className="w-8 h-8 rounded-lg bg-[#1E7EBB] flex items-center justify-center text-white shrink-0">
                  <ContentIcon className="w-4 h-4" />
          

                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#2C3E50]" >
                  {currentCategory?.categoryTitle || ""}
                </h3>
              </div>

              {/* Data Table Rows */}
              <div className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex flex-col border-b border-slate-100 pb-2" >
                  {currentContent && currentContent?.map((item, index) => (
                    <div 
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-12 items-center py-3 border-b border-slate-100 last:border-0 gap-1 sm:gap-2"
                    >
                      {/* Parameter Name */}
                      <span className="sm:col-span-4 text-[14px] font-medium">
                        {item?.contentTitle || ""}
                      </span>

                      {/* Parameter Value */}
                      <span className="sm:col-span-4 text-xs sm:text-[14px] font-medium text-slate-800">
                        {item?.contentData || ""}
                      </span>

                      {/* Formula (Italicized style matching image) */}
                      <span style={{letterSpacing:"0.6px"}} className="font-libertinus sm:col-span-4 font-medium font-stretch-extra-expanded text-[14px] tracking-tighter text-[#8E8E93] sm:text-left">
                        {item?.contentFormula || ""}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Note Section */}
                {ContentNoteCurrent && (
                  <div className="pt-2 flex items-start gap-2 text-[15px]  text-slate-500 leading-relaxed font-normal">
                    <span className="font-bold text-slate-700 shrink-0">Note :</span>
                    <p>{ContentNoteCurrent || ""}</p>
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