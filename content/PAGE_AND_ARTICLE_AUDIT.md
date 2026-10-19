# Bali Trans — Audit Struktur Halaman dan Konten

Tanggal audit: 19 Oktober 2026  
Cakupan: source code branch `refactor/clean-structure-content-audit`, master data, dan artikel aplikasi. Audit ini statis; bukan klaim bahwa semua alur telah lulus uji browser di HP.

## Ringkasan temuan

- Desain dipertahankan; perubahan ini merapikan lokasi kode, bukan mendesain ulang UI atau memigrasikan framework.
- Sebelum perubahan, halaman utama memuat sekitar 213,149 karakter JavaScript aplikasi inline dan tiga blok CSS inline; file modular yang sudah ada tidak menjadi sumber yang dipakai oleh halaman utama.
- Rute tetap berupa SPA berbasis query string (`?page=...`), bukan dokumen HTML terpisah. Back/Forward ditangani router aplikasi dan harus diuji pada browser nyata.
- Master data mencakup 87 kandidat destinasi, 6 wilayah editorial, dan 14 kategori aktivitas.
- Status master data: 8 record `STRUCTURE_READY`, 79 `PLANNED`. Ini belum selaras dengan source renderer yang memuat 34 key tempat; master data hanya memberi rute eksplisit pada 8 record.
- Data aplikasi memuat 3 artikel. Artikel yang dapat dirender belum tentu siap diterbitkan.

## Struktur yang dirapikan pada branch ini

- CSS inline dipindahkan ke file eksternal tanpa mengubah aturan, lalu dipisah menjadi `base.css`, `navigation.css`, dan `footer.css`. `styles.css` menjadi entry point dengan urutan impor yang mempertahankan cascade.
- JavaScript aplikasi dipisah menjadi data, state, routing, view berdasarkan fungsi, dan interaksi.
- `views/discovery.js` menampung halaman wilayah/destinasi; `views/static-pages.js` menampung About, Contact, dan kredit gambar; `cart.js` dan `checkout.js` menampung alur masing-masing.
- `index.html` menjadi entry point yang memuat stylesheet dan script modular.
- Tidak ada perubahan yang disengaja pada teks UI, warna, layout, atau isi artikel selama pemindahan. Pemindahan resource tetap membutuhkan pemeriksaan visual.

## Rekonsiliasi route source dengan master data

- Renderer discovery memiliki 43 key: 34 tempat, 6 wilayah, 2 pilihan durasi, dan 1 layanan private driver.
- Sebelum perbaikan pencarian pada branch ini, dropdown pencarian hanya mencakup 39 key: 34 tempat dan 5 wilayah. Route wilayah Bali Utara, private driver, full-day, dan long-trip tidak semuanya bisa ditemukan dari pencarian global. Empat alias tersebut kini ditambahkan.
- Master data memuat 87 destinasi, tetapi hanya 8 record mempunyai field `route`; 34 key tempat di UI mencakup beberapa tempat gabungan. Perlu pemetaan satu per satu antara record master, key renderer, URL, dan artikel yang benar. Jangan menandai halaman siap hanya karena ada alias pencarian.

## Audit template halaman dan alur

| Template / alur | Tanggung jawab | Temuan source | Pemeriksaan lanjutan |
|---|---|---|---|
| Homepage | Hero, pencarian, kategori, rekomendasi | Renderer tersedia | Pastikan konten tidak blank, CTA berfungsi, gambar gagal muat tidak merusak layout |
| Katalog paket/aktivitas | Kartu, pencarian, filter kategori | Renderer dan handler tersedia | Uji filter, pencarian, reset filter, empty state, tautan detail |
| Detail paket | Informasi, opsi, galeri, tanggal, add-on | Renderer dan handler tersedia | Uji harga, opsi, tanggal, kuantitas, validasi, tombol booking |
| Discovery wilayah/destinasi | Halaman wilayah dan entri tempat | Renderer tersedia; route harus direkonsiliasi dengan master data | Uji URL langsung, region, breadcrumb, tautan tempat, status konten |
| Daftar artikel | Kartu artikel | Renderer tersedia | Uji kartu, semantik tautan, status artikel, alt gambar |
| Detail artikel | Isi artikel | Renderer tersedia | Uji H1, heading, sumber, internal links, metadata, URL langsung |
| Cart | Kuantitas, subtotal, wishlist/keranjang | Renderer tersedia | Uji empty state, batas kuantitas, refresh, subtotal, badge |
| Checkout | Langkah, validasi, ringkasan, WhatsApp | Demo front-end | Uji validasi; jangan memberi kesan pembayaran/booking telah diproses |
| About / Contact / Image credits | Halaman pendukung | Renderer dipisahkan di `static-pages.js` | Uji tautan footer, formulir, pesan sukses/error, kredit gambar |
| Bahasa / mata uang | Salinan terjemahan dan harga | Handler tersedia, belum tervalidasi penuh | Uji bahasa, RTL, format; rate tetap bukan kurs live |

