# 00 — Peta Sistem Bali Trans

**Versi penerapan yang dipetakan:** a8d4282293d98923ecf160f52d95fe6168dd905d  
**Status:** INVENTARIS AWAL

## 1. Cara Website Dijalankan

Bali Trans saat ini merupakan website statis yang dihosting melalui GitHub Pages. Repository menggunakan dua pola penyajian halaman.

### A. Aplikasi SPA Utama

- Berkas masuk: index.html
- Tempat pemasangan konten utama: #appContainer
- Alamat halaman dipilih melalui parameter URL dan ditampilkan oleh JavaScript.
- Pengendali rute utama: assets/js/navigation.js
- Pembentuk tampilan: assets/js/views/
- Status dan interaksi bersama: assets/js/state.js, assets/js/interactions.js
- Header/footer bersama: assets/js/global-shell.js dan assets/css/global-shell.css

### B. Halaman HTML Mandiri

- Berkas HTML publik tetap berada di folder utama repository.
- CSS khusus halaman berada di assets/css/pages/.
- JavaScript khusus halaman berada di assets/js/pages/.
- Alamat publik yang sudah ada harus dipertahankan kecuali pemindahan alamat disetujui dan diuji.
- Jangan memindahkan berkas HTML dari folder utama hanya demi merapikan folder.

## 2. Susunan Komponen Tingkat Tinggi

| Kelompok | Isi |
|---|---|
| Kerangka global | Header/navbar, pencarian, akun, bahasa/mata uang, menu seluler, footer |
| Aplikasi SPA | Halaman utama, destinasi, katalog, detail wisata, artikel, keranjang, checkout, halaman informasi, navigasi bawah |
| Halaman mandiri | Transportasi, transfer bandara/pelabuhan/antarkota, wisata privat, sewa mobil, olahraga air, pemesanan, invoice |
| Layanan teknis bersama | Data/konten, rute/metadata, status/interaksi, bahasa/wilayah, validasi browser, penerapan GitHub Pages |

Peta ini menjelaskan pembagian tanggung jawab, bukan menyatakan bahwa setiap bagian sudah menjadi modul kode yang berdiri sendiri.

## 3. Pengecualian Kerangka Global

Kerangka global tidak digunakan pada setiap halaman.

Pengecualian yang diketahui:
- booking-form.html merupakan formulir pemesanan khusus dan acuan utama desain formulir bersama.
- bali-airport-transfer-checkout.html merupakan halaman checkout khusus.
- watersport-checkout.html merupakan halaman checkout khusus olahraga air.
- Mode checkout SPA menggunakan checkout-mode; kerangka global dan navigasi bawah seluler sengaja disembunyikan.
- Periksa sumber halaman dan alur sebenarnya sebelum menambahkan kerangka global ke halaman checkout.

Perbarui daftar pengecualian ketika ada halaman baru yang sengaja tidak menggunakan kerangka global.

## 4. Komponen Kerangka Bersama Saat Ini

| Komponen | Sumber penerapan | Pemetaan saat ini |
|---|---|---|
| Navbar/header | assets/js/global-shell.js, assets/css/global-shell.css | Sudah diterapkan; rincian desktop/seluler dicatat terpisah |
| Pencarian header | global-shell.js, interactions.js, global-shell.css | Sudah diterapkan; perilaku dan cakupan hasil perlu diperiksa |
| Menu akun | global-shell.js dan rute akun | Antarmuka tersedia; autentikasi sebenarnya belum diterapkan |
| Pemilih bahasa/mata uang | global-shell.js dan locale.js | Antarmuka tersedia; jangan menganggap semua bahasa/mata uang sudah didukung |
| Menu seluler | global-shell.js dan global-shell.css | Sudah diterapkan |
| Footer | global-shell.js dan global-shell.css | Sudah diterapkan |
| Navigasi bawah seluler | index.html dan interaksi SPA | Khusus SPA; bukan komponen universal halaman mandiri |
| Breadcrumb | Pembentuk detail Dolphin dan metadata SEO | Khusus/sebagian halaman; belum ada komponen visual universal |
| Hero | Pembentuk tampilan khusus halaman | Beberapa penerapan; belum ada satu komponen universal |

## 5. Batas Sumber Acuan Utama

- Data paket/artikel/bahasa SPA: assets/js/data.js.
- Data induk destinasi: content/bali-master-data.json.
- Rute SPA dan metadata: assets/js/navigation.js.
- Markup kerangka bersama dan tautan rute: assets/js/global-shell.js.
- Gaya kerangka bersama: assets/css/global-shell.css.
- Indeks pola halaman: TEMPLATE-REGISTRY.md.
- Inventaris rute: content/ROUTE_MASTER_MAPPING.md.

Setiap sumber memiliki pengguna berbeda. Jangan menggabungkan, menggandakan, atau menggantinya tanpa menelusuri ketergantungan kode.

## 6. Batasan Tingkat Sistem

- Website menggunakan hosting statis GitHub Pages; backend produksi belum tersedia.
- Inventaris langsung, validasi pemesanan di server, pembayaran nyata, dan sistem akun aman belum tersedia.
- Alamat halaman dan rute parameter yang sudah ada sensitif terhadap perubahan.
- Berkas bersama berdampak ke banyak halaman dan memerlukan pengujian ulang.
- Commit yang berhasil bukan bukti bahwa penerapan berhasil atau tampilan sudah benar.

## 7. Aturan Pembaruan

Setiap perubahan pada kelompok halaman, komponen global, rute, berkas data acuan, atau alur penerapan harus diikuti pembaruan catatan Master terkait. Jika perubahan memengaruhi beberapa komponen, sebutkan semuanya. Jangan tandai peta ini terkini sebelum penerapan yang berubah benar-benar diperiksa.
