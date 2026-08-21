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
          background: 'linear-gradient(135deg,#4A3615 0%,#80652C 62%,#A1843F 100%)',
          border: '1px solid rgba(216,190,136,.48)',
          boxShadow: '0 16px 34px rgba(79,56,18,.28), inset 0 1px 0 rgba(255,255,255,.17)',
        }}
      >
        <div className="section-shell-inner p-6 sm:p-7">
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />

          <div className="relative">
            <div className="section-title-accent mb-4">
              <h2 className="whitespace-nowrap text-[22px] font-extrabold leading-none tracking-[-0.035em] text-white sm:text-3xl text-left">
                {shopConfig.about.title}
              </h2>
            </div>
            <p className="text-white/95 leading-[1.7] text-[17px] font-medium sm:text-[18px]">
              {shopConfig.about.shortDescription}
            </p>
            <div className="mt-5 h-px w-full bg-white/25" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
