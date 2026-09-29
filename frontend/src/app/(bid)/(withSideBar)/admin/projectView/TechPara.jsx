"use client";

import React, { useEffect, useState } from "react";
import {
  HiOutlineKey,
  HiOutlineDocumentText,
  HiOutlineLightningBolt,
  HiOutlineCog,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { MdOutlineWater } from "react-icons/md";
import { IoWaterOutline, IoCarOutline } from "react-icons/io5";
import { LiaMountainSolid } from "react-icons/lia";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { BsHouseGearFill } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";

import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import DestroyerPopup from "../components/DestroyerPopup";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  createTechnicalParameter,
  deleteTechnicalParameter,
  getTechnicalParameter,
  updateTechnicalParameter,
} from "@/app/(bid)/redux/slices/LandingPageAdminPanel/landingAdminSlice";

// CONSTANTS
const TITLE_MAX_LENGTH = 50;

// temporary key for content rows that are not saved yet
const createRowKey = () =>
  `new-row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const EMPTY_TECH_CARD = {
  icon: "",
  title: "",
  note: "",
  contentData: [],
};

// ICONS
const CARD_ICONS = {
  lightning: HiOutlineLightningBolt,
  water: MdOutlineWater,
  drop: IoWaterOutline,
  turbine: HiOutlineCog,
  terrain: LiaMountainSolid,
  access: IoCarOutline,
  context: RiLightbulbFlashLine,
  house: BsHouseGearFill,
};

const getCardIcon = (icon, props = {}) => {
  const Icon = CARD_ICONS[icon] || HiOutlineKey;

  return <Icon {...props} />;
};

// API CATEGORY -> UI CARD
const mapCategoryToCard = (category) => ({
  id: category?.categoryId,
  icon: category?.categoryIcon || "",
  title: category?.categoryTitle || "",
  note: category?.categoryNote || "",
  contentData: Array.isArray(category?.contents)
    ? category.contents.map((content) => ({
      id: content?.contentId,
      conTitle: content?.contentTitle || "",
      data: content?.contentData || "",
      formula: content?.contentFormula || "",
    }))
    : [],
});


export default function ProjectOverviewPage() {
  const dispatch = useDispatch();

  const [techCards, setTechCards] = useState([]);

  const [saving, setSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [editTechCard, setEditTechCard] = useState(EMPTY_TECH_CARD);

  const [expandedTechCards, setExpandedTechCards] = useState({});

  // ids of saved content rows removed in the editor (deleted on save)
  const [deletedContentIds, setDeletedContentIds] = useState([]);

  // redux state
  const technicalParameter = useSelector((state) => state?.landingPageAdmmin?.technicalParameters);
  const loading = useSelector((state) => state?.landingPageAdmmin?.technicalParametersLoading);

  // fetch technical parameters on mount
  useEffect(() => {
    dispatch(getTechnicalParameter({}));
  }, [dispatch]);

  // keep local state in sync with the API response
  useEffect(() => {
    if (Array.isArray(technicalParameter)) {
      setTechCards(technicalParameter.map(mapCategoryToCard));
    }
  }, [technicalParameter]);


  // CARD EXPAND TOGGLE
  const toggleTechCard = (index) => {
    setExpandedTechCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  // RESET EDIT STATE
  const resetEditState = () => {
    setEditTechCard({
      ...EMPTY_TECH_CARD,
      contentData: [],
    });

    setSelectedCardIndex(null);

    setDeletedContentIds([]);
  };


  // CLOSE EDIT / ADD MODAL
  const closeEditModal = () => {
    setIsEditing(false);
    setIsAdding(false);
    resetEditState();
  };

  // =====================================================
  // OPEN EDIT TECHNICAL PARAMETERS
  // =====================================================

  const handleEditTechCard = (index) => {
    const card = techCards[index];

    if (!card) {
      toast.error("Card not found");
      return;
    }

    setSelectedCardIndex(index);

    setEditTechCard({
      icon: card.icon || "",
      title: card.title || "",
      note: card.note || "",
      contentData: Array.isArray(card.contentData)
        ? card.contentData.map((item) => ({
          id: item.id,
          conTitle: item.conTitle || "",
          data: item.data || "",
          formula: item.formula || "",
        }))
        : [],
    });

    setDeletedContentIds([]);

    setIsEditing(true);
  };

  // =====================================================
  // OPEN ADD TECHNICAL PARAMETERS
  // =====================================================

  const handleOpenAddTechCard = () => {
    resetEditState();
    setIsAdding(true);
  };

  // =====================================================
  // OPEN DELETE MODAL
  // =====================================================

  const openDeleteModal = (index) => {
    if (!techCards[index]) {
      toast.error("Card not found");
      return;
    }

    setCardToDelete(index);
    setIsDeleteModalOpen(true);
  };

  // =====================================================
  // CONFIRM DELETE
  // =====================================================

  const confirmDelete = async () => {
    if (cardToDelete === null) return;

    const card = techCards[cardToDelete];

    if (!card) {
      toast.error("Card not found");
      setIsDeleteModalOpen(false);
      setCardToDelete(null);
      return;
    }

    if (!card.id) {
      toast.error("Category not found");
      setIsDeleteModalOpen(false);
      setCardToDelete(null);
      return;
    }

    setSaving(true);

    const result = await dispatch(
      deleteTechnicalParameter({ id: card.id })
    );

    setSaving(false);

    if (result.payload?.statusCode === 200 || result.payload?.statusCode === 201) {
      toast.success(result.payload.message);

      dispatch(getTechnicalParameter({}));
    }

    setIsDeleteModalOpen(false);
    setCardToDelete(null);
  };

  // =====================================================
  // ADD TECHNICAL CONTENT

  // New rows have no database id yet, so they get a temporary
  // key for React and are inserted when the card is saved.
  // =====================================================

  const handleAddTechContent = () => {
    setEditTechCard((prev) => ({
      ...prev,
      contentData: [
        ...prev.contentData,
        {
          id: null,
          rowKey: createRowKey(),
          conTitle: "",
          data: "",
          formula: "",
        },
      ],
    }));
  };

  // =====================================================
  // REMOVE TECHNICAL CONTENT
  // =====================================================

  const handleRemoveTechContent = (contentIndex) => {
    const removedRow = editTechCard.contentData[contentIndex];

    // a saved row has to be deleted in the database when the card is saved,
    // new rows only exist locally and can just be dropped
    if (removedRow?.id !== null && removedRow?.id !== undefined) {
      setDeletedContentIds((prevIds) => [...prevIds, removedRow.id]);
    }

    setEditTechCard((prev) => ({
      ...prev,
      contentData: prev.contentData.filter(
        (_, index) => index !== contentIndex
      ),
    }));
  };

  // =====================================================
  // UPDATE TECHNICAL CONTENT
  // =====================================================

  const handleTechContentChange = (
    contentIndex,
    field,
    value
  ) => {
    setEditTechCard((prev) => ({
      ...prev,
      contentData: prev.contentData.map((content, index) =>
        index === contentIndex
          ? {
            ...content,
            [field]: value,
          }
          : content
      ),
    }));
  };

  // =====================================================
  // VALIDATE TECHNICAL CARD
  // =====================================================

  const validateTechCard = () => {
    const title = editTechCard.title.trim();

    if (!title) {
      toast.error("Please enter a category title");
      return false;
    }

    if (!editTechCard.icon) {
      toast.error("Please select an icon");
      return false;
    }

    if (title.length > TITLE_MAX_LENGTH) {
      toast.error(
        `Category title must be ${TITLE_MAX_LENGTH} characters or less`
      );
      return false;
    }

    for (let i = 0; i < editTechCard.contentData.length; i++) {
      const content = editTechCard.contentData[i];

      if (!content.conTitle.trim() || !content.data.trim()) {
        toast.error(
          `Please complete the title and data fields in content item ${i + 1
          }`
        );
        return false;
      }
    }

    return true;
  };

  // =====================================================
  // FORMAT TECHNICAL CARD
  // =====================================================

  const formatTechCard = () => ({
    icon: editTechCard.icon,
    title: editTechCard.title.trim(),
    note: editTechCard.note.trim(),
    contentData: editTechCard.contentData.map((content) => ({
      // rows without an id are new and get inserted by the API
      id: content.id ?? null,
      conTitle: content.conTitle.trim(),
      data: content.data.trim(),
      formula: content.formula.trim(),
    })),
  });

  // =====================================================
  // ADD TECHNICAL CARD
  // =====================================================

  const handleAddTechCard = async () => {
    if (!validateTechCard()) return;

    const newCard = formatTechCard();

    setSaving(true);

    const result = await dispatch(
      createTechnicalParameter({
        icon: newCard.icon,
        title: newCard.title,
        note: newCard.note,
        contentData: newCard.contentData.map((content) => ({
          conTitle: content.conTitle,
          data: content.data,
          formula: content.formula,
        })),
      })
    );

    setSaving(false);

    if (result.payload?.statusCode === 200 || result.payload?.statusCode === 201) {
      toast.success(result.payload.message);

      dispatch(getTechnicalParameter({}));

      closeEditModal();
    }
  };

  // =====================================================
  // UPDATE TECHNICAL CARD
  // =====================================================

  const handleUpdateTechCard = async () => {
    if (selectedCardIndex === null) {
      toast.error("No card selected");
      return;
    }

    if (!validateTechCard()) return;

    const updatedCard = formatTechCard();

    const categoryId = techCards[selectedCardIndex]?.id;

    if (!categoryId) {
      toast.error("Category not found");
      return;
    }

    setSaving(true);

    const result = await dispatch(
      updateTechnicalParameter({
        id: categoryId,
        formData: {
          ...updatedCard,
          deletedContentIds,
        },
      })
    );

    setSaving(false);

    if (result.payload?.statusCode === 200 || result.payload?.statusCode === 201) {
      toast.success(result.payload.message);

      dispatch(getTechnicalParameter({}));

      closeEditModal();
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  if (loading || saving) {
    return (
      <div className="fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-[#000000cf]">
        <Loading />
      </div>
    );
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
              <HiOutlineViewGrid className="text-indigo-600" />

              <span>Project Overview</span>
            </h1>

            <p className="text-slate-500 mt-2">
              Manage project technical parameters.
            </p>
          </div>
        </header>

        {/* =================================================
            TECHNICAL PARAMETERS
        ================================================= */}

        <section className="mb-14">

          {/* SECTION HEADER */}

          <div className="mb-6">
            <div className="flex items-center gap-4 justify-between">

              <h2 className="text-sm font-medium tracking-[0.12em] text-[#005596] uppercase">
                TECHNICAL PARAMETERS
              </h2>

              <button
                type="button"
                onClick={handleOpenAddTechCard}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-indigo-600
                  text-white
                  text-sm
                  font-semibold
                  shadow-sm
                  hover:bg-indigo-700
                  hover:shadow-md
                  transition-all
                  duration-200
                "
              >
                <HiOutlinePlus size={18} />

                Add Item
              </button>

            </div>

            <p className="text-slate-500 mt-2">
              The factual technical parameters of the project.
            </p>
          </div>

          {/* =================================================
              CARDS
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">

            {techCards.map((card, index) => (
              <div
                key={`${card.title}-${index}`}
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
                  overflow-hidden
                "
              >

                {/* CARD ACTIONS */}

                <div className="absolute top-5 right-5 z-10 flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() => handleEditTechCard(index)}
                    className="
                      p-2
                      rounded-lg
                      bg-slate-100
                      text-slate-500
                      hover:bg-indigo-50
                      hover:text-indigo-600
                      transition-all
                    "
                    title="Edit card"
                  >
                    <CiEdit size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => openDeleteModal(index)}
                    className="
                      p-2
                      rounded-lg
                      bg-red-50
                      text-red-500
                      hover:bg-red-100
                      hover:text-red-600
                      transition-all
                    "
                    title="Delete card"
                  >
                    <HiOutlineTrash size={18} />
                  </button>

                </div>

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
                    mb-5
                  "
                >
                  {getCardIcon(card.icon)}
                </div>

                {/* TITLE */}

                <h3
                  className="
                    text-xl
                    font-semibold
                    text-slate-900
                    pr-12
                  "
                >
                  {card.title}
                </h3>

                {/* NOTE */}

                <p
                  className="
                    text-sm
                    leading-6
                    text-slate-500
                    mt-2
                    max-w-2xl
                  "
                >
                  {card.note}
                </p>

                <div className="border-t border-blue-100 my-5" />

                {/* =================================================
                  PARAMETERS PREVIEW / COLLAPSIBLE CONTENT
              ================================================= */}

                {Array.isArray(card.contentData) && card.contentData.length > 0 ? (
                  <div className="mt-5">

                    {/* COLLAPSED / EXPANDED CONTROL */}

                    <button
                      type="button"
                      onClick={() => toggleTechCard(index)}
                      className="
        w-full
        flex
        items-center
        justify-between
        gap-4
        py-3
        px-1
        text-left
        group
      "
                    >
                      <div className="flex items-center gap-3 min-w-0">

                        <span
                          className="
            inline-flex
            items-center
            rounded-lg
            bg-slate-100
            px-2.5
            py-1
            text-xs
            font-semibold
            text-slate-600
            whitespace-nowrap
          "
                        >
                          {card.contentData.length}{" "}
                          {card.contentData.length === 1
                            ? "parameter"
                            : "parameters"}
                        </span>



                      </div>

                      <span
                        className="
          flex
          items-center
          gap-1.5
          text-sm
          font-semibold
          text-indigo-600
          group-hover:text-indigo-700
          whitespace-nowrap
        "
                      >
                        {expandedTechCards[index]
                          ? "Hide parameters"
                          : "Show parameters"}

                        <FaCaretDown
                        className={`
                          w-4
                          h-4
                          transition-transform
                          duration-200
                          ${expandedTechCards[index] ? "rotate-180" : ""}
                        `}
                      />

                      </span>
                    </button>

                    {/* PARAMETER CONTENT */}

                    {expandedTechCards[index] && (
                      <div className="mt-2 w-full overflow-x-auto animate-in fade-in slide-in-from-top-1 duration-200">

                        <div className="min-w-[620px]">

                          {/* TABLE HEADER */}

                          <div
                            className="
              grid
              grid-cols-[30%_25%_45%]
              h-12
              items-center
              border-b
              border-slate-200
              bg-slate-50/70
              rounded-t-xl
            "
                          >
                            <div
                              className="
                pr-4
                pl-3
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
                            >
                              Parameter
                            </div>

                            <div
                              className="
                px-4
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
                            >
                              Data
                            </div>

                            <div
                              className="
                pl-4
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
                            >
                              Formula
                            </div>
                          </div>

                          {/* TABLE BODY */}

                          <div
                            className="
              max-h-[288px]
              overflow-y-auto
              overflow-x-hidden
              scrollbar-thin
              scrollbar-thumb-slate-300
              scrollbar-track-transparent
              border-x
              border-b
              border-slate-100
              rounded-b-xl
            "
                          >
                            {card.contentData.map((content) => (
                              <div
                                key={content.id}
                                className="
                  grid
                  grid-cols-[30%_25%_45%]
                  min-h-[72px]
                  border-b
                  border-slate-100
                  last:border-b-0
                  hover:bg-slate-50/60
                  transition-colors
                "
                              >

                                {/* PARAMETER */}

                                <div
                                  className="
                    flex
                    items-center
                    pr-4
                    pl-3
                    overflow-hidden
                  "
                                >
                                  <p
                                    className="
                      text-sm
                      font-medium
                      text-slate-800
                      leading-5
                      line-clamp-3
                      break-words
                    "
                                  >
                                    {content.conTitle}
                                  </p>
                                </div>

                                {/* DATA */}

                                <div
                                  className="
                    flex
                    items-center
                    px-4
                    overflow-hidden
                  "
                                >
                                  <p
                                    className="
                      text-sm
                      font-semibold
                      text-blue-700
                      leading-5
                      line-clamp-3
                      break-words
                    "
                                  >
                                    {content.data}
                                  </p>
                                </div>

                                {/* FORMULA */}

                                <div
                                  className="
                    flex
                    items-center
                    pl-4
                    overflow-hidden
                  "
                                >
                                  <p
                                    className="
                      text-xs
                      leading-5
                      text-slate-500
                      line-clamp-3
                      break-words
                    "
                                  >
                                    {content.formula || "—"}
                                  </p>
                                </div>

                              </div>
                            ))}
                          </div>

                        </div>

                      </div>
                    )}

                  </div>
                ) : (
                  <div
                    className="
      mt-5
      py-6
      text-center
      text-sm
      text-slate-400
      border-t
      border-slate-100
    "
                  >
                    No project parameters added.
                  </div>
                )}

              </div>
            ))}

          </div>

        </section>

        {/* =====================================================
            DELETE MODAL
        ===================================================== */}

        <DestroyerPopup
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setCardToDelete(null);
          }}
          title="Remove Technical Parameter?"
          primaryAction={confirmDelete}
          actionText="Yes, Delete"
        >
          <p>
            This action cannot be undone. This technical
            specification card will be permanently removed.
          </p>
        </DestroyerPopup>

        {/* =================================================
            ADD / EDIT POPUP
        ================================================= */}

        <DestroyerPopup
          isOpen={isEditing || isAdding}
          onClose={closeEditModal}
          title={
            isAdding
              ? "Add Technical Parameter"
              : "Update Technical Parameter"
          }
          primaryAction={
            isAdding
              ? handleAddTechCard
              : handleUpdateTechCard
          }
          actionText={isAdding ? "Add Item" : "Update"}
        >

          {/* =================================================
              TECHNICAL PARAMETERS EDITOR
          ================================================= */}

          <div className="space-y-6">

            {/* CATEGORY TITLE */}

            <div>
              <div className="flex items-center justify-between mb-2">

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <HiOutlineDocumentText className="text-indigo-500" />

                  Category Title
                </label>

                <span
                  className={`
                    text-xs
                    ${editTechCard.title.length >=
                      TITLE_MAX_LENGTH
                      ? "text-red-500 font-semibold"
                      : "text-slate-400"
                    }
                  `}
                >
                  {editTechCard.title.length}/{TITLE_MAX_LENGTH}
                </span>

              </div>

              <input
                type="text"
                value={editTechCard.title}
                maxLength={TITLE_MAX_LENGTH}
                onChange={(e) =>
                  setEditTechCard((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="e.g. Installed Capacity"
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
                "
              />
            </div>

            {/* CATEGORY NOTE */}

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">

                <HiOutlineDocumentText className="text-indigo-500" />

                Category Note

                <span
                  className="
                    text-[11px]
                    font-medium
                    text-slate-400
                    bg-slate-100
                    px-2
                    py-0.5
                    rounded-full
                  "
                >
                  Optional
                </span>

              </label>

              <textarea
                value={editTechCard.note}
                onChange={(e) =>
                  setEditTechCard((prev) => ({
                    ...prev,
                    note: e.target.value,
                  }))
                }
                rows={3}
                placeholder="Add an optional description..."
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
                  resize-none
                "
              />
            </div>

            {/* ICON SELECTOR */}

            <IconSelector
              value={editTechCard.icon}
              onChange={(icon) =>
                setEditTechCard((prev) => ({
                  ...prev,
                  icon,
                }))
              }
            />

            {/* CONTENT DATA */}

            <div>

              <div className="flex items-center justify-between mb-3">

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                    <HiOutlineViewGrid className="text-indigo-500" />

                    Content Parameters

                  </label>

                  <p className="text-xs text-slate-400 mt-1">
                    Add title, data and formula parameters.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddTechContent}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                    text-sm
                    font-semibold
                    hover:bg-indigo-100
                  "
                >
                  <HiOutlinePlus size={18} />

                  Add Row
                </button>

              </div>

              <div
                className="
                  space-y-4
                  overflow-auto
                  max-h-[230px]
                  p-2
                "
              >
                {editTechCard.contentData.map(
                  (content, contentIndex) => (
                    <div
                      key={content.rowKey ?? content.id}
                      className="
                        relative
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-4
                        pr-14
                      "
                    >

                      {/* DELETE ROW */}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveTechContent(
                            contentIndex
                          )
                        }
                        className="
                          absolute
                          top-3
                          right-3
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-400
                          hover:bg-red-50
                          hover:text-red-500
                        "
                        title="Remove row"
                      >
                        <HiOutlineTrash size={16} />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        {/* CONTENT TITLE */}

                        <ContentInput
                          label="Content Title"
                          value={content.conTitle}
                          onChange={(value) =>
                            handleTechContentChange(
                              contentIndex,
                              "conTitle",
                              value
                            )
                          }
                        />

                        {/* DATA */}

                        <ContentInput
                          label="Data"
                          value={content.data}
                          onChange={(value) =>
                            handleTechContentChange(
                              contentIndex,
                              "data",
                              value
                            )
                          }
                        />

                        {/* FORMULA */}

                        <ContentInput
                          label="Formula"
                          value={content.formula}
                          onChange={(value) =>
                            handleTechContentChange(
                              contentIndex,
                              "formula",
                              value
                            )
                          }
                        />

                      </div>
                    </div>
                  )
                )}
              </div>

            </div>

          </div>

        </DestroyerPopup>

      </div>
    </>
  );
}


// CONTENT INPUT
function ContentInput({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-2">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          px-3
          py-2.5
          rounded-xl
          border
          border-slate-200
          bg-white
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
      />
    </div>
  );
}

// REUSABLE ICON SELECTOR
function IconSelector({
  value,
  onChange,
}) {
  const icons = Object.entries(CARD_ICONS);

  return (
    <div>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
        <HiOutlineKey className="text-indigo-500" />

        Category Icon
      </label>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">

        {icons.map(([name, Icon]) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            className={`
              flex
              items-center
              justify-center
              p-4
              rounded-2xl
              border
              transition-all
              ${value === name
                ? "border-indigo-500 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100"
                : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
              }
            `}
          >
            <Icon
              size={28}
              className="transition-transform hover:scale-110"
            />
          </button>
        ))}

      </div>

    </div>
  );
}