// Published Femina Plus services and base prices. “Onwards” remains intentionally unchanged.

export interface ServiceItem {
  id: string
  name: string
  description?: string
  price?: string
  note?: string
  category: ServiceCategoryKey
}

export type ServiceCategoryKey = 'hairWomen' | 'hairMen' | 'hairTreatments' | 'beauty' | 'nails' | 'makeup' | 'hairSystems'

const item = (id: string, name: string, category: ServiceCategoryKey, price?: string, description?: string): ServiceItem => ({ id, name, category, price, description })

export interface ServiceCategoryConfig { name: string; shortDescription: string; icon: string; image: string; items: ServiceItem[] }

const categoryImages: Record<ServiceCategoryKey, string> = {
  hairWomen: '/femina/hair-color.webp',
  hairMen: '/femina/hair-patch.webp',
  hairTreatments: '/femina/hair-color.webp',
  beauty: '/femina/beauty.jpg',
  nails: '/femina/nails.jpeg',
  makeup: '/femina/bridal.JPG',
  hairSystems: '/femina/hair-patch.webp',
}

export const serviceCategories: Record<ServiceCategoryKey, ServiceCategoryConfig> = {
  hairWomen: {
    name: 'Hair — Women', shortDescription: 'Cuts, styling, colour and premium hair care.', icon: '✂️', image: categoryImages.hairWomen,
    items: [
      item('hw-1', 'Head Wash', 'hairWomen', '₹400 onwards'), item('hw-2', 'Blow Dry with Wash', 'hairWomen', '₹550 onwards'), item('hw-3', 'Hair Cut', 'hairWomen', '₹700'), item('hw-4', 'Head Massage', 'hairWomen', '₹700'), item('hw-5', 'Ironing with Wash', 'hairWomen', '₹700'), item('hw-6', 'Iron Curls', 'hairWomen', '₹800 onwards'), item('hw-7', 'Hair Cut by Nazim', 'hairWomen', '₹800'), item('hw-8', 'Hair Cut Short', 'hairWomen', '₹900'), item('hw-9', 'Hair Cut by Rachit', 'hairWomen', '₹2,000'), item('hw-10', 'Hair Bun', 'hairWomen', '₹1,000–₹1,500'),
      item('hw-11', "L'Oréal Root Touch-Up", 'hairWomen', '₹1,300'), item('hw-12', 'Organic Root Touch-Up', 'hairWomen', '₹1,500'), item('hw-13', 'Global Hair Colour', 'hairWomen', '₹4,500 onwards'), item('hw-14', 'Organic Hair Colour', 'hairWomen', '₹5,000 onwards'), item('hw-15', 'Fashion Streaking', 'hairWomen', '₹5,000 onwards'),
    ],
  },
  hairMen: {
    name: 'Hair — Men', shortDescription: 'Precision cuts, grooming, colour and treatment.', icon: '💈', image: categoryImages.hairMen,
    items: [
      item('hm-1', 'Hair Styling', 'hairMen', '₹200'), item('hm-2', 'Shave', 'hairMen', '₹250'), item('hm-3', 'Beard Trim', 'hairMen', '₹250'), item('hm-4', 'Beard Trim Fading', 'hairMen', '₹300'), item('hm-5', 'Head Massage', 'hairMen', '₹400'), item('hm-6', 'Hair Cut Trim', 'hairMen', '₹400 onwards'), item('hm-7', 'Hair Cut Fading', 'hairMen', '₹500'), item('hm-8', 'Hair Cut by Arshad', 'hairMen', '₹500'), item('hm-9', 'Beard Colour', 'hairMen', '₹600 onwards'), item('hm-10', "L'Oréal Hair Colour", 'hairMen', '₹1,300'), item('hm-11', 'Organic Hair Colour', 'hairMen', '₹1,500'), item('hm-12', 'Fashion Streaking', 'hairMen', '₹2,500 onwards'), item('hm-13', 'Smoothening', 'hairMen', '₹3,100 onwards'), item('hm-14', 'Keratin', 'hairMen', '₹3,100 onwards'), item('hm-15', 'Baby Boy Haircut', 'hairMen', '₹350'), item('hm-16', 'Baby Girl Haircut', 'hairMen', '₹500'),
    ],
  },
  hairTreatments: {
    name: 'Hair Treatments', shortDescription: 'Professional repair, hydration and smoothing treatments.', icon: '✨', image: categoryImages.hairTreatments,
    items: [
      item('ht-1', 'Deep Conditioning', 'hairTreatments', '₹1,000 onwards'), item('ht-2', 'Botanical Hair Spa', 'hairTreatments', '₹1,300 onwards'), item('ht-3', 'Deep Conditioning Luxury', 'hairTreatments', '₹1,500 onwards'), item('ht-4', 'Dry Scalp Treatment', 'hairTreatments', '₹1,500'), item('ht-5', 'Hydration Hair Spa', 'hairTreatments', '₹1,500'), item('ht-6', 'Oily Scalp Treatment', 'hairTreatments', '₹1,500'), item('ht-7', 'Dandruff Treatment', 'hairTreatments', '₹1,700 onwards'), item('ht-8', 'Keratin Hair Spa', 'hairTreatments', '₹2,000'), item('ht-9', 'Hydration Treatment', 'hairTreatments', '₹3,500'), item('ht-10', 'Olaplex Treatment', 'hairTreatments', '₹3,500 onwards'), item('ht-11', 'Fine Hair Treatment', 'hairTreatments', '₹4,000'), item('ht-12', 'Smooth & Shine Treatment', 'hairTreatments', '₹4,000 onwards'),
      item('ht-13', 'Smoothening', 'hairTreatments', '₹5,000 onwards'), item('ht-14', 'Keratin', 'hairTreatments', '₹6,000 onwards'), item('ht-15', 'Botox', 'hairTreatments', '₹8,000 onwards'), item('ht-16', 'NanoPlastia', 'hairTreatments', '₹8,000 onwards'), item('ht-17', 'Silk Therapy', 'hairTreatments', '₹10,000 onwards'),
    ],
  },
  beauty: {
    name: 'Beauty', shortDescription: 'Facials, cleanup, threading, waxing and skin services.', icon: '✦', image: categoryImages.beauty,
    items: [
      item('be-1', 'Upper Lips Threading', 'beauty', '₹50'), item('be-2', 'Eyebrows Threading', 'beauty', '₹100'), item('be-3', 'Full Face Threading', 'beauty', '₹300'), item('be-4', 'Full Face Wax', 'beauty', '₹500'),
      item('be-5', 'Aroma Magic Facial', 'beauty', '₹1,700 onwards'), item('be-6', 'Breakout Clearing Facial', 'beauty', '₹2,000'), item('be-7', 'O3+ Time Expert Facial', 'beauty', '₹2,500 onwards'), item('be-8', 'Ozone Facial', 'beauty', '₹2,500 onwards'), item('be-9', 'Seaweed Whitening Facial', 'beauty', '₹2,500'), item('be-10', 'Express Whitening Facial', 'beauty', '₹2,800'), item('be-11', 'Organic Harvest Facial', 'beauty', '₹3,500'), item('be-12', 'Kanpeki Facial', 'beauty', '₹5,000 onwards'),
      item('be-13', 'Aroma Cleanup', 'beauty', '₹1,000'), item('be-14', 'O3+ Cleanup', 'beauty', '₹1,500'), item('be-15', 'Ozone Cleanup', 'beauty', '₹2,000'), item('be-16', 'Organic Harvest Cleanup', 'beauty', '₹2,000'), item('be-17', 'Casmara Cleanup', 'beauty', '₹2,500'), item('be-18', 'Kanpeki Cleanup', 'beauty', '₹3,500'),
      item('be-19', 'Face Bleach', 'beauty', '₹350'), item('be-20', 'Organic Face Bleach', 'beauty', '₹500'), item('be-21', 'Stomach Bleach', 'beauty', '₹500'), item('be-22', 'Back Bleach', 'beauty', '₹500'), item('be-23', 'Body Bleach', 'beauty', '₹1,500'),
      item('be-24', 'Full Arms Wax — Honey', 'beauty', '₹400'), item('be-25', 'Full Arms Wax — Rica', 'beauty', '₹600'), item('be-26', 'Full Legs Wax — Honey', 'beauty', '₹400'), item('be-27', 'Full Legs Wax — Rica', 'beauty', '₹600'), item('be-28', 'Bikini Wax — Honey', 'beauty', '₹800'), item('be-29', 'Bikini Wax — Rica', 'beauty', '₹1,400'), item('be-30', 'Full Body Wax — Honey', 'beauty', '₹1,500'), item('be-31', 'Full Body Wax — Rica', 'beauty', '₹2,500'),
    ],
  },
  nails: {
    name: 'Nails', shortDescription: 'Manicure, pedicure and nail-care services.', icon: '💅', image: categoryImages.nails,
    items: [item('na-1', 'Reflexology / Leg Massage', 'nails', '₹600'), item('na-2', 'Luxury Pedicure', 'nails', '₹1,000'), item('na-3', 'Crystal Pedicure', 'nails', '₹1,500'), item('na-4', 'Luxury Manicure', 'nails', '₹800'), item('na-5', 'Crystal Manicure', 'nails', '₹1,000'), item('na-6', 'Nail Extensions', 'nails', 'Price on Consultation')],
  },
  makeup: {
    name: 'Makeup', shortDescription: 'Party, engagement, bridal and destination makeup.', icon: '✿', image: categoryImages.makeup,
    items: [
      item('ma-1', 'Basic Party Makeup', 'makeup', '₹3,000'), item('ma-2', 'HD Party Makeup', 'makeup', '₹4,500'), item('ma-3', 'Party Makeup by Komal', 'makeup', '₹6,000'), item('ma-4', 'Celebrity Party Makeup by Komal', 'makeup', '₹10,000'), item('ma-5', 'Engagement Makeup', 'makeup', '₹7,000'), item('ma-6', 'HD Engagement Makeup', 'makeup', '₹10,000'), item('ma-7', 'Engagement Makeup by Komal', 'makeup', '₹15,000–₹20,000'), item('ma-8', 'Destination Engagement by Komal', 'makeup', '₹25,000'), item('ma-9', 'Basic Bridal Makeup', 'makeup', '₹11,000'), item('ma-10', 'HD Bridal Makeup', 'makeup', '₹15,000'), item('ma-11', 'Bridal Makeup by Komal at Salon', 'makeup', '₹20,000–₹30,000'), item('ma-12', 'Destination Bridal Makeup by Komal', 'makeup', '₹25,000–₹40,000'),
    ],
  },
  hairSystems: {
    name: 'Hair Systems', shortDescription: 'Hair patch, wig fitting and maintenance support.', icon: '◌', image: categoryImages.hairSystems,
    items: [
      item('hs-1', 'Glue Service', 'hairSystems', '₹1,200'), item('hs-2', 'Hair Bonding Service Sitting Package', 'hairSystems', '₹12,000'), item('hs-3', 'Outside Patch Service', 'hairSystems', '₹1,700'), item('hs-4', 'Tape Service', 'hairSystems', '₹900'), item('hs-5', 'Hair Colour', 'hairSystems', '₹700'), item('hs-6', 'Organic Hair Colour', 'hairSystems', '₹800'), item('hs-7', 'Extra Head Massage, 15 min', 'hairSystems', '₹300'), item('hs-8', 'Glow Pack', 'hairSystems', '₹500'), item('hs-9', 'Front Area Glue', 'hairSystems', '₹300'), item('hs-10', 'Hair Styling', 'hairSystems', '₹200'), item('hs-11', 'Beard', 'hairSystems', '₹250–₹300'), item('hs-12', 'New Hair Patch / Wig', 'hairSystems', 'Price on Consultation'), item('hs-13', 'Hair Toppers / Custom Wigs', 'hairSystems', 'Price on Consultation'),
    ],
  },
}

export const servicesPreviewCards = [
  { key: 'hairWomen' as const, name: 'Hair & Styling', shortDescription: 'Cuts, colour and styling for every look.', icon: '✂️', image: categoryImages.hairWomen, href: '/services?cat=hairWomen' },
  { key: 'hairTreatments' as const, name: 'Hair Treatments', shortDescription: 'Repair, hydration, keratin and smoothing care.', icon: '✨', image: categoryImages.hairTreatments, href: '/services?cat=hairTreatments' },
  { key: 'beauty' as const, name: 'Beauty & Skin', shortDescription: 'Facials, waxing, threading and cleanup.', icon: '✦', image: categoryImages.beauty, href: '/services?cat=beauty' },
  { key: 'makeup' as const, name: 'Makeup', shortDescription: 'Party, engagement and bridal makeup.', icon: '✿', image: categoryImages.makeup, href: '/services?cat=makeup' },
] as const
