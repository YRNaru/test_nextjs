'use client';

import { useSidebar } from './SidebarContext';
import { ReactNode, useEffect, useState } from 'react';

export default function MainContent({ children }: { children: ReactNode }) {
  const { leftSidebarOpen, rightSidebarOpen } = useSidebar();
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = viewportWidth > 1200 && viewportWidth <= 1400 ? 220 : 250;
  const shouldOffsetSidebars = viewportWidth >= 1200;
  const paddingLeft = leftSidebarOpen && shouldOffsetSidebars ? `${sidebarWidth}px` : '0';
  const paddingRight = rightSidebarOpen && shouldOffsetSidebars ? `${sidebarWidth}px` : '0';

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

