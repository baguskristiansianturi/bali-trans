function renderNotFoundView() {
            return '<main class="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center"><p class="text-xs font-extrabold uppercase tracking-widest text-teal-700">Bali Trans</p><h1 class="text-3xl sm:text-4xl font-black text-slate-950 mt-3">We couldn’t find that page</h1><p class="text-sm sm:text-base leading-7 text-slate-600 mt-4">This link may be outdated, or the page has not been added yet.</p><div class="flex flex-col sm:flex-row justify-center gap-3 mt-7"><button type="button" onclick="navigateTo(\'home\')" class="rounded-xl bg-klook-orange px-5 py-3 text-sm font-bold text-white">Back to home</button><button type="button" onclick="navigateTo(\'discovery\',\'region:north\')" class="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">Explore destinations</button><button type="button" onclick="navigateTo(\'blog\')" class="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">Read travel guides</button></div></main>';
        }

/* ==========================================================================
           3. VIEW RENDERING FUNCTIONS (KLOOK STYLE)
           ========================================================================== */
        

        /* ABOUT US PAGE */
        function renderAboutView() {
            return `
              <section class="bg-slate-900 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-300 mb-4">About Bali Trans</p>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mb-6">A simpler way to plan your time in Bali.</h1>
                <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">Bali Trans helps travellers explore tour options and arrange private transport around Bali. We want the important details to be clear before you decide: where you’ll go, what the trip includes, and what needs to be confirmed.</p>
                <button onclick="navigateTo('packages')" class="mt-8 inline-flex items-center gap-2 bg-klook-orange hover:bg-klook-hover text-white font-bold px-5 py-3 rounded-xl transition">Explore tours & services <i class="fas fa-arrow-right"></i></button>
              </div></section>
              <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"><div>
                  <p class="text-xs font-extrabold uppercase tracking-wider text-klook-orange mb-3">What matters to us</p>
                  <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mb-5">Good trips start with clear expectations.</h2>
                  <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">From day tours to private transport, every trip starts with understanding your plans. Browse the options on this website and get in touch to clarify the route, timing, pickup arrangements or what is included.</p>
                  <p class="text-sm sm:text-base text-slate-600 leading-relaxed">We aim to make planning straightforward. Specific schedules, inclusions, prices and availability should be checked for each service before a booking is confirmed.</p>
                </div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-map-marked-alt"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Tour experiences</h3><p class="text-sm text-slate-600 leading-relaxed">Review destinations, highlights and itinerary details before choosing a trip.</p></div>
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-car-side"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Private transport</h3><p class="text-sm text-slate-600 leading-relaxed">Discuss pickup points, destinations and timing for your travel plans.</p></div>
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-clipboard-list"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Clear trip details</h3><p class="text-sm text-slate-600 leading-relaxed">Check inclusions, exclusions and conditions before making a decision.</p></div>
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-comments"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Ask before booking</h3><p class="text-sm text-slate-600 leading-relaxed">Contact us to clarify the details that matter to your trip.</p></div>
                </div></div>
              </section>
              <section class="bg-slate-50 border-y border-slate-100"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div><h2 class="text-2xl font-black text-slate-900 mb-2">Planning a trip to Bali?</h2><p class="text-sm text-slate-600">Tell us what you have in mind and ask about the available options.</p></div>
                <button onclick="navigateTo('contact')" class="inline-flex items-center justify-center gap-2 bg-klook-orange hover:bg-klook-hover text-white font-bold px-5 py-3 rounded-xl transition">Contact Bali Trans <i class="fas fa-arrow-right"></i></button>
              </div></section>
            `;
        }

        function renderImageCreditsView() {
            const credits = [
                {name:'Cliff at Uluwatu Temple, Bali',author:'Emma THERY',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Cliff_at_Uluwatu_temple,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Rice Terraces, Ubud, Bali',author:'Vyacheslav Argenberg',license:'CC BY 4.0',file:'https://commons.wikimedia.org/wiki/File:Rice_terraces,_Ubud,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by/4.0/'},
                {name:'Tirta Gangga',author:'Umar Khatab Eko Putrawan',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Tirta_Gangga.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Lovina Beach Bali',author:'Tisa0603',license:'CC0 1.0',file:'https://commons.wikimedia.org/wiki/File:Lovina_Beach_Bali.jpg',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
                {name:'West Bali National Park Beach from Bali Strait',author:'F. H. Panggabean',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:West_Bali_National_Park_Beach_from_Bali_Strait.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Kelingking Beach',author:'Siapus',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Kelingking_Beach.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Lovina Dolphins',author:'Kahadni',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Lovina-dauphins.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Dolphins and Sunrise in Lovina, Indonesia Bali',author:'Michelle Maria',license:'CC BY 3.0',file:'https://commons.wikimedia.org/wiki/File:Dolphins_and_Sunrise_in_Lovina,_Indonesia_Bali_-_panoramio_(3).jpg',licenseUrl:'https://creativecommons.org/licenses/by/3.0/'},
                {name:'Beach at Lovina, Bali',author:'Ken Eckert',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Beach_at_Lovina,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Pantai Lovina',author:'Tisa0603',license:'CC0 1.0',file:'https://commons.wikimedia.org/wiki/File:Pantai_Lovina.jpg',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
                {name:'Bali coastal landscape (article illustration)',author:'Unsplash contributor; photo ID photo-1537996194471-e657df975ab4',license:'Unsplash License',file:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',licenseUrl:'https://unsplash.com/license'},
                {name:'Balinese food (article illustration)',author:'Unsplash contributor; photo ID photo-1555400038-63f5ba517a47',license:'Unsplash License',file:'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',licenseUrl:'https://unsplash.com/license'},
                {name:'Pantai Kelingking, Nusa Penida',author:'Kresnanta',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Pantai_Kelingking,_Nusa_Penida.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Crystal Bay Beach',author:'Siapus',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Crystal_Bay_Beach.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Diamond Beach in Nusa Penida, Bali',author:'Stryn',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Diamond_Beach_in_Nusa_Penida,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Atuh Beach, Nusa Penida Bali',author:'Hendrojkson',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Atuh_Beach,_Nusa_Penida_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'}
            ];
            return `
                <section class="bg-slate-950 text-white"><div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
                    <p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">Bali Trans</p>
                    <h1 class="mt-3 text-3xl font-black sm:text-4xl">Photo credits</h1>
                    <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-300">Some destination photographs are sourced from Wikimedia Commons. Credits and license links are listed below. Images are resized for display; the original files and license terms are available from each source page.</p>
                </div></section>
                <section class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
                    <div class="space-y-3">${credits.map((item,index)=>`
                        <article class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                            <div class="flex items-start gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-extrabold text-teal-800">${String(index+1).padStart(2,'0')}</span>
                            <div class="min-w-0"><h2 class="font-extrabold text-slate-900">${item.name}</h2><p class="mt-1 text-sm text-slate-600">Author: ${item.author} · License: <a class="font-semibold text-teal-700 underline" href="${item.licenseUrl}" target="_blank" rel="noopener noreferrer">${item.license}</a></p><a class="mt-2 inline-flex text-xs font-bold text-slate-500 underline" href="${item.file}" target="_blank" rel="noopener noreferrer">View original source</a></div></div>
                        </article>`).join('')}</div>
                    <button type="button" onclick="navigateTo('home')" class="mt-7 rounded-xl bg-teal-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-teal-700">Back to Bali Trans</button>
                </section>
            `;
        }

        /* CONTACT PAGE */
        function renderContactView() {
            return `
              <section class="bg-slate-900 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-300 mb-4">Contact Bali Trans</p>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mb-5">Let’s talk about your Bali trip.</h1>
                <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">Ask about a tour, private transport, pickup arrangements or trip details. Share a few details below so your enquiry is clear.</p>
              </div></section>
              <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"><div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div class="lg:col-span-2"><h2 class="text-xl font-black text-slate-900 mb-4">How can we help?</h2><p class="text-sm text-slate-600 leading-relaxed mb-6">If you have already found a tour on this website, include its name so we understand which service you are asking about.</p>
                  <div class="space-y-4">
                    <div class="flex items-start gap-3"><div class="w-10 h-10 shrink-0 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><i class="fas fa-map-marker-alt"></i></div><div><h3 class="font-bold text-slate-900 text-sm">Service area</h3><p class="text-sm text-slate-600 mt-1">Bali, Indonesia. Ask about your planned route and pickup area.</p></div></div>
                    <div class="flex items-start gap-3"><div class="w-10 h-10 shrink-0 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center"><i class="fas fa-route"></i></div><div><h3 class="font-bold text-slate-900 text-sm">Tours & private transport</h3><p class="text-sm text-slate-600 mt-1">Share your date, group size and places you would like to visit.</p></div></div>
                    <div class="flex items-start gap-3"><div class="w-10 h-10 shrink-0 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center"><i class="fas fa-info-circle"></i></div><div><h3 class="font-bold text-slate-900 text-sm">Before you book</h3><p class="text-sm text-slate-600 mt-1">Confirm the final price, inclusions, availability and cancellation terms before paying.</p></div></div>
                  </div>
                </div>
                <div class="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm">
                  <h2 class="text-xl font-black text-slate-900 mb-2">Send an enquiry</h2><p class="text-sm text-slate-500 mb-6">Fields marked * are required.</p>
                  <form id="contactEnquiryForm" onsubmit="submitContactEnquiry(event)" class="space-y-5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label for="contactName" class="block text-sm font-bold text-slate-700 mb-2">Your name *</label><input id="contactName" name="name" required autocomplete="name" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-klook-orange" placeholder="Name"></div>
                      <div><label for="contactEmail" class="block text-sm font-bold text-slate-700 mb-2">Email address *</label><input id="contactEmail" name="email" type="email" required autocomplete="email" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-klook-orange" placeholder="you@example.com"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label for="contactService" class="block text-sm font-bold text-slate-700 mb-2">What do you need? *</label><select id="contactService" name="service" required class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-klook-orange"><option value="">Choose a service</option><option>Day tour</option><option>Private transport</option><option>Airport transfer</option><option>Island trip</option><option>Other trip enquiry</option></select></div>
                      <div><label for="contactDate" class="block text-sm font-bold text-slate-700 mb-2">Planned date</label><input id="contactDate" name="date" type="date" min="${new Date().toISOString().split('T')[0]}" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-klook-orange"></div>
                    </div>
                    <div><label for="contactMessage" class="block text-sm font-bold text-slate-700 mb-2">Trip details *</label><textarea id="contactMessage" name="message" required rows="5" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-klook-orange" placeholder="Tell us your pickup area, group size, places you want to visit, and any questions."></textarea></div>
                    <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-klook-orange hover:bg-klook-hover text-white font-extrabold px-6 py-3.5 rounded-xl transition">Prepare enquiry <i class="fas fa-arrow-right"></i></button>
                    <p class="text-xs text-slate-500 leading-relaxed">Confirm service details and availability before making payment.</p>
                  </form>
                </div>
              </div></section>
            `;
        }

        function submitContactEnquiry(event) {
            event.preventDefault();
            const form = document.getElementById('contactEnquiryForm');
            if (!form || !form.reportValidity()) return;
            const data = new FormData(form);
            const message = [
                'Hello Bali Trans, I would like to ask about a trip.',
                'Name: ' + data.get('name'),
                'Email: ' + data.get('email'),
                'Service: ' + data.get('service'),
                'Planned date: ' + (data.get('date') || 'Flexible / not decided'),
                'Trip details: ' + data.get('message')
            ].join('\\n');
            const contactNumber = window.BALI_TRANS_WHATSAPP_NUMBER || BALI_TRANS_WHATSAPP_NUMBER || '';
            if (!contactNumber) {
                showToast('The official WhatsApp number must be configured before enquiries can be sent.');
                return;
            }
            window.open('https://wa.me/' + contactNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
        }
