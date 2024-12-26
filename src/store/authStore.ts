import { create } from 'zustand';
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ERROR_MESSAGES } from '../utils/constants';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  init: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  init: () => {
    console.log('Initializing auth listener');
    if (!auth) {
      console.error('Firebase auth is not initialized!');
      set({ loading: false, error: 'Firebase not initialized' });
      return () => {};
    }
    
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        console.log('Auth state changed:', user);
        useAuthStore.setState({ user, loading: false });
      },
      (error) => {
        console.error('Auth error:', error);
        useAuthStore.setState({ error: error.message, loading: false });
      }
    );
    
    return unsubscribe;
  },
  signIn: async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      set({ error: null });
    } catch (error) {
      console.error(ERROR_MESSAGES.SIGN_IN, error);
      set({ error: ERROR_MESSAGES.SIGN_IN });
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ error: null });
    } catch (error) {
      console.error(ERROR_MESSAGES.SIGN_OUT, error);
      set({ error: ERROR_MESSAGES.SIGN_OUT });
    }
  }
}));