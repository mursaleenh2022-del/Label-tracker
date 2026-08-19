<template>
  <div class="space-y-8">
    
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-ink">Reports</h1>
        <p class="text-sm text-ink-soft mt-1">Export your formatted Excel tracking sheets.</p>
      </div>
    </header>

    <!-- Content -->
    <div class="bg-card border border-line rounded-xl card-shadow flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-line mb-6">
        <FileSpreadsheet class="w-8 h-8 text-blue-600" />
      </div>
      
      <h3 class="text-lg font-semibold text-ink mb-2">Download Tracking Sheet</h3>
      <p class="text-sm text-ink-soft max-w-md mb-8">Select a date range below. The system will automatically generate a perfectly styled Excel file matching the official tracking format.</p>
      
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

  </div>
</template>

<script setup>
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

import { ref } from 'vue';
import { Download, FileSpreadsheet, Calendar, Loader2, AlertCircle } from 'lucide-vue-next';

// Default to today
const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref(today);
const isDownloading = ref(false);
const error = ref('');

const downloadReport = async () => {
  if (!startDate.value || !endDate.value) return;
  
  if (startDate.value > endDate.value) {
    error.value = "Start date cannot be after end date.";
    return;
  }

  isDownloading.value = true;
  error.value = '';

  try {
    const url = `${API_URL}/api/reports/download?startDate=${startDate.value}&endDate=${endDate.value}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to generate report for this range.');
    }
    
    // Convert response to blob
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    
    // Create an invisible anchor tag to trigger the browser download
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `Shipping_Label_Tracker_${startDate.value}_to_${endDate.value}.xlsx`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);

  } catch (err) {
    console.error(err);
    error.value = err.message || 'An error occurred while downloading the report.';
  } finally {
    isDownloading.value = false;
  }
};
</script>
