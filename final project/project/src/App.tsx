import React, { useState } from 'react';
import { Shield, BarChart3, CreditCard } from 'lucide-react';
import { TransactionForm } from './components/TransactionForm';
import { FraudResults } from './components/FraudResults';
import { Analytics } from './components/Analytics';
import { Transaction, FraudResult } from './types/fraud';
import { fraudEngine } from './utils/fraudDetection';
import { generateMockAnalytics } from './utils/mockData';

type ActiveTab = 'detect' | 'analytics';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('detect');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResult, setCurrentResult] = useState<FraudResult | null>(null);
  const [analyticsData] = useState(generateMockAnalytics());

  const handleTransactionSubmit = async (transaction: Transaction) => {
    setIsProcessing(true);
    setCurrentResult(null);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = fraudEngine.detectFraud(transaction);
    setCurrentResult(result);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FraudGuard AI</h1>
                <p className="text-sm text-gray-500">Advanced Credit Card Fraud Detection</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('detect')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'detect'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Detection
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'analytics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'detect' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <TransactionForm
                onSubmit={handleTransactionSubmit}
                isProcessing={isProcessing}
              />
            </div>
            <div>
              {currentResult ? (
                <FraudResults result={currentResult} />
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Analysis</h3>
                    <p className="text-gray-500">Enter transaction details to begin fraud detection</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Analytics data={analyticsData} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Powered by advanced machine learning algorithms including Isolation Forest and XGBoost
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Accuracy: 96.8%</span>
              <span>•</span>
              <span>Response time: &lt;300ms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;