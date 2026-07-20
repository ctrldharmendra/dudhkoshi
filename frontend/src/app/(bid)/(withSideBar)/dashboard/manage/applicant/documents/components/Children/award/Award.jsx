"use client";
import { useState } from "react";
import { FaAward, FaExclamationTriangle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function AwardConfirmationModal({
  open,
  onClose,
  onContinue,
  applicantDetails
}) {
  const [agree, setAgree] = useState(false);

  if (!open) return null;





  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-6 duration-300">

        {/* Top Decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 hover:bg-red-50 hover:text-red-500">
          <IoClose size={20} />
        </button>

        <div className="px-8 pt-8 pb-7">

          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-300/50">
            <FaAward className="text-4xl" />
          </div>

          {/* Title */}
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Award This Bid?
          </h2>

          {/* Description */}
          <p className="mt-3 text-center text-sm leading-6 text-gray-600">
            You are about to award this bid to the selected bidder.
            <span className="font-semibold text-gray-900">
              {" "}
              This action cannot be changed later.
            </span>
            Please confirm that you have reviewed all submitted applications
            before continuing.
          </p>

          {/* Warning */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <FaExclamationTriangle className="mt-0.5 text-lg text-amber-500" />
            <p className="text-sm text-amber-800">
              Only one bidder can be awarded for a bid. Once awarded, no other
              bidder can be selected.
            </p>
          </div>

          {/* Checkbox */}
          <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-5 w-5 accent-amber-500"
            />
            <span className="text-sm font-medium text-gray-700">
              I understand and agree to award this bid.
            </span>
          </label>

          {/* Buttons */}
          <div className="mt-7 flex gap-4">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              disabled={!agree}
              onClick={onContinue}
              className={`group relative flex-1 overflow-hidden rounded-xl px-5 py-3 font-semibold text-white transition-all duration-300 ${
                agree
                  ? "bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 shadow-lg shadow-amber-300/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-400/40 active:scale-95"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                <FaAward />
                Continue
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}