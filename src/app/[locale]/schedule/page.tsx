'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import SubHeader from '@/components/SubHeader'
import { fetchTherapists, fetchSchedule, displayName, type Therapist, type ScheduleItem } from '@/lib/spa-data'

const INTL_LOCALES: Record<string, string> = {
  ja: 'ja-JP', en: 'en-US', zh: 'zh-CN', 'zh-TW': 'zh-TW', ko: 'ko-KR',
}

function dateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function SchedulePage() {
  const t = useTranslations()
  const locale = useLocale()
  const [casts, setCasts] = useState<Therapist[]>([])
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null)
  const [selected, setSelected] = useState(() => dateKey(new Date()))

  useEffect(() => {
    Promise.all([fetchTherapists(), fetchSchedule()])
      .then(([cs, sc]) => { setCasts(cs); setSchedule(sc) })
      .catch(() => setSchedule([]))
  }, [])

  const days = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(INTL_LOCALES[locale] || 'ja-JP', { month: 'numeric', day: 'numeric' })
    const wfmt = new Intl.DateTimeFormat(INTL_LOCALES[locale] || 'ja-JP', { weekday: 'short' })
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      return { key: dateKey(d), label: fmt.format(d), weekday: wfmt.format(d), isToday: i === 0 }
    })
  }, [locale])

  const castMap = useMemo(() => Object.fromEntries(casts.map((c) => [String(c.id), c])), [casts])

  const dayEntries = useMemo(() => {
    if (!schedule) return []
    return schedule
      .filter((s) => s.date === selected && s.status !== '休み' && castMap[String(s.therapistId)])
      .map((s) => ({ ...s, cast: castMap[String(s.therapistId)] }))
  }, [schedule, selected, castMap])

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <SubHeader />
      <main className="max-w-2xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8">
          <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('schedule.subtitle')}</p>
          <h1 className="text-3xl font-light tracking-widest text-white">{t('schedule.title')}</h1>
          <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
        </div>

        {/* 日付タブ(横スクロール) */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
          {days.map((d) => (
            <button key={d.key} onClick={() => setSelected(d.key)}
              className={`shrink-0 snap-start px-4 py-2 rounded-full border text-sm transition-colors ${
                selected === d.key
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'border-stone-700 text-stone-400 hover:border-rose-800'
              }`}>
              <span className="block leading-tight">{d.isToday ? t('schedule.today') : d.label}</span>
              <span className="block text-[10px] opacity-75 leading-tight text-center">{d.weekday}</span>
            </button>
          ))}
        </div>

        {/* 出勤リスト */}
        <div className="mt-6">
          {schedule === null ? (
            <p className="text-center text-stone-500 py-16">…</p>
          ) : dayEntries.length === 0 ? (
            <p className="text-center text-stone-500 py-16">{t('schedule.noneDay')}</p>
          ) : (
            <div className="space-y-3">
              {dayEntries.map((e) => (
                <Link key={e.id} href={`/cast/${e.cast.id}`}
                  className="flex items-center gap-4 bg-stone-900 border border-stone-800 rounded-2xl p-3 hover:border-rose-800 transition-colors">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-800 shrink-0">
                    {e.cast.photos && e.cast.photos.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={e.cast.photos[0]} alt={displayName(e.cast, locale)} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl text-stone-700">🌸</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white">{displayName(e.cast, locale)}</span>
                    {e.cast.age && <span className="text-stone-500 text-xs ml-2">{e.cast.age}{t('cast.age')}</span>}
                  </div>
                  {e.status === '要確認' && (
                    <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-1 rounded-full shrink-0">{t('schedule.statusTbd')}</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
