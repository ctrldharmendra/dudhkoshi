// (components)/HelpTextPopup.jsx
"use client"
import { FiX, FiInfo } from 'react-icons/fi'

const HelpTextPopup = ({ helpText, fieldName, onClose }) => {
  if (!helpText) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Popup box */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
              <FiInfo size={14} />
            </div>
            <p className="text-sm font-black text-slate-700 capitalize">{fieldName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <FiX size={14} />
          </button>
        </div>

        {/* Help text content */}
        <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-100">
          {helpText}
        </p>

      </div>
    </>
  )
}

export default HelpTextPopup