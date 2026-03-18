<template>
  <UHeader>
    <template #title>
      <h1>Jira Poker</h1>
    </template>
    <template #right>
      <div v-if="isAuthenticated" class="flex items-center gap-4 mr-4">
        <UAvatar :src="user?.avatar" :title="user?.name" />
        <span>{{ user?.name }}</span>
        <UButton label="Logout" @click="logout()" />
      </div>
      <UColorModeButton title="Toggle Theme" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { clear, loggedIn, user } = useUserSession();

const isAuthenticated = computed(() => loggedIn.value && user.value);

const logout = async () => {
  await clear();
  await navigateTo('/login');
};
</script>
