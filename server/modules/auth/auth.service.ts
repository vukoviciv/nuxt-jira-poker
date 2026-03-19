import type { H3Event } from 'h3';

export async function getValidAccessToken(
  event: H3Event,
): Promise<string | undefined> {
  const session = await getUserSession(event);

  if (Date.now() > (session.secure?.tokenExpiresAt ?? 0)) {
    console.log('Access token expired, refreshing...');
    try {
      const newTokens = await refreshAtlassianToken(
        session.secure?.refreshToken,
      );
      await setUserSession(event, {
        user: session.user,
        secure: {
          accessToken: newTokens.access_token,
          tokenExpiresAt: Date.now() + (newTokens.expires_in ?? 3600) * 1000,
        },
      });
      return newTokens.access_token;
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      return undefined;
    }
  }
  const accessToken = session.secure?.accessToken;

  return accessToken;
}

// TODO: test this function with changing cookie lifetime
async function refreshAtlassianToken(refreshToken?: string): Promise<{
  access_token: string;
  expires_in: number;
  refresh_token: string;
}> {
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const config = useRuntimeConfig();
  const { refresh_token, access_token, expires_in } = await $fetch<{
    refresh_token: string;
    access_token: string;
    expires_in: number;
  }>('https://auth.atlassian.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      grant_type: 'refresh_token',
      client_id: config.oauth.atlassian.clientId,
      client_secret: config.oauth.atlassian.clientSecret,
      refresh_token: refreshToken,
    },
  });

  return { access_token, expires_in, refresh_token };
}
