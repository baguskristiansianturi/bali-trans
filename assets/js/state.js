/* APP STATE */
        let cartState = [];
        let wishlistState = [];
        let selectedCategoryFilter = 'all';
        let currentDetailPackage = BALI_PACKAGES[0];
        let currentCheckoutStep = 1;
        // Preserve the active route when locale changes; language switching must never send users home.
        let currentViewName = 'home';
        let currentViewParams = null;

// Draft data for the dedicated all-inclusive Bali Dolphin Tour booking form.
window.dolphinBookingDraft = { date:'', adults:2, children:0, pickup:'', childAges:'', name:'', email:'', phone:'', notes:'', paymentMethod:'whatsapp', reference:'' };
