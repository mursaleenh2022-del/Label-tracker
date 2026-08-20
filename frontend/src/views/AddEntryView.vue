<template>
  <div class="max-w-5xl mx-auto space-y-8">
    
    <header class="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-ink">Log Label Entries</h1>
        <p class="text-sm text-ink-soft mt-1">Upload or paste images/PDFs to extract data automatically.</p>
      </div>
      
      <!-- Mode Toggle -->
      <div class="mt-4 sm:mt-0 flex p-1 bg-gray-100 rounded-lg border border-line">
        <button @click="mode = 'single'" :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-colors', mode === 'single' ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink']">
          Single Label
        </button>
        <button @click="mode = 'batch'" :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-colors', mode === 'batch' ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink']">
          Batch Mode
        </button>
      </div>
    </header>

    <div class="bg-card border border-line rounded-xl card-shadow overflow-hidden">
      
      <!-- ALWAYS VISIBLE UPLOAD ZONE -->
      <div class="p-6 border-b border-line bg-gray-50/50">
        <div class="relative group cursor-pointer" @click="$refs.fileInput.click()">
          <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*,application/pdf" :multiple="mode === 'batch'" class="hidden" />
          
          <div class="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 border-line hover:border-ink-soft bg-white">
            <div class="flex flex-col items-center justify-center space-y-3">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <Camera class="w-5 h-5 text-ink-soft" />
              </div>
              <div>
                <p class="text-sm font-medium text-ink">
                  Click to upload, or Paste (Ctrl+V) {{ mode === 'batch' ? 'multiple labels' : 'a label' }}
                </p>
                <p class="text-xs text-muted mt-1">
                  {{ mode === 'batch' ? 'You can keep adding more files while others are processing.' : 'Instant AI extraction for a single entry' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Processing Queue Status -->
        <div v-if="processingQueue.length > 0" class="mt-4 p-4 bg-amber/5 border border-amber/20 rounded-lg flex flex-col space-y-2">
          <div class="flex items-center space-x-3">
            <Sparkles class="w-5 h-5 text-amber animate-pulse shrink-0" />
            <p class="text-sm font-medium text-amber-dark">
              AI Processing Queue: {{ processingQueue.length }} file(s) remaining...
            </p>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div class="bg-amber h-1.5 rounded-full transition-all duration-300" style="width: 100%; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
          </div>
        </div>

        <div v-if="uploadError" class="mt-4 p-3 bg-danger-bg border border-red/20 rounded-md flex items-start space-x-3">
          <AlertCircle class="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <p class="text-sm text-danger-text">{{ uploadError }}</p>
        </div>
        
        <div v-if="mergeNotice" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p class="text-sm text-blue-800">{{ mergeNotice }}</p>
        </div>
      </div>

      <!-- SINGLE MODE UI -->
      <form v-if="mode === 'single'" @submit.prevent="submitSingleEntry" class="p-6 space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div class="md:col-span-4 space-y-1.5">
            <label class="text-xs font-medium text-ink-soft">Date Received</label>
            <div class="relative">
              <input type="date" v-model="singleForm.date" required class="w-full pl-10 pr-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
              <Calendar class="w-4 h-4 text-muted absolute left-3 top-2.5" />
            </div>
          </div>
          <div class="md:col-span-6 space-y-1.5">
              <label class="text-xs font-medium text-ink-soft">Product Name</label>
              <div class="relative">
                <select v-model="singleForm.productId" required :class="['w-full pl-10 pr-3 py-2 bg-white border border-line rounded-md text-sm input-ring appearance-none', singleForm.productId ? 'text-ink' : 'text-muted']">
                  <option value="" disabled>Select a product...</option>
                  <option v-for="p in products" :key="p.id" :value="p.id" class="text-ink">{{ p.name }}</option>
                </select>
                <Package class="w-4 h-4 text-muted absolute left-3 top-2.5 pointer-events-none" />
                <ChevronDown class="w-4 h-4 text-muted absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>
            <div class="md:col-span-2 space-y-1.5">
              <label class="text-xs font-medium text-ink-soft">Category</label>
              <div class="w-full px-3 py-2 bg-gray-50 border border-line rounded-md text-sm text-ink-soft h-9 flex items-center">
                {{ products.find(p => p.id === singleForm.productId)?.categoryRel?.name || '-' }}
              </div>
            </div>
          </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div class="md:col-span-4 space-y-1.5">
            <label class="text-xs font-medium text-ink-soft">Quantity</label>
            <div class="relative">
              <input type="number" v-model="singleForm.qty" min="1" required class="w-full pl-10 pr-3 py-2 bg-white border border-line rounded-md text-sm font-mono text-ink input-ring" />
              <Hash class="w-4 h-4 text-muted absolute left-3 top-2.5" />
            </div>
          </div>
          <div class="md:col-span-8 space-y-1.5">
            <label class="text-xs font-medium text-ink-soft">Address / Tracking Ref (Optional)</label>
            <input type="text" v-model="singleForm.reference" placeholder="e.g. 1Z99999 or John Doe, NY" class="w-full px-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
          </div>
        </div>
        <div class="pt-2 border-t border-line mt-6 flex items-center justify-end space-x-3">
          <button type="button" class="btn-secondary" @click="resetSingleForm">Clear</button>
          <button type="submit" :disabled="isSaving" class="btn-primary">
            <Loader2 v-if="isSaving" class="w-4 h-4 mr-1.5 animate-spin" />
            <Check v-else class="w-4 h-4 mr-1.5" />
            {{ isSaving ? 'Saving...' : 'Confirm & Save Entry' }}
          </button>
        </div>
      </form>

      <!-- BATCH MODE UI -->
      <div v-if="mode === 'batch' && batchEntries.length > 0" class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-ink">Pending Batch Entries ({{ batchEntries.length }})</h3>
          <button @click="clearBatch" class="text-xs text-red hover:underline">Clear All</button>
        </div>

        <div class="space-y-4">
          <div v-for="(entry, index) in batchEntries" :key="index" class="p-4 bg-gray-50 border border-line rounded-lg relative group">
            <button @click="removeBatchEntry(index)" class="absolute top-2 right-2 p-1 text-muted hover:text-red transition-colors">
              <X class="w-4 h-4" />
            </button>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div class="md:col-span-2 space-y-1.5">
                <label class="text-xs font-medium text-ink-soft">Date</label>
                <div class="relative">
                  <input type="date" v-model="entry.date" required class="w-full pl-8 pr-1 py-1.5 bg-white border border-line rounded-md text-sm text-ink input-ring" />
                  <Calendar class="w-4 h-4 text-muted absolute left-2 top-2" />
                </div>
              </div>
              <div class="md:col-span-4 space-y-1.5">
                <label class="text-xs font-medium text-ink-soft">Product / Label Type</label>
                <div class="relative">
                  <select v-model="entry.productId" required :class="['w-full pl-8 pr-6 py-1.5 bg-white border border-line rounded-md text-sm input-ring appearance-none', entry.productId ? 'text-ink' : 'text-muted']">
                    <option value="" disabled>Select a product...</option>
                    <option v-for="p in products" :key="p.id" :value="p.id" class="text-ink">{{ p.name }}</option>
                  </select>
                  <Package class="w-4 h-4 text-muted absolute left-2 top-2 pointer-events-none" />
                  <ChevronDown class="w-4 h-4 text-muted absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>
              <div class="md:col-span-2 space-y-1.5">
                <label class="text-xs font-medium text-ink-soft">Qty</label>
                <div class="relative">
                  <input type="number" v-model="entry.qty" min="1" required class="w-full pl-8 pr-2 py-1.5 bg-white border border-line rounded-md text-sm font-mono text-ink input-ring" />
                  <Hash class="w-4 h-4 text-muted absolute left-2 top-2" />
                </div>
              </div>
              <div class="md:col-span-4 space-y-1.5">
                <label class="text-xs font-medium text-ink-soft">Address / Reference</label>
                <input type="text" v-model="entry.reference" placeholder="e.g. 1Z9999 or John Doe, NY" class="w-full px-2 py-1.5 bg-white border border-line rounded-md text-sm text-ink input-ring" />
              </div>
            </div>
            <div v-if="entry.aiError" class="mt-2 text-xs text-red flex items-center">
              <AlertCircle class="w-3 h-3 mr-1" /> {{ entry.aiError }}
            </div>
          </div>
        </div>

        <button @click="addManualRow" class="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
          <Plus class="w-4 h-4 mr-1" /> Add another blank row
        </button>

        <div class="pt-6 border-t border-line mt-6 flex items-center justify-end">
          <button @click="submitBatchEntries" :disabled="isSaving || processingQueue.length > 0" class="btn-primary">
            <Loader2 v-if="isSaving" class="w-4 h-4 mr-1.5 animate-spin" />
            <Check v-else class="w-4 h-4 mr-1.5" />
            {{ isSaving ? 'Saving...' : `Confirm & Save Batch (${batchEntries.length})` }}
          </button>
        </div>
      </div>
      
      <div v-if="mode === 'batch' && batchEntries.length === 0 && processingQueue.length === 0" class="p-6">
        <button @click="addManualRow" class="w-full py-4 border-2 border-dashed border-line rounded-lg text-sm font-medium text-ink-soft hover:text-ink hover:border-ink-soft transition-colors flex items-center justify-center">
          <Plus class="w-4 h-4 mr-2" /> Skip AI and enter data manually
        </button>
      </div>

    </div>
    
    <!-- Success Toast -->
    <div v-if="successMsg" class="fixed bottom-4 right-4 bg-ink text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-bottom-4 z-50">
      <CheckCircle class="w-4 h-4 text-green" />
      <span>{{ successMsg }}</span>
    </div>

  </div>
</template>

<script setup>
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Camera, Sparkles, AlertCircle, Calendar, Hash, Package, ChevronDown, Check, CheckCircle, X, Plus, Loader2 } from 'lucide-vue-next';

const mode = ref('single'); // 'single' or 'batch'

const fileInput = ref(null);
const products = ref([]);
const isSaving = ref(false);
const successMsg = ref('');
const uploadError = ref('');
const mergeNotice = ref('');

// Queue State for Non-Blocking Uploads
const processingQueue = ref([]);
const isProcessingQueue = ref(false);

const singleForm = ref({
  date: new Date().toISOString().split('T')[0],
  productId: '',
  qty: '',
  reference: ''
});

const batchEntries = ref([]);
const savedBatch = sessionStorage.getItem('batchQueue');
if (savedBatch) {
  try {
    batchEntries.value = JSON.parse(savedBatch);
  } catch(e) {}
}
watch(batchEntries, (newVal) => {
  sessionStorage.setItem('batchQueue', JSON.stringify(newVal));
}, { deep: true });
const MAX_BATCH_SIZE = 50;
const FREE_TIER_DELAY_MS = 4000;

const handlePaste = (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  const filesToProcess = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith('image/') || item.type === 'application/pdf') {
      const file = item.getAsFile();
      if (file) filesToProcess.push(file);
    }
  }
  
  if (filesToProcess.length > 0) {
    if (mode.value === 'single') {
      processingQueue.value.push(filesToProcess[0]);
    } else {
      processingQueue.value.push(...filesToProcess);
    }
    startQueueProcessor();
  }
};

