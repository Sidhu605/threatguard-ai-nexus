
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Threat } from '@/models/threatModel';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { 
  AlertTriangle, 
  X, 
  Shield, 
  ArrowRight, 
  Server, 
  Database, 
  Clock, 
  Activity, 
  Eye, 
  CheckSquare 
} from 'lucide-react';

interface ThreatDetailsProps {
  threat: Threat;
  onClose: () => void;
  onStatusChange: (threatId: string, newStatus: 'active' | 'investigating' | 'mitigated') => void;
}

const ThreatDetails: React.FC<ThreatDetailsProps> = ({ threat, onClose, onStatusChange }) => {
  const getTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  
  const getSourceTags = (sources: string[]) => {
    return sources.map(source => {
      let className = '';
      switch(source) {
        case 'ml': className = 'cyber-tag ml'; break;
        case 'ai': className = 'cyber-tag ai'; break;
        case 'network': className = 'cyber-tag network'; break;
        case 'endpoint': className = 'cyber-tag endpoint'; break;
        default: className = 'cyber-tag threat';
      }
      return (
        <span key={source} className={className}>
          {source.toUpperCase()}
        </span>
      );
    });
  };
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'text-threat-critical';
      case 'high': return 'text-threat-high';
      case 'medium': return 'text-threat-medium';
      case 'low': return 'text-threat-low';
      default: return 'text-threat-info';
    }
  };
  
  return (
    <Card className="cyber-card">
      <CardHeader className="relative pb-2 border-b border-cyber-secondary">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 mb-1">
          <span className={`threat-indicator ${threat.severity}`}></span>
          <CardTitle className={`text-lg ${getSeverityColor(threat.severity)}`}>
            {threat.name}
          </CardTitle>
        </div>
        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <span className="font-mono mr-2">{threat.id}</span>
          {getSourceTags(threat.source)}
        </div>
      </CardHeader>
      
      <CardContent className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col p-3 bg-cyber-secondary/50 rounded-md">
            <span className="text-xs text-muted-foreground mb-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Detected
            </span>
            <span className="text-sm">{getTimeAgo(threat.timestamp)}</span>
          </div>
          
          <div className="flex flex-col p-3 bg-cyber-secondary/50 rounded-md">
            <span className="text-xs text-muted-foreground mb-1 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" /> Priority
            </span>
            <span className="text-sm font-semibold">{threat.priority}</span>
          </div>
          
          <div className="flex flex-col p-3 bg-cyber-secondary/50 rounded-md">
            <span className="text-xs text-muted-foreground mb-1 flex items-center">
              <Activity className="h-3 w-3 mr-1" /> Confidence
            </span>
            <div className="cyber-progress-bar">
              <div 
                className={`cyber-progress-bar-fill ${threat.severity}`} 
                style={{ width: `${threat.detectionConfidence * 100}%` }}
              ></div>
            </div>
            <span className="text-sm">{Math.round(threat.detectionConfidence * 100)}%</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">{threat.description}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Affected Assets</h3>
          <div className="flex flex-wrap gap-2">
            {threat.affectedAssets.map(asset => (
              <div key={asset} className="flex items-center text-xs bg-cyber-secondary/30 px-2 py-1 rounded-md">
                {asset.includes('server') ? (
                  <Server className="h-3 w-3 mr-1 text-cyber-accent" />
                ) : (
                  <Database className="h-3 w-3 mr-1 text-cyber-accent" />
                )}
                {asset}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Risk Assessment</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-cyber-secondary/30 p-2 rounded-md">
              <span className="text-xs text-muted-foreground block mb-1">Likelihood</span>
              <div className="flex items-center">
                <div className="cyber-progress-bar flex-1 mr-2">
                  <div 
                    className="cyber-progress-bar-fill medium" 
                    style={{ width: `${(threat.riskScore.likelihood / 3) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs">{threat.riskScore.likelihood}/3</span>
              </div>
            </div>
            
            <div className="bg-cyber-secondary/30 p-2 rounded-md">
              <span className="text-xs text-muted-foreground block mb-1">Impact</span>
              <div className="flex items-center">
                <div className="cyber-progress-bar flex-1 mr-2">
                  <div 
                    className="cyber-progress-bar-fill critical" 
                    style={{ width: `${(threat.riskScore.impact / 3) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs">{threat.riskScore.impact}/3</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Mitigation Steps</h3>
          <div className="bg-cyber-secondary/30 p-3 rounded-md">
            <ul className="space-y-2">
              {threat.mitigationSteps.map((step, index) => (
                <li key={index} className="flex items-start text-sm">
                  <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-cyber-accent" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-cyber-secondary pt-4 flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        
        <div className="flex space-x-2">
          {threat.status !== 'active' && (
            <Button 
              variant="destructive" 
              onClick={() => onStatusChange(threat.id, 'active')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Mark Active
            </Button>
          )}
          
          {threat.status !== 'investigating' && (
            <Button 
              variant="default" 
              className="bg-cyber-secondary hover:bg-cyber-secondary/80" 
              onClick={() => onStatusChange(threat.id, 'investigating')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Investigate
            </Button>
          )}
          
          {threat.status !== 'mitigated' && (
            <Button 
              className="bg-cyber-accent hover:bg-cyber-accent/80"
              onClick={() => onStatusChange(threat.id, 'mitigated')}
            >
              <CheckSquare className="h-4 w-4 mr-2" />
              Mitigate
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreatDetails;
