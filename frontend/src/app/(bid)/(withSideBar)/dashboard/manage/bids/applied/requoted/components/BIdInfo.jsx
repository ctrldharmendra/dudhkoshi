

"use client"
import React, { useEffect } from 'react'
import { FiFileText, FiCalendar, FiActivity } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { getApplicantDocumentForParticularBid } from '@/app/(bid)/redux/slices/bids/bidApplicationSlice';
import { useDispatch } from 'react-redux';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import BidFormAttachmetns from '../../../apply/[bid]/components/BidFormAttachmetns';
import { getAllReproposeWithAnsLogged } from '@/app/(bid)/redux/slices/bidRepropose/biReproposeSlice';
import RequotedQuestionsListWIthAns from './RequotedQuestionsListWIthAns';


const BIdInfo = ({bidId, applicationId}) => {
const dispatch = useDispatch()
  const particularApplicantDocumentsLoading = useSelector((state) => state?.bidApplication?.particularApplicantDocumentsLoading);  //Loading of Getiing particlar appli. documents 
  const applicantDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.applicantDetails);  //Applicant's Details 
  const bidDynamicDocumentDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.bidDynamicDocumentDetails);  //bidDynamicDocumentDetails
  const bidMasterDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.bidMasterDetails);  //bidMasterDetails
  const attachments = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.attachments);  //Attachments

  const LoggedInUserBidReProposeWithAns = useSelector((state) => state?.bidRepropse?.LoggedInUserBidReProposeWithAns);  //bidReproposeData of loggedIn user
const LoggedInUserBidReProposeWithAnsLoading = useSelector((state) => state?.bidRepropse?.LoggedInUserBidReProposeWithAnsLoading);  //bidReproposeData Loading status of loggedIn user


// console.log(LoggedInUserBidReProposeWithAns, "LoggedInUserBidReProposeWithAns")

  const createReplyReproposeLoading = useSelector((state) => state?.bidRepropse?.createReplyReproposeLoading);  //Loading of replying to particular repropose 



useEffect(() => {
    dispatch(getApplicantDocumentForParticularBid({bidId, applicationId}))
    dispatch(getAllReproposeWithAnsLogged({bidId}))
}, [])
// console.log(applicantDetails, "applicantDetails")
      const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }; 

  {
    particularApplicantDocumentsLoading && createReplyReproposeLoading && LoggedInUserBidReProposeWithAnsLoading  &&
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
    </div>
  }


  return (
    <div>
        {/* <h1>BidInfo {bidId}</h1> */}
    
    
       <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
      {/* Header section */}
      {/* <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-purple-50 text-[var(--adminPrimaryColor,#8200db)]">
          <FiFileText />
        </div>
        <div>
          <span className="text-xs font-bold text-[var(--adminPrimaryColor)] uppercase tracking-wider block">Target Tender</span>
<h2 className="text-xl font-black text-[var(--blackText,#090909)]">
  What project you have Applied For?
</h2>
        </div>
      </div> */}

      {/* Title */}
      <div className="mb-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Project Title</span>
        <h3 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
          {bidMasterDetails?.title || "N/A"}
        </h3>
      </div>

      {/* Dates & Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl mb-6">
        <div>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1 mb-1">
            <FiCalendar /> Published On
          </span>
          <p className="text-sm font-bold text-slate-700">{formatDate(bidMasterDetails?.publishDate) || ""}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1 mb-1">
            <FiCalendar /> Close Date
          </span>
          <p className="text-sm font-bold text-slate-700">{formatDate(bidMasterDetails?.closeDate) || ""}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1 mb-1">
            <FiCalendar /> Submission Opening
          </span>
          <p className="text-sm font-bold text-slate-700">{formatDate(bidMasterDetails?.openDate) || ""}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1 mb-1">
            <FiActivity /> Award Status
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black ${
            bidMasterDetails?.award_status === 'AWARDED' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
          }`}>
            • {bidMasterDetails?.award_status || "N/A"}
          </span>
        </div>
      </div>

  {/* Newly Added Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {bidMasterDetails?.contractNo && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Contract No.</p>
        <p className="font-semibold">{bidMasterDetails?.contractNo || "N/A"}</p>
      </div>
    )}



    {bidMasterDetails?.bidSecurityAmnt != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Bid Security Amount</p>
        <p className="font-semibold">{bidMasterDetails?.bidSecurityAmnt}</p>
      </div>
    )}

    {bidMasterDetails?.bidSecurityValidityInDays != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Bid Security Validity</p>
        <p className="font-semibold">
          {bidMasterDetails?.bidSecurityValidityInDays} Days
        </p>
      </div>
    )}

    {bidMasterDetails?.bidDocumentRefundable != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Is Bid Document Refundable</p>
        <p className="font-semibold">
          {bidMasterDetails?.bidDocumentRefundable ? "Yes" : "No"}
        </p>
      </div>
    )}
    {bidMasterDetails?.bidDocumentRefundable != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Bid Document Refundable</p>
        <p className="font-semibold">
          {bidMasterDetails?.bidDocumentRefundable}
        </p>
      </div>
    )}
    {bidMasterDetails?.isEstimatedIncludingVat != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Is Estimated Amt. included Vat?</p>
        <p className="font-semibold">
          {bidMasterDetails?.isEstimatedIncludingVat ? "Yes" : "No"}
        </p>
      </div>
    )}
        {bidMasterDetails?.estimatedAmt != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Estimated Amount</p>
        <p className="font-semibold">{bidMasterDetails?.estimatedAmt || "N/A"}</p>
      </div>
    )}
  </div>

      {/* Description Layout Block */}
      <div className="mt-4">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">Project Description</span>
        <p className=" text-gray-700 text-[18px] md:text-[20px] font-medium leading-relaxed whitespace-pre-line bg-white border border-gray-100 rounded-xl p-4 shadow-2xs">
          {bidMasterDetails?.description || "N/A"}
        </p>
      </div>

<div className='mt-2'>
        <BidFormAttachmetns attachments={attachments}></BidFormAttachmetns>
</div>
    </div>
{
  LoggedInUserBidReProposeWithAns?.length>0 &&
    <RequotedQuestionsListWIthAns
 bidId={bidId}
      data={LoggedInUserBidReProposeWithAns}   
      fileBaseUrl={process.env.NEXT_PUBLIC_BASE_CONTENT_URL}
/>
}

    </div>
  )
}

export default BIdInfo













