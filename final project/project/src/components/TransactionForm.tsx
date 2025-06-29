import React, { useState } from 'react';
import { CreditCard, MapPin, Clock, User, DollarSign } from 'lucide-react';
import { Transaction } from '../types/fraud';

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
  isProcessing: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({
    amount: '',
    merchant: '',
    category: 'Retail',
    location: '',
    cardType: 'Visa',
    isOnline: false,
    userAge: '',
    accountAge: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      amount: parseFloat(formData.amount),
      merchant: formData.merchant,
      category: formData.category,
      time: new Date().toISOString(),
      location: formData.location,
      cardType: formData.cardType,
      isOnline: formData.isOnline,
      userAge: parseInt(formData.userAge),
      accountAge: parseInt(formData.accountAge),
    };
    
    onSubmit(transaction);
  };

  const categories = [
    'Retail', 'Restaurant', 'Gas Station', 'Grocery', 'Entertainment',
    'Cash Advance', 'Online Gaming', 'Cryptocurrency', 'International Transfer'
  ];

  const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
          <p className="text-sm text-gray-500">Enter transaction information for fraud analysis</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Transaction Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merchant Name
            </label>
            <input
              type="text"
              required
              value={formData.merchant}
              onChange={(e) => setFormData(prev => ({ ...prev, merchant: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g. Amazon, Walmart"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g. New York, NY or International ATM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Type
            </label>
            <select
              value={formData.cardType}
              onChange={(e) => setFormData(prev => ({ ...prev, cardType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {cardTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              User Age
            </label>
            <input
              type="number"
              min="18"
              max="100"
              required
              value={formData.userAge}
              onChange={(e) => setFormData(prev => ({ ...prev, userAge: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Account Age (days)
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.accountAge}
              onChange={(e) => setFormData(prev => ({ ...prev, accountAge: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="365"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isOnline}
                onChange={(e) => setFormData(prev => ({ ...prev, isOnline: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Online Transaction</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            'Analyze Transaction'
          )}
        </button>
      </form>
    </div>
  );
};