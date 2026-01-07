'use client'

import { useState, useEffect } from 'react'
import { Account } from '@/lib/mockData'
import { api } from '@/lib/api'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

const accountTypeColors: Record<Account['accountType'], string> = {
  'Asset': 'bg-blue-100 text-blue-700 border-blue-200',
  'Liability': 'bg-red-100 text-red-700 border-red-200',
  'Equity': 'bg-purple-100 text-purple-700 border-purple-200',
  'Revenue': 'bg-green-100 text-green-700 border-green-200',
  'Expense': 'bg-orange-100 text-orange-700 border-orange-200',
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    api.getAccounts().then(data => {
      setAccounts(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
