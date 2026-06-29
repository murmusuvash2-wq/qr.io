// src/contexts/AppContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, UserStats } from '../lib/firebase';

interface AppContextType {
  user: UserStats | null;
  isPayModalOpen: boolean;
  setPayModalOpen: (open: boolean) => void;
  scans: number;
  onPaymentSuccess: (u: UserStats) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  isPayModalOpen: false,
  setPayModalOpen: () => {},
  scans: 0,
  onPaymentSuccess: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserStats | null>(null);
  const [isPayModalOpen, setPayModalOpen] = useState(false);
  const [scans, setScans] = useState(49284);

  useEffect(() => {
    authService.getCurrentUser().then(setUser);
    const interval = setInterval(() => {
      if (Math.random() > 0.5) setScans(s => s + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{ user, isPayModalOpen, setPayModalOpen, scans, onPaymentSuccess: setUser }}>
      {children}
    </AppContext.Provider>
  );
};
