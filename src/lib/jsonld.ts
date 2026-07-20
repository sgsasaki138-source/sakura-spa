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
