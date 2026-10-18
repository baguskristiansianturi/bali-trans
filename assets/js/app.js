/* Bali Trans application entry point. Existing app logic extracted from index.html without intentional behavior changes. */

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
                heroImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85',
                gallery: [
                    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85',
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85'
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
                title: 'The Ultimate First-Timer’s Bali Travel Guide (2026 Edition)',
                category: 'Guide',
                readTime: '6 min read',
                author: 'Siti Rahma',
                date: 'Oct 12, 2026',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
                snippet: 'Everything you need to know about Visa on Arrival, best neighborhoods to stay, currency tips, and avoiding tourist traps in Bali.',
                content: `
                    <p class="mb-4">Planning your dream vacation to Bali in 2026? Known as the Island of the Gods, Bali continues to top global travel wishlists. Whether you seek spiritual retreats in Ubud, party beaches in Canggu, or pristine underwater coral reefs in Nusa Penida, this guide has you covered.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">1. Entry Requirements & E-Visa</h3>
                    <p class="mb-4">Travelers from over 90 countries can obtain a 30-day Visa on Arrival (VoA) either at Ngurah Rai International Airport or online prior to arrival. Ensure your passport is valid for at least 6 months.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">2. Choosing Where to Stay</h3>
                    <ul class="list-disc pl-5 mb-4 space-y-1">
                        <li><strong>Canggu & Seminyak:</strong> Beach clubs, trendy cafes, surfing, vibrant nightlife.</li>
                        <li><strong>Ubud:</strong> Rice terraces, yoga retreats, traditional arts, monkey forest.</li>
                        <li><strong>Uluwatu:</strong> Dramatic cliffs, world-class luxury resorts, surf breaks, Kecak fire dance.</li>
                        <li><strong>Sanur:</strong> Family-friendly, calm water beaches, peaceful vibe.</li>
                    </ul>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">3. Getting Around Bali</h3>
                    <p class="mb-4">Public transit is limited. The most convenient way to explore is hiring a private driver for 10-hour day trips or renting a scooter if you are an experienced rider with an international driving permit.</p>
                `
            },
            {
                id: 'blog-2',
                title: 'Top 7 Instagrammable Spots in Nusa Penida & How to Visit Them',
                category: 'Destinations',
                readTime: '4 min read',
                author: 'Alex Rivera',
                date: 'Sep 28, 2026',
                image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
                snippet: 'Discover Kelingking Beach, Diamond Beach, Atuh, and the famous treehouse with step-by-step fast boat schedules.',
                content: `
                    <p class="mb-4">Nusa Penida is a rugged island just 45 minutes off the coast of Bali. It boasts some of the most spectacular coastal cliffs in Southeast Asia.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Must-Visit Spots:</h3>
                    <ol class="list-decimal pl-5 mb-4 space-y-2">
                        <li><strong>Kelingking T-Rex Beach:</strong> The famous cliff shaped like a Tyrannosaurus Rex.</li>
                        <li><strong>Diamond Beach:</strong> Pristine white sand with diamond-shaped karst rocks.</li>
                        <li><strong>Molenteng Tree House:</strong> Iconic wooden house perched on the edge overlooking Thousand Island viewpoint.</li>
                    </ol>
                `
            },
            {
                id: 'blog-3',
                title: 'Bali Foodie Guide: 10 Must-Try Balinese Dishes You Can’t Miss',
                category: 'Culinary',
                readTime: '5 min read',
                author: 'Made Budi',
                date: 'Sep 15, 2026',
                image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
                snippet: 'From Babi Guling to Duck Bebek Betutu and fresh Jimbaran seafood, indulge your tastebuds in Bali authentic cuisine.',
                content: `
                    <p class="mb-4">Balinese cuisine is rich with aromatic spices like turmeric, lemongrass, galangal, and chili paste (Sambal Matah).</p>
                    <p class="mb-4">Do not leave Bali without tasting <strong>Babi Guling</strong> (suckling roast pig), <strong>Bebek Betutu</strong> (slow-roasted spiced duck), and grilling fresh snapper at Jimbaran Bay right on the beach!</p>
                `
            },
            {
                id: 'lovina-beach-guide',
                slug: 'pantai-lovina-bali',
                title: 'Pantai Lovina Bali: Panduan Santai untuk Melihat Lumba-Lumba dan Menjelajah Bali Utara',
                category: 'Destinations',
                readTime: '8 min read',
                author: 'Bali Trans Editorial Team',
                date: 'Oct 18, 2026',
                image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85',
                snippet: 'Mengenal Pantai Lovina di Bali Utara, waktu terbaik datang, pengalaman dolphin watching, cara menuju lokasi, pilihan aktivitas, dan tips supaya perjalanan lebih nyaman.',
                content: `
                    <p class="mb-5">Kalau selama ini bayangan tentang pantai di Bali selalu identik dengan pasir putih, beach club, dan suasana ramai, Lovina menawarkan pengalaman yang sedikit berbeda. Pantai di Bali Utara ini dikenal dengan pasir berwarna gelap, suasana pesisir yang lebih tenang, dan perjalanan perahu pagi hari untuk mencari lumba-lumba di laut lepas.</p>
                    <p class="mb-5">Lovina bukan tempat yang perlu dikejar dengan jadwal terlalu padat. Daya tariknya justru ada pada ritme yang lebih pelan: berangkat sebelum matahari terbit, menikmati laut dari atas perahu, lalu melanjutkan hari dengan sarapan atau menjelajahi beberapa tempat di sekitar Buleleng. Supaya bisa menentukan apakah Lovina cocok dengan rencana liburanmu, ini hal-hal yang sebaiknya diketahui sebelum berangkat.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Di mana Pantai Lovina dan apa yang membuatnya berbeda?</h2>
                    <p class="mb-5">Lovina berada di pesisir utara Kabupaten Buleleng, Bali. Nama Lovina biasanya merujuk pada kawasan pantai yang membentang melalui beberapa desa pesisir, bukan hanya satu titik pantai kecil. Kalibukbuk sering dijadikan patokan karena menjadi salah satu pusat aktivitas wisata dan lokasi yang mudah dikenali oleh pengunjung.</p>
                    <p class="mb-5">Pasirnya berwarna abu-abu hingga hitam karena berasal dari material vulkanik. Suasana di sini juga berbeda dari banyak pantai di Bali Selatan. Kamu tidak datang untuk mencari deretan beach club atau ombak besar untuk berselancar, melainkan untuk menikmati pesisir yang lebih tenang dan menjadikan Lovina sebagai titik awal menjelajah Bali Utara.</p>
                    <p class="mb-5">Daya tarik yang paling dikenal tentu saja dolphin watching saat pagi. Perahu-perahu tradisional berangkat ke laut ketika langit masih gelap atau mulai terang, lalu kapten mencari lumba-lumba yang sedang beraktivitas di perairan sekitar Lovina. Namun, Lovina bukan hanya soal lumba-lumba; perjalanan ke kawasan ini juga bisa dipadukan dengan tempat alam dan budaya di sekitarnya.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Dolphin watching di Lovina: seperti apa pengalamannya?</h2>
                    <p class="mb-5">Biasanya, pengunjung berkumpul di pantai sebelum matahari terbit lalu naik perahu tradisional yang dikenal sebagai jukung. Waktu keberangkatan dapat berbeda tergantung pengaturan operator dan kondisi laut, tetapi aktivitas ini umumnya dimulai sekitar pukul 05.30–06.00. Karena itu, persiapan dimulai sejak malam sebelumnya: pastikan titik kumpul dan jam berangkat sudah jelas, siapkan pakaian yang nyaman, dan jangan tidur terlalu larut.</p>
                    <p class="mb-5">Saat perahu bergerak menjauh dari pantai, kamu bisa menikmati perubahan warna langit dan suasana laut yang masih relatif sunyi. Jika lumba-lumba terlihat, biasanya kamu akan menyaksikannya dari atas perahu. Kadang mereka muncul cukup dekat, kadang terlihat sebentar dari kejauhan, dan kadang kondisi alam membuat pencarian lebih lama.</p>
                    <p class="mb-5">Bagian terakhir itu penting untuk dipahami. Lumba-lumba adalah satwa liar, bukan pertunjukan dengan jadwal yang bisa dijamin. Jumlah, jarak, dan lama kemunculannya tidak selalu sama setiap hari. Sebaiknya pilih operator yang memberi ruang bagi satwa untuk bergerak, tidak sengaja mengepung kelompok lumba-lumba, dan mengikuti arahan keselamatan di atas perahu. Pengalaman yang baik bukan hanya soal mendapatkan foto dari jarak dekat, tetapi juga soal mengamati satwa tanpa mengganggu perilaku alaminya.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Kapan waktu yang tepat untuk datang?</h2>
                    <p class="mb-5">Untuk dolphin watching, waktu aktivitasnya lebih penting daripada mengejar satu bulan tertentu: kamu perlu berada di pantai sebelum matahari terbit. Cuaca dan kondisi laut tetap berpengaruh, jadi tidak ada tanggal yang bisa menjamin lumba-lumba pasti terlihat atau laut selalu tenang. Periksa prakiraan cuaca menjelang keberangkatan dan ikuti keputusan kapten jika kondisi tidak mendukung.</p>
                    <p class="mb-5">Kalau ingin menikmati Lovina di luar aktivitas perahu, pagi dan sore biasanya lebih nyaman untuk berjalan di tepi pantai dibandingkan tengah hari yang terik. Musim kemarau sering dipilih wisatawan karena peluang hujan cenderung lebih rendah, tetapi kondisi harian tetap perlu diperhatikan. Jangan menjadikan musim sebagai satu-satunya patokan.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Berapa lama perjalanan ke Lovina dari Bali Selatan?</h2>
                    <p class="mb-5">Ini salah satu hal yang paling perlu dipikirkan sebelum memasukkan Lovina ke itinerary. Dari kawasan seperti Kuta, Seminyak, Canggu, Sanur, atau Ubud, perjalanan menuju Bali Utara memerlukan waktu beberapa jam. Lama perjalanan sangat bergantung pada titik penjemputan, lalu lintas, cuaca, dan rute yang dipilih. Jalur melalui Bedugul melewati kawasan pegunungan dan danau, jadi perjalanan tidak sama dengan berkendara di jalan datar wilayah selatan.</p>
                    <p class="mb-5">Karena dolphin watching dimulai pagi sekali, berangkat dari Bali Selatan pada dini hari bisa berarti waktu jemput yang sangat awal dan waktu istirahat yang pendek. Jika kamu memang ingin menikmati Bali Utara dengan santai, menginap semalam di sekitar Lovina bisa menjadi pilihan yang lebih nyaman. Kalau waktu liburan terbatas dan ingin pulang pada hari yang sama, rencanakan perjalanan sebagai full-day trip dan sepakati sejak awal berapa lama perjalanan serta persinggahan yang realistis.</p>
                    <p class="mb-5">Untuk yang ingin mengatur semuanya dalam satu perjalanan, kamu bisa melihat detail <a href="?view=detail&id=lovina-dolphin-tour" class="font-bold text-teal-800 underline decoration-teal-300 underline-offset-4 hover:text-teal-950">paket Lovina Dolphin Tour Bali Trans</a>. Halaman paket membantu melihat gambaran aktivitas dan pengaturan perjalanan, sehingga kamu bisa menilai apakah opsi privat ini sesuai dengan lokasi menginap dan waktu yang tersedia. Detail penjemputan serta susunan perjalanan tetap perlu dikonfirmasi berdasarkan kebutuhanmu.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Apa lagi yang bisa dilakukan di sekitar Lovina?</h2>
                    <p class="mb-5">Kalau setelah dolphin watching kamu masih punya waktu dan tenaga, ada beberapa cara untuk menikmati Bali Utara tanpa harus buru-buru berpindah dari satu tempat ke tempat lain.</p>
                    <h3 class="text-xl font-bold text-slate-900 mt-6 mb-2">1. Menikmati pantai dan suasana Kalibukbuk</h3>
                    <p class="mb-5">Sisihkan waktu untuk kembali ke tepi pantai setelah perjalanan perahu. Kamu bisa berjalan santai, mencari sarapan, atau sekadar menikmati suasana desa pesisir. Tidak semua waktu liburan harus diisi dengan aktivitas berbayar; jeda seperti ini sering justru membuat perjalanan terasa lebih menyenangkan.</p>
                    <h3 class="text-xl font-bold text-slate-900 mt-6 mb-2">2. Mengunjungi air panas Banjar</h3>
                    <p class="mb-5">Pemandian air panas Banjar merupakan salah satu pilihan yang bisa dipertimbangkan dalam perjalanan di kawasan ini. Sebelum berangkat, cek jam operasional, aturan masuk, dan kondisi tempatnya melalui sumber terbaru. Perhitungkan waktu perjalanan supaya kunjungan ini tidak membuat jadwal pulang terlalu padat.</p>
                    <h3 class="text-xl font-bold text-slate-900 mt-6 mb-2">3. Berkunjung ke Brahmavihara-Arama</h3>
                    <p class="mb-5">Kompleks Buddha Brahmavihara-Arama menawarkan suasana yang berbeda dari pantai. Jika berkunjung, gunakan pakaian yang sopan, jaga ketenangan, dan hormati area ibadah. Tempat ini cocok untuk wisatawan yang ingin menambahkan pengalaman budaya dan suasana yang lebih hening ke dalam perjalanan.</p>
                    <h3 class="text-xl font-bold text-slate-900 mt-6 mb-2">4. Menyusun rute air terjun atau dataran tinggi</h3>
                    <p class="mb-5">Bali Utara juga dikenal dengan air terjun dan kawasan dataran tingginya. Namun, jangan menganggap semua tempat bisa disinggahi sekaligus dalam satu hari. Jarak di peta belum tentu menggambarkan waktu tempuh sebenarnya, terutama di jalan pegunungan. Pilih satu atau dua persinggahan yang paling sesuai dengan minatmu, lalu pastikan rute dan kondisi akses sebelum berangkat.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Apakah snorkeling termasuk dalam dolphin tour?</h2>
                    <p class="mb-5">Tidak selalu. Dolphin watching merupakan aktivitas utama yang umum diasosiasikan dengan Lovina, sedangkan snorkeling, berenang, atau persinggahan ke destinasi lain bergantung pada operator dan paket yang dipilih. Jangan berasumsi semua aktivitas sudah termasuk hanya karena disebut sebagai tur Lovina. Tanyakan apa yang termasuk, berapa lama setiap aktivitas, apakah peralatan disediakan, dan apakah ada biaya tambahan.</p>
                    <p class="mb-5">Untuk berenang atau snorkeling, ikuti arahan pemandu dan perhatikan kondisi laut. Jangan merasa harus masuk ke air demi mendapatkan pengalaman yang lengkap. Jika kondisi kurang sesuai atau kamu tidak nyaman berenang di laut, menikmati sunrise dan mengamati lumba-lumba dari perahu saja tetap merupakan pilihan yang wajar.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Apa yang sebaiknya dibawa?</h2>
                    <ul class="list-disc pl-5 mb-5 space-y-2">
                        <li>Jaket tipis atau pakaian luar karena udara sebelum matahari terbit bisa terasa dingin saat berada di perahu.</li>
                        <li>Pakaian yang nyaman dan alas kaki yang mudah dilepas jika diperlukan saat naik perahu.</li>
                        <li>Pelindung air untuk ponsel atau kamera, tetapi tetap utamakan keselamatan daripada mengambil foto.</li>
                        <li>Tabir surya, topi, air minum, dan obat pribadi jika dibutuhkan.</li>
                        <li>Uang tunai secukupnya untuk kebutuhan kecil, setelah memastikan metode pembayaran yang diterima.</li>
                        <li>Konfirmasi tertulis tentang titik kumpul, jam berangkat, perlengkapan keselamatan, durasi, dan biaya yang sudah termasuk.</li>
                    </ul>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Tips memilih pengalaman dolphin watching yang bertanggung jawab</h2>
                    <p class="mb-5">Sebelum memesan, tanyakan bagaimana kapten mendekati lumba-lumba dan apa yang dilakukan ketika beberapa perahu berkumpul di satu area. Pilih operator yang bersedia menjaga jarak, mengurangi kecepatan saat diperlukan, tidak mengepung satwa, serta mengikuti instruksi keselamatan. Hindari menganggap berenang bersama lumba-lumba sebagai bagian otomatis dari pengalaman; aktivitas tersebut dapat mengganggu satwa dan tidak selalu sesuai untuk kondisi laut.</p>
                    <p class="mb-5">Di atas perahu, duduklah sesuai arahan kapten, gunakan jaket keselamatan jika diwajibkan atau disediakan, dan jangan berdiri untuk mengejar sudut foto. Kalau laut berubah atau kapten meminta kembali, ikuti arahan tersebut. Pengalaman alam memang tidak sepenuhnya bisa dikendalikan—justru itulah alasan kita perlu memberi ruang bagi alam untuk berjalan sebagaimana mestinya.</p>

                    <h2 class="text-2xl font-extrabold text-slate-900 mt-9 mb-3">Jadi, apakah Pantai Lovina layak dikunjungi?</h2>
                    <p class="mb-5">Lovina cocok untuk kamu yang ingin melihat sisi Bali yang lebih tenang, tertarik pada pengalaman laut saat matahari terbit, atau ingin menjelajahi kawasan utara yang berbeda dari pusat wisata di selatan. Tempat ini mungkin bukan pilihan terbaik jika kamu hanya punya sedikit waktu dan tidak ingin melakukan perjalanan panjang, terutama jika ingin mengikuti dolphin watching pada pagi hari.</p>
                    <p class="mb-5">Kuncinya ada pada perencanaan yang realistis: pertimbangkan jarak, waktu tidur, kondisi laut, dan jumlah persinggahan. Tidak perlu memasukkan semua atraksi ke dalam satu itinerary. Pilih pengalaman utama yang paling kamu inginkan, lalu beri ruang untuk perjalanan yang lebih santai.</p>
                    <p class="mb-5">Untuk informasi dasar mengenai lokasi dan karakter kawasan, kamu juga bisa membaca panduan destinasi Lovina dari <a href="https://www.indonesia.travel/id/en/destination/bali-nusa-tenggara/bali/bali---lovina-beach" target="_blank" rel="noopener noreferrer" class="font-bold text-teal-800 underline decoration-teal-300 underline-offset-4 hover:text-teal-950">Indonesia Travel</a>. Setelah itu, sesuaikan pilihan transportasi dan aktivitas dengan tempat menginapmu, bukan hanya dengan daftar tempat yang ingin dikunjungi.</p>
                `
            }
        ];

        /* APP STATE */
        let cartState = [];
        let wishlistState = [];
        let selectedCategoryFilter = 'all';
        let currentDetailPackage = BALI_PACKAGES[0];
        let currentCheckoutStep = 1;
        let currentViewName = null;

        /* ==========================================================================
           2. NAVIGATION & ROUTING ENGINE
           ========================================================================== */
        function navigateTo(viewName, params = null, options = {}) {
            const container = document.getElementById('appContainer');
            const url = new URL(window.location.href);
            const siteBase = url.pathname.startsWith('/bali-trans/') ? '/bali-trans/' : '/';
            const query = url.searchParams;
            query.set('view', viewName);
            query.delete('tour');
            if (params !== null && params !== undefined && params !== '') query.set('id', String(params));
            else query.delete('id');
            if (viewName !== 'blog') query.delete('category');
            const article = viewName === 'blog-read' ? BALI_BLOGS.find(item => item.id === String(params)) : null;
            const nextUrl = article && (article.slug || article.id)
                ? siteBase + 'blog/' + (article.slug || article.id) + '/'
                : siteBase + '?' + query.toString();
            if (options.history !== false) {
                if (options.replace) window.history.replaceState({ viewName, params }, '', nextUrl);
                else if (window.location.pathname + window.location.search !== nextUrl) window.history.pushState({ viewName, params }, '', nextUrl);
            }
            document.body.classList.toggle('checkout-mode', viewName === 'checkout');
            syncLocaleSelector();

            switch (viewName) {
                case 'home':
                    container.innerHTML = renderHomeView();
                    initHomeInteractivity();
                    break;
                case 'about':
                    container.innerHTML = renderAboutView();
                    break;
                case 'contact':
                    container.innerHTML = renderContactView();
                    break;
                case 'packages':
                    container.innerHTML = renderPackagesCatalogView();
                    break;
                case 'discovery':
                    container.innerHTML = renderDiscoveryView(params || 'region:south');
                    break;
                case 'detail':
                    if (params) {
                        const pkg = BALI_PACKAGES.find(p => p.id === params);
                        if (pkg) { currentDetailPackage = pkg; trackRecentlyViewed(pkg); }
                    }
                    currentDetailQty = 1;
                    container.innerHTML = renderDetailView(currentDetailPackage);
                    setTimeout(() => { updatePackageOptionDetails(); selectLovinaGallery(0); initDetailSectionTracking(); }, 0);
                    break;
                case 'blog':
                    container.innerHTML = renderBlogListView();
                    break;
                case 'blog-read': {
                    const blog = BALI_BLOGS.find(b => b.id === params);
                    if (blog) container.innerHTML = renderBlogDetailView(blog);
                    else {
                        container.innerHTML = renderBlogListView();
                        viewName = 'blog';
                        const fallbackUrl = new URL(window.location.href);
                        fallbackUrl.searchParams.set('view', 'blog');
                        fallbackUrl.searchParams.delete('id');
                        if (options.history !== false) window.history.replaceState({ viewName: 'blog' }, '', fallbackUrl.pathname + '?' + fallbackUrl.searchParams.toString());
                    }
                    break;
                }
                case 'cart':
                    container.innerHTML = renderCartView();
                    break;
                case 'checkout':
                    currentCheckoutStep = 1;
                    container.innerHTML = renderCheckoutView();
                    break;
                default:
                    viewName = 'home';
                    container.innerHTML = renderHomeView();
                    initHomeInteractivity();
            }
            currentViewName = viewName;
            if (viewName === 'blog') {
                const requestedCategory = new URLSearchParams(window.location.search).get('category') || 'All';
                const validCategories = ['All', ...new Set(BALI_BLOGS.map(blog => blog.category))];
                setBlogCategory(validCategories.includes(requestedCategory) ? requestedCategory : 'All');
            }
            if (options.scroll !== false) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            container.classList.remove('page-view-enter');
            void container.offsetWidth;
            container.classList.add('page-view-enter');
            updateBadges();
            applyLanguageCopy(document);
        }

        function renderLocationFromUrl(options = {}) {
            const query = new URLSearchParams(window.location.search);
            const legacyTour = query.get('tour');
            const pathMatch = window.location.pathname.match(/\\/blog\\/([^/]+)\\/?$/);
            const pathArticle = pathMatch ? BALI_BLOGS.find(item => (item.slug || item.id) === decodeURIComponent(pathMatch[1])) : null;
            const viewName = pathArticle ? 'blog-read' : (query.get('view') || (legacyTour ? 'detail' : 'home'));
            const params = pathArticle ? pathArticle.id : (query.get('id') || (viewName === 'detail' ? legacyTour : null));
            navigateTo(viewName, params, { history: false, scroll: options.scroll !== false, replace: !query.has('view') && !pathArticle });
        }
        window.addEventListener('popstate', () => renderLocationFromUrl({ scroll: true }));

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
            const contactNumber = window.BALI_TRANS_WHATSAPP_NUMBER || '';
            if (!contactNumber) {
                showToast('The official WhatsApp number must be configured before enquiries can be sent.');
                return;
            }
            window.open('https://wa.me/' + contactNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
        }

        /* VIEW 1: HOME PAGE */
        function renderDiscoveryView(key) {
            const pages = {
                'duration:full-day': { title: 'Full Day Tours in Bali', intro: 'Plan a day of sightseeing and activities within the usual local service window. Route and traffic affect the final duration.', items: ['Ubud and central Bali', 'Uluwatu, Jimbaran and Nusa Dua', 'Custom private day trip'], note: 'The itinerary and service hours will be confirmed on each tour page.' },
                'duration:long-trip': { title: 'Long Trips Around Bali', intro: 'Long trips go beyond the usual local service zone or require substantially more travel time. Lovina in North Bali is the first route being prepared in this category.', items: ['Lovina Dolphin Tour', 'Wanagiri viewpoints', 'Waterfalls and North Bali stops'], note: 'Long-trip routes may start early and exceed the standard local service hours.' },
                'service:private-driver': { title: 'Private Driver in Bali', intro: 'Arrange private transport for your own itinerary around Denpasar, Ubud, Nusa Dua, Uluwatu, Jimbaran, Canggu and nearby areas. Lovina is handled as a long trip.', items: ['Flexible pickup and drop-off', 'Choose your own stops', 'Confirm route and duration before booking'], note: 'Route, vehicle and service duration should be confirmed before the trip.' },
                'region:south': { title: 'Explore South Bali', intro: 'South Bali is known for coastal areas, beaches, sunset viewpoints and temple visits.', items: ['Uluwatu Temple and nearby beaches', 'Jimbaran coast', 'Nusa Dua beaches and water activities', 'Denpasar city sights'], note: 'Destination ideas will grow into detailed guides and bookable services over time.' },
                'region:central': { title: 'Explore Central Bali', intro: 'Central Bali combines Ubud, cultural stops, green landscapes and outdoor activities.', items: ['Ubud and surrounding villages', 'River rafting experiences', 'Rice terraces and nature stops'], note: 'Individual destination guides and bookable activities will be added as they are prepared.' },
                'region:north': { title: 'Explore North Bali', intro: 'North Bali is suited to longer journeys, with Lovina, mountain viewpoints and waterfalls spread across a wider area.', items: ['Lovina Dolphin Tour', 'Wanagiri viewpoints', 'Waterfalls around North Bali', 'Bedugul and mountain scenery'], note: 'Lovina is classified as a long trip because of its distance, early departure and time beyond the usual local service zone.' },
                'region:east': { title: 'Explore East Bali', intro: 'Discover coastal scenery, temples and landscapes in the eastern part of the island.', items: ['Temple and cultural visits', 'Coastal destinations', 'Scenic countryside routes'], note: 'Specific routes, guides and products will be published as they are prepared.' },
                'region:west': { title: 'Explore West Bali', intro: 'West Bali offers quieter coastal routes and nature-focused journeys that may need additional travel time.', items: ['Coastal stops', 'Nature and countryside', 'Longer private journeys'], note: 'Specific routes, guides and products will be published as they are prepared.' }
            };
            const keyValue = String(key || 'region:south');
            const page = pages[keyValue] || pages['region:south'];
            const showLovina = keyValue === 'duration:long-trip' || keyValue === 'region:north';
            const cards = page.items.map(function(item, index) {
                const isLovina = showLovina && item === 'Lovina Dolphin Tour';
                return '<article class="rounded-2xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold text-slate-400">' + String(index + 1).padStart(2, '0') + '</span><h2 class="font-extrabold text-slate-900 mt-2">' + item + '</h2>' + (isLovina ? '<p class="text-sm text-slate-600 mt-2">Private long-trip package with dolphin watching and optional stops.</p><button onclick="navigateTo(\'detail\',\'lovina-dolphin-tour\')" class="mt-4 rounded-xl bg-klook-orange px-4 py-2.5 text-sm font-bold text-white">View Lovina Tour</button>' : '') + '</article>';
            }).join('');
            return '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><button onclick="navigateTo(\'home\')" class="text-sm font-bold text-orange-600 mb-4">← Back to home</button><p class="text-xs font-extrabold uppercase tracking-widest text-orange-600">Bali Trans travel guide</p><h1 class="text-3xl sm:text-4xl font-black text-slate-950 mt-2">' + page.title + '</h1><p class="text-sm sm:text-base text-slate-600 leading-7 max-w-3xl mt-3">' + page.intro + '</p><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">' + cards + '</div><p class="mt-6 text-xs leading-6 text-slate-500">' + page.note + '</p><button onclick="navigateTo(\'packages\')" class="mt-5 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">Browse available tours</button></div>';
        }
        function renderHomeView() {
            return `
                <!-- HERO SECTION WITH KLOOK SEARCH WIDGET -->
                <div class="relative bg-slate-900 min-h-[480px] md:min-h-[540px] flex items-center justify-center overflow-hidden">
                    <!-- Hero Background Image with Overlay -->
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=80" class="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

                    <div class="relative max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 text-center z-10">
                        <span class="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 backdrop-blur-md border border-orange-500/30 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                            <i class="fas fa-bolt text-klook-orange"></i> Find a trip that fits your plans
                        </span>
                        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
                            Explore Bali Your Way <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-200">With Bali Trans</span>
                        </h1>
                        <p class="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
                            Explore tour experiences and private transport around Bali. Compare trip details, then contact us to confirm your plans and availability.
                        </p>

                        <!-- KLOOK TABS & SEARCH CONTAINER -->
                        <div class="bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-2xl max-w-4xl mx-auto text-left border border-white/20">
                            <!-- Filter Pill Quick Tabs -->
                            <div class="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 border-b border-slate-100 hide-scrollbar text-xs font-bold">
                                <button onclick="quickFilterSearch('all')" class="px-4 py-2 bg-klook-orange text-white rounded-full whitespace-nowrap shadow-sm">All Experiences</button>
                                <button onclick="quickFilterSearch('driver')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🚗 Private Driver</button>
                                <button onclick="quickFilterSearch('temple')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">⛩️ Ubud & Temples</button>
                                <button onclick="quickFilterSearch('nusa')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🏝️ Nusa Penida</button>
                                <button onclick="quickFilterSearch('water')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🌊 Water Sports</button>
                                <button onclick="quickFilterSearch('atv')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap">🏍️ ATV & Rafting</button>
                            </div>

                            <!-- Search Input Inputs -->
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                                <div class="md:col-span-5 relative">
                                    <label class="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block px-3">Destination / Activity</label>
                                    <div class="flex items-center px-3 py-1">
                                        <i class="fas fa-location-dot text-klook-orange mr-2"></i>
                                        <input type="text" id="heroSearchInput" placeholder="Where in Bali? (e.g., Ubud, Uluwatu)" class="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder-slate-400">
                                    </div>
                                </div>
                                <div class="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-3">
                                    <label class="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block px-3">Travel Date</label>
                                    <div class="flex items-center px-3 py-1">
                                        <i class="far fa-calendar-alt text-klook-orange mr-2"></i>
                                        <input type="date" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none">
                                    </div>
                                </div>
                                <div class="md:col-span-3">
                                    <button onclick="executeHeroSearch()" class="w-full bg-klook-orange hover:bg-klook-hover text-white font-extrabold py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
                                        <i class="fas fa-search"></i> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interactive trip discovery -->
                <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Explore tours by duration and Bali region">
                    <div class="mb-5"><span class="text-xs font-extrabold uppercase tracking-widest text-orange-600">Plan your Bali trip</span><h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Find a trip by duration or destination</h2><p class="text-sm text-slate-600 mt-2 max-w-2xl">Browse full-day tours, longer journeys and places to explore around Bali.</p></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="rounded-3xl bg-sky-50 border border-sky-100 p-5"><h3 class="font-extrabold text-slate-900 mb-3">By trip duration</h3><div class="flex flex-wrap gap-2">
                            <button onclick="navigateTo('discovery','duration:full-day')" class="rounded-full bg-white border border-sky-200 px-3 py-2 text-xs font-bold text-sky-900">Full Day Tour</button>
                            <button onclick="navigateTo('discovery','duration:long-trip')" class="rounded-full bg-white border border-sky-200 px-3 py-2 text-xs font-bold text-sky-900">Long Trip</button>
                            <button onclick="navigateTo('discovery','service:private-driver')" class="rounded-full bg-white border border-sky-200 px-3 py-2 text-xs font-bold text-sky-900">Private Driver</button>
                        </div></div>
                        <div class="rounded-3xl bg-orange-50 border border-orange-100 p-5"><h3 class="font-extrabold text-slate-900 mb-3">Explore Bali by region</h3><div class="flex flex-wrap gap-2">
                            <button onclick="navigateTo('discovery','region:south')" class="rounded-full bg-white border border-orange-200 px-3 py-2 text-xs font-bold text-orange-900">South Bali</button>
                            <button onclick="navigateTo('discovery','region:central')" class="rounded-full bg-white border border-orange-200 px-3 py-2 text-xs font-bold text-orange-900">Central Bali</button>
                            <button onclick="navigateTo('discovery','region:north')" class="rounded-full bg-white border border-orange-200 px-3 py-2 text-xs font-bold text-orange-900">North Bali</button>
                            <button onclick="navigateTo('discovery','region:east')" class="rounded-full bg-white border border-orange-200 px-3 py-2 text-xs font-bold text-orange-900">East Bali</button>
                            <button onclick="navigateTo('discovery','region:west')" class="rounded-full bg-white border border-orange-200 px-3 py-2 text-xs font-bold text-orange-900">West Bali</button>
                        </div></div>
                    </div>
                </section>
                <!-- HOMEPAGE DISCOVERY SECTIONS: preserve existing visual system -->
                <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
                  <div class="flex items-end justify-between gap-4 mb-6"><div><p class="text-xs font-extrabold uppercase tracking-wider text-klook-orange mb-2">Discover Bali</p><h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Destinasi populer</h2><p class="text-sm text-slate-500 mt-2">Temukan tempat yang ingin kamu kunjungi sebelum memilih perjalanan.</p></div><button onclick="navigateTo('discovery','region:south')" class="shrink-0 text-xs sm:text-sm font-bold text-klook-orange">Lihat semua <i class="fas fa-arrow-right ml-1"></i></button></div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onclick="navigateTo('discovery','region:south')" class="group text-left bg-white rounded-2xl overflow-hidden border border-slate-200 klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" alt="Tanah Lot" class="w-full h-32 sm:h-44 object-cover"><div class="p-3 sm:p-4"><h3 class="font-extrabold text-sm sm:text-base text-slate-900">Tanah Lot</h3><p class="text-xs text-slate-500 mt-1">Pura ikonik di tepi laut</p></div></button>
                    <button onclick="navigateTo('discovery','region:south')" class="group text-left bg-white rounded-2xl overflow-hidden border border-slate-200 klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=700&q=80" alt="Uluwatu" class="w-full h-32 sm:h-44 object-cover"><div class="p-3 sm:p-4"><h3 class="font-extrabold text-sm sm:text-base text-slate-900">Uluwatu</h3><p class="text-xs text-slate-500 mt-1">Tebing, pantai dan budaya</p></div></button>
                    <button onclick="navigateTo('discovery','region:central')" class="group text-left bg-white rounded-2xl overflow-hidden border border-slate-200 klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" alt="Tegallalang" class="w-full h-32 sm:h-44 object-cover"><div class="p-3 sm:p-4"><h3 class="font-extrabold text-sm sm:text-base text-slate-900">Tegallalang</h3><p class="text-xs text-slate-500 mt-1">Terasering dan alam Ubud</p></div></button>
                    <button onclick="navigateTo('discovery','region:north')" class="group text-left bg-white rounded-2xl overflow-hidden border border-slate-200 klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80" alt="Lovina" class="w-full h-32 sm:h-44 object-cover"><div class="p-3 sm:p-4"><h3 class="font-extrabold text-sm sm:text-base text-slate-900">Lovina</h3><p class="text-xs text-slate-500 mt-1">Pantai dan pengalaman laut</p></div></button>
                  </div>
                </section>
                <section class="bg-white border-y border-slate-200 py-12 md:py-14"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex items-end justify-between gap-4 mb-6"><div><p class="text-xs font-extrabold uppercase tracking-wider text-klook-orange mb-2">Things to do</p><h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Aktivitas populer</h2></div><button onclick="navigateTo('packages')" class="shrink-0 text-xs sm:text-sm font-bold text-klook-orange">Lihat semua <i class="fas fa-arrow-right ml-1"></i></button></div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <button onclick="quickFilterSearch('water')" class="rounded-2xl border border-slate-200 p-4 text-left hover:bg-klook-light"><span class="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center text-lg mb-3"><i class="fas fa-water"></i></span><span class="block text-xs sm:text-sm font-extrabold">Aktivitas air</span></button>
                    <button onclick="quickFilterSearch('temple')" class="rounded-2xl border border-slate-200 p-4 text-left hover:bg-klook-light"><span class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg mb-3"><i class="fas fa-mountain-sun"></i></span><span class="block text-xs sm:text-sm font-extrabold">Alam & air terjun</span></button>
                    <button onclick="quickFilterSearch('atv')" class="rounded-2xl border border-slate-200 p-4 text-left hover:bg-klook-light"><span class="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg mb-3"><i class="fas fa-motorcycle"></i></span><span class="block text-xs sm:text-sm font-extrabold">ATV & petualangan</span></button>
                    <button onclick="quickFilterSearch('nusa')" class="rounded-2xl border border-slate-200 p-4 text-left hover:bg-klook-light"><span class="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center text-lg mb-3"><i class="fas fa-ship"></i></span><span class="block text-xs sm:text-sm font-extrabold">Island trip</span></button>
                    <button onclick="quickFilterSearch('temple')" class="rounded-2xl border border-slate-200 p-4 text-left hover:bg-klook-light"><span class="w-11 h-11 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center text-lg mb-3"><i class="fas fa-landmark"></i></span><span class="block text-xs sm:text-sm font-extrabold">Budaya & pura</span></button>
                    <button onclick="quickFilterSearch('driver')" class="rounded-2xl border border-slate-200 p-4 text-left hover:bg-klook-light"><span class="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center text-lg mb-3"><i class="fas fa-car-side"></i></span><span class="block text-xs sm:text-sm font-extrabold">Private driver</span></button>
                  </div>
                </div></section>
                <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14"><div class="flex items-end justify-between gap-4 mb-6"><div><p class="text-xs font-extrabold uppercase tracking-wider text-klook-orange mb-2">Plan your trip</p><h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Panduan wisata pilihan</h2></div><button onclick="navigateTo('blog')" class="shrink-0 text-xs sm:text-sm font-bold text-klook-orange">Lihat semua <i class="fas fa-arrow-right ml-1"></i></button></div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    ${BALI_BLOGS.slice(0,3).map(blog => '<button onclick="navigateTo(\'blog-read\',\''+blog.id+'\')" class="text-left bg-white rounded-2xl overflow-hidden border border-slate-200 klook-shadow klook-hover"><img src="'+blog.image+'" alt="" class="w-full h-44 object-cover"><div class="p-4"><span class="text-[10px] font-extrabold uppercase text-klook-orange">'+blog.category+' · '+blog.readTime+'</span><h3 class="font-extrabold text-slate-900 mt-2">'+blog.title+'</h3><p class="text-xs text-slate-500 mt-2">'+blog.snippet+'</p><span class="inline-block text-xs font-bold text-klook-orange mt-4">Baca panduan →</span></div></button>').join('')}
                  </div>
                </section>
                <section class="bg-slate-50 border-y border-slate-200 py-12 md:py-14"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-end justify-between gap-4 mb-6"><div><p class="text-xs font-extrabold uppercase tracking-wider text-klook-orange mb-2">Recommended</p><h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Paket tour pilihan</h2></div><button onclick="navigateTo('packages')" class="shrink-0 text-xs sm:text-sm font-bold text-klook-orange">Lihat semua <i class="fas fa-arrow-right ml-1"></i></button></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">${renderPackageCards(BALI_PACKAGES.slice(0,3))}</div></div></section>
                <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14"><div class="mb-6"><p class="text-xs font-extrabold uppercase tracking-wider text-klook-orange mb-2">Explore further</p><h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Jelajahi Bali</h2><p class="text-sm text-slate-500 mt-2">Pilih wilayah untuk menemukan destinasi di sekitarnya.</p></div><div class="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2">
                  <button onclick="navigateTo('discovery','region:north')" class="snap-start shrink-0 w-56 rounded-2xl overflow-hidden border border-slate-200 bg-white klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80" alt="Bali Utara" class="w-full h-36 object-cover"><div class="p-4 font-extrabold">Bali Utara <i class="fas fa-arrow-right text-klook-orange ml-2"></i></div></button>
                  <button onclick="navigateTo('discovery','region:south')" class="snap-start shrink-0 w-56 rounded-2xl overflow-hidden border border-slate-200 bg-white klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=700&q=80" alt="Bali Selatan" class="w-full h-36 object-cover"><div class="p-4 font-extrabold">Bali Selatan <i class="fas fa-arrow-right text-klook-orange ml-2"></i></div></button>
                  <button onclick="navigateTo('discovery','region:central')" class="snap-start shrink-0 w-56 rounded-2xl overflow-hidden border border-slate-200 bg-white klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" alt="Bali Tengah" class="w-full h-36 object-cover"><div class="p-4 font-extrabold">Bali Tengah <i class="fas fa-arrow-right text-klook-orange ml-2"></i></div></button>
                  <button onclick="navigateTo('discovery','region:east')" class="snap-start shrink-0 w-56 rounded-2xl overflow-hidden border border-slate-200 bg-white klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80" alt="Bali Timur" class="w-full h-36 object-cover"><div class="p-4 font-extrabold">Bali Timur <i class="fas fa-arrow-right text-klook-orange ml-2"></i></div></button>
                  <button onclick="navigateTo('discovery','region:west')" class="snap-start shrink-0 w-56 rounded-2xl overflow-hidden border border-slate-200 bg-white klook-shadow klook-hover"><img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=700&q=80" alt="Bali Barat" class="w-full h-36 object-cover"><div class="p-4 font-extrabold">Bali Barat <i class="fas fa-arrow-right text-klook-orange ml-2"></i></div></button>
                </div></section>
                <section class="border-t border-slate-200 bg-white py-8"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Cari lebih cepat</p><div class="flex flex-wrap gap-2"><button onclick="navigateTo('packages')" class="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold">Semua tour</button><button onclick="navigateTo('discovery','region:south')" class="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold">Destinasi</button><button onclick="navigateTo('packages')" class="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold">Aktivitas</button><button onclick="navigateTo('blog')" class="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold">Panduan wisata</button><button onclick="navigateTo('contact')" class="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold">Private transport</button><button onclick="navigateTo('contact')" class="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold">Airport transfer</button></div></div></section>
            `;
        }

        /* VIEW 2: ALL PACKAGES & CATALOG PAGE WITH FILTER BAR */
        function renderPackagesCatalogView() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="mb-8">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Produk pertama Bali Trans</span>
                        <h1 class="text-3xl font-extrabold text-slate-900">Paket Tour & Tiket Aktivitas</h1>
                        <p class="text-sm text-slate-500 mt-2 max-w-2xl">Mulai dari Paket Tour Lovina yang bisa disesuaikan dengan pilihan aktivitas dan kunjungan wisata.</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${renderPackageCards(BALI_PACKAGES)}
                    </div>
                </div>
            `;
        }

        /* CARD RENDERER COMPONENT */
        function renderPackageCards(packages) {
            if (packages.length === 0) {
                return `<div class="col-span-full text-center py-12 text-slate-400 font-medium">No packages found for this filter.</div>`;
            }

            const curr = CURRENCY_RATES[currentCurrency];

            return packages.map(pkg => {
                const formattedPrice = curr.format(pkg.priceIDR);
                const formattedOrig = curr.format(pkg.originalPriceIDR);
                const isWishlist = wishlistState.some(item => item.id === pkg.id);

                return `
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 klook-shadow klook-hover flex flex-col justify-between group relative">
                        <!-- Image Container -->
                        <div class="relative h-52 overflow-hidden bg-slate-100">
                            <img src="${pkg.heroImage}" alt="${pkg.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            
                            <!-- Rating Pill -->
                            <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full">${pkg.categoryName}</div>

                            <!-- Wishlist Heart Button -->
                            <button onclick="toggleWishlist('${pkg.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition shadow">
                                <i class="${isWishlist ? 'fas fa-heart text-rose-500' : 'far fa-heart'}"></i>
                            </button>

                            <!-- Badge Tag -->
                            ${pkg.badge ? `<span class="absolute bottom-3 left-3 badge-gradient text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow">${pkg.badge}</span>` : ''}
                        </div>

                        <!-- Content Body -->
                        <div class="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                                    <i class="fas fa-location-dot text-klook-orange"></i> ${pkg.location}
                                </span>
                                <h3 onclick="navigateTo('detail', '${pkg.id}')" class="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-klook-orange cursor-pointer transition mb-3">
                                    ${pkg.title}
                                </h3>

                                <!-- Klook Style Tags -->
                                <div class="flex flex-wrap gap-1.5 mb-4">
                                    ${pkg.instantConfirmation ? `<span class="text-[10px] bg-slate-100 font-semibold text-slate-600 px-2 py-0.5 rounded">⚡ Instant Confirmation</span>` : ''}
                                    ${pkg.freeCancellation ? `<span class="text-[10px] bg-emerald-50 font-semibold text-emerald-700 px-2 py-0.5 rounded">✓ Free Cancellation</span>` : ''}
                                </div>
                            </div>

                            <!-- Price & CTA -->
                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    ${pkg.originalPriceIDR > 0 ? `<span class="text-[10px] text-slate-400 line-through block font-medium">${formattedOrig}</span>` : ''}
                                    <div class="flex items-baseline gap-1">
                                        <span class="text-xs text-slate-500 font-medium">From</span>
                                        <span class="text-lg font-black text-slate-900">${formattedPrice}</span>
                                    </div>
                                </div>
                                <button onclick="navigateTo('detail', '${pkg.id}')" class="bg-orange-50 group-hover:bg-klook-orange group-hover:text-white text-klook-orange font-bold text-xs px-4 py-2.5 rounded-xl transition">
                                    View Options
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        /* VIEW 3: PACKAGE DETAIL PAGE */
        function renderDetailView(pkg) {
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
                        <div id="lovinaGalleryThumbs" class="flex gap-2 sm:gap-3 overflow-x-auto py-3" style="scrollbar-width:thin">
                            ${pkg.gallery.map((image,index) => `<button type="button" onclick="selectLovinaGallery(${index})" aria-label="Tampilkan foto ${index+1}" class="lovina-thumb flex-none w-[64px] h-[56px] sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 border-transparent opacity-70 hover:opacity-100"><img src="${image || pkg.heroImage}" alt="" class="w-full h-full object-cover"></button>`).join('')}
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

        /* VIEW 4: BLOG & GUIDES PAGE */
        let activeBlogCategory = 'All';
        function filterBlogList() {
            const query = (document.getElementById('blogSearchInput')?.value || '').trim().toLowerCase();
            document.querySelectorAll('[data-blog-card]').forEach(card => {
                const matchesCategory = activeBlogCategory === 'All' || card.dataset.category === activeBlogCategory;
                const matchesQuery = !query || (card.dataset.title + ' ' + card.dataset.snippet + ' ' + card.dataset.category).toLowerCase().includes(query);
                card.classList.toggle('hidden', !(matchesCategory && matchesQuery));
            });
            const visible = [...document.querySelectorAll('[data-blog-card]')].some(card => !card.classList.contains('hidden'));
            const empty = document.getElementById('blogEmptyState');
            if (empty) empty.classList.toggle('hidden', visible);
        }

        function setBlogCategory(category) {
            activeBlogCategory = category;
            document.querySelectorAll('[data-blog-category]').forEach(button => {
                const active = button.dataset.blogCategory === category;
                button.className = active
                    ? 'shrink-0 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm'
                    : 'shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-teal-500 hover:text-teal-700';
            });
            filterBlogList();
            if (currentViewName === 'blog') {
                const url = new URL(window.location.href);
                if (category === 'All') url.searchParams.delete('category');
                else url.searchParams.set('category', category);
                window.history.replaceState(window.history.state, '', url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '') + url.hash);
            }
        }

        function renderBlogListView() {
            const featured = BALI_BLOGS[0];
            const categories = ['All', ...new Set(BALI_BLOGS.map(blog => blog.category))];
            return `
                <main class="bg-[#fbfaf7] min-h-screen">
                    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8">
                        <div class="max-w-3xl mb-8 sm:mb-10">
                            <p class="text-xs sm:text-sm font-extrabold uppercase tracking-[.18em] text-teal-700">Bali Trans Journal</p>
                            <h1 class="mt-3 text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-950">Stories for a better Bali trip.</h1>
                            <p class="mt-4 max-w-2xl text-base sm:text-lg leading-7 text-slate-600">Practical guides, local flavours and ideas for discovering Bali at your own pace.</p>
                        </div>

                        <a href="${(window.location.pathname.startsWith('/bali-trans/') ? '/bali-trans/' : '/') + 'blog/' + (featured.slug || featured.id) + '/'}" class="group grid w-full overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-slate-200/80 transition hover:shadow-lg md:grid-cols-2">
                            <div class="relative min-h-[230px] sm:min-h-[340px] overflow-hidden">
                                <img src="${featured.image}" alt="${featured.title}" class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="eager">
                                <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-teal-800">Editor's pick</span>
                            </div>
                            <div class="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                                <div class="flex flex-wrap items-center gap-2 text-xs font-bold text-teal-700">
                                    <span>${featured.category}</span><span class="text-slate-300">/</span><span class="text-slate-500">${featured.readTime}</span>
                                </div>
                                <h2 class="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-950">${featured.title}</h2>
                                <p class="mt-4 text-sm sm:text-base leading-7 text-slate-600">${featured.snippet}</p>
                                <span class="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-teal-700">Read the story <i class="fas fa-arrow-right transition group-hover:translate-x-1"></i></span>
                            </div>
                        </a>
                    </section>

                    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
                        <div class="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p class="text-xs font-extrabold uppercase tracking-[.16em] text-slate-500">Explore the journal</p>
                                <h2 class="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-950">Find your next idea</h2>
                            </div>
                            <label class="relative block w-full sm:max-w-xs">
                                <span class="sr-only">Search articles</span>
                                <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input id="blogSearchInput" oninput="filterBlogList()" type="search" placeholder="Search travel guides..." class="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100">
                            </label>
                        </div>
                        <div class="hide-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-2" aria-label="Filter articles by category">
                            ${categories.map(category => `<button type="button" data-blog-category="${category}" onclick="setBlogCategory('${category.replace(/'/g, "\\'")}')" class="${category === 'All' ? 'shrink-0 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm' : 'shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-teal-500 hover:text-teal-700'}">${category === 'All' ? 'All stories' : category}</button>`).join('')}
                        </div>
                        <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                            ${BALI_BLOGS.map((blog, index) => `
                                <article data-blog-card data-category="${blog.category}" data-title="${blog.title.replace(/"/g, '&quot;')}" data-snippet="${blog.snippet.replace(/"/g, '&quot;')}" class="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg ">
                                    <a href="${(window.location.pathname.startsWith('/bali-trans/') ? '/bali-trans/' : '/') + 'blog/' + (blog.slug || blog.id) + '/'}" class="relative block aspect-[16/10] overflow-hidden text-left">
                                        <img src="${blog.image}" alt="${blog.title}" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                                    </a>
                                    <div class="flex flex-1 flex-col p-5 sm:p-6">
                                        <div class="flex flex-wrap items-center gap-2 text-xs font-bold text-teal-700">
                                            <span>${blog.category}</span><span class="text-slate-300">•</span><span class="text-slate-500">${blog.readTime}</span>
                                        </div>
                                        <h3 class="mt-3 text-lg font-extrabold leading-snug text-slate-900"><a href="?view=blog-read&id=${blog.id}" class="hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">${blog.title}</a></h3>
                                        <p class="mt-3 flex-1 text-sm leading-6 text-slate-600">${blog.snippet}</p>
                                        <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <span class="text-xs text-slate-500">${blog.author}</span>
                                            <button onclick="navigateTo('blog-read', '${blog.id}')" class="text-sm font-extrabold text-teal-700">Read article <i class="fas fa-arrow-right ml-1"></i></button>
                                        </div>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                        <div id="blogEmptyState" class="hidden py-14 text-center">
                            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500"><i class="fas fa-search"></i></div>
                            <h3 class="mt-4 text-lg font-extrabold text-slate-900">No stories found</h3>
                            <p class="mt-1 text-sm text-slate-500">Try another keyword or choose a different category.</p>
                        </div>
                    </section>
                </main>
            `;
        }

        /* VIEW 5: BLOG READ DETAIL */
        function renderBlogDetailView(blog) {
            const blogIndex = BALI_BLOGS.findIndex(item => item.id === blog.id);
            const previousBlog = blogIndex > 0 ? BALI_BLOGS[blogIndex - 1] : null;
            const nextBlog = blogIndex >= 0 && blogIndex < BALI_BLOGS.length - 1 ? BALI_BLOGS[blogIndex + 1] : null;
            const headingPattern = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
            const toc = [];
            let headingIndex = 0;
            let articleContent = (blog.content || '').replace(headingPattern, (match, level, attrs, title) => {
                headingIndex += 1;
                const id = 'article-section-' + headingIndex;
                toc.push({ id, title: title.replace(/<[^>]*>/g, '').replace(/^\d+\.\s*/, ''), level: Number(level) });
                return '<h' + level + attrs + ' id="' + id + '" class="scroll-mt-24">' + title + '</h' + level + '>';
            });
            if (blog.image) {
                articleContent = articleContent.replace(/<img\b[^>]*>/gi, tag => tag.includes(blog.image) ? '' : tag);
            }
            const relatedBlogs = BALI_BLOGS.filter(item => item.id !== blog.id && item.category === blog.category)
                .concat(BALI_BLOGS.filter(item => item.id !== blog.id && item.category !== blog.category))
                .filter((item, index, items) => items.findIndex(other => other.id === item.id) === index)
                .slice(0, 3);
            const articleUrl = id => {
                const item = BALI_BLOGS.find(entry => entry.id === id);
                const siteBase = window.location.pathname.startsWith('/bali-trans/') ? '/bali-trans/' : '/';
                return siteBase + 'blog/' + (item ? (item.slug || item.id) : encodeURIComponent(id)) + '/';
            };
            const author = blog.author || 'Bali Trans Editorial Team';
            return `
                <main class="min-h-screen bg-[#fbfaf7] text-slate-800">
                    <div class="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
                        <nav aria-label="Breadcrumb" class="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
                            <a href="?view=home" class="hover:text-teal-700">Beranda</a>
                            <i class="fas fa-chevron-right text-[9px] text-slate-300"></i>
                            <a href="/bali-trans/?view=blog" class="hover:text-teal-700">Blog</a>
                            <i class="fas fa-chevron-right text-[9px] text-slate-300"></i>
                            <span class="text-slate-700">${blog.category}</span>
                        </nav>

                        <header class="mx-auto max-w-4xl">
                            <p class="text-xs font-extrabold uppercase tracking-[.16em] text-teal-700">${blog.category}</p>
                            <h1 class="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">${blog.title}</h1>
                            <p class="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">${blog.snippet}</p>
                            <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-slate-200 py-3 text-xs text-slate-500 sm:text-sm">
                                <span class="font-bold text-slate-800">${author}</span>
                                <span aria-hidden="true">·</span>
                                <time datetime="${blog.date}">Terbit ${blog.date}</time>
                                <span aria-hidden="true">·</span>
                                <span><i class="far fa-clock mr-1"></i>${blog.readTime}</span>
                                ${blog.updatedDate ? '<span aria-hidden="true">·</span><span>Diperbarui ' + blog.updatedDate + '</span>' : ''}
                            </div>
                        </header>

                        <figure class="mx-auto mt-6 max-w-5xl sm:mt-8">
                            <img src="${blog.image}" alt="${blog.imageAlt || blog.title}" class="article-hero-image aspect-video w-full rounded-2xl object-cover sm:rounded-3xl" fetchpriority="high">
                        </figure>

                        <div class="mx-auto mt-8 grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
                            <article class="min-w-0 rounded-2xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:px-8 sm:py-9 lg:px-10">
                                <section class="article-table-of-contents mb-8 rounded-xl border border-teal-100 bg-teal-50/70 p-5 sm:p-6" aria-labelledby="article-toc-title">
                                    <p class="text-xs font-extrabold uppercase tracking-[.14em] text-teal-700">Panduan membaca</p>
                                    <h2 id="article-toc-title" class="mt-1 text-xl font-black text-slate-900">Daftar isi</h2>
                                    ${toc.length ? `<ol class="mt-4 space-y-2.5">${toc.map(item => `<li class="${item.level === 3 ? 'pl-4' : ''}"><a href="#${item.id}" class="text-sm font-medium leading-6 text-slate-700 transition hover:text-teal-800 hover:underline">${item.title}</a></li>`).join('')}</ol>` : '<p class="mt-3 text-sm text-slate-500">Daftar isi belum tersedia untuk artikel ini.</p>'}
                                </section>
                                <div class="article-body max-w-none text-[16px] leading-8 text-slate-700 sm:text-[17px] sm:leading-8">
                                    ${articleContent}
                                </div>

                                <div class="mt-10 border-t border-slate-200 pt-5">
                                    <p class="text-xs font-extrabold uppercase tracking-wider text-slate-500">Referensi dan bacaan lanjutan</p>
                                    <p class="mt-2 text-sm leading-6 text-slate-600">Informasi destinasi dapat berubah. Periksa kondisi perjalanan, cuaca, jam operasional, serta ketentuan aktivitas sebelum berangkat.</p>
                                </div>

                                <nav class="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2" aria-label="Navigasi artikel">
                                    ${previousBlog ? `<a href="${articleUrl(previousBlog.id)}" class="rounded-xl border border-slate-200 p-4 transition hover:border-teal-400 hover:bg-teal-50"><span class="text-xs font-bold text-slate-500"><i class="fas fa-arrow-left mr-1"></i> Artikel sebelumnya</span><span class="mt-2 block font-extrabold leading-snug text-slate-900">${previousBlog.title}</span></a>` : '<span></span>'}
                                    ${nextBlog ? `<a href="${articleUrl(nextBlog.id)}" class="rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal-400 hover:bg-teal-50 sm:col-start-2"><span class="text-xs font-bold text-slate-500">Artikel berikutnya <i class="fas fa-arrow-right ml-1"></i></span><span class="mt-2 block font-extrabold leading-snug text-slate-900">${nextBlog.title}</span></a>` : ''}
                                </nav>
                            </article>

                            <aside class="space-y-5 lg:sticky lg:top-24">
                                <section class="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
                                    <p class="text-xs font-extrabold uppercase tracking-[.14em] text-teal-300">Rencanakan perjalanan</p>
                                    <h2 class="mt-2 text-lg font-extrabold leading-snug">Ingin menjelajahi Bali tanpa terburu-buru?</h2>
                                    <p class="mt-2 text-sm leading-6 text-slate-300">Lihat pilihan aktivitas dan transportasi, lalu sesuaikan dengan lokasi menginap dan waktu yang tersedia.</p>
                                    <a href="?view=packages" class="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-teal-300 hover:text-white">Jelajahi paket <i class="fas fa-arrow-right"></i></a>
                                </section>
                            </aside>
                        </div>

                        <section class="mx-auto mt-12 max-w-6xl border-t border-slate-200 pt-7 sm:mt-16" aria-label="Artikel terkait">
                            <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
                                <div><p class="text-xs font-extrabold uppercase tracking-wider text-teal-700">Lanjut menjelajah</p><h2 class="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Panduan terkait</h2></div>
                                <a href="/bali-trans/?view=blog" class="shrink-0 text-sm font-extrabold text-teal-700 hover:underline">Semua artikel <i class="fas fa-arrow-right ml-1"></i></a>
                            </div>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                ${relatedBlogs.map(item => `
                                    <a href="${articleUrl(item.id)}" class="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md">
                                        <img src="${item.image}" alt="${item.imageAlt || item.title}" loading="lazy" class="aspect-video w-full object-cover">
                                        <div class="p-4"><p class="text-xs font-bold text-teal-700">${item.category} · ${item.readTime}</p><h3 class="mt-2 font-extrabold leading-snug text-slate-900 group-hover:text-teal-700">${item.title}</h3><p class="mt-2 text-sm leading-6 text-slate-600">${item.snippet}</p></div>
                                    </a>
                                `).join('')}
                            </div>
                        </section>
                    </div>
                </main>
            `;
        }

        /* VIEW 6: SHOPPING CART PAGE */
        function renderCartView() {
            const curr = CURRENCY_RATES[currentCurrency];

            if (cartState.length === 0) {
                return `
                    <div class="max-w-2xl mx-auto px-4 py-20 text-center">
                        <div class="w-20 h-20 bg-orange-100 text-klook-orange rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🛒</div>
                        <h2 class="text-2xl font-extrabold text-slate-900 mb-2">Your Cart is Empty</h2>
                        <p class="text-slate-500 text-sm mb-6">Explore our top Bali experiences and add them to your cart.</p>
                        <button onclick="navigateTo('packages')" class="bg-klook-orange text-white font-extrabold px-6 py-3 rounded-2xl text-xs shadow-lg shadow-orange-500/20">
                            Browse Activities Now
                        </button>
                    </div>
                `;
            }

            let grandTotal = 0;

            return `
                <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    <h1 class="text-2xl font-black text-slate-900 mb-6">Shopping Cart (${cartState.length} Items)</h1>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div class="lg:col-span-8 space-y-4">
                            ${cartState.map((item, index) => {
                                const itemTotal = item.unitPriceIDR * item.quantity;
                                grandTotal += itemTotal;

                                return `
                                    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                                        <div class="flex items-center gap-4 w-full sm:w-auto">
                                            <img src="${item.heroImage}" class="w-20 h-20 object-cover rounded-2xl flex-shrink-0">
                                            <div>
                                                <h4 class="font-extrabold text-slate-900 text-sm leading-snug">${item.title}</h4>
                                                <span class="text-xs text-slate-400 block mt-1">Tanggal: ${item.date} • Pilihan: ${item.optionName}</span>
                                                <span class="text-xs font-extrabold text-slate-900 block mt-1">Total paket: ${curr.format(item.unitPriceIDR)}</span>
                                                <span class="text-[11px] text-slate-500 block mt-1">${item.guestCount || item.quantity} tamu</span>
                                                ${item.vehicleName ? `<span class="text-[11px] text-slate-600 block mt-1">Kendaraan: ${item.vehicleName}</span>` : ''}
                                                ${item.addons && item.addons.length ? `<span class="text-[11px] text-slate-600 block mt-1">Tambahan: ${item.addons.map(addon => addon.name).join(', ')}</span>` : ''}
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                                            <div class="flex items-center space-x-2">
                                                ${item.priceMode === 'group' ? '<span class="text-[11px] text-slate-500">1 pemesanan</span>' : `<button onclick="updateCartQty(${index}, -1)" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold">-</button><span class="text-xs font-extrabold w-4 text-center">${item.quantity}</span><button onclick="updateCartQty(${index}, 1)" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold">+</button>`}
                                            </div>

                                            <span class="text-sm font-black text-slate-900">${curr.format(itemTotal)}</span>

                                            <button onclick="removeFromCart(${index})" class="text-slate-400 hover:text-rose-500 text-xs font-bold">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Order Summary Box -->
                        <div class="lg:col-span-4">
                            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                <h3 class="font-extrabold text-slate-900 text-base">Order Summary</h3>
                                <div class="flex justify-between text-xs text-slate-600">
                                    <span>Subtotal</span>
                                    <span class="font-bold text-slate-900">${curr.format(grandTotal)}</span>
                                </div>
                                <div class="flex justify-between text-xs text-slate-600">
                                    <span>Service & Voucher Fee</span>
                                    <span class="font-bold text-emerald-600">FREE</span>
                                </div>
                                <div class="border-t border-slate-100 pt-3 flex justify-between items-center">
                                    <span class="font-extrabold text-slate-900 text-sm">Total</span>
                                    <span class="text-xl font-black text-klook-orange">${curr.format(grandTotal)}</span>
                                </div>
                                <button onclick="navigateTo('checkout')" class="w-full bg-klook-orange hover:bg-klook-hover text-white font-extrabold py-3.5 px-4 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        /* VIEW 7: MULTI-STEP CHECKOUT FLOW */
        function renderCheckoutView() {
            const curr = CURRENCY_RATES[currentCurrency];
            let grandTotal = cartState.reduce((sum, item) => sum + (item.unitPriceIDR * item.quantity), 0);

            return `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <!-- Step Progress Indicator -->
                    <div class="flex items-center justify-between mb-8 max-w-md mx-auto text-xs font-bold">
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 1 ? 'text-klook-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 1 ? 'bg-klook-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">1</div>
                            <span>Data & pilihan</span>
                        </div>
                        <div class="h-0.5 flex-1 bg-slate-200 mx-3"></div>
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 2 ? 'text-klook-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 2 ? 'bg-klook-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">2</div>
                            <span>Konfirmasi WhatsApp</span>
                        </div>
                    </div>

                    <div id="checkoutStepContainer">
                        ${renderCheckoutStepContent(currentCheckoutStep, grandTotal)}
                    </div>
                </div>
            `;
        }

        function renderCheckoutStepContent(step, totalIDR) {
            const curr = CURRENCY_RATES[currentCurrency];
            const checkoutItem = cartState[0] || {};
            const guestCount = checkoutItem.guestCount || 1;
            const checkoutVehicleOptions = guestCount >= 6
                ? [{id:'hiace', name:'Toyota HiAce', surcharge:500000, description:'Minibus untuk 6–7 tamu'}]
                : [
                    {id:'avanza', name:'Toyota Avanza', surcharge:0, description:'Standar untuk 1–5 tamu'},
                    {id:'innova', name:'Toyota Innova', surcharge:300000, description:'Upgrade kenyamanan'},
                    {id:'hiace', name:'Toyota HiAce', surcharge:500000, description:'Minibus berukuran lebih besar'},
                    {id:'alphard', name:'Toyota Alphard', surcharge:1500000, description:'Pilihan premium untuk 1–5 tamu'}
                ];
            const selectedVehicleId = checkoutItem.vehicleId || (guestCount >= 6 ? 'hiace' : 'avanza');
            const existingAddonIds = (checkoutItem.addons || []).map(addon => addon.id);
            if (step === 1) {
                return `
                    <div class="space-y-5">
                        <section class="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                            <div><p class="text-xs font-extrabold uppercase tracking-widest text-orange-600">Sesuaikan perjalanan</p><h3 class="text-xl font-extrabold text-slate-900 mt-1">Kendaraan & aktivitas tambahan</h3><p class="text-sm text-slate-500 mt-2">Harga paket dihitung per orang. Pilihan di bawah langsung mengubah total pemesanan.</p></div>
                            <div>
                                <h4 class="font-extrabold text-slate-900 mb-3">Pilih kendaraan</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    ${checkoutVehicleOptions.map(vehicle => `
                                        <label class="flex items-start gap-3 rounded-2xl border-2 p-4 cursor-pointer ${selectedVehicleId === vehicle.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}">
                                            <input type="radio" name="checkoutVehicle" value="${vehicle.id}" data-surcharge="${vehicle.surcharge}" data-vehicle-name="${vehicle.name}" ${selectedVehicleId === vehicle.id ? 'checked' : ''} onchange="updateCheckoutPricing()" class="mt-1 accent-orange-500">
                                            <span class="min-w-0 flex-1"><span class="block font-extrabold text-sm text-slate-900">${vehicle.name}</span><span class="block text-xs text-slate-500 mt-1">${vehicle.description}</span><span class="block text-xs font-bold text-orange-700 mt-2">${vehicle.surcharge ? '+' + curr.format(vehicle.surcharge) + ' / perjalanan' : 'Termasuk dalam harga dasar'}</span></span>
                                        </label>
                                    `).join('')}
                                </div>
                                ${guestCount >= 6 ? '<p class="text-xs leading-5 text-amber-800 bg-amber-50 rounded-xl p-3 mt-3">Untuk 6–7 tamu, kendaraan ditetapkan ke HiAce demi kapasitas. Pilihan mobil yang lebih kecil tidak tersedia.</p>' : ''}
                            </div>
                            <div>
                                <h4 class="font-extrabold text-slate-900 mb-3">Tambahkan aktivitas (opsional)</h4>
                                <div class="space-y-2">
                                    <details class="rounded-xl border border-slate-200 p-3">
                                        <summary class="flex cursor-pointer items-center justify-between gap-3"><span class="font-bold text-sm">Persinggahan Tanah Lot</span><span class="text-xs font-semibold text-slate-600 whitespace-nowrap">+Rp350.000 / mobil</span></summary>
                                        <p class="text-sm text-slate-600 leading-6 mt-3">Tambahkan kunjungan ke Tanah Lot sebagai persinggahan di akhir perjalanan sebelum kembali ke lokasi pengantaran.</p>
                                        <label class="mt-3 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="checkoutAddon" value="sightseeing" data-label="Persinggahan Tanah Lot" data-price="350000" data-mode="group" ${existingAddonIds.includes('sightseeing') ? 'checked' : ''} onchange="updateCheckoutPricing()" class="accent-orange-500"> Tambahkan ke perjalanan</label>
                                    </details>
                                    <details class="rounded-xl border border-slate-200 p-3">
                                        <summary class="flex cursor-pointer items-center justify-between gap-3"><span class="font-bold text-sm">Snorkeling</span><span class="text-xs font-semibold text-slate-600 whitespace-nowrap">+Rp250.000 / orang</span></summary>
                                        <p class="text-sm text-slate-600 leading-6 mt-3">Tambahkan aktivitas snorkeling sebagai bagian dari pengalaman laut di Lovina.</p>
                                        <label class="mt-3 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="checkoutAddon" value="snorkeling" data-label="Snorkeling" data-price="250000" data-mode="person" ${existingAddonIds.includes('snorkeling') ? 'checked' : ''} onchange="updateCheckoutPricing()" class="accent-orange-500"> Tambahkan ke perjalanan</label>
                                    </details>
                                    <details class="rounded-xl border border-slate-200 p-3">
                                        <summary class="flex cursor-pointer items-center justify-between gap-3"><span class="font-bold text-sm">Swim with dolphin</span><span class="text-xs font-semibold text-slate-600 whitespace-nowrap">+Rp350.000 / orang</span></summary>
                                        <p class="text-sm text-slate-600 leading-6 mt-3">Pilihan aktivitas tambahan mengikuti aturan operator dan kondisi keselamatan di lokasi.</p>
                                        <label class="mt-3 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="checkoutAddon" value="swim-dolphin" data-label="Swim with dolphin" data-price="350000" data-mode="person" ${existingAddonIds.includes('swim-dolphin') ? 'checked' : ''} onchange="updateCheckoutPricing()" class="accent-orange-500"> Tambahkan ke perjalanan</label>
                                    </details>
                                </div>
                            </div>
                            <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                                <div class="flex justify-between gap-3 text-sm"><span class="text-slate-600">Paket utama (${guestCount} orang)</span><span class="font-bold">${curr.format((checkoutItem.basePricePerPersonIDR || 462500) * guestCount)}</span></div>
                                <div class="flex justify-between gap-3 text-sm"><span class="text-slate-600">Kendaraan & tambahan</span><span id="checkoutExtrasTotal" class="font-bold text-right">${curr.format(Math.max(0,(checkoutItem.unitPriceIDR || totalIDR)-((checkoutItem.basePricePerPersonIDR || 462500)*guestCount)))}</span></div>
                                <div class="border-t border-slate-200 pt-3 flex justify-between items-end gap-3"><span class="font-extrabold text-slate-900">Total perjalanan</span><span id="checkoutTotalPrice" class="text-xl font-black text-orange-600">${curr.format(totalIDR)}</span></div>
                                <p class="text-xs text-slate-500">Harga akan diperbarui otomatis ketika kendaraan atau aktivitas diubah.</p>
                            </div>
                        </section>
                        <section class="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                            <h3 class="text-xl font-extrabold text-slate-900">Data pemesan</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold">
                                <div><label class="block mb-1 text-slate-700" for="guestName">Nama lengkap</label><input type="text" id="guestName" value="${checkoutGuestDetails.name || ''}" placeholder="Nama sesuai identitas" class="w-full border border-slate-300 p-3 rounded-xl font-medium focus:outline-none focus:border-orange-500"></div>
                                <div><label class="block mb-1 text-slate-700" for="guestEmail">Alamat email</label><input type="email" id="guestEmail" value="${checkoutGuestDetails.email || ''}" placeholder="nama@email.com" class="w-full border border-slate-300 p-3 rounded-xl font-medium focus:outline-none focus:border-orange-500"></div>
                                <div><label class="block mb-1 text-slate-700" for="guestPhone">Nomor WhatsApp</label><input type="tel" id="guestPhone" value="${checkoutGuestDetails.phone || ''}" placeholder="+62..." class="w-full border border-slate-300 p-3 rounded-xl font-medium focus:outline-none focus:border-orange-500"></div>
                                <div><label class="block mb-1 text-slate-700" for="guestHotel">Lokasi penjemputan</label><input type="text" id="guestHotel" value="${checkoutGuestDetails.hotel || ''}" placeholder="Nama hotel atau alamat" class="w-full border border-slate-300 p-3 rounded-xl font-medium focus:outline-none focus:border-orange-500"></div>
                            </div>
                            <button onclick="advanceCheckoutStep(2)" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 px-6 rounded-2xl transition text-sm shadow-lg shadow-orange-500/20">Lanjutkan <i class="fas fa-arrow-right ml-1"></i></button>
                        </section>
                    </div>
                `;
                        } else if (step === 2) {
                const item = cartState[0] || {};
                const currVehicle = item.vehicleName || 'Toyota Avanza';
                const chosenAddons = (item.addons || []).map(addon => addon.name).filter(Boolean);
                return `
                    <div class="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                        <div><p class="text-xs font-extrabold uppercase tracking-widest text-orange-600">Langkah 2 dari 2</p><h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Periksa pesanan Anda</h2><p class="text-sm text-slate-500 mt-2">Pastikan pilihan sudah sesuai. Saat dilanjutkan, rincian ini akan disiapkan untuk dikirim melalui WhatsApp Bali Trans.</p></div>
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Paket</span><strong class="text-right">Lovina Dolphin Tour</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Jumlah tamu</span><strong>${item.guestCount || 1} orang</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Kendaraan</span><strong class="text-right">${currVehicle}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Tambahan</span><strong class="text-right">${chosenAddons.length ? chosenAddons.join(', ') : 'Tidak ada'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Nama</span><strong class="text-right">${checkoutGuestDetails.name || '—'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">WhatsApp pemesan</span><strong class="text-right">${checkoutGuestDetails.phone || '—'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Penjemputan</span><strong class="text-right">${checkoutGuestDetails.hotel || '—'}</strong></div>
                            <div class="border-t border-slate-200 pt-3 flex justify-between items-end gap-4"><span class="font-extrabold text-slate-900">Perkiraan total</span><strong class="text-xl text-orange-600">${curr.format(totalIDR)}</strong></div>
                        </div>
                        <div class="flex flex-col-reverse sm:flex-row gap-3"><button onclick="advanceCheckoutStep(1)" class="sm:w-1/3 border border-slate-300 text-slate-700 font-extrabold py-3.5 px-5 rounded-2xl text-sm">Kembali</button><button onclick="sendCheckoutToWhatsApp()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm"><i class="fab fa-whatsapp mr-2"></i>Kirim ke WhatsApp</button></div>
                    </div>
                `;
            } else {
                const refCode = 'BT-' + Math.floor(100000 + Math.random() * 900000);
                const paymentLabels = {'bank-transfer':'Bank transfer','card':'Credit / debit card','arrival':'Bayar di tempat'};
                return `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm space-y-6">
                        <div class="text-center"><div class="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"><i class="fas fa-clipboard-check"></i></div><p class="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Langkah 3 dari 3</p><h2 class="text-2xl font-black text-slate-900 mt-1">Tinjau pemesanan Anda</h2><p class="text-sm text-slate-500 mt-2">Referensi: <strong class="text-slate-800">${refCode}</strong></p></div>
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Nama pemesan</span><strong class="text-right">${checkoutGuestDetails.name || '—'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Email</span><strong class="text-right break-all">${checkoutGuestDetails.email || '—'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">WhatsApp</span><strong class="text-right">${checkoutGuestDetails.phone || '—'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Penjemputan</span><strong class="text-right">${checkoutGuestDetails.hotel || '—'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Kendaraan</span><strong class="text-right">${cartState[0]?.vehicleName || '—'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Tamu</span><strong class="text-right">${cartState[0]?.guestCount || 1} orang</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Aktivitas tambahan</span><strong class="text-right">${cartState[0]?.addons?.length ? cartState[0].addons.map(addon => addon.name).join(', ') : 'Tidak ada'}</strong></div>
                            <div class="flex justify-between gap-4 text-sm"><span class="text-slate-500">Metode pembayaran</span><strong class="text-right">${paymentLabels[selectedPaymentMethod] || paymentLabels['bank-transfer']}</strong></div>
                            <div class="border-t border-slate-200 pt-4 flex justify-between gap-4"><span class="font-extrabold text-slate-900">Total pemesanan</span><strong class="text-xl text-orange-600">${curr.format(totalIDR)}</strong></div>
                        </div>
                        <p class="text-sm leading-6 text-slate-600">Ketersediaan, detail pembayaran, dan konfirmasi akhir tetap perlu disepakati dengan Bali Trans sebelum perjalanan.</p>
                        <div class="flex flex-col sm:flex-row gap-3"><button onclick="advanceCheckoutStep(2)" class="sm:w-1/3 border border-slate-300 text-slate-700 font-extrabold py-3.5 px-5 rounded-2xl text-sm">Kembali ke pembayaran</button><button onclick="navigateTo('home')" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm">Kembali ke beranda</button></div>
                    </div>
                `;
            }
        }

        /* ==========================================================================
           4. INTERACTIVE EVENT HANDLERS & HELPERS
           ========================================================================== */
        
        let currentDetailQty = 1;
        let selectedPaymentMethod = 'bank-transfer';
        let checkoutGuestDetails = {};

        function changeCurrency(val){changeLocale(({IDR:'id',MYR:'ms',SGD:'sg',USD:'en',AED:'ar',INR:'hi'})[val]||'id');}

        function filterByCategory(cat) {
            selectedCategoryFilter = cat;
        }

        function changeQty(delta) {
            const opt = currentDetailPackage ? getSelectedPackageOption() : null;
            const max = opt && opt.priceMode === 'group' ? opt.maxGuests : 12;
            currentDetailQty = Math.max(1, Math.min(max, currentDetailQty + delta));
            const qty = document.getElementById('adultQty');
            if (qty) qty.innerText = currentDetailQty;
            updateBookingCalculation();
        }

        let lovinaGalleryIndex = 0;

        function initDetailSectionTracking() {
            const links = [...document.querySelectorAll("[data-detail-target]")];
            const sections = links.map(link => document.getElementById(link.dataset.detailTarget)).filter(Boolean);
            if (!links.length || !sections.length) return;
            if (window.detailSectionObserver) window.detailSectionObserver.disconnect();
            window.detailSectionObserver = new IntersectionObserver(entries => {
                const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
                if (!visible.length) return;
                const activeId = visible[0].target.id;
                links.forEach(link => {
                    const active = link.dataset.detailTarget === activeId;
                    link.classList.toggle("is-active", active);
                    if (active) link.scrollIntoView({behavior:"smooth", block:"nearest", inline:"center"});
                });
            }, {root:null, rootMargin:"-18% 0px -65% 0px", threshold:[0,0.1,0.25,0.5]});
            sections.forEach(section => window.detailSectionObserver.observe(section));
        }

        function selectLovinaGallery(index) {
            const images = currentDetailPackage?.gallery || [];
            if (!images.length) return;
            lovinaGalleryIndex = (index + images.length) % images.length;
            const main = document.getElementById('lovinaMainImage');
            if (main) {
                main.src = images[lovinaGalleryIndex] || currentDetailPackage.heroImage;
                main.alt = 'Foto ' + (lovinaGalleryIndex + 1) + ' perjalanan Lovina';
            }
            const count = document.getElementById('lovinaGalleryCount');
            if (count) count.textContent = (lovinaGalleryIndex + 1) + ' / ' + images.length;
            document.querySelectorAll('.lovina-thumb').forEach((thumb,i) => {
                thumb.classList.toggle('border-orange-500', i === lovinaGalleryIndex);
                thumb.classList.toggle('opacity-100', i === lovinaGalleryIndex);
                thumb.classList.toggle('opacity-70', i !== lovinaGalleryIndex);
                if (i === lovinaGalleryIndex) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            });
        }

        function moveLovinaGallery(direction) {
            const images = currentDetailPackage?.gallery || [];
            if (images.length) selectLovinaGallery(lovinaGalleryIndex + direction);
        }

        function getSelectedPackageOption() {
            const selectedOptId = document.querySelector('input[name="packageOption"]:checked')?.value;
            return currentDetailPackage.options.find(o => o.id === selectedOptId) || currentDetailPackage.options[0];
        }

        function getSelectedVehicle() {
            const selected = document.querySelector('input[name="vehicleType"]:checked');
            const vehicles = {
                avanza: { id: 'avanza', name: 'Toyota Avanza', priceIDR: 0 },
                innova: { id: 'innova', name: 'Toyota Innova', priceIDR: 300000 },
                alphard: { id: 'alphard', name: 'Toyota Alphard', priceIDR: 1500000 }
            };
            return selected ? vehicles[selected.value] : vehicles.avanza;
        }

        function getSelectedAddons() {
            return Array.from(document.querySelectorAll('input[name="lovinaAddon"]:checked')).map(input => ({
                id: input.value,
                name: input.dataset.label || input.value,
                priceIDR: Number(input.dataset.price || 0),
                priceMode: ['snorkeling','swim-dolphin'].includes(input.value) ? 'person' : 'group'
            }));
        }

        function updatePackageOptionDetails() {
            const opt = getSelectedPackageOption();
            const hint = document.getElementById('guestCountHint');
            if (hint) hint.innerText = 'Harga per orang';
            const qty = document.getElementById('adultQty');
            if (qty) qty.innerText = currentDetailQty;
            const label = document.getElementById('selectedOptionLabel');
            if (label) label.innerText = opt.name;
            const choices = document.querySelectorAll('.vehicle-choice');
            choices.forEach(choice => {
                const radio = choice.querySelector('input[type="radio"]');
                choice.classList.toggle('border-orange-500', !!radio && radio.checked);
                choice.classList.toggle('bg-orange-50', !!radio && radio.checked);
                choice.classList.toggle('border-slate-200', !radio || !radio.checked);
            });
            updateBookingCalculation();
        }

        function updateBookingCalculation() {
            if (!currentDetailPackage) return;
            const curr = CURRENCY_RATES[currentCurrency];
            const opt = getSelectedPackageOption();
            const perPerson = opt.priceIDR;
            const vehicleInputs = Array.from(document.querySelectorAll('input[name="detailVehicle"]'));
            if (currentDetailQty >= 6) {
                const hiace = vehicleInputs.find(input => input.value === 'hiace');
                if (hiace) hiace.checked = true;
                vehicleInputs.forEach(input => { input.disabled = input.value !== 'hiace'; });
            } else {
                vehicleInputs.forEach(input => { input.disabled = false; });
                if (!vehicleInputs.some(input => input.checked)) {
                    const avanza = vehicleInputs.find(input => input.value === 'avanza');
                    if (avanza) avanza.checked = true;
                }
            }
            document.querySelectorAll('.detail-vehicle-choice').forEach(label => {
                const input = label.querySelector('input');
                label.classList.toggle('border-orange-500', !!input && input.checked);
                label.classList.toggle('bg-orange-50', !!input && input.checked);
                label.classList.toggle('border-slate-200', !input || !input.checked);
                label.classList.toggle('opacity-50', !!input && input.disabled);
            });
            const vehicleInput = document.querySelector('input[name="detailVehicle"]:checked');
            const vehicleSurcharge = Number(vehicleInput?.dataset.surcharge || 0);
            const addons = Array.from(document.querySelectorAll('input[name="detailAddon"]:checked')).map(input => ({
                id: input.value, name: input.dataset.label || input.value,
                priceIDR: Number(input.dataset.price || 0), priceMode: input.dataset.mode || 'person'
            }));
            const addonsTotal = addons.reduce((sum, addon) => sum + (addon.priceMode === 'person' ? addon.priceIDR * currentDetailQty : addon.priceIDR), 0);
            const extrasTotal = vehicleSurcharge + addonsTotal;
            const total = perPerson * currentDetailQty + extrasTotal;
            const calcElem = document.getElementById('calculatedTotalPrice');
            if (calcElem) calcElem.innerText = curr.format(total);
            const perPersonElem = document.getElementById('detailPricePerPerson');
            if (perPersonElem) perPersonElem.innerText = curr.format(perPerson);
            const guestTotal = document.getElementById('detailGuestTotal');
            if (guestTotal) guestTotal.innerText = currentDetailQty;
            const extrasLabel = document.getElementById('selectedExtrasLabel');
            if (extrasLabel) extrasLabel.innerText = extrasTotal ? curr.format(extrasTotal) + ' tambahan' : 'Tidak ada tambahan';
            const optionLabel = document.getElementById('selectedOptionLabel');
            if (optionLabel) optionLabel.innerText = opt.name;
        }

        function changeQty(delta) {
            currentDetailQty = Math.max(1, Math.min(7, currentDetailQty + delta));
            const qty = document.getElementById('adultQty');
            if (qty) qty.innerText = currentDetailQty;
            updateBookingCalculation();
        }

        function addToCartCurrentPkg() {
            const opt = getSelectedPackageOption();
            const date = document.getElementById('bookingDateInput')?.value || '';
            if (!date) {
                showToast('Pilih tanggal perjalanan terlebih dahulu.');
                return;
            }
            const selectedVehicle = document.querySelector('input[name="detailVehicle"]:checked');
            const vehicleId = currentDetailQty >= 6 ? 'hiace' : (selectedVehicle?.value || 'avanza');
            const vehicleNames = {avanza:'Toyota Avanza', innova:'Toyota Innova', hiace:'Toyota HiAce', alphard:'Toyota Alphard'};
            const vehicleSurchargeIDR = currentDetailQty >= 6 ? 500000 : Number(selectedVehicle?.dataset.surcharge || 0);
            const addons = Array.from(document.querySelectorAll('input[name="detailAddon"]:checked')).map(input => ({
                id: input.value, name: input.dataset.label || input.value,
                priceIDR: Number(input.dataset.price || 0), priceMode: input.dataset.mode || 'person'
            }));
            const addonsTotal = addons.reduce((sum, addon) => sum + (addon.priceMode === 'person' ? addon.priceIDR * currentDetailQty : addon.priceIDR), 0);
            const totalPriceIDR = (opt.priceIDR * currentDetailQty) + vehicleSurchargeIDR + addonsTotal;
            const item = {
                id: currentDetailPackage.id + '-' + opt.id + '-' + Date.now(),
                productId: currentDetailPackage.id,
                title: currentDetailPackage.title,
                heroImage: currentDetailPackage.heroImage,
                unitPriceIDR: totalPriceIDR,
                basePricePerPersonIDR: opt.priceIDR,
                quantity: 1,
                guestCount: currentDetailQty,
                priceMode: 'group',
                optionName: opt.name,
                vehicleId: vehicleId,
                vehicleName: vehicleNames[vehicleId] || 'Toyota Avanza',
                vehicleSurchargeIDR: vehicleSurchargeIDR,
                addons: addons,
                date: date
            };
            cartState.push(item);
            showToast('Paket Lovina ditambahkan ke keranjang.');
            updateBadges();
        }

        function bookNowCurrentPkg() {
            addToCartCurrentPkg();
            navigateTo('cart');
        }

        function updateCartQty(index, delta) {
            cartState[index].quantity += delta;
            if (cartState[index].quantity <= 0) {
                cartState.splice(index, 1);
            }
            navigateTo('cart');
        }

        function removeFromCart(index) {
            cartState.splice(index, 1);
            showToast('Item removed from cart');
            navigateTo('cart');
        }

        function toggleWishlist(pkgId) {
            const pkg = BALI_PACKAGES.find(p => p.id === pkgId);
            const idx = wishlistState.findIndex(w => w.id === pkgId);

            if (idx > -1) {
                wishlistState.splice(idx, 1);
                showToast('Removed from Wishlist');
            } else {
                wishlistState.push(pkg);
                showToast('Added to Wishlist ❤️');
            }
            updateBadges();
            if (document.getElementById('appContainer').innerHTML.includes('Trending Bali Activities')) {
                document.getElementById('homeFeaturedGrid').innerHTML = renderPackageCards(BALI_PACKAGES);
            }
        }

        const BALI_TRANSLATIONS = {
          "Explore Bali":"Jelajahi Bali","Discover Bali tours, island trips and private transport.":"Temukan tur Bali, perjalanan pulau, dan transportasi privat.",
          "Plan your Bali trip":"Rencanakan perjalanan Bali","WhatsApp Concierge":"Bantuan WhatsApp","TOURS · TRIPS · TRANSFER":"TUR · PERJALANAN · TRANSFER",
          "Search activities, tours, or spots (e.g. Ubud, ATV)...":"Cari aktivitas, tur, atau tempat (mis. Ubud, ATV)...",
          "Home":"Beranda","Tours & Services":"Tur & Layanan","About Us":"Tentang Kami","Contact":"Kontak","My Bookings":"Pesanan Saya",
          "Help":"Bantuan","Register":"Mendaftar","Wishlist":"Favorit","Recently Viewed":"Baru Saja Dilihat","Create Account":"Buat Akun",
          "Tours":"Tur","Activities":"Aktivitas","Private Transport":"Transportasi Privat","Discover":"Jelajahi","Explore":"Jelajahi",
          "Book now":"Pesan sekarang","Book Now":"Pesan Sekarang","View details":"Lihat detail","View Details":"Lihat Detail","View all":"Lihat semua","See all":"Lihat semua",
          "Learn more":"Pelajari lebih lanjut","Read more":"Baca selengkapnya","From":"Mulai dari","per person":"per orang","Popular":"Populer",
          "Popular tours":"Tur populer","Top destinations":"Destinasi pilihan","Find your next Bali experience":"Temukan pengalaman Bali berikutnya",
          "Discover Bali":"Jelajahi Bali","What would you like to do?":"Apa yang ingin Anda lakukan?","No packages found for this filter.":"Tidak ada paket untuk filter ini.",
          "Add to wishlist":"Tambahkan ke favorit","Remove from wishlist":"Hapus dari favorit","Your wishlist is currently empty.":"Daftar favorit Anda masih kosong.",
          "Recently viewed":"Baru saja dilihat","Need help?":"Butuh bantuan?","Send message":"Kirim pesan","Send Message":"Kirim Pesan",
          "Your name":"Nama Anda","Email address":"Alamat email","Phone number":"Nomor telepon","Message":"Pesan","Submit":"Kirim",
          "Adults":"Dewasa","Children":"Anak-anak","Select date":"Pilih tanggal","Choose date":"Pilih tanggal","Continue":"Lanjutkan","Back":"Kembali",
          "Your cart is empty":"Keranjang Anda kosong","Shopping cart":"Keranjang belanja","Checkout":"Pembayaran","Total":"Total","Subtotal":"Subtotal",
          "Booking details":"Detail pemesanan","Guest details":"Data tamu","Payment method":"Metode pembayaran","Confirm booking":"Konfirmasi pemesanan",
          "Included":"Termasuk","Highlights":"Keunggulan","Itinerary":"Rencana perjalanan","What's included":"Yang termasuk","Important information":"Informasi penting",
          "Cancellation policy":"Kebijakan pembatalan","Location":"Lokasi","Duration":"Durasi","Reviews":"Ulasan","Why choose us?":"Mengapa memilih kami?",
          "Contact us":"Hubungi kami","Contact Us":"Hubungi Kami","About Bali Trans":"Tentang Bali Trans","Loading...":"Memuat..."
        };
        const originalTextNodes = new WeakMap();
        const originalAttributes = new WeakMap();
        const EXTRA_LOCALE_COPY={
          ms:{"Beranda":"Laman Utama","Tur & Layanan":"Lawatan & Perkhidmatan","Tentang Kami":"Tentang Kami","Kontak":"Hubungi Kami","Pesan sekarang":"Tempah sekarang","Lihat detail":"Lihat butiran","Lihat semua":"Lihat semua","Pelajari lebih lanjut":"Ketahui lanjut","Baca selengkapnya":"Baca lagi","Mulai dari":"Daripada","per orang":"seorang","Tur populer":"Lawatan popular","Destinasi pilihan":"Destinasi utama","Butuh bantuan?":"Perlukan bantuan?","Kirim pesan":"Hantar mesej","Explore Bali":"Terokai Bali","Home":"Laman Utama","Tours & Services":"Lawatan & Perkhidmatan","About Us":"Tentang Kami","Contact":"Hubungi Kami","Book now":"Tempah sekarang","Book Now":"Tempah Sekarang","View details":"Lihat butiran","View Details":"Lihat Butiran","View all":"Lihat semua","See all":"Lihat semua","Learn more":"Ketahui lanjut","Read more":"Baca lagi","From":"Daripada","per person":"seorang","Popular tours":"Lawatan popular","Top destinations":"Destinasi utama","Need help?":"Perlukan bantuan?","Send message":"Hantar mesej","Offline":"Luar talian","Live chat":"Sembang langsung","Continue on WhatsApp":"Teruskan di WhatsApp"},
          sg:{"Beranda":"Home","Tur & Layanan":"Tours & Services","Tentang Kami":"About Us","Kontak":"Contact","Pesan sekarang":"Book now","Lihat detail":"View details","Lihat semua":"See all","Pelajari lebih lanjut":"Find out more","Baca selengkapnya":"Read more","Mulai dari":"From","per orang":"per person","Tur populer":"Popular tours","Destinasi pilihan":"Top places","Butuh bantuan?":"Need help?","Kirim pesan":"Send message","Explore Bali":"Explore Bali lah","Home":"Home","Tours & Services":"Tours & Services","About Us":"About Us","Contact":"Contact","Book now":"Book now","Book Now":"Book Now","View details":"View details","View all":"See all","Learn more":"Find out more","Read more":"Read more","Popular tours":"Popular tours","Top destinations":"Top places","Offline":"Offline","Live chat":"Live chat","Continue on WhatsApp":"Chat us on WhatsApp"},
          ar:{"Beranda":"الرئيسية","Tur & Layanan":"الجولات والخدمات","Tentang Kami":"من نحن","Kontak":"اتصل بنا","Pesan sekarang":"احجز الآن","Lihat detail":"عرض التفاصيل","Lihat semua":"عرض الكل","Pelajari lebih lanjut":"اعرف المزيد","Baca selengkapnya":"اقرأ المزيد","Mulai dari":"ابتداءً من","per orang":"للشخص","Tur populer":"الجولات الشائعة","Destinasi pilihan":"أفضل الوجهات","Butuh bantuan?":"هل تحتاج إلى مساعدة؟","Kirim pesan":"إرسال الرسالة","Explore Bali":"اكتشف بالي","Home":"الرئيسية","Tours & Services":"الجولات والخدمات","About Us":"من نحن","Contact":"اتصل بنا","Book now":"احجز الآن","Book Now":"احجز الآن","View details":"عرض التفاصيل","View all":"عرض الكل","Learn more":"اعرف المزيد","Read more":"اقرأ المزيد","From":"ابتداءً من","per person":"للشخص","Popular tours":"الجولات الشائعة","Top destinations":"أفضل الوجهات","Need help?":"هل تحتاج إلى مساعدة؟","Send message":"إرسال الرسالة","Offline":"غير متصل","Live chat":"دردشة مباشرة","Continue on WhatsApp":"المتابعة عبر واتساب"},
          hi:{"Beranda":"होम","Tur & Layanan":"टूर और सेवाएँ","Tentang Kami":"हमारे बारे में","Kontak":"संपर्क करें","Pesan sekarang":"अभी बुक करें","Lihat detail":"विवरण देखें","Lihat semua":"सभी देखें","Pelajari lebih lanjut":"और जानें","Baca selengkapnya":"और पढ़ें","Mulai dari":"शुरुआती कीमत","per orang":"प्रति व्यक्ति","Tur populer":"लोकप्रिय टूर","Destinasi pilihan":"शीर्ष गंतव्य","Butuh bantuan?":"मदद चाहिए?","Kirim pesan":"संदेश भेजें","Explore Bali":"बाली घूमें","Home":"होम","Tours & Services":"टूर और सेवाएँ","About Us":"हमारे बारे में","Contact":"संपर्क करें","Book now":"अभी बुक करें","Book Now":"अभी बुक करें","View details":"विवरण देखें","View all":"सभी देखें","Learn more":"और जानें","Read more":"और पढ़ें","From":"शुरुआती कीमत","per person":"प्रति व्यक्ति","Popular tours":"लोकप्रिय टूर","Top destinations":"शीर्ष गंतव्य","Need help?":"मदद चाहिए?","Send message":"संदेश भेजें","Offline":"ऑफ़लाइन","Live chat":"लाइव चैट","Continue on WhatsApp":"WhatsApp पर जारी रखें"}
        };
        function translateCopy(value){if(!value)return value;let out=value;if(currentLanguage==='id'){Object.keys(BALI_TRANSLATIONS).sort((a,b)=>b.length-a.length).forEach(k=>out=out.split(k).join(BALI_TRANSLATIONS[k]));}else if(currentLanguage==='en'){const rev={};Object.keys(BALI_TRANSLATIONS).forEach(k=>{if(!rev[BALI_TRANSLATIONS[k]])rev[BALI_TRANSLATIONS[k]]=k;});Object.keys(rev).sort((a,b)=>b.length-a.length).forEach(k=>out=out.split(k).join(rev[k]));}else{const map=EXTRA_LOCALE_COPY[currentLanguage]||{};Object.keys(map).sort((a,b)=>b.length-a.length).forEach(k=>out=out.split(k).join(map[k]));}return out;}
        // Locale dropdown and page-copy translation helpers.
        function toggleLocaleMenu(event) {
            if (event) event.stopPropagation();
            const menu = document.getElementById('localeMenu');
            const button = document.getElementById('localeButton');
            if (!menu) return;
            const opening = menu.classList.contains('hidden');
            closeHeaderSearch();
            closeMobileMenu();
            menu.classList.toggle('hidden', !opening);
            if (button) button.setAttribute('aria-expanded', String(opening));
        }
        function closeLocaleMenu() {
            const menu = document.getElementById('localeMenu');
            const button = document.getElementById('localeButton');
            if (menu) menu.classList.add('hidden');
            if (button) button.setAttribute('aria-expanded', 'false');
        }
        function syncLocaleSelector() {
            const setting = LOCALE_SETTINGS[currentLanguage] || LOCALE_SETTINGS.id;
            const flag = document.getElementById('localeCurrentFlag');
            const code = document.getElementById('localeCurrentCode');
            if (flag) flag.textContent = setting.flag;
            if (code) code.textContent = setting.code;
            const ids = {id:'localeCheckId',ms:'localeCheckMs',sg:'localeCheckSg',en:'localeCheckEn',ar:'localeCheckAr',hi:'localeCheckHi'};
            Object.entries(ids).forEach(([lang,id]) => {
                const el = document.getElementById(id);
                if (el) el.classList.toggle('hidden', lang !== currentLanguage);
            });
            if (document.documentElement) {
                document.documentElement.lang = setting.lang;
                document.documentElement.dir = setting.dir;
            }
        }
        function applyLanguageCopy(root) {
            const scope = root || document;
            if (!scope || !scope.querySelectorAll) return;
            const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    const parent = node.parentElement;
                    if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT|OPTION)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
                    if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            });
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(node => {
                if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
                node.nodeValue = translateCopy(originalTextNodes.get(node));
            });
            scope.querySelectorAll('input[placeholder],textarea[placeholder],button[aria-label],input[aria-label]').forEach(el => {
                if (!originalAttributes.has(el)) originalAttributes.set(el, {placeholder:el.getAttribute('placeholder'),aria:el.getAttribute('aria-label')});
                const attrs = originalAttributes.get(el);
                if (attrs.placeholder !== null) el.setAttribute('placeholder', translateCopy(attrs.placeholder));
                if (attrs.aria !== null) el.setAttribute('aria-label', translateCopy(attrs.aria));
            });
        }
        function changeLocale(language) {
            if (!LOCALE_SETTINGS[language]) return;
            currentLanguage = language;
            currentCurrency = LOCALE_SETTINGS[language].currency;
            try {
                localStorage.setItem('baliTransLanguage', language);
                localStorage.setItem('baliTransCurrency', currentCurrency);
            } catch (e) {}
            syncLocaleSelector();
            closeLocaleMenu();
            applyLanguageCopy(document);
            if (typeof updateLiveChatStatus === 'function') updateLiveChatStatus();
            // Re-render active view so generated cards use the selected locale too.
            if (typeof navigateTo === 'function') navigateTo('home');
            setTimeout(() => applyLanguageCopy(document), 80);
        }
        if (!window.__baliTransLocaleObserver) {
            window.__baliTransLocaleObserver = new MutationObserver(records => {
                if (window.__baliTransTranslating) return;
                window.__baliTransTranslating = true;
                records.forEach(record => {
                    record.addedNodes && record.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) applyLanguageCopy(node);
                        else if (node.nodeType === Node.TEXT_NODE && node.parentElement && !/^(SCRIPT|STYLE)$/i.test(node.parentElement.tagName)) {
                            if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
                            node.nodeValue = translateCopy(originalTextNodes.get(node));
                        }
                    });
                });
                window.__baliTransTranslating = false;
            });
            document.addEventListener('DOMContentLoaded', () => {
                syncLocaleSelector();
                applyLanguageCopy(document);
                window.__baliTransLocaleObserver.observe(document.body, {childList:true,subtree:true});
            }, {once:true});
        }

        // Presence display: offline by default until a real admin-presence service is connected.
        window.BALI_TRANS_ADMIN_ONLINE = window.BALI_TRANS_ADMIN_ONLINE === true;
        function updateLiveChatStatus() {
            const online = window.BALI_TRANS_ADMIN_ONLINE === true;
            const dot = document.getElementById('topLiveChatDot');
            const state = document.getElementById('topLiveChatState');
            const label = document.getElementById('topLiveChatLabel');
            const badge = document.getElementById('topLiveChatStatus');
            if (dot) dot.className = 'h-2 w-2 rounded-full ' + (online ? 'bg-emerald-400' : 'bg-slate-300');
            if (state) state.textContent = online ? 'Online' : 'Offline';
            if (label) label.textContent = currentLanguage === 'id' ? 'Live Chat' : 'Live Chat';
            if (badge) badge.setAttribute('aria-label', 'Live Chat ' + (online ? 'Online' : 'Offline'));
        }
        function changeLanguage(language) { changeLocale(language); }
        document.addEventListener('DOMContentLoaded',function(){syncLocaleSelector();updateLiveChatStatus();});

        let recentlyViewedState = [];
        try { recentlyViewedState = JSON.parse(localStorage.getItem('baliTransRecentlyViewed') || '[]'); } catch(e) { recentlyViewedState = []; }

        function toggleMobileMenu(event) {
            if (event) event.stopPropagation();
            const panel = document.getElementById('mobileMenuPanel');
            const button = document.getElementById('mobileMenuButton');
            const icon = document.getElementById('mobileMenuIcon');
            if (!panel) return;
            const opening = panel.classList.contains('hidden');
            closeHeaderSearch();
            closeLocaleMenu();
            panel.classList.toggle('hidden', !opening);
            if (button) button.setAttribute('aria-expanded', String(opening));
            if (icon) icon.className = opening ? 'fas fa-xmark text-lg' : 'fas fa-bars text-lg';
            const mobileCount = document.getElementById('mobileWishlistCount');
            if (mobileCount && typeof wishlistState !== 'undefined') mobileCount.textContent = '(' + wishlistState.length + ')';
        }
        function closeMobileMenu() {
            const panel = document.getElementById('mobileMenuPanel');
            const button = document.getElementById('mobileMenuButton');
            const icon = document.getElementById('mobileMenuIcon');
            if (panel) panel.classList.add('hidden');
            if (button) button.setAttribute('aria-expanded', 'false');
            if (icon) icon.className = 'fas fa-bars text-lg';
        }
        function toggleHeaderSearch(event) {
            if (event) event.stopPropagation();
            const panel = document.getElementById('headerSearchPanel');
            const button = document.getElementById('headerSearchButton');
            const icon = document.getElementById('headerSearchIcon');
            if (!panel) return;
            const opening = panel.classList.contains('hidden');
            closeMobileMenu();
            closeLocaleMenu();
            panel.classList.toggle('hidden', !opening);
            if (button) button.setAttribute('aria-expanded', String(opening));
            if (icon) icon.className = opening ? 'fas fa-xmark text-lg' : 'fas fa-search text-lg';
            if (opening) setTimeout(() => document.getElementById('headerSearchInput')?.focus(), 30);
            else {
                const dropdown = document.getElementById('searchResultsDropdown');
                if (dropdown) dropdown.classList.add('hidden');
            }
        }
        function closeHeaderSearch() {
            const panel = document.getElementById('headerSearchPanel');
            const button = document.getElementById('headerSearchButton');
            const icon = document.getElementById('headerSearchIcon');
            if (panel) panel.classList.add('hidden');
            if (button) button.setAttribute('aria-expanded', 'false');
            if (icon) icon.className = 'fas fa-search text-lg';
            const dropdown = document.getElementById('searchResultsDropdown');
            if (dropdown) dropdown.classList.add('hidden');
        }
        document.addEventListener('click', function(event) {
            const menuPanel = document.getElementById('mobileMenuPanel');
            const menuButton = document.getElementById('mobileMenuButton');
            const searchPanel = document.getElementById('headerSearchPanel');
            const searchButton = document.getElementById('headerSearchButton');
            const localeControl = document.getElementById('localeControl');
            if (menuPanel && !menuPanel.contains(event.target) && !menuButton?.contains(event.target)) closeMobileMenu();
            if (searchPanel && !searchPanel.contains(event.target) && !searchButton?.contains(event.target)) closeHeaderSearch();
            if (localeControl && !localeControl.contains(event.target)) closeLocaleMenu();
        });
        function showFooterComingSoon(sectionName) {
            showToast('Bali Trans sedang menjalani upgrade menyeluruh. ' + sectionName + ' akan hadir segera. Untuk bantuan sekarang, silakan hubungi tim kami.');
        }

        function showRegisterPrompt() {
            showToast('Pendaftaran akun belum aktif. Untuk bantuan pemesanan, silakan hubungi kami melalui Contact.');
            navigateTo('contact');
        }
        function showHelpMenu() {
            navigateTo('contact');
            setTimeout(() => showToast('Butuh bantuan? Hubungi tim Bali Trans melalui halaman Contact.'), 150);
        }
        function showRecentlyViewed() {
            let modal = document.getElementById('recentlyViewedModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'recentlyViewedModal';
                modal.className = 'fixed inset-0 z-[80] bg-slate-950/50 p-4 flex items-center justify-center';
                modal.innerHTML = '<div class="bg-white w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl p-5 shadow-2xl"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-extrabold text-slate-900">Baru saja dilihat</h3><button onclick="document.getElementById(\'recentlyViewedModal\').remove()" class="w-9 h-9 rounded-full bg-slate-100 text-slate-700" aria-label="Tutup"><i class="fas fa-xmark"></i></button></div><div id="recentlyViewedItems"></div></div>';
                modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
                document.body.appendChild(modal);
            }
            const list = document.getElementById('recentlyViewedItems');
            const items = recentlyViewedState.map(id => (typeof BALI_PACKAGES !== 'undefined' ? BALI_PACKAGES.find(pkg => pkg.id === id) : null)).filter(Boolean);
            list.innerHTML = items.length ? items.map(pkg => '<button class="w-full flex items-center gap-3 text-left p-3 mb-2 rounded-xl border border-slate-100 hover:bg-slate-50" onclick="navigateTo(\'detail\', \'' + pkg.id + '\');document.getElementById(\'recentlyViewedModal\').remove()"><img src="' + pkg.heroImage + '" alt="" class="w-16 h-16 object-cover rounded-lg"><span><strong class="block text-sm text-slate-900">' + pkg.title + '</strong><small class="text-slate-500">' + (pkg.location || 'Bali') + '</small></span></button>').join('') : '<p class="text-sm text-slate-500 text-center py-8">Aktivitas yang baru dilihat akan muncul di sini.</p>';
        }
        function trackRecentlyViewed(pkg) {
            if (!pkg || !pkg.id) return;
            recentlyViewedState = [pkg.id, ...recentlyViewedState.filter(id => id !== pkg.id)].slice(0, 8);
            try { localStorage.setItem('baliTransRecentlyViewed', JSON.stringify(recentlyViewedState)); } catch(e) {}
        }

        function toggleWishlistModal() {
            const modal = document.getElementById('wishlistModal');
            const list = document.getElementById('wishlistItemsList');

            if (modal.classList.contains('hidden')) {
                modal.classList.remove('hidden');
                if (wishlistState.length === 0) {
                    list.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">Your wishlist is currently empty.</p>`;
                } else {
                    list.innerHTML = wishlistState.map(pkg => `
                        <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <div class="flex items-center gap-3">
                                <img src="${pkg.heroImage}" class="w-12 h-12 object-cover rounded-xl">
                                <div>
                                    <h5 class="text-xs font-bold text-slate-900 line-clamp-1">${pkg.title}</h5>
                                    <span class="text-[10px] text-slate-400">${pkg.location}</span>
                                </div>
                            </div>
                            <button onclick="navigateTo('detail', '${pkg.id}'); toggleWishlistModal();" class="text-xs font-bold text-klook-orange hover:underline">View</button>
                        </div>
                    `).join('');
                }
            } else {
                modal.classList.add('hidden');
            }
        }

        function selectPaymentMethod(method) {
            selectedPaymentMethod = method;
            document.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
                const label = input.closest('label');
                if (!label) return;
                label.classList.toggle('border-orange-500', input.checked);
                label.classList.toggle('bg-orange-50/50', input.checked);
                label.classList.toggle('border-slate-200', !input.checked);
            });
        }

        function updateCheckoutPricing() {
            const item = cartState[0];
            if (!item) return;
            const guests = item.guestCount || 1;
            const vehicleInput = document.querySelector('input[name="checkoutVehicle"]:checked');
            const vehicle = vehicleInput ? {
                id: vehicleInput.value,
                name: vehicleInput.dataset.vehicleName || vehicleInput.value,
                surcharge: Number(vehicleInput.dataset.surcharge || 0)
            } : {id: guests >= 6 ? 'hiace' : 'avanza', name: guests >= 6 ? 'Toyota HiAce' : 'Toyota Avanza', surcharge: guests >= 6 ? 500000 : 0};
            if (guests >= 6 && vehicle.id !== 'hiace') {
                const hiace = document.querySelector('input[name="checkoutVehicle"][value="hiace"]');
                if (hiace) hiace.checked = true;
                vehicle.id = 'hiace'; vehicle.name = 'Toyota HiAce'; vehicle.surcharge = 500000;
            }
            const addons = Array.from(document.querySelectorAll('input[name="checkoutAddon"]:checked')).map(input => ({
                id: input.value,
                name: input.dataset.label || input.value,
                priceIDR: Number(input.dataset.price || 0),
                priceMode: input.dataset.mode || 'person'
            }));
            const addonsTotal = addons.reduce((sum, addon) => sum + (addon.priceMode === 'person' ? addon.priceIDR * guests : addon.priceIDR), 0);
            const baseTotal = (item.basePricePerPersonIDR || 462500) * guests;
            const total = baseTotal + vehicle.surcharge + addonsTotal;
            item.vehicleId = vehicle.id;
            item.vehicleName = vehicle.name;
            item.vehicleSurchargeIDR = vehicle.surcharge;
            item.addons = addons;
            item.unitPriceIDR = total;
            const curr = CURRENCY_RATES[currentCurrency];
            const totalEl = document.getElementById('checkoutTotalPrice');
            if (totalEl) totalEl.innerText = curr.format(total);
            const extrasEl = document.getElementById('checkoutExtrasTotal');
            if (extrasEl) extrasEl.innerText = curr.format(vehicle.surcharge + addonsTotal);
            updateBadges();
        }

        const BALI_TRANS_WHATSAPP_NUMBER = '628218187917';

        function sendCheckoutToWhatsApp() {
            if (!BALI_TRANS_WHATSAPP_NUMBER) {
                showToast('Nomor WhatsApp Bali Trans belum diatur. Kirim nomornya agar tombol ini bisa diaktifkan.');
                return;
            }
            const item = cartState[0] || {};
            const curr = CURRENCY_RATES[currentCurrency];
            const addons = (item.addons || []).map(addon => {
                const price = addon.priceMode === 'person' ? addon.priceIDR * (item.guestCount || 1) : addon.priceIDR;
                return '- ' + addon.name + ': ' + curr.format(price);
            });
            const total = item.unitPriceIDR * (item.quantity || 1);
            const message = [
                'Halo Bali Trans, saya ingin menanyakan pemesanan:',
                '',
                'Paket: ' + (item.title || 'Lovina Dolphin Tour'),
                'Link halaman paket: https://baguskristiansianturi.github.io/bali-trans/?tour=lovina-dolphin-tour',
                'Tanggal: ' + (item.date || 'Belum dipilih'),
                'Jumlah tamu: ' + (item.guestCount || 1) + ' orang',
                'Kendaraan: ' + (item.vehicleName || 'Toyota Avanza'),
                'Nama: ' + (checkoutGuestDetails.name || '-'),
                'Email: ' + (checkoutGuestDetails.email || '-'),
                'WhatsApp pemesan: ' + (checkoutGuestDetails.phone || '-'),
                'Lokasi penjemputan: ' + (checkoutGuestDetails.hotel || '-'),
                'Tambahan:',
                ...(addons.length ? addons : ['- Tidak ada']),
                '',
                'Perkiraan total: ' + curr.format(total),
                '',
                'Mohon konfirmasi ketersediaan dan rincian pesanan. Terima kasih.'
            ].join('\n');
            window.open('https://wa.me/' + BALI_TRANS_WHATSAPP_NUMBER.replace(/\D/g, '') + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
        }

        function advanceCheckoutStep(step) {
            if (currentCheckoutStep === 1 && step === 2) {
                const name = document.getElementById('guestName')?.value.trim() || '';
                const email = document.getElementById('guestEmail')?.value.trim() || '';
                const phone = document.getElementById('guestPhone')?.value.trim() || '';
                const hotel = document.getElementById('guestHotel')?.value.trim() || '';
                if (!name || !email || !phone || !hotel) {
                    showToast('Lengkapi nama, email, WhatsApp, dan lokasi penjemputan terlebih dahulu.');
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showToast('Periksa kembali alamat email Anda.');
                    return;
                }
                checkoutGuestDetails = {name, email, phone, hotel};
            }
            currentCheckoutStep = step;
            const container = document.getElementById('checkoutStepContainer');
            const grandTotal = cartState.reduce((sum, item) => sum + (item.unitPriceIDR * item.quantity), 0);
            if (container) container.innerHTML = renderCheckoutStepContent(step, grandTotal);
        }

        function handleGlobalSearch(query) {
            const dropdown = document.getElementById('searchResultsDropdown');
            if (!dropdown) return;
            const term = String(query || '').trim().toLocaleLowerCase();
            if (!term) {
                dropdown.classList.add('hidden');
                dropdown.innerHTML = '';
                return;
            }
            const packages = Array.isArray(BALI_PACKAGES) ? BALI_PACKAGES : [];
            const matches = packages.filter(p => {
                const haystack = [p.title, p.location, p.categoryName, p.category, p.description]
                    .filter(Boolean).join(' ').toLocaleLowerCase();
                return haystack.includes(term);
            }).slice(0, 8);
            dropdown.classList.remove('hidden');
            if (matches.length) {
                dropdown.innerHTML = matches.map(m => {
                    const id = String(m.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
                    const title = String(m.title || 'Bali experience').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
                    const location = String(m.location || '').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
                    const image = String(m.heroImage || '');
                    return `<button type="button" onclick="navigateTo('detail', '${id}'); closeHeaderSearch();" class="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-3"><img src="${image}" alt="" class="w-10 h-10 object-cover rounded-lg"><span class="min-w-0"><span class="block text-xs font-extrabold text-slate-900 line-clamp-1">${title}</span><span class="block text-[10px] text-slate-500">${location}</span></span></button>`;
                }).join('');
            } else {
                dropdown.innerHTML = `<div class="p-3 text-xs text-slate-500 text-center">No experiences found for “${term.replace(/[&<>"]/g, '')}”</div>`;
            }
        }

        function executeHeroSearch() {
            const input = document.getElementById('heroSearchInput');
            const query = String(input?.value || '').trim().toLocaleLowerCase();
            filterByCategory('all');
            navigateTo('packages');
            if (query) {
                setTimeout(() => {
                    const target = document.getElementById('packageSearchInput') || document.getElementById('packagesSearchInput');
                    if (target) {
                        target.value = query;
                        target.dispatchEvent(new Event('input', { bubbles: true }));
                    } else if (typeof handleGlobalSearch === 'function') {
                        const headerInput = document.getElementById('headerSearchInput');
                        if (headerInput) headerInput.value = query;
                    }
                }, 100);
            }
        }

        function quickFilterSearch(cat) {
            filterByCategory(cat);
            navigateTo('packages');
        }

        function updateBadges() {
            const cartCount = cartState.reduce((sum, i) => sum + i.quantity, 0);
            const cartTotal = cartState.reduce((sum, i) => sum + (i.unitPriceIDR * i.quantity), 0);
            const curr = CURRENCY_RATES[currentCurrency];

            document.getElementById('cartCountBadge').innerText = cartCount;
            document.getElementById('mobileCartBadge').innerText = cartCount;
            document.getElementById('cartHeaderSubtotal').innerText = curr.format(cartTotal);
            document.getElementById('wishlistCountBadge').innerText = wishlistState.length;
        }

        function showToast(msg) {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = 'bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0';
            toast.innerHTML = `<i class="fas fa-info-circle text-klook-orange"></i> ${msg}`;
            
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
            }, 10);

            setTimeout(() => {
                toast.classList.add('opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        function initHomeInteractivity() {
            // Flash sale countdown timer logic
            let timerSeconds = 30252;
            const timerElem = document.getElementById('countdownTimer');
            if (timerElem) {
                setInterval(() => {
                    timerSeconds--;
                    const h = Math.floor(timerSeconds / 3600);
                    const m = Math.floor((timerSeconds % 3600) / 60);
                    const s = timerSeconds % 60;
                    timerElem.innerText = `Offer ends in: ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
                }, 1000);
            }
        }

        function copyArticleLink() {
            const link = window.location.href;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(link).then(() => showToast('Article link copied')).catch(() => window.prompt('Copy this article link:', link));
            } else {
                window.prompt('Copy this article link:', link);
            }
        }

        /* INITIAL APP LAUNCH */
        window.addEventListener('DOMContentLoaded', () => renderLocationFromUrl({ scroll: false }));
