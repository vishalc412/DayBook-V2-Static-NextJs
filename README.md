# DayBook - Accounting Management System (Static UI)

A modern, professional accounting management system built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This project serves as a comprehensive frontend template for double-entry bookkeeping, financial reporting, and audit management.

> [!IMPORTANT]
> This is a **Static UI demonstration** project. All data shown is currently provided by mock definitions. It is designed to be easily integrated with a backend API (such as FastAPI or Node.js).

## ✨ Key Features

- **📊 Interactive Dashboard**: Financial overview with KPIs and monthly revenue vs. expense trends.
- **📁 Chart of Accounts**: Structured management of Assets, Liabilities, Equity, Revenue, and Expenses.
- **💸 Transaction Management**: Interface for recording and viewing financial transactions.
- **📖 General Ledger**: Double-entry bookkeeping view with journal entries.
- **📈 Advanced Analytics**: Financial reports and visualizations using Recharts.
- **🕵️ Audit Logging**: Traceability for all system actions and entity changes.
- **👥 User Management**: Role-based access control interface.
- **📂 Data Portability**: Dedicated sections for Excel synchronization and settings.

## 🛠️ Technical Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescript.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: Tailwind-based CSS transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd daybook-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📊 Mock Data & Architecture

The application currently relies on a centralized mock data store located in:
`lib/mockData.ts`

This file contains interfaces and sample data for:

- Users
- Accounts (Chart of Accounts)
- Transactions & Journal Entries
- Audit Logs
- Monthly Financial Data

## 🔌 API Integration Guide

To transform this into a production-ready application, you need to connect it to a backend. Below is the recommended integration strategy:

### 1. Expected API Endpoints

Your backend should provide the following RESTful endpoints:

- `GET /api/dashboard/stats` - Summary data for the dashboard.
- `GET /api/accounts` - Fetch all accounts.
- `GET /api/transactions` - List all transactions.
- `GET /api/journal-entries/{transaction_id}` - Fetch entries for a specific transaction.
- `GET /api/audit-logs` - System activity logs.

### 2. Implementation Steps

#### A. API Documentation (OpenAPI)

I have generated a standard OpenAPI specification in `openapi.yaml`. You can import this into Swagger Editor or Postman to design your backend. It includes schemas for:

- Accounts, Transactions, and Journal Entries
- Dashboard statistics and monthly trends
- Audit logs and User management

#### B. API Service Layer (`lib/api.ts`)

The application uses a **Hybrid API-Mock** approach. The service layer (`lib/api.ts`) is configured to:

1. **Attempt** a real API call to the configured backend.
2. **Verify** if data is returned and not empty.
3. **Fallback** automatically to mock data if the API is down, returns an error, or provides no records.

This ensures the UI remains functional and interactive even before the backend is fully developed. To point to your real backend, simply update the `NEXT_PUBLIC_API_URL` in your `.env.local`.

#### C. Configure Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://your-api-endpoint.com/api
```

#### D. Dynamic State Management

The pages now use `useState` and `useEffect` to load data asynchronously, ensuring a smooth transition once the backend is plugged in.

### 3. Backend Recommendations

This UI is optimized for a **FastAPI** backend due to its speed and native support for Pydantic (matching the TypeScript interfaces in `lib/mockData.ts`).

## 📄 License

This project is part of the DayBook ecosystem. All rights reserved.