## Inventaris destinasi pada master data

Status halaman, konten, dan fakta adalah tiga hal berbeda. Sumber kosong berarti informasi belum dapat dianggap telah diperiksa.

| Destinasi | Wilayah editorial | Rute master data | Status halaman | Status konten | Status fakta | Kategori silang | Jumlah sumber |
|---|---|---|---|---|---|---|---:|
| Kuta Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing, Culture & temples | 0 |
| Waterbom Bali | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Wildlife & family attractions | 0 |
| Legian Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing | 0 |
| Seminyak Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing, Food & drink | 0 |
| Petitenget Temple | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Canggu beaches | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing, Food & drink | 0 |
| Berawa Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing, Food & drink | 0 |
| Pererenan Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing | 0 |
| Jimbaran Bay | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Food & drink | 0 |
| Kedonganan Fish Market | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Food & drink | 0 |
| Garuda Wisnu Kencana Cultural Park | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples, Wildlife & family attractions | 0 |
| Uluwatu Temple | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Padang Padang Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing | 0 |
| Melasti Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing | 0 |
| Nusa Dua Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Water sports | 0 |
| Tanjung Benoa | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Water sports, Snorkelling & diving, Boat & island trips | 0 |
| Sanur Beach | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Boat & island trips, Cycling | 0 |
| Serangan Island | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Boat & island trips | 0 |
| Bajra Sandhi Monument | Bali Selatan | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Sacred Monkey Forest Sanctuary | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples, Wildlife & family attractions | 0 |
| Ubud Palace | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Campuhan Ridge Walk | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Trekking & hiking, Cycling | 0 |
| Tegallalang Rice Terrace | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Cycling | 0 |
| Tirta Empul Temple | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Goa Gajah | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Tegenungan Waterfall | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Tibumana Waterfall | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Kanto Lampo Waterfall | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Bali Zoo | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Wildlife & family attractions | 0 |
| Bali Bird Park | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Wildlife & family attractions | 0 |
| Mount Batur | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Trekking & hiking, Nature & waterfalls | 0 |
| Lake Batur | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Boat & island trips | 0 |
| Penglipuran Village | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Tukad Cepung Waterfall | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Ulun Danu Beratan Temple | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples, Nature & waterfalls | 0 |
| Bali Botanic Garden | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Wildlife & family attractions | 0 |
| Jatiluwih Rice Terraces | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Cycling | 0 |
| Tanah Lot Temple | Bali Tengah | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Tirta Gangga Water Palace | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Taman Ujung Water Palace | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Lempuyang Temple | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Besakih Temple | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Amed coast | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Surfing | 0 |
| Jemeluk Bay | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving | 0 |
| USAT Liberty wreck diving area | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving | 0 |
| Candidasa | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Boat & island trips | 0 |
| Blue Lagoon, Padangbai | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Boat & island trips | 0 |
| Sidemen Valley | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Cycling | 0 |
| Kerta Gosa Pavilion | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Goa Lawah Temple | Bali Timur | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Lovina Beach & Dolphin Watching | Bali Utara | `?page=discovery&item=place%3Alovina` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Dolphin watching, Boat & island trips | 2 |
| Banjar Hot Springs | Bali Utara | `?page=discovery&item=place%3Abanjar-hot-springs` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Nature & waterfalls, Wellness | 2 |
| Brahmavihara-Arama Monastery | Bali Utara | `?page=discovery&item=place%3Abrahmavihara-arama` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Culture & temples | 2 |
| Gitgit Waterfall | Bali Utara | `?page=discovery&item=place%3Agitgit-waterfall` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Nature & waterfalls | 2 |
| Munduk Waterfalls & Highlands | Bali Utara | `?page=discovery&item=place%3Amunduk` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Nature & waterfalls, Trekking & hiking, Cycling | 2 |
| Wanagiri Twin Lakes Viewpoint | Bali Utara | `?page=discovery&item=place%3Awanagiri` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Nature & waterfalls | 2 |
| Menjangan Island & West Bali National Park | Bali Utara | `?page=discovery&item=place%3Amenjangan` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Snorkelling & diving, Nature & waterfalls | 2 |
| Gedong Kirtya Library | Bali Utara | `?page=discovery&item=place%3Agedong-kirtya` | STRUCTURE_READY | CONTENT_DRAFT | FACT_CHECK | Culture & temples | 2 |
| Sekumpul Waterfall | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Trekking & hiking | 0 |
| Aling-Aling Waterfall | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Trekking & hiking | 0 |
| Pemuteran Beach | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Surfing | 0 |
| Pulaki Temple | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Yeh Sanih natural spring | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Medewi Beach | Bali Barat | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing | 0 |
| Rambut Siwi Temple | Bali Barat | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Bunut Bolong tree tunnel | Bali Barat | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Perancak fishing village | Bali Barat | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples, Food & drink | 0 |
| Gilimanuk Bay | Bali Barat | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Boat & island trips | 0 |
| West Bali National Park | Bali Barat | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Wildlife & family attractions, Trekking & hiking | 0 |
| Kelingking Beach | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Broken Beach (Pasih Uug) | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Crystal Bay | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Boat & island trips | 0 |
| Diamond Beach | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Atuh Beach | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Goa Giri Putri | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Culture & temples | 0 |
| Tembeling Beach & Forest | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Trekking & hiking | 0 |
| Jungutbatu | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Surfing, Boat & island trips | 0 |
| Mushroom Bay | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Snorkelling & diving, Boat & island trips | 0 |
| Nusa Lembongan mangrove forest | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls, Boat & island trips | 0 |
| Yellow Bridge | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Boat & island trips | 0 |
| Blue Lagoon, Nusa Ceningan | Kepulauan Nusa | Belum ada rute khusus | PLANNED | UNVERIFIED | UNVERIFIED | Nature & waterfalls | 0 |
| Banyumala Waterfall | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | FACT_CHECK | Nature & waterfalls, Trekking & hiking | 1 |
| Lake Tamblingan | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | FACT_CHECK | Nature & waterfalls, Boat & island trips | 1 |
| Lake Buyan | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | FACT_CHECK | Nature & waterfalls | 1 |
| Melanting Waterfall | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | FACT_CHECK | Nature & waterfalls, Trekking & hiking | 2 |
| Singsing Waterfall | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | FACT_CHECK | Nature & waterfalls, Trekking & hiking | 1 |
| Kroya Waterfall | Bali Utara | Belum ada rute khusus | PLANNED | UNVERIFIED | FACT_CHECK | Nature & waterfalls, Trekking & hiking | 1 |