onMounted(async () => {
  window.addEventListener('paste', handlePaste);
  try {
    const res = await fetch(`${API_URL}/api/products`, { credentials: 'include' });
    if (res.ok) {
      products.value = await res.json();
    }
  } catch (e) {
    console.error("Failed to load products");
  }
});

onUnmounted(() => {
  window.removeEventListener('paste', handlePaste);
});

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    if (mode.value === 'single') {
      processingQueue.value.push(files[0]);
    } else {
      processingQueue.value.push(...files);
    }
    startQueueProcessor();
  }
  if (fileInput.value) fileInput.value.value = '';
};

// --- SINGLE MODE LOGIC ---
const processSingleFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('label', file);

    const res = await fetch(`${API_URL}/api/upload`, {
      credentials: 'include',
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to analyze file');

    // Dynamic Product Injection
    if (data.newlyCreatedProduct && !products.value.some(p => p.id === data.newlyCreatedProduct.id)) {
      products.value.push(data.newlyCreatedProduct);
      products.value.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    }

    singleForm.value.productId = data.suggestedProductId || '';
    singleForm.value.qty = data.suggestedQty || '';
    singleForm.value.reference = data.suggestedReference || '';
  } catch (err) {
    uploadError.value = err.message || 'AI failed. Please fill manually.';
  }
};

