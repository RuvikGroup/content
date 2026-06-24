const ORIGINS = {
	'latinflareapp.com': {
		landing: 'https://web-latinflare-next.pages.dev',
		blog: 'https://ruvikgroup-latinflare-blog.pages.dev',
	},
	'www.latinflareapp.com': {
		landing: 'https://web-latinflare-next.pages.dev',
		blog: 'https://ruvikgroup-latinflare-blog.pages.dev',
	},
	'asiaflareapp.com': {
		landing: 'https://web-asiaflare-next.pages.dev',
		blog: 'https://ruvikgroup-asiaflare-blog.pages.dev',
	},
	'www.asiaflareapp.com': {
		landing: 'https://web-asiaflare-next.pages.dev',
		blog: 'https://ruvikgroup-asiaflare-blog.pages.dev',
	},
};

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const origin = ORIGINS[url.hostname];

		if (!origin) {
			return new Response('Not found', { status: 404 });
		}

		if (url.pathname === '/blog' || url.pathname.startsWith('/blog/')) {
			const blogPath = url.pathname.replace(/^\/blog/, '') || '/';
			return fetch(new Request(`${origin.blog}${blogPath}${url.search}`, request));
		}

		return fetch(new Request(`${origin.landing}${url.pathname}${url.search}`, request));
	},
};
