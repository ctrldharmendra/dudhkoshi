"use client"

import { applyBid } from '@/app/(bid)/redux/slices/bids/bidApplicationSlice';
import { clearParticularBidForm, getParticularBidForm } from '@/app/(bid)/redux/slices/bids/bidFormSlice';
import { getRolePermissionLoggedInUser } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import { hasPermission } from '@/helper/helper';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FiFileText, FiCalendar, FiUpload, FiX, FiCheckCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import BidFormAttachmetns from './BidFormAttachmetns';

import {FiHelpCircle } from 'react-icons/fi'
import HelpTextPopup from './HelpTextPopup'


export default function FormToApply({ bid }) {
const dispatch = useDispatch();

const router = useRouter();
  const bidFormData = useSelector((state) => state?.bidForm?.particularBidForm);  //Particular BId Data Form
  const particularBidFormLoading = useSelector((state) => state?.bidForm?.particularBidFormLoading);  //Particular BId Data Form Loading
  const applyBidLoading = useSelector((state) => state?.bidApplication?.applyBidLoading);  //Applying loading
  console.log(bidFormData, "bidFormData")

   const [bidReady, setBidReady] = useState(false)
const [fieldErrors, setFieldErrors] = useState({});
// 1. Initialize form state properly ensuring metadata is linked to the keys
const [formData, setFormData] = useState(() => {
  const initial = {};
  bidFormData?.fields?.forEach(field => {
    initial[field.id] = {
      field_id: field.id,
      value: field.field_type === 'file' ? null : "",
      type: field.field_type,
      previewUrl: "",
      fileIndex: 0
    };
  });
  return initial;
});
const [activeHelpField, setActiveHelpField] = useState(null) 
  
// console.log(applyBidLoading)

//FIRST : check if logged in role has permission to view bid or not 
//FIRST : fetch permissions on mount
useEffect(() => {
  dispatch(getRolePermissionLoggedInUser({}));
}, [dispatch]);

const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
const loading = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);

const canViewBid = hasPermission(permissionOfLoggedInRoleOfUser, "view_bid");
const canCreateBid = hasPermission(permissionOfLoggedInRoleOfUser, "apply_bid");

// only "true" once permission data has actually arrived
const permissionChecked = !loading && !!permissionOfLoggedInRoleOfUser;
const hasBidAccess = canViewBid && canCreateBid;


useEffect(() => {
  if (!permissionChecked) return;
  if (!hasBidAccess) {
    router.replace("/forbidden");
  }
}, [permissionChecked, hasBidAccess, router]);
//   check if logged in role has permission to view bid or not END

// SECOND :Fetch only when permission exists
useEffect(() => {
  if (!permissionChecked || !hasBidAccess) return;

    dispatch(getParticularBidForm({id:bid}))
}, [
  permissionChecked,
  hasBidAccess,
  dispatch,
]);

// Fetch only when permission exists END 
// -----------------------------------------------------
  // CLEAR THE PREVIOS OLD DATA OF SELECTED BID FORM
  // Clear stale data immediately on mount
useEffect(() => {
  dispatch(clearParticularBidForm())
}, [])

// Replace your existing isBidClosed useEffect with this
useEffect(() => {
  if (!bidFormData) return  // still loading — do nothing

  if (bidFormData?.isBidClosed) {
    router.replace("/forbidden")  // closed — redirect
    return
  }

  //  Only reach here if bid exists AND is open
  setBidReady(true)
}, [bidFormData])
  // CLEAR THE PREVIOS OLD DATA OF SELECTED BID FORM END



  
  // Guard clause if data hasn't arrived
  // if (!bidFormData || bidFormData == {} || bidFormData == undefined) return <div className="p-6 text-center text-[#000000)]">Loading bid criteria...</div>;




