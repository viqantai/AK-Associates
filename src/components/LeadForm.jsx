"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/data/site";

export default function LeadForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", site.web3formsKey);
    formData.append("subject", "New Enquiry — AK Associates Website");
    formData.append("from_name", "AK Associates Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
        <CheckCircle2 size={48} className="text-green-500" />
        <h3 className="mt-4 text-xl font-bold text-white">
          Enquiry Received!
        </h3>
        <p className="mt-2 text-sm text-gray-300">
          Thank you — we&apos;ll call you back shortly. For urgent queries,
          call {site.phoneDisplay}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-7"
    >
      <h3 className="text-lg font-bold text-white">
        Get a Free Consultation
      </h3>
      <p className="mt-1 text-xs text-gray-400">
        Fill this and we&apos;ll call you back — no obligations.
      </p>

      {/* honeypot anti-spam (hidden from humans) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mt-5 space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Full Name *"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition-colors focus:border-brand"
        />
        <input
          type="tel"
          name="phone"
          required
          pattern="[0-9+\s\-]{10,15}"
          placeholder="Mobile Number *"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition-colors focus:border-brand"
        />
        <input
          type="text"
          name="location"
          placeholder="Plot / Site Location"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition-colors focus:border-brand"
        />
        <select
          name="service"
          defaultValue=""
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-300 outline-none transition-colors focus:border-brand [&>option]:text-ink"
        >
          <option value="" disabled>
            What do you need?
          </option>
          <option>Building Plan (Vaastu)</option>
          <option>Construction Work</option>
          <option>Estimate / Valuation</option>
          <option>Layout / Registration Plan</option>
          <option>Real Estate / Plot</option>
          <option>Other</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={18} /> Request Callback
          </>
        )}
      </button>

      {status === "error" && (
        <p className="mt-3 text-center text-xs text-red-400">
          Something went wrong. Please call us directly at {site.phoneDisplay}.
        </p>
      )}

      <p className="mt-3 text-center text-[11px] text-gray-500">
        Your details are safe. No spam, no unsolicited calls.
      </p>
    </form>
  );
}