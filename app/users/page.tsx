'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { User as UserType } from '@/lib/mockData'
import { Plus, CheckCircle2, XCircle } from 'lucide-react'

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getUsers().then(data => {
      setUsers(data)
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
        {users.map((user: UserType) => (
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
              <span className={`px-2 py-0.5 rounded text-sm font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
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
