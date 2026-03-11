import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Connecting to the vault we just built

const ZaisanContext = createContext();

export const useZaisan = () => useContext(ZaisanContext);

export const ZaisanProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH: Pull data from Supabase when the app boots up
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) console.error('Error fetching:', error);
    else setTransactions(data);
    setLoading(false);
  };

  // 2. CREATE: Push new data to the cloud
  const addTransaction = async (newTransaction) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([newTransaction])
      .select();

    if (error) {
      console.error('Error adding:', error);
    } else {
      // Update local state with the returned data from the cloud
      setTransactions([data[0], ...transactions]);
    }
  };

  // 3. DELETE: Remove data from the cloud
  const deleteTransaction = async (id) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting:', error);
    } else {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  // Logic remains the same, but now it calculates based on Cloud Data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const netWorth = totalIncome - totalExpenses;

  return (
    <ZaisanContext.Provider value={{ 
      transactions, 
      totalIncome, 
      totalExpenses, 
      netWorth, 
      addTransaction, 
      deleteTransaction,
      loading 
    }}>
      {children}
    </ZaisanContext.Provider>
  );
};