'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Baby, CheckCircle2, HeartPulse, ScanLine } from 'lucide-react'

import { getWhatsAppLink } from '../../../lib/phone'
import { playClickSound } from '../../../lib/playClickSound'
import { pricingPackages } from '../pricing'
import { shopConfig } from '../config'

export default function UrgencyCTA() {
  const previewPackages = pricingPackages.slice(0, 3)
  const packageIcons = [HeartPulse, ScanLine, Baby]

  return (
    <motion.section
      id="packages"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-6 scroll-mt-5"
    >
      <div className="mb-6">
        <div className="section-title-accent mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 text-left">
            Popular Salon Packages
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 font-normal text-left">
          Hair • Beauty • Makeup • Nails
        </p>
      </div>

      <div className="grid gap-4">
        {previewPackages.map((pkg, index) => {
          const Icon = packageIcons[index] ?? ScanLine
          return (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.04, duration: 0.28 }}
              className="relative overflow-hidden rounded-[24px] border border-[#F3C7D8] p-5 shadow-[0_14px_32px_rgba(7,59,115,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
              style={{
                background:
                  'linear-gradient(135deg, #FFFFFF 0%, #F9FCFF 58%, #FFF1F6 100%)',
              }}
            >
              <div className="absolute right-[-1.75rem] top-[-1.75rem] h-24 w-24 rounded-full bg-[#B32A64]/12 blur-2xl" />
              <div className="relative flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1F6] ring-1 ring-[#F3C7D8] shadow-[0_8px_18px_rgba(7,59,115,0.10)]">
                  <Icon className="h-6 w-6 text-[#7A2148]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="truncate text-[10px] font-black uppercase tracking-[0.12em] text-teal-700">
                      {pkg.category}
                    </p>
                    <p className="shrink-0 rounded-full px-3 py-1.5 text-xs font-black text-white shadow-[0_8px_16px_rgba(7,59,115,0.22)]"
                      style={{ background: 'linear-gradient(135deg, #7A2148 0%, #B32A64 100%)' }}
                    >
                      {pkg.price}
                    </p>
                  </div>
                  <h3 className="text-[15px] font-black leading-snug text-slate-950">{pkg.title}</h3>
                  <p className="mt-1 flex items-start gap-1.5 text-xs font-semibold leading-5 text-slate-500">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#137B70]" />
                    {pkg.timeline}
                  </p>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/packages"
            onClick={() => playClickSound()}
            className="inline-flex py-4 px-6 items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white shadow-[0_18px_34px_rgba(7,59,115,0.28)]"
            style={{
              background:
                'linear-gradient(135deg, #7A2148 0%, #B32A64 72%, #137B70 100%)',
            }}
          >
            View More
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={getWhatsAppLink(
              shopConfig.contact.clientPhoneE164,
              'Hi Luméra Salon & Spa, I would like to know about your salon packages.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="inline-flex py-4 px-6 items-center justify-center rounded-2xl bg-[#FFF1F6] text-sm font-bold text-[#7A2148] shadow-[0_10px_22px_rgba(7,59,115,0.08)] ring-1 ring-[#F3C7D8]"
          >
            Enquire
          </Link>
        </div>

    </motion.section>
  )
}
