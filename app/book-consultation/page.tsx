'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, CheckCircle2, ChevronDown, Clock, Phone, Scissors, User } from 'lucide-react'
import { shopConfig } from '../shops/dogra-associates/config'
import { serviceCategories } from '../shops/dogra-associates/services'
import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']

function todayDateValue() {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}

function formatDateForDisplay(value: string) {
  if (!value) return 'Select date'
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Date(year, month - 1, day).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BookConsultationPage() {
  const searchParams = useSearchParams()
  const initialService = searchParams.get('service') || ''
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(initialService)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const services = useMemo(
    () => Object.values(serviceCategories).flatMap((category) => category.items.map((item) => item.name)),
    []
  )

  const canSubmit = name.trim().length > 1 && service.trim().length > 0 && date && time
  const whatsappPhone = shopConfig.contactPersons[0]?.whatsappE164 || '919149837277'

  const message = `Hi Luméra Salon & Spa,

I would like to book an appointment at Luméra Salon & Spa.

Name: ${name.trim()}
Phone: ${phone.trim()}
Service: ${service}
Preferred Date: ${date}
Preferred Time: ${time}

Please confirm the appointment.`

  return (
    <main
      className="min-h-screen px-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
      style={{
        background: 'linear-gradient(180deg, #eef7ff 0%, #ffffff 42%, #f8fbff 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-md pb-6">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 overflow-hidden rounded-[28px] border border-white/25 p-3.5 shadow-[0_24px_54px_rgba(7,59,115,0.22),0_8px_18px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]"
          style={{ background: 'linear-gradient(135deg, #5A1636 0%, #B32A64 72%, #E18AAE 100%)' }}
        >
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              onClick={() => prepareReturnToHeroCard()}
              className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-[#7A2148] shadow-[0_10px_22px_rgba(0,0,0,0.18)] ring-1 ring-white/40 backdrop-blur-md transition-transform active:scale-95"
              aria-label="Back to card"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="absolute left-0 right-0 px-12 text-center text-[1.24rem] font-black leading-tight tracking-tight text-white">
              Book Appointment
            </h1>
            <span className="z-10 h-10 w-10" aria-hidden />
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="rounded-[30px] border border-[#B32A64]/15 bg-white p-4 shadow-[0_22px_52px_rgba(7,59,115,0.12),0_8px_18px_rgba(10,102,178,0.05),inset_0_1px_0_rgba(255,255,255,0.98)]"
          style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5FAFF 100%)' }}
        >
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-bold text-[#0F2A44]">
                <User className="h-4 w-4 text-[#B32A64]" />
                Name
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="h-12 w-full rounded-2xl border border-[#F3C7D8] bg-white px-4 text-[16px] font-semibold text-slate-950 shadow-[0_6px_14px_rgba(7,59,115,0.04),inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none focus:border-[#B32A64] focus:ring-4 focus:ring-[#B32A64]/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-bold text-[#0F2A44]">
                <Phone className="h-4 w-4 text-[#B32A64]" />
                Phone
              </span>
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 z-10 flex w-20 items-center justify-center rounded-l-2xl border-r border-[#F3C7D8] bg-[#FFF1F6] text-[14px] font-black text-[#7A2148]">
                  🇮🇳 +91
                </div>
                <input
                  value={phone}
                  onChange={(event) => {
                    const val = event.target.value.replace(/\D/g, '')
                    if (val.length <= 10) setPhone(val)
                  }}
                  placeholder="10-digit mobile number"
                  inputMode="tel"
                  className="h-12 w-full rounded-2xl border border-[#F3C7D8] bg-white pl-24 pr-4 text-[16px] font-semibold text-slate-950 shadow-[0_6px_14px_rgba(7,59,115,0.04),inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none focus:border-[#B32A64] focus:ring-4 focus:ring-[#B32A64]/10"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-bold text-[#0F2A44]">
                <Scissors className="h-4 w-4 text-[#B32A64]" />
                Choose Service
              </span>
              <div className="relative">
                <select
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-[#F3C7D8] bg-white px-4 pr-11 text-[16px] font-semibold text-slate-950 shadow-[0_6px_14px_rgba(7,59,115,0.04),inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none focus:border-[#B32A64] focus:ring-4 focus:ring-[#B32A64]/10"
                >
                  <option value="">Select service</option>
                  {services.map((item, index) => (
                    <option key={`${item}-${index}`} value={item}>
                      {item}
                    </option>
                  ))}
                  <option value="Other / Consultation">Other / Consultation</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B32A64]" />
              </div>
            </label>

            <div className="grid grid-cols-2 gap-3 w-full">
              <label className="block w-full">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.08em] text-[#0F2A44]">
                  <Calendar className="h-4 w-4 text-[#B32A64]" />
                  Date
                </span>
                <div className="relative w-full">
                  <input
                    type="date"
                    onClick={(e) => {
                      if (typeof e.currentTarget.showPicker === 'function') {
                        try { e.currentTarget.showPicker() } catch (err) {}
                      }
                    }}
                    onFocus={(e) => {
                      if (typeof e.currentTarget.showPicker === 'function') {
                        try { e.currentTarget.showPicker() } catch (err) {}
                      }
                    }}
                    min={todayDateValue()}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="booking-date-input block h-12 w-full cursor-pointer appearance-none rounded-2xl border border-[#F3C7D8] bg-white pl-3 pr-8 text-[16px] font-semibold shadow-[0_6px_14px_rgba(7,59,115,0.04),inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none focus:border-[#B32A64] focus:ring-4 focus:ring-[#B32A64]/10 m-0"
                    style={{
                      lineHeight: 'normal',
                      color: 'transparent',
                      WebkitTextFillColor: 'transparent',
                    }}
                  />
                  <span className="pointer-events-none absolute left-3 right-8 top-1/2 -translate-y-1/2 truncate text-[16px] font-semibold leading-none text-slate-950">
                    {formatDateForDisplay(date)}
                  </span>
                  <Calendar className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B32A64]" />
                </div>
              </label>
              <label className="block w-full">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.08em] text-[#0F2A44]">
                  <Clock className="h-4 w-4 text-[#B32A64]" />
                  Time
                </span>
                <div className="relative w-full">
                  <select
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-[#F3C7D8] bg-white pl-3 pr-8 text-[16px] font-semibold text-slate-950 shadow-[0_6px_14px_rgba(7,59,115,0.04),inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none focus:border-[#B32A64] focus:ring-4 focus:ring-[#B32A64]/10"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B32A64]" />
                </div>
              </label>
            </div>

          </div>

          <a
            href={canSubmit ? getWhatsAppLink(whatsappPhone, message) : undefined}
            target={canSubmit ? '_blank' : undefined}
            rel="noreferrer"
            aria-disabled={!canSubmit}
            className="mt-5 flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-black text-white shadow-[0_14px_30px_rgba(10,102,178,0.28)]"
            style={{
              background: canSubmit
                ? 'linear-gradient(135deg, #B32A64 0%, #137B70 100%)'
                : 'linear-gradient(135deg, #94A3B8 0%, #CBD5E1 100%)',
              pointerEvents: canSubmit ? 'auto' : 'none',
            }}
          >
            <Calendar className="h-4 w-4" />
            Book Appointment
          </a>
        </motion.section>

        <div className="mt-4 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
          {['FP Luxe — Sector 9C is preselected', 'Salon confirms final availability on WhatsApp', 'Open daily from 10:00 AM to 9:00 PM'].map((item) => (
            <div key={item} className="flex items-center gap-2 py-1.5 text-sm font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-[#137B70]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
