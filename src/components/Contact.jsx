'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { site, waLink } from '@/data/site';

const items = [
  {
    icon: Phone,
    label: 'Call Us',
    links: site.team.map((m) => ({
      text: m.phoneDisplay,
      href: `tel:${m.phone}`,
    })),
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    links: [{ text: 'Chat with us', href: waLink, external: true }],
  },
  {
    icon: Mail,
    label: 'Email',
    links: site.team.map((m) => ({
      text: m.email,
      href: `mailto:${m.email}`,
    })),
  },
  {
    icon: MapPin,
    label: 'Address',
    links: [
      {
        text: site.address,
        href:
          'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent('Vijay Laxmi Complex Indira Nagar Nirmal 504106'),
        external: true,
      },
    ],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-ink py-20 md:py-28">
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
            Contact Us
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
            Let&apos;s Build Something Together
          </h2>
          <p className="mt-3 text-gray-400">
            Call, WhatsApp, or visit us — free consultation for your project.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Left: contact cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-brand hover:bg-white/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 font-bold text-white">{item.label}</h3>
                <div className="mt-1 space-y-1">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="block break-words text-sm text-gray-400 transition-colors hover:text-brand"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Working hours (not a link) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:col-span-2"
            >
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-brand" />
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Mon – Sat:</span>{' '}
                  9:00 AM – 7:00 PM
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Google Map embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-white/10"
          >
            <iframe
              title="AK Associates Location"
              src="https://www.google.com/maps?q=Indira+Nagar+Main+Road,+Nirmal,+Telangana+504106&output=embed"
              className="h-80 w-full lg:h-full"
              style={{ border: 0, minHeight: '320px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
