"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  HiOutlineGlobe,
  HiOutlineLocationMarker,
  HiOutlineSave,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
  HiOutlineShare,
  HiOutlinePhotograph,
  HiOutlineCollection,
  HiOutlineCursorClick,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlinePhone,
  HiOutlineInformationCircle,
  HiOutlineX,
} from "react-icons/hi";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLink,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import {
  getMisc,
  updateMisc,
} from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import { hasPermission } from "@/helper/helper";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { useRouter } from "next/navigation";

const FIELD_LIMITS = {
  aboutUsPara: 200,
  footerDesc: 300,
  footerCtaPara: 250,
  teamSecPara: 200,
  blogSecPara: 200,
  powerEvacuationTopNote: 200,
  spatialPara: 200,
};

/* ============================================================
   HELPERS
============================================================ */

function normalizeData(data) {
  const source = data || {};

  return {
    copyright: source.copyright ?? "",
    email: source.email ?? "",
    email2: source.email2 ?? "",
    phn: source.phn ?? "",
    address: source.address ?? "",
    location: source.location ?? "",
    footerDesc: source.footerDesc ?? "",
    logo: source.logo ?? "",
    logoName: source.logoName ?? "",

    footerCtaTtitle: source.footerCtaTtitle ?? "",
    footerCtaPara: source.footerCtaPara ?? "",
    footerCtaBtn1Text: source.footerCtaBtn1Text ?? "",
    footerCtaBtn2Tetx: source.footerCtaBtn2Tetx ?? "",
    footerCtaBtn1Link: source.footerCtaBtn1Link ?? "",
    footerCtaBtn2Link: source.footerCtaBtn2Link ?? "",

    blogSecPara: source.blogSecPara ?? "",
    fbLink: source.fbLink ?? "",
    xLink: source.xLink ?? "",
    instaLink: source.instaLink ?? "",
    ytLink: source.ytLink ?? "",

    inquiryImage: source.inquiryImage ?? "",
    contactWallpaper: source.contactWallpaper ?? "",
    phn2: source.phn2 ?? "",

    powerEvacuationTopNote:
      source.powerEvacuationTopNote ?? "",

    teamSecPara: source.teamSecPara ?? "",

    mw: source.mw ?? "",
    c02Reduced: source.c02Reduced ?? "",
    longLat: source.longLat ?? "",

    spatialTitle: source.spatialTitle ?? "",
    spatialPara: source.spatialPara ?? "",

    estd: source.estd ?? "",
    designDischarge: source.designDischarge ?? "",
    grossHead: source.grossHead ?? "",

    aboutUsPara: source.aboutUsPara ?? "",
  };
}

