# Multilingual Eleventy Site

A production-ready multilingual documentation website built with Eleventy, featuring English and Spanish language support with a scalable architecture for dozens of languages.

## Table of Contents

- [General Information](#general-information)
- [For Content Editors](#for-content-editors)
- [For Designers & Webmasters](#for-designers--webmasters)
- [For Engineers](#for-engineers)

---

## General Information

### Features

- 🌐 Full multilingual support (English/Spanish, easily extensible)
- 🔍 Browser language detection with automatic redirect
- 🎨 Bootstrap 5 styling with responsive design
- 📱 Mobile-first, fully responsive layout
- 🔄 Language switcher in navigation bar
- 📑 Separated UI strings and content for easy translation
- 🚀 GitHub Actions for automated deployment to GitHub Pages
- 🔎 SEO optimized with hreflang tags and meta descriptions
- ⚡ Automatic path prefix handling for GitHub Pages
- 📝 YAML-based data structure for translation workflows
- 🔧 404 pages with language-aware redirects

### How It Works

1. **Language Detection**: When visitors arrive at the root URL, JavaScript detects their browser language and redirects them to the appropriate language version
2. **Content Separation**: UI strings (navigation, buttons, labels) are stored in YAML files, while page content is in Markdown files
3. **Translation Workflow**: Engineers use translation software to translate YAML files, then content editors review and edit the Markdown content
4. **Automatic Deployment**: Changes pushed to GitHub are automatically built and deployed via GitHub Actions

### Directory Overview

```
src/
├── _data/                    # Data files (YAML configuration)
│   ├── languages/           # UI translations
│   └── config/              # Site configuration
├── _includes/               # Templates
├── content/pages/           # Page content (Markdown)
├── images/                  # Shared images
├── css/                     # Stylesheets
├── js/                      # JavaScript
└── index.html               # Entry point
```

### Prerequisites

- Node.js 16.0 or higher (18.x recommended)
- npm 8.0 or higher
- Git 2.0 or higher
- Basic command line knowledge

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourorg/eleventy-multilingual-site.git
cd eleventy-multilingual-site

# Install dependencies
npm install

# Start development server
npm start

# View at http://localhost:8080
```

---

## For Content Editors

Content editors work exclusively with Markdown files to create and update page content.

### Your Workspace

All your work will be in: `src/content/pages/[language]/`

- English content: `src/content/pages/en/`
- Spanish content: `src/content/pages/es/`

### Editing Existing Pages

1. Navigate to the appropriate language folder
2. Find the `.md` file you want to edit
3. Edit the content below the `---` markers
4. Save your changes

Example page structure:
```markdown
---
layout: layouts/base.njk
title: "About Us"
lang: en
slug: "about"
permalink: /en/about/
---

# About Us

Your content goes here. You can use:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Lists (like this one)

## Subheadings

More content...
```

### Creating New Pages

1. Create a new `.md` file in the appropriate language folder
2. Copy the frontmatter from an existing page
3. Update the title, slug, and permalink
4. Write your content

### Important Guidelines

- **DO NOT** edit anything between the `---` markers unless instructed
- **DO NOT** edit files outside the `content/pages` directory
- **Always** create corresponding pages in all languages
- **Use** relative links for internal pages: `[Installation Guide](/en/docs/installation/)`

### Markdown Reference

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
[Link text](https://example.com)

- Bullet point
- Another point
  - Nested point

1. Numbered list
2. Second item

> Blockquote

`inline code`

```code block```

![Image alt text](/images/filename.jpg)
```

### Working with Images

- Place images in `src/images/`
- Reference them as `/images/filename.jpg`
- Use descriptive filenames: `installation-step-1.png` not `img1.png`
- Optimize images before uploading (keep under 500KB)

---

## For Designers & Webmasters

Designers and webmasters work with templates, styles, and UI configuration.

### Your Workspace

- Templates: `src/_includes/`
- Styles: `src/css/`
- JavaScript: `src/js/`
- UI Strings: `src/_data/languages/[lang]/`
- Navigation: `src/_data/languages/[lang]/navigation.yaml`

### Editing UI Text

All UI text is in YAML files under `src/_data/languages/[lang]/`:

**header.yaml** - Navigation bar text:
```yaml
brandName: "MyDocs"
searchPlaceholder: "Search documentation..."
languageLabel: "Language"
mobileMenuLabel: "Menu"
```

**site.yaml** - Site-wide text:
```yaml
title: "Multilingual Documentation Site"
description: "A sample multilingual documentation site"
copyright: "All rights reserved"
footer:
  aboutText: "About"
  privacyText: "Privacy Policy"
```

### Modifying Navigation

Edit `src/_data/languages/[lang]/navigation.yaml`:
```yaml
items:
  - title: "Home"
    url: "en/"
    slug: "home"
  - title: "Documentation"
    url: "en/docs/"
    slug: "docs"
    subnav:
      - title: "Getting Started"
        url: "en/docs/getting-started/"
        slug: "getting-started"
```

### Working with Templates

Templates use Nunjucks syntax. Main templates:

- `src/_includes/layouts/base.njk` - Main layout
- `src/_includes/partials/header.njk` - Navigation header
- `src/_includes/partials/footer.njk` - Footer

Accessing language data in templates:
```nunjucks
{{ languages[lang].site.title }}
{{ languages[lang].header.brandName }}
{{ languages[lang].navigation.items }}
```

### Styling with CSS

Edit `src/css/style.css`. The site uses Bootstrap 5, so you can:

- Use Bootstrap classes in templates
- Override Bootstrap variables
- Add custom styles

```css
/* Custom primary color */
:root {
  --bs-primary: #your-color;
}

/* Custom component */
.doc-sidebar {
  position: sticky;
  top: 1rem;
}
```

### JavaScript Functionality

Edit `src/js/main.js` for:

- Interactive components
- Form validation
- Dynamic content
- Analytics integration

### Best Practices

1. **Test responsive design** at all breakpoints
2. **Maintain consistency** across languages
3. **Use Bootstrap utilities** before writing custom CSS
4. **Keep accessibility** in mind (ARIA labels, color contrast)
5. **Test all browsers** including mobile

---

## For Engineers

Engineers handle deployment, translations, and technical infrastructure.

### Translation Workflow

When adding a new language:

1. **Create language directory**:
```bash
mkdir -p src/_data/languages/fr
```

2. **Copy English YAML files as base**:
```bash
cp src/_data/languages/en/*.yaml src/_data/languages/fr/
```

3. **Use translation software** to translate YAML files:
   - Export YAML files to translation service
   - Import translated files back
   - Common tools: Crowdin, Lokalise, POEditor

4. **Add language to configuration**:
```yaml
# src/_data/config/languages.yaml
- code: fr
  name: French
  localName: Français
  dir: ltr
  enabled: true
```

5. **Create content structure**:
```bash
mkdir -p src/content/pages/fr/docs
cp -r src/content/pages/en/* src/content/pages/fr/
```

6. **Update translated content permalinks** in frontmatter

### Deployment Configuration

#### GitHub Pages Setup

1. **Repository Settings**:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Branch: Not applicable (using Actions)

2. **Workflow Configuration** (`.github/workflows/build-and-deploy.yml`):
   - Triggered on push to `main`
   - Builds site with path prefix
   - Deploys to GitHub Pages

3. **Custom Domain** (optional):
```yaml
# In workflow file, uncomment and edit:
# cname: yourdomain.com
```

#### Environment Variables

For different environments:
```bash
# Development
npm start

# Production build
PATH_PREFIX=/repo-name/ npm run build

# Custom deployment
PATH_PREFIX=/custom-path/ npm run build
```

### Technical Architecture

#### Data Loading

- `src/_data/languages.js` - Dynamically loads all language YAML files
- `src/_data/config.js` - Loads configuration files
- Files are loaded at build time, not runtime

#### Path Prefix Handling

The site automatically handles GitHub Pages path prefixes:

1. Build-time: `PATH_PREFIX` environment variable
2. Templates: `{{ '/path' | url }}` filter
3. Markdown: Automatic link transformation
4. JavaScript: Dynamic base path detection

#### Build Process

```bash
# Install dependencies
npm install

# Development (with hot reload)
npm start

# Production build
npm run build

# Clean build directory
npm run clean
```

### Monitoring & Maintenance

1. **Check build status** in GitHub Actions tab
2. **Monitor 404s** in GitHub Pages settings
3. **Update dependencies** monthly:
```bash
npm update
npm audit fix
```

### Advanced Configuration

#### Adding Build Steps

Edit `.eleventy.js` to add:
- Custom filters
- Shortcodes
- Plugins
- Build optimizations

#### Performance Optimization

1. **Image optimization**:
```bash
# Add image optimization plugin
npm install @11ty/eleventy-img
```

2. **CSS/JS minification**: Already handled by Eleventy

3. **Caching headers**: Configured in GitHub Pages

### Troubleshooting

**Build fails in GitHub Actions**:
- Check Actions tab for error logs
- Verify YAML syntax
- Ensure no merge conflicts

**Links broken after deployment**:
- Check PATH_PREFIX configuration
- Verify all links use `url` filter
- Test locally with: `PATH_PREFIX=/repo-name/ npm run build`

**Translation issues**:
- Validate YAML syntax: `npx js-yaml src/_data/languages/[lang]/*.yaml`
- Check for missing translations
- Ensure consistent keys across languages

### Security Considerations

1. **No secrets in repository**
2. **Use GitHub Secrets** for API keys
3. **Regular dependency updates**
4. **HTTPS enforced** by GitHub Pages

---

## License

MIT License - see LICENSE file for details

## Support

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourorg/eleventy-multilingual-site/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourorg/eleventy-multilingual-site/discussions)

---

Built with [Eleventy](https://www.11ty.dev/) and [Bootstrap](https://getbootstrap.com/)