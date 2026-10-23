
        function toggleDolphinPriceSheet(focusDate) {
            var sheet = document.getElementById('dolphinPriceSheet');
            if (!sheet) return;
            sheet.classList.toggle('hidden');
            var isOpen = !sheet.classList.contains('hidden');
            sheet.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            document.body.classList.toggle('dolphin-sheet-open', isOpen);
            if (isOpen && focusDate) setTimeout(function(){ var d=document.getElementById('dolphinMobileDate'); if(d)d.focus(); }, 80);
        }
        function checkDolphinAvailability() {
            var date = document.getElementById('dolphinTravelDate');
            var mobileDate = document.getElementById('dolphinMobileDate');
            var chosen = (date && date.value) || (mobileDate && mobileDate.value);
            if (!chosen) { showToast('Please choose your travel date first.'); return; }
            showToast('Design preview only — live availability is not connected yet.');
        }
        function setDolphinActiveTab(link) {
            document.querySelectorAll('.dolphin-tab').forEach(function(tab) {
                tab.classList.remove('active-tab');
                tab.classList.add('border-transparent','text-slate-600');
            });
            link.classList.add('active-tab');
            link.classList.remove('border-transparent','text-slate-600');
        }
        function renderDolphinTourDetailView(pkg) {
            var today = new Date();
            var todayLocal = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().slice(0,10);
            var photos = pkg.gallery || [];
            var mainPhoto = photos[0] || pkg.heroImage;
            var included = ['Private return transport (pickup area to be confirmed)','Dolphin-watching boat experience','Driver coordination for the planned itinerary'];
            var includedHtml = included.map(function(x){return '<li class="flex gap-2 text-sm text-slate-600"><i class="fas fa-check text-slate-500 mt-1"></i><span>'+x+'</span></li>';}).join('');
            var addons = [
                ['dolphin-snorkel','Snorkelling experience','Optional — details and price to be confirmed'],
                ['dolphin-tanahlot','Tanah Lot sunset stop','Optional route extension — price to be confirmed']
            ];
            var addonsHtml = addons.map(function(x){return '<label class="flex gap-2.5 items-start cursor-pointer"><input type="checkbox" class="mt-1 accent-slate-800"><span><strong class="block text-sm text-slate-800">'+x[1]+'</strong><small class="block text-xs leading-5 text-slate-500 mt-0.5">'+x[2]+'</small></span></label>';}).join('');
            var recs = BALI_PACKAGES.filter(function(p){return p.id==='pkg-2'||p.id==='pkg-5';});
            var recCards = recs.map(function(p){return '<a href="javascript:void(0)" onclick="navigateTo(\\'detail\\',\\''+p.id+'\\')" class="block border border-slate-200 rounded-xl overflow-hidden"><img src="'+p.heroImage+'" alt="" class="w-full h-28 object-cover"><div class="p-3"><strong class="block text-xs leading-5 text-slate-800">'+p.title+'</strong><small class="text-slate-500">'+p.location+'</small></div></a>';}).join('');
            var recSide = recs.map(function(p){return '<a href="javascript:void(0)" onclick="navigateTo(\\'detail\\',\\''+p.id+'\\')" class="flex gap-3 py-2.5 border-t border-slate-100 first:border-0"><img src="'+p.heroImage+'" alt="" class="w-14 h-12 object-cover rounded-lg"><span class="min-w-0"><strong class="block text-xs leading-5 text-slate-800">'+p.title+'</strong><small class="text-slate-500">'+p.location+'</small></span></a>';}).join('');
            return '<div class="dolphin-detail-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-28 lg:pb-8">' +
              '<div class="text-xs font-semibold text-slate-400 mb-4 flex flex-wrap items-center gap-2"><button onclick="navigateTo(\\'home\\')" class="hover:text-slate-700">Home</button><span>/</span><span class="text-slate-700">Bali Dolphin Tour</span><span class="ml-auto rounded-full border border-amber-200 bg-amber-50 text-amber-800 px-2 py-1 text-[10px] uppercase tracking-wider">Layout preview</span></div>' +
              '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">' +
                '<main class="lg:col-span-8 min-w-0">' +
                  '<div class="dolphin-gallery grid grid-cols-1 md:grid-cols-3 gap-2.5 rounded-2xl sm:rounded-3xl overflow-hidden mb-6">' +
                    '<div class="md:col-span-2 relative min-h-[230px] sm:min-h-[330px] lg:min-h-[420px]"><img src="'+mainPhoto+'" alt="Dolphin-watching experience in Lovina, Bali" class="absolute inset-0 w-full h-full object-cover" loading="eager"><span class="absolute right-3 bottom-3 rounded-full bg-white/95 text-slate-900 px-3 py-2 text-xs font-bold shadow">Photo gallery</span></div>' +
                    '<div class="hidden md:grid grid-rows-2 gap-2.5 min-h-0"><img src="'+(photos[1]||mainPhoto)+'" alt="Lovina coast" class="w-full h-full min-h-0 object-cover"><img src="'+(photos[2]||mainPhoto)+'" alt="Bali dolphin tour scenery" class="w-full h-full min-h-0 object-cover"></div>' +
                  '</div>' +
                  '<section class="mb-5"><div class="flex items-center gap-2 text-xs text-slate-500 mb-2"><i class="fas fa-location-dot"></i><span>Lovina, North Bali</span><span class="text-slate-300">•</span><span>Private tour</span></div><h1 class="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900 mb-3">Bali Dolphin Tour</h1><p class="text-sm sm:text-base leading-7 text-slate-600 max-w-4xl">'+pkg.shortDescription+'</p></section>' +
                  '<nav class="dolphin-tabs sticky z-40 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 border-b border-slate-200 bg-white/95 backdrop-blur" aria-label="Tour sections"><div class="flex gap-6 overflow-x-auto hide-scrollbar whitespace-nowrap"><a href="#dolphin-overview" onclick="setDolphinActiveTab(this)" class="dolphin-tab active-tab py-3 text-sm">Overview</a><a href="#dolphin-itinerary" onclick="setDolphinActiveTab(this)" class="dolphin-tab py-3 text-sm border-b-2 border-transparent text-slate-600">Itinerary</a><a href="#dolphin-included" onclick="setDolphinActiveTab(this)" class="dolphin-tab py-3 text-sm border-b-2 border-transparent text-slate-600">What’s Included</a><a href="#dolphin-faq" onclick="setDolphinActiveTab(this)" class="dolphin-tab py-3 text-sm border-b-2 border-transparent text-slate-600">FAQ</a></div></nav>' +
                  '<div class="space-y-6">' +
                    '<section id="dolphin-overview" class="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-3">About this experience</h2><p class="text-sm leading-7 text-slate-600">Start early for a dolphin-watching boat trip off Lovina’s coast. This preview keeps the introduction concise and puts the detailed trip information into dedicated sections. Exact operating conditions and inclusions must be confirmed before launch.</p><div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5"><div class="rounded-xl bg-slate-50 p-3"><i class="fas fa-clock text-slate-500 mb-2"></i><div class="text-xs font-bold text-slate-800">Early morning</div><div class="text-[11px] text-slate-500 mt-1">Sunrise experience</div></div><div class="rounded-xl bg-slate-50 p-3"><i class="fas fa-car text-slate-500 mb-2"></i><div class="text-xs font-bold text-slate-800">Private transport</div><div class="text-[11px] text-slate-500 mt-1">Pickup area to confirm</div></div><div class="rounded-xl bg-slate-50 p-3"><i class="fas fa-users text-slate-500 mb-2"></i><div class="text-xs font-bold text-slate-800">Group friendly</div><div class="text-[11px] text-slate-500 mt-1">Rates to be confirmed</div></div></div></section>' +
                    '<section id="dolphin-itinerary" class="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-5">Suggested itinerary</h2><div class="relative border-l-2 border-slate-200 ml-2 pl-6 space-y-6"><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">Early morning</div><h3 class="text-sm font-bold text-slate-900">Pickup and drive to Lovina</h3><p class="text-sm leading-6 text-slate-600 mt-1">Pickup time depends on the guest’s accommodation and confirmed booking.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">Sunrise</div><h3 class="text-sm font-bold text-slate-900">Dolphin-watching boat trip</h3><p class="text-sm leading-6 text-slate-600 mt-1">Final schedule depends on sea and operating conditions.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">After the activity</div><h3 class="text-sm font-bold text-slate-900">Return or optional stop</h3><p class="text-sm leading-6 text-slate-600 mt-1">Choose a confirmed optional stop or return to your accommodation.</p></div></div></section>' +
                    '<section id="dolphin-included" class="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-4">What’s included</h2><ul class="grid sm:grid-cols-2 gap-3">'+includedHtml+'</ul><p class="text-xs leading-5 text-slate-500 mt-4">Sample layout copy. Final inclusions must match the confirmed package offer.</p></section>' +
                    '<section id="dolphin-faq" class="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-4">Frequently asked questions</h2><details class="border-b border-slate-100 py-3"><summary class="cursor-pointer text-sm font-bold text-slate-800">Can children join the tour?</summary><p class="text-sm leading-6 text-slate-600 mt-2">Age requirements and child rates must be confirmed with the operator.</p></details><details class="border-b border-slate-100 py-3"><summary class="cursor-pointer text-sm font-bold text-slate-800">Are dolphin sightings guaranteed?</summary><p class="text-sm leading-6 text-slate-600 mt-2">Wildlife sightings cannot be guaranteed; conditions vary by day.</p></details><details class="py-3"><summary class="cursor-pointer text-sm font-bold text-slate-800">Can I add another stop?</summary><p class="text-sm leading-6 text-slate-600 mt-2">Optional stops depend on route, timing and confirmed extra cost.</p></details></section>' +
                    '<section class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-1">You may also like</h2><p class="text-sm text-slate-500 mb-4">Explore other Bali experiences.</p><div class="grid sm:grid-cols-2 gap-4">'+recCards+'</div></section>' +
                  '</div>' +
                '</main>' +
                '<aside class="dolphin-desktop-sidebar hidden lg:block lg:col-span-4 lg:col-start-9 lg:row-start-1 min-w-0"><div class="sticky top-24 space-y-4">' +
                  '<section id="dolphin-booking-card" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="mb-4"><div class="text-xs font-semibold text-slate-500">Bali Dolphin Tour</div><h2 class="text-xl font-black text-slate-900 mt-1">Choose package</h2></div><div class="text-xs font-bold text-slate-700 mb-2">Group size</div><div class="space-y-2 mb-4"><label class="dolphin-choice"><input type="radio" name="dolphinGroupDesktop" checked><span class="flex-1"><strong>1–2 guests</strong><small>Small group</small></span><span class="text-xs font-bold">Price on request</span></label><label class="dolphin-choice"><input type="radio" name="dolphinGroupDesktop"><span class="flex-1"><strong>3–5 guests</strong><small>Family / small group</small></span><span class="text-xs font-bold">Price on request</span></label><label class="dolphin-choice"><input type="radio" name="dolphinGroupDesktop"><span class="flex-1"><strong>6+ guests</strong><small>Larger group</small></span><span class="text-xs font-bold">Confirm vehicle & price</span></label></div><label class="block text-xs font-bold text-slate-700 mb-1" for="dolphinTravelDate">Travel date</label><input id="dolphinTravelDate" type="date" min="'+todayLocal+'" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm mb-4"><div class="grid grid-cols-2 gap-3 mb-4"><label class="text-xs font-bold text-slate-700">Adults (12+)<input type="number" min="1" value="2" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"></label><label class="text-xs font-bold text-slate-700">Children<input type="number" min="0" value="0" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><span class="block text-[10px] text-slate-500 mt-1">Age-based rate to confirm</span></label></div><div class="rounded-xl bg-slate-50 p-3 mb-4"><div class="text-xs text-slate-500">Estimated total</div><div class="font-extrabold text-slate-900 mt-1">Confirm price for your group</div><p class="text-[11px] text-slate-500 mt-1">No unverified price shown in this design test.</p></div><button onclick="checkDolphinAvailability()" class="w-full rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm py-3.5">Check Availability</button><p class="text-[11px] leading-5 text-slate-500 text-center mt-3">Need help with booking? <a href="#dolphin-help" class="font-bold text-slate-800 underline underline-offset-2">Send us a message</a></p></section>' +
                  '<section class="rounded-2xl border border-slate-200 bg-white p-5"><h3 class="font-extrabold text-slate-900 mb-3">What’s included</h3><ul class="space-y-2.5">'+includedHtml+'</ul></section>' +
                  '<section class="rounded-2xl border border-slate-200 bg-white p-5"><h3 class="font-extrabold text-slate-900 mb-3">Add-ons & upgrades</h3><div class="space-y-3">'+addonsHtml+'</div></section>' +
                  '<section class="rounded-2xl border border-slate-200 bg-white p-4"><h3 class="font-extrabold text-slate-900 mb-2">Recommended tours</h3>'+recSide+'</section>' +
                '</div></aside>' +
              '</div>' +
              '<section id="dolphin-help" class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center"><h2 class="font-bold text-slate-900">Need help with booking?</h2><p class="text-sm text-slate-600 mt-1">Messaging contact will be connected after the official contact details are confirmed.</p></section>' +
              '<div class="dolphin-mobile-bar lg:hidden"><button onclick="toggleDolphinPriceSheet(false)" class="dolphin-show-price"><span class="block text-[10px] font-semibold uppercase tracking-wide text-slate-500">Group pricing</span><span class="block text-sm font-extrabold text-slate-900">Show Price</span></button><button onclick="toggleDolphinPriceSheet(true)" class="dolphin-check-availability">Check Availability</button><p>Need help with booking? <a href="#dolphin-help">Send us a message</a></p></div>' +
              '<div id="dolphinPriceSheet" class="dolphin-price-sheet hidden" aria-hidden="true"><button class="dolphin-sheet-backdrop" onclick="toggleDolphinPriceSheet(false)" aria-label="Close price panel"></button><section class="dolphin-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="dolphin-sheet-title"><div class="flex items-center justify-between mb-4"><h2 id="dolphin-sheet-title" class="text-lg font-extrabold text-slate-900">Choose package</h2><button onclick="toggleDolphinPriceSheet(false)" class="rounded-full bg-slate-100 w-9 h-9 font-bold" aria-label="Close">×</button></div><div class="space-y-2 mb-4"><label class="dolphin-choice"><input type="radio" name="dolphinGroupMobile" checked><span class="flex-1"><strong>1–2 guests</strong><small>Small group</small></span><span class="text-xs font-bold">Price on request</span></label><label class="dolphin-choice"><input type="radio" name="dolphinGroupMobile"><span class="flex-1"><strong>3–5 guests</strong><small>Family / small group</small></span><span class="text-xs font-bold">Price on request</span></label><label class="dolphin-choice"><input type="radio" name="dolphinGroupMobile"><span class="flex-1"><strong>6+ guests</strong><small>Confirm vehicle & price</small></span><span class="text-xs font-bold">On request</span></label></div><div class="grid grid-cols-2 gap-3 mb-4"><label class="text-xs font-bold">Travel date<input id="dolphinMobileDate" type="date" min="'+todayLocal+'" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"></label><label class="text-xs font-bold">Children<input type="number" min="0" value="0" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"></label></div><button onclick="checkDolphinAvailability()" class="w-full rounded-xl bg-slate-900 text-white font-bold py-3.5">Check Availability</button><p class="text-xs text-slate-500 mt-3">Need help with booking? <a href="#dolphin-help" onclick="toggleDolphinPriceSheet(false)" class="font-bold underline">Send us a message</a></p></section></div>' +
            '</div>';
        }

