import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export type Therapist = {
  id: string
  name: string
  nameEn?: string
  age?: string
  height?: string
  bust?: string
  cup?: string
  waist?: string
  hip?: string
  tags?: string | string[]
  profile?: string
  profileEn?: string
  skills?: string
  visible?: boolean
  photos?: string[]
  order?: number
}

export type ScheduleItem = {
  id: string
  therapistId: string
  date: string // YYYY-MM-DD
  status: string // 出勤 | 休み | 要確認
}

export async function fetchTherapists(): Promise<Therapist[]> {
  const snap = await getDocs(collection(db, 'sakuraspa', 'therapists', 'items'))
  return snap.docs
    .map((d) => d.data() as Therapist)
    .filter((t) => t.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

export async function fetchTherapist(id: string): Promise<Therapist | null> {
  const snap = await getDoc(doc(db, 'sakuraspa', 'therapists', 'items', id))
  if (!snap.exists()) return null
  const t = snap.data() as Therapist
  return t.visible === false ? null : t
}

export type Banner = {
  id: string
  pcImage?: string | null
  mobileImage?: string | null
  title?: string
  titleEn?: string
  subtitle?: string
  subtitleEn?: string
  cta1Link?: string
  visible?: boolean
  order?: number
}

export async function fetchBanners(): Promise<Banner[]> {
  const snap = await getDoc(doc(db, 'sakuraspa', 'banners'))
  if (!snap.exists()) return []
  const value = snap.data().value
  const list: Banner[] = Array.isArray(value) ? value : []
  return list
    .filter((b) => b.visible !== false && (b.pcImage || b.mobileImage))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

export async function fetchSchedule(): Promise<ScheduleItem[]> {
  const snap = await getDoc(doc(db, 'sakuraspa', 'schedule'))
  if (!snap.exists()) return []
  const value = snap.data().value
  return Array.isArray(value) ? (value as ScheduleItem[]) : []
}

// 表示名・プロフィールのロケール切替(日本語以外は英語フィールド優先)
export function displayName(t: Therapist, locale: string): string {
  if (locale === 'ja') return t.name
  return t.nameEn?.trim() || t.name
}

export function displayProfile(t: Therapist, locale: string): string {
  if (locale === 'ja') return t.profile || ''
  return t.profileEn?.trim() || t.profile || ''
}

export function tagList(t: Therapist): string[] {
  const raw = t.tags
  // 管理画面はtagsを配列で保存するが、文字列で入っている場合も両対応
  if (Array.isArray(raw)) return raw.map((s) => String(s).trim()).filter(Boolean)
  return String(raw || '').split(/[、,]+/).map((s) => s.trim()).filter(Boolean)
}

export function sizeText(t: Therapist): string {
  const parts: string[] = []
  if (t.height) parts.push(`T${t.height}`)
  if (t.bust) parts.push(`B${t.bust}${t.cup ? `(${t.cup})` : ''}`)
  if (t.waist) parts.push(`W${t.waist}`)
  if (t.hip) parts.push(`H${t.hip}`)
  return parts.join(' ')
}
