"use client";

import React, { useState } from "react";
import {
  HiOutlineKey,
  HiOutlineViewGrid,
  HiOutlineAdjustments,
  HiLightningBolt,
  HiOutlineArrowRight
} from "react-icons/hi";
import { BsHouseGearFill } from "react-icons/bs";
import { FaNetworkWired } from "react-icons/fa6";

import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import DestroyerPopup from "../components/DestroyerPopup";

// =====================================================
// CONSTANTS
// =====================================================

const EMPTY_GENERATION_CARD = {
  id: null,
  icon: "",
  title: "",
  title2: "",
  para: "",
};

// =====================================================
// GENERATION & POWER EVACUATION
// =====================================================

const gen_and_power = [
  {
    id: 1,
    icon: "generator",
    title: "Powerhouse",
    title2: "Surface",
    para:
      "55 M × 26.5 M × 35.3 M",
  },
  {
    id: 2,
    icon: "share",
    title: "Grid Connection",
    title2: "Generator Output",
    para:
      "The two generating units convert the mechanical rotation of the turbine shafts into electrical energy with a combined installed capacity of 95.7 MW.",
  },
];

// =====================================================
// ICONS
// =====================================================

const CARD_ICONS = {
  generator: <BsHouseGearFill />,
  bolt: <HiLightningBolt />,
  transformer: <HiOutlineAdjustments />,
  switchyard: <HiOutlineViewGrid />,
  share: <FaNetworkWired />,
};

const ICON_OPTIONS = [
  { name: "generator", component: <BsHouseGearFill size={28} /> },
  { name: "bolt", component: <HiLightningBolt size={28} /> },
  { name: "transformer", component: <HiOutlineAdjustments size={28} /> },
  { name: "switchyard", component: <HiOutlineViewGrid size={28} /> },
  { name: "share", component: <FaNetworkWired size={28} /> },
];


// =====================================================
// PAGE
// =====================================================

