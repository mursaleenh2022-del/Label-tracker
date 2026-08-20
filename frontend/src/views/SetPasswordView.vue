<template>
  <div class="min-h-screen flex items-center justify-center bg-paper p-4 relative overflow-hidden">
    <div class="w-full max-w-md bg-card rounded-2xl card-shadow border border-line p-8 relative z-10">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold tracking-tight text-ink mb-2">Set Your Password</h2>
        <p class="text-sm text-ink-soft">Welcome! Please set a password for your account.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div v-if="errorMsg" class="p-3 bg-red/10 border border-red/20 rounded-lg flex items-start text-sm text-red">
          <span>{{ errorMsg }}</span>
        </div>
        
        <div v-if="successMsg" class="p-3 bg-green/10 border border-green/20 rounded-lg flex items-start text-sm text-green">
          <span>{{ successMsg }}</span>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-ink mb-1.5">New Password</label>
          <input 
            v-model="password" 
            id="password" 
            type="password" 
            required
            class="w-full px-4 py-2.5 bg-paper border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="••••••••"
          />
        </div>
        
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-ink mb-1.5">Confirm Password</label>
          <input 
            v-model="confirmPassword" 
            id="confirmPassword" 
            type="password" 
            required
            class="w-full px-4 py-2.5 bg-paper border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-primary hover:bg-primary-hover text-primary-text font-medium py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 flex justify-center items-center mt-2"
        >
          <span v-if="!isLoading">Save Password</span>
          <span v-else>Saving...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');
const successMsg = ref('');
const isLoading = ref(false);
const token = ref('');

onMounted(() => {
  token.value = route.query.token;
  if (!token.value) {
    errorMsg.value = 'Invalid invitation link. No token found.';
  }
});

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.';
    return;
  }
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters.';
    return;
  }

  errorMsg.value = '';
  isLoading.value = true;

  try {
    const response = await fetch(`${API_URL}/api/auth/set-initial-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token.value, password: password.value })
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.value = data.error || 'Failed to set password. Link may be expired.';
    } else {
      successMsg.value = 'Password set successfully! Redirecting to login...';
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  } catch (err) {
    errorMsg.value = 'A network error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>
