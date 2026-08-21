'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SalonUpdate() {
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto w-full max-w-md pb-3 pt-1">
      <Link href="/packages" className="group relative flex min-h-[112px] overflow-hidden rounded-[25px] border border-[#d8be80]/55 bg-[#604b22] shadow-[0_14px_30px_rgba(0,0,0,.24)]">
        <div className="absolute inset-y-0 right-0 w-[58%]"><Image src="/femina/panache-beauty-editorial.png" alt="Panaché seasonal beauty edit" fill sizes="260px" className="object-cover" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#604b22_0%,rgba(96,75,34,.9)_22%,rgba(96,75,34,.35)_62%,rgba(96,75,34,.08)_100%)]" /></div>
        <div className="relative z-10 flex w-[72%] flex-col justify-center px-4 py-3.5 text-white"><span className="mb-1 inline-flex w-fit items-center gap-1 rounded-full border border-white/25 bg-white/12 px-2 py-1 text-[9px] font-black uppercase tracking-[.13em] backdrop-blur-md"><Sparkles className="h-3 w-3" /> Salon update</span><h2 className="text-[17px] font-black leading-tight">Season-ready beauty edit</h2><p className="mt-1 text-[11px] font-semibold leading-4 text-white/76">Explore current hair, skin and occasion packages.</p></div>
        <span className="absolute bottom-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-transform group-active:scale-95"><ArrowRight className="h-4 w-4" /></span>
      </Link>
    </motion.section>
  )
}
