# 02 — Modul Halaman yang Sudah Ada

**Status:** INVENTARIS AWAL  
Peta rute utama: content/ROUTE_MASTER_MAPPING.md  
Daftar pola halaman: TEMPLATE-REGISTRY.md

## 1. Modul Halaman SPA

Semua tampilan SPA dijalankan melalui index.html dan ditampilkan di dalam #appContainer.

| Kelompok halaman | Pembentuk tampilan/sumber | Status saat ini |
|---|---|---|
| Halaman utama | assets/js/views/home.js | Sudah ada; desain yang disetujui harus dipertahankan kecuali diminta jelas |
| Penjelajahan/destinasi | assets/js/views/discovery.js | Sudah ada |
| Katalog/daftar paket | assets/js/views/catalog.js | Sudah ada |
| Detail paket/wisata | assets/js/views/detail.js | Sudah ada; jalur umum dan khusus Dolphin |
| Daftar artikel/detail artikel | assets/js/views/articles.js | Sudah ada; pola baku detail artikel belum disetujui |
| Keranjang | assets/js/views/cart.js | Tampilan prototipe |
| Checkout | assets/js/views/checkout.js | Tampilan prototipe; kerangka global disembunyikan pada mode checkout |
| Halaman informasi statis | assets/js/views/static-pages.js | Sudah ada; bantuan, hukum, kontak, tentang, akun, dan rute terkait |
| Metadata rute/SEO | assets/js/navigation.js | Lapisan rute dan metadata bersama |

## 2. Kelompok Halaman Mandiri

Berkas HTML berikut merupakan pintu masuk publik di folder utama repository. Pertahankan alamat berkasnya.

### Halaman Transportasi dan Layanan
- transport-service.html
- bali-airport-transfer.html
- bali-intercity-transfer.html
- bali-port-transfer.html
- bali-private-day-tour.html
- private-transport.html
- car-rental.html
- bali-adventure-activities.html

### Pemesanan dan Checkout
- booking-form.html
- bali-airport-transfer-checkout.html
- watersport-checkout.html

### Olahraga Air
- watersport-tanjung-benoa.html
- watersport-banana-boat.html
- watersport-flyboard-tanjung-benoa.html
- watersport-flying-fish-donut-boat.html
- watersport-flying-fish-tanjung-benoa.html
- watersport-glass-bottom-boat-pulau-penyu.html
- watersport-jet-ski.html
- watersport-paket-2-aktivitas.html
- watersport-paket-3-aktivitas.html
- watersport-paket-watersport-wisata-laut.html
- watersport-parasailing.html
- watersport-rolling-donut-tanjung-benoa.html
- watersport-scuba-diving-tanjung-benoa.html
- watersport-sea-walker-snorkeling.html
- watersport-sea-walker-tanjung-benoa.html
- watersport-snorkeling-tanjung-benoa.html
- watersport-wakeboard-tanjung-benoa.html

### Halaman Alat Bantu dan Kebijakan
- invoice.html
- invoice-generator.html
- terms-and-conditions.html (kecocokan alamat lama/baku dicatat di AUDIT.md)

## 3. Status Pola Halaman dari Daftar yang Ada

- Header/footer website bersama: sumber bersama tersedia.
- Formulir pemesanan Airport Transfer: acuan visual utama.
- Detail Dolphin Tour: diterapkan melalui pembentuk tampilan detail SPA; jangan menganggap semua kelompok wisata memiliki pola final yang sama.
- Halaman layanan wisata privat harian: tata letak mandiri yang terpisah.
- Detail artikel/destinasi: pola baku belum disetujui.
- Hasil pencarian: tata letak baku masih menunggu peninjauan.

## 4. Aturan Master Halaman

Setiap dokumen kelompok halaman pada akhirnya perlu mencatat:
- rute atau alamat publik;
- tujuan dan alur pengguna;
- pola halaman yang menjadi acuan;
- urutan bagian secara tepat;
- komponen yang digunakan;
- sumber konten/data;
- perilaku tombol ajakan dan formulir;
- perilaku tampilan ponsel/tablet/desktop;
- pengecualian;
- pengujian dan penerapan yang telah diverifikasi;
- status persetujuan/versi.

Jangan membuat spesifikasi kelompok halaman dengan menyalin susunan halaman lain kecuali penggunaan ulang memang telah ditetapkan.
