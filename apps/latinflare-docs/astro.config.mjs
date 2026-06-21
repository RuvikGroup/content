// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.latinflareapp.com',
	integrations: [
		starlight({
			title: 'LatinFlare Help Centre',
			description: 'Help and guides for LatinFlare dating app',
			logo: {
				light: './src/assets/logo/light.svg',
				dark: './src/assets/logo/dark.svg',
				alt: 'LatinFlare',
				replacesTitle: true,
			},
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'link',
					attrs: { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', href: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
				},
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
				},
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#4F378B' },
				},
			],
			social: [
				{ icon: 'x.com', label: 'X / Twitter', href: 'https://x.com/latinflare' },
				{ icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/latinflareapp' },
				{ icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/latinflareapp' },
			],
			sidebar: [
				{ label: 'Getting Started', autogenerate: { directory: 'getting-started' } },
				{ label: 'Matching & Discovery', autogenerate: { directory: 'matching-discovery' } },
				{ label: 'Subscriptions & Billing', autogenerate: { directory: 'subscriptions-billing' } },
				{ label: 'Account', autogenerate: { directory: 'account' } },
				{ label: 'Troubleshooting', autogenerate: { directory: 'troubleshooting' } },
				{ label: 'Your Profile', autogenerate: { directory: 'your-profile' } },
				{ label: 'Safety', autogenerate: { directory: 'safety' } },
				{ label: 'Getting Matches', autogenerate: { directory: 'getting-matches' } },
			],
		}),
	],
});
