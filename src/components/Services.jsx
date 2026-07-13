"use client";

import { motion } from "framer-motion";
import {
  Compass,
  HardHat,
  Calculator,
  Building2,
  Map,
  Landmark,
} from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Building Plans (As Per Vaastu)",
    desc: "Residential & commercial building plans designed with full Vaastu compliance and municipal approval standards.",
  },
  {
    icon: HardHat,
    title: "Site Supervision",
    desc: "On-site quality checks at every stage of construction — from foundation to finishing.",
  },
  {
    icon: Calculator,
    title: "Estimates & Valuations",
    desc: "Accurate cost estimation and certified property valuations for loans, sales, and planning.",
  },
  {
    icon: Building2,
    title: "Building Construction",
    desc: "Complete end-to-end construction works with quality materials and skilled workmanship.",
  },
  {
    icon: Map,
    title: "Layouts & Registration Plans",
    desc: "Approved layout designs and registration plans prepared as per municipal norms.",
  },
  {
    icon: Landmark,
    title: "Real Estate & Development",
    desc: "Plots, projects, and property development consulting in and around Nirmal.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Our Services
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">
            We Undertake The Following Works
          </h2>
          <p className="mt-3 text-ink-light">
            One team for everything — from the first drawing to the final brick.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <s.icon size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-light">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}