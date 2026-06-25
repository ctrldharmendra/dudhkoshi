"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";


// ─── tiny email regex ──────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailForm({email, subject, body, isLinkCreated}) {


  const [form, setForm] = useState({
    to: email || "",
    subject: subject || "",
    message: body || "",
  });
  const [sending, setSending] = useState(false);
  const [toError, setToError] = useState("");


useEffect(() => {
  setForm({
    to: email || "",
    subject: subject || "",
    message: body || "",
  });
}, [email, subject, body]);


  // live-validate the To field
  function handleToChange(v) {
    setForm((f) => ({ ...f, to: v }));

    if (v && !EMAIL_RE.test(v.trim())) {
      setToError("Enter a valid email address.");
    } else {
      setToError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!EMAIL_RE.test(form.to.trim())) {
      setToError("Enter a valid email address.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      toast.success(`Email sent to ${form.to}`, { id: "email-sent" });
    //   setForm(EMPTY);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to send email.";

      toast.error(msg, { id: "email-error" });
    } finally {
      setSending(false);
    }
  }

  const isDisabled =
    sending || !form.to || !form.subject || !form.message || !!toError;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* To */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase hidden tracking-widest text-slate">
          To
        </label>

        <input
          type="email"
          disabled
          placeholder="recipient@example.com"
          value={form.to || ""}
        //   onChange={(e) => handleToChange(e.target.value)}
          className={`input-base hidden ${
            toError
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : ""
          }`}
          required
        />

        {toError && (
          <span className="flex items-center gap-1 text-xs text-danger mt-0.5">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4.5zm0 7a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
            {toError}
          </span>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-widest text-slate">
          Subject
        </label>

        <input
          type="text"
          disabled
          placeholder="What's this about?"
          value={form.subject || ""}
          className="input-base"
          required
        />
      </div>

      {/* Messagetextarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-widest text-slate">
          Message
        </label>

        <textarea
         readOnly
          rows={6}
          disabled
          placeholder="Write your message here…"
          value={form.message || ""}
          className="input-base resize-none"
          required
        />
      </div>

      {/* Divider */}
      <div className="border-t border-mist" />

      {/* Submit */}

      {
        isLinkCreated && (
      <button
        type="submit"
        className="
         bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white px-6 py-3 rounded-lg transition font-medium
        "
      >
        {sending ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>

            Send Email
          </>
        )}
      </button>
        )
      }
    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        d="M12 2a10 10 0 0 1 10 10"
        className="opacity-30"
      />
      <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}