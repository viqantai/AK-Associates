import { Geist } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "AK Associates | Building Plans & Construction in Nirmal",
  description:
    "AK Associates — Architects, Engineers, Consultants, Builders & Real Estate in Nirmal, Telangana. Vaastu-compliant building plans, site supervision, estimates, valuations, layouts & construction by Municipal Licensed Engineer Mirza Nazeer Ali Baig. Call +91 98481 70785.",
  keywords: [
    "building plans Nirmal",
    "construction Nirmal",
    "architect Nirmal",
    "Vaastu building plans",
    "licensed engineer Nirmal",
    "real estate Nirmal",
    "layout plans Telangana",
  ],
  openGraph: {
    title: "AK Associates | Building Plans & Construction in Nirmal",
    description:
      "Vaastu-compliant building plans, construction, estimates & real estate in Nirmal, Telangana. Municipal Licensed Engineer.",
    type: "website",
    locale: "en_IN",
    // add url + images after deploy (see note below)
  },
};

// LocalBusiness structured data — helps Google show the business
// for "construction near me" type searches in Nirmal
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  description:
    "Architects, Engineers, Consultants, Builders & Real Estate in Nirmal, Telangana.",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Vijay Laxmi Complex, Near Chain Gate, Indira Nagar Main Road",
    addressLocality: "Nirmal",
    addressRegion: "Telangana",
    postalCode: "504106",
    addressCountry: "IN",
  },
  founder: {
    "@type": "Person",
    name: site.owner,
    jobTitle: site.ownerTitle,
  },
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "₹₹",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}