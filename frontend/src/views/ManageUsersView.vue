<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-ink">Manage Users</h1>
        <p class="text-sm text-ink-soft mt-1">Add, edit, and deactivate staff accounts.</p>
      </div>
      <button class="bg-primary text-primary-text px-4 py-2 rounded-md font-medium text-sm">
        + Invite User
      </button>
    </div>

    <div class="bg-card border border-line rounded-xl p-8 text-center text-ink-soft card-shadow">
      <p>User Management interface goes here.</p>
      <p class="text-xs mt-2">(RBAC endpoints are ready: GET /api/users)</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Fetch users...
});
</script>
