"use client"

import React, { useEffect, useState } from 'react'
import { FiPlus, FiTrash2, FiFileText, FiGrid, FiCalendar, FiLayers, FiSend } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import TinyLoader from '@/components/reusable/loader/TinyLoader'
import { hasPermission } from '@/helper/helper'
import { getRolePermissionLoggedInUser } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice'
import { createBidForm } from '@/app/(bid)/redux/slices/bids/bidFormSlice'
import toast from 'react-hot-toast'
import BidAttachment from './BidAttachment'



const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
  const [bidData, setBidData] = useState({
    title: "",
    publishDate: "",
    openDate: "",
    closeDate:"",
    description: "",
    estimatedAmt:"",
isEstimatedIncludingVat:0,
bidSecurityAmnt:"",
bidSecurityValidityInDays:"",
bidDocumentRefundable:"",
isBidDocumentRefundable:0,
contractNo:"",
    status: "ACTIVE",
    fields: [
      {
        fieldName: "",
        fieldType: "text",
                label: "",
        isRequired:0,
        displayOrder:"",
        helpText:"",
      },
    ],
        attachments:[
      {
        id: crypto.randomUUID(),
        attachment:"",
        title:""
      }
    ]
  });
// ------------------------------------------------
//   check if logged in role has permission to create bid or not 
const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
const loading  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);  //loading state
  const createBidFormLoading = useSelector((state) => state?.bidForm?.createBidFormLoading);  //create bid loading state


// get all permission in an array 
    useEffect(()=>{
      dispatch(getRolePermissionLoggedInUser({}))
    },[]);

useEffect(() => {
  if (loading) return;
  if (!permissionOfLoggedInRoleOfUser) return;

  const canCreateBid = hasPermission(permissionOfLoggedInRoleOfUser, "create_bid");
  const canViewBid = hasPermission(permissionOfLoggedInRoleOfUser, "view_bid");
  if (!canCreateBid || !canViewBid) {
    return router.replace("/forbidden");
  }
}, [loading, permissionOfLoggedInRoleOfUser]);
// -----------------------------------------------------

const handleSubmit = async ()=>{
    if(!bidData.closeDate || !bidData.description || !bidData.fields || !bidData.openDate || !bidData.title || !bidData.publishDate) return toast.error("* Mareked Label are required.")

      // basic validation for attachment | dynamic row
              const invalidDynamicRow = bidData.fields.some(
    (item) => !item.fieldName
  );
  if (invalidDynamicRow) {
    return toast.error("Please provide title to Dynamic Row");
  }
        const invalidAttachment = bidData.attachments.some(
    (item) => !item.title || !item.attachment
  );
  if (invalidAttachment) {
    return toast.error("Please provide title and file for all attachments");
  }
  if(!bidData.contractNo)     return toast.error("You have to give your bid an unique Contract No.");

   
      // post api call 
   const result = await dispatch(createBidForm({bidData}));
               if (createBidForm.fulfilled.match(result)) {
                toast.success("A Bid Created Success.")
                    setBidData({
    title: "",
    publishDate: "",
    openDate: "",
    closeDate:"",
    description: "",
       estimatedAmt:"",
isEstimatedIncludingVat:0,
bidSecurityAmnt:"",
bidSecurityValidityInDays:"",
bidDocumentRefundable:"",
isBidDocumentRefundable:0,
contractNo:"",
    status: "ACTIVE",
    fields: [
      {
        fieldName: "",
        fieldType: "text",
        label: "",
        isRequired:0,
        displayOrder:"",
        helpText:"",
      },
    ],
        attachments:[
      {
        attachment:"",
        title:""
      }
    ]
  })
                }

                  //  router.replace("/dashboard/manage/bids");

}


