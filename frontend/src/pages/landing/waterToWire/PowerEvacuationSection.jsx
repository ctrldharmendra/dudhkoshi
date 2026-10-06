import React, { useEffect } from 'react';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { ImPower } from "react-icons/im";

import { GoArrowRight } from 'react-icons/go';
import { FaConnectdevelop, FaNetworkWired } from 'react-icons/fa';
import { getPowerEvacuation } from '@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HiLightningBolt, HiOutlineAdjustments, HiOutlineViewGrid } from 'react-icons/hi';
import { BsHouseGearFill } from 'react-icons/bs';

export default function PowerEvacuationSection({footerData}) {
  const dispatch = useDispatch();
const CARD_ICONS = {
  generator: <BsHouseGearFill />,
  bolt: <HiLightningBolt />,
  transformer: <HiOutlineAdjustments />,
  switchyard: <HiOutlineViewGrid />,
  share: <FaNetworkWired />,
};


  const data = useSelector  ((state) => state?.landingPageAdmmin?.powerEvacuation); 

  useEffect (() => {
      dispatch(getPowerEvacuation())
  }, [])
  
// console.log(data, "aslj")
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
          <div className="font-body relative z-10 flex flex-col justify-between md:flex-row items-center justify-center gap-6 md:gap-12 py-2" >
            
            {data && data?.length>0 && data?.map((card, index) => (
              <React.Fragment key={card.id}>
                {/* Individual Component Card */}
                <div className="w-full md:w-[396px] bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center" >
                  
                  {/* Lightning Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4fc] text-[#1E7EBB] flex items-center justify-center mb-5">
              {
                CARD_ICONS[card.icon]
              }
                  </div>

                  {/* Card Title */}
                  <h4 className="text-xs font-bold tracking-wider text-[#1E7EBB] uppercase mb-1.5">
                    {card.title}
                  </h4>

                  {/* Card Subtitle */}
                  <p className="text-base sm:text-lg font-medium leading-snug mb-3">
                    {card.title2}
                  </p>

                  {/* Dimension/Details Text */}
                  <p className="text-[10px] sm:text-xs font-medium text-[#1E7EBB] tracking-tight">
                    {card.title3}
                  </p>

                </div>

                {/* Connecting Arrow between cards */}
                {data && data?.length > 0 && index < data?.length - 1 && (
                  <div className="font-body flex items-center justify-center text-[#1E7EBB] shrink-0 my-2 md:my-0">
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