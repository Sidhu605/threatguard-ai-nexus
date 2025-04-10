
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RiskMatrix from '@/components/RiskMatrix';
import { Threat, mockThreats } from '@/models/threatModel';
import ThreatDetails from '@/components/ThreatDetails';
import { toast } from 'sonner';

const RiskAnalysis = () => {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [threats, setThreats] = useState<Threat[]>(mockThreats);

  const handleThreatSelect = (threat: Threat) => {
    setSelectedThreat(threat);
  };
  
  const handleStatusChange = (threatId: string, newStatus: 'active' | 'investigating' | 'mitigated') => {
    setThreats(threats.map(threat => 
      threat.id === threatId ? { ...threat, status: newStatus } : threat
    ));
    toast.success(`Threat ${threatId} status updated to ${newStatus}`);
  };

  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Risk Analysis</h1>
            <p className="text-muted-foreground">Analyze threats based on likelihood and impact</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-cyber-secondary rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Risk Matrix</h2>
                <RiskMatrix 
                  threats={threats} 
                  onThreatSelect={handleThreatSelect} 
                />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {selectedThreat ? (
                <ThreatDetails 
                  threat={selectedThreat} 
                  onClose={() => setSelectedThreat(null)}
                  onStatusChange={handleStatusChange}
                />
              ) : (
                <div className="bg-cyber-secondary rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Select a Threat</h2>
                  <p className="text-muted-foreground">Click on any point in the risk matrix to view detailed threat information.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RiskAnalysis;
