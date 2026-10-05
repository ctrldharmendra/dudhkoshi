import React from 'react'

const StyledSubHeadingWithPill = ({ text }) => (
  <div className="flex items-center justify-center gap-4 mb-6" data-aos="fade-down">
    <div className="hidden sm:flex items-center">
      <span className="h-[2px] w-[260px] bg-gradient-to-r from-transparent to-[#004cb9]/40" />
      <span className="w-2.5 h-2.5 rounded-full bg-[var(--landingPagePrimaryColor)]" />
    </div>

    <span className="border border-[var(--landingPagePrimaryColor)] text-[var(--landingPagePrimaryColor)] font-['Manrope'] font-medium text-[16px] leading-[20px] tracking-[0px] align-middle capitalize px-4 py-1.5 rounded-full bg-white shadow-xs">
      {text}
    </span>

    <div className="hidden sm:flex items-center">
      <span className="w-2.5 h-2.5 rounded-full bg-[var(--landingPagePrimaryColor)]" />
      <span className="h-[2px] w-[260px] bg-gradient-to-l from-transparent to-[#004cb9]/40" />
    </div>
  </div>
);

export default StyledSubHeadingWithPill