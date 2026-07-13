import { Phone, Mail, MapPin } from 'lucide-react';
import { site, telLink, mailLink } from '@/data/site';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="text-xl font-extrabold">
            <span className="text-brand">AK</span>{' '}
            <span className="text-white">ASSOCIATES</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            {site.tagline}. Led by {site.owner}, {site.ownerTitle}.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-brand">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
              {site.address}
            </li>

            {site.team.map((member) => (
              <li key={member.name} className="space-y-1.5">
                <p className="font-semibold text-white">{member.name}</p>
                <a
                  href={`tel:${member.phone}`}
                  className="flex gap-3 transition-colors hover:text-brand"
                >
                  <Phone size={18} className="shrink-0 text-brand" />
                  {member.phoneDisplay}
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="flex gap-3 break-all transition-colors hover:text-brand"
                >
                  <Mail size={18} className="shrink-0 text-brand" />
                  {member.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-xs md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Powered by{' '}
            <a
              href="https://www.viqantai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-300 transition-colors hover:text-brand"
            >
              ViQantAI TECH SERVICES PVT LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
