'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Transaction, JournalEntry } from '@/lib/mockData'
import { Plus, CheckCircle2, Clock } from 'lucide-react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [allEntries, setAllEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [txns, entries] = await Promise.all([
          api.getTransactions(),
          api.getJournalEntries()
        ])
        setTransactions(txns)
        setAllEntries(entries)
      } catch (error) {
        console.error('Failed to load transactions:', error)
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

  const selectedEntries = selectedId
    ? allEntries.filter(e => e.transactionId === selectedId)
    : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Transactions</h1>
          <p className="mt-1 text-gray-600">Manage financial transactions</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          New Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`card cursor-pointer ${selectedId === transaction.id ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => setSelectedId(transaction.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-semibold text-primary-600">
                      {transaction.referenceNumber}
                    </span>
                    {transaction.isPosted ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-success-100 text-success-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Posted
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ${transaction.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-6">
          {selectedId ? (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Journal Entries</h3>
              <div className="space-y-3">
                {selectedEntries.map((entry) => (
                  <div key={entry.id} className="p-4 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">{entry.accountName}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded ${entry.debit > 0 ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        <p className="text-xs text-gray-600">Debit</p>
                        <p className={`text-sm font-semibold ${entry.debit > 0 ? 'text-blue-700' : 'text-gray-400'}`}>
                          ${entry.debit > 0 ? entry.debit.toLocaleString() : '—'}
                        </p>
                      </div>
                      <div className={`p-3 rounded ${entry.credit > 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <p className="text-xs text-gray-600">Credit</p>
                        <p className={`text-sm font-semibold ${entry.credit > 0 ? 'text-green-700' : 'text-gray-400'}`}>
                          ${entry.credit > 0 ? entry.credit.toLocaleString() : '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500">Select a transaction to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
