/* ==========================================================================
           4. INTERACTIVE EVENT HANDLERS & HELPERS
           ========================================================================== */
        
        let currentDetailQty = 1;
        let selectedPaymentMethod = 'bank-transfer';
        let checkoutGuestDetails = {};

        function changeCurrency(val){changeLocale(({IDR:'id',MYR:'ms',SGD:'sg',USD:'en',AED:'ar',INR:'hi'})[val]||'id');}

        function filterByCategory(cat) {
            selectedCategoryFilter = cat || 'all';
            if (document.getElementById('packageCatalogResults')) filterPackageCatalog(window.packageCatalogQuery || '');
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
            const appContainer = document.getElementById('appContainer');
            const featuredGrid = document.getElementById('homeFeaturedGrid');
            if (appContainer && featuredGrid && appContainer.innerHTML.includes('Trending Bali Activities')) {
                featuredGrid.innerHTML = renderPackageCards(BALI_PACKAGES);
            }
        }

        const BALI_TRANSLATIONS = {"Explore Bali":"Jelajahi Bali","Discover Bali tours, island trips and private transport.":"Temukan tur Bali, perjalanan antarpulau, dan transportasi privat.","Plan your Bali trip":"Rencanakan perjalanan Anda di Bali","WhatsApp Concierge":"Bantuan WhatsApp","TOURS · TRIPS · TRANSFER":"TUR · PERJALANAN · TRANSFER","Search activities, tours, or spots (e.g. Ubud, ATV)...":"Cari aktivitas, tur, atau tempat (mis. Ubud, ATV)...","Home":"Beranda","Tours & Services":"Tur & Layanan","About Us":"Tentang Kami","Contact":"Kontak","My Bookings":"Pesanan Saya","Help":"Bantuan","Register":"Mendaftar","Wishlist":"Favorit","Recently Viewed":"Baru Saja Dilihat","Create Account":"Buat Akun","Tours":"Tur","Activities":"Aktivitas","Private Transport":"Transportasi Privat","Discover":"Jelajahi","Explore":"Jelajahi","Book now":"Pesan sekarang","Book Now":"Pesan Sekarang","View details":"Lihat detail","View Details":"Lihat Detail","View all":"Lihat semua","See all":"Lihat semua","Learn more":"Pelajari lebih lanjut","Read more":"Baca selengkapnya","From":"Mulai dari","per person":"per orang","Popular":"Populer","Popular tours":"Tur populer","Top destinations":"Destinasi pilihan","Find your next Bali experience":"Temukan pengalaman Bali berikutnya","Discover Bali":"Jelajahi Bali","What would you like to do?":"Apa yang ingin Anda lakukan?","No packages found for this filter.":"Tidak ada paket untuk filter ini.","Add to wishlist":"Tambahkan ke favorit","Remove from wishlist":"Hapus dari favorit","Your wishlist is currently empty.":"Daftar favorit Anda masih kosong.","Recently viewed":"Baru saja dilihat","Need help?":"Butuh bantuan?","Send message":"Kirim pesan","Send Message":"Kirim Pesan","Your name":"Nama Anda","Email address":"Alamat email","Phone number":"Nomor telepon","Message":"Pesan","Submit":"Kirim","Adults":"Dewasa","Children":"Anak-anak","Select date":"Pilih tanggal","Choose date":"Pilih tanggal","Continue":"Lanjutkan","Back":"Kembali","Your cart is empty":"Keranjang Anda kosong","Shopping cart":"Keranjang belanja","Checkout":"Pembayaran","Total":"Total","Subtotal":"Subtotal","Booking details":"Detail pemesanan","Guest details":"Data pemesan","Payment method":"Metode pembayaran","Confirm booking":"Konfirmasi pemesanan","Details & options":"Data & pilihan","WhatsApp confirmation":"Konfirmasi WhatsApp","Customize your trip":"Sesuaikan perjalanan","Vehicle & optional activities":"Kendaraan & aktivitas tambahan","Package prices are per person. Options below update your booking total.":"Harga paket dihitung per orang. Pilihan di bawah langsung mengubah total pemesanan.","Choose a vehicle":"Pilih kendaraan","Minibus for 6–7 guests":"Minibus untuk 6–7 tamu","Standard for 1–5 guests":"Standar untuk 1–5 tamu","Comfort upgrade":"Upgrade kenyamanan","Larger minibus":"Minibus berukuran lebih besar","Included in base price":"Termasuk dalam harga dasar"," / trip":" / perjalanan","For 6–7 guests, a HiAce is selected for capacity. Smaller vehicles are not available.":"Untuk 6–7 tamu, kendaraan ditetapkan ke HiAce demi kapasitas. Pilihan mobil yang lebih kecil tidak tersedia.","Add activities (optional)":"Tambahkan aktivitas (opsional)","Tanah Lot stop":"Persinggahan Tanah Lot","Add a Tanah Lot visit as a stop at the end of the trip before returning to your drop-off location.":"Tambahkan kunjungan ke Tanah Lot sebagai persinggahan di akhir perjalanan sebelum kembali ke lokasi pengantaran.","Add to trip":"Tambahkan ke perjalanan","Add snorkelling as part of your Lovina marine experience.":"Tambahkan aktivitas snorkeling sebagai bagian dari pengalaman laut di Lovina.","Optional activities depend on operator rules and local safety conditions.":"Pilihan aktivitas tambahan mengikuti aturan operator dan kondisi keselamatan di lokasi.","Vehicle & extras":"Kendaraan & tambahan","Trip total":"Total perjalanan","Prices update automatically when you change the vehicle or activities.":"Harga akan diperbarui otomatis ketika kendaraan atau aktivitas diubah.","Full name":"Nama lengkap","WhatsApp number":"Nomor WhatsApp","Pickup location":"Lokasi penjemputan","Step 2 of 2":"Langkah 2 dari 2","Review your booking":"Periksa pesanan Anda","Check your selections. When you continue, these details will be prepared to send to Bali Trans via WhatsApp.":"Pastikan pilihan sudah sesuai. Saat dilanjutkan, rincian ini akan disiapkan untuk dikirim melalui WhatsApp Bali Trans.","Number of guests":"Jumlah tamu","people":"orang","Vehicle":"Kendaraan","Name":"Nama","Estimated total":"Perkiraan total","Send to WhatsApp":"Kirim ke WhatsApp","Booking name":"Nama pemesan","Booking total":"Total pemesanan","Availability, payment details, and final confirmation must be agreed with Bali Trans before travel.":"Ketersediaan, detail pembayaran, dan konfirmasi akhir tetap perlu disepakati dengan Bali Trans sebelum perjalanan.","Back to payment":"Kembali ke pembayaran","Back to home":"Kembali ke beranda","Included":"Termasuk","Highlights":"Keunggulan","Itinerary":"Rencana perjalanan","What's included":"Yang termasuk","Important information":"Informasi penting","Cancellation policy":"Kebijakan pembatalan","Location":"Lokasi","Duration":"Durasi","Reviews":"Ulasan","Why choose us?":"Mengapa memilih kami?","Contact us":"Hubungi kami","Contact Us":"Hubungi Kami","About Bali Trans":"Tentang Bali Trans","Loading...":"Memuat...","Destinations":"Destinasi","Transport service":"Layanan transportasi","Travel guides":"Panduan perjalanan","About":"Tentang","Live Chat":"Obrolan langsung","Offline":"Tidak tersedia","Popular experiences":"Pengalaman populer","Trending Bali Activities":"Aktivitas Bali yang sedang populer","Experiences to start planning with":"Pengalaman untuk mulai direncanakan","Review the available details and confirm prices, routes and availability with the team.":"Tinjau detail yang tersedia dan konfirmasikan harga, rute, serta ketersediaan bersama tim.","All activities":"Semua aktivitas","Trip ideas":"Ide perjalanan","Useful guides before you go":"Panduan berguna sebelum berangkat","Start exploring":"Mulai menjelajah","Airport transfer":"Antar jemput bandara","Port transfer":"Antar jemput pelabuhan","Intercity transfer":"Antar kota","Private day tour":"Tur privat sehari","Explore destinations":"Jelajahi destinasi","Explore destinations across Bali":"Jelajahi berbagai destinasi di Bali","Read travel guides":"Baca panduan perjalanan","View all guides":"Lihat semua panduan","See all tours":"Lihat semua tur","Why travel with Bali Trans?":"Mengapa bepergian bersama Bali Trans?","Plan your trip with confidence":"Rencanakan perjalanan dengan lebih yakin","Choose your journey":"Pilih perjalanan Anda","Private rides for your own group.":"Perjalanan privat untuk rombongan Anda sendiri.","From airport arrivals and harbour pickups to journeys between towns and private day tours, choose the service that fits your plans.":"Dari penjemputan bandara dan pelabuhan hingga perjalanan antar kota dan tur privat sehari, pilih layanan yang sesuai rencana Anda.","Contact our team":"Hubungi tim kami","Talk to our team":"Hubungi tim kami","Make an enquiry":"Ajukan pertanyaan","Your Bali trip, made easier":"Perjalanan Bali Anda jadi lebih mudah","Browse tours and activities":"Jelajahi tur dan aktivitas","Learn about Bali":"Pelajari tentang Bali","All destinations":"Semua destinasi","All tours & activities":"Semua tur & aktivitas","Continue shopping":"Lanjutkan menjelajah","Proceed to checkout":"Lanjut ke pembayaran","Remove":"Hapus","Update":"Perbarui","Select language and currency":"Pilih bahasa dan mata uang","Language and currency":"Bahasa dan mata uang","Indonesia":"Indonesia","Bahasa Melayu":"Bahasa Melayu","English":"English","Arabic":"Bahasa Arab","Hindi":"Bahasa Hindi","Singapore English":"Bahasa Inggris Singapura","Singapore English · SGD (S$)":"Bahasa Inggris Singapura · SGD (S$)",
"Search Bali Trans tours and services":"Cari tur dan layanan Bali Trans",
"Search tours, activities or places...":"Cari tur, aktivitas, atau tempat...",
"Open menu":"Buka menu",
"Close menu":"Tutup menu",
"Search":"Cari",
"Search activities, tours, or spots":"Cari aktivitas, tur, atau tempat",
"Help centre":"Pusat bantuan",
"Help Centre":"Pusat Bantuan",
"Travel guides":"Panduan perjalanan",
"Recently viewed":"Baru dilihat",
"Recently Viewed":"Baru Dilihat",
"Log in":"Masuk",
"Log out":"Keluar",
"Create account":"Buat akun",
"Create Account":"Buat Akun",
"Language and currency":"Bahasa dan mata uang",
"Select language and currency":"Pilih bahasa dan mata uang",
"Bahasa Indonesia · IDR":"Bahasa Indonesia · IDR",
"English · USD ($)":"English · USD ($)",
"Discover":"Jelajahi",
"Plan your trip":"Rencanakan perjalanan",
"Discover Bali":"Jelajahi Bali",
"All tours & activities":"Semua tur & aktivitas",
"All tours and activities":"Semua tur dan aktivitas",
"Talk to our team":"Hubungi tim kami",
"Planning something special in Bali?":"Merencanakan sesuatu yang istimewa di Bali?",
"Tell us your destination, dates and group size.":"Beri tahu kami destinasi, tanggal, dan jumlah rombongan Anda.",
"Discover Bali tours, local experiences and private transport. Compare trip details and contact our team to discuss your plans before booking.":"Temukan tur Bali, pengalaman lokal, dan transportasi privat. Pelajari detail perjalanan dan hubungi tim kami sebelum memesan.",
"Explore Bali":"Jelajahi Bali",
"Your trip, your way":"Perjalanan sesuai keinginan Anda",
"FULL DAY TOUR · NORTH BALI":"TUR SEHARI PENUH · BALI UTARA",
"Lovina Sunrise & North Bali Highlights":"Menyaksikan Matahari Terbit di Lovina & Destinasi Unggulan Bali Utara",
"Start before dawn for an unforgettable dolphin-watching experience, then explore North Bali’s scenic highlands, lakeside temple and iconic viewpoints.":"Mulai perjalanan sebelum fajar untuk mencari lumba-lumba di Lovina, lalu jelajahi dataran tinggi Bali Utara, pura di tepi danau, dan titik panorama ikonis.",
"Full day":"Sehari penuh",
"Private transport":"Transportasi privat",
"Flexible options":"Pilihan fleksibel",
"Choose your package":"Pilih paket Anda",
"Wild dolphin watching":"Mengamati lumba-lumba liar",
"A sunrise boat trip in Lovina, in the dolphins’ natural habitat.":"Perjalanan perahu saat matahari terbit di Lovina, di habitat alami lumba-lumba.",
"North Bali highlights":"Destinasi unggulan Bali Utara",
"Lake viewpoints, mountain scenery and cultural landmarks.":"Panorama danau, pemandangan pegunungan, dan landmark budaya.",
"Family-friendly pace":"Nyaman untuk keluarga",
"A private vehicle and a clearly planned day.":"Kendaraan privat dan rencana perjalanan yang tertata.",
"Choose your package, vehicle upgrade and available add-ons.":"Pilih paket, peningkatan kendaraan, dan aktivitas tambahan yang tersedia.",
"YOUR NORTH BALI EXPERIENCE":"PENGALAMAN ANDA DI BALI UTARA",
"A sunrise encounter, followed by North Bali’s most scenic stops":"Pengalaman saat matahari terbit, dilanjutkan ke destinasi indah Bali Utara",
"Your day begins before dawn with a drive to Lovina for a sunrise boat trip in search of wild dolphins. Once back on shore, the route continues into North Bali’s highlands for lake views, a photo stop at Handara Gate and a visit to Ulun Danu Beratan Temple.":"Hari dimulai sebelum fajar dengan perjalanan menuju Lovina untuk mencari lumba-lumba liar dari perahu saat matahari terbit. Setelah kembali ke pantai, perjalanan berlanjut ke dataran tinggi Bali Utara untuk menikmati panorama danau, berfoto di Handara Gate, dan mengunjungi Ulun Danu Beratan Temple.",
"With private transport for your group, you can explore these highlights in one planned day without joining a shared road tour. The schedule is an estimate and may change with your pickup location, traffic, weather or access at each stop.":"Dengan transportasi privat untuk rombongan Anda, berbagai destinasi ini dapat dijelajahi dalam satu perjalanan tanpa bergabung dengan rombongan lain. Jadwal merupakan perkiraan dan dapat berubah mengikuti lokasi penjemputan, lalu lintas, cuaca, atau akses di setiap tempat.",
"Choose the Regular Private Tour if you prefer to pay separately for activities and meals, or the All-Inclusive Tour for the listed boat trip, attraction tickets and meals arranged in advance. Vehicle upgrades and optional stops can be requested when booking.":"Pilih Regular Private Tour jika ingin membayar aktivitas dan makanan secara terpisah, atau All-Inclusive Tour untuk paket yang mencakup perjalanan perahu, tiket atraksi, dan makanan yang diatur sebelumnya. Peningkatan kendaraan dan persinggahan tambahan dapat diminta saat memesan.",
"THE JOURNEY":"RANGKAIAN PERJALANAN",
"Itinerary":"Rencana Perjalanan",
"Follow the day from your early pickup to the sunrise boat trip, then continue through North Bali’s highlands. Times are estimates; traffic, weather and access can affect the order and duration of stops.":"Ikuti perjalanan sejak penjemputan dini hari dan aktivitas perahu saat matahari terbit, lalu lanjutkan ke dataran tinggi Bali Utara. Waktu bersifat perkiraan; lalu lintas, cuaca, dan akses dapat memengaruhi urutan serta durasi kunjungan.",
"Private hotel pickup":"Penjemputan privat di hotel",
"Meet your private driver at the agreed pickup point. The early departure allows time to reach Lovina before sunrise; your exact pickup time depends on your location.":"Temui pengemudi privat di titik penjemputan yang disepakati. Keberangkatan dini membantu Anda tiba di Lovina sebelum matahari terbit; waktu pasti bergantung pada lokasi Anda.",
"Arrive at Lovina Beach":"Tiba di Pantai Lovina",
"Arrive on Lovina’s coast, meet your boat operator and receive a short briefing before boarding for the morning trip.":"Tiba di pesisir Lovina, bertemu operator perahu, dan mengikuti pengarahan singkat sebelum berangkat.",
"Sunrise dolphin watching":"Mengamati lumba-lumba saat matahari terbit",
"Set out by traditional outrigger boat as the sun rises. Watch for wild dolphins in their natural habitat; sightings depend on nature and cannot be guaranteed.":"Berangkat dengan perahu cadik tradisional saat matahari terbit untuk mencari lumba-lumba di habitat alaminya. Kemunculan lumba-lumba bergantung pada alam dan tidak dapat dijamin.",
"Wanagiri Hidden Hill":"Wanagiri Hidden Hill",
"Stop at a highland viewpoint for sweeping views of Lake Buyan, Lake Tamblingan and the green hills of North Bali.":"Berhenti di titik panorama dataran tinggi untuk melihat Danau Buyan, Danau Tamblingan, dan perbukitan hijau Bali Utara.",
"Handara Gate":"Handara Gate",
"Take photos at the distinctive Handara Gate, framed by Bedugul’s cool mountain landscape. Visit duration depends on access and local conditions.":"Berfoto di Handara Gate yang ikonis, dengan latar pegunungan sejuk Bedugul. Durasi kunjungan bergantung pada akses dan kondisi setempat.",
"Ulun Danu Beratan Temple":"Ulun Danu Beratan Temple",
"Visit the lakeside temple complex and gardens beside Lake Beratan, known for its tranquil setting and mountain backdrop. Entry is subject to opening and access conditions.":"Kunjungi kompleks pura dan taman di tepi Danau Beratan, yang dikenal dengan suasana tenang dan latar pegunungan. Kunjungan mengikuti jam buka dan kondisi akses.",
"Lunch break":"Istirahat makan siang",
"Take a break for lunch at a local restaurant. Lunch is included with the All-Inclusive package; Regular package guests pay for their own meal.":"Beristirahat untuk makan siang di restoran lokal. Makan siang termasuk dalam paket All-Inclusive; tamu paket Regular membayar makanan sendiri.",
"Return to your hotel":"Kembali ke hotel",
"Travel back to your drop-off point in your private vehicle. The arrival time depends on your pickup area, traffic and any agreed extra stops.":"Kembali ke titik pengantaran dengan kendaraan privat. Waktu tiba bergantung pada area penjemputan, lalu lintas, dan persinggahan tambahan yang disepakati.",
"Places to visit":"Tempat yang Dikunjungi",
"What you’ll see along the route":"Destinasi yang akan Anda lihat sepanjang perjalanan",
"Lovina’s black-sand coastline is the starting point for the early-morning boat trip to look for wild dolphins.":"Pesisir pasir hitam Lovina menjadi titik awal perjalanan perahu dini hari untuk mencari lumba-lumba liar.",
"A traditional boat trip at sunrise to observe wild dolphins from the sea.":"Perjalanan perahu tradisional saat matahari terbit untuk mengamati lumba-lumba liar dari laut.",
"A scenic highland stop with views across Lake Buyan, Lake Tamblingan and the surrounding forested hills.":"Persinggahan di dataran tinggi dengan panorama Danau Buyan, Danau Tamblingan, dan perbukitan berhutan.",
"A striking Balinese-style gate and popular photo stop in the cool highlands of Bedugul.":"Gerbang bergaya Bali yang khas dan lokasi berfoto populer di dataran tinggi Bedugul yang sejuk.",
"A lakeside temple complex beside Lake Beratan, with gardens and mountain scenery that make it one of Bedugul’s best-known landmarks.":"Kompleks pura di tepi Danau Beratan dengan taman dan pemandangan pegunungan, salah satu landmark paling dikenal di Bedugul.",
"View details":"Lihat detail",
"TWO WAYS TO EXPLORE":"DUA PILIHAN UNTUK MENJELAJAH",
"Both packages follow the same planned itinerary and destinations. Choose the level of inclusions that suits your trip.":"Kedua paket mengikuti rencana perjalanan dan destinasi yang sama. Pilih cakupan layanan yang paling sesuai dengan perjalanan Anda.",
"Same itinerary":"Rencana perjalanan sama",
"Different inclusions":"Cakupan layanan berbeda",
"Your comfort, your choice":"Kenyamanan Anda, pilihan Anda",
"MOST CONVENIENT":"PALING PRAKTIS",
"All-Inclusive Tour":"Tur All-Inclusive",
"Everything arranged in one package, so you can enjoy the trip without handling tickets or meal arrangements yourself.":"Semua diatur dalam satu paket, sehingga Anda dapat menikmati perjalanan tanpa perlu mengurus tiket atau pengaturan makanan sendiri.",
"adult · local rate. International adult:":"dewasa · harga lokal. Harga dewasa internasional:",
"Minimum 2 guests; children aged 4–5 are 60% of adult rate, under 4 travel free.":"Minimal 2 tamu; anak usia 4–5 tahun membayar 60% tarif dewasa, sedangkan anak di bawah 4 tahun gratis.",
"Private vehicle and driver":"Kendaraan privat dan pengemudi",
"Private dolphin-watching boat":"Perahu privat untuk mengamati lumba-lumba",
"All attraction tickets arranged — no need to queue":"Semua tiket atraksi diatur — tanpa perlu mengantre",
"Breakfast, lunch and mineral water":"Sarapan, makan siang, dan air mineral",
"Book this package":"Pesan paket ini",
"Custom request":"Permintaan khusus",
"FLEXIBLE SPENDING":"PENGELUARAN LEBIH FLEKSIBEL",
"Regular Private Tour":"Tur Privat Regular",
"Private vehicle and driver for the planned route. Arrange and pay for the dolphin boat, attraction tickets and meals separately as you go.":"Kendaraan privat dan pengemudi untuk rute yang direncanakan. Atur dan bayar perahu lumba-lumba, tiket atraksi, serta makanan secara terpisah selama perjalanan.",
"vehicle · sample route-based rate":"kendaraan · contoh tarif berdasarkan rute",
"Fuel, parking and planned route":"Bahan bakar, parkir, dan rute yang direncanakan",
"Dolphin-watching boat":"Perahu untuk mengamati lumba-lumba",
"Attraction tickets and meals":"Tiket atraksi dan makanan",
"CUSTOMISE YOUR TOUR":"SESUAIKAN TUR ANDA",
"Choose your vehicle and optional extras":"Pilih kendaraan dan tambahan opsional",
"Your Regular car is the default before any upgrade. Tell us your group size and preferred extras; we will confirm availability, route timing and the final price before your booking is accepted.":"Mobil Regular menjadi pilihan awal sebelum peningkatan kendaraan. Beri tahu jumlah rombongan dan tambahan yang diinginkan; kami akan mengonfirmasi ketersediaan, waktu rute, dan harga akhir sebelum pesanan diterima.",
"Regular car by default":"Mobil Regular sebagai pilihan awal",
"Premium & Minivan upgrades":"Upgrade mobil Premium & Minivan",
"Optional sea activities":"Aktivitas laut opsional",
"Vehicle upgrades":"Peningkatan kendaraan",
"Premium car (Innova Reborn/Zenix) or Minivan (HiAce Commuter/Premio) for larger groups, extra luggage or added comfort.":"Mobil Premium (Innova Reborn/Zenix) atau Minivan (HiAce Commuter/Premio) untuk rombongan lebih besar, bagasi tambahan, atau kenyamanan ekstra.",
"Optional add-ons":"Tambahan opsional",
"Ask about snorkelling, swimming activities or an extra sightseeing stop. Activities depend on sea conditions and route feasibility.":"Tanyakan tentang snorkeling, aktivitas berenang, atau persinggahan wisata tambahan. Aktivitas bergantung pada kondisi laut dan kelayakan rute.",
"Have children, a larger group or a special request? Send your preferred date, pickup area, guest count and package choice so we can confirm a suitable arrangement.":"Bepergian dengan anak-anak, rombongan besar, atau memiliki kebutuhan khusus? Kirim tanggal, area penjemputan, jumlah tamu, dan pilihan paket agar kami dapat mengonfirmasi pengaturan yang sesuai.",
"Request a custom tour":"Ajukan permintaan tur khusus",
"BEFORE YOU GO":"SEBELUM BERANGKAT",
"Important information":"Informasi penting",
"Early pickup & duration":"Penjemputan dini & durasi",
"Pickup is generally around 03:30 AM for South Bali and nearby areas. The full day typically takes about 11–15 hours, depending on your hotel location, traffic and stops.":"Penjemputan untuk Bali Selatan dan area sekitarnya umumnya sekitar pukul 03.30. Perjalanan berlangsung sekitar 11–15 jam, bergantung pada lokasi hotel, lalu lintas, dan persinggahan.",
"Pickup areas":"Area penjemputan",
"Pickup can be arranged for common tourist areas including Kuta, Seminyak, Legian, Sanur, Nusa Dua, Jimbaran, Canggu, Ubud, Denpasar and the airport. Confirm other areas with us before booking.":"Penjemputan dapat diatur di area wisata seperti Kuta, Seminyak, Legian, Sanur, Nusa Dua, Jimbaran, Canggu, Ubud, Denpasar, dan bandara. Konfirmasikan area lainnya sebelum memesan.",
"Wildlife & sea conditions":"Satwa liar & kondisi laut",
"Dolphins are wild animals, so sightings cannot be guaranteed. Boat trips depend on weather and sea conditions; follow the local boat operator’s safety instructions.":"Lumba-lumba adalah satwa liar sehingga kemunculannya tidak dapat dijamin. Perjalanan perahu bergantung pada cuaca dan kondisi laut; ikuti arahan keselamatan operator setempat.",
"Private tour":"Tur privat",
"Your tour and road transport are private to your booking group, not combined with other guests.":"Tur dan transportasi darat hanya untuk rombongan Anda, tidak digabung dengan tamu lain.",
"What to bring":"Yang perlu dibawa",
"Light jacket for the early morning, sun protection, comfortable shoes, a little cash for personal expenses and a change of clothes if needed.":"Jaket ringan untuk pagi hari, pelindung matahari, sepatu nyaman, uang tunai untuk keperluan pribadi, dan pakaian ganti bila diperlukan.",
"WHAT YOUR PRICE COVERS":"APA SAJA YANG TERMASUK DALAM HARGA",
"Know the difference":"Pahami perbedaannya",
"Regular Private Tour:":"Regular Private Tour:",
"private vehicle, driver, fuel, parking and planned route are included. Dolphin boat, entrance tickets and meals are paid separately.":"kendaraan privat, pengemudi, bahan bakar, parkir, dan rute yang direncanakan sudah termasuk. Perahu lumba-lumba, tiket masuk, dan makanan dibayar terpisah.",
"All-Inclusive Tour:":"All-Inclusive Tour:",
"private vehicle, driver, private dolphin boat, all listed entrance tickets, breakfast, lunch and mineral water are included. We arrange the details for you.":"kendaraan privat, pengemudi, perahu lumba-lumba privat, semua tiket masuk yang tercantum, sarapan, makan siang, dan air mineral sudah termasuk. Kami mengatur detailnya untuk Anda.",
"FAQ":"Tanya Jawab",
"Frequently asked questions":"Pertanyaan yang sering diajukan",
"Practical answers before you choose your package.":"Jawaban praktis sebelum memilih paket.",
"What time does the tour start?":"Pukul berapa tur dimulai?",
"Pickup is generally around 03:30 AM, depending on your hotel or villa location. The early departure helps you reach Lovina before the sunrise boat trip.":"Penjemputan umumnya sekitar pukul 03.30, bergantung pada lokasi hotel atau vila. Keberangkatan dini membantu Anda tiba di Lovina sebelum perjalanan perahu saat matahari terbit.",
"Are dolphin sightings guaranteed?":"Apakah lumba-lumba pasti terlihat?",
"No. Dolphins are wild animals in their natural habitat, so sightings cannot be guaranteed. Boat operations also depend on weather and sea conditions.":"Tidak. Lumba-lumba hidup bebas di habitat alaminya sehingga kemunculannya tidak dapat dijamin. Perjalanan perahu juga bergantung pada cuaca dan kondisi laut.",
"What is included in the All-Inclusive package?":"Apa saja yang termasuk dalam paket All-Inclusive?",
"Private vehicle and driver, private dolphin-watching boat, all listed attraction tickets, breakfast, lunch and mineral water. We arrange the tickets and meal plan for you.":"Kendaraan privat dan pengemudi, perahu privat untuk mengamati lumba-lumba, semua tiket atraksi yang tercantum, sarapan, makan siang, dan air mineral. Kami mengatur tiket dan rencana makan untuk Anda.",
"What do I pay separately with the Regular package?":"Apa yang perlu dibayar terpisah pada paket Regular?",
"Boat fees, entrance tickets, meals, personal expenses and optional activities are paid separately. This gives you more flexibility over where and what you spend.":"Biaya perahu, tiket masuk, makanan, pengeluaran pribadi, dan aktivitas opsional dibayar terpisah. Anda jadi lebih leluasa menentukan pengeluaran.",
"Can children join the tour?":"Apakah anak-anak dapat mengikuti tur?",
"Families can request this tour, but please tell us the children’s ages when booking. Activity suitability and boat safety rules are subject to the local operator.":"Keluarga dapat memesan tur ini. Mohon informasikan usia anak saat memesan. Kesesuaian aktivitas dan aturan keselamatan perahu mengikuti ketentuan operator setempat.",
"Can I request a different vehicle or extra stops?":"Bisakah saya meminta kendaraan lain atau persinggahan tambahan?",
"Yes. Request a Premium car, Minivan or additional stop. We will confirm availability, extra cost and timing.":"Bisa. Anda dapat meminta mobil Premium, Minivan, atau persinggahan tambahan. Kami akan mengonfirmasi ketersediaan, biaya tambahan, dan waktunya.",
"When is my booking confirmed?":"Kapan pemesanan saya dikonfirmasi?",
"Submitting a request does not by itself confirm availability. Bali Trans should confirm the date, pickup details, package inclusions and final price with you before the tour is considered confirmed.":"Mengirim permintaan belum berarti ketersediaan terkonfirmasi. Bali Trans akan mengonfirmasi tanggal, detail penjemputan, cakupan paket, dan harga akhir sebelum tur dinyatakan terkonfirmasi.",
"READY FOR YOUR NEXT ADVENTURE?":"SIAP UNTUK PETUALANGAN BERIKUTNYA?",
"Book your Bali Dolphin Tour":"Pesan Bali Dolphin Tour Anda",
"Choose your package, select your vehicle and request any extras. We’ll confirm the final details with you.":"Pilih paket, kendaraan, dan tambahan yang diinginkan. Kami akan mengonfirmasi detail akhirnya bersama Anda.",
"KEEP EXPLORING":"LANJUTKAN PENJELAJAHAN",
"More Full Day Tours":"Tur Sehari Penuh Lainnya",
"Choose another planned day experience around Bali.":"Pilih pengalaman wisata sehari lainnya di Bali.",
"GO A LITTLE FURTHER":"JELAJAHI LEBIH JAUH",
"Long Trips":"Perjalanan Jarak Jauh",
"Longer journeys with different travel times and logistics.":"Perjalanan lebih panjang dengan durasi dan pengaturan yang berbeda.",
"Full day tour":"Tur sehari penuh",
"North Bali":"Bali Utara",
"South Bali":"Bali Selatan",
"Your wishlist is currently empty.":"Daftar favorit Anda masih kosong.",
"Recently viewed items will appear here.":"Aktivitas yang baru dilihat akan muncul di sini.",
"Pickup location":"Lokasi penjemputan",
"Drop-off location":"Lokasi pengantaran",
"Date of travel":"Tanggal perjalanan",
"Select date":"Pilih tanggal",
"Number of guests":"Jumlah tamu",
"Choose a package":"Pilih paket",
"Vehicle upgrade":"Peningkatan kendaraan",
"Optional activity":"Aktivitas opsional",
"Estimated total":"Perkiraan total",
"Booking request":"Permintaan pemesanan",
"Your booking request":"Permintaan pemesanan Anda",
"Booking summary":"Ringkasan pemesanan",
"Please complete this field.":"Mohon isi kolom ini.",
"Required":"Wajib diisi",
"Optional":"Opsional",
"Please select":"Silakan pilih",
"Choose an option":"Pilih opsi",
"Previous":"Sebelumnya",
"Next":"Berikutnya",
"Save changes":"Simpan perubahan",
"Cancel":"Batal",
"Close":"Tutup",
"Open":"Buka",
"Loading":"Memuat",
"Loading...":"Memuat...",
"Error":"Terjadi kesalahan",
"Try again":"Coba lagi",
"See details":"Lihat detail",
"Show more":"Tampilkan lebih banyak",
"Show less":"Tampilkan lebih sedikit",
"Read travel guides":"Baca panduan perjalanan",
"Contact our team":"Hubungi tim kami",
"Contact us":"Hubungi kami",
"About Bali Trans":"Tentang Bali Trans",
"Terms & conditions":"Syarat & ketentuan",
"Privacy policy":"Kebijakan privasi",
"Your account":"Akun Anda",
"Booking assistance":"Bantuan pemesanan",
"Help & support":"Bantuan & dukungan",
"Continue as guest":"Lanjutkan sebagai tamu",
"Home":"Beranda",
"Activities":"Aktivitas",
"Guides":"Panduan",
"Cart":"Keranjang",
"Explore":"Jelajahi",
"Payment details":"Detail pembayaran",
"Price per person":"Harga per orang",
"per adult":"per dewasa",
"per child":"per anak",
"per vehicle":"per kendaraan",
"from":"mulai dari",
"Not included":"Tidak termasuk",
"Included in the package":"Termasuk dalam paket",
"Price includes":"Harga sudah termasuk",
"Price excludes":"Harga belum termasuk",
"Pickup time":"Waktu penjemputan",
"Return time":"Waktu kembali",
"Approximate time":"Perkiraan waktu",
"Schedule may change":"Jadwal dapat berubah",
"Subject to availability":"Tergantung ketersediaan",
"Weather permitting":"Jika cuaca memungkinkan",
"Entrance tickets":"Tiket masuk",
"Breakfast":"Sarapan",
"Lunch":"Makan siang",
"Dinner":"Makan malam",
"Mineral water":"Air mineral",
"Fuel":"Bahan bakar",
"Parking":"Parkir",
"Driver":"Pengemudi",
"Private vehicle":"Kendaraan privat",
"Group discount":"Diskon rombongan",
"More than 15 guests":"Lebih dari 15 tamu",
"Special group rates will be confirmed by our team. Continue with Book Now and include your group size.":"Tarif khusus rombongan akan dikonfirmasi oleh tim kami. Lanjutkan dengan Pesan Sekarang dan sertakan jumlah rombongan.",
"3–4 guests":"3–4 tamu",
"5–6 guests":"5–6 tamu",
"7–10 guests":"7–10 tamu",
"11–15 guests":"11–15 tamu"};
        const originalTextNodes = new WeakMap();
        const originalAttributes = new WeakMap();
        const EXTRA_LOCALE_COPY={
          ms:{"Beranda":"Laman Utama","Tur & Layanan":"Lawatan & Perkhidmatan","Tentang Kami":"Tentang Kami","Kontak":"Hubungi Kami","Pesan sekarang":"Tempah sekarang","Lihat detail":"Lihat butiran","Lihat semua":"Lihat semua","Pelajari lebih lanjut":"Ketahui lanjut","Baca selengkapnya":"Baca lagi","Mulai dari":"Daripada","per orang":"seorang","Tur populer":"Lawatan popular","Destinasi pilihan":"Destinasi utama","Butuh bantuan?":"Perlukan bantuan?","Kirim pesan":"Hantar mesej","Explore Bali":"Terokai Bali","Home":"Laman Utama","Tours & Services":"Lawatan & Perkhidmatan","About Us":"Tentang Kami","Contact":"Hubungi Kami","Book now":"Tempah sekarang","Book Now":"Tempah Sekarang","View details":"Lihat butiran","View Details":"Lihat Butiran","View all":"Lihat semua","See all":"Lihat semua","Learn more":"Ketahui lanjut","Read more":"Baca lagi","From":"Daripada","per person":"seorang","Popular tours":"Lawatan popular","Top destinations":"Destinasi utama","Need help?":"Perlukan bantuan?","Send message":"Hantar mesej","Offline":"Luar talian","Live chat":"Sembang langsung","Continue on WhatsApp":"Teruskan di WhatsApp"},
          sg:{"Beranda":"Home","Tur & Layanan":"Tours & Services","Tentang Kami":"About Us","Kontak":"Contact","Pesan sekarang":"Book now","Lihat detail":"View details","Lihat semua":"See all","Pelajari lebih lanjut":"Find out more","Baca selengkapnya":"Read more","Mulai dari":"From","per orang":"per person","Tur populer":"Popular tours","Destinasi pilihan":"Top places","Butuh bantuan?":"Need help?","Kirim pesan":"Send message","Explore Bali":"Explore Bali lah","Home":"Home","Tours & Services":"Tours & Services","About Us":"About Us","Contact":"Contact","Book now":"Book now","Book Now":"Book Now","View details":"View details","View all":"See all","Learn more":"Find out more","Read more":"Read more","Popular tours":"Popular tours","Top destinations":"Top places","Offline":"Offline","Live chat":"Live chat","Continue on WhatsApp":"Chat us on WhatsApp"},
          ar:{"Beranda":"الرئيسية","Tur & Layanan":"الجولات والخدمات","Tentang Kami":"من نحن","Kontak":"اتصل بنا","Pesan sekarang":"احجز الآن","Lihat detail":"عرض التفاصيل","Lihat semua":"عرض الكل","Pelajari lebih lanjut":"اعرف المزيد","Baca selengkapnya":"اقرأ المزيد","Mulai dari":"ابتداءً من","per orang":"للشخص","Tur populer":"الجولات الشائعة","Destinasi pilihan":"أفضل الوجهات","Butuh bantuan?":"هل تحتاج إلى مساعدة؟","Kirim pesan":"إرسال الرسالة","Explore Bali":"اكتشف بالي","Home":"الرئيسية","Tours & Services":"الجولات والخدمات","About Us":"من نحن","Contact":"اتصل بنا","Book now":"احجز الآن","Book Now":"احجز الآن","View details":"عرض التفاصيل","View all":"عرض الكل","Learn more":"اعرف المزيد","Read more":"اقرأ المزيد","From":"ابتداءً من","per person":"للشخص","Popular tours":"الجولات الشائعة","Top destinations":"أفضل الوجهات","Need help?":"هل تحتاج إلى مساعدة؟","Send message":"إرسال الرسالة","Offline":"غير متصل","Live chat":"دردشة مباشرة","Continue on WhatsApp":"المتابعة عبر واتساب"},
          hi:{"Beranda":"होम","Tur & Layanan":"टूर और सेवाएँ","Tentang Kami":"हमारे बारे में","Kontak":"संपर्क करें","Pesan sekarang":"अभी बुक करें","Lihat detail":"विवरण देखें","Lihat semua":"सभी देखें","Pelajari lebih lanjut":"और जानें","Baca selengkapnya":"और पढ़ें","Mulai dari":"शुरुआती कीमत","per orang":"प्रति व्यक्ति","Tur populer":"लोकप्रिय टूर","Destinasi pilihan":"शीर्ष गंतव्य","Butuh bantuan?":"मदद चाहिए?","Kirim pesan":"संदेश भेजें","Explore Bali":"बाली घूमें","Home":"होम","Tours & Services":"टूर और सेवाएँ","About Us":"हमारे बारे में","Contact":"संपर्क करें","Book now":"अभी बुक करें","Book Now":"अभी बुक करें","View details":"विवरण देखें","View all":"सभी देखें","Learn more":"और जानें","Read more":"और पढ़ें","From":"शुरुआती कीमत","per person":"प्रति व्यक्ति","Popular tours":"लोकप्रिय टूर","Top destinations":"शीर्ष गंतव्य","Need help?":"मदद चाहिए?","Send message":"संदेश भेजें","Offline":"ऑफ़लाइन","Live chat":"लाइव चैट","Continue on WhatsApp":"WhatsApp पर जारी रखें"}
        };
        function replaceLocalePhrase(source, from, to) {
            if (!from || from === to) return source;
            let escaped = '';
            const special = '^$.*+?()[]{}|\\\\';
            for (const character of from) escaped += special.indexOf(character) >= 0 ? '\\\\' + character : character;
            const pattern = new RegExp('(^|[^A-Za-z0-9])' + escaped + '(?=$|[^A-Za-z0-9])', 'g');
            return source.replace(pattern, function(match, prefix) { return prefix + to; });
        }
        function translateCopy(value) {
            if (!value || currentLanguage === 'en') return value;
            let out = value;
            if (currentLanguage === 'id') {
                Object.keys(BALI_TRANSLATIONS).sort((a,b) => b.length-a.length).forEach(key => {
                    out = replaceLocalePhrase(out, key, BALI_TRANSLATIONS[key]);
                });
            } else {
                const map = EXTRA_LOCALE_COPY[currentLanguage] || {};
                Object.keys(map).sort((a,b) => b.length-a.length).forEach(key => {
                    out = replaceLocalePhrase(out, key, map[key]);
                });
            }
            return out;
        }
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
            const ids = {id:'localeCheckId',en:'localeCheckEn'};
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
                    if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
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
            const attributeSelector = '[placeholder],[aria-label],[title],[alt],meta[name="description"][content],input[type="button"][value],input[type="submit"][value],input[type="reset"][value]';
            const attributeElements = [];
            if (scope.nodeType === Node.ELEMENT_NODE && scope.matches && scope.matches(attributeSelector)) attributeElements.push(scope);
            if (scope.querySelectorAll) attributeElements.push(...scope.querySelectorAll(attributeSelector));
            attributeElements.forEach(el => {
                const names = ['placeholder','aria-label','title','alt'];
                if (el.tagName === 'META') names.push('content');
                if (el.tagName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type)) names.push('value');
                if (!originalAttributes.has(el)) {
                    const original = {};
                    names.forEach(name => { original[name] = el.getAttribute(name); });
                    originalAttributes.set(el, original);
                }
                const attrs = originalAttributes.get(el);
                names.forEach(name => {
                    if (attrs[name] !== null && attrs[name] !== undefined) el.setAttribute(name, translateCopy(attrs[name]));
                });
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
            if (typeof updateLiveChatStatus === 'function') updateLiveChatStatus();

            // Re-render the active route so displayed prices use the selected currency.
            // Keep the same route and scroll position; never send the visitor back home.
            const scrollY = window.scrollY || window.pageYOffset || 0;
            const activeView = currentViewName;
            const activeParams = currentViewParams;
            const savedQty = currentDetailQty;
            const savedDate = document.getElementById('bookingDateInput')?.value || '';
            const savedOption = document.querySelector('input[name="packageOption"]:checked')?.value || '';
            const savedVehicle = document.querySelector('input[name="detailVehicle"]:checked')?.value || '';
            const savedAddons = Array.from(document.querySelectorAll('input[name="detailAddon"]:checked')).map(input => input.value);
            if (activeView === 'checkout') {
                applyLanguageCopy(document);
                if (typeof updateCheckoutPricing === 'function') updateCheckoutPricing();
            } else {
                navigateTo(activeView, activeParams, { history: false, preserveScroll: true, scrollY });
                if (activeView === 'detail') {
                    currentDetailQty = savedQty || 1;
                    const dateInput = document.getElementById('bookingDateInput');
                    if (dateInput) dateInput.value = savedDate;
                    const optionInput = savedOption ? document.querySelector('input[name="packageOption"][value="' + savedOption + '"]') : null;
                    if (optionInput) optionInput.checked = true;
                    if (savedVehicle) {
                        const vehicleInput = document.querySelector('input[name="detailVehicle"][value="' + savedVehicle + '"]');
                        if (vehicleInput && !vehicleInput.disabled) vehicleInput.checked = true;
                    }
                    savedAddons.forEach(id => {
                        const addonInput = document.querySelector('input[name="detailAddon"][value="' + id + '"]');
                        if (addonInput) addonInput.checked = true;
                    });
                    updatePackageOptionDetails();
                    selectLovinaGallery(lovinaGalleryIndex);
                }
                window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
            }
            // Re-translate the entire document after changing language, not just the
            // re-rendered SPA view. This includes the shared announcement bar, desktop
            // navbar, mobile navigation, search controls, and footer outside appContainer.
            applyLanguageCopy(document);
            syncLocaleSelector();
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
            navigateTo('account');
        }
        function showHelpMenu() {
            navigateTo('help');
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
            list.innerHTML = items.length ? items.map(pkg => '<button class="w-full flex items-center gap-3 text-left p-3 mb-2 rounded-xl border border-slate-100 hover:bg-slate-50" onclick="navigateTo(\'detail\', \'' + pkg.id + '\');document.getElementById(\'recentlyViewedModal\').remove()"><img src="' + pkg.heroImage + '" alt="" loading="lazy" class="w-16 h-16 object-cover rounded-lg"><span><strong class="block text-sm text-slate-900">' + pkg.title + '</strong><small class="text-slate-500">' + (pkg.location || 'Bali') + '</small></span></button>').join('') : '<p class="text-sm text-slate-500 text-center py-8">Aktivitas yang baru dilihat akan muncul di sini.</p>';
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
                                <img src="${pkg.heroImage}" alt="" loading="lazy" class="w-12 h-12 object-cover rounded-xl">
                                <div>
                                    <h5 class="text-xs font-bold text-slate-900 line-clamp-1">${pkg.title}</h5>
                                    <span class="text-[10px] text-slate-400">${pkg.location}</span>
                                </div>
                            </div>
                            <button onclick="navigateTo('detail', '${pkg.id}'); toggleWishlistModal();" class="text-xs font-bold text-bali-orange hover:underline">View</button>
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
            const escapeHtml = value => String(value || '').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
            const destinations = [
                {title:'North Bali',location:'Lovina · Singaraja · Buleleng',key:'region:north',terms:'north bali bali utara buleleng singaraja'},
                {title:'Private Driver in Bali',location:'Private transport · Flexible itinerary',key:'service:private-driver',terms:'private driver private transport sopir pribadi driver charter'},
                {title:'Full Day Tours in Bali',location:'Day trips · Itinerary planning',key:'duration:full-day',terms:'full day full-day day tour one day seharian tur sehari'},
                {title:'Long Trips Around Bali',location:'Long-distance · North Bali and beyond',key:'duration:long-trip',terms:'long trip long-trip longer journey perjalanan jauh trip panjang'},
                {title:'Lovina Beach & Dolphin Watching',location:'North Bali · Beach, wildlife',key:'place:lovina',terms:'lovina dolphin lumba-lumba north bali buleleng'},
                {title:'Banjar Hot Springs',location:'North Bali · Hot springs',key:'place:banjar-hot-springs',terms:'banjar hot springs air panas'},
                {title:'Brahmavihara-Arama Monastery',location:'North Bali · Culture',key:'place:brahmavihara-arama',terms:'brahmavihara monastery buddhist temple'},
                {title:'Gitgit Waterfall',location:'North Bali · Nature',key:'place:gitgit-waterfall',terms:'gitgit waterfall air terjun'},
                {title:'Munduk Waterfalls & Highlands',location:'North Bali · Highlands',key:'place:munduk',terms:'munduk waterfall highlands trekking'},
                {title:'Wanagiri Twin Lakes Viewpoint',location:'North Bali · Viewpoint',key:'place:wanagiri',terms:'wanagiri twin lakes buyan tamblingan'},
                {title:'Menjangan Island & West Bali National Park',location:'Northwest Bali · Snorkelling, diving',key:'place:menjangan',terms:'menjangan national park snorkelling diving'},
                {title:'Gedong Kirtya Library',location:'Singaraja · Culture & heritage',key:'place:gedong-kirtya',terms:'gedong kirtya singaraja library manuscript'},
                {title:'South Bali',location:'Uluwatu · Jimbaran · Nusa Dua',key:'region:south',terms:'south bali uluwatu jimbaran nusa dua canggu sanur'},
                {title:'Central Bali',location:'Ubud · Kintamani · Bedugul',key:'region:central',terms:'central bali ubud kintamani bedugul'},
                {title:'East Bali',location:'Amed · Tulamben · Karangasem',key:'region:east',terms:'east bali amed tulamben karangasem sidemen tirta gangga besakih'},
                {title:'West Bali',location:'Medewi · Jembrana · Gilimanuk',key:'region:west',terms:'west bali medewi jembrana gilimanuk'},
                {title:'Nusa Islands',location:'Penida · Lembongan · Ceningan',key:'region:nusa',terms:'nusa islands penida lembongan ceningan'},
                {title:'Uluwatu Temple & Coastal Cliffs',location:'South Bali · Temple, coast',key:'place:uluwatu',terms:'uluwatu temple cliffs'},
                {title:'Jimbaran Coast',location:'South Bali · Beach, seafood',key:'place:jimbaran',terms:'jimbaran coast seafood bay'},
                {title:'Nusa Dua Beaches',location:'South Bali · Beach, water activities',key:'place:nusa-dua',terms:'nusa dua beaches watersports'},
                {title:'Denpasar City Sights',location:'South Bali · City, culture',key:'place:denpasar',terms:'denpasar city'},
                {title:'Ubud & Surrounding Villages',location:'Central Bali · Culture, nature',key:'place:ubud',terms:'ubud villages art'},
                {title:'River Rafting',location:'Central Bali · Outdoor activity',key:'place:rafting',terms:'rafting river adventure'},
                {title:'Rice Terraces & Nature Stops',location:'Central Bali · Nature',key:'place:rice-terraces',terms:'rice terraces nature'},
                {title:'Amed & Jemeluk Bay',location:'East Bali · Snorkelling, diving',key:'place:amed',terms:'amed jemeluk bay'},
                {title:'Tulamben & USAT Liberty Wreck',location:'East Bali · Diving',key:'place:tulamben',terms:'tulamben usat liberty wreck'},
                {title:'Tirta Gangga Water Palace',location:'East Bali · Heritage',key:'place:tirta-gangga',terms:'tirta gangga water palace'},
                {title:'Taman Ujung',location:'East Bali · Heritage, gardens',key:'place:taman-ujung',terms:'taman ujung palace'},
                {title:'Lempuyang Temple',location:'East Bali · Temple',key:'place:lempuyang',terms:'lempuyang temple'},
                {title:'Besakih Temple',location:'East Bali · Temple, culture',key:'place:besakih',terms:'besakih temple'},
                {title:'Candidasa & Padangbai',location:'East Bali · Coast, boat connections',key:'place:candidasa-padangbai',terms:'candidasa padangbai harbour'},
                {title:'Sidemen Valley',location:'East Bali · Countryside',key:'place:sidemen',terms:'sidemen valley'},
                {title:'Medewi Surf Coast',location:'West Bali · Surf',key:'place:medewi',terms:'medewi surf'},
                {title:'Rambut Siwi Temple',location:'West Bali · Temple',key:'place:rambut-siwi',terms:'rambut siwi temple'},
                {title:'Bunut Bolong Tree Tunnel',location:'West Bali · Nature, culture',key:'place:bunut-bolong',terms:'bunut bolong tree tunnel'},
                {title:'Perancak Fishing Village',location:'West Bali · Coastal village',key:'place:perancak',terms:'perancak fishing village'},
                {title:'Gilimanuk Bay',location:'West Bali · Coast, ferry gateway',key:'place:gilimanuk',terms:'gilimanuk bay ferry'},
                {title:'West Bali National Park',location:'West Bali · Nature, wildlife',key:'place:west-bali-national-park',terms:'west bali national park'},
                {title:'Kelingking Beach',location:'Nusa Penida · Cliff-top views',articleId:'nusa-penida-kelingking-beach',terms:'kelingking beach nusa penida t-rex cliff'},
                {title:'Crystal Bay',location:'Nusa Penida · Coast, marine activities',articleId:'nusa-penida-crystal-bay',terms:'crystal bay nusa penida snorkelling diving sunset'},
                {title:'Diamond Beach',location:'Nusa Penida · East coast',articleId:'nusa-penida-diamond-beach',terms:'diamond beach nusa penida stairs cliff safety'},
                {title:'Atuh Beach',location:'Nusa Penida · East coast',articleId:'nusa-penida-atuh-beach',terms:'atuh beach nusa penida cliffs east coast'},
                
                {title:'Nusa Lembongan & Mangrove Forest',location:'Nusa Lembongan · Island, nature',key:'place:nusa-lembongan',terms:'nusa lembongan mangrove'},
                {title:'Nusa Ceningan & Yellow Bridge',location:'Nusa Ceningan · Island',key:'place:nusa-ceningan',terms:'nusa ceningan yellow bridge'},
                {title:'Nusa Islands Snorkelling & Diving',location:'Nusa Islands · Marine activities',key:'place:island-snorkelling-diving',terms:'nusa snorkelling diving'}
            ];
            const packageMatches = BALI_PACKAGES.filter(p => [p.title,p.location,p.categoryName,p.category,...(p.highlights||[])].filter(Boolean).join(' ').toLocaleLowerCase().includes(term)).slice(0,5);
            const destinationMatches = destinations.filter(d => (d.title+' '+d.location+' '+d.terms).toLocaleLowerCase().includes(term)).sort((a,b) => Number(String(b.key || '').startsWith('place:')) - Number(String(a.key || '').startsWith('place:'))).slice(0,5);
            const results = [
                ...packageMatches.map(p => ({title:p.title,location:p.location,image:p.heroImage,action:`navigateTo('detail','${String(p.id).replace(/[^a-zA-Z0-9_-]/g,'')}'); closeHeaderSearch();`})),
                ...destinationMatches.map(d => ({title:d.title,location:d.location,image:'',action:d.articleId ? `navigateTo('blog-read','${d.articleId}'); closeHeaderSearch();` : `navigateTo('discovery','${d.key}'); closeHeaderSearch();`}))
            ].slice(0,8);
            dropdown.classList.remove('hidden');
            if (results.length) {
                dropdown.innerHTML = results.map(item => `<button type="button" onclick="${item.action}" class="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-3">${item.image ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy" class="w-10 h-10 object-cover rounded-lg">` : '<span class="w-10 h-10 shrink-0 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center"><i class="fas fa-map-marker-alt"></i></span>'}<span class="min-w-0"><span class="block text-xs font-extrabold text-slate-900 line-clamp-1">${escapeHtml(item.title)}</span><span class="block text-[10px] text-slate-500">${escapeHtml(item.location)}</span></span></button>`).join('');
            } else {
                dropdown.innerHTML = `<div class="p-3 text-xs text-slate-500 text-center">No destinations or experiences found for “${escapeHtml(term)}”</div>`;
            }
        }

        function executeHeroSearch() {
            const input = document.getElementById('heroSearchInput');
            const query = String(input?.value || '').trim();
            filterByCategory('all');
            window.packageCatalogQuery = query;
            if (!query) { navigateTo('packages'); return; }
            const q = query.toLocaleLowerCase();
            const destinations = [
                {terms:['lovina','dolphin','lumba-lumba','north bali','buleleng'],key:'place:lovina'},
                {terms:['banjar hot spring','air panas banjar'],key:'place:banjar-hot-springs'},
                {terms:['brahmavihara','monastery'],key:'place:brahmavihara-arama'},
                {terms:['gitgit','waterfall'],key:'place:gitgit-waterfall'},
                {terms:['munduk','highlands'],key:'place:munduk'},
                {terms:['wanagiri','twin lakes','buyan','tamblingan'],key:'place:wanagiri'},
                {terms:['menjangan','west bali national park'],key:'place:menjangan'},
                {terms:['gedong kirtya','singaraja'],key:'place:gedong-kirtya'},
                {terms:['south bali','uluwatu','jimbaran','nusa dua','canggu','sanur'],key:'region:south'},
                {terms:['central bali','ubud','kintamani','bedugul'],key:'region:central'},
                {terms:['east bali','amed','tulamben','karangasem','sidemen','tirta gangga','besakih'],key:'region:east'},
                {terms:['west bali','medewi','jembrana','gilimanuk'],key:'region:west'},
                {terms:['nusa penida','lembongan','ceningan','island'],key:'region:nusa'},
                {terms:['uluwatu'],key:'place:uluwatu'},{terms:['jimbaran'],key:'place:jimbaran'},{terms:['nusa dua'],key:'place:nusa-dua'},{terms:['denpasar'],key:'place:denpasar'},
                {terms:['ubud'],key:'place:ubud'},{terms:['rafting','white water'],key:'place:rafting'},{terms:['rice terrace','rice terraces'],key:'place:rice-terraces'},
                {terms:['amed','jemeluk'],key:'place:amed'},{terms:['tulamben','usat liberty'],key:'place:tulamben'},{terms:['tirta gangga'],key:'place:tirta-gangga'},{terms:['taman ujung'],key:'place:taman-ujung'},{terms:['lempuyang'],key:'place:lempuyang'},{terms:['besakih'],key:'place:besakih'},{terms:['candidasa','padangbai'],key:'place:candidasa-padangbai'},{terms:['sidemen'],key:'place:sidemen'},
                {terms:['medewi'],key:'place:medewi'},{terms:['rambut siwi'],key:'place:rambut-siwi'},{terms:['bunut bolong'],key:'place:bunut-bolong'},{terms:['perancak'],key:'place:perancak'},{terms:['gilimanuk'],key:'place:gilimanuk'},{terms:['west bali national park'],key:'place:west-bali-national-park'},
                {terms:['kelingking beach','kelingking'],articleId:'nusa-penida-kelingking-beach'},{terms:['crystal bay'],articleId:'nusa-penida-crystal-bay'},{terms:['diamond beach'],articleId:'nusa-penida-diamond-beach'},{terms:['atuh beach'],articleId:'nusa-penida-atuh-beach'},{terms:['nusa lembongan','mangrove'],key:'place:nusa-lembongan'},{terms:['nusa ceningan','yellow bridge'],key:'place:nusa-ceningan'}
            ];
            const match = destinations.filter(item => item.terms.some(term => q.includes(term))).sort((a,b) => Number(String(b.key || '').startsWith('place:')) - Number(String(a.key || '').startsWith('place:')))[0];
            if (match) { if (match.articleId) navigateTo('blog-read', match.articleId); else navigateTo('discovery', match.key); return; }
            navigateTo('packages');
            setTimeout(() => {
                const target = document.getElementById('packageSearchInput');
                if (target) { target.value = query; filterPackageCatalog(query); }
            }, 0);
        }

        function quickFilterSearch(cat) {
            if (cat === 'driver') {
                window.location.href = './transport-service.html';
                return;
            }
            const routes = { water: 'region:nusa', temple: 'region:east', atv: 'region:central' };
            const route = routes[cat];
            if (route) {
                window.packageCatalogQuery = '';
                filterByCategory('all');
                navigateTo('discovery', route);
                return;
            }
            filterByCategory(cat);
            window.packageCatalogQuery = '';
            navigateTo('packages');
        }

        function updateBadges() {
            const cartCount = cartState.reduce((sum, i) => sum + i.quantity, 0);
            const cartTotal = cartState.reduce((sum, i) => sum + (i.unitPriceIDR * i.quantity), 0);
            const curr = CURRENCY_RATES[currentCurrency];

            const cartCountBadge = document.getElementById('cartCountBadge');
            const mobileCartBadge = document.getElementById('mobileCartBadge');
            const cartHeaderSubtotal = document.getElementById('cartHeaderSubtotal');
            const wishlistCountBadge = document.getElementById('wishlistCountBadge');
            if (cartCountBadge) cartCountBadge.innerText = cartCount;
            if (mobileCartBadge) mobileCartBadge.innerText = cartCount;
            if (cartHeaderSubtotal) cartHeaderSubtotal.innerText = curr.format(cartTotal);
            if (wishlistCountBadge) wishlistCountBadge.innerText = wishlistState.length;
        }

        function showToast(msg) {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = 'bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0';
            toast.innerHTML = `<i class="fas fa-info-circle text-bali-orange"></i> ${msg}`;
            
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
            // Keep the announcement useful and honest; do not display a fabricated sale countdown.
            const timerElem = document.getElementById('countdownTimer');
            if (timerElem) timerElem.textContent = 'Plan your Bali trip';
        }

        /* INITIAL APP LAUNCH
           Render as soon as the HTML is parsed. window.onload waits for every
           image/font/external resource, making the header and footer appear
           before the main view on slower mobile connections. */
        function readRouteFromUrl() {
            const query = new URLSearchParams(window.location.search);
            if (query.get('preview') === 'dolphin-tour') return { view: 'detail', params: 'dolphin-tour-preview' };
            const requestedTour = query.get('tour');
            if (requestedTour === 'lovina-dolphin-tour') return { view: 'detail', params: requestedTour };
            const view = query.get('page') || 'home';
            const supportedViews = ['home','about','contact','help','help-topic','terms','privacy','partners','service-info','account','packages','discovery','detail','blog','blog-read','cart','checkout','image-credits','not-found'];
            return {
                view: supportedViews.includes(view) ? view : 'not-found',
                params: query.get('item') || (view === 'discovery' ? 'region:south' : null)
            };
        }
        function startBaliTransApp() {
            const route = readRouteFromUrl();
            navigateTo(route.view, route.params, { replace: true });
        }
        window.addEventListener('popstate', () => {
            const route = readRouteFromUrl();
            navigateTo(route.view, route.params, { history: false });
        });
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startBaliTransApp, { once: true });
        } else {
            startBaliTransApp();
        }
