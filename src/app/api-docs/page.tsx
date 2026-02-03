'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  Code, 
  Terminal, 
  Copy, 
  CheckCircle, 
  Book, 
  Zap, 
  Database, 
  Shield,
  Globe,
  Users,
  Activity
} from 'lucide-react'
import Link from 'next/link'

export default function APIDocumentation() {
  const [copiedEndpoint, setCopiedEndpoint] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/clusters',
      description: 'List all database clusters',
      example: 'curl -X GET https://api.everestdb.io/api/v1/clusters -H "Authorization: Bearer YOUR_TOKEN"'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/clusters',
      description: 'Create a new database cluster',
      example: `curl -X POST https://api.everestdb.io/api/v1/clusters \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my-cluster",
    "engine": "postgresql",
    "version": "15",
    "size": "medium",
    "cloud": "aws",
    "region": "us-east-1"
  }'`
    },
    {
      method: 'GET',
      endpoint: '/api/v1/clusters/{id}',
      description: 'Get details of a specific cluster',
      example: 'curl -X GET https://api.everestdb.io/api/v1/clusters/cluster-123 -H "Authorization: Bearer YOUR_TOKEN"'
    },
    {
      method: 'PUT',
      endpoint: '/api/v1/clusters/{id}/scale',
      description: 'Scale a cluster (vertical or horizontal)',
      example: `curl -X PUT https://api.everestdb.io/api/v1/clusters/cluster-123/scale \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vertical": {
      "cpu": 8,
      "memory": 16,
      "storage": 500
    },
    "horizontal": {
      "replicas": 3
    }
  }'`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/clusters/{id}/backups',
      description: 'Create a manual backup',
      example: 'curl -X POST https://api.everestdb.io/api/v1/clusters/cluster-123/backups -H "Authorization: Bearer YOUR_TOKEN"'
    }
  ]

  const cliCommands = [
    {
      command: 'everestdb cluster list',
      description: 'List all clusters'
    },
    {
      command: 'everestdb cluster create --name my-db --engine postgresql --size medium',
      description: 'Create a new cluster'
    },
    {
      command: 'everestdb cluster scale my-db --cpu 8 --memory 16',
      description: 'Scale cluster resources'
    },
    {
      command: 'everestdb backup create my-db',
      description: 'Create a backup'
    },
    {
      command: 'everestdb cluster logs my-db --follow',
      description: 'View cluster logs in real-time'
    }
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(text)
    setTimeout(() => setCopiedEndpoint(''), 2000)
  }

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800'
      case 'POST': return 'bg-blue-100 text-blue-800'
      case 'PUT': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">EverestDB</span>
            <Badge variant="secondary" className="ml-2">API Docs</Badge>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            EverestDB API & CLI Documentation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Complete API reference and CLI commands for managing your database clusters programmatically
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Button>
              <Book className="w-4 h-4 mr-2" />
              View Full Documentation
            </Button>
            <Button variant="outline">
              <Terminal className="w-4 h-4 mr-2" />
              Download CLI
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">RESTful API</h3>
                <p className="text-sm text-slate-600">Complete CRUD operations</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Terminal className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold">CLI Tool</h3>
                <p className="text-sm text-slate-600">Command-line interface</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Secure Auth</h3>
                <p className="text-sm text-slate-600">API key authentication</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold">Real-time</h3>
                <p className="text-sm text-slate-600">Webhooks & events</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Documentation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rest-api">REST API</TabsTrigger>
            <TabsTrigger value="cli">CLI Commands</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn how to authenticate and make your first API call
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">1. Authentication</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                    <code className="text-sm">
                      curl -H "Authorization: Bearer YOUR_API_KEY" https://api.everestdb.io/api/v1/clusters
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">2. Base URL</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                    <code className="text-sm">https://api.everestdb.io/api/v1</code>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">3. Rate Limits</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• 1000 requests per hour for standard plans</li>
                    <li>• 10,000 requests per hour for pro plans</li>
                    <li>• Unlimited requests for enterprise plans</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rest-api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  Complete list of available REST API endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {apiEndpoints.map((endpoint, index) => (
                    <Card key={index} className="border">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Badge className={getMethodColor(endpoint.method)}>
                              {endpoint.method}
                            </Badge>
                            <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                              {endpoint.endpoint}
                            </code>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(endpoint.example)}
                          >
                            {copiedEndpoint === endpoint.example ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">{endpoint.description}</p>
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm whitespace-pre-wrap">
                            <code>{endpoint.example}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cli" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CLI Installation</CardTitle>
                <CardDescription>
                  Install and configure the EverestDB CLI tool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Installation</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                    <code className="text-sm">curl -fsSL https://get.everestdb.io | sh</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Configuration</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                    <code className="text-sm">everestdb config set api_key YOUR_API_KEY</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Commands</CardTitle>
                <CardDescription>
                  Frequently used CLI commands for database management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cliCommands.map((cmd, index) => (
                    <Card key={index} className="border">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-2">
                          <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                            {cmd.command}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(cmd.command)}
                          >
                            {copiedEndpoint === cmd.command ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-slate-600">{cmd.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}