/* HOME PAGE */
function renderHomeView() {
            const popularTours = (typeof BALI_PACKAGES !== 'undefined' ? BALI_PACKAGES : []).filter(pkg => pkg.category === 'tour').slice(0,6);
            const tourImageFallbacks = ['https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85'];
            const activities = [
                { key:'water', icon:'fa-water', title:'Water activities', desc:'Snorkelling, diving and watersports' },
                { key:'temple', icon:'fa-landmark', title:'Culture & temples', desc:'Temples, villages and local arts' },
                { key:'atv', icon:'fa-mountain-sun', title:'Outdoor adventures', desc:'Rafting, ATV and trekking ideas' },
                { key:'driver', icon:'fa-car-side', title:'Private transport', desc:'Plan routes with a private driver' }
            ];
            const guides = (typeof BALI_BLOGS !== 'undefined' ? BALI_BLOGS : []).slice(0,3);
            return `
                <section class="relative isolate overflow-hidden bg-slate-950 min-h-[440px] md:min-h-[500px] flex items-center">
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=85" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2000&q=85'" alt="Bali coastline and tropical landscape" class="absolute inset-0 z-0 h-full w-full object-cover" fetchpriority="high">
                    <div class="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25"></div>
                    <div class="relative z-20 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                        <div class="max-w-3xl">
                            <span class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-teal-200 backdrop-blur"><i class="fas fa-compass"></i> DISCOVER BALI</span>
                            <h1 class="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Find your way around <span class="text-teal-300">Bali</span></h1>
                            <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">From coastal towns and island trips to highland villages and cultural landmarks. Start with an area or search for an activity that fits your plans.</p>
                            <div class="mt-7 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row">
                                <label for="heroSearchInput" class="flex min-w-0 flex-1 items-center gap-3 px-3 py-2"><i class="fas fa-search text-teal-600"></i><input id="heroSearchInput" type="search" class="w-full min-w-0 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500" placeholder="Try Lovina, Canggu, waterfalls..."></label>
                                <button type="button" onclick="executeHeroSearch()" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-teal-700"><i class="fas fa-search"></i> Explore</button>
                            </div>
                            <div class="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-white">
                                <button onclick="quickFilterSearch('water')" class="rounded-full border border-white/30 bg-white/10 px-3 py-2 hover:bg-white/20">Water activities</button>
                                <button onclick="quickFilterSearch('temple')" class="rounded-full border border-white/30 bg-white/10 px-3 py-2 hover:bg-white/20">Culture & temples</button>
                                <button onclick="quickFilterSearch('atv')" class="rounded-full border border-white/30 bg-white/10 px-3 py-2 hover:bg-white/20">Outdoor adventures</button>
                                <button onclick="quickFilterSearch('driver')" class="rounded-full border border-white/30 bg-white/10 px-3 py-2 hover:bg-white/20">Private transport</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="relative z-10 mx-auto -mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:grid-cols-4 sm:gap-4 sm:p-5">
                        <a href="./bali-airport-transfer.html" class="flex items-center gap-3 rounded-xl p-1 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><i class="fas fa-plane-arrival"></i></span><span><strong class="block text-sm text-slate-900">Airport Transfer</strong><small class="text-xs text-slate-500">Airport pickup & drop-off</small></span></a>
                        <a href="./bali-port-transfer.html" class="flex items-center gap-3 rounded-xl p-1 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><i class="fas fa-ship"></i></span><span><strong class="block text-sm text-slate-900">Port Transfer</strong><small class="text-xs text-slate-500">Harbour connections</small></span></a>
                        <a href="./bali-intercity-transfer.html" class="flex items-center gap-3 rounded-xl p-1 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><i class="fas fa-route"></i></span><span><strong class="block text-sm text-slate-900">Intercity Transfer</strong><small class="text-xs text-slate-500">Between towns and stays</small></span></a>
                        <a href="./bali-private-day-tour.html" class="flex items-center gap-3 rounded-xl p-1 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><i class="fas fa-map-marked-alt"></i></span><span><strong class="block text-sm text-slate-900">Private Day Tour</strong><small class="text-xs text-slate-500">Explore Bali your way</small></span></a>
                    </div>
                </section>

                <section class="home-popular-tours mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
                    <div class="mb-6 flex items-end justify-between gap-4">
                        <div><p class="text-xs font-extrabold uppercase tracking-[.16em] text-teal-700">Discover your next experience</p><h2 class="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Popular Tours in Bali</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Memorable experiences, handpicked for your Bali trip.</p></div>
                        <button type="button" onclick="navigateTo('catalog')" class="hidden shrink-0 text-sm font-extrabold text-teal-700 sm:inline-flex">View all tours <i class="fas fa-arrow-right ml-2"></i></button>
                    </div>
                    <div class="home-popular-tours-grid">
                        ${popularTours.map(pkg => {
                            const image = tourImageFallbacks[popularTours.indexOf(pkg)] || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85';
                            const title = pkg.title || 'Bali Tour';
                            const area = /lovina|dolphin/i.test(title + ' ' + (pkg.location || '')) ? 'North Bali' : ((pkg.location || 'Bali').split(',').slice(-1)[0].trim() || 'Bali');
                            const duration = pkg.durationLabel || pkg.duration || 'Private tour';
                            const price = Number(pkg.priceIDR || 0);
                            const original = Number(pkg.originalPriceIDR || 0);
                            const money = (typeof CURRENCY_RATES !== 'undefined' && CURRENCY_RATES[currentCurrency]) ? CURRENCY_RATES[currentCurrency].format(price) : ('Rp ' + price.toLocaleString('id-ID'));
                            const oldMoney = original > price ? ((typeof CURRENCY_RATES !== 'undefined' && CURRENCY_RATES[currentCurrency]) ? CURRENCY_RATES[currentCurrency].format(original) : ('Rp ' + original.toLocaleString('id-ID'))) : '';
                            const desc = (pkg.shortDescription || pkg.description || (pkg.highlights && pkg.highlights[0]) || 'Explore Bali with a private tour designed around your trip.').replace(/<[^>]*>/g,'').slice(0,105);
                            return `<button type="button" class="home-tour-card group" onclick="navigateTo('detail','${pkg.id}')">
                                <span class="home-tour-visual">
                                    <img src="${image}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85'" alt="${title}" loading="eager">
                                    <span class="home-tour-image-shade"></span>
                                    <span class="home-tour-badges"><span>${area}</span><span>${duration}</span></span>
                                    <span class="home-tour-overlay-copy"><strong>${title}</strong><span>${desc}</span></span>
                                    ${pkg.badge ? `<span class="home-tour-tag">${pkg.badge}</span>` : ''}
                                </span>
                                <span class="home-tour-card-bottom">
                                    <span class="home-tour-price-label">Starting from</span>
                                    <span class="home-tour-price-line"><strong>${money}</strong>${oldMoney ? `<del>${oldMoney}</del>` : ''}<small>/ person</small></span>
                                    <span class="home-tour-cta">Explore tour <i class="fas fa-arrow-right"></i></span>
                                </span>
                            </button>`;
                        }).join('')}
                        ${popularTours.length ? '' : '<p class="text-sm text-slate-600">Tours are being prepared. Please check back soon.</p>'}
                    </div>
                    <div class="mt-5 text-center sm:hidden"><button type="button" onclick="navigateTo('catalog')" class="rounded-full border border-slate-300 px-5 py-3 text-xs font-extrabold text-slate-800">View all tours <i class="fas fa-arrow-right ml-1"></i></button></div>
                </section>

                <section class="border-y border-slate-200 bg-slate-50 py-12 sm:py-14">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="mb-6"><p class="text-xs font-extrabold uppercase tracking-[.16em] text-teal-700">Browse by interest</p><h2 class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">What would you like to do?</h2></div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            ${activities.map(activity => `<button type="button" onclick="quickFilterSearch('${activity.key}')" class="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-teal-300 hover:shadow-md"><span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-lg text-teal-700"><i class="fas ${activity.icon}"></i></span><span><strong class="block text-sm font-extrabold text-slate-900">${activity.title}</strong><span class="mt-1 block text-xs leading-5 text-slate-600">${activity.desc}</span><span class="mt-3 block text-xs font-extrabold text-teal-700">Explore ideas →</span></span></button>`).join('')}
                        </div>
                    </div>
                </section>

                <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
                    <div class="mb-7 flex items-end justify-between gap-4"><div><p class="text-xs font-extrabold uppercase tracking-[.16em] text-teal-700">Trip ideas</p><h2 class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Experiences to start planning with</h2><p class="mt-2 text-sm text-slate-600">Review the available details and confirm prices, routes and availability with the team.</p></div><button type="button" onclick="navigateTo('packages')" class="shrink-0 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-800 hover:border-teal-500">All activities <i class="fas fa-arrow-right ml-1"></i></button></div>
                    <div id="homeFeaturedGrid" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">${renderPackageCards(BALI_PACKAGES.slice(0,3))}</div>
                </section>

                <section class="bg-white py-12 sm:py-14">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="mb-7"><p class="text-xs font-extrabold uppercase tracking-[.16em] text-teal-700">Travel notes</p><h2 class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Useful guides before you go</h2></div>
                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            ${guides.map(guide => `<article class="overflow-hidden rounded-2xl border border-slate-200 bg-white"><img src="${guide.image}" alt="" loading="lazy" class="h-44 w-full object-cover"><div class="p-4"><p class="text-[11px] font-bold uppercase tracking-wide text-teal-700">${guide.category || 'Travel guide'}</p><h3 class="mt-2 text-base font-extrabold leading-snug text-slate-900">${guide.title}</h3><p class="mt-2 text-sm leading-6 text-slate-600">${guide.snippet || ''}</p><button type="button" onclick="navigateTo('blog-read','${guide.id}')" class="mt-4 text-xs font-extrabold text-teal-700 hover:text-teal-900">Read guide <i class="fas fa-arrow-right ml-1"></i></button></div></article>`).join('')}
                        </div>
                        <div class="mt-6 text-center"><button type="button" onclick="navigateTo('blog')" class="rounded-full border border-slate-300 px-5 py-3 text-xs font-extrabold text-slate-800 hover:border-teal-500">View all travel guides</button></div>
                    </div>
                </section>

                <section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
                    <div class="flex flex-col gap-4 rounded-3xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><h2 class="text-xl font-black sm:text-2xl">Planning a trip across Bali?</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Tell us where you want to go, your dates and group size. We can help clarify the route and service details before you decide.</p></div><button type="button" onclick="navigateTo('contact')" class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-teal-400">Ask the team <i class="fas fa-arrow-right"></i></button></div>
                </section>
            `;
        }
