import { create } from 'zustand';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Transaction } from '../types';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

interface TransactionStore extends TransactionState {
  fetchTransactions: (userId: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async (userId) => {
    set({ isLoading: true, error: null });
    
    try {
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const transactions: Transaction[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactions.push({
          id: doc.id,
          userId: data.userId,
          amount: data.amount,
          category: data.category,
          type: data.type,
          date: data.date.toDate(),
          description: data.description,
          createdAt: data.createdAt.toDate(),
        });
      });
      
      set({ transactions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ isLoading: true, error: null });
    
    try {
      const newTransaction = {
        ...transaction,
        createdAt: new Date()
      };
      
      const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
      
      set({
        transactions: [
          ...get().transactions,
          { ...newTransaction, id: docRef.id } as Transaction
        ],
        isLoading: false
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateTransaction: async (id, transaction) => {
    set({ isLoading: true, error: null });
    
    try {
      await updateDoc(doc(db, 'transactions', id), transaction);
      
      set({
        transactions: get().transactions.map(t => 
          t.id === id ? { ...t, ...transaction } : t
        ),
        isLoading: false
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteTransaction: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      await deleteDoc(doc(db, 'transactions', id));
      
      set({
        transactions: get().transactions.filter(t => t.id !== id),
        isLoading: false
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));