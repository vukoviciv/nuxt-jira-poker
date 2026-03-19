import type { AtlassianRawTokens } from '../../modules/auth/auth.types';

export default defineOAuthAtlassianEventHandler({
  async onSuccess(event, { user, tokens }) {
    const t = tokens as unknown as AtlassianRawTokens;
    await setUserSession(event, {
      user: {
        atlassianId: user.account_id,
        name: user.name,
        email: user.email,
        avatar: user.picture,
      },
      secure: {
        accessToken: t.access_token,
        refreshToken: t.refresh_token,
        tokenExpiresAt: Date.now() + (t.expires_in ?? 3600) * 1000,
      },
    });

    return sendRedirect(event, '/');
  },
  onError(event, error) {
    console.error('Atlassian OAuth error:', error);
    return sendRedirect(event, '/');
  },
});
