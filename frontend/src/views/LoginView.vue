<template>
  <div class="min-h-screen bg-paper flex items-center justify-center p-4">
    <div class="w-full max-w-[400px]">
      
      <!-- Logo & Header -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-ink rounded-xl mx-auto flex items-center justify-center shadow-sm mb-4">
          <Box class="w-6 h-6 text-white" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p class="text-sm text-ink-soft mt-1.5">Sign in to your account to continue</p>
      </div>

      <!-- Login Card -->
      <div class="bg-card border border-line rounded-2xl card-shadow p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">
          
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-ink-soft">Email address</label>
            <input type="email" v-model="email" required placeholder="admin@company.com" class="w-full px-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-medium text-ink-soft">Password</label>
              <a href="#" class="text-xs font-medium text-ink hover:underline">Forgot password?</a>
            </div>
            <input type="password" v-model="password" required placeholder="••••••••" class="w-full px-3 py-2 bg-white border border-line rounded-md text-sm text-ink input-ring" />
          </div>

          <div v-if="error" class="p-3 bg-danger-bg border border-red/20 rounded-md">
            <p class="text-sm text-danger-text text-center font-medium">{{ error }}</p>
          </div>

          <button type="submit" :disabled="isLoading" class="w-full bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm py-2.5 rounded-md transition-all duration-200 shadow-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            <span v-else>Sign in</span>
          </button>
        </form>
      </div>
      
      <!-- Footer -->
      <p class="text-center text-xs text-muted mt-8">
        Secure access strictly monitored.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Box, Loader2 } from 'lucide-vue-next';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    
    const response = await fetch(`${apiUrl}/auth/login`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('permissions', JSON.stringify(data.permissions || []));
      localStorage.setItem('userName', data.name || '');
      
      // Force a tiny delay to ensure router picks up storage
      setTimeout(() => router.push('/dashboard'), 50);
    } else {
      error.value = data.error || 'Invalid credentials';
    }
  } catch (err) {
    error.value = 'Failed to connect to server';
  } finally {
    isLoading.value = false;
  }
};
</script>
