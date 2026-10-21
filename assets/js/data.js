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
,
            {
                      "id": "nusa-dua-guide",
                      "title": "Tempat Wisata di Nusa Dua Bali: Pantai, Water Blow, dan Aktivitas Sekitarnya",
                      "category": "Nusa Dua",
                      "readTime": "9 min read",
                      "author": "Bali Trans Editorial Team",
                      "date": "Oct 22, 2026",
                      "dateISO": "2026-10-22",
                      "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
                      "imageAlt": "Pemandangan pesisir Bali untuk panduan wisata Nusa Dua",
                      "snippet": "Panduan santai untuk mengenal kawasan Nusa Dua, memilih tempat yang ingin dikunjungi, dan menghubungkan rencana perjalanan ke Tanjung Benoa.",
                      "sources": [
                                {
                                          "title": "Indonesia Travel — Nusa Dua",
                                          "url": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/nusa-dua"
                                },
                                {
                                          "title": "ITDC — Indonesia Tourism Development Corporation",
                                          "url": "https://www.itdc.co.id/"
                                }
                      ],
                      "related": [
                                "water-blow-peninsula",
                                "itdc-nusa-dua-guide",
                                "tanjung-benoa-guide"
                      ],
                      "content": "<p class=\"mb-4\">Nusa Dua sering dipilih wisatawan yang ingin menikmati pantai, hotel, tempat makan, dan suasana liburan yang relatif tertata di Bali bagian selatan. Kawasan ini juga bisa menjadi titik awal untuk menyusun perjalanan ke beberapa tempat di sekitarnya, termasuk Water Blow di Peninsula Island dan kawasan wisata bahari Tanjung Benoa.</p>\n<p class=\"mb-4\">Supaya perjalanan tidak terasa terburu-buru, ada baiknya membedakan nama kawasan, tempat wisata, dan lokasi aktivitas. Nusa Dua adalah nama kawasan wisata yang luas; Water Blow merupakan salah satu daya tarik alam di area Peninsula Island; sedangkan Tanjung Benoa dikenal sebagai kawasan untuk berbagai aktivitas watersport.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Apa yang menarik dari Nusa Dua?</h2>\n<p class=\"mb-4\">Nusa Dua cocok untuk wisatawan yang ingin menggabungkan waktu di pantai dengan kunjungan singkat ke tempat rekreasi, seni, budaya, atau kuliner. Anda bisa menyusun hari yang santai tanpa harus berpindah jauh dari satu kawasan ke kawasan lain.</p>\n<p class=\"mb-4\">Pilihan terbaik bergantung pada tujuan liburan. Jika ingin bersantai, pilih pantai dan waktu makan yang tidak terlalu padat. Jika ingin melihat tempat yang khas, masukkan Water Blow ke dalam rencana. Jika ingin melakukan kegiatan yang lebih aktif di laut, pertimbangkan perjalanan ke Tanjung Benoa.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Water Blow dan Peninsula Island</h2>\n<p class=\"mb-4\">Water Blow dikenal karena ombak yang menghantam formasi batuan pesisir dan dapat menghasilkan semburan air. Bentuk gelombang dan pengalaman saat berkunjung bergantung pada kondisi laut, jadi jangan berharap semburan besar selalu terlihat. Tetap berada di area yang diizinkan dan ikuti tanda keselamatan setempat.</p>\n<p class=\"mb-4\">Baca panduan khusus kami: <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=water-blow-peninsula\">Water Blow dan Peninsula Island: hal yang perlu diketahui sebelum berkunjung</a>.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Mengenal kawasan ITDC Nusa Dua</h2>\n<p class=\"mb-4\">ITDC Nusa Dua merupakan kawasan pariwisata terpadu dengan hotel, fasilitas rekreasi, ruang kegiatan, dan akses menuju sejumlah daya tarik di sekitarnya. Karena kawasan ini cukup luas, tentukan tempat tujuan secara spesifik sebelum berangkat, bukan hanya menyebut “Nusa Dua” kepada pengemudi.</p>\n<p class=\"mb-4\">Untuk gambaran lebih lengkap tentang kawasan dan perencanaan kunjungan, lanjutkan ke <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=itdc-nusa-dua-guide\">panduan kawasan ITDC Nusa Dua</a>.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Bagaimana dengan aktivitas wisata bahari?</h2>\n<p class=\"mb-4\">Jika Anda ingin mencoba permainan air, Tanjung Benoa merupakan kawasan terdekat yang dikenal dengan aktivitas seperti jet ski, banana boat, parasailing, snorkeling, dan beberapa pengalaman wisata laut lainnya. Daftar yang tersedia berbeda menurut operator, kondisi laut, dan ketentuan masing-masing aktivitas.</p>\n<p class=\"mb-4\">Kami membahas kawasan itu secara terpisah di <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=tanjung-benoa-guide\">panduan wisata Tanjung Benoa</a>. Jika sudah tahu aktivitas yang dicari, Anda juga bisa melihat <a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-tanjung-benoa.html\">pilihan watersport Tanjung Benoa di Bali Trans</a> dan memeriksa detail layanan sebelum memesan.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Contoh rencana kunjungan</h2>\n<p class=\"mb-4\">Untuk hari yang tidak terlalu padat, mulai dengan satu tujuan utama. Anda bisa mengunjungi Water Blow atau menikmati pantai pada pagi hari, lalu makan dan beristirahat sebelum melanjutkan ke aktivitas lain. Jika watersport menjadi prioritas, tanyakan jadwal dan kondisi kegiatan kepada operator terlebih dahulu, kemudian sesuaikan kunjungan lain dengan waktu yang tersisa.</p>\n<p class=\"mb-4\">Tidak semua tempat harus dimasukkan dalam satu hari. Jarak di peta, lalu lintas, jam buka, serta waktu untuk registrasi atau pengarahan aktivitas bisa memengaruhi rencana. Pilih beberapa tempat yang benar-benar ingin Anda kunjungi, lalu sisakan waktu untuk perubahan jadwal.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Bagaimana jika perjalanan melibatkan pelabuhan?</h2>\n<p class=\"mb-4\">Pelabuhan bukan bagian dari satu titik wisata Nusa Dua dan lokasi keberangkatan perlu dipastikan dengan benar. Jika perjalanan Anda terkait kedatangan atau keberangkatan kapal, cek nama pelabuhan, terminal, dan titik jemput pada tiket atau konfirmasi operator. Untuk kebutuhan transportasi dari atau menuju pelabuhan, lihat informasi <a class=\"font-semibold text-teal-700 underline\" href=\"./bali-port-transfer.html\">layanan Bali Port Transfer</a>.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Hal yang sebaiknya diperiksa sebelum berangkat</h2>\n<ul class=\"list-disc pl-5 mb-4 space-y-2\"><li>Pastikan alamat dan titik temu spesifik, terutama jika mengunjungi kawasan yang luas.</li><li>Periksa jam buka, akses, dan ketentuan kunjungan dari pengelola resmi.</li><li>Untuk aktivitas laut, konfirmasi harga, isi paket, persyaratan peserta, perlengkapan keselamatan, serta kebijakan jika cuaca berubah.</li><li>Jangan memaksakan jadwal padat. Beri ruang untuk makan, istirahat, dan waktu perjalanan.</li></ul>\n<p class=\"mb-4\">Nusa Dua akan lebih mudah dinikmati ketika rencana perjalanan disusun berdasarkan minat, bukan sekadar banyaknya tempat yang bisa dicentang. Mulailah dari satu atau dua tujuan utama, lalu tambahkan tempat atau aktivitas terdekat yang benar-benar sesuai dengan waktu Anda.</p>"
            },
            {
                      "id": "water-blow-peninsula",
                      "title": "Water Blow Nusa Dua: Panduan Berkunjung ke Peninsula Island",
                      "category": "Nusa Dua",
                      "readTime": "5 min read",
                      "author": "Bali Trans Editorial Team",
                      "date": "Oct 22, 2026",
                      "dateISO": "2026-10-22",
                      "image": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
                      "imageAlt": "Ombak di pesisir Bali untuk menggambarkan kunjungan ke Water Blow",
                      "snippet": "Kenali daya tarik Water Blow, hal yang perlu diperhatikan saat berkunjung, dan cara memasukkannya ke rencana wisata Nusa Dua.",
                      "sources": [
                                {
                                          "title": "Indonesia Travel — Nusa Dua",
                                          "url": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/nusa-dua"
                                },
                                {
                                          "title": "ITDC — Indonesia Tourism Development Corporation",
                                          "url": "https://www.itdc.co.id/"
                                }
                      ],
                      "related": [
                                "nusa-dua-guide",
                                "itdc-nusa-dua-guide",
                                "tanjung-benoa-guide"
                      ],
                      "content": "<p class=\"mb-4\">Water Blow merupakan salah satu daya tarik pesisir di kawasan Peninsula Island, Nusa Dua. Di tempat ini, gelombang yang menghantam batuan dapat mendorong air ke atas dan menghasilkan semburan yang menarik untuk diamati. Seberapa besar semburan yang terlihat bergantung pada kondisi laut saat Anda datang.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Apa yang bisa dilihat di Water Blow?</h2>\n<p class=\"mb-4\">Daya tarik utamanya adalah interaksi ombak dengan formasi batuan di tepi laut. Sebagian pengunjung datang untuk melihat fenomena alam ini, menikmati pemandangan pesisir, atau mengambil foto dari area yang diizinkan. Namun, jangan menganggap semburan besar akan muncul terus-menerus atau pada jam tertentu tanpa informasi kondisi yang dapat dipercaya.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Utamakan keselamatan</h2>\n<p class=\"mb-4\">Ombak bisa berubah cepat. Tetap di jalur dan area pengamatan yang ditetapkan, jangan melewati pembatas, dan ikuti instruksi petugas. Hindari berdiri terlalu dekat dengan air demi foto, terutama ketika ombak sedang tinggi atau permukaan basah.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Berapa lama waktu yang perlu disiapkan?</h2>\n<p class=\"mb-4\">Lama kunjungan bergantung pada minat Anda, kondisi lokasi, dan apakah Water Blow menjadi satu-satunya tujuan atau bagian dari perjalanan yang lebih luas di Nusa Dua. Sisakan waktu untuk berjalan dari area parkir atau titik akses yang tersedia, serta periksa ketentuan akses terbaru sebelum berangkat.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Gabungkan dengan tempat lain di Nusa Dua</h2>\n<p class=\"mb-4\">Water Blow dapat menjadi salah satu persinggahan dalam perjalanan ke kawasan Nusa Dua. Untuk memahami pilihan tempat lain dan cara menggabungkannya, baca <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=nusa-dua-guide\">panduan tempat wisata di Nusa Dua</a> atau <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=itdc-nusa-dua-guide\">panduan kawasan ITDC Nusa Dua</a>.</p>\n<p class=\"mb-4\">Jika ingin melanjutkan hari dengan aktivitas bahari, Tanjung Benoa merupakan kawasan berbeda yang dikenal dengan pilihan watersport. Baca <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=tanjung-benoa-guide\">panduan Tanjung Benoa</a> sebelum memilih aktivitas.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Sebelum berangkat</h2>\n<p class=\"mb-4\">Periksa informasi akses dari pengelola, gunakan alas kaki yang sesuai, bawa air minum dan pelindung matahari, serta patuhi rambu setempat. Akses dan kondisi laut dapat berubah, jadi jangan menjadikan foto atau pengalaman pengunjung lain sebagai jaminan kondisi pada hari kunjungan Anda.</p>"
            },
            {
                      "id": "itdc-nusa-dua-guide",
                      "title": "ITDC Nusa Dua: Mengenal Kawasan Wisata dan Cara Merencanakan Kunjungan",
                      "category": "Nusa Dua",
                      "readTime": "5 min read",
                      "author": "Bali Trans Editorial Team",
                      "date": "Oct 22, 2026",
                      "dateISO": "2026-10-22",
                      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
                      "imageAlt": "Kawasan resor tropis yang menggambarkan lingkungan wisata Nusa Dua",
                      "snippet": "Panduan mengenal kawasan pariwisata ITDC Nusa Dua, menentukan titik tujuan, dan merencanakan perjalanan ke tempat wisata di sekitarnya.",
                      "sources": [
                                {
                                          "title": "ITDC — Indonesia Tourism Development Corporation",
                                          "url": "https://www.itdc.co.id/"
                                },
                                {
                                          "title": "Indonesia Travel — Nusa Dua",
                                          "url": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/nusa-dua"
                                }
                      ],
                      "related": [
                                "nusa-dua-guide",
                                "water-blow-peninsula",
                                "tanjung-benoa-guide"
                      ],
                      "content": "<p class=\"mb-4\">Nama ITDC Nusa Dua sering muncul saat orang mencari hotel, fasilitas, acara, dan tempat wisata di kawasan Nusa Dua. ITDC adalah singkatan dari Indonesia Tourism Development Corporation, perusahaan yang mengembangkan dan mengelola sejumlah kawasan pariwisata di Indonesia. Untuk kunjungan di Nusa Dua, penting membedakan nama kawasan dengan alamat hotel, tempat acara, atau atraksi yang ingin dituju.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Kenapa titik tujuan yang spesifik itu penting?</h2>\n<p class=\"mb-4\">Nusa Dua bukan satu lokasi tunggal. Hotel, fasilitas pertemuan, akses pantai, dan tempat wisata dapat memiliki pintu masuk serta aturan yang berbeda. Saat memesan kendaraan atau membuat janji, gunakan nama tempat dan alamat yang tepat, lalu konfirmasikan titik turun atau penjemputan.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Apa yang bisa digabungkan dalam kunjungan?</h2>\n<p class=\"mb-4\">Tergantung waktu dan akses, perjalanan di kawasan ini dapat digabungkan dengan kunjungan ke pantai atau Water Blow di Peninsula Island. Baca <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=water-blow-peninsula\">panduan Water Blow</a> untuk mengetahui hal yang perlu diperhatikan di area pesisir, atau kembali ke <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=nusa-dua-guide\">panduan wisata Nusa Dua</a> untuk melihat pilihan destinasi lain.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Rencanakan transportasi dan waktu</h2>\n<p class=\"mb-4\">Jika Anda memiliki reservasi hotel, acara, atau kunjungan ke atraksi, cek waktu masuk, alamat, kebijakan akses, dan kemungkinan lalu lintas sebelum berangkat. Untuk perjalanan dengan beberapa persinggahan, tentukan urutan yang realistis dan sepakati durasi layanan transportasi terlebih dahulu.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Mau melanjutkan ke aktivitas bahari?</h2>\n<p class=\"mb-4\">Tanjung Benoa berada di kawasan terdekat dan dikenal dengan aktivitas wisata bahari. Jika ingin menambahkan kegiatan di laut, baca <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=tanjung-benoa-guide\">panduan Tanjung Benoa</a>, kemudian periksa daftar aktivitas di halaman <a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-tanjung-benoa.html\">watersport Bali Trans</a>.</p>\n<p class=\"mb-4\">Untuk informasi akses, fasilitas, dan ketentuan kawasan yang dapat berubah, utamakan sumber resmi ITDC atau pengelola tempat yang akan Anda kunjungi.</p>"
            },
            {
                      "id": "tanjung-benoa-guide",
                      "title": "Tanjung Benoa Bali: Panduan Kawasan, Watersport, dan Persiapan Kunjungan",
                      "category": "Tanjung Benoa",
                      "readTime": "8 min read",
                      "author": "Bali Trans Editorial Team",
                      "date": "Oct 22, 2026",
                      "dateISO": "2026-10-22",
                      "image": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
                      "imageAlt": "Pemandangan laut untuk panduan aktivitas wisata bahari di Tanjung Benoa",
                      "snippet": "Kenali kawasan Tanjung Benoa, perbedaan aktivitas watersport, hal yang perlu dikonfirmasi, dan cara menyusun kunjungan dari Nusa Dua.",
                      "sources": [
                                {
                                          "title": "Indonesia Travel — Nusa Dua",
                                          "url": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/nusa-dua"
                                },
                                {
                                          "title": "Tanjung Benoa — Informasi watersport",
                                          "url": "https://www.tanjungbenoa.co.id/tentang-kami/"
                                }
                      ],
                      "related": [
                                "nusa-dua-guide",
                                "water-blow-peninsula",
                                "itdc-nusa-dua-guide"
                      ],
                      "content": "<p class=\"mb-4\">Tanjung Benoa berada di bagian selatan Bali, tidak jauh dari Nusa Dua, dan dikenal sebagai salah satu kawasan untuk mencoba aktivitas wisata bahari. Wisatawan datang untuk memilih kegiatan di atas atau di dalam air, mulai dari wahana bermotor sampai pengalaman melihat kehidupan bawah laut. Pilihan yang tersedia tidak selalu sama di setiap operator.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Apa bedanya Tanjung Benoa dengan Nusa Dua?</h2>\n<p class=\"mb-4\">Nusa Dua lebih dikenal sebagai kawasan wisata terpadu dengan resor, pantai, fasilitas rekreasi, dan tempat seperti Water Blow. Tanjung Benoa lebih sering dipilih untuk aktivitas watersport. Keduanya dapat digabungkan dalam satu rencana perjalanan, tetapi tetap merupakan kawasan dan tujuan yang berbeda.</p>\n<p class=\"mb-4\">Jika Anda sedang menyusun agenda Nusa Dua, mulai dari <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=nusa-dua-guide\">panduan tempat wisata Nusa Dua</a> atau baca tentang <a class=\"font-semibold text-teal-700 underline\" href=\"?page=blog-read&amp;item=water-blow-peninsula\">Water Blow dan Peninsula Island</a>.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Aktivitas apa yang bisa dipertimbangkan?</h2>\n<p class=\"mb-4\">Di kawasan Tanjung Benoa, wisatawan dapat menemukan aktivitas seperti jet ski, banana boat, parasailing, wahana tarik, snorkeling, seawalker, atau perjalanan perahu tertentu. Daftar tersebut adalah gambaran umum kawasan, bukan jaminan semua aktivitas tersedia dari satu operator. Pastikan produk yang Anda pilih memang ditawarkan pada tanggal kunjungan.</p>\n<ul class=\"list-disc pl-5 mb-4 space-y-2\"><li><a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-jet-ski.html\">Jet ski</a> untuk pengalaman berkendara di air.</li><li><a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-banana-boat.html\">Banana boat</a> untuk kegiatan bersama.</li><li><a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-parasailing.html\">Parasailing</a> untuk melihat garis pantai dari ketinggian, sesuai kondisi dan ketentuan operator.</li><li><a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-snorkeling-tanjung-benoa.html\">Snorkeling</a> untuk menjelajahi perairan dengan perlengkapan yang sesuai.</li><li><a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-sea-walker-tanjung-benoa.html\">Sea walker</a> untuk pengalaman bawah air menggunakan helm khusus, sesuai persyaratan operator.</li></ul>\n<p class=\"mb-4\">Lihat juga <a class=\"font-semibold text-teal-700 underline\" href=\"./watersport-tanjung-benoa.html\">halaman watersport Tanjung Benoa Bali Trans</a> untuk memeriksa aktivitas yang tercantum, informasi layanan, dan langkah pemesanan.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Apa yang harus diperiksa sebelum memesan?</h2>\n<p class=\"mb-4\">Tanyakan harga total, durasi setiap aktivitas, perlengkapan yang termasuk, batas usia atau persyaratan peserta, titik temu, dan kebijakan jika cuaca tidak mendukung. Pastikan juga apakah dokumentasi, transportasi, loker, atau fasilitas lain termasuk dalam paket atau dikenakan biaya tambahan.</p>\n<p class=\"mb-4\">Untuk aktivitas di laut, patuhi arahan operator dan gunakan perlengkapan keselamatan yang disediakan. Kondisi angin, ombak, arus, dan keputusan keselamatan dapat memengaruhi apakah suatu aktivitas dijalankan. Jangan memaksakan kegiatan jika operator menghentikannya karena kondisi tidak aman.</p>\n<h2 class=\"text-xl font-bold text-slate-900 mb-2\">Menggabungkan Tanjung Benoa dengan Nusa Dua</h2>\n<p class=\"mb-4\">Jika watersport menjadi prioritas, sisihkan waktu lebih dulu untuk registrasi, pengarahan, dan aktivitas yang dipilih. Setelah itu, jika masih ada waktu dan kondisi mendukung, Anda bisa melanjutkan ke tempat lain di Nusa Dua. Jangan menyusun jadwal terlalu rapat karena durasi kegiatan, lalu lintas, dan cuaca dapat berubah.</p>\n<p class=\"mb-4\">Pilih aktivitas berdasarkan minat dan kenyamanan rombongan. Tidak harus mencoba semua wahana dalam satu kunjungan; satu atau dua kegiatan yang cocok sering kali membuat pengalaman lebih santai dan mudah direncanakan.</p>"
            }
        ];
