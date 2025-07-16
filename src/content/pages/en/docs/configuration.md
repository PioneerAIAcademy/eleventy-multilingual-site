---
layout: layouts/base.njk
title: "Configuration Guide"
lang: en
slug: "docs/configuration"
permalink: /en/docs/configuration/
eleventyNavigation:
  key: configuration
  parent: docs
  order: 3
---

# Configuration Guide

This guide covers all configuration options available for customizing your installation. Our application uses a hierarchical configuration system that allows for flexible deployment across different environments.

## Table of Contents

- [Configuration Overview](#configuration-overview)
- [Configuration Files](#configuration-files)
- [Environment Variables](#environment-variables)
- [Application Settings](#application-settings)
- [Database Configuration](#database-configuration)
- [Security Settings](#security-settings)
- [Performance Tuning](#performance-tuning)
- [Advanced Configuration](#advanced-configuration)
- [Configuration Best Practices](#configuration-best-practices)
- [Troubleshooting](#troubleshooting)

## Configuration Overview

Our configuration system follows these principles:

1. **Hierarchical**: Default → Environment → Local → Environment Variables
2. **Type-safe**: All configurations are validated at startup
3. **Hot-reloadable**: Some settings can be changed without restart
4. **Secure**: Sensitive values are encrypted and never logged

### Configuration Loading Order

```mermaid
graph TD
    A[config/default.yaml] --> B[config/production.yaml]
    B --> C[config/local.yaml]
    C --> D[Environment Variables]
    D --> E[Final Configuration]
```

## Configuration Files

### File Structure

```
config/
├── default.yaml          # Default configuration for all environments
├── development.yaml      # Development-specific overrides
├── production.yaml       # Production-specific overrides
├── test.yaml            # Test environment configuration
├── local.yaml           # Local overrides (git-ignored)
└── schema.json          # Configuration schema for validation
```

### Default Configuration

`config/default.yaml`:

```yaml
# Application Settings
app:
  name: "MyApp"
  version: "1.0.0"
  env: "development"
  
# Server Configuration
server:
  host: "0.0.0.0"
  port: 3000
  timeout: 30000
  cors:
    enabled: true
    origins: 
      - "http://localhost:3000"
    credentials: true
    
# Logging Configuration
logging:
  level: "info"
  format: "json"
  outputs:
    - type: "console"
    - type: "file"
      path: "logs/app.log"
      maxSize: "10MB"
      maxFiles: 5
      
# Feature Flags
features:
  registration: true
  api_v2: false
  experimental: false
```

### Environment-Specific Configuration

`config/production.yaml`:

```yaml
# Production overrides
app:
  env: "production"
  
server:
  port: 80
  cors:
    origins:
      - "https://app.example.com"
      - "https://www.example.com"
      
logging:
  level: "warn"
  outputs:
    - type: "file"
      path: "/var/log/myapp/app.log"
      maxSize: "100MB"
      maxFiles: 10
      
# Production-only settings
monitoring:
  enabled: true
  service: "datadog"
  apiKey: "${DATADOG_API_KEY}"
```

## Environment Variables

Environment variables override configuration file values. Use the format `APP_SECTION_KEY`.

### Common Environment Variables

```bash
# Application
APP_NAME="MyApp"
APP_ENV="production"
APP_DEBUG="false"

# Server
SERVER_PORT="3000"
SERVER_HOST="0.0.0.0"
SERVER_TIMEOUT="30000"

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/myapp"
DATABASE_POOL_MIN="2"
DATABASE_POOL_MAX="10"

# Security
JWT_SECRET="your-secret-key"
SESSION_SECRET="another-secret-key"
ENCRYPTION_KEY="32-character-encryption-key-here"

# External Services
REDIS_URL="redis://localhost:6379"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Feature Flags
FEATURE_API_V2="true"
FEATURE_EXPERIMENTAL="false"
```

### Loading Environment Variables

```bash
# Using .env file (development)
cp .env.example .env
source .env

# Using system environment (production)
export DATABASE_URL="postgresql://..."

# Using Docker
docker run -e DATABASE_URL="postgresql://..." myapp

# Using Docker Compose
environment:
  - DATABASE_URL=${DATABASE_URL}
  - REDIS_URL=${REDIS_URL}
```

## Application Settings

### Basic Configuration

```yaml
app:
  # Application name (displayed in UI and logs)
  name: "MyApp"
  
  # Version (updated during build)
  version: "1.0.0"
  
  # Environment (development, staging, production)
  env: "production"
  
  # Debug mode (verbose logging, detailed errors)
  debug: false
  
  # Timezone for scheduling and logging
  timezone: "UTC"
  
  # Locale for internationalization
  locale: "en-US"
```

### API Configuration

```yaml
api:
  # Base URL for API endpoints
  baseUrl: "/api/v1"
  
  # API versioning
  versioning:
    type: "header"  # header, url, or accept
    header: "X-API-Version"
    
  # Rate limiting
  rateLimit:
    enabled: true
    windowMs: 900000  # 15 minutes
    max: 100          # requests per window
    message: "Too many requests"
    
  # Request validation
  validation:
    strict: true
    allowUnknown: false
    stripUnknown: true
```

### Authentication Configuration

```yaml
auth:
  # JWT settings
  jwt:
    secret: "${JWT_SECRET}"
    expiresIn: "7d"
    algorithm: "HS256"
    
  # Session settings
  session:
    secret: "${SESSION_SECRET}"
    resave: false
    saveUninitialized: false
    cookie:
      secure: true      # HTTPS only
      httpOnly: true
      maxAge: 86400000  # 24 hours
      sameSite: "strict"
      
  # OAuth providers
  oauth:
    google:
      clientId: "${GOOGLE_CLIENT_ID}"
      clientSecret: "${GOOGLE_CLIENT_SECRET}"
      callbackUrl: "/auth/google/callback"
    github:
      clientId: "${GITHUB_CLIENT_ID}"
      clientSecret: "${GITHUB_CLIENT_SECRET}"
      callbackUrl: "/auth/github/callback"
```

## Database Configuration

### PostgreSQL Configuration

```yaml
database:
  # Connection URL (overrides individual settings)
  url: "${DATABASE_URL}"
  
  # Individual connection settings
  type: "postgres"
  host: "localhost"
  port: 5432
  database: "myapp"
  username: "${DB_USER}"
  password: "${DB_PASS}"
  
  # Connection pool settings
  pool:
    min: 2
    max: 10
    acquireTimeout: 30000
    idleTimeout: 10000
    
  # Query settings
  query:
    timeout: 30000
    debug: false
    
  # Migrations
  migrations:
    directory: "./migrations"
    tableName: "migrations"
    
  # SSL/TLS settings
  ssl:
    enabled: true
    rejectUnauthorized: true
    ca: "${DB_SSL_CA}"
    cert: "${DB_SSL_CERT}"
    key: "${DB_SSL_KEY}"
```

### MongoDB Configuration

```yaml
database:
  type: "mongodb"
  url: "${MONGODB_URL}"
  
  # Connection options
  options:
    useNewUrlParser: true
    useUnifiedTopology: true
    maxPoolSize: 10
    minPoolSize: 2
    
  # Database and collection names
  database: "myapp"
  collections:
    users: "users"
    sessions: "sessions"
    logs: "logs"
```

### Redis Configuration

```yaml
redis:
  # Connection URL
  url: "${REDIS_URL}"
  
  # Individual settings
  host: "localhost"
  port: 6379
  password: "${REDIS_PASSWORD}"
  db: 0
  
  # Connection options
  options:
    enableReadyCheck: true
    maxRetriesPerRequest: 3
    connectTimeout: 10000
    
  # Usage configuration
  cache:
    ttl: 3600         # 1 hour default TTL
    prefix: "cache:"
    
  sessions:
    ttl: 86400        # 24 hours
    prefix: "sess:"
    
  queues:
    prefix: "queue:"
```

## Security Settings

### General Security

```yaml
security:
  # CORS settings
  cors:
    enabled: true
    origins: 
      - "https://app.example.com"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allowedHeaders: ["Content-Type", "Authorization"]
    exposedHeaders: ["X-Total-Count"]
    credentials: true
    maxAge: 86400
    
  # Content Security Policy
  csp:
    enabled: true
    directives:
      defaultSrc: ["'self'"]
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"]
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]
      imgSrc: ["'self'", "data:", "https:"]
      fontSrc: ["'self'", "https://fonts.gstatic.com"]
      
  # Security headers
  headers:
    xFrameOptions: "DENY"
    xContentTypeOptions: "nosniff"
    xXssProtection: "1; mode=block"
    strictTransportSecurity: "max-age=31536000; includeSubDomains"
    
  # Encryption settings
  encryption:
    algorithm: "aes-256-gcm"
    key: "${ENCRYPTION_KEY}"
```

### API Security

```yaml
security:
  # API key configuration
  apiKeys:
    enabled: true
    header: "X-API-Key"
    
  # Request signing
  signing:
    enabled: true
    algorithm: "hmac-sha256"
    header: "X-Signature"
    
  # IP whitelist/blacklist
  ipFilter:
    enabled: false
    whitelist: []
    blacklist: []
    
  # DDoS protection
  ddos:
    enabled: true
    limit: 100
    duration: 60000
    message: "Too many requests from this IP"
```

## Performance Tuning

### Caching Configuration

```yaml
cache:
  # Cache driver (memory, redis, memcached)
  driver: "redis"
  
  # Default TTL
  ttl: 3600
  
  # Cache key prefix
  prefix: "myapp:"
  
  # Compression
  compression:
    enabled: true
    threshold: 1024  # bytes
    
  # Cache warming
  warming:
    enabled: true
    schedule: "0 */4 * * *"  # Every 4 hours
    keys:
      - "config:*"
      - "translations:*"
```

### Performance Settings

```yaml
performance:
  # Request compression
  compression:
    enabled: true
    level: 6
    threshold: 1024
    
  # Static file serving
  static:
    maxAge: 86400000     # 24 hours
    etag: true
    lastModified: true
    
  # Database query optimization
  database:
    queryCache: true
    statementTimeout: 30000
    slowQueryLog: true
    slowQueryThreshold: 5000
    
  # Background jobs
  jobs:
    concurrency: 5
    timeout: 300000      # 5 minutes
    retries: 3
```

## Advanced Configuration

### Microservices Configuration

```yaml
services:
  # Service discovery
  discovery:
    type: "consul"
    host: "consul.service.consul"
    port: 8500
    
  # Service mesh
  mesh:
    enabled: true
    provider: "istio"
    
  # Inter-service communication
  communication:
    timeout: 10000
    retries: 3
    circuitBreaker:
      enabled: true
      threshold: 50
      duration: 60000
```

### Message Queue Configuration

```yaml
queue:
  # Queue driver (redis, rabbitmq, sqs)
  driver: "rabbitmq"
  
  # RabbitMQ settings
  rabbitmq:
    url: "${RABBITMQ_URL}"
    exchange: "myapp"
    exchangeType: "topic"
    
  # Queue definitions
  queues:
    email:
      name: "email-queue"
      durable: true
      priority: 1
    notifications:
      name: "notification-queue"
      durable: true
      priority: 2
      
  # Worker configuration
  workers:
    concurrency: 10
    prefetch: 2
```

### Monitoring and Observability

```yaml
monitoring:
  # Metrics collection
  metrics:
    enabled: true
    provider: "prometheus"
    port: 9090
    path: "/metrics"
    
  # Distributed tracing
  tracing:
    enabled: true
    provider: "jaeger"
    endpoint: "http://jaeger:14268/api/traces"
    samplingRate: 0.1
    
  # Health checks
  healthCheck:
    enabled: true
    path: "/health"
    interval: 30000
    timeout: 5000
    
  # APM integration
  apm:
    enabled: true
    provider: "newrelic"
    appName: "myapp-production"
    licenseKey: "${NEW_RELIC_LICENSE_KEY}"
```

## Configuration Best Practices

### 1. Security Best Practices

```yaml
# Never commit sensitive data
database:
  password: "${DB_PASSWORD}"  # ✓ Good
  # password: "mysecretpass"   # ✗ Bad

# Use strong encryption
security:
  encryption:
    key: "${ENCRYPTION_KEY}"  # 32+ characters
    
# Rotate keys regularly
auth:
  jwt:
    secret: "${JWT_SECRET_V2}"  # Versioned for rotation
```

### 2. Environment Separation

```yaml
# config/development.yaml
features:
  debug: true
  experimental: true
  
# config/production.yaml  
features:
  debug: false
  experimental: false
```

### 3. Configuration Validation

```javascript
// config/schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["app", "server", "database"],
  "properties": {
    "app": {
      "type": "object",
      "required": ["name", "env"],
      "properties": {
        "name": { "type": "string" },
        "env": { 
          "type": "string",
          "enum": ["development", "staging", "production"]
        }
      }
    }
  }
}
```

### 4. Documentation

```yaml
# Document all configuration options
server:
  # Port number for the HTTP server
  # Default: 3000
  # Environment variable: SERVER_PORT
  port: 3000
  
  # Request timeout in milliseconds
  # Default: 30000 (30 seconds)
  # Environment variable: SERVER_TIMEOUT
  timeout: 30000
```

## Troubleshooting

### Common Configuration Issues

#### Configuration Not Loading

```bash
# Check configuration files are valid YAML
npm run config:validate

# View merged configuration
npm run config:print

# Test specific environment
NODE_ENV=production npm run config:print
```

#### Environment Variables Not Working

```bash
# Check if variables are set
echo $DATABASE_URL

# Debug environment loading
DEBUG=config:* npm start

# Force reload environment
npm run config:reload
```

#### Validation Errors

```
Error: Configuration validation failed
  - app.env: must be one of [development, staging, production]
  - database.pool.max: must be a number
```

Solution: Check your configuration against the schema and fix validation errors.

### Configuration Commands

```bash
# Validate configuration
npm run config:validate

# Print current configuration (redacted)
npm run config:print

# Generate configuration documentation
npm run config:docs

# Encrypt sensitive values
npm run config:encrypt KEY=value

# Decrypt sensitive values
npm run config:decrypt
```

## Next Steps

- Review [Security Best Practices](/en/docs/security/) for hardening your configuration
- Learn about [Deployment](/en/docs/deployment/) for production configurations
- Explore [API Reference](/en/docs/api/) for runtime configuration changes
- Check [Monitoring](/en/docs/monitoring/) for observability configuration

---

*Last updated: January 2024*