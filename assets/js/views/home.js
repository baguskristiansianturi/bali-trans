/* HOME PAGE */
function renderHomeView() {
            const regions = [
                { key:'region:south', title:'South Bali', sub:'Beaches, cliffs & watersports', destinationCount:4, activityCount:8, image:'https://commons.wikimedia.org/wiki/Special:FilePath/Cliff_at_Uluwatu_temple,_Bali.jpg?width=1200', places:'Uluwatu · Canggu · Sanur' },
                { key:'region:central', title:'Central Bali', sub:'Culture, rice terraces & highlands', destinationCount:3, activityCount:6, image:'https://commons.wikimedia.org/wiki/Special:FilePath/Rice_terraces,_Ubud,_Bali.jpg?width=900', places:'Ubud · Kintamani · Bedugul' },
                { key:'region:east', title:'East Bali', sub:'Temples, coast & quiet villages', destinationCount:8, activityCount:6, image:'https://commons.wikimedia.org/wiki/Special:FilePath/Tirta_Gangga.jpg?width=900', places:'Amed · Sidemen · Karangasem' },
                { key:'region:north', title:'North Bali', sub:'Waterfalls, lakes & dolphin trips', destinationCount:8, activityCount:9, image:'https://commons.wikimedia.org/wiki/Special:FilePath/Lovina_Beach_Bali.jpg?width=900', places:'Lovina · Munduk · Buleleng' },
                { key:'region:west', title:'West Bali', sub:'Surf coast & protected nature', destinationCount:6, activityCount:7, image:'https://commons.wikimedia.org/wiki/Special:FilePath/West_Bali_National_Park_Beach_from_Bali_Strait.jpg?width=900', places:'Medewi · Jembrana · Menjangan' },
                { key:'region:nusa', title:'Nusa Islands', sub:'Island cliffs, beaches & reefs', destinationCount:5, activityCount:6, image:'https://commons.wikimedia.org/wiki/Special:FilePath/Kelingking_Beach.jpg?width=900', places:'Penida · Lembongan · Ceningan' }
            ];
            const activities = [
                { key:'water', icon:'fa-water', title:'Water activities', desc:'Snorkelling, diving and watersports' },
                { key:'temple', icon:'fa-landmark', title:'Culture & temples', desc:'Temples, villages and local arts' },
                { key:'atv', icon:'fa-mountain-sun', title:'Outdoor adventures', desc:'Rafting, ATV and trekking ideas' },
                { key:'driver', icon:'fa-car-side', title:'Private transport', desc:'Plan routes with a private driver' }
            ];
            const guides = (typeof BALI_BLOGS !== 'undefined' ? BALI_BLOGS : []).slice(0,3);
            return `
                <section class="relative isolate overflow-hidden bg-slate-950 min-h-[440px] md:min-h-[500px] flex items-center">
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=85" alt="Bali coastline and tropical landscape" class="absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high">
                    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25"></div>
                    <div class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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

                <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
                    <div class="mb-6 flex items-end justify-between gap-4"><div><p class="text-xs font-extrabold uppercase tracking-[.16em] text-teal-700">Explore by region</p><h2 class="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Explore places you’ll love in Bali</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">From coastal escapes to cultural landmarks and green highlands, find places and experiences for your Bali trip.</p></div></div>
                    <div class="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
                        ${regions.map(region => `<button type="button" onclick="navigateTo('discovery','${region.key}')" class="group w-[78vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:max-w-none">
                            <div class="relative h-40 overflow-hidden"><img src="${region.image}" alt="${region.title}" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"><span class="absolute bottom-3 left-3 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-bold text-white">${region.places}</span></div>
                            <div class="p-4"><h3 class="text-lg font-extrabold text-slate-900">${region.title}</h3><p class="mt-1 text-sm text-slate-600">${region.sub}</p><div class="mt-3 flex flex-wrap gap-2"><span class="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">${region.destinationCount} destinations</span><span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">${region.activityCount} activity types</span></div><span class="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-teal-700">Explore region <i class="fas fa-arrow-right"></i></span></div>
                        </button>`).join('')}
                    </div>
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
