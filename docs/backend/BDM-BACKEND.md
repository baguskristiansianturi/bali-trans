# BDM Trans Indonesia — Backend Notes

Updated: 4 November 2026

## Brand and project boundary

- Internal backend/system identity: **BDM Trans Indonesia**.
- Current public website and repository identity: **Bali Trans**.
- Legal entity wording **PT BDM Trans Indonesia** belongs only on legal/official documents.
- Supabase project: `bdm-trans-indonesia` (`ulekpblspvmcdcxefwas`), Singapore, PostgreSQL 17.
- Do not connect this project to Bagusin or reuse Bagusin credentials/data.

## Architecture

The current public site remains a static GitHub Pages frontend. The backend is a separate Supabase project:

- Postgres schema `bdm`: private operational data.
- Supabase Auth: admin identity.
- Edge Functions: privileged server-side operations; service-role credentials stay in function secrets.
- Public booking links: opaque random tokens; only token hashes are stored.
- Admin portal: `https://ulekpblspvmcdcxefwas.supabase.co/functions/v1/bdm-admin-app`.
- Admin API: `bdm-admin` (JWT required; checks `bdm.admin_users`).
- Public booking: `bdm-public-booking` (token-based; no user JWT).
- Email sender: `bdm-send-email` (JWT required; requires Resend secrets).

Never put a Supabase service-role/secret key in the static website, public repository, or browser storage. Browser clients may use only the publishable key and only against explicitly granted, RLS-protected resources. The `bdm` schema is deliberately not directly granted to `anon` or `authenticated`; Edge Functions use the server credential.

## Existing database capabilities

The initial schema contains:

- Service types: Airport Transfer, Port Transfer, Intercity Transfer, Full Day Tour.
- Vehicle categories and model catalogue.
- Service zones and tariff/surcharge/discount rules.
- Customers, bookings, booking links, quotes and quote items.
- Invoices and invoice items.
- Email outbox, audit logs and admin user roles.

The pricing engine is rule-based. Do not invent or publish production tariffs from the prototype's sample prices. Insert approved business prices into tariff rules only after the owner confirms them.

## Operational additions — 4 November 2026

Migration `20261104144950_bdm_driver_assignments_and_payment_collections` adds:

- `bdm.driver_profiles`: driver master records.
- `bdm.driver_assignments`: assignment history, status and optional vehicle.
- `bdm.payment_collections`: cash/bank/gateway/other collections, receipt references, collection and verification metadata.

All three tables have RLS enabled and are restricted to the server `service_role`; they are not directly readable from public browser clients. The migration is recorded in Supabase and versioned in `supabase/migrations/`.

## Admin account bootstrap

The initial owner is allowlisted in the database bootstrap trigger for the owner's exact email address. Register through the admin portal using that email; after Supabase Auth creates the user, the trigger adds the corresponding `owner` record in `bdm.admin_users`. Other self-registered accounts are not granted admin privileges. If email confirmation is enabled, confirm the email before attempting login.

Do not add public admin registration or trust user-editable metadata as an authorization source.

## Booking and finance workflow target

One source of truth must serve enquiries received from the website, WhatsApp, phone, Facebook, Instagram and campaign landing pages:

1. Create/receive enquiry and customer record.
2. Check service, date, passenger count, zone and vehicle availability.
3. Calculate a server-side quote from approved tariff rules and save a pricing snapshot.
4. Confirm the booking and issue invoice/receipt documents.
5. Assign a driver and vehicle; retain assignment history.
6. Record money collected by driver or through bank/payment provider.
7. Finance/owner verifies collection and reconciles invoice balance.
8. Keep audit history for all sensitive changes.

The operational payment progression is **pending → collected → verified** (with rejected/refunded states); booking status remains a separate lifecycle. Do not conflate booking status with payment status.

## Not yet production-ready

- No owner Auth user was present when this backend was inspected on 4 November 2026. The owner must register via the admin portal.
- No real tariff rows were present; the owner must enter approved prices.
- No fleet unit/registration records, drivers, bookings, quotes, invoices or payment collections had been entered.
- Driver and payment tables now exist, but the admin screens/API actions for managing them still need implementation.
- Online payment gateway, webhook verification, email provider secrets, PDF invoice/receipt generation, availability conflict handling, partner/tour package management and multi-language public booking integration remain pending.
- The security advisor reports RLS-enabled tables without policies. This is currently intentional for the private `bdm` schema because `anon` and `authenticated` have no schema/table privileges; only server `service_role` access is granted. Reassess this design before exposing any table directly through the Data API.
- Do not store live customer data or treat the system as launch-ready until auth, permissions, booking, pricing, payment and recovery tests pass.

## Safe change rules

- Keep all schema changes in timestamped `supabase/migrations/*.sql` files and apply them to the BDM project only.
- Verify every migration by listing tables/columns and checking privileges/RLS after application.
- Never expose secret keys or put customer data in repository docs/issues.
- Keep the public Bali Trans homepage and existing service UI untouched unless a separate frontend task requests integration.
