<template>
  <div class="min-h-screen w-full flex bg-[#FAF8F4] font-sans selection:bg-[#B08D57] selection:text-[#F2EAD9]">
    
    <!-- Left Panel: Super Immersive Visual (Hidden on smaller screens) -->
    <div class="hidden lg:flex w-1/2 bg-[#211D19] relative overflow-hidden items-center justify-center p-12">
      <!-- Ambient Background -->
      <div class="absolute inset-0 bg-[#211D19] overflow-hidden">
        <!-- Subtle Grid -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(242,234,217,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,234,217,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        
        <!-- Glowing Accents -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#B08D57] blur-[150px] rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#8F6F3E] blur-[150px] rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="relative z-10 w-full max-w-lg">
        
        <!-- Glassmorphic Logistics Card (Reflecting the 5 Phases) -->
        <div class="w-full bg-[#FAF8F4]/5 backdrop-blur-2xl border border-[#F2EAD9]/10 rounded-[2rem] p-8 shadow-2xl mb-12 transform hover:scale-[1.02] transition-transform duration-500">
          
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-[#B08D57]/20 rounded-xl flex items-center justify-center border border-[#B08D57]/30">
                <Package class="w-6 h-6 text-[#B08D57]" />
              </div>
              <div>
                <p class="text-[10px] text-[#F2EAD9]/50 uppercase tracking-widest font-bold">Network Status</p>
                <p class="text-sm text-[#F2EAD9] font-bold">Global Operations</p>
              </div>
            </div>
            <div class="px-3 py-1 bg-[#8F6F3E]/20 text-[#B08D57] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#B08D57]/30 flex items-center shadow-inner">
              <span class="w-1.5 h-1.5 bg-[#B08D57] rounded-full mr-2 animate-pulse"></span> Live
            </div>
          </div>

          <div class="space-y-4">
            <!-- Phase 2: Sellers -->
            <div class="p-4 bg-[#211D19]/60 rounded-xl border border-[#F2EAD9]/5 flex items-center justify-between shadow-sm">
              <div class="flex items-center space-x-3">
                <Users class="w-4 h-4 text-[#F2EAD9]/50" />
                <span class="text-xs text-[#F2EAD9]/70 font-medium">Active Sellers</span>
              </div>
              <span class="text-sm font-mono text-[#F2EAD9] font-bold">142</span>
            </div>
            
            <!-- Phase 3: Stock Inventory -->
            <div class="p-4 bg-[#211D19]/60 rounded-xl border border-[#B08D57]/30 flex items-center justify-between shadow-sm relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#B08D57]"></div>
              <div class="flex items-center space-x-3">
                <Boxes class="w-4 h-4 text-[#B08D57]" />
                <span class="text-xs text-[#F2EAD9]/90 font-medium">Stock Inventory</span>
              </div>
              <span class="text-sm font-mono text-[#B08D57] font-bold">28,450</span>
            </div>
            
            <!-- Phase 1: Labels -->
            <div class="p-4 bg-[#211D19]/60 rounded-xl border border-[#F2EAD9]/5 flex items-center justify-between shadow-sm">
              <div class="flex items-center space-x-3">
                <Scan class="w-4 h-4 text-[#F2EAD9]/50" />
                <span class="text-xs text-[#F2EAD9]/70 font-medium">Labels Processed</span>
              </div>
              <span class="text-sm font-mono text-[#F2EAD9] font-bold">1.2M+</span>
            </div>
          </div>
        </div>

        <!-- Typography -->
        <h2 class="text-4xl md:text-5xl font-extrabold text-[#FDFCFA] tracking-tight mb-5 leading-[1.1]">
          Dropshipping<br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#8F6F3E] to-[#B08D57]">Logistics Engine</span>
        </h2>
        <p class="text-base text-[#F2EAD9]/60 font-medium leading-relaxed max-w-sm">
          The unified platform for managing sellers, tracking dynamic inventory, and automating label extraction.
        </p>

      </div>
      
      <!-- Brand Bottom Left -->
      <div class="absolute bottom-8 left-12 flex items-center space-x-3 text-[#F2EAD9]/40 z-20">
        <span class="font-mono text-xs font-bold tracking-widest uppercase">System v2.0 &mdash; Restricted Access</span>
      </div>
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
import { Box, Loader2, Check, FileText, Package, Users, Boxes, Scan } from 'lucide-vue-next';

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
