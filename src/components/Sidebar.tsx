
import React from 'react';
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
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: AlertTriangle, label: 'Threats', active: false },
    { icon: Shield, label: 'Mitigations', active: false },
    { icon: BarChart3, label: 'Risk Analysis', active: false },
    { icon: Database, label: 'Assets', active: false },
    { icon: Clock, label: 'Audit Log', active: false },
    { icon: Users, label: 'Team', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="w-16 md:w-56 bg-cyber-secondary min-h-screen flex flex-col border-r border-cyber-dark-blue">
      <div className="p-4 border-b border-cyber-dark-blue">
        <Shield className="w-8 h-8 mx-auto md:mx-0 text-cyber-accent" />
      </div>
      
      <nav className="py-6 flex-1">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className={cn(
                  "flex items-center group rounded-md py-2 px-3 text-sm font-medium",
                  item.active 
                    ? "bg-cyber-primary/10 text-cyber-accent" 
                    : "text-muted-foreground hover:bg-cyber-primary/5 hover:text-cyber-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 mr-2 flex-shrink-0",
                  item.active ? "text-cyber-accent" : "text-muted-foreground group-hover:text-cyber-accent"
                )} />
                <span className="hidden md:inline">{item.label}</span>
              </a>
            </li>
          ))}
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
