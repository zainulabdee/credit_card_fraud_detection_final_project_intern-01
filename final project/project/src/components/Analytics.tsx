import React from 'react';
import { BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';
import { AnalyticsData } from '../types/fraud';

interface AnalyticsProps {
  data: AnalyticsData;
}

export const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  const fraudRate = ((data.fraudDetected / data.totalTransactions) * 100).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500">System performance and fraud detection metrics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-900">{data.totalTransactions.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Fraud Detected</p>
              <p className="text-2xl font-bold text-red-900">{data.fraudDetected}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Fraud Rate</p>
              <p className="text-2xl font-bold text-yellow-900">{fraudRate}%</p>
            </div>
            <PieChart className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Accuracy</p>
              <p className="text-2xl font-bold text-green-900">{data.accuracy}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Transaction Trend Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Transaction Volume</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-end justify-between h-40 gap-2">
            {data.dailyTransactions.map((day, index) => {
              const maxCount = Math.max(...data.dailyTransactions.map(d => d.count));
              const height = (day.count / maxCount) * 100;
              const fraudHeight = (day.fraudCount / day.count) * height;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full bg-gray-200 rounded-t" style={{ height: `${height}%` }}>
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 rounded-t"
                      style={{ height: `${height - fraudHeight}%` }}
                    ></div>
                    <div 
                      className="absolute top-0 w-full bg-red-500 rounded-t"
                      style={{ height: `${fraudHeight}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 transform -rotate-45">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Legitimate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Fraudulent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Level Distribution */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.riskDistribution.map((risk, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                risk.level === 'LOW' ? 'bg-green-100 text-green-600' :
                risk.level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-600' :
                risk.level === 'HIGH' ? 'bg-orange-100 text-orange-600' :
                'bg-red-100 text-red-600'
              }`}>
                <span className="font-bold">{risk.count}</span>
              </div>
              <p className="text-sm font-medium text-gray-700">{risk.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};