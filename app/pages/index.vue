<template>
  <div class="h-32">
    {{ loggedIn ? `Logged in as ${user.atlassianId}` : 'Not logged in' }}
    session id: {{ session }}
    <div>
      <NuxtLink href="/api/auth/login">Login with Atlassian</NuxtLink>
    </div>
    <div>
      <button type="button" @click="clear()">Logout</button>
    </div>
  </div>
</template>

<script setup>
const { loggedIn, session, user, ready, clear } = useUserSession();

console.log('User session state:', {
  loggedIn: loggedIn.value,
  user: user.value,
  session: session.value,
  ready: ready.value,
});
</script>
