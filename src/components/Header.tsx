
import React from 'react';
import { Shield, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-cyber-secondary shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Shield className="h-8 w-8 text-cyber-accent" />
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            ThreatGuard
            <span className="text-cyber-accent">AI Nexus</span>
          </h1>
          <p className="text-xs text-muted-foreground">ML + Risk Matrix Analysis</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-threat-critical text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
