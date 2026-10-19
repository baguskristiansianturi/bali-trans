function renderCartView() {
            const curr = CURRENCY_RATES[currentCurrency];

            if (cartState.length === 0) {
                return `
                    <div class="max-w-2xl mx-auto px-4 py-20 text-center">
                        <div class="w-20 h-20 bg-orange-100 text-bali-orange rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><i class="fas fa-shopping-cart" aria-hidden="true"></i></div>
                        <h2 class="text-2xl font-extrabold text-slate-900 mb-2">Your cart is empty</h2>
                        <p class="text-slate-500 text-sm mb-6">Browse experiences and add an option to review it here.</p>
                        <button onclick="navigateTo('packages')" class="bg-bali-orange text-white font-extrabold px-6 py-3 rounded-2xl text-xs shadow-lg shadow-orange-500/20">
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
                                                <span class="text-xs text-slate-400 block mt-1">Date: ${item.date} • Option: ${item.optionName}</span>
                                                <span class="text-xs font-extrabold text-slate-900 block mt-1">${curr.format(item.unitPriceIDR)} / adult</span>
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                                            <div class="flex items-center space-x-2">
                                                <button onclick="updateCartQty(${index}, -1)" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold">-</button>
                                                <span class="text-xs font-extrabold w-4 text-center">${item.quantity}</span>
                                                <button onclick="updateCartQty(${index}, 1)" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold">+</button>
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
                                    <span class="text-xl font-black text-bali-orange">${curr.format(grandTotal)}</span>
                                </div>
                                <button onclick="navigateTo('checkout')" class="w-full bg-bali-orange hover:bg-bali-hover text-white font-extrabold py-3.5 px-4 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
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
                    <div class="flex items-center justify-between mb-8 max-w-xl mx-auto text-xs font-bold">
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 1 ? 'text-bali-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 1 ? 'bg-bali-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">1</div>
                            <span>Guest Details</span>
                        </div>
                        <div class="h-0.5 flex-1 bg-slate-200 mx-2"></div>
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 2 ? 'text-bali-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 2 ? 'bg-bali-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">2</div>
                            <span>Payment</span>
                        </div>
                        <div class="h-0.5 flex-1 bg-slate-200 mx-2"></div>
                        <div class="flex flex-col items-center gap-1 ${currentCheckoutStep >= 3 ? 'text-bali-orange' : 'text-slate-400'}">
                            <div class="w-8 h-8 rounded-full ${currentCheckoutStep >= 3 ? 'bg-bali-orange text-white' : 'bg-slate-200'} flex items-center justify-center font-bold">3</div>
                            <span>E-Voucher</span>
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

            if (step === 1) {
                return `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <h3 class="text-xl font-extrabold text-slate-900">Lead Guest Information</h3>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                            <div>
                                <label class="block mb-1 text-slate-700">Full Name (Matching Passport)</label>
                                <input type="text" id="guestName"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-bali-orange">
                            </div>
                            <div>
                                <label class="block mb-1 text-slate-700">Email Address (For Voucher Delivery)</label>
                                <input type="email" id="guestEmail"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-bali-orange">
                            </div>
                            <div>
                                <label class="block mb-1 text-slate-700">WhatsApp / Phone Number</label>
                                <input type="text" id="guestPhone"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-bali-orange">
                            </div>
                            <div>
                                <label class="block mb-1 text-slate-700">Hotel Pickup Location in Bali</label>
                                <input type="text" id="guestHotel"  class="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-bali-orange">
                            </div>
                        </div>

                        <button onclick="advanceCheckoutStep(2)" class="w-full bg-bali-orange hover:bg-bali-hover text-white font-extrabold py-3.5 px-6 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
                            Continue to Payment →
                        </button>
                    </div>
                `;
            } else if (step === 2) {
                return `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <h3 class="text-xl font-extrabold text-slate-900">Select Payment Method</h3>
                        
                        <div class="space-y-3">
                            <label class="flex items-center justify-between p-4 rounded-2xl border-2 border-bali-orange bg-orange-50/30 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <input type="radio" name="paymentMethod" checked class="accent-bali-orange">
                                    <span class="text-xs font-extrabold text-slate-900">Credit / Debit Card (Visa / Mastercard)</span>
                                </div>
                                <span class="text-xs text-slate-400">Instant</span>
                            </label>
                            <label class="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <input type="radio" name="paymentMethod" class="accent-bali-orange">
                                    <span class="text-xs font-extrabold text-slate-900">QRIS / GoPay / OVO</span>
                                </div>
                                <span class="text-xs text-slate-400">Indonesian E-Wallet</span>
                            </label>
                            <label class="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <input type="radio" name="paymentMethod" class="accent-bali-orange">
                                    <span class="text-xs font-extrabold text-slate-900">Direct WhatsApp Cash on Pickup</span>
                                </div>
                                <span class="text-xs text-slate-400">Pay Driver</span>
                            </label>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                            <span class="text-xs font-bold text-slate-600">Total Payable Amount</span>
                            <span class="text-xl font-black text-bali-orange">${curr.format(totalIDR)}</span>
                        </div>

                        <button onclick="advanceCheckoutStep(3)" class="w-full bg-bali-orange hover:bg-bali-hover text-white font-extrabold py-3.5 px-6 rounded-2xl transition text-xs shadow-lg shadow-orange-500/20">
                            Preview Demo Voucher
                        </button>
                    </div>
                `;
            } else {
                // STEP 3: DIGITAL E-VOUCHER SCREEN
                const refCode = 'BALI-' + Math.floor(100000 + Math.random() * 900000);
                setTimeout(() => {
                    document.getElementById('qrcodeContainer').innerHTML = '';
                    new QRCode(document.getElementById("qrcodeContainer"), {
                        text: refCode,
                        width: 120,
                        height: 120
                    });
                }, 100);

                return `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-xl space-y-6 text-center">
                        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto">✓</div>
                        <div>
                            <span class="text-xs font-extrabold text-amber-700 uppercase tracking-widest block mb-1">Demo Preview Only</span>
                            <h2 class="text-2xl font-black text-slate-900">Your Demo Voucher Preview</h2>
                            <p class="text-xs text-slate-500 mt-1">Preview Reference: <strong class="text-slate-900">${refCode}</strong></p>
                        </div>

                        <p class="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">This is a visual prototype only. No booking has been sent, no payment has been processed, and this QR code is not a valid ticket.</p>

                        <!-- Digital QR Voucher Card -->
                        <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left max-w-md mx-auto space-y-4">
                            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                                <div>
                                    <span class="text-[10px] uppercase font-bold text-slate-400 block">Lead Traveler</span>
                                    <span class="text-xs font-extrabold text-slate-900">${document.getElementById('guestName')?.value || 'John Doe'}</span>
                                </div>
                                <div id="qrcodeContainer" class="p-1 bg-white rounded"></div>
                            </div>
                            <div>
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Booked Experiences</span>
                                <ul class="text-xs font-bold text-slate-800 space-y-1 mt-1">
                                    ${cartState.map(i => `<li>• ${i.title} (${i.quantity}x)</li>`).join('')}
                                </ul>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onclick="showToast('Voucher download is a demo only; no real booking has been made.')" class="bg-slate-900 text-white text-xs font-extrabold px-6 py-3 rounded-2xl hover:bg-slate-800 transition">
                                <i class="fas fa-download mr-1"></i> Download Voucher PDF
                            </button>
                            <a href="https://wa.me/6281234567890?text=Hi%20BaliExplorer,%20I%20have%20booking%20code%20${refCode}" target="_blank" class="bg-emerald-500 text-white text-xs font-extrabold px-6 py-3 rounded-2xl hover:bg-emerald-600 transition flex items-center justify-center gap-1">
                                <i class="fab fa-whatsapp"></i> Send to WhatsApp Concierge
                            </a>
                        </div>
                    </div>
                `;
            }
        }

        /* ==========================================================================
           4. INTERACTIVE EVENT HANDLERS & HELPERS
           ========================================================================== */
        
        let currentDetailQty = 1;
