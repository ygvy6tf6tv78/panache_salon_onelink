import { PUBLIC_SITE_URL } from '../lib/public-site-url'

export const siteConfig = {
  name: 'Luméra Salon & Spa',
  tagline: 'Hair • Beauty • Wellness',
  url: PUBLIC_SITE_URL,
  contact: { phones: ['7973268966', '01724024040'], email: 'hello@lumera.example', address: 'Sector 17, Chandigarh', mapQuery: 'Sector 17, Chandigarh', storeHours: 'Mon-Sun 10:00 AM - 9:00 PM', officePhone: '01724024040' },
  contactPersons: [
    { label: 'Salon' as const, phoneE164: '917973268966', phoneDisplay: '+91 79732 68966', whatsappE164: '917973268966' },
    { label: 'Landline' as const, phoneE164: '911724024040', phoneDisplay: '0172 4024040', whatsappE164: '917973268966' },
  ],
  whatsapp: { defaultPhone: '7973268966', defaultMessage: 'Hi Luméra Salon & Spa, I would like to book an appointment.' },
  trustBadges: ['Curated Beauty', 'Salon & Wellness'],
  brands: [{ name: 'Hair', tagline: '', logo: '' }, { name: 'Beauty', tagline: '', logo: '' }, { name: 'Makeup', tagline: '', logo: '' }, { name: 'Nails', tagline: '', logo: '' }],
  about: {
    title: 'Welcome to Luméra',
    shortDescription: 'A warm, modern salon for expressive hair, luminous skin, beautiful makeup, nails and restorative self-care.',
    fullDescription: 'Luméra Salon & Spa brings hair, beauty, makeup, nails and restorative care together in a calm, considered studio. Speak to the team on WhatsApp to plan your appointment.',
  },
  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,
  social: { facebook: 'https://www.facebook.com/', instagram: 'https://www.instagram.com/', twitter: '', linkedin: '' },
  seo: { title: 'Luméra Salon & Spa | Hair, Beauty and Wellness', description: 'A calm, modern salon for expressive hair, luminous skin, makeup and restorative self-care.', keywords: 'Lumera salon, salon and spa, hair beauty wellness Chandigarh' },
  credits: { designer: 'RepixelX Studio', designerUrl: 'https://repixelx.com' },
  google: { placeId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sector%2017%20Chandigarh', reviewsUrl: '' },
}

export type SiteConfig = typeof siteConfig
