"use client";

import React, { useState } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiChevronDown, 
  FiArrowRight 
} from 'react-icons/fi';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube 
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';


import { HiArrowRight, HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';
import StyledSubHeadingWithPill from '../landing/components/StyledSubHeadingWithPill';
import formSide from '../../../public/landing/Contact/contactUsBg.png';
import Loading from '../landing/components/Loading';

import img10 from "../../../public/landing/realImage/12.png";
import img11 from "../../../public/landing/realImage/11.png";


export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Technical Infrastructure',
    message: ''
  });

  const [isLoading, setisLoading] = useState(false)

  const handleSubmit = (e) => {
    setisLoading(true)
    e.preventDefault();
    // Handle form submission logic here
    setTimeout(() => {
        setisLoading(false)
        setFormData({
          fullName: '',
          email: '',
          subject: 'Technical Infrastructure',
          message: ''
        });
    }, 2000);
  };

  return (
      <div
      id='contact'
      className="max-w-[1440px] mx-auto space-y-10 font-body">

    <div 
      className="min-h-screen bg-white flex flex-col antialiased "
    >

      {/* Main Hero Wrapper */}
      <main className="flex-1 flex flex-col pb-[73px]">
        
        {/* Combined Hero Section (Image Frame holding the Text) */}
        <section className="min-h-[1100px]">
          <div className='max-w-[1440px] relative  mx-auto w-full relative'>
            <StyledSubHeadingWithPill text="Contact Us"></StyledSubHeadingWithPill>
          {/* Main Hero Container with Background Image */}
          <div 
            className="relative w-full min-h-[790px] max-h-[790px] contactUsParentStyled overflow-hidden bg-cover bg-center flex flex-col items-center"
            style={{
              backgroundImage: `url('/landing/realImage/10.png')` 
            }}
          >
            {/* 1. Cloudy White Transparency Overlay (Top fading down) */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[#FFFFFF] via-[#004E82]/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10 w-full text-center flex flex-col items-center">


{/* ! HERE  */}
{/* HEADING  */}
      <div 
        className="relative bg-[#E9F2F8D4]/83 border-2 border-[#ffffff] z-10 p-8 min-h-[474px] max-h-[474px] mt-[67px] max-w-[1216px] min-w-[1216px] rounded-[45px] sm:p-12 md:p-16 backdrop-blur-[6px]"
      >
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-[32px] font-[Manrope] font-bold leading-none tracking-[0] text-center capitalize text-[#175F8C] mb-6">
            Get In Touch With Us
          </h1>
          <p className="font-[Hind] font-medium text-[20px] text-[#45484D] leading-8 tracking-[0] text-center">
            Partner with us in engineering a sustainable future. Our team is ready to discuss infrastructure, environmental impact, or general inquiries.
          </p>
        </div>

        {/* 3 Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          
          {/* Email Us */}
          <div className="bg-white/62 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-[0.85px] border-white/80 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="w-9 h-9 flex items-center justify-center text-[#186596] mb-3">
              <FiMail className="w-6 h-6 stroke-2" />
            </div>
            <span className="font-[Hind] font-medium text-[16px] leading-[20px] tracking-[0px] text-center align-middle text-[#186596] mb-1">Email Us</span>
            <span className="font-[Hind] font-medium text-[14px] leading-[20px] tracking-[0px] align-middle lowercase text-[#45484D] break-all">aayududhkoshi@gmail.com</span>
          </div>

          {/* Call Us */}
          <div className="bg-white/62 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-[0.85px] border-white/80 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="w-9 h-9  flex items-center justify-center text-[#186596] mb-3">
              <FiPhone className="w-6 h-6 stroke-2" />
            </div>
            <span className="font-[Hind] font-medium text-[16px] leading-[20px] tracking-[0px] text-center align-middle text-[#186596] mb-1">Call Us</span>
            <span className="font-[Hind] font-medium text-[14px] leading-[20px] tracking-[0px] align-middle text-[#45484D] break-all">00977-1-4102710</span>
          </div>

          {/* Visit Us */}
          <div className="bg-white/62 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-[0.85px] border-white/80 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="w-9 h-9 flex items-center justify-center text-[#186596] mb-3">
              <FiMapPin className="w-6 h-6 stroke-2" />
            </div>
            <span className="font-[Hind] font-medium text-[16px] leading-[20px] tracking-[0px] text-center align-middle text-[#186596] mb-1">Visit Us</span>
            <span className="font-[Hind] font-medium text-[14px] leading-[20px] tracking-[0px] align-middle text-[#45484D] break-all">Sama Marga, Naxal, Kathmandu, Nepal</span>
          </div>

        </div>

      </div>

            </div>
            
          </div>
<div className='flex justify-center w-full contactUsForm'> 
          {/* ---------------- SECTION 2: FORM & SIDEBAR ---------------- */}
        <div className="bg-white max-w-[1216px] rounded-[24px] p-6 sm:p-10 border border-slate-100 shadow-sm box">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT SIDE: FORM (7 Cols on lg) */}
            <div className="lg:col-span-7 relative">
  {
    isLoading ?  <div className='w-full h-full absolute'> <Loading></Loading>      </div>: <></>
         

     
  }
              <h2 className="font-[Manrope] font-bold text-[32px] leading-[41.6px] tracking-[0px] align-middle text-[#186596] mb-6">
                Send an Inquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name & Email Address Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[Hind] font-bold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#45484D]">
                      Full Name
                    </label>
                    <input
                    style={{
                      padding:"20px !important", borderRadius:"16px !important"
                    }}
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full border border-slate-200 font-['Hind'] font-normal text-[16px] leading-[100%] tracking-[0px] align-middle text-[#C5C6C8] placeholder-slate-300 focus:outline-none focus:border-[#1E7EBB] focus:ring-1 focus:ring-[#1E7EBB] transition-colors bg-white/50"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[Hind] font-bold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#45484D]">
                      Email Address
                    </label>
                    <input
                         style={{
                      padding:"20px !important", borderRadius:"16px !important"
                    }}
                      type="email"
                      placeholder="john@engineering.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-200 font-['Hind'] font-normal text-[16px] leading-[100%] tracking-[0px] align-middle text-[#C5C6C8] placeholder-slate-300 focus:outline-none focus:border-[#1E7EBB] focus:ring-1 focus:ring-[#1E7EBB] transition-colors bg-white/50"
                      required
                    />
                  </div>

                </div>

                {/* Subject / Department Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-[Hind] font-bold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#45484D]">
                    Subject / Department
                  </label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 font-['Hind'] font-normal text-[14px] leading-[34px] tracking-[0px] align-middle text-[#45484D] appearance-none bg-white/50 focus:outline-none focus:border-[#1E7EBB] focus:ring-1 focus:ring-[#1E7EBB] transition-colors cursor-pointer pr-10"
                    >
                      <option value="Technical Infrastructure">Technical Infrastructure</option>
                      <option value="Environmental Impact">Environmental Impact</option>
                      <option value="General Inquiries">General Inquiries</option>
                      <option value="Investor Relations">Investor Relations</option>
                    </select>
                    <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-[Hind] font-bold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#45484D]">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your technical inquiry or proposal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 font-['Hind'] font-normal text-[16px] leading-[24px] tracking-[0px] align-middle text-[#45484D] placeholder:text-[#C5C6C8] focus:outline-none focus:border-[#1E7EBB] focus:ring-1 focus:ring-[#1E7EBB] transition-colors bg-white/50 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-['Manrope'] font-semibold text-[16px] leading-[24px] tracking-[0px] text-center align-middle text-[#FFFFFF] transition-all duration-200 shadow-sm hover:opacity-95 active:scale-[0.99] cursor-pointer mt-2"
                  style={{ backgroundColor: '#1E7EBB' }}
                >
                  Send Message
                </button>

              </form>
            </div>

            {/* RIGHT SIDE: LOCATION & SOCIALS (5 Cols on lg) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Global Headquarter Box */}
              <div className="rounded-2xl p-5 border border-slate-200/80">
                <h3 className="font-['Manrope'] font-bold text-[20px] leading-[32px] tracking-[0px] align-middle capitalize text-[#45484D] mb-1">
                  Global Headquarter
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[Manrope] font-normal text-base leading-none tracking-normal text-[#1E7EBB]">
                    Sama Marga, Naxal, Kathmandu
                  </span>
                  
                  {/* Currently Open Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006C49] animate-pulse"></span>
                    Currently Open
                  </span>
                </div>

                {/* Map/Office Image Preview */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-200 shadow-2xs">
                  <Image
                  width={100}
                  height={100}
                  unoptimized

                    src={img10}
                    alt="Global Headquarter Location"
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* View On Map Link */}
                <a 
                  href="https://maps.app.goo.gl/D2R4KtMgM3Ww5pFJ6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1E7EBB] hover:underline"
                >
                  <span>View On Map</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Follow Us Box */}
              <div className="rounded-2xl p-5 border border-slate-200/80">
                <h3 className="text-[20px] leading-[20px] font-medium text-[#186596] mb-5">
                  Follow Us
                </h3>

                <div className="flex items-center gap-2.5">
                  
                  {/* Facebook */}
                  <a 
                    href="#" 
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>

                  {/* X (Twitter) */}
                  <a 
                    href="#" 
                    aria-label="X"
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <SiX className="w-3.5 h-3.5" />
                  </a>

                  {/* Instagram */}
                  <a 
                    href="#" 
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>

                  {/* YouTube */}
                  <a 
                    href="#" 
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>

                </div>
              </div>

            </div>

          </div>
        </div>
</div>
          {/* Overlapping Glass Cards Grid (Positioned absolutely over the bottom boundary) */}
          <div className="absolute -bottom-[40px] left-0 right-0 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 z-20">




          </div>
          </div>
        </section>
      </main>
    </div>



      </div>
  );
}