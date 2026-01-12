# vvSushii Website

Personal website for vvSushii - a gaming and streaming content creator.

## Tech Stack

- **[Hugo](https://gohugo.io/)** - Static site generator (extended version required)
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Alpine.js](https://alpinejs.dev/)** - Lightweight JavaScript framework for interactivity

## Features

- Responsive design with mobile-first approach
- Dynamic schedule with timezone support
- Steam-powered game library using Steam CDN
- YouTube clips integration
- Custom emote system
- Live stream status indicator
- Animated cloud background effects

## Project Structure

```
sushi/
├── assets/
│   └── css/
│       └── main.css          # Tailwind CSS entry point
├── content/                   # Markdown content pages
├── data/                      # YAML data files
│   ├── emotes.yaml           # Emote definitions
│   ├── games.yaml            # Steam game library
│   ├── schedule.yaml         # Stream schedule
│   └── socials.yaml          # Social media links
├── layouts/                   # Hugo templates
│   ├── _default/             # Default layouts
│   ├── partials/             # Reusable components
│   └── shortcodes/           # Content shortcodes
├── static/
│   └── images/               # Static assets
└── hugo.toml                 # Hugo configuration
```

## Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.120.0+)
- [Node.js](https://nodejs.org/) (v18+)
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Production build
npm run build

# Or directly with Hugo
hugo --minify
```

## Deployment

This site is deployed via GitHub Pages using GitHub Actions. Pushes to the `main` branch trigger automatic builds and deployment.

## License

This project is proprietary software. See [LICENSE.md](LICENSE.md) for details.
