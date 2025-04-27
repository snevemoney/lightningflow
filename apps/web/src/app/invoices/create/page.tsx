'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { typography, colors, patterns } from '@/lib/design-system'

export default function CreateInvoicePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <section className="px-8 py-10 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={typography.heading.h1}>Create Invoice</h1>
        <p className={colors.text.secondary}>
          Generate a new Lightning Network invoice for your client.
        </p>
      </div>

      {/* Invoice Form */}
      <div className={patterns.card}>
        <h2 className={typography.heading.h2}>Invoice Details</h2>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="client" className="block text-white">Client</label>
            <select
              id="client"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="">-- Select Client --</option>
              <option value="client-a">ClientA</option>
              <option value="client-b">ClientB</option>
              <option value="new">+ Add New Client</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-white">Invoice Description</label>
            <input
              type="text"
              id="description"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="E.g., Monthly consultation, Project work, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-white">Amount (Sats)</label>
              <input
                type="number"
                id="amount"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                placeholder="0"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="expiry" className="block text-white">Expires In</label>
              <select
                id="expiry"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              >
                <option value="1h">1 Hour</option>
                <option value="24h" selected>24 Hours</option>
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="memo" className="block text-white">Private Memo (Optional)</label>
            <textarea
              id="memo"
              rows={3}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Notes visible only to you"
            ></textarea>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="notify"
              className="h-5 w-5 text-yellow-400 rounded"
            />
            <label htmlFor="notify" className="ml-2 text-white">
              Send notification email to client
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Link 
              href="/invoices" 
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </Link>
            <button 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 