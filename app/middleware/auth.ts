export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, ready } = useUserSession();
  if (!ready.value) return;

  if (!loggedIn.value) {
    return navigateTo('/login');
  }
});
