'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Database, 
  Cloud, 
  Shield, 
  Activity, 
  Zap, 
  Globe, 
  BarChart3, 
  Lock, 
  Settings, 
  CheckCircle,
  ArrowRight,
  Server,
  Archive,
  RefreshCw,
  Users,
  Code,
  Terminal
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')

  const features = [
    {
      icon: Database,
      title: '1-Click Database Provisioning',
      description: 'Launch managed PostgreSQL, MySQL, and MongoDB clusters in seconds without Kubernetes complexity.',
      badge: 'Instant Setup'
    },
    {
      icon: ArrowRight,
      title: 'Scalable Infrastructure',
      description: 'Vertical scaling for compute/storage and horizontal scaling with replicas for high availability.',
      badge: 'Auto Scaling'
    },
    {
      icon: Cloud,
      title: 'Multi-Cloud Deployment',
      description: 'Run databases across AWS EKS, GCP GKE, Azure AKS, DigitalOcean, or self-hosted Kubernetes.',
      badge: 'Cloud Agnostic'
    },
    {
      icon: Archive,
      title: 'Automated Backups & PITR',
      description: 'Scheduled backups, on-demand snapshots, and point-in-time recovery for complete data protection.',
      badge: 'Data Safety'
    },
    {
      icon: BarChart3,
      title: 'Monitoring & Insights',
      description: 'Integrated monitoring with CPU/RAM metrics, query performance, health dashboards, and alerts.',
      badge: 'Full Observability'
    },
    {
      icon: Lock,
      title: 'Secure Access & Networking',
      description: 'Configurable external access, NodePort & LoadBalancer support, and private network exposure.',
      badge: 'Enterprise Security'
    },
    {
      icon: Settings,
      title: 'Advanced Configuration',
      description: 'Fine-tune database parameters, resource allocation, and pod scheduling for optimal performance.',
      badge: 'Power User'
    },
    {
      icon: Shield,
      title: 'High Availability & Resilience',
      description: 'Automated cluster bootstrapping, failover, Pod Disruption Budgets, and continuous WAL backup.',
      badge: 'Production Ready'
    },
    {
      icon: Users,
      title: 'Unified API & UI Management',
      description: 'Clean web dashboard, role-based access, REST API + CLI tools, and one-pane visibility.',
      badge: 'Simplified Management'
    },
    {
      icon: Code,
      title: 'Simple Deployment & Automation',
      description: 'Deploy with Helm charts, automate installs and upgrades, and integrate with CI/CD workflows.',
      badge: 'DevOps Friendly'
    }
  ]

  const databaseTypes = [
    { name: 'PostgreSQL', icon: '🐘', description: 'Advanced open-source relational database' },
    { name: 'MySQL', icon: '🐬', description: 'World\'s most popular open-source database' },
    { name: 'MongoDB', icon: '🍃', description: 'Leading NoSQL document database' }
  ]

  const cloudProviders = [
    { name: 'AWS EKS', logo: '☁️' },
    { name: 'GCP GKE', logo: '🔷' },
    { name: 'Azure AKS', logo: '🔵' },
    { name: 'DigitalOcean', logo: '🌊' },
    { name: 'Hetzner', logo: '🏭' },
    { name: 'Self-Hosted', logo: '🏠' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">EverestDB</span>
            <Badge variant="secondary" className="ml-2">DBaaS</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/scaling">
              <Button variant="ghost">Scaling</Button>
            </Link>
            <Link href="/monitoring">
              <Button variant="ghost">Monitoring</Button>
            </Link>
            <Link href="/backup">
              <Button variant="ghost">Backup</Button>
            </Link>
            <Link href="/security">
              <Button variant="ghost">Security</Button>
            </Link>
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Pricing</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            <Zap className="w-4 h-4 mr-1" />
            Managed Database as a Service
          </Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            EverestDB – Enterprise Database Management,
            <span className="text-blue-600"> Simplified</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Deploy, scale, and manage production-grade databases across any cloud. 
            No Kubernetes expertise required. Get the power of AWS RDS with 
            open-source flexibility and better cost control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/provision">
              <Button size="lg" className="text-lg px-8">
                <Database className="w-5 h-5 mr-2" />
                Create Database Cluster
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Terminal className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Database Types */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Supported Database Engines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {databaseTypes.map((db) => (
              <Card key={db.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{db.icon}</div>
                  <CardTitle>{db.name}</CardTitle>
                  <CardDescription>{db.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/provision">
                    <Button className="w-full" variant="outline">
                      Deploy {db.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Database Management Platform</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scaling">Scaling</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.slice(0, 6).map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <feature.icon className="w-8 h-8 text-blue-600" />
                        <Badge variant="secondary">{feature.badge}</Badge>
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scaling" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="w-6 h-6 text-green-600" />
                      <CardTitle>Vertical Scaling</CardTitle>
                    </div>
                    <CardDescription>
                      Scale compute (CPU/RAM) and storage independently to match your application demand
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>CPU Cores</span>
                        <Badge>1-32 cores</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>RAM</span>
                        <Badge>1GB-256GB</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Storage</span>
                        <Badge>10GB-10TB</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Users className="w-6 h-6 text-purple-600" />
                      <CardTitle>Horizontal Scaling</CardTitle>
                    </div>
                    <CardDescription>
                      Add replicas and nodes for high availability and read scaling
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Read Replicas</span>
                        <Badge>0-15 replicas</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Cluster Nodes</span>
                        <Badge>3-9 nodes</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Auto-failover</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Archive className="w-6 h-6 text-blue-600" />
                    <CardTitle>Automated Backup & Point-In-Time Recovery</CardTitle>
                  </div>
                  <CardDescription>
                    Comprehensive backup strategy ensuring your data is always protected and recoverable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <RefreshCw className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Scheduled Backups</h4>
                      <p className="text-sm text-slate-600">Automated daily/weekly backups</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Database className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold">On-Demand Snapshots</h4>
                      <p className="text-sm text-slate-600">Instant manual backups</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Activity className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold">Point-in-Time Restore</h4>
                      <p className="text-sm text-slate-600">Restore to any moment</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Server className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-semibold">Backup to New DB</h4>
                      <p className="text-sm text-slate-600">Create fresh DB from backup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                    <CardTitle>Monitoring & Performance Insights</CardTitle>
                  </div>
                  <CardDescription>
                    Integrated monitoring tools provide complete visibility into database performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Resource Metrics</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />CPU utilization</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Memory usage</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Storage capacity</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Network I/O</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Query Performance</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Query analytics</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Slow query log</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Execution plans</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Connection metrics</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Health & Alerts</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Health dashboards</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Custom alerts</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Performance trends</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />SLA monitoring</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-6 h-6 text-red-600" />
                    <CardTitle>Secure Access & Networking</CardTitle>
                  </div>
                  <CardDescription>
                    Enterprise-grade security features to protect your data and control access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Access Control</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Role-based access control (RBAC)</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Configurable external access</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />IP whitelisting</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />SSL/TLS encryption</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Networking</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />NodePort networking</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />LoadBalancer support</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Private network exposure</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />VPC integration</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Multi-Cloud Support */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Multi-Cloud & Multi-Region</h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Deploy across any Kubernetes provider for cloud independence and data locality freedom
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cloudProviders.map((provider) => (
              <Card key={provider.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{provider.logo}</div>
                  <h4 className="font-medium">{provider.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">EverestDB Feature Matrix</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-left py-3 px-4">Business Value</th>
                      <th className="text-center py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">1-Click Database Provisioning</td>
                      <td className="py-3 px-4">Instant setup for developers</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Multi-Cloud Deployment</td>
                      <td className="py-3 px-4">No cloud lock-in</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Vertical + Horizontal Scaling</td>
                      <td className="py-3 px-4">Growth support</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Automated Backups & PITR</td>
                      <td className="py-3 px-4">Data safety</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Monitoring & Alerts</td>
                      <td className="py-3 px-4">Health + performance observability</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Secure Networking</td>
                      <td className="py-3 px-4">Enterprise security</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Advanced Config Options</td>
                      <td className="py-3 px-4">Fine-tuning for power users</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">HA & Resilience</td>
                      <td className="py-3 px-4">Reliability in production</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Unified API & UI</td>
                      <td className="py-3 px-4">Simplified management</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Helm + Automation</td>
                      <td className="py-3 px-4">DevOps friendly</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="default">Available</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Simplify Your Database Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've chosen EverestDB for production-grade 
            database management without the complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Database className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
              <Code className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Database className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold text-white">EverestDB</span>
              </div>
              <p className="text-sm">
                Managed Database as a Service that simplifies production database deployment and management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Getting Started</Link></li>
                <li><Link href="#" className="hover:text-white">Tutorials</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 EverestDB. Open-source database management platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}