'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
// Shop-specific components
import Hero from './shops/dogra-associates/components/Hero'
import About from './shops/dogra-associates/components/About'
import MenuPreview from './shops/dogra-associates/components/MenuPreview'
import Services from './shops/dogra-associates/components/Services'
import UrgencyCTA from './shops/dogra-associates/components/UrgencyCTA'
import ContactCard from './shops/dogra-associates/components/ContactCard'
// Shop-specific components (Gallery and Reviews)
import Gallery from './shops/dogra-associates/components/Gallery'
import GoogleReviews from './shops/dogra-associates/components/GoogleReviews'
import InstagramCTA from './shops/dogra-associates/components/InstagramCTA'
import SalonUpdate from './shops/dogra-associates/components/SalonUpdate'
// Shared components
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'
import {
  consumeReturnSection,
  consumeSkipLoad,
  type HomeReturnSection,
} from './lib/homeNavigation'

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)
  const [restoreSection, setRestoreSection] = useState<HomeReturnSection | null>(
    null
  )

  useEffect(() => {
    // Returning from an inner page (gallery / services / reviews):
    //   - if a section flag is set, remember it so we can scroll there
    //     once <main> is mounted.
    //   - if any "skip load" flag is set, mount immediately (no splash).
    if (typeof window === 'undefined') return

    const section = consumeReturnSection()
    const skipLoad = consumeSkipLoad() || section !== null
    const hasSeenIntro = window.sessionStorage.getItem('panacheIntroSeen') === 'true'

    if (section) setRestoreSection(section)

    if (skipLoad || hasSeenIntro) {
      setShowLoading(false)
      // Section restore is handled in the next effect once <main> exists.
      // Avoid forcing top scroll here; it can feel like the OneLink jumps.
      return
    }

    // Show the branded intro once per tab only; inner-page navigation stays instant.
    window.sessionStorage.setItem('panacheIntroSeen', 'true')
    const timer = setTimeout(() => setShowLoading(false), 550)
    const fallbackTimer = setTimeout(() => setShowLoading(false), 900)
    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Once <main> is mounted, scroll to the requested section (if any).
  useEffect(() => {
    if (showLoading) return
    if (typeof window === 'undefined') return

    if (restoreSection) {
      // Wait for the next paint so the section's DOM is in place.
      const id = restoreSection
      const t = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
        setRestoreSection(null)
      }, 50)
      return () => window.clearTimeout(t)
    }

    // Strip stale hashes so we don't re-trigger jumps on refresh.
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [showLoading, restoreSection])

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!showLoading && (
        <main 
          className="lumera-demo min-h-screen relative z-10 overflow-x-hidden pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
          style={{
            background: '#151515',
          }}
        >
          <div className="relative z-10">
            <Hero />
            <SalonUpdate />
            <About />
            <div
              className="lower-dark -mx-4 mt-0 px-4 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
              style={{
                background: '#151515',
              }}
            >
              <MenuPreview />
              <Services />
              <UrgencyCTA />
              <Gallery />
              <GoogleReviews />
              <InstagramCTA />
              <ContactCard />
              <div className="mt-8">
                <Footer />
              </div>
            </div>
          </div>
          <BackToTop />
        </main>
      )}
    </>
  )
}
