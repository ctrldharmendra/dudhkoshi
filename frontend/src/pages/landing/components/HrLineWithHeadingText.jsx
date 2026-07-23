import React from 'react'

const HrLineWithHeadingText = ({text}) => {
  return (
             <span className="text-[11px] font-bold tracking-widest text-[var(--landingPagePrimaryColor)] uppercase border-b border-[var(--landingPagePrimaryColor)]/40 pb-1 inline-block mb-6">
              {text}
              </span>
  )
}

export default HrLineWithHeadingText