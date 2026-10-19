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
        let currentCurrency='IDR',currentLanguage='id';
        try{currentLanguage=localStorage.getItem('baliTransLanguage')||'id';}catch(e){}
        if(!LOCALE_SETTINGS[currentLanguage])currentLanguage='id';
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
                author: 'Siti Rahma',
                date: 'Oct 12, 2026',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
                snippet: 'A starting point for choosing where to stay, checking entry requirements, planning local transport and preparing for your first visit.',
                content: `
                    <p class="mb-4">A first trip to Bali is easier to plan when you choose a few areas that fit your interests instead of trying to cross the island every day. Coastlines, inland villages and island trips offer different experiences, and travel between them can take longer than a map suggests.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">1. Entry Requirements & E-Visa</h3>
                    <p class="mb-4">Entry requirements depend on your passport and travel plans. Check the latest visa and passport rules through official Indonesian immigration sources before departure rather than relying on an old checklist.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">2. Choosing Where to Stay</h3>
                    <ul class="list-disc pl-5 mb-4 space-y-1">
                        <li><strong>Canggu & Seminyak:</strong> Beach clubs, trendy cafes, surfing, vibrant nightlife.</li>
                        <li><strong>Ubud:</strong> Rice terraces, yoga retreats, traditional arts, monkey forest.</li>
                        <li><strong>Uluwatu:</strong> Dramatic cliffs, world-class luxury resorts, surf breaks, Kecak fire dance.</li>
                        <li><strong>Sanur:</strong> Family-friendly, calm water beaches, peaceful vibe.</li>
                    </ul>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">3. Getting Around Bali</h3>
                    <p class="mb-4">Transport depends on the route and your comfort level. For a multi-stop day, agree the route, service duration, pickup point and any extra charges with a driver before confirming. Scooters are not suitable for every visitor; check licence and insurance requirements, wear a helmet and never ride beyond your experience.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">4. Keep the Daily Route Realistic</h3>
                    <p class="mb-4">Avoid combining distant areas just because each stop looks close on a map. Pick a main area for the day, leave room for meals and traffic, and confirm the final route with your transport provider.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">5. Check Practical Details Before You Go</h3>
                    <p class="mb-4">Check current entry rules through official sources, confirm opening hours directly with attractions, and carry sun protection and water. For temples, follow local dress guidance and respect ceremonies or areas closed to visitors.</p>
                `
            },
            {
                id: 'blog-2',
                title: 'Nusa Penida Highlights: Kelingking, Diamond Beach & Atuh',
                category: 'Destinations',
                readTime: '4 min read',
                author: 'Alex Rivera',
                date: 'Sep 28, 2026',
                image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kelingking_Beach.jpg?width=1200',
                snippet: 'Compare three dramatic coastal stops and plan island transport around road conditions, sea conditions and your boat schedule.',
                content: `
                    <p class="mb-4">Nusa Penida is known for steep limestone cliffs, beaches and viewpoints. Boat time varies by departure point and sea conditions, so confirm the pier, check-in time and return schedule with your boat operator before planning the day.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Three Stops to Compare</h3>
                    <ol class="list-decimal pl-5 mb-4 space-y-2">
                        <li><strong>Kelingking:</strong> Best known for its dramatic cliff profile and elevated coastal views. The descent is steep and physically demanding; visitors can enjoy the viewpoint without attempting the beach trail.</li>
                        <li><strong>Diamond Beach:</strong> Known for pale sand and limestone formations. Access involves steep stairs, and swimming may be unsafe when surf is strong.</li>
                        <li><strong>Atuh Beach:</strong> A curved bay framed by rock formations. Allow time for the access path and check local conditions before entering the water.</li>
                    </ol>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Plan Transfers and Safety</h3>
                    <p class="mb-4">Roads can be narrow, uneven and slow between stops. Choose fewer places rather than rushing across the island, use safe transport, bring water and footwear with grip, and follow local signs near cliffs and beaches. Never rely on a viewpoint photo to judge whether a path or sea is safe.</p>
                `
            },
            {
                id: 'blog-3',
                title: 'Balinese Dishes to Try on Your Trip',
                category: 'Culinary',
                readTime: '5 min read',
                author: 'Made Budi',
                date: 'Sep 15, 2026',
                image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
                snippet: 'Get to know a few well-known Balinese dishes and coastal seafood options to look out for during your stay.',
                content: `
                    <p class="mb-4">Balinese food often balances aromatic spices, herbs and sambal. Recipes vary by household and region, so the same dish can taste different from one kitchen to another.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Dishes Worth Looking For</h3>
                    <ul class="list-disc pl-5 mb-4 space-y-2">
                        <li><strong>Babi guling:</strong> Roast pork commonly served with rice and a selection of sides.</li>
                        <li><strong>Bebek betutu:</strong> Duck prepared with a spiced seasoning; cooking methods and serving styles vary.</li>
                        <li><strong>Ayam betutu:</strong> A chicken version seasoned with a rich spice mixture.</li>
                        <li><strong>Nasi campur Bali:</strong> Rice served with several small portions of vegetables, meat or other accompaniments.</li>
                        <li><strong>Lawar:</strong> A mixed dish made with vegetables, herbs and other ingredients; recipes can include meat or animal blood, so ask about ingredients if needed.</li>
                        <li><strong>Seafood in Jimbaran:</strong> Coastal restaurants serve fish and other seafood. Check the price, portion size and cooking method before ordering.</li>
                    </ul>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Eat Well and Ask Questions</h3>
                    <p class="mb-4">Tell the restaurant about allergies and dietary needs before ordering, and ask whether a dish contains meat, seafood, peanuts or other ingredients you avoid. Choose food that is freshly prepared and stored appropriately, especially in hot weather.</p>
                `
            }
        ];
