'use client'

// 求人ページ。応募者は日本語話者のため、ロケールに関わらず日本語で表示する（意図的）。
// 掲載内容は管理画面（sakura-spa-admin）の「求人情報」「求人ブログ」タブから更新される。

import { useEffect, useState } from 'react'
import SubHeader from '@/components/SubHeader'
import { LINE_RECRUIT } from '@/lib/constants'
import {
  fetchJobs,
  fetchJobPoints,
  fetchJobBlog,
  jobBlogTags,
  type JobItem,
  type JobPoint,
  type JobBlogPost,
} from '@/lib/spa-data'

function LineCta({ large = false }: { large?: boolean }) {
  return (
    <a
      href={LINE_RECRUIT}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-full text-center transition-colors ${
        large ? 'px-12 py-4 text-lg w-full sm:w-auto' : 'px-8 py-3 text-sm'
      }`}
    >
      LINEで応募・質問する（無料）
    </a>
  )
}

function BlogCard({ post }: { post: JobBlogPost }) {
  const [open, setOpen] = useState(false)
  const paragraphs = (post.content || '').split('\n')
  return (
    <article className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6">
      <button onClick={() => setOpen(!open)} className="w-full text-left">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-white text-sm sm:text-base leading-relaxed">{post.title}</h3>
          <span className="text-stone-500 text-xs shrink-0">{open ? '▲' : '▼'}</span>
        </div>
        {post.date && <p className="text-stone-500 text-xs mt-2">{post.date}</p>}
        {jobBlogTags(post).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {jobBlogTags(post).map((tag, i) => (
              <span key={i} className="text-[10px] text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>
      {open && (
        <div className="mt-4 pt-4 border-t border-stone-800 text-stone-300 text-sm leading-relaxed space-y-2">
          {paragraphs.map((line, i) => (line === '' ? <br key={i} /> : <p key={i}>{line}</p>))}
          <div className="pt-4 text-center">
            <LineCta />
          </div>
        </div>
      )}
    </article>
  )
}

export default function RecruitPage() {
  const [jobs, setJobs] = useState<JobItem[] | null>(null)
  const [points, setPoints] = useState<JobPoint[]>([])
  const [blog, setBlog] = useState<JobBlogPost[]>([])

  useEffect(() => {
    Promise.all([fetchJobs(), fetchJobPoints(), fetchJobBlog()])
      .then(([j, p, b]) => { setJobs(j); setPoints(p); setBlog(b) })
      .catch(() => setJobs([]))
  }, [])

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <SubHeader />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-24">
        {/* ヒーロー */}
        <div className="text-center mb-12">
          <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">Recruit</p>
          <h1 className="text-3xl font-light tracking-widest text-white">セラピスト募集</h1>
          <div className="w-12 h-px bg-rose-500 mx-auto mt-4" />
          <p className="text-stone-400 text-sm leading-relaxed mt-6 max-w-xl mx-auto">
            SAKURA SPAは大阪・日本橋の出張メンズエステです。
            <br className="hidden sm:block" />
            未経験の方も、掛け持ちの方も歓迎。まずはLINEでお気軽にご相談ください。
          </p>
          <div className="mt-8">
            <LineCta large />
          </div>
        </div>

        {/* アピールポイント */}
        {points.length > 0 && (
          <section className="mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((p) => (
                <div key={p.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex gap-4 items-start">
                  <span className="text-2xl shrink-0">{p.icon || '🌸'}</span>
                  <div>
                    <h3 className="text-white text-sm font-medium">{p.title}</h3>
                    {p.desc && <p className="text-stone-400 text-xs leading-relaxed mt-1.5">{p.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 募集要項 */}
        <section className="mb-14">
          <div className="text-center mb-6">
            <h2 className="text-xl font-light tracking-widest text-white">募集要項</h2>
            <div className="w-8 h-px bg-rose-500 mx-auto mt-3" />
          </div>
          {jobs === null ? (
            <p className="text-center text-stone-500 py-10">…</p>
          ) : jobs.length === 0 ? (
            <p className="text-center text-stone-500 py-10">準備中です。詳細はLINEでお問い合わせください。</p>
          ) : (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
              {jobs.map((j, i) => (
                <div key={j.id} className={`flex flex-col sm:flex-row ${i > 0 ? 'border-t border-stone-800' : ''}`}>
                  <div className="sm:w-36 shrink-0 bg-stone-900/60 px-5 py-3 sm:py-4 text-rose-300 text-xs sm:text-sm font-medium">
                    {j.key}
                  </div>
                  <div className="flex-1 px-5 pb-4 sm:py-4 text-stone-200 text-sm leading-relaxed whitespace-pre-line">
                    {j.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 求人ブログ */}
        {blog.length > 0 && (
          <section className="mb-14">
            <div className="text-center mb-6">
              <h2 className="text-xl font-light tracking-widest text-white">求人ブログ</h2>
              <div className="w-8 h-px bg-rose-500 mx-auto mt-3" />
            </div>
            <div className="space-y-4">
              {blog.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 締めCTA */}
        <section className="text-center bg-stone-900 border border-stone-800 rounded-2xl px-6 py-10">
          <h2 className="text-lg font-light tracking-widest text-white mb-3">応募・お問い合わせ</h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            「話を聞いてみたいだけ」でも大丈夫です。
            <br />
            LINEで質問だけでもお気軽にどうぞ。しつこい勧誘は一切ありません。
          </p>
          <LineCta large />
        </section>
      </main>
    </div>
  )
}
