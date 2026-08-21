<template>
  <div class="space-y-8">
    
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-ink">Reports</h1>
        <p class="text-sm text-ink-soft mt-1">Export your formatted Excel tracking sheets or browse history.</p>
      </div>
    </header>

    <!-- Export Box -->
    <div class="bg-card border border-line rounded-xl card-shadow flex flex-col items-center justify-center py-8 px-4 text-center">
      <div class="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-line mb-4">
        <FileSpreadsheet class="w-6 h-6 text-blue-600" />
      </div>
      
      <h3 class="text-lg font-semibold text-ink mb-2">Download Tracking Sheet</h3>
      <p class="text-sm text-ink-soft max-w-md mb-6">Select a date range below to generate a perfectly styled Excel file matching the official tracking format.</p>
      
      <div class="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 p-4 rounded-lg border border-line">
        <div class="flex items-center space-x-2">
          <div class="relative">
            <input type="date" v-model="startDate" class="w-40 pl-9 pr-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
            <Calendar class="w-4 h-4 text-muted absolute left-3 top-2.5" />
          </div>
          <span class="text-muted text-sm font-medium">to</span>
          <div class="relative">
            <input type="date" v-model="endDate" class="w-40 pl-9 pr-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
            <Calendar class="w-4 h-4 text-muted absolute left-3 top-2.5" />
          </div>
        </div>
        
        <button @click="downloadReport" :disabled="isDownloading" class="btn-primary min-w-[140px] ml-2">
          <Loader2 v-if="isDownloading" class="w-4 h-4 mr-2 animate-spin" />
          <Download v-else class="w-4 h-4 mr-1.5" />
          {{ isDownloading ? 'Generating...' : 'Export Excel' }}
        </button>
      </div>
      <div v-if="error" class="mt-4 p-3 bg-danger-bg border border-red/20 rounded-md flex items-start space-x-3 w-full max-w-md">
        <AlertCircle class="w-5 h-5 text-danger shrink-0 mt-0.5" />
        <p class="text-sm text-danger-text text-left">{{ error }}</p>
      </div>
    </div>

    <!-- Historical Data List -->
    <div>
      <h2 class="text-lg font-semibold text-ink mb-4">Historical Records</h2>
      
      <div class="bg-card border border-line rounded-xl card-shadow overflow-hidden">
        <div v-if="isLoadingSummary" class="p-8 flex justify-center">
          <Loader2 class="w-6 h-6 text-amber animate-spin" />
        </div>
        
        <div v-else-if="summaryData.length === 0" class="p-8 text-center text-sm text-ink-soft">
          No historical records found.
        </div>
        
        <div v-else class="divide-y divide-line">
          <div v-for="day in summaryData" :key="day.date" class="group">
            <div @click="toggleDay(day.date)" class="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 cursor-pointer transition-colors">
              <div class="flex items-center space-x-6">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border border-line group-hover:bg-white transition-colors">
                    <CalendarDays class="w-5 h-5 text-muted group-hover:text-amber transition-colors" />
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-ink">{{ formatDate(day.date) }}</h3>
                    <p class="text-xs text-ink-soft mt-0.5">{{ day.totalEntries }} Entries</p>
                  </div>
                </div>
                
                <div class="hidden sm:flex items-center space-x-8 border-l border-line pl-6">
                  <div>
                    <p class="text-[10px] font-semibold text-ink-soft uppercase tracking-wider">Total Quantity</p>
                    <p class="text-sm font-medium text-ink mt-0.5">{{ day.totalQty }} labels</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-semibold text-ink-soft uppercase tracking-wider">Unique Products</p>
                    <p class="text-sm font-medium text-ink mt-0.5">{{ day.uniqueProducts }} products</p>
                  </div>
                </div>
              </div>
              <ChevronDown :class="['w-5 h-5 text-muted transition-transform duration-200', expandedDate === day.date ? 'rotate-180' : '']" />
            </div>
            
            <!-- Expanded Drilldown View -->
            <div v-if="expandedDate === day.date" class="bg-gray-50/30 border-t border-line p-6">
              <div v-if="isLoadingEntries" class="flex justify-center py-4">
                <Loader2 class="w-5 h-5 text-amber animate-spin" />
              </div>
              <div v-else class="bg-white border border-line rounded-lg overflow-hidden card-shadow">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-50/50 border-b border-line text-xs font-semibold text-ink-soft uppercase tracking-wider">
                      <th class="px-4 py-3">Product Name</th>
                      <th class="px-4 py-3">Category</th>
                      <th class="px-4 py-3 text-right">Qty</th>
                      <th class="px-4 py-3">Reference</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-line">
                    <tr v-for="entry in expandedEntries" :key="entry.id" class="hover:bg-gray-50/50">
                      <td class="px-4 py-3 text-sm text-ink">{{ entry.product?.name }}</td>
                      <td class="px-4 py-3 text-sm text-ink-soft">{{ entry.product?.categoryRel?.name || 'Other' }}</td>
                      <td class="px-4 py-3 text-sm font-medium text-ink text-right">{{ entry.qty }}</td>
                      <td class="px-4 py-3 text-sm text-ink-soft">{{ entry.reference || '-' }}</td>
                    </tr>
                    <tr v-if="expandedEntries.length === 0">
                      <td colspan="4" class="px-4 py-6 text-center text-sm text-ink-soft">No entries for this date.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-line flex items-center justify-between bg-gray-50/50">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="btn-secondary text-xs px-3 py-1.5">Previous</button>
          <span class="text-xs text-ink-soft font-medium">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn-secondary text-xs px-3 py-1.5">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Download, FileSpreadsheet, Calendar, CalendarDays, Loader2, AlertCircle, ChevronDown } from 'lucide-vue-next';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Export Box State
