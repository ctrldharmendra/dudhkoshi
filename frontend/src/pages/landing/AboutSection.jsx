'use client';

import s from './css/aboutsection.module.css';
import SectionBadge from '../../components/reusable/HeadingAndPara/SectionBage';
import MainHeading from '../../components/reusable/HeadingAndPara/MainHeading';
import SectionParagraph from '../../components/reusable/HeadingAndPara/SectionParagraph';

// Icon Set configurations from react-icons

import { 
  FiMapPin, FiCompass, FiCpu, FiEye, 
  FiAward, FiCornerDownRight, FiNavigation 
} from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section className={s.sectionWrapper}>
      
      {/* Reusable Header Components Stack */}
      <div className="flex flex-col items-center">
        <SectionBadge text="About Us" />
        <MainHeading text="Built around the landscape, not imposed on it." />
        <SectionParagraph text="North Summit Hydro Limited is developing the Nyadi-Phidi Hydropower Project with a clear operating principle: understand the terrain deeply, build responsibly, and turn that insight into reliable renewable energy for Nepal." />
      </div>

      {/* Main Multi-Column Workspace Grid */}
      <div className={s.asymmetricGrid}>
        
        {/* --- LEFT COLUMN TRACKS --- */}
        <div className={s.leftColumn}>
          
          {/* Top Main Snapshot Block */}
          <div className={s.baseCard}>
            <span className={s.cardTag}>Company Snapshot</span>
            <h3 className={s.cardTitle}>A focused hydropower developer, active since 2016</h3>
            <div className="mb-4 text-xs font-bold">
              <span className={s.liveBadge}>● LIVE PROJECT CONTEXT</span>
            </div>
            <p className={s.cardDesc}>
              <strong>North Summit Hydro Limited</strong> was established to move promising Nepali hydropower sites from concept to bankable, buildable infrastructure. Our flagship effort in Lamjung is shaped by field conditions, engineering discipline, and a practical understanding of how projects perform on the ground.
            </p>
            <p className={`${s.cardDesc} mt-4`}>
              The Nyadi-Phidi Hydropower Project combines technical preparation, financial coordination, and community-aware execution. The result is a cleaner energy story that feels specific to the site instead of generic to the sector.
            </p>
          </div>

          {/* Core Intent Cross Split Layout Box */}
          <div className={s.splitLayoutCard}>
            <div className={s.splitSide}>
              <div className="text-[var(--color-secondary)] font-bold flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
                <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 bg-sky-100 text-sky-700 transition-colors group-hover:border-sky-300 group-hover:bg-sky-300'>
                    
              <FiCompass className='iconSize' />
                </div>
                
                <p> Why This Matters</p>
              </div>
              <h4 className="font-bold text-sm text-slate-800 mb-2">PROJECT INTENT</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reliable renewable generation with disciplined delivery.
              </p>
            </div>
            
            <div className={s.sidebarAccentBlock}>
              <div>
                <div className="text-[var(--color-secondary)] font-bold flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
                    <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 bg-sky-100 text-sky-700 transition-colors group-hover:border-sky-300 group-hover:bg-sky-300'> 

                  <FiEye  className='iconSize'/> 
                    </div>
                  <p>Delivery Lens</p>
                </div>
                <h4 className="font-bold text-sm text-slate-800 mb-2">TERRAIN-AWARE PLANNING</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Terrain-aware planning, environmental care, and accountable execution.
                </p>
              </div>
              <a href="#" className="text-xs font-bold text-sky-600 flex items-center gap-1 mt-4 hover:underline">
                Explore the full site story <FiCornerDownRight />
              </a>
            </div>
          </div>

          {/* Two Box Horizontal Grid Row Split */}
          <div className={s.subCardRow}>
            <div className={s.baseCard}>
                <div className="text-[var(--color-secondary)] font-bold flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">

                <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 bg-sky-100 text-sky-700 transition-colors group-hover:border-sky-300 group-hover:bg-sky-300'>

              <FiMapPin className="iconSize" />
                </div>
              <p>Project Location</p>
              </div>
              <h4 className="font-bold text-base mb-2">Lamjung District, Nepal</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Positioned in Marsyangdi Gaupalika, the site benefits from strong geographic identity and clear hydropower relevance.</p>
            </div>

            <div className={s.baseCard}>
                <div className="text-[var(--color-secondary)] font-bold flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
