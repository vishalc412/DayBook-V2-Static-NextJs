#!/bin/bash

# This script creates all DayBook page files

echo "Creating all page files..."

# Create a simple test page first
cat > app/page.tsx << 'PAGE_EOF'
'use client'

import { TrendingUp, DollarSign, Wallet, FileText } from 'lucide-react'
import { getDashboardStats, getMonthlyData, mockTransactions } from '@/lib/mockData'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  const stats = getDashboardStats()
  const monthlyData = getMonthlyData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's your financial overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-display font-bold text-gray-900 mt-1">
                ${stats.totalAssets.toLocaleString()}
              </p>
            </div>
            <Wallet className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-display font-bold text-gray-900 mt-1">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-display font-bold text-gray-900 mt-1">
                ${stats.totalExpenses.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-orange-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Income</p>
              <p className="text-2xl font-display font-bold text-gray-900 mt-1">
                ${stats.netIncome.toLocaleString()}
              </p>
            </div>
            <FileText className="w-12 h-12 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-display font-semibold text-gray-900 mb-4">Revenue vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 className="text-lg font-display font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {mockTransactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-600">{transaction.referenceNumber}</p>
              </div>
              <p className="font-semibold text-gray-900">${transaction.totalAmount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
PAGE_EOF

echo "✅ Created Dashboard page"

