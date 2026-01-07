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
