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
		let upstreamUrl;
		try {
			const url = new URL(request.url);
			const origin = ORIGINS[url.hostname];

			if (!origin) {
				return new Response('Not found', {
					status: 404,
					headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
				});
			}

			if (url.pathname === '/blog' || url.pathname.startsWith('/blog/')) {
				const blogPath = url.pathname.replace(/^\/blog/, '') || '/';
				upstreamUrl = `${origin.blog}${blogPath}${url.search}`;
			} else {
				upstreamUrl = `${origin.landing}${url.pathname}${url.search}`;
			}

			const isBlog = url.pathname === '/blog' || url.pathname.startsWith('/blog/');
			const resp = await fetch(new Request(upstreamUrl, request), { redirect: 'manual' });

			if (isBlog && resp.status >= 300 && resp.status < 400) {
				const location = resp.headers.get('Location');
				if (location) {
					let rewritten;
					try {
						const loc = new URL(location, upstreamUrl);
						rewritten = `${url.origin}/blog${loc.pathname}${loc.search}`;
					} catch {
						rewritten = `/blog${location}`;
					}
					const headers = new Headers(resp.headers);
					headers.set('Location', rewritten);
					return new Response(resp.body, { status: resp.status, headers });
				}
			}

			return resp;
		} catch (err) {
			console.error('domain-router error:', {
				error: err?.message || String(err),
				requestUrl: request.url,
				upstreamUrl: upstreamUrl || 'not computed',
			});
			return new Response('Bad Gateway', {
				status: 502,
				headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
			});
		}
	},
};