// QUEUE PROCESSOR
const startQueueProcessor = async () => {
  if (isProcessingQueue.value) return; // already running
  isProcessingQueue.value = true;
  uploadError.value = '';
  mergeNotice.value = '';

  let duplicatesDropped = 0;

  while (processingQueue.value.length > 0) {
    const file = processingQueue.value[0]; // peek
    const tempDate = new Date().toISOString().split('T')[0];
    
    try {
      const formData = new FormData();
      formData.append('label', file);

      const res = await fetch(`${API_URL}/api/upload`, {
        credentials: 'include',
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to analyze file');

      // Dynamic Product Injection
      if (data.newlyCreatedProduct && !products.value.some(p => p.id === data.newlyCreatedProduct.id)) {
        products.value.push(data.newlyCreatedProduct);
        products.value.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (mode.value === 'single') {
        singleForm.value.productId = data.suggestedProductId || '';
        singleForm.value.qty = data.suggestedQty || '';
        singleForm.value.reference = data.suggestedReference || '';
      } else {
        // EXACT DUPLICATE REJECTION LOGIC
        const isExactDuplicate = batchEntries.value.some(
          e => e.productId === data.suggestedProductId 
            && e.qty == data.suggestedQty
            && e.reference === data.suggestedReference
        );

        if (isExactDuplicate && data.suggestedProductId) {
          duplicatesDropped++;
        } else {
          // Add new row (Address/Reference is different!)
          batchEntries.value.unshift({
            date: tempDate,
            productId: data.suggestedProductId || '',
            qty: data.suggestedQty || '',
            reference: data.suggestedReference || '',
            aiError: ''
          });
        }
      }
    } catch (err) {
      if (mode.value === 'single') {
        uploadError.value = err.message || 'AI failed. Please fill manually.';
      } else {
        batchEntries.value.unshift({
          date: tempDate,
          productId: '',
          qty: '',
          reference: '',
          aiError: err.message || 'AI failed.'
        });
      }
    }
    
    processingQueue.value.shift(); // remove from queue
    
    if (processingQueue.value.length > 0) {
      // Throttle for Free Tier Rate Limits before processing the next one
      await new Promise(resolve => setTimeout(resolve, FREE_TIER_DELAY_MS));
    }
  }
  
  if (duplicatesDropped > 0) {
    mergeNotice.value = `Rejected ${duplicatesDropped} exact duplicate label(s) to prevent double entry.`;
    setTimeout(() => { mergeNotice.value = ''; }, 6000);
  }
  
  isProcessingQueue.value = false;
};

// --- SINGLE MODE LOGIC ---
const resetSingleForm = () => {
  singleForm.value = { date: new Date().toISOString().split('T')[0], productId: '', isUnmatched: false, suggestedNewProductName: '', qty: '', reference: '' };
};

const submitSingleEntry = async () => {
  isSaving.value = true;
  try {
    const res = await fetch(`${API_URL}/api/entries`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(singleForm.value)
    });
    if (!res.ok) throw new Error('Failed to save entry');
    
    successMsg.value = 'Entry saved successfully!';
    setTimeout(() => { successMsg.value = ''; }, 3000);
    resetSingleForm();
  } catch (err) {
    alert(err.message);
  } finally {
    isSaving.value = false;
  }
};

// --- BATCH MODE LOGIC ---
const addManualRow = () => {
  batchEntries.value.unshift({ date: new Date().toISOString().split('T')[0], productId: '', qty: '', reference: '', aiError: '' });
};

const approveProduct = async (entry) => {
  try {
    const res = await fetch(`${API_URL}/api/products`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: entry.suggestedNewProductName, isActive: true })
    });
    if (!res.ok) throw new Error('Failed to create product');
    const newProd = await res.json();
    products.value.push(newProd);
    products.value.sort((a,b) => a.name.localeCompare(b.name));
    entry.productId = newProd.id;
    entry.isUnmatched = false;
  } catch (err) {
    alert('Failed to approve product. You might need to add it manually in the Products tab.');
  }
};

const removeBatchEntry = (index) => {
  batchEntries.value.splice(index, 1);
};
const clearBatch = () => {
  if (confirm('Clear all pending entries?')) batchEntries.value = [];
};

const submitBatchEntries = async () => {
  for (const entry of batchEntries.value) {
    if (!entry.productId || !entry.qty) {
      alert("Please ensure all entries have a Product and a Quantity selected.");
      return;
    }
  }
  isSaving.value = true;
  try {
    for (const entry of batchEntries.value) {
      const res = await fetch(`${API_URL}/api/entries`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: entry.date, productId: entry.productId, qty: entry.qty, reference: entry.reference })
      });
      if (!res.ok) throw new Error('Failed to save some entries');
    }
    successMsg.value = `Successfully saved ${batchEntries.value.length} entries!`;
    setTimeout(() => { successMsg.value = ''; }, 3000);
    batchEntries.value = [];
  } catch (err) {
    alert(err.message);
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
</style>