## Audit artikel yang sudah ada

| ID | Artikel | Perkiraan kata isi | H2 | H3 | Sumber eksternal | Status editorial |
|---|---|---:|---:|---:|---:|---|
| blog-1 | A Practical First-Time Guide to Bali | 258 | 5 | 0 | 2 | Draft / perlu review fakta dan tautan |
| blog-2 | Nusa Penida Highlights: Kelingking, Diamond Beach & Atuh | 169 | 2 | 0 | 2 | Draft / perlu review keselamatan dan akses |
| blog-3 | Balinese Dishes to Try on Your Trip | 170 | 2 | 0 | 1 | Draft / perlu review fakta dan bahan makanan |

### Perbaikan artikel pada tahap ini

- Menambahkan sumber lanjutan pada setiap artikel: portal e-Visa resmi dan kantor imigrasi untuk panduan pertama kali; portal pariwisata Indonesia dan Polri untuk Nusa Penida; portal pariwisata Indonesia untuk kuliner.
- Mengubah heading utama isi artikel dari H3 ke H2 agar urutannya sesuai dengan H1 judul artikel.
- Menambahkan teks alternatif yang lebih deskriptif untuk gambar artikel dan memakai tanggal ISO di atribut `datetime`.
- Menambahkan dua gambar ilustrasi artikel dari Unsplash ke daftar kredit foto. Kredit Wikimedia yang ada tetap dipertahankan.
- Mengganti nama penulis perorangan yang belum dapat diverifikasi dengan atribusi “Bali Trans Editorial Team”.

