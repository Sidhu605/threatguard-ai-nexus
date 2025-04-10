
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ThreatTable from '@/components/ThreatTable';
import { Threat } from '@/models/threatModel';
import { toast } from 'sonner';

const mockThreats: Threat[] = [
  {
    id: "THREAT-001",
    name: "SQL Injection Attempt",
    description: "Multiple SQL injection attempts detected on the login page.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    severity: "critical",
    category: "Malware", // Updated to match ThreatCategory type
    status: "active",
    source: ["network", "endpoint"], // Updated to array of ThreatSource
    affectedAssets: ["Auth API"],
    riskScore: { likelihood: 3, impact: 3 },
    priority: "P1",
    mitigationSteps: ["Implement prepared statements and input validation."],
    detectionConfidence: 0.95
  },
  {
    id: "THREAT-002",
    name: "Suspicious Login Activity",
    description: "Multiple failed login attempts from unusual locations.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    severity: "high",
    category: "Unauthorized Access", // Updated to match ThreatCategory type
    status: "investigating",
    source: ["network", "endpoint"], // Updated to array of ThreatSource
    affectedAssets: ["User accounts"],
    riskScore: { likelihood: 2, impact: 2 },
    priority: "P3",
    mitigationSteps: ["Implement rate limiting and geographic-based login restrictions."],
    detectionConfidence: 0.82
  },
  {
    id: "THREAT-003",
    name: "Data Exfiltration",
    description: "Unusual outbound data transfer detected from database server.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    severity: "critical",
    category: "Data Exfiltration", // Updated to match ThreatCategory type
    status: "active",
    source: ["network", "ml"], // Updated to array of ThreatSource
    affectedAssets: ["Internal DB Server", "External IP"],
    riskScore: { likelihood: 3, impact: 3 },
    priority: "P1",
    mitigationSteps: ["Block suspicious connections and scan for malware."],
    detectionConfidence: 0.91
  }
];

const Threats = () => {
  const [selectedThreat, setSelectedThreat] = React.useState<Threat | null>(null);
  const [threats, setThreats] = React.useState<Threat[]>(mockThreats);

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
            <h1 className="text-2xl font-bold">Threats Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage active threats in your environment</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-cyber-secondary rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Active Threats</h2>
              <ThreatTable 
                threats={threats} 
                onThreatSelect={handleThreatSelect} 
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Threats;
