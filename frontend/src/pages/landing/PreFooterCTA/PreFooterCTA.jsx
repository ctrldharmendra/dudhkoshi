import React from 'react';
import Link from 'next/link';

export default function PreFooterCTA() {
  return (
    <section 
      className="w-full relative bottomSec overflow-hidden font-sans antialiased pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 lg:px-8"
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
          className="relative rounded-[28px] p-[1.5px] shadow-2xl overflow-hidden"
          style={{
            /* 135deg gradient creates the sharp bright highlight at the top-left corner,
               fading smoothly down the left & right sides toward the bottom-right */
            background: 'linear-gradient(317deg, #ffffff 1%, #D8F0FF 15%, #1F92D9 18%, #0583d1 75%, rgb(255 255 255) 100%)',
          }}
        >
          
          {/* --- INNER CARD CONTENT CONTAINER --- */}
          <div 
            className="relative rounded-[26.5px] h-full w-full p-8 sm:p-14 md:p-20 text-center overflow-hidden"
            style={{
              // Inner backdrop radial glow centered towards the upper section 
              background: 'radial-gradient(110% 110% at 50% 25%, #186899 15%, #0E4669 55%, #0A3048 100%)',
                  // background: 'radial-gradient(circle, #0a304854 -56%, #0a3048 49%)',
                  
            }}
          >


            
            {/* Content Wrapper */}
            <div className="relative z-20 max-w-3xl mx-auto space-y-6 sm:space-y-7">
              
              {/* Heading */}
              <h2 
                className="text-2xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-[1.2]"
                style={{ color: '#D8F0FF' }}
              >
                Sustainable Energy for a <br className="hidden sm:inline" />
                Brighter Tomorrow.
              </h2>

              {/* Subtitle */}
              <p 
                className="text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed"
                style={{ color: '#C1E7FF', opacity: 0.88 }}
              >
                We harness Nepal's rivers to deliver reliable, sustainable hydropower lighting homes, empowering communities, and building a cleaner future.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                
                {/* Primary Button */}
                <Link
                  href="#"
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-95 shadow-sm"
                  style={{
                    backgroundColor: 'white',
                    color: '#1E7EBB',
                  }}
                >
                  Join the Revolution
                </Link>

                {/* Secondary Outlined Button */}
                <Link
                  href="#"
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-white/5 active:scale-95 border"
                  style={{
                    borderColor: '#B9D7EA',
                    color: '#D8F0FF',
                  }}
                >
                  Learn More
                </Link>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

