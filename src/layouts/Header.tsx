import React from 'react';
import { PersonCircle, Bell, Sun, Moon } from 'react-bootstrap-icons';
import { useTheme } from '@/context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-panel py-3 px-4 d-flex align-items-center justify-content-between mb-4 rounded-4 transition-all">
      <div className="d-flex align-items-center">
        <h5 className="m-0 fw-bold-custom text-main">Overview</h5>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn glass-panel border-0 px-3 py-2 rounded-pill d-flex align-items-center gap-2 hover-effect shadow-none"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon size={16} className="icon-primary" /> : <Sun size={16} className="icon-primary" />}
          <span className="small fw-bold text-main">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        
        <button className="btn glass-panel border-0 p-2 rounded-circle hover-effect shadow-none d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
          <Bell size={18} className="text-main" />
        </button>

        <div className="d-flex align-items-center gap-2 ps-3 ms-2 border-start border-white border-opacity-10">
          <div className="text-end d-none d-sm-block">
            <p className="m-0 small fw-bold-custom text-main lh-1">Emily Johnson</p>
            <small className="text-muted-custom" style={{ fontSize: '0.7rem' }}>Administrator</small>
          </div>
          <div className="glass-panel rounded-circle p-1">
            <PersonCircle size={28} className="text-muted-custom" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
