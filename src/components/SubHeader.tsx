'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LOCALE_LABELS: Record<string, string> = {
  ja: '日本語',
  en: 'EN',
  zh: '简体',
  'zh-TW': '繁體',
  ko: '한국어',
}

export default function SubHeader() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-widest text-rose-300">SAKURA SPA</Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          {routing.locales.map((l) => (
            <Link key={l} href={pathname} locale={l}
              className={`text-xs px-2 py-1 rounded whitespace-nowrap transition-colors ${locale === l ? 'text-rose-300 font-bold' : 'text-stone-500 hover:text-stone-300'}`}>
              {LOCALE_LABELS[l]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
