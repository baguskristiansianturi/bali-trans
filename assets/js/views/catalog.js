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
