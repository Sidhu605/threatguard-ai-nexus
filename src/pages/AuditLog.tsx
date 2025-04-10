
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const AuditLog = () => {
  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Audit Log</h1>
            <p className="text-muted-foreground">Review system and user activities</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-cyber-secondary rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">System Logs</h2>
              <p>This page will contain the audit logs and activity history.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuditLog;
