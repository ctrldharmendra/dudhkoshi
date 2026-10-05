import React from 'react';
import MapCard from './MapCard';
import { FiTriangle, FiDroplet, FiMapPin } from 'react-icons/fi';
import { LiaMountainSolid } from "react-icons/lia";
import { MdLocationOn, MdOutlineWater } from "react-icons/md";
import { IoCarOutline, IoWaterOutline } from "react-icons/io5";
import { RiLightbulbFlashLine } from "react-icons/ri";
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import { SlLocationPin } from 'react-icons/sl';
import { ImPower } from 'react-icons/im';
import { HiOutlineClock } from 'react-icons/hi';
import { BsHouseGearFill } from 'react-icons/bs';


export default async function SpatialConstraintsSection({footerData}) {
const BASE_API = process.env.BASE_API;
let data = null;

// icon
// : 
// "LiaMountainSolid"
// id
// : 
// 1
// title
// : 
// "TERRAIN"
// title2
// : 
// ""
// title3
// : 
// "Steep-
  try {
      const res = await fetch(`${BASE_API}/api/admin/aboutus/spatialconstraints`)
      const json = await res.json()
      data = json?.data
  } catch (error) {
    return <div className='text-[19px] text-center p-[12px] heroSection'>Some Content Could Not be Loaded. </div>
  }



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

  return (
    <section 
      className="w-full spatialAboutUsBg py-8 px-4 sm:px-6 lg:px-8 antialiased"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--landingPageSecondaryColor': '#64748b',
        '--lightWhite': '#FFFFFF',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <div className="max-w-[1438px] mx-auto">
        
        {/* Section Header */}
                <div className="mb-4">
             <HrLineWithHeadingText text="    SPATIAL CONSTRAINTS"></HrLineWithHeadingText>
          
        </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#334155]">
            Dudhkoshi-2 (Jaleshwor)
          </h2>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[45px] items-start">
          
          {/* Left Column: Details Grid & Solukhumbu Card (6 Cols) */}
          <div className="lg:col-span-6 mt-[50px] flex flex-col justify-between gap-6 h-[91%]">

            <div className="grid grid-cols-1 sm:grid-cols-2 ">

  <div className="p-6 sm:border-r border-[#d1d1d63b] border-b border-[#d1d1d63b]">
    {/* Terrain */}
                 <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-[7px] bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1" data-aos="zoom-in-down">
                    {(() => {
  const Icon = iconMap[data?.[0]?.icon];
  return Icon ? <Icon className="w-4 h-4" /> : null;
})()}

                  
                </div>
                <h4 className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-[0px] align-middle uppercase text-[var(--primaryTextColorLanding3)]"data-aos="zoom-in-down">
             {data?.[0]?.title}
                </h4>
                <p className="font-[Hind] text-[16px] font-normal leading-[20px] tracking-[0px] align-middle text-[var(--textColorOnLightBg)]">
                 {data?.[0]?.title3}
                </p>
              </div>
  </div>

    {/* Access */}
  <div className="p-6 border-b border-[#d1d1d63b]">
                  <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-[7px] bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1" data-aos="zoom-in-down">
                                 {(() => {
  const Icon = iconMap[data?.[1]?.icon];
  return Icon ? <Icon className="w-4 h-4" /> : null;
})()}


                </div>
                <h4 className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-[0px] align-middle uppercase text-[var(--primaryTextColorLanding3)]" data-aos="zoom-in-down">
               {data?.[1]?.title}
                </h4>
                <p className="font-[Hind] text-[16px] font-normal leading-[20px] tracking-[0px] align-middle text-[var(--textColorOnLightBg)]">
                  <span className="font-[Hind] font-bold text-[16px] leading-[20px] tracking-[0px] align-middle block text-slate-800 mb-1">
                    {data?.[1]?.title2}
                  </span>
              {data?.[1]?.title3}
                </p>
              </div>
  </div>
{/* 3 */}
  <div className="p-6 sm:border-r border-[#d1d1d63b]">
      <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-[7px] bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1" data-aos="zoom-in-down">
                                     {(() => {
  const Icon = iconMap[data?.[2]?.icon];
  return Icon ? <Icon className="w-4 h-4" /> : null;
})()}

                </div>
                <h4 className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-[0px] align-middle uppercase text-[var(--primaryTextColorLanding3)]" data-aos="zoom-in-down">
                  {data?.[2]?.title}
                </h4>
                <div className="font-[Hind] text-[16px] font-normal leading-[20px] tracking-[0px] align-middle text-[var(--textColorOnLightBg)]">
                  <p className="font-[Hind] font-bold text-[16px] leading-[20px] tracking-[0px] align-middle block text-slate-800 mb-1">
                    {data?.[2]?.title2}
                  </p>
                  <p className="font-[Hind] text-[16px] font-normal leading-[20px] tracking-[0px] align-middle text-[var(--primaryTextColorLanding)]">
                    {data?.[2]?.title3}
                  </p>
                </div>
              </div>
  </div>
{/* 4 */}
  <div className="p-6">
    {/* Context */}
                <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-[7px] bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1" data-aos="zoom-in-down">
                                  {(() => {
  const Icon = iconMap[data?.[3]?.icon];
  return Icon ? <Icon className="w-4 h-4" /> : null;
})()}

                </div>
                <h4 className="font-[Hind] text-[14px] font-bold leading-[20px] tracking-[0px] align-middle uppercase text-[var(--primaryTextColorLanding3)]" data-aos="zoom-in-down"
>
                  {data?.[3]?.title}
                </h4>
                <div className="font-[Hind] text-[16px] font-normal leading-[20px] tracking-[0px] align-middle text-[var(--textColorOnLightBg)]">
                  <p className="font-[Hind] font-bold text-[16px] leading-[20px] tracking-[0px] align-middle block text-slate-800 mb-1">
                    {data?.[3]?.title2}
                  </p>
                  <p className="font-[Hind] text-[16px] font-normal leading-[20px] tracking-[0px] align-middle text-[var(--primaryTextColorLanding)]">
                    {data?.[3]?.title3}
                  </p>
                </div>
              </div>
  </div>
</div>


            {/* Solukhumbu Info Card */}
            <div className="bg-[white] min-h-[93px] max-w-[356px] overflow-hidden rounded-2xl border border-[#FFFFFF] flex flex-col items-center text-center shadow-2xs">
              <div className="pt-[2px] items-center bg-[var(--highlightBg)] min-h-[28px] w-full flex gap-3 justify-center text-center text-amber-600 font-[Manrope] font-bold text-[12px] leading-[20px] tracking-[2px] align-middle uppercase mb-2">
                <MdLocationOn className="w-4.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>{footerData?.aboutUsCardTitle || ""}</span>
              </div>
              <p className="font-[Hind] font-normal text-[12px] leading-[20px] tracking-[0px] text-center align-middle pt-0.5 min-w-full flex justify-center bg-[var(--lightWhite)] text-gray-600 max-w-md">
                {footerData?.aboutUsCardPara || ""}
              </p>
            </div>

          </div>

          {/* Right Column: Reusable Map Component (6 Cols) */}
          <div className="lg:col-span-6 p-2 rounded-2xl">
            <MapCard height="h-[480px]" footerData={footerData} />
          </div>

        </div>

      </div>
    </section>
  );
}