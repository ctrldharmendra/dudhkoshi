import React from 'react';
import Link from 'next/link';
import logo from "../../../../public/landing/logo.png"
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="w-full relative bg-[#edf6fc] mt-[40px] pt-4 sm:px-6 lg:px-8 font-sans antialiased overflow-hidden"
          style={{
        borderTopLeftRadius: '60px',
        borderTopRightRadius: '60px',
      }}
    >
      
      {/* MAIN FLOATING CARD CONTAINER */}
      <div className="max-w-[1260px] mx-auto relative z-10">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100">
          
          {/* TOP SECTION: GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-10">
            
            {/* BRAND & ABOUT COLUMN (5 Cols on lg) */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-6">
              
              {/* Logo & Brand Name */}
              <Link href="/" className="inline-flex items-center gap-3 group">
                {/* Hydropower Logo Icon */}
                <div>
                   <Image src={logo} fill unoptimized className="text-xs font-bold text-[var(--landingPagePrimaryColor)]" alt='logo'></Image>
                </div>

                <span className="text-2xl font-manrope-medium font-medium text-[#373A3E]">
                  Dudhkoshi <span className="text-[#1E7EBB]">Hydropower</span>
                </span>
              </Link>

              {/* Description */}
              <p className="text-base font-[Hind] font-normal text-[#45484D] leading-[26px] tracking-normal max-w-sm">
                Building Nepal's clean energy future through sustainable, community-rooted hydropower infrastructure.
              </p>
            </div>

            {/* NAVIGATION LINKS GRID (7 Cols on lg) */}
            <div className="font-body lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2 sm:pt-0">
              
              {/* COLUMN 1: COMPANY */}
              <div className="space-y-3.5">
                <h3 className="text-xl font-[Manrope] font-medium leading-8 tracking-normal text-[#373A3E]">
                  Company
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#45484D] hover:text-[#1E7EBB] transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#45484D] hover:text-[#1E7EBB] transition-colors"
>
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#45484D] hover:text-[#1E7EBB] transition-colors"
>
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>

              {/* COLUMN 2: PROJECT */}
              <div className="font-body space-y-3.5">
                <h3 className="text-xl font-[Manrope] font-medium leading-8 tracking-normal text-[#373A3E]">
                  Project
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#45484D] hover:text-[#1E7EBB] transition-colors"
>
                      Dudhkoshi 2
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#45484D] hover:text-[#1E7EBB] transition-colors"
>
                      Reports
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#45484D] hover:text-[#1E7EBB] transition-colors">
                      Financial Overview
                    </Link>
                  </li>
                </ul>
              </div>

              {/* COLUMN 3: CONTACT */}
              <div className="font-body space-y-3.5">
                <h3 className="text-xl font-[Manrope] font-medium leading-8 tracking-normal text-[#373A3E]">
                  Contact
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li>
                    <a 
                      href="mailto:aayududhkoshi@gmail.com" 
                      className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#1E7EBB] hover:underline break-all"
                    >
                      aayududhkoshi@gmail.com
                    </a>
                  </li>
                  <li>
                    <a 
                      href="tel:0097714102710" 
                      className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#1E7EBB] hover:underline"

                    >
                      00977-1- 4102710
                    </a>
                  </li>
                  <li className="font-[Hind] font-normal text-base leading-[140%] tracking-normal text-[#45484D] hover:text-[#1E7EBB] transition-colors">
                    Sama Marga, Naxal Kathmandu, Nepal
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* DIVIDER LINE */}
          <div className="w-full h-[1px] bg-slate-100 my-2" />

          {/* BOTTOM SECTION: COPYRIGHT & LEGAL LINKS */}
          <div 
          // className="font-body pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#45484D]"
          className="font-[Hind] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-normal text-base leading-[140%] tracking-normal text-[#45484D]"
          >

            <p>
              © 2026 Dudhkoshi Hydropower Nepal Pvt. Ltd. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <Link href="#" className="hover:text-[#1E7EBB] transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="#" className="hover:text-[#1E7EBB] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </div>
<div 
  className="
    relative 
    max-w-[1260px] 
    mx-auto 
    overflow-hidden 
    flex 
    justify-center 
    items-start 
    pointer-events-none 
    select-none 
    z-0 
    text-[clamp(35px,11vw,150px)] 
    leading-none
  "
  aria-hidden="true"
  style={{ height: 'calc(1em - 15px)',
    
   }}
>
  <span
    className="
      font-manrope-bold
      foterLargeText
      font-extrabold 
      tracking-widest 
      text-[#1E7EBB]/20 
      uppercase 
      whitespace-nowrap
    "
  >
    Dudhkoshi2
  </span>
</div>

    </footer>
  );
}