const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref(today);
const isDownloading = ref(false);
const error = ref('');

// Summary List State
const summaryData = ref([]);
const isLoadingSummary = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);

// Expanded Drilldown State
const expandedDate = ref(null);
const expandedEntries = ref([]);
const isLoadingEntries = ref(false);

const formatDate = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
};

const fetchSummary = async (page = 1) => {
  isLoadingSummary.value = true;
  try {
    const res = await fetch(\`\${API_URL}/api/entries/summary?page=\${page}&limit=10\`, { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      summaryData.value = data.data;
      totalPages.value = data.totalPages;
      currentPage.value = data.currentPage;
    }
  } catch (err) {
    console.error("Failed to load summary", err);
  } finally {
    isLoadingSummary.value = false;
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    expandedDate.value = null; // collapse open row
    fetchSummary(page);
  }
};

const toggleDay = async (date) => {
  if (expandedDate.value === date) {
    expandedDate.value = null;
    return;
  }
  
  expandedDate.value = date;
  isLoadingEntries.value = true;
  expandedEntries.value = [];
  
  try {
    const dateStr = date.split('T')[0];
    const res = await fetch(\`\${API_URL}/api/entries?date=\${dateStr}&limit=1000\`, { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      expandedEntries.value = data.data;
    }
  } catch (err) {
    console.error("Failed to load entries", err);
  } finally {
    isLoadingEntries.value = false;
  }
};

onMounted(() => {
  fetchSummary();
});

const downloadReport = async () => {
  if (!startDate.value || !endDate.value) return;
  if (startDate.value > endDate.value) {
    error.value = "Start date cannot be after end date.";
    return;
  }
  isDownloading.value = true;
  error.value = '';

  try {
    const url = \`\${API_URL}/api/reports/download?startDate=\${startDate.value}&endDate=\${endDate.value}\`;
    const response = await fetch(url, { credentials: 'include' });
    if (!response.ok) throw new Error('Failed to generate report for this range.');
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = \`Shipping_Label_Tracker_\${startDate.value}_to_\${endDate.value}.xlsx\`;
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  } catch (err) {
    error.value = err.message || 'An error occurred while downloading the report.';
  } finally {
    isDownloading.value = false;
  }
};
</script>
