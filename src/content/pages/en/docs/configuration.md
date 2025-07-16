---
layout: layouts/base.njk
title: "Configuration Guide"
lang: en
slug: "docs/configuration"
permalink: /en/docs/configuration/
eleventyNavigation:
  key: configuration
  parent: docs
  order: 2
---

# Configuration Guide

This guide covers all the configuration options available for customizing your installation.

## Basic Configuration

### Application Settings

The main configuration file is located at `config/app.json`. Here are the key settings:

```json
{
  "app": {
    "name": "Your App Name",
    "port": 3000,
    "environment": "production",
    "debug": false
  }
}
```

### Database Configuration

Configure your database connection in `config/database.json`:

```json
{
  "database": {
    "type": "postgresql",
    "host": "localhost",
    "port": 5432,
    "name": "myapp_db",
    "user": "dbuser",
    "password": "secure_password"
  }
}
```

## Advanced Configuration

### Authentication Settings

Configure authentication options in `config/auth.json`:

```json
{
  "auth": {
    "sessionTimeout": 3600,
    "tokenExpiry": 86400,
    "requireEmailVerification": true,
    "allowRegistration": true
  }
}
```

### Email Configuration

Set up email services in `config/email.json`:

```json
{
  "email": {
    "provider": "smtp",
    "host": "smtp.gmail.com",
    "port": 587,
    "secure": true,
    "auth": {
      "user": "your-email@gmail.com",
      "pass": "your-app-password"
    }
  }
}
```

## Environment Variables

You can override any configuration using environment variables:

- `APP_PORT`: Override the default port
- `APP_ENV`: Set the environment (development, staging, production)
- `DB_HOST`: Database host
- `DB_USER`: Database username
- `DB_PASS`: Database password

## Configuration Best Practices

1. **Never commit sensitive data**: Use environment variables for passwords and API keys
2. **Use different configs for different environments**: Maintain separate configs for dev, staging, and production
3. **Document your configs**: Add comments to explain non-obvious settings
4. **Validate configurations**: Use the built-in config validator: `npm run validate-config`

## Applying Configuration Changes

After making configuration changes:

1. Stop the application
2. Run `npm run build` to rebuild with new configs
3. Start the application with `npm start`

## Troubleshooting Configuration Issues

If you encounter configuration problems:

1. Check the logs in `logs/app.log`
2. Verify JSON syntax in all config files
3. Ensure environment variables are properly set
4. Run `npm run debug-config` to see the merged configuration

## Next Steps

- Review the [API Documentation](/en/docs/api/) to integrate with external services
- Check out [Tutorials](/en/docs/tutorials/) for common configuration scenarios