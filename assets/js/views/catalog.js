/* VIEW 2: ALL PACKAGES & CATALOG PAGE WITH FILTER BAR */
        function renderPackagesCatalogView() {
            const query = String(window.packageCatalogQuery || '').trim().toLocaleLowerCase();
            const filtered = BALI_PACKAGES.filter(pkg => {
                const haystack = [pkg.title, pkg.location, pkg.categoryName, pkg.category, ...(pkg.highlights || []).map(String), ...(pkg.options || []).map(option => option.name)].filter(Boolean).join(' ').toLocaleLowerCase();
                const categoryMatch = selectedCategoryFilter === 'all' || (selectedCategoryFilter === 'water' && /dolphin|snorkel|water|sea|boat/i.test(haystack)) || (selectedCategoryFilter === 'temple' && /temple|culture|heritage/i.test(haystack)) || (selectedCategoryFilter === 'atv' && /atv|trekking|adventure|rafting/i.test(haystack)) || (selectedCategoryFilter === 'driver' && /transport|driver|private/i.test(haystack));
                return categoryMatch && (!query || haystack.includes(query));
            });
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="mb-8">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Bali Trans experiences</span>
                        <h1 class="text-3xl font-extrabold text-slate-900">Tours & Activities in Bali</h1>
                        <p class="text-sm text-slate-500 mt-2 max-w-2xl">Review the itinerary, inclusions and trip details before enquiring.</p>
                        <label class="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                            <i class="fas fa-search text-teal-600"></i>
                            <input id="packageSearchInput" type="search" value="${query.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}" oninput="filterPackageCatalog(this.value)" placeholder="Search tours, destinations or activities..." class="w-full min-w-0 text-sm text-slate-800 outline-none">
                            <button type="button" onclick="filterPackageCatalog('')" class="shrink-0 text-xs font-bold text-slate-500">Clear</button>
                        </label>
                    </div>
                    <div id="packageCatalogResults" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${renderPackageCards(filtered)}
                    </div>
                </div>
            `;
        }

        function filterPackageCatalog(query) {
            window.packageCatalogQuery = String(query || '');
            const results = document.getElementById('packageCatalogResults');
            if (results) results.innerHTML = renderPackageCards(BALI_PACKAGES.filter(pkg => {
                const haystack = [pkg.title, pkg.location, pkg.categoryName, pkg.category, ...(pkg.highlights || []).map(String), ...(pkg.options || []).map(option => option.name)].filter(Boolean).join(' ').toLocaleLowerCase();
                const q = window.packageCatalogQuery.trim().toLocaleLowerCase();
                const categoryMatch = selectedCategoryFilter === 'all' || (selectedCategoryFilter === 'water' && /dolphin|snorkel|water|sea|boat/i.test(haystack)) || (selectedCategoryFilter === 'temple' && /temple|culture|heritage/i.test(haystack)) || (selectedCategoryFilter === 'atv' && /atv|trekking|adventure|rafting/i.test(haystack)) || (selectedCategoryFilter === 'driver' && /transport|driver|private/i.test(haystack));
                return categoryMatch && (!q || haystack.includes(q));
            }));
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
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 bali-shadow bali-hover flex flex-col justify-between group relative">
                        <!-- Image Container -->
                        <div class="relative h-52 overflow-hidden bg-slate-100">
                            <img src="${pkg.heroImage}" alt="${pkg.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            
                            <!-- Rating Pill -->
                            <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full">${pkg.categoryName}</div>

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
                                    <i class="fas fa-location-dot text-bali-orange"></i> ${pkg.location}
                                </span>
                                <h3 onclick="navigateTo('detail', '${pkg.id}')" class="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-bali-orange cursor-pointer transition mb-3">
                                    ${pkg.title}
                                </h3>

                                <!-- bali Style Tags -->
                                <div class="flex flex-wrap gap-1.5 mb-4">
                                    ${pkg.instantConfirmation ? `<span class="text-[10px] bg-slate-100 font-semibold text-slate-600 px-2 py-0.5 rounded">⚡ Instant Confirmation</span>` : ''}
                                    ${pkg.freeCancellation ? `<span class="text-[10px] bg-emerald-50 font-semibold text-emerald-700 px-2 py-0.5 rounded">✓ Free Cancellation</span>` : ''}
                                </div>
                            </div>

                            <!-- Price & CTA -->
                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    ${pkg.originalPriceIDR > 0 ? `<span class="text-[10px] text-slate-400 line-through block font-medium">${formattedOrig}</span>` : ''}
                                    <div class="flex items-baseline gap-1">
                                        <span class="text-xs text-slate-500 font-medium">From</span>
                                        <span class="text-lg font-black text-slate-900">${formattedPrice}</span>
                                    </div>
                                </div>
                                <button onclick="navigateTo('detail', '${pkg.id}')" class="bg-orange-50 group-hover:bg-bali-orange group-hover:text-white text-bali-orange font-bold text-xs px-4 py-2.5 rounded-xl transition">
                                    View Options
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
