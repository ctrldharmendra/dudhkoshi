import React from "react";
import { FiFile, FiExternalLink } from "react-icons/fi";

const BidFormAttachmetns = ({ attachments = [] }) => {
  if (!attachments?.length) return null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;
  // console.log(baseUrl)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Attachments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {attachments?.map((file) => (
          <div
            key={file.id}
            className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FiFile size={22} />
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-gray-900 truncate"
                  title={file.title}
                >
                  {file.title}
                </h3>

                <p
                  className="text-sm text-gray-500 truncate mt-1"
                  title={file.attachment}
                >
                  {file.attachment.split("/").pop()}
                </p>

                <button
                  onClick={() =>
                    window.open(`${baseUrl}/${file.attachment}`, "_blank")
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <FiExternalLink />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidFormAttachmetns;