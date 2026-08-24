<template>
  <div class="min-h-screen bg-[#FAF8F4] text-[#2B2620] font-sans selection:bg-[#B08D57] selection:text-[#F2EAD9] relative overflow-hidden">
    
    <!-- Subtle Grid & Glow Background for Immersive Feel -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-[#FAF8F4] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#ECE7DE,transparent)]"></div>
    </div>

    <!-- Navigation -->
    <nav class="sticky top-0 w-full bg-[#FDFCFA]/80 backdrop-blur-xl z-50 border-b border-[#ECE7DE] transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-[#211D19] rounded-xl flex items-center justify-center shadow-md">
            <Box class="w-5 h-5 text-[#B08D57]" />
          </div>
          <span class="font-bold tracking-tight text-xl text-[#2B2620]">{{ companyName }}</span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-sm font-semibold text-[#6E675C] hover:text-[#2B2620] transition-colors">Features</a>
          <a href="#how-it-works" class="text-sm font-semibold text-[#6E675C] hover:text-[#2B2620] transition-colors">How it works</a>
          <a href="#pricing" class="text-sm font-semibold text-[#6E675C] hover:text-[#2B2620] transition-colors">Pricing</a>
          <div class="w-px h-6 bg-[#ECE7DE]"></div>
          <router-link to="/login" class="text-sm font-bold text-[#2B2620] hover:text-[#8F6F3E] transition-colors">Log in</router-link>
          <router-link to="/login" class="btn-primary">Start free trial</router-link>
        </div>
      </div>
    </nav>

    <!-- Split Hero Section -->
    <header class="pt-24 pb-24 md:pt-32 md:pb-32 px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div class="grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Copy Left (50%) -->
        <div class="md:col-span-6 relative z-10" data-reveal>
          <h1 class="display-title text-[#2B2620] font-extrabold tracking-tight mb-6 leading-[1.05]">
            Stop typing.<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-[#2B2620] to-[#8F6F3E]">Start scanning.</span>
          </h1>
          <p class="body-text text-[#6E675C] mb-10 max-w-lg leading-relaxed font-medium">
            The intelligent data extraction engine for high-volume dropshipping operations. Turn messy shipping labels into clean, structured inventory data instantly.
          </p>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <router-link to="/login" class="btn-primary h-14 px-8 text-base shadow-lg shadow-[#211D19]/10">Start 14-day trial</router-link>
            <a href="#how-it-works" class="btn-secondary h-14 px-8 text-base">See how it works</a>
          </div>
          <div class="mt-8 flex items-center space-x-6 text-sm font-semibold text-[#6E675C]">
            <div class="flex items-center"><Check class="w-5 h-5 text-[#8F6F3E] mr-2" /> No credit card required</div>
            <div class="flex items-center"><Check class="w-5 h-5 text-[#8F6F3E] mr-2" /> Setup in 2 minutes</div>
          </div>
        </div>
        
        <!-- Mockup Right (50%) -->
        <div class="md:col-span-6 relative perspective-1000" data-reveal>
          <div class="absolute -inset-4 bg-gradient-to-tr from-[#8F6F3E]/20 to-[#8F6F3E]/5 blur-3xl -z-10 rounded-[3rem] opacity-70"></div>
          
          <!-- Static Coded Dashboard Mockup (Animations Removed) -->
          <div class="mockup-container bg-[#FDFCFA] rounded-2xl border border-[#ECE7DE]/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative transform rotate-y-12 rotate-x-6 transition-transform hover:rotate-0 duration-700 ease-out">
            <!-- Mac Window Dots -->
            <div class="bg-[#FAF8F4]/80 backdrop-blur-sm border-b border-[#ECE7DE] px-4 py-3 flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-rose-400"></div>
              <div class="w-3 h-3 rounded-full bg-amber-400"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
              <div class="ml-4 text-[10px] font-mono text-[#6E675C] flex-1 text-center pr-10">app.labeltracker.pro/batch</div>
            </div>
            <!-- Mockup Content -->
            <div class="p-6 bg-[#FDFCFA]/60 backdrop-blur-md">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="font-bold text-[#2B2620]">Pending Batch</h3>
                  <p class="text-xs text-[#6E675C] mt-1">Processed from clipboard</p>
                </div>
                <div class="h-8 px-3 bg-[#8F6F3E]/10 border border-[#8F6F3E]/20 rounded text-xs font-bold text-[#8F6F3E] flex items-center">
                  <Check class="w-3 h-3 mr-1.5" /> Complete
                </div>
              </div>
              
              <!-- Table -->
              <div class="border border-[#ECE7DE] rounded-lg overflow-hidden bg-[#FDFCFA]">
                <table class="w-full text-left text-sm">
                  <thead class="bg-[#FAF8F4] border-b border-[#ECE7DE]">
                    <tr>
                      <th class="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#6E675C] font-bold">Reference</th>
                      <th class="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#6E675C] font-bold">Product</th>
                      <th class="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#6E675C] font-bold text-right">Qty</th>
                      <th class="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#6E675C] font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#ECE7DE]">
                    <tr class="bg-[#8F6F3E]/10/20">
                      <td class="px-4 py-3 font-mono text-[#2B2620] text-xs">1Z99923...</td>
                      <td class="px-4 py-3 font-semibold text-[#2B2620] text-xs">Wireless Earbuds Pro</td>
                      <td class="px-4 py-3 text-right font-mono text-[#2B2620] text-xs">12</td>
                      <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#8F6F3E]/20 text-[#8F6F3E]">Extracted</span></td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-mono text-[#2B2620] text-xs">JD01928...</td>
                      <td class="px-4 py-3 font-semibold text-[#2B2620] text-xs">Ergo Office Chair</td>
                      <td class="px-4 py-3 text-right font-mono text-[#2B2620] text-xs">1</td>
                      <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#8F6F3E]/20 text-[#8F6F3E]">Extracted</span></td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-mono text-[#2B2620] text-xs">TBA192...</td>
                      <td class="px-4 py-3 font-semibold text-[#2B2620] text-xs">Standing Desk Mat</td>
                      <td class="px-4 py-3 text-right font-mono text-[#2B2620] text-xs">4</td>
                      <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#8F6F3E]/20 text-[#8F6F3E]">Extracted</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Trusted By Section (New Immersive Element) -->
    <section class="py-12 border-y border-[#ECE7DE] bg-[#FDFCFA]/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-reveal>
        <p class="text-sm font-bold text-[#6E675C] tracking-widest uppercase mb-8">Trusted by logistics teams powering</p>
        <div class="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div class="text-xl font-extrabold text-[#2B2620]">Shopify</div>
          <div class="text-xl font-extrabold text-[#2B2620]">WooCommerce</div>
          <div class="text-xl font-extrabold text-[#2B2620]">Amazon</div>
          <div class="text-xl font-extrabold text-[#2B2620]">TikTok Shop</div>
          <div class="text-xl font-extrabold text-[#2B2620]">eBay</div>
        </div>
      </div>
    </section>

    <!-- Stats Section (New Immersive Element) -->
    <section class="py-24 bg-[#211D19] text-[#F2EAD9] relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" data-reveal>
        <div class="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#F2EAD9]/10">
          <div class="py-6">
            <div class="text-5xl font-extrabold text-[#B08D57] mb-2">99.9%</div>
            <div class="text-[#F2EAD9]/70 font-semibold uppercase tracking-wide text-sm">Data Accuracy</div>
          </div>
          <div class="py-6">
            <div class="text-5xl font-extrabold text-[#B08D57] mb-2">&lt; 2s</div>
            <div class="text-[#F2EAD9]/70 font-semibold uppercase tracking-wide text-sm">Processing Time</div>
          </div>
          <div class="py-6">
            <div class="text-5xl font-extrabold text-[#B08D57] mb-2">1M+</div>
            <div class="text-[#F2EAD9]/70 font-semibold uppercase tracking-wide text-sm">Labels Scanned</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section id="features" class="py-32 bg-[#FDFCFA] px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-24" data-reveal>
          <h2 class="text-3xl md:text-5xl font-extrabold text-[#2B2620] tracking-tight mb-6">Everything you need to scale</h2>
          <p class="body-text text-[#6E675C] font-medium">Built specifically for high-volume warehouse teams. Eliminate manual data entry and human error entirely with an AI that understands logistics.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="feature-card bg-[#FDFCFA] p-8 rounded-3xl border border-[#ECE7DE] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group" data-reveal>
            <div class="w-14 h-14 bg-[#8F6F3E]/10 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300">
              <Camera class="w-7 h-7 text-[#8F6F3E]" />
            </div>
            <h3 class="text-2xl font-bold text-[#2B2620] mb-4">Vision AI Extraction</h3>
            <p class="text-[#6E675C] text-base leading-relaxed">Reads messy, crumpled, or badly printed shipping labels instantly. Our custom vision model is trained specifically on dropshipping and logistics formats.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="feature-card bg-[#FDFCFA] p-8 rounded-3xl border border-[#ECE7DE] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group" data-reveal>
            <div class="w-14 h-14 bg-[#8F6F3E]/10 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300">
              <Database class="w-7 h-7 text-[#8F6F3E]" />
            </div>
            <h3 class="text-2xl font-bold text-[#2B2620] mb-4">Auto-Categorization</h3>
            <p class="text-[#6E675C] text-base leading-relaxed">Matches extracted text to your existing product database. Automatically assigns categories and flags brand new products for review before saving.</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="feature-card bg-[#FDFCFA] p-8 rounded-3xl border border-[#ECE7DE] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group" data-reveal>
            <div class="w-14 h-14 bg-[#8F6F3E]/10 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300">
              <FileSpreadsheet class="w-7 h-7 text-[#8F6F3E]" />
            </div>
            <h3 class="text-2xl font-bold text-[#2B2620] mb-4">One-Click Excel Reports</h3>
            <p class="text-[#6E675C] text-base leading-relaxed">Filter by any date range and instantly download a perfectly formatted Excel sheet that matches your client's exact required tracking format.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works (Vertical Timeline) -->
    <section id="how-it-works" class="py-32 bg-[#FAF8F4]/50 px-6 lg:px-8 border-y border-[#ECE7DE]">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-24" data-reveal>
          <h2 class="text-3xl md:text-5xl font-extrabold text-[#2B2620] tracking-tight mb-6">How it works</h2>
          <p class="body-text text-[#6E675C] font-medium">From a raw photo to perfectly structured data in seconds.</p>
        </div>
        
        <div class="space-y-16 relative before:absolute before:inset-0 before:ml-[27px] md:before:ml-1/2 md:before:translate-x-[-50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-[#8F6F3E]/20 before:via-[#8F6F3E] before:to-[#8F6F3E]/20">
          
          <!-- Step 1 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group" data-reveal>
            <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[#FDFCFA] text-[#2B2620] border border-[#ECE7DE] font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 text-xl">01</div>
            <div class="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-10 rounded-3xl bg-[#FDFCFA] border border-[#ECE7DE] shadow-xl shadow-[#6E675C]/10">
              <h3 class="font-bold text-2xl text-[#2B2620] mb-3">Upload or Paste</h3>
              <p class="text-base text-[#6E675C] leading-relaxed font-medium">Just hit Ctrl+V on the dashboard to paste an image of a label directly from your clipboard, or batch upload PDFs.</p>
            </div>
          </div>
          
          <!-- Step 2 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group" data-reveal>
            <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[#B08D57] text-[#F2EAD9] font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg shadow-[#B08D57]/30 z-10 text-xl">02</div>
            <div class="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-10 rounded-3xl bg-[#FDFCFA] border border-[#ECE7DE] shadow-xl shadow-[#6E675C]/10">
              <h3 class="font-bold text-2xl text-[#2B2620] mb-3">AI Processing</h3>
              <p class="text-base text-[#6E675C] leading-relaxed font-medium">Our engine reads the image, finds the product in your database, and perfectly extracts the tracking reference.</p>
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group" data-reveal>
            <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[#211D19] text-[#F2EAD9] font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 text-xl">03</div>
            <div class="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-10 rounded-3xl bg-[#FDFCFA] border border-[#ECE7DE] shadow-xl shadow-[#6E675C]/10">
              <h3 class="font-bold text-2xl text-[#2B2620] mb-3">Verify & Save</h3>
              <p class="text-base text-[#6E675C] leading-relaxed font-medium">The batch table auto-fills. All you have to do is hit Confirm. We flag duplicates automatically to protect your ledger.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-32 bg-[#FDFCFA] px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-24" data-reveal>
          <h2 class="text-3xl md:text-5xl font-extrabold text-[#2B2620] tracking-tight mb-6">Simple, transparent pricing</h2>
          <p class="body-text text-[#6E675C] font-medium">Start for free, upgrade when your volume grows.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          <!-- Starter -->
          <div class="p-10 rounded-[2rem] bg-[#FAF8F4] border border-[#ECE7DE] text-left flex flex-col shadow-sm" data-reveal>
            <h3 class="font-bold text-2xl text-[#2B2620] mb-2">Starter</h3>
            <p class="text-base text-[#6E675C] mb-8 font-medium">Perfect for small shops.</p>
            <div class="mb-10"><span class="text-5xl font-extrabold text-[#2B2620]">$0</span><span class="text-[#6E675C] font-bold">/mo</span></div>
            <ul class="space-y-5 mb-12 flex-grow text-base text-[#6E675C] font-medium">
              <li class="flex items-start"><Check class="w-6 h-6 text-[#8F6F3E] mr-3 shrink-0" /> 500 AI Scans per month</li>
              <li class="flex items-start"><Check class="w-6 h-6 text-[#8F6F3E] mr-3 shrink-0" /> Basic Excel Reports</li>
              <li class="flex items-start"><Check class="w-6 h-6 text-[#8F6F3E] mr-3 shrink-0" /> 1 Admin Seat</li>
            </ul>
            <router-link to="/login" class="btn-secondary w-full justify-center h-14 text-base">Start for free</router-link>
          </div>
          
          <!-- Pro -->
          <div class="p-10 rounded-[2rem] bg-[#211D19] text-[#F2EAD9] text-left flex flex-col shadow-2xl relative border border-[#2B2620]" data-reveal>
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B08D57] text-[#211D19] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Most Popular</div>
            <h3 class="font-bold text-2xl text-[#F2EAD9] mb-2 mt-2">Professional</h3>
            <p class="text-base text-[#F2EAD9]/70 mb-8 font-medium">For growing warehouses.</p>
            <div class="mb-10"><span class="text-5xl font-extrabold text-[#F2EAD9]">$49</span><span class="text-[#F2EAD9]/70 font-bold">/mo</span></div>
            <ul class="space-y-5 mb-12 flex-grow text-base text-[#F2EAD9]/90 font-medium">
              <li class="flex items-start"><Check class="w-6 h-6 text-[#B08D57] mr-3 shrink-0" /> 5,000 AI Scans per month</li>
              <li class="flex items-start"><Check class="w-6 h-6 text-[#B08D57] mr-3 shrink-0" /> Batch Upload Mode (Up to 50)</li>
              <li class="flex items-start"><Check class="w-6 h-6 text-[#B08D57] mr-3 shrink-0" /> Custom Excel Templates</li>
            </ul>
            <router-link to="/login" class="w-full h-14 inline-flex items-center justify-center bg-[#B08D57] text-[#F2EAD9] hover:bg-[#8F6F3E] font-bold rounded-full transition-colors mt-auto text-base shadow-lg shadow-[#B08D57]/20">Start 14-day trial</router-link>
          </div>
          
          <!-- Enterprise -->
          <div class="p-10 rounded-[2rem] bg-[#FAF8F4] border border-[#ECE7DE] text-left flex flex-col shadow-sm" data-reveal>
            <h3 class="font-bold text-2xl text-[#2B2620] mb-2">Enterprise</h3>
            <p class="text-base text-[#6E675C] mb-8 font-medium">For massive operations.</p>
            <div class="mb-10"><span class="text-5xl font-extrabold text-[#2B2620]">$199</span><span class="text-[#6E675C] font-bold">/mo</span></div>
            <ul class="space-y-5 mb-12 flex-grow text-base text-[#6E675C] font-medium">
              <li class="flex items-start"><Check class="w-6 h-6 text-[#8F6F3E] mr-3 shrink-0" /> Unlimited AI Scans</li>
              <li class="flex items-start"><Check class="w-6 h-6 text-[#8F6F3E] mr-3 shrink-0" /> Dedicated Account Manager</li>
              <li class="flex items-start"><Check class="w-6 h-6 text-[#8F6F3E] mr-3 shrink-0" /> API Access</li>
            </ul>
            <router-link to="/login" class="btn-secondary w-full justify-center h-14 text-base">Contact Sales</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Pre-Footer CTA (New Immersive Element) -->
    <section class="py-24 bg-[#211D19] text-[#F2EAD9] relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48L3N2Zz4=')] opacity-50"></div>
      <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_100%,#2B2620,transparent)]"></div>
      
      <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10" data-reveal>
        <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Ready to automate your warehouse?</h2>
        <p class="text-xl text-[#F2EAD9] mb-10 font-medium max-w-2xl mx-auto">Join hundreds of logistics teams who have eliminated manual data entry completely.</p>
        <router-link to="/login" class="inline-flex items-center h-16 px-10 bg-[#F2EAD9] text-[#211D19] hover:bg-white font-extrabold rounded-full transition-transform hover:scale-105 duration-200 text-lg shadow-xl shadow-[#211D19]/50">
          Create your free account
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full bg-[#211D19] text-[#F2EAD9]/70 pt-24 pb-12">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
        <div class="col-span-2">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-[#2B2620] rounded-xl flex items-center justify-center mr-3 shadow-inner">
              <Box class="w-5 h-5 text-[#B08D57]" />
            </div>
            <span class="font-bold tracking-tight text-xl text-[#F2EAD9]">{{ companyName }}</span>
          </div>
          <p class="text-base text-[#F2EAD9]/70 max-w-sm leading-relaxed font-medium">The modern way to manage warehouse data extraction. Stop typing, start scanning with Vision AI built for logistics.</p>
        </div>
        <div>
          <h4 class="font-bold text-[#F2EAD9] mb-6 text-base">Product</h4>
          <ul class="space-y-4 text-base font-medium">
            <li><a href="#features" class="hover:text-[#B08D57] transition-colors">Features</a></li>
            <li><a href="#pricing" class="hover:text-[#B08D57] transition-colors">Pricing</a></li>
            <li><router-link to="/login" class="hover:text-[#B08D57] transition-colors">Log In</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-[#F2EAD9] mb-6 text-base">Legal</h4>
          <ul class="space-y-4 text-base font-medium">
            <li><a href="#" class="hover:text-[#B08D57] transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-[#B08D57] transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-[#B08D57] transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-6 lg:px-8 border-t border-[#2B2620]/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-semibold text-[#6E675C]">
        <p>&copy; {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved.</p>
        <div class="flex space-x-6 mt-6 md:mt-0">
          <a href="#" class="hover:text-[#F2EAD9] transition-colors">Twitter</a>
          <a href="#" class="hover:text-[#F2EAD9] transition-colors">GitHub</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Box, Camera, Database, FileSpreadsheet, Check } from 'lucide-vue-next';
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
  font-size: clamp(3.5rem, 6vw, 5.5rem);
  letter-spacing: -0.04em;
}
.body-text {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
}

/* Base Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  height: 2.75rem;
  padding: 0 1.5rem;
  background-color: #211D19; /* slate-900 */
  color: #F2EAD9;
  font-weight: 700;
  border-radius: 9999px;
  transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
}
.btn-primary:hover {
  background-color: #2B2620; /* slate-800 */
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  height: 2.75rem;
  padding: 0 1.5rem;
  background-color: #FDFCFA;
  color: #2B2620;
  font-weight: 700;
  border-radius: 9999px;
  border: 1px solid #ECE7DE;
  transition: background-color 0.2s, border-color 0.2s;
}
.btn-secondary:hover {
  background-color: #FAF8F4;
  border-color: #6E675C;
}

/* Subtle Perspective */
.perspective-1000 {
  perspective: 1000px;
}
</style>
