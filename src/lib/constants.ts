export const LINE_CUSTOMER = 'https://lin.ee/oh3TAW1'
export const LINE_RECRUIT = 'https://lin.ee/nSeIp5J'
export const KLOOK_OSAKA_AFFILIATE = 'https://affiliate.klook.com/redirect?aid=127618&aff_adid=1341545&k_site=https%3A%2F%2Fwww.klook.com%2Fdestination%2Fc29-osaka%2F'
// 仮番号(固定番号取得後に差し替え) — 電話ボタンは日本語ページのみ表示
export const PHONE_TEL = 'tel:+819016734693'
export const PHONE_DISPLAY = '090-1673-4693'

export type RelatedLink = {
  title: string
  url: string
  image?: string
}

// 相互リンク・関連サイトはここへ追加する。imageはpublic配下のパスまたはdata URLに対応。
export const RELATED_LINKS: RelatedLink[] = []
