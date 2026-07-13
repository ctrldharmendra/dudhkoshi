"use client"
import React, { useEffect, useState } from 'react'
import { FiUpload, FiTrash2, FiFileText, FiPlus } from 'react-icons/fi'

// This component manages attachment state locally
// Parent reads attachmentState via onChange prop and includes it in FormData on submit

const BidAttachmentEditor = ({ attachments = [], onChange }) => {

  // Existing attachments from DB — user can mark for deletion
  const [existingAttachments, setExistingAttachments] = useState([])

  // IDs of existing attachments user wants to delete
  const [deleteIds, setDeleteIds] = useState([])

  // New rows user wants to add — { title, file }
  const [newAttachments, setNewAttachments] = useState([])

  // When attachments prop arrives, populate existing list
  useEffect(() => {
    if (attachments?.length) {
      setExistingAttachments(attachments)
    }
  }, [attachments])

  // Notify parent whenever state changes
  // Parent needs deleteIds + newAttachments to build FormData
  useEffect(() => {
    if (onChange) {
      onChange({ deleteIds, newAttachments })
    }
  }, [deleteIds, newAttachments])

  // Mark existing attachment for deletion (just UI toggle — no API)
  const handleMarkDelete = (attachmentId) => {
    setDeleteIds(prev =>
      prev.includes(attachmentId)
        ? prev.filter(id => id !== attachmentId)  // unmark if already marked
        : [...prev, attachmentId]                  // mark for deletion
    )
  }

  // New attachment rows
  const handleAddNewRow = () => {
    setNewAttachments(prev => [...prev, { title: "", file: null }])
  }

  const handleRemoveNewRow = (index) => {
    setNewAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleNewRowChange = (index, field, value) => {
    setNewAttachments(prev =>
      prev.map((item, i) => i === index ? { ...item, [field]: value } : item)
    )
  }

  return (
    <div className="space-y-4">

      {/* EXISTING ATTACHMENTS */}
      {existingAttachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Current Attachments
          </p>
          {existingAttachments.map((att) => {
            const isMarkedForDelete = deleteIds.includes(att.id)
            return (
              <div
                key={att.id}
                className={`flex items-center justify-between gap-4 border rounded-xl px-4 py-3 transition-all ${
                  isMarkedForDelete
                    ? "border-red-200 bg-red-50 opacity-60"   // visually crossed out
                    : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <FiFileText size={14} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isMarkedForDelete ? "line-through text-red-400" : "text-slate-700"}`}>
                      {att.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium truncate max-w-xs">
                      {att.attachment}
                    </p>
                  </div>
                </div>

                {/* Toggle delete mark */}
                <button
                  type="button"
                  onClick={() => handleMarkDelete(att.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                    isMarkedForDelete
                      ? "bg-slate-100 text-slate-500 hover:bg-slate-200"  // undo button
                      : "bg-red-50 text-red-500 hover:bg-red-100"          // delete button
                  }`}
                  title={isMarkedForDelete ? "Undo removal" : "Mark for removal"}
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            )
          })}

          {/* Show how many will be deleted */}
          {deleteIds.length > 0 && (
            <p className="text-[10px] text-red-500 font-bold">
              {deleteIds.length} attachment(s) will be removed on save.
            </p>
          )}
        </div>
      )}

      {/* NEW ATTACHMENT ROWS */}
      {newAttachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            New Attachments
          </p>
          {newAttachments.map((item, index) => (
            <div
              key={index}
              className=""
            >
              {/* Title */}
              <div className="parent flex items-center gap-4 mb-4 p-4 bg-green-100 rounded-lg">
              <div className="flex flex-row gap-2 flex-1 ">
                {/* <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Title
                </label> */}
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleNewRowChange(index, 'title', e.target.value)}
                  placeholder="e.g., Technical Specification"
                  className="border rounded p-2"
                />
                                 {/* <span className="text-xs font-medium text-slate-500 truncate">
                    {item.file ? item.file.name : "Choose file..."}
                  </span> */}
                  <input
                    type="file"
                    // className="hidden"
                    onChange={(e) => handleNewRowChange(index, 'file', e.target.files[0])}
                  />
              </div>
                              <button
                  type="button"
                  onClick={() => handleRemoveNewRow(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                  Remove
                </button>
              </div>

              {/* File picker */}
              {/* <div className="md:col-span-6">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  File
                </label>
                <label className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-3.5 py-2.5 cursor-pointer hover:border-sky-400 transition-all">
                  <FiUpload size={13} className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-500 truncate">
                    {item.file ? item.file.name : "Choose file..."}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleNewRowChange(index, 'file', e.target.files[0])}
                  />
                </label>
              </div> */}

              {/* Remove row */}
              {/* <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => handleRemoveNewRow(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                  <FiTrash2 /> Remove
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}

      {/* ADD ROW BUTTON */}
      <button
        type="button"
        onClick={handleAddNewRow}
        className="inline-flex items-center gap-1.5 border border-sky-200 text-sky-600 bg-sky-50 hover:bg-sky-100 text-xs font-black px-4 py-2.5 rounded-lg transition-all"
      >
        <FiPlus /> Add Attachment
      </button>

    </div>
  )
}

export default BidAttachmentEditor