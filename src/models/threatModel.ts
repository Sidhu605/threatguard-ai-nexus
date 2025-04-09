
export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type ThreatCategory = 'Ransomware' | 'Phishing' | 'Data Exfiltration' | 'Zero-Day Exploit' | 'Malware' | 'Unauthorized Access' | 'DDoS' | 'Misconfiguration';
export type ThreatStatus = 'active' | 'mitigated' | 'investigating';
export type ThreatSource = 'ml' | 'ai' | 'network' | 'endpoint' | 'user';
export type RiskScore = {
  likelihood: 1 | 2 | 3;
  impact: 1 | 2 | 3;
};

export interface Threat {
  id: string;
  name: string;
  category: ThreatCategory;
  description: string;
  severity: ThreatSeverity;
  timestamp: string;
  status: ThreatStatus;
  source: ThreatSource[];
  affectedAssets: string[];
  riskScore: RiskScore;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  mitigationSteps: string[];
  detectionConfidence: number;
}

export const calculatePriority = (likelihood: number, impact: number): 'P1' | 'P2' | 'P3' | 'P4' => {
  if (likelihood === 3 && impact === 3) return 'P1';
  if (likelihood === 3 && impact === 2) return 'P2';
  if (likelihood === 2 && impact === 3) return 'P2';
  if (likelihood === 3 && impact === 1) return 'P3';
  if (likelihood === 2 && impact === 2) return 'P3';
  if (likelihood === 1 && impact === 3) return 'P3';
  return 'P4';
};

// New functions for threat management
export const updateThreatStatus = (threats: Threat[], threatId: string, newStatus: ThreatStatus): Threat[] => {
  return threats.map(threat => 
    threat.id === threatId 
      ? { ...threat, status: newStatus } 
      : threat
  );
};

export const filterThreats = (threats: Threat[], filter: string): Threat[] => {
  switch (filter) {
    case 'active':
      return threats.filter(threat => threat.status === 'active');
    case 'investigating':
      return threats.filter(threat => threat.status === 'investigating');
    case 'mitigated':
      return threats.filter(threat => threat.status === 'mitigated');
    case 'critical':
      return threats.filter(threat => threat.severity === 'critical');
    case 'high':
      return threats.filter(threat => threat.severity === 'high');
    case 'p1':
      return threats.filter(threat => threat.priority === 'P1');
    default:
      return threats;
  }
};

// Function to get threats by category
export const getThreatsByCategory = (threats: Threat[]): Record<ThreatCategory, number> => {
  const categoryCounts: Partial<Record<ThreatCategory, number>> = {};
  
  threats.forEach(threat => {
    if (categoryCounts[threat.category]) {
      categoryCounts[threat.category]!++;
    } else {
      categoryCounts[threat.category] = 1;
    }
  });
  
  return categoryCounts as Record<ThreatCategory, number>;
};

