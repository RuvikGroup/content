// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.asiaflareapp.com',
	redirects: {
		'/setting-up-profile': '/getting-started/setting-up-profile',
		'/adding-photos': '/getting-started/adding-photos',
		'/changing-location': '/getting-started/changing-location',
		'/how-matching-works': '/matching-discovery/how-matching-works',
		'/incognito-mode': '/matching-discovery/incognito-mode',
		'/credits': '/matching-discovery/credits',
		'/premium-vip': '/subscriptions-billing/premium-vip',
		'/cancel-subscription': '/subscriptions-billing/cancel-subscription',
		'/restore-purchases': '/subscriptions-billing/restore-purchases',
		'/notification-settings': '/account/notification-settings',
		'/blocking-people': '/account/blocking-people',
		'/reporting': '/account/reporting',
		'/delete-account': '/account/delete-account',
		'/login-issues': '/troubleshooting/login-issues',
		'/app-not-working': '/troubleshooting/app-not-working',
		'/profile-photos': '/your-profile/profile-photos',
		'/writing-bio': '/your-profile/writing-bio',
		'/choosing-preferences': '/your-profile/choosing-preferences',
		'/staying-safe': '/safety/staying-safe',
		'/spotting-fake-profiles': '/safety/spotting-fake-profiles',
		'/protecting-personal-info': '/safety/protecting-personal-info',
		'/getting-more-matches': '/getting-matches/getting-more-matches',
		'/best-times-active': '/getting-matches/best-times-active',
		'/starting-conversations': '/getting-matches/starting-conversations',
	},
	integrations: [
		starlight({
			title: 'AsiaFlare Help Centre',
			description: 'Help and guides for AsiaFlare dating app',
			logo: {
				light: './src/assets/logo/light.svg',
				dark: './src/assets/logo/dark.svg',
				alt: 'AsiaFlare',
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
					attrs: { name: 'theme-color', content: '#c62828' },
				},
			],
			social: [
				{ icon: 'x.com', label: 'X / Twitter', href: 'https://x.com/asiaflare' },
				{ icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/asiaflareapp' },
				{ icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/asiaflareapp' },
			],
			sidebar: [
				{ label: 'Getting Started', items: [{ autogenerate: { directory: 'getting-started' } }] },
				{ label: 'Matching & Discovery', items: [{ autogenerate: { directory: 'matching-discovery' } }] },
				{ label: 'Subscriptions & Billing', items: [{ autogenerate: { directory: 'subscriptions-billing' } }] },
				{ label: 'Account', items: [{ autogenerate: { directory: 'account' } }] },
				{ label: 'Troubleshooting', items: [{ autogenerate: { directory: 'troubleshooting' } }] },
				{ label: 'Your Profile', items: [{ autogenerate: { directory: 'your-profile' } }] },
				{ label: 'Safety', items: [{ autogenerate: { directory: 'safety' } }] },
				{ label: 'Getting Matches', items: [{ autogenerate: { directory: 'getting-matches' } }] },
			],
		}),
	],
});
