'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { KLOOK_OSAKA_AFFILIATE, LINE_CUSTOMER, PHONE_TEL, PHONE_DISPLAY } from '@/lib/constants'
import HeroBanner from '@/components/HeroBanner'
import TodayTherapists from '@/components/TodayTherapists'

const LOCALE_LABELS: Record<string, string> = {
  ja: '日本語',
  en: 'EN',
  zh: '简体',
  'zh-TW': '繁體',
  ko: '한국어',
}

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const serviceItems = t.raw('service.items') as { name: string; desc: string }[]
  const plans = t.raw('price.plans') as { min: string; price: string }[]
  const extras = t.raw('price.extras') as { label: string; price: string }[]
  const options = t.raw('price.options') as { label: string; price: string }[]

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-widest text-rose-300">SAKURA SPA</div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-stone-300">
            <a href="#service" className="hover:text-rose-300 transition-colors">{t('nav.service')}</a>
            <a href="#price" className="hover:text-rose-300 transition-colors">{t('nav.price')}</a>
            <Link href="/cast" className="hover:text-rose-300 transition-colors">{t('nav.cast')}</Link>
            <Link href="/schedule" className="hover:text-rose-300 transition-colors">{t('nav.schedule')}</Link>
            <a href="#access" className="hover:text-rose-300 transition-colors">{t('nav.access')}</a>
            <a href="#contact" className="hover:text-rose-300 transition-colors">{t('nav.contact')}</a>
            <a href={LINE_CUSTOMER} target="_blank" rel="noopener noreferrer" className="bg-[#06C755] hover:bg-[#05b34c] text-white px-4 py-1.5 rounded-full transition-colors">{t('nav.reserve')}</a>
          </nav>
          {/* Language switcher */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {routing.locales.map((l) => (
              <Link key={l} href="/" locale={l}
                className={`text-xs px-2 py-1 rounded transition-colors ${locale === l ? 'text-rose-300 font-bold' : 'text-stone-500 hover:text-stone-300'}`}>
                {LOCALE_LABELS[l]}
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden text-stone-300" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-stone-900 border-t border-stone-800 px-4 py-4 flex flex-col gap-4">
            <a href="#service" onClick={() => setMenuOpen(false)} className="text-stone-300 hover:text-rose-300 transition-colors">{t('nav.service')}</a>
            <a href="#price" onClick={() => setMenuOpen(false)} className="text-stone-300 hover:text-rose-300 transition-colors">{t('nav.price')}</a>
            <Link href="/cast" className="text-stone-300 hover:text-rose-300 transition-colors">{t('nav.cast')}</Link>
            <Link href="/schedule" className="text-stone-300 hover:text-rose-300 transition-colors">{t('nav.schedule')}</Link>
            <a href="#access" onClick={() => setMenuOpen(false)} className="text-stone-300 hover:text-rose-300 transition-colors">{t('nav.access')}</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-stone-300 hover:text-rose-300 transition-colors">{t('nav.contact')}</a>
            <a href={LINE_CUSTOMER} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              className="bg-[#06C755] text-white text-center px-4 py-2 rounded-full">
              {t('nav.reserve')}
            </a>
            <div className="flex gap-2 flex-wrap">
              {routing.locales.map((l) => (
                <Link key={l} href="/" locale={l}
                  className={`text-xs px-2 py-1 rounded border ${locale === l ? 'border-rose-400 text-rose-300' : 'border-stone-700 text-stone-500'}`}>
                  {LOCALE_LABELS[l]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-rose-950/30 to-stone-950" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #f43f5e 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <p className="text-rose-300 text-sm tracking-[0.3em] uppercase mb-6">{t('hero.tag')}</p>
          <h1 className="text-6xl md:text-8xl font-thin tracking-[0.2em] text-white mb-2">{t('hero.title')}</h1>
          <p className="text-stone-400 tracking-widest text-lg mb-10">{t('hero.subtitle')}</p>
          <p className="text-2xl md:text-3xl font-light text-stone-200 mb-6 whitespace-pre-line leading-relaxed">
            {t('hero.catch')}
          </p>
          <p className="text-stone-400 mb-8 leading-relaxed">{t('hero.desc')}</p>
          <HeroBanner />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={LINE_CUSTOMER} target="_blank" rel="noopener noreferrer"
              className="bg-[#06C755] hover:bg-[#05b34c] text-white px-8 py-3 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-green-900">
              {t('hero.cta')}
            </a>
            <a href="#price"
              className="border border-stone-600 hover:border-rose-400 text-stone-300 hover:text-rose-300 px-8 py-3 rounded-full text-lg transition-all">
              {t('hero.sub')}
            </a>
            {locale === 'ja' && (
              <a href={PHONE_TEL}
                className="border border-stone-600 hover:border-rose-400 text-stone-300 hover:text-rose-300 px-8 py-3 rounded-full text-lg transition-all">
                📞 {t('hero.tel')}
              </a>
            )}
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <TodayTherapists />

      {/* Service */}
      <section id="service" className="py-24 px-4 bg-stone-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('service.subtitle')}</p>
            <h2 className="text-3xl font-light tracking-widest text-white">{t('service.title')}</h2>
            <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceItems.map((item, i) => (
              <div key={i} className="bg-stone-800/50 border border-stone-700 rounded-2xl p-8 hover:border-rose-800 transition-colors">
                <div className="w-12 h-12 rounded-full bg-rose-900/50 flex items-center justify-center mb-6">
                  <span className="text-rose-300 text-xl">✦</span>
                </div>
                <h3 className="text-xl font-light text-white mb-3">{item.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price */}
      <section id="price" className="py-24 px-4 bg-stone-950">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('price.subtitle')}</p>
            <h2 className="text-3xl font-light tracking-widest text-white">{t('price.title')}</h2>
            <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
          </div>
          <p className="text-center text-rose-200 text-lg tracking-widest mb-6">{t('price.course')}</p>
          <div className="border border-stone-700 rounded-2xl overflow-hidden">
            {plans.map((plan, i) => (
              <div key={i} className={`flex justify-between items-center px-8 py-5 ${i < plans.length - 1 ? 'border-b border-stone-800' : ''} hover:bg-stone-800/30 transition-colors`}>
                <span className="text-stone-300 text-lg">{plan.min}</span>
                <span className="text-rose-300 text-2xl font-light">{plan.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {extras.map((ex, i) => (
              <div key={i} className="border border-stone-800 bg-stone-900/50 rounded-xl p-4 text-center">
                <p className="text-stone-400 text-xs mb-1">{ex.label}</p>
                <p className="text-rose-300 text-lg font-light">{ex.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-center text-stone-400 text-sm tracking-widest mb-4">— {t('price.optionsTitle')} —</p>
            <div className="border border-stone-700 rounded-2xl overflow-hidden">
              {options.map((op, i) => (
                <div key={i} className={`flex justify-between items-center px-8 py-4 ${i < options.length - 1 ? 'border-b border-stone-800' : ''}`}>
                  <span className="text-stone-300">{op.label}</span>
                  <span className="text-rose-300 text-lg font-light">{op.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-stone-500">
            <span>{t('price.note')}</span>
          </div>
        </div>
      </section>

      {/* Access */}
      <section id="access" className="py-24 px-4 bg-stone-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('access.subtitle')}</p>
            <h2 className="text-3xl font-light tracking-widest text-white">{t('access.title')}</h2>
            <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
          </div>
          <div className="bg-stone-800/50 border border-stone-700 rounded-2xl p-8 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center shrink-0">
                <span className="text-rose-300">📍</span>
              </div>
              <div>
                <p className="text-stone-300">{t('access.area')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center shrink-0">
                <span className="text-rose-300">🚗</span>
              </div>
              <div>
                <p className="text-stone-300">{t('access.type')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center shrink-0">
                <span className="text-rose-300">🕐</span>
              </div>
              <div>
                <p className="text-stone-300">{t('access.hours')}</p>
              </div>
            </div>
            <p className="text-stone-500 text-sm pt-2 border-t border-stone-700">{t('access.note')}</p>
          </div>
          <aside className="mt-6 rounded-2xl border border-amber-900/50 bg-gradient-to-r from-amber-950/30 to-stone-800/50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
                  {t('affiliate.eyebrow')}
                </p>
                <h3 className="text-xl font-light text-white">{t('affiliate.title')}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-400">
                  {t('affiliate.description')}
                </p>
              </div>
              <a
                href={KLOOK_OSAKA_AFFILIATE}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="shrink-0 rounded-full border border-amber-700/70 px-6 py-3 text-center text-sm text-amber-200 transition-colors hover:border-amber-500 hover:bg-amber-900/30 hover:text-white"
              >
                {t('affiliate.cta')} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mt-4 text-xs text-stone-600">{t('affiliate.disclosure')}</p>
          </aside>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 bg-stone-950">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('contact.subtitle')}</p>
            <h2 className="text-3xl font-light tracking-widest text-white">{t('contact.title')}</h2>
            <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
          </div>

          {/* LINE 予約・問い合わせ導線(フォーム廃止・LINE一本化) */}
          <p className="text-center text-stone-400 mb-8 leading-relaxed">{t('contact.lead')}</p>
          <div className="flex flex-col items-center gap-4">
            <a href={LINE_CUSTOMER} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block bg-[#06C755] hover:bg-[#05b34c] text-white px-12 py-4 rounded-full text-lg text-center transition-all hover:shadow-lg hover:shadow-green-900">
              💬 {t('contact.line')}
            </a>
            {locale === 'ja' && (
              <a href={PHONE_TEL}
                className="w-full sm:w-auto inline-block border border-stone-600 hover:border-rose-400 text-stone-200 hover:text-rose-300 px-12 py-4 rounded-full text-lg text-center transition-all">
                📞 {PHONE_DISPLAY}
              </a>
            )}
          </div>
          <p className="text-center text-stone-600 text-sm mt-8">{t('contact.hours')}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-800 text-center text-stone-600 text-sm">
        <Link href="/recruit"
          className="text-stone-500 hover:text-rose-300 transition-colors underline underline-offset-4">
          {t('footer.recruit')}
        </Link>
        <p className="mt-3">{t('footer.copy')}</p>
      </footer>
    </div>
  )
}
