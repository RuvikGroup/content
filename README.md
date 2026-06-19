# ruvikgroup/content

Monorepo for AsiaFlare and LatinFlare content sites, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Structure

```
apps/
  asiaflare-docs/     — AsiaFlare documentation site (Starlight)
packages/
  shared-ui/          — Shared Astro component library (Phase 2+)
  shared-config/      — Shared Starlight/Astro config (Phase 2+)
  cms-config/         — DecapCMS configuration (Phase 2+)
```

## Requirements

- Node 20+
- pnpm 9+

## Getting started

```bash
pnpm install
pnpm build          # or: turbo run build
```

## Dev

```bash
turbo run dev
```
