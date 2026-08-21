// Shop configuration for the Panaché Salon OneLink.

import { PUBLIC_SITE_URL } from '../../lib/public-site-url'

export type ContactPersonLabel = 'Salon' | 'Booking'

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string
  phoneDisplay: string
  whatsappE164: string
}

export const shopConfig = {
  name: 'Panaché Salon',
  tagline: 'Luxury Boutique Salon',
  taglineShort: 'Hair • Beauty • Makeup • Chandigarh',
  serviceTagline: 'Hair • Beauty • Makeup',
  snapshotLocationLine: 'SCO 16–17, Ground Floor, Sector 9D, Chandigarh 160009',
  snapshotServicesLine: 'Hair • Beauty • Makeup',
  snapshotHours: 'Daily 10:00 AM - 8:00 PM',
  url: PUBLIC_SITE_URL,
  cardType: 'B2C' as const,
  keywordBadges: ['Luxury Boutique Salon', 'Sector 9D • Chandigarh'] as string[],

  contact: {
    phones: ['6239604348', '9560983067'],
    email: '',
    address: 'SCO 16–17, Ground Floor, Madhya Marg, Sector 9D, Chandigarh – 160009',
    locationLine: 'SCO 16–17, Ground Floor, Sector 9D, Chandigarh',
    mapQuery: 'Panache Salon SCO 16 17 Sector 9D Madhya Marg Chandigarh',
    storeHours: 'Daily 10:00 AM - 8:00 PM',
    storeHoursStatus: 'Open daily',
    officePhone: '6239604348',
    clientPhone: '9560983067',
    clientPhoneE164: '919560983067',
    officePhoneE164: '916239604348',
  },

  branches: [
    { name: 'Panaché Salon', address: 'SCO 16–17, Ground Floor, Madhya Marg, Sector 9D, Chandigarh – 160009', phone: '+91 62396 04348', mapQuery: 'Panache Salon SCO 16 17 Sector 9D Madhya Marg Chandigarh' },
  ],

  contactPersons: [
    { label: 'Salon' as ContactPersonLabel, phoneE164: '916239604348', phoneDisplay: '+91 62396 04348', whatsappE164: '919560983067' },
    { label: 'Booking' as ContactPersonLabel, phoneE164: '919560983067', phoneDisplay: '+91 95609 83067', whatsappE164: '919560983067' },
  ] as ContactPerson[],

  whatsapp: {
    defaultPhone: '9560983067',
    defaultMessage: 'Hi Panaché, I would like to book an appointment.',
    showSelector: false,
    selectorPersons: ['Salon'] as ContactPersonLabel[],
  },

  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/panache_chd/',
    instagramJammu: '',
    twitter: '',
    linkedin: '',
    zomato: '',
  },

  trustBadges: ['Luxury Boutique Salon', 'Sector 9D • Chandigarh'] as string[],
  brands: [
    { name: 'Hair', tagline: '', logo: '' },
    { name: 'Beauty', tagline: '', logo: '' },
    { name: 'Makeup', tagline: '', logo: '' },
    { name: 'Nails', tagline: '', logo: '' },
  ],

  about: {
    title: 'Welcome to Panaché',
    shortDescription: 'A luxury boutique salon in Chandigarh where considered hair, polished beauty, skin, nails and occasion makeup come together through personal consultation and careful craft.',
  },
  menuUrl: '/services',

  // Retained only for the existing OneLink card payment face. The homepage does not promote payment.
  payment: {
    upiId: '', upiId2: '', upiName: 'Panaché Salon', upiQrImageUrl: '', scannerImage: '',
    bank: { bankName: '', accountNumberMasked: '', ifsc: '', accountHolder: '' },
    showScanner: false, showDownloadQR: false,
  },

  google: {
    // Temporary shared listing while Panaché's verified Google Place ID is pending.
    placeId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJq9jGBgGDHjkRqcEyeHk2xtA',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Panache%20Salon%20SCO%2016%2017%20Sector%209D%20Madhya%20Marg%20Chandigarh',
    reviewsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJq9jGBgGDHjkRqcEyeHk2xtA',
  },

  seo: {
    title: 'Panaché Salon | Luxury Boutique Salon Chandigarh',
    description: 'Panaché Salon is a luxury boutique salon for hair, beauty and makeup in Sector 9D, Chandigarh.',
    keywords: 'Panache Salon Chandigarh, luxury boutique salon, hair beauty makeup Sector 9D',
  },

  credits: { designer: 'RepixelX Studio', designerUrl: 'https://repixelx.com' },
  sections: { showAbout: true, showMenu: false, showServices: true, showGallery: true, showReviews: true, showSocialConnect: true, showContactCard: true, showFooter: true },
  assets: { logo: '/femina/panache-official-logo.jpg', cover: '/femina/bridal.JPG', gallery: '/femina/', qr: '' },
  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,
}

export type ShopConfig = typeof shopConfig
