/* VIEW 7: MULTI-STEP CHECKOUT FLOW */
        // Dedicated Bali Dolphin all-inclusive booking flow. Kept separate from the general cart checkout.
        let dolphinBookingStep = 1;
        const DOLPHIN_BOOKING_STEPS = ['Date & guests', 'Your package', 'Guest details', 'Review request'];

        function captureDolphinBookingFields() {
            const d = window.dolphinBookingDraft;
            if (!d) return;
            const fields = {
                date: 'dolphinBookDate', adults: 'dolphinBookAdults', children: 'dolphinBookChildren',
                pickup: 'dolphinBookPickup', childAges: 'dolphinBookChildAges', name: 'dolphinBookName',
                email: 'dolphinBookEmail', phone: 'dolphinBookPhone', notes: 'dolphinBookNotes'
            };
            Object.keys(fields).forEach(key => {
                const el = document.getElementById(fields[key]);
                if (el) d[key] = key === 'adults' || key === 'children' ? Math.max(0, Number(el.value) || 0) : el.value.trim();
            });
        }

        function renderDolphinBookingFlow() {
            const d = window.dolphinBookingDraft;
            const step = dolphinBookingStep;
            const progress = DOLPHIN_BOOKING_STEPS.map((label, i) => {
                const active = i + 1 === step, done = i + 1 < step;
                return '<div class="flex min-w-0 flex-1 items-center gap-2"><div class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold '+(active || done ? 'bg-[#172B4D] text-white' : 'bg-slate-100 text-slate-500')+'">'+(done ? '✓' : i + 1)+'</div><span class="hidden sm:block text-xs font-bold '+(active ? 'text-[#172B4D]' : 'text-slate-400')+'">'+label+'</span></div>'+(i < 3 ? '<div class="mx-2 h-px flex-1 bg-slate-200"></div>' : '');
            }).join('');
            const inputClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-[#4267A9] focus:ring-2 focus:ring-[#4267A9]/10';
            const labelClass = 'block text-sm font-bold text-slate-700';
            const allInItems = ['Private return transport for your group','Traditional boat trip for sunrise dolphin watching in Lovina','Lunch during the North Bali itinerary','Entrance fees for attractions explicitly listed in your confirmed quote'];
            const summaryRow = (label, value) => '<div class="flex items-start justify-between gap-4 border-b border-slate-100 py-3 text-sm last:border-0"><span class="text-slate-500">'+label+'</span><strong class="max-w-[65%] text-right text-slate-800">'+(value || '—')+'</strong></div>';
            let content = '';
            if (step === 1) {
                content = '<div class="space-y-5"><div><h2 class="text-xl font-extrabold text-slate-900">When would you like to go?</h2><p class="mt-1 text-sm leading-6 text-slate-500">Choose your date, group size and pickup location. We will confirm availability and the final all-inclusive quote.</p></div><div class="grid gap-4 sm:grid-cols-2"><label class="'+labelClass+'">Travel date *<input id="dolphinBookDate" type="date" min="'+new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10)+'" value="'+d.date+'" class="'+inputClass+'" required></label><label class="'+labelClass+'">Pickup area / hotel *<input id="dolphinBookPickup" type="text" value="'+d.pickup+'" placeholder="Hotel name and area" class="'+inputClass+'" required></label><label class="'+labelClass+'">Adults (12 years and over) *<input id="dolphinBookAdults" type="number" min="1" max="30" value="'+d.adults+'" class="'+inputClass+'" required></label><label class="'+labelClass+'">Children (under 12)<input id="dolphinBookChildren" type="number" min="0" max="30" value="'+d.children+'" class="'+inputClass+'"></label></div><p class="rounded-xl bg-[#EEF3FB] p-3 text-xs leading-5 text-[#172B4D]"><strong>Private tour package.</strong> Your vehicle is arranged for your group. Please share children’s ages in the next step so we can confirm suitable arrangements.</p></div>';
            } else if (step === 2) {
                content = '<div class="space-y-5"><div><h2 class="text-xl font-extrabold text-slate-900">Your all-inclusive tour</h2><p class="mt-1 text-sm leading-6 text-slate-500">One coordinated package from pickup to drop-off. You do not need to book the listed experiences separately.</p></div><div class="rounded-2xl border border-[#DCE5F2] bg-[#F7F9FC] p-4"><div class="text-xs font-extrabold uppercase tracking-wider text-[#4267A9]">Selected package</div><h3 class="mt-1 text-lg font-extrabold text-slate-900">Bali Dolphin Tour</h3><p class="mt-1 text-sm text-slate-500">Private vehicle · Sunrise dolphin watching · North Bali highlights</p></div><div><h3 class="mb-3 text-sm font-extrabold text-slate-900">Included in your package</h3><ul class="grid gap-3 sm:grid-cols-2">'+allInItems.map(x=>'<li class="flex gap-2 text-sm leading-6 text-slate-600"><span class="mt-0.5 text-[#4267A9]">✓</span><span>'+x+'</span></li>').join('')+'</ul></div><div class="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">The team will confirm the final inclusions and total quote before you commit. Any item not included in the confirmed package will be clearly disclosed in advance—no surprise charges for included services.</div><label class="'+labelClass+'">Children’s ages (if applicable)<input id="dolphinBookChildAges" type="text" value="'+d.childAges+'" placeholder="e.g. 5 and 9 years old" class="'+inputClass+'"></label></div>';
            } else if (step === 3) {
                content = '<div class="space-y-5"><div><h2 class="text-xl font-extrabold text-slate-900">Who is travelling?</h2><p class="mt-1 text-sm leading-6 text-slate-500">We use these details to follow up about availability, pickup arrangements and your all-inclusive quote.</p></div><div class="grid gap-4 sm:grid-cols-2"><label class="'+labelClass+'">Full name *<input id="dolphinBookName" autocomplete="name" value="'+d.name+'" placeholder="Name of lead traveller" class="'+inputClass+'" required></label><label class="'+labelClass+'">Email address *<input id="dolphinBookEmail" type="email" autocomplete="email" value="'+d.email+'" placeholder="you@example.com" class="'+inputClass+'" required></label><label class="'+labelClass+'">WhatsApp number *<input id="dolphinBookPhone" type="tel" autocomplete="tel" value="'+d.phone+'" placeholder="Include country code" class="'+inputClass+'" required></label><label class="'+labelClass+'">Special requests<textarea id="dolphinBookNotes" rows="3" placeholder="Dietary needs, accessibility or other requests" class="'+inputClass+'">'+d.notes+'</textarea></label></div></div>';
            } else {
                content = '<div class="space-y-5"><div><h2 class="text-xl font-extrabold text-slate-900">Review your booking request</h2><p class="mt-1 text-sm leading-6 text-slate-500">Check your details before sharing the request with Bali Trans. This is a request, not a confirmed reservation or payment.</p></div><div class="rounded-2xl border border-slate-200 p-4">'+summaryRow('Package','Bali Dolphin Tour')+summaryRow('Travel date',d.date)+summaryRow('Guests',(d.adults||0)+' adults, '+(d.children||0)+' children')+summaryRow('Pickup',d.pickup)+summaryRow('Children’s ages',d.childAges)+summaryRow('Lead traveller',d.name)+summaryRow('Email',d.email)+summaryRow('WhatsApp',d.phone)+summaryRow('Special requests',d.notes)+'</div><div class="rounded-xl bg-[#EEF3FB] p-4 text-sm leading-6 text-[#172B4D]"><strong>All-inclusive means one coordinated package.</strong> Bali Trans will confirm the exact itinerary, inclusions, pickup time and total price with you before the booking is finalised.</div><button type="button" onclick="copyDolphinBookingRequest()" class="w-full rounded-xl bg-[#172B4D] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#243e68]"><i class="fas fa-copy mr-2"></i>Copy booking request</button><p id="dolphinCopyStatus" class="text-center text-xs text-slate-500" role="status">Copy the details, then send them to Bali Trans through your usual contact channel.</p></div>';
            }
            return '<div class="min-h-screen bg-[#F7F9FC] px-4 py-6 sm:px-6 sm:py-10 overflow-y-auto"><div class="mx-auto max-w-5xl"><button type="button" onclick="navigateTo(\'detail\',\'lovina-dolphin-tour\')" class="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#172B4D]"><i class="fas fa-arrow-left"></i> Back to tour</button><div class="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><span>Secure booking request</span><span>·</span><span>Step '+step+' of 4</span></div><div class="mb-8 flex items-center">'+progress+'</div><div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"><main class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">'+content+'<div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">'+(step > 1 ? '<button type="button" onclick="advanceDolphinBookingStep(-1)" class="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Back</button>' : '<span></span>')+(step < 4 ? '<button type="button" onclick="advanceDolphinBookingStep(1)" class="rounded-xl bg-[#172B4D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#243e68]">Continue <i class="fas fa-arrow-right ml-2"></i></button>' : '<button type="button" onclick="navigateTo(\'detail\',\'lovina-dolphin-tour\')" class="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Back to tour</button>')+'</div></main><aside class="self-start rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-5 lg:max-h-[calc(100vh-2.5rem)] lg:overflow-y-auto"><h2 class="font-extrabold text-slate-900">Your tour</h2><div class="mt-3 overflow-hidden rounded-xl"><img src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=700&q=80" alt="Dolphins swimming in the sea" class="h-36 w-full object-cover"></div><h3 class="mt-3 text-sm font-extrabold leading-6 text-slate-900">Bali Dolphin Tour</h3><p class="mt-1 text-xs leading-5 text-slate-500">Full-day private tour · North Bali</p><div class="mt-4 border-t border-slate-100 pt-3 text-sm">'+summaryRow('Travel date',d.date||'To be selected')+summaryRow('Guests',((d.adults||0)+' adults, '+(d.children||0)+' children'))+'</div><p class="mt-3 text-xs leading-5 text-slate-500">Final price and availability are confirmed before you commit.</p></aside></div><p class="mt-6 text-center text-xs text-slate-400">Your request is not confirmed until Bali Trans replies with availability and final details.</p></div></div>';
        }

        function advanceDolphinBookingStep(direction) {
            captureDolphinBookingFields();
            const d = window.dolphinBookingDraft;
            if (direction > 0 && dolphinBookingStep === 1) {
                if (!d.date || !d.pickup || Number(d.adults) < 1) { showToast('Please enter a travel date, pickup location and at least one adult.'); return; }
                if (d.date < new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10)) { showToast('Please choose a future travel date.'); return; }
            }
            if (direction > 0 && dolphinBookingStep === 3) {
                if (!d.name || !d.email || !d.phone) { showToast('Please complete your name, email and WhatsApp number.'); return; }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { showToast('Please enter a valid email address.'); return; }
            }
            dolphinBookingStep = Math.max(1, Math.min(4, dolphinBookingStep + direction));
            const container = document.getElementById('appContainer');
            if (container) container.innerHTML = renderDolphinBookingFlow();
            window.scrollTo({top:0,behavior:'auto'});
        }

        function copyDolphinBookingRequest() {
            captureDolphinBookingFields();
            const d = window.dolphinBookingDraft;
            const message = [
                'BALI DOLPHIN & NORTH BALI ALL-INCLUSIVE FULL-DAY TOUR',
                'Travel date: '+d.date,
                'Guests: '+d.adults+' adults, '+d.children+' children',
                'Pickup: '+d.pickup,
                'Children ages: '+(d.childAges||'Not specified'),
                'Lead traveller: '+d.name,
                'Email: '+d.email,
                'WhatsApp: '+d.phone,
                'Special requests: '+(d.notes||'None'),
                '',
                'Please confirm availability, exact inclusions, pickup time and the final all-inclusive quote.'
            ].join('\\n');
            const status = document.getElementById('dolphinCopyStatus');
            const fallback = () => {
                const area = document.createElement('textarea');
                area.value = message; area.setAttribute('readonly',''); area.style.position='fixed'; area.style.opacity='0';
                document.body.appendChild(area); area.select();
                let copied = false;
                try { copied = document.execCommand('copy'); } catch (e) {}
                area.remove();
                if (status) status.textContent = copied ? 'Booking request copied. Send it to Bali Trans to confirm availability.' : 'Copy was not available on this browser. Please select and copy your details from the review above.';
                if (copied) showToast('Booking request copied.');
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(message).then(() => { if(status)status.textContent='Booking request copied. Send it to Bali Trans to confirm availability.'; showToast('Booking request copied.'); }).catch(fallback);
            } else fallback();
        }

        function renderCheckoutView() {
            if (currentViewParams === 'dolphin-tour') return renderDolphinBookingFlow();
            const curr = CURRENCY_RATES[currentCurrency];
            let grandTotal = cartState.reduce((sum, item) => sum + (item.unitPriceIDR * item.quantity), 0);

            return `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <!-- Step Progress Indicator -->
                    <div class="flex items-center justify-between mb-8 max-w-md mx-auto text-xs font-bold">
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 1 ? 'text-bali-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 1 ? 'bg-bali-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">1</div>
                            <span>Data & pilihan</span>
                        </div>
                        <div class="h-0.5 flex-1 bg-slate-200 mx-3"></div>
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 2 ? 'text-bali-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 2 ? 'bg-bali-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">2</div>
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
