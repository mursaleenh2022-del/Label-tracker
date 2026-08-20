<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-ink">Manage Users</h1>
        <p class="text-sm text-ink-soft mt-1">Add staff, assign roles, and manage access.</p>
      </div>
      <button @click="openInviteModal" class="bg-primary text-primary-text px-4 py-2 rounded-md font-medium text-sm hover:opacity-90">
        + Invite User
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-card border border-line rounded-xl overflow-hidden card-shadow">
      <table class="min-w-full divide-y divide-line text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">User</th>
            <th class="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-line bg-white">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-ink">{{ user.name }}</div>
              <div class="text-xs text-muted">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-ink-soft border border-line">
                {{ user.roleRelation?.name || 'No Role' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span v-if="user.isActive" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green/10 text-green">Active</span>
              <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red/10 text-red">Inactive</span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end space-x-3">
                <button @click="openEditModal(user)" class="text-sm text-primary hover:underline font-medium">Edit</button>
                <template v-if="user.roleRelation?.name !== 'Admin'">
                  <button @click="toggleActive(user)" class="text-sm font-medium hover:underline" :class="user.isActive ? 'text-amber' : 'text-green'">
                    {{ user.isActive ? 'Deactivate' : 'Reactivate' }}
                  </button>
                  <button @click="deleteUser(user.id)" class="text-sm text-red hover:underline font-medium">Delete</button>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
      <div class="bg-card w-full max-w-md rounded-xl card-shadow overflow-hidden border border-line">
        <div class="px-6 py-4 border-b border-line">
          <h3 class="text-lg font-semibold text-ink">{{ isEditing ? 'Edit User' : 'Invite User' }}</h3>
        </div>
        <div class="p-6 space-y-4">
          <div v-if="error" class="p-3 bg-red/10 text-red text-sm rounded-md">{{ error }}</div>
          
          <div>
            <label class="block text-sm font-medium text-ink-soft mb-1">Name</label>
            <input v-model="form.name" type="text" class="w-full px-3 py-2 border border-line rounded-md bg-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-ink-soft mb-1">Email</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2 border border-line rounded-md bg-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-ink-soft mb-1">Role</label>
            <select v-model="form.roleId" class="w-full px-3 py-2 border border-line rounded-md bg-white">
              <option :value="null">No Role (No Access)</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
            </select>
          </div>
          <div v-if="isEditing" class="flex items-center mt-2">
            <input v-model="form.isActive" type="checkbox" id="isActive" class="w-4 h-4 rounded border-line text-primary focus:ring-primary" />
            <label for="isActive" class="ml-2 text-sm text-ink font-medium">Account Active</label>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t border-line flex justify-end space-x-3">
          <button @click="showModal = false" class="px-4 py-2 text-sm font-medium text-ink hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
          <button @click="saveUser" class="px-4 py-2 text-sm font-medium bg-primary text-primary-text rounded-md hover:opacity-90">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const users = ref([]);
const roles = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const error = ref('');

const form = ref({ id: null, name: '', email: '', roleId: null, isActive: true });

onMounted(() => {
  fetchUsers();
  fetchRoles();
});

const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/api/users`, { credentials: 'include' });
    if (res.ok) {
      users.value = await res.json();
    } else {
      console.error('Failed to load users. Backend returned:', res.status);
    }
  } catch (err) {
    console.error('Network error fetching users:', err);
  }
};

const fetchRoles = async () => {
  try {
    const res = await fetch(`${API_URL}/api/roles`, { credentials: 'include' });
    if (res.ok) {
      roles.value = await res.json();
    } else {
      console.error('Failed to load roles');
    }
  } catch (err) {
    console.error('Network error fetching roles:', err);
  }
};

const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user? Note: Users with existing historical entries cannot be physically deleted. You must deactivate them instead.')) return;
  try {
    const res = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) await fetchUsers();
    else {
      const data = await res.json();
      alert(data.error || 'Failed to delete user');
    }
  } catch(e) { alert('Network error'); }
};

const toggleActive = async (user) => {
  if (!confirm(`Are you sure you want to ${user.isActive ? 'deactivate' : 'reactivate'} ${user.name}?`)) return;
  try {
    const res = await fetch(`${API_URL}/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ roleId: user.roleRelation?.id || null, isActive: !user.isActive })
    });
    if (res.ok) await fetchUsers();
  } catch (err) {
    console.error(err);
  }
};

const openInviteModal = () => {
  isEditing.value = false;
  error.value = '';
  form.value = { id: null, name: '', email: '', roleId: null, isActive: true };
  showModal.value = true;
};

const openEditModal = (user) => {
  isEditing.value = true;
  error.value = '';
  form.value = { 
    id: user.id, 
    name: user.name, 
    email: user.email, 
    roleId: user.roleRelation?.id || null, 
    isActive: user.isActive 
  };
  showModal.value = true;
};

const saveUser = async () => {
  error.value = '';
  
  const endpoint = isEditing.value 
    ? `${API_URL}/api/users/${form.value.id}` 
    : `${API_URL}/api/users`;
    
  const method = isEditing.value ? 'PUT' : 'POST';
  
  const payload = { 
    name: form.value.name, 
    email: form.value.email, 
    roleId: form.value.roleId, 
    isActive: form.value.isActive 
  };

  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || 'Failed to save user.';
      return;
    }

    if (isEditing.value) {
      const originalUser = users.value.find(u => u.id === form.value.id);
      if (originalUser && originalUser.name === localStorage.getItem('userName')) {
        localStorage.setItem('userName', form.value.name);
        window.dispatchEvent(new Event('user-updated'));
      }
    }

    await fetchUsers();
    showModal.value = false;
  } catch (err) {
    error.value = 'A network error occurred while saving the user.';
    console.error(err);
  }
};
</script>
