
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
            showToast('Thanks — availability still needs to be confirmed by the Bali Trans team.');
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
            var included = ['Private return transport for your group','Traditional boat trip for sunrise dolphin watching','English-speaking driver, fuel and parking','Visits to the listed North Bali attractions','Lunch as specified in the confirmed package'];
            var includedHtml = included.map(function(x){return '<li class="flex gap-2 text-sm text-slate-600"><i class="fas fa-check text-slate-500 mt-1"></i><span>'+x+'</span></li>';}).join('');
            var addons = [
                ['dolphin-snorkel','Snorkelling experience','Optional — details and price to be confirmed'],
                ['dolphin-tanahlot','Tanah Lot sunset stop','Optional route extension — price to be confirmed']
            ];
            var addonsHtml = addons.map(function(x){return '<label class="flex gap-2.5 items-start cursor-pointer"><input type="checkbox" class="mt-1 accent-slate-800"><span><strong class="block text-sm text-slate-800">'+x[1]+'</strong><small class="block text-xs leading-5 text-slate-500 mt-0.5">'+x[2]+'</small></span></label>';}).join('');
            var recs = BALI_PACKAGES.filter(function(p){return p.id==='pkg-2'||p.id==='pkg-5';});
            var recCards = recs.map(function(p){return '<a href="javascript:void(0)" onclick="navigateTo(\'detail\',\''+p.id+'\')" class="block border border-slate-200 rounded-xl overflow-hidden"><img src="'+p.heroImage+'" alt="" class="w-full h-28 object-cover"><div class="p-3"><strong class="block text-xs leading-5 text-slate-800">'+p.title+'</strong><small class="text-slate-500">'+p.location+'</small></div></a>';}).join('');
            var recSide = recs.map(function(p){return '<a href="javascript:void(0)" onclick="navigateTo(\'detail\',\''+p.id+'\')" class="flex gap-3 py-2.5 border-t border-slate-100 first:border-0"><img src="'+p.heroImage+'" alt="" class="w-14 h-12 object-cover rounded-lg"><span class="min-w-0"><strong class="block text-xs leading-5 text-slate-800">'+p.title+'</strong><small class="text-slate-500">'+p.location+'</small></span></a>';}).join('');
            return '<div class="dolphin-detail-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-28 lg:pb-8">' +
              '<div class="text-xs font-semibold text-slate-400 mb-4 flex flex-wrap items-center gap-2"><button onclick="navigateTo(\'home\')" class="hover:text-slate-700">Home</button><span>/</span><span class="text-slate-700">Bali Dolphin Tour</span><span class="ml-auto rounded-full border border-slate-200 bg-white text-slate-600 px-2 py-1 text-[10px] uppercase tracking-wider">Private day tour</span></div>' +
              '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">' +
                '<main class="lg:col-span-8 min-w-0">' +
                  '<div class="dolphin-gallery grid grid-cols-1 md:grid-cols-3 gap-2.5 rounded-2xl sm:rounded-3xl overflow-hidden mb-6">' +
                    '<div class="md:col-span-2 relative min-h-[230px] sm:min-h-[330px] lg:min-h-[420px]"><img src="'+mainPhoto+'" alt="Dolphin-watching experience in Lovina, Bali" class="absolute inset-0 w-full h-full object-cover" loading="eager"><span class="absolute right-3 bottom-3 rounded-full bg-white/95 text-slate-900 px-3 py-2 text-xs font-bold shadow">Photo gallery</span></div>' +
                    '<div class="hidden md:grid grid-rows-2 gap-2.5 min-h-0"><img src="'+(photos[1]||mainPhoto)+'" alt="Lovina coast" class="w-full h-full min-h-0 object-cover"><img src="'+(photos[2]||mainPhoto)+'" alt="Bali dolphin tour scenery" class="w-full h-full min-h-0 object-cover"></div>' +
                  '</div>' +
                  '<section class="mb-5"><h1 class="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900 mb-3">Bali Dolphin Tour</h1><p class="text-sm sm:text-base leading-7 text-slate-600 max-w-4xl mb-4">'+pkg.shortDescription+'</p><div class="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"><span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5"><i class="fas fa-location-dot"></i><span>Lovina, North Bali</span></span><span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5"><i class="fas fa-car-side"></i><span>Private tour</span></span></div></section>' +
                  '<nav class="dolphin-tabs sticky z-40 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 border-b border-slate-200 bg-white/95 backdrop-blur" aria-label="Tour sections"><div class="flex gap-6 overflow-x-auto hide-scrollbar whitespace-nowrap"><a href="#dolphin-overview" onclick="setDolphinActiveTab(this)" class="dolphin-tab active-tab py-3 text-sm">Overview</a><a href="#dolphin-itinerary" onclick="setDolphinActiveTab(this)" class="dolphin-tab py-3 text-sm border-b-2 border-transparent text-slate-600">Itinerary</a><a href="#dolphin-included" onclick="setDolphinActiveTab(this)" class="dolphin-tab py-3 text-sm border-b-2 border-transparent text-slate-600">What’s Included</a><a href="#dolphin-faq" onclick="setDolphinActiveTab(this)" class="dolphin-tab py-3 text-sm border-b-2 border-transparent text-slate-600">FAQ</a></div></nav>' +
                  '<div class="space-y-6">' +
                    '<section id="dolphin-overview" class="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-3">About this experience</h2><p class="text-sm leading-7 text-slate-600">Leave before dawn and travel to Lovina for a traditional boat trip to look for wild dolphins as the sun rises over the Bali Sea. After the coastal experience, continue into North Bali’s cool highlands for panoramic lake views, a photo stop at the iconic Handara Gate and a visit to Ulun Danu Beratan Temple. Enjoy lunch before the private drive back to your accommodation. The route combines wildlife, mountain scenery and Balinese culture in one full-day journey.</p><div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5"><div class="rounded-xl bg-slate-50 p-3"><i class="fas fa-clock text-slate-500 mb-2"></i><div class="text-xs font-bold text-slate-800">Early morning</div><div class="text-[11px] text-slate-500 mt-1">Sunrise experience</div></div><div class="rounded-xl bg-slate-50 p-3"><i class="fas fa-car text-slate-500 mb-2"></i><div class="text-xs font-bold text-slate-800">Private transport</div><div class="text-[11px] text-slate-500 mt-1">Pickup area to confirm</div></div><div class="rounded-xl bg-slate-50 p-3"><i class="fas fa-users text-slate-500 mb-2"></i><div class="text-xs font-bold text-slate-800">Group friendly</div><div class="text-[11px] text-slate-500 mt-1">Rates to be confirmed</div></div></div></section>' +
                    '<section id="dolphin-itinerary" class="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-2">Full-day itinerary</h2><p class="text-sm leading-6 text-slate-500 mb-6">A sample schedule for a private North Bali day trip. Times may shift with your pickup location, traffic, weather and sea conditions.</p><div class="relative border-l-2 border-slate-200 ml-2 pl-6 space-y-6"><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">03:30 AM · Early departure</div><h3 class="text-sm font-bold text-slate-900">Private hotel pickup</h3><p class="text-sm leading-6 text-slate-600 mt-1">Meet your driver at your accommodation and travel north while the island is still quiet. Pickup time is adjusted to your location.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">05:50 AM · Lovina Beach</div><h3 class="text-sm font-bold text-slate-900">Arrive and prepare for the boat trip</h3><p class="text-sm leading-6 text-slate-600 mt-1">Reach the north coast, meet the local boat crew and get ready for the morning dolphin-watching experience.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">06:00 AM · Sunrise at sea</div><h3 class="text-sm font-bold text-slate-900">Wild dolphin watching in Lovina</h3><p class="text-sm leading-6 text-slate-600 mt-1">Head out by traditional outrigger boat and watch for wild dolphins in their natural habitat. Sightings are not guaranteed and the time at sea depends on conditions.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">Around 09:00 AM · Wanagiri</div><h3 class="text-sm font-bold text-slate-900">Wanagiri Hidden Hill viewpoints</h3><p class="text-sm leading-6 text-slate-600 mt-1">Continue into the highlands for sweeping views across the twin lakes and surrounding green hills, with time for photos if conditions allow.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">Around 10:30 AM · Handara</div><h3 class="text-sm font-bold text-slate-900">Handara Gate photo stop</h3><p class="text-sm leading-6 text-slate-600 mt-1">Pause at the famous Balinese-style entrance framed by mountain scenery. Entry or photo fees, if applicable, should be confirmed in the package details.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">Around 11:30 AM · Lake Beratan</div><h3 class="text-sm font-bold text-slate-900">Ulun Danu Beratan Temple</h3><p class="text-sm leading-6 text-slate-600 mt-1">Explore the celebrated lakeside temple complex, known for its shrines beside the water and its mountain backdrop. Please follow local temple etiquette.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">Around 12:30 PM · Lunch</div><h3 class="text-sm font-bold text-slate-900">Lunch break</h3><p class="text-sm leading-6 text-slate-600 mt-1">Take a break for lunch near the Bedugul area before starting the return journey. The restaurant and meal inclusions depend on the confirmed package.</p></div><div class="relative"><span class="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-100"></span><div class="text-xs font-bold text-slate-500 mb-1">Around 01:30 PM · Return drive</div><h3 class="text-sm font-bold text-slate-900">Travel back to your accommodation</h3><p class="text-sm leading-6 text-slate-600 mt-1">Relax in your private vehicle as your driver heads back to your drop-off area. Arrival time varies with distance and traffic; a 03:00 PM arrival is only a rough reference for some pickup areas.</p></div></div><p class="text-xs leading-5 text-slate-500 mt-5">Optional route extension: a Tanah Lot sunset visit may be requested, but it adds substantial travel time and is not part of the standard route. Confirm feasibility and any extra charge before booking.</p></section>' +
                    '<section id="dolphin-included" class="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="text-lg font-extrabold text-slate-900 mb-4">What’s included</h2><ul class="grid sm:grid-cols-2 gap-3">'+includedHtml+'</ul><p class="text-xs leading-5 text-slate-500 mt-4">Exact entrance tickets, boat arrangement, meals and other inclusions are confirmed with your selected package before booking.</p></section>' +
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

