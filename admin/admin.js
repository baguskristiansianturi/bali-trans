import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";

const SUPABASE_URL = "https://ulekpblspvmcdcxefwas.supabase.co";
const SUPABASE_KEY = "sb_publishable_6xEpoyVDa0jAXAp_pX_TsQ_ISBJp_NV";
const API_URL = SUPABASE_URL + "/functions/v1/bali-admin-api";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = (id) => document.getElementById(id);
let catalog = { services: [], categories: [], models: [], zones: [], tariffs: [], discounts: [] };
let bookings = [];
let fleetData = { models: [], vehicles: [], photos: [] };
let isSignup = false;
let toastTimer;

function message(text, isError = false) {
  const el = $("auth-message");
  el.textContent = text;
  el.classList.remove("hidden");
  el.style.background = isError ? "#fff0f0" : "#edf6f2";
  el.style.color = isError ? "#963c3c" : "#27634d";
}
function toast(text) {
  const el = $("toast");
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}
function money(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value || 0));
}
function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
function showApp(user) {
  $("auth-screen").classList.add("hidden");
  $("app").classList.remove("hidden");
  $("account-email").textContent = user.email || "Akun admin";
  loadAll();
}
function showAuth() {
  $("app").classList.add("hidden");
  $("auth-screen").classList.remove("hidden");
}
async function api(action, data = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Sesi berakhir. Silakan masuk kembali.");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session.access_token,
      "apikey": SUPABASE_KEY
    },
    body: JSON.stringify({ action, ...data })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 403) throw new Error("Akun belum memiliki hak akses admin. Pastikan email yang digunakan adalah email pemilik yang sudah didaftarkan.");
    throw new Error(result.message || result.details || result.error || "Permintaan tidak berhasil.");
  }
  return result;
}
async function loadAll() {
  try {
    const [nextCatalog, nextBookings, nextFleet] = await Promise.all([api("catalog"), api("list_bookings"), api("fleet")]);
    catalog = nextCatalog;
    bookings = nextBookings.bookings || [];
    fleetData = nextFleet;
    renderDashboard();
    renderFleet();
    renderTariffs();
    renderBookings();
    fillTariffForm();
  } catch (error) {
    toast(error.message);
    if (/Sesi berakhir/.test(error.message)) {
      await supabase.auth.signOut();
      showAuth();
    }
  }
}
function renderDashboard() {
  $("stat-models").textContent = catalog.models.length;
  $("stat-tariffs").textContent = catalog.tariffs.length;
  $("stat-bookings").textContent = bookings.length;
}
function renderFleet() {
  const root = $("fleet-list");
  const models = fleetData.models || [];
  $("vehicle-category").innerHTML = catalog.categories.map(x => '<option value="' + safe(x.id) + '">' + safe(x.name) + '</option>').join("");
  $("unit-model").innerHTML = models.map(x => '<option value="' + safe(x.id) + '">' + safe(x.make) + ' ' + safe(x.model) + '</option>').join("");
  if (!models.length) root.innerHTML = '<div class="empty">Belum ada model kendaraan. Tambahkan model pertama di atas.</div>';
  else root.innerHTML = models.map(model => {
    const category = model.vehicle_categories?.name || "Armada";
    const capacity = model.passenger_capacity ? model.passenger_capacity + " penumpang" : "Kapasitas belum diisi";
    const photos = (fleetData.photos || []).filter(p => p.vehicle_model_id === model.id);
    const gallery = photos.length ? '<div class="photo-grid">' + photos.map(p => '<figure><img src="' + safe(p.public_url) + '" alt="' + safe(p.alt_text || (model.make + " " + model.model)) + '" loading="lazy"><button type="button" class="photo-delete" data-delete-photo="' + safe(p.id) + '" aria-label="Hapus foto">×</button></figure>').join("") + '</div>' : '<p class="muted">Belum ada foto untuk model ini.</p>';
    return '<article class="data-card"><h3>' + safe(model.make) + ' ' + safe(model.model) + '</h3><p>' + safe(category) + ' · ' + safe(capacity) + '</p><div class="data-meta"><span class="tag">' + (model.is_active ? "Aktif" : "Nonaktif") + '</span><span class="tag">' + safe(model.luggage_capacity || "—") + ' bagasi</span><span class="tag">' + photos.length + ' foto</span></div>' + gallery + '<form class="photo-upload" data-model-id="' + safe(model.id) + '"><input type="file" name="file" accept="image/jpeg,image/png,image/webp" capture="environment" required><button class="outline" type="submit">Unggah foto</button></form></article>';
  }).join("");
  const units = fleetData.vehicles || [];
  $("vehicle-unit-list").innerHTML = units.length ? units.map(v => '<article class="data-card"><h3>' + safe(v.unit_code) + ' · ' + safe(v.vehicle_models?.make || "") + ' ' + safe(v.vehicle_models?.model || "") + '</h3><p>' + safe(v.registration_number || "Nomor polisi belum diisi") + ' · ' + safe(v.year_of_manufacture || "Tahun —") + '</p><div class="data-meta"><span class="tag">' + safe(v.operational_status) + '</span></div></article>').join("") : '<div class="empty">Belum ada unit kendaraan yang didaftarkan.</div>';
}
function fillTariffForm() {
  const fill = (id, rows, label) => {
    $(id).innerHTML = rows.map(row => '<option value="' + safe(row.value) + '">' + safe(row.label) + '</option>').join("");
  };
  fill("tariff-service", catalog.services.map(x => ({ value:x.code, label:x.name })));
  fill("tariff-model", catalog.models.map(x => ({ value:x.id, label:x.make + " " + x.model })));
  fill("tariff-zone", catalog.zones.map(x => ({ value:x.code, label:x.name })));
}
function renderTariffs() {
  $("tariff-count").textContent = catalog.tariffs.length;
  const root = $("tariff-list");
  if (!catalog.tariffs.length) {
    root.innerHTML = '<div class="empty">Belum ada aturan tarif. Tambahkan aturan pertama di atas.</div>';
    return;
  }
  root.innerHTML = catalog.tariffs.map(t => {
    const svc = t.service_types?.name || "Layanan";
    const vehicle = [t.vehicle_models?.make, t.vehicle_models?.model].filter(Boolean).join(" ");
    const zone = t.service_zones?.name || "Zona";
    return '<article class="data-card"><h3>' + safe(t.rule_name) + '</h3><p>' + safe(svc) + ' · ' + safe(vehicle) + '</p><div class="data-meta"><span class="tag">' + safe(zone) + '</span><span class="tag">' + money(t.base_amount) + '</span><span class="tag">' + (t.is_active ? "Aktif" : "Nonaktif") + '</span></div></article>';
  }).join("");
}
function renderBookings() {
  const root = $("booking-list");
  if (!bookings.length) {
    root.innerHTML = '<div class="empty">Belum ada permintaan pemesanan yang masuk.</div>';
    return;
  }
  root.innerHTML = bookings.map(b => {
    const customer = b.customers?.full_name || "Pelanggan";
    const service = b.service_types?.name || "Layanan";
    const vehicle = [b.vehicle_models?.make, b.vehicle_models?.model].filter(Boolean).join(" ");
    const date = b.pickup_at ? new Date(b.pickup_at).toLocaleString("id-ID", { dateStyle:"medium", timeStyle:"short" }) : "Waktu belum ditentukan";
    const status = String(b.booking_status || "inquiry").replaceAll("_", " ");
    return '<article class="data-card"><h3>' + safe(b.booking_reference || "Permintaan") + '</h3><p><b>' + safe(customer) + '</b> · ' + safe(service) + '</p><p>' + safe(b.pickup_location || "Lokasi belum diisi") + ' → ' + safe(b.destination || "Tujuan belum diisi") + '</p><p>' + safe(date) + (vehicle ? ' · ' + safe(vehicle) : "") + '</p><div class="data-meta"><span class="tag">' + safe(status) + '</span>' + (b.quotes?.grand_total ? '<span class="tag">' + money(b.quotes.grand_total) + '</span>' : "") + '</div></article>';
  }).join("");
}
function navigate(page) {
  document.querySelectorAll(".page").forEach(el => el.classList.toggle("active", el.id === "page-" + page));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  window.scrollTo({ top: 0, behavior: "instant" });
}
$("toggle-auth").addEventListener("click", () => {
  isSignup = !isSignup;
  $("login-form").classList.toggle("hidden", isSignup);
  $("signup-form").classList.toggle("hidden", !isSignup);
  $("auth-title").textContent = isSignup ? "Buat akun admin" : "Selamat datang";
  $("auth-copy").textContent = isSignup ? "Gunakan email pemilik untuk membuat akses pertama." : "Masuk untuk mengelola operasional Bali Trans dari HP.";
  $("toggle-auth").textContent = isSignup ? "Sudah punya akun? Masuk di sini" : "Belum punya akun? Daftar di sini";
  $("auth-message").classList.add("hidden");
});
$("login-form").addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  button.textContent = "Memeriksa akun…";
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email: $("login-email").value.trim(), password: $("login-password").value });
    if (error) throw error;
    showApp(data.user);
  } catch (error) {
    message(error.message || "Tidak dapat masuk.", true);
  } finally {
    button.disabled = false;
    button.textContent = "Masuk ke aplikasi";
  }
});
$("signup-form").addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  button.textContent = "Membuat akun…";
  try {
    const email = $("signup-email").value.trim();
    const password = $("signup-password").value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.session) showApp(data.user);
    else message("Akun berhasil dibuat. Periksa email untuk verifikasi, lalu masuk kembali.");
  } catch (error) {
    message(error.message || "Pendaftaran gagal.", true);
  } finally {
    button.disabled = false;
    button.textContent = "Buat akun admin";
  }
});
$("vehicle-model-form").addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    await api("save_vehicle_model", {
      category_id: $("vehicle-category").value,
      make: $("vehicle-make").value.trim(),
      model: $("vehicle-model-name").value.trim(),
      passenger_capacity: $("vehicle-capacity").value || null,
      luggage_capacity: $("vehicle-luggage").value || null,
      description: $("vehicle-description").value.trim(),
      is_active: true
    });
    event.target.reset();
    await loadAll();
    toast("Model kendaraan berhasil disimpan.");
  } catch (error) { toast(error.message); }
  finally { button.disabled = false; button.textContent = "Simpan model kendaraan"; }
});
$("vehicle-unit-form").addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    await api("save_vehicle", {
      vehicle_model_id: $("unit-model").value,
      unit_code: $("unit-code").value.trim(),
      registration_number: $("unit-plate").value.trim(),
      year_of_manufacture: $("unit-year").value || null,
      operational_status: $("unit-status").value,
      is_active: true
    });
    event.target.reset();
    await loadAll();
    toast("Unit kendaraan berhasil disimpan.");
  } catch (error) { toast(error.message); }
  finally { button.disabled = false; button.textContent = "Simpan unit kendaraan"; }
});
$("fleet-list").addEventListener("submit", async event => {
  const form = event.target.closest(".photo-upload");
  if (!form) return;
  event.preventDefault();
  const button = form.querySelector("button");
  const input = form.querySelector('input[type="file"]');
  const file = input.files?.[0];
  if (!file) return toast("Pilih foto terlebih dahulu.");
  if (file.size > 5 * 1024 * 1024) return toast("Ukuran foto maksimal 5 MB.");
  button.disabled = true;
  button.textContent = "Mengunggah…";
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const data = new FormData();
    data.append("action", "upload_vehicle_photo");
    data.append("vehicle_model_id", form.dataset.modelId);
    data.append("alt_text", file.name);
    data.append("file", file);
    const response = await fetch(API_URL, { method: "POST", headers: { "Authorization": "Bearer " + session.access_token, "apikey": SUPABASE_KEY }, body: data });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || result.details || result.error || "Upload gagal.");
    await loadAll();
    toast("Foto kendaraan berhasil diunggah.");
  } catch (error) { toast(error.message); }
  finally { button.disabled = false; button.textContent = "Unggah foto"; }
});
$("fleet-list").addEventListener("click", async event => {
  const button = event.target.closest("[data-delete-photo]");
  if (!button) return;
  if (!window.confirm("Hapus foto kendaraan ini?")) return;
  button.disabled = true;
  try {
    await api("delete_vehicle_photo", { photo_id: button.dataset.deletePhoto });
    await loadAll();
    toast("Foto dihapus.");
  } catch (error) { toast(error.message); }
});
$("tariff-form").addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    await api("save_tariff", {
      service_code: $("tariff-service").value,
      vehicle_model_id: $("tariff-model").value,
      zone_code: $("tariff-zone").value,
      rule_name: $("tariff-name").value.trim(),
      base_amount: Number($("tariff-amount").value),
      included_hours: $("tariff-hours").value || null,
      maximum_hours: null,
      notes: $("tariff-notes").value.trim(),
      is_active: true
    });
    event.target.reset();
    await loadAll();
    toast("Aturan tarif berhasil disimpan.");
  } catch (error) {
    toast(error.message);
  } finally {
    button.disabled = false;
    button.textContent = "Simpan aturan tarif";
  }
});
document.querySelectorAll(".nav-item").forEach(el => el.addEventListener("click", () => navigate(el.dataset.page)));
document.querySelectorAll("[data-go]").forEach(el => el.addEventListener("click", () => navigate(el.dataset.go)));
$("refresh-fleet").addEventListener("click", loadAll);
$("refresh-bookings").addEventListener("click", loadAll);
async function logout() {
  await supabase.auth.signOut();
  showAuth();
}
$("logout").addEventListener("click", logout);
$("logout-bottom").addEventListener("click", logout);
const { data: { session } } = await supabase.auth.getSession();
if (session?.user) showApp(session.user);
supabase.auth.onAuthStateChange((_event, sessionNow) => {
  if (sessionNow?.user) showApp(sessionNow.user);
  else showAuth();
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}