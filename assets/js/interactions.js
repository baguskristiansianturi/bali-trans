function changeCurrency(val) {
            currentCurrency = val;
            showToast(`Currency changed to ${val}`);
            navigateTo('home');
        }

        function filterByCategory(cat) {
            selectedCategoryFilter = cat;
            selectedSearchQuery = '';
        }

        function changeQty(delta) {
            currentDetailQty = Math.max(1, currentDetailQty + delta);
            document.getElementById('adultQty').innerText = currentDetailQty;
            updateBookingCalculation();
        }

        function updateBookingCalculation() {
            const curr = CURRENCY_RATES[currentCurrency];
            const base = currentDetailPackage.priceIDR;
            const selectedOptId = document.querySelector('input[name="packageOption"]:checked')?.value;
            const opt = currentDetailPackage.options.find(o => o.id === selectedOptId);
            const extra = opt ? opt.extraPriceIDR : 0;

            const unitPrice = base + extra;
            const total = unitPrice * currentDetailQty;

            const calcElem = document.getElementById('calculatedTotalPrice');
            if (calcElem) calcElem.innerText = curr.format(total);
        }

        function addToCartCurrentPkg() {
            const selectedOptId = document.querySelector('input[name="packageOption"]:checked')?.value;
            const opt = currentDetailPackage.options.find(o => o.id === selectedOptId);
            const date = document.getElementById('bookingDateInput')?.value || '';
            if (!date) {
                showToast('Please select your activity date first.');
                return;
            }

            const item = {
                id: currentDetailPackage.id,
                title: currentDetailPackage.title,
                heroImage: currentDetailPackage.heroImage,
                unitPriceIDR: currentDetailPackage.priceIDR + (opt ? opt.extraPriceIDR : 0),
                quantity: currentDetailQty,
                optionName: opt ? opt.name : 'Standard',
                date: date
            };

            cartState.push(item);
            showToast('Package added to shopping cart!');
            updateBadges();
        }

        function bookNowCurrentPkg() {
            const previousCount = cartState.length;
            addToCartCurrentPkg();
            if (cartState.length > previousCount) navigateTo('cart');
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

        function advanceCheckoutStep(step) {
            if (step === 2) {
                const name = document.getElementById('guestName')?.value.trim();
                const email = document.getElementById('guestEmail')?.value.trim();
                const phone = document.getElementById('guestPhone')?.value.trim();
                const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
                if (!name || !emailIsValid || !phone) {
                    showToast('Enter your name, a valid email, and phone number to continue.');
                    return;
                }
            }
            currentCheckoutStep = step;
            const container = document.getElementById('checkoutStepContainer');
            let grandTotal = cartState.reduce((sum, item) => sum + (item.unitPriceIDR * item.quantity), 0);
            if (container) container.innerHTML = renderCheckoutStepContent(step, grandTotal);
        }

        function handleGlobalSearch(query) {
            const dropdown = document.getElementById('searchResultsDropdown');
            if (!query.trim()) {
                dropdown.classList.add('hidden');
                return;
            }

            const matches = BALI_PACKAGES.filter(p => 
                p.title.toLowerCase().includes(query.toLowerCase()) || 
                p.location.toLowerCase().includes(query.toLowerCase())
            );

            if (matches.length > 0) {
                dropdown.classList.remove('hidden');
                dropdown.innerHTML = matches.map(m => `
                    <div onclick="navigateTo('detail', '${m.id}'); document.getElementById('searchResultsDropdown').classList.add('hidden');" class="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-3">
                        <img src="${m.heroImage}" class="w-10 h-10 object-cover rounded-lg">
                        <div>
                            <h5 class="text-xs font-extrabold text-slate-900 line-clamp-1">${m.title}</h5>
                            <span class="text-[10px] text-slate-400">${m.location}</span>
                        </div>
                    </div>
                `).join('');
            } else {
                dropdown.classList.remove('hidden');
                dropdown.innerHTML = `<div class="p-3 text-xs text-slate-400 text-center">No experiences found for "${query}"</div>`;
            }
        }

        function executeHeroSearch() {
            const query = document.getElementById('heroSearchInput')?.value || '';
            selectedCategoryFilter = 'all';
            selectedSearchQuery = query.trim();
            navigateTo('packages');
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
            // Keep a single countdown timer even when visitors return to the homepage.
            if (countdownIntervalId) clearInterval(countdownIntervalId);
            let timerSeconds = 30252;
            const timerElem = document.getElementById('countdownTimer');
            if (timerElem) {
                countdownIntervalId = setInterval(() => {
                    timerSeconds--;
                    const h = Math.floor(timerSeconds / 3600);
                    const m = Math.floor((timerSeconds % 3600) / 60);
                    const s = timerSeconds % 60;
                    timerElem.innerText = `Offer ends in: ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
                }, 1000);
            }
        }

        /* INITIAL APP LAUNCH */
        window.onload = function() {
            navigateTo('home');
        };