/* VIEW 3: PACKAGE DETAIL PAGE */
        function renderDetailView(pkg) {
            if (pkg && (pkg.id === 'dolphin-tour-preview' || pkg.id === 'lovina-dolphin-tour')) return renderDolphinTourDetailView(pkg);
            const curr = CURRENCY_RATES[currentCurrency];
            const basePrice = curr.format(Math.min(...pkg.options.map(opt => opt.priceIDR)));
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-800">
                    <div class="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <button onclick="navigateTo('home')" class="hover:text-orange-600">Beranda</button><span>/</span>
                        <button onclick="navigateTo('packages')" class="hover:text-orange-600">Paket Tour</button><span>/</span>
                        <span class="font-semibold text-slate-800">${pkg.title}</span>
                    </div>

                    <header class="mb-6">
                        <div class="flex flex-wrap items-center gap-2 mb-3">
                            <span class="rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs font-bold">Paket pilihan Bali Trans</span>
                            <span class="text-xs text-slate-500"><i class="fas fa-location-dot mr-1 text-orange-500"></i>${pkg.location}</span>
                        </div>
                        <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">${pkg.title}</h1>
                        <p class="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-slate-600">Perjalanan privat untuk melihat lumba-lumba di Lovina, cocok untuk keluarga dan anak-anak. Durasi sekitar 11–15 jam, termasuk transportasi, sopir yang ramah sekaligus pemandu lokal, tiket sesuai itinerary paket, dan makan siang. Ingin pengalaman lebih? Tambahkan snorkeling setelah dolphin watching, pilih opsi berenang bersama lumba-lumba, atau tutup perjalanan dengan sunset di Tanah Lot.</p>
                    </header>

                    <div class="mb-7" aria-label="Galeri foto perjalanan Lovina">
                        <div class="relative overflow-hidden rounded-2xl bg-slate-100">
                            <img id="lovinaMainImage" src="${pkg.gallery[0] || pkg.heroImage}" alt="Foto utama perjalanan Lovina" class="w-full h-64 sm:h-96 md:h-[460px] object-cover">
                            <button type="button" onclick="moveLovinaGallery(-1)" aria-label="Foto sebelumnya" class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 shadow-lg p-3 text-slate-800"><i class="fas fa-chevron-left"></i></button>
                            <button type="button" onclick="moveLovinaGallery(1)" aria-label="Foto berikutnya" class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 shadow-lg p-3 text-slate-800"><i class="fas fa-chevron-right"></i></button>
                            <span id="lovinaGalleryCount" class="absolute bottom-3 right-3 rounded-full bg-black/65 text-white text-xs font-semibold px-3 py-1">${1} / ${pkg.gallery.length}</span>
                        </div>
                        <div id="lovinaGalleryThumbs" class="flex gap-2 sm:gap-3 overflow-x-auto py-3" class="bt-gallery-thumbs">
                            ${pkg.gallery.map((image,index) => `<button type="button" onclick="selectLovinaGallery(${index})" aria-label="Tampilkan foto ${index+1}" class="lovina-thumb flex-none w-[64px] h-[56px] sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 border-transparent opacity-70 hover:opacity-100"><img src="${image || pkg.heroImage}" alt="" loading="lazy" class="w-full h-full object-cover"></button>`).join('')}
                        </div>
                    </div>

                    <nav aria-label="Navigasi bagian paket" class="sticky top-16 md:top-20 z-30 -mx-4 px-4 bg-white/95 backdrop-blur border-y border-slate-200 shadow-sm mb-7">
                        <div class="detail-nav-track max-w-7xl mx-auto flex gap-2 overflow-x-auto whitespace-nowrap py-3 text-sm font-bold">
                            <a href="#deskripsi" data-detail-target="deskripsi" class="detail-nav-link is-active">Deskripsi</a>
                            <a href="#pilihan-paket" data-detail-target="pilihan-paket" class="detail-nav-link">Pilihan & Harga</a>
                            <a href="#itinerary" data-detail-target="itinerary" class="detail-nav-link">Itinerary</a>
                            <a href="#lokasi" data-detail-target="lokasi" class="detail-nav-link">Lokasi</a>
                            <a href="#cara-pesan" data-detail-target="cara-pesan" class="detail-nav-link">Cara Pemesanan</a>
                            <a href="#syarat" data-detail-target="syarat" class="detail-nav-link">Syarat & Ketentuan</a>
                        </div>
                    </nav>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                        <div class="lg:col-span-8 space-y-6 min-w-0">
                            <section id="deskripsi" class="detail-section bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 scroll-mt-20">
                                <h2 class="text-xl font-extrabold text-slate-950 mb-3">Layanan Lovina Dolphin Tour</h2>
                                <p class="text-sm leading-7 text-slate-600">Perjalanan privat 11–15 jam untuk melihat lumba-lumba di Lovina, cocok untuk keluarga dan anak-anak. Harga paket dasar sudah termasuk transportasi pribadi, sopir profesional yang ramah dan sabar sekaligus pemandu lokal, perahu dolphin watching, tiket masuk sesuai itinerary, dan makan siang.</p>
                                <p class="text-sm leading-7 text-slate-600 mt-3">Ingin pengalaman lebih? Tambahkan snorkeling setelah melihat lumba-lumba, pilih opsi berenang bersama lumba-lumba, atau singgah di Tanah Lot untuk menikmati sunset sebelum kembali. Pilih tambahan dan kendaraan di bagian pemesanan untuk melihat perkiraan total biayanya.</p>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                                    <div class="rounded-xl bg-slate-50 p-4"><i class="fas fa-water text-orange-500 mb-2"></i><p class="font-bold text-sm">Dolphin watching</p><p class="text-xs text-slate-500 mt-1">Aktivitas utama dalam paket perjalanan.</p></div>
                                    <div class="rounded-xl bg-slate-50 p-4"><i class="fas fa-car text-orange-500 mb-2"></i><p class="font-bold text-sm">Paket privat</p><p class="text-xs text-slate-500 mt-1">Transportasi dan beberapa kebutuhan perjalanan dalam satu paket.</p></div>
                                    <div class="rounded-xl bg-slate-50 p-4"><i class="fas fa-utensils text-orange-500 mb-2"></i><p class="font-bold text-sm">Termasuk makan siang</p><p class="text-xs text-slate-500 mt-1">Makan siang dan tiket destinasi sesuai itinerary paket.</p></div>
                                </div>
                            </section>

                            <section id="pilihan-paket" class="detail-section bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 scroll-mt-20">
                                <h2 class="text-xl font-extrabold text-slate-950">Harga per orang sudah termasuk</h2>
                                <p class="text-sm text-slate-500 mt-2 mb-5">Paket utama sudah mencakup kebutuhan perjalanan yang tercantum di bawah. Pilihan kendaraan dan aktivitas tambahan dapat disesuaikan saat checkout.</p>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div class="flex items-center gap-3 rounded-xl bg-emerald-50 p-3"><span class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center"><i class="fas fa-car-side text-lg"></i></span><span class="text-sm font-bold text-emerald-950">Transportasi pribadi pulang-pergi</span></div>
                                    <div class="flex items-center gap-3 rounded-xl bg-emerald-50 p-3"><span class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center"><i class="fas fa-water text-lg"></i></span><span class="text-sm font-bold text-emerald-950">Perahu dolphin watching</span></div>
                                    <div class="flex items-center gap-3 rounded-xl bg-emerald-50 p-3"><span class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center"><i class="fas fa-user-tie text-lg"></i></span><span class="text-sm font-bold text-emerald-950">Driver, bahan bakar & parkir</span></div>
                                    <div class="flex items-center gap-3 rounded-xl bg-emerald-50 p-3"><span class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center"><i class="fas fa-ticket text-lg"></i></span><span class="text-sm font-bold text-emerald-950">Tiket destinasi dalam itinerary</span></div>
                                    <div class="flex items-center gap-3 rounded-xl bg-emerald-50 p-3"><span class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center"><i class="fas fa-utensils text-lg"></i></span><span class="text-sm font-bold text-emerald-950">Makan siang sesuai kesepakatan</span></div>
                                </div>
                            </section>

                            <section id="itinerary" class="detail-section bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 scroll-mt-20">
                                <h2 class="text-xl font-extrabold text-slate-950 mb-2">Itinerary perjalanan</h2>
                                <p class="text-sm text-slate-500 mb-6">Jadwal perjalanan menyesuaikan pilihan aktivitas dan kunjungan yang Anda tambahkan.</p>
                                <div class="relative border-l-2 border-orange-200 pl-6 ml-2 space-y-6">
                                    ${pkg.itinerary.map(item => `
                                        <div class="relative"><span class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-orange-100"></span><span class="text-xs font-bold text-orange-600 block mb-1">${item.time}</span><h3 class="font-extrabold text-slate-900">${item.title}</h3><p class="text-sm leading-6 text-slate-600 mt-1">${item.desc}</p></div>
                                    `).join('')}
                                </div>
                            </section>

                            <section id="lokasi" class="detail-section bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 scroll-mt-20">
                                <h2 class="text-xl font-extrabold text-slate-950 mb-3">Lokasi & penjemputan</h2>
                                <p class="text-sm leading-7 text-slate-600">Perjalanan dimulai dengan penjemputan di area yang disepakati, kemudian menuju pesisir Lovina untuk aktivitas dolphin watching. Lokasi dan waktu penjemputan dikonfirmasi berdasarkan alamat hotel dan tanggal perjalanan.</p>
                                <div class="rounded-xl bg-slate-50 p-4 mt-4"><p class="text-sm font-bold text-slate-800"><i class="fas fa-location-dot text-orange-500 mr-2"></i>Lovina, Kabupaten Buleleng, Bali</p><p class="text-xs leading-5 text-slate-500 mt-2">Titik temu tepat dan estimasi waktu jemput akan diberikan setelah detail lokasi dan tanggal dikonfirmasi.</p></div>
                            </section>

                            <section id="cara-pesan" class="detail-section bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 scroll-mt-20">
                                <h2 class="text-xl font-extrabold text-slate-950 mb-4">Cara pemesanan</h2>
                                <ol class="space-y-4">
                                    <li class="flex gap-3"><span class="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-sm">1</span><div><h3 class="font-bold">Pilih jenis paket</h3><p class="text-sm text-slate-600 mt-1">Paket sudah mencakup transportasi pribadi dan dolphin watching. Pilih kendaraan, lalu tambahkan kunjungan wisata atau aktivitas laut jika diinginkan.</p></div></li>
                                    <li class="flex gap-3"><span class="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-sm">2</span><div><h3 class="font-bold">Pilih tanggal dan jumlah tamu</h3><p class="text-sm text-slate-600 mt-1">Masukkan tanggal perjalanan, jumlah tamu, dan lokasi penjemputan agar rencana perjalanan dapat disesuaikan.</p></div></li>
                                    <li class="flex gap-3"><span class="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-sm">3</span><div><h3 class="font-bold">Tinjau rincian pesanan</h3><p class="text-sm text-slate-600 mt-1">Periksa cakupan, tambahan biaya, waktu, dan konfirmasi ketersediaan sebelum pembayaran.</p></div></li>
                                </ol>
                            </section>

                            <section id="syarat" class="detail-section bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 scroll-mt-20">
                                <h2 class="text-xl font-extrabold text-slate-950 mb-3">Syarat & ketentuan penting</h2>
                                <ul class="list-disc pl-5 space-y-2 text-sm leading-6 text-slate-600">
                                    <li>Waktu berangkat dan perjalanan dapat berubah karena cuaca, kondisi laut, lalu lintas, atau kebijakan operator.</li>
                                    <li>Lumba-lumba adalah satwa liar; penampakan tidak dapat dijamin.</li>
                                    <li>Total biaya mengikuti pilihan paket, kendaraan, dan layanan tambahan. Rincian perjalanan serta ketersediaan dikonfirmasi sebelum pembayaran.</li>
                                    <li>Ketentuan pembayaran, perubahan jadwal, pembatalan, dan pengembalian dana harus ditampilkan setelah kebijakan operator Bali Trans ditetapkan.</li>
                                    <li>Untuk kunjungan ke pura atau tempat suci, ikuti aturan berpakaian dan arahan pengelola setempat.</li>
                                </ul>
                            </section>
                        </div>

                        <aside class="lg:col-span-4 min-w-0">
                            <div class="lg:sticky lg:top-20 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-lg">
                                <p class="text-xs font-bold text-slate-500">Harga per orang</p>
                                <p class="text-2xl font-black text-slate-950 mt-1">${basePrice}</p>
                                <p class="text-xs text-slate-500 mt-1">Paket dasar per orang. Kendaraan dan add-ons dipilih di bawah.</p>
                                <div class="border-t border-slate-100 mt-5 pt-5">
                                    <label for="bookingDateInput" class="block text-sm font-bold text-slate-800 mb-2">Tanggal perjalanan</label>
                                    <input type="date" id="bookingDateInput" min="${new Date().toISOString().split('T')[0]}" value="${new Date().toISOString().split('T')[0]}" class="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200">
                                </div>
                                <div class="mt-4">
                                    <label class="block text-sm font-bold text-slate-800 mb-2">Jumlah tamu</label>
                                    <div class="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3"><span id="guestCountHint" class="text-xs text-slate-500">Harga dihitung per orang</span><div class="flex items-center gap-4"><button type="button" onclick="changeQty(-1)" aria-label="Kurangi tamu" class="w-8 h-8 rounded-full bg-white border border-slate-200 font-bold">−</button><span id="adultQty" class="font-extrabold w-4 text-center">1</span><button type="button" onclick="changeQty(1)" aria-label="Tambah tamu" class="w-8 h-8 rounded-full bg-white border border-slate-200 font-bold">+</button></div></div>
                                </div>
                                <div class="mt-5 border-t border-slate-100 pt-4">
                                    <h3 class="font-extrabold text-sm text-slate-900 mb-3">Pilih kendaraan</h3>
                                    <div class="space-y-2" id="detailVehicleChoices">
                                        <label class="detail-vehicle-choice flex items-start gap-2 rounded-xl border-2 border-orange-500 bg-orange-50 p-3 cursor-pointer"><input type="radio" name="detailVehicle" value="avanza" data-name="Toyota Avanza" data-surcharge="0" checked onchange="updateBookingCalculation()" class="mt-1 accent-orange-500"><span class="flex-1"><span class="block text-sm font-bold">Toyota Avanza</span><span class="block text-xs text-slate-500 mt-1">Standar untuk 1–5 tamu</span><span class="block text-xs font-bold text-orange-700 mt-1">Termasuk</span></span></label>
                                        <label class="detail-vehicle-choice flex items-start gap-2 rounded-xl border-2 border-slate-200 p-3 cursor-pointer"><input type="radio" name="detailVehicle" value="innova" data-name="Toyota Innova" data-surcharge="300000" onchange="updateBookingCalculation()" class="mt-1 accent-orange-500"><span class="flex-1"><span class="block text-sm font-bold">Toyota Innova</span><span class="block text-xs text-slate-500 mt-1">Upgrade kenyamanan</span><span class="block text-xs font-bold text-orange-700 mt-1">+Rp300.000 / perjalanan</span></span></label>
                                        <label class="detail-vehicle-choice flex items-start gap-2 rounded-xl border-2 border-slate-200 p-3 cursor-pointer"><input type="radio" name="detailVehicle" value="hiace" data-name="Toyota HiAce" data-surcharge="500000" onchange="updateBookingCalculation()" class="mt-1 accent-orange-500"><span class="flex-1"><span class="block text-sm font-bold">Toyota HiAce</span><span class="block text-xs text-slate-500 mt-1">Untuk rombongan</span><span class="block text-xs font-bold text-orange-700 mt-1">+Rp500.000 / perjalanan</span></span></label>
                                        <label class="detail-vehicle-choice flex items-start gap-2 rounded-xl border-2 border-slate-200 p-3 cursor-pointer"><input type="radio" name="detailVehicle" value="alphard" data-name="Toyota Alphard" data-surcharge="1500000" onchange="updateBookingCalculation()" class="mt-1 accent-orange-500"><span class="flex-1"><span class="block text-sm font-bold">Toyota Alphard</span><span class="block text-xs text-slate-500 mt-1">Pilihan premium untuk 1–5 tamu</span><span class="block text-xs font-bold text-orange-700 mt-1">+Rp1.500.000 / perjalanan</span></span></label>
                                    </div>
                                </div>
                                <div class="mt-5 border-t border-slate-100 pt-4">
                                    <h3 class="font-extrabold text-sm text-slate-900 mb-1">Tambahan pengalaman</h3>
                                    <p class="text-xs text-slate-500 mb-3">Opsional — pilih sesuai keinginan.</p>
                                    <div class="space-y-2">
                                        <label class="flex items-start gap-2 rounded-xl border border-slate-200 p-3 cursor-pointer"><input type="checkbox" name="detailAddon" value="snorkeling" data-label="Snorkeling di Lovina" data-price="250000" data-mode="person" onchange="updateBookingCalculation()" class="mt-1 accent-orange-500"><span class="flex-1"><span class="block text-sm font-bold">Snorkeling di Lovina</span><span class="block text-xs text-slate-500 mt-1">Setelah aktivitas dolphin watching · +Rp250.000 / orang</span></span></label>
                                        <label class="flex items-start gap-2 rounded-xl border border-slate-200 p-3 cursor-pointer"><input type="checkbox" name="detailAddon" value="swim-dolphin" data-label="Berenang bersama lumba-lumba" data-price="350000" data-mode="person" onchange="updateBookingCalculation()" class="mt-1 accent-orange-500"><span class="flex-1"><span class="block text-sm font-bold">Berenang bersama lumba-lumba</span><span class="block text-xs text-slate-500 mt-1">Opsi aktivitas tambahan, mengikuti aturan operator dan keselamatan · +Rp350.000 / orang</span></span></label>
                                        <label class="flex items-start gap-2 rounded-xl border border-slate-200 p-3 cursor-pointer"><input type="checkbox" name="detailAddon" value="sightseeing" data-label="Persinggahan sunset Tanah Lot" data-price="350000" data-mode="group" onchange="updateBookingCalculation()" class="mt-1 accent-orange-500"><span class="flex-1"><span class="block text-sm font-bold">Sunset di Tanah Lot</span><span class="block text-xs text-slate-500 mt-1">Persinggahan di akhir perjalanan · +Rp350.000 / mobil</span></span></label>
                                    </div>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-5">
                                    <div class="flex justify-between gap-3 text-sm"><span class="text-slate-600">Paket</span><span id="selectedOptionLabel" class="font-bold text-right">Paket Tour Lovina</span></div>
                                    <div class="flex justify-between gap-3 text-sm mt-2"><span class="text-slate-600">Kendaraan & add-ons</span><span id="selectedExtrasLabel" class="font-bold text-right">Tidak ada tambahan</span></div>
                                    <div class="border-t border-slate-200 mt-3 pt-3 flex justify-between items-end gap-3"><span class="font-extrabold text-slate-800">Total untuk <span id="detailGuestTotal">1</span> tamu</span><span id="calculatedTotalPrice" class="text-xl font-black text-orange-600 text-right">${curr.format(Math.min(...pkg.options.map(opt => opt.priceIDR)))}</span></div>
                                    <p class="text-xs text-slate-500 mt-2">Total diperbarui otomatis sesuai jumlah tamu, kendaraan, dan tambahan yang dipilih.</p>
                                </div>
                                <p class="text-[11px] leading-5 text-slate-500 mt-3">Ketersediaan dan rincian perjalanan akan dikonfirmasi sebelum pembayaran.</p>
                                <div class="space-y-2 mt-4">
                                    <button onclick="addToCartCurrentPkg()" class="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-extrabold py-3.5 px-4 rounded-xl transition text-sm"><i class="fas fa-cart-plus mr-2"></i>Tambah ke keranjang</button>
                                    <button onclick="bookNowCurrentPkg()" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 px-4 rounded-xl transition text-sm">Lanjutkan pemesanan <i class="fas fa-arrow-right ml-1"></i></button>
                                </div>
                            </div>
                            <div class="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                                <h3 class="font-extrabold text-slate-900 mb-4">Yang termasuk dalam paket</h3>
                                <div class="grid grid-cols-2 gap-4 text-xs text-slate-600">
                                    <div class="flex items-start gap-2"><span class="w-9 h-9 flex-none rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><i class="fas fa-car-side text-base"></i></span><span class="pt-1 font-semibold">Transportasi pribadi</span></div>
                                    <div class="flex items-start gap-2"><span class="w-9 h-9 flex-none rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><i class="fas fa-water text-base"></i></span><span class="pt-1 font-semibold">Dolphin watching</span></div>
                                    <div class="flex items-start gap-2"><span class="w-9 h-9 flex-none rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><i class="fas fa-user-tie text-base"></i></span><span class="pt-1 font-semibold">Driver perjalanan</span></div>
                                    <div class="flex items-start gap-2"><span class="w-9 h-9 flex-none rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><i class="fas fa-route text-base"></i></span><span class="pt-1 font-semibold">Perjalanan privat</span></div>
                                </div>
                            </div>
                        </aside>
                    </div>
                    <section class="mt-10 border-t border-slate-200 pt-8" aria-labelledby="holiday-more-title">
                        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
                            <div><p class="text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-2">Holiday Tours</p><h2 id="holiday-more-title" class="text-2xl font-black text-slate-950">Lanjutkan menjelajahi Bali</h2><p class="text-sm text-slate-600 mt-2 max-w-2xl">Pilih gaya perjalanan yang ingin Anda jelajahi berikutnya.</p></div>
                            <button onclick="navigateTo('packages')" class="self-start sm:self-auto rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-700 hover:border-orange-400 hover:text-orange-700">Lihat semua holiday tours <i class="fas fa-arrow-right ml-1"></i></button>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button onclick="navigateTo('packages')" class="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-300 transition"><span class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3"><i class="fas fa-water text-lg"></i></span><span class="block font-extrabold text-slate-900">Ocean & Island Tours</span><span class="block text-xs text-slate-500 mt-1">Perjalanan laut dan pulau di sekitar Bali</span></button>
                            <button onclick="navigateTo('packages')" class="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-300 transition"><span class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3"><i class="fas fa-mountain-sun text-lg"></i></span><span class="block font-extrabold text-slate-900">Nature & Scenic Tours</span><span class="block text-xs text-slate-500 mt-1">Pemandangan alam dan destinasi pilihan</span></button>
                            <button onclick="navigateTo('packages')" class="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-300 transition"><span class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3"><i class="fas fa-map-location-dot text-lg"></i></span><span class="block font-extrabold text-slate-900">Private Bali Tours</span><span class="block text-xs text-slate-500 mt-1">Rencana perjalanan dengan transportasi privat</span></button>
                        </div>
                    </section>
                </div>
            `;
        }
