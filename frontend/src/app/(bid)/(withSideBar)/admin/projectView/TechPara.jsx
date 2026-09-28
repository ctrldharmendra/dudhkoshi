"use client";

import React, { useState } from "react";
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

// =====================================================
// CONSTANTS
// =====================================================

const TITLE_MAX_LENGTH = 50;

const EMPTY_TECH_CARD = {
  icon: "",
  title: "",
  note: "",
  contentData: [],
};

// =====================================================
// ICONS
// =====================================================

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

// =====================================================
// TECHNICAL PARAMETERS DATA
// =====================================================

const tech_parameters = [
  {
    icon: "lightning",
    title: "Scheme and Capacity",
    note:
      "It is a 95.7 MW, 6-hour peaking run-of-river hydropower project located in Solukhumbu, Koshi Province. The project utilizes the Dudhkoshi River to generate clean and reliable energy for Nepal.",
    contentData: [
      {
        id: 1,
        conTitle: "Installed Capacity",
        data: "95.7 MW",
        formula: "P = ρ·g·Q·Hₙ·η",
      },
      {
        id: 2,
        conTitle: "Gross Head",
        data: "144.5 m",
        formula: "H_g = Z_intake − Z_powerhouse",
      },
      {
        id: 3,
        conTitle: "Net Head",
        data: "NULL",
        formula: "Hₙ = H_g − ∑hf",
      },
      {
        id: 4,
        conTitle: "Design Discharge",
        data: "83.5 m³/s",
        formula: "Q = A·v",
      },
      {
        id: 5,
        conTitle: "Type of Scheme",
        data: "Run-of-River (6-hour Peaking)",
        formula: "",
      },
    ],
  },

  {
    icon: "water",
    title: "Water Conveyance",
    note:
      "Designed with underground tunneling structures to minimize environmental impact while maintaining optimum hydraulic efficiency.",
    contentData: [
      {
        id: 6,
        conTitle: "Headrace Tunnel Length",
        data: "4,791 m",
        formula: "L_t",
      },
      {
        id: 7,
        conTitle: "Headrace Tunnel Type",
        data: "Concrete Lined Inverted D-Shaped",
        formula: "",
      },
      {
        id: 8,
        conTitle: "Tunnel Diameter",
        data: "5.6 m (finished)",
        formula: "D = 2·r",
      },
      {
        id: 9,
        conTitle: "Surge Shaft Type",
        data: "Restricted Orifice Surge Shaft",
        formula: "",
      },
      {
        id: 10,
        conTitle: "Surge Shaft Height",
        data: "69 m",
        formula: "",
      },
      {
        id: 11,
        conTitle: "Surge Shaft Internal Diameter",
        data: "16.0 m",
        formula: "",
      },
      {
        id: 12,
        conTitle: "Penstock Type",
        data: "Underground",
        formula: "",
      },
      {
        id: 13,
        conTitle: "Penstock Length",
        data:
          "80 m (Surge Shaft–Drop Shaft) + 96.97 m (Drop Shaft) + 96.62 m (Inclined Penstock Tunnel)",
        formula: "L_p",
      },
      {
        id: 14,
        conTitle: "Penstock Internal Diameter",
        data: "4.6 m",
        formula: "",
      },
    ],
  },

  {
    icon: "house",
    title: "Powerhouse",
    note:
      "Houses state-of-the-art control units and multi-stage generating equipment engineered for high-head operational efficiency.",
    contentData: [
      {
        id: 15,
        conTitle: "Powerhouse Type",
        data: "Surface Powerhouse",
        formula: "",
      },
      {
        id: 16,
        conTitle: "Dimensions (L x W x H)",
        data: "55m x 26.5m x 35.3m",
        formula: "V = L·W·H",
      },
      {
        id: 17,
        conTitle: "Design Tailwater Level",
        data: "644.5 masl",
        formula: "",
      },
      {
        id: 18,
        conTitle: "Tailrace Tunnels",
        data: "2 nos., 94.30 m long, 5.5m x 3.45m each",
        formula: "",
      },
    ],
  },

  {
    icon: "turbine",
    title: "Turbine & Generator",
    note:
      "Vertical axis Francis turbines selected for the project's head and discharge conditions.",
    contentData: [
      {
        id: 19,
        conTitle: "Turbine Type",
        data: "Vertical Axis Francis",
        formula: "",
      },
      {
        id: 20,
        conTitle: "Number of Units",
        data: "2 Units",
        formula: "",
      },
      {
        id: 21,
        conTitle: "Rated Output per Unit",
        data: "47.845 MW",
        formula: "",
      },
      {
        id: 22,
        conTitle: "Installed Capacity",
        data: "95.7 MW",
        formula: "",
      },
      {
        id: 23,
        conTitle: "Rated Efficiency",
        data: "NULL",
        formula: "η_overall",
      },
      {
        id: 24,
        conTitle: "Generator Output",
        data: "NULL",
        formula: "S = P / PF",
      },
    ],
  },

  {
    icon: "share",
    title: "Power Evacuation",
    note:
      "Power evacuation details for this project have not yet been provided by the client — placeholder values above must be replaced before publishing.",
    contentData: [
      {
        id: 25,
        conTitle: "Transmission Voltage",
        data: "TBD — not provided for Dudhkoshi-2",
        formula: "",
      },
      {
        id: 26,
        conTitle: "Interconnection Point",
        data: "TBD — not provided for Dudhkoshi-2",
        formula: "",
      },
      {
        id: 27,
        conTitle: "Transmission Line Length",
        data: "TBD — not provided for Dudhkoshi-2",
        formula: "L_line",
      },
    ],
  },
];

