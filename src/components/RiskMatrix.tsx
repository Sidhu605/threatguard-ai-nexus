
import React from 'react';
import { Threat } from '@/models/threatModel';

interface RiskMatrixProps {
  threats: Threat[];
  onThreatSelect: (threat: Threat) => void;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ threats, onThreatSelect }) => {
  // Create a matrix structure to organize threats by likelihood and impact
  const threatMatrix: { [key: string]: Threat[] } = {
    '3-1': [], '3-2': [], '3-3': [],
    '2-1': [], '2-2': [], '2-3': [],
    '1-1': [], '1-2': [], '1-3': []
  };
  
  // Populate the matrix with threats
  threats.forEach(threat => {
    const { likelihood, impact } = threat.riskScore;
    threatMatrix[`${likelihood}-${impact}`].push(threat);
  });
  
  const getCellClass = (likelihood: number, impact: number) => {
    if (likelihood === 3 && impact === 3) return 'critical-risk';
    if ((likelihood === 3 && impact === 2) || (likelihood === 2 && impact === 3)) return 'high-risk';
    if ((likelihood === 3 && impact === 1) || (likelihood === 2 && impact === 2) || (likelihood === 1 && impact === 3)) return 'medium-risk';
    return 'low-risk';
  };

  const getCellColor = (likelihood: number, impact: number) => {
    if (likelihood === 3 && impact === 3) return 'text-threat-critical';
    if ((likelihood === 3 && impact === 2) || (likelihood === 2 && impact === 3)) return 'text-threat-high';
    if ((likelihood === 3 && impact === 1) || (likelihood === 2 && impact === 2) || (likelihood === 1 && impact === 3)) return 'text-threat-medium';
    return 'text-threat-low';
  };

  return (
    <div className="risk-matrix-grid h-[400px]">
      {/* Empty top-left cell */}
      <div className="header-cell"></div>
      
      {/* Impact headers (top row) */}
      <div className="header-cell">Low Impact</div>
      <div className="header-cell">Medium Impact</div>
      <div className="header-cell">High Impact</div>
      
      {/* Likelihood headers (left column) */}
      <div className="header-cell">High<br/>Likelihood</div>
      <div className={`risk-matrix-cell ${getCellClass(3, 1)}`}>
        {threatMatrix['3-1'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(3, 1)}`}
            onClick={() => onThreatSelect(threatMatrix['3-1'][0])}
            title={threatMatrix['3-1'].map(t => t.name).join(', ')}
          >
            {threatMatrix['3-1'].length}
          </div>
        )}
      </div>
      <div className={`risk-matrix-cell ${getCellClass(3, 2)}`}>
        {threatMatrix['3-2'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(3, 2)}`}
            onClick={() => onThreatSelect(threatMatrix['3-2'][0])}
            title={threatMatrix['3-2'].map(t => t.name).join(', ')}
          >
            {threatMatrix['3-2'].length}
          </div>
        )}
      </div>
      <div className={`risk-matrix-cell ${getCellClass(3, 3)}`}>
        {threatMatrix['3-3'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(3, 3)}`}
            onClick={() => onThreatSelect(threatMatrix['3-3'][0])}
            title={threatMatrix['3-3'].map(t => t.name).join(', ')}
          >
            {threatMatrix['3-3'].length}
          </div>
        )}
      </div>
      
      <div className="header-cell">Medium<br/>Likelihood</div>
      <div className={`risk-matrix-cell ${getCellClass(2, 1)}`}>
        {threatMatrix['2-1'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(2, 1)}`}
            onClick={() => onThreatSelect(threatMatrix['2-1'][0])}
            title={threatMatrix['2-1'].map(t => t.name).join(', ')}
          >
            {threatMatrix['2-1'].length}
          </div>
        )}
      </div>
      <div className={`risk-matrix-cell ${getCellClass(2, 2)}`}>
        {threatMatrix['2-2'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(2, 2)}`}
            onClick={() => onThreatSelect(threatMatrix['2-2'][0])}
            title={threatMatrix['2-2'].map(t => t.name).join(', ')}
          >
            {threatMatrix['2-2'].length}
          </div>
        )}
      </div>
      <div className={`risk-matrix-cell ${getCellClass(2, 3)}`}>
        {threatMatrix['2-3'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(2, 3)}`}
            onClick={() => onThreatSelect(threatMatrix['2-3'][0])}
            title={threatMatrix['2-3'].map(t => t.name).join(', ')}
          >
            {threatMatrix['2-3'].length}
          </div>
        )}
      </div>
      
      <div className="header-cell">Low<br/>Likelihood</div>
      <div className={`risk-matrix-cell ${getCellClass(1, 1)}`}>
        {threatMatrix['1-1'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(1, 1)}`}
            onClick={() => onThreatSelect(threatMatrix['1-1'][0])}
            title={threatMatrix['1-1'].map(t => t.name).join(', ')}
          >
            {threatMatrix['1-1'].length}
          </div>
        )}
      </div>
      <div className={`risk-matrix-cell ${getCellClass(1, 2)}`}>
        {threatMatrix['1-2'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(1, 2)}`}
            onClick={() => onThreatSelect(threatMatrix['1-2'][0])}
            title={threatMatrix['1-2'].map(t => t.name).join(', ')}
          >
            {threatMatrix['1-2'].length}
          </div>
        )}
      </div>
      <div className={`risk-matrix-cell ${getCellClass(1, 3)}`}>
        {threatMatrix['1-3'].length > 0 && (
          <div 
            className={`h-8 w-8 flex items-center justify-center bg-black/30 rounded-full cursor-pointer hover:bg-black/50 ${getCellColor(1, 3)}`}
            onClick={() => onThreatSelect(threatMatrix['1-3'][0])}
            title={threatMatrix['1-3'].map(t => t.name).join(', ')}
          >
            {threatMatrix['1-3'].length}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskMatrix;
