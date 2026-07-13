



"use client"
import React, { useEffect, useState } from 'react'
import { FiPlus, FiTrash2, FiFileText, FiGrid, FiCalendar, FiLayers, FiSend } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useParams } from 'next/navigation'
import TinyLoader from '@/components/reusable/loader/TinyLoader'
import { hasPermission } from '@/helper/helper'
import { getRolePermissionLoggedInUser } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice'
import { editBidForm, getParticularBidForm } from '@/app/(bid)/redux/slices/bids/bidFormSlice'
import toast from 'react-hot-toast'
import BidAttachmentEditor from './BidAttachmentEditor' // separate component below

const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  const particularBidFormData = useSelector((state) => state?.bidForm?.particularBidForm)
  const particularBidFormLoading = useSelector((state) => state?.bidForm?.particularBidFormLoading)
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser)
  const loading = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission)
  // Full bidData state — includes all new fields from backend
  const [bidData, setBidData] = useState({
    title: "",
    publishDate: "",
    openDate: "",
    closeDate: "",
    description: "",
    status: "ACTIVE",
    estimatedAmt: "",
    isEstimatedIncludingVat: "",
    bidSecurityAmnt: "",
    bidSecurityValidityInDays: "",
    bidDocumentRefundable: "",
    isBidDocumentRefundable: "",
    contractNo: "",
    fields: [{ field_name: "", field_type: "text", label:"", isRequired:0, displayOrder:"", helpText:""  }],
  })

  console.log(bidData, "biddata")
  // Add this state in the parent Page component
