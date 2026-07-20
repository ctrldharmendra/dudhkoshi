"use client"

import Link from 'next/link';
import React from 'react';
import { FiUser, FiMail, FiBriefcase } from 'react-icons/fi';
import Confetti from './award/Confetti/Confetti';

export default function ApplicantDetails({ applicantDetails, bidMasterDetails }) {
  if (!applicantDetails) return null;
  // console.log(applicantDetails, "applicantDetails")

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm relative">


{/* SHOWING WELCOME ANIMATION  */}
{
  bidMasterDetails?.award_status ==="AWARDED" && bidMasterDetails?.awarded_to == applicantDetails?.user_id && (
<Confetti></Confetti>
  )
}
{/* SHOWING WELCOME ANIMATION END */}



      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-[var(--iconBgColro,#dbeafe)] text-[var(--iconColor,#155dfc)]">
          <FiUser />
        </div>
<div>
          <div>
          <span className="text-xs font-bold text-[var(--adminPrimaryColor)] uppercase tracking-wider block">Applicant Profile</span>
          <h2 className="text-xl font-black text-[var(--blackText,#090909)]">Who has applied?</h2>
        </div>
        <div className='sm:absolute sm:top-2 sm:right-2 top-0 right-0 relative text-blue-600 font-semibold underline underline-offset-4 hover:text-blue-800 transition-colors cursor-pointer'>
          <Link href={`/dashboard/manage/users/${applicantDetails.user_id}`}>
          View This Applicant
          </Link>
        </div>
</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Full Name */}
        <div className="space-y-1">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
            <FiUser className="text-gray-400" /> Full Name
          </div>
          <p className="text-base font-bold text-[var(--blackText,#090909)] break-words">
            {applicantDetails?.user_name}
          </p>
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
            <FiMail className="text-gray-400" /> Email Address
          </div>
          <p className="text-base font-bold text-[var(--blackText,#090909)] break-words">
            {applicantDetails?.user_email}
          </p>
        </div>

        {/* Organization */}
        <div className="space-y-1">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
            <FiBriefcase className="text-gray-400" /> Organization / Company
          </div>
          <p className="text-base font-bold text-[var(--blackText,#090909)] break-words">
            {applicantDetails?.organization_name || "Personal Application"}
          </p>
        </div>
      </div>
    </div>
  );
}