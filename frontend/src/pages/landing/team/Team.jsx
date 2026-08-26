"use client";

import React, { useState, useMemo } from 'react';

import kadam from "../../../../public/landing/team/kadamKc.jpeg"
import abhigya from "../../../../public/landing/team/abhigyamalla.jpeg"
import arun from "../../../../public/landing/team/arun.jpg"
import bikram from "../../../../public/landing/team/bikramgautam.jpg"
import devendra from "../../../../public/landing/team/devendraadhi.jpeg"
import HrLineWithHeadingText from '../components/HrLineWithHeadingText';
import StyledSubHeadingWithPill from '../components/StyledSubHeadingWithPill';


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
      'Abhigya Malla is a finance professional, project developer, and emerging leader in Nepal’s hydropower and construction sector. She holds a Master’s degree in Professional Accountancy and a Master’s in Commerce with a specialization in Finance from Macquarie University, Australia. She currently serves as Vice President and Finance Controller at High Himalaya Hydro Construction Pvt. Ltd., where she is involved in the development and management of several hydropower projects.',
      'Her portfolio includes Aayu Malun (21 MW), Puwa Khola (4 MW), Hongu Khola (28.9 MW), Midim Khola (3 MW), and Upper Tamor A (60 MW). As a youth contractor and project developer, she combines strong financial expertise with practical experience in infrastructure development. She also serves as Managing Director of Union Hydropower Public Ltd., further demonstrating her leadership and commitment to Nepal’s growing hydropower industry.'
    ],
    metadata: [
      { label: 'Background', value: 'Australia Master’s Alumnus' },
      { label: 'Experience', value: '7+ Years' },
      { label: 'Focus', value: 'Finance & Contractor' }
    ]
  },
  // {
  //   id: '3',
  //   name: 'Devendra Adhikari',
  //   role: 'Director',
  //   category: 'Directors',
  //   avatar: devendra.src,
  //   photo: devendra.src,
  //   bio: [
  //     'Devendra Adhikari, Holds Masters in Professional Accountancy and Commerce in Finance (Macquarie University, Australia).',
  //     'A seasoned entrepreneur with 30+ years of experience in trading, export, agriculture, and real estate; former Director of Lumbini Finance and Lumbini Bikash Bank; active capital market investor and real estate developer.'
  //   ],
  //   metadata: [
  //     { label: 'Background', value: 'UK Master’s Alumnus' },
  //     { label: 'Experience', value: '30+ Years' },
  //     { label: 'Focus', value: 'Real estate & Investor' }
  //   ]
  // },
  {
    id: '4',
    name: 'Bikram Gautam',
    role: 'Chief Engineer',
    category: 'Engineering',
    avatar: bikram.src,
    photo: bikram.src,
    bio: [
      'Bikram Gautam, With over 15 years of experience leading large-scale manufacturing and construction teams, He brings deep expertise in the Real Estate and Mines business sectors. ',
      'He has a strong track record in end-to-end product development, operational leadership, and project execution. His experience includes strategic planning, cross-functional team management, process optimization, and delivering high-quality, cost-effective solutions that drive sustainable business growth and long-term value.'
    ],
    metadata: [
      { label: 'Background', value: 'Australia Master’s Alumnus' },
      { label: 'Experience', value: '7+ Years' },
      { label: 'Focus', value: 'Finance & Contractor' }
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
      'Arun Kumar Agarwal is a prominent businessman with extensive experience in the construction, infrastructure, trading, and retail sectors. As the driving force behind Rajesh Trade Link, he has played an important role in building and expanding a strong business presence across the country. His entrepreneurial portfolio also includes RTL Mall and Goyal Aluminum, reflecting his diverse interests and ability to manage businesses across multiple industries.',
      ' With a focus on quality, reliability, and long-term growth, he has developed an extensive nationwide distribution network that enables his businesses to effectively serve customers and partners in different markets. His leadership is characterized by strategic vision, strong business relationships, and a commitment to sustainable growth. Through his ventures, he continues to contribute to the development of construction, infrastructure, distribution, and commercial sectors while strengthening his position as an influential entrepreneur.'
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
          <h2 className="font-['Manrope'] font-bold text-[32px] leading-[44px] tracking-[0%] text-center capitalize text-[var(--landingPageColorPrimary2)] mb-4">
          Meet our team behind our success
          </h2>

          {/* Subtitle */}
          <p className="font-['Hind'] font-normal text-[20px] leading-[32px] tracking-[0%] text-center text-[var(--textColorOnLightBg)]">
    Meet the multi-disciplinary team of engineers, environmental scientists, and strategic investors driving the 95.7 MW Dudhkoshi vision toward sustainable energy independence.
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
            <span className="font-[Manrope] font-bold text-[12px] leading-[20px] tracking-[2px] align-middle text-[var(--landingPagePrimaryColor)] uppercase mb-2">
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
                        ? 'bg-[#DDECF5]/40 border-[#DDECF5] shadow-xs'
                        : ' border-[#E9F2F8]'
                    }`}
                  >
                    {/* Member Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs bg-slate-200">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        style={{objectPosition: 'top'}}
                        className="w-full h-full object-cover"
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
                    className="w-full h-full object-top object-cover"
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