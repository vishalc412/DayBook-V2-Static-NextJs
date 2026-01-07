// Mock data for DayBook application

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface Account {
  id: number;
  code: string;
  name: string;
  accountType: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  parentId: number | null;
  description: string;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: number;
  transactionDate: string;
  referenceNumber: string;
  description: string;
  totalAmount: number;
  isPosted: boolean;
  createdBy: number;
  createdAt: string;
}

export interface JournalEntry {
  id: number;
  transactionId: number;
  accountId: number;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  userId: number;
  username: string;
  action: string;
  entityType: string;
  entityId: number;
  details: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@daybook.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    username: 'accountant',
    email: 'accountant@daybook.com',
    role: 'user',
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z'
  }
];

// Mock Accounts (Chart of Accounts)
export const mockAccounts: Account[] = [
  { id: 1, code: '1000', name: 'Cash', accountType: 'Asset', parentId: null, description: 'Cash in hand and bank', balance: 50000, createdAt: '2024-01-01' },
  { id: 2, code: '1100', name: 'Accounts Receivable', accountType: 'Asset', parentId: null, description: 'Money owed by customers', balance: 25000, createdAt: '2024-01-01' },
  { id: 3, code: '1200', name: 'Inventory', accountType: 'Asset', parentId: null, description: 'Stock of goods', balance: 35000, createdAt: '2024-01-01' },
  { id: 4, code: '1300', name: 'Equipment', accountType: 'Asset', parentId: null, description: 'Office equipment and machinery', balance: 45000, createdAt: '2024-01-01' },
  { id: 5, code: '2000', name: 'Accounts Payable', accountType: 'Liability', parentId: null, description: 'Money owed to suppliers', balance: 15000, createdAt: '2024-01-01' },
  { id: 6, code: '2100', name: 'Loans Payable', accountType: 'Liability', parentId: null, description: 'Outstanding loans', balance: 30000, createdAt: '2024-01-01' },
  { id: 7, code: '3000', name: "Owner's Capital", accountType: 'Equity', parentId: null, description: "Owner's investment", balance: 100000, createdAt: '2024-01-01' },
  { id: 8, code: '3100', name: 'Retained Earnings', accountType: 'Equity', parentId: null, description: 'Accumulated profits', balance: 10000, createdAt: '2024-01-01' },
  { id: 9, code: '4000', name: 'Sales Revenue', accountType: 'Revenue', parentId: null, description: 'Revenue from sales', balance: 85000, createdAt: '2024-01-01' },
  { id: 10, code: '4100', name: 'Service Revenue', accountType: 'Revenue', parentId: null, description: 'Revenue from services', balance: 45000, createdAt: '2024-01-01' },
  { id: 11, code: '5000', name: 'Rent Expense', accountType: 'Expense', parentId: null, description: 'Office rent payments', balance: 12000, createdAt: '2024-01-01' },
  { id: 12, code: '5100', name: 'Salaries Expense', accountType: 'Expense', parentId: null, description: 'Employee salaries', balance: 35000, createdAt: '2024-01-01' },
  { id: 13, code: '5200', name: 'Utilities Expense', accountType: 'Expense', parentId: null, description: 'Electricity, water, internet', balance: 5000, createdAt: '2024-01-01' },
  { id: 14, code: '5300', name: 'Marketing Expense', accountType: 'Expense', parentId: null, description: 'Advertising and promotion', balance: 8000, createdAt: '2024-01-01' },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    transactionDate: '2024-01-15',
    referenceNumber: 'TXN-001',
    description: 'Sale of goods to customer A',
    totalAmount: 5000,
    isPosted: true,
    createdBy: 1,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    transactionDate: '2024-01-16',
    referenceNumber: 'TXN-002',
    description: 'Payment of rent for January',
    totalAmount: 2000,
    isPosted: true,
    createdBy: 1,
    createdAt: '2024-01-16T14:20:00Z'
  },
  {
    id: 3,
    transactionDate: '2024-01-17',
    referenceNumber: 'TXN-003',
    description: 'Purchase of equipment',
    totalAmount: 10000,
    isPosted: true,
    createdBy: 2,
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: 4,
    transactionDate: '2024-01-18',
    referenceNumber: 'TXN-004',
    description: 'Service revenue from consulting',
    totalAmount: 7500,
    isPosted: true,
    createdBy: 1,
    createdAt: '2024-01-18T11:45:00Z'
  },
  {
    id: 5,
    transactionDate: '2024-01-19',
    referenceNumber: 'TXN-005',
    description: 'Payment of employee salaries',
    totalAmount: 8000,
    isPosted: false,
    createdBy: 2,
    createdAt: '2024-01-19T16:00:00Z'
  },
];

