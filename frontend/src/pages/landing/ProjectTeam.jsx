'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import SectionBadge from '../../components/reusable/HeadingAndPara/SectionBage';


// Explicit asset imports as requested
import kadam from "../../../public/img/team/kadam.jpeg";
import abhighy from "../../../public/img/team/abhigya.jpeg";
import arun from "../../../public/img/team/kadam.jpeg"; 
import devendra from "../../../public/img/team/devendra.jpeg";
import bikram from "../../../public/img/team/bikram.jpg";

export default function ProjectTeam() {
  const directors = [
    {
      name: 'Kadam Kc',
      role: 'Chairman',
      meta: 'Kadam KC, an entrepreneur with a master in environmental science and geotechnical engineering from UK universities, has over 15 years in business.',
      imageUrl: kadam.src 
    },
    {
      name: 'Abhigya Malla',
      role: 'Director',
      meta: 'Holds Masters in Professional Accountancy and Commerce in Finance (Macquarie University, Australia).',
      imageUrl: abhighy.src
    },
    {
      name: 'Devendra Adhikari',
      role: 'Director',
      meta: 'A seasoned entrepreneur with 30+ years of experience in trading, export, agriculture, and real estate;',
      imageUrl: devendra.src
    },
    {
      name: 'Arun Agarwal',
      role: 'Director',
      meta: 'A leading businessman in the construction and infrastructure sector, with extensive experience driving growth across multiple enterprises.',
      imageUrl: arun.src
    },
    {
      name: 'Bikram Gautam',
      role: 'Director',
      meta: 'With over 15 years of experience leading large-scale manufacturing and construction teams, He brings deep expertise in the Real Estate and Mines business sectors.',
      imageUrl: bikram.src
    }
  ];

  return (
    <section className="w-full max-w-[1300px] mx-auto px-6 py-16 bg-[var(--bg-light)]">
      
      {/* Centered Top Badge Header */}
      <div className="flex flex-col items-center mb-12">
        <SectionBadge text="Project Team" />
      </div>

      {/* Grid Canvas matching image_76436b.jpg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {directors.map((member, index) => (
          <div 
            key={index} 
            className="flex bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {/* Left Side: Image Profile Cutout */}
            <div className="w-1/3 min-w-[110px] relative bg-slate-100 flex-shrink-0">
              <img 
                src={member.imageUrl} 
                alt={member.name}
                className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%23cbd5e1'/%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Right Side: Professional Identity Card Copy */}
            <div className="w-2/3 p-4 flex flex-col justify-center">
              {/* Green Style Badge indicator text */}
              <div className="text-[10px] font-black tracking-widest text-emerald-600 uppercase mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {member.role}
              </div>

              {/* Individual Core Full Name */}
              <h3 className="text-base font-black text-[var(--primaryTextColor)] leading-tight mb-2">
                {member.name}
              </h3>

              {/* Background Meta Bio Text Snippet */}
              <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed font-medium">
                {member.meta}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Interface Nav Anchor Button */}
      <div className="flex justify-center mt-12">
        <Link 
          href="/team" 
          className="inline-flex items-center gap-2 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:scale-[1.02] hover:shadow-lg"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Explore Full Leadership Profiles <FiArrowRight className="text-base" />
        </Link>
      </div>

    </section>
  );
}