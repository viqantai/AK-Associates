'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, BadgeCheck } from 'lucide-react';
import { site } from '@/data/site';

export default function Team() {
  return (
    <section id="team" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Our Team
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">
            The Engineers Behind Your Project
          </h2>
          <p className="mt-3 text-ink-light">
            Talk directly to the people who plan, approve, and build — no
            middlemen.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-2">
          {site.team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Photo — full image visible, blurred fill behind */}
              <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                {/* blurred background layer */}
                <img
                  src={member.photo}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-150 object-cover blur-2xl brightness-90 saturate-150"
                />
                {/* subtle dark tint over the blur so foreground pops */}
                <div className="absolute inset-0 bg-ink/20" />
                {/* full image on top */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className="relative h-full w-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                  {member.name}
                  <BadgeCheck size={18} className="shrink-0 text-brand" />
                </h3>
                <p className="mt-1 text-sm font-medium text-brand">
                  {member.role}
                </p>

                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-sm text-ink-light transition-colors hover:text-brand"
                  >
                    <Phone size={15} className="text-brand" />
                    {member.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 break-all text-sm text-ink-light transition-colors hover:text-brand"
                  >
                    <Mail size={15} className="text-brand" />
                    {member.email}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
