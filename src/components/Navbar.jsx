'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { site } from '@/data/site';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/* Reusable: button that reveals both numbers */
function CallMenu({ compact = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        <Phone size={16} />
        Call Now
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg ${
            compact ? 'left-0' : 'right-0'
          }`}
        >
          {site.team.map((m) => (
            <a
              key={m.phone}
              href={`tel:${m.phone}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Phone size={16} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {m.name}
                </p>
                <p className="text-xs text-ink-light">{m.phoneDisplay}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-brand">
            AK
          </span>
          <span className="text-lg font-bold text-ink">ASSOCIATES</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink-light transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Call menu (desktop) */}
        <div className="hidden md:block">
          <CallMenu />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <ul className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-ink hover:text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <CallMenu compact />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
