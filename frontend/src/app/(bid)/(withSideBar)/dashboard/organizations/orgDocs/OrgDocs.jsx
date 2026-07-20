"use client";

import { createUserOrgDocuments, getUserOrganizationDocuments, updateUserOrganization } from "@/app/(bid)/redux/slices/users/organizationsSlice";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import { create } from "axios";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import BidFormAttachmetns from "../../manage/bids/apply/[bid]/components/BidFormAttachmetns";
import ViewFile from "./ViewFile";

const OrgDocs = () => {
const dispatch = useDispatch();


  const handleAdd = () => {
    setOrgDocs((prev) => ({
      ...prev,
      organizationDocs: [
        ...prev.organizationDocs,
        {
          id: crypto.randomUUID(),
          title: "",
          file: null,
        },
      ],
    }));
    setHasChanges(true);
  };

  const handleRemove = (id) => {

    setOrgDocs((prev) => ({
      ...prev,
      organizationDocs: prev.organizationDocs.filter((item) => item.id !== id),
    }));
      setHasChanges(true);
  };

  const handleTitleChange = (index, value) => {
    const updated = [...orgDocs.organizationDocs];
    updated[index].title = value;

    setOrgDocs((prev) => ({
      ...prev,
      organizationDocs: updated,
    }));
      setHasChanges(true);
  };

  const handleFileChange = (index, file) => {
    const updated = [...orgDocs.organizationDocs];
    updated[index].file = file;

    setOrgDocs((prev) => ({
      ...prev,
      organizationDocs: updated,
    }));
      setHasChanges(true);
  };


//   STATE DEFINED 
  const [orgDocs, setOrgDocs] = useState({
             organizationDocs:[
                 {
        id: crypto.randomUUID(),
        file:"",
        title:""
      }
    ]
  });


//   GETTIGN FILES TO SHOW 
const userOrgDocumentsLoading = useSelector((state) => state?.organization?.userOrgDocumentsLoading);
const userOrgDocuments = useSelector((state) => state?.organization?.userOrgDocuments);

useEffect(() => {
    dispatch(getUserOrganizationDocuments({}));
}, [dispatch])
//   GETTIGN FILES TO SHOW END

//   ---------------------------
// console.log(userOrgDocuments, "userOrgDocuments")
const handleSave = async () => {
  const hasEmptyField = orgDocs.organizationDocs.some(
    (doc) => !doc.title.trim() || !doc.file
  );

  if (hasEmptyField) {
    toast.error("Please fill all document titles and select all files.");
    return;
  }

  setIsSaving(true);

  const formData = new FormData();

  orgDocs.organizationDocs.forEach((doc) => {
    formData.append("title", doc.title);
    formData.append("files", doc.file);
  });

  try {
    const resultAction = await dispatch(createUserOrgDocuments({ formData }));

    if (createUserOrgDocuments.fulfilled.match(resultAction)) {
     dispatch(getUserOrganizationDocuments({}));

      setOrgDocs({
        organizationDocs: [
          {
            id: crypto.randomUUID(),
            title: "",
            file: null,
          },
        ],
      });

      setHasChanges(false);
      toast.success("Organization Documents Added");
    }
  } finally {
    setIsSaving(false);
  }
};
const [hasChanges, setHasChanges] = useState(false);
const [isSaving, setIsSaving] = useState(false);





if (userOrgDocumentsLoading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}
  return (
   <div className="rounded-2xl mt-2 shadow-sm border overflow-hidden" style={{background:"var(--whiteBg)",borderColor:"#e5e7eb"}}>
<div className="flex justify-end gap-2 p-5">
        {/* ADD BTN  */}
<div className="flex justify-end">
                  <button
            type="button"
            onClick={handleAdd}
             className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-sky-500 to-[var(--color-primary-dark,#0284c7)] text-white text-xs font-black px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
                           <FiPlus className="text-sm" /> Add a Row
          </button>            
</div>

      {/* ADD BTN END  */}

{/* SAVE BUTTON  */
<button
  onClick={handleSave}
  className={`px-5 py-2 rounded-lg text-white font-semibold transition-colors ${
    hasChanges ? "bg-green-500 hover:bg-green-600" : ""
  }`}
  style={!hasChanges ? { background: "var(--addBtnBg)" } : {}}
>
  {isSaving ? "Saving..." : hasChanges ? "Save" : "Organization Documents"}
</button>}
{/* SAVE BUTTON END */}



</div>
<div className="border-t p-5" style={{borderColor:"#e5e7eb"}}>
<div className="">
<div className="flex justify-end mb-5">
{/* <div className="flex gap-1">

</div> */}
</div>

<div>
<ViewFile attachments={userOrgDocuments} />
</div>

      {orgDocs?.organizationDocs?.map((elem, index) => (
        <div
          key={elem.id}
          className="parent flex items-center gap-4 mb-4 p-4 bg-green-100 rounded-lg mt-3"
        >
          <div className="flex flex-row gap-2 flex-1">
            <input
              type="text"
              required
              placeholder="Docuement title"
              className="border rounded p-2 lg:min-w-[300px] min-w-auto "
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
            // disabled={orgDocs.organizationDocs.length === 1}
          >
            Remove
          </button>
        </div>
      ))}


    </div>
    </div>


  </div>


  );
};

export default OrgDocs;