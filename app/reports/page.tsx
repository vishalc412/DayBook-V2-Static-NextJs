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