if (loading || createBidFormLoading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}

  return (
    <div className="w-full mx-auto pt-4 bg-transparent">
      {/* Outer Card Shell using Glassmorphism & Custom Variable Variables */}
      <div className="bg-[var(--bg-card,#fff)]   border border-[var(--border-primary,rgba(14,165,233,0.15))] overflow-hidden">
        
        {/* Modern Section Header Accent */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-transparent flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 text-lg border border-sky-100">
            <FiFileText />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--primaryTextColor,#024a70)]">
              Create New Bid
            </h1>
            <p className="text-xs text-[var(--text-muted,#475569)] font-medium mt-0.5">
              Bid Creation
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* --- SECTION 1: CORE BLOCK CONFIGURATION --- */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black text-sky-600 uppercase tracking-widest mb-4">
              <FiCalendar className="text-xs" /> Basic Project Details
            </div>
            
            {/* TITLES  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title Input Field */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  <span className='text-red-700'>*</span> Bid Title
                </label>
                <input
                  type="text"
                  value={bidData.title}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      title: e.target.value
                    }))
                  }
                  placeholder="e.g., Procurement of Hydro-Mechanical Equipment Assets"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              {/* Description Textarea Box */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  <span className='text-red-700'>*</span>Description / Tender Overview
                </label>
                <textarea
                  rows={4}
                  value={bidData.description}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                  placeholder="Provide scope parameters, eligibility criteria statements, or structural requirements..."
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all resize-none placeholder:text-slate-300"
                />
              </div>
            </div>

{/* DATES  */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
              {/* Publish Date Input Field */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                 <span className='text-red-700'>*</span> Publish Date
                </label>
                <input
                required
                  type="date"
                  value={bidData.publishDate}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      publishDate: e.target.value
                    }))
                  }
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>

              {/* Open Date Input Field */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                 <span className='text-red-700'>*</span> Open Date
                </label>
                <input
                required
                  type="date"
                  value={bidData.openDate}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      openDate: e.target.value
                    }))
                  }
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>
              {/* Close Date Input Field */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                 <span className='text-red-700'>*</span> Close Date
                </label>
                <input
                required
                  type="date"
                  value={bidData.closeDate}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      closeDate: e.target.value
                    }))
                  }
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>

              {/* Status Select Menu */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  Status
                </label>
                <select
                  value={bidData.status}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      status: e.target.value
                    }))
                  }
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-bold shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>


            </div>

            {/* more extra details  */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                            <div className="">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                <span className='text-red-700'>*</span>  Estimated Amount
                </label>
                <input
                  type="text"
                  value={bidData.estimatedAmt}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      estimatedAmt: e.target.value
                    }))
                  }
                  placeholder="e.g., 500000"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="flex lg:flex-col flex-wrap items-center ">
                    <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  Is Estimated Var Included?
                </label>
            <label className="flex gap-3 items-center cursor-pointer">
                  <input
    type="checkbox"
    className="hidden peer"
    checked={bidData.isEstimatedIncludingVat === 1}
    onChange={(e) =>
      setBidData((prev) => ({
        ...prev,
        isEstimatedIncludingVat: e.target.checked ? 1 : 0,
      }))
    }
  />
                <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600 peer-checked:bg-blue-600">
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
                    </svg>
                </span>
                <span className="text-gray-700 select-none">Estimated Vat</span>
            </label>

        </div>

                                    <div className="">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  <span className='text-red-700'>*</span>   Bid Security Amount
                </label>
                <input
                  type="text"
                  value={bidData.bidSecurityAmnt}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      bidSecurityAmnt: e.target.value
                    }))
                  }
                  placeholder="e.g., 400000"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

                                    <div className="">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                 <span className='text-red-700'>*</span>    Bid Securiy Validity In days
                </label>
                <input
                  type="text"
                  value={bidData.bidSecurityValidityInDays}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      bidSecurityValidityInDays: e.target.value
                    }))
                  }
                  placeholder="e.g., 400000"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
                                    <div className="">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
              <span className='text-red-700'>*</span>      Bid Document Refundable
                </label>
                <input
                  type="text"
                  value={bidData.bidDocumentRefundable}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      bidDocumentRefundable: e.target.value
                    }))
                  }
                  placeholder="e.g., 40000"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300"
                />
              </div>


         <div className="flex flex-wrap lg:flex-col items-center ">
                    <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  Is Bid Document Refundable?
                </label>
            <label className="flex gap-3 items-center cursor-pointer">
                  <input
    type="checkbox"
    className="hidden peer"
    checked={bidData.isBidDocumentRefundable === 1}
    onChange={(e) =>
      setBidData((prev) => ({
        ...prev,
        isBidDocumentRefundable: e.target.checked ? 1 : 0,
      }))
    }
  />
                <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600 peer-checked:bg-blue-600">
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
                    </svg>
                </span>
                <span className="text-gray-700 select-none">Estimated Vat</span>
            </label>

        </div>


          <div className="">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
               <span className='text-red-700'>*</span>     Contract No.                </label>
                <input
                  type="text"
                  value={bidData.contractNo}
                  onChange={(e) =>
                    setBidData(prev => ({
                      ...prev,
                      contractNo: e.target.value
                    }))
                  }
                  placeholder="Type Unique No."
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

          </div>








          {/* --- SECTION 2: DYNAMIC FORM STRUCT BUILDER --- */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                <FiGrid className="text-xs" /> Custom Dynamic Specification Fields
              </div>
              
              <button
                type="button"
                onClick={() => {
                  setBidData(prev => ({
                    ...prev,
                    fields: [
                      ...prev.fields,
                      {
                        fieldName:"",
                        fieldType:"text",
                        label:"",
                        isRequired:0,
                        displayOrder:"",
                        helpText:""
                            }
                    ]
                  }))
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-sky-500 to-[var(--color-primary-dark,#0284c7)] text-white text-xs font-black px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <FiPlus className="text-sm" /> Add Dynamic Row
              </button>
            </div>

            {/* Fields Sub-Deck Container */}
<div className="overflow-x-auto border border-slate-200 rounded-xl">

  {/* Table Header */}
  <div className="hidden md:grid md:grid-cols-7 bg-slate-100 border-b border-slate-200">
    <div className="p-3 text-xs font-bold uppercase text-slate-600">
      Field Title
    </div>

    <div className="p-3 text-xs font-bold uppercase text-slate-600">
      Label
    </div>

    <div className="p-3 text-xs font-bold uppercase text-slate-600">
      Display Order
    </div>

    <div className="p-3 text-xs font-bold uppercase text-slate-600">
      Helper Text
    </div>

    <div className="p-3 text-xs font-bold uppercase text-slate-600">
      Input Variant
    </div>

    <div className="p-3 text-xs font-bold uppercase text-slate-600 text-center">
      Required
    </div>

    <div className="p-3 text-xs font-bold uppercase text-slate-600 text-center">
      Action
    </div>
  </div>


  {bidData.fields.map((field, index) => (

    <div
      key={index}
      className="
        grid grid-cols-1 md:grid-cols-7 mt-1
        gap-4 md:gap-0
        border-b border-slate-200
         md:items-center
        hover:bg-slate-50
        transition
      "
    >


      {/* Field Title */}
      <div className="md:px-1">

        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Field Title
        </div>

        <input
          value={field.fieldName ?? ""}
          placeholder="e.g., Core Capacity Spec"
          onChange={(e) => {
            const updated = [...bidData.fields];
            updated[index].fieldName = e.target.value;

            setBidData(prev => ({
              ...prev,
              fields: updated
            }));
          }}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        />

      </div>



      {/* Label */}
      <div className="md:px-1">

        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Label
        </div>

        <input
          value={field.label ?? ""}
          placeholder="Label"
          onChange={(e) => {
            const updated = [...bidData.fields];
            updated[index].label = e.target.value;

            setBidData(prev => ({
              ...prev,
              fields: updated
            }));
          }}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        />

      </div>



      {/* Display Order */}
      <div className="md:px-1">

        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Display Order
        </div>

        <input
          value={field.displayOrder ?? ""}
          placeholder="1"
          onChange={(e) => {
            const updated = [...bidData.fields];
            updated[index].displayOrder = e.target.value;

            setBidData(prev => ({
              ...prev,
              fields: updated
            }));
          }}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        />

      </div>




      {/* Helper Text */}
      <div className="md:px-1">

        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Helper Text
        </div>

        <input
          value={field.helpText ?? ""}
          placeholder="Help text"
          onChange={(e) => {
            const updated = [...bidData.fields];
            updated[index].helpText = e.target.value;

            setBidData(prev => ({
              ...prev,
              fields: updated
            }));
          }}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        />

      </div>




      {/* Input Type */}
      <div className="md:px-1">

        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Input Variant
        </div>

        <select
          value={field.fieldType}
          onChange={(e) => {
            const updated = [...bidData.fields];

            updated[index].fieldType = e.target.value;

            setBidData(prev => ({
              ...prev,
              fields: updated
            }));
          }}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        >

          <option value="text">
            Text Entry
          </option>

          <option value="number">
            Numeric Metric
          </option>

          <option value="file">
            File Attachment
          </option>

        </select>

      </div>




      {/* Required */}
      <div className="md:flex md:justify-center">

        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-2">
          Required
        </div>


        <label className="flex gap-2 items-center cursor-pointer">

          <input
            type="checkbox"
            className="hidden peer"
            checked={field.isRequired === 1}
            onChange={(e) => {

              const updated = [...bidData.fields];

              updated[index].isRequired =
                e.target.checked ? 1 : 0;


              setBidData(prev => ({
                ...prev,
                fields: updated
              }));

            }}
          />


          <span className="
            w-5 h-5
            border border-slate-300
            rounded
            flex items-center justify-center
            peer-checked:bg-blue-600
            peer-checked:border-blue-600
          ">

            <svg
              width="11"
              height="8"
              viewBox="0 0 11 8"
            >
              <path
                d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Z"
                fill="white"
              />
            </svg>

          </span>

        </label>

      </div>




      {/* Delete */}
      <div className="md:flex md:justify-center">

        <button
          type="button"
          onClick={() => {

            const updated =
              bidData.fields.filter((_, i) => i !== index);

            setBidData(prev => ({
              ...prev,
              fields: updated
            }));

          }}
          className="
            inline-flex
            items-center
            justify-center
            gap-1
            bg-red-50
            hover:bg-red-100
            text-red-600
            border
            border-red-100
            px-4
            py-2
            rounded-lg
            text-xs
            font-bold
          "
        >

          <FiTrash2 />
          Delete

        </button>

      </div>


    </div>

  ))}

</div>
          </div>
        </div>




        {/* ATTACHMENTS  3*/}
              <BidAttachment bidData={bidData} setBidData={setBidData}></BidAttachment>





        {/* --- SYSTEM ACTION SUBMIT CONSOLE BUTTON --- */}
        <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={() => {
             handleSubmit()
            }}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-black px-8 py-3.5 rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Create Bid <FiSend />
          </button>
        </div>

      </div>
    </div>
  )
}

export default Page