### Hal yang masih perlu diselesaikan

1. Sumber sudah ditautkan, tetapi setiap klaim masih perlu dibandingkan dengan sumbernya satu per satu sebelum artikel dipublikasikan. Tautan sumber tidak otomatis berarti seluruh teks telah terverifikasi.
2. Artikel pertama tetap harus menghindari saran visa yang terlalu umum; persyaratan bergantung pada paspor dan tujuan perjalanan. Tautkan pembaca ke portal resmi, jangan menyalin aturan yang cepat berubah tanpa tanggal pemeriksaan.
3. Artikel Nusa Penida harus tetap konservatif pada keselamatan. Jangan menyatakan pantai aman untuk berenang; ikuti larangan, papan, dan instruksi lokal yang berlaku pada saat kunjungan.
4. Artikel kuliner perlu menjaga deskripsi hidangan tetap umum, menyebut bahwa resep bervariasi, dan mengingatkan pembaca menanyakan bahan jika memiliki alergi atau pantangan.
5. Metadata judul dan deskripsi artikel berubah mengikuti ID artikel. URL kanonis belum diterapkan; karena website masih menggunakan query SPA, canonical/SEO URL perlu diputuskan sebelum peluncuran.
6. Pemeriksaan visual daftar artikel, detail artikel, sumber eksternal, gambar, dan URL langsung di browser HP masih diperlukan. Belum ada klaim lulus uji browser.

## Prioritas lanjutan

### P0 — refactor aman
- Jalankan pemeriksaan sintaks semua JavaScript, referensi aset lokal, dan CSS imports.
- Pastikan homepage tetap tampil setelah script modular dimuat.
- Uji semua rute, URL langsung, Back/Forward, reload, dan halaman tidak ditemukan.
- Uji viewport HP; horizontal swipe hanya untuk strip yang memang dimaksudkan.

### P1 — konsistensi destinasi
- Rekonsiliasi route UI dengan master data; jangan tautkan konten yang tidak tersedia.
- Tuntaskan kelompok yang sudah dimulai, termasuk halaman Bali Utara.
- Verifikasi penempatan Menjangan/West Bali National Park serta record tempat yang digabung.
- Setiap record harus punya sumber, tanggal pengecekan, status konten, dan status fakta terpisah.

### P2 — artikel lengkap
- Audit isi setiap artikel dan catat klaim yang perlu sumber.
- Lengkapi internal linking artikel destinasi ↔ wilayah ↔ aktivitas.
- Audit gambar, alt text, kredit, ukuran, loading, dan CDN.
- Audit metadata, canonical URL, H1, heading, dan empty state.

### P3 — siap publikasi
- Seragamkan brand final sebelum launch.
- Ganti placeholder kontak dan tautan `#`; verifikasi klaim promosi, rating, dan harga.
- Jelaskan checkout masih demo sampai backend, inventory, email, dan payment tersedia.
- QA browser HP, tablet, desktop sebelum merge/deploy.

## Batas audit

Dokumen ini menginventarisasi source code dan master data. Ini tidak membuktikan seluruh kandidat telah mempunyai halaman lengkap, semua fakta telah diverifikasi, atau alur booking telah diuji. Record tanpa sumber dan tanggal pengecekan harus tetap dianggap belum terverifikasi.


## Tahap 2 — Route fallback diperbaiki di source

Audit lanjutan menemukan fallback yang menyamarkan URL salah sebagai konten valid. Perubahan sekarang pada branch audit:

