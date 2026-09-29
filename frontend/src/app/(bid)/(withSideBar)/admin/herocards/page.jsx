"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineKey,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import DestroyerPopup from "../components/DestroyerPopup";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getHeroCards, updateHeroCard } from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import Loading from "../components/Loading";
import { hasPermission } from "@/helper/helper";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { useRouter } from "next/navigation";

// =====================================================
// FIXED HERO CARDS
// =====================================================

const cards = [
  {
    key: "1",
    value: "SOLUKHUMBU",
    title: "Dudhkhoshi-2",
    para: "hydropower project",
    image: "image",
  },
  {
    key: "2",
    value: "optimized project",
    title: "PRoR",
    para: "High-efficiency PRoR design ensuring 6 hours of peak power, even during dry seasons.",
    image: "", // no image
  },
  {
    key: "3",
    value: "95.7 MW",
    title: "Total Capacity",
    para: "",
    image: "image",
  },
];

export default function TeamPage() {

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
   dispatch(getHeroCards({}))
}, [permissionChecked, dispatch]);


  const [isEditing, setIsEditing] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
    const baseContentUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL; 

    const [currentCardId, setCurrentCardId] = useState(null)

  
  const herocardsdata = useSelector((state) => state?.landingPageAdmmin?.heroCards); 
  const loading = useSelector((state) => state?.landingPageAdmmin?.heroCardsLoading); 
  // console.log(herocardsdata, "herocardsdata")
  const [cardData, setCardData] = useState(null);




  const [editCard, setEditCard] = useState({
    keye: "",
    valuee: "",
    title: "",
    para: "",
    image: "",
  });

// set in states
  useEffect(() => {
if(herocardsdata?.length>0){
   setCardData(herocardsdata)
}
  }, [herocardsdata])



