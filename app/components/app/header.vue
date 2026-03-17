<template>
  <UHeader>
    <template #title>Jira Poker</template>
    <template #right>
      <UColorModeButton title="Toggle Theme" />
      <UButton v-if="loggedIn" label="Logout" @click="clear()" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { clear, loggedIn } = useUserSession();
</script>
