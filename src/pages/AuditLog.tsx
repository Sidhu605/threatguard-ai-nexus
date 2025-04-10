
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns";

type AuditLogEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  resourceType: string;
  status: 'success' | 'failure' | 'warning';
  ipAddress: string;
  details?: string;
};

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'LOG-001',
    timestamp: '2025-04-10T09:23:45Z',
    user: 'admin@threatguard.com',
    action: 'Login',
    resource: 'System',
    resourceType: 'Authentication',
    status: 'success',
    ipAddress: '192.168.1.105',
  },
  {
    id: 'LOG-002',
    timestamp: '2025-04-10T09:30:12Z',
    user: 'admin@threatguard.com',
    action: 'Update Status',
    resource: 'THREAT-001',
    resourceType: 'Threat',
    status: 'success',
    ipAddress: '192.168.1.105',
    details: 'Status changed from "active" to "investigating"',
  },
  {
    id: 'LOG-003',
    timestamp: '2025-04-10T10:15:33Z',
    user: 'sarah@threatguard.com',
    action: 'View',
    resource: 'Risk Analysis',
    resourceType: 'Dashboard',
    status: 'success',
    ipAddress: '192.168.1.120',
  },
  {
    id: 'LOG-004',
    timestamp: '2025-04-10T11:42:18Z',
    user: 'marcus@threatguard.com',
    action: 'Update',
    resource: 'MIT-001',
    resourceType: 'Mitigation',
    status: 'success',
    ipAddress: '192.168.1.130',
    details: 'Updated implementation progress to 65%',
  },
  {
    id: 'LOG-005',
    timestamp: '2025-04-10T12:30:05Z',
    user: 'unknown',
    action: 'Login',
    resource: 'System',
    resourceType: 'Authentication',
    status: 'failure',
    ipAddress: '203.97.122.15',
    details: 'Invalid credentials',
  },
  {
    id: 'LOG-006',
    timestamp: '2025-04-10T13:10:22Z',
    user: 'admin@threatguard.com',
    action: 'Create',
    resource: 'AST-007',
    resourceType: 'Asset',
    status: 'success',
    ipAddress: '192.168.1.105',
    details: 'Added new asset "Backup Server"',
  },
  {
    id: 'LOG-007',
    timestamp: '2025-04-10T14:25:11Z',
    user: 'system',
    action: 'Alert',
    resource: 'Network',
    resourceType: 'Security',
    status: 'warning',
    ipAddress: '192.168.1.1',
    details: 'Unusual outbound traffic detected',
  },
];

const AuditLog = () => {
  const [logs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    let matchesDate = true;
    if (date) {
      const logDate = new Date(log.timestamp);
      matchesDate = logDate.toDateString() === date.toDateString();
    }
    
    return matchesSearch && matchesAction && matchesStatus && matchesDate;
  });
  
  const getStatusBadge = (status: AuditLogEntry['status']) => {
    switch(status) {
      case 'success':
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>;
      case 'failure':
        return <Badge className="bg-red-500 hover:bg-red-600">Failure</Badge>;
      case 'warning':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Warning</Badge>;
    }
  };
  
  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Audit Log</h1>
            <p className="text-muted-foreground">Review system and user activities</p>
          </div>
          
          <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    className="pl-8 bg-cyber-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="bg-cyber-background">
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    {uniqueActions.map(action => (
                      <SelectItem key={action} value={action}>{action}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-cyber-background">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failure">Failure</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-cyber-background text-left font-normal justify-start"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleTimeString()}
                            <div className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>
                            <div>{log.resource}</div>
                            <div className="text-xs text-muted-foreground">{log.resourceType}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(log.status)}</TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>{log.details || "-"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          No log entries found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AuditLog;
