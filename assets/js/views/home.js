function renderHomeView() {
    return `
        <!-- BUSINESS-LED HERO: BALI TRANS IS A LOCAL TRANSPORT & TRIP SERVICE, NOT A MARKETPLACE -->
        <section class="relative isolate overflow-hidden bg-slate-950">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=85"
                 alt="Tropical landscape in Bali" class="absolute inset-0 -z-20 h-full w-full object-cover object-center">
            <div class="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25"></div>
            <div class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-8 lg:py-24">
                <div class="lg:col-span-7">
                    <span class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-bold tracking-wide text-white backdrop-blur">
                        <i class="fas fa-route text-orange-300" aria-hidden="true"></i>
                        Your Bali journey, made simpler
                    </span>
                    <h1 class="mb-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Get around Bali.<br>
                        <span class="text-orange-300">Make more of your trip.</span>
                    </h1>
                    <p class="mb-7 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
                        From airport pick-ups and private drivers to day trips around the island, find a way to travel that fits your plans. Tell us what you need and confirm the details before you go.
                    </p>
                    <div class="flex flex-col gap-3 sm:flex-row">
                        <button onclick="navigateTo('packages')" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-extrabold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-600">
                            Explore trips and transport <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        </button>
                        <button onclick="document.getElementById('ways-to-travel')?.scrollIntoView({behavior:'smooth'})" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20">
                            Find what you need
                        </button>
                    </div>
                    <p class="mt-4 max-w-xl text-xs leading-5 text-slate-200">Availability, inclusions and final prices should be confirmed for your chosen date and itinerary. Online booking in this preview is a demonstration.</p>
                </div>
                <div class="lg:col-span-5">
                    <div class="rounded-3xl border border-white/25 bg-white/95 p-5 shadow-2xl sm:p-6">
                        <p class="mb-1 text-xs font-extrabold uppercase tracking-widest text-orange-600">Start with your plan</p>
                        <h2 class="mb-4 text-xl font-black text-slate-900 sm:text-2xl">What are you looking for?</h2>
                        <div class="space-y-3">
                            <button onclick="filterByCategory('driver'); navigateTo('packages')" class="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-orange-300 hover:bg-orange-50">
                                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-lg text-orange-700"><i class="fas fa-car-side" aria-hidden="true"></i></span>
                                <span class="min-w-0 flex-1"><strong class="block text-sm text-slate-900">Private transport</strong><span class="mt-1 block text-xs leading-5 text-slate-600">A driver for transfers or getting around Bali.</span></span>
                                <i class="fas fa-chevron-right text-xs text-slate-400" aria-hidden="true"></i>
                            </button>
                            <button onclick="filterByCategory('temple'); navigateTo('packages')" class="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-orange-300 hover:bg-orange-50">
                                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700"><i class="fas fa-leaf" aria-hidden="true"></i></span>
                                <span class="min-w-0 flex-1"><strong class="block text-sm text-slate-900">Explore Bali by day</strong><span class="mt-1 block text-xs leading-5 text-slate-600">Temples, landscapes and local highlights.</span></span>
                                <i class="fas fa-chevron-right text-xs text-slate-400" aria-hidden="true"></i>
                            </button>
                            <button onclick="filterByCategory('nusa'); navigateTo('packages')" class="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-orange-300 hover:bg-orange-50">
                                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-lg text-sky-700"><i class="fas fa-water" aria-hidden="true"></i></span>
                                <span class="min-w-0 flex-1"><strong class="block text-sm text-slate-900">Island trips and activities</strong><span class="mt-1 block text-xs leading-5 text-slate-600">Browse Nusa Penida and adventure options.</span></span>
                                <i class="fas fa-chevron-right text-xs text-slate-400" aria-hidden="true"></i>
                            </button>
                        </div>
                        <button onclick="filterByCategory('all'); navigateTo('packages')" class="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800">See all available options</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- WAYS TO TRAVEL: SERVICE-LED, NOT MARKETPLACE-LED -->
        <section id="ways-to-travel" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div class="mb-8 max-w-2xl">
                <p class="mb-2 text-xs font-black uppercase tracking-widest text-orange-600">Travel your way</p>
                <h2 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">One trip can need more than one ride.</h2>
                <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Choose the kind of help you need first. Browse the details, then check the route, timing and inclusions before confirming.</p>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button onclick="filterByCategory('driver'); navigateTo('packages')" class="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
                    <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-xl text-orange-700"><i class="fas fa-plane-arrival" aria-hidden="true"></i></span>
                    <h3 class="font-extrabold text-slate-900">Airport & hotel transfers</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600">Plan the ride between the airport, your stay and your next stop.</p>
                    <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-700">View transport <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                </button>
                <button onclick="filterByCategory('driver'); navigateTo('packages')" class="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
                    <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-xl text-sky-700"><i class="fas fa-car" aria-hidden="true"></i></span>
                    <h3 class="font-extrabold text-slate-900">Private driver</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600">Explore at your own pace with a route planned around your day.</p>
                    <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-700">View transport <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                </button>
                <button onclick="filterByCategory('temple'); navigateTo('packages')" class="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
                    <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700"><i class="fas fa-mountain-sun" aria-hidden="true"></i></span>
                    <h3 class="font-extrabold text-slate-900">Bali day tours</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600">Build a day around culture, scenery and places you want to see.</p>
                    <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-700">Explore day tours <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                </button>
                <button onclick="filterByCategory('nusa'); navigateTo('packages')" class="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
                    <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-700"><i class="fas fa-ship" aria-hidden="true"></i></span>
                    <h3 class="font-extrabold text-slate-900">Island experiences</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600">Compare island trip ideas and the travel arrangements they need.</p>
                    <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-700">Explore islands <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                </button>
            </div>
        </section>

        <!-- FEATURED TRIPS: EXISTING DATA IS SHOWN AS PREVIEW CONTENT -->
        <section class="border-y border-slate-200 bg-white py-14 sm:py-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p class="mb-2 text-xs font-black uppercase tracking-widest text-orange-600">Ideas for your itinerary</p>
                        <h2 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Explore Bali and beyond</h2>
                        <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Browse sample trips and activities. Confirm actual availability, pricing and what's included before booking.</p>
                    </div>
                    <button onclick="filterByCategory('all'); navigateTo('packages')" class="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 sm:self-auto">Browse all options <i class="fas fa-arrow-right" aria-hidden="true"></i></button>
                </div>
                <div id="homeFeaturedGrid" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    ${renderPackageCards(BALI_PACKAGES.slice(0, 6))}
                </div>
            </div>
        </section>

        <!-- CLEAR, HONEST BOOKING FLOW -->
        <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div class="grid gap-10 lg:grid-cols-5 lg:items-center">
                <div class="lg:col-span-2">
                    <p class="mb-2 text-xs font-black uppercase tracking-widest text-orange-600">How it works</p>
                    <h2 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Plan first. Confirm the details. Then travel.</h2>
                    <p class="mt-3 text-sm leading-6 text-slate-600">We want the journey to be clear before you commit—not to make you guess what a price includes or whether a trip is available.</p>
                    <button onclick="filterByCategory('all'); navigateTo('packages')" class="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-600">Choose a trip <i class="fas fa-arrow-right" aria-hidden="true"></i></button>
                </div>
                <div class="space-y-4 lg:col-span-3">
                    <div class="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-black text-orange-700">1</span>
                        <div><h3 class="font-extrabold text-slate-900">Choose a service or trip</h3><p class="mt-1 text-sm leading-6 text-slate-600">Start with transport, a day tour, an island trip or an activity that fits your plans.</p></div>
                    </div>
                    <div class="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-black text-orange-700">2</span>
                        <div><h3 class="font-extrabold text-slate-900">Check the itinerary and inclusions</h3><p class="mt-1 text-sm leading-6 text-slate-600">Review the route, timing, group size, transport and any additional costs that apply.</p></div>
                    </div>
                    <div class="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-black text-orange-700">3</span>
                        <div><h3 class="font-extrabold text-slate-900">Request and confirm your booking</h3><p class="mt-1 text-sm leading-6 text-slate-600">Share your date and travel details, then get confirmation before treating the trip as booked.</p></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TRUST WITHOUT INVENTED REVIEWS, GUARANTEES OR SERVICE CLAIMS -->
        <section class="bg-slate-900 py-12 sm:py-14">
            <div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
                <div class="flex gap-4">
                    <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl text-orange-300"><i class="fas fa-list-check" aria-hidden="true"></i></span>
                    <div><h3 class="font-extrabold text-white">Clear trip details</h3><p class="mt-2 text-sm leading-6 text-slate-300">Understand the plan and inclusions before you confirm.</p></div>
                </div>
                <div class="flex gap-4">
                    <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl text-orange-300"><i class="fas fa-map-location-dot" aria-hidden="true"></i></span>
                    <div><h3 class="font-extrabold text-white">Travel built around your route</h3><p class="mt-2 text-sm leading-6 text-slate-300">Start with where you want to go and the kind of trip you have in mind.</p></div>
                </div>
                <div class="flex gap-4">
                    <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl text-orange-300"><i class="fas fa-comments" aria-hidden="true"></i></span>
                    <div><h3 class="font-extrabold text-white">Confirm before you travel</h3><p class="mt-2 text-sm leading-6 text-slate-300">Check availability and final arrangements instead of relying on demo booking status.</p></div>
                </div>
            </div>
        </section>
    `;
}
