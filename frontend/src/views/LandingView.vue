<template>
  <div class="min-h-screen bg-paper flex flex-col font-sans text-ink">
    
    <!-- Navigation -->
    <header class="w-full bg-card border-b border-line px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-ink rounded-xl flex items-center justify-center shadow-sm mr-3">
          <Box class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold tracking-tight text-lg">{{ companyName }}</span>
      </div>
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-ink-soft">
        <a href="#features" class="hover:text-ink transition-colors">Features</a>
        <a href="#testimonials" class="hover:text-ink transition-colors">Testimonials</a>
      </nav>
      <div class="flex items-center space-x-4">
        <router-link to="/login" class="text-sm font-medium hover:text-ink transition-colors">Sign in</router-link>
        <router-link to="/login" class="bg-primary hover:bg-primary-hover text-primary-text text-sm font-medium px-4 py-2 rounded-md transition-all shadow-sm">
          Get Started
        </router-link>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="flex-grow flex flex-col items-center justify-center px-4 py-20 text-center animate-in fade-in duration-500">
      <div class="inline-flex items-center px-3 py-1 rounded-full bg-amber/10 text-amber font-semibold text-xs mb-6 border border-amber/20">
        <span class="flex h-2 w-2 rounded-full bg-amber mr-2 animate-pulse"></span>
        AI-Powered Label Processing is Live
      </div>
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6 text-balance">
        The smartest way to track your <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber">shipping labels</span>
      </h1>
      <p class="text-lg md:text-xl text-ink-soft max-w-2xl mb-10 text-balance leading-relaxed">
        Upload photos of shipping labels and instantly extract product details, track inventory, and generate beautiful daily reports without typing a single word.
      </p>
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <router-link to="/login" class="w-full sm:w-auto bg-ink hover:bg-black text-white text-base font-medium px-8 py-3.5 rounded-lg transition-all shadow-md flex items-center justify-center group">
          Start for free
          <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </router-link>
      </div>

      <!-- Feature Image Mockup -->
      <div class="mt-20 w-full max-w-5xl rounded-2xl border border-line bg-card shadow-2xl overflow-hidden relative">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-paper/20 z-10 pointer-events-none"></div>
        <div class="h-12 border-b border-line flex items-center px-4 space-x-2 bg-gray-50/50">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <div class="w-3 h-3 rounded-full bg-amber"></div>
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div class="p-8 bg-paper grid md:grid-cols-3 gap-6">
          <div class="bg-card border border-line p-6 rounded-xl shadow-sm col-span-2">
            <h3 class="font-bold text-lg mb-4 flex items-center"><LayoutDashboard class="w-5 h-5 mr-2 text-primary" /> Live Dashboard</h3>
            <div class="space-y-3">
              <div class="h-4 bg-gray-100 rounded w-3/4"></div>
              <div class="h-4 bg-gray-100 rounded w-1/2"></div>
              <div class="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
          <div class="bg-card border border-line p-6 rounded-xl shadow-sm">
            <h3 class="font-bold text-lg mb-4 flex items-center"><Box class="w-5 h-5 mr-2 text-amber" /> AI Extraction</h3>
            <div class="space-y-3">
              <div class="h-16 bg-gray-100 rounded-lg w-full mb-4"></div>
              <div class="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full border-t border-line py-8 text-center text-sm text-muted bg-card">
      <p>&copy; {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved.</p>
    </footer>

  </div>
</template>

<script setup>
import { Box, ArrowRight, LayoutDashboard } from 'lucide-vue-next';

const companyName = import.meta.env.VITE_COMPANY_NAME || 'Label Tracker Pro';
</script>
