/* APP STATE */
        let cartState = [];
        let wishlistState = [];
        let selectedCategoryFilter = 'all';
        let selectedSearchQuery = '';
        let countdownIntervalId = null;
        let currentDetailPackage = BALI_PACKAGES[0];
        let currentCheckoutStep = 1;

        /* ==========================================================================
           2. NAVIGATION & ROUTING ENGINE
           ========================================================================== */
