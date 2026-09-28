"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineKey,
  HiOutlineDocumentText,
  HiOutlineClock,
} from "react-icons/hi";
import { ImPower } from "react-icons/im";
import { MdOutlineWater } from "react-icons/md";
import {
  IoWaterOutline,
  IoCarOutline
} from "react-icons/io5";
import { LiaMountainSolid } from "react-icons/lia";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { BsHouseGearFill } from "react-icons/bs";

import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import DestroyerPopup from "../components/DestroyerPopup";
import { getAboutSpatialConstrants, getAboutTechnicalSpecs, updateAboutSpatialConstrants, updateAboutTechnicalSpecs } from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";



const TITLE_MAX_LENGTH = 20;





// ICON HELPER
const cardIcons = {
  ImPower: <ImPower />,
  MdOutlineWater: <MdOutlineWater />,
  IoWaterOutline: <IoWaterOutline />,
  HiOutlineClock: <HiOutlineClock />,
  LiaMountainSolid: <LiaMountainSolid />,
  IoCarOutline: <IoCarOutline />,
  RiLightbulbFlashLine: <RiLightbulbFlashLine />,
  BsHouseGearFill: <BsHouseGearFill />
};

const getCardIcon = (icon) => cardIcons[icon] ?? "?";

// PAGE
export default function AboutPage() {
  const [isEditing, setIsEditing] = useState(false);
const dispatch = useDispatch();
  // "technical" | "spatial"
  const [selectedSection, setSelectedSection] = useState(null);

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedCardDbId, setselectedCardDbId] = useState(null)

  // CARD DATA
  const [technicalCards, setTechnicalCards] =useState(null);
  const [spatialCards, setSpatialCards] =useState(null);

  // technicalSpecificaition data api caall
    const technicalSpecificaition = useSelector((state) => state?.landingPageAdmmin?.aboutTechnicalSpecs); 
    const aboutSpatialConstrants = useSelector((state) => state?.landingPageAdmmin?.aboutSpatialConstrants); 

    const loading = useSelector((state) => state?.landingPageAdmmin?.aboutTechnicalSpecsLoading || state?.landingPageAdmmin?.aboutSpatialConstrantsLoading); 

    const [updateLoading, setupdateLoading] = useState(false);
  useEffect(() => {
    dispatch(getAboutTechnicalSpecs())
    dispatch(getAboutSpatialConstrants())
  }, [])

  useEffect(() => {
    if(technicalSpecificaition?.length>0){
      setTechnicalCards(technicalSpecificaition)
    }
  }, [technicalSpecificaition])
  useEffect(() => {
    if(technicalSpecificaition?.length>0){
     setSpatialCards(aboutSpatialConstrants)
    }
  }, [aboutSpatialConstrants])
  
  // console.log(technicalSpecificaition, "technicalSpecificaition")
  // console.log(selectedCardDbId, "selectedCardDbId")
  // console.log(aboutSpatialConstrants, "aboutSpatialConstrants")
  
  // technicalSpecificaition data api caall ENd

  // EDIT CARD
  const [editCard, setEditCard] = useState({
    title: "",
    title2: "",
    title3: "",
    icon: "",
    image: "",
  });


  const fileInputRef = useRef(null);

  // HELPER
  const isTechnicalShortCard =
    selectedSection === "technical" &&
    selectedCardIndex !== null &&
    selectedCardIndex >= 0 &&
    selectedCardIndex <= 2;


  // OPEN EDIT MODAL
  const handleEdit = (section, index) => {
    const cards =section === "technical" ? technicalCards : spatialCards;
// console.log(cards, "cards")

// select card on the basis of id 

 if (section === "technical"){
const card = cards?.find(card => card.id == index);

    if (!card) {toast.error("Card not found");return;}

    setSelectedSection(section);
    setSelectedCardIndex(index);

    setEditCard({
      title: card.title || "",
      title2: card.title2 || "",
      title3: card.title3 || "",
      icon: card.icon || "",
      image: card.image || "",
    });


    if (section === "technical" && index == 1 && card?.image) {
      setSelectedFile({ preview: process.env.NEXT_PUBLIC_BASE_CONTENT_URL+"/"+card?.image, isExisting: true, name: card?.image,});
    } else {
      setSelectedFile(null);
    }
     }

     if (section === "spatial"){
const card = cards?.find(card => card.id == index);

    if (!card) {toast.error("Card not found");return;}

    setEditCard({
      title: card.title || "",
      title2: card.title2 || "",
      title3: card.title3 || "",
      icon: card.icon || "",
    })
    setSelectedSection(section);
    setSelectedCardIndex(index);
     }

    setIsEditing(true);
  };

  // IMAGE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Images are only supported on technical card 4
    if (
      selectedSection !== "technical" ||
      selectedCardIndex !== 1
    ) {
      toast.error(
        "Only the fourth technical card supports an image."
      );

      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "File is too large! Please select an image under 5MB."
      );

      return;
    }

    setSelectedFile({
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      isExisting: false,
    });
  };


  // CLEAR IMAGE
  const clearSelection = (e) => {
    e.stopPropagation();

    if (
      selectedSection !== "technical" ||
      selectedCardIndex !== 1
    ) {
      return;
    }

    setSelectedFile(null);

    setEditCard((prev) => ({
      ...prev,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // UPDATE CARD
  const handleUpdateCard = async () => {
  if ( selectedCardDbId == null ||selectedCardIndex === null) {
    toast.error("No card selected");
    return;
  }

  // UPDATE TECHNICAL CARD
  if (selectedSection === "technical") {
    setupdateLoading(true)
const formData = new FormData();
    formData.append("title", editCard.title);
    formData.append("title2", editCard.title2);
    formData.append("title3", editCard.title3);
    formData.append("icon", editCard.icon);

    if (selectedFile?.file) {
      formData.append("image", selectedFile.file);
    }
    const result = await dispatch(updateAboutTechnicalSpecs({formData, id:selectedCardDbId}));
    if(result.payload.statusCode === 200){
      toast.success(result.payload.message)
      closeEditModal();
      setselectedCardDbId(null)
      dispatch(getAboutTechnicalSpecs())
      setupdateLoading(false)
      
    }

  }


  // UPDATE SPATIAL CARD
  if (selectedSection === "spatial") {
    if(editCard.title3.length>160){
      toast.error("This paragraph must be 160 characters or less");
      return ;
    }
const result = await dispatch(updateAboutSpatialConstrants({formData:editCard, id:selectedCardDbId}));
if(result.payload.statusCode === 200){
  toast.success(result.payload.message)
  closeEditModal();
  setselectedCardDbId(null)
  dispatch(getAboutSpatialConstrants())
  setupdateLoading(false)
  
}



  }

  closeEditModal();
};


  // CLOSE EDIT MODAL
  const closeEditModal = () => {
    setselectedCardDbId(null)
    setIsEditing(false);

    setSelectedSection(null);

    setSelectedCardIndex(null);

    setSelectedFile(null);

    setEditCard({
      title: "",
      title2: "",
      title3: "",
      icon: "",
      image: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // RENDER
  const isFeatureCard = selectedSection === "technical" && selectedCardIndex === 1;

  if(loading || technicalCards?.length===0 || technicalCards == null || updateLoading){
    return <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
    <Loading />
  </div>
  }

  return (
    <>
      <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineKey className="text-indigo-600" />

              <span>About us</span>
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your project information, technical
              specifications and spatial constraints.
            </p>
          </div>
        </header>

        {/* =================================================
            TECHNICAL SPECIFICATION
        ================================================= */}

        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-sm font-medium tracking-[0.12em] text-[#005596] uppercase">
              Technical Specification
            </h2>

            <p className="text-slate-500 mt-2">
              Technical information about the hydropower
              project.
            </p>
          </div>

          {/* FIRST THREE TECHNICAL CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
{technicalCards  && technicalCards?.slice().slice(1, 4).map((card, index) => (
                <div
                  key={`${card.key}-${index}`}
                  className="
                    relative
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                    p-6
                    min-h-[245px]
                  "
                >
                  {/* EDIT BUTTON - ALWAYS VISIBLE */}
                  <button
                    type="button"
                    onClick={() =>{
                  setselectedCardDbId(card?.id)
                      handleEdit("technical", card?.id)
                    }
                    }
                    className="
                      absolute
                      top-5
                      right-5
                      z-10
                      p-2
                      rounded-lg
                      bg-slate-100
                      text-slate-500
                      opacity-100
                      hover:bg-indigo-50
                      hover:text-indigo-600
                      transition-all
                      duration-200
                    "
                    title="Edit card"
                    aria-label="Edit card"
                  >
                    <CiEdit size={18} />
                  </button>

                  {/* ICON */}

                  <div
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-blue-50
                      flex
                      items-center
                      justify-center
                      text-blue-600
                      text-xl
                      mb-6
                    "
                  >
                    {getCardIcon(card.icon)}
                    
                  </div>

                  {/* TITLE 1 */}

                  <p className="text-sm font-medium text-slate-800 mb-3">
                    {card.title}
                  </p>

                  {/* TITLE 2 */}

                  <h3
                    className="
                      text-3xl
                      font-light
                      text-blue-700
                      tracking-tight
                      whitespace-nowrap
                    "
                  >
                    {card.title2}
                  </h3>

                  <div className="border-t border-blue-100 my-5" />

                  {/* TITLE 3 */}

                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {card.title3}
                  </p>
                </div>
              ))}
          </div>

          {/* =================================================
              TECHNICAL SPECIFICATION CARD 4
          ================================================= */}

          {technicalCards?.[0] && (
            <div
              className="
                relative
                mt-5
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
                p-6
                overflow-hidden
              "
            >
              {/* EDIT BUTTON - ALWAYS VISIBLE */}

              <button
                type="button"
                onClick={() =>{
                  setselectedCardDbId(technicalCards[0]?.id)
                  handleEdit("technical", 1)
                }
              }
                className="
                  absolute
                  top-5
                  right-5
                  z-10
                  p-2
                  rounded-lg
                  bg-slate-100
                  text-slate-500
                  opacity-100
                  hover:bg-indigo-50
                  hover:text-indigo-600
                  transition-all
                  duration-200
                "
                title="Edit card"
                aria-label="Edit card"
              >
                <CiEdit size={18} />
              </button>

              <div className="max-w-4xl">

                {/* TITLE 1 */}

                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-800
                    mb-3
                    uppercase
                    tracking-tight
                    pr-12
                  "
                >
                  {technicalCards[0]?.title}
                </p>

                {/* TITLE 2 */}

                <h2
                  className="
                    text-3xl
                    font-light
                    text-blue-700
                    tracking-tight
                    mb-5
                    pr-12
                  "
                >
                  {technicalCards[0]?.title2}
                </h2>

                {/* DIVIDER */}

                <div className="border-t border-blue-100 my-5" />

                {/* TITLE 3 / DESCRIPTION */}

                <p
                  className="
                    text-sm
                    leading-7
                    text-slate-500
                    max-w-3xl
                  "
                >
                  {technicalCards[0]?.title3}
                </p>
              </div>

              {/* FEATURE IMAGE */}

              <div className="mt-6">
                {technicalCards[0]?.image ? (
                  <div
                    className="
                      relative
                      w-full
                      max-w-3xl
                      h-[220px]
                      md:h-[280px]
                      rounded-2xl
                      overflow-hidden
                      border
                      border-slate-200
                      shadow-sm
                    "
                  >
                    <Image
                      width={100}
                      height={100}
                      unoptimized
                      src={process.env.NEXT_PUBLIC_BASE_CONTENT_URL+"/"+technicalCards[0]?.image}
                      alt={"technicalCards[0]?.title"}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                      "
                    />
                    <h1>{process.env.NEXT_PUBLIC_BASE_CONTENT_URL+"/"+technicalCards[0]?.image}</h1>
                  </div>
                ) : (
                  <div
                    className="
                      w-full
                      max-w-3xl
                      h-[220px]
                      md:h-[280px]
                      rounded-2xl
                      border-2
                      border-dashed
                      border-slate-200
                      flex
                      items-center
                      justify-center
                      bg-slate-50
                    "
                  >
                    <div className="text-center text-slate-400">
                      <HiOutlinePhotograph
                        size={48}
                        className="mx-auto mb-3"
                      />

                      <p className="text-sm">
                        No image uploaded
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* =================================================
            SPATIAL CONSTRAINTS
        ================================================= */}

        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-sm font-medium tracking-[0.12em] text-[#005596] uppercase">
              Spatial Constraints
            </h2>

            <p className="text-slate-500 mt-2">
              Environmental, geographical and access
              constraints associated with the project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {spatialCards && spatialCards?.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="
                  relative
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-sm
                  hover:shadow-md
                  transition-all
                  duration-300
                  p-6
                  min-h-[260px]
                "
              >
                {/* EDIT BUTTON - ALWAYS VISIBLE */}

                <button
                  type="button"
                  onClick={() =>{
                      setselectedCardDbId(card?.id)
                    handleEdit("spatial", card?.id)
                  }
                  }
                  className="
                    absolute
                    top-5
                    right-5
                    z-10
                    p-2
                    rounded-lg
                    bg-slate-100
                    text-slate-500
                    opacity-100
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    transition-all
                    duration-200
                  "
                  title="Edit card"
                  aria-label="Edit card"
                >
                  <CiEdit size={18} />
                </button>

                {/* ICON */}

                <div
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    text-blue-600
                    text-xl
                    mb-6
                  "
                >
                  {getCardIcon(card.icon)}
                </div>

                {/* TITLE 1 */}

                <p className="text-sm font-semibold text-slate-800 mb-3 pr-12">
                  {card.title}
                </p>

                {/* TITLE 2 */}

                {card.title2 && (
                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-blue-700
                      tracking-tight
                      mb-4
                      pr-12
                    "
                  >
                    {card.title2}
                  </h3>
                )}

                {/* DIVIDER */}

                <div className="border-t border-blue-100 my-4" />

                {/* DESCRIPTION */}

                <p
                  className="
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  {card.title3}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            DESTROYER POPUP
        ================================================= */}

        <DestroyerPopup
          isOpen={isEditing}
          onClose={closeEditModal}
          title={
            selectedSection === "spatial"
              ? "Update Spatial Constraint"
              : "Update About us"
          }
          primaryAction={handleUpdateCard}
          actionText="Update"
        >
          <div className="space-y-5">

            {/* =================================================
                IMAGE UPLOAD
            ================================================= */}

            {isFeatureCard && (
              <div
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="
                  border-2
                  border-dashed
                  border-slate-200
                  rounded-3xl
                  p-6
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-slate-500
                  hover:bg-slate-50
                  transition-all
                  cursor-pointer
                  min-h-[200px]
                  relative
                  overflow-hidden
                  group
                "
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
                      className="
                        text-slate-300
                        mb-3
                        mx-auto
                        group-hover:text-indigo-400
                        transition-colors
                      "
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
                    <div
                      className="
                        relative
                        mx-auto
                        w-full
                        max-w-[320px]
                        h-40
                        mb-3
                      "
                    >
                      <img
                        src={selectedFile.preview}
                        alt="Preview"
                        className="
                          w-full
                          h-full
                          object-cover
                          rounded-2xl
                          shadow-lg
                          border-4
                          border-white
                        "
                      />

                      <button
                        type="button"
                        onClick={clearSelection}
                        className="
                          absolute
                          -top-2
                          -right-2
                          bg-red-500
                          text-white
                          rounded-full
                          p-1.5
                          shadow-md
                          hover:bg-red-600
                          transition-all
                        "
                      >
                        <HiOutlineX size={16} />
                      </button>
                    </div>

                    <p
                      className="
                        text-xs
                        font-bold
                        text-indigo-500
                        truncate
                        max-w-[250px]
                        mx-auto
                        bg-indigo-50
                        px-3
                        py-1
                        rounded-lg
                      "
                    >
                      {selectedFile.isExisting
                        ? "Current image"
                        : selectedFile.name}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                TITLE 1
            ================================================= */}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <HiOutlineDocumentText className="text-indigo-500" />

                  {selectedSection === "spatial"
                    ? "Title"
                    : isFeatureCard
                      ? "Heading"
                      : "Title 1"}
                </label>

                <span
                  className={`text-xs ${editCard.title.length >=
                    TITLE_MAX_LENGTH
                    ? "text-red-500 font-semibold"
                    : "text-slate-400"
                    }`}
                >
                  {editCard.title.length}/
                  {TITLE_MAX_LENGTH}
                </span>
              </div>

              <input
                type="text"
                value={editCard.title}
                maxLength={TITLE_MAX_LENGTH}
                onChange={(e) =>
                  setEditCard((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder={
                  selectedSection === "spatial"
                    ? "e.g. Terrain"
                    : isFeatureCard
                      ? "e.g. Dudhkhoshi Hydro"
                      : "e.g. Installed Capacity"
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:border-transparent
                  transition-all
                "
              />
            </div>

            {/* =================================================
                TITLE 2
            ================================================= */}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <HiOutlineDocumentText className="text-indigo-500" />

                  {selectedSection === "spatial"
                    ? "Value"
                    : isFeatureCard
                      ? "Main Title"
                      : "Title 2"}
                </label>

                <span
                  className={`text-xs ${editCard.title2.length >=
                    TITLE_MAX_LENGTH
                    ? "text-red-500 font-semibold"
                    : "text-slate-400"
                    }`}
                >
                  {editCard.title2.length}/
                  {TITLE_MAX_LENGTH}
                </span>
              </div>

              <input
                type="text"
                value={editCard.title2}
                maxLength={TITLE_MAX_LENGTH}
                onChange={(e) =>
                  setEditCard((prev) => ({
                    ...prev,
                    title2: e.target.value,
                  }))
                }
                placeholder={
                  selectedSection === "spatial"
                    ? "e.g. 11 km corridor"
                    : isFeatureCard
                      ? "e.g. Engineering Future"
                      : "e.g. 95.7 MW"
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:border-transparent
                  transition-all
                "
              />
            </div>

            {/* =================================================
                TITLE 3
            ================================================= */}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <HiOutlineDocumentText className="text-indigo-500" />

                  {selectedSection === "spatial"
                    ? "Description"
                    : isFeatureCard
                      ? "Description"
                      : "Title 3"}
                </label>

                {isTechnicalShortCard && (
                  <span
                    className={`text-xs ${editCard.title3.length >=
                      TITLE_MAX_LENGTH
                      ? "text-red-500 font-semibold"
                      : "text-slate-400"
                      }`}
                  >
                    {editCard.title3.length}/
                    {TITLE_MAX_LENGTH}
                  </span>
                )}
              </div>

              <textarea
                value={editCard.title3}
                maxLength={
                  isTechnicalShortCard
                    ? TITLE_MAX_LENGTH
                    : undefined
                }
                onChange={(e) =>
                  setEditCard((prev) => ({
                    ...prev,
                    title3: e.target.value,
                  }))
                }
                placeholder={
                  selectedSection === "spatial"
                    ? "Enter spatial constraint description"
                    : isFeatureCard
                      ? "Enter your about description"
                      : "e.g. ANNUAL OUTPUT"
                }
                rows={
                  selectedSection === "spatial" ||
                    isFeatureCard
                    ? 5
                    : 2
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:border-transparent
                  transition-all
                  resize-none
                "
              />
            </div>

            {/* =================================================
                ICON
            ================================================= */}

            {!isFeatureCard && (

              <div> <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700"> <HiOutlineKey className="text-indigo-500" /> Icon </label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: "ImPower", icon: ImPower },
                    { value: "MdOutlineWater", icon: MdOutlineWater },
                    { value: "IoWaterOutline", icon: IoWaterOutline },
                    { value: "HiOutlineClock", icon: HiOutlineClock },
                    { value: "LiaMountainSolid", icon: LiaMountainSolid },
                    { value: "IoCarOutline", icon: IoCarOutline },
                    { value: "RiLightbulbFlashLine", icon: RiLightbulbFlashLine },
                    { value: "BsHouseGearFill", icon: BsHouseGearFill },
                  ].map(({ value, icon: Icon }) => {
                    const isSelected = editCard?.icon == value;
                    // console.log(editCard?.icon, "EDITCARD ICON")
                    // console.log(editCard)
                    // console.log(value, "VALUR")

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setEditCard((prev) => ({
                            ...prev,
                            icon: value,
                          }))
                        }
                        className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-all duration-200 ${isSelected
                            ? "border-indigo-500 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                          }`}
                      >
                        <Icon
                          size={28}
                          className="transition-transform group-hover:scale-110"
                        />
                      </button>
                    );
                  })}
                </div>

              </div>)}
          </div>
        </DestroyerPopup>
      </div>
    </>
  );
}
