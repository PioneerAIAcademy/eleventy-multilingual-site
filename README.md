# Multilingual Eleventy Site

A sample multilingual documentation website built with Eleventy, featuring English and Spanish language support.

## Features

- 🌐 Full multilingual support (English/Spanish)
- 🔍 Browser language detection with automatic redirect
- 🎨 Bootstrap 5 styling
- 📱 Fully responsive design
- 🔄 Language switcher in navigation
- 📑 Separated header and page content
- 🚀 GitHub Actions for automated deployment
- 🔎 SEO optimized with hreflang tags
- 404 pages with language redirect

## Directory Structure

```
src/
├── _data/              # Global data files
│   ├── navigation.yaml # Menu structure for all languages
│   └── site.json      # Site configuration
├── _includes/          # Templates and partials
│   ├── layouts/       # Page layouts
│   └── partials/      # Reusable components
├── content/           # Content files
│   ├── header/        # Header content (stable)
│   │   ├── en/
│   │   └── es/
│   └── pages/         # Page content (frequently updated)
│       ├── en/        # English pages
│       └── es/        # Spanish pages
├── images/            # Language-agnostic images
├── css/               # Stylesheets
├── js/                # JavaScript files
└── index.html         # Root redirect page

```

## Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourorg/yourrepo.git
cd yourrepo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:8080`

## Adding Content

### Adding a New Page

1. Create markdown files in both language directories:
   - `src/content/pages/en/your-page.md`
   - `src/content/pages/es/your-page.md`

2. Add frontmatter with required fields:
```yaml
---
layout: layouts/base.njk
title: "Your Page Title"
lang: en
slug: "your-page"
permalink: /en/your-page/
---
```

3. Update navigation in `src/_data/navigation.yaml` if needed

### Updating Header Content

Edit the header markdown files in:
- `src/content/header/en/header.md`
- `src/content/header/es/header.md`

## Configuration

### Site Configuration

Edit `src/_data/site.json` to update:
- Site title and description
- Available languages
- Default language

### Navigation Menu

Edit `src/_data/navigation.yaml` to modify the menu structure. The structure is identical for all languages, only the text changes.

## Deployment

The site includes GitHub Actions workflow for automatic deployment to GitHub Pages.

1. Push your changes to the `main` branch
2. GitHub Actions will build and deploy the site
3. Access your site at `https://yourusername.github.io/yourrepo/`

To use a custom domain, update the `cname` field in `.github/workflows/build-and-deploy.yml`.

## Best Practices

1. **Content Organization**: Keep header content separate from page content
2. **URL Structure**: Always use language prefix (`/en/`, `/es/`)
3. **Images**: Store in the shared `/images/` directory
4. **SEO**: Ensure all pages have proper meta descriptions and hreflang tags
5. **Navigation**: Keep menu structure consistent across languages

## License

MIT License