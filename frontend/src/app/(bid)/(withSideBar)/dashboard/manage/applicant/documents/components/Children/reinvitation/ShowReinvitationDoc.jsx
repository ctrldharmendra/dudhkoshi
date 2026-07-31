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
              {getFileIcon(item.file)}
            </div>


            {/* File Card */}
            <div
              onClick={() => openFile(item.file)}
              className={`
                mb-8
                flex-1
                rounded-xl
                border
                bg-white
                p-4
                shadow-sm
                transition-all
                ${
                  item.file
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

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}