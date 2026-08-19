'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, HeartPulse, ScanLine, ShieldCheck } from 'lucide-react'

const whyChooseUs = [
  {
    id: 'why-1',
    icon: Award,
    title: 'Experienced Stylists',
    description:
      'Luméra brings thoughtful, professional care to every salon ritual.',
  },
  {
    id: 'why-2',
    icon: ScanLine,
    title: 'Complete Salon Care',
    description:
      'A complete menu across hair, beauty, makeup, nails and hair systems.',
  },
  {
    id: 'why-3',
    icon: ShieldCheck,
    title: 'Personalised Consultation',
    description:
      'Complimentary consultation helps you choose the right service before you book.',
  },
  {
    id: 'why-4',
    icon: HeartPulse,
    title: 'Comfort-First Experience',
    description:
      'Comfortable environment, clean setup and thoughtful salon guidance.',
  },
]

export default function Services() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-6"
    >
      <div className="mb-6">
        <div className="section-title-accent mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Why Choose Luméra?
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300 font-normal text-left">
          Curated Beauty • Salon Wellness • Chandigarh
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {whyChooseUs.map((service, index) => {
          const IconComponent = service.icon
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-[25px] p-5 overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #FFFFFF 0%, #FFFDF8 58%, #F8E7A3 100%)',
                border: '1px solid rgba(184,135,44,.35)',
                boxShadow:
                  '0 14px 32px rgba(7,59,115,0.12), inset 0 1px 0 rgba(255,255,255,0.95)',
              }}
            >
              {/* Top white sheen */}
              <div className="absolute inset-x-0 top-0 h-20 opacity-70 pointer-events-none bg-gradient-to-b from-[#F8E7A3] to-transparent" />

              {/* Number badge top-right */}
              <div className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.22em] text-[#8B641E]/40">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10 flex items-start gap-4 transition-all duration-300 group-hover:-translate-y-0.5">
                {/* Icon pill — white-to-blue gradient */}
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      'linear-gradient(145deg, #3B2A20 0%, #B8872C 100%)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow:
                      '0 10px 22px rgba(7,59,115,0.22), inset 0 1px 0 rgba(255,255,255,0.24)',
                  }}
                >
                  <IconComponent
                    className="w-7 h-7 relative z-10"
                    style={{ color: '#FFFFFF' }}
                    strokeWidth={2}
                  />
                </div>

                <div className="flex-1 relative z-10 pr-7">
                  <h3
                    className="font-bold text-base mb-1.5 leading-tight"
                    style={{ color: '#3B2A20' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#766B59' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="relative z-10 mt-4 h-24 overflow-hidden rounded-2xl border border-[#E8DDBF]">
                <Image src={['/femina/hair-color.webp','/femina/makeup.webp','/femina/beauty.jpg','/femina/nails.jpeg'][index]} alt={service.title} fill className="object-cover" sizes="448px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
