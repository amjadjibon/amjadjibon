# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal blog and portfolio site for Amjad Jibon (amjadjibon.github.io) — a software engineer specializing in Go and distributed systems. Built on [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) v2 with Next.js 16 App Router, Contentlayer2 for MDX content, and TailwindCSS v4.

## Commands

```bash
bun dev           # Start dev server (uses cross-env + next dev)
bun build         # contentlayer2 build → next build → scripts/postbuild.mjs (RSS)
bun serve         # next start (production server)
bun lint          # biome check --write . (formats + lints in one pass)
bun analyze       # Bundle analysis (sets ANALYZE=true)
```

No test suite is configured. There is no `bun test` command.

## Architecture

### Content Pipeline

Blog posts and author profiles are MDX files under `data/` processed by Contentlayer2:

- `data/blog/*.mdx` → `Blog` document type → available as `allBlogs` from `contentlayer/generated`
- `data/authors/*.mdx` → `Authors` document type → available as `allAuthors` from `contentlayer/generated`
- `data/siteMetadata.js` — single source of truth for site-wide config (analytics IDs, social links, comment provider, search provider)

On build, `contentlayer.config.ts` runs two side effects via `onSuccess`:
1. Writes `app/tag-data.json` — tag name → post count map used by `/tags/[tag]`
2. Writes `public/search.json` — search index for kbar (cmd+k search)

`scripts/postbuild.mjs` generates `public/feed.xml` (RSS) after `next build`.

### Rendering Flow

```
data/blog/post.mdx
  → Contentlayer2 (remark/rehype pipeline) → .contentlayer/generated
  → app/blog/[...slug]/page.tsx reads allBlogs, resolves authors
  → picks layout from post frontmatter (PostLayout | PostSimple | PostBanner), defaults to PostLayout
  → MDXLayoutRenderer renders MDX body with custom components from components/MDXComponents.tsx
```

### Path Aliases

Defined in `tsconfig.json` paths — always use these instead of relative imports:

| Alias | Resolves to |
|---|---|
| `@/app/*` | `./app/*` |
| `@/components/*` | `./components/*` |
| `@/data/*` | `./data/*` |
| `@/layouts/*` | `./layouts/*` |
| `@/css/*` | `./css/*` |
| `@/utils/*` | `./utils/*` |
| `contentlayer/generated` | `./.contentlayer/generated` |

### Visual Layer

The root layout (`app/layout.tsx`) renders a full-screen animated Aurora background (`app/components/Aurora.jsx` — an OGL WebGL canvas) fixed at z-0, with a semi-transparent white/black overlay at z-0 to create the frosted glass effect. All content sits at z-10. Fonts are Geist Mono and JetBrains Mono.

### Key Config Files

- `data/siteMetadata.js` — update this to change site title, author info, analytics IDs, comment/search providers
- `data/projectsData.ts` — list of projects shown on `/projects`
- `data/headerNavLinks.ts` — top nav links
- `contentlayer.config.ts` — MDX remark/rehype plugins and document schema

## Writing Blog Posts

Create `data/blog/your-post-slug.mdx` with this frontmatter:

```mdx
---
title: 'Post Title'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2']
draft: false
summary: 'One sentence description.'
authors: ['default']       # optional, resolves to data/authors/default.mdx
layout: 'PostLayout'       # optional: PostLayout | PostSimple | PostBanner
images: ['/static/images/banner.png']  # optional OG image
---
```

Draft posts (`draft: true`) are excluded in production builds.

## Linting & Formatting

Biome handles both formatting and linting. Config in `biome.json`:
- Line width: 100, indent: 2 spaces
- Quotes: single, semicolons: as-needed, trailing commas: ES5
- Import organization is auto-sorted on save/lint

A Husky pre-commit hook runs `lint-staged` which applies `biome check --write` to all staged `*.{js,jsx,ts,tsx,json}` files.

## Environment Variables

Copy `.env.example` to `.env.local`. All variables are optional for local dev:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4
- `NEXT_UMAMI_ID` — Umami analytics  
- `NEXT_PUBLIC_GISCUS_*` — GitHub Discussions-based comments
- `BUTTONDOWN_API_KEY` — Newsletter (configured provider in siteMetadata)
- `EXPORT=true` / `BASE_PATH` / `UNOPTIMIZED=true` — static export flags (for GitHub Pages deployment)

## Deployment

The site deploys to GitHub Pages at `amjadjibon.github.io`. For static export: set `EXPORT=true` and `BASE_PATH` as needed. The `public/` directory contains static assets under `public/static/`.
