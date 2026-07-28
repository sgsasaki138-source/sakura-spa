// 構造化データ（JSON-LD）。AI検索・通常検索の両対策（LLMO）。
// 内容は必ずページに実際に表示されている情報と一致させること（乖離はスパム判定リスク）。

// トップページ用: 店舗情報
export const LOCAL_BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'SAKURA SPA Nipponbashi',
  alternateName: 'サクラスパ日本橋',
  url: 'https://www.sakuraspa-osaka.com/',
  description:
    '大阪・日本橋の出張型メンズエステ。完全予約制・プライベート空間でラグジュアリーリンパトリートメントをご提供します。',
  telephone: '+81-90-1673-4693',
  areaServed: '大阪市浪速区・中央区周辺（日本橋エリア）',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '大阪市',
    addressRegion: '大阪府',
    addressCountry: 'JP',
  },
  openingHours: 'Mo-Su 12:00-05:00',
  priceRange: '¥14,000〜¥32,000',
}

// FAQページ用: よくある質問
// AI検索は Q&A 形式を引用しやすいので、表示しているFAQと必ず同じ内容から作ること。
// （表示は messages/*.json の faq.items、求人FAQは下の RECRUIT_FAQ）
export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

// 求人ページのFAQ（応募者は日本語話者のため日本語のみ）。
// 募集条件を変えたら、下の JOB_POSTING_JSONLD と求人ページの表示も揃えること。
export const RECRUIT_FAQ = [
  {
    q: '未経験でも大丈夫ですか？',
    a: 'はい。未経験の方には女性講師による講習をご用意しています。ほとんどの方が未経験からスタートしています。',
  },
  {
    q: '報酬はどのくらいですか？',
    a: '90分1本あたり¥9,000〜¥22,000です（指名やオプションによって変動します）。完全日払いで、勤務した当日にお渡しします。',
  },
  {
    q: 'シフトはどのように決まりますか？',
    a: '申告制です。週1日・1日3時間から勤務できます。掛け持ちの方や、本業・学業のある方も働いています。',
  },
  {
    q: '待機場所はありますか？',
    a: 'はい。待機所を用意していますので、次のご予約まで安心してお待ちいただけます。',
  },
  {
    q: '面接には必ず行かないといけませんか？',
    a: 'オンラインでの面接も可能です。遠方の方や、まずは話だけ聞いてみたいという方もお気軽にご相談ください。',
  },
  {
    q: '応募条件はありますか？',
    a: '18歳以上の方（高校生は不可）であればご応募いただけます。年齢を確認できる身分証をご用意ください。',
  },
  {
    q: '応募したら必ず働かないといけませんか？',
    a: 'いいえ。「話を聞いてみたいだけ」でも大丈夫です。しつこい勧誘は一切ありません。',
  },
  {
    q: 'どうやって応募すればいいですか？',
    a: 'LINEから受け付けています。質問だけでもかまいませんので、お気軽にメッセージをお送りください。',
  },
]

// 求人ページ用: 求人票
// datePosted は求人内容を更新するたびに書き換えること（古い日付は評価が落ちる）
export const JOB_POSTING_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: 'メンズエステセラピスト（業務委託・未経験歓迎）',
  description:
    'SAKURA SPA（大阪・日本橋の出張型メンズエステ）ではセラピストを募集しています。報酬は90分1本¥9,000〜¥22,000（指名・オプションで変動）・完全日払い。週1日・1日3時間からOKの申告制シフトで、未経験の方には女性講師による講習あり。待機所完備。応募・質問はLINEで受付、話を聞くだけでも歓迎です。18歳以上（高校生不可）。',
  datePosted: '2026-07-20',
  employmentType: 'CONTRACTOR',
  hiringOrganization: {
    '@type': 'Organization',
    name: 'SAKURA SPA Nipponbashi',
    sameAs: 'https://www.sakuraspa-osaka.com/',
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '大阪市',
      addressRegion: '大阪府',
      addressCountry: 'JP',
    },
  },
  applicantLocationRequirements: { '@type': 'Country', name: '日本' },
  directApply: true,
}
