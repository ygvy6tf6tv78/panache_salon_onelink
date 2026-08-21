'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Download, X, Calendar, ReceiptText, Scissors, Instagram, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { shopConfig, ContactPerson } from '../config'
import { getTelLink, getWhatsAppLink, formatPhoneDisplay } from '../../../lib/phone'
import { generateVCard, downloadVCard } from '../../../lib/vcard'
import { playClickSound } from '../../../lib/playClickSound'
import { useLanguage } from '../../../contexts/LanguageContext'
import { prepareReturnToHeroCard } from '../../../lib/homeNavigation'
import GoogleGIcon from '../../../components/GoogleGIcon'

interface ActionsRowProps {
  onOpenPayments?: () => void
  onOpenAppointment?: () => void
  onOpenDoctorProfile?: () => void
}

export interface ActionsRowRef {
  openWhatsAppSelector: () => void
}

const servicePreviewImages = [
  '/femina/panache-hair-editorial.png',
  '/femina/panache-skin-editorial.png',
  '/femina/panache-beauty-editorial.png',
] as const

const ActionsRow = forwardRef<ActionsRowRef, ActionsRowProps>(({ onOpenPayments, onOpenAppointment, onOpenDoctorProfile }, ref) => {
  const { t } = useLanguage()
  const [callSelectorOpen, setCallSelectorOpen] = useState(false)
  const [whatsappSelectorOpen, setWhatsappSelectorOpen] = useState(false)
  const [servicePreviewIndex, setServicePreviewIndex] = useState(0)
  const callSelectorRef = useRef<HTMLDivElement>(null)
  const whatsappSelectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setServicePreviewIndex((index) => (index + 1) % servicePreviewImages.length)
    }, 3600)

    return () => window.clearInterval(rotation)
  }, [])

  // Expose WhatsApp selector toggle to parent via ref
  useImperativeHandle(ref, () => ({
    openWhatsAppSelector: () => {
      setWhatsappSelectorOpen(true)
      setCallSelectorOpen(false)
    },
  }))

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (callSelectorOpen || whatsappSelectorOpen) {
        const target = e.target as HTMLElement
        if (
          !target.closest('.popup-selector') &&
          !target.closest('[data-call-button]') &&
          !target.closest('[data-whatsapp-button]')
        ) {
          setCallSelectorOpen(false)
          setWhatsappSelectorOpen(false)
        }
      }
    }

    if (callSelectorOpen || whatsappSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [callSelectorOpen, whatsappSelectorOpen])

  const handleCall = (person: ContactPerson) => {
    playClickSound()
    const telLink = getTelLink(person.phoneE164)
    window.location.href = telLink
    setCallSelectorOpen(false)
  }

  const handleWhatsApp = (person: ContactPerson) => {
    playClickSound()
    const message = shopConfig.whatsapp?.defaultMessage || 'Hi Panaché, I would like to book an appointment.'
    const whatsappLink = getWhatsAppLink(person.whatsappE164, message)
    window.open(whatsappLink, '_blank')
    setWhatsappSelectorOpen(false)
  }

  const handleDirections = () => {
    playClickSound()
    const mapUrl = shopConfig.google?.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopConfig.contact.mapQuery)}`
    window.open(mapUrl, '_blank')
  }

  const handleSaveContact = () => {
    playClickSound()
    const vCard = generateVCard({
      name: shopConfig.name,
      organization: shopConfig.name,
      phones: shopConfig.contactPersons.map(p => p.phoneE164.replace(/^91/, '')),
      email: shopConfig.contact.email,
      address: shopConfig.contact.address,
      website: shopConfig.url,
    })
    downloadVCard(vCard, `${shopConfig.name.replace(/\s+/g, '-')}-contact.vcf`)
  }

  const handleReview = () => {
    playClickSound()
    prepareReturnToHeroCard()
  }

  return (
    <>
      <div className="flex w-full min-w-0 max-w-full flex-col gap-3">
        {/* Row 1: Call Now | Book Visit */}
        <div className="order-1 grid grid-cols-2 gap-2 w-full min-w-0">
          <Button
            data-call-button
            title="Call our office"
            onClick={(e) => {
              playClickSound()
              setCallSelectorOpen(!callSelectorOpen)
              setWhatsappSelectorOpen(false)
            }}
            className="luxury-gold-border w-full min-w-0 h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden group"
            style={{
              backgroundImage: 'linear-gradient(105deg,rgba(82,58,18,.96),rgba(154,129,64,.84)),url(/femina/panache-hair-editorial.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,.28), 0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.22)',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,.38), 0 6px 12px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.24)'
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              e.currentTarget.style.backgroundImage = 'linear-gradient(105deg,rgba(101,73,24,.94),rgba(178,150,75,.80)),url(/femina/panache-hair-editorial.png)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,.28), 0 4px 8px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.2)'
              e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
              e.currentTarget.style.backgroundImage = 'linear-gradient(105deg,rgba(82,58,18,.96),rgba(154,129,64,.84)),url(/femina/panache-hair-editorial.png)'
            }}
          >
            <Phone className="w-4 h-4 relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }} />
            <span className="text-sm font-bold relative z-10 truncate" style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{t('callNow')}</span>
          </Button>

          <Button
            title="Book appointment"
            onClick={(e) => {
              playClickSound()
              e.stopPropagation()
              prepareReturnToHeroCard()
              window.location.href = '/book-consultation'
            }}
            className="w-full min-w-0 h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(105deg,rgba(82,58,18,.96),rgba(154,129,64,.78)),url(/femina/panache-beauty-editorial.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 20px rgba(10, 102, 178, 0.34), 0 4px 8px rgba(7, 59, 115, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(112,71,82,.34), 0 6px 12px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.28)'
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              e.currentTarget.style.backgroundImage = 'linear-gradient(105deg,rgba(96,75,34,.94),rgba(178,144,70,.76)),url(/femina/panache-beauty-editorial.png)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(112,71,82,.26), 0 4px 8px rgba(0,0,0,.16), inset 0 1px 0 rgba(255,255,255,.22)'
              e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
              e.currentTarget.style.backgroundImage = 'linear-gradient(105deg,rgba(82,58,18,.96),rgba(154,129,64,.78)),url(/femina/panache-beauty-editorial.png)'
            }}
          >
            <Calendar className="w-4 h-4 relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.18))' }} />
            <span className="text-sm font-bold relative z-10 truncate" style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.12)' }}>Book Now</span>
          </Button>
        </div>

        {/* Our Services */}
        <Link
          href="/services"
          onClick={() => {
            playClickSound()
            prepareReturnToHeroCard()
          }}
          title="Explore our services"
          className="order-2 relative flex min-h-[82px] w-full items-center overflow-hidden rounded-[22px] px-3.5 py-2.5 text-white transition-transform active:scale-[0.98]"
          style={{ background: '#604B22', boxShadow: '0 12px 24px rgba(96,75,34,.25), inset 0 1px 0 rgba(255,255,255,.2)', border: '1px solid rgba(216,197,141,.72)' }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence initial={false} mode="sync"><motion.img key={servicePreviewImages[servicePreviewIndex]} src={servicePreviewImages[servicePreviewIndex]} alt="" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 0.72, scale: 1 }} exit={{ opacity: 0.72, scale: 1.02 }} transition={{ duration: 0.8, ease: 'easeInOut' }} className="h-full w-full object-cover object-center" /></AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#3f3016_0%,rgba(96,75,34,.94)_48%,rgba(96,75,34,.48)_100%)]" />
          <div className="relative z-10 flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/80 bg-white shadow-[0_7px_18px_rgba(0,0,0,0.22)]"><Scissors className="h-5 w-5 text-[#181818]" strokeWidth={2.35} /></div>
            <div className="min-w-0 text-left"><span className="block text-[16px] font-extrabold tracking-[-0.02em]">Our Services</span><span className="mt-0.5 block truncate text-xs font-medium text-white/82">Hair, beauty, makeup, nails and hair systems</span></div>
          </div>
          <div className="relative z-10 ml-2 flex shrink-0 -space-x-2" aria-hidden>
            {servicePreviewImages.map((image, index) => (
              <motion.span key={image} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_6px_15px_rgba(0,0,0,.28)]" animate={{ y: index === servicePreviewIndex ? -3 : 0, scale: index === servicePreviewIndex ? 1.08 : 1 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
                <img src={image} alt="" className="h-full w-full object-cover" />
              </motion.span>
            ))}
          </div>
        </Link>

        {/* Row 3: Price Menu | Payment */}
        <div className="order-3 grid grid-cols-2 gap-2 w-full min-w-0">
          <Link href="/packages" onClick={() => { playClickSound(); prepareReturnToHeroCard() }} title="View signature price menu" className="relative h-11 min-w-0 overflow-hidden rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation" style={{ color: '#FFFFFF', backgroundImage: 'linear-gradient(105deg,rgba(82,58,18,.96),rgba(154,129,64,.78)),url(/femina/panache-skin-editorial.png)', backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(242,228,175,.50)', boxShadow: '0 8px 17px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.18)', WebkitTapHighlightColor: 'transparent', transform: 'translateY(-1px)' }}>
            <ReceiptText className="relative z-10 h-5 w-5 shrink-0 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,.24)]" /><span className="relative z-10 text-sm font-bold truncate text-white" style={{ fontSize: '14px' }}>Price Menu</span>
          </Link>
          <Button onClick={() => { playClickSound(); onOpenPayments?.() }} title="Open payment" className="relative h-11 min-w-0 overflow-hidden rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation" style={{ background: 'linear-gradient(135deg,#604B22,#8A733A)', border: '1px solid rgba(242,228,175,.50)', boxShadow: '0 9px 22px rgba(0,0,0,.3), 0 3px 8px rgba(15,23,42,.1), inset 0 1px 0 rgba(255,255,255,.18)', WebkitTapHighlightColor: 'transparent', transform: 'translateY(-1px)' }}>
            <Image src="/femina/icons8-bhim-48.png" alt="" width={20} height={20} className="relative z-10 h-5 w-5 shrink-0 object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.16)]" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden /><span className="relative z-10 text-sm font-bold truncate text-white" style={{ fontSize: '14px' }}>Payment</span>
          </Button>
        </div>

        {/* Row 4: Reviews | Location */}
        <div className="order-5 grid grid-cols-2 gap-2 w-full min-w-0">
          <Link
            href="/reviews"
            title="Read and write Google reviews"
            onClick={handleReview}
            className="relative min-w-0 h-11 overflow-hidden rounded-2xl border border-white/80 transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
            style={{
              background: 'linear-gradient(135deg,#FFFFFF 0%,#FFF8E7 52%,#F5E7BC 100%)',
              boxShadow: '0 8px 18px rgba(96,75,34,.16),0 4px 10px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.92)',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)',
            }}
          >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-around px-2 opacity-[.12]" aria-hidden>{[1,2,3,4,5].map((star)=><Star key={star} className="h-6 w-6 fill-[#FBBC05] text-[#F4A900]" strokeWidth={1.5} />)}</span>
            <GoogleGIcon className="relative z-10 h-[18px] w-[18px] shrink-0" />
            <span className="relative z-10 text-sm font-bold text-[#151515]">Reviews</span>
          </Link>
          <Button
            title="Find our office"
            onClick={() => { playClickSound(); window.location.href = '/nearest-branch' }}
            className="relative h-11 min-w-0 overflow-hidden rounded-2xl border border-white/80 transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
            style={{
              background: 'linear-gradient(115deg,#CFEBD7 0%,#DFF1E2 48%,#C7E7D2 100%)',
              boxShadow: '0 8px 18px rgba(52,168,83,.19),0 4px 9px rgba(21,21,21,.07),inset 0 1px 0 rgba(255,255,255,.82)',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)',
            }}
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[.14]" viewBox="0 0 180 44" preserveAspectRatio="none" aria-hidden><path d="M-8 34C22 12 42 15 66 28s43 10 62-3 36-14 60-7" fill="none" stroke="#34A853" strokeWidth="2.1"/><path d="M-5 11c30 7 53 5 76-5s45-6 63 5 35 11 53 2" fill="none" stroke="#FBBC05" strokeWidth="1.6"/></svg>
            <span className="relative z-10 grid h-6 w-6 shrink-0 place-items-center" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]"><path d="m2.8 6.1 5.1-2.4v15.9L2.8 22V6.1Z" fill="#34A853"/><path d="m7.9 3.7 6 2.1v15.9l-6-2.1V3.7Z" fill="#FBBC05"/><path d="m13.9 5.8 7.3-2.7V19l-7.3 2.7V5.8Z" fill="#4285F4"/><path d="M16.6 2.2a4.3 4.3 0 0 0-4.3 4.3c0 3.2 4.3 7.8 4.3 7.8s4.3-4.6 4.3-7.8a4.3 4.3 0 0 0-4.3-4.3Z" fill="#EA4335"/><circle cx="16.6" cy="6.5" r="1.65" fill="white"/></svg>
            </span>
            <span className="relative z-10 text-sm font-bold text-[#151515]">{t('officeLocation')}</span>
          </Button>
        </div>

        {/* Row 5: Instagram | WhatsApp */}
        <div className="order-4 grid grid-cols-2 gap-2 w-full min-w-0">
          <a data-instagram-button href={shopConfig.social.instagram} target="_blank" rel="noreferrer" title="Follow Panaché Salon on Instagram" className="relative h-11 min-w-0 overflow-hidden rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 8px 18px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.95)', WebkitTapHighlightColor: 'transparent', transform: 'translateY(-1px)' }}>
            <Instagram className="relative z-10 h-5 w-5 shrink-0 text-[#DD2A7B]" /><span className="relative z-10 bg-[linear-gradient(90deg,#F58529_0%,#DD2A7B_48%,#8134AF_100%)] bg-clip-text text-sm font-extrabold text-transparent">Instagram</span>
          </a>
          <Button data-whatsapp-button title="Chat with us on WhatsApp" onClick={() => { playClickSound(); setWhatsappSelectorOpen(true); setCallSelectorOpen(false) }} className="relative h-11 min-w-0 overflow-hidden rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation" style={{ color: '#0F172A', background: 'linear-gradient(115deg,#FFFFFF 0%,#F5FFF8 58%,#DFF7E8 100%)', border: '1px solid rgba(37,211,102,.22)', boxShadow: '0 8px 16px rgba(37,211,102,.13), inset 0 1px 0 rgba(255,255,255,.95)', WebkitTapHighlightColor: 'transparent', transform: 'translateY(-1px)' }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="#25D366" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg><span className="text-sm font-bold truncate" style={{ fontSize: '14px' }}>{t('whatsapp')}</span>
          </Button>
        </div>

        {/* Row 6: Gallery | Save Contact */}
        <div className="order-6 grid grid-cols-2 gap-2 w-full min-w-0">
          <Link href="/gallery" onClick={() => { playClickSound(); prepareReturnToHeroCard() }} title="View gallery" className="order-2 min-w-0 h-11 rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation" style={{ color: '#1D1B19', background: '#FCFBF8', border: '1px solid #E4E0D7', boxShadow: '0 8px 16px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.95)', WebkitTapHighlightColor: 'transparent', transform: 'translateY(-1px)' }}>
            <span className="flex items-center -space-x-1.5" aria-hidden><span className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm"><img src="/femina/panache-hair-editorial.png" alt="" className="h-full w-full object-cover" /></span><span className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm"><img src="/femina/panache-beauty-editorial.png" alt="" className="h-full w-full object-cover" /></span></span><span className="text-sm font-bold truncate">{t('gallery')}</span>
          </Link>
          <Button title="Save contact to your phone" onClick={handleSaveContact} className="order-1 w-full min-w-0 h-11 bg-[#FCFBF8] backdrop-blur-md text-[#1D1B19] rounded-2xl border border-[#C7B27E] relative overflow-hidden transition-all touch-manipulation flex items-center justify-center gap-2" style={{ boxShadow: '0 8px 18px rgba(117,89,35,.14), inset 0 1px 0 rgba(255,255,255,.95)', WebkitTapHighlightColor: 'transparent', transform: 'translateY(-1px)' }}>
            <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/90 to-transparent animate-[shine_3s_ease-in-out_infinite]" />
            <Download className="relative z-10 h-4 w-4 text-[#1D1B19]" />
            <span className="relative z-10 text-sm font-bold truncate">Save Contact</span>
          </Button>
        </div>

        {/* Call Selector - Bottom Pop-out */}
        <AnimatePresence>
          {callSelectorOpen && (
            <>
              {/* Popup */}
              <motion.div
                ref={callSelectorRef}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
                style={{ 
                  paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                  maxHeight: '80vh'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-semibold text-slate-800">Select Number to Call</div>
                  <button
                    onClick={() => setCallSelectorOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  {shopConfig.contactPersons.map((person) => (
                    <motion.button
                      key={person.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                      onClick={() => handleCall(person)}
                      className="flex min-w-[112px] flex-col items-center gap-2 rounded-2xl border border-[#d5bb72] bg-[#fffaf0] px-4 py-3 shadow-[0_8px_18px_rgba(96,75,34,.12)] outline-none touch-manipulation focus-visible:ring-2 focus-visible:ring-[#9a8140]/35"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                        style={{
                          background: 'linear-gradient(135deg,#604B22,#9A8140)',
                          border: '1px solid rgba(216,190,128,.78)',
                        }}
                      >
                        <Phone className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-800 text-center">{person.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* WhatsApp Selector - Bottom Pop-out */}
        <AnimatePresence>
          {whatsappSelectorOpen && (
            <>
              {/* Popup */}
              <motion.div
                ref={whatsappSelectorRef}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
                style={{ 
                  paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                  maxHeight: '80vh'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-semibold text-slate-800">Select Number for WhatsApp</div>
                  <button
                    onClick={() => setWhatsappSelectorOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  {shopConfig.contactPersons.map((person) => (
                    <motion.button
                      key={person.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                      onClick={() => handleWhatsApp(person)}
                      className="flex flex-col items-center gap-2 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20BA5A] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-slate-800 text-center">{person.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
})

ActionsRow.displayName = 'ActionsRow'

export default ActionsRow
