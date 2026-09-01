"use client"
import { setIsAddOpened } from '@/app/(bid)/redux/slices/activitySlice';

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllReproposeWithAnsLogged, replyToParticularRequote } from '@/app/(bid)/redux/slices/bidRepropose/biReproposeSlice';





const UploadBox = ({bidId, selectedReproposeId}) => {
    const dispatch = useDispatch()

const [file, setfile] = useState("")

const handleFileUpload = async (e)=>{
    e.preventDefault()

    const formData = new FormData();
    formData.append("file", file);

    const result = await dispatch(replyToParticularRequote({bidId, selectedReproposeId, formData}))

    
    if (replyToParticularRequote.rejected.match(result)) {
      toast.error(result?.payload);
      return;
    }

            if (replyToParticularRequote.fulfilled.match(result)) {
                toast.success("Created a repropose successfully.")
                    dispatch(getAllReproposeWithAnsLogged({bidId}))  
                  dispatch(setIsAddOpened(false))

                }

}


  return (
    <form className='flex justify-center' onSubmit={handleFileUpload}>
  <div className="max-w-md w-full p-6 bg-white rounded-lg border border-gray-500/30 shadow-[0px_1px_15px_0px] shadow-black/10 text-sm">


            <label htmlFor="fileInput" className="border-2 border-dotted border-gray-400 p-8 mt-6 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition">
                {/* <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.085 2.583H7.75a2.583 2.583 0 0 0-2.583 2.584v20.666a2.583 2.583 0 0 0 2.583 2.584h15.5a2.583 2.583 0 0 0 2.584-2.584v-15.5m-7.75-7.75 7.75 7.75m-7.75-7.75v7.75h7.75M15.5 23.25V15.5m-3.875 3.875h7.75" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> */}
                {/* <p className="text-gray-500">Drag files here to upload</p> */}
                <p className="text-gray-400"> <span className="text-blue-500 underline">click here</span> to select a file</p>
                <p className="text-gray-400">Currently Selected file: <span className="text-blue-500 text-sm">{file?.name}</span> </p>
                <input type="file"   accept="
    image/*,
    application/pdf,
    application/vnd.ms-excel,
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  " id="fileInput" name="file" className="hidden" onChange={(e)=>setfile(e.target.files[0])}/>
            </label>

        
            <div className="mt-6 flex justify-end gap-4">
                <button type="button" className="px-9 py-2 border border-gray-500/50 bg-white hover:bg-blue-100/30 active:scale-95 transition-all text-gray-500 rounded" onClick={()=>{
                    dispatch(setIsAddOpened(false))
                }}>
                    Cancel
                </button>
       {
        file && <button type="submit" className="px-9 py-2 cursor-pointer border border-gray-500/50 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white rounded">
                    Upload
                </button>
       }
            </div>
        </div>

    </form>
  )
}

export default UploadBox