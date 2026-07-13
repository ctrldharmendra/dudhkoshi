"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";

const BidAttachment = ({ bidData, setBidData }) => {
  // console.log(bidData)
  const handleAdd = () => {
    setBidData((prev) => ({
      ...prev,
      attachments: [
        ...prev.attachments,
        {
          id: crypto.randomUUID(),
          title: "",
          attachment: null,
        },
      ],
    }));
  };

  const handleRemove = (id) => {

    setBidData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((item) => item.id !== id),
    }));
  };

  const handleTitleChange = (index, value) => {
    const updated = [...bidData.attachments];
    updated[index].title = value;

    setBidData((prev) => ({
      ...prev,
      attachments: updated,
    }));
  };

  const handleFileChange = (index, file) => {
    const updated = [...bidData.attachments];
    updated[index].attachment = file;

    setBidData((prev) => ({
      ...prev,
      attachments: updated,
    }));
  };

  return (
    <div className="grandParent p-6 md:p-8 space-y-8">
      <h1 className="text-xl font-semibold mb-4">Bid Attachments</h1>


      {/* ADD BTN  */}
<div className="flex justify-end">
                  <button
            type="button"
            onClick={handleAdd}
             className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-sky-500 to-[var(--color-primary-dark,#0284c7)] text-white text-xs font-black px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
                           <FiPlus className="text-sm" /> Add an Attachment Row
          </button>            
</div>
      {/* ADD BTN END  */}

      {bidData.attachments.map((elem, index) => (
        <div
          key={index}
          className="parent flex items-center gap-4 mb-4 p-4 bg-green-100 rounded-lg"
        >
          <div className="flex flex-row gap-2 flex-1">
            <input
              type="text"
              required
              placeholder="Attachment Title"
              className="border rounded p-2"
              value={elem.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            />

            <input
              type="file"
              onChange={(e) =>
                handleFileChange(index, e.target.files?.[0] || null)
              }
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemove(elem.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
            // disabled={bidData.attachments.length === 1}
          >
            Remove
          </button>
        </div>
      ))}


    </div>
  );
};

export default BidAttachment;