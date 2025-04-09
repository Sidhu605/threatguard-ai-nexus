
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Activity, ZapOff, Eye, Clock } from 'lucide-react';
import { mockThreats, Threat, updateThreatStatus, filterThreats } from '@/models/threatModel';
import ThreatTable from './ThreatTable';
import RiskMatrix from './RiskMatrix';
import ThreatDetails from './ThreatDetails';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [threats, setThreats] = useState<Threat[]>(mockThreats);
  const [filter, setFilter] = useState<string>('all');
  const { toast } = useToast();
  
  // Calculate threat metrics for dashboard cards
  const activeThreats = threats.filter(t => t.status === 'active').length;
  const investigatingThreats = threats.filter(t => t.status === 'investigating').length;
  const mitigatedThreats = threats.filter(t => t.status === 'mitigated').length;
  const criticalThreats = threats.filter(t => t.severity === 'critical').length;
  
  const handleThreatSelect = (threat: Threat) => {
    setSelectedThreat(threat);
  };
  
  const handleStatusChange = (threatId: string, newStatus: 'active' | 'investigating' | 'mitigated') => {
    const updatedThreats = threats.map(threat => 
      threat.id === threatId ? { ...threat, status: newStatus } : threat
    );
    setThreats(updatedThreats);
    
    // If the currently selected threat was updated, also update it
    if (selectedThreat && selectedThreat.id === threatId) {
      setSelectedThreat({ ...selectedThreat, status: newStatus });
    }
    
    const updatedThreat = updatedThreats.find(t => t.id === threatId);
    if (updatedThreat) {
      toast({
        title: `Threat ${newStatus}`,
        description: `${updatedThreat.name} has been marked as ${newStatus}`,
        variant: newStatus === 'mitigated' ? 'default' : 'destructive',
      });
    }
  };
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  
  const filteredThreats = filterThreats(threats, filter);
  
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className={`cyber-card ${filter === 'active' ? 'border-cyber-accent' : ''}`}
          onClick={() => handleFilterChange('active')}
          role="button"
        >
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
        
        <Card 
          className={`cyber-card ${filter === 'investigating' ? 'border-cyber-accent' : ''}`}
          onClick={() => handleFilterChange('investigating')}
          role="button"
        >
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
        
        <Card 
          className={`cyber-card ${filter === 'critical' ? 'border-cyber-accent' : ''}`}
          onClick={() => handleFilterChange('critical')}
          role="button"
        >
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
        
        <Card 
          className={`cyber-card ${filter === 'mitigated' ? 'border-cyber-accent' : ''}`}
          onClick={() => handleFilterChange('mitigated')}
          role="button"
        >
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
              <RiskMatrix threats={threats} onThreatSelect={handleThreatSelect} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 order-1 lg:order-2">
          {selectedThreat ? (
            <ThreatDetails 
              threat={selectedThreat} 
              onClose={() => setSelectedThreat(null)}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <Card className="cyber-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Threat Detections</CardTitle>
                {filter !== 'all' && (
                  <button 
                    onClick={() => handleFilterChange('all')} 
                    className="text-xs text-cyber-accent hover:underline"
                  >
                    Clear filter
                  </button>
                )}
              </CardHeader>
              <CardContent>
                <ThreatTable 
                  threats={filteredThreats} 
                  onThreatSelect={handleThreatSelect} 
                  onStatusChange={handleStatusChange}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
