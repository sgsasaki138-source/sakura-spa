import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'

// FAQページ専用のタイトル・説明・canonical。
// 親レイアウトのままだとトップと同じタイトルになり、検索でもAIでも「よくある質問のページ」だと
// 認識されないため、ここで上書きしている。
type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const baseUrl = 'https://sakuraspa-osaka.com'

  const languages: Record<string, string> = {}
  routing.locales.forEach((l) => {
    languages[l === 'ja' ? 'x-default' : l] = `${baseUrl}/${l}/faq`
  })

  const title = `${t('faq.title')} | SAKURA SPA Nipponbashi`
  const description = t('faq.lead')

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/${locale}/faq`, languages },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/faq`,
      siteName: 'SAKURA SPA Nipponbashi',
      locale,
      type: 'website',
    },
  }
}

export default function FaqLayout({ children }: Props) {
  return children
}
