import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error(
      'rss.xml: context.site is undefined. Set the `site` field in astro.config.mjs.',
    );
  }
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'LatinFlare Blog',
    description: 'Dating tips, success stories, and guides for Latin singles',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.id}/`,
    })),
  });
}