export default function ProjectOverviewPage() {
  const [generationCards, setGenerationCards] =
    useState(gen_and_power);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] =
    useState(null);

  const [editGenerationCard, setEditGenerationCard] =
    useState(EMPTY_GENERATION_CARD);

  // =====================================================
  // HELPERS
  // =====================================================

  const resetEditState = () => {
    setEditGenerationCard(EMPTY_GENERATION_CARD);
    setSelectedCardIndex(null);
    setIsEditing(false);
  };

  const updateEditField = (field, value) => {
    setEditGenerationCard((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEditGenerationCard = (index) => {
    const card = generationCards[index];

    if (!card) {
      toast.error("Card not found");
      return;
    }

    setSelectedCardIndex(index);

    setEditGenerationCard({
      id: card.id,
      icon: card.icon || "",
      title: card.title || "",
      title2: card.title2 || "",
      para: card.para || "",
    });

    setIsEditing(true);
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateGenerationCard = () => {
    const { title, title2, para, icon } =
      editGenerationCard;

    const fields = [
      [title, "Please enter a title"],
      [title2, "Please enter a secondary title"],
      [para, "Please enter a description"],
    ];

    for (const [value, message] of fields) {
      if (!value.trim()) {
        toast.error(message);
        return false;
      }
    }

    if (!icon) {
      toast.error("Please select an icon");
      return false;
    }

    return true;
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdateGenerationCard = () => {
    if (selectedCardIndex === null) {
      toast.error("No card selected");
      return;
    }

    if (!validateGenerationCard()) {
      return;
    }

    const updatedCard = {
      icon: editGenerationCard.icon,
      title: editGenerationCard.title.trim(),
      title2: editGenerationCard.title2.trim(),
      para: editGenerationCard.para.trim(),
    };

    console.log(
      "Updated Generation Card:",
      updatedCard
    );

    setGenerationCards((prev) =>
      prev.map((card, index) =>
        index === selectedCardIndex
          ? {
            ...card,
            ...updatedCard,
          }
          : card
      )
    );

    toast.success(
      "Generation and Power Evacuation updated successfully"
    );

    resetEditState();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* =================================================
          GENERATION & POWER EVACUATION
      ================================================= */}

      <section className="mb-14">

        {/* SECTION HEADER */}

        <div className="mb-6">
          <h2 className="text-sm font-medium tracking-[0.12em] text-[#005596] uppercase">
            GENERATION AND POWER EVACUATION
          </h2>

          <p className="text-slate-500 mt-2">
            Generation equipment, electrical transformation
            and the path to the transmission network.
          </p>
        </div>

        {/* CARDS */}

        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-5">

          {generationCards.map((card, index) => (
            <React.Fragment key={`${card.id}-${index}`}>

              {/* CARD */}
              <div
                className="
          relative
          flex-1
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

                {/* EDIT */}
                <button
                  type="button"
                  onClick={() =>
                    handleEditGenerationCard(index)
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
            hover:bg-indigo-50
            hover:text-indigo-600
            transition-all
          "
                  title="Edit card"
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
            mb-5
          "
                >
                  {CARD_ICONS[card.icon] ?? <HiOutlineKey />}
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

                {/* TITLE 2 */}
                <p
                  className="
            text-sm
            font-semibold
            text-blue-600
            mt-2
          "
                >
                  {card.title2}
                </p>

                <div className="border-t border-blue-100 my-5" />

                {/* DESCRIPTION */}
                <p
                  className="
            text-sm
            leading-6
            text-slate-500
          "
                >
                  {card.para}
                </p>
              </div>

              {/* CONNECTING ARROW */}
              {index < generationCards.length - 1 && (
                <div
                  className="
            hidden
            xl:flex
            shrink-0
            items-center
            justify-center
            text-blue-500
            px-1
          "
                >
                  <HiOutlineArrowRight
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>
              )}

            </React.Fragment>
          ))}

        </div>

      </section>

      {/* =================================================
          EDIT POPUP
      ================================================= */}

      <DestroyerPopup
        isOpen={isEditing}
        onClose={resetEditState}
        title="Update Generation and Power Evacuation"
        primaryAction={handleUpdateGenerationCard}
        actionText="Update"
      >
        <div className="space-y-6">

          {/* TITLE */}

          <FormField label="Title">
            <input
              type="text"
              value={editGenerationCard.title}
              onChange={(e) =>
                updateEditField(
                  "title",
                  e.target.value
                )
              }
              className={INPUT_CLASS}
            />
          </FormField>

          {/* TITLE 2 */}

          <FormField label="Secondary Title">
            <input
              type="text"
              value={editGenerationCard.title2}
              onChange={(e) =>
                updateEditField(
                  "title2",
                  e.target.value
                )
              }
              className={INPUT_CLASS}
            />
          </FormField>

          {/* DESCRIPTION */}

          <FormField label="Description">
            <textarea
              value={editGenerationCard.para}
              onChange={(e) =>
                updateEditField(
                  "para",
                  e.target.value
                )
              }
              rows={5}
              className={`${INPUT_CLASS} resize-none`}
            />
          </FormField>

          {/* ICON */}

          <IconSelector
            value={editGenerationCard.icon}
            onChange={(icon) =>
              updateEditField("icon", icon)
            }
          />

        </div>
      </DestroyerPopup>
    </div>
  );
}

// =====================================================
// REUSABLE FORM FIELD
// =====================================================

const INPUT_CLASS = `
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
`;

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      {children}
    </div>
  );
}

// =====================================================
// REUSABLE ICON SELECTOR
// =====================================================

function IconSelector({ value, onChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
        <HiOutlineKey className="text-indigo-500" />
        Category Icon
      </label>

      <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
        {ICON_OPTIONS.map((icon) => (
          <button
            key={icon.name}
            type="button"
            onClick={() => onChange(icon.name)}
            title={icon.name}
            className={`
              flex
              items-center
              justify-center
              p-4
              rounded-2xl
              border
              transition-all

              ${value === icon.name
                ? "border-indigo-500 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100"
                : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
              }
            `}
          >
            {icon.component}
          </button>
        ))}
      </div>
    </div>
  );
}
