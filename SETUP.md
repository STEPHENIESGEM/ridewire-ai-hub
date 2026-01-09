# RIDEWIRE AI Hub - Setup & Deployment Guide

**Built on Azure OpenAI Service and Microsoft Infrastructure**  
**Company:** RIDEWIRE LLC | **Founder:** Stephenie N. Lacy | **Contact:** hello@stepheniesgem.io

---

## Quick Start (Local Development)

### Prerequisites
- Node.js v18+ 
- npm v9+
- Git
- Azure OpenAI Service access
- Azure account (for production deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/STEPHENIESGEM/ridewire-ai-hub.git
cd ridewire-ai-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your Azure OpenAI credentials:
```
# Azure OpenAI Service Configuration
AZURE_OPENAI_KEY=your-azure-openai-key-here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_GPT4=gpt-4-deployment-name
AZURE_OPENAI_DEPLOYMENT_GPT4O=gpt-4o-deployment-name
AZURE_OPENAI_DEPLOYMENT_GPT4_TURBO=gpt-4-turbo-deployment-name
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Database Configuration
DATABASE_URL=postgres://username:password@localhost:5432/ridewire

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_change_in_production

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Azure OpenAI Setup

1. **Create Azure OpenAI Resource**
   - Go to Azure Portal (https://portal.azure.com)
   - Create a new Azure OpenAI resource
   - Note your endpoint URL and API key

2. **Deploy Models**
   Deploy the following models in your Azure OpenAI resource:
   - GPT-4 (for strategic analysis)
   - GPT-4o (for deep reasoning)
   - GPT-4 Turbo (for adversarial validation)

3. **Get Deployment Names**
   - Copy your deployment names from Azure Portal
   - Update `.env` file with these deployment names

4. **Initialize database**
```bash
psql -U username -d ridewire -f schema.sql
```

5. **Start the application**

Option A - Backend only:
```bash
npm start
```

Option B - Full stack (Backend + Frontend):
```bash
npm run dev
```

### Access the application
- Frontend: http://localhost:3000
- API: http://localhost:3000/api
- Email Dashboard: http://localhost:3000/email-dashboard

---

## Production Deployment on Azure

### Option 1: Azure App Service (Recommended)

1. **Create Azure App Service**
```bash
az webapp create --resource-group ridewire-rg --plan ridewire-plan --name ridewire-ai-hub --runtime "NODE|18-lts"
```

2. **Configure Environment Variables**
```bash
az webapp config appsettings set --resource-group ridewire-rg --name ridewire-ai-hub --settings \
  AZURE_OPENAI_KEY="your-key" \
  AZURE_OPENAI_ENDPOINT="your-endpoint" \
  DATABASE_URL="your-azure-sql-connection-string"
```

3. **Deploy Code**
```bash
az webapp deployment source config --resource-group ridewire-rg --name ridewire-ai-hub \
  --repo-url https://github.com/STEPHENIESGEM/ridewire-ai-hub --branch main --manual-integration
```

### Option 2: Azure Container Apps

```bash
# Build and push container
docker build -t ridewire-ai-hub .
docker tag ridewire-ai-hub your-registry.azurecr.io/ridewire-ai-hub
docker push your-registry.azurecr.io/ridewire-ai-hub

# Deploy to Azure Container Apps
az containerapp create \
  --name ridewire-ai-hub \
  --resource-group ridewire-rg \
  --image your-registry.azurecr.io/ridewire-ai-hub \
  --environment ridewire-env \
  --ingress external --target-port 3000
```

### Option 3: Azure Static Web Apps + Azure Functions

Deploy frontend as Static Web App and backend as Azure Functions for serverless architecture.

---

## Azure Services Configuration

### Azure SQL Database

1. **Create Azure SQL Database**
```bash
az sql server create --name ridewire-sql --resource-group ridewire-rg --location eastus --admin-user sqladmin --admin-password YourPassword123!
az sql db create --resource-group ridewire-rg --server ridewire-sql --name ridewire-db --service-objective S0
```

2. **Run Schema**
```bash
sqlcmd -S ridewire-sql.database.windows.net -d ridewire-db -U sqladmin -P YourPassword123! -i schema.sql
```

### Azure Storage (For File Uploads)

```bash
az storage account create --name ridewirestorage --resource-group ridewire-rg --location eastus --sku Standard_LRS
```

---

## COCO Email Automation Setup

### Email Service Integration

The COCO email system requires integration with an email service provider. Recommended options:

1. **SendGrid (Azure Marketplace)**
```bash
# Add SendGrid API key to environment
SENDGRID_API_KEY=your-sendgrid-key
```

2. **Azure Communication Services**
```bash
# Setup Azure Communication Services for email
az communication create --name ridewire-comm --resource-group ridewire-rg
```

3. **Manual Approval Flow (Default)**
   - COCO generates drafts
   - Stephenie reviews in approval queue
   - Manual send from email client

---

## Payment Integration (Revenue)

### Stripe Setup
1. Sign up at https://stripe.com
2. Get API keys
3. Add to `.env`:
```
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### Subscription Tiers
- **Free**: Basic intelligence reports
- **Pro**: $9,999/report (30-40 page validated intelligence reports)
- **Enterprise**: Custom pricing for ongoing intelligence

---

## Architecture

```
ridewire-ai-hub/
├── server.js                          # Express backend
├── encryption.js                      # Zero-knowledge encryption
├── multiAIOrchestrator.js            # Azure OpenAI multi-agent orchestration
├── schema.sql                         # PostgreSQL schema
├── package.json                       # Dependencies (includes @azure/openai)
├── .env.example                       # Configuration template
├── backend/
│   └── email-automation/              # COCO Email System
│       ├── coco-email-agent.js       # Main orchestrator
│       ├── email-templates.js        # Template library
│       ├── reply-detector.js         # Reply monitoring
│       ├── draft-generator.js        # Draft creation
│       ├── scheduler.js              # Follow-up timing
│       ├── crm-tracker.js           # CRM tracking
│       └── target-list.json         # Contact database
└── frontend/
    ├── App.jsx                        # React root component
    ├── components/                    # React components
    │   ├── Chat.jsx                  # Azure OpenAI chat interface
    │   ├── Login.jsx                 # Auth
    │   └── Register.jsx              # Registration
    ├── email-dashboard/               # COCO Email Dashboard
    │   ├── Dashboard.js              # Email activity overview
    │   ├── ApprovalQueue.js          # Review drafts
    │   └── ContactList.js            # Contact management
    ├── styles/                        # CSS files
    └── public/
        └── index.html                 # HTML entry point
```

---

## Key Features

✅ Multi-AI Consensus (Azure OpenAI: GPT-4, GPT-4o, GPT-4 Turbo)  
✅ Flip-Flop Adversarial Validation System  
✅ COCO Email Automation (Powered by Azure OpenAI)  
✅ Zero-Knowledge Encryption  
✅ JWT Authentication  
✅ Azure SQL Database / PostgreSQL  
✅ Production-Ready React Frontend  
✅ CRM & Pipeline Tracking  
✅ RESTful API  

---

## Microsoft for Startups

This platform is built entirely on Microsoft Azure infrastructure:
- Azure OpenAI Service for all AI capabilities
- Azure App Service for hosting
- Azure SQL Database for data storage
- GitHub for version control
- VS Code for development

Perfect for Microsoft for Startups program application.

---

## Support & Issues

- GitHub Issues: https://github.com/STEPHENIESGEM/ridewire-ai-hub/issues
- Email: hello@stepheniesgem.io

---

## License

MIT License - See LICENSE file

**RIDEWIRE LLC** | Founded by Stephenie N. Lacy
