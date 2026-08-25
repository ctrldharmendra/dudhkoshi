"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from "../../../../public/landing/logo.png"
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--lightWhite)] border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-12 h-12 relative flex items-center justify-center rounded-full bg-slate-50 shadow-sm border border-slate-100">
            <Image src={logo} fill unoptimized className="text-xs font-bold text-[var(--landingPagePrimaryColor)]" alt='logo'></Image>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-['Manrope'] font-medium text-[16px] leading-[26px] tracking-[0px] align-middle transition-colors">
            Home
          </Link>
          <Link href="#aboutUs" className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-['Manrope'] font-medium text-[16px] leading-[26px] tracking-[0px] align-middle transition-colors">
            About Us
          </Link>
          <Link href="#gallery" className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-['Manrope'] font-medium text-[16px] leading-[26px] tracking-[0px] align-middle transition-colors">
            Gallery
          </Link>
          <Link href="#team" className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-['Manrope'] font-medium text-[16px] leading-[26px] tracking-[0px] align-middle transition-colors">
            Our Team
          </Link>
          <Link href="#projectOverview" className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-['Manrope'] font-medium text-[16px] leading-[26px] tracking-[0px] align-middle transition-colors">
            Project Overview
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex gap-2">
          <Link 
          
            href="#contact" 
            className="px-6 py-2.5 bg-[var(--landingPagePrimaryColor)] hover:opacity-90 text-[var(--lightWhite)] font-['Manrope'] font-semibold text-[16px] leading-[24px] tracking-[0px] text-center align-middle rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Contact Us
          </Link>
          <Link 
            href="/login" 
            className="px-6 py-2.5 bg-[var(--landingPagePrimaryColor)] hover:opacity-90 text-[var(--lightWhite)] font-['Manrope'] font-semibold text-[16px] leading-[24px] tracking-[0px] text-center align-middle rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX className="w-7 h-7" /> : <HiMenuAlt3 className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Sidebar (Animated Dropdown) */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-[var(--lightWhite)] border-b border-gray-100 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 transform scale-y-100 pointer-events-auto' : 'opacity-0 transform scale-y-0 pointer-events-none'
        }`}
      >
        <div className="px-6 pt-4 pb-8 flex flex-col gap-5 shadow-lg bg-[var(--lightWhite)]">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="text-[var(--landingPagePrimaryColor)] font-semibold text-lg py-1 border-b border-gray-50"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsOpen(false)}
            className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-medium text-lg py-1 border-b border-gray-50"
          >
            About Us
          </Link>
          <Link 
            href="/gallery" 
            onClick={() => setIsOpen(false)}
            className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-medium text-lg py-1 border-b border-gray-50"
          >
            Gallery
          </Link>
          <Link 
            href="/team" 
            onClick={() => setIsOpen(false)}
            className="text-[var(--textColorOnLightBg)] hover:text-[var(--landingPagePrimaryColor)] font-medium text-lg py-1 border-b border-gray-50"
          >
            Our Team
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full text-center py-3 bg-[var(--landingPagePrimaryColor)] text-[var(--lightWhite)] font-medium rounded-full"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}