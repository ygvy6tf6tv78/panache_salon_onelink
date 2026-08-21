'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Crown, MapPin, Scissors, Sparkles } from 'lucide-react'

const reasons = [
  { icon: Sparkles, title: 'Boutique, not rushed', description: 'A calm appointment experience with thoughtful consultation and detail-led care.', image: '/femina/panache-salon-interior.png' },
  { icon: Scissors, title: 'Hair, beauty & makeup', description: 'A considered edit of hair, skin, nails and occasion-ready makeup in one place.', image: '/femina/panache-hair-editorial.png' },
  { icon: MapPin, title: 'Easy to find', description: 'Visit us on Madhya Marg, Sector 9D, Chandigarh, for your next salon appointment.', image: '/femina/panache-skin-editorial.png' },
  { icon: Crown, title: 'Occasion-ready artistry', description: 'Refined makeup and styling shaped around your features, outfit and occasion.', image: '/femina/panache-beauty-editorial.png' },
]

export default function Services() {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.3 }} className="w-full max-w-md mx-auto py-6">
      <div className="mb-5">
        <div className="section-title-accent mb-2"><h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181818] text-left">Why Panaché?</h2></div>
        <p className="text-sm sm:text-base text-[#5F5A54] text-left">Personal care, precise craft and an unhurried salon experience.</p>
      </div>
      <div className="space-y-3">
        {reasons.map(({ icon: Icon, title, description, image }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.28 }} className="relative min-h-[128px] overflow-hidden rounded-[23px] border border-[#DCC994]/70 bg-[#f8f3e8] shadow-[0_12px_28px_rgba(0,0,0,.16)]">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] overflow-hidden"><Image src={image} alt="" fill sizes="260px" className="object-cover object-center" aria-hidden /><div className="absolute inset-0 bg-[linear-gradient(90deg,#f8f3e8_0%,rgba(248,243,232,.91)_22%,rgba(248,243,232,.42)_58%,rgba(248,243,232,.08)_100%)]" /></div>
            <span className="absolute right-4 top-3 text-[10px] font-black tracking-[.18em] text-[#8f6f2b]">0{index + 1}</span>
            <div className="relative z-10 flex min-h-[128px] items-center gap-3 p-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#d2b76f] bg-white text-[#80652C] shadow-[0_7px_16px_rgba(96,75,34,.14)]"><Icon className="h-6 w-6" strokeWidth={2.1} /></span><div className="min-w-0 max-w-[68%]"><span className="text-[9px] font-black uppercase tracking-[.16em] text-[#9a772d]">Panaché advantage</span><h3 className="mt-0.5 text-[15px] font-extrabold leading-tight text-[#201b14]">{title}</h3><p className="mt-1 text-[11.5px] font-semibold leading-[1.45] text-[#5f564a] line-clamp-3">{description}</p></div></div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
