"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineUserGroup,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineUser,
  HiOutlineDocumentText,
} from "react-icons/hi";

import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

import DestroyerPopup from "../components/DestroyerPopup";
import { addTeam, deleteTeam, getTeam, updateTeam } from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";



const emptyMember = {
  name: "",
  designation: "",
  background: "",
  focus: "",
  experience: "",
  description: "",
  image: "",
};


  //  HELPERS


  //  COMPONENT
export default function TeamPage() {
  const [teamData, setTeamData] = useState();
const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [loadingState, setloadingState] = useState(false)

  const [editingMemberId, setEditingMemberId] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [newMember, setNewMember] = useState(emptyMember);

  const fileInputRef = useRef(null);

    const team = useSelector((state) => state?.landingPageAdmmin?.team); 
    const loading = useSelector((state) => state?.landingPageAdmmin?.teamLoading); 

useEffect(() => {
  dispatch(getTeam({}))
}, [])
useEffect(() => {
setTeamData(team)
}, [team])



      //  IMAGE HANDLER
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
console.log(file)
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large! Please select an image under 5MB.");
      e.target.value = "";
      return;
    }

    try {

      setSelectedFile({
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
        isExisting: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("Unable to load the selected image.");
    }
  };


    //  CLEAR IMAGE
  const clearSelection = (e) => {
    e?.stopPropagation();

    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


    //  RESET FORM
  const resetForm = () => {
    setSelectedFile(null);

    setNewMember({
      ...emptyMember,
    });

    setEditingMemberId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

    //  OPEN ADD MODAL
  const openAddModal = () => {
    resetForm();

    setIsEditing(false);
    setIsAddModalOpen(true);
  };


  //  CREATE MEMBER
const handleCreateTeamMember = async () => {
  if (
    !newMember.name.trim() ||
    !newMember.designation.trim() ||
    !newMember.background.trim() ||
    !newMember.focus.trim() ||
    !newMember.experience.trim() ||
    !newMember.description.trim()
  ) {
    toast.error("Please fill all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("name", newMember.name);
  formData.append("designation", newMember.designation);
  formData.append("background", newMember.background);
  formData.append("focus", newMember.focus);
  formData.append("experience", newMember.experience);
  formData.append("description", newMember.description);

  if (selectedFile?.file) {
    formData.append("image", selectedFile.file);
  }
setloadingState(true)
  const result = await dispatch(addTeam({formData}));
  if(result.payload.statusCode === 200 || result.payload.statusCode === 201){
    setloadingState(false)
    toast.success(result.payload.message)
    closeAddModal();
    setIsAddModalOpen(false);
    setSelectedFile(null);
    dispatch(getTeam({}))
    setNewMember({
      name: "",
      designation: "",
      background: "",
      focus: "",
      experience: "",
      description: "",
      image: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

};



    //  OPEN EDIT MODAL
  const openEditModal = (member) => {
    setIsEditing(true);
    setEditingMemberId(member.id);

    setNewMember({
      name: member.name || "",
      designation: member.designation || "",
      background: member.background || "",
      focus: member.focus || "",
      experience: member.experience || "",
      description: member.description || "",
      image: member.image || "",
    });

    if (member.image) {
      setSelectedFile({
        preview:process.env.NEXT_PUBLIC_BASE_CONTENT_URL+"/"+member.image,
        name: "",
        isExisting: true,
      });
    } else {
      setSelectedFile(null);
    }


    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  //  UPDATE MEMBER
const handleUpdateTeamMember = async() => {
  if (
    !newMember.name.trim() ||
    !newMember.designation.trim() ||
    !newMember.background.trim() ||
    !newMember.focus.trim() ||
    !newMember.experience.trim() ||
    !newMember.description.trim()
  ) {
    toast.error("Please fill all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("name", newMember.name);
  formData.append("designation", newMember.designation);
  formData.append("background", newMember.background);
  formData.append("focus", newMember.focus);
  formData.append("experience", newMember.experience);
  formData.append("description", newMember.description);

  if (selectedFile?.file) {
    formData.append("image", selectedFile.file);
  }
setloadingState(true)
  const result = await dispatch(updateTeam({formData, id:editingMemberId}));
  if(result.payload.statusCode === 200 || result.payload.statusCode === 201){
    setloadingState(false)
    toast.success(result.payload.message)
    closeEditModal();
    setIsEditing(false);
    setSelectedFile(null);
    dispatch(getTeam({}))
    setNewMember({
      name: "",
      designation: "",
      background: "",
      focus: "",
      experience: "",
      description: "",
      image: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }



  setIsEditing(false);
  resetForm();
};


    //  DELETE
  const openDeleteModal = (id) => {
    setMemberToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async() => {
    if (memberToDelete === null) return;


    setloadingState(true)
    const result = await dispatch(deleteTeam({id:memberToDelete}));
    if(result.payload.statusCode === 200 || result.payload.statusCode === 201){
      setloadingState(false)
      toast.success(result.payload.message)
      dispatch(getTeam({}))
      setTeamData(teamData.filter((member) => member.id !== memberToDelete))
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
    }


    setIsDeleteModalOpen(false);
    setMemberToDelete(null);
  };


    //  CLOSE MODALS
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const closeEditModal = () => {
    setIsEditing(false);
    resetForm();
  };


    //  SHARED MEMBER FORM
  const renderMemberForm = () => (
    <div className="space-y-5">

          {/* IMAGE UPLOAD */}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-all cursor-pointer min-h-[200px] relative overflow-hidden group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png,image/jpeg,image/jpg,image/webp"
        />

        {!selectedFile?.preview ? (
          <div className="text-center">
            <HiOutlinePhotograph
              size={48}
              className="text-slate-300 mb-3 mx-auto group-hover:text-indigo-400 transition-colors"
            />

            <p className="font-semibold text-sm text-slate-600 mb-1">
              Click to select profile picture
            </p>

            <p className="text-xs text-slate-400 uppercase tracking-wider">
              PNG, JPG, WEBP — Max 5MB
            </p>
          </div>
        ) : (
          <div
            className="w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto w-32 h-32 mb-3">
              <img
                src={selectedFile.preview}
                alt="Profile preview"
                className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white"
              />

              <button
                type="button"
                onClick={clearSelection}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-all"
                aria-label="Remove image"
              >
                <HiOutlineX size={16} />
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Change image
            </button>
          </div>
        )}
      </div>

      {/* =====================================================
          MEMBER DETAILS - 2 COLUMN LAYOUT
          
          LEFT:
          Name
          Designation
          Background

          RIGHT:
          Focus
          Experience
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <div className="space-y-5">

          {/* NAME */}

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <HiOutlineUser className="text-indigo-500" />
              Name
            </label>

            <input
              type="text"
              value={newMember.name}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Enter member name"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* DESIGNATION */}

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <HiOutlineUser className="text-indigo-500" />
              Designation
            </label>

            <input
              type="text"
              value={newMember.designation}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  designation: e.target.value,
                }))
              }
              placeholder="e.g. Chairman, Director"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* BACKGROUND */}

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <HiOutlineUser className="text-indigo-500" />
              Background
            </label>

            <input
              type="text"
              value={newMember.background}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  background: e.target.value,
                }))
              }
              placeholder="e.g. UK Master's Alumnus"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <div className="space-y-5">

          {/* FOCUS */}

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <HiOutlineUser className="text-indigo-500" />
              Focus
            </label>

            <input
              type="text"
              value={newMember.focus}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  focus: e.target.value,
                }))
              }
              placeholder="e.g. Finance & Contractor"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* EXPERIENCE */}

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <HiOutlineUser className="text-indigo-500" />
              Experience
            </label>

            <input
              type="text"
              value={newMember.experience}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }))
              }
              placeholder="e.g. 15+ Years"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          DESCRIPTION
          
          KEPT AS IT WAS
      ===================================================== */}

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <HiOutlineDocumentText className="text-indigo-500" />
          Description
        </label>

        <textarea
          value={newMember.description}
          onChange={(e) =>
            setNewMember((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Enter member description"
          rows={3}
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
        />
      </div>
    </div>
  );

if(loading || loadingState){
  return <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
  <Loading />
</div>
}
if(!teamData || teamData?.length===0){
  return <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
  <h1>Team Member not found!</h1>
</div>
}

  return (
    <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="flex justify-between items-center mb-10 lg:flex-row flex-col gap-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <HiOutlineUserGroup className="text-indigo-600" />
            Team Members
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your team members
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
        >
          <HiOutlinePlus size={20} />
          Add Member
        </button>
      </header>

      {/* =====================================================
          TEAM GRID
      ===================================================== */}

      {teamData && teamData?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {teamData?.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">

                {member?.image ? (
                  <img
                    src={process.env.NEXT_PUBLIC_BASE_CONTENT_URL+"/"+member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";

                      const fallback =
                        e.currentTarget.parentElement?.querySelector(
                          ".image-fallback"
                        );

                      fallback?.classList.remove("hidden");
                    }}
                  />
                ) : null}

                <div
                  className={`image-fallback w-full h-full flex items-center justify-center ${member.image ? "hidden" : ""
                    }`}
                >
                  <HiOutlineUser
                    size={100}
                    className="text-indigo-200"
                  />
                </div>
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="p-6 flex-1">

                <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">
                  {member.name}
                </h3>

                <p className="text-sm font-semibold text-indigo-600 mb-3">
                  {member.designation}
                </p>

                <div className="space-y-1 mb-4">

                  {member.background && (
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold">
                        Background:
                      </span>{" "}
                      {member.background}
                    </p>
                  )}

                  {member.focus && (
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold">
                        Focus:
                      </span>{" "}
                      {member.focus}
                    </p>
                  )}

                  {member.experience && (
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold">
                        Experience:
                      </span>{" "}
                      {member.experience}
                    </p>
                  )}
                </div>

                <p className="text-sm text-slate-500 line-clamp-4">
                  {member.description}
                </p>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="px-6 pb-6 pt-0 flex gap-3">

                <button
                  onClick={() => openEditModal(member)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl font-semibold text-sm hover:bg-indigo-600 hover:text-white transition-all duration-200"
                >
                  <CiEdit size={20} />
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(member.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-semibold text-sm hover:bg-red-600 hover:text-white transition-all duration-200"
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
           EMPTY STATE
        ===================================================== */

        <div className="bg-white rounded-3xl border shadow-sm p-20 text-center">

          <HiOutlineUserGroup
            className="mx-auto text-slate-300 mb-4"
            size={64}
          />

          <h3 className="text-xl font-bold text-slate-600 mb-2">
            No Team Members Yet
          </h3>

          <p className="text-slate-400 mb-6">
            Add your first team member to get started
          </p>

          <button
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg inline-flex items-center gap-2"
          >
            <HiOutlinePlus size={20} />
            Add Member
          </button>

        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <DestroyerPopup
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMemberToDelete(null);
        }}
        title="Remove Team Member?"
        primaryAction={confirmDelete}
        actionText="Yes, Delete"
      >
        <p>
          This action cannot be undone. This team member will be
          permanently removed.
        </p>
      </DestroyerPopup>

      {/* =====================================================
          ADD MODAL
      ===================================================== */}

      <DestroyerPopup
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add New Team Member"
        primaryAction={handleCreateTeamMember}
        actionText="Add Member"
      >
        {renderMemberForm()}
      </DestroyerPopup>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      <DestroyerPopup
        isOpen={isEditing}
        onClose={closeEditModal}
        title="Update Team Member"
        primaryAction={handleUpdateTeamMember}
        actionText="Update"
      >
        {renderMemberForm()}
      </DestroyerPopup>
    </div>
  );
}
