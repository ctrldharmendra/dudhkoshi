import React from 'react';
import Link from 'next/link';

export default function PreFooterCTA({data}) {
  return (
    <section 
      className="w-full relative bottomSec overflow-hidden antialiased pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 lg:px-8"
      style={{
        // backgroundColor: '#0A3048', // Base background color
        borderBottomLeftRadius: '80px',
        borderBottomRightRadius: '80px',
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center"
        style={{
          // backgroundImage: `url('/landing/footer/bottomSectionBg.jpg')`, // Insert your PNG path here

        }} 
      />
      {/* Background Circuit/Tech PNG Pattern Slot */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('/landing/footer/bottomSectionBg.jpg')`, // Insert your PNG path here

        }} 
      />

        {/* <div className="absolute inset-0 bg-black/40" /> */}
      {/* <div
  className="absolute inset-0 pointer-events-none bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/landing/footer/bottomSectionBg.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
></div> */}

      <div className="max-w-[1320px] mx-auto relative z-10">
        
        {/* --- DIAGONAL GRADIENT BORDER WRAPPER (TOP-LEFT GLOW) --- */}
<div
  data-aos="zoom-in" 
  className="relative rounded-[28px] shadow-2xl overflow-hidden"
  style={{
    background:
      "radial-gradient(44.27% 99.44% at 50% 50%, rgba(31, 146, 217, 0.94) 0%, rgba(24, 104, 153, 0.93) 41.37%, rgba(14, 70, 105, 0.98) 72.14%, rgba(10, 48, 72, 0.62) 100%)",
  }}
>
            {/* Gradient border */}
            <div
              
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{
                padding: "4px",
                background:
                  "linear-gradient(102.32deg, #D8F0FF 10.79%, #1971A8 30.03%, #066CAD 53.97%, #1971A8 83.49%, #C1E7FF 92.25%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Card */}
            <div
              
              className="relative rounded-[24px] h-full w-full p-8 sm:p-14 md:p-20 text-center overflow-hidden"
              style={{
                background:
                  "radial-gradient(44.27% 99.44% at 50% 50%, rgba(31, 146, 217, 0.10) 0%, rgba(24, 104, 153, 0.10) 41.37%, rgba(14, 70, 105, 0.10) 72.14%, rgba(10, 48, 72, 0.07) 100%)",
              }}
            >

            
            {/* Content Wrapper */}
            <div className="relative z-20 max-w-3xl mx-auto space-y-6 sm:space-y-7" >
              
              {/* Heading */}
              <h2 
                
                className="text-2xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-[1.2]"
                style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255, 255, 255, 0.51) -10.06%, #FFFFFF 47.61%, rgba(255, 255, 255, 0.51) 113.42%)" ,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
              >
                {data?.footerCtaTtitle}
              </h2>

              {/* Subtitle */}
              <p 
                className="font-body text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed" 
                style={{ color:'#FFFFFF'}}
              >
                {data?.footerCtaPara}
              </p>

              {/* Action Buttons */}
              <div className="font-body flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                
                {/* Primary Button */}
                <Link
                  href={data?.footerCtaBtn1Link || "#"}
                  className="font-[Manrope] w-full sm:w-auto px-7 py-3 rounded-full text-base font-semibold tracking-wide leading-6 text-center align-middle transition-all duration-200 hover:brightness-110 active:scale-95 shadow-sm"
                  style={{
                    backgroundColor: 'white',
                    color: '#1E7EBB',
                  }}
                >
                  {data?.footerCtaBtn1Text}
                </Link>

                {/* Secondary Outlined Button */}
                <Link
                  href={data?.footerCtaBtn2Link || "#"}
                  className="font-[Manrope] w-full sm:w-auto px-7 py-3 rounded-full text-base font-semibold leading-6 text-center tracking-wide align-middle transition-all duration-200 hover:brightness-110 active:scale-95 shadow-sm"
                  style={{
                    border: '1px solid #B9D7EA',
                    color: '#DDECF5',
                  }}
                >
                  {data?.footerCtaBtn2Tetx}
                </Link>

              </div>

            </div>

          </div>

          
        </div>

      </div>
    </section>
  );
}

