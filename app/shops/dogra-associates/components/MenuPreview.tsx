'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Brush,
  Crown,
  Scissors,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { servicesPreviewCards } from '../services'
import { setReturnSection } from '../../../lib/homeNavigation'

// Map preview-card key → Lucide icon. Keeps services.ts free of React imports
// while letting us swap emojis for crisp, consistent line icons.
const previewIconMap: Record<string, LucideIcon> = {
  hairWomen: Scissors,
  beauty: Sparkles,
  nails: Brush,
  makeup: Crown,
}

export default function MenuPreview() {
  return (
    <section id="services" className="w-full max-w-md mx-auto py-5">
      {/* Header — same treatment as Mango "Our Menu" (title + trailing accent line) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-5"
      >
        <div className="section-title-accent mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
            Services
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#c9c3ba] font-medium text-left tracking-wide">
          Hair • Beauty • Makeup • Nails
        </p>
      </motion.div>

      {/* 4-card square grid — Mango "Our Menu" geometry */}
      <div className="grid grid-cols-2 gap-3.5 mb-6">
        {servicesPreviewCards.map((card, index) => {
          const Icon = previewIconMap[card.key] ?? Sparkles
          return (
          <Link key={card.key} href={card.href} className="block">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
              className="relative aspect-square rounded-[24px] overflow-hidden cursor-pointer group border border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.22)] transition-all duration-300"
            >
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 448px) 50vw, 224px"
              />

              {/* Inner hairline border – matches Mango */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/10 z-[1]" />

              {/* Subtle top sheen */}
              <div className="absolute inset-x-5 top-4 h-12 rounded-full bg-white/10 blur-2xl z-[1]" />

              {/* Black granite overlay keeps the editorial imagery readable. */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.82) 28%, rgba(0,0,0,0.54) 55%, rgba(0,0,0,0.18) 82%, rgba(0,0,0,0.04) 100%)',
                }}
              />

              {/* Glassy icon pill — top-right (Mango geometry, Lucide icon) */}
              <div
                className="absolute top-3 right-3 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center z-10 backdrop-blur-md"
                style={{
                  background: 'rgba(26,22,18,0.58)',
                  border: '1px solid rgba(220,190,126,0.55)',
                  boxShadow:
                    '0 8px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.30)',
                }}
              >
                <Icon
                  className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#f0d494]"
                  strokeWidth={2.2}
                />
              </div>

              {/* Title + subtitle + "View Services" pill (Mango layout) */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 z-10">
                <h3
                  className="text-white font-bold text-[15px] sm:text-[17px] mb-0.5 leading-tight line-clamp-2"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}
                >
                  {card.name}
                </h3>
                <p
                  className="mb-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-semibold leading-tight text-slate-200 sm:text-[11px]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}
                >
                  {card.shortDescription}
                </p>
                <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-[#e4c66e]/75 bg-black/25 px-3 py-1.5 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_4px_12px_rgba(117,89,35,0.18)] backdrop-blur-md transition-colors sm:text-sm">
                  <span aria-hidden className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#fff2bd]/70 to-transparent animate-[shine_3s_ease-in-out_infinite]" />
                  <span className="relative z-10">Explore</span>
                  <ArrowRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </div>
            </motion.div>
          </Link>
          )
        })}
      </div>

      {/* Single full-width primary CTA (Mango "View Full Menu" geometry, indigo brand) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="pt-1"
      >
        <Link
          href="/services"
          onClick={() => setReturnSection('services')}
          className="group relative flex min-h-[78px] w-full items-center justify-between overflow-hidden rounded-[22px] border border-white/25 px-5 text-white transition-transform active:scale-[0.99]"
          style={{
            backgroundImage: "linear-gradient(90deg,#604B22 0%,rgba(128,101,44,.96) 43%,rgba(128,101,44,.45) 68%,rgba(20,17,15,.18) 100%),url('/femina/panache-salon-interior.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 15px 30px rgba(15,13,12,.30), inset 0 1px 0 rgba(255,255,255,.22)',
          }}
        >
          <span className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.13),transparent_38%,rgba(198,155,102,.12))] backdrop-blur-[1px]" />
          <span className="relative z-10 text-left"><span className="block text-[16px] font-extrabold">View Full Service Menu</span><span className="mt-0.5 block text-xs font-semibold text-white/70">Browse every service by category</span></span>
          <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-white/14 backdrop-blur-md"><ArrowRight className="h-5 w-5" /></span>
        </Link>
      </motion.div>
    </section>
  )
}