const [attachmentState, setAttachmentState] = useState({
  deleteIds: [],
  newAttachments: []
})

  //FIXED — no conditional hook, always runs, guards with id check inside
  useEffect(() => {
    if (id) {
      dispatch(getParticularBidForm({ id }))
    }
  }, [id])

  // Get logged in user permissions
  useEffect(() => {
    dispatch(getRolePermissionLoggedInUser({}))
  }, [])

  // Populate form when bid data arrives
  useEffect(() => {
    if (!particularBidFormData) return

    setBidData({
      title:                    particularBidFormData.title ?? "",
      description:              particularBidFormData.description ?? "",
      status:                   particularBidFormData.status ?? "ACTIVE",
      contractNo:               particularBidFormData.contractNo ?? "",
      estimatedAmt:             particularBidFormData.estimatedAmt ?? "",
      isEstimatedIncludingVat:  particularBidFormData.isEstimatedIncludingVat ?? "",
      bidSecurityAmnt:          particularBidFormData.bidSecurityAmnt ?? "",
      bidSecurityValidityInDays: particularBidFormData.bidSecurityValidityInDays ?? "",
      bidDocumentRefundable:    particularBidFormData.bidDocumentRefundable ?? "",
      isBidDocumentRefundable:  particularBidFormData.isBidDocumentRefundable ?? "",

      // Dates need slicing to get YYYY-MM-DD for input[type=date]
      publishDate: particularBidFormData.publishDate?.slice(0, 10) ?? "",
      openDate:    particularBidFormData.openDate?.slice(0, 10) ?? "",
      closeDate:   particularBidFormData.closeDate?.slice(0, 10) ?? "",

      fields: particularBidFormData.fields ?? [],
    })
  }, [particularBidFormData])

  // Permission redirect
  useEffect(() => {
    if (loading) return
    if (!permissionOfLoggedInRoleOfUser) return

    const canCreateBid = hasPermission(permissionOfLoggedInRoleOfUser, "create_bid")
    if (!canCreateBid) {
      router.replace("/forbidden")
    }
  }, [loading, permissionOfLoggedInRoleOfUser])

  // ============================================================
  // handleSubmit — sends FormData because backend does JSON.parse(req.body.fields)
  // ============================================================
  const handleSubmit = async () => {
  if (
    !bidData.closeDate || !bidData.description ||
    !bidData.fields || !bidData.openDate ||
    !bidData.title || !bidData.publishDate
  ) return toast.error("All Basic Fields Required")

  const formData = new FormData()

  // Basic fields
  formData.append('title',                     bidData.title)
  formData.append('description',               bidData.description)
  formData.append('publishDate',               bidData.publishDate)
  formData.append('openDate',                  bidData.openDate)
  formData.append('closeDate',                 bidData.closeDate)
  formData.append('status',                    bidData.status)
  formData.append('contractNo',                bidData.contractNo                || "")
  formData.append('estimatedAmt',              bidData.estimatedAmt              || "")
  formData.append('isEstimatedIncludingVat',   bidData.isEstimatedIncludingVat   || "")
  formData.append('bidSecurityAmnt',           bidData.bidSecurityAmnt           || "")
  formData.append('bidSecurityValidityInDays', bidData.bidSecurityValidityInDays || "")
  formData.append('bidDocumentRefundable',     bidData.bidDocumentRefundable     || "")
  formData.append('isBidDocumentRefundable',   bidData.isBidDocumentRefundable   || "")
  formData.append('fields',                    JSON.stringify(bidData.fields))

  // Attachment deletions — send as JSON string
  // backend will JSON.parse this to get array of ids to delete
  formData.append('deleteAttachmentIds', JSON.stringify(attachmentState.deleteIds))

  // New attachment files + their titles
  const validNewAttachments = attachmentState.newAttachments.filter(a => a.title && a.file)
  validNewAttachments.forEach((item) => {
    formData.append('attachmentTitles', item.title)
    formData.append('files', item.file)
  })

  const result = await dispatch(editBidForm({ formData, id }))

  if (editBidForm.fulfilled.match(result)) {
    toast.success("Bid updated successfully.")
    router.replace("/dashboard/manage/bids")
  }
}

  if (loading || particularBidFormLoading) {
    return (
      <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
        <TinyLoader />
      </div>
    )
  }

  return (
    <div className="w-full mx-auto pt-4 bg-transparent">
      <div className="bg-[var(--bg-card,#fff)] border border-[var(--border-primary,rgba(14,165,233,0.15))] overflow-hidden">

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-transparent flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 text-lg border border-sky-100">
            <FiFileText />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--primaryTextColor,#024a70)]">
              Edit Bid
            </h1>
            <p className="text-xs text-[var(--text-muted,#475569)] font-medium mt-0.5">
              Note: The bid can only be updated until any user has applied to it.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">

          {/* SECTION 1 — BASIC DETAILS */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black text-sky-600 uppercase tracking-widest mb-4">
              <FiCalendar className="text-xs" /> Basic Project Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Title */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Bid Title</label>
                <input
                  type="text"
                  value={bidData.title}
                  onChange={(e) => setBidData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Procurement of Hydro-Mechanical Equipment Assets"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Description</label>
                <textarea
                  rows={4}
                  value={bidData.description}
                  onChange={(e) => setBidData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide scope parameters, eligibility criteria..."
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm text-[var(--text-primary,#0f172a)] font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all resize-none placeholder:text-slate-300"
                />
              </div>

              {/* Contract No */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Contract No.</label>
                <input
                  type="text"
                  value={bidData.contractNo}
                  onChange={(e) => setBidData(prev => ({ ...prev, contractNo: e.target.value }))}
                  placeholder="e.g., CT-2081-001"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>

              {/* Estimated Amount */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Estimated Amount</label>
                <input
                  type="number"
                  value={bidData.estimatedAmt}
                  onChange={(e) => setBidData(prev => ({ ...prev, estimatedAmt: e.target.value }))}
                  placeholder="e.g., 5000000"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>

              {/* Is Estimated Including VAT */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Including VAT?</label>
                <select
                  value={bidData.isEstimatedIncludingVat}
                  onChange={(e) => setBidData(prev => ({ ...prev, isEstimatedIncludingVat: e.target.value }))}
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-bold shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Bid Security Amount */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Bid Security Amount</label>
                <input
                  type="number"
                  value={bidData.bidSecurityAmnt}
                  onChange={(e) => setBidData(prev => ({ ...prev, bidSecurityAmnt: e.target.value }))}
                  placeholder="e.g., 50000"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>

              {/* Bid Security Validity */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Security Validity (Days)</label>
                <input
                  type="number"
                  value={bidData.bidSecurityValidityInDays}
                  onChange={(e) => setBidData(prev => ({ ...prev, bidSecurityValidityInDays: e.target.value }))}
                  placeholder="e.g., 90"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>

              {/* Bid Document Refundable */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Document Refundable Amount</label>
                <input
                  type="number"
                  value={bidData.bidDocumentRefundable}
                  onChange={(e) => setBidData(prev => ({ ...prev, bidDocumentRefundable: e.target.value }))}
                  placeholder="e.g., 1000"
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>

              {/* Is Bid Document Refundable */}
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Is Document Refundable?</label>
                <select
                  value={bidData.isBidDocumentRefundable}
                  onChange={(e) => setBidData(prev => ({ ...prev, isBidDocumentRefundable: e.target.value }))}
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-bold shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

            </div>

            {/* Dates + Status row */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-2 mt-5'>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Publish Date</label>
                <input type="date" value={bidData.publishDate}
                  onChange={(e) => setBidData(prev => ({ ...prev, publishDate: e.target.value }))}
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Open Date</label>
                <input type="date" value={bidData.openDate}
                  onChange={(e) => setBidData(prev => ({ ...prev, openDate: e.target.value }))}
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Close Date</label>
                <input type="date" value={bidData.closeDate}
                  onChange={(e) => setBidData(prev => ({ ...prev, closeDate: e.target.value }))}
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-medium shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary,#1e293b)] uppercase tracking-wider mb-2 block">Status</label>
                <select value={bidData.status}
                  onChange={(e) => setBidData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full border border-slate-200 focus:border-[var(--color-primary,#0ea5e9)] bg-white rounded-xl px-4 py-3 text-sm font-bold shadow-2xs focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2 — DYNAMIC FIELDS (kept exactly as-is) */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                <FiGrid className="text-xs" /> Custom Dynamic Specification Fields
              </div>
              <button
                type="button"
                onClick={() => setBidData(prev => ({
                  ...prev,
                  fields: [...prev.fields, { field_name: "", field_type: "text", displayOrder:"",helpText:"",label:"",isRequired:""}]
                }))}
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-sky-500 to-[var(--color-primary-dark,#0284c7)] text-white text-xs font-black px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <FiPlus className="text-sm" /> Add Dynamic Row
              </button>
            </div>

       <div className="overflow-x-auto border border-slate-200 rounded-xl">

  {/* Table Header - Desktop Only */}
  <div className="hidden md:grid md:grid-cols-7 bg-slate-100 border-b border-slate-200">
    <div className="p-3 text-xs font-bold uppercase text-slate-600">Field Name</div>
    <div className="p-3 text-xs font-bold uppercase text-slate-600">Display Order</div>
    <div className="p-3 text-xs font-bold uppercase text-slate-600">Help Text</div>
    <div className="p-3 text-xs font-bold uppercase text-slate-600">Label</div>
    <div className="p-3 text-xs font-bold uppercase text-slate-600 text-center">Required</div>
    <div className="p-3 text-xs font-bold uppercase text-slate-600">Input Type</div>
    <div className="p-3 text-xs font-bold uppercase text-slate-600 text-center">Action</div>
  </div>

  {bidData?.fields?.map((field, index) => (
    <div
      key={index}
      className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-0 border-b border-slate-200 mt-1 md:items-center hover:bg-slate-50 transition"
    >

      {/* Field Name */}
      <div className="md:px-1">
        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Field Name
        </div>

        <input
          value={field.field_name}
          placeholder="e.g., Core Capacity Spec"
          onChange={(e) =>
            setBidData((prev) => ({
              ...prev,
              fields: prev.fields.map((f, i) =>
                i === index
                  ? {
                      ...f,
                      field_name: e.target.value,
                    }
                  : f
              ),
            }))
          }
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
          onChange={(e) =>
            setBidData((prev) => ({
              ...prev,
              fields: prev.fields.map((f, i) =>
                i === index
                  ? {
                      ...f,
                      displayOrder: e.target.value,
                    }
                  : f
              ),
            }))
          }
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        />
      </div>

      {/* Help Text */}
      <div className="md:px-1">
        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Help Text
        </div>

        <input
          value={field.helpText ?? ""}
          placeholder="Help text..."
          onChange={(e) =>
            setBidData((prev) => ({
              ...prev,
              fields: prev.fields.map((f, i) =>
                i === index
                  ? {
                      ...f,
                      helpText: e.target.value,
                    }
                  : f
              ),
            }))
          }
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
          onChange={(e) =>
            setBidData((prev) => ({
              ...prev,
              fields: prev.fields.map((f, i) =>
                i === index
                  ? {
                      ...f,
                      label: e.target.value,
                    }
                  : f
              ),
            }))
          }
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        />
      </div>

      {/* Required */}
      <div className="md:flex md:justify-center">
        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-2">
          Required
        </div>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={field.isRequired === 1}
            onChange={(e) =>
              setBidData((prev) => ({
                ...prev,
                fields: prev.fields.map((f, i) =>
                  i === index
                    ? {
                        ...f,
                        isRequired: e.target.checked ? 1 : 0,
                      }
                    : f
                ),
              }))
            }
          />

          <span className="text-xs text-slate-600 hidden lg:block">
            Required
          </span>
        </label>
      </div>

      {/* Input Type */}
      <div className="md:px-1">
        <div className="md:hidden text-[10px] font-bold uppercase text-slate-500 mb-1">
          Input Type
        </div>

        <select
          value={field.field_type}
          onChange={(e) =>
            setBidData((prev) => ({
              ...prev,
              fields: prev.fields.map((f, i) =>
                i === index
                  ? {
                      ...f,
                      field_type: e.target.value,
                    }
                  : f
              ),
            }))
          }
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-sky-500"
        >
          <option value="text">Text Entry</option>
          <option value="number">Numeric Metric</option>
          <option value="file">File Attachment</option>
        </select>
      </div>

      {/* Delete */}
      <div className="md:flex md:justify-center">
        <button
          type="button"
          onClick={() =>
            setBidData((prev) => ({
              ...prev,
              fields: prev.fields.filter((_, i) => i !== index),
            }))
          }
          className="inline-flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-4 py-2 rounded-lg text-xs font-bold transition"
        >
          <FiTrash2 />
          Delete
        </button>
      </div>

    </div>
  ))}
</div>
          </div>

          {/* SECTION 3 — ATTACHMENTS (separate component, passes bid id) */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">
              <FiLayers className="text-xs" /> Bid Attachments
            </div>
            {/* Attachment editing is fully self-contained — 
                it fetches existing attachments, lets user add/delete,
                and calls its own API independently of the main form */}
            <BidAttachmentEditor  attachments={particularBidFormData?.attachments}
  onChange={(state) => setAttachmentState(state)}  />
          </div>

        </div>

        {/* Submit */}
        <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
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