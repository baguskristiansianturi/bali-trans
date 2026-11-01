# 01 — Business & Service Data

**Status:** ACTIVE DISCOVERY — data is being collected incrementally.

This domain stores factual reference data used by service pages, articles, itineraries, recommendations, pricing logic and future application data.

| Planned record | Status | Required coverage |
|---|---|---|
| [Service Master](../SERVICE-MASTER.md) | EXISTS — initial baseline | Service families and service types |
| Fleet Master | DISCUSSION — initial facts captured | Vehicle make/model, class, seats, luggage, facilities, suitability, verification |
| Service Detail Records | NOT STARTED | Individual service scope, process, duration, requirements |
| Operating Area & Route Master | NOT STARTED | Pick-up zones, destinations, routes, distance and restrictions |
| Service Inclusions & Exclusions | NOT STARTED | Included, optional, excluded and conditional items by service |
| Destination Master | NOT STARTED | Location, access, attractions, timings, fees, facilities, source and verification |
| Activity & Experience Master | NOT STARTED | Activity details, operators, duration, eligibility, safety and fees |
| Accommodation/Area Reference | FUTURE / DISCUSSION | Relevant areas and accommodation reference information, if needed |
| Pricing & Calculator Master | WAITING FOR DATA | Approved formulas, variables, surcharges, rounding and examples after calculator validation |
| Payment Method Reference | NOT STARTED | Supported methods, currencies, processing and restrictions |
| Media & Asset Register | NOT STARTED | Image/video ownership, source, license, usage rights and attribution |

**Pricing boundary:** do not create or publish tariff values from illustrative examples. The pricing master waits for the user's calculator logic and validated rates.

**Data quality:** distinguish user-provided operational data, externally verified facts, estimates and recommendations.
