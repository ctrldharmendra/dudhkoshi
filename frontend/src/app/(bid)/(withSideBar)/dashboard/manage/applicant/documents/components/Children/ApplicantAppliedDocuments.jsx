"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaAward, FaUserEdit } from 'react-icons/fa';
import { FiPaperclip, FiAlignLeft, FiHash, FiDownload } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import AwardConfirmationModal from './award/Award';
import { createAward } from '@/app/(bid)/redux/slices/award/awardSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import Modal from '@/components/adminComponents/modal/Modal';
import Reinvitation from './reinvitation/Reinvitation';
import { setIsAddOpened } from '@/app/(bid)/redux/slices/activitySlice';
import { getBidderReproposeDoc } from '@/app/(bid)/redux/slices/bidRepropose/biReproposeSlice';
import ShowReinvitationDoc from './reinvitation/ShowReinvitationDoc';

export default function ApplicantAppliedDocuments({ bidDynamicDocumentDetails, applicantDetails, bidMasterDetails, awardedBy, bidWinnerDetails}) {
const dispatch = useDispatch()
const baseContentPath = process.env.NEXT_PUBLIC_BASE_CONTENT_URL
  if (!bidDynamicDocumentDetails || bidDynamicDocumentDetails.length === 0) return null;

  const [awardConfirmationModalOpen, setAwardConfirmationModalOpen] = useState(false)

  const isAddOpened = useSelector((state) => state?.activity?.isAddOpened); // state of reinvitation popup


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


  // APPLICABT REPROPOSED DOCUMENT 
  const bidReproposeData = useSelector((state) => state?.bidRepropse?.bidReproposeData);
  const bidReproposeLoading = useSelector((state) => state?.bidRepropse?.bidReproposeLoading);
console.log(bidReproposeData, "bidReproposeData")
  useEffect(() => {
      dispatch(getBidderReproposeDoc({bidId: bidMasterDetails?.id, userId: applicantDetails?.user_id}))
  }, [])

  // APPLICABT REPROPOSED DOCUMENT END



  // HANDLE AWARD 

const awardLoading = useSelector((state) => state?.award?.awardLoading);
// console.log(awardLoading, "awardLoadingStat")
  const handleAward = async () => {
      // applicantDetails?.user_id  --user id
      // bidMasterDetails?.id  -- bidId 
        try {
    const resultAction = await dispatch(createAward({ bidId: bidMasterDetails?.id, winnerUserId: applicantDetails?.user_id }));

    if (createAward.fulfilled.match(resultAction)) {
        setAwardConfirmationModalOpen(false)
        toast.success("Awarded successfully")
        // refresh the page 
        window.location.reload();

    }
  } finally {
    setAwardConfirmationModalOpen(false);
  }

  } 
  // HANDLE AWARD END
if(awardLoading || bidReproposeLoading){
      return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}


  return (
    <>
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">

{/* REINVITATION POPUP  */}
      <Modal
        isModalOpen={isAddOpened}
        onClose={() => dispatch(setIsAddOpened(false))}
        icon={<FaUserEdit />}
        title="Select File"
        // description="You can Only Update Role of a User."
      >
      <Reinvitation applicantDetails={applicantDetails} bidMasterDetails={bidMasterDetails}></Reinvitation>
      </Modal>


{/* REINVITATION POPUP END  */}


      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-amber-50 text-amber-600">
          <FiPaperclip />
        </div>
        <div>
          <span className="text-xs font-bold text-[var(--adminPrimaryColor)] uppercase tracking-wider block">Submitted Details</span>
          <h2 className="text-xl font-black text-[var(--blackText,#090909)]">What files or info provided?</h2>
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

{/* AWWARD , REINVITATATION BTN PARENT  */}
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm flex justify-end">

      <div className='flex gap-4'>
        {/* REINVITATION BTN  */}
        {
          bidMasterDetails?.award_status !=="AWARDED" && (
    <button type="button" 
    className="w-40 py-3 active:scale-95 transition text-sm text-white rounded-xl bg-slate-700"
     onClick={() => dispatch(setIsAddOpened(true))}>
      <p className="mb-0.5">Reinvite</p>
    </button>
          )
        }


{
  bidMasterDetails?.award_status ==="AWARDED" && bidMasterDetails?.awarded_to !== null && bidMasterDetails?.awarded_by !== null ? (
<button
  disabled
  className=" inline-flex items-center gap-2 rounded-xl bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 cursor-not-allowed
  "
>
  <FaAward />
  {/* Awarded {bidMasterDetails?.awarded_to === applicantDetails?.user_id ? `to ${applicantDetails?.user_name}` : null } by {awardedBy[0]?.user_name} */}
  Awarded to {bidWinnerDetails[0]?.user_name} by {awardedBy[0]?.user_name}
</button>
  ) :     <button  //IF AWARD STATUS IS NOT AWARDED
    onClick={()=>{setAwardConfirmationModalOpen(true)}}
  className=" group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-amber-400/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
  ">
  {/* Shine Effect */}
  <span
    className=" absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"/>
  <FaAward
    className=" relative text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"/><span className="relative">Award</span>

</button>
}
      </div>



<AwardConfirmationModal
  open={awardConfirmationModalOpen}
  onClose={() => setAwardConfirmationModalOpen(false)}
  onContinue={() => {
    handleAward();
  }}
  applicantDetails={applicantDetails}
  // bidMasterDetails={bidMasterDetails}
/>
</div>



{/* REPROPOSE DOC TO SHOW  */}
{
  bidReproposeData?.length > 0 && 
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm ">
      <h1 className='text-xl font-black text-[var(--blackText,#090909)]'> Repropose Documents</h1>
      <ShowReinvitationDoc data={bidReproposeData}></ShowReinvitationDoc>

</div>
}
{/* REPROPOSE DOC TO SHOW END */}
    </>

  );
}