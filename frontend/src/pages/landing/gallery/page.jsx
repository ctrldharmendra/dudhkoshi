
import React from 'react';
import GalleryClient from './GalleryClient';


import img1 from "../../../../public/landing/realImage/1.jpeg";
import img2 from "../../../../public/landing/realImage/2.jpeg";
import img3 from "../../../../public/landing/realImage/3.jpeg";
import img4 from "../../../../public/landing/realImage/4.jpeg";
import img5 from "../../../../public/landing/realImage/5.jpeg";
import img6 from "../../../../public/landing/realImage/6.jpeg";
import img7 from "../../../../public/landing/realImage/7.jpeg";
import img8 from "../../../../public/landing/realImage/8.png";   
import img9 from "../../../../public/landing/realImage/9.png";
import img10 from "../../../../public/landing/realImage/10.png";
import img11 from "../../../../public/landing/realImage/11.png";
import img12 from "../../../../public/landing/realImage/12.png";


const galleryData = [
  {
    id: 1,
    image: img12,
    title: "Dam & Hydropower Reservoir",
    category: "infrastructure",
  },
  {
    id: 2,
    image: img11,
    title: "Community Outreach Event",
    category: "Inspection",
  },
  {
    id: 3,
    image: img10,
    title: "Hydropower Construction",
    category: "infrastructure",
  },
  {
    id: 4,
    image: img1,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 5,
    image: img2,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 6,
    image: img3,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 7,
    image: img4,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 8,
    image: img5,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 9,
    image: img6,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 10,
    image: img7,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 11,
    image: img8,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
  {
    id: 12,
    image: img9,
    title: "Site Engineering Inspection",
    category: "infrastructure",
  },
];

export default function GalleryPage() {
  return (
    <main
    id="gallery"
      className="galleryBg"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <GalleryClient initialGallery={galleryData} />
    </main>
  );
}