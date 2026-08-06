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
              <h1 className="text-4xl  md:text-6xl lg:text-[70px] font-extrabold tracking-tight leading-tight md:leading-[1.15] max-w-5xl mx-auto">
                <span className="heroGradientText block font-manrope-bold blackStrok pb-[3px]">Clean Energy</span>
                <span className="heroGradientText block font-manrope-bold blackStrok pb-[3px]">Unstoppable Flow</span>
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

 