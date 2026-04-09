import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@/context/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="d-flex min-vh-100 overflow-hidden" data-theme={theme}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <main 
        className="flex-grow-1 d-flex flex-column"
        style={{ 
          marginLeft: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          minWidth: 0,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100vh'
        }}
      >
        <div className="p-4 pb-0">
            <Header />
        </div>
        
        <div className="flex-grow-1 overflow-auto px-4">
            {children}
        </div>

        <div className="px-4">
            <Footer />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
