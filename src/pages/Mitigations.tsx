
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

type MitigationStrategy = {
  id: string;
  threatId: string;
  threatName: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  steps: {
    id: string;
    description: string;
    completed: boolean;
  }[];
};

const mockMitigations: MitigationStrategy[] = [
  {
    id: 'MIT-001',
    threatId: 'THREAT-001',
    threatName: 'SQL Injection Attempt',
    description: 'Implement input validation and prepared statements across all database interactions',
    status: 'in-progress',
    progress: 65,
    priority: 'high',
    assignee: 'Alex Johnson',
    dueDate: '2025-04-15',
    steps: [
      { id: 'STEP-001', description: 'Audit all SQL queries in authentication module', completed: true },
      { id: 'STEP-002', description: 'Implement parameterized queries in user service', completed: true },
      { id: 'STEP-003', description: 'Update data access layer with prepared statements', completed: false },
      { id: 'STEP-004', description: 'Deploy web application firewall rules', completed: false },
    ]
  },
  {
    id: 'MIT-002',
    threatId: 'THREAT-002',
    threatName: 'Suspicious Login Activity',
    description: 'Implement rate limiting and location-based authentication controls',
    status: 'pending',
    progress: 0,
    priority: 'medium',
    assignee: 'Sarah Wilson',
    dueDate: '2025-04-20',
    steps: [
      { id: 'STEP-005', description: 'Configure rate limiting for authentication endpoints', completed: false },
      { id: 'STEP-006', description: 'Implement geo-location verification service', completed: false },
      { id: 'STEP-007', description: 'Add multi-factor authentication option', completed: false },
    ]
  },
  {
    id: 'MIT-003',
    threatId: 'THREAT-003',
    threatName: 'Data Exfiltration',
    description: 'Implement network monitoring and data loss prevention tools',
    status: 'completed',
    progress: 100,
    priority: 'high',
    assignee: 'Marcus Lee',
    dueDate: '2025-04-08',
    steps: [
      { id: 'STEP-008', description: 'Deploy network traffic monitoring solution', completed: true },
      { id: 'STEP-009', description: 'Configure data loss prevention policies', completed: true },
      { id: 'STEP-010', description: 'Implement database activity monitoring', completed: true },
      { id: 'STEP-011', description: 'Create alert procedures for suspicious activities', completed: true },
    ]
  }
];

const Mitigations = () => {
  const [mitigations, setMitigations] = useState<MitigationStrategy[]>(mockMitigations);
  
  const getStatusIcon = (status: MitigationStrategy['status']) => {
    switch(status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getStatusColor = (status: MitigationStrategy['status']) => {
    switch(status) {
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500';
      case 'pending': return 'bg-gray-500/10 text-muted-foreground border-gray-500';
    }
  };
  
  const getPriorityColor = (priority: MitigationStrategy['priority']) => {
    switch(priority) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500';
      case 'medium': return 'bg-orange-500/10 text-orange-500 border-orange-500';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500';
    }
  };
  
  const toggleStepCompletion = (mitigationId: string, stepId: string) => {
    setMitigations(mitigations.map(mitigation => {
      if (mitigation.id === mitigationId) {
        const updatedSteps = mitigation.steps.map(step => {
          if (step.id === stepId) {
            return { ...step, completed: !step.completed };
          }
          return step;
        });
        
        const completedStepsCount = updatedSteps.filter(s => s.completed).length;
        const progress = Math.round((completedStepsCount / updatedSteps.length) * 100);
        
        let status: MitigationStrategy['status'] = 'pending';
        if (progress === 100) {
          status = 'completed';
        } else if (progress > 0) {
          status = 'in-progress';
        }
        
        return { 
          ...mitigation, 
          steps: updatedSteps, 
          progress,
          status
        };
      }
      return mitigation;
    }));
    
    toast.success('Mitigation step updated');
  };

  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Mitigations</h1>
            <p className="text-muted-foreground">Review and implement mitigation strategies for detected threats</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {mitigations.map(mitigation => (
              <Card key={mitigation.id} className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {getStatusIcon(mitigation.status)}
                        {mitigation.description}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        For threat: <span className="text-cyber-accent">{mitigation.threatName}</span> ({mitigation.threatId})
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getPriorityColor(mitigation.priority)}>
                        {mitigation.priority} priority
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(mitigation.status)}>
                        {mitigation.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Assigned to: <span className="text-cyber-foreground">{mitigation.assignee}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Due: <span className="text-cyber-foreground">{new Date(mitigation.dueDate).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{mitigation.progress}%</span>
                    </div>
                    <Progress value={mitigation.progress} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-3">Implementation Steps</h3>
                  <ul className="space-y-3">
                    {mitigation.steps.map(step => (
                      <li 
                        key={step.id} 
                        className={`flex items-start p-3 rounded-md ${step.completed ? 'bg-cyber-primary/10' : 'bg-cyber-background/50'}`}
                      >
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-6 w-6 p-0 mr-3 rounded-full ${step.completed ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-cyber-background text-muted-foreground hover:bg-cyber-primary/20'}`}
                          onClick={() => toggleStepCompletion(mitigation.id, step.id)}
                        >
                          {step.completed ? '✓' : ' '}
                        </Button>
                        <span className={step.completed ? 'line-through text-muted-foreground' : ''}>
                          {step.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Assign
                  </Button>
                  <Button>
                    {mitigation.status === 'completed' ? 'Reopen' : 'Update Status'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mitigations;
