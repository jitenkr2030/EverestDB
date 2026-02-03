'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Database, 
  Cloud, 
  Server, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Settings,
  Zap,
  Shield,
  Globe,
  Plus,
  Copy,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function DatabaseProvisioning() {
  const [isCreating, setIsCreating] = useState(false)
  const [creationProgress, setCreationProgress] = useState(0)
  const [selectedDatabase, setSelectedDatabase] = useState('')
  const [clusterName, setClusterName] = useState('')
  const [selectedCloud, setSelectedCloud] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [createdCluster, setCreatedCluster] = useState(null)

  const databaseTypes = [
    { 
      id: 'postgresql', 
      name: 'PostgreSQL', 
      icon: '🐘', 
      description: 'Advanced open-source relational database with strong consistency',
      versions: ['15', '14', '13'],
      popular: true 
    },
    { 
      id: 'mysql', 
      name: 'MySQL', 
      icon: '🐬', 
      description: 'World\'s most popular open-source database',
      versions: ['8.0', '5.7'],
      popular: true 
    },
    { 
      id: 'mongodb', 
      name: 'MongoDB', 
      icon: '🍃', 
      description: 'Leading NoSQL document database for modern applications',
      versions: ['7.0', '6.0', '5.0'],
      popular: false 
    }
  ]

  const cloudProviders = [
    { 
      id: 'aws', 
      name: 'AWS', 
      logo: '☁️',
      regions: [
        { id: 'us-east-1', name: 'US East (N. Virginia)' },
        { id: 'us-west-2', name: 'US West (Oregon)' },
        { id: 'eu-west-1', name: 'Europe (Ireland)' },
        { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)' }
      ]
    },
    { 
      id: 'gcp', 
      name: 'Google Cloud', 
      logo: '🔷',
      regions: [
        { id: 'us-central1', name: 'US Central (Iowa)' },
        { id: 'us-west1', name: 'US West (Oregon)' },
        { id: 'europe-west1', name: 'Europe (Belgium)' },
        { id: 'asia-southeast1', name: 'Asia Pacific (Singapore)' }
      ]
    },
    { 
      id: 'azure', 
      name: 'Azure', 
      logo: '🔵',
      regions: [
        { id: 'eastus', name: 'East US' },
        { id: 'westus2', name: 'West US 2' },
        { id: 'westeurope', name: 'West Europe' },
        { id: 'southeastasia', name: 'Southeast Asia' }
      ]
    }
  ]

  const clusterSizes = [
    { 
      id: 'small', 
      name: 'Small', 
      cpu: '2 cores', 
      memory: '4GB RAM', 
      storage: '100GB SSD',
      price: '$49/mo',
      recommended: 'Development & Small Apps'
    },
    { 
      id: 'medium', 
      name: 'Medium', 
      cpu: '4 cores', 
      memory: '8GB RAM', 
      storage: '250GB SSD',
      price: '$149/mo',
      recommended: 'Production Workloads',
      popular: true
    },
    { 
      id: 'large', 
      name: 'Large', 
      cpu: '8 cores', 
      memory: '16GB RAM', 
      storage: '500GB SSD',
      price: '$299/mo',
      recommended: 'High-Traffic Applications'
    },
    { 
      id: 'xlarge', 
      name: 'X-Large', 
      cpu: '16 cores', 
      memory: '32GB RAM', 
      storage: '1TB SSD',
      price: '$599/mo',
      recommended: 'Enterprise Applications'
    }
  ]

  const handleCreateCluster = async () => {
    if (!selectedDatabase || !clusterName || !selectedCloud || !selectedRegion || !selectedSize) {
      return
    }

    setIsCreating(true)
    setCreationProgress(0)

    // Simulate cluster creation progress
    const progressSteps = [
      { progress: 20, message: 'Validating configuration...' },
      { progress: 40, message: 'Provisioning infrastructure...' },
      { progress: 60, message: 'Installing database engine...' },
      { progress: 80, message: 'Configuring high availability...' },
      { progress: 100, message: 'Cluster ready!' }
    ]

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCreationProgress(step.progress)
    }

    const dbType = databaseTypes.find(db => db.id === selectedDatabase)
    const cloud = cloudProviders.find(c => c.id === selectedCloud)
    const region = cloud.regions.find(r => r.id === selectedRegion)
    const size = clusterSizes.find(s => s.id === selectedSize)

    setCreatedCluster({
      id: `cluster-${Date.now()}`,
      name: clusterName,
      database: dbType,
      cloud: cloud,
      region: region,
      size: size,
      status: 'ready',
      connectionUrl: `postgresql://user:pass@${clusterName}.everestdb.io:5432/database`,
      createdAt: new Date().toISOString()
    })

    setIsCreating(false)
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
            <Database className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">EverestDB</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Button variant="ghost">Documentation</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Create Database Cluster
            </h1>
            <p className="text-lg text-slate-600">
              Deploy a production-ready database cluster in seconds
            </p>
          </div>

          {!createdCluster ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  1-Click Database Provisioning
                </CardTitle>
                <CardDescription>
                  Choose your database engine, cloud provider, and cluster size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="database" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="database">Database</TabsTrigger>
                    <TabsTrigger value="cloud">Cloud & Region</TabsTrigger>
                    <TabsTrigger value="size">Cluster Size</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                  </TabsList>

                  <TabsContent value="database" className="space-y-4">
                    <div>
                      <Label htmlFor="cluster-name">Cluster Name</Label>
                      <Input
                        id="cluster-name"
                        placeholder="my-production-db"
                        value={clusterName}
                        onChange={(e) => setClusterName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Database Engine</Label>
                      <div className="grid mt-2 gap-4">
                        {databaseTypes.map((db) => (
                          <Card 
                            key={db.id}
                            className={`cursor-pointer transition-all ${
                              selectedDatabase === db.id 
                                ? 'ring-2 ring-blue-500 bg-blue-50' 
                                : 'hover:bg-slate-50'
                            }`}
                            onClick={() => setSelectedDatabase(db.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-2xl">{db.icon}</span>
                                  <div>
                                    <h3 className="font-semibold flex items-center">
                                      {db.name}
                                      {db.popular && (
                                        <Badge variant="secondary" className="ml-2">Popular</Badge>
                                      )}
                                    </h3>
                                    <p className="text-sm text-slate-600">{db.description}</p>
                                  </div>
                                </div>
                                {selectedDatabase === db.id && (
                                  <CheckCircle className="w-5 h-5 text-blue-500" />
                                )}
                              </div>
                              <div className="mt-3">
                                <Label className="text-xs text-slate-500">Version</Label>
                                <Select>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select version" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {db.versions.map((version) => (
                                      <SelectItem key={version} value={version}>
                                        {version}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cloud" className="space-y-4">
                    <div>
                      <Label>Cloud Provider</Label>
                      <div className="grid mt-2 gap-4">
                        {cloudProviders.map((cloud) => (
                          <Card 
                            key={cloud.id}
                            className={`cursor-pointer transition-all ${
                              selectedCloud === cloud.id 
                                ? 'ring-2 ring-blue-500 bg-blue-50' 
                                : 'hover:bg-slate-50'
                            }`}
                            onClick={() => setSelectedCloud(cloud.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-2xl">{cloud.logo}</span>
                                  <h3 className="font-semibold">{cloud.name}</h3>
                                </div>
                                {selectedCloud === cloud.id && (
                                  <CheckCircle className="w-5 h-5 text-blue-500" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {selectedCloud && (
                      <div>
                        <Label>Region</Label>
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {cloudProviders
                              .find(c => c.id === selectedCloud)
                              ?.regions.map((region) => (
                                <SelectItem key={region.id} value={region.id}>
                                  {region.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="size" className="space-y-4">
                    <Label>Cluster Size</Label>
                    <div className="grid gap-4">
                      {clusterSizes.map((size) => (
                        <Card 
                          key={size.id}
                          className={`cursor-pointer transition-all ${
                            selectedSize === size.id 
                              ? 'ring-2 ring-blue-500 bg-blue-50' 
                              : 'hover:bg-slate-50'
                          }`}
                          onClick={() => setSelectedSize(size.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <h3 className="font-semibold">{size.name}</h3>
                                  {size.popular && (
                                    <Badge variant="secondary" className="ml-2">Recommended</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{size.recommended}</p>
                                <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                                  <div>
                                    <span className="text-slate-500">CPU:</span>
                                    <span className="ml-1 font-medium">{size.cpu}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">Memory:</span>
                                    <span className="ml-1 font-medium">{size.memory}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">Storage:</span>
                                    <span className="ml-1 font-medium">{size.storage}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{size.price}</div>
                                {selectedSize === size.id && (
                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-2 ml-auto" />
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="review" className="space-y-4">
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">Cluster Configuration Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Cluster Name:</span>
                          <span className="font-medium">{clusterName || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Database:</span>
                          <span className="font-medium">
                            {databaseTypes.find(db => db.id === selectedDatabase)?.name || 'Not selected'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Cloud Provider:</span>
                          <span className="font-medium">
                            {cloudProviders.find(c => c.id === selectedCloud)?.name || 'Not selected'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Region:</span>
                          <span className="font-medium">
                            {selectedCloud && selectedRegion && 
                              cloudProviders.find(c => c.id === selectedCloud)
                                ?.regions.find(r => r.id === selectedRegion)?.name
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Cluster Size:</span>
                          <span className="font-medium">
                            {clusterSizes.find(s => s.id === selectedSize)?.name || 'Not selected'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Estimated Cost:</span>
                          <span className="font-medium text-blue-600">
                            {clusterSizes.find(s => s.id === selectedSize)?.price || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isCreating && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Creating cluster...</span>
                        </div>
                        <Progress value={creationProgress} className="w-full" />
                      </div>
                    )}

                    <Button 
                      onClick={handleCreateCluster}
                      disabled={!selectedDatabase || !clusterName || !selectedCloud || !selectedRegion || !selectedSize || isCreating}
                      className="w-full"
                      size="lg"
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating Cluster...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Create Database Cluster
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            /* Success State */
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Cluster Created Successfully!</CardTitle>
                <CardDescription>
                  Your database cluster is now ready for use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Cluster Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-500">Cluster Name</Label>
                      <p className="font-medium">{createdCluster.name}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Status</Label>
                      <Badge variant="default" className="mt-1">Ready</Badge>
                    </div>
                    <div>
                      <Label className="text-slate-500">Database Engine</Label>
                      <p className="font-medium">{createdCluster.database.icon} {createdCluster.database.name}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Cloud Provider</Label>
                      <p className="font-medium">{createdCluster.cloud.logo} {createdCluster.cloud.name}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Region</Label>
                      <p className="font-medium">{createdCluster.region.name}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Cluster Size</Label>
                      <p className="font-medium">{createdCluster.size.name}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Connection Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-slate-500">Connection URL</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input 
                          value={createdCluster.connectionUrl} 
                          readOnly 
                          className="font-mono text-sm"
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(createdCluster.connectionUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-slate-500">Host</Label>
                        <p className="font-medium">{createdCluster.name}.everestdb.io</p>
                      </div>
                      <div>
                        <Label className="text-slate-500">Port</Label>
                        <p className="font-medium">5432</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link href="/" className="flex-1">
                    <Button className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Cluster
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}