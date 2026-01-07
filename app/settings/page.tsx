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
