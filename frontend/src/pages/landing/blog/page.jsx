"use client";

import React, { useState, useEffect } from "react";
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import img from "../../../../public/landing/blog/1.jpg";
import img2 from "../../../../public/landing/blog/2.png";
import Image from 'next/image';
import Link from 'next/link';

import StyledSubHeadingWithPill from '../components/StyledSubHeadingWithPill';
import FinancialHighlights from './FinancialHighlights';
import { useDispatch, useSelector } from "react-redux";

import { getAllNews } from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;

export default function NewsEventsSection({data}) {
  const dispatch = useDispatch();

 

useEffect(() => {
  dispatch(
    getAllNews({
      limit: 6,
      page: 1,
      title: "",
    })
  );
}, [dispatch]);

const news = useSelector(
  (state) => state?.landingPageAdmmin?.news
);




const newsItems = news?.data ?? [];
const featuredUpdates = newsItems.slice(0, 2);
const sidebarNews = newsItems;


console.log("NEWS DATA:", news);

  return (
    <section 
      className="w-full newsEventsBg py-16 px-4 sm:px-6 lg:px-8 antialiased text-[#45484D]"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">

          <StyledSubHeadingWithPill text="News And Events"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="font-['Manrope'] font-bold text-[32px] leading-[44px] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4" data-aos="fade-up">
         Recent Updates and milestones
          </h2>

          {/* Subtitle */}
          <p className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]" data-aos="fade-up">
    {data?.blogSecPara}
               </p>
        </div>

        {/* Section Label */}
        <div className="mb-6">
          <span className="text-[11px] font-bold tracking-widest text-[#1E7EBB] uppercase border-b-[2px] border-[#1E7EBB]/40 pb-0.5 inline-block">
            UPDATES
          </span>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 2x2 FEATURED CARDS GRID (8 Cols on lg) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredUpdates.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden p-4 border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      width={500}
                      height={500}
                      quality={100}
                      unoptimized 
                      src={`${IMAGE_BASE_URL}/${item.coverImage}`} 
                      alt={item.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] font-extrabold  text-[#45484D]  leading-snug mb-3 hover:text-[#1E7EBB] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Meta: Author & Date */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-3">
                    <span>{item.author}</span>
                    <span>
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                  </div>

                  {/* Description Snippet */}
                  <p className="text-[14px] text-slate-500 leading-relaxed line-clamp-2 mb-4">
                    {item.content?.replace(/<[^>]*>/g, "")}
                  </p>
                </div>

                {/* Read More Link */}
                <Link  
                  href={`/news/${item.id}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1E7EBB] hover:underline group pt-2 border-t border-slate-100"
                >
                  <span>Read More</span>
                  <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link >
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR COMPACT LIST (4 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6 pt-2 lg:pt-0 h-full justify-between items-center">
            <div className="">
            {sidebarNews.map((item) => (
              <div className='relative min-h-[170px] flex flex-col gap-[11px] '                 key={item.id}> 
                                                  <span className="text-[10px] font-bold tracking-wider text-[#1E7EBB] uppercase">
                    {item.category}
                  </span>
                  
              <div 
                className="flex gap-3.5 items-start pb-6 border-b border-slate-200/80 last:border-0 last:pb-0"
              >

                {/* Thumbnail Image */}
                <div className="w-20 h-16 sm:w-22 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100 shadow-2xs">
                  
                  <Image
                         width={500}
                      height={500}
                      quality={100}
                      unoptimized  
                    src={`${IMAGE_BASE_URL}/${item.coverImage}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">

                  <a href={item.link} className="hover:text-[#1E7EBB] transition-colors">
                    <h4 className="text-[20px] font-bold  text-[#45484D]  leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </a>

                  <div className="flex items-center gap-1 text-[10px] text-[#43474F] mt-1">
                    <FiCalendar className="w-3 h-3 text-slate-400" />
                    <span>
  {new Date(item.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}
</span>

                  </div>
                </div>
              </div>
              </div>

            ))}
</div>
            {/* <FinancialHighlights></FinancialHighlights> */}
          </div>

        </div>

      </div>
    </section>
  );
}