// Original mock threats array
export const mockThreats: Threat[] = [
  {
    id: 'T-1001',
    name: 'Advanced Ransomware Attempt',
    category: 'Ransomware',
    description: 'ML model detected suspicious encryption activity across multiple systems with behavioral patterns matching known ransomware families.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    status: 'active',
    source: ['ml', 'endpoint'],
    affectedAssets: ['file-server-01', 'workstation-15', 'workstation-23'],
    riskScore: { likelihood: 3, impact: 3 },
    priority: 'P1',
    mitigationSteps: [
      'Isolate affected systems immediately',
      'Disable network access for compromised endpoints',
      'Scan with EDR solution using latest signatures',
      'Check backup integrity for affected data',
      'Apply IOC blocking rules to prevent spread'
    ],
    detectionConfidence: 0.94,
  },
  {
    id: 'T-1002',
    name: 'Targeted Phishing Campaign',
    category: 'Phishing',
    description: 'NLP analysis identified highly convincing spear phishing emails targeting finance department with sophisticated impersonation of CEO.',
    severity: 'high',
    timestamp: new Date(Date.now() - 47 * 60000).toISOString(),
    status: 'investigating',
    source: ['ml', 'ai'],
    affectedAssets: ['mail-gateway', 'finance-dept-users'],
    riskScore: { likelihood: 3, impact: 2 },
    priority: 'P2',
    mitigationSteps: [
      'Block sender domains in email gateway',
      'Reset passwords for potentially affected accounts',
      'Alert finance department staff of the campaign',
      'Search mail logs for similar messages',
      'Enable additional authentication for sensitive systems'
    ],
    detectionConfidence: 0.87,
  },
  {
    id: 'T-1003',
    name: 'Potential Data Exfiltration',
    category: 'Data Exfiltration',
    description: 'Anomaly detection identified unusual data transfer patterns to external domains during non-business hours.',
    severity: 'high',
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
    status: 'investigating',
    source: ['network', 'ml'],
    affectedAssets: ['marketing-server', 'customer-database'],
    riskScore: { likelihood: 2, impact: 3 },
    priority: 'P2',
    mitigationSteps: [
      'Block identified destination IPs/domains',
      'Perform forensic analysis on affected systems',
      'Review access logs for unauthorized activity',
      'Enable data loss prevention rules',
      'Audit database access permissions'
    ],
    detectionConfidence: 0.81,
  },
  {
    id: 'T-1004',
    name: 'Zero-Day Vulnerability Exploit',
    category: 'Zero-Day Exploit',
    description: 'Machine learning algorithm detected attempt to exploit previously unknown vulnerability in custom web application.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
    status: 'active',
    source: ['ml', 'network', 'endpoint'],
    affectedAssets: ['web-app-server-03', 'api-gateway'],
    riskScore: { likelihood: 2, impact: 3 },
    priority: 'P2',
    mitigationSteps: [
      'Apply virtual patching at WAF level',
      'Enable additional logging for affected application',
      'Restrict access to potentially vulnerable endpoints',
      'Initiate emergency code review',
      'Deploy sandbox monitoring for anomalous behavior'
    ],
    detectionConfidence: 0.89,
  },
  {
    id: 'T-1005',
    name: 'Suspicious Admin Account Activity',
    category: 'Unauthorized Access',
    description: 'Behavioral analysis identified unusual access pattern for privileged account outside normal working hours and location.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 12 * 3600000).toISOString(),
    status: 'investigating',
    source: ['ai', 'endpoint'],
    affectedAssets: ['admin-account-073', 'domain-controller'],
    riskScore: { likelihood: 2, impact: 2 },
    priority: 'P3',
    mitigationSteps: [
      'Lock affected account temporarily',
      'Verify activity with account owner',
      'Review authentication logs for pattern anomalies',
      'Enable MFA for privileged accounts',
      'Update login time restrictions'
    ],
    detectionConfidence: 0.76,
  },
  {
    id: 'T-1006',
    name: 'Critical Service Misconfiguration',
    category: 'Misconfiguration',
    description: 'Configuration assessment detected publicly exposed internal API with sensitive data access.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
    status: 'mitigated',
    source: ['network'],
    affectedAssets: ['api-gateway', 'cloud-services'],
    riskScore: { likelihood: 1, impact: 3 },
    priority: 'P3',
    mitigationSteps: [
      'Implement proper access controls',
      'Enable API authentication requirements',
      'Update firewall rules to restrict access',
      'Audit API endpoints for similar issues',
      'Review security hardening procedures'
    ],
    detectionConfidence: 0.92,
  },
  {
    id: 'T-1007',
    name: 'New Malware Variant Detected',
    category: 'Malware',
    description: 'ML-based pattern recognition identified unknown malware variant evading traditional signature detection on endpoint.',
    severity: 'high',
    timestamp: new Date(Date.now() - 18 * 3600000).toISOString(),
    status: 'mitigated',
    source: ['ml', 'endpoint'],
    affectedAssets: ['workstation-42'],
    riskScore: { likelihood: 2, impact: 2 },
    priority: 'P3',
    mitigationSteps: [
      'Isolate affected endpoint',
      'Extract malware sample for analysis',
      'Update detection rules based on behavior',
      'Scan all systems with updated signatures',
      'Block communication to C2 domains'
    ],
    detectionConfidence: 0.85,
  },
  {
    id: 'T-1008',
    name: 'DDoS Attack Preparation',
    category: 'DDoS',
    description: 'Early warning system detected botnet coordination signals indicating impending DDoS attack against public services.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    status: 'active',
    source: ['network', 'ai'],
    affectedAssets: ['public-website', 'dns-services'],
    riskScore: { likelihood: 3, impact: 1 },
    priority: 'P3',
    mitigationSteps: [
      'Activate DDoS protection service',
      'Increase capacity for affected services',
      'Prepare traffic filtering rules',
      'Alert response team of pending attack',
      'Configure rate limiting at edge'
    ],
    detectionConfidence: 0.79,
  },
];

// Remove the old getThreatsInRiskMatrix function as it's now handled directly in the RiskMatrix component
