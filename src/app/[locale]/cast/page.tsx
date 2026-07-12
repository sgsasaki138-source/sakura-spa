'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import SubHeader from '@/components/SubHeader'
import { fetchTherapists, displayName, tagList, sizeText, type Therapist } from '@/lib/spa-data'

export default function CastListPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [casts, setCasts] = useState<Therapist[] | null>(null)

  useEffect(() => {
    fetchTherapists().then(setCasts).catch(() => setCasts([]))
  }, [])

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <SubHeader />
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-10">
          <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('cast.subtitle')}</p>
          <h1 className="text-3xl font-light tracking-widest text-white">{t('cast.title')}</h1>
          <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
        </div>

        {casts === null ? (
          <p className="text-center text-stone-500 py-20">…</p>
        ) : casts.length === 0 ? (
          <p className="text-center text-stone-500 py-20">{t('cast.empty')}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {casts.map((c) => (
              <Link key={c.id} href={`/cast/${c.id}`}
                className="group bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-rose-800 transition-colors">
                <div className="aspect-[3/4] bg-stone-800 overflow-hidden">
                  {c.photos && c.photos.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.photos[0]} alt={displayName(c, locale)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-stone-700">🌸</div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-white">{displayName(c, locale)}</span>
                    {c.age && <span className="text-stone-400 text-xs">{c.age}{t('cast.age')}</span>}
                  </div>
                  {sizeText(c) && <p className="text-stone-500 text-[11px] mt-1">{sizeText(c)}</p>}
                  {tagList(c).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tagList(c).slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
