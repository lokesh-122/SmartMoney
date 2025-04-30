import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTransactionStore } from '../store/transactionStore';
import TransactionForm, { TransactionFormValues } from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';
import Card from '../components/ui/Card';
import { Transaction } from '../types';
import { format } from 'date-fns';

const Transactions: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { 
    transactions, 
    fetchTransactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction, 
    isLoading 
  } = useTransactionStore();
  const navigate = useNavigate();
  
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (user) {
      fetchTransactions(user.id);
    }
  }, [fetchTransactions, user]);
  
  const handleAddTransaction = (formData: TransactionFormValues) => {
    if (user) {
      addTransaction({
        userId: user.id,
        amount: formData.amount,
        category: formData.category,
        type: formData.type,
        date: new Date(formData.date),
        description: formData.description,
      });
    }
  };
  
  const handleUpdateTransaction = (formData: TransactionFormValues) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, {
        amount: formData.amount,
        category: formData.category,
        type: formData.type,
        date: new Date(formData.date),
        description: formData.description,
      });
      
      setEditingTransaction(null);
    }
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };
  
  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };
  
  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transactionId);
    }
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card title={editingTransaction ? "Edit Transaction" : "Add New Transaction"}>
            {editingTransaction ? (
              <>
                <TransactionForm
                  onSubmit={handleUpdateTransaction}
                  isLoading={isLoading}
                  defaultValues={{
                    amount: editingTransaction.amount,
                    type: editingTransaction.type,
                    category: editingTransaction.category,
                    date: format(new Date(editingTransaction.date), 'yyyy-MM-dd'),
                    description: editingTransaction.description,
                  }}
                  buttonText="Update Transaction"
                />
                <button
                  onClick={handleCancelEdit}
                  className="mt-2 w-full py-2 text-center text-gray-600 hover:text-gray-900"
                >
                  Cancel Editing
                </button>
              </>
            ) : (
              <TransactionForm
                onSubmit={handleAddTransaction}
                isLoading={isLoading}
              />
            )}
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <TransactionList
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;