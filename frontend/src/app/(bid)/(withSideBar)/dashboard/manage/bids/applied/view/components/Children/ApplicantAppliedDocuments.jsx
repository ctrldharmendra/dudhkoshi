"use client"

import Link from 'next/link';
import React from 'react';
import { FiPaperclip, FiAlignLeft, FiHash, FiDownload } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';

export default function ApplicantAppliedDocuments({ bidDynamicDocumentDetails }) {

const baseContentPath = process.env.NEXT_PUBLIC_BASE_CONTENT_URL
  if (!bidDynamicDocumentDetails || bidDynamicDocumentDetails.length === 0) return null;


  // console.log(bidDynamicDocumentDetails, "bidDynamicDocumentDetails")
  // Render friendly layout wrappers based on the incoming answer format
  const renderFieldTypeBadge = (type) => {
    switch (type) {
      case 'file':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100"><FiPaperclip /> 
        {/* Attached Document */}
        </span>;
      case 'number':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100"><FiHash /> 
        {/* Number Metric */}
        </span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-100"><FiAlignLeft /> 
        {/* Text Info */}
        </span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-amber-50 text-amber-600">
          <FiPaperclip />
        </div>
        <div>
          <span className="text-xs font-bold text-[var(--adminPrimaryColor)] uppercase tracking-wider block">Submitted Details</span>
          <h2 className="text-xl font-black text-[var(--blackText,#090909)]">Documets You have Provided</h2>
        </div>
      </div>

      <div className="space-y-4">
        {bidDynamicDocumentDetails?.map((field) => (
          <div 
            key={field.field_id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {renderFieldTypeBadge(field.field_type)}
                <h4 className="text-sm font-black text-slate-700 capitalize">
                 "{field.field_name}"
                </h4>
              </div>

              {/* Show different elements depending on field types */}
              {field.field_type === 'file' ? (
                      <Link
                href={`${baseContentPath}/${field.document_path}`}
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--addBtnBg,#155dfb)] hover:bg-[var(--addBtnBgHover,#0744c9)] text-white text-xs mt-2 font-black rounded-xl shadow-sm transition-colors w-full sm:w-auto"
              >
                <GrView className="text-sm" /> View {field.field_name}
              </Link>
              ) : (
                <p className="text-base font-bold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-gray-100 inline-block min-w-[150px]">
                  {field.document_path}
                </p>
              )}
            </div>

            {/* If it's an uploaded document file, give an easily clickable action link */}
            {/* {field.field_type === 'file' && (
              <a 
                href={`${baseContentPath}/${field.document_path}`}
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--addBtnBg,#155dfb)] hover:bg-[var(--addBtnBgHover,#0744c9)] text-white text-xs font-black rounded-xl shadow-sm transition-colors w-full sm:w-auto"
              >
                <FiDownload className="text-sm" /> View Document File
              </a>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}