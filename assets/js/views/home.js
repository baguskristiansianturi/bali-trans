function renderHomeView() {
            return `
                <!-- HERO SECTION WITH KLOOK SEARCH WIDGET -->
                <div class="relative bg-slate-900 min-h-[480px] md:min-h-[540px] flex items-center justify-center overflow-hidden">
                    <!-- Hero Background Image with Overlay -->
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=80" class="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

                    <div class="relative max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 text-center z-10">
                        <span class="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 backdrop-blur-md border border-orange-500/30 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                            <i class="fas fa-bolt text-klook-orange"></i> Instant Confirmation & Best Price Guaranteed
                        </span>
                        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
                            Your Ultimate Bali Experience <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Starts Here</span>
                        </h1>
                        <p class="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
                            Book top-rated day tours, private drivers, Nusa Penida fast boats, and thrilling water sports with instant e-vouchers.
                        </p>

                        <!-- KLOOK TABS & SEARCH CONTAINER -->
                        <div class="bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-2xl max-w-4xl mx-auto text-left border border-white/20">
                            <!-- Filter Pill Quick Tabs -->
                            <div class="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 border-b border-slate-100 hide-scrollbar text-xs font-bold">
                                <button onclick="quickFilterSearch('all')" class="px-4 py-2 bg-klook-orange text-white rounded-full whitespace-nowrap shadow-sm">All Experiences</button>
                                <button onclick="quickFilterSearch('driver')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🚗 Private Driver</button>
                                <button onclick="quickFilterSearch('temple')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">⛩️ Ubud & Temples</button>
                                <button onclick="quickFilterSearch('nusa')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🏝️ Nusa Penida</button>
                                <button onclick="quickFilterSearch('water')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🌊 Water Sports</button>
                                <button onclick="quickFilterSearch('atv')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🏍️ ATV & Rafting</button>
                            </div>

                            <!-- Search Input Inputs -->
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                                <div class="md:col-span-5 relative">
                                    <label class="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block px-3">Destination / Activity</label>
                                    <div class="flex items-center px-3 py-1">
                                        <i class="fas fa-location-dot text-klook-orange mr-2"></i>
                                        <input type="text" id="heroSearchInput" placeholder="Where in Bali? (e.g., Ubud, Uluwatu)" class="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder-slate-400">
                                    </div>
                                </div>
                                <div class="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-3">
                                    <label class="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block px-3">Travel Date</label>
                                    <div class="flex items-center px-3 py-1">
                                        <i class="far fa-calendar-alt text-klook-orange mr-2"></i>
                                        <input type="date" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none">
                                    </div>
                                </div>
                                <div class="md:col-span-3">
                                    <button onclick="executeHeroSearch()" class="w-full bg-klook-orange hover:bg-klook-hover text-white font-extrabold py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
                                        <i class="fas fa-search"></i> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CATEGORY ICON PILLS GRID -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                    <div class="bg-white rounded-3xl p-6 klook-shadow border border-slate-100 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
                        <div onclick="filterByCategory('temple'); navigateTo('packages');" class="group cursor-pointer p-3 rounded-2xl hover:bg-klook-light transition">
                            <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition">⛩️</div>
                            <span class="text-xs font-bold text-slate-800 group-hover:text-klook-orange">Temple & Art</span>
                        </div>
                        <div onclick="filterByCategory('nusa'); navigateTo('packages');" class="group cursor-pointer p-3 rounded-2xl hover:bg-klook-light transition">
                            <div class="w-14 h-14 mx-auto rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition">🏝️</div>
                            <span class="text-xs font-bold text-slate-800 group-hover:text-klook-orange">Nusa Penida</span>
                        </div>
                        <div onclick="filterByCategory('water'); navigateTo('packages');" class="group cursor-pointer p-3 rounded-2xl hover:bg-klook-light transition">
                            <div class="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition">🪂</div>
                            <span class="text-xs font-bold text-slate-800 group-hover:text-klook-orange">Water Sports</span>
                        </div>
                        <div onclick="filterByCategory('driver'); navigateTo('packages');" class="group cursor-pointer p-3 rounded-2xl hover:bg-klook-light transition">
                            <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition">🚘</div>
                            <span class="text-xs font-bold text-slate-800 group-hover:text-klook-orange">Private Driver</span>
                        </div>
                        <div onclick="filterByCategory('atv'); navigateTo('packages');" class="group cursor-pointer p-3 rounded-2xl hover:bg-klook-light transition">
                            <div class="w-14 h-14 mx-auto rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition">🏍️</div>
                            <span class="text-xs font-bold text-slate-800 group-hover:text-klook-orange">ATV & Rafting</span>
                        </div>
                        <div onclick="navigateTo('blog');" class="group cursor-pointer p-3 rounded-2xl hover:bg-klook-light transition">
                            <div class="w-14 h-14 mx-auto rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition">📖</div>
                            <span class="text-xs font-bold text-slate-800 group-hover:text-klook-orange">Bali Guides</span>
                        </div>
                    </div>
                </div>

                <!-- FEATURED PACKAGES GRID (KLOOK CARDS) -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <span class="text-xs font-black text-klook-orange uppercase tracking-wider">Top Recommended Experiences</span>
                            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Trending Bali Activities</h2>
                        </div>
                        <button onclick="navigateTo('packages')" class="inline-flex items-center text-xs font-bold text-klook-orange hover:text-klook-hover gap-2 bg-orange-50 hover:bg-orange-100 px-4 py-2.5 rounded-full transition">
                            View All Activities <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>

                    <!-- Package Cards Grid -->
                    <div id="homeFeaturedGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${renderPackageCards(BALI_PACKAGES)}
                    </div>
                </div>

                <!-- WHY CHOOSE BALI EXPLORER (KLOOK VALUE PROP) -->
                <div class="bg-white py-16 border-y border-slate-200">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center max-w-2xl mx-auto mb-12">
                            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Why Travelers Choose Us</h2>
                            <p class="text-slate-500 text-sm mt-2">Hassle-free booking experience with top-rated local Balinese hospitality drivers and operators.</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <div class="w-12 h-12 rounded-2xl bg-orange-100 text-klook-orange flex items-center justify-center text-xl font-bold flex-shrink-0">⚡</div>
                                <div>
                                    <h4 class="font-extrabold text-slate-900 mb-1">Instant Voucher Confirmation</h4>
                                    <p class="text-xs text-slate-500 leading-relaxed">Book in 60 seconds and receive instant digital QR e-vouchers on your smartphone.</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold flex-shrink-0">🏷️</div>
                                <div>
                                    <h4 class="font-extrabold text-slate-900 mb-1">Best Price Guarantee</h4>
                                    <p class="text-xs text-slate-500 leading-relaxed">Direct partner prices with no hidden booking charges or surprise fees at pickup.</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold flex-shrink-0">💬</div>
                                <div>
                                    <h4 class="font-extrabold text-slate-900 mb-1">24/7 WhatsApp Concierge</h4>
                                    <p class="text-xs text-slate-500 leading-relaxed">Dedicated local Balinese support team ready to assist your itinerary updates anytime.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TESTIMONIALS CAROUSEL SECTION -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div class="text-center mb-10">
                        <span class="text-xs font-black text-klook-orange uppercase tracking-wider">Verified Reviews</span>
                        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Loved by 50,000+ Happy Travelers</h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                            <div class="flex items-center gap-1 text-amber-400 mb-3 text-sm">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed mb-4 italic">"The Nusa Penida tour was seamless! Our driver Pak Wayan was extremely polite, drove safely, and took photo-worthy pictures at Kelingking Beach."</p>
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-full bg-slate-200 font-bold flex items-center justify-center text-xs">JD</div>
                                <div>
                                    <h5 class="text-xs font-bold text-slate-900">Jessica Davies</h5>
                                    <span class="text-[10px] text-slate-400">Australia • Verified Booking</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                            <div class="flex items-center gap-1 text-amber-400 mb-3 text-sm">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed mb-4 italic">"Hired the private driver for 3 days in Ubud. Great air-conditioned car, very punctual, and knew all the best local Warungs for lunch."</p>
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-full bg-slate-200 font-bold flex items-center justify-center text-xs">MK</div>
                                <div>
                                    <h5 class="text-xs font-bold text-slate-900">Marcus Chen</h5>
                                    <span class="text-[10px] text-slate-400">Singapore • Verified Booking</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                            <div class="flex items-center gap-1 text-amber-400 mb-3 text-sm">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed mb-4 italic">"Rafting and ATV combo is a must try! Super fun guide, locker facilities were clean, and lunch was surprisingly delicious."</p>
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-full bg-slate-200 font-bold flex items-center justify-center text-xs">SL</div>
                                <div>
                                    <h5 class="text-xs font-bold text-slate-900">Sophie Laurent</h5>
                                    <span class="text-[10px] text-slate-400">France • Verified Booking</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        /* VIEW 2: ALL PACKAGES & CATALOG PAGE WITH FILTER BAR */
