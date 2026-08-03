import React from 'react'

const HrLineWithHeadingText = ({text}) => {
  return (
             <span className="
                relative
        inline-block
        text-[11px]
        font-bold
        tracking-widest
        text-[var(--landingPagePrimaryColor)]
        uppercase
        pb-2
        mb-6
        after:absolute
        after:left-0
        after:bottom-0
        after:w-[51px]
        after:h-[1px]
        after:bg-[var(--halfBorderColor)]
        after:opacity-40
             ">
              {text}
              </span>
  )
}

export default HrLineWithHeadingText