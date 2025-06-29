import { Transaction, FraudResult } from '../types/fraud';

export class FraudDetectionEngine {
  // Simulate Isolation Forest anomaly detection
  private calculateAnomalyScore(transaction: Transaction): number {
    let anomalyScore = 0;
    
    // Amount-based anomaly (very high or very low amounts)
    if (transaction.amount > 5000 || transaction.amount < 1) {
      anomalyScore += 0.3;
    }
    
    // Time-based anomaly (late night transactions)
    const hour = new Date(transaction.time).getHours();
    if (hour < 6 || hour > 23) {
      anomalyScore += 0.2;
    }
    
    // Location-based anomaly (simulate unusual location)
    if (transaction.location.includes('International') || transaction.location.includes('ATM')) {
      anomalyScore += 0.25;
    }
    
    // Online transaction risk
    if (transaction.isOnline && transaction.amount > 1000) {
      anomalyScore += 0.15;
    }
    
    // Account age risk (newer accounts higher risk)
    if (transaction.accountAge < 30) {
      anomalyScore += 0.1;
    }
    
    return Math.min(anomalyScore, 1);
  }

  // Simulate XGBoost classifier
  private calculateMLScore(transaction: Transaction): number {
    let mlScore = 0;
    
    // Feature engineering simulation
    const amountNormalized = Math.min(transaction.amount / 10000, 1);
    const timeFeature = new Date(transaction.time).getHours() / 24;
    const categoryRisk = this.getCategoryRisk(transaction.category);
    const userRisk = transaction.userAge < 25 ? 0.2 : 0;
    
    // Simulated XGBoost decision tree ensemble
    mlScore = (amountNormalized * 0.3) + (timeFeature * 0.2) + (categoryRisk * 0.3) + userRisk + Math.random() * 0.1;
    
    return Math.min(mlScore, 1);
  }

  private getCategoryRisk(category: string): number {
    const riskMap: Record<string, number> = {
      'Cash Advance': 0.8,
      'Online Gaming': 0.7,
      'Cryptocurrency': 0.6,
      'International Transfer': 0.5,
      'Gas Station': 0.1,
      'Grocery': 0.1,
      'Restaurant': 0.2,
      'Retail': 0.2,
      'Entertainment': 0.3,
    };
    return riskMap[category] || 0.3;
  }

  public detectFraud(transaction: Transaction): FraudResult {
    const anomalyScore = this.calculateAnomalyScore(transaction);
    const mlScore = this.calculateMLScore(transaction);
    
    // Ensemble approach: combine both scores
    const fraudScore = (anomalyScore * 0.4 + mlScore * 0.6);
    const confidence = Math.min(0.7 + (Math.abs(fraudScore - 0.5) * 0.6), 0.95);
    
    let riskLevel: FraudResult['riskLevel'];
    let recommendation: string;
    const factors: string[] = [];

    if (fraudScore >= 0.8) {
      riskLevel = 'CRITICAL';
      recommendation = 'BLOCK TRANSACTION - High fraud probability detected';
    } else if (fraudScore >= 0.6) {
      riskLevel = 'HIGH';
      recommendation = 'REVIEW REQUIRED - Manual verification recommended';
    } else if (fraudScore >= 0.4) {
      riskLevel = 'MEDIUM';
      recommendation = 'MONITOR - Additional authentication suggested';
    } else {
      riskLevel = 'LOW';
      recommendation = 'APPROVE - Transaction appears legitimate';
    }

    // Add specific risk factors
    if (transaction.amount > 5000) factors.push('High transaction amount');
    if (transaction.isOnline) factors.push('Online transaction');
    if (transaction.location.includes('International')) factors.push('International location');
    if (transaction.accountAge < 30) factors.push('New account');
    if (this.getCategoryRisk(transaction.category) > 0.5) factors.push('High-risk merchant category');

    return {
      transactionId: transaction.id,
      fraudScore: Math.round(fraudScore * 100) / 100,
      riskLevel,
      confidence: Math.round(confidence * 100) / 100,
      factors,
      recommendation,
    };
  }
}

export const fraudEngine = new FraudDetectionEngine();