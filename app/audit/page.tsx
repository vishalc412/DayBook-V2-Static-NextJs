'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { AuditLog } from '@/lib/mockData'
import { History, User } from 'lucide-react'

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAuditLogs().then(data => {
      setLogs(data)
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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Audit Logs</h1>
        <p className="mt-1 text-gray-600">Complete activity history</p>
      </div>

      <div className="card">
        <div className="space-y-4">
          {logs.map((log: AuditLog) => (
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
