'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Clock3, ChevronRight, X, Store, Hand, Award, Calendar, FileText, ArrowLeft, Instagram, Share2 } from 'lucide-react'
import { shopConfig, ContactPerson } from '../config'
import ActionsRow, { ActionsRowRef } from './ActionsRow'
import Card3D, { Face } from '../../../components/Card3D'
import PaymentFace from './PaymentFace'
import AppointmentFace from './AppointmentFace'
import { useLanguage } from '../../../contexts/LanguageContext'
import { playClickSound } from '../../../lib/playClickSound'

export default function Hero() {
  const { t } = useLanguage()
  const [currentFace, setCurrentFace] = useState<Face>('front')
  const [isFlipping, setIsFlipping] = useState(false)
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; openTimeLabel: string; closeTimeLabel: string }>({
    isOpen: true,
    openTimeLabel: '10:30 AM',
    closeTimeLabel: '7:00 PM',
  })
  /** Flip duration in ms – set per transition so 180°/360°/540° all feel same speed */
  const [flipDurationMs, setFlipDurationMs] = useState(650)
  const actionsRowRef = useRef<ActionsRowRef>(null)

  const headerImages = ['/femina/bridal.JPG', '/femina/hair-color.webp', '/femina/makeup.webp']
  const [headerImageIndex, setHeaderImageIndex] = useState(0)
  const [hoursPopoverOpen, setHoursPopoverOpen] = useState(false)
  const [hoursPortalMounted, setHoursPortalMounted] = useState(false)

  useEffect(() => setHoursPortalMounted(true), [])
  useEffect(() => {
    if (!hoursPopoverOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setHoursPopoverOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape) }
  }, [hoursPopoverOpen])

  // 180° = 0.65s, 360° = 1.3s, 540° = 2s (same angular speed)
  const DURATION_180_MS = 650
  const DURATION_360_MS = 1300
  const DURATION_540_MS = 2000
  const doctorCredentials = ['Hair', 'Beauty', 'Makeup', 'Nails']
  const doctorExpertise = ['Hair Colour', 'Hair Treatments', 'Bridal Makeup', 'Nail Care', 'Hair Systems', 'Beauty Services']

  const dayAbbrToIndex: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  const computeOpenStatus = useCallback(() => {
    const hours = shopConfig?.contact?.storeHours || ''
    const normalized = hours
      .replace(/[–—]/g, '-')
      .replace(/\s+/g, ' ')
      .trim()

    // Example: "Mon-Sat 10:30 AM - 7:00 PM"
    const re = /(Sun|Mon|Tue|Wed|Thu|Fri|Sat)(?:\s*-\s*(Sun|Mon|Tue|Wed|Thu|Fri|Sat))?\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i
    const match = normalized.match(re)
    if (!match) {
      return {
        isOpen: true,
        openTimeLabel: '10:30 AM',
        closeTimeLabel: '7:00 PM',
      }
    }

    const startDayStr = (match[1] || '').slice(0, 3)
    const endDayStr = (match[2] || startDayStr).slice(0, 3)
    const openTimeStr = match[3]
    const closeTimeStr = match[4]

    const startDay = dayAbbrToIndex[startDayStr]
    const endDay = dayAbbrToIndex[endDayStr]
    if (startDay === undefined || endDay === undefined) {
      return {
        isOpen: true,
        openTimeLabel: openTimeStr?.trim() || '10:30 AM',
        closeTimeLabel: closeTimeStr?.trim() || '7:00 PM',
      }
    }

    const parseTimeMinutes = (timeStr: string) => {
      const m = timeStr.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i)
      if (!m) return 0
      let hh = Number(m[1])
      const mm = Number(m[2])
      const ap = m[3].toUpperCase()
      if (ap === 'PM' && hh < 12) hh += 12
      if (ap === 'AM' && hh === 12) hh = 0
      return hh * 60 + mm
    }

    const openMinutes = parseTimeMinutes(openTimeStr)
    const closeMinutes = parseTimeMinutes(closeTimeStr)
    const now = new Date()
    const nowDay = now.getDay()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    // Inclusive day range (supports wrap-around like Fri-Mon)
    const daysInRange: number[] = []
    let i = startDay
    while (true) {
      daysInRange.push(i)
      if (i === endDay) break
      i = (i + 1) % 7
    }
    const dayOk = daysInRange.includes(nowDay)
    if (!dayOk) {
      return {
        isOpen: false,
        openTimeLabel: openTimeStr.trim(),
        closeTimeLabel: closeTimeStr.trim(),
      }
    }

    if (openMinutes <= closeMinutes) {
      const isOpen = nowMinutes >= openMinutes && nowMinutes < closeMinutes
      return {
        isOpen,
        openTimeLabel: openTimeStr.trim(),
        closeTimeLabel: closeTimeStr.trim(),
      }
    }
    // If close time is past midnight (rare for your current hours), handle wrap.
    const isOpen = nowMinutes >= openMinutes || nowMinutes < closeMinutes
    return {
      isOpen,
      openTimeLabel: openTimeStr.trim(),
      closeTimeLabel: closeTimeStr.trim(),
    }
  }, [])

  const getKeywordBadgeIcon = (badge: string) => {
    const b = badge.toLowerCase()
    if (b.includes('icai')) return Award
    if (b.includes('years') || b.includes('20+')) return Calendar
    if (b.includes('tax') || b.includes('gst')) return FileText
    return Hand
  }

  useEffect(() => {
    setOpenStatus(computeOpenStatus())
    const id = window.setInterval(() => {
      setOpenStatus(computeOpenStatus())
    }, 60 * 1000)
    return () => window.clearInterval(id)
  }, [computeOpenStatus])

  // Header image carousel: cycle through 3 images very smoothly (matches Mango)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderImageIndex((i) => (i + 1) % headerImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [headerImages.length])

  const handleFlip = (e?: React.MouseEvent, forceFlip = false) => {
    if (isFlipping) return
    if (!forceFlip && e && (e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return
    }
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    if (currentFace === 'front') {
      setCurrentFace('info')
    } else if (currentFace === 'info') {
      setCurrentFace('front')
    } else {
      setCurrentFace('info')
    }
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  const handleOpenPayments = useCallback(() => {
    setFlipDurationMs(DURATION_360_MS)
    setIsFlipping(true)
    setCurrentFace('payment')
    setTimeout(() => setIsFlipping(false), DURATION_360_MS)
  }, [])

  const handleBackFromPayment = () => {
    if (isFlipping) return
    setFlipDurationMs(DURATION_360_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_360_MS)
  }

  const handleOpenAppointment = useCallback(() => {
    // One clean flip (180° feel) instead of long 540° spin.
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('appointment')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }, [])

  const handleBackFromAppointment = () => {
    if (isFlipping) return
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  const handleOpenDoctorProfile = useCallback(() => {
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('doctor')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }, [])

  const handleBackFromDoctorProfile = () => {
    if (isFlipping) return
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  // Open payment face when returning from menu page (Proceed to Payment)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openPayment')) {
      sessionStorage.removeItem('openPayment')
      const t = setTimeout(handleOpenPayments, 150)
      return () => clearTimeout(t)
    }
  }, [handleOpenPayments])

  // Open appointment face when coming from services page (Book Appointment)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openAppointment') === 'true') {
      sessionStorage.removeItem('openAppointment')
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + (window.location.hash || ''))
      }
      const t = setTimeout(handleOpenAppointment, 200)
      return () => clearTimeout(t)
    }
  }, [handleOpenAppointment])

  // Flip card to back (Business Snapshot) when coming from "Flip Card" button
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openFlip') === 'true') {
      sessionStorage.removeItem('openFlip')
      const t = setTimeout(() => {
        setFlipDurationMs(650)
        setIsFlipping(true)
        setCurrentFace('info')
        setTimeout(() => setIsFlipping(false), 650)
      }, 450)
      return () => clearTimeout(t)
    }
  }, [])

  // If user navigates back from services/tools, force the main card front face.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (sessionStorage.getItem('forceHeroFront') === 'true') {
        sessionStorage.removeItem('forceHeroFront')
        setCurrentFace('front')
      }
    } catch {
      // Ignore storage issues.
    }
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto pt-4 pb-6 min-w-0"
      style={{ width: '100%', maxWidth: 'min(100%, 28rem)' }}
    >
      <Card3D
        currentFace={currentFace}
        isFlipping={isFlipping}
        transitionDuration={flipDurationMs / 1000}
        faceFront={
          <div 
          className="rounded-[24px] relative cursor-pointer overflow-hidden"
          style={{
              background:
                'linear-gradient(180deg, #FFFDF8 0%, #FFFFFF 54%, #F8F0DD 100%)',
            border: '1px solid rgba(184, 135, 44, 0.32)',
            boxShadow:
              '0 26px 60px rgba(0, 0, 0, 0.28), 0 10px 26px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
            minHeight: '660px',
            boxSizing: 'border-box',
          }}
            onClick={(e) => {
              const target = e.target as HTMLElement
              const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')
              const isInActionsRow = target.closest('[data-actions-row]')
              const isInSocialIcons = target.closest('[data-social-icons]')
              const isSVG = target.tagName === 'svg' || target.closest('svg')
              const isInSVG = isSVG && target.closest('[data-social-icons]')
              if (!isButton && !isInActionsRow && !isInSocialIcons && !isInSVG) {
                handleFlip(e)
              }
            }}
          >
            {/* Top edge shine – soft white fade above header (Mango polish) */}
            <div
              className="absolute inset-x-0 top-0 h-24 rounded-t-[24px] pointer-events-none z-0 opacity-70"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
              }}
            />

            {/* Tap to flip – corner hint (front face only) */}
            {currentFace === 'front' && (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  playClickSound()
                  handleFlip(e, true)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-10 text-xs font-semibold px-3 py-2 rounded-full shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  color: '#0f172a',
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(147, 197, 253, 0.7)',
                  boxShadow: '0 8px 18px rgba(7, 59, 115, 0.18), 0 2px 6px rgba(15, 23, 42, 0.08)',
                }}
                aria-label={t('tapToFlip')}
              >
                <Hand className="w-3.5 h-3.5" style={{ color: '#1e40af' }} />
                <span style={{ fontSize: '12px' }}>{t('tapToFlip')}</span>
              </motion.button>
            )}

            {/* Header – 3 images, smooth crossfade (Mango pattern) */}
            <div className="relative h-40 bg-slate-100 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={headerImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={headerImages[headerImageIndex]}
                    alt={`${shopConfig.name} salon`}
                    fill
                    className="object-cover"
                    priority={headerImageIndex === 0}
                    sizes="(max-width: 448px) 100vw, 448px"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/6 to-white/10 pointer-events-none" />
            </div>

            {/* Social Media Icons - At header border line (same line as logo, right side) */}
            <motion.div 
              data-social-icons
              className="absolute right-2 z-20 flex items-center gap-3 social-icons-top"
              style={{ top: '8.5rem' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onTouchStart={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <motion.button whileTap={{ scale: 0.94 }} onClick={(e) => { e.stopPropagation(); e.preventDefault(); playClickSound(); window.open(shopConfig.social.instagram, '_blank', 'noopener,noreferrer') }} className="grid h-11 w-11 place-items-center rounded-full border border-[#dfb66d]/50 bg-white text-[#b52a70] shadow-[0_9px_20px_rgba(0,0,0,.16)]" aria-label="Open Instagram"><Instagram className="h-5 w-5" /></motion.button>
              <motion.button whileTap={{ scale: 0.94 }} onClick={async (e) => { e.stopPropagation(); e.preventDefault(); playClickSound(); if (navigator.share) await navigator.share({ title: shopConfig.name, text: shopConfig.tagline, url: window.location.href }); else await navigator.clipboard?.writeText(window.location.href) }} className="grid h-11 w-11 place-items-center rounded-full border border-[#dfb66d]/50 bg-white text-[#604B22] shadow-[0_9px_20px_rgba(0,0,0,.16)]" aria-label="Share Panaché"><Share2 className="h-5 w-5" /></motion.button>
              {/* LinkedIn */}
              {shopConfig.social?.linkedin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    playClickSound()
                    window.open(shopConfig.social!.linkedin!, '_blank', 'noopener,noreferrer')
                  }}
                  className="h-11 w-11 rounded-full flex items-center justify-center transition-all cursor-pointer touch-manipulation"
                  style={{
                    background: 'rgba(255,255,255,0.97)',
                    border: '1.5px solid rgba(10, 102, 194, 0.45)',
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow:
                      '0 10px 22px rgba(10, 102, 194, 0.28), 0 4px 8px rgba(15, 23, 42, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  }}
                  title="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden
                    style={{ color: '#0A66C2' }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.button>
              )}
              {/* WhatsApp - Opens Selector in Card */}
              <motion.button
                data-whatsapp-button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  // Trigger WhatsApp selector in ActionsRow
                  actionsRowRef.current?.openWhatsAppSelector()
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onTouchStart={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 p-0 rounded-full flex items-center justify-center overflow-hidden transition-all cursor-pointer bg-white touch-manipulation"
                style={{
                  border: '1.5px solid rgba(37, 211, 102, 0.65)',
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow:
                    '0 10px 22px rgba(37, 211, 102, 0.32), 0 4px 8px rgba(15, 23, 42, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* Content – soft top-to-white gradient (matches Mango premium feel) */}
            <div
              className="relative px-4 sm:px-5 pb-6 pt-3 max-w-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.98) 36%, rgba(247,255,253,0.98) 100%)',
              }}
            >
              {/* Soft white halo behind brand info (Mango blur lift) */}
              <div className="absolute inset-x-6 top-2 h-10 rounded-full bg-white/70 blur-2xl pointer-events-none" />

              {/* Logo Circle – subtle infinite float (Mango polish) */}
              <motion.div
                className="absolute -top-14 left-6"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -4, 0],
                }}
                transition={{
                  scale: { duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 0.4, delay: 0.1 },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' },
                }}
              >
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden bg-white p-1.5"
                  style={{
                    border: '2px solid rgba(184, 135, 44, 0.48)',
                    boxShadow:
                      '0 16px 32px rgba(15, 118, 110, 0.18), 0 5px 12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.7) inset',
                  }}
                >
                  <Image
                    src={shopConfig.assets.logo}
                    alt="Panaché Salon logo"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                    style={{ transform: 'scale(1.45)' }}
                  />
                </div>
              </motion.div>

              {/* Brand info - title + subtitle + tagline + badges */}
              <motion.div 
                className="pt-20 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="text-2xl font-black mb-1 leading-tight tracking-tight" style={{ color: '#0f172a' }}>
                  {shopConfig.name}
                </h1>
                <p className="font-semibold text-[15px] mb-0.5" style={{ color: '#9A6B20' }}>
                  {shopConfig.tagline}
                </p>
                {'serviceTagline' in shopConfig && (shopConfig as { serviceTagline?: string }).serviceTagline && (
                  <p className="text-[12.5px] font-semibold leading-snug mb-3" style={{ color: '#64748b' }}>
                    {(shopConfig as { serviceTagline: string }).serviceTagline}
                  </p>
                )}
                {'keywordBadges' in shopConfig && Array.isArray(shopConfig.keywordBadges) && (
                  <div className="flex flex-col gap-2 mb-4 w-full">
                    {/* Business highlights with a dedicated timings control. */}
                    <div className="flex flex-wrap items-center gap-2 w-full">
                      {shopConfig.keywordBadges.map((badge: string) => {
                        const Icon = getKeywordBadgeIcon(badge)
                        return (
                          <span
                            key={badge}
                            className="inline-flex max-w-full items-center gap-1.5 px-3 py-[6px] rounded-full text-[11px] font-semibold"
                            style={{
                              background: 'linear-gradient(135deg,#FCF7ED 0%,#EEE1C7 100%)',
                              color: '#604B22',
                              border: '1px solid rgba(138,115,58,.34)',
                              boxShadow: '0 2px 7px rgba(96,75,34,.10)',
                            }}
                          >
                            <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#8A733A' }} strokeWidth={2.2} />
                            <span className="leading-none break-words">{badge}</span>
                          </span>
                        )
                      })}
                      <button
                        type="button"
                        onClick={(event) => { event.stopPropagation(); window.setTimeout(() => setHoursPopoverOpen(true), 0) }}
                        className="group inline-flex h-8 w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-left transition active:scale-95"
                        style={{ background: openStatus.isOpen ? 'rgba(34,197,94,.14)' : 'rgba(239,68,68,.12)', color: openStatus.isOpen ? '#16A34A' : '#E5484D', borderColor: openStatus.isOpen ? 'rgba(34,197,94,.45)' : 'rgba(239,68,68,.40)', boxShadow: openStatus.isOpen ? '0 6px 14px rgba(34,197,94,.16)' : '0 6px 14px rgba(239,68,68,.12)' }}
                        aria-expanded={hoursPopoverOpen}
                      >
                        <Clock3 className="h-4 w-4" strokeWidth={2.3} />
                        <span className="text-[11px] font-black">{openStatus.isOpen ? 'Open now' : 'Closed now'}</span>
                        <span className="text-[9.5px] font-extrabold opacity-90">{openStatus.isOpen ? `· Closes ${openStatus.closeTimeLabel}` : `· Opens ${openStatus.openTimeLabel}`}</span>
                        <ChevronRight className="h-3 w-3 opacity-75 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                    {hoursPortalMounted && createPortal(<AnimatePresence>
                      {hoursPopoverOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed left-1/2 top-3 z-[99999] flex h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-md -translate-x-1/2 items-start justify-center overflow-y-auto rounded-[26px] border border-[#d8be80]/65 bg-[#18120d]/48 p-4 pt-6 shadow-[0_28px_80px_rgba(0,0,0,.42)] backdrop-blur-md" onClick={() => setHoursPopoverOpen(false)}>
                          <motion.div initial={{ y: 45, opacity: 0, scale: .96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 35, opacity: 0, scale: .97 }} transition={{ type: 'spring', stiffness: 310, damping: 27 }} className="relative w-full max-w-[360px] overflow-hidden rounded-[28px] border border-[#e2d2b4] bg-white p-5 shadow-[0_24px_64px_rgba(0,0,0,.32)]" onClick={(event) => event.stopPropagation()}>
                            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#ead28f]/25 blur-3xl" />
                            <div className="relative flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl border border-white bg-white/75 text-[#80652c] shadow-lg"><Clock3 className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#9B7A32]">Salon hours</p><h3 className="mt-0.5 text-xl font-black text-[#181818]">Plan your visit</h3></div></div><button type="button" onClick={() => setHoursPopoverOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-white bg-white/75 text-[#80652c]" aria-label="Close timings"><X className="h-4 w-4" /></button></div>
                            <div className="relative mt-4 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-3 py-2.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(34,197,94,.12)]"/><p className="text-xs font-extrabold text-emerald-800">{openStatus.isOpen ? `Open now · closes ${openStatus.closeTimeLabel}` : `Closed now · opens ${openStatus.openTimeLabel}`}</p></div>
                            <div className="relative mt-3 space-y-1.5">{['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((dayName) => { const today = dayName === new Date().toLocaleDateString('en-US',{weekday:'long'}); return <div key={dayName} className="flex items-center justify-between rounded-[14px] border px-3 py-2.5" style={{background:today?'rgba(242,229,197,.88)':'rgba(255,255,255,.55)',borderColor:today?'rgba(154,122,53,.26)':'rgba(222,211,191,.75)'}}><span className="text-[13px] font-bold text-[#30271d]">{dayName}{today&&<span className="ml-2 rounded-full bg-[#80652c] px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-white">Today</span>}</span><span className="text-[11px] font-bold text-[#6b5b48]">10:00 AM – 8:00 PM</span></div>})}</div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>, document.body)}
                  </div>
                )}
              </motion.div>

              {/* Actions */}
              <motion.div
                data-actions-row
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <ActionsRow 
                  ref={actionsRowRef}
                  onOpenPayments={handleOpenPayments}
                  onOpenAppointment={handleOpenAppointment}
                  onOpenDoctorProfile={handleOpenDoctorProfile}
                />
              </motion.div>

            </div>
          </div>
        }
        faceInfo={
          <div
            className="backdrop-blur-md rounded-[24px] shadow-2xl border-2 cursor-pointer relative h-full overflow-hidden flex flex-col"
            style={{
              minHeight: 'min(580px, 85dvh)',
              boxSizing: 'border-box',
              background: 'linear-gradient(145deg,#0e0c0a 0%,#211a11 48%,#4a3820 100%)',
              borderColor: 'rgba(229,214,155,.42)',
              boxShadow: '0 18px 40px rgba(0,0,0,.28), 0 0 0 1px rgba(229,214,155,.12)',
            }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button, a, [role="button"]')) return
              handleFlip(e, true)
            }}
          >
            {/* Tap to Return – same as Mango, bluish accent */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); handleFlip(e, true); }}
              className="absolute top-4 right-4 z-10 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={t('tapToReturn')}
            >
              <Hand className="w-3.5 h-3.5 text-white" />
              <span style={{ fontSize: '12px' }}>{t('tapToReturn')}</span>
            </motion.button>

            {/* Animated background pattern – like Mango */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Content – white text, glass blocks like Mango */}
            <div
              className="relative flex-1 flex flex-col items-center justify-center min-h-0 text-white overflow-hidden overflow-x-hidden"
              style={{
                paddingLeft: 'max(1rem, env(safe-area-inset-left) + 4px)',
                paddingRight: 'max(1rem, env(safe-area-inset-right) + 4px)',
                // Use clamped padding + vertical centering to avoid "empty space" feel
                // while keeping room for the top-right "Tap to Return" control.
                paddingTop: 'clamp(2.6rem, 5.5vh, 4rem)',
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom) + 0.75rem)',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="w-full flex flex-col items-center max-w-[calc(100%-0.25rem)] flex-shrink-0 gap-0"
              >
                <h2 className="text-xl sm:text-2xl font-black mb-4 pt-1 pb-1 tracking-wide text-white text-center w-full [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]">
                  Business Snapshot
                </h2>

                {/* Block 1: Location – Mango-style light block + dark blue icon pill */}
                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'linear-gradient(135deg,rgba(255,253,247,.97),rgba(235,220,184,.94))',
                    borderColor: 'rgba(216,197,141,.62)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(30,64,175,0.28)]"
                    style={{ background: 'linear-gradient(135deg,#604B22,#9A7A35)' }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: '#DBEAFE' }} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-slate-900">Location</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {('snapshotLocationLine' in shopConfig && (shopConfig as { snapshotLocationLine?: string }).snapshotLocationLine) || (shopConfig as { contact: { address: string } }).contact.address}
                    </p>
                  </div>
                </div>

                {/* Block 2: Services – same treatment */}
                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'linear-gradient(135deg,rgba(255,253,247,.97),rgba(235,220,184,.94))',
                    borderColor: 'rgba(216,197,141,.62)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(30,64,175,0.28)]"
                    style={{ background: 'linear-gradient(135deg,#604B22,#9A7A35)' }}
                  >
                    <Store className="w-5 h-5" style={{ color: '#DBEAFE' }} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-slate-900">Services Offered</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {('snapshotServicesLine' in shopConfig && (shopConfig as { snapshotServicesLine?: string }).snapshotServicesLine) || (shopConfig as { serviceTagline?: string }).serviceTagline}
                    </p>
                  </div>
                </div>

                {/* Block 3: Office Hours – same treatment */}
                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'linear-gradient(135deg,rgba(255,253,247,.97),rgba(235,220,184,.94))',
                    borderColor: 'rgba(216,197,141,.62)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(30,64,175,0.28)]"
                    style={{ background: 'linear-gradient(135deg,#604B22,#9A7A35)' }}
                  >
                    <Clock className="w-5 h-5" style={{ color: '#DBEAFE' }} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-slate-900">Office Hours</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {('snapshotHours' in shopConfig && (shopConfig as { snapshotHours?: string }).snapshotHours) || (shopConfig as { contact: { storeHours: string } }).contact.storeHours}
                    </p>
                  </div>
                </div>

                {/* Google Map – matches block treatment */}
                <div
                  className="w-full h-28 sm:h-32 rounded-[22px] overflow-hidden mb-4 pointer-events-none flex-shrink-0 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'rgba(255,255,255,0.94)',
                    borderColor: 'rgba(10, 102, 178, 0.35)',
                  }}
                >
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Open in Maps – same style as Mango (white pill on gradient) */}
                <div className="w-full flex flex-col items-center mt-2 pt-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                  <motion.a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 bg-white/25 hover:bg-white/35 active:bg-white/40 text-white font-semibold px-6 py-3.5 rounded-full border border-white/30 backdrop-blur-sm touch-manipulation pointer-events-auto shadow-[0_10px_25px_rgba(0,0,0,0.3)] min-h-[48px] min-w-[180px]"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleFlip(e, true)
                      setTimeout(() => {
                        window.open(`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`, '_blank', 'noopener,noreferrer')
                      }, 700)
                    }}
                    style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', WebkitTapHighlightColor: 'transparent' }}
                  >
                    <MapPin className="w-5 h-5 flex-shrink-0 text-white" />
                    Get Directions
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        }
        facePayment={
          <PaymentFace
            upiId={shopConfig.payment.upiId}
            upiId2={'upiId2' in shopConfig.payment ? shopConfig.payment.upiId2 : undefined}
            upiName={shopConfig.payment.upiName}
            upiQrImageUrl={shopConfig.payment.upiQrImageUrl}
            scannerImage={shopConfig.payment.scannerImage}
            bank={shopConfig.payment.bank}
            onBack={handleBackFromPayment}
          />
        }
        faceAppointment={
          <AppointmentFace onBack={handleBackFromAppointment} />
        }
        faceDoctor={
          <div
            className="rounded-[24px] shadow-2xl border cursor-default relative h-full overflow-hidden flex flex-col text-slate-900 bg-white"
            style={{
              minHeight: 'min(580px, 85dvh)',
              boxSizing: 'border-box',
              backgroundImage: 'radial-gradient(circle at 100% 0%, #f0fdf4 0%, transparent 40%), radial-gradient(circle at 0% 100%, #f0fbf9 0%, transparent 40%)',
              borderColor: 'rgba(19, 123, 112, 0.15)',
              boxShadow: '0 26px 60px rgba(0, 0, 0, 0.08), 0 10px 26px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[220px] shrink-0 overflow-hidden rounded-t-[24px]">
              <Image
                src="/femina/beauty.jpg"
                    alt="Panaché Salon"
                fill
                sizes="(max-width: 480px) 100vw, 420px"
                className="object-cover"
                style={{ objectPosition: 'center 20%' }}
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  playClickSound()
                  handleBackFromDoctorProfile()
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  playClickSound()
                  handleBackFromDoctorProfile()
                }}
                className="absolute left-4 top-4 z-30 flex h-10 items-center justify-center gap-1.5 rounded-full bg-white/95 px-4 text-sm font-black text-[#7A2148] shadow-[0_10px_24px_rgba(7,59,115,0.16)] ring-1 ring-[#F3C7D8] backdrop-blur-md transition-transform active:scale-95 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label="Back to card"
              >
                <ArrowLeft className="h-4 w-4 pointer-events-none" />
                Back
              </button>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-6 pt-1">
              <div className="flex flex-col gap-2 -mt-10">
                <div className="text-center shrink-0 relative z-10 mb-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#137B70] mb-0.5">
                    Salon Profile
                  </p>
                  <h2 className="text-[1.6rem] font-black leading-tight tracking-tight text-slate-900">
                    Panaché Salon
                  </h2>
                  <p className="mt-0.5 text-[13px] font-bold leading-snug text-slate-500">
                    Luxury Hair, Beauty & Makeup Salon
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center shrink-0">
                  {doctorCredentials.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#137B70]/20 bg-[#f0fdf4] px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#137B70] shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 rounded-[18px] border border-slate-100 bg-white p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-center">
                  <p className="text-[13px] font-bold leading-5 text-slate-800">
                    Curated beauty • Chandigarh
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium leading-5 text-slate-500">
                    Personalised hair, beauty, makeup, nails and wellness services in a calm studio.
                  </p>
                </div>

                <div className="shrink-0 grid grid-cols-2 gap-2">
                  {doctorExpertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-2.5 py-2.5 text-center text-[11.5px] font-bold text-slate-700 shadow-sm flex items-center justify-center"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 grid grid-cols-2 gap-2">
                  <div className="rounded-[16px] border border-slate-100 bg-white px-2 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] text-center flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#137B70]">Owner</p>
                    <p className="mt-1 text-[11px] font-bold leading-snug text-slate-800">Panaché Salon</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-100 bg-white px-2 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] text-center flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#137B70]">Former HOD</p>
                    <p className="mt-1 text-[11px] font-bold leading-snug text-slate-800">Sector 9D, Chandigarh</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 mb-2 flex flex-col gap-2.5">
                <Link
                  href="/book-consultation"
                  onClick={(e) => {
                    e.stopPropagation()
                    playClickSound()
                  }}
                  className="flex shrink-0 h-[52px] w-full items-center justify-center gap-2 rounded-[16px] text-[15px] font-black text-white shadow-[0_12px_24px_rgba(7,59,115,0.22)] transition-transform active:scale-[0.98] cursor-pointer touch-manipulation"
                  style={{ background: 'linear-gradient(135deg, #7A2148 0%, #B32A64 100%)' }}
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        }
      />

    </motion.section>
  )
}
