function navigateTo(viewName, params = null, options = {}) {
            if (options.history !== false && typeof window !== 'undefined') {
                const url = new URL(window.location.href);
                url.searchParams.set('page', viewName);
                if (params !== null && params !== undefined && params !== '') url.searchParams.set('item', params);
                else url.searchParams.delete('item');
                if (options.replace) window.history.replaceState({ viewName, params }, '', url);
                else window.history.pushState({ viewName, params }, '', url);
            }
            const container = document.getElementById('appContainer');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            switch (viewName) {
                case 'home':
                    container.innerHTML = renderHomeView();
                    initHomeInteractivity();
                    break;
                case 'packages':
                    container.innerHTML = renderPackagesCatalogView();
                    break;
                case 'detail':
                    if (params) {
                        const pkg = BALI_PACKAGES.find(p => p.id === params);
                        if (pkg) currentDetailPackage = pkg;
                    }
                    container.innerHTML = renderDetailView(currentDetailPackage);
                    break;
                case 'blog':
                    container.innerHTML = renderBlogListView();
                    break;
                case 'blog-read':
                    const blog = BALI_BLOGS.find(b => b.id === params || b.slug === params);
                    container.innerHTML = renderBlogDetailView(blog);
                    break;
                case 'blog-label':
                    container.innerHTML = renderBlogLabelView(params);
                    break;
                case 'cart':
                    container.innerHTML = renderCartView();
                    break;
                case 'checkout':
                    currentCheckoutStep = 1;
                    container.innerHTML = renderCheckoutView();
                    break;
                default:
                    container.innerHTML = renderHomeView();
            }
            updateBadges();
        }

        /* ==========================================================================
           3. VIEW RENDERING FUNCTIONS (KLOOK STYLE)
           ========================================================================== */
        
        /* VIEW 1: HOME PAGE */
