# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

vvSushii is a Hugo-based gaming/streaming website with a cute, chibi, girly aesthetic featuring periwinkle blue, hot pink, and sky/cloud themes. Built with Tailwind CSS 4.1.

## Commands

```bash
# Install dependencies
npm install

# Development (runs Tailwind watch + Hugo server concurrently)
npm run dev

# Build for production (compiles CSS + builds Hugo)
npm run build

# Individual commands
npm run css:watch    # Watch and compile Tailwind CSS
npm run css:build    # Build minified CSS
hugo server          # Hugo dev server only

# Create new content
hugo new blog/my-post.md
hugo new games/game-name.md
hugo new clips/clip-name.md
```

## Architecture

### Content Types
- **Blog** (`content/blog/`) - Posts with categories and tags taxonomies
- **Games** (`content/games/`) - Game library with ratings, status, hours played
- **Clips** (`content/clips/`) - Stream clips with Twitch/YouTube embeds

### Data-Driven Content
- `data/socials.yaml` - Social media links with icons
- `data/schedule.yaml` - Stream schedule
- `data/achievements.yaml` - Gaming milestones and stats
- `data/merch.yaml` - Merchandise items

### Layout Structure
- `layouts/_default/baseof.html` - Base template with cloud background
- `layouts/index.html` - Homepage with hero, schedule preview, recent content
- `layouts/_default/{about,schedule,contact,merch}.html` - Custom page layouts
- `layouts/{blog,games,clips}/` - Section-specific list and single templates

### Shortcodes
- `{{</* twitch-embed channel="name" */>}}` or `{{</* twitch-embed clip="slug" */>}}`
- `{{</* youtube-embed id="videoId" */>}}`
- `{{</* game-card name="Game" rating="5" status="playing" */>}}`
- `{{</* achievement title="Title" icon="emoji" description="text" */>}}`
- `{{</* callout type="info|warning|success|tip" */>}}Content{{</* /callout */>}}`

### Tailwind CSS 4.1
Source CSS is in `assets/css/main.css`, compiled to `static/css/main.css`.
Uses the `@theme` directive for configuration:
- Custom colors: `periwinkle-*`, `hotpink-*`, `skyblue-*`, `blush-*`, `lavender-*`
- Custom fonts: `font-display` (Quicksand), `font-body` (Nunito)
- Custom animations: `animate-float`, `animate-drift`, `animate-pulse-soft`
- Utility classes: `.btn-cute`, `.btn-cute-secondary`, `.card-cute`, `.gradient-text`

### Key Partials
- `partials/cloud-bg.html` - Animated floating cloud background
- `partials/header.html` - Navigation with mobile menu (Alpine.js)
- `partials/footer.html` - Footer with social links
- `partials/scripts.html` - Alpine.js and live status checker

## Configuration

Main config in `hugo.toml`:
- Update `params.twitch`, `params.youtube`, `params.tiktok` for social links
- Taxonomies: tags, categories (blog), games (clips)
- Menus: main (navigation), footer

## Adding Content

### New Blog Post
```bash
hugo new blog/my-post.md
```
Front matter: title, date, description, categories, tags, emoji, image

### New Game
```bash
hugo new games/game-name.md
```
Front matter: title, rating (1-5), platform, hours, genre, status (playing/completed/dropped), tags, cover

### New Clip
```bash
hugo new clips/clip-name.md
```
Front matter: title, game, platform (twitch/youtube), twitch_clip or youtube_id, thumbnail
