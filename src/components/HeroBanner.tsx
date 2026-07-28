'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { fetchBanners, type Banner } from '@/lib/spa-data'
import { LINE_CUSTOMER } from '@/lib/constants'

function resolveLink(link: string | undefined, locale: string): string | null {
  if (!link) return null
  const l = link.trim()
  if (l === 'line') return LINE_CUSTOMER
  if (l === 'price') return `/${locale}#price`
  if (l === 'access') return `/${locale}#access`
  if (l === 'therapists' || l === 'cast') return `/${locale}/cast`
  if (l === 'schedule') return `/${locale}/schedule`
  if (l.startsWith('http') || l.startsWith('/')) return l
  return null
}

export default function HeroBanner() {
  const locale = useLocale()
  const [banners, setBanners] = useState<Banner[]>([])
  const [idx, setIdx] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    fetchBanners().then(setBanners).catch(() => setBanners([]))
  }, [])

  useEffect(() => {
    if (banners.length <= 1) return
    const id = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4500)
    timer.current = id
    return () => clearInterval(id)
  }, [banners.length])

  if (banners.length === 0) return null

  const go = (i: number) => {
    setIdx((i + banners.length) % banners.length)
    if (timer.current) clearInterval(timer.current)
  }

  return (
    // メニュー直下のフル幅ヒーローバナー。スマホ=正方形／PC=横長を <picture> で自動切替
    // PCは1900:1000。画像もこの比率で作ること（比率がずれると object-cover で上下か左右が切れる）
    <div className="relative w-full overflow-hidden bg-stone-900 aspect-square md:aspect-[1900/1000]">
      {banners.map((b, i) => {
        const href = resolveLink(b.cta1Link, locale)
        const inner = (
          <picture className="block w-full h-full">
            {b.pcImage && <source media="(min-width:768px)" srcSet={b.pcImage} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.mobileImage || b.pcImage || ''} alt={b.title || ''} className="w-full h-full object-cover" />
          </picture>
        )
        return (
          <div key={b.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {href ? (
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block w-full h-full">
                {inner}
              </a>
            ) : inner}
          </div>
        )
      })}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10">
          {banners.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`banner ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-rose-400' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      )}
    </div>
  )
}
