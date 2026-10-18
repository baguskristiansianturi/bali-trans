/* ==========================================================================
           1. DATA STORES (PACKAGES, BLOGS, STATE)
           ========================================================================== */
        const CURRENCY_RATES = {
            IDR: { symbol: 'Rp ', rate: 1, format: (v) => 'Rp ' + Math.round(v).toLocaleString('id-ID') },
            USD: { symbol: '$', rate: 0.000063, format: (v) => '$' + (v * 0.000063).toFixed(2) },
            AUD: { symbol: 'A$', rate: 0.000096, format: (v) => 'A$' + (v * 0.000096).toFixed(2) },
            EUR: { symbol: '€', rate: 0.000058, format: (v) => '€' + (v * 0.000058).toFixed(2) }
        };

        let currentCurrency = 'IDR';

        const BALI_PACKAGES = [
            {
                id: 'pkg-1',
                title: 'Ubud Art Village, Tegallalang Rice Terrace & Jungle Swing Day Tour',
                category: 'temple',
                categoryName: 'Culture & Temple',
                location: 'Ubud, Gianyar',
                rating: 4.9,
                reviewCount: 3420,
                originalPriceIDR: 650000,
                priceIDR: 450000,
                badge: 'Bestseller',
                instantConfirmation: true,
                freeCancellation: true,
                hotelTransfer: true,
                heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80'
                ],
                highlights: [
                    'Swing high above lush tropical green jungle valleys in Tegallalang.',
                    'Visit Sacred Monkey Forest Sanctuary and historic Ubud Palace.',
                    'Enjoy hassle-free round-trip hotel pickup in air-conditioned vehicle.',
                    'Sip authentic Luwak coffee at a traditional Balinese coffee plantation.'
                ],
                itinerary: [
                    { time: '08:30 AM', title: 'Hotel Pickup', desc: 'Direct pick up from Kuta, Seminyak, Canggu, Sanur, or Ubud hotel.' },
                    { time: '10:00 AM', title: 'Tegallalang Rice Terraces & Swing', desc: 'Explore UNESCO rice terraces and take iconic swing photos.' },
                    { time: '12:30 PM', title: 'Traditional Balinese Lunch', desc: 'Enjoy authentic Nasi Campur overlooking the valley.' },
                    { time: '02:00 PM', title: 'Sacred Monkey Forest Sanctuary', desc: 'Walk through ancient temple sanctuary with hundreds of playful macaques.' },
                    { time: '04:30 PM', title: 'Ubud Art Market & Return', desc: 'Shop local handicrafts before relaxing return drive.' }
                ],
                options: [
                    { id: 'opt-1-1', name: 'Standard Group Tour', extraPriceIDR: 0, desc: 'Shared vehicle, licensed guide, entry tickets included.' },
                    { id: 'opt-1-2', name: 'VIP Private Driver + Buffet Lunch', extraPriceIDR: 200000, desc: 'Private luxury MPV driver, flexible schedule, gourmet lunch.' }
                ]
            },
            {
                id: 'pkg-2',
                title: 'Nusa Penida All-Inclusive Island Day Tour (West & East Coast)',
                category: 'nusa',
                categoryName: 'Nusa Islands',
                location: 'Nusa Penida Island',
                rating: 4.95,
                reviewCount: 5120,
                originalPriceIDR: 950000,
                priceIDR: 680000,
                badge: 'Klook Choice',
                instantConfirmation: true,
                freeCancellation: true,
                hotelTransfer: true,
                heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
                ],
                highlights: [
                    'Snap world-famous cliff photos at Kelingking T-Rex Beach.',
                    'Swim in crystal clear natural infinity pools at Angel’s Billabong.',
                    'Includes fast boat return tickets from Sanur harbor & island private transport.',
                    'Snorkeling add-on available with Manta Rays at Manta Point.'
                ],
                itinerary: [
                    { time: '06:30 AM', title: 'Hotel Pick-Up & Sanur Harbor Check-in', desc: 'Early transfer to ensure smooth fast boat departure.' },
                    { time: '08:00 AM', title: 'Fast Boat Ride to Nusa Penida', desc: '45-minute speed boat ride across the Badung Strait.' },
                    { time: '09:30 AM', title: 'Kelingking Beach Lookout', desc: 'Iconic T-Rex shaped rock formation view.' },
                    { time: '12:00 PM', title: 'Broken Beach & Angel’s Billabong', desc: 'Marvel at natural archway and emerald lagoon.' },
                    { time: '04:30 PM', title: 'Return Fast Boat to Bali', desc: 'Arrive back in Sanur harbor and transfer to hotel.' }
                ],
                options: [
                    { id: 'opt-2-1', name: 'West Penida Highlight Tour', extraPriceIDR: 0, desc: 'Includes Kelingking, Broken Beach, Angel Billabong & Crystal Bay.' },
                    { id: 'opt-2-2', name: 'West + Snorkeling with Manta Rays', extraPriceIDR: 300000, desc: 'Adds 2-hour boat snorkeling session at Manta Point & Gamat Bay.' }
                ]
            },
            {
                id: 'pkg-3',
                title: 'Mount Batur Sunrise Volcano Trekking with Breakfast & Hot Springs',
                category: 'atv',
                categoryName: 'Trekking & Adventure',
                location: 'Kintamani, Bali',
                rating: 4.88,
                reviewCount: 2890,
                originalPriceIDR: 700000,
                priceIDR: 490000,
                badge: 'Top Rated',
                instantConfirmation: true,
                freeCancellation: true,
                hotelTransfer: true,
                heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
                ],
                highlights: [
                    'Hike to the summit of active Mount Batur volcano at 1,717m height.',
                    'Watch unforgettable sunrise with steam-cooked eggs breakfast at the crater.',
                    'Soak tired muscles in natural volcanic hot spring pools at Toya Devasya.'
                ],
                itinerary: [
                    { time: '02:00 AM', title: 'Night Hotel Pickup', desc: 'Early morning pickup from your Bali hotel.' },
                    { time: '03:30 AM', title: 'Begin Summit Trek', desc: 'Guided 2-hour climb with headlights and professional mountain guide.' },
                    { time: '06:00 AM', title: 'Sunrise Summit Breakfast', desc: 'Enjoy hot tea, banana sandwich, and steam eggs.' },
                    { time: '08:30 AM', title: 'Natural Hot Springs Soak', desc: 'Relaxing hot bath overlooking Lake Batur.' }
                ],
                options: [
                    { id: 'opt-3-1', name: 'Standard Trekking + Hot Springs', extraPriceIDR: 0, desc: 'Includes guide, trekking pole, breakfast, and hot springs ticket.' },
                    { id: 'opt-3-2', name: '4WD Mount Batur Jeep Sunrise (No Walking)', extraPriceIDR: 250000, desc: 'Ascend the volcanic black lava fields comfortably in a open 4x4 Jeep.' }
                ]
            },
            {
                id: 'pkg-4',
                title: 'Tanjung Benoa Watersports: Parasailing, Jet Ski & Banana Boat',
                category: 'water',
                categoryName: 'Water Sports',
                location: 'Nusa Dua, South Bali',
                rating: 4.82,
                reviewCount: 1940,
                originalPriceIDR: 500000,
                priceIDR: 320000,
                badge: 'Flash Deal 35% OFF',
                instantConfirmation: true,
                freeCancellation: true,
                hotelTransfer: false,
                heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
                ],
                highlights: [
                    'Soar high over Bali tropical coastline with Tandem Parasailing Adventure.',
                    'Ride top-tier Yamaha Jet Skis with certified instructor.',
                    'Includes full insurance safety equipment, lockers, and shower facilities.'
                ],
                itinerary: [
                    { time: '09:00 AM', title: 'Arrival & Safety Briefing', desc: 'Check in at watersports desk and gear up with life jackets.' },
                    { time: '09:30 AM', title: '3 Watersport Activities', desc: 'Consecutive fun sessions on Parasailing, Jet Ski, and Banana Boat.' }
                ],
                options: [
                    { id: 'opt-4-1', name: 'Fun Trio Package (Parasail + JetSki + Banana)', extraPriceIDR: 0, desc: 'Complete 3 activity combo pack.' },
                    { id: 'opt-4-2', name: 'Extreme Sea Walker + Flying Fish Combo', extraPriceIDR: 280000, desc: 'Walk underwater on ocean floor with special air helmet.' }
                ]
            },
            {
                id: 'pkg-5',
                title: 'Full Day Bali Private Car Charter with English Speaking Driver',
                category: 'driver',
                categoryName: 'Private Driver',
                location: 'All Bali Coverage',
                rating: 4.98,
                reviewCount: 8900,
                originalPriceIDR: 700000,
                priceIDR: 520000,
                badge: 'Super Service',
                instantConfirmation: true,
                freeCancellation: true,
                hotelTransfer: true,
                heroImage: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80'
                ],
                highlights: [
                    '10 Hours customizable private car charter anywhere in main island Bali.',
                    'Fuel, parking fees, highway tolls, and friendly local driver included.',
                    'Clean modern air-conditioned Toyota Avanza or Innova MPV.'
                ],
                itinerary: [
                    { time: 'Flexible', title: 'Custom Itinerary', desc: 'You choose where to go: Seminyak, Uluwatu, Tanah Lot, Bedugul, or Kintamani!' }
                ],
                options: [
                    { id: 'opt-5-1', name: 'Standard MPV (1-5 Passengers)', extraPriceIDR: 0, desc: 'Toyota Avanza or Suzuki Ertiga.' },
                    { id: 'opt-5-2', name: 'Luxury Toyota HiAce Van (Up to 12 Passengers)', extraPriceIDR: 450000, desc: 'Spacious high-roof minibus for big families or groups.' }
                ]
            },
            {
                id: 'pkg-6',
                title: 'Ayung River White Water Rafting & Quad Bike ATV Adventure',
                category: 'atv',
                categoryName: 'Trekking & Adventure',
                location: 'Ubud, Bali',
                rating: 4.91,
                reviewCount: 4100,
                originalPriceIDR: 850000,
                priceIDR: 590000,
                badge: 'Bestseller',
                instantConfirmation: true,
                freeCancellation: true,
                hotelTransfer: true,
                heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
                gallery: [
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
                ],
                highlights: [
                    '2 Hours thrilling white water rafting along Ayung River rainforest gorges.',
                    '2 Hours mud track ATV quad biking through caves, waterfalls, and rice fields.',
                    'Hot buffet lunch and hot shower facility included.'
                ],
                itinerary: [
                    { time: '08:00 AM', title: 'Hotel Pick Up', desc: 'Pickup and drive to Ubud adventure center.' },
                    { time: '09:30 AM', title: 'White Water Rafting', desc: 'Conquer Class II & III rapids with experienced rafting guide.' },
                    { time: '12:30 PM', title: 'Buffet Lunch', desc: 'Indonesian buffet meal overlooking jungle.' },
                    { time: '01:30 PM', title: 'ATV Quad Bike Ride', desc: 'Ride through mud tracks, tunnels, and river bed.' }
                ],
                options: [
                    { id: 'opt-6-1', name: 'Single ATV Rider + Rafting', extraPriceIDR: 0, desc: '1 Person per ATV bike.' },
                    { id: 'opt-6-2', name: 'Tandem ATV (2 Persons on 1 ATV) + Rafting', extraPriceIDR: -100000, desc: 'Great option for couples sharing an ATV.' }
                ]
            }
        ];

        const BALI_BLOGS = [
            {
                id: 'blog-1',
                title: 'The Ultimate First-Timer’s Bali Travel Guide (2026 Edition)',
                category: 'Guide',
                readTime: '6 min read',
                author: 'Siti Rahma',
                date: 'Oct 12, 2026',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
                snippet: 'Everything you need to know about Visa on Arrival, best neighborhoods to stay, currency tips, and avoiding tourist traps in Bali.',
                content: `
                    <p class="mb-4">Planning your dream vacation to Bali in 2026? Known as the Island of the Gods, Bali continues to top global travel wishlists. Whether you seek spiritual retreats in Ubud, party beaches in Canggu, or pristine underwater coral reefs in Nusa Penida, this guide has you covered.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">1. Entry Requirements & E-Visa</h3>
                    <p class="mb-4">Travelers from over 90 countries can obtain a 30-day Visa on Arrival (VoA) either at Ngurah Rai International Airport or online prior to arrival. Ensure your passport is valid for at least 6 months.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">2. Choosing Where to Stay</h3>
                    <ul class="list-disc pl-5 mb-4 space-y-1">
                        <li><strong>Canggu & Seminyak:</strong> Beach clubs, trendy cafes, surfing, vibrant nightlife.</li>
                        <li><strong>Ubud:</strong> Rice terraces, yoga retreats, traditional arts, monkey forest.</li>
                        <li><strong>Uluwatu:</strong> Dramatic cliffs, world-class luxury resorts, surf breaks, Kecak fire dance.</li>
                        <li><strong>Sanur:</strong> Family-friendly, calm water beaches, peaceful vibe.</li>
                    </ul>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">3. Getting Around Bali</h3>
                    <p class="mb-4">Public transit is limited. The most convenient way to explore is hiring a private driver for 10-hour day trips or renting a scooter if you are an experienced rider with an international driving permit.</p>
                `
            },
            {
                id: 'blog-2',
                title: 'Top 7 Instagrammable Spots in Nusa Penida & How to Visit Them',
                category: 'Destinations',
                readTime: '4 min read',
                author: 'Alex Rivera',
                date: 'Sep 28, 2026',
                image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
                snippet: 'Discover Kelingking Beach, Diamond Beach, Atuh, and the famous treehouse with step-by-step fast boat schedules.',
                content: `
                    <p class="mb-4">Nusa Penida is a rugged island just 45 minutes off the coast of Bali. It boasts some of the most spectacular coastal cliffs in Southeast Asia.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Must-Visit Spots:</h3>
                    <ol class="list-decimal pl-5 mb-4 space-y-2">
                        <li><strong>Kelingking T-Rex Beach:</strong> The famous cliff shaped like a Tyrannosaurus Rex.</li>
                        <li><strong>Diamond Beach:</strong> Pristine white sand with diamond-shaped karst rocks.</li>
                        <li><strong>Molenteng Tree House:</strong> Iconic wooden house perched on the edge overlooking Thousand Island viewpoint.</li>
                    </ol>
                `
            },
            {
                id: 'blog-3',
                title: 'A Practical Guide to Finding Halal Food in Bali',
                category: 'Culinary',
                readTime: '5 min read',
                author: 'Made Budi',
                date: 'Sep 15, 2026',
                image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
                snippet: 'How to plan meal stops, check restaurant information and find suitable dining options while exploring Bali.',
                content: `
                    <p class="mb-4">Planning meals ahead can make a day exploring Bali more comfortable. Restaurant menus, opening hours and food preparation practices can vary, so check the latest information directly with each venue before you visit.</p>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Before you choose a restaurant</h3>
                    <ul class="list-disc pl-5 mb-4 space-y-1">
                        <li>Search for restaurants that clearly describe the food options you need.</li>
                        <li>Contact the venue to confirm ingredients, preparation practices and current availability.</li>
                        <li>Check opening hours and allow extra travel time, especially when visiting multiple areas in one day.</li>
                        <li>Keep a backup dining option near your planned route.</li>
                    </ul>
                    <p class="mb-4">Bali has a varied dining scene across its towns and tourist areas. A little checking before departure helps you choose stops that suit your preferences without disrupting the day’s itinerary.</p>
                `
            }
        ];
