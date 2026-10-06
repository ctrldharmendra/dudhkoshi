"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { FiGrid, FiSliders } from "react-icons/fi";
import { IoArrowBackOutline, IoArrowForwardSharp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { getGallery } from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";

import StyledSubHeadingWithPill from "../components/StyledSubHeadingWithPill";
import HrLineWithHeadingText from "../components/HrLineWithHeadingText";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;


export default function GalleryClient() {
  const dispatch = useDispatch();

  const gallery = useSelector(
    (state) => state?.landingPageAdmmin?.gallery
  );

  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  // Get gallery from API
  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  // Make sure we always work with an array
  const galleryData = Array.isArray(gallery) ? gallery : [];

  // Filter gallery based on selected category
  const filteredGallery = useMemo(() => {
    if (activeCategory === "All Photos") {
      return galleryData;
    }

    return galleryData.filter(
      (item) =>
        item?.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, galleryData]);

  // Reset slider when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (filteredGallery.length === 0) return;

    setCurrentIndex(
      (prev) => (prev + 1) % filteredGallery.length
    );
  };

  const handlePrev = () => {
    if (filteredGallery.length === 0) return;

    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredGallery.length) %
        filteredGallery.length
    );
  };

  const categories = [
    "All Photos",
    "Infrastructure",
    "Communities",
    "Events",
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="text-center max-w-3xl mx-auto mb-16 pt-[100px]">
        <StyledSubHeadingWithPill text="Gallery" />

        <h2
          className="font-['Manrope'] font-bold text-[32px] leading-[100%] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4"
          data-aos="fade-up"
        >
          Our Visual Journal
        </h2>
      </div>

      {/* Subheading & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200/60 mb-10">

        <div className="flex flex-col gap-3">
          <HrLineWithHeadingText text="Photo Slide" />

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive =
                activeCategory.toLowerCase() === cat.toLowerCase();

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[var(--landingPagePrimaryColor,#1E7EBB)] border-[1px] border-[#1B71A8] text-white shadow-sm"
                      : "bg-[#E9F2F8] text-[#45484D] hover:bg-[#1E7EBB]/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Toggle */}
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="self-end md:self-auto inline-flex items-center gap-2 font-[Hind] font-normal text-base leading-[140%] text-[#45484D] hover:text-[var(--landingPagePrimaryColor,#1E7EBB)] transition-colors cursor-pointer"
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

      {/* Loading State */}
      {gallery === undefined || gallery === null ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          Loading gallery...
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          No images available in this category.
        </div>
      ) : isGridView ? (

        /* GRID VIEW */
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn"
        >
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-md border border-white/60 bg-gray-100"
            >
              <Image
                src={`${IMAGE_BASE_URL}/${item.image}`}
                width={800}
                height={500}
                unoptimized
                alt={item.category || "Gallery image"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm font-semibold capitalize">
                  {item.category || "Gallery"}
                </span>
              </div>
            </div>
          ))}
        </div>

      ) : (

        /* SLIDER VIEW */
        <div className="relative flex flex-col items-center">

          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden py-4 pb-20">

            {filteredGallery.map((item, index) => {
              const total = filteredGallery.length;

              let position = "hidden";

              if (index === currentIndex) {
                position = "center";
              } else if (
                index ===
                (currentIndex - 1 + total) % total
              ) {
                position = "left";
              } else if (
                index === (currentIndex + 1) % total
              ) {
                position = "right";
              }

              return (
                <div
                  key={item.id}
                  className={`absolute transition-all duration-500 ease-in-out rounded-3xl overflow-hidden shadow-xl border-6 border-white ${
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
                    width={1200}
                    height={700}
                    unoptimized
                    src={`${IMAGE_BASE_URL}/${item.image}`}
                    alt={item.category || "Gallery image"}
                    className="w-full h-full object-cover"
                  />

                  {/* Previous */}
                  {position === "left" && (
                    <button
                      onClick={handlePrev}
                      className="absolute left-[46px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-white ring-2 ring-white/80 hover:bg-white/40 transition-all duration-200 cursor-pointer z-40 shadow-lg"
                      aria-label="Previous image"
                    >
                      <IoArrowBackOutline className="w-6 h-6 text-white" />
                    </button>
                  )}

                  {/* Next */}
                  {position === "right" && (
                    <button
                      onClick={handleNext}
                      className="absolute right-[46px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-white ring-2 ring-white/80 hover:bg-white/40 transition-all duration-200 cursor-pointer z-40 shadow-lg"
                      aria-label="Next image"
                    >
                      <IoArrowForwardSharp className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {filteredGallery.map((_, idx) => (
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