"use client";

import { useEffect, useState } from "react";

const colors = [
  "#ff6b6b",
  "#ffd93d",
  "#6bcBef",
  "#51cf66",
  "#845ef7",
  "#f06595",
];

export default function Confetti() {
  const [show, setShow] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => setShow(false), 20000);
//     return () => clearTimeout(t);
//   }, []);

//   if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        >
          <span
            className="piece"
            style={{
              width: `${4 + Math.random() * 5}px`,
              height: `${10 + Math.random() * 10}px`,
              background:
                colors[Math.floor(Math.random() * colors.length)],
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}