'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const updates = [
  { badge: 'This week', title: 'Fresh beauty arrivals', copy: 'Explore our latest hair, skin and occasion-ready edits.', image: '/femina/panache-beauty-editorial.png' },
  { badge: 'Salon offer', title: 'Curated care packages', copy: 'Discover current service combinations and published prices.', image: '/femina/panache-skin-editorial.png' },
  { badge: 'Appointment update', title: 'Plan your salon visit', copy: 'Choose your service and request a preferred time in seconds.', image: '/femina/panache-hair-editorial.png' },
]

export default function SalonUpdate() {
  const [index, setIndex] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setIndex((value) => (value + 1) % updates.length), 3600); return () => window.clearInterval(timer) }, [])
  const update = updates[index]
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto w-full max-w-md pb-3 pt-1">
      <Link href={index === 2 ? '/book-consultation' : '/packages'} className="group relative flex min-h-[112px] overflow-hidden rounded-[25px] border border-[#d8be80]/55 bg-[#604b22] shadow-[0_14px_30px_rgba(0,0,0,.24)]">
        <AnimatePresence mode="wait"><motion.div key={update.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }} className="absolute inset-y-0 right-0 w-[62%]"><Image src={update.image} alt="" fill sizes="275px" className="object-cover" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#604b22_0%,rgba(96,75,34,.92)_20%,rgba(96,75,34,.42)_58%,rgba(96,75,34,.06)_100%)]" /></motion.div></AnimatePresence>
        <AnimatePresence mode="wait"><motion.div key={update.title} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="relative z-10 flex w-[76%] flex-col justify-center px-4 py-3.5 text-white"><span className="mb-1 inline-flex w-fit items-center gap-1 rounded-full border border-white/25 bg-white/12 px-2 py-1 text-[9px] font-black uppercase tracking-[.13em] backdrop-blur-md"><Sparkles className="h-3 w-3" /> {update.badge}</span><h2 className="text-[17px] font-black leading-tight">{update.title}</h2><p className="mt-1 text-[11px] font-semibold leading-4 text-white/78">{update.copy}</p></motion.div></AnimatePresence>
        <span className="absolute bottom-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-transform group-active:scale-95"><ArrowRight className="h-4 w-4" /></span>
        <div className="absolute bottom-3 left-4 z-20 flex gap-1">{updates.map((_, dot) => <span key={dot} className={`h-1 rounded-full transition-all ${dot === index ? 'w-4 bg-white' : 'w-1 bg-white/45'}`} />)}</div>
      </Link>
    </motion.section>
  )
}
