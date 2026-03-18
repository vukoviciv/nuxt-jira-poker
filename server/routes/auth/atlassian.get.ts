export default defineOAuthAtlassianEventHandler({
  async onSuccess(event, { user }) {
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

// TODO: move this file to server/modules/auth/routes/auth/ and add
//   nitro: {
//     scanDirs: ['server/modules'],
//   }
// to defineNuxtConfig() once the transition to modular monolith starts
