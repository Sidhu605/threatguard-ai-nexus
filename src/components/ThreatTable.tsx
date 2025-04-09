
import React from 'react';
import { Threat } from '@/models/threatModel';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ThreatTableProps {
  threats: Threat[];
  onThreatSelect: (threat: Threat) => void;
}

const ThreatTable: React.FC<ThreatTableProps> = ({ threats, onThreatSelect }) => {
  // Sort threats by timestamp (most recent first)
  const sortedThreats = [...threats].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-threat-critical/20 text-threat-critical';
      case 'investigating': return 'bg-threat-medium/20 text-threat-medium';
      case 'mitigated': return 'bg-threat-low/20 text-threat-low';
      default: return '';
    }
  };
  
  const getTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="overflow-auto max-h-[600px]">
      <table className="data-grid w-full">
        <thead>
          <tr>
            <th>Threat</th>
            <th className="hidden md:table-cell">Category</th>
            <th>Severity</th>
            <th className="hidden md:table-cell">Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedThreats.map((threat) => (
            <tr key={threat.id}>
              <td>
                <div className="font-medium">{threat.name}</div>
                <div className="text-xs text-muted-foreground">{threat.id}</div>
              </td>
              <td className="hidden md:table-cell">{threat.category}</td>
              <td>
                <div className="flex items-center">
                  <span className={`threat-indicator ${threat.severity}`}></span>
                  <span className="capitalize">{threat.severity}</span>
                </div>
              </td>
              <td className="hidden md:table-cell text-xs text-muted-foreground">
                {getTimeAgo(threat.timestamp)}
              </td>
              <td>
                <span className={`text-xs py-1 px-2 rounded-full ${getStatusClass(threat.status)}`}>
                  {threat.status}
                </span>
              </td>
              <td>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onThreatSelect(threat)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThreatTable;
