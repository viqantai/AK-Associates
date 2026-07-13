'use client';

import { motion } from 'framer-motion';
import { PhoneCall, ClipboardCheck, IndianRupee } from 'lucide-react';
import LeadForm from './LeadForm';

const points = [
  {
    icon: PhoneCall,
    title: 'Callback Within Hours',
    desc: 'Share your details and our engineer calls you back the same day.',
  },
  {
    icon: ClipboardCheck,
    title: 'Free Site Discussion',
    desc: 'We understand your plot, requirement, and Vaastu preferences first.',
  },
  {
    icon: IndianRupee,
    title: 'Transparent Estimate',
    desc: 'Clear, itemized costing before any commitment — no hidden charges.',
  },
];

export default function Consultation() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-ink py-16 md:py-20"
    >
      {/* subtle brand glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
        {/* Left: why fill this form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Free Consultation
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
            Planning to Build? Start Here.
          </h2>
          <p className="mt-3 text-gray-400">
            Tell us about your plot or project — we&apos;ll guide you on plans,
            approvals, and costs before you spend a rupee.
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <p.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: the form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}
