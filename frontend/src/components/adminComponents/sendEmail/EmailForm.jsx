


"use client";

import TinyLoader from "@/components/reusable/loader/TinyLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * <EmailForm
 *   email       = "user@example.com"       ← recipient (can be editable or locked)
 *   subject     = "You're invited!"
 *   paragraph   = "Click the button below to register…"
 *   buttonText  = "Register Now"           ← optional, hides button if omitted
 *   buttonLink  = "https://…"              ← optional
 *   isLinkCreated = {true}                 ← controls visibility of the Send button
 *   logoUrl     = "https://…/logo.png"     ← optional
 * />
 */
export default function EmailForm({
  email,
  subject,
  paragraph,
  buttonText,
  buttonLink,
  isLinkCreated,
  logoUrl,
}) {
  const [form, setForm] = useState({
    to: email || "",
    subject: subject || "",
    paragraph: paragraph || "",
    buttonText: buttonText || "",
    buttonLink: buttonLink || "",
  });
  const [sending, setSending] = useState(false);
  const [toError, setToError] = useState("");

  // Sync whenever parent props change (e.g. link gets created)
  useEffect(() => {
    setForm({
      to: email || "",
      subject: subject || "",
      paragraph: paragraph || "",
      buttonText: buttonText || "",
      buttonLink: buttonLink || "",
    });
  }, [email, subject, paragraph, buttonText, buttonLink]);

  function handleToChange(v) {
    setForm((f) => ({ ...f, to: v }));
    setToError(v && !EMAIL_RE.test(v.trim()) ? "Enter a valid email address." : "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    if (!EMAIL_RE.test(form.to.trim())) {
      setToError("Enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: form.to,
          subject: form.subject,
          paragraph: form.paragraph,
          buttonText: form.buttonText || undefined,
          buttonLink: form.buttonLink || undefined,
          logoUrl: logoUrl || "https://i.imgur.com/pcrXLsK.png",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      toast.success(`Email sent to ${form.to}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send email.", {
        id: "email-error",
      });
    } finally {
      setSending(false);
    }
  }

  const isDisabled =
    sending || !form.to || !form.subject || !form.paragraph || !!toError;

  if (!isLinkCreated) return null;

  // console.log(sending, "sending")

      if(sending) return  <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
      <div>Getting Ready</div>
    </div>;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Hidden email field — value still submitted */}
      <input type="hidden" value={form.to} />

      {toError && (
        <span className="flex items-center gap-1 text-xs text-red-500 mb-2">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4.5zm0 7a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
          {toError}
        </span>
      )}

      {/* <button
        type="submit"
        disabled={isDisabled}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   cursor-pointer text-white px-6 py-3 rounded-lg transition font-medium"
      >
        {sending ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>
            <svg className="w-4 h-4 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Resend Email
          </>
        )}
      </button> */}

{
  sending && (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
      <div>Getting Ready</div>
    </div>
  )
}
    </form>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" className="opacity-30" />
      <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}
