import { PUBLIC_SITE_URL } from '../lib/public-site-url'

export const siteConfig = {
  name: 'Panaché Salon',
  tagline: 'Luxury Boutique Salon',
  url: PUBLIC_SITE_URL,
  contact: { phones: ['6239604348', '9560983067'], email: '', address: 'SCO 16–17, Madhya Marg, near Thomas Cook, Sector 9D, Chandigarh – 160009, India', mapQuery: 'Panache Salon SCO 16 17 Madhya Marg near Thomas Cook Sector 9D Chandigarh 160009 India', storeHours: 'Daily 10:00 AM - 8:00 PM', officePhone: '6239604348' },
  contactPersons: [
    { label: 'Salon' as const, phoneE164: '916239604348', phoneDisplay: '+91 62396 04348', whatsappE164: '919560983067' },
    { label: 'Booking' as const, phoneE164: '919560983067', phoneDisplay: '+91 95609 83067', whatsappE164: '919560983067' },
  ],
  whatsapp: { defaultPhone: '9560983067', defaultMessage: 'Hi Panaché, I would like to book an appointment.' },
  trustBadges: ['Luxury Boutique Salon', 'Sector 9D • Chandigarh'],
  brands: [{ name: 'Hair', tagline: '', logo: '' }, { name: 'Beauty', tagline: '', logo: '' }, { name: 'Makeup', tagline: '', logo: '' }, { name: 'Nails', tagline: '', logo: '' }],
  about: {
    title: 'Welcome to Panaché',
    shortDescription: 'A luxury boutique salon for expressive hair, polished beauty and memorable makeup experiences in Chandigarh.',
    fullDescription: 'Panaché brings hair, beauty and makeup together in a refined boutique setting. Discover the services, explore published prices and book directly with the salon on WhatsApp.',
  },
  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,
  social: { facebook: 'https://www.facebook.com/', instagram: 'https://www.instagram.com/panache_chd/', twitter: '', linkedin: '' },
  seo: { title: 'Panaché Salon | Luxury Boutique Salon Chandigarh', description: 'Hair, beauty and makeup at Panaché Salon, Sector 9D, Chandigarh.', keywords: 'Panache Salon Chandigarh, luxury boutique salon, hair beauty makeup' },
  credits: { designer: 'RepixelX Studio', designerUrl: 'https://repixelx.com' },
  google: { placeId: 'ChIJ_1hjT4HtDzkRXCPg34enkkQ', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Panache%20Salon%20SCO%2016%2017%20Madhya%20Marg%20Sector%209D%20Chandigarh', reviewsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ_1hjT4HtDzkRXCPg34enkkQ' },
}

export type SiteConfig = typeof siteConfig
