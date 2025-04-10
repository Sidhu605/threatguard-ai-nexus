
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure system settings and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-cyber-secondary rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">System Settings</h2>
              <p>This page will contain the application settings and configuration options.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
