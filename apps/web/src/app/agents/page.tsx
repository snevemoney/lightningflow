'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { typography, colors, patterns } from '@/lib/design-system'

export default function AgentsPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <section className="px-8 py-10 max-w-6xl mx-auto space-y-10">
      {/* Agents Header */}
      <div className="space-y-2">
        <h1 className={typography.heading.h1}>AI Agents</h1>
        <p className={colors.text.secondary}>
          Configure your AI agents to automate your workflow.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Agent Card */}
        <div className={patterns.card}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={typography.heading.h3}>Content Agent</h3>
              <p className="text-gray-400 mt-1">Auto-generates content based on your templates</p>
            </div>
            <div className="bg-green-900/30 text-green-400 rounded-full px-2 py-1 text-xs">
              Active
            </div>
          </div>
          <div className="mt-6">
            <div className="border-t border-gray-700 pt-4">
              <Link href="/agents/content" className="text-indigo-400 hover:text-indigo-300 text-sm">
                Configure Agent
              </Link>
            </div>
          </div>
        </div>

        {/* Agent Card */}
        <div className={patterns.card}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={typography.heading.h3}>Schedule Agent</h3>
              <p className="text-gray-400 mt-1">Manages your calendar and appointments</p>
            </div>
            <div className="bg-gray-800 text-gray-400 rounded-full px-2 py-1 text-xs">
              Inactive
            </div>
          </div>
          <div className="mt-6">
            <div className="border-t border-gray-700 pt-4">
              <Link href="/agents/activate/schedule" className="text-indigo-400 hover:text-indigo-300 text-sm">
                Activate Agent
              </Link>
            </div>
          </div>
        </div>

        {/* Add New Agent Card */}
        <Link href="/agents/new" className={patterns.card + " flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-700 hover:border-indigo-500 transition-colors"}>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-indigo-400">+</span>
            </div>
            <h3 className={typography.heading.h3}>Add New Agent</h3>
            <p className="text-gray-400 mt-1">Create a custom AI agent</p>
          </div>
        </Link>
      </div>
    </section>
  )
} 