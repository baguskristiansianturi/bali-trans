/* ==========================================================================
           2. NAVIGATION & ROUTING ENGINE
           ========================================================================== */
        // This is a single-document app: never let the browser animate/restore the old page scroll on route changes.
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

        // Reset every possible document scroll root after SPA content replacement.
        // On mobile browsers the layout can settle after innerHTML is assigned, so do it
        // immediately and again after the next paint to keep the new page's content in view.
        // This is a client-side router: browser-native scroll restoration must not
        // restore the previous route's footer position after a view has been replaced.
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
        function resetRouteScroll() {
            const reset = () => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.documentElement.scrollLeft = 0;
                if (document.body) {
                    document.body.scrollTop = 0;
                    document.body.scrollLeft = 0;
                }
                const app = document.getElementById('appContainer');
                if (app) {
                    app.scrollTop = 0;
                    app.scrollLeft = 0;
                }
            };
            reset();
            window.requestAnimationFrame(() => {
                reset();
                window.requestAnimationFrame(reset);
            });
        }

        function navigateTo(viewName, params = null, navigationOptions = {}) {
            const container = document.getElementById('appContainer');
            currentViewName = viewName;
            currentViewParams = params;
            document.body.classList.toggle('checkout-mode', viewName === 'checkout');

            // Treat view changes as page navigation: update browser history and URL,
            // and reset scroll instantly instead of animating through the old page.
            if (navigationOptions.history !== false && window.history && window.history.pushState) {
                const url = new URL(window.location.href);
                url.searchParams.delete('tour');
                if (viewName === 'home') {
                    url.searchParams.delete('page');
                    url.searchParams.delete('item');
                } else {
                    url.searchParams.set('page', viewName);
                    if (params !== null && params !== undefined && params !== '') url.searchParams.set('item', String(params));
                    else url.searchParams.delete('item');
                }
                const state = { baliTransView: viewName, baliTransParams: params };
                if (navigationOptions.replace) window.history.replaceState(state, '', url);
                else if (url.href !== window.location.href) window.history.pushState(state, '', url);
            }
            syncLocaleSelector();

            switch (viewName) {
                case 'home':
                    container.innerHTML = renderHomeView();
                    initHomeInteractivity();
                    break;
                case 'about':
                    container.innerHTML = renderAboutView();
                    break;
                case 'contact':
                    container.innerHTML = renderContactView();
                    break;
                case 'help':
                    container.innerHTML = renderHelpCenterView();
                    break;
                case 'help-topic':
                    container.innerHTML = renderHelpTopicView(params);
                    break;
                case 'terms':
                    container.innerHTML = renderLegalView('terms');
                    break;
                case 'privacy':
                    container.innerHTML = renderLegalView('privacy');
                    break;
                case 'partners':
                    container.innerHTML = renderPartnersView();
                    break;
                case 'service-info':
                    container.innerHTML = renderServiceInfoView(params);
                    break;
                case 'packages':
                    container.innerHTML = renderPackagesCatalogView();
                    break;
                case 'discovery':
                    container.innerHTML = renderDiscoveryView(params || 'region:south');
                    break;
                case 'detail': {
                    const pkg = params ? BALI_PACKAGES.find(p => p.id === params) : null;
                    currentDetailQty = 1;
                    if (!pkg) {
                        container.innerHTML = renderNotFoundView();
                    } else {
                        currentDetailPackage = pkg;
                        trackRecentlyViewed(pkg);
                        container.innerHTML = renderDetailView(pkg);
                        setTimeout(() => { updatePackageOptionDetails(); selectLovinaGallery(0); initDetailSectionTracking(); }, 0);
                    }
                    break;
                }
                case 'blog':
                    container.innerHTML = renderBlogListView();
                    break;
                case 'blog-read': {
                    const blog = BALI_BLOGS.find(b => b.id === params);
                    container.innerHTML = blog ? renderBlogDetailView(blog) : renderNotFoundView();
                    break;
                }
                case 'not-found':
                    container.innerHTML = renderNotFoundView();
                    break;
                case 'cart':
                    container.innerHTML = renderCartView();
                    break;
                case 'checkout':
                    currentCheckoutStep = 1;
                    container.innerHTML = renderCheckoutView();
                    break;
                case 'image-credits':
                    container.innerHTML = renderImageCreditsView();
                    break;
                default:
                    container.innerHTML = renderHomeView();
            }
            updateBadges();
            updatePageMetadata(viewName, params);
            applyLanguageCopy(document);
            // Normal navigation starts at the top; locale refreshes keep the visitor's position.
            if (navigationOptions.preserveScroll) {
                const preservedY = Number(navigationOptions.scrollY || 0);
                window.scrollTo({ top: preservedY, left: 0, behavior: 'auto' });
            } else {
                resetRouteScroll();
            }
        }

        function updatePageMetadata(viewName, params) {
            const defaultDescription = 'Explore Bali tours, island trips, local experiences and private transport with Bali Trans. Review trip details and contact the team before booking.';
            const metadata = {
                home: ['Bali Trans | Bali Tours, Activities & Private Transport', defaultDescription],
                about: ['About Bali Trans | Our Approach to Bali Travel', 'Learn about Bali Trans and how we help travellers explore Bali tours and arrange private transport.'],
                contact: ['Contact Bali Trans | Plan Your Bali Trip', 'Contact Bali Trans to discuss Bali tours, private transport, pickup arrangements and trip details.'],
                help: ['Help Centre | Bali Trans', 'Find practical answers about trips, bookings, payments, changes and cancellations.'],
                'help-topic': ['Travel Help Guide | Bali Trans', 'Practical information about Bali Trans services and booking arrangements.'],
                terms: ['Terms and Conditions | Bali Trans', 'Read the terms that apply to Bali Trans website use and service enquiries.'],
                privacy: ['Privacy Policy | Bali Trans', 'Learn how information shared through Bali Trans enquiries is handled.'],
                partners: ['Local Partners | Bali Trans', 'Information for local service providers interested in working with Bali Trans.'],
                'service-info': ['Bali Travel Services | Bali Trans', 'Review service details and what to confirm before booking.'],
                packages: ['Bali Tours & Activities | Bali Trans', 'Browse Bali tour packages, activities and private transport options. Check trip details before contacting the team.'],
                discovery: ['Explore Bali Destinations | Bali Trans', 'Discover destinations and travel experiences across Bali with Bali Trans.'],
                detail: [currentDetailPackage ? currentDetailPackage.title + ' | Bali Trans' : 'Bali Tour Details | Bali Trans', currentDetailPackage ? 'Review the itinerary, highlights and important details for ' + currentDetailPackage.title + ' in Bali.' : defaultDescription],
                blog: ['Bali Travel Guides & Tips | Bali Trans', 'Read Bali travel guides, destination tips, food recommendations and practical advice for planning your trip.'],
                'blog-read': null,
                cart: ['Your Trip List | Bali Trans', 'Review the Bali tours and activities you have added to your trip list.'],
                checkout: ['Booking Enquiry | Bali Trans', 'Review your trip details and prepare a booking enquiry with Bali Trans.'],
                'image-credits': ['Photo Credits | Bali Trans', 'Sources, authors and licenses for destination photographs used on Bali Trans.'],
                'not-found': ['Page Not Found | Bali Trans', 'This Bali Trans page could not be found. Explore destinations or read the available travel guides.']
            };
            let selected = metadata[viewName] || metadata.home;
            if (viewName === 'discovery') {
                const destinationMetadata = {
                    'region:south':['South Bali: Beaches, Temples & Coastal Views | Bali Trans','Explore South Bali beaches, coastal viewpoints, temples and travel ideas for Uluwatu, Jimbaran and Nusa Dua.'],
                    'region:central':['Central Bali: Ubud, Highlands & Nature | Bali Trans','Explore Central Bali villages, cultural sites, highland landscapes and outdoor activities.'],
                    'region:east':['East Bali: Temples, Coast & Countryside | Bali Trans','Discover East Bali temples, coastal destinations, gardens and countryside routes.'],
                    'region:north':['North Bali: Lovina, Waterfalls & Highlands | Bali Trans','Explore North Bali dolphin-watching areas, waterfalls, hot springs, highland viewpoints and cultural sites.'],
                    'region:west':['West Bali: Coast & National Park | Bali Trans','Discover West Bali coastal destinations, rural scenery and nature areas.'],
                    'region:nusa':['Nusa Islands: Penida, Lembongan & Ceningan | Bali Trans','Plan a visit to Nusa Penida, Nusa Lembongan and Nusa Ceningan with practical coastal and transfer guidance.'],
                    'duration:full-day':['Full-Day Tours in Bali | Bali Trans','Explore ideas for a full day in Bali and review routes, travel time and service details.'],
                    'duration:long-trip':['Long Trips Around Bali | Bali Trans','Explore longer routes around Bali and plan travel time between destinations.'],
                    'service:private-driver':['Private Driver in Bali | Bali Trans','Learn about arranging private transport in Bali and confirming routes, pickup and service duration.'],
                    'place:lovina':['Lovina Beach & Dolphin Watching | Bali Trans','Practical information for visiting Lovina in North Bali, including coastal stops and dolphin-watching considerations.'],
                    'place:banjar-hot-springs':['Banjar Hot Springs | Bali Trans','Plan a visit to Banjar Hot Springs in North Bali and review practical bathing guidance.'],
                    'place:brahmavihara-arama':['Brahmavihara-Arama Monastery | Bali Trans','Discover the Buddhist monastery near Banjar in North Bali and review respectful visitor guidance.'],
                    'place:gitgit-waterfall':['Gitgit Waterfall | Bali Trans','Explore Gitgit Waterfall in North Bali with practical notes on trails and access.'],
                    'place:munduk':['Munduk Waterfalls & Highlands | Bali Trans','Plan a trip to Munduk’s highland scenery and waterfalls in North Bali.'],
                    'place:wanagiri':['Wanagiri Twin Lakes Viewpoint | Bali Trans','Discover Wanagiri viewpoints overlooking the twin lakes in North Bali.'],
                    'place:menjangan':['Menjangan Island & West Bali National Park | Bali Trans','Explore Menjangan Island and West Bali National Park with notes on boat transfers and access requirements.'],
                    'place:gedong-kirtya':['Gedong Kirtya Library | Bali Trans','Learn about Gedong Kirtya in Singaraja and its Balinese manuscript heritage.'],
                    'place:uluwatu':['Uluwatu Temple & Coastal Cliffs | Bali Trans','Explore Uluwatu Temple and South Bali coastal viewpoints with respectful visitor guidance.'],
                    'place:jimbaran':['Jimbaran Coast | Bali Trans','Discover Jimbaran Bay, coastal walks and seafood dining options in South Bali.'],
                    'place:nusa-dua':['Nusa Dua Beaches & Water Activities | Bali Trans','Plan a visit to Nusa Dua beaches and check sea conditions before water activities.'],
                    'place:denpasar':['Denpasar City Sights | Bali Trans','Explore Denpasar city sights, markets and cultural places with practical visitor tips.'],
                    'place:ubud':['Ubud & Surrounding Villages | Bali Trans','Discover Ubud’s arts, cultural sites, nearby villages and rice landscapes.'],
                    'place:rafting':['River Rafting in Bali | Bali Trans','Review practical safety questions and planning tips for river rafting in Bali.'],
                    'place:rice-terraces':['Rice Terraces & Nature Stops | Bali Trans','Explore Bali rice landscapes and outdoor stops with guidance for respectful visits.'],
                    'place:amed':['Amed & Jemeluk Bay | Bali Trans','Discover Amed and Jemeluk Bay on Bali’s east coast, including snorkelling and diving considerations.'],
                    'place:tulamben':['Tulamben & USAT Liberty Wreck | Bali Trans','Plan underwater activities in Tulamben and check guide, equipment and sea conditions.'],
                    'place:tirta-gangga':['Tirta Gangga Water Palace | Bali Trans','Visit Tirta Gangga’s water gardens in East Bali with practical access tips.'],
                    'place:taman-ujung':['Taman Ujung Water Palace | Bali Trans','Explore Taman Ujung’s historic gardens and architecture in Karangasem.'],
                    'place:lempuyang':['Lempuyang Temple | Bali Trans','Review visitor guidance for Lempuyang Temple in East Bali.'],
                    'place:besakih':['Besakih Temple | Bali Trans','Learn about Besakih Temple and plan a respectful visit on Mount Agung’s slopes.'],
                    'place:candidasa-padangbai':['Candidasa & Padangbai | Bali Trans','Plan east-coast stops and check harbour details before connecting to boat services.'],
                    'place:sidemen':['Sidemen Valley | Bali Trans','Discover Sidemen Valley’s rural scenery and village landscapes in East Bali.'],
                    'place:medewi':['Medewi Surf Coast | Bali Trans','Explore Medewi’s surf coast and check local sea and tide conditions.'],
                    'place:rambut-siwi':['Rambut Siwi Temple | Bali Trans','Plan a respectful visit to Rambut Siwi Temple on Bali’s west coast.'],
                    'place:bunut-bolong':['Bunut Bolong Tree Tunnel | Bali Trans','Discover Bunut Bolong in Jembrana and review safe roadside stopping guidance.'],
                    'place:perancak':['Perancak Fishing Village | Bali Trans','Learn about Perancak’s coastal village setting and visit respectfully.'],
                    'place:gilimanuk':['Gilimanuk Bay & Ferry Gateway | Bali Trans','Plan a visit to Gilimanuk Bay and confirm ferry details before travelling.'],
                    'place:west-bali-national-park':['West Bali National Park | Bali Trans','Explore West Bali National Park and check current visitor access and activity requirements.'],
                    'place:nusa-lembongan':['Nusa Lembongan & Mangrove Forest | Bali Trans','Plan island transfers and explore Nusa Lembongan’s coastal and mangrove areas.'],
                    'place:nusa-ceningan':['Nusa Ceningan & Yellow Bridge | Bali Trans','Discover Nusa Ceningan and the Yellow Bridge with practical island travel notes.'],
                    'place:island-snorkelling-diving':['Snorkelling & Diving Around the Nusa Islands | Bali Trans','Review sea conditions, operator guidance and marine-care tips for Nusa Islands activities.'],
                    'place:kuta-beach':['Kuta Beach | Bali Trans','Plan a visit to Kuta Beach with practical surf, beach-safety and local travel tips.'],
                    'place:seminyak-beach':['Seminyak Beach | Bali Trans','Explore Seminyak Beach, sunset views and nearby dining with practical coastal safety notes.'],
                    'place:sanur-beach':['Sanur Beach | Bali Trans','Discover Sanur Beach, its coastal path and island boat connections with useful planning tips.'],
                    'place:kelingking-beach':['Kelingking Beach, Nusa Penida | Bali Trans','Plan a safe visit to Kelingking’s cliff viewpoint and review steep-access and coastal safety guidance.'],
                    'place:crystal-bay':['Crystal Bay, Nusa Penida | Bali Trans','Review practical access, snorkelling considerations and sea-safety guidance for Crystal Bay.'],
                    'place:diamond-beach':['Diamond Beach, Nusa Penida | Bali Trans','Plan a visit to Diamond Beach and review steep-step access and coastal safety considerations.'],
                    'place:atuh-beach':['Atuh Beach, Nusa Penida | Bali Trans','Discover Atuh Beach with practical notes on access, tide conditions and swimming safety.']
                };
                selected = destinationMetadata[params] || metadata['not-found'];
            }
            if (viewName === 'blog-read') {
                const article = BALI_BLOGS.find(item => item.id === params);
                selected = article
                    ? [article.title + ' | Bali Travel Guides | Bali Trans', article.snippet || defaultDescription]
                    : metadata['not-found'];
            }
            if (viewName === 'detail' && !BALI_PACKAGES.some(pkg => pkg.id === params)) {
                selected = metadata['not-found'];
            }
            document.title = selected[0];
            let description = document.querySelector('meta[name="description"]');
            if (!description) {
                description = document.createElement('meta');
                description.name = 'description';
                document.head.appendChild(description);
            }
            description.setAttribute('content', selected[1]);
        }
