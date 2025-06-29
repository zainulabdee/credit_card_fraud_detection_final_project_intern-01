import { AnalyticsData } from '../types/fraud';

export const generateMockAnalytics = (): AnalyticsData => {
  const totalTransactions = 45827;
  const fraudDetected = 234;
  
  // Generate daily data for the last 14 days
  const dailyTransactions = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const count = Math.floor(Math.random() * 1000) + 2000;
    const fraudCount = Math.floor(count * 0.005) + Math.floor(Math.random() * 5);
    
    dailyTransactions.push({
      date: date.toISOString(),
      count,
      fraudCount,
    });
  }

  return {
    totalTransactions,
    fraudDetected,
    falsePositives: 12,
    accuracy: 96.8,
    dailyTransactions,
    riskDistribution: [
      { level: 'LOW', count: 42156 },
      { level: 'MEDIUM', count: 3437 },
      { level: 'HIGH', count: 189 },
      { level: 'CRITICAL', count: 45 },
    ],
  };
};