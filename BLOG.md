# Blog Post Formatting Guide

This guide covers how to create and format blog posts for **AsiaFlare** and **LatinFlare**. Both blogs use [Astro](https://astro.build) content collections with Zod-validated frontmatter.

## Quick Start

1. Create a new file in the appropriate directory:
   - **AsiaFlare:** `apps/asiaflare-blog/src/content/blog/your-post-slug.mdx`
   - **LatinFlare:** `apps/latinflare-blog/src/content/blog/your-post-slug.md`
2. Add the required frontmatter (see below).
3. Write your content in Markdown (or MDX for AsiaFlare).

The filename becomes the URL slug: `best-date-spots-tokyo.mdx` renders at `/best-date-spots-tokyo/`.

## Frontmatter Reference

Every post starts with a YAML frontmatter block between `---` fences.

| Field         | Type       | Required | Default              | Notes                                                       |
|---------------|------------|----------|----------------------|-------------------------------------------------------------|
| `title`       | string     | Yes      | —                    | The post headline                                           |
| `description` | string     | Yes      | —                    | Short excerpt for SEO and card previews                     |
| `pubDate`     | date       | Yes      | —                    | Format: `YYYY-MM-DD`                                        |
| `updatedDate` | date       | No       | —                    | Set when making significant edits after publication         |
| `author`      | string     | No       | `AsiaFlare Team` / `LatinFlare Team` | Override for guest authors            |
| `tags`        | string[]   | No       | `[]`                 | Used for filtering and the topic watermark fallback         |
| `draft`       | boolean    | No       | `false`              | Set `true` to hide from the published blog                  |
| `heroImage`   | string     | No       | —                    | Absolute path (`/images/...`) or full URL                   |
| `flag`        | string     | No       | —                    | Emoji flag displayed on hero and cards (e.g. `"🇯🇵"`)      |
| `location`    | string     | No       | —                    | City or region name shown as a badge and watermark          |

### Frontmatter Example

```yaml
---
title: "Best Date Spots in Tokyo: A Local's Guide"
description: "From hidden izakayas to rooftop gardens — the real Tokyo date spots."
pubDate: 2026-06-23
author: AsiaFlare Team
tags: [dating-tips, travel, culture]
heroImage: "/images/hero-tokyo-dates.jpg"
flag: "🇯🇵"
location: "Tokyo"
---
```

### How `flag` and `location` Render

- **Hero watermark:** The first 3 characters of `location` (uppercased) display as a large decorative abbreviation. Falls back to the first tag or title if `location` is not set.
- **Post cards:** The first 2 characters of `location` are used as the card watermark.
- **Flag overlay:** The `flag` emoji appears as a semi-transparent overlay on hero images, featured sections, and post cards.
- **Location badge:** The full `location` string displays as a metadata badge below the article title.

## File Formats

### Markdown (`.md`)

Use standard Markdown for straightforward posts. This is the default for **LatinFlare**.

Supported syntax:
- Headings (`## H2` through `#### H4`)
- Bold, italic, strikethrough
- Ordered and unordered lists
- Blockquotes (`>`)
- Links and images (`![alt](url)`)
- Code blocks (fenced with triple backticks)
- Horizontal rules (`---`)

See [`examples/example-post.md`](examples/example-post.md) for a complete template.

### MDX (`.mdx`)

MDX extends Markdown with embedded components. This is the default for **AsiaFlare** and is available for any post that needs interactive or rich elements.

MDX files support everything Markdown does, plus JSX component tags. Components are auto-imported from `src/components/mdx/`.

See [`examples/example-post.mdx`](examples/example-post.mdx) for a complete template.

## Available MDX Components

These components are available in AsiaFlare `.mdx` posts:

### `<Callout>`

Highlighted info boxes for tips, warnings, or notes.

```mdx
<Callout type="tip" title="Pro Tip">
  Book restaurants 2-4 weeks in advance for weekend dates.
</Callout>
```

**Props:**
| Prop    | Type   | Values                    | Required |
|---------|--------|---------------------------|----------|
| `type`  | string | `tip`, `info`, `warning`  | Yes      |
| `title` | string | Heading text              | No       |

### `<MapEmbed>`

Embedded OpenStreetMap with caption.

```mdx
<MapEmbed
  src="https://www.openstreetmap.org/export/embed.html?bbox=..."
  title="Location Name"
  height={380}
  caption="Description of the mapped area"
/>
```

**Props:**
| Prop      | Type   | Required |
|-----------|--------|----------|
| `src`     | string | Yes      |
| `title`   | string | Yes      |
| `height`  | number | No       |
| `caption` | string | No       |

### `<AppRating>`

App store style rating display.

```mdx
<AppRating rating={4.8} count={12400} platform="both" appName="AsiaFlare" />
```

**Props:**
| Prop       | Type   | Values                    | Required |
|------------|--------|---------------------------|----------|
| `rating`   | number | 0-5                       | Yes      |
| `count`    | number | Total reviews             | Yes      |
| `platform` | string | `ios`, `android`, `both`  | Yes      |
| `appName`  | string | App display name          | Yes      |

### `<RatingBreakdown>`

Star-by-star rating histogram.

```mdx
<RatingBreakdown overall={4.8} count={12400} breakdown={[9800, 1800, 500, 200, 100]} />
```

**Props:**
| Prop        | Type     | Required |
|-------------|----------|----------|
| `overall`   | number   | Yes      |
| `count`     | number   | Yes      |
| `breakdown` | number[] | Yes      |

The `breakdown` array is ordered 5-star to 1-star: `[five, four, three, two, one]`.

### `<ReviewCard>`

User testimonial card.

```mdx
<ReviewCard author="Kenji T." rating={5} date="May 2026" platform="ios" verified>
  Review text goes here as children content.
</ReviewCard>
```

**Props:**
| Prop       | Type    | Values                   | Required |
|------------|---------|--------------------------|----------|
| `author`   | string  | Reviewer name            | Yes      |
| `rating`   | number  | 0-5                      | Yes      |
| `date`     | string  | Display date             | Yes      |
| `platform` | string  | `ios`, `android`         | Yes      |
| `verified` | boolean | Adds verified badge      | No       |

## Writing Guidelines

- **Slug format:** Use lowercase kebab-case filenames: `best-date-spots-tokyo.mdx`, not `Best Date Spots.mdx`.
- **Hero images:** Place in `public/images/` and reference with an absolute path (`/images/hero-name.jpg`). External URLs also work.
- **Tags:** Use lowercase kebab-case: `dating-tips`, `first-date`, `culture`. The first tag is used as the card topic label.
- **Drafts:** Set `draft: true` to work on a post without it appearing on the live blog. Remove the field or set `false` to publish.
- **Dates:** Always use `YYYY-MM-DD` format. The blog displays dates in `Month Day, Year` format automatically.
- **Reading time:** Calculated automatically from word count (200 words per minute).
