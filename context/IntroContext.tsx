// context/IntroContext.tsx (create this new file)
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface IntroContextType {
  isIntroActive: boolean;
  setIntroComplete: () => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [isIntroActive, setIsIntroActive] = useState(true);

  const setIntroComplete = () => {
    setIsIntroActive(false);
    sessionStorage.setItem("introShown", "true");
  };

  return (
    <IntroContext.Provider value={{ isIntroActive, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntro must be used within an IntroProvider');
  }
  return context;
}