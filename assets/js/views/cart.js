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
