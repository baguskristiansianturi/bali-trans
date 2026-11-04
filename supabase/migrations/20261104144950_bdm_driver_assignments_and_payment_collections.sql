-- BDM Trans Indonesia — operational foundation
-- Applied to Supabase project ulekpblspvmcdcxefwas (PostgreSQL 17).
-- Private backend tables: access is restricted to service_role Edge Functions.

create sequence if not exists bdm.payment_receipt_seq;

create table if not exists bdm.driver_profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  license_number text,
  license_expiry date,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint driver_profiles_phone_nonempty check (length(trim(phone)) > 0)
);

create unique index if not exists driver_profiles_phone_unique
  on bdm.driver_profiles (phone);

create table if not exists bdm.driver_assignments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bdm.bookings(id) on delete restrict,
  driver_id uuid not null references bdm.driver_profiles(id) on delete restrict,
  vehicle_id uuid references bdm.vehicles(id) on delete set null,
  assignment_status text not null default 'assigned'
    check (assignment_status in ('assigned','accepted','declined','in_progress','completed','cancelled')),
  assigned_at timestamptz not null default now(),
  accepted_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  assigned_by uuid references auth.users(id) on delete set null,
  driver_note text,
  internal_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists driver_assignments_booking_idx
  on bdm.driver_assignments (booking_id, assigned_at desc);
create index if not exists driver_assignments_driver_status_idx
  on bdm.driver_assignments (driver_id, assignment_status, assigned_at desc);
create unique index if not exists driver_assignments_one_active_per_booking
  on bdm.driver_assignments (booking_id)
  where assignment_status in ('assigned','accepted','in_progress');

create table if not exists bdm.payment_collections (
  id uuid primary key default gen_random_uuid(),
  receipt_number bigint generated always as identity unique,
  receipt_reference text unique,
  booking_id uuid not null references bdm.bookings(id) on delete restrict,
  invoice_id uuid references bdm.invoices(id) on delete restrict,
  amount numeric(14,2) not null check (amount > 0),
  currency char(3) not null default 'IDR',
  collection_method text not null
    check (collection_method in ('cash','bank_transfer','payment_gateway','other')),
  collection_status text not null default 'pending'
    check (collection_status in ('pending','collected','verified','rejected','refunded')),
  collected_at timestamptz,
  collected_by_driver_id uuid references bdm.driver_profiles(id) on delete set null,
  verified_at timestamptz,
  verified_by uuid references auth.users(id) on delete set null,
  external_reference text,
  proof_storage_path text,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payment_collections_booking_idx
  on bdm.payment_collections (booking_id, created_at desc);
create index if not exists payment_collections_invoice_idx
  on bdm.payment_collections (invoice_id, created_at desc);
create index if not exists payment_collections_status_idx
  on bdm.payment_collections (collection_status, created_at desc);

create or replace function bdm.set_payment_receipt_reference()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  if new.receipt_reference is null then
    new.receipt_reference := 'BDM-RCPT-' || to_char(now(), 'YYYY') || '-' ||
      lpad(new.receipt_number::text, 6, '0');
  end if;
  return new;
end;
$function$;

drop trigger if exists payment_collections_set_reference on bdm.payment_collections;
create trigger payment_collections_set_reference
before insert on bdm.payment_collections
for each row execute function bdm.set_payment_receipt_reference();

drop trigger if exists driver_profiles_set_updated_at on bdm.driver_profiles;
create trigger driver_profiles_set_updated_at
before update on bdm.driver_profiles
for each row execute function bdm.set_updated_at();

drop trigger if exists driver_assignments_set_updated_at on bdm.driver_assignments;
create trigger driver_assignments_set_updated_at
before update on bdm.driver_assignments
for each row execute function bdm.set_updated_at();

drop trigger if exists payment_collections_set_updated_at on bdm.payment_collections;
create trigger payment_collections_set_updated_at
before update on bdm.payment_collections
for each row execute function bdm.set_updated_at();

alter table bdm.driver_profiles enable row level security;
alter table bdm.driver_assignments enable row level security;
alter table bdm.payment_collections enable row level security;

revoke all on table bdm.driver_profiles, bdm.driver_assignments, bdm.payment_collections
  from anon, authenticated;
grant all on table bdm.driver_profiles, bdm.driver_assignments, bdm.payment_collections
  to service_role;
grant usage, select on sequence bdm.payment_receipt_seq to service_role;
revoke all on sequence bdm.payment_receipt_seq from anon, authenticated;