// Mock Journal Entries
export const mockJournalEntries: JournalEntry[] = [
  { id: 1, transactionId: 1, accountId: 1, accountName: 'Cash', debit: 5000, credit: 0, description: 'Cash received from sale' },
  { id: 2, transactionId: 1, accountId: 9, accountName: 'Sales Revenue', debit: 0, credit: 5000, description: 'Revenue from sale' },
  { id: 3, transactionId: 2, accountId: 11, accountName: 'Rent Expense', debit: 2000, credit: 0, description: 'Rent payment' },
  { id: 4, transactionId: 2, accountId: 1, accountName: 'Cash', debit: 0, credit: 2000, description: 'Cash paid for rent' },
  { id: 5, transactionId: 3, accountId: 4, accountName: 'Equipment', debit: 10000, credit: 0, description: 'Equipment purchase' },
  { id: 6, transactionId: 3, accountId: 1, accountName: 'Cash', debit: 0, credit: 10000, description: 'Cash paid for equipment' },
  { id: 7, transactionId: 4, accountId: 1, accountName: 'Cash', debit: 7500, credit: 0, description: 'Cash from service' },
  { id: 8, transactionId: 4, accountId: 10, accountName: 'Service Revenue', debit: 0, credit: 7500, description: 'Service revenue earned' },
  { id: 9, transactionId: 5, accountId: 12, accountName: 'Salaries Expense', debit: 8000, credit: 0, description: 'Salary payment' },
  { id: 10, transactionId: 5, accountId: 1, accountName: 'Cash', debit: 0, credit: 8000, description: 'Cash paid for salaries' },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 1,
    timestamp: '2024-01-15T10:30:00Z',
    userId: 1,
    username: 'admin',
    action: 'CREATE',
    entityType: 'Transaction',
    entityId: 1,
    details: 'Created transaction TXN-001'
  },
  {
    id: 2,
    timestamp: '2024-01-16T14:20:00Z',
    userId: 1,
    username: 'admin',
    action: 'CREATE',
    entityType: 'Transaction',
    entityId: 2,
    details: 'Created transaction TXN-002'
  },
  {
    id: 3,
    timestamp: '2024-01-17T09:15:00Z',
    userId: 2,
    username: 'accountant',
    action: 'CREATE',
    entityType: 'Transaction',
    entityId: 3,
    details: 'Created transaction TXN-003'
  },
  {
    id: 4,
    timestamp: '2024-01-10T12:00:00Z',
    userId: 1,
    username: 'admin',
    action: 'CREATE',
    entityType: 'Account',
    entityId: 14,
    details: 'Created account Marketing Expense'
  },
  {
    id: 5,
    timestamp: '2024-01-18T11:45:00Z',
    userId: 1,
    username: 'admin',
    action: 'CREATE',
    entityType: 'Transaction',
    entityId: 4,
    details: 'Created transaction TXN-004'
  },
];

// Dashboard Statistics
export const getDashboardStats = () => {
  const totalAssets = mockAccounts
    .filter(a => a.accountType === 'Asset')
    .reduce((sum, a) => sum + a.balance, 0);
    
  const totalLiabilities = mockAccounts
    .filter(a => a.accountType === 'Liability')
    .reduce((sum, a) => sum + a.balance, 0);
    
  const totalRevenue = mockAccounts
    .filter(a => a.accountType === 'Revenue')
    .reduce((sum, a) => sum + a.balance, 0);
    
  const totalExpenses = mockAccounts
    .filter(a => a.accountType === 'Expense')
    .reduce((sum, a) => sum + a.balance, 0);
    
  const netIncome = totalRevenue - totalExpenses;
  
  return {
    totalAssets,
    totalLiabilities,
    totalRevenue,
    totalExpenses,
    netIncome,
    totalTransactions: mockTransactions.length,
    postedTransactions: mockTransactions.filter(t => t.isPosted).length,
    pendingTransactions: mockTransactions.filter(t => !t.isPosted).length,
  };
};

// Monthly data for charts
export const getMonthlyData = () => {
  return [
    { month: 'Jan', revenue: 15000, expenses: 8000, netIncome: 7000 },
    { month: 'Feb', revenue: 18000, expenses: 9500, netIncome: 8500 },
    { month: 'Mar', revenue: 22000, expenses: 11000, netIncome: 11000 },
    { month: 'Apr', revenue: 20000, expenses: 10500, netIncome: 9500 },
    { month: 'May', revenue: 25000, expenses: 12000, netIncome: 13000 },
    { month: 'Jun', revenue: 28000, expenses: 13500, netIncome: 14500 },
  ];
};
