import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      const newUser: User = {
        id: userCredential.user.uid,
        name: name,
        email: userCredential.user.email!,
        income: 0,
        savingsGoal: 0,
        riskAppetite: 'medium',
        createdAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      
      set({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error('User data not found');
      }
    } catch (error: any) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    
    try {
      await signOut(auth);
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
    }
  },

  updateUserProfile: async (userData) => {
    set({ isLoading: true, error: null });
    
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }
      
      await setDoc(
        doc(db, 'users', auth.currentUser.uid), 
        userData, 
        { merge: true }
      );
      
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      
      if (userDoc.exists()) {
        set({
          user: userDoc.data() as User,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
    }
  },
}));