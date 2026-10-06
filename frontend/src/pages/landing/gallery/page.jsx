"use client";

import React from "react";
import GalleryClient from "./GalleryClient";

export default function GalleryPage() {
  return (
    <main
      id="gallery"
      className="galleryBg"
      style={{
        "--landingPagePrimaryColor": "#1E7EBB",
        "--textColorOnLightBg": "#45484D",
      }}
    >
      <GalleryClient />
    </main>
  );
}
