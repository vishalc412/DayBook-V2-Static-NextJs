# DayBook - Accounting Management System UI

A professional Next.js application for double-entry bookkeeping and financial management.

## Features

### Complete Accounting System
- **Dashboard** - Financial overview with charts and KPIs
- **Chart of Accounts** - Manage account structure
- **Transactions** - Create and track financial transactions
- **Journal Entries** - Double-entry bookkeeping ledger
- **Reports & Analytics** - Financial insights and charts
- **Audit Logs** - Complete activity history
- **Users** - User management interface
- **Excel Sync** - Import/export functionality
- **Settings** - System configuration

### Technical Stack
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

### Design Features
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Professional color-coded UI
- ✅ Smooth animations and transitions
- ✅ Interactive charts and visualizations
- ✅ Real-time form validation
- ✅ Double-entry accounting validation

## Installation

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Mock Data

The application includes comprehensive mock data:
- 14 Accounts (Assets, Liabilities, Equity, Revenue, Expenses)
- 5 Transactions with full journal entries
- 2 Users (admin, accountant)
- 5 Audit log entries
- Monthly financial data for charts

## Architecture

Built to match the DayBook system architecture:

**Frontend (This App)**
- React/Next.js presentation layer
- Zustand state management (via React hooks)
- Recharts for analytics

**Expected Backend (Not Included)**
- FastAPI authentication
- Accounts CRUD API
- Transactions API
- Reports API
- Excel sync API
- Audit logging API

**Database Schema (Mock Data)**
- Users table
- Accounts table (with hierarchy)
- Transactions table
- Journal entries table
- Audit logs table

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme.

### Mock Data
Modify `lib/mockData.ts` to adjust sample data.

### API Integration
Replace mock data imports with API calls:

```typescript
// Before
import { mockAccounts } from '@/lib/mockData'

// After  
import { fetchAccounts } from '@/lib/api'
const accounts = await fetchAccounts()
```

## Production Build

```bash
npm run build
npm start
```

## License

Part of the DayBook accounting system project.

## Support

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
# DayBook-V2-Static-NextJs
