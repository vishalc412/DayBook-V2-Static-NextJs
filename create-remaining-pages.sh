#!/bin/bash

# Journal Page
cat > app/journal/page.tsx << 'EOF'
'use client'

import { mockJournalEntries, mockTransactions } from '@/lib/mockData'
import { BookOpen } from 'lucide-react'

export default function JournalPage() {
  const totalDebits = mockJournalEntries.reduce((sum, e) => sum + e.debit, 0)
  const totalCredits = mockJournalEntries.reduce((sum, e) => sum + e.credit, 0)

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
        {mockTransactions.map((transaction) => {
          const entries = mockJournalEntries.filter(e => e.transactionId === transaction.id)
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
                {entries.map((entry) => (
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
EOF

# Reports Page
cat > app/reports/page.tsx << 'EOF'
'use client'

import { mockAccounts, getMonthlyData } from '@/lib/mockData'
import { BarChart3 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ReportsPage() {
  const monthlyData = getMonthlyData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Reports & Analytics</h1>
        <p className="mt-1 text-gray-600">Financial insights and metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Income Statement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="netIncome" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Net Income by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="netIncome" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Balance Sheet</h3>
            {['Asset', 'Liability', 'Equity'].map(type => {
              const total = mockAccounts.filter(a => a.accountType === type).reduce((sum, a) => sum + a.balance, 0)
              return (
                <div key={type} className="flex justify-between p-3 rounded bg-gray-50 mb-2">
                  <span className="font-medium">{type}</span>
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </div>
              )
            })}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Income Statement</h3>
            {['Revenue', 'Expense'].map(type => {
              const total = mockAccounts.filter(a => a.accountType === type).reduce((sum, a) => sum + a.balance, 0)
              return (
                <div key={type} className="flex justify-between p-3 rounded bg-gray-50 mb-2">
                  <span className="font-medium">{type}</span>
                  <span className={`font-semibold ${type === 'Revenue' ? 'text-success-600' : 'text-danger-600'}`}>
                    ${total.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# Audit Page
cat > app/audit/page.tsx << 'EOF'
'use client'

import { mockAuditLogs } from '@/lib/mockData'
import { History, User } from 'lucide-react'

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Audit Logs</h1>
        <p className="mt-1 text-gray-600">Complete activity history</p>
      </div>

      <div className="card">
        <div className="space-y-4">
          {mockAuditLogs.map((log) => (
            <div key={log.id} className="flex gap-4 p-4 rounded border border-gray-200 hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <History className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {log.action}
                  </span>
                  <span className="text-sm font-medium">{log.entityType}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-900">{log.details}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                  <User className="w-3 h-3" />
                  <span className="font-medium">{log.username}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
EOF

# Users Page
cat > app/users/page.tsx << 'EOF'
'use client'

import { mockUsers } from '@/lib/mockData'
import { Plus, CheckCircle2, XCircle } from 'lucide-react'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-gray-600">Manage system users</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUsers.map((user) => (
          <div key={user.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-semibold text-lg">
                {user.username[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              {user.isActive ? (
                <CheckCircle2 className="w-5 h-5 text-success-600 ml-auto" />
              ) : (
                <XCircle className="w-5 h-5 text-danger-600 ml-auto" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Role:</span>
              <span className={`px-2 py-0.5 rounded text-sm font-medium ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
EOF

# Excel Page
cat > app/excel/page.tsx << 'EOF'
'use client'

import { FileSpreadsheet, Download, Upload } from 'lucide-react'

export default function ExcelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Excel Sync</h1>
        <p className="mt-1 text-gray-600">Export and import data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-10 h-10 text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Export to Excel</h2>
              <p className="text-sm text-gray-600">Download your data</p>
            </div>
          </div>
          <button className="btn btn-success w-full">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-10 h-10 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Import from Excel</h2>
              <p className="text-sm text-gray-600">Upload data file</p>
            </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Drop file or click to browse</p>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# Settings Page
cat > app/settings/page.tsx << 'EOF'
'use client'

import { Settings as SettingsIcon, Bell } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-600">Configure your preferences</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          {['Email Notifications', 'Transaction Alerts', 'Weekly Summary'].map((setting) => (
            <div key={setting} className="flex items-center justify-between p-4 rounded border border-gray-200">
              <div>
                <p className="font-medium">{setting}</p>
                <p className="text-sm text-gray-600">Get notified about activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary">Save Changes</button>
          <button className="btn btn-secondary">Reset</button>
        </div>
      </div>
    </div>
  )
}
EOF

echo "✅ Created all remaining pages"

