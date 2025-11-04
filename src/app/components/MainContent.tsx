'use client';

import { useSidebar } from './SidebarContext';
import { ReactNode, useEffect, useState } from 'react';

export default function MainContent({ children }: { children: ReactNode }) {
  const { leftSidebarOpen, rightSidebarOpen } = useSidebar();
  const [sidebarWidth, setSidebarWidth] = useState(250);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 1400 && window.innerWidth > 1200) {
        setSidebarWidth(220);
      } else {
        setSidebarWidth(250);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const paddingLeft = leftSidebarOpen ? `${sidebarWidth}px` : '0';
  const paddingRight = rightSidebarOpen ? `${sidebarWidth}px` : '0';

  return (
    <main 
      className="min-h-screen main-content"
      style={{ 
        paddingTop: '80px',
        paddingLeft,
        paddingRight,
        transition: 'padding 0.3s ease'
      }}
    >
      {children}
    </main>
  );
}

