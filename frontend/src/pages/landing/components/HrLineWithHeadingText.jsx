import React from 'react'

const HrLineWithHeadingText = ({text}) => {




  return (
             <span className="
                relative
                inline-block
                font-['Manrope']
                font-bold
                text-[12px]
                leading-[20px]
                tracking-[2px]
                text-[var(--landingPageTertiaryColor)]
                uppercase
                pb-2
                mb-6
                opacity-100
                after:absolute
                after:left-0
                after:bottom-0
                after:w-[51px]
                after:h-[2px]
                after:bg-[var(--halfBorderColor)]
                after:opacity-100
              ">
              {text}
              </span>


  )
}

export default HrLineWithHeadingText