<div className='mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 bg-sky-100 text-sky-700 transition-colors group-hover:border-sky-300 group-hover:bg-sky-300'>

              <FiCpu className="iconSize" />
</div>
              <p>Scheme Type</p>
              </div>
              <h4 className="font-bold text-base mb-2">Run-of-River Hydropower</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Designed to convert flowing water into dependable energy while avoiding the footprint of large storage-based development.</p>
            </div>

            <div className={s.baseCard}>
                                <div className="text-[var(--color-secondary)] font-bold flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
<div className='mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 bg-sky-100 text-sky-700 transition-colors group-hover:border-sky-300 group-hover:bg-sky-300'>


              <FiAward className="iconSize" />
</div>
              <p>LorEm</p>
            </div>
              <h4 className="font-bold text-base mb-1">Precision</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Every design decision is tied to site realities, constructability, and long-term plant performance.</p>
            </div>

            <div className={s.baseCard}>
                                <div className="text-[var(--color-secondary)] font-bold flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
<div className='mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 bg-sky-100 text-sky-700 transition-colors group-hover:border-sky-300 group-hover:bg-sky-300'>
    
              <FiEye className="iconSize" />
</div>
<p>Lorem</p>
            </div>
              <h4 className="font-bold text-base mb-1">Transparency</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Investors, lenders, regulators, and communities get a clearer view of progress and project direction.</p>
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN TRACKS (GEOGRAPHIC DATA & MAP) --- */}
        <div className={`${s.baseCard} ${s.mapCard}`}>
          <span className={s.cardTag}>Spatial Context</span>
          <h3 className={s.cardTitle}>The map carries the story.</h3>
          
          <span className="inline-block text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
            28°24'27"–28°26'13"N, 84°30'10"–84°31'43"E
          </span>

          <p className={`${s.cardDesc} mt-3`}>
            The Nyadi-Phidi site sits in a landscape where river, slope, and access route all shape engineering choices. Surfacing that geography makes the project easier to understand at a glance.
          </p>

          <div className={s.pillContainer}>
            <span className={s.geoPill}>Lamjung District</span>
            <span className={s.geoPill}>Run-of-River Footprint</span>
            <span className={s.geoPill}>Terrain-Aware Planning</span>
          </div>

          {/* Interactive Native Vector Map Graphic Placement Area */}
          <div className={s.mapPlaceholder}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-sky-500/5">
              <FiNavigation className="text-3xl text-sky-500 animate-bounce mb-2" />
              <span className="text-xs font-bold text-sky-900">NYADI-PHIDI SITE AREA MAP</span>
              <span className="text-[10px] text-sky-600/80 mt-1">GANDAKI PROVINCE, NEPAL</span>
            </div>
            
            <button className="absolute bottom-3 left-3 bg-sky-600 text-white font-bold text-[10px] px-3 py-1.5 rounded flex items-center gap-1 shadow hover:bg-sky-700">
              <FiMapPin /> GET DIRECTIONS
            </button>
          </div>

          {/* Vertical Details Attribute Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Terrain</span>
              <p className="text-xs font-bold text-slate-700 mt-0.5">Lamjung ridgeline and river corridor</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Water Source</span>
              <p className="text-xs font-bold text-slate-700 mt-0.5">Nyadi River run-of-river intake</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Access</span>
              <p className="text-xs font-bold text-slate-700 mt-0.5">Linked to the Kathmandu approach corridor</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Context</span>
              <p className="text-xs font-bold text-slate-700 mt-0.5">Engineered for grid-ready clean energy delivery</p>
            </div>
          </div>
        </div>

      </div>

      {/* --- HORIZONTAL BOTTOM STATS STRIP --- */}
      <div className={s.statsStrip}>
        <div className={s.statUnit}>
          <div className={s.statNum}>2016</div>
          <div className={s.statLabel}>Company established</div>
        </div>
        <div className={s.statUnit}>
          <div className={s.statNum}>7</div>
          <div className={s.statLabel}>Board members guiding governance</div>
        </div>
        <div className={s.statUnit}>
          <div className={s.statNum}>5</div>
          <div className={s.statLabel}>Consortium banks supporting delivery</div>
        </div>
        <div className={s.statUnit}>
          <div className={s.statNum}>150+</div>
          <div className={s.statLabel}>Years of combined sector experience</div>
        </div>
      </div>

    </section>
  );
}