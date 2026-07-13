'use client';

import { motion } from 'framer-motion';
import { Phone, FileText, BadgeCheck } from 'lucide-react';
import { site, telLink } from '@/data/site';
import HeroScene from './HeroScene';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0f1a]"
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/90 via-[#0a0f1a]/60 to-[#0a0f1a]/40" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-14 pt-24 sm:px-6 md:px-8 md:pb-16 md:pt-28 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          {/* Engineer badges — stacked */}
          <div className="mb-5 flex flex-col items-start gap-2">
            {site.team.map((member) => (
              <div
                key={member.name}
                className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs text-white backdrop-blur sm:text-sm"
              >
                <BadgeCheck size={15} className="shrink-0 text-brand" />
                <span className="truncate">
                  {member.name} — {member.role.replace('Founder — ', '')}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-6xl">
            Building Trust.
            <br />
            <span className="text-brand">Designing Futures.</span>
          </h1>

          <p className="mt-4 text-base text-gray-300 sm:mt-5 sm:text-lg">
            {site.tagline} — Nirmal, Telangana. From Vaastu-compliant building
            plans to complete construction, we deliver quality at every stage.
          </p>

          {/* CTAs — full-width on phones, inline from sm: */}
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#consultation"
              className="flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <FileText size={18} />
              Get a Free Estimate
            </a>
            <a
              href={telLink}
              className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-ink"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </motion.div>

        {/* RIGHT: founder photo — all screens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm"
        >
          <div className="absolute -inset-6 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur">
            <img
              src={site.team[0].photo}
              alt={site.team[0].name}
              className="h-80 w-full object-cover object-top sm:h-[26rem]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-12 sm:p-5 sm:pt-14">
              <p className="text-base font-bold text-white sm:text-lg">
                {site.team[0].name}
              </p>
              <p className="text-xs font-medium text-brand sm:text-sm">
                {site.team[0].role}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
