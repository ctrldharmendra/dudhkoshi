

"use client"
import React from 'react'

const ProfileLoader = () => {
  return (
    <div
  className=" xl:col-span-1 rounded-2xl shadow-sm border border-slate-200 p-6  flex flex-col bg-neutral-300 animate-pulse  p-4 gap-4"
>
  <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
  <div className="flex flex-col gap-2">
    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
    <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
    <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
  </div>
</div>

  )
}

export default ProfileLoader