- URL detail paket dengan ID yang tidak dikenal menampilkan halaman not-found, bukan paket yang sebelumnya dipilih di memori.
- URL detail artikel dengan ID yang tidak dikenal menampilkan halaman not-found, bukan artikel pertama.
- URL discovery dengan key yang tidak dikenal menampilkan halaman not-found, bukan Bali Selatan.
- Parameter page yang tidak dikenal diarahkan ke halaman not-found, bukan homepage.
- GitHub Actions kini memeriksa bahwa setiap route type memiliki switch case, semua kunci discovery yang digunakan pencarian global memiliki halaman, dan ID artikel tidak duplikat.

Status: perubahan source sudah ditulis pada branch audit. Uji browser langsung tetap belum tersedia dari sesi ini; deployment GitHub Pages tidak berhasil diakses dari lingkungan audit.


## Tahap 3 — Audit aset, tautan, dan metadata artikel

- Source scan pada `index.html` dan seluruh view tidak menemukan tautan `href="#"` yang menjadi placeholder pada file yang diperiksa.
- Semua tautan eksternal yang membuka tab baru pada file yang diperiksa sudah menyertakan `rel` untuk keamanan.
- Gambar pada kartu artikel, katalog paket, keranjang, galeri detail, hasil pencarian, dan wishlist kini memiliki alt text atau alt kosong yang disengaja untuk gambar dekoratif; gambar konten dan thumbnail dimuat secara lazy. Hero homepage dan gambar utama detail tidak di-lazy-load agar tidak menunda konten utama.
- Konfigurasi tema Tailwind dipindahkan ke `assets/js/tailwind.config.js`; `index.html` sekarang tidak menyimpan blok JavaScript inline.
- Detail artikel kini menampilkan bagian “Sources & further reading” berdasarkan daftar sumber per artikel. Atribut `datetime` memakai tanggal ISO dan heading utama isi artikel menggunakan H2 setelah H1 judul.
- Halaman kredit foto kini mencakup dua ilustrasi artikel dari Unsplash beserta tautan lisensinya, selain foto Wikimedia yang sudah tercatat.
- Nama penulis perorangan yang belum terverifikasi diganti dengan “Bali Trans Editorial Team” agar tidak mengatribusikan tulisan kepada orang yang belum dikonfirmasi.

### Status yang belum bisa dinyatakan lulus

- Browser QA visual dan interaksi belum dijalankan di HP/desktop dari sesi ini. URL GitHub Pages tidak dapat diakses oleh lingkungan audit, jadi jangan menganggap halaman live telah diverifikasi.
- Konten 79 destinasi berstatus `PLANNED` masih belum punya sumber dan fakta terverifikasi. Jangan mengubahnya menjadi artikel penuh dengan mengarang informasi; lakukan riset per tempat sebelum publikasi.
- Checkout dan formulir kontak masih berupa alur front-end/prototype. Jangan menyatakan email, booking, atau pembayaran sungguhan sudah diproses.
- URL canonical dan strategi URL SEO permanen belum ditetapkan. Selama rute masih memakai query string, keputusan SEO URL harus dilakukan sebelum peluncuran.


Route-to-master-data reconciliation is maintained separately in [`ROUTE_MASTER_MAPPING.md`](./ROUTE_MASTER_MAPPING.md). It maps all 43 current route keys and flags combined destinations that need canonical pages.


## Tahap 4 — Integritas master data

Pemeriksaan statis pada `bali-master-data.json` menemukan:

- 87 record destinasi, 6 wilayah editorial, 9 area administratif, dan 14 kategori aktivitas.
- Tidak ada ID destinasi duplikat.
- Semua `region_id`, `admin_area_id`, dan kategori yang direferensikan cocok dengan daftar master masing-masing.
- Tidak ada route duplikat.
- Semua record dengan status fakta selain `UNVERIFIED` memiliki tanggal pengecekan; seluruh record `FACT_CHECK` memiliki setidaknya satu URL sumber.
- Hanya 8 dari 87 destinasi yang mempunyai route eksplisit pada master data. Matriks pemetaan 43 route UI ke master data ada di `ROUTE_MASTER_MAPPING.md`; route gabungan masih perlu dipisahkan sebelum dianggap kanonis.

Pemeriksaan ini memvalidasi konsistensi struktur data, bukan kebenaran setiap fakta atau status operasi destinasi.
