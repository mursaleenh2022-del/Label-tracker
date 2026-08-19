<template>
  <div class="min-h-screen bg-paper flex flex-col font-sans text-ink scroll-smooth">
    
    <!-- Navigation -->
    <header class="w-full bg-card/90 backdrop-blur-md border-b border-line px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-ink rounded-xl flex items-center justify-center shadow-sm mr-3">
          <Box class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold tracking-tight text-lg">{{ companyName }}</span>
      </div>
      <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-ink-soft">
        <a href="#features" class="hover:text-ink transition-colors">Features</a>
        <a href="#how-it-works" class="hover:text-ink transition-colors">How it works</a>
        <a href="#pricing" class="hover:text-ink transition-colors">Pricing</a>
      </nav>
      <div class="flex items-center space-x-4">
        <router-link to="/login" class="text-sm font-medium hover:text-ink transition-colors hidden sm:block">Sign in</router-link>
        <router-link to="/login" class="bg-primary hover:bg-primary-hover text-primary-text text-sm font-medium px-4 py-2 rounded-md transition-all shadow-sm">
          Get Started
        </router-link>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center animate-in fade-in duration-500">
      <div class="inline-flex items-center px-3 py-1 rounded-full bg-amber/10 text-amber font-semibold text-xs mb-8 border border-amber/20">
        <span class="flex h-2 w-2 rounded-full bg-amber mr-2 animate-pulse"></span>
        Label Tracker AI 2.0 is now live
      </div>
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6 text-balance">
        Stop typing. Start <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber">scanning.</span>
      </h1>
      <p class="text-lg md:text-xl text-ink-soft max-w-2xl mb-10 text-balance leading-relaxed">
        Upload photos of shipping labels and instantly extract product details, track inventory, and generate beautiful daily reports using advanced Vision AI.
      </p>
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <router-link to="/login" class="w-full sm:w-auto bg-ink hover:bg-black text-white text-base font-medium px-8 py-4 rounded-lg transition-all shadow-lg flex items-center justify-center group">
          Start for free
          <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </router-link>
        <a href="#how-it-works" class="w-full sm:w-auto bg-card border border-line hover:bg-gray-50 text-ink text-base font-medium px-8 py-4 rounded-lg transition-all flex items-center justify-center">
          See how it works
        </a>
      </div>

      <!-- Hero Image -->
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
            <div class="space-y-4">
              <div class="flex gap-4">
                 <div class="h-24 bg-blue-50 border border-blue-100 rounded-lg w-1/3"></div>
                 <div class="h-24 bg-amber/5 border border-amber/10 rounded-lg w-1/3"></div>
                 <div class="h-24 bg-green-50 border border-green-100 rounded-lg w-1/3"></div>
              </div>
              <div class="h-4 bg-gray-100 rounded w-full"></div>
              <div class="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
          <div class="bg-card border border-line p-6 rounded-xl shadow-sm flex flex-col justify-center items-center text-center">
            <div class="w-16 h-16 bg-amber/10 rounded-full flex items-center justify-center mb-4">
              <Zap class="w-8 h-8 text-amber" />
            </div>
            <h3 class="font-bold text-lg mb-2">Instant AI Parsing</h3>
            <p class="text-xs text-muted">Automatically maps tracking codes to database entries.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-white px-4 border-y border-line">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to scale</h2>
          <p class="text-lg text-ink-soft max-w-2xl mx-auto">Stop manual data entry. Our platform handles the busywork so your warehouse team can focus on shipping.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="p-6 rounded-2xl bg-card border border-line shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-4">
              <Camera class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-2">Vision AI Extraction</h3>
            <p class="text-ink-soft text-sm leading-relaxed">Upload a raw image or PDF. Our Gemini-powered AI automatically reads the tracking number, product name, and quantity.</p>
          </div>
          <!-- Feature 2 -->
          <div class="p-6 rounded-2xl bg-card border border-line shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-amber/10 text-amber rounded-xl flex items-center justify-center mb-4">
              <Database class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-2">Auto-Categorization</h3>
            <p class="text-ink-soft text-sm leading-relaxed">If the AI spots a completely new product label, it automatically creates a new database record on the fly.</p>
          </div>
          <!-- Feature 3 -->
          <div class="p-6 rounded-2xl bg-card border border-line shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <FileSpreadsheet class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-2">One-Click Excel Reports</h3>
            <p class="text-ink-soft text-sm leading-relaxed">Generate perfectly formatted daily or monthly Excel manifests for your shipping partners with a single click.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-24 px-4 bg-paper">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">How it works</h2>
          <p class="text-lg text-ink-soft max-w-2xl mx-auto">Three simple steps to completely automate your fulfillment tracking.</p>
        </div>
        
        <div class="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-line before:to-transparent">
          
          <!-- Step 1 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-paper bg-primary text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">1</div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-line shadow-sm">
              <h3 class="font-bold text-lg mb-2">Upload or Paste</h3>
              <p class="text-sm text-ink-soft">Just hit Ctrl+V on the dashboard to paste an image of a label directly from your clipboard.</p>
            </div>
          </div>
          
          <!-- Step 2 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-paper bg-amber text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">2</div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-line shadow-sm">
              <h3 class="font-bold text-lg mb-2">AI Processing</h3>
              <p class="text-sm text-ink-soft">Our engine reads the image, finds the product in your database, and extracts the tracking reference.</p>
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-paper bg-green-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">3</div>
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-line shadow-sm">
              <h3 class="font-bold text-lg mb-2">Verify & Save</h3>
              <p class="text-sm text-ink-soft">The form auto-fills. All you have to do is hit Enter. We even drop duplicates automatically.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 bg-white border-y border-line px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
        <p class="text-lg text-ink-soft max-w-2xl mx-auto mb-20">Start for free, upgrade when your volume grows.</p>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          <!-- Starter -->
          <div class="p-8 rounded-3xl bg-card border border-line text-left flex flex-col h-full shadow-sm">
            <h3 class="font-bold text-xl mb-2">Starter</h3>
            <p class="text-sm text-muted mb-6">Perfect for small shops.</p>
            <div class="mb-6"><span class="text-4xl font-bold">$0</span><span class="text-muted">/mo</span></div>
            <ul class="space-y-4 mb-8 flex-grow text-sm text-ink-soft">
              <li class="flex items-center"><Check class="w-4 h-4 text-green-500 mr-3 shrink-0" /> 500 AI Scans per month</li>
              <li class="flex items-center"><Check class="w-4 h-4 text-green-500 mr-3 shrink-0" /> Basic Excel Reports</li>
              <li class="flex items-center"><Check class="w-4 h-4 text-green-500 mr-3 shrink-0" /> 1 Admin Seat</li>
            </ul>
            <router-link to="/login" class="w-full block text-center bg-gray-100 hover:bg-gray-200 text-ink font-medium py-3.5 rounded-xl transition-colors">Start for free</router-link>
          </div>
          
          <!-- Pro -->
          <div class="p-8 rounded-3xl bg-ink text-white text-left flex flex-col relative transform md:scale-105 shadow-2xl ring-4 ring-ink/10 h-full z-10">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f59e0b] text-[#09090b] text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap border border-[#d97706]">Most Popular</div>
            <h3 class="font-bold text-xl mb-2 text-white mt-2">Professional</h3>
            <p class="text-sm text-gray-400 mb-6">For growing warehouses.</p>
            <div class="mb-6"><span class="text-4xl font-bold">$49</span><span class="text-gray-400">/mo</span></div>
            <ul class="space-y-4 mb-8 flex-grow text-sm text-gray-300">
              <li class="flex items-center"><Check class="w-4 h-4 text-[#f59e0b] mr-3 shrink-0" /> 5,000 AI Scans per month</li>
              <li class="flex items-center"><Check class="w-4 h-4 text-[#f59e0b] mr-3 shrink-0" /> Batch Upload Mode (Up to 50)</li>
              <li class="flex items-center"><Check class="w-4 h-4 text-[#f59e0b] mr-3 shrink-0" /> Custom Excel Templates</li>
            </ul>
            <router-link to="/login" class="w-full block text-center bg-white hover:bg-gray-100 text-ink font-bold py-3.5 rounded-xl transition-colors mt-auto">Start 14-day trial</router-link>
          </div>
          
          <!-- Enterprise -->
          <div class="p-8 rounded-3xl bg-card border border-line text-left flex flex-col h-full shadow-sm">
            <h3 class="font-bold text-xl mb-2">Enterprise</h3>
            <p class="text-sm text-muted mb-6">For massive operations.</p>
            <div class="mb-6"><span class="text-4xl font-bold">$199</span><span class="text-muted">/mo</span></div>
            <ul class="space-y-4 mb-8 flex-grow text-sm text-ink-soft">
              <li class="flex items-center"><Check class="w-4 h-4 text-green-500 mr-3 shrink-0" /> Unlimited AI Scans</li>
              <li class="flex items-center"><Check class="w-4 h-4 text-green-500 mr-3 shrink-0" /> Dedicated Account Manager</li>
              <li class="flex items-center"><Check class="w-4 h-4 text-green-500 mr-3 shrink-0" /> API Access</li>
            </ul>
            <router-link to="/login" class="w-full block text-center bg-gray-100 hover:bg-gray-200 text-ink font-medium py-3.5 rounded-xl transition-colors mt-auto">Contact Sales</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full bg-paper pt-16 pb-8 border-t border-line">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div class="col-span-2">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-ink rounded-lg flex items-center justify-center mr-3">
              <Box class="w-4 h-4 text-white" />
            </div>
            <span class="font-bold tracking-tight text-lg">{{ companyName }}</span>
          </div>
          <p class="text-sm text-muted max-w-xs">The modern way to manage warehouse data extraction with Vision AI.</p>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4">Product</h4>
          <ul class="space-y-2 text-sm text-ink-soft">
            <li><a href="#" class="hover:text-ink transition-colors">Features</a></li>
            <li><a href="#" class="hover:text-ink transition-colors">Pricing</a></li>
            <li><a href="#" class="hover:text-ink transition-colors">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4">Legal</h4>
          <ul class="space-y-2 text-sm text-ink-soft">
            <li><a href="#" class="hover:text-ink transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-ink transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-ink transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-4 border-t border-line pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-muted">
        <p>&copy; {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="hover:text-ink">Twitter</a>
          <a href="#" class="hover:text-ink">GitHub</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { Box, ArrowRight, LayoutDashboard, Zap, Camera, Database, FileSpreadsheet, Check } from 'lucide-vue-next';

const companyName = import.meta.env.VITE_COMPANY_NAME || 'Label Tracker Pro';
</script>
