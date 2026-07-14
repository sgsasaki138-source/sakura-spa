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
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 aspect-square">
        {banners.map((b, i) => {
          const img = b.mobileImage || b.pcImage
          const href = resolveLink(b.cta1Link, locale)
          const inner = (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img || ''} alt={b.title || ''} className="w-full h-full object-cover" />
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
      </div>
      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {banners.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`banner ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-rose-400' : 'w-2 bg-stone-600'}`} />
          ))}
        </div>
      )}
    </div>
  )
}