// 2. CORRECTION HERE: Explicitly pass your keys to prevent them from dropping on state change
const handleInputChange = (fieldId, val, type) => {
// console.log(type, "TYPE")

  setFormData(prev => ({
    ...prev,
    [fieldId]: {
      ...prev[fieldId], // Spreads existing keys safely
      field_id: fieldId, // Safeguard reinforcement
      type: type,        // Safeguard reinforcement
      value: val
    }
  }));
};

  // Handle document file picking + setting up instant native image preview URLs
  const handleFileChange = (fieldId, e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Generate local virtual blob URL if file type is an image asset
    const isImage = file.type.startsWith('image/');
    const previewUrl = isImage ? URL.createObjectURL(file) : "";

    setFormData(prev => ({
      ...prev,
      [fieldId]: {
        ...prev[fieldId],
        field_id:fieldId,
        value: file, // Keep actual file object for your upload processes
        previewUrl: previewUrl,
        type:type,
        fileIndex:null
      }
    }));
  };

  // Clear specific document slot file instantly when user clicks the remove icon
  const handleRemoveFile = (fieldId) => {
    // Revoke object URL to prevent browser memory leaks
    if (formData[fieldId]?.previewUrl) {
      URL.revokeObjectURL(formData[fieldId].previewUrl);
    }

    setFormData(prev => ({
      ...prev,
      [fieldId]: {
        ...prev[fieldId],
        value: null,
        previewUrl: ""
      }
    }));
  };



// [
//   { "field_id": 44, "value": null, "type": "file", "fileIndex": 0 },
//   { "field_id": 42, "value": "applied by rohan Karki", "type": "text" },
//   { "field_id": 43, "value": "510000", "type": "number" }
// ]

// [
//     {"field_id": 42,"value": "ds","type": "text"},
//     {"field_id": 43,"value": "31","type": "number" },
//     {"field_id": 44,"value": null, "type": "file","fileIndex": 0}
// ]



const handleSubmitForm = async () => {
// SHOW ERROR IF REQUIRED IS ENABLED FOR PARTICULAR FIELD 
const errors = {};

bidFormData?.fields?.forEach((field) => {
  const currentFieldState = formData[field.id];

  if (field.isRequired === 1) {
    const isEmpty =
      field.field_type === "file"
        ? !currentFieldState?.value
        : !String(currentFieldState?.value ?? "").trim();

    if (isEmpty) {
      errors[field.id] = true;
    }
  }
});

if (Object.keys(errors).length > 0) {
  setFieldErrors(errors);
  toast.error("Please fill all required fields.");
  return;
}

setFieldErrors({});


  //1 — Separate files from text values
  // Track fileIndex correctly — count only file-type fields
  const files = [];      // actual File objects in order
  let fileCounter = 0;   // counts only files, not all fields

  const structuredSubmissionPayload = Object.values(formData).map((item) => {
    if (item.type === 'file') {
      // Push actual File object into files array
      if (item.value) {
        files.push(item.value); // real File object stored during handleFileChange
      }

      const currentFileIndex = fileCounter;
      fileCounter++; // increment ONLY for file fields

      return {
        field_id: Number(item.field_id),
        value: null,
        type: item.type,
        fileIndex: currentFileIndex  // 0,1,2... only counting files
      };
    }

    // text or number — no file involved
    return {
      field_id: Number(item.field_id),
      value: item.value,
      type: item.type
    };
  });

  // Build FormData manually
  // This is what actually sends files to the backend
  const formDataToSend = new FormData();

  // values must be a JSON string — backend does JSON.parse(req.body.values)
  formDataToSend.append('values', JSON.stringify(structuredSubmissionPayload));

  // append each File object under key 'files'
  // same key repeated = multer receives as array → req.files
  files.forEach((file) => {
    formDataToSend.append('files', file);
  });

  //Dispatch with FormData, not plain object
  // dispatch(applyBid({ bid, formDataToSend }));

         const result = await dispatch(applyBid({ bid, formDataToSend }));
           if (applyBid.fulfilled.match(result)) {
             toast.success("Apply Success.")
                router.push("/dashboard/manage/bids/apply");
                }
};


  // Simple date format helper for seniors
  const formatDateFriendly = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  // DYNAMIC FIELD SHOWIUNG 


