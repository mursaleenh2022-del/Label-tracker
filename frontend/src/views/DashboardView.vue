<template>
  <div class="space-y-8">
    
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-ink">Overview</h1>
        <p class="text-sm text-ink-soft mt-1">Track your daily label reception and product intake.</p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <div class="text-sm text-ink-soft font-medium flex items-center px-3 py-1.5 bg-gray-50 border border-line rounded-md">
          <Calendar class="w-4 h-4 mr-2 text-muted" />
          {{ currentDate }}
        </div>
        <router-link to="/add" class="btn-primary">
          <Plus class="w-4 h-4 mr-1.5" />
          Log Entry
        </router-link>
      </div>
    </header>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <Loader2 class="w-8 h-8 text-amber animate-spin" />
      <p class="text-sm text-ink-soft mt-4">Loading real-time statistics...</p>
    </div>

    <template v-else>
      <!-- Stats Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Today's Labels -->
        <div class="bg-card border border-line rounded-xl p-6 card-shadow relative overflow-hidden group">
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-medium text-ink-soft">Today's Labels</h3>
            <div class="w-8 h-8 rounded bg-amber/10 flex items-center justify-center text-amber-dark group-hover:scale-110 group-hover:bg-amber/20 transition-all">
              <Tag class="w-4 h-4" />
            </div>
          </div>
          <div class="mt-4 flex items-baseline space-x-2">
            <span class="text-3xl font-bold text-ink">{{ stats.todaysLabels }}</span>
            <span v-if="stats.todaysLabels > 0" class="text-xs font-medium text-success flex items-center">
              <TrendingUp class="w-3 h-3 mr-0.5" /> Active
            </span>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Products Logged -->
        <div class="bg-card border border-line rounded-xl p-6 card-shadow relative overflow-hidden group">
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-medium text-ink-soft">Unique Products Today</h3>
            <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors">
              <Package class="w-4 h-4" />
            </div>
          </div>
          <div class="mt-4 flex items-baseline space-x-2">
            <span class="text-3xl font-bold text-ink">{{ stats.uniqueProductsToday }}</span>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-ink opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Monthly Running Total -->
        <div class="bg-card border border-line rounded-xl p-6 card-shadow relative overflow-hidden group">
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-medium text-ink-soft">Monthly Running Total</h3>
            <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Activity class="w-4 h-4" />
            </div>
          </div>
          <div class="mt-4 flex items-baseline space-x-2">
            <span class="text-3xl font-bold text-ink">{{ stats.monthlyTotal }}</span>
            <span class="text-sm text-ink-soft">labels</span>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold tracking-tight text-ink">Recent Activity</h2>
          <router-link to="/reports" class="text-sm font-medium text-amber-dark hover:text-amber transition-colors flex items-center">
            View all <ArrowRight class="w-4 h-4 ml-1" />
          </router-link>
        </div>
        
        <div class="bg-card border border-line rounded-xl card-shadow overflow-hidden">
          <div v-if="stats.recentActivity.length === 0" class="flex flex-col items-center justify-center py-16 px-4">
            <div class="w-12 h-12 bg-gray-50 border border-line rounded-full flex items-center justify-center mb-4">
              <Inbox class="w-5 h-5 text-muted" />
            </div>
            <h3 class="text-sm font-semibold text-ink">No entries yet</h3>
            <p class="text-sm text-ink-soft text-center max-w-sm mt-1 mb-6">
              Get started by logging your first label entry. The real-time data will appear here instantly.
            </p>
            <router-link to="/add" class="btn-secondary">
              <Plus class="w-4 h-4 mr-1.5" />
              Log First Entry
            </router-link>
          </div>
          
          <div v-else class="divide-y divide-line">
            <div v-for="entry in stats.recentActivity" :key="entry.id" class="p-4 flex items-center hover:bg-gray-50/50 transition-colors">
              <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink shrink-0">
                <Package class="w-4 h-4" />
              </div>
              <div class="ml-4 flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <p class="text-sm font-medium text-ink truncate">{{ entry.product.name }}</p>
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    {{ entry.product.categoryRel?.name || 'Other' }}
                  </span>
                </div>
                <div class="flex items-center text-xs text-ink-soft mt-1">
                  <span v-if="entry.reference" class="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-[10px] uppercase font-bold tracking-wider">{{ entry.reference }}</span>
                  <span>Added by {{ entry.user?.name || 'System' }}</span>
                </div>
              </div>
              <div class="ml-4 flex items-center text-sm font-medium text-ink bg-gray-50 border border-line px-2.5 py-1 rounded-md">
                <Hash class="w-3 h-3 text-muted mr-1" />
                {{ entry.qty }}
              </div>
              <div class="ml-4 text-xs text-muted w-24 text-right">
                {{ formatTimeAgo(entry.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    
  </div>
</template>

<script setup>
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

import { ref, onMounted } from 'vue';
import { Calendar, Plus, Tag, Package, Activity, TrendingUp, Inbox, ArrowRight, Hash, Loader2 } from 'lucide-vue-next';
import { format, formatDistanceToNow } from 'date-fns';

const currentDate = ref(format(new Date(), 'MMM dd, yyyy'));
const isLoading = ref(true);

const stats = ref({
  todaysLabels: 0,
  uniqueProductsToday: 0,
  monthlyTotal: 0,
  recentActivity: []
});

const formatTimeAgo = (dateStr) => {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch (e) {
    return dateStr;
  }
};

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/dashboard/stats`, { credentials: 'include' });
    if (res.ok) {
      stats.value = await res.json();
    }
  } catch (e) {
    console.error("Failed to load dashboard stats", e);
  } finally {
    isLoading.value = false;
  }
});
</script>
