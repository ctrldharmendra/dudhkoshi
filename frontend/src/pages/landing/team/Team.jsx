"use client";

import React, { useState, useMemo } from 'react';

import kadam from "../../../../public/landing/team/kadamKc.jpeg"
import abhigya from "../../../../public/landing/team/abhigyamalla.jpeg"
import arun from "../../../../public/landing/team/arun.jpg"
import bikram from "../../../../public/landing/team/bikramgautam.jpg"
import devendra from "../../../../public/landing/team/devendraadhi.jpeg"
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';


// Sample Team Data Array
const teamMembersData = [
  {
    id: '1',
    name: 'Kadam KC',
    role: 'Chairman',
    category: 'Directors',
    avatar: kadam.src,
    photo: kadam.src,
    bio: [
      'Kadam KC, an entrepreneur with a master\'s in environmental science and geotechnical engineering from UK universities, has over 15 years in business.',
      'His leadership bridges the gap between complex geotechnical requirements and environmental stewardship, ensuring the Dudhkoshi project adheres to the highest global standards.',
      'While in the UK, he was active in both business and social work. After returning to Nepal, he focused on hydropower, successfully completing Puwa Khola-1 Hydropower (4 MW). He chairs Aayu Entertainments Pvt. Ltd. and is launching Fishtail Dream Park in Pokhara. He also founded Dhaulagiri Construction and Development Pvt. Ltd. and serves on the board of High Himalaya Hydro Construction Pvt. Ltd.'
    ],
    metadata: [
      { label: 'Background', value: 'UK Master\'s Alumnus' },
      { label: 'Experience', value: '15+ Years' },
      { label: 'Focus', value: 'Geotechnical & Environmental' }
    ]
  },
  {
    id: '2',
    name: 'Abhigya Malla',
    role: 'Director',
    category: 'Directors',
    avatar: abhigya.src,
    photo: abhigya.src,
    bio: [
      'Abhigya Malla brings extensive financial planning and strategic leadership expertise to the Dudhkoshi Hydropower board.',
      'Her strategic vision focuses on long-term sustainability, risk management, and fostering key institutional partnerships to ensure optimal project execution.'
    ],
    metadata: [
      { label: 'Background', value: 'Finance & Strategy' },
      { label: 'Experience', value: '12+ Years' },
      { label: 'Focus', value: 'Corporate Governance & Risk' }
    ]
  },
  {
    id: '3',
    name: 'Devendra Adhikari',
    role: 'Director',
    category: 'Directors',
    avatar: devendra.src,
    photo: devendra.src,
    bio: [
      'Devendra Adhikari has been a pivotal force in infrastructure development across Nepal for over two decades.',
      'His deep domain experience in regulatory affairs and community relations ensures smooth project operations and stakeholder alignment.'
    ],
    metadata: [
      { label: 'Background', value: 'Infrastructure & Policy' },
      { label: 'Experience', value: '20+ Years' },
      { label: 'Focus', value: 'Regulatory Affairs' }
    ]
  },
  {
    id: '4',
    name: 'Bikram Gautam',
    role: 'Chief Engineer',
    category: 'Engineering',
    avatar: bikram.src,
    photo: bikram.src,
    bio: [
      'Bikram Gautam leads the core engineering team, overseeing hydraulic design, structural modeling, and site execution.',
      'He brings specialized technical expertise in high-head hydropower systems and tunnelling operations.'
    ],
    metadata: [
      { label: 'Background', value: 'Civil & Hydraulic Engineering' },
      { label: 'Experience', value: '10+ Years' },
      { label: 'Focus', value: 'PRoR Design & Hydraulics' }
    ]
  },
  {
    id: '5',
    name: 'Arun Kumar Agarwal',
    role: 'General Manager',
    category: 'Management',
    avatar: arun.src,
    photo: arun.src,
    bio: [
      'Arun Kumar Agarwal manages day-to-day operations, procurement, and financial control across all operational units.',
      'His disciplined management approach ensures project timelines and budget benchmarks are consistently met.'
    ],
    metadata: [
      { label: 'Background', value: 'Operations Management' },
      { label: 'Experience', value: '14+ Years' },
      { label: 'Focus', value: 'Resource Allocation & PMO' }
    ]
  }
];

export default function TeamSection() {
  const categories = ['All', 'Directors', 'Engineering', 'Management'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter team list based on active category tab
  const filteredMembers = useMemo(() => {
    if (activeCategory === 'All') return teamMembersData;
    return teamMembersData.filter(member => member.category === activeCategory);
  }, [activeCategory]);

  // Track selected member for the detailed right-side view
  const [selectedMember, setSelectedMember] = useState(teamMembersData[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle changing member with a smooth transition
  const handleSelectMember = (member) => {
    if (member.id === selectedMember.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedMember(member);
      setIsAnimating(false);
    }, 150); // Short delay for cross-fade effect
  };

  // Handle tab change (auto-select first member in new filtered list)
  const handleTabChange = (category) => {
    setActiveCategory(category);
    const newFiltered = category === 'All' 
      ? teamMembersData 
      : teamMembersData.filter(m => m.category === category);
    if (newFiltered.length > 0) {
      handleSelectMember(newFiltered[0]);
    }
  };

  return (
    <section 
      className="w-full bg-[#D3DEE8] py-16 px-4 sm:px-6 lg:px-8  antialiased text-[#45484D]"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--landingPageSecondaryColor': '#64748b',
        '--lightWhite': '#FFFFFF',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <div className="max-w-7xl mx-auto">
   <HrLineWithHeadingText text="THE BOARD"></HrLineWithHeadingText>

        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="bg-[#B8C8D6]/60 p-1.5 rounded-2xl flex items-center gap-1 border border-white/30 shadow-xs">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleTabChange(category)}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
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
        </div>

        {/* Main Section Outer Container */}
        <div className="bg-[#C6D4E1]/80 rounded-[32px] p-6 sm:p-8 lg:p-10 border border-white/50 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: SELECT PERSONNEL LIST (5 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-gray-400/20 pb-6 lg:pb-0 lg:pr-6">
            <span className="text-[11px] font-bold tracking-widest text-[var(--landingPagePrimaryColor)] uppercase mb-2">
              SELECT PERSONNEL
            </span>

            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredMembers.map((member) => {
                const isSelected = selectedMember.id === member.id;
                return (
                  <button
                    key={member.id}
                    onClick={() => handleSelectMember(member)}
                    className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-4 transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#B0C4D5]/90 border-white/60 shadow-xs'
                        : 'bg-[#C1D0DE]/50 hover:bg-[#B8C9D8]/70 border-transparent'
                    }`}
                  >
                    {/* Member Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs bg-slate-200">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Member Name & Role */}
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {member.name}
                      </h4>
                      <p className="text-xs text-[var(--landingPageSecondaryColor)] font-medium truncate">
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
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--landingPagePrimaryColor)]">
                  {selectedMember.name}
                </h3>
                <p className="text-xs font-bold tracking-widest text-slate-600 uppercase mt-0.5">
                  {selectedMember.role}
                </p>
              </div>

              {/* Biography & Metadata Column (7 Cols on md) */}
              <div className="md:col-span-7 flex flex-col justify-between h-full pt-1">
                
                {/* Paragraphs */}
                <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6">
                  {selectedMember.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Metadata List */}
                <div className="border-t border-gray-400/20 pt-4 flex flex-col gap-2.5">
                  {selectedMember.metadata.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-400/10 last:border-0">
                      <span className="font-bold text-slate-800">{item.label}</span>
                      <span className="text-[var(--landingPageSecondaryColor)] font-medium">{item.value}</span>
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