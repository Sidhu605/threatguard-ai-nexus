
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
    category: "Web Application",
    status: "active",
    source: "192.168.1.105",
    target: "Auth API",
    mitigation: "Implement prepared statements and input validation.",
    details: "The attacker is attempting to exploit a vulnerability in the login form by injecting SQL commands."
  },
  {
    id: "THREAT-002",
    name: "Suspicious Login Activity",
    description: "Multiple failed login attempts from unusual locations.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    severity: "high",
    category: "Authentication",
    status: "investigating",
    source: "Multiple IPs",
    target: "User accounts",
    mitigation: "Implement rate limiting and geographic-based login restrictions.",
    details: "Several user accounts are experiencing brute force login attempts from IPs associated with known botnets."
  },
  {
    id: "THREAT-003",
    name: "Data Exfiltration",
    description: "Unusual outbound data transfer detected from database server.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    severity: "critical",
    category: "Database",
    status: "active",
    source: "Internal DB Server",
    target: "External IP",
    mitigation: "Block suspicious connections and scan for malware.",
    details: "Large amount of data being transferred to an unknown external IP during non-business hours."
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
