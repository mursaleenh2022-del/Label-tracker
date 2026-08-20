<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-ink">Manage Roles</h1>
        <p class="text-sm text-ink-soft mt-1">Define custom roles and their default permissions.</p>
      </div>
      <button @click="openCreateModal" class="bg-primary text-primary-text px-4 py-2 rounded-md font-medium text-sm hover:opacity-90">
        + Create Role
      </button>
    </div>

    <!-- Roles Table -->
    <div class="bg-card border border-line rounded-xl overflow-hidden card-shadow">
      <table class="min-w-full divide-y divide-line text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Role Name</th>
            <th class="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-line bg-white">
          <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-ink">{{ role.name }}</div>
            </td>
            <td class="px-6 py-4">
              <span v-if="role.isSystemDefault" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber/10 text-amber border border-amber/20">System Default</span>
              <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-ink-soft border border-line">Custom</span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end space-x-3">
                <button @click="openEditModal(role)" class="text-sm text-primary hover:underline font-medium">Edit</button>
                <button v-if="!role.isSystemDefault" @click="deleteRole(role.id)" class="text-sm text-red hover:underline font-medium">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
      <div class="bg-card w-full max-w-lg rounded-xl card-shadow overflow-hidden border border-line flex flex-col max-h-[90vh]">
        <div class="px-6 py-4 border-b border-line shrink-0">
          <h3 class="text-lg font-semibold text-ink">{{ isEditing ? 'Edit Role' : 'Create Role' }}</h3>
        </div>
        
        <div class="p-6 space-y-4 overflow-y-auto">
          <div v-if="error" class="p-3 bg-red/10 text-red text-sm rounded-md">{{ error }}</div>
          
          <div>
            <label class="block text-sm font-medium text-ink-soft mb-1">Role Name</label>
            <input v-model="form.name" type="text" :disabled="form.isSystemDefault" class="w-full px-3 py-2 border border-line rounded-md bg-gray-50 disabled:opacity-50" placeholder="e.g. Warehouse Staff" />
            <p v-if="form.isSystemDefault" class="text-xs text-amber mt-1">System default roles cannot be renamed.</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-ink-soft mb-3 mt-4">Permissions</label>
            <div class="space-y-3">
              <div v-for="perm in permissions" :key="perm.id" class="flex items-start">
                <div class="flex items-center h-5">
                  <input :id="'perm-' + perm.id" v-model="form.permissionIds" :value="perm.id" type="checkbox" class="w-4 h-4 rounded border-line text-primary focus:ring-primary" />
                </div>
                <div class="ml-3 text-sm">
                  <label :for="'perm-' + perm.id" class="font-medium text-ink">{{ formatPermissionName(perm.key) }}</label>
                  <p class="text-ink-soft text-xs mt-0.5">{{ perm.description || 'Allows access to ' + formatPermissionName(perm.key).toLowerCase() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 bg-gray-50 border-t border-line flex justify-end space-x-3 shrink-0">
          <button @click="showModal = false" class="px-4 py-2 text-sm font-medium text-ink hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
          <button @click="saveRole" class="px-4 py-2 text-sm font-medium bg-primary text-primary-text rounded-md hover:opacity-90">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const formatPermissionName = (key) => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const roles = ref([]);
const permissions = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const error = ref('');

const form = ref({ id: null, name: '', permissionIds: [], isSystemDefault: false });

onMounted(() => {
  fetchRoles();
  fetchPermissions();
});

const fetchRoles = async () => {
  try {
    const res = await fetch(`${API_URL}/api/roles`, { credentials: 'include' });
    if (res.ok) {
      roles.value = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch roles:', err);
  }
};

const fetchPermissions = async () => {
  try {
    const res = await fetch(`${API_URL}/api/permissions`, { credentials: 'include' });
    if (res.ok) {
      permissions.value = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch permissions:', err);
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  error.value = '';
  form.value = { id: null, name: '', permissionIds: [], isSystemDefault: false };
  showModal.value = true;
};

const deleteRole = async (id) => {
  if (!confirm('Are you sure you want to delete this custom role? Users assigned to this role may lose access.')) return;
  
  try {
    const res = await fetch(`${API_URL}/api/roles/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    
    if (res.ok) {
      await fetchRoles();
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to delete role');
    }
  } catch (err) {
    console.error(err);
    alert('Network error while deleting role');
  }
};

const openEditModal = (role) => {
  isEditing.value = true;
  error.value = '';
  form.value = { 
    id: role.id, 
    name: role.name, 
    permissionIds: role.permissions.map(rp => rp.permissionId),
    isSystemDefault: role.isSystemDefault
  };
  showModal.value = true;
};

const saveRole = async () => {
  error.value = '';
  
  if (!form.value.name.trim()) {
    error.value = 'Role name is required.';
    return;
  }
  
  const endpoint = isEditing.value 
    ? `${API_URL}/api/roles/${form.value.id}` 
    : `${API_URL}/api/roles`;
    
  const method = isEditing.value ? 'PUT' : 'POST';
  
  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: form.value.name,
        permissionIds: form.value.permissionIds
      })
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || 'Failed to save role.';
      return;
    }

    await fetchRoles();
    showModal.value = false;
  } catch (err) {
    error.value = 'A network error occurred while saving the role.';
    console.error(err);
  }
};
</script>
