"use client";

import React from "react";
import {
  FaFilePdf,
  FaFileImage,
  FaFileExcel,
  FaFileAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;


function getFileIcon(file) {
  if (!file) return <FaFileAlt size={20} />;

  const ext = file.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
    return <FaFileImage size={20} />;
  }

  if (["xls", "xlsx", "csv"].includes(ext)) {
    return <FaFileExcel size={20} />;
  }

  if (ext === "pdf") {
    return <FaFilePdf size={20} />;
  }

  return <FaFileAlt size={20} />;
}


export default function ShowReinvitationDoc({ data = [] }) {

  const openFile = (file) => {
    if (!file) return;

    window.open(
      `${BASE_URL}/${file}`,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">


      <div className="relative">

        {data.map((item, index) => (

          <div
            key={item.id}
            className="relative flex gap-5"
          >

            {/* Connector Line */}
            {index !== data.length - 1 && (
              <div
                className="
                  absolute
                  left-5
                  top-11
                  h-[calc(100%-20px)]
                  w-[2px]
                  bg-gradient-to-b
                  from-indigo-400
                  to-blue-400
                "
              />
            )}


            {/* Icon Circle */}
            <div
              className="
                z-10
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-indigo-500
                to-blue-500
                text-white
                shadow-md
              "
            >
              {getFileIcon(item?.file)}
            </div>


            {/* File Card */}
            <div
              onClick={() => openFile(item?.file)}
              className={`
                mb-8
                pt-[26px]
                flex-1
        ${item?.isAnswered ? "bg-[#e9f9ef]" : "bg-white"}
        border border-[#bfe6cf]
        ${item?.isAnswered ? "border border-[#bfe6cf]" : "border border-[#e6e9e7ad]"}
        
        rounded-sm
           px-4
           pb-4
                shadow-sm
                transition-all
                ${
                  item?.file
                  ? "cursor-pointer hover:shadow-lg hover:-translate-y-1"
                  : "cursor-not-allowed opacity-50"
                }
              `}
            >

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(item.createdAt)
                      .toLocaleString()}
                  </p>
                </div>


                {item.file && (
                  <FaExternalLinkAlt
                    className="text-blue-500"
                    size={15}
                  />
                )}

              </div>


              {!item.file && (
                <p className="mt-2 text-xs text-red-500">
                  File not available
                </p>
              )}

  {/* end  */}
{
  !item?.isAnswered && (
    <div className="absolute top-[4px] text-sm bg-[#ffcfcf] px-3 py-0 rounded-xl text-red-500">
  <span>Applicant hasn't replied yet.</span>
  </div>
  )
}
{
  item?.isAnswered && (
    <div className="absolute top-[4px] text-sm bg-[#b4ffda] px-3 py-0 rounded-xl text-[#00c500]">
  <span>Applicant has replied back.</span>
  </div>
  )
}
  {
    item?.answer &&(
      <Attachment file={item?.file} fileBaseUrl={BASE_URL} label="Question document" />

    )
                        

  }
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}



function Attachment({ file, fileBaseUrl, label }) {
  if (!file) {
    return <p className="attachment attachment--empty">No attachment</p>;
  }
  const name = file.split('/').pop();
  return (
    <a
      className="attachment"
      href={`${fileBaseUrl}/${file}`}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
    >
      <FileIcon />
      <span className="attachment__name">View Applicant Replied Document</span>
      <style jsx>{`
        .attachment {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #2b3550;
          background:#2b7fff;
          border: 1px solid #e4e7ee;
          border-radius: 7px;
          padding: 0.35rem 0.6rem;
          text-decoration: none;
          max-width: 100%;
        }

        .attachment__name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: white;
        }
        .attachment--empty {
          color: #9aa1b3;
          font-size: 0.8rem;
          font-style: italic;
          margin: 0;
        }
      `}</style>
    </a>
  );
}



function FileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}