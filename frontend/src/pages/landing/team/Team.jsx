"use client";

import React, { useState, useMemo, useEffect } from "react";

import HrLineWithHeadingText from "../components/HrLineWithHeadingText";
import StyledSubHeadingWithPill from "../components/StyledSubHeadingWithPill";

import { useDispatch, useSelector } from "react-redux";
import { getTeam } from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;

export default function TeamSection({misc}) {
  const dispatch = useDispatch();

  
  console.log("MISC:", misc);
console.log("TEAM SEC PARA:", misc?.teamSecPara);


const {
  team: teamData = [],
  loading: teamLoading
} = useSelector(
  (state) => state?.landingPageAdmmin || {}
);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    dispatch(getTeam());
  }, [dispatch]);

  const teamMembers = useMemo(() => {
    if (!Array.isArray(teamData)) return [];

    return teamData.map((member) => ({
      id: String(member.id),
      name: member.name?.trim() || "",
      role: member.designation || "",
      category: "Directors",

      avatar: member.image
        ? `${IMAGE_BASE_URL}/${member.image}`
        : "",
      photo: member.image
        ? `${IMAGE_BASE_URL}/${member.image}`
        : "",

      bio: member.description
        ? member.description.split(/\r?\n\r?\n/)
        : [],

      metadata: [
        {
          label: "Background",
          value: member.background || "-",
        },
        {
          label: "Experience",
          value: member.experience || "-",
        },
        {
          label: "Focus",
          value: member.focus || "-",
        },
      ],
    }));
  }, [teamData]);

  useEffect(() => {
    if (teamMembers.length > 0) {
      setSelectedMember((current) => current || teamMembers[0]);
    }
  }, [teamMembers]);

  const filteredMembers = useMemo(() => {
    if (activeCategory === "All") {
      return teamMembers;
    }

    return teamMembers.filter(
      (member) => member.category === activeCategory
    );
  }, [activeCategory, teamMembers]);

  const handleSelectMember = (member) => {
    if (!selectedMember || member.id === selectedMember.id) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      setSelectedMember(member);
      setIsAnimating(false);
    }, 150);
  };

  if (teamLoading) {
    return (
      <section className="w-full teamBg py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          Loading team members...
        </div>
      </section>
    );
  }

  if (!selectedMember) {
    return null;
  }
    

  return (
    <section 
      className="w-full teamBg py-16 px-4 sm:px-6 lg:px-8  antialiased text-[#45484D]"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--landingPageSecondaryColor': '#64748b',
        '--lightWhite': '#FFFFFF',
        '--textColorOnLightBg': '#45484D',
      }}
      id="team"
    >
          <div className="text-center max-w-3xl mx-auto mb-16">


          <StyledSubHeadingWithPill text="Meet our Team"></StyledSubHeadingWithPill>

          {/* Main Title */}
          <h2 className="font-['Manrope'] font-bold text-[32px] leading-[44px] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4" data-aos="fade-up">
          Meet our team behind our success
          </h2>

            {/* Subtitle */}
            <p className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]" data-aos="fade-up">
              {misc?.teamSecPara}
            </p>
        </div>

      <div className="max-w-7xl mx-auto">
   <HrLineWithHeadingText text="THE BOARD"></HrLineWithHeadingText>

        
        {/* Category Filter Tabs */}
        {/* <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="bg-[#FFFFFF]/70 p-1.5 rounded-[8px] flex items-center gap-1 border border-white/30 shadow-xs">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleTabChange(category)}
                  className={`px-5 py-2 rounded-[4px] text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[var(--landingPagePrimaryColor)] text-white shadow-md'
                      : 'text-[#45484D] hover:text-[var(--landingPagePrimaryColor)] hover:bg-white/40'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div> */}

        {/* Main Section Outer Container */}
        <div className="bg-[#ffff] rounded-[16px] p-6 sm:p-8 lg:p-10 border border-white/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: SELECT PERSONNEL LIST (5 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-gray-400/20 pb-6 lg:pb-0 lg:pr-6">
            {/* <span className="font-[Manrope] font-bold text-[12px] leading-[20px] tracking-[2px] align-middle text-[var(--landingPagePrimaryColor)] uppercase mb-2">
              SELECT PERSONNEL
            </span> */}

            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredMembers.map((member) => {
                const isSelected = selectedMember.id === member.id;
                return (
                  <button
                    key={member.id}
                    onClick={() => handleSelectMember(member)}
                    className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-4 transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#DDECF5]/40 border-[#DDECF5] shadow-xs'
                        : ' border-[#E9F2F8]'
                    }`}
                  >
                    {/* Member Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs bg-slate-200">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        style={{ objectPosition: "top" }}
                        className="w-full h-full object-cover select-none"
                      />
                    </div>

                    {/* Member Name & Role */}
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {member.name}
                      </h4>
                      <p className="font-[Hind] font-normal text-[12px] leading-[16px] tracking-[0px] align-middle text-[var(--primaryTextColorLanding)] truncate">
                        {member.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: ANIMATED PROFILE DETAIL VIEW (7 Cols on lg) */}
          <div className="lg:col-span-8 flex flex-col">
            <div 
              className={`grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start transition-all duration-300 ease-in-out ${
                isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              
              {/* Photo & Name Card (5 Cols on md) */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md border border-white/60 bg-slate-200 mb-4">
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-top object-cover select-none"
                  />
                </div>
                <h3 className="font-[Manrope] font-bold text-[24px] leading-[30px] tracking-[0%] text-center text-[var(--landingPageColorPrimary2)]">
                  {selectedMember.name}
                </h3>
                <p className="font-[Hind] font-bold text-[14px] text-[var(--primaryTextColorLanding3)] leading-[20px] tracking-[0px] text-center align-middle uppercase mt-0.5 ">
                  {selectedMember.role}
                </p>
              </div>

              {/* Biography & Metadata Column (7 Cols on md) */}
              <div className="md:col-span-7 flex flex-col justify-between h-full pt-1">
                
                {/* Paragraphs */}
              <div className="flex flex-col gap-3 font-[Hind] font-normal text-[16px] leading-[20px] tracking-[0px] text-[var(--primaryTextColorLanding)] mb-6">
                {selectedMember.bio.map((paragraph, idx) => (
                  <p key={idx}>
                    {idx === 0
                      ? paragraph.split(" ").map((word, i) =>
                          i < 2 ? (
                            <span key={i} className="text-[var(--primaryTextColorLanding3)]">
                              {word}{" "}
                            </span>
                          ) : (
                            word + " "
                          )
                        )
                      : paragraph}
                  </p>
                ))}
              </div>


                {/* Metadata List */}
                <div className="border-y border-gray-400/20 pt-4 flex flex-col gap-2.5">
                  {selectedMember.metadata.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-400/10 last:border-0">
                      <span className="font-[Hind] font-bold text-[14px] text-[#3E4145] leading-[20px] tracking-[0px]">{item.label}</span>
                      <span className="text-[#3E4145] font-[Hind] font-light text-[14px] leading-[20px] tracking-[0px] align-middle">{item.value}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}