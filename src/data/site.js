// src/data/site.js

export const site = {
  name: "AK Associates",
  tagline: "Architects, Engineers, Consultants, Builders & Real Estate",
  owner: "Mirza Nazeer Ali Baig",
  ownerTitle: "Municipal Licensed Engineer",

  // 👇 EDIT THESE
  phone: "+919848170785",          // used for tel: and wa.me links
  phoneDisplay: "+91 98481 70785", // shown on screen
  email: "your-email@gmail.com",   // <-- put real email here

  address:
    "Vijay Laxmi Complex, Near Chain Gate, Indira Nagar Main Road, Nirmal - 504106",

  whatsappMessage: "Hi, I would like to enquire about building plans / construction.",
  web3formsKey: "3ce4a2e0-ea78-499e-bfb2-f509ab8ef217",
};

export const waLink = `https://wa.me/${site.phone.replace("+", "")}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;

export const telLink = `tel:${site.phone}`;
export const mailLink = `mailto:${site.email}`;