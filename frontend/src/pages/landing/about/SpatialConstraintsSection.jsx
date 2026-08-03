import React from 'react';
import MapCard from './MapCard';
import { FiTriangle, FiDroplet, FiMapPin } from 'react-icons/fi';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';


export default function SpatialConstraintsSection() {
  return (
    <section 
      className="w-full bg-[#F5FAFF] py-16 px-4 sm:px-6 lg:px-8 antialiased"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--landingPageSecondaryColor': '#64748b',
        '--lightWhite': '#FFFFFF',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
                <div className="mb-4">
             <HrLineWithHeadingText text="    SPATIAL CONSTRAINTS"></HrLineWithHeadingText>
          
        </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#334155]">
            Dudhkoshi-2 (Jaleshwor)
          </h2>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details Grid & Solukhumbu Card (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 ">

  <div className="p-6 sm:border-r border-[#D1D1D6] border-b border-[#D1D1D6]">
    {/* Terrain */}
                 <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1">
                  <FiTriangle className="w-4 h-4" />
                </div>
                <h4 className="text-[11px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                  TERRAIN
                </h4>
                <p className="text-xs text-[var(--textColorOnLightBg)] leading-relaxed font-medium">
                  Steep-walled glacial gorge with high metamorphic rock stability. Gradient analyzed at 42° mean.
                </p>
              </div>
  </div>

  <div className="p-6 border-b border-[#D1D1D6]">
    {/* Access */}
                  <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1">
                                <FiTriangle className="w-4 h-4" />

                </div>
                <h4 className="text-[11px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                  ACCESS
                </h4>
                <p className="text-xs text-[var(--textColorOnLightBg)] leading-relaxed font-medium">
                  <span className="font-semibold block text-slate-800">12 km corridor</span>
                  Pedestrian and light cargo maintenance access.
                </p>
              </div>
  </div>

  <div className="p-6 sm:border-r border-[#D1D1D6]">
      <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1">
                  <FiDroplet className="w-4 h-4" />
                </div>
                <h4 className="text-[11px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                  WATER SOURCE
                </h4>
                <div className="text-xs text-[var(--textColorOnLightBg)] leading-relaxed font-medium">
                  <p className="font-bold text-slate-800 mb-1">Dudhkoshi River</p>
                  <p className="text-[var(--landingPageSecondaryColor)]">
                    Glacier-fed perennial flow system with robust discharge during monsoon cycles.
                  </p>
                </div>
              </div>
  </div>

  <div className="p-6">
    {/* Context */}
                <div className="flex flex-col gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#EAF3FA] flex items-center justify-center text-[var(--landingPagePrimaryColor)] mb-1">
                                   <FiTriangle className="w-4 h-4" />

                </div>
                <h4 className="text-[11px] font-bold tracking-wider text-[var(--landingPagePrimaryColor)] uppercase">
                  CONTEXT
                </h4>
                <div className="text-xs text-[var(--textColorOnLightBg)] leading-relaxed font-medium">
                  <p className="font-bold text-slate-700 uppercase tracking-wide text-[11px] mb-1">
                    PEAKING POWER CAPACITY
                  </p>
                  <p className="text-[var(--landingPageSecondaryColor)]">
                    Glacier-fed perennial flow system with robust discharge during monsoon cycles.
                  </p>
                </div>
              </div>
  </div>
</div>


            {/* Solukhumbu Info Card */}
            <div className="bg-[var(--highlightBg)] max-w-[356px] overflow-hidden rounded-2xl border border-[#FDE3C8] flex flex-col items-center text-center shadow-2xs">
              <div className=" pt-[2px]  w-full flex justify-center text-amber-600 font-bold text-[11px] tracking-wider uppercase mb-2">
                <FiMapPin className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>SOLUKHUMBU</span>
              </div>
              <p className="text-[11px] pt-0.5 min-w-full flex justify-center bg-[var(--lightWhite)] text-gray-600 font-medium leading-relaxed max-w-md">
                Located in the Solukhumbu District of Koshi Province, this semi-reservoir and peaking run-of-river (PRoR) project
              </p>
            </div>

          </div>

          {/* Right Column: Reusable Map Component (6 Cols) */}
          <div className="lg:col-span-6 p-2 bg-[#DDECF5] rounded-2xl">
            <MapCard height="h-[480px]" />
          </div>

        </div>

      </div>
    </section>
  );
}