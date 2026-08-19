'use client'

import { ArrowLeft, MapPin, Navigation, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { shopConfig } from '../shops/dogra-associates/config'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

export default function NearestBranchPage() {
  return (
    <main className="min-h-screen bg-white px-3 pb-12 pt-[max(.75rem,env(safe-area-inset-top))] text-slate-950">
      <div className="mx-auto max-w-md">
        <header className="rounded-[28px] bg-[linear-gradient(135deg,#5A1636,#B32A64,#E18AAE)] p-4 text-white shadow-[0_18px_38px_rgba(179,42,100,.22)]">
          <div className="relative flex items-center justify-between">
            <Link href="/" onClick={() => prepareReturnToHeroCard()} aria-label="Back" className="z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/12 ring-1 ring-white/20"><ArrowLeft className="h-5 w-5" /></Link>
            <h1 className="absolute inset-x-12 text-center text-[1.5rem] font-black">Choose Your Branch</h1>
            <span className="z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/12 ring-1 ring-white/20"><MapPin className="h-5 w-5" /></span>
          </div>
          <p className="mt-3 text-sm font-medium leading-6 text-white/85">Select the Femina location most convenient for your appointment.</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Femina%20Plus%20near%20me" target="_blank" rel="noreferrer" className="mt-4 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#B32A64] shadow-[0_12px_24px_rgba(0,0,0,.16)]"><Navigation className="h-4 w-4" />Find nearest in Google Maps</a>
        </header>
        <section className="mt-5 space-y-3">
          {shopConfig.branches.map((branch) => (
            <article key={branch.name} className="rounded-2xl border border-[#F3C7D8] bg-white p-4 shadow-[0_12px_26px_rgba(179,42,100,.08)]">
              <div className="flex items-start justify-between gap-3"><div><h2 className="flex items-center gap-2 text-base font-black"><MapPin className="h-4 w-4 text-[#B32A64]" />{branch.name}</h2><p className="mt-1 text-sm leading-5 text-slate-600">{branch.address}</p><p className="mt-1 text-xs font-bold text-[#B32A64]">{branch.phone}</p></div><Sparkles className="h-5 w-5 shrink-0 text-[#E18AAE]" /></div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noreferrer" className="mt-3 flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFF1F6] text-xs font-black text-[#B32A64] ring-1 ring-[#F3C7D8]"><Navigation className="h-3.5 w-3.5" />Open branch in Maps</a>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
