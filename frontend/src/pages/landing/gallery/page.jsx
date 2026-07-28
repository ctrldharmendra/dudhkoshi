import React from 'react';
import GalleryClient from './GalleryClient';
import img1 from "../../../../public/landing/gallery/img1.png"
import img2 from "../../../../public/landing/gallery/img2.png"
import img3 from "../../../../public/landing/gallery/img4.jpg"


// SSR Data Fetcher function
async function getGalleryData() {
  // Replace this array or fetch call with your backend CMS or API endpoint:
  // const res = await fetch('https://api.yourdomain.com/gallery', { cache: 'no-store' });
  // return res.json();

  return [
    {
      id: 1,
      image: img3,
      title: "Dam & Hydropower Reservoir",
      category: "infrastructure",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      title: "Community Outreach Event",
      category: "Events",
    },
    {
      id: 3,
      image:img1,
      title: "Local Hydropower Valley",
      category: "Communities",
    },
    {
      id: 4,
      image: img2,
      title: "Site Engineering Inspection",
      category: "infrastructure",
    },
  ];
}

export default async function GalleryPage() {
  // Fetched server-side on each request
  const galleryData = await getGalleryData();

  // console.log(galleryData)
  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-white via-sky-50/40 to-white font-sans antialiased"
      style={{
        '--landingPagePrimaryColor': '#1E7EBB',
        '--textColorOnLightBg': '#45484D',
      }}
    >
      <GalleryClient initialGallery={galleryData} />
    </main>
  );
}