'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Backup, 
  Database, 
  Clock, 
  Calendar, 
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
  History,
  Shield,
  Zap,
  Server,
  HardDrive,
  Activity
} from 'lucide-react'
import Link from 'next/link'

export default function BackupManagement() {
  const [selectedCluster, setSelectedCluster] = useState('cluster-1')
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState(null)
  const [restoreTime, setRestoreTime] = useState('')

  const clusters = [
    { 
      id: 'cluster-1', 
      name: 'production-db', 
      database: 'PostgreSQL', 
      size: '112.5 GB',
      lastBackup: '2 hours ago'
    },
    { 
      id: 'cluster-2', 
      name: 'analytics-db', 
      database: 'MongoDB', 
      size: '45.8 GB',
      lastBackup: '1 hour ago'
    },
    { 
      id: 'cluster-3', 
      name: 'staging-db', 
      database: 'MySQL', 
      size: '23.2 GB',
      lastBackup: '30 minutes ago'
    }
  ]

  const currentCluster = clusters.find(c => c.id === selectedCluster)

  const backupSchedules = [
    { id: 'daily', name: 'Daily', frequency: 'Every day at 2:00 AM', retention: '30 days' },
    { id: 'weekly', name: 'Weekly', frequency: 'Every Sunday at 1:00 AM', retention: '90 days' },
    { id: 'monthly', name: 'Monthly', frequency: '1st of month at 12:00 AM', retention: '1 year' }
  ]

  const recentBackups = [
    { 
      id: 1, 
      type: 'scheduled', 
      size: '2.8 GB', 
      createdAt: '2024-01-15 02:00:00', 
      status: 'completed',
      duration: '3m 24s'
    },
    { 
      id: 2, 
      type: 'manual', 
      size: '2.9 GB', 
      createdAt: '2024-01-14 15:30:00', 
      status: 'completed',
      duration: '3m 45s'
    },
    { 
      id: 3, 
      type: 'scheduled', 
      size: '2.7 GB', 
      createdAt: '2024-01-14 02:00:00', 
      status: 'completed',
      duration: '3m 12s'
    },
    { 
      id: 4, 
      type: 'scheduled', 
      size: '2.6 GB', 
      createdAt: '2024-01-13 02:00:00', 
      status: 'completed',
      duration: '2m 58s'
    },
    { 
      id: 5, 
      type: 'manual', 
      size: '2.5 GB', 
      createdAt: '2024-01-12 10:15:00', 
      status: 'failed',
      duration: '1m 23s'
    }
  ]

  const pitrWindows = [
    { 
      id: '7days', 
      name: '7 Days', 
      description: 'Restore to any point in the last 7 days',
      storage: 'Additional 50 GB'
    },
    { 
      id: '30days', 
      name: '30 Days', 
      description: 'Restore to any point in the last 30 days',
      storage: 'Additional 150 GB'
    },
    { 
      id: '90days', 
      name: '90 Days', 
      description: 'Restore to any point in the last 90 days',
      storage: 'Additional 400 GB'
    }
  ]

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true)
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsCreatingBackup(false)
  }

  const handleRestore = async () => {
    if (!selectedBackup) return
    setIsRestoring(true)
    // Simulate restore process
    await new Promise(resolve => setTimeout(resolve, 5000))
    setIsRestoring(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600'
      case 'in-progress': return 'text-blue-600'
      case 'failed': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in-progress': return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Backup className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">EverestDB</span>
            <Badge variant="secondary" className="ml-2">Backup</Badge>
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
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Backup & Recovery</h1>
            <p className="text-lg text-slate-600">Automated backups and point-in-time recovery for your databases</p>
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
            <Button onClick={handleCreateBackup} disabled={isCreatingBackup}>
              {isCreatingBackup ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Create Backup
                </>
              )}
            </Button>
          </div>
        </div>

        {currentCluster && (
          <>
            {/* Current Cluster Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentCluster.name} - Backup Status</span>
                  <Badge variant="default">Protected</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Last Backup</h4>
                    <p className="text-lg font-bold text-green-600">{currentCluster.lastBackup}</p>
                    <p className="text-sm text-slate-500">completed successfully</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <HardDrive className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">Database Size</h4>
                    <p className="text-lg font-bold text-blue-600">{currentCluster.size}</p>
                    <p className="text-sm text-slate-500">current size</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">Retention</h4>
                    <p className="text-lg font-bold text-purple-600">30 Days</p>
                    <p className="text-sm text-slate-500">backup retention</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <History className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">PITR Window</h4>
                    <p className="text-lg font-bold text-orange-600">7 Days</p>
                    <p className="text-sm text-slate-500">recovery window</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backup Management */}
            <Tabs defaultValue="backups" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="backups">Backup History</TabsTrigger>
                <TabsTrigger value="schedule">Backup Schedule</TabsTrigger>
                <TabsTrigger value="pitr">Point-in-Time Recovery</TabsTrigger>
                <TabsTrigger value="settings">Backup Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="backups" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Backups</CardTitle>
                    <CardDescription>
                      View and manage your database backup history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Type</th>
                            <th className="text-left py-3 px-4">Created</th>
                            <th className="text-left py-3 px-4">Size</th>
                            <th className="text-left py-3 px-4">Duration</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentBackups.map((backup) => (
                            <tr key={backup.id} className="border-b">
                              <td className="py-3 px-4">
                                <Badge variant={backup.type === 'manual' ? 'default' : 'secondary'}>
                                  {backup.type}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">{backup.createdAt}</td>
                              <td className="py-3 px-4">{backup.size}</td>
                              <td className="py-3 px-4">{backup.duration}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(backup.status)}
                                  <span className={getStatusColor(backup.status)}>{backup.status}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setSelectedBackup(backup)}
                                  >
                                    Restore
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
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Backup Schedule Configuration</CardTitle>
                    <CardDescription>
                      Set up automated backup schedules for your database
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {backupSchedules.map((schedule) => (
                        <Card key={schedule.id} className="cursor-pointer hover:bg-slate-50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold">{schedule.name}</h3>
                                <p className="text-sm text-slate-600">{schedule.frequency}</p>
                                <p className="text-sm text-slate-500">Retention: {schedule.retention}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">Active</Badge>
                                <Button size="sm" variant="outline">
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pitr" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="w-5 h-5 mr-2 text-purple-500" />
                      Point-in-Time Recovery
                    </CardTitle>
                    <CardDescription>
                      Restore your database to any point in time within the recovery window
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold">Recovery Window</Label>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        {pitrWindows.map((window) => (
                          <Card key={window.id} className="cursor-pointer hover:bg-slate-50">
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{window.name}</h3>
                              <p className="text-sm text-slate-600 mt-1">{window.description}</p>
                              <p className="text-sm text-slate-500 mt-2">{window.storage}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <Label className="text-base font-semibold">Restore Database</Label>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <Label htmlFor="restore-time">Point in Time</Label>
                          <Input
                            id="restore-time"
                            type="datetime-local"
                            value={restoreTime}
                            onChange={(e) => setRestoreTime(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="new-db-name">New Database Name</Label>
                          <Input
                            id="new-db-name"
                            placeholder="restored-db-2024-01-15"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={handleRestore}
                        disabled={!restoreTime || isRestoring}
                        className="mt-4"
                      >
                        {isRestoring ? (
                          <>
                            <Activity className="w-4 h-4 mr-2 animate-spin" />
                            Restoring...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Start Recovery
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Backup Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Compression</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Encryption</span>
                        <Badge variant="default">AES-256</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Backup Location</span>
                        <Badge variant="secondary">Cloud Storage</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Verification</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Storage Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Backup Storage</span>
                          <span>85.2 GB / 200 GB</span>
                        </div>
                        <Progress value={42.6} className="w-full" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>WAL Archive</span>
                          <span>12.8 GB / 50 GB</span>
                        </div>
                        <Progress value={25.6} className="w-full" />
                      </div>
                      <div className="text-sm text-slate-600">
                        <p>Monthly cost: $45.00</p>
                        <p>Next cleanup: 7 days</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}