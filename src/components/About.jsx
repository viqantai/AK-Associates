'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { site } from '@/data/site';

const points = [
  {
    title: 'Municipal Licensed Engineer',
    desc: 'Officially licensed — plans and approvals handled the right way.',
  },
  {
    title: 'Vaastu-Compliant Designs',
    desc: 'Every plan balances modern design with traditional Vaastu principles.',
  },
  {
    title: 'Transparent Estimates',
    desc: 'Clear, itemized costing — no hidden charges, no surprises.',
  },
  {
    title: 'Local Expertise in Nirmal',
    desc: 'Deep knowledge of local rules, land, materials, and contractors.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
        {/* Left: image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div
            className="h-80 rounded-2xl bg-cover bg-center shadow-lg md:h-[28rem]"
            style={{ backgroundImage: `url('${site.aboutImage}')` }}
          />
          {/* Experience badge */}
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-brand px-6 py-4 text-white shadow-lg">
            <p className="text-3xl font-extrabold">30+</p>
            <p className="text-sm font-medium">Years of Experience</p>
          </div>
        </motion.div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            About Us
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">
            Why Choose {site.name}?
          </h2>
          <p className="mt-4 leading-relaxed text-ink-light">
            Led by <strong className="text-ink">{site.owner}</strong>,{' '}
            {site.ownerTitle.toLowerCase()}, {site.name} has been serving Nirmal
            and surrounding areas with reliable architectural, engineering, and
            construction services. From a single house plan to complete real
            estate development — we handle it all under one roof.
          </p>

          <ul className="mt-8 space-y-5">
            {points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-brand"
                  size={22}
                />
                <div>
                  <h3 className="font-bold text-ink">{p.title}</h3>
                  <p className="text-sm text-ink-light">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
