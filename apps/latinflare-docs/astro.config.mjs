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
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Setting Up Your Profile', slug: 'setting-up-profile' },
						{ label: 'Adding and Editing Photos', slug: 'adding-photos' },
						{ label: 'Changing Your Location', slug: 'changing-location' },
					],
				},
				{
					label: 'Matching & Discovery',
					items: [
						{ label: 'How Matching Works', slug: 'how-matching-works' },
						{ label: 'Incognito Mode', slug: 'incognito-mode' },
						{ label: 'Credits', slug: 'credits' },
					],
				},
				{
					label: 'Subscriptions & Billing',
					items: [
						{ label: 'Premium Subscription', slug: 'premium-vip' },
						{ label: 'Cancel Subscription', slug: 'cancel-subscription' },
						{ label: 'Restore Purchases', slug: 'restore-purchases' },
					],
				},
				{
					label: 'Account',
					items: [
						{ label: 'Notification Settings', slug: 'notification-settings' },
						{ label: 'Blocking People', slug: 'blocking-people' },
						{ label: 'Reporting', slug: 'reporting' },
						{ label: 'Delete Account', slug: 'delete-account' },
					],
				},
				{
					label: 'Troubleshooting',
					items: [
						{ label: "Can't Log In", slug: 'login-issues' },
						{ label: 'App Not Working', slug: 'app-not-working' },
					],
				},
				{
					label: 'Your Profile',
					items: [
						{ label: 'Choosing Great Photos', slug: 'profile-photos' },
						{ label: 'Writing Your Bio', slug: 'writing-bio' },
						{ label: 'Choosing Preferences', slug: 'choosing-preferences' },
					],
				},
				{
					label: 'Safety',
					items: [
						{ label: 'Staying Safe', slug: 'staying-safe' },
						{ label: 'Spotting Fake Profiles', slug: 'spotting-fake-profiles' },
						{ label: 'Protecting Personal Info', slug: 'protecting-personal-info' },
					],
				},
				{
					label: 'Getting Matches',
					items: [
						{ label: 'Why You\'re Not Getting Matches', slug: 'getting-more-matches' },
						{ label: 'Best Times to Be Active', slug: 'best-times-active' },
						{ label: 'Starting Conversations', slug: 'starting-conversations' },
					],
				},
			],
		}),
	],
});
