export default defineOAuthAtlassianEventHandler({
  async onSuccess(event, { user, tokens }) {
    console.log('tokens shape:', Object.keys(tokens));

    await setUserSession(event, {
      user: {
        atlassianId: user.account_id,
        name: user.name,
        email: user.email,
        avatar: user.picture,
      },
      // TODO: add accessToken and refreshToken to the session
    });
    return sendRedirect(event, '/');
  },
  onError(event, error) {
    console.error('Atlassian OAuth error:', error);
    return sendRedirect(event, '/');
  },
});
