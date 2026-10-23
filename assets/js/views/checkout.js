/* VIEW 7: MULTI-STEP CHECKOUT FLOW */
        // Dedicated Bali Dolphin all-inclusive booking flow. Kept separate from the general cart checkout.
        let dolphinBookingStep = 1;
        const DOLPHIN_BOOKING_STEPS = ['Date & guests', 'Your package', 'Guest details', 'Review request'];

        function captureDolphinBookingFields() {
            const d = window.dolphinBookingDraft;
            if (!d) return;
            const fields = {
                date: 'dolphinBookDate', adults: 'dolphinBookAdults', children: 'dolphinBookChildren', guestType: 'dolphinBookGuestType',
                pickup: 'dolphinBookPickup', childAges: 'dolphinBookChildAges', vehicle: 'dolphinBookVehicle', name: 'dolphinBookName',
                email: 'dolphinBookEmail', phone: 'dolphinBookPhone', notes: 'dolphinBookNotes'
            };
            Object.keys(fields).forEach(key => {
                const el = document.getElementById(fields[key]);
                if (el) d[key] = key === 'adults' || key === 'children' ? Math.max(0, Number(el.value) || 0) : el.value.trim();
            });
            const swing = document.getElementById('dolphinAddonSwing');
            const snorkel = document.getElementById('dolphinAddonSnorkel');
            const tanahLot = document.getElementById('dolphinAddonTanahLot');
            if (swing || snorkel || tanahLot) d.addons = { swing: !!(swing && swing.checked), snorkel: !!(snorkel && snorkel.checked), tanahLot: !!(tanahLot && tanahLot.checked) };
            const guests = (Number(d.adults)||0)+(Number(d.children)||0);
            const adultRate = d.guestType === 'international' ? 950000 : 750000;
            const childRate = d.guestType === 'international' ? 700000 : 500000;
            const discount = guests >= 11 ? .075 : guests >= 7 ? .05 : guests >= 3 ? .025 : 0;
            let estimate = ((Number(d.adults)||0)*adultRate+(Number(d.children)||0)*childRate)*(1-discount);
            if (d.addons && d.addons.snorkel) estimate += guests*250000;
            if (d.addons && d.addons.tanahLot) estimate += (Number(d.adults)||0)*(d.guestType === 'international' ? 70000 : 30000)+(Number(d.children)||0)*(d.guestType === 'international' ? 35000 : 15000)+300000;
            if (d.vehicle === 'reborn') estimate += 300000;
            if (d.vehicle === 'zenix' || (d.vehicle === 'hiace' && guests < 6)) estimate += 500000;
            d.estimatedTotal = estimate;
        }

        function updateDolphinEstimate() {
            const d = window.dolphinBookingDraft || {};
            const adults = Math.max(1, Number(document.getElementById('dolphinBookAdults')?.value || d.adults || 1));
            const children = Math.max(0, Number(document.getElementById('dolphinBookChildren')?.value || d.children || 0));
            const guestType = document.getElementById('dolphinBookGuestType')?.value || d.guestType || 'local';
            const guests = adults + children;
            const baseAdult = guestType === 'international' ? 950000 : 750000;
            const childRate = guestType === 'international' ? 700000 : 500000;
            const discount = guests >= 11 ? .075 : guests >= 7 ? .05 : guests >= 3 ? .025 : 0;
            let total = (adults * baseAdult + children * childRate) * (1 - discount);
            const money = n => 'Rp' + Math.round(Number(n || 0)).toLocaleString('id-ID');
            const snorkel = document.getElementById('dolphinAddonSnorkel')?.checked;
            const tanahLot = document.getElementById('dolphinAddonTanahLot')?.checked;
            const swing = document.getElementById('dolphinAddonSwing')?.checked;
            if (snorkel) total += guests * 250000;
            if (tanahLot) total += adults * (guestType === 'international' ? 70000 : 30000) + children * (guestType === 'international' ? 35000 : 15000) + 300000;
            const vehicle = document.getElementById('dolphinBookVehicle')?.value || 'standard';
            if (vehicle === 'reborn') total += 300000;
            if (vehicle === 'zenix' || vehicle === 'hiace') total += 500000;
            const output = document.getElementById('dolphinLiveEstimate');
            if (output) output.textContent = money(total);
            const hint = document.getElementById('dolphinVehicleHint');
            if (hint) hint.textContent = guests >= 7 ? 'For 7+ guests, HiAce is assigned automatically. If luggage or comfort requires it, request two standard vehicles.' : guests >= 6 ? 'For 6 guests, HiAce is recommended automatically; you may request two standard vehicles.' : 'Standard Avanza, Ertiga or Wuling is included for groups of 1–5 guests.';
            const note = document.getElementById('dolphinEstimateNote');
            if (note) note.textContent = (swing ? 'Swing admission is not included in the numeric total and will be itemised after the operator is selected. ' : '') + (guests >= 6 && vehicle === 'standard' ? 'A larger group needs HiAce or two standard vehicles; vehicle selection must be confirmed. ' : '') + 'This is an estimate; availability and final itinerary are confirmed before booking.';
        }

        function renderDolphinBookingFlow() {
            const d = window.dolphinBookingDraft;
            const input = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#172B4D]/10';
            const label = 'block text-sm font-semibold text-slate-700';
            const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,10);
            const selected = (a,b) => a===b ? ' selected' : '';
            return '<div class="min-h-screen bg-white px-4 py-6 sm:py-10"><div class="mx-auto max-w-2xl">' +
                '<button type="button" onclick="navigateTo(\'detail\',\'lovina-dolphin-tour\')" class="mb-5 text-sm font-semibold text-slate-600 hover:text-[#172B4D]">← Back to tour</button>' +
                '<div class="mb-6 border-b border-slate-200 pb-5"><p class="text-xs font-bold uppercase tracking-widest text-slate-500">Bali Trans</p><h1 class="mt-2 text-2xl font-bold text-slate-900">Booking request</h1><p class="mt-1 text-sm text-slate-600">Bali Dolphin Tour</p></div>' +
                '<form id="dolphinCleanBookingForm" class="space-y-5" onsubmit="event.preventDefault();captureDolphinBookingFields();sendDolphinBookingToWhatsApp();">' +
                '<div class="grid gap-4 sm:grid-cols-2">' +
                '<label class="'+label+'">Tour date *<input id="dolphinBookDate" type="date" min="'+today+'" value="'+(d.date||'')+'" class="'+input+'" required></label>' +
                '<label class="'+label+'">Pickup hotel / area *<input id="dolphinBookPickup" type="text" value="'+(d.pickup||'')+'" placeholder="Hotel name and area" class="'+input+'" required></label>' +
                '<label class="'+label+'">Guest category<select id="dolphinBookGuestType" class="'+input+'"><option value="local"'+selected(d.guestType,'local')+'>Local / domestic</option><option value="international"'+selected(d.guestType,'international')+'>International</option></select></label>' +
                '<label class="'+label+'">Adults (12+) *<input id="dolphinBookAdults" type="number" min="1" max="30" value="'+(d.adults||1)+'" class="'+input+'" required></label>' +
                '<label class="'+label+'">Children (under 12)<input id="dolphinBookChildren" type="number" min="0" max="30" value="'+(d.children||0)+'" class="'+input+'"></label>' +
                '<label class="'+label+'">Children’s ages<input id="dolphinBookChildAges" type="text" value="'+(d.childAges||'')+'" placeholder="e.g. 5 and 9" class="'+input+'"></label>' +
                '<label class="'+label+'">Vehicle<select id="dolphinBookVehicle" class="'+input+'"><option value="standard"'+selected(d.vehicle||'standard','standard')+'>Standard vehicle</option><option value="reborn"'+selected(d.vehicle,'reborn')+'>Innova Reborn (+Rp300.000)</option><option value="zenix"'+selected(d.vehicle,'zenix')+'>Innova Zenix (+Rp500.000)</option><option value="hiace"'+selected(d.vehicle,'hiace')+'>Toyota HiAce (+Rp500.000)</option></select></label>' +
                '<label class="'+label+'">Full name *<input id="dolphinBookName" autocomplete="name" value="'+(d.name||'')+'" placeholder="Lead traveller" class="'+input+'" required></label>' +
                '<label class="'+label+'">Email *<input id="dolphinBookEmail" type="email" autocomplete="email" value="'+(d.email||'')+'" placeholder="you@example.com" class="'+input+'" required></label>' +
                '<label class="'+label+'">WhatsApp number *<input id="dolphinBookPhone" type="tel" autocomplete="tel" value="'+(d.phone||'')+'" placeholder="Include country code" class="'+input+'" required></label>' +
                '<label class="'+label+' sm:col-span-2">Special requests<textarea id="dolphinBookNotes" rows="2" placeholder="Optional" class="'+input+'">'+(d.notes||'')+'</textarea></label>' +
                '</div>' +
                '<div class="border-t border-slate-200 pt-4"><p class="text-sm font-semibold text-slate-800">Optional extras</p><div class="mt-3 grid gap-3 sm:grid-cols-2">' +
                '<label class="flex items-center gap-2 text-sm text-slate-700"><input id="dolphinAddonSnorkel" type="checkbox" class="accent-[#172B4D]" '+(d.addons&&d.addons.snorkel?'checked':'')+'> Snorkelling (+Rp250.000/person)</label>' +
                '<label class="flex items-center gap-2 text-sm text-slate-700"><input id="dolphinAddonTanahLot" type="checkbox" class="accent-[#172B4D]" '+(d.addons&&d.addons.tanahLot?'checked':'')+'> Tanah Lot sunset stop</label>' +
                '<label class="flex items-center gap-2 text-sm text-slate-700"><input id="dolphinAddonSwing" type="checkbox" class="accent-[#172B4D]" '+(d.addons&&d.addons.swing?'checked':'')+'> Bali swing (price to confirm)</label>' +
                '</div></div>' +
                '<div class="rounded-lg bg-slate-50 p-3 text-sm text-slate-600"><strong class="text-slate-800">Payment:</strong> Pay on the day of the tour. No payment is required now. Booking is subject to availability confirmation.</div>' +
                '<button type="submit" class="w-full rounded-lg bg-[#172B4D] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#243e68]">Send booking request via WhatsApp</button>' +
                '</form></div></div>';
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

        function buildDolphinBookingWhatsAppMessage() {
            captureDolphinBookingFields();
            const d = window.dolphinBookingDraft;
            const money = n => 'Rp' + Math.round(Number(n || 0)).toLocaleString('id-ID');
            const adults = Number(d.adults) || 0;
            const children = Number(d.children) || 0;
            const guests = adults + children;
            const adultRate = d.guestType === 'international' ? 950000 : 750000;
            const childRate = d.guestType === 'international' ? 700000 : 500000;
            const discountRate = guests >= 11 ? .075 : guests >= 7 ? .05 : guests >= 3 ? .025 : 0;
            const adultSubtotal = adults * adultRate;
            const childSubtotal = children * childRate;
            const baseSubtotal = adultSubtotal + childSubtotal;
            const groupDiscount = Math.round(baseSubtotal * discountRate);
            const snorkel = !!(d.addons && d.addons.snorkel);
            const tanahLot = !!(d.addons && d.addons.tanahLot);
            const swing = !!(d.addons && d.addons.swing);
            const addonSnorkel = snorkel ? guests * 250000 : 0;
            const addonTanahLot = tanahLot ? adults * (d.guestType === 'international' ? 70000 : 30000) + children * (d.guestType === 'international' ? 35000 : 15000) + 300000 : 0;
            const vehicle = d.vehicle || 'standard';
            const vehicleExtra = vehicle === 'reborn' ? 300000 : (vehicle === 'zenix' || vehicle === 'hiace') ? 500000 : 0;
            const total = Number(d.estimatedTotal) || Math.max(0, baseSubtotal - groupDiscount + addonSnorkel + addonTanahLot + vehicleExtra);
            const ref = d.reference || (d.reference = 'BT-DOL-' + Date.now().toString(36).toUpperCase().slice(-6));
            const rule = '────────────────────────────────';
            return [
                'BALI TRANS',
                'BOOKING BILL · BALI DOLPHIN TOUR',
                rule,
                'BOOKING REF : ' + ref,
                'BOOKING STATUS: Awaiting availability confirmation',
                '',
                'TRIP DETAILS',
                rule,
                'Tour date   : ' + (d.date || '—'),
                'Pickup      : ' + (d.pickup || '—'),
                'Pickup time : To be confirmed',
                'Guest type  : ' + (d.guestType === 'international' ? 'International' : 'Local / domestic'),
                'Guests      : ' + guests + ' (' + adults + ' adults, ' + children + ' children)',
                'Child ages  : ' + (children ? (d.childAges || 'To be confirmed') : 'N/A'),
                'Vehicle     : ' + ({standard:'Standard vehicle',reborn:'Innova Reborn',zenix:'Innova Zenix',hiace:'Toyota HiAce'}[vehicle] || vehicle),
                'Add-ons     : ' + [snorkel?'Snorkelling':'',tanahLot?'Tanah Lot stop':'',swing?'Swing (price to confirm)':''].filter(Boolean).join(', ') .replace(/^$/, 'None'),
                '',
                'PRICE BREAKDOWN (ESTIMATE)',
                rule,
                'Adult fare  : ' + money(adultRate) + ' × ' + adults + ' = ' + money(adultSubtotal),
                'Child fare  : ' + money(childRate) + ' × ' + children + ' = ' + money(childSubtotal),
                'Subtotal    : ' + money(baseSubtotal),
                'Group discount (' + (discountRate * 100).toLocaleString('en-US') + '%): −' + money(groupDiscount),
                snorkel ? 'Snorkelling : ' + money(addonSnorkel) : '',
                tanahLot ? 'Tanah Lot add-on: ' + money(addonTanahLot) : '',
                vehicleExtra ? 'Vehicle upgrade: ' + money(vehicleExtra) : '',
                swing ? 'Swing admission: price to be confirmed separately' : '',
                'ESTIMATED TOTAL DUE: ' + money(total),
                '',
                'LEAD TRAVELLER',
                rule,
                'Name        : ' + (d.name || '—'),
                'Email       : ' + (d.email || '—'),
                'WhatsApp    : ' + (d.phone || '—'),
                'Special requests: ' + (d.notes || 'None'),
                '',
                'PAYMENT',
                rule,
                'Payment status: NOT PAID',
                'Payment timing: Pay on the day of the tour',
                'No payment is collected when sending this booking request.',
                'Please confirm availability, final itinerary, add-on prices and total before the tour.',
                '',
                'This is a booking estimate, not a payment receipt or final tax invoice.',
                rule,
                'Bali Trans · Tours, trips & private transport'
            ].filter(Boolean).join('\\n');
        }

        function renderDolphinPaymentChoiceNote(method) {
            return method === 'tour-day'
                ? 'Selected: payment on the day of the tour, subject to confirmation.'
                : 'Selected: confirm the quote and booking details via WhatsApp.';
        }

        function sendDolphinBookingToWhatsApp() {
            captureDolphinBookingFields();
            const d = window.dolphinBookingDraft;
            if (!d.date || !d.pickup || !d.name || !d.email || !d.phone || Number(d.adults) < 1) {
                showToast('Please complete the required booking details before sending.');
                return;
            }
            const message = buildDolphinBookingWhatsAppMessage();
            const url = 'https://wa.me/628218187917?text=' + encodeURIComponent(message);
            window.open(url, '_blank', 'noopener,noreferrer');
            const status = document.getElementById('dolphinWhatsAppStatus');
            if (status) status.textContent = 'WhatsApp opened with the formatted booking bill. Review it and tap Send.';
        }

        function printDolphinBookingInvoice() {
            captureDolphinBookingFields();
            window.print();
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
