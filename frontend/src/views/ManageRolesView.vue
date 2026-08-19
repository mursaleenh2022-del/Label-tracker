<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-ink">Manage Roles</h1>
        <p class="text-sm text-ink-soft mt-1">Define custom roles and their default permissions.</p>
      </div>
      <button class="bg-primary text-primary-text px-4 py-2 rounded-md font-medium text-sm">
        + Create Role
      </button>
    </div>

    <div class="bg-card border border-line rounded-xl p-8 text-center text-ink-soft card-shadow">
      <p>Role Management interface goes here.</p>
      <p class="text-xs mt-2">(RBAC endpoints are ready: GET /api/roles)</p>
    </div>
  </div>
</template>

<script setup>
</script>
