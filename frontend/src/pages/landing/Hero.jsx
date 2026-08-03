import React from 'react';
import Navbar from './navAndFooter/Nav';
import { HiArrowRight, HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';
import heroBottom1 from "../../../public/landing/heroBottom1.png";
import heroCardImg2 from "../../../public/landing/heroCardImg2.png";
import StyledSubHeadingLine from './components/StyledSubHeadingLine';

export default function HeroPage() {
  return (
    <div 
      className="min-h-screen bg-white flex flex-col antialiased  heroBg"
    >
      {/* Responsive Navbar */}
      <Navbar />

      {/* Main Hero Wrapper */}
      <main className="flex-1 flex flex-col pb-[73px]">
        
        {/* Combined Hero Section (Image Frame holding the Text) */}
        <section className="">
          <div className='max-w-[1440px] relative px-4 sm:px-8  mx-auto w-full pb-32'>
          {/* Main Hero Container with Background Image */}
          <div 
            className="relative w-full min-h-[750px] md:min-h-[750px] heroParentStyled overflow-hidden bg-cover bg-center flex flex-col items-center pt-16 px-4 md:px-8"
            style={{
              backgroundImage: `url('/landing/heroImage.png')` 
            }}
          >
            {/* 1. Cloudy White Transparency Overlay (Top fading down) */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[var(--lightWhite)] via-[var(--lightWhite)]/85 to-transparent pointer-events-none"></div>

            {/* 2. Soft Ambient Bottom Fade (Bottom fading up for card blending) */}
            {/* <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[var(--lightWhite)] via-[var(--lightWhite)]/30 to-transparent pointer-events-none"></div> */}

            {/* 3. Interactive/Text Layer (Sits on top of the gradient masks) */}
            <div className="relative z-10 w-full text-center flex flex-col items-center">
              
              {/* Styled Subheading Line */}
<StyledSubHeadingLine text="Dudhkhoshi Hydropower Limited"></StyledSubHeadingLine>

              {/* Main Display Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-[70px] font-extrabold tracking-tight leading-tight md:leading-[1.15] max-w-5xl mx-auto">
                <span className="heroGradientText block">Clean Energy</span>
                <span className="heroGradientText block">Unstoppable Flow</span>
              </h1>

              {/* Subtext Paragraph */}
              <p className="mt-6 text-sm md:text-base text-[var(--primaryTextColorLanding)] font-medium leading-relaxed max-w-4xl mx-auto px-4">
                Dudhkhoshi Hydropower Nepal Pvt. Ltd. is driving Nepal’s clean energy future. Committed to meeting the country’s 
                expanding power demands, we build sustainable, reliable hydropower solutions rooted in our foundational vision to 
                harness the nation’s incredible water resources.
              </p>

              {/* Call To Action Button */}
              <div className="mt-8">
                <button className="inline-flex items-center gap-3 bg-[var(--lightWhite)] text-[var(--primaryTextColorLanding2)] font-bold text-sm py-2 px-6 rounded-full border border-gray-200/80 shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                  Get in touch
                  <span className="w-6 h-6 rounded-full bg-[var(--landingPagePrimaryColor)] flex items-center justify-center text-[var(--lightWhite)]">
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

            </div>
          </div>

          {/* Overlapping Glass Cards Grid (Positioned absolutely over the bottom boundary) */}
          <div className="absolute -bottom-[40px] left-0 right-0 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 z-20">
            
            {/* Card 1: Solukhumbu Project */}
            <div className="bg-[var(--lightWhite)]/5 backdrop-blur-sm rounded-3xl gap-[12px] p-4 border border-white/40 shadow-xl flex flex-row items-center justify-center ">
              <div className="relative w-full h-36 rounded-2xl overflow-hidden">
                <Image 
                  src={heroBottom1} 
                  alt="Dudhkhoshi-2" 
                  className="w-full h-full object-cover"
                />

              </div>
              <div className="flex flex-col items-center justify-center gap-[28px]">
                <div>
                                  {/* Location Badge */}
                <span className="bg-[var(--lightWhite)] text-[var(--textColorOnLightBg)] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                  <HiLocationMarker className="text-[var(--primaryTextColorLanding)] text-[16px]" /> SOLUKHUMBU
                </span>
                </div>
<div>
                  <h4 className="text-[var(--landingPagePrimaryColor)] font-bold text-sm">Dudhkhoshi-2</h4>
                <p className="text-[var(--primaryTextColorLanding2)] font-semibold text-xs mt-0.5">hydropower project</p>
</div>
              </div>
            </div>

            {/* Card 2: Technical Description */}
            <div className="bg-[#ffffff91] backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl flex flex-col justify-between min-h-[220px]">
              <p className="text-[var(--textColorOnLightBg)] text-xs leading-relaxed font-medium">
                High-efficiency PRoR design ensuring 6 hours of peak power, even during dry seasons.
              </p>
              <div className="mt-6">
                <h4 className="text-[var(--landingPagePrimaryColor)] font-bold text-sm">PRoR</h4>
                <p className="text-[var(--primaryTextColorLanding2)] font-semibold text-xs mt-0.5">optimized project</p>
              </div>
            </div>

            {/* Card 3: Capacity Details */}
            <div className="bg-[var(--lightWhite)]/5 backdrop-blur-sm rounded-3xl p-4 border border-white/40 shadow-xl flex flex-col gap-12">
              <div className="relative w-[133px] h-[82px] rounded-2xl overflow-hidden">
                <Image 
                  src={heroCardImg2} 
                  alt="River Valley" 
                  unoptimized
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />

              </div>
              <div>
                <p className="text-[var(--primaryTextColorLanding2)] text-[11px] font-semibold">Total Capacity</p>
                <h4 className="text-[var(--landingPagePrimaryColor)] font-extrabold text-base mt-0.5">
                  97.5 <span className="text-[var(--textColorOnLightBg)] text-xs font-semibold ml-0.5">MW</span>
                </h4>
              </div>
            </div>

          </div>
          </div>
        </section>
      </main>
    </div>
  );
}


// import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

// Pure server component — no "use client" needed, no state/toggle here.
// This renders fully on the server (SSR/SSG friendly).
// import React from 'react';
// import Navbar from './navAndFooter/Nav';
// import { HiArrowRight, HiLocationMarker } from 'react-icons/hi';
// import Image from 'next/image';
// import heroBottom1 from "../../../public/landing/heroBottom1.png";
// import heroImage from "../../../public/landing/rectangularHeroMain.png";


// import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

// export default function HeroSection() {
//   return (
//     <section className="relative w-full bg-[var(--lightWhite)] mx-auto">
//       {/* ===================== Image + cloudy overlay block ===================== */}
//       <div className="relative h-[560px] overflow-hidden rounded-b-[40px] sm:h-[620px] max-w-[1440px] mx-auto sm:rounded-b-[56px] md:h-[680px] lg:h-full">
//         <Image
//           src={heroImage}
//           alt="Dudhkoshi hydropower dam surrounded by green mountains"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-bottom"
//         />

//         {/* Radial white haze — heaviest center/top, clears toward the sides so the mountains stay visible on both edges */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(ellipse 68% 58% at 50% 28%, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.80) 32%, rgba(255,255,255,0.30) 58%, rgba(255,255,255,0) 78%)",
//           }}
//         />
//         {/* Soft top-to-bottom fade so the dam itself stays crisp lower down */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 42%, rgba(255,255,255,0) 62%)",
//           }}
//         />

//         {/* ===================== Content ===================== */}
//         <div className="relative z-10 flex flex-col items-center px-6 pt-14 text-center motion-safe:animate-[fadeInUp_0.7s_ease-out_both] sm:pt-16 md:pt-20">
//           {/* Eyebrow */}
//           <div className="mb-5 flex items-center gap-3 sm:mb-6">
//             <span className="h-px w-14 bg-[var(--landingPagePrimaryColor)]/40 sm:w-24" />
//             <span className="h-1.5 w-1.5 rounded-full bg-[var(--landingPagePrimaryColor)]" />
//             <span className="whitespace-nowrap text-xs font-medium tracking-wide text-[var(--landingPagePrimaryColor)] sm:text-sm">
//               Dudhkoshi Hydropower Limited
//             </span>
//             <span className="h-1.5 w-1.5 rounded-full bg-[var(--landingPagePrimaryColor)]" />
//             <span className="h-px w-14 bg-[var(--landingPagePrimaryColor)]/40 sm:w-24" />
//           </div>

//           {/* Heading */}
//           <h1 className="text-4xl font-bold leading-tight text-[var(--landingPagePrimaryColor)] sm:text-5xl md:text-6xl">
//             Clean Energy
//             <br />
//             Unstoppable Flow
//           </h1>

//           {/* Paragraph */}
//           <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--textColorOnLightBg)] sm:mt-6 sm:text-base">
//             Dudhkoshi Hydropower Nepal Pvt. Ltd. is driving Nepal&apos;s clean
//             energy future. Committed to meeting the country&apos;s expanding
//             power demands, we build sustainable, reliable hydropower
//             solutions rooted in our foundational vision to harness the
//             nation&apos;s incredible water resources.
//           </p>

//           {/* CTA */}
//           <a
//             href="#contact"
//             className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[var(--lightWhite)] py-2 pl-6 pr-2 text-sm font-medium text-[var(--textColorOnLightBg)] shadow-md transition-transform duration-300 hover:scale-[1.03] sm:mt-8"
//           >
//             Get in touch
//             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--landingPagePrimaryColor)] text-[var(--lightWhite)] transition-transform duration-300 group-hover:translate-x-0.5">
//               <FaArrowRight className="h-3.5 w-3.5" />
//             </span>
//           </a>
//         </div>
//       </div>

//       {/* ===================== Overlapping info cards ===================== */}
//       <div className="relative z-20 -mt-16 px-4 sm:-mt-20 sm:px-8 md:-mt-24 md:px-16">
//         <div
//           className="mx-auto grid max-w-6xl grid-cols-1 gap-4 motion-safe:animate-[fadeInUp_0.7s_ease-out_0.15s_both] sm:gap-5 md:grid-cols-3"
//         >
//           {/* Card 1 — project image + location */}
//           <div className="flex flex-col gap-3 rounded-2xl bg-[var(--lightWhite)]/90 p-3 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:p-4">
//             <div className="relative h-36 w-full overflow-hidden rounded-xl sm:h-40">
//               <Image
//                 src={heroBottom1}
//                 alt="Dudhkoshi-2 hydropower project aerial view"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 33vw"
//                 className="object-cover"
//               />
//               <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[var(--lightWhite)]/95 px-2.5 py-1 text-[10px] font-semibold text-[var(--textColorOnLightBg)] shadow sm:text-xs">
//                 <FaMapMarkerAlt className="h-3 w-3 text-[var(--landingPagePrimaryColor)]" />
//                 SOLUKHUMBU
//               </span>
//             </div>
//             <p className="text-sm leading-snug">
//               <span className="block font-semibold text-[var(--landingPagePrimaryColor)]">
//                 Dudhkoshi-2
//               </span>
//               <span className="text-[var(--textColorOnLightBg)]">
//                 hydropower project
//               </span>
//             </p>
//           </div>

//           {/* Card 2 — text only */}
//           <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[var(--lightWhite)]/90 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:p-5">
//             <p className="text-sm leading-relaxed text-[var(--textColorOnLightBg)]">
//               High-efficiency PRoR design ensuring 6 hours of peak power, even
//               during dry seasons.
//             </p>
//             <p className="text-sm leading-snug">
//               <span className="block font-semibold text-[var(--landingPagePrimaryColor)]">
//                 PRoR
//               </span>
//               <span className="text-[var(--textColorOnLightBg)]">
//                 optimized project
//               </span>
//             </p>
//           </div>

//           {/* Card 3 — capacity image + figure */}
//           <div className="flex flex-col gap-3 rounded-2xl bg-[var(--lightWhite)]/90 p-3 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:p-4">
//             <div className="relative h-36 w-full overflow-hidden rounded-xl sm:h-40">
//               <Image
//                 src="/images/capacity-valley.jpg"
//                 alt="Mountain valley representing total installed capacity"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 33vw"
//                 className="object-cover"
//               />
//             </div>
//             <p className="text-sm leading-snug">
//               <span className="block font-semibold text-[var(--textColorOnLightBg)]">
//                 Total Capacity
//               </span>
//               <span>
//                 <span className="font-semibold text-[var(--landingPagePrimaryColor)]">
//                   97.5
//                 </span>{" "}
//                 <span className="text-[var(--textColorOnLightBg)]">MW</span>
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Breathing room so following sections don't collide with the overlap */}
//       <div className="h-6 sm:h-8 md:h-10" />
//     </section>
//   );
// }