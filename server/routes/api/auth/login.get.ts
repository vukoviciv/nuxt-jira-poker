export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const state = crypto.randomUUID();

  // store state in session to verify in callback
  await setUserSession(event, { oauthState: state });

  const params = new URLSearchParams({
    audience: 'api.atlassian.com',
    client_id: config.atlassianClientId,
    scope:
      'read:jira-work read:jira-user write:jira-work offline_access read:me',
    redirect_uri: config.atlassianCallbackUrl,
    state,
    response_type: 'code',
    prompt: 'consent',
  });

  return sendRedirect(
    event,
    `https://auth.atlassian.com/authorize?${params.toString()}`,
  );
});
