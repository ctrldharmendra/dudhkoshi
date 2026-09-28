"use client";

import React, { useState } from "react";
import {
  HiOutlineKey,
  HiOutlineViewGrid,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import {
  FaHouseFloodWater,
  FaArrowUpFromGroundWater,
  FaHouseFloodWaterCircleArrowRight,
  FaConfluence,
  FaCaretDown,
} from "react-icons/fa6";
import { TbBuildingTunnel } from "react-icons/tb";


import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import DestroyerPopup from "../components/DestroyerPopup";

// =====================================================
// INITIAL DATA
// =====================================================

const water_to_wire = [
  {
    icon: "river",
    title: "Headworks",
    title2: "Intake & Diversion",
    title3: "Capturing the Flow",
    contentData: [
      {
        title: "River Intake",
        para:
          "Water is diverted from the river through a controlled intake structure.",
      },
      {
        title: "Desilting Basin",
        para:
          "Removes sediment and protects downstream hydraulic equipment.",
      },
      {
        title: "Flow Regulation",
        para:
          "Gates and control structures regulate the water entering the system.",
      },
    ],
  },
  {
    icon: "tunnel",
    title: "Headrace Tunnels",
    title2: "Headrace System",
    title3: "Moving Water Efficiently",
    contentData: [
      {
        title: "Headrace Tunnel",
        para:
          "Carries diverted water from the intake toward the powerhouse.",
      },
      {
        title: "Surge Shaft",
        para:
          "Controls pressure fluctuations during changes in turbine operation.",
      },
      {
        title: "Penstock",
        para:
          "Delivers high-pressure water from the surge system to the turbines.",
      },
    ],
  },
  {
    icon: "turbine",
    title: "Surge Shaft",
    title2: "Turbine Conversion",
    title3: "Turning Head into Motion",
    contentData: [
      {
        title: "Water Pressure",
        para:
          "Available hydraulic head creates pressure and velocity at the turbine.",
      },
      {
        title: "Turbine Runner",
        para:
          "Water drives the runner and converts hydraulic energy into mechanical energy.",
      },
      {
        title: "Draft Tube",
        para:
          "Recovers kinetic energy and directs discharged water toward the tailrace.",
      },
    ],
  },
  {
    icon: "power",
    title: "Penstock",
    title2: "Generator System",
    title3: "Mechanical to Electrical",
    contentData: [
      {
        title: "Generator Shaft",
        para:
          "The turbine shaft transfers rotational energy to the generator.",
      },
      {
        title: "Generator",
        para:
          "Mechanical rotation is converted into electrical power.",
      },
      {
        title: "Transformer",
        para:
          "Generated voltage is stepped up for efficient power transmission.",
      },
    ],
  },
  {
    icon: "share",
    title: "Power Evacuation",
    title2: "Transmission",
    title3: "Delivering Power to the Grid",
    contentData: [
      {
        title: "Switchyard",
        para:
          "Controls and protects the electrical connection between the plant and grid.",
      },
      {
        title: "Transmission Line",
        para:
          "Carries generated electricity from the powerhouse to the grid connection point.",
      },
      {
        title: "Grid Connection",
        para:
          "Power is delivered to the national transmission network.",
      },
    ],
  },
];

// =====================================================
// CONSTANTS
// =====================================================

const EMPTY_CARD = {
  icon: "",
  title: "",
  title2: "",
  title3: "",
  contentData: [],
};

// =====================================================
// ICON CONFIG
// =====================================================

const CARD_ICONS = {
  river: <FaHouseFloodWater />,
  tunnel: <TbBuildingTunnel />,
  turbine: <FaArrowUpFromGroundWater />,
  power: <FaHouseFloodWaterCircleArrowRight />,
  share: <FaConfluence />,
};

const ICON_OPTIONS = [
  {
    name: "river",
    component: <FaHouseFloodWater size={28} />,
  },
  {
    name: "tunnel",
    component: <TbBuildingTunnel size={28} />,
  },
  {
    name: "turbine",
    component: <FaArrowUpFromGroundWater size={28} />,
  },
  {
    name: "power",
    component: <FaHouseFloodWaterCircleArrowRight size={28} />,
  },
  {
    name: "share",
    component: <FaConfluence size={28} />,
  },
];

const getCardIcon = (icon) =>
  CARD_ICONS[icon] ?? <HiOutlineKey />;

// =====================================================
// PAGE
// =====================================================

export default function ProjectOverviewPage() {
  const [waterWireCards, setWaterWireCards] =
    useState(water_to_wire);

const [expandedWaterWireCards, setExpandedWaterWireCards] =
  useState({});

  const toggleWaterWireCard = (index) => {
  setExpandedWaterWireCards((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};


  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] =
    useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);
  const [cardToDelete, setCardToDelete] =
    useState(null);

  const [editWaterWireCard, setEditWaterWireCard] =
    useState(EMPTY_CARD);

  // =====================================================
  // EDITOR HELPERS
  // =====================================================

  const resetEditor = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedCardIndex(null);
    setEditWaterWireCard(EMPTY_CARD);
  };

  const updateField = (field, value) => {
    setEditWaterWireCard((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateCard = () => {
    const fields = [
      ["title", "Please enter a title"],
      ["title2", "Please enter the secondary title"],
      ["title3", "Please enter the third title"],
    ];

    for (const [field, message] of fields) {
      if (!editWaterWireCard[field].trim()) {
        toast.error(message);
        return false;
      }
    }

    if (!editWaterWireCard.icon) {
      toast.error("Please select an icon");
      return false;
    }

    for (
      let i = 0;
      i < editWaterWireCard.contentData.length;
      i++
    ) {
      const content = editWaterWireCard.contentData[i];

      if (!content.title.trim() || !content.para.trim()) {
        toast.error(
          `Please complete the title and paragraph in content item ${
            i + 1
          }`
        );

        return false;
      }
    }

    return true;
  };

  const buildCard = () => ({
    icon: editWaterWireCard.icon,
    title: editWaterWireCard.title.trim(),
    title2: editWaterWireCard.title2.trim(),
    title3: editWaterWireCard.title3.trim(),
    contentData: editWaterWireCard.contentData.map(
      (content) => ({
        title: content.title.trim(),
        para: content.para.trim(),
      })
    ),
  });

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEditWaterWireCard = (index) => {
    const card = waterWireCards[index];

    if (!card) {
      toast.error("Card not found");
      return;
    }

    setSelectedCardIndex(index);

    setEditWaterWireCard({
      icon: card.icon || "",
      title: card.title || "",
      title2: card.title2 || "",
      title3: card.title3 || "",
      contentData: Array.isArray(card.contentData)
        ? card.contentData.map((item) => ({
            title: item.title || "",
            para: item.para || "",
          }))
        : [],
    });

    setIsEditing(true);
  };

  // =====================================================
  // OPEN ADD
  // =====================================================

  const handleOpenAddWaterWireCard = () => {
    setSelectedCardIndex(null);
    setEditWaterWireCard(EMPTY_CARD);
    setIsAdding(true);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const openDeleteModal = (index) => {
    if (!waterWireCards[index]) {
      toast.error("Card not found");
      return;
    }

    setCardToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCardToDelete(null);
  };

  const confirmDelete = () => {
    if (cardToDelete === null) return;

    const card = waterWireCards[cardToDelete];

    if (!card) {
      toast.error("Card not found");
      closeDeleteModal();
      return;
    }

    console.log("Deleted Water to Wire Card:", card);

    setWaterWireCards((prev) =>
      prev.filter((_, index) => index !== cardToDelete)
    );

    toast.success(
      "Water to Wire system removed successfully."
    );

    closeDeleteModal();
  };

  // =====================================================
  // CONTENT MANAGEMENT
  // =====================================================

  const handleAddWaterContent = () => {
    setEditWaterWireCard((prev) => ({
      ...prev,
      contentData: [
        ...prev.contentData,
        {
          title: "",
          para: "",
        },
      ],
    }));
  };

  const handleRemoveWaterContent = (contentIndex) => {
    setEditWaterWireCard((prev) => ({
      ...prev,
      contentData: prev.contentData.filter(
        (_, index) => index !== contentIndex
      ),
    }));
  };

  const handleWaterContentChange = (
    contentIndex,
    field,
    value
  ) => {
    setEditWaterWireCard((prev) => ({
      ...prev,
      contentData: prev.contentData.map(
        (content, index) =>
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
  // ADD CARD
  // =====================================================

  const handleAddWaterWireCard = () => {
    if (!validateCard()) return;

    const newCard = buildCard();

    console.log("Added Water to Wire Card:", newCard);

    setWaterWireCards((prev) => [
      ...prev,
      newCard,
    ]);

    toast.success(
      "Water to Wire system added successfully"
    );

    resetEditor();
  };

  // =====================================================
  // UPDATE CARD
  // =====================================================

  const handleUpdateWaterWireCard = () => {
    if (selectedCardIndex === null) {
      toast.error("No card selected");
      return;
    }

    if (!validateCard()) return;

    const updatedCard = buildCard();

    console.log(
      "Updated Water to Wire Card:",
      updatedCard
    );

    setWaterWireCards((prev) =>
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
      "Water to Wire System updated successfully"
    );

    resetEditor();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* =================================================
            WATER TO WIRE SYSTEM
        ================================================= */}

        <section className="mb-14">

          {/* SECTION HEADER */}

          <div className="mb-6">

            <div className="flex items-center gap-4 justify-between">

              <h2 className="text-sm font-medium tracking-[0.12em] text-[#005596] uppercase">
                WATER TO WIRE SYSTEM
              </h2>

              <button
                type="button"
                onClick={handleOpenAddWaterWireCard}
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
              The complete hydraulic and energy conversion
              path from water intake to electrical generation.
            </p>

          </div>

          {/* =================================================
              CARDS
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">

            {waterWireCards.map((card, index) => (

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
                    onClick={() =>
                      handleEditWaterWireCard(index)
                    }
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
                    onClick={() =>
                      openDeleteModal(index)
                    }
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

                {/* SECONDARY TITLE */}

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

                {/* THIRD TITLE */}

                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-1
                  "
                >
                  {card.title3}
                </p>

                <div className="border-t border-blue-100 my-5" />

                {/* =================================================
                  COLLAPSIBLE SYSTEM CONTENT
              ================================================= */}

              {Array.isArray(card.contentData) &&
              card.contentData.length > 0 ? (
                <div className="mt-5">

                  {/* CONTENT TOGGLE */}

                  <button
                    type="button"
                    onClick={() => toggleWaterWireCard(index)}
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

                      {/* COUNT */}

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
                          ? "component"
                          : "components"}
                      </span>


                    </div>

                    {/* TOGGLE */}

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
                      {expandedWaterWireCards[index]
                        ? "Hide details"
                        : "Show details"}

                        <FaCaretDown
                        className={`
                          w-4
                          h-4
                          transition-transform
                          duration-200
                          ${expandedWaterWireCards[index] ? "rotate-180" : ""}
                        `}
                      />

                    </span>
                  </button>

                  {/* EXPANDED CONTENT */}

                  {expandedWaterWireCards[index] && (
                    <div
                      className="
                        mt-2
                        space-y-3
                        animate-in
                        fade-in
                        slide-in-from-top-1
                        duration-200
                      "
                    >
                      {card.contentData.map(
                        (content, contentIndex) => (
                          <div
                            key={`${content.title}-${contentIndex}`}
                            className="
                              rounded-xl
                              bg-slate-50
                              border
                              border-slate-100
                              p-4
                              hover:border-slate-200
                              transition-colors
                            "
                          >
                            <h4
                              className="
                                text-sm
                                font-semibold
                                text-slate-800
                              "
                            >
                              {content.title}
                            </h4>

                            <p
                              className="
                                text-sm
                                leading-6
                                text-slate-500
                                mt-1
                              "
                            >
                              {content.para}
                            </p>
                          </div>
                        )
                      )}
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
                  No system information added.
                </div>
              )}


              </div>

            ))}

          </div>

        </section>

        {/* =================================================
            DELETE MODAL
        ================================================= */}

        <DestroyerPopup
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title="Remove Water to Wire System?"
          primaryAction={confirmDelete}
          actionText="Yes, Delete"
        >
          <p>
            This action cannot be undone. This Water to Wire
            system card will be permanently removed.
          </p>
        </DestroyerPopup>

        {/* =================================================
            ADD / EDIT POPUP
        ================================================= */}

        <DestroyerPopup
          isOpen={isEditing || isAdding}
          onClose={resetEditor}
          title={
            isAdding
              ? "Add Water to Wire System"
              : "Update Water to Wire System"
          }
          primaryAction={
            isAdding
              ? handleAddWaterWireCard
              : handleUpdateWaterWireCard
          }
          actionText={isAdding ? "Add Item" : "Update"}
        >

          <div className="space-y-6">

            {/* TITLE */}

            <FormField
              label="Main Title"
              value={editWaterWireCard.title}
              onChange={(value) =>
                updateField("title", value)
              }
            />

            {/* TITLE 2 */}

            <FormField
              label="Secondary Title"
              value={editWaterWireCard.title2}
              onChange={(value) =>
                updateField("title2", value)
              }
            />

            {/* TITLE 3 */}

            <FormField
              label="Description Title"
              value={editWaterWireCard.title3}
              onChange={(value) =>
                updateField("title3", value)
              }
            />

            {/* ICON */}

            <IconSelector
              value={editWaterWireCard.icon}
              onChange={(icon) =>
                updateField("icon", icon)
              }
            />

            {/* CONTENT */}

            <div>

              <div className="flex items-center justify-between mb-3">

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                    <HiOutlineViewGrid className="text-indigo-500" />

                    System Content

                  </label>

                  <p className="text-xs text-slate-400 mt-1">
                    Add short titles and descriptions
                    for this system stage.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={handleAddWaterContent}
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

                {editWaterWireCard.contentData.map(
                  (content, contentIndex) => (

                    <ContentRow
                      key={contentIndex}
                      content={content}
                      index={contentIndex}
                      onChange={handleWaterContentChange}
                      onRemove={handleRemoveWaterContent}
                    />

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
// FORM FIELD
// =====================================================

function FormField({
  label,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
        "
      />

    </div>
  );
}

// =====================================================
// CONTENT ROW
// =====================================================

function ContentRow({
  content,
  index,
  onChange,
  onRemove,
}) {
  return (
    <div
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

      <button
        type="button"
        onClick={() => onRemove(index)}
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

      <div className="space-y-3">

        {/* CONTENT TITLE */}

        <div>

          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Content Title
          </label>

          <input
            type="text"
            value={content.title}
            onChange={(e) =>
              onChange(
                index,
                "title",
                e.target.value
              )
            }
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

        {/* DESCRIPTION */}

        <div>

          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Description
          </label>

          <textarea
            value={content.para}
            onChange={(e) =>
              onChange(
                index,
                "para",
                e.target.value
              )
            }
            rows={3}
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
              resize-none
            "
          />

        </div>

      </div>

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
  return (
    <div>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">

        <HiOutlineKey className="text-indigo-500" />

        Category Icon

      </label>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">

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

              ${
                value === icon.name
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
