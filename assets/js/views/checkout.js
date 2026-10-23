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
            const step = dolphinBookingStep;
            const progress = DOLPHIN_BOOKING_STEPS.map((label, i) => {
                const active = i + 1 === step, done = i + 1 < step;
                return '<div class="flex min-w-0 flex-1 items-center gap-2"><div class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold '+(active || done ? 'bg-[#172B4D] text-white' : 'bg-slate-100 text-slate-500')+'">'+(done ? '✓' : i + 1)+'</div><span class="hidden sm:block text-xs font-bold '+(active ? 'text-[#172B4D]' : 'text-slate-400')+'">'+label+'</span></div>'+(i < 3 ? '<div class="mx-2 h-px flex-1 bg-slate-200"></div>' : '');
            }).join('');
            const inputClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-[#4267A9] focus:ring-2 focus:ring-[#4267A9]/10';
            const labelClass = 'block text-sm font-bold text-slate-700';
            const allInItems = ['Private return transport for your group','Traditional boat trip for sunrise dolphin watching in Lovina','Lunch during the North Bali itinerary','Entrance fees for attractions explicitly listed in your confirmed quote'];
            const adultRate = d.guestType === 'international' ? 950000 : 750000; const childRate = d.guestType === 'international' ? 700000 : 500000; const money = n => 'Rp' + Number(n || 0).toLocaleString('id-ID'); const groupSize = (Number(d.adults)||0)+(Number(d.children)||0); const groupDiscount = groupSize >= 11 ? .075 : groupSize >= 7 ? .05 : groupSize >= 3 ? .025 : 0; const estimatedPackage = ((Number(d.adults)||0)*adultRate+(Number(d.children)||0)*childRate)*(1-groupDiscount);
            const summaryRow = (label, value) => '<div class="flex items-start justify-between gap-4 border-b border-slate-100 py-3 text-sm last:border-0"><span class="text-slate-500">'+label+'</span><strong class="max-w-[65%] text-right text-slate-800">'+(value || '—')+'</strong></div>';
            let content = '';
            if (step === 1) {
                content = '<div class="space-y-5"><div><h2 class="text-xl font-extrabold text-slate-900">When would you like to go?</h2><p class="mt-1 text-sm leading-6 text-slate-500">Choose your date, group size and pickup location. We will confirm availability and the final all-inclusive quote.</p></div><div class="grid gap-4 sm:grid-cols-2"><label class="'+labelClass+'">Travel date *<input id="dolphinBookDate" type="date" min="'+new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10)+'" value="'+d.date+'" class="'+inputClass+'" required></label><label class="'+labelClass+'">Pickup area / hotel *<input id="dolphinBookPickup" type="text" value="'+d.pickup+'" placeholder="Hotel name and area" class="'+inputClass+'" required></label><label class="'+labelClass+'">Guest rate *<select id="dolphinBookGuestType" class="'+inputClass+'"><option value="local" '+(d.guestType!=='international'?'selected':'')+'>Local guest</option><option value="international" '+(d.guestType==='international'?'selected':'')+'>International guest</option></select></label><label class="'+labelClass+'">Adults (12 years and over) *<input id="dolphinBookAdults" type="number" min="1" max="30" value="'+d.adults+'" class="'+inputClass+'" required></label><label class="'+labelClass+'">Children (under 12)<input id="dolphinBookChildren" type="number" min="0" max="30" value="'+d.children+'" class="'+inputClass+'"></label></div><p class="rounded-xl bg-[#EEF3FB] p-3 text-xs leading-5 text-[#172B4D]"><strong>Private tour package.</strong> Your vehicle is arranged for your group. Please share children’s ages in the next step so we can confirm suitable arrangements.</p></div>';
            } else if (step === 2) {
                content = '<div class="space-y-5"><div><h2 class="text-xl font-extrabold text-slate-900">Your all-inclusive tour</h2><p class="mt-1 text-sm leading-6 text-slate-500">One coordinated package from pickup to drop-off. You do not need to book the listed experiences separately.</p></div><div class="rounded-2xl border border-[#DCE5F2] bg-[#F7F9FC] p-4"><div class="text-xs font-extrabold uppercase tracking-wider text-[#4267A9]">Selected package</div><h3 class="mt-1 text-lg font-extrabold text-slate-900">Bali Dolphin Tour</h3><p class="mt-1 text-sm text-slate-500">Private transport · Dolphin watching · North Bali highlights</p><div class="mt-4 border-t border-[#DCE5F2] pt-3"><div class="flex justify-between gap-3 text-sm"><span class="font-bold text-slate-600">'+(d.guestType==='international'?'International guest rate':'Local guest rate')+'</span><strong>'+money(adultRate)+' / adult</strong></div><div class="mt-2 flex justify-between gap-3 text-sm"><span class="text-slate-600">Child age 4–6 (50%)</span><strong>'+money(childRate)+' / child</strong></div><div class="mt-3 border-t border-[#DCE5F2] pt-3 flex justify-between gap-3 text-sm"><span class="font-extrabold">Estimated adult subtotal</span><strong class="text-lg">'+money(estimatedPackage)+'</strong></div><p class="mt-2 text-xs leading-5 text-slate-500">Adult subtotal only. Child pricing depends on age; children aged 4–6 pay 50%. Group discounts, upgrades and add-ons are confirmed in the final quote.</p></div></div><div><h3 class="mb-3 text-sm font-extrabold text-slate-900">Included in your package</h3><ul class="grid gap-3 sm:grid-cols-2">'+allInItems.map(x=>'<li class="flex gap-2 text-sm leading-6 text-slate-600"><span class="mt-0.5 text-[#4267A9]">✓</span><span>'+x+'</span></li>').join('')+'</ul></div><div class="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">The team will confirm the final inclusions and total quote before you commit. Any item not included in the confirmed package will be clearly disclosed in advance—no surprise charges for included services.</div><div class="space-y-4 rounded-2xl border border-[#DCE5F2] bg-white p-4"><h3 class="text-sm font-extrabold text-slate-900">Optional experiences</h3><p class="text-xs leading-5 text-slate-500">Choose any extras before viewing your estimate. Tanah Lot adds entrance fees and extra driving time.</p><label class="flex items-start gap-3 rounded-xl border border-slate-200 p-3"><input id="dolphinAddonSwing" type="checkbox" class="mt-1 h-4 w-4 accent-[#172B4D]" onchange="updateDolphinEstimate()"><span><strong class="block text-sm text-slate-800">Bali swing</strong><span class="block text-xs leading-5 text-slate-500">Optional attraction; ticket price depends on the selected swing operator and will be itemised in the confirmed quote.</span></span></label><label class="flex items-start gap-3 rounded-xl border border-slate-200 p-3"><input id="dolphinAddonSnorkel" type="checkbox" class="mt-1 h-4 w-4 accent-[#172B4D]" onchange="updateDolphinEstimate()"><span><strong class="block text-sm text-slate-800">Snorkelling · Rp250.000 per person</strong><span class="block text-xs leading-5 text-slate-500">Added for each participating guest.</span></span></label><label class="flex items-start gap-3 rounded-xl border border-slate-200 p-3"><input id="dolphinAddonTanahLot" type="checkbox" class="mt-1 h-4 w-4 accent-[#172B4D]" onchange="updateDolphinEstimate()"><span><strong class="block text-sm text-slate-800">Tanah Lot sunset stop</strong><span class="block text-xs leading-5 text-slate-500">Entrance: Rp30.000 per local adult / Rp70.000 per international adult. Includes an additional route-extension estimate of Rp300.000 per standard vehicle.</span></span></label><h3 class="pt-2 text-sm font-extrabold text-slate-900">Vehicle</h3><p id="dolphinVehicleHint" class="text-xs leading-5 text-slate-500">Standard Avanza, Ertiga or Wuling is included for groups of 1–5 guests.</p><label class="'+labelClass+'">Vehicle upgrade<select id="dolphinBookVehicle" class="'+inputClass+'" onchange="updateDolphinEstimate()"><option value="standard">Standard vehicle · Included</option><option value="reborn">Innova Reborn · +Rp300.000 / vehicle</option><option value="zenix">Innova Zenix · +Rp500.000 / vehicle</option><option value="hiace">HiAce · +Rp500.000 / vehicle</option><option value="two-cars">Two standard vehicles · Quote required</option></select></label><label class="'+labelClass+'">Children’s ages (if applicable)<input id="dolphinBookChildAges" type="text" value="'+d.childAges+'" placeholder="e.g. 5 and 9 years old" class="'+inputClass+'" onchange="updateDolphinEstimate()"></label><div class="rounded-xl border border-[#DCE5F2] bg-[#F7F9FC] p-4"><div class="flex items-start justify-between gap-4"><span class="text-sm font-extrabold text-slate-700">Current estimate</span><strong id="dolphinLiveEstimate" class="text-xl font-black text-[#172B4D]">'+money(estimatedPackage)+'</strong></div><p id="dolphinEstimateNote" class="mt-2 text-xs leading-5 text-slate-500">Estimate updates as you select add-ons and vehicle options. Swing ticket fees are confirmed in the final quote.</p></div></div></div>';
            } else if (step === 3) {
                content = '<div class="space-y-5"><div><h2 class="text-xl font-extrabold text-slate-900">Who is travelling?</h2><p class="mt-1 text-sm leading-6 text-slate-500">We use these details to follow up about availability, pickup arrangements and your all-inclusive quote.</p></div><div class="grid gap-4 sm:grid-cols-2"><label class="'+labelClass+'">Full name *<input id="dolphinBookName" autocomplete="name" value="'+d.name+'" placeholder="Name of lead traveller" class="'+inputClass+'" required></label><label class="'+labelClass+'">Email address *<input id="dolphinBookEmail" type="email" autocomplete="email" value="'+d.email+'" placeholder="you@example.com" class="'+inputClass+'" required></label><label class="'+labelClass+'">WhatsApp number *<input id="dolphinBookPhone" type="tel" autocomplete="tel" value="'+d.phone+'" placeholder="Include country code" class="'+inputClass+'" required></label><label class="'+labelClass+'">Special requests<textarea id="dolphinBookNotes" rows="3" placeholder="Dietary needs, accessibility or other requests" class="'+inputClass+'">'+d.notes+'</textarea></label></div></div>';
            } else {
                content = '<style>@media print{body *{visibility:hidden!important}#appContainer,#appContainer *{visibility:visible!important}#appContainer{position:absolute!important;left:0!important;top:0!important;width:100%!important;margin:0!important;padding:0!important}.dolphin-booking-flow{min-height:0!important;background:#fff!important;padding:0!important}.dolphin-booking-progress,.dolphin-booking-nav,.invoice-actions,.dolphin-print-hide,.dolphin-booking-flow aside,.dolphin-booking-flow>div>button,.dolphin-booking-flow>div>p{display:none!important}.booking-invoice *{break-inside:avoid}.booking-invoice{max-width:none!important;border:0!important;box-shadow:none!important;padding:0!important}@page{size:A4;margin:14mm}}</style>' +
                  '<div class="space-y-5"><div class="dolphin-booking-progress"><h2 class="text-xl font-extrabold text-slate-900">Review your booking bill</h2><p class="mt-1 text-sm leading-6 text-slate-500">Review the itemised estimate, choose how you would like to proceed, then send the booking document to Bali Trans.</p></div>' +
                  '<article class="booking-invoice mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">' +
                    '<header class="flex flex-col justify-between gap-4 border-b-2 border-[#172B4D] pb-5 sm:flex-row sm:items-start"><div><p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#4267A9]">BALI TRANS</p><h2 class="mt-2 text-2xl font-black tracking-tight text-slate-900">Booking Bill</h2><p class="mt-1 text-sm text-slate-500">Bali Dolphin & North Bali Full-Day Tour</p></div><div class="sm:text-right"><p class="text-xs uppercase tracking-wider text-slate-500">Reference</p><p class="mt-1 text-lg font-black text-[#172B4D]">'+(d.reference || (d.reference = 'BT-DOL-'+Math.random().toString(36).slice(2,8).toUpperCase()))+'</p><span class="mt-2 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">Awaiting confirmation</span><p class="mt-2 text-xs text-slate-500">'+new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})+'</p></div></header>' +
                    '<section class="mt-5"><h3 class="mb-1 text-xs font-extrabold uppercase tracking-wider text-[#4267A9]">01 · Trip details</h3>' +
                      summaryRow('Travel date',d.date)+summaryRow('Pickup location / hotel',d.pickup)+summaryRow('Guest category',d.guestType==='international'?'International guest':'Local guest')+summaryRow('Group size',(Number(d.adults||0)+Number(d.children||0))+' guests ('+d.adults+' adults, '+d.children+' children)')+summaryRow('Children’s ages',d.children?(d.childAges||'Please provide ages'):'No children')+
                    '</section><section class="mt-5 border-t border-slate-200 pt-5"><h3 class="mb-1 text-xs font-extrabold uppercase tracking-wider text-[#4267A9]">02 · Itemised estimate</h3>' +
                      summaryRow('Adult rate',money(adultRate)+' × '+d.adults)+summaryRow('Adult subtotal',money((Number(d.adults)||0)*adultRate))+summaryRow('Children’s fare',d.children?money((Number(d.children)||0)*childRate):'Not applicable')+summaryRow('Group discount',groupDiscount ? (groupDiscount*100)+'% off' : 'Not applicable')+summaryRow('Optional extras',d.addons ? [d.addons.swing?'Bali swing':null,d.addons.snorkel?'Snorkelling':null,d.addons.tanahLot?'Tanah Lot':null].filter(Boolean).join(', ') || 'None' : 'None')+summaryRow('Vehicle',d.vehicle || 'HiAce / standard as arranged')+
                      '<div class="mt-3 rounded-xl border border-[#DCE5F2] bg-[#F7F9FC] p-4"><div class="flex items-start justify-between gap-4"><span class="text-sm font-extrabold text-slate-700">Estimated subtotal</span><strong class="text-xl font-black text-[#172B4D]">'+money(d.estimatedTotal || estimatedPackage)+'</strong></div><p class="mt-2 text-xs leading-5 text-slate-500">'+(d.children?'Adult subtotal only; children’s fare is excluded until their ages and applicable rate are confirmed.':'Estimate based on the adult rate. Final itinerary, inclusions and any applicable adjustments will be confirmed before booking.')+'</p></div>' +
                    '</section><section class="mt-5 border-t border-slate-200 pt-5"><h3 class="mb-1 text-xs font-extrabold uppercase tracking-wider text-[#4267A9]">03 · Lead traveller</h3>' +
                      summaryRow('Full name',d.name)+summaryRow('Email address',d.email)+summaryRow('WhatsApp number',d.phone)+summaryRow('Special requests',d.notes||'None')+
                    '</section><section class="mt-5 border-t border-slate-200 pt-5"><h3 class="mb-2 text-xs font-extrabold uppercase tracking-wider text-[#4267A9]">04 · Payment preference</h3><p class="mb-3 text-sm leading-6 text-slate-500">Choose an available way to proceed. No payment is taken on this page.</p>' +
                      '<div class="grid gap-3 sm:grid-cols-2"><label class="flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 '+((d.paymentMethod||'whatsapp')==='whatsapp'?'border-[#172B4D] bg-[#F2F5FA]':'border-slate-200')+'"><input type="radio" name="dolphinPaymentMethod" value="whatsapp" '+((d.paymentMethod||'whatsapp')==='whatsapp'?'checked':'')+' onchange="window.dolphinBookingDraft.paymentMethod=this.value;document.querySelector(&quot;#dolphinPaymentChoices&quot;).textContent=this.value===&quot;tour-day&quot;?&quot;Selected: payment on the day of the tour, subject to confirmation.&quot;:&quot;Selected: confirm the quote and booking details via WhatsApp.&quot;" class="mt-1"><span><strong class="block text-sm text-slate-900">Confirm via WhatsApp</strong><span class="mt-1 block text-xs leading-5 text-slate-500">Discuss the final quote and booking details with our team.</span></span></label>' +
                      '<label class="flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 '+(d.paymentMethod==='tour-day'?'border-[#172B4D] bg-[#F2F5FA]':'border-slate-200')+'"><input type="radio" name="dolphinPaymentMethod" value="tour-day" '+(d.paymentMethod==='tour-day'?'checked':'')+' onchange="window.dolphinBookingDraft.paymentMethod=this.value;const a=document.getElementById(\'dolphinPaymentChoices\');if(a)a.innerHTML=renderDolphinPaymentChoiceNote(this.value)" class="mt-1"><span><strong class="block text-sm text-slate-900">Pay on the day of the tour</strong><span class="mt-1 block text-xs leading-5 text-slate-500">Payment arrangement will be confirmed by our team.</span></span></label></div>' +
                      '<div class="mt-3 rounded-xl border border-slate-200 p-4"><p class="text-sm font-extrabold text-slate-800">Online payment methods</p><div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"><button type="button" onclick="showToast(this.dataset.message)" data-message="Visa payment is temporarily unavailable. Please choose WhatsApp confirmation or payment on the day of the tour." class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-black text-slate-500">VISA<span class="mt-1 block text-[10px] font-semibold">Maintenance</span></button><button type="button" onclick="showToast(this.dataset.message)" data-message="Mastercard payment is temporarily unavailable. Please choose WhatsApp confirmation or payment on the day of the tour." class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-black text-slate-500">Mastercard<span class="mt-1 block text-[10px] font-semibold">Maintenance</span></button><button type="button" onclick="showToast(this.dataset.message)" data-message="American Express payment is temporarily unavailable. Please choose WhatsApp confirmation or payment on the day of the tour." class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-black text-slate-500">AMEX<span class="mt-1 block text-[10px] font-semibold">Maintenance</span></button><button type="button" onclick="showToast(this.dataset.message)" data-message="PayPal is temporarily unavailable. Please choose WhatsApp confirmation or payment on the day of the tour." class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-black text-slate-500">PayPal<span class="mt-1 block text-[10px] font-semibold">Maintenance</span></button></div><p class="mt-3 text-xs leading-5 text-amber-800">Online card and PayPal payments are temporarily unavailable. Please choose WhatsApp confirmation or payment on the day of the tour.</p></div>' +
                      '<div id="dolphinPaymentChoices" class="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">'+(d.paymentMethod==='tour-day'?'Selected: payment on the day of the tour, subject to confirmation.':'Selected: confirm the quote and booking details via WhatsApp.')+'</div>' +
                    '</section><section class="mt-5 border-t border-slate-200 pt-5"><h3 class="mb-2 text-xs font-extrabold uppercase tracking-wider text-[#4267A9]">Package outline</h3><ul class="space-y-2 text-sm leading-6 text-slate-600">'+allInItems.map(x=>'<li class="flex gap-2"><span class="font-bold text-[#4267A9]">—</span><span>'+x+'</span></li>').join('')+'</ul><p class="mt-4 border-t border-dashed border-slate-300 pt-3 text-xs leading-5 text-slate-500">This booking bill is an estimate and request for confirmation, not a payment receipt or final tax invoice. The final price and booking details will be confirmed before the tour.</p></section>' +
                    '<footer class="mt-6 border-t border-slate-200 pt-3 text-xs text-slate-500"><div class="flex flex-col justify-between gap-1 sm:flex-row"><span>Bali Trans · Tours, trips & private transport</span><span>Reference: '+d.reference+'</span></div></footer>' +
                  '</article><div class="invoice-actions grid gap-3 sm:grid-cols-2"><button type="button" onclick="printDolphinBookingInvoice()" class="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-700 hover:bg-slate-50"><i class="fas fa-print mr-2"></i>Print / Save as PDF</button><button type="button" onclick="sendDolphinBookingToWhatsApp()" class="rounded-xl bg-[#172B4D] px-5 py-3.5 text-sm font-extrabold text-white hover:bg-[#243e68]"><i class="fab fa-whatsapp mr-2"></i>Send booking bill to WhatsApp</button></div><p id="dolphinWhatsAppStatus" class="invoice-actions text-center text-xs leading-5 text-slate-500">WhatsApp opens with the formatted bill. Review it and tap Send to submit your request.</p></div>';
            }
            return '<div class="dolphin-booking-flow min-h-screen bg-[#F7F9FC] px-4 py-6 sm:px-6 sm:py-10 overflow-y-auto"><div class="mx-auto max-w-5xl"><button type="button" onclick="navigateTo(\'detail\',\'lovina-dolphin-tour\')" class="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#172B4D]"><i class="fas fa-arrow-left"></i> Back to tour</button><div class="dolphin-print-hide mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><span>Secure booking request</span><span>·</span><span>Step '+step+' of 4</span></div><div class="mb-8 flex items-center">'+progress+'</div><div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"><main class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">'+content+'<div class="dolphin-booking-nav mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">'+(step > 1 ? '<button type="button" onclick="advanceDolphinBookingStep(-1)" class="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Back</button>' : '<span></span>')+(step < 4 ? '<button type="button" onclick="advanceDolphinBookingStep(1)" class="rounded-xl bg-[#172B4D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#243e68]">Continue <i class="fas fa-arrow-right ml-2"></i></button>' : '<button type="button" onclick="navigateTo(\'detail\',\'lovina-dolphin-tour\')" class="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Back to tour</button>')+'</div></main><aside class="self-start rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-5 lg:max-h-[calc(100vh-2.5rem)] lg:overflow-y-auto"><h2 class="font-extrabold text-slate-900">Your tour</h2><div class="mt-3 overflow-hidden rounded-xl"><img src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=700&q=80" alt="Dolphins swimming in the sea" class="h-36 w-full object-cover"></div><h3 class="mt-3 text-sm font-extrabold leading-6 text-slate-900">Bali Dolphin Tour</h3><p class="mt-1 text-xs leading-5 text-slate-500">Full-day private tour · North Bali</p><div class="mt-4 border-t border-slate-100 pt-3 text-sm">'+summaryRow('Travel date',d.date||'To be selected')+summaryRow('Guests',((d.adults||0)+' adults, '+(d.children||0)+' children'))+'</div><p class="mt-3 text-xs leading-5 text-slate-500">Final price and availability are confirmed before you commit.</p></aside></div><p class="mt-6 text-center text-xs text-slate-400">Your request is not confirmed until Bali Trans replies with availability and final details.</p></div></div>';
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
            const adultRate = d.guestType === 'international' ? 950000 : 750000;
            const money = n => 'Rp' + Number(n || 0).toLocaleString('id-ID');
            const subtotal = (Number(d.adults)||0) * adultRate;
            const ref = d.reference || (d.reference = 'BT-DOL-' + Math.random().toString(36).slice(2,8).toUpperCase());
            const rule = '────────────────────────────────';
            const guestCount = (Number(d.adults)||0) + (Number(d.children)||0);
            return [
                'BALI TRANS',
                'BOOKING BILL · BALI DOLPHIN TOUR',
                rule,
                'REFERENCE : ' + ref,
                'STATUS    : Awaiting confirmation',
                '',
                'TRIP DETAILS',
                rule,
                'Travel date : ' + (d.date || '—'),
                'Pickup      : ' + (d.pickup || '—'),
                'Guest type  : ' + (d.guestType === 'international' ? 'International' : 'Local'),
                'Guests      : ' + guestCount + ' (' + (d.adults||0) + ' adults, ' + (d.children||0) + ' children)',
                'Child ages  : ' + (d.children ? (d.childAges || 'To be confirmed') : 'N/A'),
                '',
                'ITEMISED ESTIMATE',
                rule,
                'Adult rate  : ' + money(adultRate) + ' × ' + (d.adults||0),
                'Adult subtotal: ' + money(subtotal),
                'Children    : ' + (d.children ? 'Fare pending age confirmation' : 'N/A'),
                'ESTIMATED SUBTOTAL: ' + money(subtotal),
                d.children ? 'Note: child fare is excluded until ages and rates are confirmed.' : 'Final itinerary and inclusions are subject to confirmation.',
                '',
                'LEAD TRAVELLER',
                rule,
                'Name        : ' + (d.name || '—'),
                'Email       : ' + (d.email || '—'),
                'WhatsApp    : ' + (d.phone || '—'),
                'Requests    : ' + (d.notes || 'None'),
                '',
                'PAYMENT PREFERENCE',
                rule,
                d.paymentMethod === 'tour-day' ? 'Pay on the day of the tour (subject to confirmation).' : 'Confirm booking and final quote via WhatsApp.',
                'Online card and PayPal payments are temporarily unavailable.',
                '',
                'Please confirm availability, pickup time, inclusions and final price before the booking is confirmed.',
                'This is a booking estimate, not a payment receipt or final tax invoice.',
                rule,
                'Bali Trans · Tours, trips & private transport'
            ].join('\n');
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
