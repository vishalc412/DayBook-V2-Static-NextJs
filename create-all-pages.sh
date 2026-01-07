#!/bin/bash

echo "Creating all remaining pages..."

# Accounts Page
cat > app/accounts/page.tsx << 'EOF'
'use client'

import { useState } from 'react'
import { mockAccounts, Account } from '@/lib/mockData'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

const accountTypeColors: Record<Account['accountType'], string> = {
  'Asset': 'bg-blue-100 text-blue-700 border-blue-200',
  'Liability': 'bg-red-100 text-red-700 border-red-200',
  'Equity': 'bg-purple-100 text-purple-700 border-purple-200',
  'Revenue': 'bg-green-100 text-green-700 border-green-200',
  'Expense': 'bg-orange-100 text-orange-700 border-orange-200',
}

export default function AccountsPage() {
  const [accounts] = useState<Account[]>(mockAccounts)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Chart of Accounts</h1>
          <p className="mt-1 text-gray-600">Manage your accounting structure</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          New Account
        </button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Code</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Balance</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{account.code}</td>
                <td className="px-6 py-4 font-medium">{account.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${accountTypeColors[account.accountType]}`}>
                    {account.accountType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{account.description}</td>
                <td className="px-6 py-4 text-right font-semibold">${account.balance.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-danger-600 hover:bg-danger-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
EOF

echo "✅ Created Accounts page"

# Transactions Page  
cat > app/transactions/page.tsx << 'EOF'
'use client'

import { useState } from 'react'
import { mockTransactions, mockJournalEntries } from '@/lib/mockData'
import { Plus, CheckCircle2, Clock } from 'lucide-react'

export default function TransactionsPage() {
  const [transactions] = useState(mockTransactions)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selectedEntries = selectedId 
    ? mockJournalEntries.filter(e => e.transactionId === selectedId)
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
EOF

echo "✅ Created Transactions page"

