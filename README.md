# 🚀 EverestDB - Managed Database as a Service (DBaaS)

A comprehensive, production-ready Database as a Service platform that provides enterprise-grade database management with developer simplicity. EverestDB offers the power of AWS RDS with open-source flexibility and better cost control.

## ✨ Key Features

### 🎯 **1-Click Database Provisioning**
- Launch managed PostgreSQL, MySQL, and MongoDB clusters in seconds
- No Kubernetes expertise required
- Streamlined setup wizard with real-time progress

### 📈 **Scalable Infrastructure**
- **Vertical Scaling**: CPU, RAM, and storage scaling with sliders
- **Horizontal Scaling**: Read replicas and multi-node clusters
- Real-time cost impact calculation
- Zero-downtime scaling operations

### ☁️ **Multi-Cloud Deployment**
- **AWS EKS**, **GCP GKE**, **Azure AKS** support
- DigitalOcean, Hetzner, and self-hosted Kubernetes
- Cloud independence and data locality freedom
- Region selection for optimal performance

### 💾 **Automated Backups & Point-In-Time Recovery (PITR)**
- Scheduled and on-demand backups
- Restore to any point in time
- Backup-to-new database functionality
- 7-90 day recovery windows

### 📊 **Monitoring & Performance Insights**
- Real-time resource metrics (CPU, Memory, Storage, Connections)
- Query performance analysis
- Health dashboards and alerts
- Interactive time-range selection

### 🔒 **Enterprise Security & Networking**
- Role-based access control (RBAC)
- IP whitelisting and network rules
- SSL/TLS certificate management
- End-to-end encryption (AES-256)
- Comprehensive audit logs

### 🛠 **Advanced Configuration**
- Database parameter tuning
- Resource allocation policies
- Pod scheduling and affinity rules
- Power user customization options

### 🔄 **High Availability & Resilience**
- Automated cluster bootstrapping
- Failover for replicas
- Pod Disruption Budgets
- Continuous WAL backup streaming

### 🎛️ **Unified API & UI Management**
- Clean, intuitive web dashboard
- REST API with comprehensive endpoints
- CLI tool for automation
- One-pane visibility for all databases

### 🚀 **DevOps Friendly**
- Helm charts for deployment
- CI/CD integration
- Automated installs and upgrades
- Infrastructure as Code support

## 🛠 Technology Stack

- **Frontend**: Next.js 16 with App Router, TypeScript 5
- **UI Framework**: Tailwind CSS 4 with shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React hooks and Zustand
- **Forms**: React Hook Form with Zod validation
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js v4
- **Deployment**: Docker containerization with Caddy

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/jitenkr2030/EverestDB.git
cd EverestDB

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application in action.

### Build for Production

```bash
# Build the application
bun run build

# Start production server
bun start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main landing page
│   ├── provision/         # Database provisioning interface
│   ├── scaling/           # Scaling management dashboard
│   ├── monitoring/        # Performance monitoring
│   ├── backup/            # Backup & PITR management
│   ├── security/          # Security & networking
│   └── api-docs/          # API documentation
├── components/
│   └── ui/               # shadcn/ui component library
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## 🎯 Features Overview

### 🏠 **Main Dashboard** (`/`)
- Hero section with value proposition
- Interactive feature showcase
- Database engine selection
- Multi-cloud provider display
- Complete feature matrix

### 🚀 **Database Provisioning** (`/provision`)
- Step-by-step cluster creation wizard
- Database engine selection (PostgreSQL, MySQL, MongoDB)
- Cloud provider and region configuration
- Cluster sizing with real-time pricing
- Connection information and management

### 📊 **Scaling Management** (`/scaling`)
- Vertical scaling controls (CPU, Memory, Storage)
- Horizontal scaling (Replicas, Nodes)
- Cost impact analysis
- High availability configuration

### 📈 **Monitoring Dashboard** (`/monitoring`)
- Real-time performance metrics
- Query performance analysis
- Alert management
- Health monitoring
- Resource utilization tracking

### 💾 **Backup Management** (`/backup`)
- Backup history and scheduling
- Point-in-time recovery interface
- Storage usage monitoring
- Backup configuration settings

### 🔒 **Security Center** (`/security`)
- User access control
- Network security rules
- SSL certificate management
- Encryption settings
- Audit log monitoring

### 📚 **API Documentation** (`/api-docs`)
- REST API reference
- CLI command documentation
- Authentication guides
- Interactive code examples

## 🌟 Business Value

| Feature | Business Value |
|---------|----------------|
| 1-Click Provisioning | Instant setup for developers |
| Multi-Cloud Deployment | No cloud lock-in |
| Vertical + Horizontal Scaling | Growth support |
| Automated Backups & PITR | Data safety |
| Monitoring & Alerts | Health + performance observability |
| Secure Networking | Enterprise security |
| Advanced Configuration | Fine-tuning for power users |
| HA & Resilience | Reliability in production |
| Unified API & UI | Simplified management |
| Helm + Automation | DevOps friendly |

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with your configuration:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# API Configuration
API_BASE_URL="https://api.everestdb.io"
```

### Database Setup

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build Docker image
docker build -t everestdb .

# Run container
docker run -p 3000:3000 everestdb
```

### Production Deployment

The application is optimized for deployment on:
- **Vercel** (Recommended for Next.js)
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **DigitalOcean App Platform**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support and questions:
- 📧 Email: support@everestdb.io
- 💬 Discord: [Join our community](https://discord.gg/everestdb)
- 📖 Documentation: [docs.everestdb.io](https://docs.everestdb.io)

---

**EverestDB** - Enterprise Database Management, Simplified 🚀

Built with ❤️ for the developer community