// import React from 'react';

// export default function StatsBanner() {
//   const stats = [
//     {
//       value: "95.7",
//       unit: "MW",
//       label: "ANNUAL PRODUCTION",
//     },
//     {
//       value: "12+",
//       unit: "",
//       label: "ACTIVE PROJECTS",
//     },
//     {
//       value: "85%",
//       unit: "",
//       label: "CARBON REDUCTION",
//     },
//     {
//       value: "5k+",
//       unit: "",
//       label: "LOCAL JOBS CREATED",
//     },
//   ];

//   return (
//     <section 
//       className="w-full bg-[var(--landingPagePrimaryColor,#1E7EBB)] py-12 md:py-16 px-4 sm:px-6 lg:px-8 antialiased text-white"
//       style={{
//         '--landingPagePrimaryColor': '#1E7EBB',
//         '--lightWhite': '#FFFFFF',
//       }}
//     >
//       <div className="max-w-[1438px] mx-auto">
//         {/* Responsive Grid Layout */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 items-center">
//           {stats.map((stat, index) => (
//             <div 
//               key={index}
//               className={`flex flex-col  text-center relative px-4 ${
//                 // Vertical dividers between columns on desktop (lg breakpoint)
//                 index < stats.length - 1 
//                   ? 'lg:border-r lg:border-white/20' 
//                   : ''
//               }`}
//             >
//               {/* Main Metric Value and Unit */}
//               <div className="flex items-baseline justify-center gap-2 mb-2">
//                 <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extralight tracking-tight leading-none text-white/95">
//                   {stat.value}
//                 </span>
//                 {stat.unit && (
//                   <span className="text-xl md:text-2xl font-light text-white/80 tracking-wide">
//                     {stat.unit}
//                   </span>
//                 )}
//               </div>

//               {/* Metric Label */}
//               <p className="text-[10px] md:text-xs font-semibold tracking-widest text-white/70 uppercase">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React from 'react';

export default function StatsBanner() {
  const stats = [
    {
      value: "95.7",
      unit: "MW",
      label: "ANNUAL PRODUCTION",
    },
    {
      value: "12+",
      unit: "",
      label: "ACTIVE PROJECTS",
    },
    {
      value: "85%",
      unit: "",
      label: "CARBON REDUCTION",
    },
    {
      value: "5k+",
      unit: "",
      label: "LOCAL JOBS CREATED",
    },
  ];

  return (
    <section 
      className="w-full bg-[var(--landingPagePrimaryColor,#1E7EBB)] py-12 md:py-16 px-4 sm:px-6 lg:px-8 antialiased text-white"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--lightWhite': '#FFFFFF',
      }}
    >
      <div className="max-w-[1438px] mx-auto">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-center">
          {stats?.map((stat, index) => (
            <div 
              key={index}
              className={`flex flex-col text-center relative px-4 ${
                // Vertical gradient dividers matching Figma spec
                index < stats.length - 1 
                  ? "after:hidden lg:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1.5px] after:h-[80%] after:bg-gradient-to-b after:from-[#2082C1] after:via-white/70 after:to-[#2082C1]" 
                  : ""
              }`}
            >
              {/* Main Metric Value and Unit */}
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extralight tracking-tight leading-none text-white/95">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xl md:text-2xl font-light text-white/80 tracking-wide">
                    {stat.unit}
                  </span>
                )}
              </div>

              {/* Metric Label */}
              <p className="text-[14px] md:text-xs font-semibold tracking-widest text-white/70 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}