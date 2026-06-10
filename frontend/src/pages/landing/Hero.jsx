'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiArrowRight, FiMenu, FiX, FiZap, FiDroplet, 
  FiCompass, FiTrendingUp, FiCheckCircle, FiChevronDown 
} from 'react-icons/fi';

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f0f9ff] via-[#f8fafc] to-[#ffffff] overflow-hidden">
      
      {/* Dynamic Structural Ambient Backdrop Glow Spills */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -z-10" style={{ backgroundColor: 'var(--glow-primary)' }} />
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10" style={{ backgroundColor: 'var(--glow-secondary)' }} />

      {/* --- HEADER NAVBAR --- */}
      <header className="w-full z-50">
        {/* Constrained layout matching strict 1300px limit */}
        <div className="max-w-[1300px] mx-auto px-6 h-24 flex items-center justify-between w-full">
          
          {/* Brand/Logo Layout */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2" style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--bg-lighter)' }}>
              <FiDroplet className="text-xl animate-pulse" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider uppercase leading-none text-[#1e3a8a]">Dudhkoshi</span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-sky-600">Hydropower Ltv. Pvt.</span>
            </div>
          </Link>

          {/* Navigation Links Area */}
          <nav className="hidden lg:flex items-center gap-7">
            {['About', 'Project', 'Site Story', 'Team', 'Timeline', 'Reports', 'News', 'Contact'].map((link) => (
              <Link 
                key={link} 
                href={`/${link.toLowerCase().replace(' ', '-')}`} 
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Call to Action Trigger */}
          <div className="hidden lg:block">
            <Link 
              href="/contact" 
              className="text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Navigation Bars Menu Handle */}
          <button 
            className="lg:hidden text-2xl p-2 rounded-md" 
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Responsive Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="absolute top-24 left-0 w-full bg-white/95 backdrop-blur-md border-b px-6 py-6 flex flex-col gap-4 shadow-xl lg:hidden z-50" style={{ borderColor: 'var(--border-primary)' }}>
            {['About', 'Project', 'Site Story', 'Team', 'Timeline', 'Reports', 'News', 'Contact'].map((link) => (
              <Link key={link} href="#" className="text-base font-semibold py-1" style={{ color: 'var(--text-secondary)' }} onClick={() => setMobileMenuOpen(false)}>
                {link}
              </Link>
            ))}
            <Link href="#" className="text-center py-3 text-white rounded-full font-bold text-sm mt-2" style={{ backgroundColor: 'var(--color-primary)' }}>
              Get In Touch
            </Link>
          </div>
        )}
      </header>

      {/* --- HERO CORE MAIN FRAME --- */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-[1300px] mx-auto px-6 text-center pt-8 pb-16">
        
        {/* Floating Capsule Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border shadow-sm bg-white"
          style={{ borderColor: 'var(--border-primary)' }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-primary)' }} />
          <span style={{ color: 'var(--color-primary-dark)' }}>North Summit Hydro Limited</span>
        </div>

        {/* Dynamic Typography Stack Headings */}
        <h1 
          className="text-4xl sm:text-5xl md:text-[64px] font-black tracking-tight leading-[1.08] max-w-4xl mb-4 text-[#1e293b]"
          style={{ textShadow: '0 2px 20px rgba(14,165,233,0.05)' }}
        >
          Dudhkoshi <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] via-[#2563eb] to-[#6366f1]">
            Hydropower Project
          </span>
        </h1>

        {/* Sub-description Paragraph Paragraph */}
        <p className="text-sm sm:text-base md:text-lg max-w-2xl font-medium mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          A flagship initiative by Dudhkoshi Hydro Limited — harnessing the pristine waters of the Himalayas for a sustainable tomorrow.
        </p>

        {/* Dynamic Row Meta Capsule Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <FiZap className="text-sm" /> 21.4 MW Run-of-River
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <FiCompass /> Naxal, Nepal
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 border border-sky-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Under Construction
          </span>
        </div>

        {/* Call to Action Action Row Triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
          <Link 
            href="/explore" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Explore Project <FiArrowRight />
          </Link>
          <Link 
            href="/learn" 
            className="w-full sm:w-auto text-sm font-bold px-7 py-3.5 rounded-full border bg-white shadow-sm transition-all hover:bg-gray-50 hover:scale-[1.02]"
            style={{ borderColor: 'var(--border-accent)', color: 'var(--text-secondary)' }}
          >
            Learn More
          </Link>
        </div>

        {/* --- METRIC STATS GRID PANEL --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
          
          {/* Card 1: Capacity */}
          <div 
            className="backdrop-blur-md rounded-2xl p-6 border text-center flex flex-col items-center transition-all hover:translate-y-[-4px]"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)', boxShadow: '0 10px 30px var(--glow-primary)' }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 bg-sky-500/10 text-sky-500">
              <FiZap />
            </div>
            <span className="text-4xl font-black text-[#0f172a] tracking-tight">21.4</span>
            <span className="text-xs font-bold tracking-wider text-slate-800 mt-1">MW Capacity</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2 block border-t pt-2 w-full border-slate-100">
              ⚡ Annual Output
            </span>
          </div>

          {/* Card 2: Energy */}
          <div 
            className="backdrop-blur-md rounded-2xl p-6 border text-center flex flex-col items-center transition-all hover:translate-y-[-4px]"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-accent)', boxShadow: '0 10px 30px var(--glow-accent)' }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 bg-cyan-500/10 text-cyan-500">
              <FiDroplet />
            </div>
            <span className="text-4xl font-black text-[#0f172a] tracking-tight">129.14</span>
            <span className="text-xs font-bold tracking-wider text-slate-800 mt-1">GWh/Year</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2 block border-t pt-2 w-full border-slate-100">
              💧 Clean Energy
            </span>
          </div>

          {/* Card 3: Head Height */}
          <div 
            className="backdrop-blur-md rounded-2xl p-6 border text-center flex flex-col items-center transition-all hover:translate-y-[-4px]"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-secondary)', boxShadow: '0 10px 30px var(--glow-secondary)' }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 bg-indigo-500/10 text-indigo-500">
              <FiTrendingUp />
            </div>
            <span className="text-4xl font-black text-[#0f172a] tracking-tight">690m</span>
            <span className="text-xs font-bold tracking-wider text-slate-800 mt-1">Gross Head</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2 block border-t pt-2 w-full border-slate-100">
              ⛰️ High Head Design
            </span>
          </div>

        </div>

        {/* --- BOTTOM SYSTEM PILL ATTRIBUTES --- */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold text-slate-500 border-t border-slate-100/80 pt-8 w-full max-w-3xl">
          <span className="flex items-center gap-2"><FiCheckCircle className="text-sky-500 text-sm" /> Run-of-River Design</span>
          <span className="flex items-center gap-2"><FiCheckCircle className="text-indigo-500 text-sm" /> Minimal Environmental Impact</span>
          <span className="flex items-center gap-2"><FiCheckCircle className="text-cyan-500 text-sm" /> 132 kV Grid Connection</span>
        </div>

        {/* Floating Bottom Scroll Indicator Component */}
        <div className="flex flex-col items-center gap-1 mt-12 animate-bounce cursor-pointer">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Scroll</span>
          <div className="w-6 h-9 rounded-full border-2 flex items-start justify-center p-1 border-slate-300">
            <FiChevronDown className="text-slate-400 text-xs" />
          </div>
        </div>

      </main>
    </section>
  );
}