// components/FontScaleProvider.jsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function FontScaleProvider() {
  const fontScale = useSelector((state) => state.accessibility.fontScale);

  console.log(fontScale, "FF")

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  return null;
}