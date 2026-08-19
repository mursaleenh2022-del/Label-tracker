<template>
  <div class="min-h-screen bg-paper font-sans text-ink flex selection:bg-ink selection:text-white">
    
    <!-- Sidebar Navigation (Hidden on Login page) -->
    <aside v-if="!isPublicPage" class="w-64 bg-card border-r border-line flex flex-col flex-shrink-0 hidden md:flex">
      
      <!-- Top: App Name & Logo -->
      <div class="h-16 flex items-center px-6 border-b border-line/50 shrink-0">
        <div class="w-7 h-7 bg-ink rounded-md flex items-center justify-center shadow-sm mr-3 shrink-0">
          <Box class="w-4 h-4 text-white" />
        </div>
        <span class="font-semibold tracking-tight text-sm text-ink truncate">{{ companyName }}</span>
      </div>
      
      <!-- Middle: Navigation Tabs -->
      <nav class="flex-grow px-4 py-6 space-y-1.5 overflow-y-auto">
        <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-2">Menu</div>
        
        <router-link to="/dashboard" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" active-class="bg-gray-100 text-ink" :class="route.path === '/dashboard' ? '' : 'text-ink-soft hover:text-ink hover:bg-gray-50'">
          <LayoutDashboard class="w-4 h-4 mr-3" />
          Overview
        </router-link>
        
        <router-link to="/add" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" active-class="bg-gray-100 text-ink" :class="route.path === '/add' ? '' : 'text-ink-soft hover:text-ink hover:bg-gray-50'">
          <PlusCircle class="w-4 h-4 mr-3" />
          Log Entry
        </router-link>
        
        <router-link to="/reports" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" active-class="bg-gray-100 text-ink" :class="route.path === '/reports' ? '' : 'text-ink-soft hover:text-ink hover:bg-gray-50'">
          <FileBarChart class="w-4 h-4 mr-3" />
          Reports
        </router-link>
        
        <router-link v-if="canManageProducts" to="/products" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" active-class="bg-gray-100 text-ink" :class="route.path === '/products' ? '' : 'text-ink-soft hover:text-ink hover:bg-gray-50'">
          <Package class="w-4 h-4 mr-3" />
          Products
        </router-link>

        <div v-if="canManageUsers" class="pt-4">
          <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-2">Settings</div>
          
          <router-link to="/settings/users" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" active-class="bg-gray-100 text-ink" :class="route.path === '/settings/users' ? '' : 'text-ink-soft hover:text-ink hover:bg-gray-50'">
            <Users class="w-4 h-4 mr-3" />
            Users
          </router-link>
          
          <router-link to="/settings/roles" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" active-class="bg-gray-100 text-ink" :class="route.path === '/settings/roles' ? '' : 'text-ink-soft hover:text-ink hover:bg-gray-50'">
            <Shield class="w-4 h-4 mr-3" />
            Roles
          </router-link>
        </div>
      </nav>

      <!-- Bottom: User Profile & Logout -->
      <div class="p-4 border-t border-line/50 shrink-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center min-w-0">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 border border-line flex items-center justify-center text-xs font-medium text-ink shadow-sm shrink-0">
              TA
            </div>
            <div class="ml-3 truncate">
              <p class="text-xs font-medium text-ink truncate">{{ userName }}</p>
              <p class="text-[10px] text-muted truncate">Admin</p>
            </div>
          </div>
          <button @click="logout" class="text-muted hover:text-red transition-colors p-1.5 rounded-md hover:bg-red/5 shrink-0" title="Log out">
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile Header (Visible only on small screens) -->
    <div v-if="!isPublicPage" class="md:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-line flex items-center justify-between px-4 z-50">
      <div class="flex items-center">
        <div class="w-6 h-6 bg-ink rounded-md flex items-center justify-center mr-2">
          <Box class="w-3 h-3 text-white" />
        </div>
        <span class="font-semibold tracking-tight text-sm text-ink truncate">{{ companyName }}</span>
      </div>
      <button @click="logout" class="text-muted hover:text-red p-1">
        <LogOut class="w-4 h-4" />
      </button>
    </div>

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
      <!-- Mobile padding offset -->
      <div class="md:hidden h-14 shrink-0"></div>
      
      <div class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
        <router-view></router-view>
      </div>
    </main>
    
    <!-- Mobile Bottom Nav -->
    <div v-if="!isPublicPage" class="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-line flex justify-around p-2 z-50 pb-safe">
      <router-link to="/dashboard" class="p-2 rounded-md flex flex-col items-center" active-class="text-ink" :class="route.path === '/dashboard' ? 'text-ink' : 'text-muted'">
        <LayoutDashboard class="w-5 h-5" />
        <span class="text-[10px] mt-1 font-medium">Home</span>
      </router-link>
      <router-link to="/add" class="p-2 rounded-md flex flex-col items-center" active-class="text-ink" :class="route.path === '/add' ? 'text-ink' : 'text-muted'">
        <PlusCircle class="w-5 h-5" />
        <span class="text-[10px] mt-1 font-medium">Log</span>
      </router-link>
      <router-link to="/reports" class="p-2 rounded-md flex flex-col items-center" active-class="text-ink" :class="route.path === '/reports' ? 'text-ink' : 'text-muted'">
        <FileBarChart class="w-5 h-5" />
        <span class="text-[10px] mt-1 font-medium">Reports</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Box, LogOut, LayoutDashboard, PlusCircle, FileBarChart, Package, Users, Shield } from 'lucide-vue-next';
import { hasPermission, logout as authLogout } from './utils/auth';

const route = useRoute();
const router = useRouter();

const companyName = import.meta.env.VITE_COMPANY_NAME || 'Label Tracker Pro';
const isPublicPage = computed(() => route.path === '/login' || route.path === '/');

const userName = computed(() => {
  return localStorage.getItem('userName') || 'User';
});

const canManageProducts = computed(() => hasPermission('manage_products'));
const canManageUsers = computed(() => hasPermission('manage_users'));

const logout = () => {
  authLogout();
};
</script>
