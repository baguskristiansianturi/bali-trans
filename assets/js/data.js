/* ==========================================================================
           1. DATA STORES (PACKAGES, BLOGS, STATE)
           ========================================================================== */
        const CURRENCY_RATES = {
            IDR:{symbol:'Rp ',rate:1,format:v=>'Rp '+Math.round(v).toLocaleString('id-ID')},
            USD:{symbol:'$',rate:0.000063,format:v=>'$'+(v*0.000063).toFixed(2)},
            MYR:{symbol:'RM ',rate:0.00027,format:v=>'RM '+(v*0.00027).toFixed(2)},
            SGD:{symbol:'S$',rate:0.000081,format:v=>'S$'+(v*0.000081).toFixed(2)},
            AED:{symbol:'د.إ ',rate:0.00023,format:v=>'د.إ '+(v*0.00023).toFixed(2)},
            INR:{symbol:'₹',rate:0.00525,format:v=>'₹'+(v*0.00525).toFixed(0)},
            AUD:{symbol:'A$',rate:0.000096,format:v=>'A$'+(v*0.000096).toFixed(2)},
            EUR:{symbol:'€',rate:0.000058,format:v=>'€'+(v*0.000058).toFixed(2)}
        };
        const LOCALE_SETTINGS={id:{currency:'IDR',flag:'🇮🇩',code:'IDR',lang:'id',dir:'ltr',name:'Indonesia'},ms:{currency:'MYR',flag:'🇲🇾',code:'MYR',lang:'ms',dir:'ltr',name:'Bahasa Melayu'},sg:{currency:'SGD',flag:'🇸🇬',code:'SGD',lang:'en-SG',dir:'ltr',name:'Singlish'},en:{currency:'USD',flag:'🇺🇸',code:'USD',lang:'en',dir:'ltr',name:'English'},ar:{currency:'AED',flag:'🇸🇦',code:'AED',lang:'ar',dir:'rtl',name:'العربية'},hi:{currency:'INR',flag:'🇮🇳',code:'INR',lang:'hi',dir:'ltr',name:'हिन्दी'}};
        let currentCurrency='USD',currentLanguage='en';
        try{currentLanguage=localStorage.getItem('baliTransLanguage')||'en';}catch(e){}
        if(!LOCALE_SETTINGS[currentLanguage])currentLanguage='en';
        currentCurrency=LOCALE_SETTINGS[currentLanguage].currency;

        const BALI_PACKAGES = [
            {
                id: 'lovina-dolphin-tour',
                title: 'Lovina Dolphin Tour',
                category: 'tour',
                categoryName: 'Paket Tour',
                location: 'Lovina, Wanagiri & Bedugul, North Bali',
                rating: null,
                reviewCount: 0,
                originalPriceIDR: 0,
                priceIDR: 462500,
                badge: 'Paket Privat',
                instantConfirmation: false,
                freeCancellation: false,
                hotelTransfer: false,
                heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lovina-dauphins.jpg?width=1200',
                gallery: [
                    'https://commons.wikimedia.org/wiki/Special:FilePath/Lovina-dauphins.jpg?width=1200',
                    'https://commons.wikimedia.org/wiki/Special:FilePath/Dolphins_and_Sunrise_in_Lovina,_Indonesia_Bali_-_panoramio_%283%29.jpg?width=1000',
                    'https://commons.wikimedia.org/wiki/Special:FilePath/Lovina_Beach_Bali.jpg?width=1000',
                    'https://commons.wikimedia.org/wiki/Special:FilePath/Beach_at_Lovina,_Bali.jpg?width=1000',
                    'https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Lovina.jpg?width=1000'
                ],
                highlights: [
                    'Berangkat dini hari untuk menyaksikan matahari terbit dan mencari lumba-lumba liar di perairan Lovina.',
                    'Perjalanan privat dari area penjemputan yang disepakati, termasuk aktivitas utama dolphin watching dan kebutuhan pokok dalam itinerary.',
                    'Paket mencakup perjalanan perahu, transportasi pribadi pulang-pergi, tiket masuk untuk destinasi yang termasuk dalam itinerary, dan makan siang.',
                    'Lumba-lumba adalah satwa liar; kemunculannya tidak dapat dijamin. Urutan dan waktu kunjungan bisa berubah karena cuaca, kondisi laut, dan lalu lintas.'
                ],
                itinerary: [
                    { time: '03.30', title: 'Penjemputan hotel', desc: 'Perkiraan waktu mulai dari area Bali Selatan/Ubud. Jam akhir dikonfirmasi berdasarkan lokasi jemput.' },
                    { time: '05.50', title: 'Tiba di Lovina', desc: 'Bersiap di tepi pantai dan mengikuti arahan kapten perahu.' },
                    { time: '06.00', title: 'Dolphin watching saat sunrise', desc: 'Naik perahu tradisional untuk mencari lumba-lumba di habitat alaminya. Durasi dan kondisi laut dapat bervariasi.' },
                    { time: '09.00', title: 'Waktu santai dan makan siang', desc: 'Setelah aktivitas dolphin watching, nikmati waktu istirahat dan makan siang sesuai pengaturan perjalanan.' },
                    { time: 'Siang–sore', title: 'Perjalanan kembali', desc: 'Kembali menuju area pengantaran. Lama perjalanan bergantung pada lokasi penjemputan, kondisi lalu lintas, dan pilihan persinggahan tambahan.' },
                    { time: 'Opsional, akhir perjalanan', title: 'Persinggahan Tanah Lot', desc: 'Tambahkan kunjungan ke Tanah Lot sebelum kembali ke lokasi pengantaran. Persinggahan ini tidak termasuk dalam paket dasar.' }
                ],
                options: [
                    { id: 'lovina-standard', name: 'Paket Tour Lovina', priceIDR: 462500, priceMode: 'person', maxGuests: 7, desc: 'Harga per orang untuk perjalanan Lovina dengan transportasi privat dan dolphin watching. Tambahan aktivitas dan upgrade kendaraan dapat dipilih saat checkout.', includes: ['Transportasi pribadi pulang-pergi', 'Driver, bahan bakar dan parkir', 'Perjalanan perahu dolphin watching', 'Tiket masuk destinasi yang termasuk dalam itinerary', 'Makan siang sesuai kesepakatan'], excludes: ['Kunjungan destinasi opsional yang tidak dipilih', 'Snorkeling atau swim with dolphin jika tidak dipilih', 'Pengeluaran pribadi'] }
                ],
                pricingNote: 'Area penjemputan, ketersediaan, menu makan, dan rincian perjalanan dikonfirmasi sebelum pembayaran.'
            }
        ];

        const BALI_BLOGS = [
            {
                id: 'blog-1',
                title: 'A Practical First-Time Guide to Bali',
                category: 'Guide',
                readTime: '6 min read',
                author: 'Bali Trans Editorial Team',
                date: 'Oct 12, 2026',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
                imageAlt: 'Bali coastal landscape illustrating a first-time travel guide',
                dateISO: '2026-10-12',
                sources: [
                    { title: 'Official Indonesia e-Visa portal', url: 'https://evisa.imigrasi.go.id/' },
                    { title: 'Ngurah Rai Immigration Office', url: 'https://ngurahrai.imigrasi.go.id/' }
                ],
                snippet: 'A starting point for choosing where to stay, checking entry requirements, planning local transport and preparing for your first visit.',
                content: `
                    <p class="mb-4">A first trip to Bali is easier to plan when you choose a few areas that fit your interests instead of trying to cross the island every day. Coastlines, inland villages and island trips offer different experiences, and travel between them can take longer than a map suggests.</p>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">1. Entry Requirements & E-Visa</h2>
                    <p class="mb-4">Entry requirements depend on your passport and travel plans. Check the latest visa and passport rules through official Indonesian immigration sources before departure rather than relying on an old checklist.</p>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">2. Choosing Where to Stay</h2>
                    <ul class="list-disc pl-5 mb-4 space-y-1">
                        <li><strong>Canggu & Seminyak:</strong> Beach clubs, trendy cafes, surfing, vibrant nightlife.</li>
                        <li><strong>Ubud:</strong> Rice terraces, yoga retreats, traditional arts, monkey forest.</li>
                        <li><strong>Uluwatu:</strong> Dramatic cliffs, world-class luxury resorts, surf breaks, Kecak fire dance.</li>
                        <li><strong>Sanur:</strong> Family-friendly, calm water beaches, peaceful vibe.</li>
                    </ul>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">3. Getting Around Bali</h2>
                    <p class="mb-4">Transport depends on the route and your comfort level. For a multi-stop day, agree the route, service duration, pickup point and any extra charges with a driver before confirming. Scooters are not suitable for every visitor; check licence and insurance requirements, wear a helmet and never ride beyond your experience.</p>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">4. Keep the Daily Route Realistic</h2>
                    <p class="mb-4">Avoid combining distant areas just because each stop looks close on a map. Pick a main area for the day, leave room for meals and traffic, and confirm the final route with your transport provider.</p>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">5. Check Practical Details Before You Go</h2>
                    <p class="mb-4">Check current entry rules through official sources, confirm opening hours directly with attractions, and carry sun protection and water. For temples, follow local dress guidance and respect ceremonies or areas closed to visitors.</p>
                `
            },
            {
                id: 'blog-2',
                title: 'Planning a Day on Nusa Penida: Transport and Safety',
                category: 'Destinations',
                readTime: '4 min read',
                author: 'Bali Trans Editorial Team',
                date: 'Sep 28, 2026',
                image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kelingking_Beach.jpg?width=1200',
                imageAlt: 'Kelingking Beach cliff on Nusa Penida, illustrating a general island-planning guide',
                dateISO: '2026-09-28',
                sources: [
                    { title: 'Indonesia Travel — Nusa Penida guide', url: 'https://www.indonesia.travel/id/id/travel-ideas/adventure/nusa-penida' },
                    { title: 'Bali Police — Safety reminders for Nusa Penida beaches', url: 'https://tribratanews.bali.polri.go.id/artikel/view/pb-163144-polsek-nusa-penida-imbau-wisatawan' }
                ],
                snippet: 'Plan island transport, choose a realistic group of coastal stops and check current safety guidance.',
                content: `
                    <p class="mb-4">Nusa Penida lies southeast of mainland Bali and is reached by boat. Its coastal stops are spread across the island, so a realistic plan needs to account for the crossing, road transfers and the return journey rather than treating every point on the map as nearby.</p>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">Plan transport before choosing every stop</h2>
                    <p class="mb-4">Confirm your departure and arrival pier with the boat operator, then agree how you will travel around the island. Roads and access paths can be challenging in places. Allow room for delays and avoid building an itinerary that depends on rushing between distant beaches.</p>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">Choose the coast that fits your day</h2>
                    <p class="mb-4">The west coast is known for Kelingking Beach’s cliff-top viewpoint and Crystal Bay’s shoreline and marine activities. Diamond Beach and Atuh Beach are on the eastern coast and have their own stair access. Choose a smaller group of stops instead of trying to see everything in one visit.</p>
                    <ul class="list-disc pl-5 mb-4 space-y-2">
                        <li><a class="font-semibold text-teal-700 underline" href="?page=blog-read&amp;item=nusa-penida-kelingking-beach">Kelingking Beach: viewpoint, access and safety</a></li>
                        <li><a class="font-semibold text-teal-700 underline" href="?page=blog-read&amp;item=nusa-penida-crystal-bay">Crystal Bay: coastal views and marine activities</a></li>
                        <li><a class="font-semibold text-teal-700 underline" href="?page=blog-read&amp;item=nusa-penida-diamond-beach">Diamond Beach: access and safety</a></li>
                        <li><a class="font-semibold text-teal-700 underline" href="?page=blog-read&amp;item=nusa-penida-atuh-beach">Atuh Beach: eastern-coast guide</a></li>
                    </ul>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">Keep safety decisions local</h2>
                    <p class="mb-4">A Bali Police notice dated 28 May 2025 warned that swimming was prohibited at Kelingking Beach and Diamond Beach at that time because of dangerous currents. Check current signs and follow local instructions on the day. Calm-looking water is not proof that swimming is safe.</p>
                    <p class="mb-4">Before travelling, check the latest official guidance and your operator’s arrangements. Conditions, access and restrictions can change; this overview is a planning aid, not a guarantee that any activity will be available.</p>
                `
            },
            {
                id: 'blog-3',
                title: 'Balinese Dishes to Try on Your Trip',
                category: 'Culinary',
                readTime: '5 min read',
                author: 'Bali Trans Editorial Team',
                date: 'Sep 15, 2026',
                image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
                imageAlt: 'Food photograph illustrating Balinese dishes and local cuisine',
                dateISO: '2026-09-15',
                sources: [
                    { title: 'Indonesia Travel — Balinese dishes to try', url: 'https://www.indonesia.travel/id/id/travel-ideas/gastronomy/10-iconic-cuisine-s-that-you-must-try-on-your-next-visit-to-bali' }
                ],
                snippet: 'Get to know a few well-known Balinese dishes and coastal seafood options to look out for during your stay.',
                content: `
                    <p class="mb-4">Balinese food often balances aromatic spices, herbs and sambal. Recipes vary by household and region, so the same dish can taste different from one kitchen to another.</p>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">Dishes Worth Looking For</h2>
                    <ul class="list-disc pl-5 mb-4 space-y-2">
                        <li><strong>Babi guling:</strong> Roast pork commonly served with rice and a selection of sides.</li>
                        <li><strong>Bebek betutu:</strong> Duck prepared with a spiced seasoning; cooking methods and serving styles vary.</li>
                        <li><strong>Ayam betutu:</strong> A chicken version seasoned with a rich spice mixture.</li>
                        <li><strong>Nasi campur Bali:</strong> Rice served with several small portions of vegetables, meat or other accompaniments.</li>
                        <li><strong>Lawar:</strong> A mixed dish made with vegetables, herbs and other ingredients; recipes can include meat or animal blood, so ask about ingredients if needed.</li>
                        <li><strong>Seafood in Jimbaran:</strong> Coastal restaurants serve fish and other seafood. Check the price, portion size and cooking method before ordering.</li>
                    </ul>
                    <h2 class="text-xl font-bold text-slate-900 mb-2">Eat Well and Ask Questions</h2>
                    <p class="mb-4">Tell the restaurant about allergies and dietary needs before ordering, and ask whether a dish contains meat, seafood, peanuts or other ingredients you avoid. Choose food that is freshly prepared and stored appropriately, especially in hot weather.</p>
                `
            }
,
            {
                id: "nusa-penida-kelingking-beach",
                title: "Kelingking Beach: Viewpoints, Access and Safety",
                date: "Oct 19, 2026",
                category: "Nusa Penida",
                readTime: "3 min read",
                author: "Bali Trans Editorial Team",
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Kelingking,_Nusa_Penida.jpg?width=1200",
                imageAlt: "Kelingking Beach’s distinctive cliff and coastline viewed from above",
                dateISO: "2026-10-19",
                sources: [{"title":"Indonesia Travel — Nusa Penida guide","url":"https://www.indonesia.travel/id/id/travel-ideas/adventure/nusa-penida"},{"title":"Bali Police — Nusa Penida beach safety notice (28 May 2025)","url":"https://tribratanews.bali.polri.go.id/artikel/view/pb-163144-polsek-nusa-penida-imbau-wisatawan"}],
                snippet: "Plan a visit to Kelingking Beach around the cliff-top viewpoint, steep access and current sea-safety instructions.",
                content: "<p class=\"mb-4\">Kelingking Beach sits on the southwestern coast of Nusa Penida and is known for its distinctive cliff profile above the sea. The viewpoint is a major reason visitors stop here; reaching the sand below is a separate, more demanding undertaking.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Start with the viewpoint</h2>\n<p class=\"mb-4\">For many visitors, the cliff-top view is the main experience. Stay behind barriers and away from exposed edges, especially when the ground is wet or crowded. Do not step onto unstable slopes for a photograph.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Treat the descent as a serious hike</h2>\n<p class=\"mb-4\">The route down is steep and exposed in places, and conditions can change with weather and maintenance. Wear footwear with grip, carry water, protect yourself from the sun and turn back if the route feels beyond your ability. Do not plan the descent as a casual beach stroll.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Sea safety comes first</h2>\n<p class=\"mb-4\">In a notice dated 28 May 2025, Bali Police said swimming was prohibited at Kelingking Beach and Diamond Beach at that time, warning visitors about dangerous currents. Treat that notice as a serious safety reminder, check current signs at the site and follow local instructions. Never enter the water where swimming is prohibited, even if the surface looks calm.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Plan the day realistically</h2>\n<p class=\"mb-4\">Allow time for the road journey between stops and expect uneven access around the viewpoint. Check local conditions before setting out, and avoid trying to fit too many distant locations into one day.</p>\n<p class=\"mb-4\">This guide focuses on practical planning, not a promise that every path or beach activity is currently open. Confirm the latest access and safety instructions locally before visiting.</p>"
            },
            {
                id: "nusa-penida-crystal-bay",
                title: "Crystal Bay: Coastal Views and Marine Activities",
                date: "Oct 19, 2026",
                category: "Nusa Penida",
                readTime: "3 min read",
                author: "Bali Trans Editorial Team",
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Crystal_Bay_Beach.jpg?width=1200",
                imageAlt: "Crystal Bay’s coastline and clear water on Nusa Penida",
                dateISO: "2026-10-19",
                sources: [{"title":"Indonesia Travel — Nusa Penida guide","url":"https://www.indonesia.travel/id/id/travel-ideas/adventure/nusa-penida"},{"title":"Bali Police — Nusa Penida beach safety notice (28 May 2025)","url":"https://tribratanews.bali.polri.go.id/artikel/view/pb-163144-polsek-nusa-penida-imbau-wisatawan"}],
                snippet: "A practical introduction to Crystal Bay’s west-coast setting, sunset views and sea-safety checks.",
                content: "<p class=\"mb-4\">Crystal Bay is on the western side of Nusa Penida, near Nusa Ceningan. Indonesia Travel describes the bay as a place known for clear water, marine activities and west-facing sunset views. Conditions and visibility vary, so treat these as possibilities rather than guarantees for a particular day.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Choose your visit around conditions</h2>\n<p class=\"mb-4\">Some visitors come for the shoreline and sunset; others plan snorkelling or diving with a local operator. If you intend to enter the water, check the conditions and local advice first, and use an operator that explains the route, equipment and safety rules clearly.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Do not judge the sea by its surface</h2>\n<p class=\"mb-4\">A calm-looking surface does not guarantee safe swimming. Currents and conditions can change, and official safety advice for Nusa Penida stresses following local signs and instructions. Do not enter the water if authorities or posted notices prohibit it, and do not snorkel or dive alone.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Plan the transfer</h2>\n<p class=\"mb-4\">Crystal Bay is one stop on an island with separate road journeys between coastal areas. Check the condition of the road and the time needed to reach your next stop rather than assuming nearby places are a short walk apart.</p>\n<p class=\"mb-4\">For a more relaxed visit, keep your plan flexible and let local conditions determine whether marine activities go ahead.</p>"
            },
            {
                id: "nusa-penida-diamond-beach",
                title: "Diamond Beach: Access, Views and Safety",
                date: "Oct 19, 2026",
                category: "Nusa Penida",
                readTime: "3 min read",
                author: "Bali Trans Editorial Team",
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Diamond_Beach_in_Nusa_Penida,_Bali.jpg?width=1200",
                imageAlt: "Diamond Beach’s pale sand and steep limestone coastline on Nusa Penida",
                dateISO: "2026-10-19",
                sources: [{"title":"Indonesia Travel — Nusa Penida guide","url":"https://www.indonesia.travel/id/id/travel-ideas/adventure/nusa-penida"},{"title":"Bali Police — Nusa Penida beach safety notice (28 May 2025)","url":"https://tribratanews.bali.polri.go.id/artikel/view/pb-163144-polsek-nusa-penida-imbau-wisatawan"}],
                snippet: "What to consider before visiting Diamond Beach, including the stair access and an important sea-safety warning.",
                content: "<p class=\"mb-4\">Diamond Beach is on the eastern coast of Nusa Penida. Its cliff-framed shoreline and ocean views make it a popular stop, but the route from the upper area to the beach involves stairs and should be planned with care.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Check access before descending</h2>\n<p class=\"mb-4\">The descent can be physically demanding. Wear footwear suited to steps, keep your hands free where possible and take your time. If you are travelling with children, older visitors or anyone with limited mobility, decide whether the descent is appropriate before starting down.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Follow swimming restrictions</h2>\n<p class=\"mb-4\">A Bali Police notice dated 28 May 2025 specifically named Diamond Beach among locations where swimming was prohibited at that time, following serious water-safety incidents. Check current signs and local instructions on arrival. If swimming is prohibited, stay out of the water; strong currents can be dangerous even when the sea looks calm.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Make room for a careful visit</h2>\n<p class=\"mb-4\">Allow enough time for the approach, the stairs and the return climb. Bring water and sun protection, avoid rushing for photographs and do not cross barriers or use unofficial cliff paths.</p>\n<p class=\"mb-4\">Diamond Beach is often paired with other eastern Nusa Penida stops, but do not assume access, weather or sea conditions will be the same at each location. Recheck the local situation before moving on.</p>"
            },
            {
                id: "nusa-penida-atuh-beach",
                title: "Atuh Beach: A Guide to Nusa Penida’s Eastern Coast",
                date: "Oct 19, 2026",
                category: "Nusa Penida",
                readTime: "3 min read",
                author: "Bali Trans Editorial Team",
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Atuh_Beach,_Nusa_Penida_Bali.jpg?width=1200",
                imageAlt: "Atuh Beach’s curved shoreline, cliffs and sea on eastern Nusa Penida",
                dateISO: "2026-10-19",
                sources: [{"title":"Indonesia Travel — Nusa Penida guide","url":"https://www.indonesia.travel/id/id/travel-ideas/adventure/nusa-penida"},{"title":"Bali Police — Nusa Penida beach safety notice (28 May 2025)","url":"https://tribratanews.bali.polri.go.id/artikel/view/pb-163144-polsek-nusa-penida-imbau-wisatawan"}],
                snippet: "Plan for Atuh Beach’s eastern-coast setting, stair access and changing sea conditions.",
                content: "<p class=\"mb-4\">Atuh Beach lies on the eastern coast of Nusa Penida, close to Diamond Beach. Indonesia Travel describes the area as a stretch of coast framed by limestone cliffs and rock formations. The two beaches can fit into the same broad outing, but each has its own access route and conditions.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Prepare for the steps</h2>\n<p class=\"mb-4\">Access from the upper area involves stairs. Take your time on the way down and back up, wear shoes with grip and avoid rushing when the steps are wet or crowded. Visitors who are unsure about steep access can enjoy the viewpoint without committing to the descent.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Respect local safety instructions</h2>\n<p class=\"mb-4\">Sea conditions can be hazardous around Nusa Penida. Bali Police has warned visitors to obey posted restrictions and not to assume calm-looking water is safe. Check the current signs at Atuh Beach and follow local guidance before approaching the water; this article does not promise that swimming is permitted.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Keep the itinerary flexible</h2>\n<p class=\"mb-4\">Plan transport and return time with the stair access in mind. Carry drinking water and sun protection, and leave enough time to travel between eastern-coast stops without rushing.</p>\n<p class=\"mb-4\">For a more comfortable day, choose the stops that suit your group’s fitness and mobility, and let local conditions decide how long you stay.</p>"
            }
        ];
