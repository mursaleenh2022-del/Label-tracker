<template>
  <div class="min-h-screen bg-[#FAF8F4] text-[#2B2620] font-sans selection:bg-[#B08D57] selection:text-[#F2EAD9] relative overflow-hidden main-wrapper transition-colors duration-700">
    
    <!-- Subtle Grid & Glow Background for Immersive Feel -->
    <div class="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#ECE7DE_1px,transparent_1px),linear-gradient(to_bottom,#ECE7DE_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-30">
      <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#B08D57,transparent)] opacity-10"></div>
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
          
          <div class="w-px h-6 bg-[#ECE7DE]"></div>
          <router-link to="/login" class="text-sm font-bold text-[#2B2620] hover:text-[#8F6F3E] transition-colors">Log in</router-link>
          <router-link to="/login" class="btn-primary">Access System</router-link>
        </div>
      </div>
    </nav>

    <!-- 50/50 Split Hero Section with Modern Animations -->
    <header class="pt-32 pb-16 md:pt-40 md:pb-24 px-6 lg:px-8 max-w-[90rem] mx-auto relative hero-section" ref="heroSection">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
        
        <!-- Left: Copy (Staggered Reveal) -->
        <div class="relative z-30 hero-text-wrapper pr-0 lg:pr-12">
          
          <h1 class="text-5xl md:text-7xl text-[#2B2620] font-extrabold tracking-tight mb-6 leading-[1.1] flex flex-col">
            <span class="overflow-hidden inline-block py-1"><span class="hero-word inline-block transform translate-y-[100%]">Scale operations.</span></span>
            <span class="overflow-hidden inline-block py-1 pb-2"><span class="hero-word text-transparent bg-clip-text bg-gradient-to-r from-[#8F6F3E] via-[#B08D57] to-[#8F6F3E] bg-[length:200%_auto] animate-gradient inline-block transform translate-y-[100%]">Automate logistics.</span></span>
          </h1>
          
          <p class="text-lg md:text-xl text-[#6E675C] mb-8 max-w-lg leading-relaxed font-medium hero-desc">
            The all-in-one operational engine for high-volume dropshippers. Seamlessly manage sellers, automate label extraction, and track stock inventory in real-time.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center gap-4 hero-btns">
            <router-link to="/login" class="inline-flex items-center justify-center h-12 px-8 bg-[#211D19] text-[#F2EAD9] font-bold rounded-xl hover:bg-[#2B2620] hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-xl shadow-[#211D19]/10">
              Access System
            </router-link>
            <a href="#how-it-works" class="inline-flex items-center justify-center h-12 px-8 bg-[#FDFCFA] text-[#2B2620] font-bold rounded-xl border border-[#ECE7DE] hover:bg-[#FAF8F4] hover:border-[#6E675C] transition-all duration-300 text-sm shadow-sm">
              See how it works
            </a>
          </div>
        </div>
        
        <!-- Right: Mockup with Laser Scan -->
        <div class="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[70vh] flex items-center justify-center perspective-1000 hero-mockup-wrapper z-20 mt-12 lg:mt-0">
          
          <!-- Floating Tags -->
          <div class="absolute top-[10%] left-[-5%] bg-[#FDFCFA] p-4 rounded-2xl shadow-2xl border border-[#ECE7DE] z-30 parallax-el flex items-center space-x-4" data-speed="1.2">
            <div class="w-12 h-12 bg-[#FAF8F4] rounded-xl flex items-center justify-center"><FileText class="text-[#8F6F3E] w-6 h-6" /></div>
            <div>
              <p class="text-[10px] uppercase font-bold text-[#6E675C] tracking-wider mb-1">Raw Input</p>
              <p class="text-sm font-mono font-bold text-[#2B2620]">label_v2.pdf</p>
            </div>
          </div>
          
          <div class="absolute bottom-[10%] right-[-5%] bg-[#211D19] p-4 rounded-2xl shadow-2xl border border-[#6E675C] z-30 parallax-el flex items-center space-x-4" data-speed="1.5">
            <div class="w-12 h-12 bg-[#2B2620] rounded-xl flex items-center justify-center"><Database class="text-[#F2EAD9] w-6 h-6" /></div>
            <div>
              <p class="text-[10px] uppercase font-bold text-[#F2EAD9]/70 tracking-wider mb-1">AI Output</p>
              <p class="text-sm font-mono font-bold text-[#B08D57]">12 Items Synced</p>
            </div>
          </div>

          <!-- Glowing Backdrops -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[#ECE7DE] to-[#B08D57] blur-[100px] -z-10 rounded-full opacity-40 animate-pulse-slow"></div>

          <!-- Mockup Box -->
          <div class="mockup-container w-full max-w-2xl bg-[#FDFCFA] rounded-2xl md:rounded-[2rem] border border-[#ECE7DE] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] overflow-hidden relative" ref="heroMockup">

            <div class="bg-[#FAF8F4]/80 backdrop-blur-sm border-b border-[#ECE7DE] px-5 py-4 flex items-center space-x-2">
              <div class="w-3.5 h-3.5 rounded-full bg-rose-400"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-amber-400"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-emerald-400"></div>
              <div class="ml-4 text-xs font-mono text-[#6E675C] flex-1 text-center pr-10">app.labeltracker.pro/batch</div>
            </div>
            
            <div class="p-6 md:p-8 bg-[#FDFCFA]/60 backdrop-blur-md">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h3 class="font-extrabold text-xl text-[#2B2620]">Pending Batch</h3>
                  <p class="text-xs text-[#6E675C] mt-1 font-medium">Processed from clipboard</p>
                </div>
                <div class="h-8 px-3 bg-[#FAF8F4] border border-[#ECE7DE] rounded-md text-xs font-bold text-[#2B2620] flex items-center shadow-sm">
                  <Check class="w-4 h-4 mr-2 text-[#8F6F3E]" /> Complete
                </div>
              </div>
              
              <div class="border border-[#ECE7DE] rounded-xl overflow-hidden bg-[#FDFCFA] shadow-sm">
                <table class="w-full text-left text-sm">
                  <thead class="bg-[#FAF8F4] border-b border-[#ECE7DE]">
                    <tr>
                      <th class="px-5 py-4 font-mono text-[10px] uppercase tracking-wider text-[#6E675C] font-bold">Reference</th>
                      <th class="px-5 py-4 font-mono text-[10px] uppercase tracking-wider text-[#6E675C] font-bold">Product</th>
                      <th class="px-5 py-4 font-mono text-[10px] uppercase tracking-wider text-[#6E675C] font-bold text-right">Qty</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#ECE7DE]">
                    <tr class="bg-[#8F6F3E]/5">
                      <td class="px-5 py-4 font-mono text-[#2B2620] font-bold">1Z99923...</td>
                      <td class="px-5 py-4 font-bold text-[#2B2620]">Wireless Earbuds Pro</td>
                      <td class="px-5 py-4 text-right font-mono text-[#2B2620] font-bold">12</td>
                    </tr>
                    <tr>
                      <td class="px-5 py-4 font-mono text-[#2B2620] font-bold">JD01928...</td>
                      <td class="px-5 py-4 font-bold text-[#2B2620]">Ergo Office Chair</td>
                      <td class="px-5 py-4 text-right font-mono text-[#2B2620] font-bold">1</td>
                    </tr>
                    <tr>
                      <td class="px-5 py-4 font-mono text-[#2B2620] font-bold">TBA192...</td>
                      <td class="px-5 py-4 font-bold text-[#2B2620]">Standing Desk Mat</td>
                      <td class="px-5 py-4 text-right font-mono text-[#2B2620] font-bold">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Premium Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-80 cursor-pointer hover:opacity-100 transition-opacity z-50" @click="scrollDown">
        <div class="w-[30px] h-[46px] border-2 border-[#6E675C]/50 rounded-full flex justify-center p-1 relative shadow-lg bg-[#FAF8F4]/50 backdrop-blur-sm">
          <div class="w-1.5 h-1.5 bg-[#8F6F3E] rounded-full animate-scroll-wheel"></div>
        </div>
      </div>
    </header>

    <!-- Continuous Infinite Marquee -->
    <section class="py-12 border-y border-[#ECE7DE] bg-[#FDFCFA]/50 backdrop-blur-sm overflow-hidden flex flex-col">
      <p class="text-sm font-bold text-[#6E675C] tracking-widest uppercase mb-8 text-center px-6">Designed exclusively for high-volume dropshipping operations</p>
      <div class="marquee-container flex whitespace-nowrap overflow-hidden relative">
        <div class="marquee-content flex items-center justify-around min-w-full shrink-0 gap-24 px-12">
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40 hover:opacity-100 transition-opacity">Shopify</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40 hover:opacity-100 transition-opacity">WooCommerce</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40 hover:opacity-100 transition-opacity">Amazon</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40 hover:opacity-100 transition-opacity">TikTok Shop</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40 hover:opacity-100 transition-opacity">eBay</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40 hover:opacity-100 transition-opacity">FedEx</div>
        </div>
        <div class="marquee-content flex items-center justify-around min-w-full shrink-0 gap-24 px-12" aria-hidden="true">
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40">Shopify</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40">WooCommerce</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40">Amazon</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40">TikTok Shop</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40">eBay</div>
          <div class="text-2xl font-extrabold text-[#2B2620] opacity-40">FedEx</div>
        </div>
      </div>
    </section>

    <!-- Scroll Highlight Statement (Immersive Element) -->
    <section class="py-48 px-6 lg:px-8 max-w-5xl mx-auto text-center statement-section">
      <h2 class="text-4xl md:text-6xl font-bold leading-tight text-[#2B2620]">
        <span class="statement-word opacity-10 transition-opacity">Stop</span>
        <span class="statement-word opacity-10 transition-opacity"> wrestling</span>
        <span class="statement-word opacity-10 transition-opacity"> with</span>
        <span class="statement-word opacity-10 transition-opacity"> spreadsheets.</span><br/>
        <span class="statement-word opacity-10 transition-opacity">Take</span>
        <span class="statement-word opacity-10 transition-opacity"> absolute</span>
        <span class="statement-word opacity-10 transition-opacity"> control</span>
        <span class="statement-word opacity-10 transition-opacity"> of</span>
        <span class="statement-word opacity-10 transition-opacity text-[#8F6F3E]"> your</span>
        <span class="statement-word opacity-10 transition-opacity text-[#8F6F3E]"> inventory.</span>
      </h2>
    </section>

    <!-- CINEMATIC PINNED CARD STACK (HEAVY IMMERSIVE) -->
    <section id="features" class="bg-[#211D19] relative z-20" ref="engineWrapper">
      
      
      <div class="h-screen sticky top-0 flex flex-col lg:flex-row items-center overflow-hidden px-6 lg:px-8 max-w-7xl mx-auto" ref="enginePin">
        
        <!-- Title Left -->
        <div class="lg:w-1/2 pr-12 z-10 engine-text-wrap">
          <h2 class="text-5xl md:text-7xl font-extrabold text-[#FDFCFA] tracking-tight mb-6 engine-title">The complete operational stack.</h2>
          <p class="text-[#F2EAD9]/70 font-medium text-xl mb-8">A unified platform built to handle the rigorous demands of multi-seller dropshipping.</p>
          <div class="w-12 h-1 bg-[#B08D57] rounded-full engine-line"></div>
        </div>
        
        <!-- Animated Cards Right -->
        <div class="lg:w-1/2 w-full h-[60vh] relative perspective-1000 mt-12 lg:mt-0">
          
          <!-- Card 1 -->
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full bg-[#2B2620] p-10 md:p-14 rounded-[2rem] border border-[#6E675C]/30 shadow-2xl flex flex-col justify-center engine-card card-1 origin-bottom">
            <div class="w-16 h-16 bg-[#211D19] rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-[#6E675C]/20">
              <Camera class="w-8 h-8 text-[#B08D57]" />
            </div>
            <h3 class="text-4xl font-bold text-[#FDFCFA] mb-4">Automated Extraction</h3>
            <p class="text-[#F2EAD9]/70 text-lg leading-relaxed">Upload raw shipping labels and let our Vision AI instantly extract tracking references and quantities. Zero manual data entry.</p>
          </div>
          
          <!-- Card 2 -->
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full bg-[#211D19] p-10 md:p-14 rounded-[2rem] border border-[#B08D57]/50 shadow-2xl flex flex-col justify-center engine-card card-2 origin-bottom translate-y-[100%] opacity-0">
            <div class="w-16 h-16 bg-[#2B2620] rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-[#6E675C]/20">
              <Users class="w-8 h-8 text-[#B08D57]" />
            </div>
            <h3 class="text-4xl font-bold text-[#FDFCFA] mb-4">Seller Management</h3>
            <p class="text-[#F2EAD9]/70 text-lg leading-relaxed">Track and manage your entire seller network from a single unified dashboard. Monitor specific pricing and seller-level data.</p>
          </div>
          
          <!-- Card 3 -->
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full bg-[#FAF8F4] p-10 md:p-14 rounded-[2rem] border border-[#ECE7DE] shadow-2xl flex flex-col justify-center engine-card card-3 origin-bottom translate-y-[100%] opacity-0">
            <div class="w-16 h-16 bg-[#FDFCFA] rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-[#ECE7DE]">
              <Boxes class="w-8 h-8 text-[#8F6F3E]" />
            </div>
            <h3 class="text-4xl font-bold text-[#2B2620] mb-4">Live Stock Tracking</h3>
            <p class="text-[#6E675C] text-lg leading-relaxed">Maintain a pristine, real-time ledger of all stock levels. Weekly inventory synchronization ensures you never lose track of a single unit.</p>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Stats Section (Color transforms dynamically in JS) -->
    <section class="py-24 bg-[#FDFCFA] text-[#2B2620] relative overflow-hidden border-y border-[#ECE7DE] transition-colors duration-1000 stats-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" data-reveal>
        <div class="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#ECE7DE]">
          <div class="py-6 stat-block">
            <div class="text-5xl font-extrabold text-[#8F6F3E] mb-2 count-up" data-val="99.9">0.0%</div>
            <div class="text-[#6E675C] font-semibold uppercase tracking-wide text-sm">Data Accuracy</div>
          </div>
          <div class="py-6 stat-block">
            <div class="text-5xl font-extrabold text-[#8F6F3E] mb-2">&lt; <span class="count-up" data-val="2">0</span>s</div>
            <div class="text-[#6E675C] font-semibold uppercase tracking-wide text-sm">Processing Time</div>
          </div>
          <div class="py-6 stat-block">
            <div class="text-5xl font-extrabold text-[#8F6F3E] mb-2"><span class="count-up" data-val="1">0</span>M+</div>
            <div class="text-[#6E675C] font-semibold uppercase tracking-wide text-sm">Labels Scanned</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works (Vertical Scrub Timeline) -->
    <section id="how-it-works" class="py-48 px-6 lg:px-8 relative bg-transparent z-10">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-32" data-reveal>
          <h2 class="text-3xl md:text-6xl font-extrabold text-inherit tracking-tight mb-6">How it works</h2>
          <p class="body-text opacity-70 font-medium">From a raw photo to perfectly structured data in seconds.</p>
        </div>
        
        <div class="relative">
          <!-- The SVG Line we will draw on scroll -->
          <svg class="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[2px] z-0" preserveAspectRatio="none">
            <line x1="1" y1="0" x2="1" y2="100%" stroke="currentColor" opacity="0.1" stroke-width="2" />
            <line class="draw-line" x1="1" y1="0" x2="1" y2="100%" stroke="#B08D57" stroke-width="4" />
          </svg>
          
          <div class="space-y-32">
            <!-- Step 1 -->
            <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group timeline-step">
              <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[#FDFCFA] text-[#2B2620] border border-[#ECE7DE] font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 text-xl step-node transition-all duration-500">01</div>
              <div class="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-10 rounded-[2rem] bg-[#FDFCFA] border border-[#ECE7DE] shadow-xl shadow-[#6E675C]/5 step-card transition-transform duration-700 hover:scale-[1.02]">
                <h3 class="font-bold text-3xl text-[#2B2620] mb-3">Centralized Database</h3>
                <p class="text-lg text-[#6E675C] leading-relaxed font-medium">Establish your foundation. Manage all your active sellers and define your baseline stock inventory in one secure workspace.</p>
              </div>
            </div>
            
            <!-- Step 2 -->
            <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group timeline-step">
              <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[#FDFCFA] text-[#2B2620] border border-[#ECE7DE] font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 text-xl step-node transition-all duration-500">02</div>
              <div class="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-10 rounded-[2rem] bg-[#FDFCFA] border border-[#ECE7DE] shadow-xl shadow-[#6E675C]/5 step-card transition-transform duration-700 hover:scale-[1.02]">
                <h3 class="font-bold text-3xl text-[#2B2620] mb-3">Batch Extraction</h3>
                <p class="text-lg text-[#6E675C] leading-relaxed font-medium">Upload daily batches of shipping labels. The Vision AI instantly extracts critical data and cross-references it against your active inventory.</p>
              </div>
            </div>
            
            <!-- Step 3 -->
            <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group timeline-step">
              <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[#FDFCFA] text-[#2B2620] border border-[#ECE7DE] font-mono font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 text-xl step-node transition-all duration-500">03</div>
              <div class="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-10 rounded-[2rem] bg-[#FDFCFA] border border-[#ECE7DE] shadow-xl shadow-[#6E675C]/5 step-card transition-transform duration-700 hover:scale-[1.02]">
                <h3 class="font-bold text-3xl text-[#2B2620] mb-3">Automated Ledger</h3>
                <p class="text-lg text-[#6E675C] leading-relaxed font-medium">With one click, reconcile shipments. The engine automatically deducts stock, audits records, and maintains an immutable historical grid.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pre-Footer CTA -->
    <section class="py-24 bg-[#211D19] text-[#F2EAD9] relative overflow-hidden border-t border-[#2B2620] z-20">
      <!-- Decor -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjQyLDIzNCwyMTcsMC4wNSkiLz48L3N2Zz4=')] opacity-100"></div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,#B08D57_0%,transparent_70%)] opacity-20 pointer-events-none"></div>
      
      <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10" data-reveal>
        <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#FDFCFA]">Ready to scale your dropshipping operation?</h2>
        <p class="text-xl text-[#F2EAD9]/80 mb-10 font-medium max-w-2xl mx-auto">Log in to the secure internal portal to begin extracting shipping data.</p>
        <router-link to="/login" class="inline-flex items-center justify-center h-14 px-10 bg-[#F2EAD9] text-[#211D19] hover:bg-[#FDFCFA] font-bold rounded-full transition-all hover:scale-105 duration-200 text-base shadow-xl shadow-[#B08D57]/10">
          Access System
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full bg-[#211D19] text-[#F2EAD9]/70 pt-24 pb-12 z-20 relative">
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

  
    <!-- Back to top button -->
    <transition name="fade">
      <button 
        v-if="showBackToTop" 
        @click="scrollToTop" 
        class="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#B08D57] text-[#211D19] rounded-full flex items-center justify-center shadow-2xl shadow-[#211D19]/40 hover:bg-[#8F6F3E] hover:text-[#F2EAD9] hover:-translate-y-1 transition-all duration-300"
        aria-label="Back to top"
      >
        <ArrowUp class="w-6 h-6" />
      </button>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Lenis from '@studio-freight/lenis';
import { Box, Camera, Database, FileSpreadsheet, Check, FileText, ArrowUp, Users, Boxes } from 'lucide-vue-next';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const companyName = import.meta.env.VITE_COMPANY_NAME || 'Label Tracker Pro';

const heroMockup = ref(null);
const heroSection = ref(null);
const engineWrapper = ref(null);
const enginePin = ref(null);

const showBackToTop = ref(false);
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500;
};
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


const handleMouseMove = (e) => {
  if (!heroMockup.value || !heroSection.value) return;
  const rect = heroSection.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((centerY - y) / centerY) * 12;
  const rotateY = ((x - centerX) / centerX) * 12;
  
  gsap.to(heroMockup.value, {
    rotateX: rotateX,
    rotateY: rotateY,
    duration: 0.5,
    ease: 'power2.out',
    transformPerspective: 1200,
    transformOrigin: 'center center'
  });
};


const scrollDown = () => {
  window.scrollTo({
    top: window.innerHeight * 0.8,
    behavior: 'smooth'
  });
};

const handleMouseLeave = () => {
  if (!heroMockup.value) return;
  gsap.to(heroMockup.value, {
    rotateX: 6,
    rotateY: -12,
    duration: 1.5,
    ease: 'elastic.out(1, 0.5)'
  });
};

onMounted(() => {
  // Initialize Lenis for buttery smooth, slightly slower scroll
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.75, // Slower
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP with Lenis
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0, 0);

  // Modern Portfolio Hero Entrance Animation
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
  
  gsap.set('.hero-word', { y: '100%' });
  gsap.set('.hero-desc', { opacity: 0, y: 20 });
  gsap.set('.hero-btns', { opacity: 0, y: 20 });
  
  heroTl.to('.hero-word', { y: '0%', duration: 1.2, stagger: 0.15 }, "-=0.6")
        .to('.hero-desc', { opacity: 1, y: 0, duration: 1 }, "-=0.8")
        .to('.hero-btns', { opacity: 1, y: 0, duration: 1 }, "-=0.8");

  window.addEventListener("scroll", handleScroll);
  gsap.registerPlugin(ScrollTrigger);
  
  
  
  // 1. Basic Entrance Reveals
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
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  // 2. Parallax Floating Elements in Hero
  gsap.utils.toArray('.parallax-el').forEach(layer => {
    const depth = layer.dataset.speed;
    const movement = -(layer.offsetHeight * depth);
    gsap.to(layer, {
      y: movement,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // 3. ZOOM-THROUGH SCRUB FOR 50/50 LAYOUT
  if (heroMockup.value) {
    // Initial 3D tilt
    gsap.set('.hero-mockup-wrapper', { 
      rotateX: 10, 
      rotateY: -15,
      transformPerspective: 1200,
    });
    
    // Zoom out on scroll
    gsap.to('.hero-mockup-wrapper', {
      scale: 1.2,
      opacity: 0,
      y: 100,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=100%",
        scrub: 1
      }
    });
  }
  // 4. Statement Text Word-by-Word Highlight
  const statementWords = gsap.utils.toArray('.statement-word');
  if (statementWords.length > 0) {
    gsap.to(statementWords, {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".statement-section",
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      }
    });
  }

  // 5. CINEMATIC PINNED CARD STACK (HEAVY IMMERSIVE)
  if (engineWrapper.value) {
    // Set initial states
    gsap.set('.card-2', { y: '150%', scale: 0.8, opacity: 0, rotateX: 20 });
    gsap.set('.card-3', { y: '150%', scale: 0.8, opacity: 0, rotateX: 20 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: engineWrapper.value,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      }
    });
    
    // Animate Card 1 out, Card 2 in
    tl.to('.card-1', { scale: 0.9, opacity: 0.3, y: '-10%', duration: 1 })
      .to('.card-2', { y: '0%', scale: 1, opacity: 1, rotateX: 0, duration: 1, ease: 'power2.out' }, "<")
    // Animate Card 2 out, Card 3 in
      .to('.card-2', { scale: 0.9, opacity: 0.3, y: '-10%', duration: 1 })
      .to('.card-3', { y: '0%', scale: 1, opacity: 1, rotateX: 0, duration: 1, ease: 'power2.out' }, "<")
    
  }

  // 6. Dynamic Background Color Shift (Sand to Dark Anchor)
  gsap.to('.main-wrapper', {
    backgroundColor: '#211D19', // Dark Anchor
    color: '#F2EAD9',
    ease: 'none',
    scrollTrigger: {
      trigger: '#how-it-works',
      start: 'top 60%',
      end: 'top 20%',
      scrub: true
    }
  });

  // 7. Timeline Draw SVG & Nodes
  const drawLine = document.querySelector('.draw-line');
  if (drawLine) {
    const length = 2000;
    gsap.set(drawLine, { strokeDasharray: length, strokeDashoffset: length });
    
    gsap.to(drawLine, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#how-it-works",
        start: "top 50%",
        end: "bottom 80%",
        scrub: true
      }
    });
  }
  
  const steps = gsap.utils.toArray('.timeline-step');
  steps.forEach((step, i) => {
    const node = step.querySelector('.step-node');
    const card = step.querySelector('.step-card');
    gsap.to(node, {
      backgroundColor: '#B08D57',
      color: '#F2EAD9',
      borderColor: '#B08D57',
      scale: 1.2,
      scrollTrigger: {
        trigger: step,
        start: "top 60%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse"
      }
    });
    // Add a parallax float to the step cards
    gsap.fromTo(card, 
      { y: 50 }, 
      { y: -20, 
        ease: "none",
        scrollTrigger: {
          trigger: step,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  // 8. Stats Counter
  const counters = gsap.utils.toArray('.count-up');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-val'));
    const isFloat = target % 1 !== 0;
    
    ScrollTrigger.create({
      trigger: counter,
      start: "top 85%",
      once: true,
      onEnter: () => {
        let current = { val: 0 };
        gsap.to(current, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            counter.innerHTML = isFloat ? current.val.toFixed(1) + '%' : Math.floor(current.val);
          }
        });
      }
    });
  });

  setTimeout(() => {
    els.forEach(el => {
      if (parseFloat(window.getComputedStyle(el).opacity) === 0) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });
  }, 3000);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Typography & Tokens */
.font-sans { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.display-title {
  font-size: clamp(3.5rem, 6vw, 5.5rem);
  letter-spacing: -0.04em;
}
.body-text {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
}

.btn-primary {
  display: inline-flex; align-items: center; justify-content: center;
  height: 3.5rem; padding: 0 2.5rem;
  background-color: #211D19; color: #F2EAD9;
  font-weight: 700; border-radius: 9999px;
  transition: all 0.2s;
}
.btn-primary:hover {
  background-color: #2B2620; transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(33, 29, 25, 0.2);
}
.btn-secondary {
  display: inline-flex; align-items: center; justify-content: center;
  height: 3.5rem; padding: 0 2.5rem;
  background-color: #FDFCFA; color: #2B2620;
  font-weight: 700; border-radius: 9999px; border: 1px solid #ECE7DE;
  transition: all 0.2s;
}
.btn-secondary:hover {
  background-color: #FAF8F4; border-color: #6E675C;
}

.perspective-1000 { perspective: 1000px; }

/* Marquee Animation */
.marquee-container {
  display: flex;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}
.marquee-content {
  animation: marquee 20s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* Immersive Hero Animations */

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
}
.animate-scroll-wheel {
  animation: scroll-wheel 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes spin-slow {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  animation: gradient 6s ease infinite;
}
</style>
