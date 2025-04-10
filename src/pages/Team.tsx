
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  avatar?: string;
  status: 'active' | 'offline' | 'away';
};

const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@threatguard.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@threatguard.com', role: 'analyst', status: 'active' },
  { id: '3', name: 'Marcus Lee', email: 'marcus@threatguard.com', role: 'analyst', status: 'away' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena@threatguard.com', role: 'viewer', status: 'offline' },
];

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);

  const handleRoleChange = (memberId: string, newRole: 'admin' | 'analyst' | 'viewer') => {
    setTeamMembers(
      teamMembers.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    toast.success('Team member role updated');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Team</h1>
            <p className="text-muted-foreground">Manage team members and permissions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <Card key={member.id} className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-cyber-dark-blue">
                          {member.avatar ? (
                            <AvatarImage src={member.avatar} alt={member.name} />
                          ) : (
                            <AvatarFallback className="bg-cyber-primary text-cyber-foreground">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-cyber-secondary ${getStatusColor(member.status)}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {member.email}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-cyber-primary/10 text-cyber-accent border-cyber-accent">
                      {member.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    {member.role === 'admin' ? 'Full system access and configuration rights' : 
                     member.role === 'analyst' ? 'Can analyze threats and update status' : 
                     'View-only access to dashboards and reports'}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t border-cyber-dark-blue pt-4">
                  <div className="flex-grow text-xs text-muted-foreground">
                    {member.status === 'active' ? 'Currently online' : 
                     member.status === 'away' ? 'Away for 15 minutes' : 
                     'Last seen 2 hours ago'}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-cyber-background"
                    onClick={() => handleRoleChange(
                      member.id, 
                      member.role === 'admin' ? 'analyst' : 
                      member.role === 'analyst' ? 'viewer' : 'admin'
                    )}
                  >
                    Change Role
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

export default Team;
