

## BDM Trans Indonesia backend foundation — 4 November 2026

- Started the separate Supabase backend project `bdm-trans-indonesia` (Singapore, PostgreSQL 17); this does not replace the public Bali Trans brand or repository and is not connected to Bagusin.
- Verified the existing private `bdm` schema, service/vehicle master data, tariff engine, customer/booking/quote/invoice tables, booking-link flow, admin auth bootstrap and four active Edge Functions.
- Added and verified migration `20261104144950_bdm_driver_assignments_and_payment_collections`: driver profiles, driver assignment history, payment collection ledger and receipt references.
- New operational tables have RLS enabled and are accessible only to the server `service_role`; public `anon` and `authenticated` roles have no schema/table privileges. Keep service credentials server-side.
- Added `supabase/migrations/20261104144950_bdm_driver_assignments_and_payment_collections.sql` and `docs/backend/BDM-BACKEND.md` as repository source-of-truth notes.
- Admin portal URL: `https://ulekpblspvmcdcxefwas.supabase.co/functions/v1/bdm-admin-app`. The owner must register there using the allowlisted owner email; the database trigger grants the owner role. No matching Auth user/admin record existed during inspection, so owner login is not yet verified.
- Current operational data is still empty: no approved tariff rows, fleet unit records, drivers, bookings, invoices or collections. Existing vehicle models are master catalogue entries, not registered physical fleet units.
- **Not production-ready yet:** admin screens/API actions for drivers and payment verification, atomic invoice reconciliation, booking/availability conflict tests, quote-to-booking lifecycle tests, PDF documents, Resend secrets, gateway/webhook integration, and end-to-end security tests remain open.
- The Supabase security advisor flags RLS-enabled private tables without policies. This is currently intentional because the `bdm` schema is not granted to browser roles; reassess before exposing any table through the Data API.
- Public GitHub Pages frontend was not changed or redeployed as part of this backend-only task. Preserve the approved homepage and service layouts when later integrating the booking API.
