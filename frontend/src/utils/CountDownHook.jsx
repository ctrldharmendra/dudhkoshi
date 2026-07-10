"use client";

import { useEffect, useState } from "react";

export function useCountdown(expiresAt, subtractHours = 0) {
const calculateRemaining = () => {
  if (!expiresAt) return 0;

  const expiryTime = new Date(expiresAt).getTime();
  const now = Date.now();

  return Math.max(expiryTime - now, 0);
};

  const [remaining, setRemaining] = useState(calculateRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(calculateRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, subtractHours]);

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    expired: remaining === 0,
    days,
    hours,
    minutes,
    seconds,
    formatted: `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`,
  };
}