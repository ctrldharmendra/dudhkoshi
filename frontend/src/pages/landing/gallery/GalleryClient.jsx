"use client";

import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import { FiChevronLeft, FiChevronRight, FiGrid, FiSliders } from 'react-icons/fi';
import StyledSubHeadingWithPill from '../components/StyledSubHeadingWithPill';
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import { IoArrowBackOutline, IoArrowForwardSharp } from 'react-icons/io5';

export default  function GalleryClient({ initialGallery }) {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  // Filter gallery based on selected tab
  const filteredGallery = useMemo(() => {
    if (activeCategory === "All Photos") return initialGallery;
    return initialGallery.filter(
      (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, initialGallery]);

  // Reset slider index when changing filter
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const categories = ["All Photos", "Infrastructure", "Communities", "Events"];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

       <div className="text-center max-w-3xl mx-auto mb-16">


          <StyledSubHeadingWithPill text="Gallery"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--landingPageColorPrimary2)] tracking-tight leading-tight mb-4">
          Our Visual Journal
          </h2>

        </div>




      {/* Subheading & Filter Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200/60 mb-10">
        
        {/* Left Sub-label & Category Tabs */}
        <div className="flex flex-col gap-3">
     <HrLineWithHeadingText text="Photo Slide"></HrLineWithHeadingText>


          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories?.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[var(--landingPagePrimaryColor,#1E7EBB)] text-white shadow-sm"
                      : "bg-[#eef4f8] text-[#45484D] hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Toggle View Mode */}
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="self-end md:self-auto inline-flex items-center gap-2 text-xs font-semibold text-[#45484D] hover:text-[var(--landingPagePrimaryColor,#1E7EBB)] transition-colors cursor-pointer"
        >
          {isGridView ? (
            <>
              <FiSliders className="w-4 h-4" />
              <span>Slider View</span>
            </>
          ) : (
            <>
              <FiGrid className="w-4 h-4" />
              <span>Grid View</span>
            </>
          )}
        </button>

      </div>

      {/* GALLERY DISPLAY AREA */}
      {filteredGallery?.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          No images available in this category.
        </div>
      ) : isGridView ? (
        
        /* 1. GRID VIEW MODE */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
          {filteredGallery?.map((item) => (
            <div 
              key={item.id}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-md border border-white/60 bg-gray-100"
            >
              <Image
                src={item.image}
                width={200}
                height={200}
                unoptimized
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

      ) : (

        /* 2. THREE-ITEM HORIZON SLIDER VIEW */
        <div className="relative flex flex-col items-center">
          
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden py-4">
            {filteredGallery?.map((item, index) => {
              const total = filteredGallery?.length;
              
              // Determine index position relative to center image
              let position = "hidden"; // default state for non-visible slides
              if (index === currentIndex) {
                position = "center";
              } else if (index === (currentIndex - 1 + total) % total) {
                position = "left";
              } else if (index === (currentIndex + 1) % total) {
                position = "right";
              }

              return (
                <div
                  key={item.id}
                  className={`absolute transition-all duration-500 ease-in-out rounded-3xl overflow-hidden shadow-xl border-4 border-white ${
                    position === "center"
                      ? "z-30 w-[85%] sm:w-[70%] md:w-[62%] h-full scale-100 opacity-100 shadow-2xl"
                      : position === "left"
                      ? "z-10 -translate-x-[55%] sm:-translate-x-[60%] w-[60%] sm:w-[50%] h-[80%] scale-90 opacity-70 blur-[0.5px]"
                      : position === "right"
                      ? "z-10 translate-x-[55%] sm:translate-x-[60%] w-[60%] sm:w-[50%] h-[80%] scale-90 opacity-70 blur-[0.5px]"
                      : "opacity-0 pointer-events-none scale-75"
                  }`}
                >
                  <Image
                  width={200}
                height={200}
                unoptimized
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Left Arrow Button (On Left Peek Image) */}
                  {position === "left" && (
                    <button
                      onClick={handlePrev}
                      className="absolute left-[46px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/70 border border-[white]  transition-all cursor-pointer z-40"
                      aria-label="Previous image"
                    >
                      <IoArrowBackOutline className="w-5 h-5 text-[white]" />
                    </button>
                  )}

                  {/* Right Arrow Button (On Right Peek Image) */}
                  {position === "right" && (
                    <button
                      onClick={handleNext}
                      className="absolute right-[46px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/70 border border-[white]  transition-all cursor-pointer z-40"
                      aria-label="Next image"
                    >
                      <IoArrowForwardSharp className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Progress Bar Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {filteredGallery?.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-10 bg-[var(--landingPagePrimaryColor,#1E7EBB)]"
                    : "w-6 bg-white hover:bg-blue-200"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      )}

    </div>
  );
}