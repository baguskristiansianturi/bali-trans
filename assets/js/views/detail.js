
        function setDolphinGuestCategory(category) {
            window.dolphinGuestCategory = category === 'international' ? 'international' : 'local';
            var isInternational = window.dolphinGuestCategory === 'international';
            var adultIDR = isInternational ? 950000 : 750000;
            var displayCurrency = isInternational ? (currentCurrency === 'IDR' ? 'USD' : currentCurrency) : 'IDR';
            var currency = CURRENCY_RATES[displayCurrency] || CURRENCY_RATES.IDR;
            var adultEl = document.getElementById('dolphinAdultRate');
            var childEl = document.getElementById('dolphinChildRate');
            var localTab = document.getElementById('dolphinLocalRateTab');
            var intlTab = document.getElementById('dolphinInternationalRateTab');
            if (adultEl) adultEl.textContent = currency.format(adultIDR);
            if (childEl) childEl.textContent = currency.format(adultIDR * 0.6);
            [localTab,intlTab].forEach(function(tab){ if(tab){ var selected = tab === (isInternational ? intlTab : localTab); tab.classList.toggle('is-selected',selected); tab.setAttribute('aria-pressed',selected?'true':'false'); }});
            var rows = document.getElementById('dolphinGroupRateRows');
            if (rows) {
                var tiers = [{label:'3–4 guests',discount:0.025},{label:'5–6 guests',discount:0.025},{label:'7–10 guests',discount:0.05},{label:'11–15 guests',discount:0.075}];
                rows.innerHTML = tiers.map(function(tier){var adult=adultIDR*(1-tier.discount);return '<div class="dolphin-rate-row grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white px-4 py-3 transition-colors"><div class="flex flex-col items-start gap-1.5"><strong class="text-sm sm:text-base text-slate-800">'+tier.label+'</strong><span class="block text-xs font-medium leading-4 text-slate-500">'+(Math.round(tier.discount*1000)/10)+'% group discount</span></div><span class="text-sm font-bold text-slate-800 text-right">'+currency.format(adult)+' <small class="font-normal text-slate-500">/ adult</small><br>'+currency.format(adult*0.6)+' <small class="font-normal text-slate-500">/ child</small></span></div>';}).join('') + '<div class="dolphin-rate-row dolphin-special-rate"><strong>More than 15 guests</strong><p>Special group rates will be confirmed by our team. Continue with Book Now and include your group size.</p></div>';
            }
        }
        function toggleDolphinPriceSheet(focusDate) {
            var sheet = document.getElementById('dolphinPriceSheet');
            if (!sheet) return;
            sheet.classList.toggle('hidden');
            var isOpen = !sheet.classList.contains('hidden');
            if (isOpen) setDolphinGuestCategory(window.dolphinGuestCategory || 'local');
            sheet.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            document.body.classList.toggle('dolphin-sheet-open', isOpen);
            if (isOpen && focusDate) setTimeout(function(){ var d=document.getElementById('dolphinMobileDate'); if(d)d.focus(); }, 80);
        }
        function setDolphinActiveTab(link) {
            document.querySelectorAll('.dolphin-tab').forEach(function(tab) {
                var active = tab === link;
                tab.classList.toggle('active-tab', active);
                tab.classList.toggle('border-transparent', !active);
                tab.classList.toggle('text-slate-600', !active);
                tab.classList.toggle('border-slate-800', active);
                tab.classList.toggle('text-slate-900', active);
                tab.setAttribute('aria-current', active ? 'location' : 'false');
            });
            var nav = link && link.closest('.dolphin-tabs');
            var scroller = nav && nav.querySelector('.dolphin-tab-scroller');
            if (link && scroller) {
                var tabRect = link.getBoundingClientRect();
                var scrollerRect = scroller.getBoundingClientRect();
                var edge = 16, target = scroller.scrollLeft;
                if (tabRect.left < scrollerRect.left + edge) target += tabRect.left - scrollerRect.left - edge;
                else if (tabRect.right > scrollerRect.right - edge) target += tabRect.right - scrollerRect.right + edge;
                target = Math.max(0, Math.min(target, scroller.scrollWidth - scroller.clientWidth));
                if (Math.abs(target - scroller.scrollLeft) > 2) scroller.scrollTo({left: target, behavior: 'smooth'});
            }
        }
        function navigateDolphinTab(link) {
            if (!link) return;
            var target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            setDolphinActiveTab(link);
            var nav = document.querySelector('.dolphin-tabs');
            var navHeight = nav ? nav.getBoundingClientRect().height : 0;
            var header = document.querySelector('header');
            var headerHeight = header ? Math.min(header.getBoundingClientRect().height, 88) : 64;
            var top = window.pageYOffset + target.getBoundingClientRect().top - headerHeight - navHeight - 12;
            window.scrollTo({top: Math.max(0, top), behavior: 'smooth'});
        }
        function initDolphinSectionObserver() {
            var nav = document.querySelector('.dolphin-tabs');
            var tabs = Array.prototype.slice.call(document.querySelectorAll('.dolphin-tab'));
            var sections = tabs.map(function(tab) { return document.querySelector(tab.getAttribute('href')); }).filter(Boolean);
            if (!nav || !sections.length) return;
            if (window.dolphinScrollHandler) window.removeEventListener('scroll', window.dolphinScrollHandler);
            var ticking = false;
            window.dolphinScrollHandler = function() {
                if (ticking) return;
                ticking = true;
                window.requestAnimationFrame(function() {
                    var header = document.querySelector('header');
                    var headerHeight = header ? Math.min(header.getBoundingClientRect().height, 88) : 64;
                    var threshold = headerHeight + nav.getBoundingClientRect().height + 18;
                    var activeSection = sections[0];
                    sections.forEach(function(section) {
                        if (section.getBoundingClientRect().top <= threshold) activeSection = section;
                    });
                    var activeTab = tabs.find(function(tab) { return tab.getAttribute('href') === '#' + activeSection.id; });
                    if (activeTab) setDolphinActiveTab(activeTab);
                    ticking = false;
                });
            };
            window.addEventListener('scroll', window.dolphinScrollHandler, {passive: true});
            window.dolphinScrollHandler();
        }
        function updateDolphinLandingPrice() {
            var packageType = (document.querySelector('input[name="dolphinTourPackage"]:checked') || {}).value || 'regular';
            var vehicle = (document.querySelector('input[name="dolphinTourVehicle"]:checked') || {}).value || 'avanza';
            var guests = Math.max(1, Number((document.getElementById('dolphinTourGuests') || {}).value || 1));
            var vehiclePrices = { avanza: 700000, innova: 900000, hiace: 1300000 };
            var vehicleNames = { avanza: 'Toyota Avanza', innova: 'Toyota Innova', hiace: 'Toyota HiAce' };
            var total = packageType === 'regular' ? (vehiclePrices[vehicle] || 700000) : guests * 750000;
            document.querySelectorAll('[data-dolphin-addon]:checked').forEach(function(el) {
                total += Number(el.getAttribute('data-price') || 0) * (el.getAttribute('data-mode') === 'person' ? guests : 1);
            });
            var price = document.getElementById('dolphinLandingTotal');
            var mode = document.getElementById('dolphinLandingPriceMode');
            var vehicleLabel = document.getElementById('dolphinLandingVehicleSummary');
            var packageLabel = document.getElementById('dolphinLandingPackageSummary');
            if (price) price.textContent = CURRENCY_RATES.IDR.format(total);
            if (mode) mode.textContent = packageType === 'regular' ? 'Total per private vehicle · route-based price' : 'Estimated total for ' + guests + ' guest' + (guests > 1 ? 's' : '');
            if (vehicleLabel) vehicleLabel.textContent = vehicleNames[vehicle] || vehicleNames.avanza;
            if (packageLabel) packageLabel.textContent = packageType === 'regular' ? 'Regular Private Tour' : 'All-Inclusive Tour';
        }
        function startDolphinLandingBooking() {
            updateDolphinLandingPrice();
            var packageType = (document.querySelector('input[name="dolphinTourPackage"]:checked') || {}).value || 'regular';
            var vehicle = (document.querySelector('input[name="dolphinTourVehicle"]:checked') || {}).value || 'avanza';
            var guests = Math.max(1, Number((document.getElementById('dolphinTourGuests') || {}).value || 1));
            var addons = [];
            document.querySelectorAll('[data-dolphin-addon]:checked').forEach(function(el) {
                addons.push({ id: el.value, name: el.getAttribute('data-label') || el.value, priceIDR: Number(el.getAttribute('data-price') || 0), priceMode: el.getAttribute('data-mode') || 'group' });
            });
            var vehicleNames = { avanza: 'Toyota Avanza', innova: 'Toyota Innova', hiace: 'Toyota HiAce' };
            window.dolphinBookingDraft = Object.assign({}, window.dolphinBookingDraft || {}, {
                tourName: 'Bali Dolphin Tour', tourId: 'lovina-dolphin-tour', packageType: packageType,
                vehicle: vehicle, vehicleName: vehicleNames[vehicle], adults: guests, children: 0,
                addons: addons, estimatedTotal: Number(((document.getElementById('dolphinLandingTotal') || {}).textContent || '').replace(/[^\d]/g, '')) || 0,
                selectionLocked: true
            });
            navigateTo('checkout', 'dolphin-tour');
        }
        function renderDolphinTourDetailView(pkg) {
            var photos = pkg.gallery || [];
            var mainPhoto = photos[0] || pkg.heroImage;
            var benefits = [
                ['fa-water','Wild dolphin watching','A sunrise boat trip in Lovina, in the dolphins’ natural habitat.'],
                ['fa-mountain-sun','North Bali highlights','Lake viewpoints, mountain scenery and cultural landmarks.'],
                ['fa-users','Family-friendly pace','A private vehicle and a clearly planned day.'],
                ['fa-route','Flexible options','Choose your package, vehicle upgrade and available add-ons.']
            ];
            var benefitHtml = benefits.map(function(x){return '<div class="dolphin-benefit"><span><i class="fas '+x[0]+'"></i></span><div><strong>'+x[1]+'</strong><p>'+x[2]+'</p></div></div>';}).join('');
            var itinerary = [
                {time:'03:30',title:'Hotel pickup',desc:'Your driver collects you from the agreed pickup area. Exact timing depends on your hotel.',place:'Pickup',image:mainPhoto,blog:false},
                {time:'05:50',title:'Lovina Dolphin Watching',desc:'Board a traditional boat and look for wild dolphins at sunrise. Sightings cannot be guaranteed.',place:'Lovina',image:photos[1]||mainPhoto,blog:true},
                {time:'09:00',title:'Wanagiri Hidden Hill',desc:'Enjoy elevated viewpoints over the twin lakes and surrounding green hills.',place:'Wanagiri',image:photos[2]||mainPhoto,blog:true},
                {time:'10:30',title:'Handara Gate',desc:'Stop for photos at the iconic Balinese-style gate framed by mountain scenery.',place:'Handara',image:photos[3]||mainPhoto,blog:true},
                {time:'11:30',title:'Ulun Danu Beratan Temple',desc:'Explore the lakeside temple complex and its distinctive Balinese architecture.',place:'Bedugul',image:photos[4]||mainPhoto,blog:true},
                {time:'12:30',title:'Lunch & return journey',desc:'Enjoy a break before returning to your accommodation. Arrival time varies by traffic and drop-off area.',place:'Return',image:mainPhoto,blog:false}
            ];
            var timelineHtml = itinerary.map(function(x,i){return '<article class="dolphin-timeline-item"><span class="dolphin-timeline-number">'+(i+1)+'</span><div class="dolphin-timeline-time">'+x.time+'</div><div class="dolphin-timeline-copy"><h3>'+x.title+'</h3><p>'+x.desc+'</p></div></article>';}).join('');
            var destinationsHtml = itinerary.filter(function(x){return x.blog;}).map(function(x){return '<a class="dolphin-destination" href="javascript:void(0)" onclick="navigateTo(\\'blog\\')" aria-label="Browse Bali Trans travel guides for '+x.title+'"><img src="'+x.image+'" alt="'+x.title+'" loading="lazy"><span><strong>'+x.title+'</strong><small>'+x.desc+'</small><em>Explore travel guides →</em></span></a>';}).join('');
            var addons = [
                {id:'snorkelling',name:'Snorkelling in Lovina',desc:'Optional sea activity, subject to conditions and operator availability.',price:250000,mode:'person',label:'+Rp250.000 / person'},
                {id:'swim',name:'Swim experience',desc:'Request this only where the local operator confirms a suitable, safe activity.',price:150000,mode:'person',label:'+Rp150.000 / person'},
                {id:'tanahlot',name:'Tanah Lot sunset stop',desc:'A route extension with extra travel time; final feasibility and transport cost must be confirmed.',price:350000,mode:'group',label:'From +Rp350.000 / trip'},
                {id:'extrastop',name:'One extra stop',desc:'Request an additional stop along a feasible route; timing and fees are confirmed before booking.',price:50000,mode:'group',label:'From +Rp50.000 / trip'}
            ];
            var addonsHtml = addons.map(function(x){return '<label class="dolphin-addon-card"><input type="checkbox" data-dolphin-addon value="'+x.id+'" data-label="'+x.name+'" data-price="'+x.price+'" data-mode="'+x.mode+'" onchange="updateDolphinLandingPrice()"><span class="dolphin-addon-icon"><i class="fas '+(x.id==='snorkelling'?'fa-water':x.id==='swim'?'fa-person-swimming':x.id==='tanahlot'?'fa-sun':'fa-camera')+'"></i></span><strong>'+x.name+'</strong><small>'+x.desc+'</small><em>'+x.label+'</em></label>';}).join('');
            var recommendations = [
                {title:'Kintamani Full Day Tour',type:'FULL DAY TOUR',desc:'Volcano views and highland scenery.',image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',kind:'full'},
                {title:'Ubud Full Day Tour',type:'FULL DAY TOUR',desc:'Rice terraces, temples and local culture.',image:'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80',kind:'full'},
                {title:'South Bali Full Day Tour',type:'FULL DAY TOUR',desc:'Coastal temples and southern viewpoints.',image:photos[2]||mainPhoto,kind:'full'},
                {title:'Nusa Penida Long Trip',type:'LONG TRIP',desc:'An island journey with ferry and route planning.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Kelingking_Beach.jpg?width=900',kind:'long'},
                {title:'North Bali Extended Trip',type:'LONG TRIP',desc:'Explore further with a longer route and extra travel time.',image:photos[3]||mainPhoto,kind:'long'}
            ];
            function recommendationCards(kind){return recommendations.filter(function(x){return x.kind===kind;}).map(function(x){return '<a href="javascript:void(0)" onclick="navigateTo(\\'packages\\')" class="dolphin-recommendation-card"><img src="'+x.image+'" alt="'+x.title+'" loading="lazy"><span class="dolphin-recommendation-body"><small>'+x.type+'</small><strong>'+x.title+'</strong><span>'+x.desc+'</span><em>Explore tours →</em></span></a>';}).join('');}
            return '<div class="dolphin-landing-page">' +
              '<div class="dolphin-hero" style="--dolphin-hero-image:url(&quot;'+mainPhoto+'&quot;)"><div class="dolphin-hero-content"><div class="dolphin-breadcrumb">Home <span>›</span> Tours <span>›</span> Bali Dolphin Tour</div><span class="dolphin-eyebrow">FULL DAY TOUR · NORTH BALI</span><h1>Bali Dolphin Tour</h1><h2>Lovina Sunrise & North Bali Highlights</h2><p>Start before dawn for an unforgettable dolphin-watching experience, then explore North Bali’s scenic highlands, lakeside temple and iconic viewpoints.</p><div class="dolphin-hero-facts"><span><i class="fas fa-clock"></i> Full day</span><span><i class="fas fa-car"></i> Private transport</span><span><i class="fas fa-map-location-dot"></i> North Bali</span><span><i class="fas fa-sliders"></i> Flexible options</span></div><a class="dolphin-primary-cta" href="#dolphin-packages">Choose your package <i class="fas fa-arrow-right"></i></a></div></div>' +
              '<section class="dolphin-benefits" aria-label="Tour highlights">'+benefitHtml+'</section>' +
              '<section class="dolphin-landing-section dolphin-package-section" id="dolphin-packages"><div class="dolphin-section-intro"><span class="dolphin-eyebrow">TWO WAYS TO EXPLORE</span><h2>Choose your package</h2><p>The same itinerary and destinations, with different levels of convenience and inclusions.</p><div class="dolphin-package-principle"><span><i class="fas fa-map"></i> Same itinerary</span><span><i class="fas fa-plus-circle"></i> Different inclusions</span><span><i class="fas fa-heart"></i> Your comfort, your choice</span></div></div><div class="dolphin-package-card"><img src="'+mainPhoto+'" alt="Sunrise dolphin watching in Lovina" loading="lazy"><div class="dolphin-package-card-body"><span class="dolphin-package-tag">MOST CONVENIENT</span><h3>All-Inclusive Tour</h3><p>Relax and enjoy — Bali Trans arranges the listed inclusions for you.</p><div class="dolphin-package-price">From <strong>Rp750.000</strong><small> / person · sample starting rate</small></div><ul><li>Private vehicle and driver</li><li>Dolphin-watching boat trip</li><li>Entrance fees and meal as confirmed</li><li>One clear package quote</li></ul><label class="dolphin-package-select"><input type="radio" name="dolphinTourPackage" value="inclusive" onchange="updateDolphinLandingPrice()"> Select All-Inclusive</label></div></div><div class="dolphin-package-card"><img src="'+(photos[2]||mainPhoto)+'" alt="Private vehicle on a scenic Bali road" loading="lazy"><div class="dolphin-package-card-body"><span class="dolphin-package-tag">FLEXIBLE SPENDING</span><h3>Regular Private Tour</h3><p>Private transport with driver. You pay entrance tickets, meals and activities directly.</p><div class="dolphin-package-price">From <strong>Rp700.000</strong><small> / vehicle · Avanza route base example</small></div><ul><li>Private car and driver</li><li>Route-based trip price, not daily rental</li><li>Follow the planned itinerary</li><li>Choose upgrades and optional stops</li></ul><label class="dolphin-package-select"><input type="radio" name="dolphinTourPackage" value="regular" checked onchange="updateDolphinLandingPrice()"> Select Regular Tour</label></div></div></section>' +
              '<section class="dolphin-configurator" aria-labelledby="dolphin-config-title"><div><span class="dolphin-eyebrow">MAKE IT YOURS</span><h2 id="dolphin-config-title">Choose your vehicle & extras</h2><p>Avanza is the base vehicle for this sample route. Upgrade prices shown here are illustrative and must be confirmed for the actual route and date.</p><div class="dolphin-choice-grid"><label class="dolphin-vehicle-choice"><input type="radio" name="dolphinTourVehicle" value="avanza" checked onchange="updateDolphinLandingPrice()"><img src="'+(photos[2]||mainPhoto)+'" alt=""><span><strong>Toyota Avanza</strong><small>Base vehicle · 1–5 guests</small><em>Included in Regular base</em></span></label><label class="dolphin-vehicle-choice"><input type="radio" name="dolphinTourVehicle" value="innova" onchange="updateDolphinLandingPrice()"><img src="'+(photos[2]||mainPhoto)+'" alt=""><span><strong>Toyota Innova</strong><small>Comfort upgrade · subject to capacity</small><em>Example total: Rp900.000</em></span></label><label class="dolphin-vehicle-choice"><input type="radio" name="dolphinTourVehicle" value="hiace" onchange="updateDolphinLandingPrice()"><img src="'+(photos[2]||mainPhoto)+'" alt=""><span><strong>Toyota HiAce</strong><small>For larger groups</small><em>Example total: Rp1.300.000</em></span></label></div><div class="dolphin-addon-heading"><h3>Optional add-ons</h3><p>Only options relevant to this tour are shown.</p></div><div class="dolphin-addon-grid">'+addonsHtml+'</div><label class="dolphin-guest-count">Number of guests <select id="dolphinTourGuests" onchange="updateDolphinLandingPrice()"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7 guests</option><option value="8">8 guests</option><option value="9">9 guests</option><option value="10">10 guests</option></select></label></div><aside class="dolphin-live-summary"><span class="dolphin-eyebrow">YOUR TRIP SUMMARY</span><h3 id="dolphinLandingPackageSummary">Regular Private Tour</h3><div class="dolphin-summary-row"><span>Route</span><strong>Lovina & North Bali</strong></div><div class="dolphin-summary-row"><span>Vehicle</span><strong id="dolphinLandingVehicleSummary">Toyota Avanza</strong></div><div class="dolphin-summary-row"><span>Guests</span><strong id="dolphinLandingGuestsSummary">2 guests</strong></div><div class="dolphin-summary-total"><small>Estimated total</small><strong id="dolphinLandingTotal">Rp700.000</strong><span id="dolphinLandingPriceMode">Total per private vehicle · route-based price</span></div><p>Final availability, route feasibility and exact inclusions are confirmed by Bali Trans before the booking is accepted.</p><button class="dolphin-primary-cta dolphin-book-cta" onclick="startDolphinLandingBooking()">Continue to booking <i class="fas fa-arrow-right"></i></button></aside></section>' +
              '<section class="dolphin-landing-section"><div class="dolphin-section-heading"><span class="dolphin-eyebrow">THE JOURNEY</span><h2>Sample itinerary</h2><p>Explore each stop for a little more context. Timing is approximate and can change with your pickup area, traffic and conditions.</p></div><div class="dolphin-itinerary-layout"><div class="dolphin-timeline">'+timelineHtml+'<p class="dolphin-itinerary-note"><i class="fas fa-circle-info"></i> Times are approximate. Extra stops such as Tanah Lot require route and price confirmation.</p></div><div class="dolphin-destinations-panel"><div class="dolphin-destinations-heading"><h3>Featured destinations</h3><span>Scroll to explore</span></div><div class="dolphin-destinations-scroll">'+destinationsHtml+'</div></div></div></section>' +
              '<section class="dolphin-landing-section dolphin-details-grid"><div class="dolphin-info-panel"><span class="dolphin-eyebrow">GOOD TO KNOW</span><h2>Important information</h2><div class="dolphin-info-row"><i class="fas fa-clock"></i><span><strong>Tour duration</strong><small>Full day; exact return time depends on pickup area and route.</small></span></div><div class="dolphin-info-row"><i class="fas fa-car"></i><span><strong>Pickup service</strong><small>Pickup point and time are confirmed after you share your hotel.</small></span></div><div class="dolphin-info-row"><i class="fas fa-users"></i><span><strong>Suitable for</strong><small>Families, couples and private groups, subject to activity requirements.</small></span></div><div class="dolphin-info-row"><i class="fas fa-umbrella"></i><span><strong>What to bring</strong><small>Sun protection, comfortable shoes, water and a change of clothes if needed.</small></span></div></div><div class="dolphin-info-panel"><span class="dolphin-eyebrow">CLEAR BEFORE YOU BOOK</span><h2>Regular vs All-Inclusive</h2><p><strong>Regular:</strong> Bali Trans provides the agreed private vehicle and driver service. You manage your own spending for entrance tickets, meals and activities.</p><p><strong>All-Inclusive:</strong> The listed package components are arranged by Bali Trans. Check the inclusion list and exclusions in your quote; “all-inclusive” never means an unlisted item is automatically covered.</p></div></section>' +
              '<section class="dolphin-landing-section"><div class="dolphin-section-heading"><span class="dolphin-eyebrow">PLAN WITH CONFIDENCE</span><h2>Frequently asked questions</h2></div><div class="dolphin-faq-grid"><details><summary>Are dolphin sightings guaranteed?</summary><p>No. Dolphins are wild animals, so sightings cannot be guaranteed. Boat operations depend on sea and weather conditions.</p></details><details><summary>What is the difference between Regular and All-Inclusive?</summary><p>Regular includes the agreed private transport service; you pay tickets, meals and activities yourself. All-Inclusive covers only the components explicitly listed in the package.</p></details><details><summary>Can I change the itinerary?</summary><p>You can request add-ons or route changes. Bali Trans will confirm whether the timing is feasible and explain any additional cost.</p></details><details><summary>Is the price a daily car rental rate?</summary><p>No. The Regular Tour base price is specific to this route and itinerary. Other routes have their own base price and vehicle upgrade rules.</p></details></div></section>' +
              '<section class="dolphin-related-section"><div class="dolphin-section-heading"><span class="dolphin-eyebrow">KEEP EXPLORING</span><h2>More Full Day Tours</h2><p>Choose another planned day experience around Bali.</p></div><div class="dolphin-recommendation-row">'+recommendationCards('full')+'</div><div class="dolphin-section-heading dolphin-long-trip-heading"><span class="dolphin-eyebrow">GO A LITTLE FURTHER</span><h2>Long Trips</h2><p>Longer journeys with different travel times and logistics.</p></div><div class="dolphin-recommendation-row">'+recommendationCards('long')+'</div></section>' +
              '<section class="dolphin-final-cta" style="--dolphin-cta-image:url(&quot;'+mainPhoto+'&quot;)"><div><span class="dolphin-eyebrow">READY FOR YOUR NEXT ADVENTURE?</span><h2>Book your Bali Dolphin Tour</h2><p>Choose your package, select your vehicle and request any extras. We’ll confirm the final details with you.</p></div><button class="dolphin-primary-cta" onclick="document.getElementById(\\'dolphin-packages\\').scrollIntoView({behavior:\\'smooth\\'})">Choose your package <i class="fas fa-arrow-right"></i></button></section>' +
              '</div>';
        }
/* VIEW 3: PACKAGE DETAIL PAGE */
        function renderDetailView(pkg) {
            if (pkg && (pkg.id === 'dolphin-tour-preview' || pkg.id === 'lovina-dolphin-tour')) { var dolphinHtml = renderDolphinTourDetailView(pkg); setTimeout(initDolphinSectionObserver, 120); return dolphinHtml; }
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
