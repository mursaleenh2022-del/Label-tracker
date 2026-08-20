<template>
  <div class="space-y-8">
    
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-ink">Products</h1>
        <p class="text-sm text-ink-soft mt-1">Manage label types and products available in the system.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="openAddModal" class="btn-primary">
          <Plus class="w-4 h-4 mr-1.5" />
          Add Product
        </button>
      </div>
    </header>

    <!-- Table Section -->
    <div class="bg-card border border-line rounded-xl card-shadow overflow-hidden relative min-h-[400px]">
      
      <!-- Search & Filter Bar -->
      <div class="p-4 border-b border-line flex items-center justify-between bg-gray-50/50">
        <div class="relative w-full max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search products..." class="w-full pl-9 pr-3 py-1.5 bg-white border border-line rounded-md text-sm text-ink input-ring" />
          <Search class="w-4 h-4 text-muted absolute left-3 top-2" />
        </div>
        <button class="btn-secondary ml-3">
          <Filter class="w-4 h-4 mr-1.5 text-muted" />
          Filter
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
        <Loader2 class="w-8 h-8 text-amber animate-spin" />
      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-line text-xs font-semibold text-ink-soft uppercase tracking-wider">
              <th class="px-6 py-3">Product Name</th>
              <th class="px-6 py-3">Category</th>
              <th class="px-6 py-3 w-32">Status</th>
              <th class="px-6 py-3 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-line">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded bg-gray-100 border border-line flex items-center justify-center mr-3 text-muted group-hover:text-ink transition-colors">
                    <Package class="w-4 h-4" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-ink">{{ product.name }}</div>
                    <div class="text-xs text-muted font-mono mt-0.5">ID: PRD-{{ product.id.toString().padStart(4, '0') }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {{ product.category || 'Other' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span v-if="product.isActive" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-bg text-success-text border border-success/20">
                  Active
                </span>
                <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300">
                  Inactive
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="openEditModal(product)" class="text-ink-soft hover:text-ink p-1 transition-colors" title="Edit">
                  <Edit2 class="w-4 h-4" />
                </button>
                <button @click="deleteProduct(product.id)" class="text-ink-soft hover:text-red p-1 transition-colors ml-2" title="Delete">
                  <Trash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0 && !isLoading">
              <td colspan="4" class="px-6 py-12 text-center text-sm text-ink-soft">
                No products found matching your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit/Add Modal Overlay -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-card w-full max-w-md rounded-xl card-shadow border border-line overflow-hidden">
        <div class="px-6 py-4 border-b border-line">
          <h2 class="text-lg font-semibold text-ink">{{ editingProduct ? 'Edit Product' : 'Add New Product' }}</h2>
        </div>
        <form @submit.prevent="saveProduct" class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-ink-soft mb-1.5">Product Name</label>
              <input type="text" v-model="modalForm.name" required placeholder="e.g. Premium Espresso Blend" class="w-full px-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
            </div>
            <div>
              <label class="block text-xs font-medium text-ink-soft mb-1.5">Category</label>
              <select v-model="modalForm.category" required class="w-full px-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring">
                <option value="Perfumes">Perfumes</option>
                <option value="Supplements">Supplements</option>
                <option value="Skincare">Skincare</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div v-if="editingProduct">
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="modalForm.isActive" class="rounded border-line text-amber focus:ring-amber" />
                <span class="text-sm text-ink font-medium">Product is Active</span>
              </label>
            </div>
            <p v-if="modalError" class="text-sm text-red-600 mt-2">{{ modalError }}</p>
          </div>
          <div class="mt-8 flex justify-end space-x-3">
            <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="isSaving">
              <Loader2 v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" />
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

import { ref, onMounted, computed } from 'vue';
import { Plus, Search, Filter, Package, Edit2, Trash2, Loader2 } from 'lucide-vue-next';

const products = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');

// Modal State
const isModalOpen = ref(false);
const editingProduct = ref(null);
const isSaving = ref(false);
const modalError = ref('');
const modalForm = ref({ name: '', category: 'Other', isActive: true });

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(`${API_URL}/api/products`, { credentials: 'include' });
    if (res.ok) {
      products.value = await res.json();
    }
  } catch (e) {
    console.error("Failed to load products");
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProducts);

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const openAddModal = () => {
  editingProduct.value = null;
  modalForm.value = { name: '', category: 'Other', isActive: true };
  modalError.value = '';
  isModalOpen.value = true;
};

const openEditModal = (product) => {
  editingProduct.value = product;
  modalForm.value = { name: product.name, category: product.category || 'Other', isActive: product.isActive };
  modalError.value = '';
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveProduct = async () => {
  isSaving.value = true;
  modalError.value = '';
  
  try {
    const isEditing = !!editingProduct.value;
    const url = isEditing 
      ? `${API_URL}/api/products/${editingProduct.value.id}` 
      : `${API_URL}/api/products`;
      
    const res = await fetch(url, {
      credentials: 'include',
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modalForm.value)
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to save product');
    }
    
    await fetchProducts();
    closeModal();
  } catch (err) {
    modalError.value = err.message;
  } finally {
    isSaving.value = false;
  }
};

const deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return;
  
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to delete product');
    }
    
    await fetchProducts();
  } catch (err) {
    alert(err.message);
  }
};
</script>
