'use client'

import React, { useState } from 'react'

interface Repository {
  id: string
  name: string
  owner: string
  slug: string
  securityScore: number
}

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock repository data representing analyzed repositories
  const [repositories] = useState<Repository[]>([
    {
      id: '1',
      name: 'SecureFlow',
      owner: 'openprep-ai',
      slug: 'openprep-ai/secureflow',
      securityScore: 94,
    },
    {
      id: '2',
      name: 'auth-middleware',
      owner: 'atelier-labs',
      slug: 'atelier-labs/auth-middleware',
      securityScore: 88,
    },
    {
      id: '3',
      name: 'canvas-mini-view',
      owner: 'cradle-design',
      slug: 'cradle-design/canvas-mini-view',
      securityScore: 91,
    },
    {
      id: '4',
      name: 'linter-core',
      owner: 'docker-tools',
      slug: 'docker-tools/linter-core',
      securityScore: 76,
    },
  ])

  // Dynamic filter evaluating repository names, owners, or slugs
  const filteredRepositories = repositories.filter((repo) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true

    return (
      repo.name.toLowerCase().includes(query) ||
      repo.owner.toLowerCase().includes(query) ||
      repo.slug.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Analyzed Public Repositories</h1>
        <p className="text-sm text-slate-400 mt-1">
          Select an audited codebase to view security health scores and vulnerability vectors.
        </p>

        {/* Dynamic Search Input Field */}
        <div className="mt-6 max-w-md">
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-slate-500 text-sm" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by repository name, owner, or slug..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </header>

      <main>
        {filteredRepositories.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
            <p className="text-sm text-slate-400">
              No matching repositories found for "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRepositories.map((repo) => (
              <div
                key={repo.id}
                className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-slate-700/60 transition-all duration-200 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white">{repo.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">{repo.slug}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border ${
                      repo.securityScore >= 90
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {repo.securityScore}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
