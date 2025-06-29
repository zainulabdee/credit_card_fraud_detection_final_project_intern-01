import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle, Shield, TrendingUp } from 'lucide-react';
import { FraudResult } from '../types/fraud';

interface FraudResultsProps {
  result: FraudResult;
}

export const FraudResults: React.FC<FraudResultsProps> = ({ result }) => {
  const getRiskColor = (level: FraudResult['riskLevel']) => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getRiskIcon = (level: FraudResult['riskLevel']) => {
    switch (level) {
      case 'LOW': return <CheckCircle className="w-5 h-5" />;
      case 'MEDIUM': return <AlertCircle className="w-5 h-5" />;
      case 'HIGH': return <AlertTriangle className="w-5 h-5" />;
      case 'CRITICAL': return <XCircle className="w-5 h-5" />;
    }
  };

  const fraudPercentage = Math.round(result.fraudScore * 100);
  const confidencePercentage = Math.round(result.confidence * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Fraud Analysis Results</h2>
          <p className="text-sm text-gray-500">Transaction ID: {result.transactionId}</p>
        </div>
      </div>

      {/* Risk Level Alert */}
      <div className={`rounded-lg border-2 p-4 mb-6 ${getRiskColor(result.riskLevel)}`}>
        <div className="flex items-center gap-3">
          {getRiskIcon(result.riskLevel)}
          <div>
            <h3 className="font-semibold text-lg">Risk Level: {result.riskLevel}</h3>
            <p className="text-sm opacity-90">{result.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Fraud Score Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Fraud Score</h4>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
              <div 
                className={`h-6 rounded-full transition-all duration-1000 ${
                  fraudPercentage >= 80 ? 'bg-red-500' :
                  fraudPercentage >= 60 ? 'bg-orange-500' :
                  fraudPercentage >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${fraudPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0%</span>
              <span className="font-bold">{fraudPercentage}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Confidence Level</h4>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
              <div 
                className="h-6 bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${confidencePercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0%</span>
              <span className="font-bold">{confidencePercentage}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Detected Risk Factors</h4>
        {result.factors.length > 0 ? (
          <div className="space-y-2">
            {result.factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-700">{factor}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No significant risk factors detected</p>
        )}
      </div>

      {/* ML Model Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Model Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-medium">Algorithm:</span>
            <p className="text-blue-600">Ensemble (Isolation Forest + XGBoost)</p>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Processing Time:</span>
            <p className="text-blue-600">247ms</p>
          </div>
        </div>
      </div>
    </div>
  );
};