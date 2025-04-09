
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import MLActivityFeed from '@/components/MLActivityFeed';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 relative">
          <Dashboard />
          <div className="absolute bottom-6 right-6 w-96">
            <MLActivityFeed />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
