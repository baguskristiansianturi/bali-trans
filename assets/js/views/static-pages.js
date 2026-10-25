        const BALI_HELP_TOPICS = {
          faq: { title: 'Frequently asked questions', intro: 'Quick answers about planning a trip, checking service details and contacting our team.', sections: [
            ['How do I ask about a trip?', 'Open Contact, choose the service you need, and share your planned date, pickup area, group size and destinations.'],
            ['Is my booking confirmed when I send an enquiry?', 'No. An enquiry is not a confirmed booking. Wait for written confirmation of the agreed service, price, schedule and payment instructions.'],
            ['What should I check before paying?', 'Check the total price, what is included, pickup details, timing, payment method and cancellation terms for your specific service.'],
            ['Can plans change after confirmation?', 'Contact the team as soon as possible. Changes depend on timing, availability and the terms agreed for your booking.']
          ]},
          'booking-payments': { title: 'Booking and payments', intro: 'Understand the steps from your first enquiry to a confirmed service.', sections: [
            ['1. Share your trip details', 'Tell us the service, date, number of guests, pickup point and places you want to visit.'],
            ['2. Review the proposal', 'Before accepting, check the itinerary or route, service duration, inclusions, exclusions, total price and any additional charges.'],
            ['3. Wait for confirmation', 'Your booking is confirmed only after the agreed details and payment status have been confirmed by the team in writing.'],
            ['4. Pay using the confirmed instructions', 'Use only the payment method and recipient details supplied in your confirmed booking. If anything looks unclear, contact the team before transferring money.'],
            ['Payment records', 'Keep your payment receipt and booking messages so they can be referenced if you need assistance.']
          ]},
          cancellations: { title: 'Changes and cancellations', intro: 'What to do when your plans change.', sections: [
            ['Request changes early', 'Contact the team as soon as you know your date, route, pickup or group size may change. A change is not confirmed until the team agrees to it.'],
            ['Availability and price', 'Changes can affect availability, timing and price. The team will need to confirm any revised details before you rely on them.'],
            ['Cancellation and refunds', 'The cancellation and refund conditions depend on the service and the terms confirmed at booking. Review those terms before payment and contact the team for clarification.'],
            ['Weather or unexpected disruption', 'If conditions may affect a trip, contact the team for guidance. Do not assume a change or refund is automatic unless the confirmed terms say so.']
          ]},
          'manage-booking': { title: 'Manage a booking', intro: 'Find the information you need before asking for a change to an existing booking.', sections: [
            ['Prepare your booking details', 'Include the name used for the booking, service or trip name, travel date and any reference number supplied to you.'],
            ['Tell us what needs to change', 'Explain whether your request concerns the date, pickup location, route, guest count, payment or cancellation. Do not send passwords or full payment-card details.'],
            ['Wait for written confirmation', 'Continue using the original arrangements until the team confirms the requested change.'],
            ['Need help now?', 'Use the Contact page and include only the details needed to identify your booking.']
          ]},
          'airport-transfer': { title: 'Airport transfers', intro: 'Information to prepare when asking about transport to or from Bali’s airport.', sections: [
            ['Details to share', 'Provide your flight number, arrival or departure date and time, number of passengers, luggage count, destination and preferred pickup point.'],
            ['Confirm before travel', 'Ask the team to confirm the pickup location, waiting arrangements, vehicle capacity, price and what happens if your flight is delayed.'],
            ['Availability', 'Submitting an enquiry does not reserve a vehicle. Wait for confirmation of availability and the agreed price.']
          ]},
          'private-transport': { title: 'Private transport', intro: 'Plan a private ride around Bali with the important details agreed in advance.', sections: [
            ['Share the route', 'List your pickup point, destinations, date, approximate start time, number of passengers and luggage.'],
            ['Check what is included', 'Confirm the service duration, route, waiting time, parking or attraction fees, overtime and any other possible charges.'],
            ['Before departure', 'Keep the confirmed itinerary and contact instructions available on the day of travel.']
          ]},
          tours: { title: 'Tours and activities', intro: 'Use these checks when choosing a tour or activity.', sections: [
            ['Review the itinerary', 'Check the places included, expected duration, pickup arrangements, activity requirements and any restrictions.'],
            ['Check inclusions and exclusions', 'Confirm meals, tickets, equipment, guide services and other costs rather than assuming they are included.'],
            ['Prepare for the day', 'Follow the confirmed meeting time and any safety or clothing instructions provided for the activity.']
          ]},
          'island-trip': { title: 'Island trips', intro: 'Plan an island visit by checking transfers, departure points and activity requirements in advance.', sections: [
            ['Confirm the destination and route', 'Share which island you plan to visit, your travel date, group size and any places or activities you want to include.'],
            ['Check transfers and departure times', 'Confirm where and when you need to meet, how transfers are arranged, and whether boat or other transport tickets are included.'],
            ['Prepare for conditions', 'Ask about luggage limits, sea conditions, activity requirements and any documents or equipment you should bring.'],
            ['Confirm the full price', 'Check what is included and which costs, such as meals, entry fees or optional activities, are separate.']
          ]}
        };

        function renderHelpCenterView() {
          const topics = [
            ['faq','Frequently asked questions','Answers to common planning questions','fa-circle-question'],
            ['booking-payments','Booking and payments','Enquiry steps, confirmation and payment checks','fa-credit-card'],
            ['cancellations','Changes and cancellations','What to do if plans change','fa-calendar-xmark'],
            ['manage-booking','Manage a booking','Prepare details for an existing booking','fa-clipboard-list'],
            ['airport-transfer','Airport transfers','Flight, pickup and luggage details','fa-plane-arrival'],
            ['private-transport','Private transport','Routes, timing and inclusions','fa-car'],
            ['tours','Tours and activities','Itinerary and activity information','fa-map-location-dot'],
            ['island-trip','Island trips','Transfers, departure times and activity preparation','fa-water']
          ];
          return `<main class="min-h-screen bg-slate-50"><section class="bg-slate-900 text-white"><div class="mx-auto max-w-6xl px-4 py-12 sm:py-16"><p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">Bali Trans · Help centre</p><h1 class="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">How can we help?</h1><p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Browse clear answers about trips, bookings, payments and changes. If your question is specific to your plans, contact our team.</p><button onclick="navigateTo('contact')" class="mt-6 rounded-xl bg-teal-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-teal-400">Contact the team <i class="fas fa-arrow-right ml-2"></i></button></div></section><section class="mx-auto max-w-6xl px-4 py-10 sm:py-14"><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${topics.map(function(t){return '<a href="?view=help-topic&id='+t[0]+'" onclick="event.preventDefault();navigateTo(\'help-topic\',\''+t[0]+'\')" class="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><i class="fas '+t[3]+'"></i></span><h2 class="mt-4 font-extrabold text-slate-900 group-hover:text-teal-800">'+t[1]+'</h2><p class="mt-2 text-sm leading-6 text-slate-600">'+t[2]+'</p><span class="mt-4 inline-flex items-center text-xs font-bold text-teal-700">Read guide <i class="fas fa-arrow-right ml-2"></i></span></a>';}).join('')}</div><div class="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"><h2 class="text-xl font-black text-slate-900">Before you confirm a trip</h2><p class="mt-2 max-w-3xl text-sm leading-7 text-slate-600">Always review the agreed price, service details, timing, pickup arrangements and cancellation terms. An enquiry by itself is not a confirmed booking.</p><div class="mt-4 flex flex-wrap gap-3"><button onclick="navigateTo('terms')" class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700">Terms and conditions</button><button onclick="navigateTo('contact')" class="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white">Ask a question</button></div></div></section></main>`;
        }

        function renderHelpTopicView(slug) {
          const topic = BALI_HELP_TOPICS[String(slug || '')];
          if (!topic) return renderHelpCenterView();
          return `<main class="min-h-screen bg-slate-50"><section class="mx-auto max-w-4xl px-4 py-8 sm:py-12"><nav class="mb-6 text-xs text-slate-500"><button onclick="navigateTo('home')" class="hover:text-teal-700">Home</button><span class="mx-2">/</span><button onclick="navigateTo('help')" class="hover:text-teal-700">Help centre</button><span class="mx-2">/</span><span>${topic.title}</span></nav><p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-700">Help guide</p><h1 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">${topic.title}</h1><p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">${topic.intro}</p><div class="mt-8 space-y-4">${topic.sections.map(function(section,index){return '<article class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 class="font-extrabold text-slate-900">'+section[0]+'</h2><p class="mt-2 text-sm leading-7 text-slate-600">'+section[1]+'</p></article>';}).join('')}</div><div class="mt-8 rounded-2xl bg-teal-50 p-5 sm:p-6"><h2 class="font-extrabold text-slate-900">Still need help?</h2><p class="mt-2 text-sm leading-6 text-slate-600">Send the team your question and relevant trip details. Do not include passwords or full payment-card information.</p><div class="mt-4 flex flex-wrap gap-3"><button onclick="navigateTo('contact')" class="rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white">Contact us</button><button onclick="navigateTo('help')" class="rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-bold text-teal-800">All help topics</button></div></div></section></main>`;
        }

        function renderLegalView(kind) {
          const isPrivacy = kind === 'privacy';
          const title = isPrivacy ? 'Privacy policy' : 'Terms and conditions';
          const privacySections = [
            ['Information you provide','When you contact Bali Trans, you may provide your name, contact details, travel date and service request. Please share only information needed to respond to your enquiry.'],
            ['How information is used','Information is used to respond to enquiries, clarify service details and communicate about a possible booking.'],
            ['Sharing and protection','Information may be shared when needed to respond, arrange an agreed service, operate the website or comply with law. Reasonable safeguards should be used, but no internet transmission or storage method is completely secure. Never send passwords or full payment-card details in a message.'],
            ['Browser data','The website may use browser storage or technical data for features such as trip lists and recently viewed items. You can manage browser storage in your browser settings.'],
            ['Your requests and policy updates','You may contact Bali Trans with questions about information you provided or request correction where applicable. This policy may change as the website and services change.'],
            ['Privacy contact','Contact Bali Trans and clearly mark your message as a privacy request.']
          ];
          const termsGroups = [
            { title: 'General terms', intro: 'Applies to enquiries and bookings unless the written confirmation for a specific service states otherwise.', sections: [
              ['Enquiries and confirmation','A WhatsApp message or enquiry is not itself a confirmed booking. Confirmation requires written agreement on service, availability, price, schedule and payment arrangements.'],
              ['Prices and inclusions','Check the written quotation for the service, route or itinerary, vehicle, date, duration, inclusions, exclusions and total price. Ask about unclear items before accepting.'],
              ['Payments','Use only payment instructions confirmed by Bali Trans. Keep relevant messages and receipts. Never share passwords or full payment-card details in a chat.'],
              ['Changes and cancellations','Change, cancellation and refund conditions must be clarified for the specific service before acceptance or payment. A requested change is not approved until confirmed in writing.'],
              ['Guest responsibilities','Provide accurate details, be ready at the agreed pickup point and time, follow safety instructions, and respect local laws, communities and property.'],
              ['Website and third parties','Website information can change and time-sensitive details should be reconfirmed. If independent operators or venues are involved, relevant conditions should be shared before booking.']
            ]},
            { title: 'Car rental and private transport', intro: 'Initial service-specific terms. The written quote must state the actual arrangement and any charges; no unstated fee should be assumed.', sections: [
              ['Rental arrangement','The confirmation must clearly state whether the service includes a driver or is another type of rental. Do not assume self-drive is available unless explicitly confirmed.'],
              ['Vehicle and capacity','Confirm the vehicle category and passenger/luggage capacity before booking. Tell Bali Trans about passenger count, luggage and any child-seat or accessibility needs.'],
              ['Pickup, route and duration','Confirm pickup point, destination or itinerary, date, start time and included duration. Extra stops, waiting, route changes or extensions require agreement and may change the price.'],
              ['Included and extra costs','The quotation should identify included items and any possible extra costs such as parking, tolls, attraction tickets or overtime. Ask for clarification before travel.'],
              ['Delays and day-of changes','Tell Bali Trans promptly if arrival time, pickup, route or group size changes. Revised arrangements depend on availability and are not confirmed until agreed in writing.'],
              ['Cancellation, no-show and refunds','Applicable deadlines, no-show treatment and refund conditions must be communicated and confirmed for the specific booking before acceptance or payment.'],
              ['Safety and conduct','Passengers must follow reasonable safety instructions and applicable law. Any service interruption or refund outcome must follow the confirmed terms and applicable law.']
            ]}
          ];
          const renderSections = sections => sections.map(s => '<section class="rounded-xl border border-slate-100 bg-white p-4"><h3 class="font-extrabold text-slate-900">'+s[0]+'</h3><p class="mt-2 text-sm leading-7 text-slate-600">'+s[1]+'</p></section>').join('');
          const body = isPrivacy
            ? '<div class="space-y-3">'+renderSections(privacySections)+'</div>'
            : '<div class="space-y-4">'+termsGroups.map((g,i) => '<details class="group overflow-hidden rounded-2xl border border-slate-200 bg-white" '+(i===0?'open':'')+'><summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-5 sm:px-6"><span><strong class="block text-base text-slate-900">'+g.title+'</strong><span class="mt-1 block text-sm leading-6 text-slate-500">'+g.intro+'</span></span><i class="fas fa-chevron-down shrink-0 transition group-open:rotate-180" aria-hidden="true"></i></summary><div class="space-y-3 border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">'+renderSections(g.sections)+'</div></details>').join('')+'<p class="text-xs leading-6 text-slate-500">These are starting conditions and must be reviewed against the actual service before launch. Booking-specific written terms and applicable law take precedence where required.</p>';
          return '<main class="min-h-screen bg-slate-50"><section class="bg-slate-900 text-white"><div class="mx-auto max-w-5xl px-4 py-10 sm:py-14"><p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">Bali Trans · Information</p><h1 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">'+title+'</h1><p class="mt-4 max-w-3xl text-sm leading-7 text-slate-300">'+(isPrivacy?'How enquiry information is intended to be handled when you contact Bali Trans.':'General conditions, with expandable service groups that can grow as new services are added.')+'</p></div></section><section class="mx-auto max-w-5xl px-4 py-8 sm:py-12"><nav class="mb-6 text-xs text-slate-500"><button onclick="navigateTo(\'home\')" class="hover:text-teal-700">Home</button><span class="mx-2">/</span><button onclick="navigateTo(\'help\')" class="hover:text-teal-700">Help centre</button><span class="mx-2">/</span><span>'+title+'</span></nav><div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8"><p class="mb-6 text-sm leading-7 text-slate-600">'+(isPrivacy?'This summary must be checked against the actual tools and data-handling practices used by the business.':'Open the section relevant to your service. Additional service-specific terms can be added here without creating a new terms page.')+'</p>'+body+'<p class="mt-8 border-t border-slate-100 pt-5 text-xs leading-6 text-slate-500">For questions about these terms or this policy, contact Bali Trans before accepting a quotation or sharing information.</p><button onclick="navigateTo(\'contact\')" class="mt-4 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white">Contact Bali Trans</button></div></section></main>';
        }

        function renderPartnersView() {
          return `<main class="min-h-screen bg-slate-50"><section class="bg-slate-900 text-white"><div class="mx-auto max-w-5xl px-4 py-12 sm:py-16"><p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">Bali Trans · Working together</p><h1 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Local partners</h1><p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Good travel experiences depend on clear communication and respectful cooperation with local service providers.</p></div></section><section class="mx-auto max-w-5xl px-4 py-10 sm:py-14"><div class="grid gap-4 sm:grid-cols-2"><article class="rounded-2xl border border-slate-200 bg-white p-5"><h2 class="font-extrabold text-slate-900">Transport providers</h2><p class="mt-2 text-sm leading-7 text-slate-600">Transport arrangements should be confirmed for each route, date, vehicle capacity and pickup location.</p></article><article class="rounded-2xl border border-slate-200 bg-white p-5"><h2 class="font-extrabold text-slate-900">Tour and activity operators</h2><p class="mt-2 text-sm leading-7 text-slate-600">Activity details, access conditions, inclusions and operator requirements should be reviewed before a trip is confirmed.</p></article><article class="rounded-2xl border border-slate-200 bg-white p-5"><h2 class="font-extrabold text-slate-900">Local communities and venues</h2><p class="mt-2 text-sm leading-7 text-slate-600">Visitors should respect local customs, site rules, private property and the communities that host them.</p></article><article class="rounded-2xl border border-slate-200 bg-white p-5"><h2 class="font-extrabold text-slate-900">Partner enquiries</h2><p class="mt-2 text-sm leading-7 text-slate-600">If you provide a relevant service in Bali and would like to discuss cooperation, share your service area, credentials and contact details.</p><button onclick="navigateTo('contact')" class="mt-4 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white">Make an enquiry</button></article></div></section></main>`;
        }

        function renderServiceInfoView(slug) {
          const key = String(slug || 'airport-transfer');
          const service = BALI_HELP_TOPICS[key] || BALI_HELP_TOPICS['airport-transfer'];
          return `<main class="min-h-screen bg-slate-50"><section class="bg-slate-900 text-white"><div class="mx-auto max-w-5xl px-4 py-12 sm:py-16"><p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">Bali Trans · Service guide</p><h1 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">${service.title}</h1><p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">${service.intro}</p><button onclick="navigateTo('contact')" class="mt-6 rounded-xl bg-teal-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-teal-400">Ask about this service</button></div></section><section class="mx-auto max-w-5xl px-4 py-10 sm:py-14"><div class="space-y-4">${service.sections.map(function(section){return '<article class="rounded-2xl border border-slate-200 bg-white p-5"><h2 class="font-extrabold text-slate-900">'+section[0]+'</h2><p class="mt-2 text-sm leading-7 text-slate-600">'+section[1]+'</p></article>';}).join('')}</div><button onclick="navigateTo('help')" class="mt-7 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700">Browse help centre</button></section></main>`;
        }


        function renderNotFoundView() {
            return '<main class="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center"><p class="text-xs font-extrabold uppercase tracking-widest text-teal-700">Bali Trans</p><h1 class="text-3xl sm:text-4xl font-black text-slate-950 mt-3">We couldn’t find that page</h1><p class="text-sm sm:text-base leading-7 text-slate-600 mt-4">This link may be outdated, or the page has not been added yet.</p><div class="flex flex-col sm:flex-row justify-center gap-3 mt-7"><button type="button" onclick="navigateTo(\'home\')" class="rounded-xl bg-bali-orange px-5 py-3 text-sm font-bold text-white">Back to home</button><button type="button" onclick="navigateTo(\'discovery\',\'region:north\')" class="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">Explore destinations</button><button type="button" onclick="navigateTo(\'blog\')" class="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">Read travel guides</button></div></main>';
        }

