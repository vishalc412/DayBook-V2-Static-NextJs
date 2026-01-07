/**
 * API Service Layer
 * 
 * This file provides a dynamic interface for data fetching. 
 * Currently, it returns mock data, but it is structured to easily
 * switch to real API calls by updating the fetch logic.
 */

import {
    mockUsers,
    mockAccounts,
    mockTransactions,
    mockJournalEntries,
    mockAuditLogs,
    getDashboardStats,
    getMonthlyData,
    User,
    Account,
    Transaction,
    JournalEntry,
    AuditLog
} from './mockData'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Helper for real fetch calls with error handling
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        })
        if (!response.ok) return null
        return await response.json()
    } catch (error) {
        console.warn(`API Fetch failed for ${endpoint}, falling back to mock data.`, error)
        return null
    }
}

export const api = {
    // Dashboard
    getStats: async () => {
        const data = await apiFetch<any>('/dashboard/stats')
        return data || getDashboardStats()
    },

    getMonthlyAnalytics: async () => {
        const data = await apiFetch<any[]>('/dashboard/monthly')
        return (data && data.length > 0) ? data : getMonthlyData()
    },

    // Accounts
    getAccounts: async (): Promise<Account[]> => {
        const data = await apiFetch<Account[]>('/accounts')
        return (data && data.length > 0) ? data : mockAccounts
    },

    // Transactions
    getTransactions: async (): Promise<Transaction[]> => {
        const data = await apiFetch<Transaction[]>('/transactions')
        return (data && data.length > 0) ? data : mockTransactions
    },

    // Journal Entries
    getJournalEntries: async (): Promise<JournalEntry[]> => {
        const data = await apiFetch<JournalEntry[]>('/journal')
        return (data && data.length > 0) ? data : mockJournalEntries
    },

    // Audit Logs
    getAuditLogs: async (): Promise<AuditLog[]> => {
        const data = await apiFetch<AuditLog[]>('/audit-logs')
        return (data && data.length > 0) ? data : mockAuditLogs
    },

    // Users
    getUsers: async (): Promise<User[]> => {
        const data = await apiFetch<User[]>('/users')
        return (data && data.length > 0) ? data : mockUsers
    }
}
