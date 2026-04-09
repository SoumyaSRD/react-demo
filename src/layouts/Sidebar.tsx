import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Person, 
  House, 
  ChevronLeft, 
  ChevronRight,
  BoxArrowRight 
} from 'react-bootstrap-icons';
import { authService } from '@/features/auth/services/auth.service';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout(null);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/home', icon: <House size={20} /> },
    { name: 'Users', path: '/home', icon: <Person size={20} /> },
  ];

  return (
    <aside 
      className={`sidebar-transition h-100 glass-panel d-flex flex-column p-3`}
      style={{ 
        width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        borderRight: '1px solid var(--glass-border)',
        borderRadius: '0'
      }}
    >
      <div className={`d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'justify-content-between'} mb-5 mt-2`}>
        {!isCollapsed && <h4 className="m-0 fw-bold-custom text-main px-2">DemoApp</h4>}
        <button 
          className="btn glass-panel border-0 p-2 rounded-3 shadow-none hover-effect" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} className="text-main" /> : <ChevronLeft size={18} className="text-main" />}
        </button>
      </div>

      <nav className="nav flex-column flex-grow-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className={`${isCollapsed ? 'mx-auto' : 'me-3'} ${isActive ? '' : 'icon-primary'}`}>
                {item.icon}
              </span>
              {!isCollapsed && <span className="fw-semibold">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button 
          className="sidebar-link w-100 border-0 bg-transparent text-start shadow-none"
          onClick={handleLogout}
        >
          <BoxArrowRight size={20} className={`icon-danger ${isCollapsed ? 'mx-auto' : 'me-3'}`} />
          {!isCollapsed && <span className="fw-semibold">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
