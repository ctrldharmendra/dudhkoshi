"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlinePhotograph,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineCollection,
} from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import DestroyerPopup from "../components/DestroyerPopup";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  addGalleryImage,
  deleteGalleryImage,
  getGallery,
  updateGalleryImage,
} from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/helper/helper";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";

/* =========================================================
   GALLERY CATEGORIES

   Used for:
   - Add image
   - Edit image
========================================================= */

const galleryCategories = [
  {
    value: "",
    label: "None",
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
  },
  {
    value: "community",
    label: "Community",
  },
  {
    value: "events",
    label: "Events",
  },
];

/* =========================================================
   GALLERY FILTERS

   Used only for filtering the displayed gallery.

   "all" means show every image.
========================================================= */

const galleryFilters = [
  {
    value: "all",
    label: "All Photos",
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
  },
  {
    value: "community",
    label: "Communities",
  },
  {
    value: "events",
    label: "Events",
  },
];

/* =========================================================
   HELPERS
========================================================= */

/**
 * Convert File -> base64 data URL.
 *
 * Temporary local implementation.
 *
 * Later, when backend upload is connected,
 * this can be replaced with FormData upload.
 */
const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image file."));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Convert category value into display label.
 */
const getCategoryLabel = (category) => {
  if (!category) {
    return "";
  }

  const found = galleryCategories.find(
    (item) => item.value === category
  );

  return found?.label || category;
};

/**
 * Get image source.
 *
 * Supports:
 *
 * 1. Local public images:
 *    /gallery/image.jpg
 *
 * 2. Base64:
 *    data:image/...
 *
 * 3. Blob:
 *    blob:...
 *
 * 4. Full backend URL:
 *    https://...
 *
 * 5. Backend image paths:
 *    uploads/gallery/image.jpg
 */
