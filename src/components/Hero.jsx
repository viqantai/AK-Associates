"use client";

import { motion } from "framer-motion";
import { Phone, FileText, BadgeCheck } from "lucide-react";
import { site, telLink } from "@/data/site";
import HeroScene from "./HeroScene";
import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0f1a]"
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/90 via-[#0a0f1a]/60 to-[#0a0f1a]/40" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-28 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT: existing text content — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
            <BadgeCheck size={16} className="text-brand" />
            {site.owner} — {site.ownerTitle}
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Building Trust.
            <br />
            <span className="text-brand">Designing Futures.</span>
          </h1>

          <p className="mt-5 text-lg text-gray-300">
            {site.tagline} — Nirmal, Telangana. From Vaastu-compliant building
            plans to complete construction, we deliver quality at every stage.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <FileText size={18} />
              Get a Free Estimate
            </a>
            <a
              href={telLink}
              className="flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-ink"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </motion.div>

        {/* RIGHT: lead form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}