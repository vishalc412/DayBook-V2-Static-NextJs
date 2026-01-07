# DayBook UI - Quick Start Guide  

## ✅ Fixed Issue
The `border-border` class error has been resolved!

## 🚀 Installation

```bash
cd daybook-ui
npm install
npm run dev
```

Open http://localhost:3000

## 📁 Project Structure

```
daybook-ui/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── accounts/page.tsx     # Chart of Accounts
│   ├── transactions/page.tsx # Transactions
│   ├── journal/page.tsx      # Journal Entries
│   ├── reports/page.tsx      # Analytics
│   ├── audit/page.tsx        # Audit Logs
│   ├── users/page.tsx        # User Management
│   ├── excel/page.tsx        # Excel Sync
│   ├── settings/page.tsx     # Settings
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles (FIXED!)
├── components/
│   ├── Header.tsx            # Top bar
│   └── Sidebar.tsx           # Navigation
├── lib/
│   └── mockData.ts           # Mock data
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## 🎯 Features

✅ **8 Complete Pages** - Dashboard, Accounts, Transactions, Journal, Reports, Audit, Users, Excel, Settings  
✅ **Professional UI** - Modern design with Tailwind CSS  
✅ **Mock Data** - Complete dataset ready to use  
✅ **Responsive** - Works on all devices  
✅ **Charts** - Using Recharts library  
✅ **TypeScript** - Fully typed  
✅ **Double-Entry** - Accounting validation  

## 🔧 What Was Fixed

The error was in `app/globals.css`:
- ❌ Removed: `@apply border-border` (non-existent class)
- ✅ Fixed: Cleaned up CSS without undefined classes

## 📊 Mock Data

- **Users**: 2 (admin, accountant)
- **Accounts**: 14 across all types
- **Transactions**: 5 (4 posted, 1 pending)
- **Journal Entries**: 10 (perfectly balanced)
- **Audit Logs**: 5 activity records

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#your-color',
  }
}
```

### Add Data
Edit `lib/mockData.ts` to add more mock records.

## 🔗 Connect to API

Create `lib/api.ts`:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchAccounts() {
  const response = await fetch(`${API_URL}/api/accounts`)
  return response.json()
}
```

Then use in pages:
```typescript
import { useEffect, useState } from 'react'
import { fetchAccounts } from '@/lib/api'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([])
  
  useEffect(() => {
    fetchAccounts().then(setAccounts)
  }, [])
  
  // render accounts...
}
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## ❓ Troubleshooting

### Port in Use
```bash
npx kill-port 3000
# or use different port
npm run dev -- -p 3001
```

### Clear Cache
```bash
rm -rf .next node_modules package-lock.json
npm install
```

## 🎉 You're Ready!

Run `npm run dev` and explore your accounting system at http://localhost:3000
