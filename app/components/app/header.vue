<template>
  <UHeader>
    <template #title>Jira Poker</template>
    <template #right>
      <UColorModeButton title="Toggle Theme" />
      <UButton label="Logout" @click="clear()">Logout</UButton>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { clear } = useUserSession();
</script>
