'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  closeLeftSidebar: () => void;
  closeRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(prev => !prev);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(prev => !prev);
  };

  const closeLeftSidebar = () => {
    setLeftSidebarOpen(false);
  };

  const closeRightSidebar = () => {
    setRightSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        leftSidebarOpen,
        rightSidebarOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
        closeLeftSidebar,
        closeRightSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