function renderDetailView(pkg) {
            if (pkg && pkg.id === 'dolphin-tour-preview') return renderDolphinTourDetailView(pkg);
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

                    <!-- Hero image first -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden mb-6 h-[260px] sm:h-[340px] md:h-[420px]">
                        <div class="md:col-span-2 h-full min-h-0">
                            <img src="${pkg.gallery[0] || pkg.heroImage}" alt="${pkg.title}" class="w-full h-full object-cover">
                        </div>
                        <div class="hidden md:grid grid-rows-2 gap-3 h-full min-h-0">
                            <img src="${pkg.gallery[1] || pkg.heroImage}" alt="${pkg.title} gallery photo 2" class="w-full h-full object-cover">
                            <img src="${pkg.gallery[2] || pkg.heroImage}" alt="${pkg.title} gallery photo 3" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <!-- Title and short description follow the image -->
                    <div class="mb-5">
                        <div class="flex flex-wrap items-center gap-3 mb-3 text-xs font-semibold text-slate-600">
                            <span class="flex items-center gap-1 text-slate-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-bold">
                                <i class="fas fa-star text-amber-500"></i> ${pkg.rating} (${pkg.reviewCount} reviews)
                            </span>
                            <span class="flex items-center gap-1"><i class="fas fa-location-dot text-bali-orange"></i> ${pkg.location}</span>
                        </div>
                        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">${pkg.title}</h1>
                        <p class="text-sm sm:text-base leading-7 text-slate-600 max-w-4xl">${pkg.shortDescription || pkg.summary || (pkg.highlights && pkg.highlights[0]) || 'Explore Bali at your own pace with a thoughtfully planned tour and clear trip details.'}</p>
                    </div>

                    <!-- Detail tabs -->
                    <nav aria-label="Tour details" class="sticky top-[68px] md:top-[78px] z-30 -mx-4 px-4 sm:mx-0 sm:px-0 mb-7 border-b border-slate-200 bg-white/95 backdrop-blur">
                        <div class="flex gap-6 overflow-x-auto hide-scrollbar whitespace-nowrap">
                            <a href="#tour-overview" class="py-3 border-b-2 border-bali-orange text-slate-900 text-sm font-bold">Overview</a>
                            <a href="#tour-itinerary" class="py-3 border-b-2 border-transparent text-slate-600 hover:text-slate-900 text-sm font-semibold">Itinerary</a>
                            <a href="#tour-options" class="py-3 border-b-2 border-transparent text-slate-600 hover:text-slate-900 text-sm font-semibold">Package options</a>
                        </div>
                    </nav>

                    <!-- Content & Sticky Sidebar Layout -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        <!-- Left Details Content (8 Cols) -->
                        <div class="lg:col-span-8 space-y-8">
                            
                            <!-- Long description and overview -->
                            <section id="tour-overview" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm scroll-mt-32">
                                <h2 class="text-lg font-extrabold text-slate-900 mb-3">About this tour</h2>
                                <div class="text-sm leading-7 text-slate-600 space-y-3">
                                    ${pkg.longDescription || pkg.description || (pkg.highlights || []).slice(0, 2).join(' ')}
                                </div>
                            </section>

                            <!-- Highlights -->
                            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 class="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                                    <i class="fas fa-sparkles text-bali-orange"></i> Activity Highlights
                                </h3>
                                <ul class="space-y-3 text-xs sm:text-sm text-slate-700">
                                    ${pkg.highlights.map(h => `<li class="flex items-start gap-2.5"><i class="fas fa-check-circle text-emerald-500 mt-0.5"></i> <span>${h}</span></li>`).join('')}
                                </ul>
                            </div>

                            <!-- Package Options Selection -->
                            <div id="tour-options" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm scroll-mt-32">
                                <h3 class="text-lg font-extrabold text-slate-900 mb-4">Select Package Option</h3>
                                <div class="space-y-3">
                                    ${pkg.options.map((opt, index) => `
                                        <label class="block p-4 rounded-2xl border-2 ${index === 0 ? 'border-bali-orange bg-orange-50/40' : 'border-slate-200 hover:border-slate-300'} cursor-pointer transition">
                                            <div class="flex items-start justify-between">
                                                <div class="flex items-start gap-3">
                                                    <input type="radio" name="packageOption" value="${opt.id}" ${index === 0 ? 'checked' : ''} onchange="updateBookingCalculation()" class="mt-1 accent-bali-orange">
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
                            <div id="tour-itinerary" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm scroll-mt-32">
                                <h3 class="text-lg font-extrabold text-slate-900 mb-6">Itinerary Timeline</h3>
                                <div class="relative border-l-2 border-orange-200 pl-6 space-y-6 ml-2">
                                    ${pkg.itinerary.map(item => `
                                        <div class="relative">
                                            <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-bali-orange ring-4 ring-orange-100"></div>
                                            <span class="text-xs font-bold text-bali-orange block mb-0.5">${item.time}</span>
                                            <h4 class="font-extrabold text-slate-900 text-sm">${item.title}</h4>
                                            <p class="text-xs text-slate-500 mt-1">${item.desc}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Right Sticky Booking Sidebar (4 Cols) -->
                        <div class="lg:col-span-4">
                            <div class="sticky top-24 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <div class="mb-4 pb-4 border-b border-slate-100">
                                    <span class="text-xs text-slate-400 font-semibold">Starting Price</span>
                                    <div class="text-2xl font-black text-slate-900">${basePrice}</div>
                                </div>

                                <!-- Date Selection -->
                                <div class="mb-4">
                                    <label class="text-xs font-extrabold text-slate-700 block mb-1">Select Travel Date</label>
                                    <input type="date" id="bookingDateInput" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-bali-orange">
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
                                    <span id="calculatedTotalPrice" class="text-xl font-black text-bali-orange">${basePrice}</span>
                                </div>

                                <!-- Action CTAs -->
                                <div class="space-y-2">
                                    <button onclick="addToCartCurrentPkg()" class="w-full bg-orange-100 hover:bg-orange-200 text-bali-orange font-extrabold py-3.5 px-4 rounded-2xl transition text-xs flex items-center justify-center gap-2">
                                        <i class="fas fa-cart-plus"></i> Add To Cart
                                    </button>
                                    <button onclick="bookNowCurrentPkg()" class="w-full bg-bali-orange hover:bg-bali-hover text-white font-extrabold py-3.5 px-4 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
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