// console.log(cardData, "cardData")
  const fileInputRef = useRef(null);

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEdit = (index) => {
    const card = cardData[index];

    setSelectedCardIndex(index);

    setEditCard({
      keye: card.keye,
      valuee: card.valuee,
      title: card.title,
      para: card.para,
      image: card.image,
    });

    setSelectedFile(
      card.image ? { preview: baseContentUrl+"/"+card.image, isExisting: true, name: card.image } : null
    );

    setIsEditing(true);
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large! Please select an image under 5MB.");
      return;
    }

    setSelectedFile({
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      isExisting: false,
    });
  };

  // =====================================================
  // CLEAR IMAGE
  // =====================================================

  const clearSelection = (e) => {
    e.stopPropagation();

    setSelectedFile(null);

    setEditCard((prev) => ({
      ...prev,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // UPDATE CARD
  // =====================================================

  const handleUpdateCard = async() => {
  if (selectedCardIndex === null) {
    toast.error("No card selected");
    return;
  }



const formData = new FormData();

formData.append("keye", editCard.keye);
formData.append("valuee", editCard.valuee);
formData.append("title", editCard.title);
formData.append("para", editCard.para);

if (selectedFile?.file) {
  formData.append("image", selectedFile.file);
}

const result = await dispatch(updateHeroCard({formData, id:currentCardId}));
if(result.payload.statusCode === 200){
  toast.success(result.payload.message)
  dispatch(getHeroCards({}));
  closeEditModal();

}

};


  // =====================================================
  // CLOSE EDIT MODAL
  // =====================================================

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedCardIndex(null);
    setSelectedFile(null);

    setEditCard({
      key: "",
      value: "",
      title: "",
      para: "",
      image: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };



  if(loading){
  return <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
  <Loading />
</div>
}
  return (
    <>
      <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineKey className="text-indigo-600" />
              Hero Cards
            </h1>

            <p className="text-slate-500 mt-1">
              Edit your three fixed hero section cards.
            </p>
          </div>
        </header>

        {/* =====================================================
            CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {cardData?.length>1 && cardData?.map((card, index) => (
            <div
              key={`${card.key}-${index}`}
              className={`w-full min-w-0 bg-white rounded-3xl shadow-sm overflow-hidden ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* IMAGE */}
              {card?.image && (
                <div
                  className={`relative w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 ${
                    index === 0 ? "h-64 md:h-72" : "h-48"
                  }`}
                >
                  <Image
                    fill
                    unoptimized
                    src={baseContentUrl+"/"+card.image}
                    alt={card.title}
                    className="object-cover"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="w-full p-6">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
                    {card.keye}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {card.title}
                </h3>

                <p className="text-sm font-semibold text-indigo-600 mb-2">
                  {card.valuee}
                </p>

                <p className="text-sm text-slate-500 line-clamp-3">
                  {card.para}
                </p>

                <button
                  onClick={() => {
                    handleEdit(index)
                    setCurrentCardId(card?.id)
                  }}
                  className="mt-5 w-full flex items-center justify-center gap-2
                            px-4 py-3
                            bg-indigo-50 text-indigo-600
                            border border-indigo-100
                            rounded-xl
                            font-semibold text-sm
                            hover:bg-indigo-100
                            transition-colors"
                >
                  <CiEdit size={20} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>






        {/* =====================================================
            EDIT POPUP
        ===================================================== */}

        <DestroyerPopup
          isOpen={isEditing}
          onClose={closeEditModal}
          title="Update Hero Card"
          primaryAction={handleUpdateCard}
          actionText="Update"
        >
          <div className="space-y-5">
            {/* IMAGE */}
       {
        // if no image for any card then dont show 
        editCard?.image &&(
               <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-all cursor-pointer min-h-[200px] relative overflow-hidden group"
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
                    size={48}
                    className="text-slate-300 mb-3 mx-auto group-hover:text-indigo-400 transition-colors"
                  />

                  <p className="font-semibold text-sm text-slate-600 mb-1">
                    Click to select image
                  </p>

                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    PNG, JPG (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="w-full text-center">
                  <div className="relative mx-auto w-32 h-32 mb-3">
                    <img
                      src={selectedFile ? selectedFile.preview : "baseContentUrl"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white"
                    />

                    <button
                      type="button"
                      onClick={clearSelection}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-all"
                    >
                      <HiOutlineX size={16} />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-indigo-500 truncate max-w-[200px] mx-auto bg-indigo-50 px-3 py-1 rounded-lg">
                    {selectedFile.isExisting
                      ? "Current image"
                      : selectedFile.name}
                  </p>
                </div>
              )}
            </div>

        )
       }
            {/* KEY */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <HiOutlineKey className="text-indigo-500" />
                Key
              </label>

              <input
                type="text"
                value={editCard.keye}
                onChange={(e) =>{
                  if (e.target.value.length>30) return toast.error("Less than 30 characters")
                  setEditCard({
                    ...editCard,
                    keye: e.target.value,
                  })
                }
              }
                placeholder="Enter card key"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

{/* valeu  */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <HiOutlineKey className="text-indigo-500" />
                Value
              </label>

              <input
                type="text"
                value={editCard.valuee}
                onChange={(e) =>{
                  if (e.target.value.length>30) return toast.error("Less than 30 characters")

                  setEditCard({
                    ...editCard,
                    valuee: e.target.value,
                  })
                }
              }
                placeholder="Enter card value"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* TITLE */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <HiOutlineDocumentText className="text-indigo-500" />
                Title
              </label>

              <input
                type="text"
                value={editCard.title}
                onChange={(e) =>{
                  if (e.target.value.length>30) return toast.error("Less than 30 characters")

                  setEditCard({
                    ...editCard,
                    title: e.target.value,
                  })
                }
                }
                placeholder="Enter card title"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* PARAGRAPH */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <HiOutlineDocumentText className="text-indigo-500" />
                Paragraph
              </label>

              <textarea
                value={editCard.para}
                onChange={(e) =>{
if(e.target.value.length>120) return toast.error("Less than 120 characters")
                  setEditCard({
                    ...editCard,
                    para: e.target.value,
                  })
                }
              }
                placeholder="Enter card paragraph"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </DestroyerPopup>
      </div>
    </>
  );
}
