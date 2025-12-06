# ThinkBoard - DevOps CI/CD Pipeline Project

> A collaborative notes web application with automated deployment pipeline

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red.svg)](https://www.jenkins.io/)

---

## Table of Contents

- [About](#about)
- [Team](#team)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Pipeline Workflow](#pipeline-workflow)
- [Branching Strategy](#branching-strategy)
- [Dockerization](#dockerization)
---

## About

**ThinkBoard** is a simple yet powerful web application that enables users to create, manage, and organize notes with titles and content. This project demonstrates modern DevOps practices including:

- ✅ Version control with Git
- ✅ Containerization with Docker
- ✅ Automated CI/CD with Jenkins
- ✅ Full-stack MERN development
- ✅ RESTful API architecture

---

## Team

**Group G5**

| Name | Role |
|------|------|
| Aroued Khelifi | Developer |
| Bacem Touil | Developer |
| Wejden Trabelsi | Developer |
| Yahya Zarred | Developer |

---

##  Features

-  Create and manage notes with title and content
-  Modern, responsive UI with Tailwind CSS
-  Secure MongoDB database integration
-  Fast Redis caching with Upstash
-  Real-time updates
-  Mobile-friendly design
-  Automated deployment pipeline

---

##  Tech Stack

### **Languages & Runtime**
- JavaScript
- Node.js 18+

### **Frontend**
- React
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- Vite

### **Backend**
- Express.js
- Mongoose
- CORS
- dotenv
- Nodemon

### **Database & Cache**
- MongoDB
- Upstash Redis

### **DevOps Tools**
- Git/GitHub
- Docker & Docker Compose
- Jenkins
- Postman (API Testing)

---

##  Architecture

### **Pipeline Tools**

| Tool | Purpose |
|------|---------|
| **Git/GitHub** | Source code management, branch workflow (main, dev, feature), and tag-based versioning |
| **Docker** | Application containerization for consistent execution across environments |
| **Jenkins** | CI/CD automation server orchestrating build, test, and deployment processes |

### **System Architecture**
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │ ───▶ │   Backend   │ ───▶ │   MongoDB   │
│   (React)   │      │  (Express)  │      │  (Database) │
│   Port:3000 │      │  Port:5000  │      │  Port:27017 │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │    Redis    │
                     │   (Cache)   │
                     └─────────────┘
```

---

##  Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git
- Jenkins (optional, for CI/CD)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/thinkboard.git
   cd thinkboard
```

2. **Install dependencies**
```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
```

3. **Configure environment variables**
```bash
   # Create .env file in backend directory
   cp .env.example .env
   
   # Add your configuration
   MONGODB_URI=mongodb://localhost:27017/thinkboard
   REDIS_URL=your_upstash_redis_url
   PORT=5000
```

4. **Run with Docker Compose**
```bash
   docker-compose up -d
```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

---

##  Pipeline Workflow

### Jenkins CI/CD Stages
```
┌──────────────┐
│   Checkout   │  → Pull latest code from Git
└──────┬───────┘
       │
┌──────▼───────┐
│    Setup     │  → Prepare environment & verify tools
└──────┬───────┘
       │
┌──────▼───────┐
│    Build     │  → Build Docker images
└──────┬───────┘
       │
┌──────▼───────┐
│  Run Stack   │  → Start containers (MongoDB, Backend, Frontend)
└──────┬───────┘
       │
┌──────▼───────┐
│ Smoke Tests  │  → Verify all services are running
└──────┬───────┘
       │
┌──────▼───────┐
│   Archive    │  → Save logs and reports
└──────┬───────┘
       │
┌──────▼───────┐
│   Cleanup    │  → Remove containers and unused resources
└──────────────┘
```

### Automated Tests

- ✅ Backend health check
- ✅ Frontend availability check
- ✅ MongoDB container status
- ✅ Backend container status
- ✅ Frontend container status
- ✅ Docker network connectivity

---

##  Branching Strategy

### Branch Structure
```
main (production)
  │
  └── dev (integration)
       │
       ├── backend (server development)
       │
       ├── frontend (client development)
       │
       └── feature/* (new features)
            ├── feature/mongodb-schema
            ├── feature/api-improvements
            └── feature/ui-enhancements
```

### Branch Descriptions

| Branch | Purpose | Protection |
|--------|---------|-----------|
| `main` | Production-ready stable releases | ✅ Protected |
| `dev` | Integration branch for new features | ⚠️ Requires review |
| `backend` | Server-side development | Open |
| `frontend` | Client-side development | Open |
| `feature/*` | Individual feature development | Open |

### Version Tags

- **v1.0** - Initial frontend version
- **v1.0** - Initial backend version
- **v1.1** - Improved backend version
- **v1.0** - First fully working application
- **v1.x** - Feature releases (MongoDB schema, API improvements, UI enhancements)

---

##  Dockerization

### Docker Images
```bash
# List project images
docker images | grep thinkboard

REPOSITORY              TAG        SIZE
thinkboard-frontend     latest     350MB
thinkboard-backend      latest     280MB
thinkboard-mongodb      latest     450MB
```

### Container Architecture
```yaml
Services:
  - thinkboard-mongodb
      ├── Port: 27017
      ├── Volume: mongodb-data
      └── Network: thinkboard-network
      
  - thinkboard-backend
      ├── Port: 5000
      ├── Depends on: mongodb
      └── Network: thinkboard-network
      
  - thinkboard-frontend
      ├── Port: 3000
      ├── Depends on: backend
      └── Network: thinkboard-network
```

### Quick Commands
```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

##  Git Workflow Steps

### Development Process

1. **Frontend Development (v1.0)**
   - Team members commit incremental changes
   - Testing and validation
   - Tag creation: `v1.0-frontend`

2. **Backend Development (v1.0 & v1.1)**
   - Initial implementation (v1.0)
   - Improvements and optimization (v1.1)
   - Tag creation: `v1.0-backend`, `v1.1-backend`

3. **Integration (dev branch)**
   - Create `dev` branch
   - Merge `backend` → `dev`
   - Merge `frontend` → `dev`
   - First working version tag: `v1.0`

4. **Feature Development**
   - Create feature branches
   - Implement features:
     - MongoDB schema optimization
     - API improvements
     - UI enhancements
   - Merge to `dev` after testing

5. **Production Release**
   - Merge `dev` → `main`
   - Tag stable release
   - Deploy to production

---

##  Project Structure
```
thinkboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

##  Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

##  API Endpoints

### Notes API
```
GET    /api/notes          - Get all notes
GET    /api/notes/:id      - Get note by ID
POST   /api/notes          - Create new note
PUT    /api/notes/:id      - Update note
DELETE /api/notes/:id      - Delete note
```

### Health Check
```
GET    /health             - Check API status
```

---

##  Environment Variables

### Backend Configuration
```env
# MongoDB
MONGODB_URI=mongodb://mongodb:27017/thinkboard

# Redis
REDIS_URL=your_upstash_redis_url

# Server
PORT=5000
NODE_ENV=production

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

##  Troubleshooting

### Common Issues

**Port already in use**
```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>
```

**Docker containers not starting**
```bash
# Check logs
docker-compose logs

# Restart services
docker-compose restart
```

**MongoDB connection failed**
```bash
# Verify MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb
```

---

##  Performance Metrics

| Metric | Value |
|--------|-------|
| Build Time | ~3-5 minutes |
| Image Size (Total) | ~1.08 GB |
| Container Startup | ~20 seconds |
| Test Execution | ~10 seconds |
| Deployment Time | ~1 minute |

---

##  Learning Outcomes

This project demonstrates proficiency in:

- ✅ Full-stack JavaScript development (MERN)
- ✅ RESTful API design and implementation
- ✅ Git version control and branching strategies
- ✅ Docker containerization best practices
- ✅ CI/CD pipeline automation with Jenkins
- ✅ DevOps workflow and collaboration
- ✅ Agile development methodology

---

##  Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Jenkins User Handbook](https://www.jenkins.io/doc/book/)

---
<div align="center">

**Made with ❤️ by Group 5**

[⬆ Back to Top](#thinkboard---devops-cicd-pipeline-project)

</div>
