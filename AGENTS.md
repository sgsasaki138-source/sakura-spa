<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SAKURA SPA — 公開サイト (このリポジトリ)

大阪・日本橋のインバウンド系メンズエステの公開LP。Next.js 16 (App Router) + Tailwind + TypeScript + next-intl。
Firebase Firestore を読み取り専用で利用（管理システムは別プロジェクト sakura-spa-admin が書き込む）。

## セキュリティ注意（重要）
このリポジトリは **GitHub パブリック**。パスワード・管理画面のシークレットURL・秘密鍵をコード/ドキュメントに絶対に書かない。
Firebase の公開鍵は Vercel の環境変数 (`NEXT_PUBLIC_FIREBASE_*`) で注入。`.env.local` は gitignore 済み。

## 起動・ビルド・デプロイ
- `npm run dev`（ポート3000）
- `npm run build`（**push前に必ず通す**）
- デプロイ：`git push origin main` → Vercel が自動デプロイ。本番 https://www.sakuraspa-osaka.com

## 構成
- `src/app/[locale]/page.tsx` … トップ（ヒーロー/サービス/料金/アクセス/問い合わせ）
- `src/app/[locale]/cast/` … セラピスト一覧・詳細　`schedule/` … 出勤表
- `src/lib/spa-data.ts` … Firestore取得＋表示ヘルパ（therapists/schedule/banners）
- `src/lib/constants.ts` … LINE URL・電話番号（変更時はここ1箇所）
- `src/components/HeroBanner.tsx` … 自動スライドバナー　`SubHeader.tsx` … 下層ページ共通ヘッダ
- `messages/{ja,en,zh,zh-TW,ko}.json` … 5言語。**文言追加時は5ファイル全部に同じキーを追加**

## 規約・注意点
- モバイルファースト（客の大半がスマホ）。言語なしURL（例 `/cast`）は訪問者のスマホ言語へ自動振り分け。
- 予約・問い合わせは全て LINE に一本化（フォーム廃止済み）。電話ボタンは日本語ページのみ。
- **Firestore のデータは管理画面由来で型が配列のことがある**（例 `tags` は string でなく `string[]`）。公開側で扱う共有フィールドは array/string 両対応にする（`tagList()` 参照）。画像は base64 data URL。
- Firestore書き込みは公開サイトからは行わない（読み取りのみ）。

## 未完了（次の作業候補）
- 固定電話番号への差し替え（constants.ts の PHONE_TEL/PHONE_DISPLAY）
- 求人ページ新設
