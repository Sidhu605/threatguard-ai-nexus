
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [apiKey, setApiKey] = useState("sk_live_Tf8s7dTy9h3kLq52");
  const [refreshInterval, setRefreshInterval] = useState("5");

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };

  const handleSaveAPI = () => {
    toast.success("API settings saved successfully");
  };

  const handleResetSettings = () => {
    toast.info("Settings have been reset to defaults");
    setNotifications(true);
    setDarkMode(true);
    setAnalyticsEnabled(true);
    setRefreshInterval("5");
  };

  const handleRegenerateKey = () => {
    const newKey = "sk_live_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast.success("API key regenerated successfully");
  };

  return (
    <div className="flex min-h-screen bg-cyber-background text-cyber-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure system settings and preferences</p>
          </div>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="bg-cyber-secondary mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API & Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Manage your application preferences and display settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable dark mode for the interface</p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="analytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Allow anonymous usage data collection</p>
                    </div>
                    <Switch 
                      id="analytics" 
                      checked={analyticsEnabled} 
                      onCheckedChange={setAnalyticsEnabled} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="refresh-rate">Dashboard Refresh Rate (minutes)</Label>
                    <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                      <SelectTrigger id="refresh-rate" className="w-full">
                        <SelectValue placeholder="Select refresh interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={handleSaveGeneral}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how you want to receive alerts and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable browser notifications for alerts</p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={notifications} 
                      onCheckedChange={setNotifications} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="email-notifications">Email Address for Notifications</Label>
                    <Input 
                      id="email-notifications" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-cyber-background"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="notification-level">Notification Level</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="notification-level" className="w-full">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="high">High and Above</SelectItem>
                        <SelectItem value="medium">Medium and Above</SelectItem>
                        <SelectItem value="all">All Notifications</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleSaveNotifications}>
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="api">
              <Card className="bg-cyber-secondary border-cyber-dark-blue shadow-lg">
                <CardHeader>
                  <CardTitle>API & Integration Settings</CardTitle>
                  <CardDescription>
                    Manage API keys and third-party integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="api-key" 
                        type="password" 
                        value={apiKey} 
                        readOnly 
                        className="flex-grow bg-cyber-background"
                      />
                      <Button 
                        variant="outline" 
                        className="ml-2"
                        onClick={handleRegenerateKey}
                      >
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This key provides access to the ThreatGuard API. Keep it secure.
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url" 
                      type="url" 
                      placeholder="https://your-service.com/webhook" 
                      className="bg-cyber-background"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="slack-integration">Slack Integration</Label>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack</p>
                    </div>
                    <Switch id="slack-integration" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleSaveAPI}>
                    Save API Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
