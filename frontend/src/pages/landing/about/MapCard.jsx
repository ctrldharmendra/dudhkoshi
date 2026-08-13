import React from "react";
import { HiLocationMarker } from "react-icons/hi";

export default function MapCard({
  coordinates = `27°21'53"-27°25'15"N, 86°37'35"-86°41'15"E`,
  height = "h-[450px]",
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1012690652224!2d85.32423951111943!3d27.714159376079383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb193f20973815%3A0x4421ce6f8c71fb9b!2sAayu%20Softtech%20Private%20Limited!5e0!3m2!1sen!2snp!4v1786614054000!5m2!1sen!2snp",
}) {
  return (
    <div className="w-full">
      {/* Coordinates Badge */}
      <div className="mb-4 flex min-h-[33px] w-fit mx-auto items-center gap-1.5 rounded-full border border-[#B9D7EA] px-3.5 py-1.5 text-[11px] font-bold tracking-tight text-[var(--landingPagePrimaryColor,#1E7EBB)] shadow-xs">
        <HiLocationMarker className="h-3.5 w-3.5 shrink-0 text-[var(--landingPagePrimaryColor,#1E7EBB)]" />

        <span>{coordinates}</span>
      </div>

      {/* Map Wrapper */}
      <div className="relative w-full rounded-[33px] bg-[#DDECF5] p-3 sm:p-4">
        {/* Map */}
        <div
          className={`relative w-full ${height} overflow-hidden rounded-[32px] border border-blue-100/60 bg-slate-100 shadow-lg`}
        >
          <iframe
            src={mapUrl}
            title="Location map"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}