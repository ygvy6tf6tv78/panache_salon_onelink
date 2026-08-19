'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Crown, Gem, Heart, Scissors, Sparkles, Star } from 'lucide-react'

import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'
import { shopConfig } from '../shops/dogra-associates/config'
import { pricingPackages } from '../shops/dogra-associates/pricing'

function packageMessage(title: string) {
  return `Hi Femina Plus Luxe, I would like to enquire about ${title}. Please share appointment availability.`
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function PackagesPage() {
  const packageIcons = [Crown, Sparkles, Gem, Heart, Scissors, Star]
  const packageBackgrounds = [
    '/femina/beauty.jpg',
    '/femina/hair-color.webp',
    '/femina/bridal.JPG',
  ]

  return (
    <main
      className="min-h-screen px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]"
      style={{ background: 'linear-gradient(180deg, #fff8fb 0%, #ffffff 38%, #fff4f8 100%)' }}
    >
      <div className="mx-auto w-full max-w-md">
        <header
          className="mb-4 overflow-hidden rounded-[26px] border border-[rgba(179,42,100,0.16)] p-4 shadow-[0_22px_46px_rgba(179,42,100,0.1),0_8px_20px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.96)]"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, #ffffff 58%, #fff1f6 100%)' }}
        >
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              onClick={() => prepareReturnToHeroCard()}
              className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-[#7A2148] shadow-[0_10px_22px_rgba(179,42,100,0.13)] ring-1 ring-[#B32A64]/10 backdrop-blur-md transition-transform active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="absolute left-0 right-0 px-11 text-center text-[1.22rem] font-black leading-tight tracking-tight text-slate-900">
              Signature Price Menu
            </h1>
            <span className="z-10 h-10 w-10" aria-hidden />
          </div>
          <p className="mt-3 px-2 text-center text-[12.5px] font-semibold leading-5 text-slate-600">
            Curated salon packages with published pricing. Open Services for the complete service list.
          </p>
        </header>

        <div className="grid gap-3">
          {pricingPackages.map((pkg, index) => {
            const Icon = packageIcons[index % packageIcons.length]
            return (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.28 }}
              className="relative overflow-hidden rounded-[23px] border border-[rgba(179,42,100,0.12)] bg-white p-3.5 shadow-[0_14px_34px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.96)]"
            >
              <Image
                src={packageBackgrounds[index % packageBackgrounds.length]}
                alt=""
                fill
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-cover object-center opacity-[0.16]"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,.97)_0%,rgba(255,255,255,.90)_52%,rgba(237,247,255,.76)_100%)]" aria-hidden />
              <div className="absolute right-[-2.4rem] top-[-2.4rem] h-28 w-28 rounded-full bg-[#B32A64]/[0.07] blur-2xl pointer-events-none" />
              <div className="absolute bottom-[-2.8rem] left-[-2.8rem] h-28 w-28 rounded-full bg-[#B32A64]/[0.06] blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="mb-3 flex items-start justify-between gap-2.5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#B32A64]/10 bg-[#FFF1F6] shadow-[0_8px_18px_rgba(179,42,100,0.1)]">
                      <Icon className="h-5 w-5 text-[#B32A64]" strokeWidth={2.25} />
                    </div>
                    <div className="min-w-0">
                      <span className="mb-1.5 inline-flex rounded-full border border-[#B32A64]/15 bg-[#F3FCF6] px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.08em] text-[#B32A64]">
                        {pkg.category}
                      </span>
                      <h2 className="text-[15px] font-extrabold leading-tight text-slate-950">
                        {pkg.title}
                      </h2>
                    </div>
                  </div>
                  <span
                    className="shrink-0 rounded-2xl border px-3 py-1.5 text-[13px] font-extrabold shadow-[0_8px_18px_rgba(179,42,100,0.1)]"
                    style={{
                      color: '#7A2148',
                      borderColor: 'rgba(179,42,100,0.14)',
                      background: 'linear-gradient(135deg, #fff1f6 0%, #ffe5ef 100%)',
                    }}
                  >
                    {pkg.price}
                  </span>
                </div>
                <p className="flex items-start gap-1.5 rounded-2xl border border-[#B32A64]/[0.08] bg-[#FFF8FB] px-3 py-2 text-[12.5px] font-semibold leading-5 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B32A64]" />
                    <span>{pkg.timeline}</span>
                </p>
                <p className="mt-2.5 text-[13px] font-medium leading-5 text-slate-600">{pkg.description}</p>
                <div className="mt-3.5 flex items-center justify-end">
                  <Link
                      href={getWhatsAppLink(shopConfig.contact.clientPhoneE164, packageMessage(pkg.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border px-4 text-[13px] font-extrabold shadow-[0_8px_18px_rgba(19,123,112,0.11)] transition-transform active:scale-[0.98]"
                      style={{
                        color: '#B32A64',
                        borderColor: 'rgba(19,123,112,0.16)',
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F1FCF7 100%)',
                      }}
                      aria-label={`Enquire about ${pkg.title}`}
                    >
                      <WhatsAppMark />
                      Enquire
                    </Link>
                </div>
              </div>
            </motion.article>
            )
          })}
        </div>
      </div>
    </main>
  )
}
