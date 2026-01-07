'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Transaction, JournalEntry } from '@/lib/mockData'
import { BookOpen } from 'lucide-react'

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [txns, jEntries] = await Promise.all([
          api.getTransactions(),
          api.getJournalEntries()
        ])
        setTransactions(txns)
        setEntries(jEntries)
      } catch (error) {
        console.error('Failed to load journal data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const totalDebits = entries.reduce((sum, e) => sum + e.debit, 0)
  const totalCredits = entries.reduce((sum, e) => sum + e.credit, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Journal Entries</h1>
        <p className="mt-1 text-gray-600">Complete ledger of all entries</p>
      </div>

      {totalDebits === totalCredits ? (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-success-600" />
            <div>
              <p className="font-semibold text-success-800">Double-Entry Validated</p>
              <p className="text-sm text-success-700">
                Debits and credits balanced (${totalDebits.toLocaleString()})
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="space-y-4">
        {transactions.map((transaction: Transaction) => {
          const transEntries = entries.filter(e => e.transactionId === transaction.id)
          return (
            <div key={transaction.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-mono text-sm font-semibold text-primary-600">
                    {transaction.referenceNumber}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
                </div>
                <p className="font-semibold">${transaction.totalAmount.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                {transEntries.map((entry: JournalEntry) => (
                  <div key={entry.id} className="grid grid-cols-12 gap-4 p-3 rounded border border-gray-200">
                    <div className="col-span-6">
                      <p className="text-sm font-medium">{entry.accountName}</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className={`text-sm font-semibold ${entry.debit > 0 ? 'text-blue-700' : 'text-gray-300'}`}>
                        ${entry.debit > 0 ? entry.debit.toLocaleString() : '—'}
                      </p>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className={`text-sm font-semibold ${entry.credit > 0 ? 'text-green-700' : 'text-gray-300'}`}>
                        ${entry.credit > 0 ? entry.credit.toLocaleString() : '—'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
