import React from 'react';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import img from "../../../../public/landing/gallery/img4.jpg";
import Image from 'next/image';

export default function NewsEventsSection() {
  // Main featured update cards (Left Grid)
  const featuredUpdates = [
    {
      id: 1,
      image: img,
      title: "Laxmi Sunrise Bank-led consortium to invest in 70 MW Dudhkoshi 22",
      author: "By Dudhkoshi",
      date: "Feb,27 2026",
      description: "The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost ...",
      link: "#"
    },
    {
      id: 2,
      image: img,
      title: "Laxmi Sunrise Bank-led consortium to invest in 70 MW Dudhkoshi 22",
      author: "By Dudhkoshi",
      date: "Feb,27 2026",
      description: "The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost ...",
      link: "#"
    },
    {
      id: 3,
      image: img,
      title: "Laxmi Sunrise Bank-led consortium to invest in 70 MW Dudhkoshi 22",
      author: "By Dudhkoshi",
      date: "Feb,27 2026",
      description: "The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost ...",
      link: "#"
    },
    {
      id: 4,
      image: img,
      title: "Laxmi Sunrise Bank-led consortium to invest in 70 MW Dudhkoshi 22",
      author: "By Dudhkoshi",
      date: "Feb,27 2026",
      description: "The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost ...",
      link: "#"
    }
  ];

  // Sidebar compact articles (Right Side)
  const sidebarNews = [
    {
      id: 1,
      category: "TECHNOLOGY",
      title: "Smart Grid Integration: The Next Frontier in Hydropower Management",
      date: "FEB 20, 2026",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#"
    },
    {
      id: 2,
      category: "TECHNOLOGY",
      title: "Smart Grid Integration: The Next Frontier in Hydropower Management",
      date: "FEB 20, 2026",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#"
    },
    {
      id: 3,
      category: "TECHNOLOGY",
      title: "Smart Grid Integration: The Next Frontier in Hydropower Management",
      date: "FEB 20, 2026",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#"
    },
    {
      id: 4,
      category: "TECHNOLOGY",
      title: "Smart Grid Integration: The Next Frontier in Hydropower Management",
      date: "FEB 20, 2026",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#"
    }
  ];

  return (
    <section 
      className="w-full bg-[#f2f7fc] py-16 px-4 sm:px-6 lg:px-8 antialiased text-[#45484D]"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Badge Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-full border-t border-sky-200/80 max-w-xs sm:max-w-md"></div>
          <span className="absolute bg-[#f2f7fc] px-5 py-1 rounded-full border border-sky-300/60 text-[11px] font-semibold text-[#1E7EBB] tracking-wide shadow-2xs">
            News And Events
          </span>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4D7A] tracking-tight mb-4">
            Recent Updates And Milestones
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Meet the multi-disciplinary team of engineers, environmental scientists, and strategic investors driving the 97.5 MW Dudhkoshi vision toward sustainable energy independence.
          </p>
        </div>

        {/* Section Label */}
        <div className="mb-6">
          <span className="text-[11px] font-bold tracking-widest text-[#1E7EBB] uppercase border-b border-[#1E7EBB]/40 pb-0.5 inline-block">
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
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-extrabold text-[#1E3A8A] leading-snug mb-3 hover:text-[#1E7EBB] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Meta: Author & Date */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-3">
                    <span>{item.author}</span>
                    <span>{item.date}</span>
                  </div>

                  {/* Description Snippet */}
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Read More Link */}
                <a 
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1E7EBB] hover:underline group pt-2 border-t border-slate-100"
                >
                  <span>Read More</span>
                  <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR COMPACT LIST (4 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6 pt-2 lg:pt-0">
            {sidebarNews.map((item) => (
              <div 
                key={item.id}
                className="flex gap-3.5 items-start pb-6 border-b border-slate-200/80 last:border-0 last:pb-0"
              >
                {/* Thumbnail Image */}
                <div className="w-20 h-16 sm:w-22 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100 shadow-2xs">
                  <Image
                         width={500}
                      height={500}
                      quality={100}
                      unoptimized  
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-wider text-[#1E7EBB] uppercase">
                    {item.category}
                  </span>
                  
                  <a href={item.link} className="hover:text-[#1E7EBB] transition-colors">
                    <h4 className="text-xs font-bold text-[#1E3A8A] leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </a>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                    <FiCalendar className="w-3 h-3 text-slate-400" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}