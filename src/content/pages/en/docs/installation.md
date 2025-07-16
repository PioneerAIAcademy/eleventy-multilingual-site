---
layout: layouts/base.njk
title: "Installation Guide"
lang: en
slug: "docs/installation"
permalink: /en/docs/installation/
eleventyNavigation:
  key: installation
  parent: docs
  order: 2
---

# Installation Guide

This comprehensive guide will walk you through installing our software on various platforms. Choose your preferred installation method below.

## Table of Contents

- [System Requirements](#system-requirements)
- [Quick Start](#quick-start)
- [Installation Methods](#installation-methods)
  - [Docker Installation](#docker-installation)
  - [Manual Installation](#manual-installation)
  - [Platform-Specific Instructions](#platform-specific-instructions)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## System Requirements

Before installing, ensure your system meets these minimum requirements:

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 4GB | 8GB+ |
| Storage | 2GB free space | 10GB+ free space |
| Network | Broadband internet | Broadband internet |

### Software Requirements

- **Operating System**: 
  - Windows 10/11 (64-bit)
  - macOS 10.14 (Mojave) or later
  - Ubuntu 18.04+ / Debian 10+ / RHEL 8+ / CentOS 8+
- **Node.js**: Version 16.0 or higher (18.x recommended)
- **npm**: Version 8.0 or higher
- **Git**: Version 2.0 or higher

## Quick Start

For experienced users, here's the fastest way to get started:

```bash
# Clone the repository
git clone https://github.com/yourorg/yourrepo.git
cd yourrepo

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the application
npm start
```

## Installation Methods

### Docker Installation

Docker provides the easiest and most consistent installation experience across all platforms.

#### Prerequisites

1. Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
2. Ensure Docker is running

#### Using Docker Compose (Recommended)

1. Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  app:
    image: yourorg/yourapp:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    volumes:
      - ./data:/app/data
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

2. Start the services:

```bash
docker-compose up -d
```

3. View logs:

```bash
docker-compose logs -f app
```

#### Using Docker CLI

For a simple setup without a database:

```bash
# Pull the latest image
docker pull yourorg/yourapp:latest

# Run the container
docker run -d \
  --name myapp \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -v $(pwd)/data:/app/data \
  yourorg/yourapp:latest
```

### Manual Installation

Follow these steps for a traditional installation.

#### Step 1: Install Node.js

##### Windows

1. Download the Node.js installer from [nodejs.org](https://nodejs.org/)
2. Run the `.msi` installer
3. Follow the installation wizard
4. Verify installation:

```powershell
node --version
npm --version
```

##### macOS

Using Homebrew:

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

##### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Or use NodeSource repository for latest version
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Step 2: Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/yourorg/yourrepo.git

# Or clone via SSH
git clone git@github.com:yourorg/yourrepo.git

# Navigate to project directory
cd yourrepo
```

#### Step 3: Install Dependencies

```bash
# Install project dependencies
npm install

# If you encounter permission errors on Linux/macOS
sudo npm install --unsafe-perm
```

#### Step 4: Configure Environment

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` with your preferred editor:

```bash
# Linux/macOS
nano .env

# Windows
notepad .env
```

3. Update the configuration values:

```env
# Application Settings
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/myapp

# API Keys
API_KEY=your-api-key-here
SECRET_KEY=your-secret-key-here

# Feature Flags
ENABLE_CACHE=true
ENABLE_LOGGING=true
```

#### Step 5: Database Setup (Optional)

If using a database:

```bash
# Run database migrations
npm run migrate

# Seed sample data (development only)
npm run seed
```

### Platform-Specific Instructions

#### Windows Specific

1. **Enable Developer Mode** (Windows 10/11):
   - Settings → Update & Security → For developers
   - Enable "Developer Mode"

2. **Install Windows Build Tools** (if needed):

```powershell
# Run as Administrator
npm install --global windows-build-tools
```

3. **Configure Windows Defender**:
   - Add project folder to exclusions for better performance

#### macOS Specific

1. **Install Xcode Command Line Tools**:

```bash
xcode-select --install
```

2. **Handle macOS Security**:
   - System Preferences → Security & Privacy
   - Allow apps downloaded from "App Store and identified developers"

#### Linux Specific

1. **Install build essentials**:

```bash
# Ubuntu/Debian
sudo apt-get install build-essential

# RHEL/CentOS
sudo yum groupinstall "Development Tools"
```

2. **Configure firewall** (if needed):

```bash
# Ubuntu with ufw
sudo ufw allow 3000

# CentOS with firewalld
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

## Verification

After installation, verify everything is working correctly:

### 1. Check Service Status

```bash
# Check if the application is running
curl http://localhost:3000/health

# Expected response
{"status":"ok","timestamp":"2024-01-15T10:30:00Z"}
```

### 2. Run Tests

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run all tests with coverage
npm run test:coverage
```

### 3. Access the Application

1. Open your browser
2. Navigate to `http://localhost:3000`
3. You should see the welcome page

### 4. Check Logs

```bash
# View application logs
npm run logs

# Or check log files
tail -f logs/app.log
```

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:

```bash
# Find process using port 3000
# Linux/macOS
lsof -i :3000

# Windows
netstat -ano | findstr :3000

# Kill the process or use a different port
PORT=3001 npm start
```

#### Permission Denied Errors

**Error**: `EACCES: permission denied`

**Solution**:

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

#### Module Not Found

**Error**: `Cannot find module 'xxx'`

**Solution**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Failed

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:

1. Ensure database is running
2. Check connection string in `.env`
3. Verify database credentials
4. Check firewall settings

### Getting Help

If you encounter issues not covered here:

1. Check our [FAQ](/en/docs/faq/)
2. Search [existing issues](https://github.com/yourorg/yourrepo/issues)
3. Join our [Discord community](https://discord.gg/xxxxx)
4. Contact support at support@example.com

## Next Steps

Congratulations! You've successfully installed the application. Here's what to do next:

1. 📖 Read the [Getting Started Guide](/en/docs/getting-started/) to learn the basics
2. ⚙️ Review the [Configuration Guide](/en/docs/configuration/) to customize your setup
3. 🚀 Check out the [Deployment Guide](/en/docs/deployment/) when ready for production
4. 📚 Explore the [API Reference](/en/docs/api/) to integrate with other services

## Additional Resources

- [Video Tutorial: Installation Walkthrough](https://youtube.com/watch?v=xxxxx)
- [Blog Post: Installation Best Practices](https://blog.example.com/installation-tips)
- [Community Forum](https://forum.example.com)

---

*Last updated: January 2024*