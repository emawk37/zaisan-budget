import React from 'react';
import { useZaisan } from '../context/ZaisanContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import TransactionLedger from './TransactionLedger';
import TransactionForm from './TransactionForm';

const BudgetDashboard = () => {
  const { totalIncome, totalExpenses, netWorth } = useZaisan();

  const chartData = [
    { name: 'Income', amount: totalIncome, fill: '#064E3B' }, 
    { name: 'Expenses', amount: totalExpenses, fill: '#FF3333' } 
  ];

  return (
    <div className="min-h-screen bg-carbon-900 text-terminal-text p-8 font-mono">
      
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl text-terminal-green font-bold uppercase tracking-widest border-b border-carbon-700 pb-4">
          Zaisan <span className="text-amber-horizon text-lg ml-2">Terminal</span>
        </h1>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-carbon-800 p-6 rounded border border-carbon-700 shadow-terminal-glow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-terminal-dim uppercase tracking-wider text-sm">Net Worth</h2>
            <Wallet className="text-terminal-green" size={24} />
          </div>
          <p className="text-4xl text-terminal-green font-bold">${netWorth.toLocaleString()}</p>
        </div>

        <div className="bg-carbon-800 p-6 rounded border border-carbon-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-terminal-dim uppercase tracking-wider text-sm">Income</h2>
            <TrendingUp className="text-emerald-night" size={24} />
          </div>
          <p className="text-3xl text-terminal-text font-bold">${totalIncome.toLocaleString()}</p>
        </div>

        <div className="bg-carbon-800 p-6 rounded border border-carbon-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-terminal-dim uppercase tracking-wider text-sm">Expenses</h2>
            <TrendingDown className="text-terminal-alert" size={24} />
          </div>
          <p className="text-3xl text-terminal-text font-bold">${totalExpenses.toLocaleString()}</p>
        </div>
      </div>

      {/* The New Input Form is Injected Here */}
      <TransactionForm />

      {/* Data Visualization Section */}
      <div className="bg-carbon-800 p-6 rounded border border-carbon-700 h-96 mb-6">
        <h2 className="text-amber-horizon uppercase tracking-wider mb-6 text-sm">Cash Flow Analysis</h2>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#A3A3A3" tickLine={false} axisLine={false} />
            <YAxis stroke="#A3A3A3" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              cursor={{fill: '#262626'}} 
              contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#E5E5E5' }}
              itemStyle={{ color: '#E5E5E5' }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ledger Section */}
      <TransactionLedger />

    </div>
  );
};

export default BudgetDashboard;