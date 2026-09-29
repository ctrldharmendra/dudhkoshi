"use client";

import React, { useEffect, useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineHashtag,
  HiOutlineQuestionMarkCircle,
  HiOutlineTag,
} from "react-icons/hi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DestroyerPopup from "../components/DestroyerPopup";
import Loading from "../components/Loading";
import {
  createFaq,
  deleteFaq,
  getFaqs,
  updateFaq,
} from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/helper/helper";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";

const FAQ_CATEGORIES = [
  "General",
  "Projects",
  "Technical",
  "Environment",
  "Community",
  "Corporate",
];


export default function FAQPage() {
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

    dispatch(getFaqs());
}, [permissionChecked, dispatch]);

  /* ============================
     FAQ DATA
  ============================ */

  const faqs = useSelector((state) => state?.landingPageAdmmin?.faqs);
  const loading = useSelector(
    (state) => state?.landingPageAdmmin?.faqsLoading
  );

  const faqData = Array.isArray(faqs) ? faqs : [];

  const [saving, setSaving] = useState(false);

  /* ============================
     UI STATE
  ============================ */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [category, setCategory] = useState("");

  const [faqToDelete, setFaqToDelete] = useState(null);
  const [faqToEdit, setFaqToEdit] = useState(null);

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  
  
  

  /* ============================
     FORM RESET
  ============================ */

  const resetForm = () => {
    setQues("");
    setAns("");
    setCategory("");
    setFaqToEdit(null);
  };

  /* ============================
     OPEN CREATE MODAL
  ============================ */

  const handleAddFAQ = () => {
    resetForm();
    setIsModalOpen(true);
  };

  /* ============================
     OPEN EDIT MODAL
  ============================ */

  const handleEdit = (faq) => {
    setFaqToEdit(faq);

    setQues(faq.ques);
    setAns(faq.ans);
    setCategory(faq.category);

    setIsModalOpen(true);
  };

  /* ============================
     CREATE / UPDATE FAQ
  ============================ */

  const handleSubmit = async () => {
    if (!ques.trim()) {
      toast.error("Please enter a question");
      return;
    }

    if (!ans.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    const payload = {
      category,
      ques: ques.trim(),
      ans: ans.trim(),
    };

    setSaving(true);

    try {
      const result = faqToEdit
        ? await dispatch(
            updateFaq({ formData: payload, id: faqToEdit.id })
          )
        : await dispatch(createFaq({ formData: payload }));

      if (result.payload?.statusCode === 200) {
        toast.success(
          result.payload.message ||
            (faqToEdit
              ? "FAQ updated successfully"
              : "FAQ created successfully")
        );

        resetForm();
        setIsModalOpen(false);

        dispatch(getFaqs());
      }
    } finally {
      setSaving(false);
    }
  };


  /* ============================
     DELETE FAQ
  ============================ */

  const handleDelete = async () => {
    if (!faqToDelete) return;

    setSaving(true);

    try {
      const result = await dispatch(deleteFaq({ id: faqToDelete }));

      if (result.payload?.statusCode === 200) {
        if (expandedFAQ === faqToDelete) {
          setExpandedFAQ(null);
        }

        setFaqToDelete(null);
        setIsDeleteModalOpen(false);

        toast.success(
          result.payload.message || "FAQ deleted successfully"
        );

        dispatch(getFaqs());
      }
    } finally {
      setSaving(false);
    }
  };

  /* ============================
     TOGGLE FAQ
  ============================ */

  const toggleFAQ = (id) => {
    setExpandedFAQ((current) =>
      current === id ? null : id
    );
  };

/* ============================
   SORT STATE
============================ */

const [sortBy, setSortBy] = useState("General");


/* ============================
   FILTER + SORT
============================ */
const filteredFAQs = [...faqData]
  .filter((faq) => {
    const search = searchQuery.trim().toLowerCase();

    if (!search) return true;

    return (
      faq.ques.toLowerCase().includes(search) ||
      faq.ans.toLowerCase().includes(search) ||
      faq.category.toLowerCase().includes(search)
    );
  })
  .sort((a, b) => {
    const selectedCategoryIndex =
      FAQ_CATEGORIES.indexOf(sortBy);

    const categoryAIndex =
      FAQ_CATEGORIES.indexOf(a.category);

    const categoryBIndex =
      FAQ_CATEGORIES.indexOf(b.category);

    // Selected category always comes first
    if (a.category === sortBy && b.category !== sortBy) {
      return -1;
    }

    if (a.category !== sortBy && b.category === sortBy) {
      return 1;
    }

    // Remaining categories follow FAQ_CATEGORIES order
    return categoryAIndex - categoryBIndex;
  });

  /* ============================
     RENDER
  ============================ */

  if (loading || saving) {
    return (
      <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6 lg:px-8 py-6">

        {/* ============================
            HEADER
        ============================ */}

        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineQuestionMarkCircle className="text-indigo-600 w-8 h-8" />
              FAQ Management
            </h1>

            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Manage frequently asked questions (
              {faqData.length} FAQs)
            </p>
          </div>

          <button
            onClick={handleAddFAQ}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <HiOutlinePlus className="w-5 h-5" />
            Add New FAQ
          </button>

        </header>

        {/* ============================
            SEARCH + SORT
        ============================ */}

        <div className="mb-6 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">

          <div className="flex flex-col sm:flex-row gap-4">

            {/* SEARCH */}

            <div className="flex-1">
              <div className="relative">

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search FAQs by question, answer or category..."
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-600"
                />

                <HiOutlineQuestionMarkCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

              </div>
            </div>

          {/* SORT */}

          <div className="sm:w-56">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
            >
              {FAQ_CATEGORIES.map((faqCategory) => (
                <option
                  key={faqCategory}
                  value={faqCategory}
                >
                  Sort by: {faqCategory}
                </option>
              ))}
            </select>
          </div>



          </div>

        </div>

        {/* ============================
            FAQ LIST
        ============================ */}

        {filteredFAQs.length > 0 ? (

          <div className="space-y-4">

            {filteredFAQs.map((faq, index) => (

              <div
                key={faq.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
              >

                {/* FAQ HEADER */}

                <div
                  className="p-4 sm:p-5 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-colors"
                  onClick={() =>
                    toggleFAQ(faq.id)
                  }
                >

                  <div className="flex items-start gap-3 sm:gap-4">

                    {/* DISPLAY NUMBER ONLY */}

                    <div className="bg-indigo-50 text-indigo-600 rounded-lg p-2 sm:p-3 min-w-[42px] h-[42px] sm:h-[48px] flex items-center justify-center">
                      <span className="font-bold text-sm sm:text-base">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1">

                      <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
                        {faq.ques}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">

                        <span className="flex items-center gap-1">
                          <HiOutlineTag className="w-3 h-3 sm:w-4 sm:h-4" />
                          {faq.category}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    {/* ACTION BUTTONS */}

                    <div className="flex items-center gap-1 sm:gap-2">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(faq);
                        }}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:scale-110 transition-transform shadow-md"
                        title="Edit"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          setFaqToDelete(faq.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 bg-red-600 text-white rounded-lg hover:scale-110 transition-transform shadow-md"
                        title="Delete"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>

                    </div>

                    {/* EXPAND ICON */}

                    {expandedFAQ === faq.id ? (
                      <HiOutlineChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 ml-2" />
                    ) : (
                      <HiOutlineChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 ml-2" />
                    )}

                  </div>

                </div>

                {/* ============================
                    ANSWER
                ============================ */}

                {expandedFAQ === faq.id && (

                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">

                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">

                      <div className="pl-10 sm:pl-14 border-t border-slate-100 pt-4 sm:pt-5">

                        <div className="mb-3">

                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                            <HiOutlineTag className="w-3 h-3" />
                            {faq.category}
                          </span>

                        </div>

                        <p className="text-slate-600 whitespace-pre-wrap">
                          {faq.ans}
                        </p>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        ) : (

          /* ============================
             EMPTY STATE
          ============================ */

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 md:p-16 lg:p-20 text-center">

            <HiOutlineQuestionMarkCircle
              className="mx-auto text-slate-300 w-16 h-16 sm:w-20 sm:h-20 mb-4"
            />

            <h3 className="text-xl sm:text-2xl font-bold text-slate-600 mb-2">
              {searchQuery
                ? "No matching FAQs found"
                : "No FAQs Yet"}
            </h3>

            <p className="text-slate-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
              {searchQuery
                ? "Try a different search term or clear the search"
                : "Add your first frequently asked question"}
            </p>

            {!searchQuery && (
              <button
                onClick={handleAddFAQ}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <HiOutlinePlus className="w-5 h-5" />
                Add First FAQ
              </button>
            )}

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg inline-flex items-center gap-2 text-sm sm:text-base"
              >
                Clear Search
              </button>
            )}

          </div>

        )}

        {/* ============================
            DELETE MODAL
        ============================ */}

        <DestroyerPopup
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setFaqToDelete(null);
          }}
          title="Delete FAQ?"
          primaryAction={handleDelete}
          actionText="Yes, Delete"
          destructive={true}
        >
          <p className="text-slate-600">
            This action cannot be undone. The FAQ will
            be removed from this demo interface.
          </p>
        </DestroyerPopup>

        {/* ============================
            CREATE / EDIT MODAL
        ============================ */}

        <DestroyerPopup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={
            faqToEdit
              ? "Edit FAQ"
              : "Add New FAQ"
          }
          primaryAction={handleSubmit}
          actionText={
            faqToEdit
              ? "Update FAQ"
              : "Create FAQ"
          }
          actionColor={
            faqToEdit
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }
          size="lg"
        >

          <div className="space-y-4 sm:space-y-6">

            {/* QUESTION */}

            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <HiOutlineQuestionMarkCircle className="text-indigo-500 w-4 h-4 sm:w-5 sm:h-5" />
                Question
              </label>

              <input
                type="text"
                value={ques}
                onChange={(e) =>
                  setQues(e.target.value)
                }
                placeholder="Enter the frequently asked question"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
              />

            </div>

            {/* ANSWER */}

            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <HiOutlineQuestionMarkCircle className="text-indigo-500 w-4 h-4 sm:w-5 sm:h-5" />
                Answer
              </label>

              <textarea
                value={ans}
                onChange={(e) =>
                  setAns(e.target.value)
                }
                placeholder="Enter the detailed answer"
                rows={6}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base resize-none"
              />

              <p className="text-xs text-slate-400 mt-2">
                You can use multiple lines for better readability.
              </p>

            </div>

            {/* CATEGORY */}

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <HiOutlineTag className="text-indigo-500 w-4 h-4 sm:w-5 sm:h-5" />
                Category
                <span className="text-red-500">*</span>
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
              >
                <option value="">
                  Select a category
                </option>

                {FAQ_CATEGORIES.map((faqCategory) => (
                  <option
                    key={faqCategory}
                    value={faqCategory}
                  >
                    {faqCategory}
                  </option>
                ))}
              </select>

              <p className="text-xs text-slate-400 mt-2">
                Category is required.
              </p>
            </div>

          </div>

        </DestroyerPopup>

      </div>

      {/* ============================
          ANIMATION STYLES
      ============================ */}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
