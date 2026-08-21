'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const reasons = [
  { title: 'Boutique, not rushed', description: 'Calm appointments, thoughtful consultation and detail-led care.', image: '/femina/panache-salon-interior.png' },
  { title: 'Hair, beauty & makeup', description: 'Hair, skin, nails and occasion-ready makeup in one place.', image: '/femina/panache-hair-editorial.png' },
  { title: 'Easy to find', description: 'Madhya Marg, Sector 9D, Chandigarh — easy to reach for every visit.', image: '/femina/panache-skin-editorial.png' },
  { title: 'Occasion-ready artistry', description: 'Refined styling shaped around your features, outfit and occasion.', image: '/femina/panache-beauty-editorial.png' },
]

export default function Services() {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.3 }} className="w-full max-w-md mx-auto py-6">
      <div className="mb-5">
        <div className="section-title-accent mb-2"><h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181818] text-left">Why Panaché?</h2></div>
        <p className="text-sm sm:text-base text-[#5F5A54] text-left">Personal care, precise craft and an unhurried salon experience.</p>
      </div>
      <div className="space-y-3">
        {reasons.map(({ title, description, image }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.28 }} className="relative min-h-[112px] overflow-hidden rounded-[23px] border border-[#DCC994]/70 bg-[#f8f3e8] shadow-[0_12px_28px_rgba(0,0,0,.16)]">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] overflow-hidden"><Image src={image} alt="" fill sizes="260px" className="object-cover object-center" aria-hidden /><div className="absolute inset-0 bg-[linear-gradient(90deg,#f8f3e8_0%,rgba(248,243,232,.91)_22%,rgba(248,243,232,.42)_58%,rgba(248,243,232,.08)_100%)]" /></div>
            <span className="absolute right-4 top-3 text-[10px] font-black tracking-[.18em] text-[#8f6f2b]">0{index + 1}</span>
            <div className="relative z-10 flex min-h-[112px] items-center gap-3 p-4"><span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#d2b76f] bg-white shadow-[0_7px_16px_rgba(96,75,34,.14)]"><Image src={image} alt="" fill sizes="56px" className="object-cover" /></span><div className="min-w-0 max-w-[70%]"><h3 className="text-[16px] font-extrabold leading-tight text-[#201b14]">{title}</h3><p className="mt-1.5 text-[12px] font-semibold leading-[1.45] text-[#5f564a]">{description}</p></div></div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