// LOADING 
if (!permissionChecked) {
  return (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader />
    </div>
  );
}

if (!hasBidAccess) {
  // redirect is already in-flight via the effect above
  return null;
}
if (particularBidFormLoading  || !bidReady) {
  return (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader />
    </div>
  );
}
if (applyBidLoading) {
  return (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader />
    </div>
  );
}
// LOADING END
  return (
    <div className="w-full mx-auto pt-2 bg-transparent">
      
      {/* 1. Project Info Header Card */}
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm mb-6">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-50">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-[var(--iconBgColro,#dbeafe)] text-[var(--iconColor,#155dfc)] flex-shrink-0">
      <FiFileText />
    </div>
    <div>
      <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full">
        • {bidFormData?.status}
      </span>
      <h1 className="text-xl md:text-2xl font-black text-[var(--blackText,#090909)] mt-1 leading-tight">
        {bidFormData?.title}
      </h1>
    </div>
  </div>

  <p className="text-m text-[#000000)] font-medium leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl mb-4">
    {bidFormData?.description}
  </p>

  <div className="flex flex-wrap gap-4 text-m font-bold text-gray-500 mb-4">
    <span className="flex items-center gap-1.5">
      <FiCalendar /> Open Date: {formatDateFriendly(bidFormData?.openDate)}
    </span>
    <span className="flex items-center gap-1.5 text-rose-600">
      <FiCalendar /> Close Date: {formatDateFriendly(bidFormData?.closeDate)}
    </span>
  </div>

  {/* Newly Added Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {bidFormData?.contractNo && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Contract No.</p>
        <p className="font-semibold">{bidFormData?.contractNo}</p>
      </div>
    )}



    {bidFormData?.bidSecurityAmnt != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Bid Security Amount</p>
        <p className="font-semibold">{bidFormData?.bidSecurityAmnt}</p>
      </div>
    )}

    {bidFormData?.bidSecurityValidityInDays != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Bid Security Validity</p>
        <p className="font-semibold">
          {bidFormData?.bidSecurityValidityInDays} Days
        </p>
      </div>
    )}

    {bidFormData?.bidDocumentRefundable != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Is Bid Document Refundable</p>
        <p className="font-semibold">
          {bidFormData?.bidDocumentRefundable ? "Yes" : "No"}
        </p>
      </div>
    )}
    {bidFormData?.bidDocumentRefundable != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Bid Document Refundable</p>
        <p className="font-semibold">
          {bidFormData?.bidDocumentRefundable}
        </p>
      </div>
    )}
    {bidFormData?.isEstimatedIncludingVat != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Is Estimated Amt. included Vat?</p>
        <p className="font-semibold">
          {bidFormData.isEstimatedIncludingVat ? "Yes" : "No"}
        </p>
      </div>
    )}
        {bidFormData?.estimatedAmt != null && (
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-gray-500">Estimated Amount</p>
        <p className="font-semibold">{bidFormData.estimatedAmt}</p>
      </div>
    )}
  </div>
</div>

{/* ATTACHMENTS FILE PROVIDED BY ADMIN  */}
<BidFormAttachmetns attachments={bidFormData?.attachments}></BidFormAttachmetns>


      {/* 2. Interactive Application Entry Form */}
      <div className="bg-white rounded-2xl mt-2 border border-gray-100 p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-black text-[var(--blackText,#090909)]">Application Requirements</h2>
          <p className="text-m text-red-400 font-medium mt-0.5">Please provide information accurately according to each custom field specification parameter below.</p>
        </div>

        <div className="space-y-5">
         

          {[...( bidFormData?.fields || [])]

  // 1. Sort by displayOrder before rendering
  //    Fields with no displayOrder go to the end
  .sort((a, b) => {
    const orderA = a.displayOrder ?? Infinity
    const orderB = b.displayOrder ?? Infinity
    return orderA - orderB
  })

  .map((field) => {
    const currentFieldState = formData[field.id]

    // 2. Placeholder — use field.label if present, fallback to generic text
    const textPlaceholder = field.label
      ? field.label
      : "Provide information entry response text..."

    const numberPlaceholder = field.label
      ? field.label
      : "Enter numeric value..."

    return (
      <div
        key={field.id}
        className="py-1 px-4 rounded-xl border border-gray-100 bg-slate-50/50 space-y-2"
      >

        {/* Field label row — name on left, ? icon on right */}
        <div className="flex ">
          <label className="font-semibold text-slate-700">
            {field.field_name}
            {field.isRequired === 1 && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>

          {/* 3. ? icon — only show if helpText exists */}
          {field.helpText && (
            <button
              type="button"
              onClick={() =>
                setActiveHelpField({
                  fieldName: field.field_name,
                  helpText: field.helpText,
                })
              }
              className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-400 hover:text-blue-600 flex items-center justify-center transition-colors flex-shrink-0"
              title="View help text"
            >
              <FiHelpCircle size={14} />
            </button>
          )}
        </div>

        {/* Field input — conditional by type */}
        {field.field_type === 'file' ? (
          <div className="space-y-3">
            {!currentFieldState?.value ? (
              <label className="border-2 border-dashed border-gray-200 hover:border-[var(--iconColor,#155dfc)] bg-white rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                <FiUpload className="text-xl text-gray-400 group-hover:text-[var(--iconColor,#155dfc)] mb-1" />
                <span className="text-sm font-bold text-slate-600">
                  {field.label ? field.label : "Click to upload file document"}
                </span>
                <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                  Images will preview instantly
                </span>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(field.id, e, field.field_type)}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  {currentFieldState.previewUrl ? (
                    <img
                      src={currentFieldState.previewUrl}
                      alt="Instant Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-100 bg-slate-50 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs flex-shrink-0 border border-amber-100">
                      DOC
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-700 truncate max-w-[250px] sm:max-w-md">
                      {currentFieldState.value?.name || "Selected Document Resource File"}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <FiCheckCircle /> Loaded Successfully
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(field.id)}
                  className="w-8 h-8 rounded-lg bg-[var(--deleteIconBg,#fef2f2)] text-[var(--deleteIconColor,#e7000b)] hover:bg-[var(--deleteIconBgHOver,#ffb8b8)] flex items-center justify-center transition-colors shadow-2xs flex-shrink-0"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>

        ) : field.field_type === 'number' ? (
          <>
            <input
              type="number"
              value={currentFieldState?.value || ""}
              placeholder={numberPlaceholder}   // uses label if present
              onChange={(e) => handleInputChange(field.id, e.target.value, field.field_type)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium bg-white outline-none transition-colors border border-gray-200 focus:border-[var(--iconColor,#155dfc)]"`}
            />
            {/* {fieldErrors[field.id] && (
              <p className="text-red-500 text-xs mt-1">This field is required.</p>
            )} */}
          </>

        ) : (
          <input
            type="text"
            value={currentFieldState?.value || ""}
            placeholder={textPlaceholder}       // ✅ uses label if present
            onChange={(e) => handleInputChange(field.id, e.target.value, field.field_type)}
           className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium bg-white outline-none transition-colors border border-gray-200 focus:border-[var(--iconColor,#155dfc)]"`}
          />
        )}

      </div>
    )
  })
}

{/* Help popup — renders outside the map, controlled by activeHelpField state */}
{activeHelpField && (
  <HelpTextPopup
    fieldName={activeHelpField.fieldName}
    helpText={activeHelpField.helpText}
    onClose={() => setActiveHelpField(null)}
  />
)}
        </div>

        {/* Action submission terminal controls row button block */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
          onClick={handleSubmitForm}
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[var(--addBtnBg,#155dfb)] hover:bg-[var(--addBtnBgHover,#0744c9)] text-[var(--whiteText,#fff)] font-black text-m rounded-xl transition-all shadow-md shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99]"
          >
            Submit Application Entry
          </button>
        </div>
      </div>

    </div>
  )
}