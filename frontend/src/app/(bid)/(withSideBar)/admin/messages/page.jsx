"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineDocumentText,
  HiOutlineClock,
} from "react-icons/hi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DestroyerPopup from "../components/DestroyerPopup";
import Loading from "../components/Loading";
import {
  deleteMessage,
  getMessages,
} from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import { hasPermission } from "@/helper/helper";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { useRouter } from "next/navigation";

export default function MessagesPage() {
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
    dispatch(getMessages());

  }, [permissionChecked, dispatch]);
  

  /* ============================
     MESSAGE DATA
  ============================ */

  const messages = useSelector(
    (state) => state?.landingPageAdmmin?.messages
  );
  const loading = useSelector(
    (state) => state?.landingPageAdmmin?.messagesLoading
  );

  const [clientMessages, setClientMessages] = useState([]);

  /*
   * Keep the local list in sync with the store. The contacts table has no
   * "read" column, so messages default to read to avoid a false unread count.
   */
  useEffect(() => {
    if (!Array.isArray(messages)) return;

    setClientMessages(
      messages.map((message) => ({
        ...message,
        read: message.read ?? true,
      }))
    );
  }, [messages]);

  /* ============================
     LOCAL STATE
  ============================ */

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [saving, setSaving] = useState(false);

  /* ============================
     DELETE MESSAGE
  ============================ */

  const handleDelete = async () => {
    if (!messageToDelete) return;

    setSaving(true);

    try {
      const result = await dispatch(
        deleteMessage({ id: messageToDelete })
      );

      if (result.payload?.statusCode === 200) {
        toast.success(
          result.payload.message || "Message deleted successfully"
        );

        dispatch(getMessages());
      }
    } finally {
      setSaving(false);
      setIsDeleteModalOpen(false);
      setMessageToDelete(null);
      setSelectedMessage(null);
      setShowMessageDetail(false);
    }
  };

  const openDeleteModal = (messageId, e) => {
    e?.stopPropagation();

    setMessageToDelete(messageId);
    setIsDeleteModalOpen(true);
  };

  /* ============================
     VIEW MESSAGE
  ============================ */

  const viewMessageDetails = (message) => {
    setSelectedMessage(message);
    setShowMessageDetail(true);
  };

  const closeMessageDetail = () => {
    setSelectedMessage(null);
    setShowMessageDetail(false);
  };

  /* ============================
     DATE FORMATTING
  ============================ */

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      const now = new Date();

      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) {
        return (
          "Today, " +
          date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }

      if (diffDays === 1) {
        return (
          "Yesterday, " +
          date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }

      if (diffDays < 7) {
        return date.toLocaleDateString("en-US", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatLongDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  /* ============================
     FILTER / SEARCH / SORT
  ============================ */

  const filteredMessages = useMemo(() => {
    let result = [...clientMessages];

    /* Search */

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((message) => {
        const fullname = String(message.fullname || "").toLowerCase();
        const email = String(message.email || "").toLowerCase();
        const subject = String(message.subject || "").toLowerCase();
        const messageText = String(message.message || "").toLowerCase();

        return (
          fullname.includes(query) ||
          email.includes(query) ||
          subject.includes(query) ||
          messageText.includes(query)
        );
      });
    }

    /* Date Filter */

    if (filterBy !== "all") {
      const now = new Date();

      const sevenDaysAgo = new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      );

      const thirtyDaysAgo = new Date(
        now.getTime() - 30 * 24 * 60 * 60 * 1000
      );

      result = result.filter((message) => {
        if (!message.created_at) return false;

        const messageDate = new Date(message.created_at);

        switch (filterBy) {
          case "today":
            return (
              messageDate.toDateString() === now.toDateString()
            );

          case "week":
            return messageDate >= sevenDaysAgo;

          case "month":
            return messageDate >= thirtyDaysAgo;

          default:
            return true;
        }
      });
    }

    /* Sort */

    result.sort((a, b) => {
      const dateA = a.created_at
        ? new Date(a.created_at)
        : new Date(0);

      const dateB = b.created_at
        ? new Date(b.created_at)
        : new Date(0);

      return sortBy === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [clientMessages, searchQuery, filterBy, sortBy]);

  /* ============================
     STATS
  ============================ */

  const stats = useMemo(() => {
    const total = clientMessages.length;

    const today = clientMessages.filter((message) => {
      if (!message.created_at) return false;

      const messageDate = new Date(message.created_at);
      const todayDate = new Date();

      return (
        messageDate.toDateString() === todayDate.toDateString()
      );
    }).length;

    const unread = clientMessages.filter(
      (message) => !message.read
    ).length;

    return {
      total,
      today,
      unread,
    };
  }, [clientMessages]);

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

        {/* HEADER */}

        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineMail className="text-indigo-600 w-8 h-8" />
              Client Messages
            </h1>

            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Manage client inquiries and feedback ({clientMessages.length} messages)
            </p>
          </div>
        </header>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {/* Total */}

          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Messages
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
                  {stats.total}
                </p>
              </div>

              <div className="bg-indigo-50 text-indigo-600 rounded-lg p-3">
                <HiOutlineMail className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
          </div>

          {/* Today */}

          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Today
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
                  {stats.today}
                </p>
              </div>

              <div className="bg-green-50 text-green-600 rounded-lg p-3">
                <HiOutlineCalendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
          </div>

          {/* Unread */}

          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Unread
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
                  {stats.unread}
                </p>
              </div>

              <div className="bg-red-50 text-red-600 rounded-lg p-3">
                <HiOutlineMail className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
          </div>

        </div>

        {/* FILTER / SEARCH */}

        <div className="mb-6 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}

            <div className="flex-1">
              <div className="relative">

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, subject, or message..."
                  className="w-full px-4 py-3 text-black pl-10 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
                />

                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />

              </div>
            </div>

            {/* Filter / Sort */}

            <div className="flex flex-col sm:flex-row gap-3">

              <div className="sm:w-40">
                <div className="relative">

                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="w-full text-black px-4 py-3 pl-10 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base appearance-none"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                  </select>

                  <HiOutlineFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />

                </div>
              </div>

              <div className="sm:w-40">

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full text-black px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>

              </div>

            </div>

          </div>

          {/* Results Count */}

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-600">

            <div>
              Found {filteredMessages.length} message
              {filteredMessages.length !== 1 ? "s" : ""}

              {searchQuery && ` for "${searchQuery}"`}
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                Clear Search
              </button>
            )}

          </div>

        </div>

        {/* MESSAGE LIST */}

        {filteredMessages.length > 0 ? (

          <div className="space-y-4">

            {filteredMessages.map((message) => {

              const messageId = message.id;

              const isSelected =
                selectedMessage?.id === messageId;

              return (
                <div
                  key={messageId}
                  onClick={() => viewMessageDetails(message)}
                  className={`bg-white rounded-xl sm:rounded-2xl border shadow-sm overflow-hidden group transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    isSelected
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-slate-200 hover:border-indigo-200"
                  }`}
                >

                  <div className="p-4 sm:p-5">

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">

                      {/* Message Info */}

                      <div className="flex-1">

                        <div className="flex items-start gap-3">

                          <div
                            className={`rounded-lg p-2 sm:p-3 ${
                              isSelected
                                ? "bg-indigo-100 text-indigo-600"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <HiOutlineUser className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>

                          <div className="flex-1">

                            {/* Name / Date */}

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">

                              <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                                {message.fullname || "Anonymous"}
                              </h3>

                              <div className="flex items-center gap-2">

                                <span className="text-xs sm:text-sm text-slate-500">
                                  {formatDate(message.created_at)}
                                </span>

                                {!message.read && (
                                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                                )}

                              </div>

                            </div>

                            {/* Email */}

                            <div className="mb-1">

                              <a
                                href={`mailto:${message.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                              >
                                {message.email || "No email"}
                              </a>

                            </div>

                            {/* Subject */}

                            <p className="text-sm font-semibold text-slate-700 mb-1">
                              {message.subject || "No subject"}
                            </p>

                            {/* Message */}

                            <p className="text-sm text-slate-600 line-clamp-2">
                              {message.message || "No message content"}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* Actions */}

                      <div className="flex items-center gap-2 sm:gap-3">

                        <button
                          onClick={(e) =>
                            openDeleteModal(messageId, e)
                          }
                          className={`p-2 rounded-lg transition-transform hover:scale-110 shadow-md ${
                            isSelected
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-red-100 hover:bg-red-200 text-red-600"
                          }`}
                          title="Delete Message"
                        >
                          <HiOutlineTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        <button
                          onClick={() =>
                            viewMessageDetails(message)
                          }
                          className={`p-2 rounded-lg transition-transform hover:scale-110 shadow-md ${
                            isSelected
                              ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                          title="View Details"
                        >
                          <HiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* EMPTY STATE */

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 md:p-16 lg:p-20 text-center">

            <HiOutlineMail
              className="mx-auto text-slate-300 w-16 h-16 sm:w-20 sm:h-20 mb-4"
            />

            <h3 className="text-xl sm:text-2xl font-bold text-slate-600 mb-2">
              {searchQuery
                ? "No matching messages found"
                : "No Messages Yet"}
            </h3>

            <p className="text-slate-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
              {searchQuery
                ? "Try a different search term or clear the filters"
                : "Client messages will appear here when they contact you through the contact form"}
            </p>

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterBy("all");
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg inline-flex items-center gap-2 text-sm sm:text-base"
              >
                Clear All Filters
              </button>
            )}

          </div>

        )}


      </div>

              {/* MESSAGE DETAIL MODAL */}

        {showMessageDetail && selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 transition-opacity"
              onClick={closeMessageDetail}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl text-left shadow-xl">

              <div className="bg-white px-4 py-5 sm:p-6">

                <div className="w-full">

                  {/* Header */}

                  <div className="flex items-center justify-between mb-6">

                    <div className="flex items-center gap-3">

                      <div className="bg-indigo-100 text-indigo-600 rounded-lg p-2">
                        <HiOutlineMail className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        Message Details
                      </h3>

                    </div>

                    <button
                      onClick={closeMessageDetail}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <span className="sr-only">
                        Close
                      </span>

                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                  </div>

                  {/* Message Content */}

                  <div className="space-y-6">

                    {/* Sender Info */}

                    <div className="bg-slate-50 rounded-xl p-4">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Full Name */}

                        <div>
                          <p className="text-sm font-medium text-slate-500 mb-1">
                            From
                          </p>

                          <p className="font-semibold text-slate-800">
                            {selectedMessage.fullname || "Anonymous"}
                          </p>
                        </div>

                        {/* Email */}

                        <div>
                          <p className="text-sm font-medium text-slate-500 mb-1">
                            Email
                          </p>

                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="text-indigo-600 hover:text-indigo-700 font-medium break-all"
                          >
                            {selectedMessage.email || "No email"}
                          </a>
                        </div>

                        {/* Subject */}

                        <div className="md:col-span-2">

                          <p className="text-sm font-medium text-slate-500 mb-1">
                            Subject
                          </p>

                          <p className="font-semibold text-slate-800">
                            {selectedMessage.subject || "No subject"}
                          </p>

                        </div>

                        {/* Date */}

                        <div className="md:col-span-2">

                          <p className="text-sm font-medium text-slate-500 mb-1">
                            Date & Time
                          </p>

                          <div className="flex items-center gap-2 text-slate-600">

                            <HiOutlineClock className="w-4 h-4 flex-shrink-0" />

                            <span>
                              {formatLongDate(selectedMessage.created_at)}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* Message Body */}

                    <div>

                      <div className="flex items-center gap-2 mb-3">

                        <HiOutlineDocumentText className="text-indigo-500 w-5 h-5" />

                        <h4 className="text-lg font-semibold text-slate-800">
                          Message
                        </h4>

                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 max-h-64 overflow-y-auto">

                        <p className="text-slate-700 whitespace-pre-wrap break-words">
                          {selectedMessage.message || "No message content"}
                        </p>

                      </div>

                    </div>

                    {/* Actions */}

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">

                      {/* Reply */}

                      <button
                        onClick={() => {
                          if (selectedMessage.email) {
                            window.location.href = `mailto:${selectedMessage.email}`;
                          }
                        }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                        disabled={!selectedMessage.email}
                      >
                        <HiOutlineMail className="w-5 h-5" />
                        Reply via Email
                      </button>

                      {/* Delete */}

                      <button
                        onClick={(e) => {
                          openDeleteModal(selectedMessage.id, e);
                          closeMessageDetail();
                        }}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                        Delete Message
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}
        
        {/* DELETE CONFIRMATION */}

        <DestroyerPopup
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setMessageToDelete(null);
          }}
          title="Delete Message?"
          primaryAction={handleDelete}
          actionText="Yes, Delete"
          loading={saving}
          destructive={true}
        >
          <p className="text-slate-600">
            This action cannot be undone. The message will be
            permanently removed from your local list.
          </p>
        </DestroyerPopup>

      {/* Custom Styles */}

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

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

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-enter {
          animation: modalEnter 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
