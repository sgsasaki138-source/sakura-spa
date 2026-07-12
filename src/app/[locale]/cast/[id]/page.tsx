'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import SubHeader from '@/components/SubHeader'
import { LINE_CUSTOMER } from '@/lib/constants'
import { fetchTherapist, displayName, displayProfile, tagList, sizeText, type Therapist } from '@/lib/spa-data'

export default function CastDetailPage() {
  const t = useTranslations()
  const locale = useLocale()
  const params = useParams<{ id: string }>()
  const [cast, setCast] = useState<Therapist | null | undefined>(undefined)

  useEffect(() => {
    if (!params?.id) return
    fetchTherapist(String(params.id)).then(setCast).catch(() => setCast(null))
  }, [params?.id])

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <SubHeader />
      <main className="max-w-2xl mx-auto px-4 pt-20 pb-16">
        {cast === undefined ? (
          <p className="text-center text-stone-500 py-20">…</p>
        ) : cast === null ? (
          <div className="text-center py-20">
            <p className="text-stone-500 mb-6">{t('cast.empty')}</p>
            <Link href="/cast" className="text-rose-300 underline underline-offset-4">{t('cast.back')}</Link>
          </div>
        ) : (
          <>
            {/* 写真(横スクロール) */}
            {cast.photos && cast.photos.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory rounded-2xl pb-2 -mx-4 px-4">
                {cast.photos.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt={`${displayName(cast, locale)} ${i + 1}`}
                    className="w-[80%] sm:w-[60%] shrink-0 snap-center aspect-[3/4] object-cover rounded-2xl border border-stone-800" />
                ))}
              </div>
            ) : (
              <div className="aspect-[3/4] max-w-sm mx-auto bg-stone-900 rounded-2xl flex items-center justify-center text-6xl text-stone-700">🌸</div>
            )}

            {/* 名前・基本情報 */}
            <div className="mt-6">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="text-2xl text-white tracking-widest">{displayName(cast, locale)}</h1>
                {locale === 'ja' && cast.nameEn && <span className="text-stone-500 text-sm">{cast.nameEn}</span>}
                {cast.age && <span className="text-stone-400">{cast.age}{t('cast.age')}</span>}
              </div>
              {sizeText(cast) && <p className="text-stone-400 text-sm mt-2 tracking-wider">{sizeText(cast)}</p>}
              {tagList(cast).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tagList(cast).map((tag, i) => (
                    <span key={i} className="text-xs text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* プロフィール */}
            {displayProfile(cast, locale) && (
              <p className="mt-6 text-stone-300 leading-relaxed whitespace-pre-line text-sm">
                {displayProfile(cast, locale)}
              </p>
            )}

            {/* 予約CTA */}
            <a href={LINE_CUSTOMER} target="_blank" rel="noopener noreferrer"
              className="mt-8 block bg-[#06C755] hover:bg-[#05b34c] text-white text-center py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-green-900">
              💬 {t('cast.book')}
            </a>

            <div className="mt-6 text-center">
              <Link href="/cast" className="text-stone-500 hover:text-rose-300 text-sm underline underline-offset-4 transition-colors">
                {t('cast.back')}
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
