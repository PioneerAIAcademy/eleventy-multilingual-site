---
layout: layouts/base.njk
title: "Installation Guide"
lang: en
slug: "docs/installation"
permalink: /en/docs/installation/
eleventyNavigation:
  key: installation
  parent: docs
  order: 1
---

# Installation Guide

This guide will walk you through the process of installing our software on your system.

## System Requirements

Before you begin, ensure your system meets the following requirements:

- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 14.0 or higher
- **Memory**: Minimum 4GB RAM
- **Storage**: At least 500MB of free disk space

## Installation Steps

### Step 1: Download Node.js

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

### Step 2: Clone the Repository

```bash
git clone https://github.com/yourorg/yourrepo.git
cd yourrepo
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment

Copy the example environment file and update it with your settings:

```bash
cp .env.example .env
```

### Step 5: Run the Application

```bash
npm start
```

## Verification

To verify the installation was successful:

1. Open your browser to `http://localhost:3000`
2. You should see the welcome page
3. Check the console for any error messages

## Troubleshooting

### Common Issues

**Issue**: `npm install` fails with permission errors
**Solution**: Try using `npm install --force` or check your npm permissions

**Issue**: Port 3000 is already in use
**Solution**: Change the port in your `.env` file or stop the conflicting service

## Next Steps

Now that you have the software installed, proceed to the [Configuration Guide](/en/docs/configuration/) to customize your setup.