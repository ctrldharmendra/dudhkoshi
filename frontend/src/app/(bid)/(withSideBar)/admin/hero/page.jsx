"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus, 
  HiOutlinePhotograph,
  HiOutlineX,
} from "react-icons/hi";

import DestroyerPopup from "../components/DestroyerPopup";

import { useDispatch, useSelector } from "react-redux";


import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { editHeroSection, getHero } from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { hasPermission } from "@/helper/helper";

export default function Page() {
  const dispatch = useDispatch();
  // const baseContentUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;

// CHECK PERMISSION 
const router = useRouter();
const [permissionChecked, setpermissionChecked] = useState(false)
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
  const loadingRole  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);  //loading state

      useEffect(()=>{
      dispatch(getRolePermissionLoggedInUser({}))
    },[]);

useEffect(() => {
  if (loadingRole) return;
  if (!permissionOfLoggedInRoleOfUser){
    setpermissionChecked(false)
    return 
  } 

  const canUpdateLandingPage = hasPermission(permissionOfLoggedInRoleOfUser, "update_landing_page_content");
  if (!canUpdateLandingPage) {
    return router.replace("/forbidden");
  }
  else{
    setpermissionChecked(true)
  }

}, [loadingRole, permissionOfLoggedInRoleOfUser, router]);
  // CHECK PERMISSION END 
