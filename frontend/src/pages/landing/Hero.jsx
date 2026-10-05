


import React from 'react';
import Navbar from './navAndFooter/Nav';
import { HiArrowRight, HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';
import heroBottom1 from "../../../public/landing/realImage/12.png";
import heroCardImg2 from "../../../public/landing/realImage/13.png";
// import heroBottom1 from "../../../public/landing/dam.jpg";
// import heroCardImg2 from "../../../public/landing/heroCardImg2.png";
import StyledSubHeadingLine from './components/StyledSubHeadingLine';

export default function HeroPage() {



  return (
    <div 
      className=" bg-white flex flex-col antialiased   heroBg"

    >
      {/* Responsive Navbar */}
      <Navbar />

      {/* Main Hero Wrapper */}
      <main className="flex-1 flex flex-col pb-[73px]">
        
        {/* Combined Hero Section (Image Frame holding the Text) */}
        <section className="">
          <div className='max-w-[1440px] relative px-4 sm:px-8  mx-auto w-full pb-0'>
          {/* Main Hero Container with Background Image */}
          <div 
            className="relative w-full min-h-[500px] lg:min-h-[900px] md:min-h-[900px] heroParentStyled overflow-hidden bg-cover bg-center flex flex-col items-center pt-16 px-4 md:px-8 "
            style={{
              backgroundImage: `url('/landing/realImage/1_fog.png')`  
            }}
          >{/*`url('/landing/realImage/1.jpeg')`  */}
            {/* 1. Cloudy White Transparency Overlay (Top fading down) */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[var(--lightWhite)] via-[var(--lightWhite)]/85 to-transparent pointer-events-none"></div>

            {/* 2. Soft Ambient Bottom Fade (Bottom fading up for card blending) */}
            {/* <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[var(--lightWhite)] via-[var(--lightWhite)]/30 to-transparent pointer-events-none"></div> */}

            {/* 3. Interactive/Text Layer (Sits on top of the gradient masks) */}
            <div className="relative z-10 w-full text-center flex flex-col items-center" >
              
              {/* Styled Subheading Line */}
<StyledSubHeadingLine text="Dudhkhoshi Hydropower Limited"></StyledSubHeadingLine>

              {/* Main Display Headline */}
            <h1 className="mx-auto max-w-5xl text-center font-manrope text-4xl font-bold leading-[100%] tracking-[0%] md:text-6xl lg:text-[64px]">
              <span className="heroGradientText  pb-[20px] block pb-[3px]"       data-aos="fade-up">
                Clean Energy
              </span>
              <span className="heroGradientText  block pb-[3px]"       data-aos="fade-up">
                Unstoppable Flow
              </span>
            </h1>


              {/* Subtext Paragraph */}
              <p className="mt-6 hidden lg:flex text-[20px] text-[var(--primaryTextColorLanding)] font-['Hind'] font-normal leading-[1.6] max-w-4xl mx-auto px-4" data-aos="fade-up">
                Dudhkhoshi Hydropower Nepal Pvt. Ltd. is driving Nepal’s clean energy future. Committed to meeting the country’s 
                expanding power demands, we build sustainable, reliable hydropower solutions rooted in our foundational vision to 
                harness the nation’s incredible water resources.
              </p>

              {/* Call To Action Button */}
              <div className="mt-8">
                <button className="inline-flex items-center gap-3 bg-[var(--lightWhite)] text-[var(--primaryTextColorLanding2)] font-['Manrope'] font-medium text-[16px] leading-6 tracking-normal text-center align-middle py-2 px-6 rounded-full border border-gray-200/80 shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-200">

                  Get in touch
                  <span className="w-6 h-6 rounded-full bg-[var(--landingPagePrimaryColor)] flex items-center justify-center text-[var(--lightWhite)]">
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

            </div>
          </div>

          {/* Overlapping Glass Cards Grid (Positioned absolutely over the bottom boundary) */}
          <div className="absolute -bottom-[40px] lg:-bottom-[40px] left-0 right-0 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[3fr_2fr_1fr] gap-6 z-20">
            
            {/* Card 1: Solukhumbu Project */}
            <div className="bg-[#ffffff95] backdrop-blur-[2px] rounded-3xl gap-[12px] p-4 border-[2px] border-white/95 shadow-xl flex flex-row items-center justify-center" data-aos="fade-left">
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
                <span className="bg-[var(--lightWhite)] text-[var(--textColorOnLightBg)] font-['Manrope'] font-bold text-[12px] leading-[20px] tracking-[2px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                  <HiLocationMarker className="text-[var(--primaryTextColorLanding)] text-[16px]" /> SOLUKHUMBU
                </span>
                </div>
<div>
                  <h4 className="text-[var(--primaryTextColorLanding3)] font-['Hind'] font-bold text-[14px] leading-[20px] tracking-[0px] align-left">Dudhkhoshi-2</h4>
                <p className="text-[var(--primaryTextColorLanding2)] font-['Hind'] font-bold text-[14px] leading-[20px] tracking-[0px] align-middle mt-0.5">hydropower project</p>
</div>
              </div>
            </div>

            {/* Card 2: Technical Description */}
            <div className="bg-[#ffffff95] backdrop-blur-[2px] rounded-3xl p-6 border-[2px] border-white/95 shadow-xl hidden lg:flex flex-col justify-center min-h-[220px]"data-aos="fade-left">
              <p className="text-[var(--textColorOnLightBg)] text-[14px] leading-relaxed font-medium">
                High-efficiency PRoR design ensuring 6 hours of peak power, even during dry seasons.
              </p>
              <div className="mt-6">
                <h4 className="text-[var(--primaryTextColorLanding3)] font-bold text-[14px]">PRoR</h4>
                <p className="text-[var(--primaryTextColorLanding2)] font-semibold text-[14px] mt-0.5">optimized project</p>
              </div>
            </div>

            {/* Card 3: Capacity Details */}
            <div className="bg-[#ffffff95] backdrop-blur-[2px] rounded-3xl p-4 border-[2px] border-white/95 shadow-xl hidden lg:flex flex-col gap-12" data-aos="fade-left">
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
                <p className="text-[var(--primaryTextColorLanding2)] text-[14px] font-semibold">Total Capacity</p>
                <h4 className="text-[var(--primaryTextColorLanding3)] font-extrabold text-base text-[14px] mt-0.5">
                  95.7 <span className="text-[var(--primaryTextColorLanding2)] text-[14px] font-semibold ml-0.5">MW</span>
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

 