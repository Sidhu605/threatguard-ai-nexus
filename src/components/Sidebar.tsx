
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  AlertTriangle, 
  Database, 
  Settings, 
  BarChart3, 
  Clock, 
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: AlertTriangle, label: 'Threats', path: '/threats' },
    { icon: Shield, label: 'Mitigations', path: '/mitigations' },
    { icon: BarChart3, label: 'Risk Analysis', path: '/risk-analysis' },
    { icon: Database, label: 'Assets', path: '/assets' },
    { icon: Clock, label: 'Audit Log', path: '/audit-log' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-16 md:w-56 bg-cyber-secondary min-h-screen flex flex-col border-r border-cyber-dark-blue">
      <div className="p-4 border-b border-cyber-dark-blue">
        <Link to="/">
          <Shield className="w-8 h-8 mx-auto md:mx-0 text-cyber-accent" />
        </Link>
      </div>
      
      <nav className="py-6 flex-1">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => {
            const isActive = currentPath === item.path;
            return (
              <li key={index}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center group rounded-md py-2 px-3 text-sm font-medium",
                    isActive 
                      ? "bg-cyber-primary/10 text-cyber-accent" 
                      : "text-muted-foreground hover:bg-cyber-primary/5 hover:text-cyber-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 mr-2 flex-shrink-0",
                    isActive ? "text-cyber-accent" : "text-muted-foreground group-hover:text-cyber-accent"
                  )} />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="rounded-md bg-cyber-dark-blue/40 p-2 text-xs text-center text-muted-foreground">
          <div className="hidden md:block">ThreatGuard AI</div>
          <div className="flex items-center justify-center gap-1">
            <span className="h-2 w-2 rounded-full bg-cyber-success animate-pulse"></span>
            <span className="hidden md:inline">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
