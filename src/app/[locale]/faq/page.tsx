'use client'

// よくある質問ページ（客向け・5言語）。
// LLMO対策の中心。AI検索はQ&A形式を引用しやすいので、表示テキストと FAQPage 構造化データを
// 同じ messages/*.json の faq.items から作り、ずれないようにしている。
// 内容（料金・営業時間・支払い方法など）を変えたら llms.txt とトップの summary も揃えること。

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import SubHeader from '@/components/SubHeader'
import { LINE_CUSTOMER } from '@/lib/constants'
import { faqPageJsonLd } from '@/lib/jsonld'

export default function FaqPage() {
  const t = useTranslations()
  const items = t.raw('faq.items') as { q: string; a: string }[]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(items)) }}
      />
      <SubHeader />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-24">
        <div className="text-center mb-12">
          <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">{t('faq.subtitle')}</p>
          <h1 className="text-3xl font-light tracking-widest text-white">{t('faq.title')}</h1>
          <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
          <p className="text-stone-400 text-sm leading-relaxed mt-6 max-w-xl mx-auto">{t('faq.lead')}</p>
        </div>

        {/* 開閉式。閉じていても中身はDOMに置く（クローラーとAIに読ませるため） */}
        <dl className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-stone-800/40 transition-colors"
                >
                  <span className="text-white text-sm sm:text-base leading-relaxed">{item.q}</span>
                  <span className="text-stone-500 text-xs shrink-0 mt-1">{open === i ? '▲' : '▼'}</span>
                </button>
              </dt>
              <dd className={open === i ? 'block' : 'hidden'}>
                <p className="px-5 pb-5 -mt-1 text-stone-300 text-sm leading-relaxed">{item.a}</p>
              </dd>
            </div>
          ))}
        </dl>

        <section className="text-center bg-stone-900 border border-stone-800 rounded-2xl px-6 py-10 mt-12">
          <p className="text-stone-400 text-sm leading-relaxed mb-6">{t('contact.lead')}</p>
          <a
            href={LINE_CUSTOMER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#06C755] hover:bg-[#05b34c] text-white font-bold px-12 py-4 rounded-full text-lg transition-colors w-full sm:w-auto"
          >
            💬 {t('faq.cta')}
          </a>
          <p className="text-stone-600 text-sm mt-6">{t('contact.hours')}</p>
        </section>

        <div className="text-center mt-10">
          <Link href="/" className="text-stone-500 hover:text-rose-300 text-sm underline underline-offset-4 transition-colors">
            ← {t('nav.service')} / {t('nav.price')}
          </Link>
        </div>
      </main>
    </div>
  )
}
