'use client'

import { motion } from 'framer-motion'
import { shopConfig } from '../config'

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-4"
    >
      <div
        className="section-shell"
        style={{
          background: '#B32A64',
          border: '1px solid rgba(10,102,178,0.22)',
          boxShadow: '0 20px 50px rgba(7, 59, 115, 0.22), 0 8px 22px rgba(10,102,178,0.12)',
        }}
      >
        <div className="section-shell-inner p-6 sm:p-7">
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />

          <div className="relative">
            <div className="section-title-accent mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
                {shopConfig.about.title}
              </h2>
            </div>
            <p className="text-white/90 leading-[1.7] text-[15px]">
              {shopConfig.about.shortDescription}
            </p>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-white/40 via-[#60A5FA]/65 to-transparent" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
