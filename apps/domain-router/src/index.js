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
		try {
			const url = new URL(request.url);
			const origin = ORIGINS[url.hostname];

			if (!origin) {
				return new Response('Not found', {
					status: 404,
					headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
				});
			}

			let upstreamUrl;
			if (url.pathname === '/blog' || url.pathname.startsWith('/blog/')) {
				const blogPath = url.pathname.replace(/^\/blog/, '') || '/';
				upstreamUrl = `${origin.blog}${blogPath}${url.search}`;
			} else {
				upstreamUrl = `${origin.landing}${url.pathname}${url.search}`;
			}

			return await fetch(new Request(upstreamUrl, request), { redirect: 'manual' });
		} catch (err) {
			console.error('domain-router error:', err);
			return new Response('Bad Gateway', {
				status: 502,
				headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
			});
		}
	},
};
