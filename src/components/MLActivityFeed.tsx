
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  'Running anomaly detection on network traffic packets',
  'Scanning email attachments for potential malware',
  'Analyzing user behavior patterns for abnormalities',
  'Processing system logs for suspicious activities',
  'Updating threat detection models with new data',
  'Scanning DNS queries for potential C2 communication',
  'Analyzing API calls for injection attempts',
  'Checking file hashes against known malware databases',
  'Monitoring privileged account activities',
  'Analyzing authentication patterns across systems',
  'Investigating unusual data transfer patterns',
  'Checking for unusual process executions',
  'Analyzing registry modifications',
  'Monitoring active directory changes',
  'Scanning for suspicious PowerShell commands'
];

const MLActivityFeed: React.FC = () => {
  const [feed, setFeed] = useState<string[]>([]);
  
  useEffect(() => {
    // Initial feed
    const initialFeed = [
      activities[Math.floor(Math.random() * activities.length)],
      activities[Math.floor(Math.random() * activities.length)],
      activities[Math.floor(Math.random() * activities.length)]
    ];
    setFeed(initialFeed);
    
    // Add new activity every few seconds
    const interval = setInterval(() => {
      const newActivity = activities[Math.floor(Math.random() * activities.length)];
      setFeed(prevFeed => {
        const newFeed = [newActivity, ...prevFeed];
        return newFeed.slice(0, 5); // Keep only the 5 most recent activities
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="cyber-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">ML Engine Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[150px] overflow-y-auto">
          {feed.map((activity, index) => (
            <div 
              key={index} 
              className={`text-xs p-2 rounded bg-cyber-secondary/30 font-mono terminal-text ${index === 0 ? 'animate-fade-in' : ''}`}
            >
              <span className="text-cyber-accent">&gt;</span> {activity}...
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MLActivityFeed;