// Fetch content ONLY after permission is confirmed
useEffect(() => {
  if (!permissionChecked) return;
    dispatch(getHero());
}, [permissionChecked, dispatch]);
  

  const herodata = useSelector((state) => state?.landingPageAdmmin?.heroSection); 
  const heroLoading = useSelector((state) => state?.landingPageAdmmin?.heroSecLoading); 
    const baseContentUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL; 
  
  const images = herodata?.[0]?.mainWalpaper || [];
  const loading = heroLoading;




  const [heroData, setHeroData] = useState({
    shortTitle: "",
    title:"", 
    description:"", 
    btnText:"", 
    btnLink:"", 
    image:"", 
  });
  // set in states
  useEffect(() => {
if(herodata?.length>0){
    setHeroData({
      shortTitle: herodata[0]?.shortTitle || "",
      title: herodata[0]?.title || "",
      description: herodata[0]?.description || "",
      btnText: herodata[0]?.btnText || "",
      btnLink: herodata[0]?.btnLink || "",  
      image: herodata[0]?.mainWalpaper || "",
    })
}
  }, [herodata])
  


  // =========================================================
  // IMAGE MODAL STATES
  // =========================================================

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // =========================================================
  // SELECTED IMAGE FOR DELETE
  // =========================================================

  const [selectedImageId, setSelectedImageId] = useState(null);

  // =========================================================
  // IMAGE UPLOAD STATES
  // =========================================================

  const [selectedFile, setSelectedFile] = useState(null);

  const [imageTitle, setImageTitle] = useState("");

  const fileInputRef = useRef(null);

  // =========================================================
  // HANDLE IMAGE SELECTION
  // =========================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    // Check file size
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large! Please select an image under 2MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setSelectedFile({
      file: file,
      name: file.name,
      preview: URL.createObjectURL(file),
    });
  };

  // =========================================================
  // CLEAR SELECTED IMAGE
  // =========================================================

  const clearSelection = (e) => {
    e?.stopPropagation();

    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // OPEN ADD IMAGE MODAL
  // =========================================================

  const openAddImageModal = () => {

    setIsAddModalOpen(true);
  };

  // =========================================================
  // CLOSE ADD IMAGE MODAL
  // =========================================================

  const closeAddImageModal = () => {
    setIsAddModalOpen(false);

    setSelectedFile(null);

    setImageTitle("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // DELETE HERO IMAGE
  // =========================================================

  const confirmDelete = async () => {
    if (!selectedImageId) {
      return;
    }

    try {
      // await dispatch(deleteHeroSectionImage(selectedImageId));
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }

    setSelectedImageId(null);

  };

  // =========================================================
  // HANDLE HERO SECTION EDIT
  // =========================================================

  // check if changed or not 
  const hasChanged = ()=>{
    const original = herodata?.[0]
    if(!original) return false;
    
    return (
        original?.shortTitle !== heroData?.shortTitle ||
    original?.title !== heroData?.title ||
    original?.description !== heroData?.description ||
    original?.btnText !== heroData?.btnText ||
    original?.btnLink !== heroData?.btnLink ||
        selectedFile !== null
    )

  }

  const handleHeroSectionEdit = async() => {
    
const isChanged = hasChanged();
if(!isChanged){
  toast.error("Nothing changed to save");
  return;
  }
    const formData = new FormData();

    formData.append("shortTitle", heroData.shortTitle);
    formData.append("title", heroData.title);
    formData.append("description", heroData.description);
    formData.append("btnText", heroData.btnText);
    formData.append("btnLink", heroData.btnLink);
  
      if (selectedFile?.file) {
    formData.append("image", selectedFile.file);
  }


    const result = await dispatch(editHeroSection({formData}));
    if(result.payload.statusCode === 200){
      toast.success(result.payload.message)
      dispatch(getHero());
    closeAddImageModal();

    }

  };

  // =========================================================
  // HANDLE IMAGE UPLOAD
  // =========================================================

  const handleImageUpload = () => {
    if (!selectedFile) {
      toast.error("Please select an image.");
      return;
    }

handleHeroSectionEdit();


  };
if(loading){
  return <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
  <Loading />
</div>
}
  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          LOADING
      ====================================================== */}



      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <header className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Hero Main
            </h1>

            <p className="text-slate-500">
              Update the first thing your visitors see.
            </p>
          </div>

          <button
            type="button"
            onClick={handleHeroSectionEdit}
            disabled={loading}
            className="flex w-fit items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <HiOutlinePencil size={20} />

            Save All Changes
          </button>
        </header>

        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* =================================================
              LEFT - CONTENT
          ================================================== */}

          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">

              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
                <HiOutlinePencil className="text-indigo-500" />

                Content Details
              </h2>

              <div className="space-y-5">

                {/* ==========================================
                    TITLE
                =========================================== */}
<div className="flex flex-col md:flex-row w-full gap-2">

                <div className="w-full">
                  <label className="mb-2 ml-1 block text-sm font-bold text-[#252525]">
                   Upper Short Title
                  </label>

                  <input
                    type="text"
                    value={heroData.shortTitle}
                    
                    onChange={(e) =>{
                    if (e.target.value.length>70) return toast.error("Less than 70 characters")
                      
                      setHeroData({
                        
                        ...heroData,
                        shortTitle: e.target.value,
                      })
                    }
                  }
                    placeholder="Enter hero title"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-[#252525] outline-none transition-all focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-full">
                  <label className="mb-2 ml-1 block text-sm font-bold text-[#252525]">
                    Title
                  </label>

                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) =>{
                    if (e.target.value.length>70) return toast.error("Less than 70 characters")

                      setHeroData({
                        ...heroData,
                        title: e.target.value,
                      })
                    }
                    }
                    placeholder="Enter hero title"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-[#252525] outline-none transition-all focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
</div>

                {/* ==========================================
                desc
                =========================================== */}

                <div>
                  <label className="mb-2 ml-1 block text-sm font-bold text-[#252525]">
                  Description
                  </label>

                  <textarea
                    rows={4}
                    value={heroData.description}
                    onChange={(e) =>
                      setHeroData({
                        ...heroData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter hero subtitle"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-[#252525] outline-none transition-all focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* ==========================================
                    CTA
                =========================================== */}

                <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">

                  {/* CTA TEXT */}

                  <div>
                    <label className="mb-2 ml-1 block text-sm font-bold text-[#252525]">
                      CTA Button
                    </label>

                    <input
                      type="text"
                      value={heroData.btnText}
                      onChange={(e) =>{
                    if (e.target.value.length>30) return toast.error("Less than 30 characters")

                        setHeroData({
                          ...heroData,
                          btnText: e.target.value,
                        })
                      }
                    }
                      placeholder="e.g. Get Started"
                      className="w-full rounded-2xl border border-indigo-100 bg-indigo-50/50 px-5 py-3.5 text-[#252525] outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

               {/* btn link  */}

                  <div>
                    <label className="mb-2 ml-1 block text-sm font-bold text-[#252525]">
                      CTA Link
                    </label>

                    <input
                      type="text"
                      value={heroData.btnLink}
                      onChange={(e) =>
                        setHeroData({
                          ...heroData,
                          btnLink: e.target.value,
                        })
                      }
                      placeholder="e.g. /contact"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-[#252525] outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>

              {/* RIGHT - BACKGROUND IMAGE */}
          <div className="space-y-6">

            <div className="h-full rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">

              {/* ============================================
                  IMAGE HEADER
              ============================================= */}

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                    <HiOutlinePhotograph className="text-indigo-500" />

                    Background Image
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Only one image is allowed.
                  </p>
                </div>

                {/* ==========================================
                    TOP ADD BUTTON
                =========================================== */}

                <button
                  type="button"
                  onClick={openAddImageModal}
               
                  title={
                       "Add background image"
                  }
                  className={`rounded-xl p-2 transition-all ${
                       "bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
                  }`}
                >
                  <HiOutlinePlus size={20} />
                </button>
              </div>



                <div className="group relative aspect-video overflow-hidden rounded-2xl border border-slate-100 shadow-sm">

                  <Image
                  width={100}
                  height={100}
                    unoptimized
                    src={heroData?.image ? baseContentUrl+"/"+heroData?.image : "https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"}
                    alt="Hero Background"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  

                  {/* IMAGE OVERLAY */}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">


                  </div>

                  {/* IMAGE STATUS */}

                  <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    Hero Background
                  </div>

                </div>



                <div className="space-y-4">

                  <button
                    type="button"
                    onClick={openAddImageModal}
                    className={`flex aspect-video w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${

                    "border-slate-200 text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-500"
                    }`}
                  >
                    <HiOutlinePlus size={28} />

                    <span className="mt-2 text-xs font-bold uppercase tracking-widest">
                      Change this Image
                    </span>

                    <span className="mt-1 text-[10px] text-slate-400">
                      One image only
                    </span>
                  </button>

                </div>
           

            </div>
          </div>
        </div>



        {/* ===================================================
            ADD IMAGE MODAL
        ==================================================== */}

        <DestroyerPopup
          isOpen={isAddModalOpen}
          onClose={closeAddImageModal}
          title="Upload Hero Background"
          primaryAction={handleImageUpload}
          actionText="Upload Image"
          loading={loading}
        >

          <div className="space-y-5">

            {/* ==============================================
                UPLOAD AREA
            =============================================== */}

            <div
         onClick={() => fileInputRef.current?.click()}
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed p-6 text-slate-500 transition-all ${
"border-slate-200 hover:bg-slate-50"
              }`}
            >

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              {!selectedFile ? (
                <div className="text-center">

                  <HiOutlinePhotograph
                    size={40}
                    className="mx-auto mb-2 text-slate-300"
                  />

                  <p className="text-sm font-semibold text-slate-600">
                    Click to select image
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
                    PNG, JPG, WEBP · Max 4MB
                  </p>

                </div>
              ) : (
                <div className="w-full text-center">

                  <div className="relative mx-auto mb-2 h-24 w-24">

                    <img
                      src={selectedFile.preview}
                      alt="Preview"
                      className="h-full w-full rounded-2xl border-2 border-white object-cover shadow-lg"
                    />

                    <button
                      type="button"
                      onClick={clearSelection}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-all hover:bg-red-600"
                    >
                      <HiOutlineX size={14} />
                    </button>

                  </div>

                  <p className="mx-auto max-w-[180px] truncate rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-500">
                    {selectedFile.name}
                  </p>

                </div>
              )}
            </div>




          </div>
        </DestroyerPopup>
      </div>
    </>
  );
}
