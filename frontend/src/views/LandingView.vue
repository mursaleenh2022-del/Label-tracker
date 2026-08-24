<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-slate-50/90 backdrop-blur-md z-50 border-b border-slate-200">
      <div class="max-w-[1512px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
            <Box class="w-5 h-5 text-teal-400" />
          </div>
          <span class="font-bold tracking-tight text-xl text-slate-900">{{ companyName }}</span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
          <a href="#how-it-works" class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How it works</a>
          <a href="#pricing" class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
          <router-link to="/login" class="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors">Log in</router-link>
          <router-link to="/login" class="btn-primary">Start free trial</router-link>
        </div>
      </div>
    </nav>

    <!-- Split Hero Section -->
    <header class="pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 max-w-[1512px] mx-auto overflow-hidden">
      <div class="grid md:grid-cols-12 gap-12 lg:gap-24 items-center">
        <!-- Copy Left (45%) -->
        <div class="md:col-span-5 relative z-10" data-reveal>
          <div class="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full mb-8">
            <span class="flex w-2 h-2 rounded-full bg-teal-500"></span>
            <span class="text-xs font-mono font-medium text-teal-800 tracking-wide uppercase">Vision AI v2.0 Live</span>
          </div>
          <h1 class="display-title text-slate-900 font-extrabold tracking-tight mb-6 leading-[1.05]">
            Stop typing.<br/>Start scanning.
          </h1>
          <p class="body-text text-slate-600 mb-10 max-w-lg leading-relaxed">
            The intelligent data extraction engine for high-volume dropshipping operations. Turn messy shipping labels into clean, structured inventory data instantly.
          </p>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <router-link to="/login" class="btn-primary h-14 px-8 text-base shadow-lg shadow-teal-900/10">Start 14-day trial</router-link>
            <a href="#how-it-works" class="btn-secondary h-14 px-8 text-base">See how it works</a>
          </div>
          <div class="mt-8 flex items-center space-x-4 text-sm font-medium text-slate-500">
            <div class="flex items-center"><Check class="w-4 h-4 text-teal-600 mr-2" /> No credit card required</div>
            <div class="flex items-center"><Check class="w-4 h-4 text-teal-600 mr-2" /> Setup in 2 minutes</div>
          </div>
        </div>
        
        <!-- Mockup Right (55%) -->
        <div class="md:col-span-7 relative" data-reveal>
          <!-- Signature Element: Coded Dashboard Mockup with Scan-line -->
          <div class="mockup-container bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative">
            <!-- Mac Window Dots -->
            <div class="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-slate-300"></div>
              <div class="w-3 h-3 rounded-full bg-slate-300"></div>
              <div class="w-3 h-3 rounded-full bg-slate-300"></div>
              <div class="ml-4 text-xs font-mono text-slate-400">app.labeltracker.pro/batch</div>
            </div>
            <!-- Mockup Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="font-bold text-slate-900">Pending Batch (4)</h3>
                  <p class="text-xs text-slate-500 mt-1">Processing clipboard images...</p>
                </div>
                <div class="h-8 px-3 bg-slate-100 rounded text-xs font-medium text-slate-600 flex items-center">
                  <Loader2 class="w-3 h-3 mr-2 animate-spin text-teal-600" /> Analyzing
                </div>
              </div>
              
              <!-- Table -->
              <div class="border border-slate-100 rounded-lg overflow-hidden">
                <table class="w-full text-left text-sm">
                  <thead class="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th class="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Reference</th>
                      <th class="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Product</th>
                      <th class="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold text-right">Qty</th>
                      <th class="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    <tr class="bg-teal-50/30">
                      <td class="px-4 py-3 font-mono text-slate-900">1Z99923...</td>
                      <td class="px-4 py-3 font-medium text-slate-900">Wireless Earbuds Pro</td>
                      <td class="px-4 py-3 text-right font-mono text-slate-900">12</td>
                      <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-teal-100 text-teal-800">Extracted</span></td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-mono text-slate-900">JD01928...</td>
                      <td class="px-4 py-3 font-medium text-slate-900">Ergo Office Chair</td>
                      <td class="px-4 py-3 text-right font-mono text-slate-900">1</td>
                      <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-teal-100 text-teal-800">Extracted</span></td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-mono text-slate-400">Scanning...</td>
                      <td class="px-4 py-3 text-slate-400">Scanning...</td>
                      <td class="px-4 py-3 text-right text-slate-400">-</td>
                      <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Animated Scan Line (Signature Element) -->
            <div class="scan-line absolute left-0 w-full h-[2px] bg-teal-400 shadow-[0_0_15px_3px_rgba(45,212,191,0.5)] z-20 pointer-events-none"></div>
          </div>
          
          <!-- Decorative BG Elements -->
          <div class="absolute -inset-4 bg-teal-900/5 blur-2xl -z-10 rounded-3xl"></div>
        </div>
      </div>
    </header>

    <!-- Features Grid -->
    <section id="features" class="py-24 bg-white px-6 md:px-12 border-y border-slate-200">
      <div class="max-w-[1512px] mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-24" data-reveal>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Everything you need to scale</h2>
          <p class="body-text text-slate-600">Built specifically for high-volume warehouse teams. Eliminate manual data entry and human error entirely.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="feature-card bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden" data-reveal>
            <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6">
              <Camera class="w-6 h-6 text-teal-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Vision AI Extraction</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Reads messy, crumpled, or badly printed shipping labels instantly. Our custom vision model is trained specifically on dropshipping and logistics formats.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="feature-card bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden" data-reveal>
            <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6">
              <Database class="w-6 h-6 text-teal-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Auto-Categorization</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Matches extracted text to your existing product database. Automatically assigns categories and flags brand new products for review before saving.</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="feature-card bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden" data-reveal>
            <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6">
              <FileSpreadsheet class="w-6 h-6 text-teal-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">One-Click Excel Reports</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Filter by any date range and instantly download a perfectly formatted Excel sheet that matches your client's exact required tracking format.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works (Vertical Timeline) -->
    <section id="how-it-works" class="py-24 bg-slate-50 px-6 md:px-12">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-24" data-reveal>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">How it works</h2>
          <p class="body-text text-slate-600">From a raw photo to perfectly structured data in seconds.</p>
        </div>
        
        <div class="space-y-12 relative before:absolute before:inset-0 before:ml-[27px] md:before:ml-1/2 md:before:translate-x-[-50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-slate-200">
          
          <!-- Step 1 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group" data-reveal>
            <!-- Timeline Node (Rhymes with scan-line) -->
            <div class="flex items-center justify-center w-14 h-14 rounded-full border-4 border-slate-50 bg-slate-900 text-teal-400 font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 shadow-[0_0_10px_rgba(45,212,191,0.2)]">01</div>
            <div class="w-[calc(100%-5rem)] md:w-[calc(50%-3.5rem)] p-8 rounded-2xl bg-white border border-slate-200 shadow-sm border-l-4 border-l-slate-900">
              <h3 class="font-bold text-xl text-slate-900 mb-2">Upload or Paste</h3>
              <p class="text-sm text-slate-600 leading-relaxed">Just hit Ctrl+V on the dashboard to paste an image of a label directly from your clipboard, or batch upload PDFs.</p>
            </div>
          </div>
          
          <!-- Step 2 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group" data-reveal>
            <div class="flex items-center justify-center w-14 h-14 rounded-full border-4 border-slate-50 bg-slate-900 text-teal-400 font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 shadow-[0_0_10px_rgba(45,212,191,0.2)]">02</div>
            <div class="w-[calc(100%-5rem)] md:w-[calc(50%-3.5rem)] p-8 rounded-2xl bg-white border border-slate-200 shadow-sm border-l-4 border-l-teal-600">
              <h3 class="font-bold text-xl text-slate-900 mb-2">AI Processing</h3>
              <p class="text-sm text-slate-600 leading-relaxed">Our engine reads the image, finds the product in your database, and perfectly extracts the tracking reference.</p>
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group" data-reveal>
            <div class="flex items-center justify-center w-14 h-14 rounded-full border-4 border-slate-50 bg-slate-900 text-teal-400 font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 shadow-[0_0_10px_rgba(45,212,191,0.2)]">03</div>
            <div class="w-[calc(100%-5rem)] md:w-[calc(50%-3.5rem)] p-8 rounded-2xl bg-white border border-slate-200 shadow-sm border-l-4 border-l-teal-400">
              <h3 class="font-bold text-xl text-slate-900 mb-2">Verify & Save</h3>
              <p class="text-sm text-slate-600 leading-relaxed">The batch table auto-fills. All you have to do is hit Confirm. We flag duplicates automatically to protect your ledger.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 bg-white px-6 md:px-12 border-t border-slate-200">
      <div class="max-w-[1512px] mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-24" data-reveal>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Simple, transparent pricing</h2>
          <p class="body-text text-slate-600">Start for free, upgrade when your volume grows.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          <!-- Starter -->
          <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-left flex flex-col shadow-sm" data-reveal>
            <h3 class="font-bold text-xl text-slate-900 mb-2">Starter</h3>
            <p class="text-sm text-slate-500 mb-6">Perfect for small shops.</p>
            <div class="mb-8"><span class="text-4xl font-extrabold text-slate-900">$0</span><span class="text-slate-500 font-medium">/mo</span></div>
            <ul class="space-y-4 mb-10 flex-grow text-sm text-slate-700 font-medium">
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-600 mr-3 shrink-0" /> 500 AI Scans per month</li>
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-600 mr-3 shrink-0" /> Basic Excel Reports</li>
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-600 mr-3 shrink-0" /> 1 Admin Seat</li>
            </ul>
            <router-link to="/login" class="btn-secondary w-full justify-center">Start for free</router-link>
          </div>
          
          <!-- Pro (Rhymes with scan-line via top border) -->
          <div class="p-8 rounded-3xl bg-slate-900 text-white text-left flex flex-col shadow-2xl relative border-t-4 border-t-teal-400" data-reveal>
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-400 text-teal-950 text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
            <h3 class="font-bold text-xl text-white mb-2 mt-2">Professional</h3>
            <p class="text-sm text-slate-400 mb-6">For growing warehouses.</p>
            <div class="mb-8"><span class="text-4xl font-extrabold text-white">$49</span><span class="text-slate-400 font-medium">/mo</span></div>
            <ul class="space-y-4 mb-10 flex-grow text-sm text-slate-200 font-medium">
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-400 mr-3 shrink-0" /> 5,000 AI Scans per month</li>
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-400 mr-3 shrink-0" /> Batch Upload Mode (Up to 50)</li>
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-400 mr-3 shrink-0" /> Custom Excel Templates</li>
            </ul>
            <router-link to="/login" class="w-full h-12 inline-flex items-center justify-center bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-full transition-colors mt-auto">Start 14-day trial</router-link>
          </div>
          
          <!-- Enterprise -->
          <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-left flex flex-col shadow-sm" data-reveal>
            <h3 class="font-bold text-xl text-slate-900 mb-2">Enterprise</h3>
            <p class="text-sm text-slate-500 mb-6">For massive operations.</p>
            <div class="mb-8"><span class="text-4xl font-extrabold text-slate-900">$199</span><span class="text-slate-500 font-medium">/mo</span></div>
            <ul class="space-y-4 mb-10 flex-grow text-sm text-slate-700 font-medium">
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-600 mr-3 shrink-0" /> Unlimited AI Scans</li>
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-600 mr-3 shrink-0" /> Dedicated Account Manager</li>
              <li class="flex items-start"><Check class="w-5 h-5 text-teal-600 mr-3 shrink-0" /> API Access</li>
            </ul>
            <router-link to="/login" class="btn-secondary w-full justify-center">Contact Sales</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full bg-slate-900 text-slate-400 pt-24 pb-12 border-t border-slate-800">
      <div class="max-w-[1512px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-2">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mr-3 shadow-inner">
              <Box class="w-5 h-5 text-teal-400" />
            </div>
            <span class="font-bold tracking-tight text-xl text-white">{{ companyName }}</span>
          </div>
          <p class="text-sm text-slate-400 max-w-sm leading-relaxed">The modern way to manage warehouse data extraction. Stop typing, start scanning with Vision AI built for logistics.</p>
        </div>
        <div>
          <h4 class="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-6">Product</h4>
          <ul class="space-y-4 text-sm font-medium">
            <li><a href="#features" class="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" class="hover:text-white transition-colors">Pricing</a></li>
            <li><router-link to="/login" class="hover:text-white transition-colors">Log In</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-6">Legal</h4>
          <ul class="space-y-4 text-sm font-medium">
            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-[1512px] mx-auto px-6 md:px-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium">
        <p>&copy; {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-white transition-colors">Twitter</a>
          <a href="#" class="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Box, Loader2, Camera, Database, FileSpreadsheet, Check } from 'lucide-vue-next';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const companyName = import.meta.env.VITE_COMPANY_NAME || 'Label Tracker Pro';

onMounted(() => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Strict scroll-reveal implementation adhering to Motion Override (No scale!)
  const els = gsap.utils.toArray('[data-reveal]');
  els.forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 32 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        }
      }
    );
  });

  // Safety net: force show anything stuck at opacity 0 after 2.6s
  setTimeout(() => {
    els.forEach(el => {
      if (parseFloat(window.getComputedStyle(el).opacity) === 0) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });
  }, 2600);
});
</script>

<style scoped>
/* Strict Typography & Base Tokens */
.font-sans {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.font-mono {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* Modular Scale (optical sizing adjusted for Inter) */
.display-title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  letter-spacing: -0.03em;
}
.body-text {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
}

/* Base Buttons - NO scale transforms on hover */
.btn-primary {
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  padding: 0 1.25rem;
  background-color: #0F172A; /* slate-900 */
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  transition: background-color 0.2s, transform 0.15s;
}
.btn-primary:hover {
  background-color: #0D9488; /* teal-600 */
  transform: translateY(-1px);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  padding: 0 1.25rem;
  background-color: white;
  color: #0F172A;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  border: 1px solid #E2E8F0;
  transition: background-color 0.2s, border-color 0.2s;
}
.btn-secondary:hover {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
}

/* Scan-line Animation (Signature Element) */
.scan-line {
  top: 0;
  animation: scan 4s ease-in-out infinite;
}

@keyframes scan {
  0%, 100% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  50% {
    top: 100%;
  }
}
</style>
