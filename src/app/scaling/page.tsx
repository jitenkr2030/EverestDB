'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowUp, 
  ArrowRight, 
  Users, 
  Server, 
  Cpu, 
  HardDrive, 
  MemoryStick,
  Activity,
  CheckCircle,
  AlertCircle,
  Settings,
  Zap,
  Shield,
  TrendingUp,
  Plus,
  Minus
} from 'lucide-react'
import Link from 'next/link'

export default function ScalingDashboard() {
  const [selectedCluster, setSelectedCluster] = useState('cluster-1')
  const [verticalScaling, setVerticalScaling] = useState({
    cpu: 4,
    memory: 8,
    storage: 250
  })
  const [horizontalScaling, setHorizontalScaling] = useState({
    replicas: 2,
    nodes: 3
  })
  const [isApplyingChanges, setIsApplyingChanges] = useState(false)

  const clusters = [
    { 
      id: 'cluster-1', 
      name: 'production-db', 
      database: 'PostgreSQL', 
      status: 'healthy',
      cpu: 4, 
      memory: 8, 
      storage: 250,
      replicas: 2,
      nodes: 3
    },
    { 
      id: 'cluster-2', 
      name: 'analytics-db', 
      database: 'MongoDB', 
      status: 'healthy',
      cpu: 8, 
      memory: 16, 
      storage: 500,
      replicas: 3,
      nodes: 5
    },
    { 
      id: 'cluster-3', 
      name: 'staging-db', 
      database: 'MySQL', 
      status: 'scaling',
      cpu: 2, 
      memory: 4, 
      storage: 100,
      replicas: 1,
      nodes: 1
    }
  ]

  const currentCluster = clusters.find(c => c.id === selectedCluster)

  const cpuOptions = [1, 2, 4, 8, 16, 32]
  const memoryOptions = [1, 2, 4, 8, 16, 32, 64, 128, 256]
  const storageOptions = [10, 25, 50, 100, 250, 500, 1000, 2000, 5000, 10000]

  const handleApplyScaling = async () => {
    setIsApplyingChanges(true)
    // Simulate applying scaling changes
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsApplyingChanges(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-500'
      case 'scaling': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const calculateCost = () => {
    const cpuCost = verticalScaling.cpu * 25
    const memoryCost = verticalScaling.memory * 8
    const storageCost = verticalScaling.storage * 0.5
    const replicaCost = horizontalScaling.replicas * 20
    return cpuCost + memoryCost + storageCost + replicaCost
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">EverestDB</span>
            <Badge variant="secondary" className="ml-2">Scaling</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/provision">
              <Button variant="ghost">Provision</Button>
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Scaling Management</h1>
            <p className="text-lg text-slate-600">Manage vertical and horizontal scaling for your database clusters</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select cluster" />
              </SelectTrigger>
              <SelectContent>
                {clusters.map((cluster) => (
                  <SelectItem key={cluster.id} value={cluster.id}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(cluster.status)}`} />
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
            {/* Current Cluster Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentCluster.name} - Current Configuration</span>
                  <Badge variant={currentCluster.status === 'healthy' ? 'default' : 'secondary'}>
                    {currentCluster.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Cpu className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">CPU Cores</h4>
                    <p className="text-2xl font-bold text-blue-600">{currentCluster.cpu}</p>
                    <p className="text-sm text-slate-500">cores</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <MemoryStick className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Memory</h4>
                    <p className="text-2xl font-bold text-green-600">{currentCluster.memory}</p>
                    <p className="text-sm text-slate-500">GB RAM</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <HardDrive className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">Storage</h4>
                    <p className="text-2xl font-bold text-purple-600">{currentCluster.storage}</p>
                    <p className="text-sm text-slate-500">GB SSD</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Replicas</h4>
                    <p className="text-2xl font-bold text-orange-600">{currentCluster.replicas}</p>
                    <p className="text-sm text-slate-500">read replicas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scaling Configuration */}
            <Tabs defaultValue="vertical" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="vertical" className="flex items-center">
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Vertical Scaling
                </TabsTrigger>
                <TabsTrigger value="horizontal" className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Horizontal Scaling
                </TabsTrigger>
              </TabsList>

              <TabsContent value="vertical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ArrowUp className="w-5 h-5 mr-2 text-blue-500" />
                      Vertical Scaling Configuration
                    </CardTitle>
                    <CardDescription>
                      Scale compute (CPU/RAM) and storage resources for your cluster
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* CPU Configuration */}
                    <div>
                      <Label className="text-base font-semibold">CPU Cores</Label>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Current: {currentCluster.cpu} cores</span>
                          <span className="text-sm font-medium">Selected: {verticalScaling.cpu} cores</span>
                        </div>
                        <Slider
                          value={[verticalScaling.cpu]}
                          onValueChange={(value) => setVerticalScaling({...verticalScaling, cpu: value[0]})}
                          max={32}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>1 core</span>
                          <span>32 cores</span>
                        </div>
                      </div>
                    </div>

                    {/* Memory Configuration */}
                    <div>
                      <Label className="text-base font-semibold">Memory (RAM)</Label>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Current: {currentCluster.memory} GB</span>
                          <span className="text-sm font-medium">Selected: {verticalScaling.memory} GB</span>
                        </div>
                        <Slider
                          value={[verticalScaling.memory]}
                          onValueChange={(value) => setVerticalScaling({...verticalScaling, memory: value[0]})}
                          max={256}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>1 GB</span>
                          <span>256 GB</span>
                        </div>
                      </div>
                    </div>

                    {/* Storage Configuration */}
                    <div>
                      <Label className="text-base font-semibold">Storage (SSD)</Label>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Current: {currentCluster.storage} GB</span>
                          <span className="text-sm font-medium">Selected: {verticalScaling.storage} GB</span>
                        </div>
                        <Slider
                          value={[verticalScaling.storage]}
                          onValueChange={(value) => setVerticalScaling({...verticalScaling, storage: value[0]})}
                          max={10000}
                          min={10}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>10 GB</span>
                          <span>10 TB</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Impact */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Cost Impact</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Current monthly cost:</span>
                          <span className="ml-2 font-medium">$180/mo</span>
                        </div>
                        <div>
                          <span className="text-slate-600">New monthly cost:</span>
                          <span className="ml-2 font-medium text-blue-600">${calculateCost()}/mo</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-slate-600">Monthly difference:</span>
                        <span className={`ml-2 font-medium ${calculateCost() > 180 ? 'text-red-600' : 'text-green-600'}`}>
                          {calculateCost() > 180 ? '+' : ''}{calculateCost() - 180}/mo
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="horizontal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ArrowRight className="w-5 h-5 mr-2 text-green-500" />
                      Horizontal Scaling Configuration
                    </CardTitle>
                    <CardDescription>
                      Add replicas and nodes for high availability and read scaling
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Read Replicas */}
                    <div>
                      <Label className="text-base font-semibold">Read Replicas</Label>
                      <p className="text-sm text-slate-600 mb-3">
                        Add read replicas to distribute read workload and improve performance
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setHorizontalScaling({...horizontalScaling, replicas: Math.max(0, horizontalScaling.replicas - 1)})}
                          disabled={horizontalScaling.replicas === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{horizontalScaling.replicas}</div>
                          <div className="text-sm text-slate-500">replicas</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setHorizontalScaling({...horizontalScaling, replicas: Math.min(15, horizontalScaling.replicas + 1)})}
                          disabled={horizontalScaling.replicas === 15}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Progress value={(horizontalScaling.replicas / 15) * 100} className="w-full" />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>0 replicas</span>
                          <span>15 replicas (max)</span>
                        </div>
                      </div>
                    </div>

                    {/* Cluster Nodes */}
                    <div>
                      <Label className="text-base font-semibold">Cluster Nodes</Label>
                      <p className="text-sm text-slate-600 mb-3">
                        Configure the number of nodes for high availability
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 3, 5, 7, 9].map((nodes) => (
                          <Card
                            key={nodes}
                            className={`cursor-pointer transition-all ${
                              horizontalScaling.nodes === nodes
                                ? 'ring-2 ring-green-500 bg-green-50'
                                : 'hover:bg-slate-50'
                            }`}
                            onClick={() => setHorizontalScaling({...horizontalScaling, nodes})}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold mb-1">{nodes}</div>
                              <div className="text-sm text-slate-600">
                                {nodes === 1 ? 'Single Node' : `${nodes} Node Cluster`}
                              </div>
                              {nodes === 3 && (
                                <Badge variant="secondary" className="mt-2">Recommended</Badge>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* High Availability Features */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-green-600" />
                        High Availability Features
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          <span>Automated failover</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          <span>Pod Disruption Budgets</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          <span>Continuous WAL backup</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          <span>Health monitoring</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Impact */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Cost Impact</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Current monthly cost:</span>
                          <span className="ml-2 font-medium">$180/mo</span>
                        </div>
                        <div>
                          <span className="text-slate-600">New monthly cost:</span>
                          <span className="ml-2 font-medium text-blue-600">
                            ${180 + (horizontalScaling.replicas * 20) + ((horizontalScaling.nodes - 1) * 50)}/mo
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Apply Changes */}
            <Card className="mt-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Apply Scaling Changes</h3>
                    <p className="text-sm text-slate-600">
                      Changes will be applied with zero downtime using rolling updates
                    </p>
                  </div>
                  <Button
                    onClick={handleApplyScaling}
                    disabled={isApplyingChanges}
                    size="lg"
                  >
                    {isApplyingChanges ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        Applying Changes...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Apply Scaling Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}