import React, { useState } from 'react';
import { useZaisan } from '../context/ZaisanContext';
import { PlusSquare } from 'lucide-react';

const TransactionForm = () => {
  const { addTransaction } = useZaisan();
  
  // Local state to hold the data as you type it in
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0] // Defaults to today's date
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Stops the page from refreshing
    if (!formData.amount || !formData.category) return; // Basic validation

    // Send the data to the brain
    addTransaction({
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    });

    // Clear the input fields after submission
    setFormData({ ...formData, amount: '', category: '' });
  };

  return (
    <div className="bg-carbon-800 p-6 rounded border border-carbon-700 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <PlusSquare className="text-amber-horizon" size={20} />
        <h2 className="text-amber-horizon uppercase tracking-wider text-sm">New Entry</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        
        <select 
          className="bg-carbon-900 border border-carbon-700 text-terminal-text p-2 rounded focus:outline-none focus:border-terminal-green"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input 
          type="number" 
          placeholder="Amount" 
          className="bg-carbon-900 border border-carbon-700 text-terminal-text p-2 rounded focus:outline-none focus:border-terminal-green"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
        />

        <input 
          type="text" 
          placeholder="Category (e.g. Server Costs)" 
          className="bg-carbon-900 border border-carbon-700 text-terminal-text p-2 rounded focus:outline-none focus:border-terminal-green md:col-span-2"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        />

        <button 
          type="submit" 
          className="bg-emerald-night/20 text-terminal-green border border-emerald-night/50 p-2 rounded hover:bg-emerald-night/40 transition-colors uppercase tracking-widest text-sm font-bold"
        >
          Execute
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;