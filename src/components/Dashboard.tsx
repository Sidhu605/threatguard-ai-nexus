
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Activity, ZapOff, Eye, Clock } from 'lucide-react';
import { mockThreats, Threat } from '@/models/threatModel';
import ThreatTable from './ThreatTable';
import RiskMatrix from './RiskMatrix';
import ThreatDetails from './ThreatDetails';

const Dashboard = () => {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  
  const activeThreats = mockThreats.filter(t => t.status === 'active').length;
  const investigatingThreats = mockThreats.filter(t => t.status === 'investigating').length;
  const mitigatedThreats = mockThreats.filter(t => t.status === 'mitigated').length;
  
  const criticalThreats = mockThreats.filter(t => t.severity === 'critical').length;
  const highThreats = mockThreats.filter(t => t.severity === 'high').length;
  
  const handleThreatSelect = (threat: Threat) => {
    setSelectedThreat(threat);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold flex items-center gap-2">
                {activeThreats}
                <AlertTriangle className="h-5 w-5 text-threat-critical" />
              </div>
              <div className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline mr-1" />
                Real-time
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Investigating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold flex items-center gap-2">
                {investigatingThreats}
                <Eye className="h-5 w-5 text-threat-medium" />
              </div>
              <div className="text-xs text-muted-foreground">
                <Activity className="h-3 w-3 inline mr-1" />
                In progress
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold flex items-center gap-2">
                {criticalThreats}
                <Shield className="h-5 w-5 text-threat-critical" />
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="threat-indicator critical"></span>
                Needs attention
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mitigated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold flex items-center gap-2">
                {mitigatedThreats}
                <ZapOff className="h-5 w-5 text-threat-info" />
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="threat-indicator low"></span>
                Resolved
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="cyber-card h-full">
            <CardHeader>
              <CardTitle className="text-lg">Risk Assessment Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskMatrix onThreatSelect={handleThreatSelect} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 order-1 lg:order-2">
          {selectedThreat ? (
            <ThreatDetails 
              threat={selectedThreat} 
              onClose={() => setSelectedThreat(null)}
            />
          ) : (
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Threat Detections</CardTitle>
              </CardHeader>
              <CardContent>
                <ThreatTable threats={mockThreats} onThreatSelect={handleThreatSelect} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
