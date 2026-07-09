"use client";

import { useCountdown } from "@/utils/CountDownHook";

export default function InvitationCountdown({ expiresAt, status }) {
  const { expired, formatted } = useCountdown(expiresAt, 48);

  if (status === "used") return null;

  return (
    <p className="text-sm text-red-500">
      {expired ? "Link Has Expired" : `Link will expire in ${formatted}`}
    </p>
  );
}