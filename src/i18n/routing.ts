import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ja', 'en', 'zh', 'zh-TW', 'ko'],
  defaultLocale: 'ja',
})
