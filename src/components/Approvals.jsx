"use client";

import { motion } from "framer-motion";
import { FileCheck2, Stamp, Landmark, Map, Building, ScrollText } from "lucide-react";

const approvals = [
  { icon: Stamp, title: "Municipality Permission Plans" },
  { icon: FileCheck2, title: "Building Approval Drawings" },
  { icon: Map, title: "Layout Approval" },
  { icon: Landmark, title: "DTCP Approval Assistance" },
  { icon: Building, title: "HMDA Approval Assistance" },
  { icon: ScrollText, title: "Panchayat Approval Plans" },
];

export default function Approvals() {
  return (
    <section id="approvals" className="bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Government Approvals
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
            We Handle The Paperwork For You
          </h2>
          <p className="mt-3 text-gray-400">
            From municipality permissions to DTCP &amp; HMDA — as a Municipal
            Licensed Engineer, we manage the complete approval process.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {approvals.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur transition-colors hover:border-brand"
            >
              <a.icon size={26} className="text-brand" />
              <p className="text-sm font-semibold text-white">{a.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}