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
        function renderPackagesCatalogView() {
            let filtered = BALI_PACKAGES;
            if (selectedCategoryFilter !== 'all') {
                filtered = filtered.filter(p => p.category === selectedCategoryFilter);
            }
            if (selectedSearchQuery) {
                const query = selectedSearchQuery.toLocaleLowerCase();
                filtered = filtered.filter(p =>
                    p.title.toLocaleLowerCase().includes(query) ||
                    p.location.toLocaleLowerCase().includes(query) ||
                    p.categoryName.toLocaleLowerCase().includes(query) ||
                    p.highlights.some(item => item.toLocaleLowerCase().includes(query))
                );
            }

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <!-- Catalog Header -->
                    <div class="mb-8">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Explore All Activities</span>
                        <h1 class="text-3xl font-extrabold text-slate-900">Bali Tour Packages & Things To Do</h1>
                    </div>

                    <!-- Category Pills Filter Bar -->
                    <div class="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 hide-scrollbar border-b border-slate-200">
                        <button onclick="filterByCategory('all'); navigateTo('packages');" class="px-5 py-2.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter==='all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">All Experiences (${BALI_PACKAGES.length})</button>
                        <button onclick="filterByCategory('temple'); navigateTo('packages');" class="px-5 py-2.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter==='temple' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">⛩️ Ubud & Temples</button>
                        <button onclick="filterByCategory('nusa'); navigateTo('packages');" class="px-5 py-2.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter==='nusa' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">🏝️ Nusa Penida</button>
                        <button onclick="filterByCategory('water'); navigateTo('packages');" class="px-5 py-2.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter==='water' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">🌊 Water Sports</button>
                        <button onclick="filterByCategory('driver'); navigateTo('packages');" class="px-5 py-2.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter==='driver' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">🚗 Private Driver</button>
                        <button onclick="filterByCategory('atv'); navigateTo('packages');" class="px-5 py-2.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter==='atv' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">🏍️ ATV & Rafting</button>
                    </div>

                    <!-- Catalog Package Cards Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${filtered.length ? renderPackageCards(filtered) : '<div class="col-span-full rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center"><h2 class="text-lg font-extrabold text-slate-900 mb-2">No matching experiences found</h2><p class="text-sm text-slate-500 mb-5">Try another destination or activity.</p><button onclick="filterByCategory(\'all\'); navigateTo(\'packages\')" class="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white">Clear filters</button></div>'}
                    </div>
                </div>
            `;
        }

        /* CARD RENDERER COMPONENT */
        function renderPackageCards(packages) {
            if (packages.length === 0) {
                return `<div class="col-span-full text-center py-12 text-slate-400 font-medium">No packages found for this filter.</div>`;
            }

            const curr = CURRENCY_RATES[currentCurrency];

            return packages.map(pkg => {
                const formattedPrice = curr.format(pkg.priceIDR);
                const formattedOrig = curr.format(pkg.originalPriceIDR);
                const isWishlist = wishlistState.some(item => item.id === pkg.id);

                return `
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 klook-shadow klook-hover flex flex-col justify-between group relative">
                        <!-- Image Container -->
                        <div class="relative h-52 overflow-hidden bg-slate-100">
                            <img src="${pkg.heroImage}" alt="${pkg.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            
                            <!-- Rating Pill -->
                            <div class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <i class="fas fa-star text-amber-400"></i> ${pkg.rating} <span class="text-slate-400">(${pkg.reviewCount})</span>
                            </div>

                            <!-- Wishlist Heart Button -->
                            <button onclick="toggleWishlist('${pkg.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition shadow">
                                <i class="${isWishlist ? 'fas fa-heart text-rose-500' : 'far fa-heart'}"></i>
                            </button>

                            <!-- Badge Tag -->
                            ${pkg.badge ? `<span class="absolute bottom-3 left-3 badge-gradient text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow">${pkg.badge}</span>` : ''}
                        </div>

                        <!-- Content Body -->
                        <div class="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                                    <i class="fas fa-location-dot text-klook-orange"></i> ${pkg.location}
                                </span>
                                <h3 onclick="navigateTo('detail', '${pkg.id}')" class="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-klook-orange cursor-pointer transition mb-3">
                                    ${pkg.title}
                                </h3>

                                <!-- Klook Style Tags -->
                                <div class="flex flex-wrap gap-1.5 mb-4">
                                    ${pkg.instantConfirmation ? `<span class="text-[10px] bg-slate-100 font-semibold text-slate-600 px-2 py-0.5 rounded">⚡ Instant Confirmation</span>` : ''}
                                    ${pkg.freeCancellation ? `<span class="text-[10px] bg-emerald-50 font-semibold text-emerald-700 px-2 py-0.5 rounded">✓ Free Cancellation</span>` : ''}
                                </div>
                            </div>

                            <!-- Price & CTA -->
                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span class="text-[10px] text-slate-400 line-through block font-medium">${formattedOrig}</span>
                                    <div class="flex items-baseline gap-1">
                                        <span class="text-xs text-slate-500 font-medium">From</span>
                                        <span class="text-lg font-black text-slate-900">${formattedPrice}</span>
                                    </div>
                                </div>
                                <button onclick="navigateTo('detail', '${pkg.id}')" class="bg-orange-50 group-hover:bg-klook-orange group-hover:text-white text-klook-orange font-bold text-xs px-4 py-2.5 rounded-xl transition">
                                    View Options
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        /* VIEW 3: PACKAGE DETAIL PAGE */
        function renderDetailView(pkg) {
            const curr = CURRENCY_RATES[currentCurrency];
            const basePrice = curr.format(pkg.priceIDR);

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Breadcrumbs -->
                    <div class="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-4">
                        <span onclick="navigateTo('home')" class="hover:text-slate-700 cursor-pointer">Home</span>
                        <span>/</span>
                        <span onclick="filterByCategory('${pkg.category}'); navigateTo('packages');" class="hover:text-slate-700 cursor-pointer">${pkg.categoryName}</span>
                        <span>/</span>
                        <span class="text-slate-800 line-clamp-1">${pkg.title}</span>
                    </div>

                    <!-- Title & Header Meta -->
                    <div class="mb-6">
                        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">${pkg.title}</h1>
                        <div class="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                            <span class="flex items-center gap-1 text-slate-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-bold">
                                <i class="fas fa-star text-amber-500"></i> ${pkg.rating} (${pkg.reviewCount} reviews)
                            </span>
                            <span class="flex items-center gap-1"><i class="fas fa-location-dot text-klook-orange"></i> ${pkg.location}</span>
                            <span class="flex items-center gap-1"><i class="fas fa-bolt text-amber-500"></i> Instant Voucher</span>
                        </div>
                    </div>

                    <!-- Photo Gallery Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden mb-8 h-[340px] md:h-[420px]">
                        <div class="md:col-span-2 h-full">
                            <img src="${pkg.gallery[0] || pkg.heroImage}" class="w-full h-full object-cover">
                        </div>
                        <div class="hidden md:grid grid-rows-2 gap-3 h-full">
                            <img src="${pkg.gallery[1] || pkg.heroImage}" class="w-full h-full object-cover">
                            <img src="${pkg.gallery[2] || pkg.heroImage}" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <!-- Content & Sticky Sidebar Layout -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        <!-- Left Details Content (8 Cols) -->
                        <div class="lg:col-span-8 space-y-8">
                            
                            <!-- Highlights -->
                            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 class="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                                    <i class="fas fa-sparkles text-klook-orange"></i> Activity Highlights
                                </h3>
                                <ul class="space-y-3 text-xs sm:text-sm text-slate-700">
                                    ${pkg.highlights.map(h => `<li class="flex items-start gap-2.5"><i class="fas fa-check-circle text-emerald-500 mt-0.5"></i> <span>${h}</span></li>`).join('')}
                                </ul>
                            </div>

                            <!-- Package Options Selection -->
                            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 class="text-lg font-extrabold text-slate-900 mb-4">Select Package Option</h3>
                                <div class="space-y-3">
                                    ${pkg.options.map((opt, index) => `
                                        <label class="block p-4 rounded-2xl border-2 ${index === 0 ? 'border-klook-orange bg-orange-50/40' : 'border-slate-200 hover:border-slate-300'} cursor-pointer transition">
                                            <div class="flex items-start justify-between">
                                                <div class="flex items-start gap-3">
                                                    <input type="radio" name="packageOption" value="${opt.id}" ${index === 0 ? 'checked' : ''} onchange="updateBookingCalculation()" class="mt-1 accent-klook-orange">
                                                    <div>
                                                        <h4 class="font-bold text-slate-900 text-sm">${opt.name}</h4>
                                                        <p class="text-xs text-slate-500 mt-1">${opt.desc}</p>
                                                    </div>
                                                </div>
                                                <span class="text-xs font-black text-slate-900">${opt.extraPriceIDR > 0 ? '+' + curr.format(opt.extraPriceIDR) : 'Included'}</span>
                                            </div>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Timeline Itinerary -->
                            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 class="text-lg font-extrabold text-slate-900 mb-6">Itinerary Timeline</h3>
                                <div class="relative border-l-2 border-orange-200 pl-6 space-y-6 ml-2">
                                    ${pkg.itinerary.map(item => `
                                        <div class="relative">
                                            <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-klook-orange ring-4 ring-orange-100"></div>
                                            <span class="text-xs font-bold text-klook-orange block mb-0.5">${item.time}</span>
                                            <h4 class="font-extrabold text-slate-900 text-sm">${item.title}</h4>
                                            <p class="text-xs text-slate-500 mt-1">${item.desc}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Right Sticky Booking Sidebar (4 Cols) -->
                        <div class="lg:col-span-4">
                            <div class="sticky top-24 bg-white p-6 rounded-3xl border border-slate-200 klook-shadow">
                                <div class="mb-4 pb-4 border-b border-slate-100">
                                    <span class="text-xs text-slate-400 font-semibold">Starting Price</span>
                                    <div class="text-2xl font-black text-slate-900">${basePrice}</div>
                                </div>

                                <!-- Date Selection -->
                                <div class="mb-4">
                                    <label class="text-xs font-extrabold text-slate-700 block mb-1">Select Travel Date</label>
                                    <input type="date" id="bookingDateInput" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-klook-orange">
                                </div>

                                <!-- Quantity Selector -->
                                <div class="mb-6 space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <span class="text-xs font-extrabold text-slate-800 block">Adults</span>
                                            <span class="text-[10px] text-slate-400">Age 12+</span>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                            <button onclick="changeQty(-1)" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center">-</button>
                                            <span id="adultQty" class="text-sm font-extrabold w-4 text-center">1</span>
                                            <button onclick="changeQty(1)" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center">+</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Total Price Calculation Box -->
                                <div class="bg-slate-50 p-4 rounded-2xl mb-6 flex justify-between items-center">
                                    <span class="text-xs font-bold text-slate-600">Total Price</span>
                                    <span id="calculatedTotalPrice" class="text-xl font-black text-klook-orange">${basePrice}</span>
                                </div>

                                <!-- Action CTAs -->
                                <div class="space-y-2">
                                    <button onclick="addToCartCurrentPkg()" class="w-full bg-orange-100 hover:bg-orange-200 text-klook-orange font-extrabold py-3.5 px-4 rounded-2xl transition text-xs flex items-center justify-center gap-2">
                                        <i class="fas fa-cart-plus"></i> Add To Cart
                                    </button>
                                    <button onclick="bookNowCurrentPkg()" class="w-full bg-klook-orange hover:bg-klook-hover text-white font-extrabold py-3.5 px-4 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }

        /* VIEW 4: BLOG & GUIDES PAGE */
        function renderBlogListView() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="text-center max-w-2xl mx-auto mb-10">
                        <span class="text-xs font-extrabold text-klook-orange uppercase tracking-wider">Bali Travel Guides & Tips</span>
                        <h1 class="text-3xl font-extrabold text-slate-900 mt-1">Plan Your Dream Trip to Bali</h1>
                        <p class="text-slate-500 text-sm mt-2">Curated insider travel tips, food guides, and itinerary advice from local Balinese experts.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${BALI_BLOGS.map(blog => `
                            <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                <img src="${blog.image}" class="w-full h-48 object-cover">
                                <div class="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div class="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-2">
                                            <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">${blog.category}</span>
                                            <span>•</span>
                                            <span>${blog.readTime}</span>
                                        </div>
                                        <h3 class="font-extrabold text-slate-900 text-base leading-snug mb-2 hover:text-klook-orange cursor-pointer" onclick="navigateTo('blog-read', '${blog.id}')">${blog.title}</h3>
                                        <p class="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">${blog.snippet}</p>
                                    </div>
                                    <button onclick="navigateTo('blog-read', '${blog.id}')" class="text-xs font-extrabold text-klook-orange hover:underline self-start">
                                        Read Full Guide →
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        /* VIEW 5: BLOG READ DETAIL */
        function renderBlogDetailView(blog) {
            return `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <button onclick="navigateTo('blog')" class="text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-2">
                        ← Back to Travel Guides
                    </button>
                    
                    <span class="bg-orange-100 text-klook-orange text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">${blog.category}</span>
                    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4 leading-tight">${blog.title}</h1>
                    
                    <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-200">
                        <span>By <strong class="text-slate-700">${blog.author}</strong></span>
                        <span>•</span>
                        <span>Published ${blog.date}</span>
                        <span>•</span>
                        <span>${blog.readTime}</span>
                    </div>

                    <img src="${blog.image}" class="w-full h-[380px] object-cover rounded-3xl mb-8 shadow-md">

                    <div class="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                        ${blog.content}
                    </div>
                </div>
            `;
        }

        /* VIEW 6: SHOPPING CART PAGE */
        function renderCartView() {
            const curr = CURRENCY_RATES[currentCurrency];

            if (cartState.length === 0) {
                return `
                    <div class="max-w-2xl mx-auto px-4 py-20 text-center">
                        <div class="w-20 h-20 bg-orange-100 text-klook-orange rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🛒</div>
                        <h2 class="text-2xl font-extrabold text-slate-900 mb-2">Your Cart is Empty</h2>
                        <p class="text-slate-500 text-sm mb-6">Explore our top Bali experiences and add them to your cart.</p>
                        <button onclick="navigateTo('packages')" class="bg-klook-orange text-white font-extrabold px-6 py-3 rounded-2xl text-xs shadow-lg shadow-orange-500/20">
                            Browse Activities Now
                        </button>
                    </div>
                `;
            }

            let grandTotal = 0;

            return `
                <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    <h1 class="text-2xl font-black text-slate-900 mb-6">Shopping Cart (${cartState.length} Items)</h1>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div class="lg:col-span-8 space-y-4">
                            ${cartState.map((item, index) => {
                                const itemTotal = item.unitPriceIDR * item.quantity;
                                grandTotal += itemTotal;

                                return `
                                    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                                        <div class="flex items-center gap-4 w-full sm:w-auto">
                                            <img src="${item.heroImage}" class="w-20 h-20 object-cover rounded-2xl flex-shrink-0">
                                            <div>
                                                <h4 class="font-extrabold text-slate-900 text-sm leading-snug">${item.title}</h4>
                                                <span class="text-xs text-slate-400 block mt-1">Date: ${item.date} • Option: ${item.optionName}</span>
                                                <span class="text-xs font-extrabold text-slate-900 block mt-1">${curr.format(item.unitPriceIDR)} / adult</span>
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                                            <div class="flex items-center space-x-2">
                                                <button onclick="updateCartQty(${index}, -1)" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold">-</button>
                                                <span class="text-xs font-extrabold w-4 text-center">${item.quantity}</span>
                                                <button onclick="updateCartQty(${index}, 1)" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold">+</button>
                                            </div>

                                            <span class="text-sm font-black text-slate-900">${curr.format(itemTotal)}</span>

                                            <button onclick="removeFromCart(${index})" class="text-slate-400 hover:text-rose-500 text-xs font-bold">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Order Summary Box -->
                        <div class="lg:col-span-4">
                            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                <h3 class="font-extrabold text-slate-900 text-base">Order Summary</h3>
                                <div class="flex justify-between text-xs text-slate-600">
                                    <span>Subtotal</span>
                                    <span class="font-bold text-slate-900">${curr.format(grandTotal)}</span>
                                </div>
                                <div class="flex justify-between text-xs text-slate-600">
                                    <span>Service & Voucher Fee</span>
                                    <span class="font-bold text-emerald-600">FREE</span>
                                </div>
                                <div class="border-t border-slate-100 pt-3 flex justify-between items-center">
                                    <span class="font-extrabold text-slate-900 text-sm">Total</span>
                                    <span class="text-xl font-black text-klook-orange">${curr.format(grandTotal)}</span>
                                </div>
                                <button onclick="navigateTo('checkout')" class="w-full bg-klook-orange hover:bg-klook-hover text-white font-extrabold py-3.5 px-4 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        /* VIEW 7: MULTI-STEP CHECKOUT FLOW */
        function renderCheckoutView() {
            const curr = CURRENCY_RATES[currentCurrency];
            let grandTotal = cartState.reduce((sum, item) => sum + (item.unitPriceIDR * item.quantity), 0);

            return `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <!-- Step Progress Indicator -->
                    <div class="flex items-center justify-between mb-8 max-w-xl mx-auto text-xs font-bold">
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 1 ? 'text-klook-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 1 ? 'bg-klook-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">1</div>
                            <span>Guest Details</span>
                        </div>
                        <div class="h-0.5 flex-1 bg-slate-200 mx-2"></div>
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 2 ? 'text-klook-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 2 ? 'bg-klook-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">2</div>
                            <span>Payment</span>
                        </div>
                        <div class="h-0.5 flex-1 bg-slate-200 mx-2"></div>
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 3 ? 'text-klook-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 3 ? 'bg-klook-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">3</div>
                            <span>E-Voucher</span>
                        </div>
                    </div>

                    <div id="checkoutStepContainer">
                        ${renderCheckoutStepContent(currentCheckoutStep, grandTotal)}
                    </div>
                </div>
            `;
        }

        function renderCheckoutStepContent(step, totalIDR) {
            const curr = CURRENCY_RATES[currentCurrency];

            if (step === 1) {
                return `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <h3 class="text-xl font-extrabold text-slate-900">Lead Guest Information</h3>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                            <div>
                                <label class="block mb-1 text-slate-700">Full Name (Matching Passport)</label>
                                <input type="text" id="guestName"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-klook-orange">
                            </div>
                            <div>
                                <label class="block mb-1 text-slate-700">Email Address (For Voucher Delivery)</label>
                                <input type="email" id="guestEmail"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-klook-orange">
                            </div>
                            <div>
                                <label class="block mb-1 text-slate-700">WhatsApp / Phone Number</label>
                                <input type="text" id="guestPhone"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-klook-orange">
                            </div>
                            <div>
                                <label class="block mb-1 text-slate-700">Hotel Pickup Location in Bali</label>
                                <input type="text" id="guestHotel"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-klook-orange">
                            </div>
                        </div>

                        <button onclick="advanceCheckoutStep(2)" class="w-full bg-klook-orange hover:bg-klook-hover text-white font-extrabold py-3.5 px-6 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
                            Continue to Payment →
                        </button>
                    </div>
                `;
            } else if (step === 2) {
                return `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <h3 class="text-xl font-extrabold text-slate-900">Select Payment Method</h3>
                        
                        <div class="space-y-3">
                            <label class="flex items-center justify-between p-4 rounded-2xl border-2 border-klook-orange bg-orange-50/30 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <input type="radio" name="paymentMethod" checked class="accent-klook-orange">
                                    <span class="text-xs font-extrabold text-slate-900">Credit / Debit Card (Visa / Mastercard)</span>
                                </div>
                                <span class="text-xs text-slate-400">Instant</span>
                            </label>
                            <label class="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <input type="radio" name="paymentMethod" class="accent-klook-orange">
                                    <span class="text-xs font-extrabold text-slate-900">QRIS / GoPay / OVO</span>
                                </div>
                                <span class="text-xs text-slate-400">Indonesian E-Wallet</span>
                            </label>
                            <label class="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <input type="radio" name="paymentMethod" class="accent-klook-orange">
                                    <span class="text-xs font-extrabold text-slate-900">Direct WhatsApp Cash on Pickup</span>
                                </div>
                                <span class="text-xs text-slate-400">Pay Driver</span>
                            </label>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                            <span class="text-xs font-bold text-slate-600">Total Payable Amount</span>
                            <span class="text-xl font-black text-klook-orange">${curr.format(totalIDR)}</span>
                        </div>

                        <button onclick="advanceCheckoutStep(3)" class="w-full bg-klook-orange hover:bg-klook-hover text-white font-extrabold py-3.5 px-6 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
                            Preview Demo Voucher
                        </button>
                    </div>
                `;
            } else {
                // STEP 3: DIGITAL E-VOUCHER SCREEN
                const refCode = 'BALI-' + Math.floor(100000 + Math.random() * 900000);
                setTimeout(() => {
                    document.getElementById('qrcodeContainer').innerHTML = '';
                    new QRCode(document.getElementById("qrcodeContainer"), {
                        text: refCode,
                        width: 120,
                        height: 120
                    });
                }, 100);

                return `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-xl space-y-6 text-center">
                        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto">✓</div>
                        <div>
                            <span class="text-xs font-extrabold text-amber-700 uppercase tracking-widest block mb-1">Demo Preview Only</span>
                            <h2 class="text-2xl font-black text-slate-900">Your Demo Voucher Preview</h2>
                            <p class="text-xs text-slate-500 mt-1">Preview Reference: <strong class="text-slate-900">${refCode}</strong></p>
                        </div>

                        <p class="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">This is a visual prototype only. No booking has been sent, no payment has been processed, and this QR code is not a valid ticket.</p>

                        <!-- Digital QR Voucher Card -->
                        <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left max-w-md mx-auto space-y-4">
                            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                                <div>
                                    <span class="text-[10px] uppercase font-bold text-slate-400 block">Lead Traveler</span>
                                    <span class="text-xs font-extrabold text-slate-900">${document.getElementById('guestName')?.value || 'John Doe'}</span>
                                </div>
                                <div id="qrcodeContainer" class="p-1 bg-white rounded"></div>
                            </div>
                            <div>
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Booked Experiences</span>
                                <ul class="text-xs font-bold text-slate-800 space-y-1 mt-1">
                                    ${cartState.map(i => `<li>• ${i.title} (${i.quantity}x)</li>`).join('')}
                                </ul>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onclick="showToast('E-Voucher PDF downloaded to device!')" class="bg-slate-900 text-white text-xs font-extrabold px-6 py-3 rounded-2xl hover:bg-slate-800 transition">
                                <i class="fas fa-download mr-1"></i> Download Voucher PDF
                            </button>
                            <a href="https://wa.me/6281234567890?text=Hi%20BaliExplorer,%20I%20have%20booking%20code%20${refCode}" target="_blank" class="bg-emerald-500 text-white text-xs font-extrabold px-6 py-3 rounded-2xl hover:bg-emerald-600 transition flex items-center justify-center gap-1">
                                <i class="fab fa-whatsapp"></i> Send to WhatsApp Concierge
                            </a>
                        </div>
                    </div>
                `;
            }
        }

        /* ==========================================================================
           4. INTERACTIVE EVENT HANDLERS & HELPERS
           ========================================================================== */
        
        let currentDetailQty = 1;
