export interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  time: string;
  location: string;
  cardType: string;
  isOnline: boolean;
  userAge: number;
  accountAge: number;
}

export interface FraudResult {
  transactionId: string;
  fraudScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  factors: string[];
  recommendation: string;
}

export interface AnalyticsData {
  totalTransactions: number;
  fraudDetected: number;
  falsePositives: number;
  accuracy: number;
  dailyTransactions: Array<{ date: string; count: number; fraudCount: number }>;
  riskDistribution: Array<{ level: string; count: number }>;
}