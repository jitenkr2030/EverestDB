'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Lock, 
  Shield, 
  Key, 
  Users, 
  Globe, 
  Server,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Settings,
  Wifi,
  Database,
  UserPlus,
  Activity
} from 'lucide-react'
import Link from 'next/link'

export default function SecuritySettings() {
  const [selectedCluster, setSelectedCluster] = useState('cluster-1')
  const [showPassword, setShowPassword] = useState(false)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const [sslEnabled, setSslEnabled] = useState(true)
  const [publicAccess, setPublicAccess] = useState(false)

  const clusters = [
    { 
      id: 'cluster-1', 
      name: 'production-db', 
      database: 'PostgreSQL', 
      status: 'secure',
      endpoint: 'prod-db.everestdb.io:5432'
    },
    { 
      id: 'cluster-2', 
      name: 'analytics-db', 
      database: 'MongoDB', 
      status: 'secure',
      endpoint: 'analytics-db.everestdb.io:27017'
    },
    { 
      id: 'cluster-3', 
      name: 'staging-db', 
      database: 'MySQL', 
      status: 'secure',
      endpoint: 'staging-db.everestdb.io:3306'
    }
  ]

  const currentCluster = clusters.find(c => c.id === selectedCluster)

  const userRoles = [
    { id: 'admin', name: 'Administrator', permissions: ['Full access', 'User management', 'Cluster management'] },
    { id: 'developer', name: 'Developer', permissions: ['Read/Write access', 'Query execution', 'Backup creation'] },
    { id: 'analyst', name: 'Analyst', permissions: ['Read-only access', 'Query execution', 'Export data'] },
    { id: 'readonly', name: 'Read Only', permissions: ['Read-only access', 'View metrics'] }
  ]

  const databaseUsers = [
    { 
      id: 1, 
      username: 'app_user', 
      role: 'developer', 
      status: 'active',
      lastLogin: '2 hours ago',
      connections: 5
    },
    { 
      id: 2, 
      username: 'analytics_service', 
      role: 'analyst', 
      status: 'active',
      lastLogin: '5 minutes ago',
      connections: 12
    },
    { 
      id: 3, 
      username: 'admin_user', 
      role: 'admin', 
      status: 'active',
      lastLogin: '1 day ago',
      connections: 1
    },
    { 
      id: 4, 
      username: 'readonly_user', 
      role: 'readonly', 
      status: 'inactive',
      lastLogin: '3 days ago',
      connections: 0
    }
  ]

  const networkRules = [
    { 
      id: 1, 
      type: 'allow', 
      source: '10.0.0.0/8', 
      description: 'Private network access',
      status: 'active'
    },
    { 
      id: 2, 
      type: 'allow', 
      source: '192.168.1.100', 
      description: 'Office IP address',
      status: 'active'
    },
    { 
      id: 3, 
      type: 'deny', 
      source: '0.0.0.0/0', 
      description: 'Block all public access',
      status: 'active'
    }
  ]

  const sslCertificates = [
    { 
      id: 1, 
      name: 'everestdb-wildcard', 
      issuer: 'Let\'s Encrypt', 
      expires: '2024-04-15',
      status: 'valid',
      domains: ['*.everestdb.io', 'everestdb.io']
    },
    { 
      id: 2, 
      name: 'client-cert-1', 
      issuer: 'EverestDB CA', 
      expires: '2024-06-30',
      status: 'valid',
      domains: ['client-auth']
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600'
      case 'inactive': return 'text-gray-600'
      case 'expired': return 'text-red-600'
      case 'valid': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive': return <AlertCircle className="w-4 h-4 text-gray-500" />
      case 'expired': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'valid': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">EverestDB</span>
            <Badge variant="secondary" className="ml-2">Security</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/provision">
              <Button variant="ghost">Provision</Button>
            </Link>
            <Link href="/scaling">
              <Button variant="ghost">Scaling</Button>
            </Link>
            <Link href="/monitoring">
              <Button variant="ghost">Monitoring</Button>
            </Link>
            <Link href="/backup">
              <Button variant="ghost">Backup</Button>
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Security & Networking</h1>
            <p className="text-lg text-slate-600">Manage access control, encryption, and network security</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select cluster" />
              </SelectTrigger>
              <SelectContent>
                {clusters.map((cluster) => (
                  <SelectItem key={cluster.id} value={cluster.id}>
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>{cluster.name}</span>
                      <Badge variant="outline" className="text-xs">{cluster.database}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {currentCluster && (
          <>
            {/* Security Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentCluster.name} - Security Status</span>
                  <Badge variant="default">Secure</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Lock className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Encryption</h4>
                    <p className="text-lg font-bold text-green-600">Enabled</p>
                    <p className="text-sm text-slate-500">AES-256</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Wifi className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">SSL/TLS</h4>
                    <p className="text-lg font-bold text-blue-600">Active</p>
                    <p className="text-sm text-slate-500">v1.3</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">Active Users</h4>
                    <p className="text-lg font-bold text-purple-600">3</p>
                    <p className="text-sm text-slate-500">of 4 total</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Network Access</h4>
                    <p className="text-lg font-bold text-orange-600">Private</p>
                    <p className="text-sm text-slate-500">VPC only</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Configuration */}
            <Tabs defaultValue="access" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="access">Access Control</TabsTrigger>
                <TabsTrigger value="network">Network Security</TabsTrigger>
                <TabsTrigger value="encryption">Encryption</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="access" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Database Users</span>
                      <Button size="sm">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Manage user accounts and their access permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Username</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Last Login</th>
                            <th className="text-left py-3 px-4">Connections</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {databaseUsers.map((user) => (
                            <tr key={user.id} className="border-b">
                              <td className="py-3 px-4 font-medium">{user.username}</td>
                              <td className="py-3 px-4">
                                <Badge variant="outline">{user.role}</Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(user.status)}
                                  <span className={getStatusColor(user.status)}>{user.status}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{user.lastLogin}</td>
                              <td className="py-3 px-4">{user.connections}</td>
                              <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">Edit</Button>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Role Permissions</CardTitle>
                    <CardDescription>
                      Define what each role can access and modify
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {userRoles.map((role) => (
                        <Card key={role.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{role.name}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {role.permissions.map((permission, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="network" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Network Access Rules</CardTitle>
                    <CardDescription>
                      Configure IP whitelisting and network access policies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Public Access</h4>
                          <p className="text-sm text-slate-600">Allow connections from any IP address</p>
                        </div>
                        <Switch
                          checked={publicAccess}
                          onCheckedChange={setPublicAccess}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        {networkRules.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Badge variant={rule.type === 'allow' ? 'default' : 'destructive'}>
                                {rule.type}
                              </Badge>
                              <div>
                                <p className="font-medium">{rule.source}</p>
                                <p className="text-sm text-slate-600">{rule.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(rule.status)}
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Network Rule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connection Endpoint</CardTitle>
                    <CardDescription>
                      Database connection information and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Endpoint</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input 
                            value={currentCluster.endpoint} 
                            readOnly 
                            className="font-mono"
                          />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(currentCluster.endpoint)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">SSL Required</h4>
                            <p className="text-sm text-slate-600">Enforce encrypted connections</p>
                          </div>
                          <Switch checked={sslEnabled} onCheckedChange={setSslEnabled} />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Certificate Auth</h4>
                            <p className="text-sm text-slate-600">Require client certificates</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="encryption" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Encryption Settings</CardTitle>
                    <CardDescription>
                      Configure data encryption at rest and in transit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Encryption at Rest</h4>
                          <p className="text-sm text-slate-600">Encrypt stored data using AES-256</p>
                        </div>
                        <Switch
                          checked={encryptionEnabled}
                          onCheckedChange={setEncryptionEnabled}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Data Encryption</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span>Algorithm</span>
                              <Badge variant="default">AES-256-GCM</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Key Rotation</span>
                              <Badge variant="secondary">Every 90 days</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Key Management</span>
                              <Badge variant="default">KMS</Badge>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Transport Security</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span>TLS Version</span>
                              <Badge variant="default">v1.3</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Cipher Suite</span>
                              <Badge variant="secondary">TLS_AES_256_GCM</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Perfect Forward Secrecy</span>
                              <Badge variant="default">Enabled</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>SSL/TLS Certificates</span>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certificate
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Manage SSL certificates for secure connections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sslCertificates.map((cert) => (
                        <Card key={cert.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{cert.name}</h3>
                              <p className="text-sm text-slate-600">Issuer: {cert.issuer}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                {getStatusIcon(cert.status)}
                                <span className={getStatusColor(cert.status)}>{cert.status}</span>
                                <span className="text-sm text-slate-500">Expires: {cert.expires}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {cert.domains.map((domain, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {domain}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Renew</Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>
                      Monitor and review database access and security events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">1,247</div>
                              <p className="text-sm text-slate-600">Total Events Today</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">1,198</div>
                              <p className="text-sm text-slate-600">Successful Logins</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">49</div>
                              <p className="text-sm text-slate-600">Failed Attempts</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Recent Security Events</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span>Failed login attempt for admin_user</span>
                            <span className="text-slate-500">2 minutes ago</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span>New user created: analytics_service</span>
                            <span className="text-slate-500">1 hour ago</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span>SSL certificate renewed</span>
                            <span className="text-slate-500">3 hours ago</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span>Network rule added: 192.168.1.100</span>
                            <span className="text-slate-500">5 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}