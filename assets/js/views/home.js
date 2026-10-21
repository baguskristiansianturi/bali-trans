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

                <section id="homeTransportServices" class="border-y border-slate-200 bg-white py-12 sm:py-16">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div class="max-w-2xl">
                                <p class="text-xs font-extrabold uppercase tracking-[.16em] text-[#4267A9]">Our Transport Service</p>
                                <h2 class="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">The right ride for your Bali journey</h2>
                                <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Choose the service that matches your plans. Explore each option to see what to prepare and request a quote for your trip.</p>
                            </div>
                            <a href="./transport-service.html" class="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#4267A9] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#35568F] md:self-auto">View all services <i class="fas fa-arrow-right"></i></a>
                        </div>
                        <div class="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <a href="./bali-airport-transfer.html" class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:border-[#4267A9]/40 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4267A9]">
                                <div class="relative"><img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80" alt="Airport terminal for arrival and departure transfers" loading="lazy" class="h-36 w-full object-cover"><span class="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#4267A9]">Airport pickup</span></div>
                                <div class="flex flex-1 flex-col p-4"><h3 class="text-base font-extrabold text-slate-900">Bali Airport Transfer</h3><p class="mt-2 flex-1 text-sm leading-6 text-slate-600">Airport pickup or drop-off to your hotel, villa or address.</p><span class="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#4267A9]">Explore service <i class="fas fa-arrow-right transition group-hover:translate-x-1"></i></span></div>
                            </a>
                            <a href="./bali-port-transfer.html" class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:border-[#4267A9]/40 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4267A9]">
                                <div class="relative"><img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80" alt="Harbour and boat for Bali port transfers" loading="lazy" class="h-36 w-full object-cover"><span class="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#4267A9]">Harbour connection</span></div>
                                <div class="flex flex-1 flex-col p-4"><h3 class="text-base font-extrabold text-slate-900">Bali Port Transfer</h3><p class="mt-2 flex-1 text-sm leading-6 text-slate-600">Transfers for Padangbai, Benoa, Matahari Terbit and Gilimanuk.</p><span class="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#4267A9]">Explore service <i class="fas fa-arrow-right transition group-hover:translate-x-1"></i></span></div>
                            </a>
                            <a href="./bali-intercity-transfer.html" class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:border-[#4267A9]/40 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4267A9]">
                                <div class="relative"><img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80" alt="Scenic road and town landscape" loading="lazy" class="h-36 w-full object-cover"><span class="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#4267A9]">Point-to-point</span></div>
                                <div class="flex flex-1 flex-col p-4"><h3 class="text-base font-extrabold text-slate-900">Bali Intercity Transfer</h3><p class="mt-2 flex-1 text-sm leading-6 text-slate-600">Travel between towns, hotels and villas without a full-day tour.</p><span class="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#4267A9]">Explore service <i class="fas fa-arrow-right transition group-hover:translate-x-1"></i></span></div>
                            </a>
                            <a href="./bali-private-day-tour.html" class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:border-[#4267A9]/40 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4267A9]">
                                <div class="relative"><img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80" alt="Bali landscape for a private day tour" loading="lazy" class="h-36 w-full object-cover"><span class="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#4267A9]">Flexible day out</span></div>
                                <div class="flex flex-1 flex-col p-4"><h3 class="text-base font-extrabold text-slate-900">Bali Private Day Tour</h3><p class="mt-2 flex-1 text-sm leading-6 text-slate-600">Plan a private day around your preferred places and schedule.</p><span class="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#4267A9]">Explore service <i class="fas fa-arrow-right transition group-hover:translate-x-1"></i></span></div>
                            </a>
                        </div>
                        <p class="mt-5 text-xs leading-5 text-slate-500"><i class="fas fa-info-circle mr-1"></i> Share your date, pickup point, destinations and group size to request a quote. Availability and final pricing are confirmed by the team.</p>
                    </div>
                </section>

                <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
                    <div class="mb-7 flex items-end justify-between gap-4"><div><p class="text-xs font-extrabold uppercase tracking-[.16em] text-teal-700">Popular activities</p><h2 class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Popular experiences to explore in Bali</h2><p class="mt-2 text-sm text-slate-600">Browse trip ideas and confirm prices, routes and availability with our team.</p></div><button type="button" onclick="navigateTo('packages')" class="shrink-0 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-800 hover:border-teal-500">All activities <i class="fas fa-arrow-right ml-1"></i></button></div>
                    <div id="homeFeaturedGrid" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">${renderPackageCards(BALI_PACKAGES.slice(0,3))}</div>
                </section>

                <section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
                    <div class="flex flex-col gap-4 rounded-3xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><h2 class="text-xl font-black sm:text-2xl">Planning a trip across Bali?</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Tell us where you want to go, your dates and group size. We can help clarify the route and service details before you decide.</p></div><button type="button" onclick="navigateTo('contact')" class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-teal-400">Ask the team <i class="fas fa-arrow-right"></i></button></div>
                </section>
            `;
        }
