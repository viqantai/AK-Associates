// src/data/site.js

export const site = {
  name: 'AK Associates',
  subName: 'AK Builders & Construction',
  tagline: 'Architects, Engineers, Consultants, Builders & Real Estate',

  // Primary contact (used for navbar, floating buttons, WhatsApp)
  phone: '+919848170785',
  phoneDisplay: '+91 98481 70785',
  email: 'Nazeerbaigeng@gmail.com',

  team: [
    {
      name: 'Mirza Nazeer Ali Baig',
      role: 'Founder — Municipal Licensed Engineer',
      phone: '+919848170785',
      phoneDisplay: '+91 98481 70785',
      email: 'Nazeerbaigeng@gmail.com',
      photo: '/team/mirza_nazeer_ali.jpeg',
    },
    {
      name: 'Mirza Asad Ali Baig',
      role: 'Civil Engineer',
      phone: '+919000229828',
      phoneDisplay: '+91 90002 29828',
      email: 'asadalibaig786@gmail.com',
      photo: '/team/mirza_asad_ali.jpeg',
    },
  ],

  aboutImage: '/about/about_1.jpg',

  address:
    'Vijay Laxmi Complex, Near Chain Gate, Indira Nagar Main Road, Nirmal - 504106',

  whatsappMessage:
    'Hi, I would like to enquire about building plans / construction.',

  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
};

export const waLink = `https://wa.me/${site.phone.replace('+', '')}?text=${encodeURIComponent(site.whatsappMessage)}`;
export const telLink = `tel:${site.phone}`;
export const mailLink = `mailto:${site.email}`;

site.owner = site.team[0].name;
site.ownerTitle = 'Municipal Licensed Engineer';
