// Shop configuration for the Femina Plus Luxe demonstration OneLink.

import { PUBLIC_SITE_URL } from '../../lib/public-site-url'

export type ContactPersonLabel = 'Salon' | 'Landline'

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string
  phoneDisplay: string
  whatsappE164: string
}

export const shopConfig = {
  name: 'Luméra Salon & Spa',
  tagline: 'Hair • Beauty • Wellness',
  taglineShort: 'Hair • Beauty • Makeup • Nails',
  serviceTagline: 'Hair • Beauty • Makeup • Nails',
  snapshotLocationLine: 'SCO 164–165, Sector 9-C, Chandigarh 160009',
  snapshotServicesLine: 'Hair • Beauty • Makeup • Nails • Hair Systems',
  snapshotHours: 'Mon-Sun 10:00 AM - 9:00 PM',
  url: PUBLIC_SITE_URL,
  cardType: 'B2C' as const,
  keywordBadges: ['Curated Beauty', 'Salon & Wellness'] as string[],

  contact: {
    phones: ['7973268966', '01724024040'],
    email: 'hello@lumera.example',
    address: 'Sector 17, Chandigarh',
    locationLine: 'Luméra Studio, Sector 17, Chandigarh',
    mapQuery: 'Sector 17, Chandigarh',
    storeHours: 'Mon-Sun 10:00 AM - 9:00 PM',
    storeHoursStatus: 'Open daily',
    officePhone: '01724024040',
    clientPhone: '7973268966',
    clientPhoneE164: '917973268966',
    officePhoneE164: '911724024040',
  },

  branches: [
    { name: 'FP LUXE', address: 'SCO 164–165, Sector 9-C, Chandigarh 160009', phone: '+91 79732 68966', mapQuery: 'Femina Plus Luxe SCO 164 165 Sector 9 C Chandigarh' },
    { name: 'FP44', address: 'SCO 268, Sector 44-C, Chandigarh', phone: '+91 87250 55006', mapQuery: 'Femina Plus FP44 SCO 268 Sector 44 Chandigarh' },
    { name: 'FP Kharar', address: 'SCO 55, Sector 125, New Sunny Enclave, Kharar', phone: '+91 98159 31884', mapQuery: 'Femina Plus Kharar Sector 125 New Sunny Enclave' },
    { name: 'FP Panchkula', address: 'SCO 386, Sector 8, Panchkula', phone: '+91 98159 62884', mapQuery: 'Femina Plus Panchkula SCO 386 Sector 8' },
    { name: 'FP Zirakpur', address: 'Pooja Plazio, above Gopal Sweets, Zirakpur', phone: '+91 98722 34488', mapQuery: 'Femina Plus Zirakpur Pooja Plazio' },
  ],

  contactPersons: [
    { label: 'Salon' as ContactPersonLabel, phoneE164: '917973268966', phoneDisplay: '+91 79732 68966', whatsappE164: '917973268966' },
    { label: 'Landline' as ContactPersonLabel, phoneE164: '911724024040', phoneDisplay: '0172 4024040', whatsappE164: '917973268966' },
  ] as ContactPerson[],

  whatsapp: {
    defaultPhone: '7973268966',
    defaultMessage: 'Hi Luméra Salon & Spa, I would like to book an appointment.',
    showSelector: false,
    selectorPersons: ['Salon'] as ContactPersonLabel[],
  },

  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    instagramJammu: '',
    twitter: '',
    linkedin: '',
    zomato: '',
  },

  trustBadges: ['Curated Beauty', 'Salon & Wellness'] as string[],
  brands: [
    { name: 'Hair', tagline: '', logo: '' },
    { name: 'Beauty', tagline: '', logo: '' },
    { name: 'Makeup', tagline: '', logo: '' },
    { name: 'Nails', tagline: '', logo: '' },
    { name: 'Hair Systems', tagline: '', logo: '' },
  ],

  about: {
    title: 'Welcome to Luméra',
    shortDescription: 'A warm, modern salon for expressive hair, luminous skin, beautiful makeup, nails and restorative self-care.',
  },
  menuUrl: '/services',

  // Retained only for the existing OneLink card payment face. The homepage does not promote payment.
  payment: {
    upiId: '', upiId2: '', upiName: 'Luméra Salon & Spa', upiQrImageUrl: '', scannerImage: '',
    bank: { bankName: '', accountNumberMasked: '', ifsc: '', accountHolder: '' },
    showScanner: false, showDownloadQR: false,
  },

  google: {
    placeId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sector%2017%20Chandigarh',
    reviewsUrl: '',
  },

  seo: {
    title: 'Luméra Salon & Spa | Hair, Beauty and Wellness',
    description: 'A calm, modern salon for expressive hair, luminous skin, makeup and restorative self-care.',
    keywords: 'Lumera salon, salon and spa, hair beauty wellness Chandigarh',
  },

  credits: { designer: 'RepixelX Studio', designerUrl: 'https://repixelx.com' },
  sections: { showAbout: true, showMenu: false, showServices: true, showGallery: true, showReviews: true, showSocialConnect: true, showContactCard: true, showFooter: true },
  assets: { logo: '/femina/lumera-logo.svg', cover: '/femina/bridal.JPG', gallery: '/femina/', qr: '' },
  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,
}

export type ShopConfig = typeof shopConfig
