"use client"

import React from 'react';
import { FiFileText, FiCalendar, FiActivity } from 'react-icons/fi';

export default function BidDetails({ bidMasterDetails, applicantDetails }) {
    // console.log(applicantDetails)
  if (!bidMasterDetails) return null;

  // Format date helper to make it simple and friendly for seniors
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }; 

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
      {/* Header section */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-purple-50 text-[var(--adminPrimaryColor,#8200db)]">
          <FiFileText />
        </div>
        <div>
          <span className="text-xs font-bold text-[var(--adminPrimaryColor)] uppercase tracking-wider block">Target Tender</span>
<h2 className="text-xl font-black text-[var(--blackText,#090909)]">
  What project you have Applied For?
</h2>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Project Title</span>
        <h3 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
          {bidMasterDetails?.title}
        </h3>
      </div>

      {/* Dates & Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl mb-6">
        <div>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1 mb-1">
            <FiCalendar /> Published On
          </span>
          <p className="text-sm font-bold text-slate-700">{formatDate(bidMasterDetails?.publishDate)}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1 mb-1">
            <FiCalendar /> Submission Opening
          </span>
          <p className="text-sm font-bold text-slate-700">{formatDate(bidMasterDetails?.openDate)}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1 mb-1">
            <FiActivity /> Status
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black ${
            bidMasterDetails?.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
          }`}>
            • {bidMasterDetails?.status}
          </span>
        </div>
      </div>

      {/* Description Layout Block */}
      <div>
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">Project Details & Objectives</span>
        <p className=" text-gray-700 text-[18px] md:text-[20px] font-medium leading-relaxed whitespace-pre-line bg-white border border-gray-100 rounded-xl p-4 shadow-2xs">
          {bidMasterDetails?.description}
        </p>
      </div>
    </div>
  );
}