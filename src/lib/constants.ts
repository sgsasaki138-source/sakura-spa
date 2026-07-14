export const LINE_CUSTOMER = 'https://lin.ee/oh3TAW1'
export const LINE_RECRUIT = 'https://lin.ee/OpQdem2'
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
