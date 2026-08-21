'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { setReturnSection } from '../../../lib/homeNavigation'

// Gallery images from public/gallery folder
const galleryImages = [
  '/femina/panache-salon-interior.png',
  '/femina/panache-hair-editorial.png',
  '/femina/panache-skin-editorial.png',
  '/femina/panache-beauty-editorial.png',
]

const visibleImages = galleryImages.slice(0, 4)
const Image = NextImage as any
const Link = NextLink as any

export default function Gallery() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      visibleImages.forEach((src) => {
        const img = document.createElement('img')
        img.src = src
      })
    }
  }, [])

  const handleImageClick = () => {
    setReturnSection('gallery')
    router.push('/gallery')
  }

  return (
    <section id="gallery" className="w-full max-w-md mx-auto pt-8 pb-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6"
      >
        <div className="section-title-accent mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181818] text-left">
            Gallery
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#5F5A54] font-normal text-left">
          Salon Spaces • Beauty Work • Luxe Care
        </p>
      </motion.div>

      {/* 4 image grid — Mango "Gallery" geometry, big rounded corners + premium shadow */}
      <div className="grid grid-cols-2 gap-3.5">
        {visibleImages.map((imageSrc, index) => (
          <motion.div
            key={`gallery-${index}-${imageSrc}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="relative aspect-square rounded-[24px] overflow-hidden shadow-[0_18px_36px_rgba(0,0,0,0.24)] cursor-pointer group border border-white/10"
            onClick={handleImageClick}
          >
            <Image
              src={imageSrc}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 448px) 50vw, 224px"
            />
            {/* Inner hairline border (Mango polish) */}
            <div className="absolute inset-[1px] rounded-[23px] border border-white/10 z-[1]" />
            {/* Soft top sheen */}
            <div className="absolute inset-x-6 top-4 h-10 rounded-full bg-white/12 blur-2xl z-[1]" />
            {/* Bottom gradient lift on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent group-hover:from-black/60 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* View Gallery button — Mango pill geometry, blue brand */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5"
      >
        <Link
          href="/gallery"
          onClick={() => setReturnSection('gallery')}
          className="block w-full text-white font-bold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg,#604B22,#9A7A35)',
            border: '1px solid rgba(229,214,155,.48)',
            boxShadow: '0 14px 26px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.16)',
          }}
        >
          <span className="flex -space-x-2" aria-hidden>{visibleImages.slice(0, 2).map((image) => <span key={image} className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-[#242424]"><Image src={image} alt="" fill sizes="28px" className="object-cover" /></span>)}</span>
          View Gallery
          <span className="text-lg leading-none" aria-hidden>→</span>
        </Link>
      </motion.div>
    </section>
  )
}