/* ==========================================================================
           3. VIEW RENDERING FUNCTIONS (bali STYLE)
           ========================================================================== */
        

        /* ABOUT US PAGE */
        function renderAboutView() {
            return `
              <section class="bg-slate-900 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-300 mb-4">About Bali Trans</p>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mb-6">A simpler way to plan your time in Bali.</h1>
                <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">Bali Trans helps travellers explore tour options and arrange private transport around Bali. We want the important details to be clear before you decide: where you’ll go, what the trip includes, and what needs to be confirmed.</p>
                <button onclick="navigateTo('packages')" class="mt-8 inline-flex items-center gap-2 bg-bali-orange hover:bg-bali-hover text-white font-bold px-5 py-3 rounded-xl transition">Explore tours & services <i class="fas fa-arrow-right"></i></button>
              </div></section>
              <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"><div>
                  <p class="text-xs font-extrabold uppercase tracking-wider text-bali-orange mb-3">What matters to us</p>
                  <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mb-5">Good trips start with clear expectations.</h2>
                  <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">From day tours to private transport, every trip starts with understanding your plans. Browse the options on this website and get in touch to clarify the route, timing, pickup arrangements or what is included.</p>
                  <p class="text-sm sm:text-base text-slate-600 leading-relaxed">We aim to make planning straightforward. Specific schedules, inclusions, prices and availability should be checked for each service before a booking is confirmed.</p>
                </div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-map-marked-alt"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Tour experiences</h3><p class="text-sm text-slate-600 leading-relaxed">Review destinations, highlights and itinerary details before choosing a trip.</p></div>
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-car-side"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Private transport</h3><p class="text-sm text-slate-600 leading-relaxed">Discuss pickup points, destinations and timing for your travel plans.</p></div>
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-clipboard-list"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Clear trip details</h3><p class="text-sm text-slate-600 leading-relaxed">Check inclusions, exclusions and conditions before making a decision.</p></div>
                  <div class="rounded-2xl border border-slate-200 p-5 bg-white"><div class="w-11 h-11 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center text-xl mb-4"><i class="fas fa-comments"></i></div><h3 class="font-extrabold text-slate-900 mb-2">Ask before booking</h3><p class="text-sm text-slate-600 leading-relaxed">Contact us to clarify the details that matter to your trip.</p></div>
                </div></div>
              </section>
              <section class="bg-slate-50 border-y border-slate-100"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div><h2 class="text-2xl font-black text-slate-900 mb-2">Planning a trip to Bali?</h2><p class="text-sm text-slate-600">Tell us what you have in mind and ask about the available options.</p></div>
                <button onclick="navigateTo('contact')" class="inline-flex items-center justify-center gap-2 bg-bali-orange hover:bg-bali-hover text-white font-bold px-5 py-3 rounded-xl transition">Contact Bali Trans <i class="fas fa-arrow-right"></i></button>
              </div></section>
            `;
        }

        function renderImageCreditsView() {
            const credits = [
                {name:'Cliff at Uluwatu Temple, Bali',author:'Emma THERY',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Cliff_at_Uluwatu_temple,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Rice Terraces, Ubud, Bali',author:'Vyacheslav Argenberg',license:'CC BY 4.0',file:'https://commons.wikimedia.org/wiki/File:Rice_terraces,_Ubud,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by/4.0/'},
                {name:'Tirta Gangga',author:'Umar Khatab Eko Putrawan',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Tirta_Gangga.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Lovina Beach Bali',author:'Tisa0603',license:'CC0 1.0',file:'https://commons.wikimedia.org/wiki/File:Lovina_Beach_Bali.jpg',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
                {name:'West Bali National Park Beach from Bali Strait',author:'F. H. Panggabean',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:West_Bali_National_Park_Beach_from_Bali_Strait.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Kelingking Beach',author:'Siapus',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Kelingking_Beach.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Lovina Dolphins',author:'Kahadni',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Lovina-dauphins.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Dolphins and Sunrise in Lovina, Indonesia Bali',author:'Michelle Maria',license:'CC BY 3.0',file:'https://commons.wikimedia.org/wiki/File:Dolphins_and_Sunrise_in_Lovina,_Indonesia_Bali_-_panoramio_(3).jpg',licenseUrl:'https://creativecommons.org/licenses/by/3.0/'},
                {name:'Beach at Lovina, Bali',author:'Ken Eckert',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Beach_at_Lovina,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Pantai Lovina',author:'Tisa0603',license:'CC0 1.0',file:'https://commons.wikimedia.org/wiki/File:Pantai_Lovina.jpg',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
                {name:'Bali coastal landscape (article illustration)',author:'Unsplash contributor; photo ID photo-1537996194471-e657df975ab4',license:'Unsplash License',file:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',licenseUrl:'https://unsplash.com/license'},
                {name:'Balinese food (article illustration)',author:'Unsplash contributor; photo ID photo-1555400038-63f5ba517a47',license:'Unsplash License',file:'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',licenseUrl:'https://unsplash.com/license'},
                {name:'Pantai Kelingking, Nusa Penida',author:'Kresnanta',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Pantai_Kelingking,_Nusa_Penida.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Crystal Bay Beach',author:'Siapus',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Crystal_Bay_Beach.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Diamond Beach in Nusa Penida, Bali',author:'Stryn',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Diamond_Beach_in_Nusa_Penida,_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
                {name:'Atuh Beach, Nusa Penida Bali',author:'Hendrojkson',license:'CC BY-SA 4.0',file:'https://commons.wikimedia.org/wiki/File:Atuh_Beach,_Nusa_Penida_Bali.jpg',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'}
            ];
            return `
                <section class="bg-slate-950 text-white"><div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
                    <p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">Bali Trans</p>
                    <h1 class="mt-3 text-3xl font-black sm:text-4xl">Photo credits</h1>
                    <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-300">Some destination photographs are sourced from Wikimedia Commons. Credits and license links are listed below. Images are resized for display; the original files and license terms are available from each source page.</p>
                </div></section>
                <section class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
                    <div class="space-y-3">${credits.map((item,index)=>`
                        <article class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                            <div class="flex items-start gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-extrabold text-teal-800">${String(index+1).padStart(2,'0')}</span>
                            <div class="min-w-0"><h2 class="font-extrabold text-slate-900">${item.name}</h2><p class="mt-1 text-sm text-slate-600">Author: ${item.author} · License: <a class="font-semibold text-teal-700 underline" href="${item.licenseUrl}" target="_blank" rel="noopener noreferrer">${item.license}</a></p><a class="mt-2 inline-flex text-xs font-bold text-slate-500 underline" href="${item.file}" target="_blank" rel="noopener noreferrer">View original source</a></div></div>
                        </article>`).join('')}</div>
                    <button type="button" onclick="navigateTo('home')" class="mt-7 rounded-xl bg-teal-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-teal-700">Back to Bali Trans</button>
                </section>
            `;
        }

        /* CONTACT PAGE */
        function renderContactView() {
            return `
              <section class="bg-slate-900 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-300 mb-4">Contact Bali Trans</p>
                <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mb-5">Let’s talk about your Bali trip.</h1>
                <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">Ask about a tour, private transport, pickup arrangements or trip details. Share a few details below so your enquiry is clear.</p>
              </div></section>
              <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"><div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div class="lg:col-span-2"><h2 class="text-xl font-black text-slate-900 mb-4">How can we help?</h2><p class="text-sm text-slate-600 leading-relaxed mb-6">If you have already found a tour on this website, include its name so we understand which service you are asking about.</p>
                  <div class="space-y-4">
                    <div class="flex items-start gap-3"><div class="w-10 h-10 shrink-0 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center"><i class="fas fa-map-marker-alt"></i></div><div><h3 class="font-bold text-slate-900 text-sm">Service area</h3><p class="text-sm text-slate-600 mt-1">Bali, Indonesia. Ask about your planned route and pickup area.</p></div></div>
                    <div class="flex items-start gap-3"><div class="w-10 h-10 shrink-0 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center"><i class="fas fa-route"></i></div><div><h3 class="font-bold text-slate-900 text-sm">Tours & private transport</h3><p class="text-sm text-slate-600 mt-1">Share your date, group size and places you would like to visit.</p></div></div>
                    <div class="flex items-start gap-3"><div class="w-10 h-10 shrink-0 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center"><i class="fas fa-info-circle"></i></div><div><h3 class="font-bold text-slate-900 text-sm">Before you book</h3><p class="text-sm text-slate-600 mt-1">Confirm the final price, inclusions, availability and cancellation terms before paying.</p></div></div>
                  </div>
                </div>
                <div class="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm">
                  <h2 class="text-xl font-black text-slate-900 mb-2">Send an enquiry</h2><p class="text-sm text-slate-500 mb-6">Fields marked * are required.</p>
                  <form id="contactEnquiryForm" onsubmit="submitContactEnquiry(event)" class="space-y-5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label for="contactName" class="block text-sm font-bold text-slate-700 mb-2">Your name *</label><input id="contactName" name="name" required autocomplete="name" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-bali-orange" placeholder="Name"></div>
                      <div><label for="contactEmail" class="block text-sm font-bold text-slate-700 mb-2">Email address *</label><input id="contactEmail" name="email" type="email" required autocomplete="email" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-bali-orange" placeholder="you@example.com"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label for="contactService" class="block text-sm font-bold text-slate-700 mb-2">What do you need? *</label><select id="contactService" name="service" required class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-bali-orange"><option value="">Choose a service</option><option>Day tour</option><option>Private transport</option><option>Airport transfer</option><option>Island trip</option><option>Other trip enquiry</option></select></div>
                      <div><label for="contactDate" class="block text-sm font-bold text-slate-700 mb-2">Planned date</label><input id="contactDate" name="date" type="date" min="${new Date().toISOString().split('T')[0]}" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-bali-orange"></div>
                    </div>
                    <div><label for="contactMessage" class="block text-sm font-bold text-slate-700 mb-2">Trip details *</label><textarea id="contactMessage" name="message" required rows="5" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-bali-orange" placeholder="Tell us your pickup area, group size, places you want to visit, and any questions."></textarea></div>
                    <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-bali-orange hover:bg-bali-hover text-white font-extrabold px-6 py-3.5 rounded-xl transition">Prepare enquiry <i class="fas fa-arrow-right"></i></button>
                    <p class="text-xs text-slate-500 leading-relaxed">Confirm service details and availability before making payment.</p>
                  </form>
                </div>
              </div></section>
            `;
        }

        /* Account creation is not simulated without a secure account backend. */
        function renderAccountView() {
            return '<main class="min-h-screen bg-slate-50"><section class="bg-slate-900 text-white"><div class="mx-auto max-w-4xl px-4 py-12 sm:py-16"><p class="text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">Bali Trans · Your account</p><h1 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Account access</h1><p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">We are preparing account features for a later release. You can still browse trips and send an enquiry without creating an account.</p></div></section><section class="mx-auto max-w-4xl px-4 py-10 sm:py-14"><div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"><div class="flex items-start gap-4"><span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><i class="fas fa-user-lock text-xl" aria-hidden="true"></i></span><div><h2 class="text-lg font-extrabold text-slate-900">Registration is not active in this preview</h2><p class="mt-2 text-sm leading-7 text-slate-600">Secure sign-up, sign-in, password recovery and saved booking history require a connected account service. That service is not configured yet, so this page will not ask for a password or pretend to create an account.</p></div></div><div class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"><p class="text-sm leading-6 text-amber-900"><strong>No information has been submitted or stored.</strong> You can continue as a guest and contact the team if you need help with a trip.</p></div><div class="mt-6 flex flex-col gap-3 sm:flex-row"><button type="button" onclick="navigateTo(\'packages\')" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172B4D] px-5 py-3 text-sm font-bold text-white hover:bg-[#243e68]">Continue as guest <i class="fas fa-arrow-right" aria-hidden="true"></i></button><button type="button" onclick="navigateTo(\'contact\')" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Contact the team</button></div></div></section></main>';
        }
        function submitContactEnquiry(event) {
            event.preventDefault();
            const form = document.getElementById('contactEnquiryForm');
            if (!form || !form.reportValidity()) return;
            const data = new FormData(form);
            const message = [
                'Hello Bali Trans, I would like to ask about a trip.',
                'Name: ' + data.get('name'),
                'Email: ' + data.get('email'),
                'Service: ' + data.get('service'),
                'Planned date: ' + (data.get('date') || 'Flexible / not decided'),
                'Trip details: ' + data.get('message')
            ].join('\\n');
            const contactNumber = window.BALI_TRANS_WHATSAPP_NUMBER || '';
            if (!contactNumber) {
                showToast('WhatsApp contact is temporarily unavailable. Please try again shortly.');
                return;
            }
            window.open('https://wa.me/' + contactNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
        }
