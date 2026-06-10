'use client';

import { FiTrendingUp, FiPieChart, FiDollarSign, FiCheckCircle, FiShield, FiExternalLink } from 'react-icons/fi';

export default function FinancialOverview() {
  
  // Dynamic Array for the middle cards - can handle 4, 6, 8, 10+ items flawlessly
  const financialFeatures = [
    {
      title: 'Consortium-backed financing',
      desc: 'Reduced funding risk through a diversified lending pool.',
      icon: <FiShield className="text-sky-500" />
    },
    {
      title: 'Balanced D/E ratio',
      desc: 'Healthy leverage (75:25) ensures investor confidence.',
      icon: <FiTrendingUp className="text-cyan-500" />
    },
    {
      title: 'Fully funded scope',
      desc: 'EPC + transmission infrastructure fully covered, no capital gaps.',
      icon: <FiDollarSign className="text-indigo-500" />
    },
    {
      title: 'Strong due diligence',
      desc: 'Extensive verification already completed by commercial banks.',
      icon: <FiCheckCircle className="text-emerald-500" />
    }
  ];

  // Dynamic Array for banks - list adapts and scrolls after a strict max-height
  const bankingConsortium = [
    { name: 'Machhapuchre Bank Ltd (MBL)', status: 'LEAD BANK' },
    { name: 'Global IME Bank Ltd', status: 'CO-LEAD BANK' },
    { name: 'Sanima Bank Ltd', status: 'CONSORTIUM MEMBER' },
    { name: 'Prabhu Bank Ltd', status: 'CONSORTIUM MEMBER' },
    { name: 'Himalayan Bank Ltd', status: 'CONSORTIUM MEMBER' },
    { name: 'Nabil Bank Ltd', status: 'CONSORTIUM MEMBER' },
    { name: 'Nepal Investment Mega Bank', status: 'CONSORTIUM MEMBER' }
  ];

  return (
    <section className="w-full max-w-[1300px] mx-auto px-6 py-12 bg-transparent">
      
      {/* Upper Grid: Total Cost and Capital Structure Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Total Project Cost Box (Left Side - 5 Columns Wide) */}
        <div className="lg:col-span-5 bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-primary)] rounded-[var(--radius-md)] p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-6">
              <span className="p-1.5 bg-sky-50 rounded-lg text-sm"><FiTrendingUp /></span>
              Total Project Cost
            </div>
            
            <div className="mb-4">
              <h3 className="text-3xl md:text-4xl font-black text-[var(--primaryTextColor)] tracking-tight">
                NRs. 415.7
              </h3>
              <span className="text-xl font-bold text-sky-600 block mt-1">Crore</span>
              <span className="text-[11px] text-[var(--text-muted)] font-medium block mt-1">
                (Including Interest During Construction - IDC)
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] italic bg-slate-50/60 p-3 rounded-lg border border-slate-100 leading-relaxed font-medium my-4">
              "This comprehensive project cost covers civil works, electro-mechanical equipment, transmission infrastructure, financing costs during construction, and contingencies."
            </p>
          </div>

          <div className="text-[11px] font-bold text-sky-600 flex items-center gap-1.5 pt-3 border-t border-slate-100">
            <FiCheckCircle className="text-emerald-500 text-sm" /> Fully funded through to commissioning
          </div>
        </div>

        {/* Capital Structure Box (Right Side - 7 Columns Wide) */}
        <div className="lg:col-span-7 bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-primary)] rounded-[var(--radius-md)] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-6">
              <span className="p-1.5 bg-indigo-50 rounded-lg text-sm"><FiPieChart /></span>
              Capital Structure
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Progress Gauges Track */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>DEBT (75%)</span>
                    <span className="text-[var(--primaryTextColor)]">NRs. 308 Cr</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-[var(--color-primary)] rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>EQUITY (25%)</span>
                    <span className="text-[var(--primaryTextColor)]">NRs. 107.7 Cr</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-[var(--color-accent)] rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>

              {/* Box Ratio Metric Output Display */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-xl p-5 text-center">
                <div className="text-3xl font-black text-[var(--primaryTextColor)] tracking-tight">75:25</div>
                <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">DEBT-EQUITY RATIO</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed mt-4 pt-4 border-t border-slate-100/80 flex items-start gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
            Debt-Equity Ratio optimized for healthy financial leverage and sustainable long-term investor returns.
          </p>
        </div>

      </div>

      {/* Lower Dashboard Area: Scrollable Banks + Auto-Adapting Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Banking Consortium (Left - 4 Columns Wide) */}
        <div className="lg:col-span-4 bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-primary)] rounded-[var(--radius-md)] p-5 shadow-sm flex flex-col max-h-[390px]">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex-shrink-0">
            <span className="p-1.5 bg-emerald-50 rounded-lg text-sm"><FiShield /></span>
            Banking Consortium
          </div>

          {/* Fixed Container with hidden elegant vertical scrollbar overflow */}
          <div className="flex-grow overflow-y-auto pr-1.5 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {bankingConsortium.map((bank, bIdx) => (
              <div 
                key={bIdx} 
                className="p-3 bg-white border border-slate-100/70 hover:border-slate-200 rounded-xl flex items-center justify-between transition-colors shadow-2xs"
              >
                <div>
                  <h4 className="text-xs font-black text-[var(--primaryTextColor)] leading-tight">{bank.name}</h4>
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mt-1">
                    {bank.status}
                  </span>
                </div>
                <FiExternalLink className="text-slate-300 text-xs flex-shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Features Content Array + Stakeholder CTA (Right - 8 Columns Wide) */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-4">
          
          {/* Middle Dynamic Grid System - handles scaling rows natively (4, 6, 8 items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {financialFeatures.map((feat, fIdx) => (
              <div 
                key={fIdx} 
                className="bg-[var(--bg-card)] border border-[var(--border-secondary)] rounded-[var(--radius-md)] p-4 flex gap-3 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-base flex-shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[var(--text-primary)] mb-0.5">{feat.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner CTA Block */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-md)] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="max-w-xl text-center sm:text-left">
              <h4 className="text-xs font-black text-[var(--primaryTextColor)] uppercase tracking-wider mb-1">
                What This Means for Stakeholders
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                Nyadi Phidi represents a financially credible infrastructure asset with predictable long-term revenue, supported by Nepal's growing electricity demand and grid expansion.
              </p>
            </div>
            <button className="whitespace-nowrap px-6 py-2.5 bg-gradient-to-r from-sky-500 to-[var(--color-primary-dark)] text-white text-xs font-black rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md">
              Partner With Us →
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}