/* APP STATE */
        let cartState = [];
        let wishlistState = [];
        let selectedCategoryFilter = 'all';
        let currentDetailPackage = BALI_PACKAGES[0];
        let currentCheckoutStep = 1;
        // Preserve the active route when locale changes; language switching must never send users home.
        let currentViewName = 'home';
        let currentViewParams = null;
