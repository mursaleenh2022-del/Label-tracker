<template>
  <div class="space-y-6">
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-ink">Manage Categories</h1>
        <p class="text-sm text-ink-soft mt-1">Add, edit, or disable product categories.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="openAddModal" class="btn-primary">
          <Plus class="w-4 h-4 mr-1.5" />
          Add Category
        </button>
      </div>
    </header>

    <div class="bg-card border border-line rounded-xl card-shadow overflow-hidden relative">
      <div v-if="isLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
        <Loader2 class="w-8 h-8 text-amber animate-spin" />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-line text-xs font-semibold text-ink-soft uppercase tracking-wider">
              <th class="px-6 py-3">Category Name</th>
              <th class="px-6 py-3 w-32">Status</th>
              <th class="px-6 py-3 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-line">
            <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <span class="text-sm font-medium text-ink">{{ category.name }}</span>
              </td>
              <td class="px-6 py-4">
                <span v-if="category.isActive" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-bg text-success-text border border-success/20">
                  Active
                </span>
                <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300">
                  Inactive
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="openEditModal(category)" class="text-ink-soft hover:text-ink p-1 transition-colors" title="Edit">
                  <Edit2 class="w-4 h-4" />
                </button>
                <button @click="deleteCategory(category.id)" class="text-ink-soft hover:text-red p-1 transition-colors ml-2" title="Delete">
                  <Trash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr v-if="categories.length === 0 && !isLoading">
              <td colspan="3" class="px-6 py-12 text-center text-sm text-ink-soft">
                No categories found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-card w-full max-w-md rounded-xl card-shadow border border-line overflow-hidden">
        <div class="px-6 py-4 border-b border-line">
          <h2 class="text-lg font-semibold text-ink">{{ isEditing ? 'Edit Category' : 'Add New Category' }}</h2>
        </div>
        <form @submit.prevent="saveCategory" class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-ink-soft mb-1.5">Category Name</label>
              <input type="text" v-model="form.name" required class="w-full px-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
            </div>
            <div>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="form.isActive" class="rounded border-line text-amber focus:ring-amber" />
                <span class="text-sm text-ink font-medium">Category is Active</span>
              </label>
            </div>
            <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
          </div>
          <div class="mt-8 flex justify-end space-x-3">
            <button type="button" @click="showModal = false" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Category' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-vue-next';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const categories = ref([]);
const isLoading = ref(true);
const error = ref('');

const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const form = ref({ id: null, name: '', isActive: true });

const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(`${API_URL}/api/categories`, { credentials: 'include' });
    if (res.ok) categories.value = await res.json();
  } catch (e) {
    console.error("Failed to load categories");
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchCategories);

const openAddModal = () => {
  isEditing.value = false;
  form.value = { id: null, name: '', isActive: true };
  error.value = '';
  showModal.value = true;
};

const openEditModal = (category) => {
  isEditing.value = true;
  form.value = { ...category };
  error.value = '';
  showModal.value = true;
};

const saveCategory = async () => {
  isSaving.value = true;
  error.value = '';
  try {
    const endpoint = isEditing.value ? `${API_URL}/api/categories/${form.value.id}` : `${API_URL}/api/categories`;
    const res = await fetch(endpoint, {
      method: isEditing.value ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form.value)
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to save');
    }
    
    await fetchCategories();
    showModal.value = false;
  } catch (err) {
    error.value = err.message;
  } finally {
    isSaving.value = false;
  }
};

const deleteCategory = async (id) => {
  if (!confirm('Are you sure you want to delete this category?')) return;
  try {
    const res = await fetch(`${API_URL}/api/categories/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to delete');
    }
    await fetchCategories();
  } catch (err) {
    alert(err.message);
  }
};
</script>
