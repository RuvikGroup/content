/**
 * GitHub OAuth proxy for Decap CMS.
 *
 * Decap CMS requires a backend server to exchange the GitHub authorization
 * code for an access token (client_secret cannot be exposed in the browser).
 * This Worker handles that exchange and returns the token via postMessage.
 *
 * Endpoints:
 *   GET /auth            → redirect to GitHub OAuth authorize
 *   GET /callback        → exchange code for token, close popup via postMessage
 */

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const SCOPES = 'repo,user';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/auth') {
      return handleAuth(url, env);
    }

    if (path === '/callback') {
      return handleCallback(url, env);
    }

    return new Response('Not found', { status: 404 });
  },
};

function handleAuth(url, env) {
  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/callback`;

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: SCOPES,
    state,
  });

  return Response.redirect(`${GITHUB_OAUTH_URL}?${params}`, 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const redirectUri = `${url.origin}/callback`;

  if (error) {
    return postMessageResponse('error', error);
  }

  if (!code) {
    return postMessageResponse('error', 'Missing authorization code');
  }

  let token;
  try {
    const response = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return postMessageResponse('error', data.error_description || data.error);
    }

    token = data.access_token;
  } catch (err) {
    return postMessageResponse('error', 'Failed to exchange code for token');
  }

  return postMessageResponse('success', { token, provider: 'github' });
}

function postMessageResponse(status, data) {
  const message =
    typeof data === 'string'
      ? `authorization:github:${status}:${data}`
      : `authorization:github:${status}:${JSON.stringify(data)}`;

  const html = `<!doctype html>
<html>
<head><title>Authenticating…</title></head>
<body>
<script>
  (function () {
    function send(msg) {
      if (window.opener) {
        window.opener.postMessage(msg, '*');
      }
      window.close();
    }
    send(${JSON.stringify(message)});
  })();
</script>
<p>Authentication complete. You can close this window.</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
