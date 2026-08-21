'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { shopConfig } from '../config'

function InstagramMark({ className = 'h-7 w-7' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden><defs><linearGradient id="panache-instagram" x1="2" y1="22" x2="22" y2="2"><stop stopColor="#F9CE34"/><stop offset=".48" stopColor="#EE2A7B"/><stop offset="1" stopColor="#6228D7"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#panache-instagram)" strokeWidth="2.2"/><circle cx="12" cy="12" r="4" stroke="url(#panache-instagram)" strokeWidth="2.2"/><circle cx="17.5" cy="6.8" r="1.15" fill="#EE2A7B"/></svg>
}

export default function InstagramCTA() {
  return <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto w-full max-w-md py-5">
    <div className="rounded-[29px] bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] p-[1.5px] shadow-[0_16px_34px_rgba(0,0,0,.20)]"><div className="overflow-hidden rounded-[27px] bg-white p-3.5">
      <div className="flex items-center gap-3 rounded-[20px] bg-gradient-to-r from-[#FFF9F0] via-[#FFF4F7] to-[#F8F3FF] p-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#F2D3DE] bg-white shadow-[0_7px_16px_rgba(220,39,67,.14)]"><InstagramMark className="h-8 w-8" /></span><div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-[.15em] text-[#C13584]">@panache_chd</p><h2 className="mt-1 text-lg font-black text-[#111]">Follow us on Instagram</h2><p className="mt-1 text-[11px] font-semibold text-neutral-500">Salon transformations, bridal looks and new style inspiration.</p></div></div>
      <Link href={shopConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F09433] via-[#DC2743] to-[#BC1888] text-sm font-black text-white shadow-[0_9px_20px_rgba(193,53,132,.22)]"><InstagramMark className="h-5 w-5 brightness-0 invert" />Open Instagram <span aria-hidden>→</span></Link>
    </div></div>
  </motion.section>
}
