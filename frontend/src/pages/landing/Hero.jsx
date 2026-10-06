


import React from 'react';
import Navbar from './navAndFooter/Nav';
import { HiArrowRight, HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';
// import heroBottom1 from "../../../public/landing/dam.jpg";
// import heroCardImg2 from "../../../public/landing/heroCardImg2.png";
import StyledSubHeadingLine from './components/StyledSubHeadingLine';
import Link from 'next/link';

export default async function HeroPage({footerData}) {
  let data = null;
  let data2= null;
  const BaseUrl = process.env.BASE_CONTENT_URL;
  const BASE_API = process.env.BASE_API;
  try {
      const heroData = await fetch(`${BASE_API}/api/admin/hero`)
      const heroDataJson = await heroData.json()
      data = heroDataJson?.data?.[0]
  } catch (error) {
console.log(error)
    return <div className='text-[19px] text-center p-[12px] heroSection'>Some Content Could Not be Loaded. </div>
  }

  // hero cards 
  try {
      const heroCards = await fetch(`${BASE_API}/api/admin/hero/card`)
      const heroCardJson = await heroCards.json()
      data2 = heroCardJson?.data
  } catch (error) {
console.log(error)
    return <div className='text-[19px] text-center p-[12px] heroSection'>Some Content Could Not be Loaded. </div>
  }


  return (
    <div 
      className=" bg-white flex flex-col antialiased   heroBg"

    >
      {/* Responsive Navbar */}
      <Navbar footerData={footerData}></Navbar>

      {/* Main Hero Wrapper */}
      <main className="flex-1 flex flex-col pb-[73px]">
       
        {/* Combined Hero Section (Image Frame holding the Text) */}
        <section className="">
          <div className='max-w-[1440px] relative px-4 sm:px-8  mx-auto w-full pb-0'>
          {/* Main Hero Container with Background Image */}
          <div 
            className="relative w-full min-h-[500px] lg:min-h-[900px] md:min-h-[900px] heroParentStyled overflow-hidden bg-cover bg-center flex flex-col items-center pt-16 px-4 md:px-8 "
            style={{
              backgroundImage: `url(${data?.mainWalpaper ? `${BaseUrl}/${data.mainWalpaper}` : `Not Found`})`,  
            }}
            
          >

            {/* 1. Cloudy White Transparency Overlay (Top fading down) */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[var(--lightWhite)] via-[var(--lightWhite)]/85 to-transparent pointer-events-none"></div>

            {/* 2. Soft Ambient Bottom Fade (Bottom fading up for card blending) */}
            {/* <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[var(--lightWhite)] via-[var(--lightWhite)]/30 to-transparent pointer-events-none"></div> */}

            {/* 3. Interactive/Text Layer (Sits on top of the gradient masks) */}
            <div className="relative z-10 w-full text-center flex flex-col items-center" >
              
              {/* Styled Subheading Line */}
<StyledSubHeadingLine text={data?.shortTitle}></StyledSubHeadingLine>

              {/* Main Display Headline */}
   <h1 className="mx-auto max-w-5xl text-center font-manrope text-4xl font-bold leading-[100%] tracking-[0%] md:text-6xl lg:text-[64px]">
  <span className="heroGradientText block pb-[12px]" data-aos="fade-up">
    {data?.title?.split(" ")?.slice(0, Math.ceil(data?.title?.split(" ")?.length / 2))?.join(" ")}
  </span>

  <span className="heroGradientText block pb-[3px]" data-aos="fade-up">
    {data?.title?.split(" ")?.slice(Math.ceil(data?.title?.split(" ")?.length / 2))?.join(" ")}
  </span>
</h1>


              {/* Subtext Paragraph */}
              <p className="mt-6 hidden lg:flex text-[20px] text-[var(--primaryTextColorLanding)] font-['Hind'] font-normal leading-[1.6] max-w-4xl mx-auto px-4" data-aos="fade-up">
                {data?.description}
              </p>

              {/* Call To Action Button */}
              <div className="mt-8">
                <Link href={data?.btnLink ? data?.btnLink : ""} className="inline-flex items-center gap-3 bg-[var(--lightWhite)] text-[var(--primaryTextColorLanding2)] font-['Manrope'] font-medium text-[16px] leading-6 tracking-normal text-center align-middle py-2 px-6 rounded-full border border-gray-200/80 shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-200">

                  {data?.btnText}
                  <span className="w-6 h-6 rounded-full bg-[var(--landingPagePrimaryColor)] flex items-center justify-center text-[var(--lightWhite)]">
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>

            </div>
          </div>

          {/* Overlapping Glass Cards Grid (Positioned absolutely over the bottom boundary) */}
          <div className="absolute -bottom-[40px] lg:-bottom-[40px] left-0 right-0 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[3fr_2fr_1fr] gap-6 z-20">
            
            {/* Card 1: Solukhumbu Project */}
            <div className="bg-[#ffffff95] backdrop-blur-[2px] rounded-3xl gap-[12px] p-4 border-[2px] border-white/95 shadow-xl flex flex-row items-center justify-center" data-aos="fade-left">
              <div className="relative w-full h-36 rounded-2xl overflow-hidden">
                <Image 
                width={500}
                height={500}
                  src={data2?.[0]?.image ? `${BaseUrl}/${data2?.[0].image}` : "Not Found"}
                  alt="Dudhkhoshi-2" 
                  className="w-full h-full object-cover"
                />

              </div>
              <div className="flex flex-col items-center justify-center gap-[28px]">
                <div>
                                  {/* Location Badge */}
                <span className="bg-[var(--lightWhite)] text-[var(--textColorOnLightBg)] font-['Manrope'] font-bold text-[12px] leading-[20px] tracking-[2px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                  <HiLocationMarker className="text-[var(--primaryTextColorLanding)] text-[16px]" /> {data2?.[0]?.keye}
                </span>
                </div>
<div>
                  <h4 className="text-[var(--primaryTextColorLanding3)] font-['Hind'] font-bold text-[14px] leading-[20px] tracking-[0px] align-left">{data2?.[0]?.valuee}</h4>
                <p className="text-[var(--primaryTextColorLanding2)] font-['Hind'] font-bold text-[14px] leading-[20px] tracking-[0px] align-middle mt-0.5">{data2?.[0]?.title}</p>
</div>
              </div>
            </div>

            {/* Card 2: Technical Description */}
            <div className="bg-[#ffffff95] backdrop-blur-[2px] rounded-3xl p-6 border-[2px] border-white/95 shadow-xl hidden lg:flex flex-col justify-center min-h-[220px]"data-aos="fade-left">
              <p className="text-[var(--textColorOnLightBg)] text-[14px] leading-relaxed font-medium">
                {data2?.[1]?.para}
              </p>
              <div className="mt-6">
                <h4 className="text-[var(--primaryTextColorLanding3)] font-bold text-[14px]">{data2?.[1]?.keye}</h4>
                <p className="text-[var(--primaryTextColorLanding2)] font-semibold text-[14px] mt-0.5">{data2?.[1]?.valuee}</p>
              </div>
            </div>

            {/* Card 3: Capacity Details */}
            <div className="bg-[#ffffff95] backdrop-blur-[2px] rounded-3xl p-4 border-[2px] border-white/95 shadow-xl hidden lg:flex flex-col gap-12" data-aos="fade-left">
              <div className="relative w-[133px] h-[82px] rounded-2xl overflow-hidden">
                <Image 
                  src={data2?.[2]?.image ? `${BaseUrl}/${data2?.[2].image}` : "Not Found"}
                  alt="River Valley" 
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />

              </div>
              <div>
                <p className="text-[var(--primaryTextColorLanding2)] text-[14px] font-semibold">{data2?.[2]?.keye}</p>
                <h4 className="text-[var(--primaryTextColorLanding3)] font-extrabold text-base text-[14px] mt-0.5">
                 {data2?.[2]?.valuee} <span className="text-[var(--primaryTextColorLanding2)] text-[14px] font-semibold ml-0.5">{data2?.[2]?.title}</span>
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

 