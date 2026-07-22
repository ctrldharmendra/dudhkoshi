import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { FiPlus, FiMinus, FiLayers } from 'react-icons/fi';
import technicalSpecificationIMG from "../../../../public/landing/aboutUsTechnicalSpecification.png";
import Image from 'next/image';


export default function MapCard({ 
  coordinates = "27°21'53\"-27°25'15\"N, 86°37'35\"-86°41'15\"E",
  height = "h-[450px]" 
}) {
  return (
    <div className="relative w-full flex flex-col items-end">
      {/* Coordinates Pill Badge */}
      <div className="mb-3 bg-[var(--lightWhite,#FFFFFF)] border border-blue-100/80 shadow-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-[var(--landingPagePrimaryColor,#1E7EBB)] tracking-tight">
        <HiLocationMarker className="w-3.5 h-3.5 text-[var(--landingPagePrimaryColor,#1E7EBB)]" />
        <span>{coordinates}</span>
      </div>

      {/* Map Container */}
      <div className={`relative w-full ${height} rounded-[32px] overflow-hidden border border-blue-100/60 shadow-lg bg-slate-100 group`}>
        {/* Map Image / Embedded Map */}
        <Image
        height={200} 
        width={200}
        unoptimized
          src={technicalSpecificationIMG} 
          alt="Solukhumbu Location Map" 
          className="w-full h-full object-cover"
        />

        {/* Map Controls (Zoom / Layers) */}
        <div className="absolute bottom-5 right-5 flex flex-col gap-2 z-10">
          <div className="bg-white/90 backdrop-blur-xs rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <button 
              type="button" 
              className="p-2.5 text-gray-700 hover:bg-gray-50 hover:text-[var(--landingPagePrimaryColor,#1E7EBB)] transition-colors border-b border-gray-100"
              aria-label="Zoom in"
            >
              <FiPlus className="w-4 h-4" />
            </button>
            <button 
              type="button" 
              className="p-2.5 text-gray-700 hover:bg-gray-50 hover:text-[var(--landingPagePrimaryColor,#1E7EBB)] transition-colors"
              aria-label="Zoom out"
            >
              <FiMinus className="w-4 h-4" />
            </button>
          </div>

          <button 
            type="button" 
            className="p-2.5 bg-white/90 backdrop-blur-xs rounded-xl shadow-md border border-gray-100 text-gray-700 hover:bg-gray-50 hover:text-[var(--landingPagePrimaryColor,#1E7EBB)] transition-colors flex items-center justify-center"
            aria-label="Map layers"
          >
            <FiLayers className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}