
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Server, Database, Globe, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

type AssetType = 'server' | 'database' | 'application' | 'network' | 'endpoint';

type Asset = {
  id: string;
  name: string;
  type: AssetType;
  category: string;
  ipAddress?: string;
  location: string;
  owner: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities: number;
  lastScanned: string;
};

const mockAssets: Asset[] = [
  {
    id: 'AST-001',
    name: 'Primary Web Server',
    type: 'server',
    category: 'Production',
    ipAddress: '192.168.1.10',
    location: 'US East',
    owner: 'IT Operations',
    riskLevel: 'medium',
    vulnerabilities: 3,
    lastScanned: '2025-04-09T14:30:00Z'
  },
  {
    id: 'AST-002',
    name: 'Customer Database',
    type: 'database',
    category: 'Production',
    ipAddress: '192.168.1.20',
    location: 'US East',
    owner: 'Data Team',
    riskLevel: 'high',
    vulnerabilities: 5,
    lastScanned: '2025-04-08T09:15:00Z'
  },
  {
    id: 'AST-003',
    name: 'Corporate Website',
    type: 'application',
    category: 'Public',
    ipAddress: '104.18.22.43',
    location: 'CDN',
    owner: 'Marketing',
    riskLevel: 'low',
    vulnerabilities: 1,
    lastScanned: '2025-04-07T11:20:00Z'
  },
  {
    id: 'AST-004',
    name: 'Internal Network',
    type: 'network',
    category: 'Infrastructure',
    location: 'Global',
    owner: 'IT Operations',
    riskLevel: 'medium',
    vulnerabilities: 4,
    lastScanned: '2025-04-06T16:45:00Z'
  },
  {
    id: 'AST-005',
    name: 'Payment Processing API',
    type: 'application',
    category: 'Production',
    ipAddress: '192.168.3.15',
    location: 'US West',
    owner: 'Finance',
    riskLevel: 'critical',
    vulnerabilities: 7,
    lastScanned: '2025-04-05T10:30:00Z'
  },
  {
    id: 'AST-006',
    name: 'Employee Workstation',
    type: 'endpoint',
    category: 'Endpoint',
    ipAddress: '192.168.10.156',
    location: 'HQ',
    owner: 'IT Support',
    riskLevel: 'low',
    vulnerabilities: 2,
    lastScanned: '2025-04-08T15:10:00Z'
  }
];

const Assets = () => {
  const [assets] = useState<Asset[]>(mockAssets);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.ipAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRiskBadge = (risk: Asset['riskLevel']) => {
    switch(risk) {
      case 'critical':
        return <Badge className="bg-red-500 hover:bg-red-600">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
    }
  };
  
  const getAssetIcon = (type: AssetType) => {
    switch(type) {
      case 'server':
        return <Server className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'application':
        return <Globe className="h-5 w-5" />;
      case 'network':
        return <Shield className="h-5 w-5" />;
      case 'endpoint':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  const handleScan = (assetId: string) => {
    toast.success(`Scanning asset ${assetId}`);
  };

  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Assets</h1>
            <p className="text-muted-foreground">Manage and monitor your digital assets</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-cyber-accent">{assets.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">High Risk Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">
                  {assets.filter(a => a.riskLevel === 'high' || a.riskLevel === 'critical').length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500">
                  {assets.reduce((sum, asset) => sum + asset.vulnerabilities, 0)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
            <CardHeader>
              <div className="flex flex-wrap justify-between items-center">
                <CardTitle>Asset Inventory</CardTitle>
                <div className="relative w-full md:w-64 mt-2 md:mt-0">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search assets..."
                    className="pl-8 bg-cyber-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Vulnerabilities</TableHead>
                      <TableHead>Last Scanned</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.length > 0 ? (
                      filteredAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {getAssetIcon(asset.type)}
                              <div>
                                <div>{asset.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {asset.id} {asset.ipAddress && `(${asset.ipAddress})`}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{asset.type}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{asset.owner}</TableCell>
                          <TableCell>{getRiskBadge(asset.riskLevel)}</TableCell>
                          <TableCell>{asset.vulnerabilities}</TableCell>
                          <TableCell>
                            {new Date(asset.lastScanned).toLocaleDateString()} 
                            <span className="text-xs text-muted-foreground block">
                              {new Date(asset.lastScanned).toLocaleTimeString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-cyber-background"
                              onClick={() => handleScan(asset.id)}
                            >
                              Scan Now
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">
                          No assets found matching your search.
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

export default Assets;
