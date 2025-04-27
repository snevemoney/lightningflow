'use client'

import { useEffect, useState } from 'react'
import { typography, colors, patterns } from '@/lib/design-system'

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <section className="px-8 py-10 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={typography.heading.h1}>Analytics</h1>
        <p className={colors.text.secondary}>
          Track performance metrics for your Lightning AI business.
        </p>
      </div>

      {/* Analytics Filters */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <select className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white">
            <option value="7d">Last 7 Days</option>
            <option value="30d" selected>Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <select className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white">
            <option value="all">All Clients</option>
            <option value="client-a">ClientA</option>
            <option value="client-b">ClientB</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
          Export Data
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={patterns.card}>
          <h3 className="text-lg font-semibold text-white">Total Revenue</h3>
          <p className="text-3xl font-bold text-white">1,245,500 sats</p>
          <p className="text-green-400 text-sm mt-1">+15.3% from previous period</p>
        </div>
        <div className={patterns.card}>
          <h3 className="text-lg font-semibold text-white">Invoices Paid</h3>
          <p className="text-3xl font-bold text-white">42</p>
          <p className="text-green-400 text-sm mt-1">+8.6% from previous period</p>
        </div>
        <div className={patterns.card}>
          <h3 className="text-lg font-semibold text-white">AI Credits Used</h3>
          <p className="text-3xl font-bold text-white">12,450</p>
          <p className="text-yellow-400 text-sm mt-1">76% of allocation</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className={patterns.card}>
        <h2 className={typography.heading.h3}>Revenue Over Time</h2>
        <div className="h-64 flex items-center justify-center bg-gray-800/50 mt-4 rounded-md">
          <p className="text-gray-400">Revenue chart will be displayed here</p>
        </div>
      </div>

      {/* Activity Table */}
      <div className={patterns.card}>
        <h2 className={typography.heading.h3}>Recent Activity</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm border-b border-gray-700">
                <th className="pb-3 font-medium text-gray-400">Date</th>
                <th className="pb-3 font-medium text-gray-400">Type</th>
                <th className="pb-3 font-medium text-gray-400">Client</th>
                <th className="pb-3 font-medium text-gray-400">Description</th>
                <th className="pb-3 font-medium text-gray-400 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-white">Jun 25, 2023</td>
                <td className="py-3 text-white">Invoice Paid</td>
                <td className="py-3 text-white">ClientA</td>
                <td className="py-3 text-white">Monthly Consulting</td>
                <td className="py-3 text-white text-right">250,000 sats</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-white">Jun 22, 2023</td>
                <td className="py-3 text-white">Invoice Paid</td>
                <td className="py-3 text-white">ClientB</td>
                <td className="py-3 text-white">Website Development</td>
                <td className="py-3 text-white text-right">500,000 sats</td>
              </tr>
              <tr>
                <td className="py-3 text-white">Jun 18, 2023</td>
                <td className="py-3 text-white">AI Usage</td>
                <td className="py-3 text-white">Internal</td>
                <td className="py-3 text-white">Content Generation</td>
                <td className="py-3 text-white text-right">350 credits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
} 