const getImageSrc = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("data:") ||
    image.startsWith("blob:") ||
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("/")
  ) {
    return image;
  }

  return `${process.env.NEXT_PUBLIC_BASE_CONTENT_URL}/${image}`;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryPage() {
  const dispatch = useDispatch();


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
    dispatch(getGallery({}));

}, [permissionChecked, dispatch]);

  const [saving, setSaving] = useState(false);

  /* =========================================================
     GALLERY DATA

     Comes from the backend:
     { id, image, category }
  ========================================================= */

  const gallery = useSelector((state) => state?.landingPageAdmmin?.gallery);
  const loading = useSelector((state) => state?.landingPageAdmmin?.galleryLoading);

  const galleryData = Array.isArray(gallery) ? gallery : [];



  /* =========================================================
     GALLERY FILTER

     "all" = show all images.

     Other values match item.category.
  ========================================================= */

  const [activeFilter, setActiveFilter] = useState("all");

  /* =========================================================
     ADD MODAL
  ========================================================= */

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  /* =========================================================
     EDIT MODAL
  ========================================================= */

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingImage, setEditingImage] = useState(null);

  /* =========================================================
     DELETE MODAL
  ========================================================= */

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [imageToDelete, setImageToDelete] = useState(null);

  /* =========================================================
     IMAGE
  ========================================================= */

  const [selectedFile, setSelectedFile] = useState(null);

  /* =========================================================
     CATEGORY

     Empty string = no category.
  ========================================================= */

  const [category, setCategory] = useState("");

  /* =========================================================
     FILE INPUT
  ========================================================= */

  const fileInputRef = useRef(null);

  /* =========================================================
     FILTERED GALLERY

     This does NOT modify galleryData.

     It only determines which images are displayed.
  ========================================================= */

  const filteredGalleryData =
    activeFilter === "all"
      ? galleryData
      : galleryData.filter(
          (item) => item.category === activeFilter
        );

  /* =========================================================
     IMAGE FILE CHANGE
  ========================================================= */

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    /* ---------------------------------------------
       Validate image type
    --------------------------------------------- */

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");

      e.target.value = "";

      return;
    }

    /* ---------------------------------------------
       Validate image size
    --------------------------------------------- */

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "File is too large! Please select an image under 5MB."
      );

      e.target.value = "";

      return;
    }

    try {
      const imageDataUrl = await fileToDataUrl(file);

      setSelectedFile({
        file,
        name: file.name,
        preview: imageDataUrl,
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to load the selected image.");
    }
  };

  /* =========================================================
     CLEAR IMAGE SELECTION
  ========================================================= */

  const clearSelection = (e) => {
    e?.stopPropagation();

    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setSelectedFile(null);

    /*
     * Category is optional.
     * Empty string means "None".
     */
    setCategory("");

    setEditingImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     OPEN ADD MODAL
  ========================================================= */

  const openAddModal = () => {
    resetForm();

    setIsAddModalOpen(true);
  };

  /* =========================================================
     CLOSE ADD MODAL
  ========================================================= */

  const closeAddModal = () => {
    setIsAddModalOpen(false);

    resetForm();
  };


/* =========================================================
   CREATE / UPLOAD GALLERY IMAGE
========================================================= */

const handleUploadImage = async () => {
  if (!selectedFile?.file) {
    toast.error("Please select an image.");
    return;
  }

  const formData = new FormData();

  formData.append("image", selectedFile.file);
  formData.append("category", category || "");

  setSaving(true);

  const result = await dispatch(addGalleryImage({ formData }));

  setSaving(false);

  if (result.payload?.statusCode === 200 || result.payload?.statusCode === 201) {
    toast.success(result.payload.message);

    dispatch(getGallery({}));

    closeAddModal();
  }
};


  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const openEditModal = (item) => {
    setEditingImage(item);

    /*
     * Existing category can be:
     *
     * "infrastructure"
     * "community"
     * "events"
     * ""
     *
     * If missing/null, use empty string.
     */
    setCategory(item.category || "");

    /*
     * No new image selected initially.
     *
     * Existing image remains unchanged unless
     * the user selects a replacement.
     */
    setSelectedFile(null);

    setIsEditModalOpen(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     CLOSE EDIT MODAL
  ========================================================= */

  const closeEditModal = () => {
    setIsEditModalOpen(false);

    resetForm();
  };

/* =========================================================
   UPDATE GALLERY IMAGE

   Updates the category and, when a new file is picked,
   replaces the stored image.
========================================================= */

const handleUpdateImage = async () => {
  if (!editingImage) {
    toast.error("No image selected.");
    return;
  }

  const formData = new FormData();

  formData.append("category", category || "");

  /*
   * The image is optional: only send it when the user
   * picked a replacement. Otherwise the existing image
   * is kept.
   */
  if (selectedFile?.file) {
    formData.append("image", selectedFile.file);
  }

  setSaving(true);

  const result = await dispatch(
    updateGalleryImage({ formData, id: editingImage.id })
  );

  setSaving(false);

  if (result.payload?.statusCode === 200 || result.payload?.statusCode === 201) {
    toast.success(result.payload.message);

    dispatch(getGallery({}));

    closeEditModal();
  }
};

  /* =========================================================
     OPEN DELETE MODAL
  ========================================================= */

  const openDeleteModal = (id) => {
    setImageToDelete(id);

    setIsDeleteModalOpen(true);
  };

  /* =========================================================
     CLOSE DELETE MODAL
  ========================================================= */

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);

    setImageToDelete(null);
  };

  /* =========================================================
     CONFIRM DELETE
  ========================================================= */

  const confirmDelete = async () => {
    if (imageToDelete === null) {
      return;
    }

    setSaving(true);

    const result = await dispatch(
      deleteGalleryImage({ id: imageToDelete })
    );

    setSaving(false);

    if (result.payload?.statusCode === 200 || result.payload?.statusCode === 201) {
      toast.success(result.payload.message);

      dispatch(getGallery({}));
    }

    closeDeleteModal();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  if (loading || saving) {
    return (
      <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="flex justify-between items-center mb-6 lg:flex-row flex-col gap-5">

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <HiOutlineCollection className="text-indigo-600" />

            Gallery
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your image gallery (
            {galleryData.length} images)
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
        >
          <HiOutlinePlus size={20} />

          Add Image
        </button>

      </header>

      {/* =====================================================
          GALLERY FILTER

          All Photos
          Infrastructure
          Communities
          Events
      ===================================================== */}

      <div className="mb-8 overflow-x-auto pb-1">

        <div className="flex items-center gap-2 min-w-max">

          {galleryFilters.map((filter) => {
            const isActive =
              activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setActiveFilter(filter.value)
                }
                className={`
                  px-5 py-2.5
                  rounded-full
                  text-sm
                  font-medium
                  whitespace-nowrap
                  transition-all
                  duration-200
                  border

                  ${
                    isActive
                      ? "bg-[#2583bd] text-white border-[#2583bd] shadow-sm"
                      : "bg-[#eef5fa] text-slate-700 border-transparent hover:bg-[#dcecf6] hover:text-[#2583bd]"
                  }
                `}
              >
                {filter.label}
              </button>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          GALLERY GRID
      ===================================================== */}

      {filteredGalleryData.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredGalleryData.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">

                <img
                  src={getImageSrc(item.image)}
                  alt={
                    item.category
                      ? getCategoryLabel(item.category)
                      : "Gallery image"
                  }
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";

                    const fallback =
                      e.currentTarget.parentElement?.querySelector(
                        ".image-fallback"
                      );

                    fallback?.classList.remove(
                      "hidden"
                    );
                  }}
                />

                {/* =================================================
                    IMAGE FALLBACK
                ================================================= */}

                <div className="image-fallback hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">

                  <HiOutlinePhotograph
                    size={80}
                    className="text-indigo-200"
                  />

                </div>

                {/* =================================================
                    CATEGORY BADGE

                    Only show when category exists.
                ================================================= */}

                {item.category && (

                  <div className="absolute top-3 left-3">

                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-indigo-700 shadow-sm">

                      {getCategoryLabel(
                        item.category
                      )}

                    </span>

                  </div>

                )}

              </div>

              {/* =================================================
                  ACTIONS

                  Edit + Delete are at the bottom.
              ================================================= */}

              <div className="p-3 flex gap-3 border-t border-slate-100 bg-white">

                {/* EDIT */}

                <button
                  onClick={() =>
                    openEditModal(item)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl font-semibold text-sm hover:bg-indigo-600 hover:text-white transition-all duration-200"
                >
                  <CiEdit size={20} />

                  Edit
                </button>

                {/* DELETE */}

                <button
                  onClick={() =>
                    openDeleteModal(item.id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-semibold text-sm hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  <HiOutlineTrash size={18} />

                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* =====================================================
           FILTERED EMPTY STATE
        ===================================================== */

        <div className="bg-white rounded-3xl shadow-sm p-20 text-center">

          <HiOutlinePhotograph
            className="mx-auto text-slate-300 mb-4"
            size={64}
          />

          <h3 className="text-xl font-bold text-slate-600 mb-2">
            {activeFilter === "all"
              ? "No Images Yet"
              : `No ${
                  galleryFilters.find(
                    (filter) =>
                      filter.value === activeFilter
                  )?.label || "Images"
                } Images`}
          </h3>

          <p className="text-slate-400 mb-6">
            {activeFilter === "all"
              ? "Add your first image to start building your gallery"
              : "There are no images in this category yet."}
          </p>

          <button
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg inline-flex items-center gap-2"
          >
            <HiOutlinePlus size={20} />

            Add Image
          </button>

        </div>

      )}

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      <DestroyerPopup
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Remove Image?"
        primaryAction={confirmDelete}
        actionText="Yes, Delete"
      >

        <p>
          This action cannot be undone. This image
          will be permanently removed from your
          gallery.
        </p>

      </DestroyerPopup>

      {/* =====================================================
          ADD IMAGE MODAL
      ===================================================== */}

      <DestroyerPopup
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add New Image"
        primaryAction={handleUploadImage}
        actionText="Upload Image"
      >

        <div className="space-y-5">

          {/* =================================================
              IMAGE UPLOAD
          ================================================= */}

          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-all cursor-pointer min-h-[240px] relative overflow-hidden group"
          >

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png,image/jpeg,image/jpg,image/webp"
            />

            {!selectedFile ? (

              <div className="text-center">

                <HiOutlinePhotograph
                  size={56}
                  className="text-slate-300 mb-3 mx-auto group-hover:text-indigo-400 transition-colors"
                />

                <p className="font-semibold text-sm text-slate-600 mb-1">
                  Click to select image
                </p>

                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  PNG, JPG, WEBP — Max 5MB
                </p>

              </div>

            ) : (

              <div
                className="w-full text-center"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <div className="relative mx-auto w-40 h-40 mb-3">

                  <img
                    src={selectedFile.preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white"
                  />

                  <button
                    type="button"
                    onClick={clearSelection}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-all"
                    aria-label="Remove image"
                  >
                    <HiOutlineX size={18} />
                  </button>

                </div>

                <p className="text-xs font-bold text-indigo-500 truncate max-w-[200px] mx-auto bg-indigo-50 px-3 py-1 rounded-lg">
                  {selectedFile.name}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Change image
                </button>

              </div>

            )}

          </div>

          {/* =================================================
              CATEGORY
          ================================================= */}

          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">

              <HiOutlineCollection className="text-indigo-500" />

              Image Category

            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >

              {galleryCategories.map(
                (item) => (

                  <option
                    key={item.value || "none"}
                    value={item.value}
                  >
                    {item.label}
                  </option>

                )
              )}

            </select>

            <p className="text-xs text-slate-400 mt-2">
              Category is optional.
            </p>

          </div>

        </div>

      </DestroyerPopup>

      {/* =====================================================
          EDIT IMAGE MODAL
      ===================================================== */}

      <DestroyerPopup
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Update Gallery Image"
        primaryAction={handleUpdateImage}
        actionText="Update Image"
      >

        <div className="space-y-5">

          {/* =================================================
              IMAGE
          ================================================= */}

          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-all cursor-pointer min-h-[240px] relative overflow-hidden group"
          >

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png,image/jpeg,image/jpg,image/webp"
            />

            {selectedFile ? (

              <div
                className="w-full text-center"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <div className="relative mx-auto w-40 h-40 mb-3">

                  <img
                    src={selectedFile.preview}
                    alt="New preview"
                    className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white"
                  />

                  <button
                    type="button"
                    onClick={clearSelection}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-all"
                    aria-label="Remove selected image"
                  >
                    <HiOutlineX size={18} />
                  </button>

                </div>

                <p className="text-xs font-bold text-indigo-500 truncate max-w-[200px] mx-auto bg-indigo-50 px-3 py-1 rounded-lg">
                  {selectedFile.name}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Change image
                </button>

              </div>

            ) : (

              <div className="text-center">

                <HiOutlinePhotograph
                  size={56}
                  className="text-slate-300 mb-3 mx-auto group-hover:text-indigo-400 transition-colors"
                />

                <p className="font-semibold text-sm text-slate-600 mb-1">
                  Click to replace image
                </p>

                <p className="text-xs text-slate-400">
                  Leave unchanged to keep current
                  image
                </p>

              </div>

            )}

          </div>

          {/* =================================================
              CATEGORY
          ================================================= */}

          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">

              <HiOutlineCollection className="text-indigo-500" />

              Image Category

            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >

              {galleryCategories.map(
                (item) => (

                  <option
                    key={item.value || "none"}
                    value={item.value}
                  >
                    {item.label}
                  </option>

                )
              )}

            </select>

            <p className="text-xs text-slate-400 mt-2">
              Category is optional. Select None to
              remove the current category.
            </p>

          </div>

        </div>

      </DestroyerPopup>

    </div>
  );
}
