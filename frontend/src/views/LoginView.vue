<template>
  <div class="min-h-screen w-full flex bg-[#FAF8F4] font-sans selection:bg-[#B08D57] selection:text-[#F2EAD9]">
    
    <!-- Left Panel: Super Immersive Visual (Hidden on smaller screens) -->
    <div class="hidden lg:flex w-1/2 bg-[#211D19] relative overflow-hidden items-center justify-center p-12">
      <!-- Ambient Background -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,0.1),transparent_70%)] animate-pulse-slow"></div>
      
      <!-- Subtle Grid -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <!-- Centerpiece: Minimalist Luxury Abstract -->
      <div class="relative z-10 w-full max-w-lg flex flex-col items-center justify-center mt-[-10%]">
        
        <!-- Nested Glowing Rings -->
        <div class="relative flex items-center justify-center w-80 h-80">
          <div class="absolute inset-0 rounded-full border border-[#B08D57]/20 shadow-[0_0_80px_20px_rgba(176,141,87,0.1)] animate-spin-slow"></div>
          <div class="absolute inset-8 rounded-full border border-[#ECE7DE]/10 shadow-[0_0_40px_10px_rgba(255,255,255,0.05)] animate-spin-slow" style="animation-direction: reverse; animation-duration: 20s;"></div>
          <div class="w-16 h-16 bg-[#B08D57]/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-[#B08D57]/30 shadow-[0_0_30px_0_rgba(176,141,87,0.2)]">
            <Box class="w-8 h-8 text-[#B08D57]" />
          </div>
        </div>

        <h2 class="mt-16 text-4xl font-light text-[#FDFCFA] tracking-[0.2em] uppercase text-center">
          Label Tracker
        </h2>
        <div class="h-px w-24 bg-[#B08D57]/50 mt-6 mb-6"></div>
        <p class="text-[#F2EAD9]/50 tracking-[0.4em] text-xs uppercase font-bold text-center">Internal Operations</p>
        
      </div>
      
      <!-- Brand Bottom Left -->
      <router-link to="/" class="absolute bottom-8 left-12 flex items-center space-x-3 text-[#FDFCFA] hover:text-[#B08D57] transition-colors z-20">
        <span class="font-bold tracking-tight text-xl">v2.0</span>
      </router-link>
    </div>

    <!-- Right Panel: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
      <!-- Subtle Back Button for Mobile -->
      <router-link to="/" class="lg:hidden absolute top-8 left-6 flex items-center text-[#6E675C] font-bold text-sm hover:text-[#2B2620]">
        &larr; Back to Home
      </router-link>

      <div class="w-full max-w-[420px] animate-fade-in-up">
        
        <div class="mb-10 text-center lg:text-left">
          <h1 class="text-4xl font-extrabold text-[#2B2620] tracking-tight mb-2">Welcome back.</h1>
          <p class="text-lg text-[#6E675C] font-medium">Log in to your workspace.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <div class="space-y-2">
            <label class="block text-sm font-bold text-[#2B2620]">Email Address</label>
            <input 
              type="email" 
              v-model="email" 
              required 
              placeholder="name@company.com" 
              class="w-full px-4 py-3.5 bg-[#FDFCFA] border border-[#ECE7DE] rounded-xl text-base text-[#2B2620] placeholder:text-[#6E675C]/50 focus:outline-none focus:border-[#B08D57] focus:ring-4 focus:ring-[#B08D57]/10 transition-all shadow-sm" 
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-sm font-bold text-[#2B2620]">Password</label>
              <a href="#" class="text-sm font-bold text-[#8F6F3E] hover:text-[#B08D57] transition-colors">Forgot?</a>
            </div>
            <input 
              type="password" 
              v-model="password" 
              required 
              placeholder="••••••••••••" 
              class="w-full px-4 py-3.5 bg-[#FDFCFA] border border-[#ECE7DE] rounded-xl text-base text-[#2B2620] placeholder:text-[#6E675C]/50 focus:outline-none focus:border-[#B08D57] focus:ring-4 focus:ring-[#B08D57]/10 transition-all shadow-sm" 
            />
          </div>

          <!-- Error Alert -->
          <div v-if="error" class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3 animate-shake">
            <div class="shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
              <span class="text-red-600 text-xs font-bold">!</span>
            </div>
            <p class="text-sm text-red-800 font-medium">{{ error }}</p>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading" 
            class="w-full bg-[#211D19] hover:bg-[#2B2620] text-[#F2EAD9] font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-xl shadow-[#211D19]/10 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2 hover:-translate-y-0.5"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
            <span v-else>Sign in to Dashboard</span>
          </button>
        </form>

        <p class="text-center text-sm font-semibold text-[#6E675C] mt-10">
          Don't have an account? 
          <a href="#" class="text-[#2B2620] hover:text-[#8F6F3E] transition-colors underline decoration-[#ECE7DE] underline-offset-4">Request access</a>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Box, Loader2, Check, FileText } from 'lucide-vue-next';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    const response = await fetch(`${apiUrl}/api/auth/login`, {
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

<style scoped>
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.translate-z-50 { transform: translateZ(50px); }

@keyframes pulse-slow {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 5s ease-in-out infinite;
}

@keyframes spin-slow {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
}
.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}

@keyframes float {
  0%, 100% { transform: rotateY(15deg) rotateX(10deg) translateY(0px); }
  50% { transform: rotateY(18deg) rotateX(8deg) translateY(-20px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}



@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