function formatUrl(url) {
  if (!url) return "";

  const trimmed = url.trim();

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function resolveImageUrl(value) {
  if (!value) return "";

  const trimmed = String(value).trim();

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `${process.env.NEXT_PUBLIC_BASE_CONTENT_URL}/${trimmed}`;
}

function formatPhoneNumber(phone) {
  if (!phone) return "";

  const cleaned = String(phone).replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(
      3,
      6
    )}-${cleaned.slice(6)}`;
  }

  return phone;
}

function isValidUrl(value) {
  if (!value) return true;

  try {
    new URL(formatUrl(value));
    return true;
  } catch {
    return false;
  }
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function OtherPage() {
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
    dispatch(getMisc());

}, [permissionChecked, dispatch]);


  const misc = useSelector(
    (state) => state?.landingPageAdmmin?.misc
  );
  const miscLoading = useSelector(
    (state) => state?.landingPageAdmmin?.miscLoading
  );

  const [savedData, setSavedData] = useState(() =>
    normalizeData({})
  );

  const [formData, setFormData] = useState(() =>
    normalizeData({})
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const logoInputRef = useRef(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

const inquiryImageInputRef = useRef(null);
const [selectedInquiryImage, setSelectedInquiryImage] =
  useState(null);

const contactWallpaperInputRef = useRef(null);
const [selectedContactWallpaper, setSelectedContactWallpaper] =
  useState(null);

  /*
   * Load the stored configuration once the page mounts.
   */

  /*
   * Mirror the server row into local form state whenever it changes.
   */
  useEffect(() => {
    const row = Array.isArray(misc) ? misc[0] : misc;

    if (!row) return;

    const normalized = normalizeData(row);

    setSavedData(normalized);
    setFormData(normalized);

    setSelectedLogo(null);
    setSelectedInquiryImage(null);
    setSelectedContactWallpaper(null);
  }, [misc]);



  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;




    // =====================================================
    // VALIDATE FILE SIZE
    // =====================================================

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      toast.error(
        "Image is too large. Please select an image under 5MB."
      );

      e.target.value = "";
      return;
    }

    // =====================================================
    // CREATE LOCAL PREVIEW
    // =====================================================

    const preview = URL.createObjectURL(file);

    // Clean up previous temporary preview
    if (
      selectedLogo?.preview &&
      !selectedLogo.isExisting
    ) {
      URL.revokeObjectURL(selectedLogo.preview);
    }

    setSelectedLogo({
    file,
    preview,
    name: file.name,
    isExisting: false,
  });

  };

  const handleInquiryImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;



    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      toast.error(
        "Image is too large. Please select an image under 5MB."
      );

      e.target.value = "";
      return;
    }

    // Create preview
    const preview = URL.createObjectURL(file);

    // Clean previous temporary preview
    if (
      selectedInquiryImage?.preview &&
      !selectedInquiryImage.isExisting
    ) {
      URL.revokeObjectURL(selectedInquiryImage.preview);
    }

    setSelectedInquiryImage({
      file,
      preview,
      name: file.name,
      isExisting: false,
    });
  };

  const handleContactWallpaperChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;




    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      toast.error(
        "Image is too large. Please select an image under 5MB."
      );

      e.target.value = "";
      return;
    }

    // Create preview
    const preview = URL.createObjectURL(file);

    // Clean previous temporary preview
    if (
      selectedContactWallpaper?.preview &&
      !selectedContactWallpaper.isExisting
    ) {
      URL.revokeObjectURL(
        selectedContactWallpaper.preview
      );
    }

    setSelectedContactWallpaper({
      file,
      preview,
      name: file.name,
      isExisting: false,
    });
  };



  const clearLogo = (e) => {
    e.stopPropagation();

    if (selectedLogo?.preview && !selectedLogo.isExisting) {
      URL.revokeObjectURL(selectedLogo.preview);
    }

    setSelectedLogo(null);

    handleInputChange("logo", "");

    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const clearInquiryImage = (e) => {
    e.stopPropagation();

    if (
      selectedInquiryImage?.preview &&
      !selectedInquiryImage.isExisting
    ) {
      URL.revokeObjectURL(selectedInquiryImage.preview);
    }

    setSelectedInquiryImage(null);

    handleInputChange("inquiryImage", "");

    if (inquiryImageInputRef.current) {
      inquiryImageInputRef.current.value = "";
    }
  };

  const clearContactWallpaper = (e) => {
    e.stopPropagation();

    if (
      selectedContactWallpaper?.preview &&
      !selectedContactWallpaper.isExisting
    ) {
      URL.revokeObjectURL(
        selectedContactWallpaper.preview
      );
    }

    setSelectedContactWallpaper(null);

    handleInputChange("contactWallpaper", "");

    if (contactWallpaperInputRef.current) {
      contactWallpaperInputRef.current.value = "";
    }
  };




  /* ==========================================================
     DIRTY STATE
  ========================================================== */

  const isDirty = useMemo(() => {
    return (
      JSON.stringify(formData) !==
      JSON.stringify(savedData)
    );
  }, [formData, savedData]);

  /* ==========================================================
     INPUT HANDLER
  ========================================================== */

  const handleInputChange = (field, value) => {
  const limit = FIELD_LIMITS[field];

  if (limit && value.length > limit) {
    return toast.error(
      `Less than ${limit} characters`
    );
  }

  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  /* ==========================================================
     VALIDATION
  ========================================================== */

  const validateForm = () => {
    const urlFields = [
      "footerCtaBtn1Link",
      "footerCtaBtn2Link",
      "fbLink",
      "xLink",
      "instaLink",
      "ytLink",
    ];

    for (const field of urlFields) {
      const value = String(formData[field] || "").trim();

      if (!value) continue;

      if (!isValidUrl(value)) {
        toast.error(
          `Please enter a valid URL for ${field}.`
        );

        return false;
      }
    }

    return true;
  };

  /* ==========================================================
     SAVE - LOCAL ONLY
  ========================================================== */

  /*
   * Image columns share the same save flow: a freshly picked file wins,
   * otherwise the current value is passed through with a removal flag when
   * the stored image was cleared.
   */
  const IMAGE_FIELDS = [
    { field: "logo", flag: "removeLogo", selected: selectedLogo },
    {
      field: "inquiryImage",
      flag: "removeInquiryImage",
      selected: selectedInquiryImage,
    },
    {
      field: "contactWallpaper",
      flag: "removeContactWallpaper",
      selected: selectedContactWallpaper,
    },
  ];

  const handleSave = async () => {
    if (!validateForm()) return;

    const hasNewFile = IMAGE_FIELDS.some(
      (item) => item.selected?.file
    );

    if (!isDirty && !hasNewFile) {
      toast("No changes to save.");
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    try {
      const payload = new FormData();

      // Plain text / url columns are sent as-is; the backend only writes the
      // columns it receives.
      Object.entries(formData).forEach(([field, value]) => {
        if (IMAGE_FIELDS.some((item) => item.field === field)) return;

        payload.append(field, value ?? "");
      });

      IMAGE_FIELDS.forEach(({ field, flag, selected }) => {
        if (selected?.file) {
          payload.append(field, selected.file);
          return;
        }

        payload.append(field, formData[field] ?? "");

        if (!formData[field] && savedData[field]) {
          payload.append(flag, "true");
        }
      });

      const result = await dispatch(
        updateMisc({ formData: payload })
      );

      if (result.payload?.statusCode === 200) {
        const updatedData = normalizeData(formData);

        setSavedData(updatedData);
        setFormData(updatedData);

        setSelectedLogo(null);
        setSelectedInquiryImage(null);
        setSelectedContactWallpaper(null);

        setIsEditing(false);

        toast.success(
          result.payload.message ||
            "Site configuration updated."
        );

        dispatch(getMisc());
      }
    } finally {
      setIsSaving(false);
    }
  };

  /* ==========================================================
     CANCEL
  ========================================================== */

  const handleCancel = () => {
    if (isDirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Discard them?"
      );

      if (!confirmed) return;
    }

    setFormData(savedData);
    setIsEditing(false);

    setSelectedLogo(null);
    setSelectedInquiryImage(null);
    setSelectedContactWallpaper(null);
  };

  /* ==========================================================
     REFRESH
  ========================================================== */

  const handleRefresh = async () => {
    if (isEditing && isDirty) {
      const confirmed = window.confirm(
        "Refreshing will discard your unsaved changes. Continue?"
      );

      if (!confirmed) return;
    }

    setFormData(savedData);
    setIsEditing(false);

    setSelectedLogo(null);
    setSelectedInquiryImage(null);
    setSelectedContactWallpaper(null);

    dispatch(getMisc());

    toast.success("Configuration refreshed.");
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  if (miscLoading) {
    return (
      <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {(isSaving) && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-6 py-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

              <span className="text-sm font-medium text-slate-700">
                Saving...
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-50">
        <div
          className={`w-full px-3${
            isEditing ? " pb-24" : " pb-6"
          }`}
        >

          {/* ==================================================
              HEADER
          ================================================== */}

          <header className="mb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                  <HiOutlineGlobe className="h-5 w-5 text-indigo-600" />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    Site Configuration
                  </h1>

                  <p className="text-xs text-slate-500">
                    Manage branding, contact, footer,
                    social and project settings.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleRefresh}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <HiOutlineRefresh className="h-4 w-4" />
                      Refresh
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-3.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                    >
                      <HiOutlinePencilAlt className="h-4 w-4" />
                      Edit
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="h-9 rounded-lg border border-slate-300 bg-white px-3.5 text-xs font-semibold text-slate-700"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-3.5 text-xs font-semibold text-white disabled:opacity-50"
                    >
                      <HiOutlineSave className="h-4 w-4" />
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* ==================================================
              EDIT MODE NOTICE
          ================================================== */}

          {isEditing && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
              <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

              <div>
                <p className="text-sm font-semibold text-indigo-900">
                  Editing site configuration
                </p>

                <p className="mt-0.5 text-xs text-indigo-700">
                  Changes are saved to the server when you
                  click Save.
                </p>
              </div>
            </div>
          )}

          {/* ==================================================
              GENERAL & BRANDING
         ================================================== */}

          <ConfigSection
            icon={<HiOutlinePhotograph className="h-5 w-5" />}
            title="General & Branding"
            description="Manage your website identity, logo and organization information."
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

              {/* =====================================================
                  LOGO
              ===================================================== */}

              <div className="lg:col-span-1">
                <FieldLabel label="Logo" />

                <input
                  ref={logoInputRef}
                  type="file"
                  onChange={handleLogoChange}
                  className="hidden"
                />

                {isEditing ? (
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="group relative mt-2 flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-indigo-300 hover:bg-indigo-50/40"
                  >
                    {!selectedLogo && !formData.logo ? (
                      <div className="text-center">
                        <HiOutlinePhotograph
                          className="mx-auto mb-3 h-10 w-10 text-slate-300 transition group-hover:text-indigo-400"
                        />

                        <p className="mb-1 text-sm font-semibold text-slate-600">
                          Click to select image
                        </p>

                        <p className="text-xs uppercase tracking-wider text-slate-400">
                          PNG, JPG (MAX 5MB)
                        </p>
                      </div>
                    ) : (
                      <div className="relative flex h-full w-full items-center justify-center p-3">
                        <img
                          src={
                            selectedLogo?.preview ||
                            resolveImageUrl(formData.logo)
                          }
                          alt="Logo preview"
                          className="max-h-24 max-w-full object-contain"
                        />

                        <button
                          type="button"
                          onClick={clearLogo}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                        >
                          <HiOutlineX className="h-4 w-4" />
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-slate-900/75 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                          Click to change
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 flex h-32 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                    {formData.logo ? (
                      <img
                        src={resolveImageUrl(formData.logo)}
                        alt="Site logo"
                        className="max-h-24 max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <HiOutlinePhotograph className="mx-auto h-7 w-7 text-slate-300" />

                        <p className="mt-1 text-xs text-slate-400">
                          No logo configured
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>


              {/* =====================================================
                  ORGANIZATION DETAILS
              ===================================================== */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-2">

                <FormField
                  label="Logo Name"
                  value={formData.logoName}
                  editing={isEditing}
                  onChange={(value) =>
                    handleInputChange("logoName", value)
                  }
                  placeholder="Company / organization name"
                />

                <FormField
                  label="Established"
                  value={formData.estd}
                  editing={isEditing}
                  onChange={(value) =>
                    handleInputChange("estd", value)
                  }
                  placeholder="e.g. 2005"
                />

                <div className="sm:col-span-2">
                  <FormField
                    label="About Us"
                    value={formData.aboutUsPara}
                    editing={isEditing}
                    textarea
                    rows={3}
                    maxLength={FIELD_LIMITS.aboutUsPara}
                    onChange={(value) =>
                      handleInputChange("aboutUsPara", value)
                    }
                    placeholder="Describe your organization..."
                  />
                </div>

              </div>
            </div>
          </ConfigSection>


          {/* ==================================================
              CONTACT
          ================================================== */}

          <ConfigSection
            icon={<HiOutlinePhone className="h-5 w-5" />}
            title="Contact Information"
            description="Contact information displayed across the website."
          >
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
              <FormField
                label="Primary Email"
                type="email"
                value={formData.email}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("email", value)
                }
                placeholder="contact@example.com"
              />

              <FormField
                label="Secondary Email"
                type="email"
                value={formData.email2}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("email2", value)
                }
                placeholder="Optional secondary email"
              />

              <FormField
                label="Primary Phone"
                type="tel"
                value={formData.phn}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("phn", value)
                }
                placeholder="+977 98XXXXXXXX"
              />

              <FormField
                label="Secondary Phone"
                type="tel"
                value={formData.phn2}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("phn2", value)
                }
                placeholder="Optional secondary phone"
              />

              <FormField
                label="Location"
                value={formData.location}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("location", value)
                }
                placeholder="City, country"
              />

              <FormField
                label="Address"
                value={formData.address}
                editing={isEditing}
                textarea
                rows={3}
                onChange={(value) =>
                  handleInputChange("address", value)
                }
                placeholder="Full office address"
              />
            </div>
          </ConfigSection>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <ConfigSection
            icon={<HiOutlineCollection className="h-5 w-5" />}
            title="Footer Configuration"
            description="Manage footer description, copyright and call-to-action content."
          >
            <div className="space-y-4">
              <FormField
                label="Footer Description"
                value={formData.footerDesc}
                editing={isEditing}
                textarea
                rows={4}
                maxLength={FIELD_LIMITS.footerDesc}
                onChange={(value) =>
                  handleInputChange("footerDesc", value)
                }
              />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  label="Copyright"
                  value={formData.copyright}
                  editing={isEditing}
                  onChange={(value) =>
                    handleInputChange("copyright", value)
                  }
                  placeholder="© 2026 Company Name"
                />

                <FormField
                  label="CTA Heading"
                  value={formData.footerCtaTtitle}
                  editing={isEditing}
                  onChange={(value) =>
                    handleInputChange(
                      "footerCtaTtitle",
                      value
                    )
                  }
                  placeholder="Ready to get started?"
                />
              </div>

              <FormField
                label="CTA Paragraph"
                value={formData.footerCtaPara}
                editing={isEditing}
                textarea
                rows={3}
                maxLength={FIELD_LIMITS.footerCtaPara}
                onChange={(value) =>
                  handleInputChange("footerCtaPara", value)
                }
              />

              {/* CTA */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
                    <HiOutlineCursorClick className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Call-to-Action Buttons
                    </h3>

                    <p className="text-xs text-slate-500">
                      Configure the two footer CTA buttons.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* BUTTON 1 */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <h4 className="mb-4 text-sm font-bold text-slate-800">
                      Button 1
                    </h4>

                    <div className="space-y-4">
                      <FormField
                        label="Button Text"
                        value={formData.footerCtaBtn1Text}
                        editing={isEditing}
                        onChange={(value) =>
                          handleInputChange(
                            "footerCtaBtn1Text",
                            value
                          )
                        }
                        placeholder="Contact Us"
                      />

                      <FormField
                        label="Button Link"
                        type="url"
                        value={formData.footerCtaBtn1Link}
                        editing={isEditing}
                        onChange={(value) =>
                          handleInputChange(
                            "footerCtaBtn1Link",
                            value
                          )
                        }
                        placeholder="https://example.com/contact"
                      />
                    </div>
                  </div>

                  {/* BUTTON 2 */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <h4 className="mb-4 text-sm font-bold text-slate-800">
                      Button 2
                    </h4>

                    <div className="space-y-4">
                      <FormField
                        label="Button Text"
                        value={formData.footerCtaBtn2Tetx}
                        editing={isEditing}
                        onChange={(value) =>
                          handleInputChange(
                            "footerCtaBtn2Tetx",
                            value
                          )
                        }
                        placeholder="Learn More"
                      />

                      <FormField
                        label="Button Link"
                        type="url"
                        value={formData.footerCtaBtn2Link}
                        editing={isEditing}
                        onChange={(value) =>
                          handleInputChange(
                            "footerCtaBtn2Link",
                            value
                          )
                        }
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </ConfigSection>

          {/* ==================================================
              SOCIAL
          ================================================== */}

          <ConfigSection
            icon={<HiOutlineShare className="h-5 w-5" />}
            title="Social Media"
            description="Add official social media profiles for your organization."
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <SocialField
                label="Facebook"
                icon={FaFacebook}
                color="text-blue-600"
                value={formData.fbLink}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("fbLink", value)
                }
              />

              <SocialField
                label="X / Twitter"
                icon={FaTwitter}
                color="text-slate-900"
                value={formData.xLink}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("xLink", value)
                }
              />

              <SocialField
                label="Instagram"
                icon={FaInstagram}
                color="text-pink-600"
                value={formData.instaLink}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("instaLink", value)
                }
              />

              <SocialField
                label="YouTube"
                icon={FaYoutube}
                color="text-red-600"
                value={formData.ytLink}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("ytLink", value)
                }
              />
            </div>
          </ConfigSection>

          {/* ==================================================
              SITE CONTENT
          ================================================== */}

          <ConfigSection
            icon={<HiOutlineDocumentText className="h-5 w-5" />}
            title="Site Content"
            description="Supporting text used throughout different website sections."
          >
            <div className="space-y-5">
              <FormField
                label="Team Section Description"
                value={formData.teamSecPara}
                editing={isEditing}
                textarea
                rows={4}
                maxLength={FIELD_LIMITS.teamSecPara}
                onChange={(value) =>
                  handleInputChange(
                    "teamSecPara",
                    value
                  )
                }
                placeholder="Describe your team section..."
              />

              <FormField
                label="Blog Section Description"
                value={formData.blogSecPara}
                editing={isEditing}
                textarea
                rows={4}
                maxLength={FIELD_LIMITS.blogSecPara}
                onChange={(value) =>
                  handleInputChange(
                    "blogSecPara",
                    value
                  )
                }
                placeholder="Describe your blog section..."
              />

              <FormField
                label="Power Evacuation Top Note"
                value={formData.powerEvacuationTopNote}
                editing={isEditing}
                textarea
                rows={3}
                maxLength={FIELD_LIMITS.powerEvacuationTopNote}
                onChange={(value) =>
                  handleInputChange(
                    "powerEvacuationTopNote",
                    value
                  )
                }
                placeholder="Enter power evacuation note..."
              />
            </div>
          </ConfigSection>

          {/* ==================================================
              PROJECT INFORMATION
          ================================================== */}

          <ConfigSection
            icon={<HiOutlineChartBar className="h-5 w-5" />}
            title="Project Information"
            description="Technical information and project statistics."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <FormField
                label="Capacity"
                value={formData.mw}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange("mw", value)
                }
                placeholder="50"
                suffix="MW"
              />

              <FormField
                label="CO₂ Reduced"
                value={formData.c02Reduced}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange(
                    "c02Reduced",
                    value
                  )
                }
                placeholder="120000"
                suffix="t/year"
              />

              <FormField
                label="Design Discharge"
                value={formData.designDischarge}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange(
                    "designDischarge",
                    value
                  )
                }
                placeholder="Enter value"
              />

              <FormField
                label="Gross Head"
                value={formData.grossHead}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange(
                    "grossHead",
                    value
                  )
                }
                placeholder="Enter value"
              />
            </div>

            <div className="mt-5">
              <FormField
                label="Coordinates"
                value={formData.longLat}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange(
                    "longLat",
                    value
                  )
                }
                placeholder="27.7172, 85.3240"
                hint="Latitude, longitude"
              />
            </div>
          </ConfigSection>

          {/* ==================================================
              SPATIAL
          ================================================== */}

          <ConfigSection
            icon={<HiOutlineLocationMarker className="h-5 w-5" />}
            title="Spatial Information"
            description="Content describing the project's geographical location."
          >
            <div className="space-y-5">
              <FormField
                label="Spatial Section Title"
                value={formData.spatialTitle}
                editing={isEditing}
                onChange={(value) =>
                  handleInputChange(
                    "spatialTitle",
                    value
                  )
                }
                placeholder="Project Location"
              />

              <FormField
                label="Spatial Description"
                value={formData.spatialPara}
                editing={isEditing}
                textarea
                rows={4}
                maxLength={FIELD_LIMITS.spatialPara}
                onChange={(value) =>
                  handleInputChange(
                    "spatialPara",
                    value
                  )
                }
                placeholder="Describe the project's location..."
              />
            </div>
          </ConfigSection>

          {/* ==================================================
              CONTACT / INQUIRY IMAGES
          ================================================== */}

          <ConfigSection
            icon={<HiOutlinePhotograph className="h-5 w-5" />}
            title="Contact Images"
            description="Manage the images used in the inquiry and contact sections."
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-slate-200">

              {/* =====================================================
                  INQUIRY IMAGE
              ===================================================== */}

              <div className="lg:pr-6">
                <FieldLabel label="Inquiry Image" />

                <input
                  ref={inquiryImageInputRef}
                  type="file"
                  onChange={handleInquiryImageChange}
                  className="hidden"
                />

                {isEditing ? (
                  <div
                    onClick={() =>
                      inquiryImageInputRef.current?.click()
                    }
                    className="group relative mt-2 flex h-60 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-indigo-300 hover:bg-indigo-50/40"
                  >
                    {!selectedInquiryImage &&
                    !formData.inquiryImage ? (
                      /* EMPTY STATE */
                      <div className="text-center">
                        <HiOutlinePhotograph
                          className="mx-auto mb-3 h-12 w-12 text-slate-300 transition group-hover:text-indigo-400"
                        />

                        <p className="mb-1 text-sm font-semibold text-slate-600">
                          Click to select image
                        </p>

                        <p className="text-xs uppercase tracking-wider text-slate-400">
                          PNG, JPG (MAX 5MB)
                        </p>
                      </div>
                    ) : (
                      /* PREVIEW */
                      <div className="relative flex h-full w-full items-center justify-center p-3">
                        <img
                          src={
                            selectedInquiryImage?.preview ||
                            resolveImageUrl(formData.inquiryImage)
                          }
                          alt="Inquiry image preview"
                          className="max-h-full max-w-full rounded-lg object-contain"
                        />

                        <button
                          type="button"
                          onClick={clearInquiryImage}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                        >
                          <HiOutlineX className="h-4 w-4" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-slate-900/75 px-3 py-1.5 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                          Click to change
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* VIEW MODE */
                  <div className="mt-2 flex h-60 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                    {formData.inquiryImage ? (
                      <img
                        src={resolveImageUrl(formData.inquiryImage)}
                        alt="Inquiry section"
                        className="max-h-full max-w-full rounded-lg object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <HiOutlinePhotograph className="mx-auto h-10 w-10 text-slate-300" />

                        <p className="mt-2 text-sm text-slate-400">
                          No inquiry image configured
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* INFO */}
                {isEditing && (
                  <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                    <div className="flex items-start gap-3">
                      <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-indigo-900">
                          Inquiry Image
                        </p>

                        <p className="mt-1 text-xs leading-5 text-indigo-700">
                          Upload a PNG or JPG image up to 5MB.
                          Click the image area to select or replace the image.
                        </p>

                        {selectedInquiryImage && (
                          <p className="mt-2 truncate text-xs font-medium text-indigo-800">
                            Selected: {selectedInquiryImage.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>


              {/* =====================================================
                  CONTACT WALLPAPER
              ===================================================== */}

              <div className="mt-8 lg:mt-0 lg:pl-6">
                <FieldLabel label="Contact Wallpaper" />

                <input
                  ref={contactWallpaperInputRef}
                  type="file"
                  onChange={handleContactWallpaperChange}
                  className="hidden"
                />

                {isEditing ? (
                  <div
                    onClick={() =>
                      contactWallpaperInputRef.current?.click()
                    }
                    className="group relative mt-2 flex h-60 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-indigo-300 hover:bg-indigo-50/40"
                  >
                    {!selectedContactWallpaper &&
                    !formData.contactWallpaper ? (
                      /* EMPTY STATE */
                      <div className="text-center">
                        <HiOutlinePhotograph
                          className="mx-auto mb-3 h-12 w-12 text-slate-300 transition group-hover:text-indigo-400"
                        />

                        <p className="mb-1 text-sm font-semibold text-slate-600">
                          Click to select image
                        </p>

                        <p className="text-xs uppercase tracking-wider text-slate-400">
                          PNG, JPG (MAX 5MB)
                        </p>
                      </div>
                    ) : (
                      /* PREVIEW */
                      <div className="relative flex h-full w-full items-center justify-center p-3">
                        <img
                          src={
                            selectedContactWallpaper?.preview ||
                            resolveImageUrl(formData.contactWallpaper)
                          }
                          alt="Contact wallpaper preview"
                          className="max-h-full max-w-full rounded-lg object-contain"
                        />

                        <button
                          type="button"
                          onClick={clearContactWallpaper}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                        >
                          <HiOutlineX className="h-4 w-4" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-slate-900/75 px-3 py-1.5 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                          Click to change
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* VIEW MODE */
                  <div className="mt-2 flex h-60 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                    {formData.contactWallpaper ? (
                      <img
                        src={resolveImageUrl(formData.contactWallpaper)}
                        alt="Contact wallpaper"
                        className="max-h-full max-w-full rounded-lg object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <HiOutlinePhotograph className="mx-auto h-10 w-10 text-slate-300" />

                        <p className="mt-2 text-sm text-slate-400">
                          No contact wallpaper configured
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* INFO */}
                {isEditing && (
                  <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                    <div className="flex items-start gap-3">
                      <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-indigo-900">
                          Contact Wallpaper
                        </p>

                        <p className="mt-1 text-xs leading-5 text-indigo-700">
                          Upload a PNG or JPG image up to 5MB.
                          Click the image area to select or replace the image.
                        </p>

                        {selectedContactWallpaper && (
                          <p className="mt-2 truncate text-xs font-medium text-indigo-800">
                            Selected: {selectedContactWallpaper.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </ConfigSection>

          {/* ==================================================
              SUMMARY
          ================================================== */}

          {!isEditing && (
            <ConfigSection
              icon={<HiOutlineEye className="h-5 w-5" />}
              title="Configuration Summary"
              description="Quick overview of the current site configuration."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <SummaryCard
                  title="Organization"
                  items={[
                    ["Name", formData.logoName],
                    ["Established", formData.estd],
                    ["Email", formData.email],
                  ]}
                />

                <SummaryCard
                  title="Contact"
                  items={[
                    ["Phone", formatPhoneNumber(formData.phn)],
                    ["Location", formData.location],
                    ["Address", formData.address],
                  ]}
                />

                <SummaryCard
                  title="Project"
                  items={[
                    [
                      "Capacity",
                      formData.mw
                        ? `${formData.mw} MW`
                        : "",
                    ],
                    ["Gross Head", formData.grossHead],
                    [
                      "Discharge",
                      formData.designDischarge,
                    ],
                  ]}
                />
              </div>
            </ConfigSection>
          )}
        </div>
      </div>


      {/* ======================================================
          STICKY EDIT BAR
      ====================================================== */}

      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span
                className={`h-2 w-2 rounded-full ${
                  isDirty
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />

              {isDirty
                ? "Unsaved changes"
                : "All changes saved"}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700"
              >
                Discard
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !isDirty}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 text-xs font-semibold text-white disabled:opacity-50"
              >
                <HiOutlineSave className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

 /* =============================================================
    REUSABLE COMPONENTS
 ============================================================= */

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

/* =============================================================
   CONFIG SECTION
============================================================= */

const ConfigSection = ({
  icon,
  title,
  description,
  children,
}) => (
  <section className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
    {/* Compact section header */}
    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>

    {/* Compact content */}
    <div className="p-4 sm:p-5">
      {children}
    </div>
  </section>
);

/* =============================================================
   LABEL
============================================================= */

function FieldLabel({ label, required = false }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
}

/* =============================================================
   FORM FIELD
============================================================= */

function FormField({
  label,
  value,
  editing,
  onChange,
  placeholder = "",
  type = "text",
  textarea = false,
  rows = 3,
  required = false,
  suffix,
  hint,
  maxLength,
}) {
  const currentLength = (value || "").length;

  return (
    <div>
      <FieldLabel
        label={label}
        required={required}
      />

      {editing ? (
        <div className="relative mt-2">
          {textarea ? (
            <div className="relative">
              <textarea
                value={value || ""}
                onChange={(e) =>
                  onChange(e.target.value)
                }
                rows={rows}
                placeholder={placeholder}
                maxLength={maxLength}
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

              {/* CHARACTER COUNT */}
              {maxLength && (
                <span className="pointer-events-none absolute right-3 top-2 text-xs text-slate-400">
                  {currentLength}/{maxLength}
                </span>
              )}
            </div>
          ) : (
            <div className="relative">
              <input
                type={type}
                value={value || ""}
                onChange={(e) =>
                  onChange(e.target.value)
                }
                placeholder={placeholder}
                maxLength={maxLength}
                className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${
                  suffix ? "pr-16" : ""
                }`}
              />

              {suffix && (
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  {suffix}
                </span>
              )}

              {/* CHARACTER COUNT FOR INPUTS */}
              {maxLength && (
                <span className="pointer-events-none absolute right-3 bottom-1 text-xs text-slate-400">
                  {currentLength}/{maxLength}
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 min-h-[46px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          {value ? (
            <p className="whitespace-pre-wrap break-words text-sm text-slate-700">
              {type === "tel"
                ? formatPhoneNumber(value)
                : value}
            </p>
          ) : (
            <p className="text-sm italic text-slate-400">
              Not configured
            </p>
          )}
        </div>
      )}

      {hint && (
        <p className="mt-1.5 text-xs text-slate-400">
          {hint}
        </p>
      )}
    </div>
  );
}


/* =============================================================
   SOCIAL FIELD
============================================================= */

function SocialField({
  label,
  icon: Icon,
  color,
  value,
  editing,
  onChange,
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Icon className={`h-5 w-5 ${color}`} />
        {label}
      </label>

      {editing ? (
        <input
          type="url"
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={`https://...`}
          className={inputClass}
        />
      ) : (
        <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          {value ? (
            <a
              href={formatUrl(value)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <FaLink className="h-3.5 w-3.5 shrink-0" />

              <span className="truncate">
                {value}
              </span>
            </a>
          ) : (
            <span className="text-sm italic text-slate-400">
              Not configured
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* =============================================================
   SUMMARY CARD
============================================================= */

function SummaryCard({ title, items }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-3 text-sm font-bold text-slate-800">
        {title}
      </h3>

      <div className="space-y-2.5">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-3 text-sm"
          >
            <span className="shrink-0 text-slate-500">
              {label}
            </span>

            <span className="max-w-[65%] break-words text-right font-medium text-slate-700">
              {value || "Not configured"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


