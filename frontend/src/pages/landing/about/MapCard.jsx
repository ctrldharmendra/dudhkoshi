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
    <>
          {/* Coordinates Pill Badge */}
      <div className="mb-4 mx-auto border min-h-[33px] w-[fit-content]  border-[#B9D7EA] shadow-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-[var(--landingPagePrimaryColor,#1E7EBB)] tracking-tight">
        <HiLocationMarker className="w-3.5 h-3.5 text-[var(--landingPagePrimaryColor,#1E7EBB)]" />
        <span>{coordinates}</span>
      </div>
    <div className="relative w-full flex flex-col items-end bg-[#DDECF5] p-[16px] rounded-[33px]">


      {/* Map Container */}
      <div className={`relative w-full ${height} rounded-[32px] overflow-hidden border border-blue-100/60 shadow-lg bg-slate-100 group`}>
        {/* Map Image / Embedded Map */}
        {/* <Image
        height={200} 
        width={200}
        unoptimized
          src={technicalSpecificationIMG} 
          alt="Solukhumbu Location Map" 
          className="w-full h-full object-cover"
        /> */}

<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d220.75423900240068!2d85.32459836371902!3d27.71519209906059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1784788003208!5m2!1sen!2snp" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>


        {/* Map Controls (Zoom / Layers) */}
        {/* <div className="absolute bottom-5 right-5 flex flex-col gap-2 z-10">
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
              className="p-2.5 text-gray-700 hover:bg-gray-50 hov</>er:text-[var(--landingPagePrimaryColor,#1E7EBB)] transition-colors"
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
        </div> */}
      </div>
    </div></>
  );
}