

"use client"
import React, { useEffect, useState } from 'react'
import { FiPlus, FiTrash2, FiFileText, FiGrid, FiCalendar, FiLayers, FiSend } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import TinyLoader from '@/components/reusable/loader/TinyLoader'
import { hasPermission } from '@/helper/helper'
import { getRolePermissionLoggedInUser } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice'
import { createBidForm, editBidForm, getParticularBidForm } from '@/app/(bid)/redux/slices/bids/bidFormSlice'
import toast from 'react-hot-toast'

import { useParams } from 'next/navigation';



const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
  const particularBidFormData = useSelector((state) => state?.bidForm?.particularBidForm);  //Selected BID Form data
  const particularBidFormLoading = useSelector((state) => state?.bidForm?.particularBidFormLoading);  //Particular bid get Loading


  const params = useParams();
  const { id } = params; 

if(id){
    useEffect(() => {
         dispatch(getParticularBidForm({id}))
    }, [])
    
}


  const [bidData, setBidData] = useState(
    {
    title: "",
    publishDate: "",
    openDate: "",
    closeDate:"",
    description: "",
    status: "ACTIVE",
    fields: [
      {
        field_name: "",
        field_type: "text",
      },
    ],
  }
  );
// ------------------------------------------------
//   check if logged in role has permission to create bid or not 
const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
const loading  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);  //loading state

  // console.log(particularBidFormData, "pik")

// get all permission in an array 
    useEffect(()=>{
      dispatch(getRolePermissionLoggedInUser({}))
    },[]);

    // when receive data copy in new state 
useEffect(() => {
  if (!particularBidFormData) return;

  setBidData({
    ...particularBidFormData,

    publishDate: particularBidFormData.publishDate
      ? particularBidFormData.publishDate.slice(0, 10)
      : "",

    openDate: particularBidFormData.openDate
      ? particularBidFormData.openDate.slice(0, 10)
      : "",

    closeDate: particularBidFormData.closeDate
      ? particularBidFormData.closeDate.slice(0, 10)
      : "",

    fields: particularBidFormData.fields || [],
  });
}, [particularBidFormData]);


useEffect(() => {
  if (loading) return;
  if (!permissionOfLoggedInRoleOfUser) return;

  const canCreateBid = hasPermission(permissionOfLoggedInRoleOfUser, "create_bid");
  if (!canCreateBid) {
    router.replace("/forbidden");
  }
}, [loading, permissionOfLoggedInRoleOfUser]);
// -----------------------------------------------------

const handleSubmit = async ()=>{
    if(!bidData.closeDate || !bidData.description || !bidData.fields || !bidData.openDate || !bidData.title || !bidData.publishDate) return toast.error("All Basic Fields Required")
   const result = await dispatch(editBidForm({bidData, id}));
               if (editBidForm.fulfilled.match(result)) {
                toast.success("Update Success.")
                    setBidData({
    title: "",
    publishDate: "",
    openDate: "",
    closeDate:"",
    description: "",
    status: "ACTIVE",
    fields: [
      {
        field_name: "",
        field_type: "text",
      },
    ],
  })
                }

                   router.replace("/dashboard/manage/bids");

}


if (loading || particularBidFormLoading) {
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
              Edit Bid
            </h1>
            <p className="text-xs text-[var(--text-muted,#475569)] font-medium mt-0.5">
              Note : The bid only get updated until any user hasn't applied to it.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* --- SECTION 1: CORE BLOCK CONFIGURATION --- */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black text-sky-600 uppercase tracking-widest mb-4">
              <FiCalendar className="text-xs" /> Basic Project Details
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title Input Field */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  Bid Title
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
                  Description / Tender Overview
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

            <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>

              {/* Publish Date Input Field */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">
                  Publish Date
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
                  Open Date
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
                  Close Date
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
                        field_name: "",
                        field_type: "text"
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
            <div className="space-y-3">
              {bidData?.fields?.map((field, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 border border-slate-100 rounded-[var(--radius-md,16px)] p-4 bg-slate-50/50 items-end transition-all hover:border-slate-200"
                >
                  {/* Dynamic Field Name Key Entry */}
                  <div className="md:col-span-6">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Field Title/Label
                    </label>
                    <input
                      value={field.field_name}
                      placeholder="e.g., Core Capacity Spec"
                      onChange={(e) => {
                        // const updated = [...bidData.fields];
                        // updated[index].field_name = e.target.value;
                        setBidData(prev => ({
  ...prev,
  fields: prev.fields.map((field, i) =>
    i === index
      ? {
          ...field,
          field_name: e.target.value,
        }
      : field
  ),
}));
                      }}
                      className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-lg px-3.5 py-2.5 text-xs font-bold text-slate-700 outline-none shadow-2xs focus:ring-4 focus:ring-sky-500/5 transition-all"
                    />
                  </div>

                  {/* Dynamic Data Type Menu */}
                  <div className="md:col-span-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Input Data Variant
                    </label>
                    <select
                      value={field.field_type}
                      onChange={(e) => {
                        // const updated = [...bidData.fields];
                        // updated[index].field_type = e.target.value;
               setBidData(prev => ({
  ...prev,
  fields: prev.fields.map((field, i) =>
    i === index
      ? {
          ...field,
          field_type: e.target.value,
        }
      : field
  ),
}));
                      }}
                      className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-lg px-3.5 py-2.5 text-xs font-black text-slate-700 outline-none shadow-2xs focus:ring-4 focus:ring-sky-500/5 transition-all cursor-pointer"
                    >
                      <option value="text">Text Entry</option>
                      <option value="number">Numeric Metric</option>
                      <option value="file">File Attachment</option>
                      {/* <option value="email">Email Address</option>
                      <option value="date">Calendar Date</option>
                      <option value="textarea">Extended Textarea</option> */}
                    </select>
                  </div>

                  {/* Row Splice Deletion Button */}
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = bidData.fields.filter((_, i) => i !== index);
                       setBidData(prev => ({
  ...prev,
  fields: prev.fields.filter((_, i) => i !== index),
}));
                      }}
                      className="w-full inline-flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100/80 text-red-600 border border-red-100 py-2.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SYSTEM ACTION SUBMIT CONSOLE BUTTON --- */}
        <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={() => {
             handleSubmit()
            }}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-black px-8 py-3.5 rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Update Bid <FiSend />
          </button>
        </div>

      </div>
    </div>
  )
}

export default Page