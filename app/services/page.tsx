'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Brush, ChevronLeft, ChevronRight, Crown, Scissors, Sparkles, type LucideIcon } from 'lucide-react'
import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'
import { shopConfig } from '../shops/dogra-associates/config'
import { serviceCategories, type ServiceCategoryKey, type ServiceItem } from '../shops/dogra-associates/services'

const categoryKeys: ServiceCategoryKey[] = ['hairWomen', 'hairMen', 'hairTreatments', 'beauty', 'nails', 'makeup', 'hairSystems']
const categoryTabLabels: Record<ServiceCategoryKey, string> = { hairWomen: 'Hair Women', hairMen: 'Hair Men', hairTreatments: 'Treatments', beauty: 'Beauty', nails: 'Nails', makeup: 'Makeup', hairSystems: 'Hair Systems' }
const categoryIconMap: Record<ServiceCategoryKey, LucideIcon> = { hairWomen: Scissors, hairMen: Scissors, hairTreatments: Sparkles, beauty: Sparkles, nails: Brush, makeup: Crown, hairSystems: Sparkles }

function whatsappMessage(service: string) {
  return `Hi Femina Plus Luxe, I would like to book ${service}. Please share appointment availability.`
}

function WhatsAppMark() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#25D366" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
}

function CategoryPill({ label, category, isActive, onClick }: { label: string; category: ServiceCategoryKey; isActive: boolean; onClick: () => void }) {
  const Icon = categoryIconMap[category]
  return <motion.button type="button" data-category={category} onClick={onClick} whileTap={{ scale: 0.97 }} className="flex shrink-0 items-center gap-1.5 rounded-full border py-1 pl-1.5 pr-2.5 text-[13px] font-bold leading-none transition-all" style={{ background: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.14)', color: isActive ? '#8F2355' : '#FFFFFF', borderColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.24)', boxShadow: isActive ? '0 8px 18px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)' }}><span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: isActive ? '#FFF0F6' : 'rgba(255,255,255,0.16)' }}><Icon className="h-3.5 w-3.5" strokeWidth={2.4} /></span>{label}</motion.button>
}

function ServiceCard({ item, category, index }: { item: ServiceItem; category: ServiceCategoryKey; index: number }) {
  const Icon = categoryIconMap[category]
  return <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.24), duration: 0.25 }} className="relative overflow-hidden rounded-[20px] border bg-white p-3.5 shadow-[0_8px_20px_rgba(143,35,85,0.07),inset_0_1px_0_rgba(255,255,255,0.95)]" style={{ borderColor: '#F4D3E1' }}>
    <div className="mb-3 relative h-20 overflow-hidden rounded-2xl border border-[#F6C7DC]"><Image src={serviceCategories[category].image} alt={serviceCategories[category].name} fill className="object-cover" sizes="448px" /><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" /></div>
    <div className="flex items-start gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F6] ring-1 ring-[#F6C7DC]"><Icon className="h-6 w-6 text-[#B32A64]" strokeWidth={2.3} /></div><div className="min-w-0 flex-1 pr-12"><div className="flex items-start justify-between gap-2"><h2 className="text-base font-black leading-tight text-slate-950">{item.name}</h2>{item.price ? <span className="shrink-0 rounded-full bg-[#FFF0F6] px-2 py-1 text-[10px] font-black tracking-[0.01em] text-[#B32A64]">{item.price}</span> : null}</div>{item.description ? <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p> : null}</div></div>
    <Link href={getWhatsAppLink(shopConfig.contact.clientPhoneE164, whatsappMessage(item.name))} target="_blank" rel="noopener noreferrer" aria-label={`Book ${item.name} on WhatsApp`} className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_8px_18px_rgba(15,23,42,0.10)] ring-1 ring-[#F6C7DC]"><WhatsAppMark /></Link>
  </motion.article>
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryKey>('hairWomen')
  const searchParams = useSearchParams()
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const currentCategory = serviceCategories[activeCategory]
  const activeIndex = useMemo(() => categoryKeys.findIndex((key) => key === activeCategory), [activeCategory])
  const selectCategory = (key: ServiceCategoryKey) => { setActiveCategory(key); window.setTimeout(() => categoryScrollRef.current?.querySelector<HTMLElement>(`[data-category="${key}"]`)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }), 0) }
  const goPrev = () => selectCategory(categoryKeys[activeIndex <= 0 ? categoryKeys.length - 1 : activeIndex - 1])
  const goNext = () => selectCategory(categoryKeys[activeIndex >= categoryKeys.length - 1 ? 0 : activeIndex + 1])
  useEffect(() => {
    const requested = searchParams.get('cat') as ServiceCategoryKey | null
    if (requested && categoryKeys.includes(requested)) setActiveCategory(requested)
  }, [searchParams])

  return <main className="min-h-screen bg-white px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]"><div className="mx-auto w-full max-w-md">
    <header className="mb-4 overflow-hidden rounded-[28px] border border-white/20 p-3.5 text-white shadow-[0_14px_30px_rgba(143,35,85,0.20)]" style={{ background: 'linear-gradient(135deg,#5A1636 0%,#B32A64 58%,#E18AAE 100%)' }}>
      <div className="relative flex items-center justify-between"><Link href="/" onClick={() => prepareReturnToHeroCard()} className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/12 text-white ring-1 ring-white/20" aria-label="Back"><ArrowLeft className="h-5 w-5" /></Link><h1 className="absolute left-0 right-0 px-12 text-center text-[1.65rem] font-black leading-tight tracking-tight text-white">Services</h1><span className="z-10 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white ring-1 ring-white/20">Menu</span></div>
      <p className="mt-3 px-1 text-sm leading-6 text-white/85">Official Femina Plus base prices. “Onwards” prices can vary by hair length, product use and service complexity.</p>
      <div className="mt-4"><div className="mb-2.5 flex items-center justify-between gap-2 px-0.5"><p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/70">Categories</p><div className="flex items-center gap-1.5"><button type="button" onClick={goPrev} className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 text-[12px] font-bold text-white shadow-sm" aria-label="Previous category"><ChevronLeft className="h-4 w-4" />Prev</button><button type="button" onClick={goNext} className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 text-[12px] font-bold text-white shadow-sm" aria-label="Next category">Next<ChevronRight className="h-4 w-4" /></button></div></div><div ref={categoryScrollRef} className="-mx-0.5 flex gap-2 overflow-x-auto px-0.5 pb-1 pt-0.5 scrollbar-hide" style={{ scrollSnapType: 'x proximity' }}>{categoryKeys.map((key) => <CategoryPill key={key} label={categoryTabLabels[key]} category={key} isActive={activeCategory === key} onClick={() => selectCategory(key)} />)}</div></div>
    </header>
    <div className="mb-3 flex items-center justify-between px-1"><div><h2 className="text-lg font-black text-slate-950">{currentCategory.name}</h2><p className="mt-1 text-[13px] leading-snug text-slate-500">{currentCategory.shortDescription}</p></div><span className="shrink-0 rounded-full bg-[#FFF0F6] px-2.5 py-1 text-xs font-black text-[#B32A64]">{currentCategory.items.length}</span></div>
    <AnimatePresence mode="wait"><motion.div key={activeCategory} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="space-y-3">{currentCategory.items.map((service, index) => <ServiceCard key={service.id} item={service} category={activeCategory} index={index} />)}</motion.div></AnimatePresence>
  </div></main>
}
