'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  displayName,
  fetchSchedule,
  fetchTherapists,
  type ScheduleItem,
  type Therapist,
} from '@/lib/spa-data'

function dateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function TodayTherapists() {
  const t = useTranslations()
  const locale = useLocale()
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null)

  useEffect(() => {
    Promise.all([fetchTherapists(), fetchSchedule()])
      .then(([therapistList, scheduleList]) => {
        setTherapists(therapistList)
        setSchedule(scheduleList)
      })
      .catch(() => setSchedule([]))
  }, [])

  const todayTherapists = useMemo(() => {
    if (!schedule) return []

    const today = dateKey(new Date())
    const workingIds = new Set(
      schedule
        .filter((item) => item.date === today && item.status !== '休み')
        .map((item) => String(item.therapistId)),
    )

    return therapists.filter((therapist) => workingIds.has(String(therapist.id))).slice(0, 3)
  }, [schedule, therapists])

  return (
    <section className="py-16 px-4 bg-stone-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('schedule.homeSubtitle')}</p>
          <h2 className="text-3xl font-light tracking-widest text-white">{t('schedule.homeTitle')}</h2>
          <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
        </div>

        {schedule === null ? (
          <p className="text-center text-stone-500 py-10">…</p>
        ) : todayTherapists.length === 0 ? (
          <p className="text-center text-stone-500 py-10">{t('schedule.noneDay')}</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:gap-5 max-w-3xl mx-auto">
            {todayTherapists.map((therapist) => (
              <Link
                key={therapist.id}
                href={`/cast/${therapist.id}`}
                className="group min-w-0 bg-stone-900 border border-stone-800 rounded-xl sm:rounded-2xl overflow-hidden hover:border-rose-800 transition-colors"
              >
                <div className="aspect-[3/4] bg-stone-800 overflow-hidden">
                  {therapist.photos && therapist.photos.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={therapist.photos[0]}
                      alt={displayName(therapist, locale)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl text-stone-700">🌸</div>
                  )}
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <p className="text-sm sm:text-lg text-white truncate">{displayName(therapist, locale)}</p>
                  {therapist.age && (
                    <p className="text-[11px] sm:text-xs text-stone-500 mt-1">
                      {therapist.age}{t('cast.age')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center border border-rose-800 hover:border-rose-500 text-rose-300 px-10 py-3 rounded-full transition-colors"
          >
            {t('schedule.more')}
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