// =====================================================
// COMPONENT
// =====================================================

export default function ProjectOverviewPage() {
  const [techCards, setTechCards] = useState(tech_parameters);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [editTechCard, setEditTechCard] = useState(EMPTY_TECH_CARD);

  const [expandedTechCards, setExpandedTechCards] = useState({});


  // CARD EXPAND TOGGLE
  const toggleTechCard = (index) => {
    setExpandedTechCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  // =====================================================
  // RESET EDIT STATE
  // =====================================================

  const resetEditState = () => {
    setEditTechCard({
      ...EMPTY_TECH_CARD,
      contentData: [],
    });

    setSelectedCardIndex(null);
  };

  // =====================================================
  // CLOSE EDIT / ADD MODAL
  // =====================================================

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

  const confirmDelete = () => {
    if (cardToDelete === null) return;

    const card = techCards[cardToDelete];

    if (!card) {
      toast.error("Card not found");
      setIsDeleteModalOpen(false);
      setCardToDelete(null);
      return;
    }

    console.log("Deleted Technical Specification:", card);

    setTechCards((prev) =>
      prev.filter((_, index) => index !== cardToDelete)
    );

    toast.success("Technical parameter removed successfully.");

    setIsDeleteModalOpen(false);
    setCardToDelete(null);
  };

  // =====================================================
  // GENERATE CONTENT ID
  // =====================================================

  const generateContentId = () => {
    const ids = techCards.flatMap((card) =>
      Array.isArray(card.contentData)
        ? card.contentData
          .map((item) => item.id)
          .filter((id) => typeof id === "number")
        : []
    );

    return ids.length ? Math.max(...ids) + 1 : 1;
  };

  // =====================================================
  // ADD TECHNICAL CONTENT
  // =====================================================

  const handleAddTechContent = () => {
    setEditTechCard((prev) => ({
      ...prev,
      contentData: [
        ...prev.contentData,
        {
          id: generateContentId(),
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
      id: content.id,
      conTitle: content.conTitle.trim(),
      data: content.data.trim(),
      formula: content.formula.trim(),
    })),
  });

  // =====================================================
  // ADD TECHNICAL CARD
  // =====================================================

  const handleAddTechCard = () => {
    if (!validateTechCard()) return;

    const newCard = formatTechCard();

    console.log("Added Technical Specification:", newCard);

    setTechCards((prev) => [...prev, newCard]);

    toast.success("Technical parameter added successfully");

    closeEditModal();
  };

  // =====================================================
  // UPDATE TECHNICAL CARD
  // =====================================================

  const handleUpdateTechCard = () => {
    if (selectedCardIndex === null) {
      toast.error("No card selected");
      return;
    }

    if (!validateTechCard()) return;

    const updatedCard = formatTechCard();

    console.log(
      "Updated Technical Specification:",
      updatedCard
    );

    setTechCards((prev) =>
      prev.map((card, index) =>
        index === selectedCardIndex
          ? {
            ...card,
            ...updatedCard,
          }
          : card
      )
    );

    toast.success("Technical parameter updated successfully");

    closeEditModal();
  };

  // =====================================================
  // RENDER
  // =====================================================

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
                      key={content.id}
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

// =====================================================
// CONTENT INPUT
// =====================================================

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

// =====================================================
// REUSABLE ICON SELECTOR
// =====================================================

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