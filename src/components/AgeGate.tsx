'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { RELATED_LINKS } from '@/lib/constants'

const AGE_VERIFIED_COOKIE = 'sakura_age_verified=1'
const THIRTY_DAYS = 60 * 60 * 24 * 30

export default function AgeGate() {
  const t = useTranslations('ageGate')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const verified = document.cookie
      .split(';')
      .some((cookie) => cookie.trim() === AGE_VERIFIED_COOKIE)
    if (!verified) return
    const frame = window.requestAnimationFrame(() => setVisible(false))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!visible) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  function enterSite() {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${AGE_VERIFIED_COOKIE}; Max-Age=${THIRTY_DAYS}; Path=/; SameSite=Lax${secure}`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] overflow-y-auto bg-stone-950 text-stone-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-rose-950/25 to-stone-950" />
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 35%, #f43f5e 0%, transparent 55%)' }}
      />

      <div className="relative z-10">
        <div className="min-h-svh flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-lg text-center">
          <p className="text-rose-300 text-lg sm:text-xl font-bold tracking-[0.25em] mb-10">SAKURA SPA</p>

          <div className="w-20 h-20 mx-auto rounded-full border border-rose-500/70 bg-rose-950/50 flex items-center justify-center shadow-lg shadow-rose-950/50">
            <span className="text-2xl font-light text-rose-200">18+</span>
          </div>

          <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mt-8 mb-3">Age Verification</p>
          <h1 id="age-gate-title" className="text-3xl sm:text-4xl font-light tracking-widest text-white">
            {t('title')}
          </h1>
          <div className="w-12 h-px bg-rose-500 mx-auto mt-5" />

          <p className="text-stone-300 text-sm sm:text-base leading-7 whitespace-pre-line mt-8">
            {t('description')}
          </p>
          <p className="text-white text-lg sm:text-xl mt-6">{t('question')}</p>

          <div className="flex flex-col gap-3 mt-8 max-w-sm mx-auto">
            <button
              type="button"
              onClick={enterSite}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-full text-base tracking-wider transition-colors shadow-lg shadow-rose-950/50"
            >
              {t('enter')}
            </button>
            <a
              href="https://www.google.com/"
              rel="noreferrer"
              className="w-full border border-stone-700 hover:border-stone-500 text-stone-400 hover:text-stone-200 px-8 py-4 rounded-full text-sm tracking-wider transition-colors"
            >
              {t('leave')}
            </a>
          </div>

            <p className="text-stone-600 text-xs mt-8">{t('note')}</p>
          </div>
        </div>

        <section className="border-t border-stone-800 bg-stone-950/70 px-5 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-2">{t('linksSubtitle')}</p>
            <h2 className="text-2xl font-light tracking-widest text-white">{t('linksTitle')}</h2>
            <div className="w-10 h-px bg-rose-500 mx-auto mt-4" />

            {RELATED_LINKS.length === 0 ? (
              <p className="text-stone-600 text-sm mt-8">{t('linksEmpty')}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                {RELATED_LINKS.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-20 flex items-center justify-center overflow-hidden border border-stone-800 bg-stone-900/70 rounded-xl text-stone-300 hover:text-rose-300 hover:border-rose-900 transition-colors"
                  >
                    {link.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={link.image} alt={link.title} className="max-w-full max-h-24 object-contain" />
                    ) : (
                      <span className="px-4 py-3 text-sm">{link.title}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
