# 03 — Modul Teknis dan Kepemilikan Sumber Kode

**Status:** INVENTARIS AWAL  
Arsitektur terperinci: ARCHITECTURE.md dan docs/architecture/REPOSITORY_MAP.md

## 1. Pintu Masuk SPA dan Sistem Bersama

| Berkas | Tanggung jawab menurut peta repository | Dampak |
|---|---|---|
| index.html | Pintu masuk SPA, pemuatan aset, navigasi bawah seluler, wadah antarmuka bersama | Sangat tinggi |
| assets/js/data.js | Data paket, artikel, bahasa, dan mata uang SPA | Tinggi |
| assets/js/state.js | Status antarmuka bersama di memori | Tinggi |
| assets/js/navigation.js | Rute parameter, metadata rute, metadata SEO | Tinggi |
| assets/js/interactions.js | Pencarian bersama, keranjang, daftar keinginan, pengendali peristiwa antarmuka | Sangat tinggi |
| assets/js/global-shell.js | Penyisipan header/footer bersama dan tindakan navigasi global | Sangat tinggi |
| assets/js/locale.js | Logika bahasa/wilayah | Lintas tampilan |
| assets/js/boot-recovery.js | Bantuan pemulihan saat awal aplikasi | Periksa pemanggil/perilaku sebelum mengubah |
| assets/js/tailwind.config.js | Konfigurasi Tailwind CDN | Gaya bersama |
| assets/js/views/home.js | Pembentuk tampilan halaman utama | Khusus halaman utama; dilindungi |
| assets/js/views/discovery.js | Pembentuk tampilan penjelajahan/destinasi | Cakupan fitur |
| assets/js/views/catalog.js | Pembentuk tampilan katalog | Cakupan fitur |
| assets/js/views/detail.js | Pembentuk tampilan detail paket/wisata | Cakupan fitur; tersedia jalur khusus Dolphin |
| assets/js/views/articles.js | Pembentuk tampilan blog/artikel, termasuk breadcrumb/header/featured image/TOC/FAQ/share/related sections | Cakupan fitur artikel; baseline didokumentasikan pada SOP Implementasi |
| assets/js/views/cart.js | Pembentuk tampilan keranjang | Alur keranjang |
| assets/js/views/checkout.js | Pembentuk tampilan checkout | Alur checkout |
| assets/js/views/static-pages.js | Pembentuk halaman statis SPA | Beberapa rute informasi |

## 2. Pengendali Halaman Mandiri

Skrip khusus halaman dikelompokkan di assets/js/pages/. Berkas yang sudah ada mencakup pengendali/penyesuai untuk:
- Pencarian bandara, perhitungan tarif, dan checkout bandara.
- Formulir transfer antarkota dan pelabuhan.
- Formulir wisata privat harian.
- Formulir pemesanan bersama dan gulir ke pemberitahuan pemesanan.
- Pencarian sewa mobil.
- Invoice dan pembuat invoice.
- Formulir transportasi privat.
- Carousel ulasan.
- Kecocokan layanan SPA versi lama.
- Filter katalog olahraga air, checkout, serta interaksi detail/perhitungan harga.

Jangan menganggap sebuah berkas tidak digunakan hanya berdasarkan namanya. Periksa referensi skrip HTML, impor, pengujian alur kerja, dan pemanggil saat aplikasi berjalan sebelum menghapus atau memindahkannya.

## 3. Kepemilikan CSS

### Gaya Bersama / Aplikasi
- assets/css/base.css
- assets/css/styles.css
- assets/css/site.css
- assets/css/navigation.css
- assets/css/footer.css
- assets/css/global-shell.css
- assets/css/dolphin-responsive.css
- Lembar gaya tingkat fitur olahraga air.

### Gaya Khusus Halaman

`assets/css/pages/article-detail.css` adalah stylesheet khusus artikel dengan namespace `.article-*`. Walaupun dimuat melalui `index.html` SPA, selector dan tanggung jawabnya harus tetap terbatas pada modul artikel. Jangan memindahkan style artikel ke CSS global.

assets/css/pages/ berisi gaya khusus akun, pencarian/kartu/transfer bandara, checkout transfer, antarkota, pelabuhan, wisata privat harian, formulir pemesanan, invoice, transportasi privat, ketentuan, layanan transportasi, dan halaman olahraga air individual.

Kepemilikan tepat setiap selector yang saling tumpang tindih belum ditelusuri sepenuhnya dalam inventaris awal ini. Periksa tautan HTML halaman dan impor CSS sebenarnya sebelum mengubah gaya.

## 4. Sumber Data dan Editorial

- assets/js/data.js: kumpulan data runtime SPA.
- content/bali-master-data.json: data induk destinasi dan metadata editorial.
- content/ROUTE_MASTER_MAPPING.md: pemetaan rute.
- content/PAGE_AND_ARTICLE_AUDIT.md: audit halaman dan artikel yang tersedia.
- TEMPLATE-REGISTRY.md: indeks pola halaman yang dapat digunakan kembali.

Sumber-sumber tersebut memiliki fungsi berbeda. Jangan menganggap data induk destinasi JSON otomatis menggantikan data runtime SPA.

## 5. Modul Validasi dan Rilis

- .github/workflows/validate-prototype.yml: alur kerja validasi sumber dan browser.
- .github/workflows/deploy-pages.yml: alur kerja penerapan GitHub Pages.
- scripts/browser-smoke.mjs: pengujian singkat browser.
- AUDIT.md, HANDOFF.md, dan ROADMAP.md: audit, serah terima terkini, dan pekerjaan yang direncanakan.

## 6. Kode yang Diarsipkan

- assets/js/legacy/app.js dicatat sebagai pendahulu monolitik yang telah diarsipkan dan tidak dimuat oleh index.html.
- Berkas tersebut tetap disimpan untuk sejarah/referensi.
- Jangan menghapusnya sebelum semua kemungkinan pemanggil dan kebutuhan kompatibilitas diperiksa.

## 7. Batas Perubahan

Modul teknis dapat digunakan bersama meskipun nama berkasnya terlihat khusus halaman. Berkas dengan nama mirip juga dapat memiliki fungsi berbeda. Telusuri referensi sebenarnya sebelum mengubahnya. Jangan memindahkan, mengganti nama, atau menghapus berkas hanya demi membuat susunan folder terlihat lebih rapi.
