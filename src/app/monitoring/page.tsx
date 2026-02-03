'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  Activity, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Database,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Server,
  Users,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import Link from 'next/link'

export default function MonitoringDashboard() {
  const [selectedCluster, setSelectedCluster] = useState('cluster-1')
  const [timeRange, setTimeRange] = useState('24h')

  const clusters = [
    { 
      id: 'cluster-1', 
      name: 'production-db', 
      database: 'PostgreSQL', 
      status: 'healthy',
      uptime: '99.99%'
    },
    { 
      id: 'cluster-2', 
      name: 'analytics-db', 
      database: 'MongoDB', 
      status: 'healthy',
      uptime: '99.95%'
    },
    { 
      id: 'cluster-3', 
      name: 'staging-db', 
      database: 'MySQL', 
      status: 'warning',
      uptime: '99.8%'
    }
  ]

  const currentCluster = clusters.find(c => c.id === selectedCluster)

  const metrics = {
    cpu: { current: 65, max: 100, trend: 'up' },
    memory: { current: 78, max: 100, trend: 'up' },
    storage: { current: 45, max: 100, trend: 'down' },
    connections: { current: 120, max: 200, trend: 'stable' },
    queries: { current: 850, max: 1000, trend: 'up' }
  }

  const queryPerformance = [
    { query: 'SELECT * FROM users WHERE email = ?', avgTime: 2.3, calls: 1250, status: 'good' },
    { query: 'UPDATE orders SET status = ? WHERE id = ?', avgTime: 5.1, calls: 890, status: 'warning' },
    { query: 'SELECT p.*, u.name FROM products p JOIN users u ON p.user_id = u.id', avgTime: 12.8, calls: 340, status: 'critical' },
    { query: 'INSERT INTO logs (message, level, created_at) VALUES (?, ?, ?)', avgTime: 1.2, calls: 2100, status: 'good' },
    { query: 'DELETE FROM sessions WHERE expires_at < NOW()', avgTime: 8.5, calls: 45, status: 'warning' }
  ]

  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'High CPU usage detected on production-db', 
      time: '5 minutes ago',
      cluster: 'production-db'
    },
    { 
      id: 2, 
      type: 'critical', 
      message: 'Slow query detected: SELECT p.*, u.name FROM products p JOIN users u ON p.user_id = u.id', 
      time: '12 minutes ago',
      cluster: 'production-db'
    },
    { 
      id: 3, 
      type: 'info', 
      message: 'Backup completed successfully for analytics-db', 
      time: '1 hour ago',
      cluster: 'analytics-db'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      case 'info': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'info': return <Activity className="w-4 h-4 text-blue-500" />
      default: return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-red-500" />
      case 'down': return <ArrowDown className="w-4 h-4 text-green-500" />
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getQueryStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      case 'critical': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">EverestDB</span>
            <Badge variant="secondary" className="ml-2">Monitoring</Badge>
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
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Monitoring & Performance</h1>
            <p className="text-lg text-slate-600">Real-time insights into your database performance and health</p>
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
                      {getStatusIcon(cluster.status)}
                      <span>{cluster.name}</span>
                      <Badge variant="outline" className="text-xs">{cluster.database}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {currentCluster && (
          <>
            {/* Cluster Status Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentCluster.name} - Status Overview</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(currentCluster.status)}
                    <Badge variant={currentCluster.status === 'healthy' ? 'default' : 'secondary'}>
                      {currentCluster.status}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Uptime</h4>
                    <p className="text-2xl font-bold text-green-600">{currentCluster.uptime}</p>
                    <p className="text-sm text-slate-500">last 30 days</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">Database</h4>
                    <p className="text-lg font-bold text-blue-600">{currentCluster.database}</p>
                    <p className="text-sm text-slate-500">engine</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">Connections</h4>
                    <p className="text-2xl font-bold text-purple-600">{metrics.connections.current}</p>
                    <p className="text-sm text-slate-500">of {metrics.connections.max} max</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Queries/sec</h4>
                    <p className="text-2xl font-bold text-orange-600">{metrics.queries.current}</p>
                    <p className="text-sm text-slate-500">current rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Dashboard */}
            <Tabs defaultValue="resources" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="resources">Resource Metrics</TabsTrigger>
                <TabsTrigger value="queries">Query Performance</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="health">Health Check</TabsTrigger>
              </TabsList>

              <TabsContent value="resources" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* CPU Usage */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Cpu className="w-5 h-5 mr-2 text-blue-500" />
                          CPU Usage
                        </div>
                        {getTrendIcon(metrics.cpu.trend)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">{metrics.cpu.current}%</span>
                          <Badge variant={metrics.cpu.current > 80 ? 'destructive' : 'secondary'}>
                            {metrics.cpu.current > 80 ? 'High' : 'Normal'}
                          </Badge>
                        </div>
                        <Progress value={metrics.cpu.current} className="w-full" />
                        <div className="text-sm text-slate-600">
                          <div>Peak: 89% (2 hours ago)</div>
                          <div>Average: 72% (24h)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Memory Usage */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MemoryStick className="w-5 h-5 mr-2 text-green-500" />
                          Memory Usage
                        </div>
                        {getTrendIcon(metrics.memory.trend)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">{metrics.memory.current}%</span>
                          <Badge variant={metrics.memory.current > 85 ? 'destructive' : 'secondary'}>
                            {metrics.memory.current > 85 ? 'High' : 'Normal'}
                          </Badge>
                        </div>
                        <Progress value={metrics.memory.current} className="w-full" />
                        <div className="text-sm text-slate-600">
                          <div>Peak: 92% (1 hour ago)</div>
                          <div>Average: 68% (24h)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Storage Usage */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <HardDrive className="w-5 h-5 mr-2 text-purple-500" />
                          Storage Usage
                        </div>
                        {getTrendIcon(metrics.storage.trend)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">{metrics.storage.current}%</span>
                          <Badge variant="secondary">
                            Healthy
                          </Badge>
                        </div>
                        <Progress value={metrics.storage.current} className="w-full" />
                        <div className="text-sm text-slate-600">
                          <div>112.5 GB used of 250 GB</div>
                          <div>137.5 GB available</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Connections */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 mr-2 text-orange-500" />
                          Active Connections
                        </div>
                        {getTrendIcon(metrics.connections.trend)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">{metrics.connections.current}</span>
                          <Badge variant="secondary">
                            {Math.round((metrics.connections.current / metrics.connections.max) * 100)}% Used
                          </Badge>
                        </div>
                        <Progress value={(metrics.connections.current / metrics.connections.max) * 100} className="w-full" />
                        <div className="text-sm text-slate-600">
                          <div>Max: {metrics.connections.max} connections</div>
                          <div>Average: 95 (24h)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="queries" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Query Performance Analysis</CardTitle>
                    <CardDescription>
                      Monitor your slowest and most frequently executed queries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Query</th>
                            <th className="text-left py-3 px-4">Avg Time</th>
                            <th className="text-left py-3 px-4">Calls</th>
                            <th className="text-left py-3 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {queryPerformance.map((query, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 px-4">
                                <div className="max-w-md truncate font-mono text-sm">
                                  {query.query}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-semibold">{query.avgTime}ms</span>
                              </td>
                              <td className="py-3 px-4">{query.calls}</td>
                              <td className="py-3 px-4">
                                <Badge className={getQueryStatusColor(query.status)}>
                                  {query.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Alerts</CardTitle>
                    <CardDescription>
                      Stay informed about important events and potential issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-4 rounded-lg border">
                          {getStatusIcon(alert.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{alert.message}</h4>
                              <span className="text-sm text-slate-500">{alert.time}</span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">Cluster: {alert.cluster}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="health" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Database Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Replication Status</span>
                          <Badge variant="default">Healthy</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Backup Status</span>
                          <Badge variant="default">Up to date</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>WAL Archive</span>
                          <Badge variant="default">Current</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Connection Pool</span>
                          <Badge variant="secondary">60% used</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Disk I/O</span>
                          <Badge variant="default">Normal</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Network Latency</span>
                          <Badge variant="default">Low</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Lock Contention</span>
                          <Badge variant="secondary">Minimal</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Cache Hit Ratio</span>
                          <Badge variant="default">98%</Badge>
                        </div>
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