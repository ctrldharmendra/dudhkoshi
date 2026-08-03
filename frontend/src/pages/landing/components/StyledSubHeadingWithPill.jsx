import React from 'react'

const StyledSubHeadingWithPill = ({text}) => {
  return (
                   <div className="flex items-center justify-center gap-4 mb-6">
                <div className="hidden sm:flex items-center">
                  <span className="h-[2px] w-[260px] bg-gradient-to-r from-transparent to-[#004cb9]/40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--landingPagePrimaryColor)]"></span>
                </div>
                    <span className="border border-[var(--landingPagePrimaryColor)] text-[var(--landingPagePrimaryColor)] text-xs font-semibold px-4 py-1.5 rounded-full bg-white shadow-xs">
              {text}
            </span>
                <div className="hidden sm:flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--landingPagePrimaryColor)]"></span>
                  <span className="h-[2px] w-[260px] bg-gradient-to-l from-transparent to-[#004cb9]/40"></span>
                </div>
              </div>
  )
}

export default StyledSubHeadingWithPill