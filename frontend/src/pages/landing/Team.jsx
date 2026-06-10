'use client';

import Image from 'next/image';
import s from './css/teamsection.module.css';
import SectionBadge from '../../components/reusable/HeadingAndPara/SectionBage';
import MainHeading from '../../components/reusable/HeadingAndPara/MainHeading';
import SectionParagraph from '../../components/reusable/HeadingAndPara/SectionParagraph';
import kadam from "../../../public/img/team/kadam.jpeg"
import abhighy from "../../../public/img/team/abhigya.jpeg"
import arun from "../../../public/img/team/kadam.jpeg"
import devendra from "../../../public/img/team/devendra.jpeg"
import bikram from "../../../public/img/team/bikram.jpg"

export default function TeamSection() {
  // Balanced database collection array representing the precise image assets layout
  const directors = [
    {
      name: 'Kadam Kc',
      role: 'Chairman',
      meta: 'Kadam KC, an entrepreneur with a master in environmental science and geotechnical engineering from UK universities, has over 15 years in business. ',
      imageUrl: kadam.src 
    },
    {
      name: 'Abhigya Malla',
      role: ' Director',
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
      meta: 'A leading businessman in the construction and infrastructure sector, with extensive experience driving growth across multiple enterprises. ',
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
    <section className={s.sectionWrapper}>
      
      {/* Reusing Typography Architecture Components */}
      <div className="flex flex-col items-center">
        <SectionBadge text="Leadership Team" />
        <MainHeading text="Board of Directors" />
        <SectionParagraph text="Industry veterans steering North Summit Hydro towards Nepal's sustainable energy future." />
      </div>

      {/* Grid Alignment Cards Deck */}
      <div className={s.teamGrid}>
        {directors.map((member, index) => (
          <div key={index} className={s.memberCard}>
            
            <div className={s.imageContainer}>
              {/* Fallback pattern configured alongside standard Next image framework */}
              <img 
                src={member.imageUrl} 
                alt={`${member.name} - ${member.role}`}
                className={s.cardImage}
                onError={(e) => {
                  // Fallback gray background silhouette if assets are loading/missing
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='125' viewBox='0 0 100 125'%3E%3Crect width='100%25' height='100%25' fill='%23cbd5e1'/%3E%3C/svg%3E";
                }}
              />
              <div className={s.imageOverlay} />
            </div>

            <div className={s.cardContent}>
              <div className={s.roleBadge}>
                <span className={s.roleDot} />
                {member.role}
              </div>
              <h3 className={s.memberName}>{member.name}</h3>
              <p className={s.memberMeta}>{member.meta}</p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}