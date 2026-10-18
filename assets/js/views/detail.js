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
