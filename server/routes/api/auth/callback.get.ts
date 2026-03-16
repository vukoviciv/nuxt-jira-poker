export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  // 1. get current session to verify state
  const session = await getUserSession(event);

  // 2. verify state matches — prevents CSRF
  if (!query.state || query.state !== session.oauthState) {
    throw createError({ statusCode: 400, message: 'Invalid state parameter' });
  }

  if (!query.code) {
    throw createError({
      statusCode: 400,
      message: 'Missing authorization code',
    });
  }

  // 3. exchange code for tokens
  const tokens = await $fetch<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>('https://auth.atlassian.com/oauth/token', {
    method: 'POST',
    body: {
      grant_type: 'authorization_code',
      client_id: config.atlassianClientId,
      client_secret: config.atlassianClientSecret,
      code: query.code,
      redirect_uri: config.atlassianCallbackUrl,
    },
  });

  // 4. fetch the user's own profile
  const atlassianUser = await $fetch<{
    account_id: string;
    name: string;
    email: string;
    picture: string;
  }>('https://api.atlassian.com/me', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  // 5. store in session
  await clearUserSession(event); // clear previous session data to avoid confusion
  await setUserSession(event, {
    user: {
      atlassianId: atlassianUser.account_id,
      name: atlassianUser.name,
      email: atlassianUser.email,
      avatar: atlassianUser.picture,
    },
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    tokenExpiresAt: Date.now() + tokens.expires_in * 1000,
  });

  const verify = await getUserSession(event);
  console.log('Session after callback:', verify);

  // 6. redirect to home
  return sendRedirect(event, '/');
});
