import type { MetadataRoute } from 'next'

const BASE = 'https://www.sakuraspa-osaka.com'
const LOCALES = ['ja', 'en', 'zh', 'zh-TW', 'ko']
const ROUTES = ['', '/cast', '/schedule', '/recruit']

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE}/${locale}${route}`,
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )
}
