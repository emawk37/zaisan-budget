import React from 'react';
import { useZaisan } from '../context/ZaisanContext';
import { Trash2 } from 'lucide-react';

const TransactionLedger = () => {
  const { transactions, deleteTransaction } = useZaisan();

  return (
    <div className="bg-carbon-800 p-6 rounded border border-carbon-700 mt-6">
      <h2 className="text-amber-horizon uppercase tracking-wider mb-6 text-sm">Raw Data Ledger</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-carbon-700 text-terminal-dim text-sm uppercase tracking-wider">
              <th className="pb-3 font-normal">Date</th>
              <th className="pb-3 font-normal">Category</th>
              <th className="pb-3 font-normal">Type</th>
              <th className="pb-3 font-normal text-right">Amount</th>
              <th className="pb-3 font-normal text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-terminal-text text-sm">
            {transactions.map((tx, index) => (
              <tr key={tx.id || index} className="border-b border-carbon-700/50 hover:bg-carbon-700/30 transition-colors">
                <td className="py-4 text-terminal-dim">{tx.date}</td>
                <td className="py-4">{tx.category}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-xs tracking-wider ${
                    tx.type === 'income' 
                      ? 'bg-emerald-night/20 text-terminal-green border border-emerald-night/50' 
                      : 'bg-red-900/20 text-terminal-alert border border-red-900/50'
                  }`}>
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 text-right font-mono">
                  <span className={tx.type === 'income' ? 'text-terminal-green' : 'text-terminal-text'}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button 
                    onClick={() => deleteTransaction(tx.id)}
                    className="text-terminal-muted hover:text-terminal-alert transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLedger;