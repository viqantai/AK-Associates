'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Factory,
  Home,
  HardHat,
  ClipboardList,
  Hammer,
  Compass,
  Map,
  Ruler,
  FileCheck2,
  Calculator,
  CalendarClock,
  Landmark,
  Package,
  FileText,
  DraftingCompass,
} from 'lucide-react';

const categories = [
  { id: 'construction', label: 'Construction' },
  { id: 'planning', label: 'Plans & Surveying' },
  { id: 'consultancy', label: 'Consultancy & Management' },
  { id: 'other', label: 'Real Estate & More' },
];

const services = [
  // Construction
  {
    cat: 'construction',
    icon: Home,
    image: '/services/residential.jpg',
    title: 'Residential Building Construction',
    desc: 'Independent houses, duplexes, and apartments built end-to-end with quality materials.',
  },
  {
    cat: 'construction',
    icon: Building2,
    image: '/services/commercial.jpg',
    title: 'Commercial Building Construction',
    desc: 'Shops, offices, and commercial complexes designed for durability and business use.',
  },
  {
    cat: 'construction',
    icon: Factory,
    image: '/services/industrial.jpg',
    title: 'Industrial Building Construction',
    desc: 'Warehouses, sheds, and industrial structures built to spec and safety standards.',
  },
  {
    cat: 'construction',
    icon: Hammer,
    image: '/services/renovation.jpg',
    title: 'Renovation & Remodeling',
    desc: 'Upgrades, extensions, and complete remodels of existing homes and buildings.',
  },
  // Plans & Surveying
  {
    cat: 'planning',
    icon: Compass,
    image: '/services/vaastu.jpg',
    title: 'Vaastu-Compliant Building Plans',
    desc: 'Residential & commercial plans balancing modern design with Vaastu principles.',
  },
  {
    cat: 'planning',
    icon: Ruler,
    image: '/services/survey.jpg',
    title: 'Land Surveying',
    desc: 'Accurate site measurement and boundary surveys for plots and layouts.',
  },
  {
    cat: 'planning',
    icon: Map,
    image: '/services/layout.jpg',
    title: 'Layout Planning & Subdivision',
    desc: 'Layout designs and plot subdivision planning as per municipal norms.',
  },
  {
    cat: 'planning',
    icon: DraftingCompass,
    image: '/services/asbuilt.jpg',
    title: 'As-Built Drawings & Documentation',
    desc: 'Precise as-built drawings and records of completed structures.',
  },
  // Consultancy & Management
  {
    cat: 'consultancy',
    icon: FileText,
    image: '/services/civil.jpg',
    title: 'Civil Engineering Consultancy',
    desc: 'Expert structural and civil engineering guidance for any project stage.',
  },
  {
    cat: 'consultancy',
    icon: HardHat,
    image: '/services/supervision.jpg',
    title: 'Site Supervision & Project Management',
    desc: 'On-site quality checks and complete project management from start to handover.',
  },
  {
    cat: 'consultancy',
    icon: Calculator,
    image: '/services/valuation.jpg',
    title: 'Building Valuation',
    desc: 'Certified property valuations for loans, sales, and legal purposes.',
  },
  {
    cat: 'consultancy',
    icon: CalendarClock,
    image: '/services/planning.jpg',
    title: 'Project Planning & Scheduling',
    desc: 'Realistic timelines, milestones, and cost planning before work begins.',
  },
  // Real Estate & More
  {
    cat: 'other',
    icon: Landmark,
    image: '/services/realestate.jpg',
    title: 'Real Estate Consultancy',
    desc: 'Guidance on plots, property purchase, and development opportunities in Nirmal.',
  },
  {
    cat: 'other',
    icon: Package,
    image: '/services/materials.jpg',
    title: 'Construction Material Supply',
    desc: 'Quality cement, steel, and building materials supplied at fair prices.',
  },
];

export default function Services() {
  const [active, setActive] = useState('construction');
  const visible = services.filter((s) => s.cat === active);

  return (
    <section id="services" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
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
            One team for everything — plans, approvals, construction, and
            beyond.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active === c.id
                  ? 'bg-brand text-white'
                  : 'bg-white text-ink-light hover:text-brand'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => (
              <motion.div
                key={s.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image on top */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* red overlay on hover */}
                  <div className="absolute inset-0 bg-brand/0 transition-colors duration-300 group-hover:bg-brand/20" />
                  {/* icon badge over image */}
                  <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-brand shadow-sm backdrop-blur">
                    <s.icon size={18} />
                  </div>
                </div>

                {/* Text below */}
                <div className="p-5">
                  <h3 className="font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-light">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
