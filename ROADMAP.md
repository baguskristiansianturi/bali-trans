# BDM Trans Indonesia — Roadmap Kebangkitan Berbasis Merek

**Status dokumen:** rancangan strategi untuk ditinjau; belum menjadi bukti bahwa layanan, permintaan, atau alur operasional sudah siap.  
**Tanggal:** 16 Oktober 2026  
**Branch:** `docs/brand-led-bdm-revival-roadmap`

## 1. Tujuan roadmap

Menghidupkan kembali BDM Trans dengan mempertahankan hal yang pernah membedakannya: pengalaman perjalanan yang dipercaya, pelayanan personal, dokumentasi pelanggan yang bermakna, dan komunikasi merek yang konsisten. Tahap pertama bukan membangun marketplace perjalanan besar. Tahap pertama adalah membuktikan bahwa penawaran inti BDM masih bisa menghasilkan pertanyaan dan pemesanan yang nyata, dengan biaya serta risiko operasional yang dapat dikendalikan.

Roadmap ini menggabungkan:
- wawasan pemilik dari pengalaman operasional BDM Trans sejak 2011;
- pengamatan yang dilaporkan tentang pelanggan keluarga, respons Instagram, foto pelanggan, dan copywriting berbasis nama/negara;
- kondisi repository yang saat ini merupakan fondasi frontend statis, bukan sistem produksi dengan backend.

Pengamatan historis adalah dasar hipotesis yang kuat, bukan jaminan jumlah permintaan saat ini. Karena itu, setiap tahap memiliki gerbang verifikasi.

## 2. Temuan awal dari repository

Repository `baguskristiansianturi/bali-trans` saat ini berisi fondasi frontend berbahasa Inggris dengan halaman Discover, Experiences, Tours, Tickets, Dining, Destinations, Guides, Marketplace, Transport, Build Your Day, Booking, Account, Partner, dan Admin.

Hal-hal yang terlihat dari pemeriksaan statis:
- README menyebut proyek ini sebagai **Frontend Foundation V1** dan menegaskan fokusnya struktur, bukan backend/produksi.
- Homepage saat ini memperkenalkan BDM sebagai platform untuk menemukan pengalaman, membandingkan informasi, dan merencanakan perjalanan; transport disebut sebagai pilihan, bukan pintu masuk utama.
- File JavaScript bersama yang diperiksa baru menangani menu mobile dan pengalihan pencarian sederhana.
- Halaman pembayaran menyebut integrasi pembayaran sebagai pekerjaan masa depan; halaman akun, partner, dan admin juga merupakan fondasi masa depan.
- Tidak ditemukan dokumen roadmap khusus di repository pada pemeriksaan awal sebelum roadmap ini dibuat.
- Pemeriksaan ini bukan audit visual browser, pengujian alur end-to-end, atau verifikasi deployment.

**Implikasi:** fondasi struktur bisa dipakai kembali, tetapi jangan menganggap tombol booking, pembayaran, akun, portal mitra, atau admin sudah menjadi sistem operasional. Status live dan integrasi deployment perlu diperiksa terpisah.

## 3. Keputusan strategi yang direkomendasikan

### 3.1 Dahulukan jalur pelanggan inti, bukan kelengkapan platform

Jangan menyelesaikan seluruh marketplace, autentikasi, pembayaran otomatis, portal mitra, dan admin sebelum model layanan inti kembali terbukti. Pengembangan itu mahal dalam waktu, pengujian, dan pemeliharaan; saat ini belum ada bukti bahwa semua itu diperlukan untuk menerima pemesanan pertama.

### 3.2 Pertahankan diferensiasi BDM, bukan hanya kategori produknya

BDM tidak sebaiknya dipasarkan sebagai penyedia mobil dan sopir generik. Nilai yang pernah dibangun adalah perjalanan privat yang direncanakan dengan perhatian, rasa tenang bagi keluarga, komunikasi yang personal, serta pengalaman yang konsisten dari penjemputan sampai pengantaran kembali.

Transportasi dapat menjadi bagian inti dari janji tersebut tanpa membuat BDM terlihat seperti katalog kendaraan biasa. Pengalaman, itinerary, tempat makan, dan informasi ramah Muslim berfungsi mendukung perjalanan; jangan menambah semua itu sebagai produk operasional yang belum diverifikasi.

### 3.3 Fokus awal pada audiens yang pernah terbukti cocok

Hipotesis awal:
- keluarga yang berlibur ke Bali;
- orang tua/kerabat yang memesan perjalanan untuk anak atau anggota keluarga;
- pelanggan Singapura dan Malaysia, berdasarkan pengalaman historis yang diceritakan pemilik;
- wisatawan yang mengutamakan kepercayaan, kenyamanan, dan layanan personal dibanding memilih tarif terendah.

Pemilik melaporkan bahwa BDM dahulu memiliki positioning dan konten yang menonjol di segmen Muslim-friendly Bali, serta engagement Instagram yang konsisten. Itu adalah pengalaman historis yang penting untuk dipelajari, tetapi belum diverifikasi ulang melalui analytics atau riset kompetitor terbaru.

### 3.4 Pertahankan strategi konten pelanggan dengan persetujuan yang jelas

Pola yang layak diuji kembali:
- gunakan foto pelanggan yang benar-benar mencerminkan pengalaman mereka;
- personalisasi ucapan dengan nama dan negara hanya jika pelanggan setuju;
- buat copywriting yang berterima kasih kepada tamu sekaligus relevan bagi audiens serupa;
- pertahankan nada hangat dan tidak memaksa orang membeli;
- samakan janji di Instagram, website, pesan WhatsApp, dan pelayanan.

Minta persetujuan sebelum mengunggah foto/nama atau detail perjalanan. Jangan memublikasikan informasi yang dapat mengungkap lokasi langsung, jadwal, nomor kontak, atau detail pribadi keluarga. Jangan mengarang testimoni, angka kepuasan, atau klaim keamanan.

### 3.5 Hormati kebutuhan Muslim tanpa salah merepresentasikan identitas

BDM boleh menjelaskan informasi halal, tempat salat, dan kebutuhan wisatawan Muslim jika datanya benar dan diperiksa. Komunikasi merek tidak boleh mengharuskan pemilik mengaku memiliki agama yang bukan identitasnya. Kepercayaan dibangun dari kejujuran, pemahaman kebutuhan tamu, dan layanan yang konsisten.

### 3.6 Pisahkan kepercayaan pelanggan dari kepercayaan mitra

Pelanggan yang dahulu puas dan mitra yang memiliki persoalan pembayaran adalah dua hubungan berbeda. Jangan menganggap reputasi pelanggan otomatis memulihkan kepercayaan pemasok/mitra. Jangan menerima booking yang kendaraan, penyedia, biaya, atau kesepakatannya belum terkonfirmasi.

### 3.7 Gunakan formulir untuk menyaring dan menyiapkan inquiry, bukan untuk menjanjikan transaksi otomatis

Formulir awal boleh meminta tanggal, jumlah tamu, rencana perjalanan, lokasi jemput, kontak, dan kebutuhan khusus yang relevan. Tujuannya agar permintaan lebih terstruktur dan Mas dapat mengecek ketersediaan sebelum menghubungi calon tamu.

Namun:
- formulir tidak dapat memastikan seseorang adalah pelanggan asli atau bukan penagih utang;
- jangan meminta data pribadi berlebihan, dokumen identitas, atau informasi sensitif tanpa kebutuhan yang sah;
- jangan menggunakan deposit sebagai satu-satunya filter untuk membuktikan niat baik;
- jangan menerima deposit sebelum ketersediaan, harga, syarat layanan, kebijakan pembatalan/refund, dan cara konfirmasi dijelaskan dengan terang;
- pada tahap awal, lebih aman memakai formulir permintaan/cek ketersediaan tanpa pembayaran otomatis, lalu mengonfirmasi detail dan kesepakatan secara tertulis;
- lindungi nomor kontak dan data inquiry, batasi akses, dan jangan memublikasikannya di frontend statis.

Jika nanti ada deposit, alurnya harus didukung kebijakan tertulis, bukti pembayaran, proses refund, keamanan data, dan sistem pencatatan yang dapat diandalkan.

---

## 4. Tahapan roadmap

### Tahap 0 — Kunci arah dan batas operasional

**Status: perlu ditinjau; belum dinyatakan selesai.**

1. Sepakati satu kalimat positioning yang menekankan pengalaman privat dan kepercayaan, bukan sekadar kendaraan.
2. Tentukan wilayah layanan yang benar-benar bisa dipenuhi pada tahap awal; jangan menyatakan seluruh Indonesia jika kapasitas nyata masih terbatas.
3. Tentukan layanan awal yang benar-benar dapat diberikan: misalnya private family trip, airport transfer, atau itinerary sehari—hanya setelah kendaraan/mitra dan biayanya dikonfirmasi.
4. Tentukan bahasa utama dan alur komunikasi; mulai dari bahasa yang paling sesuai dengan audiens yang hendak diuji.
5. Catat layanan yang belum tersedia sebagai belum tersedia, bukan sebagai produk aktif.

**Gerbang selesai:** pemilik menyetujui positioning, batas wilayah, jenis layanan, kapasitas, serta aturan menerima/menolak permintaan.

### Tahap 1 — Validasi permintaan melalui kanal yang sudah ada

**Prioritas pertama setelah Tahap 0. Tidak memerlukan backend baru.**

1. Audit akses ke Instagram `@bdmtrans`, WhatsApp bisnis, dan aset foto/copywriting lama.
2. Kumpulkan sampel konten historis yang mewakili setidaknya tiga pola: solo traveller, keluarga, dan ucapan yang menyebut negara asal.
3. Catat metrik lama jika masih tersedia: reach, likes, comments, shares, saves, profile visits, DM, pertanyaan harga, dan pemesanan. Jangan menyamakan reach dengan calon pelanggan.
4. Susun batch kecil konten reaktivasi berdasarkan pola yang pernah berhasil. Jangan langsung menghabiskan uang untuk iklan.
5. Catat hasil setiap unggahan dengan format yang sama dan bandingkan antarjenis konten.
6. Jawab pertanyaan yang masuk dengan alur yang konsisten: tanggal, jumlah tamu, kebutuhan, lokasi, layanan yang diminta, lalu konfirmasi kapasitas dan harga.

**Metrik utama:** pertanyaan yang memenuhi syarat, permintaan penawaran, booking yang benar-benar dapat dipenuhi, serta sumber tiap pertanyaan. Reach/likes/shares adalah metrik pendukung.

**Gerbang selesai:** terdapat sinyal permintaan aktual yang dapat dicatat dan ditindaklanjuti. Tidak ada angka target yang dikarang sebelum baseline terkumpul.

### Tahap 2 — Siapkan operasi kecil yang bisa dipercaya

**Dikerjakan sebelum menerima booking berbayar yang berisiko.**

1. Buat checklist konfirmasi: tanggal, jumlah tamu, bagasi, lokasi jemput/antar, itinerary, kebutuhan keluarga, dan kontak yang diperlukan.
2. Pastikan kendaraan dan penyedia sudah dikonfirmasi sebelum menjanjikan ketersediaan.
3. Hitung biaya kendaraan/mitra, parkir, tol, bahan bakar, tiket, waktu tunggu, komisi bila ada, dan biaya tak terduga. Tetapkan harga serta margin minimum sebelum mengirim penawaran.
4. Tetapkan uang muka, jadwal pembayaran, pembatalan, perubahan jadwal, keterlambatan, dan pengembalian dana secara tertulis.
5. Hindari mengandalkan kredit atau janji lisan dari mitra. Jangan menerima pesanan yang membutuhkan biaya yang belum tersedia atau kesepakatan mitra yang belum jelas.
6. Buat SOP pengalaman tamu: komunikasi sebelum kedatangan, penjemputan, sikap pengemudi, koordinasi itinerary, dokumentasi foto, penanganan keluhan, dan penutupan perjalanan.
7. Minta persetujuan terpisah untuk penggunaan foto dan nama pelanggan sebagai konten.

**Gerbang selesai:** setiap layanan awal memiliki kalkulasi biaya, cara pemenuhan, syarat tertulis, penanggung jawab, dan checklist kualitas.

### Tahap 3 — Website MVP yang mendukung pemesanan nyata

**Tujuan: website memperkuat kepercayaan dan membantu calon tamu mengambil langkah berikutnya, bukan memamerkan fitur yang belum berfungsi.**

1. Audit `bdmtrans.com` yang sudah ada secara terpisah dari repository ini. Tentukan apakah website aktif tersebut akan dipertahankan, diperbaiki, atau diarahkan ke versi baru. Jangan menganggap repository ini sudah terhubung ke domain tersebut.
2. Untuk versi MVP, prioritaskan:
   - siapa BDM dan jenis perjalanan yang benar-benar dilayani;
   - pengalaman keluarga dan layanan privat;
   - cara kerja dan hal yang termasuk/tidak termasuk;
   - foto serta cerita pelanggan yang penggunaannya disetujui;
   - informasi praktis untuk keluarga dan wisatawan Muslim yang telah diverifikasi;
   - proses meminta penawaran/cek ketersediaan melalui kanal yang benar-benar dipantau;
   - kebijakan harga, pembayaran, dan pembatalan yang sudah disepakati.
3. Gunakan CTA yang jujur, misalnya meminta ketersediaan atau merencanakan perjalanan. Jangan menampilkan konfirmasi instan, status kendaraan, atau pembayaran seolah-olah aktif bila belum terhubung.
4. Audit halaman, navigasi, tautan, metadata, gambar, performa ponsel, dan bahasa sebelum mengarahkan trafik.
5. Pertahankan fondasi visual repository bila sesuai; jangan melakukan redesign besar tanpa bukti bahwa itu meningkatkan kejelasan atau konversi.

**Gerbang selesai:** pengunjung dapat memahami penawaran, memeriksa bukti yang sah, dan menghubungi kanal yang aktif; semua CTA diuji pada ponsel dan desktop. Status deployment harus diverifikasi secara terpisah.

### Tahap 3A — Pratinjau privat sebelum peluncuran

**Wajib dilakukan sebelum website baru dipublikasikan ke domain utama.**

1. Kembangkan perubahan di branch terpisah; jangan langsung mengubah branch produksi.
2. Gunakan preview yang aksesnya dibatasi jika memungkinkan, misalnya preview hosting dengan password/access control atau lingkungan privat yang sesuai.
3. GitHub Pages dari repository publik bukan tempat privat: URL bisa dibagikan atau ditemukan, dan halaman dapat muncul di hasil pencarian. Meta robots noindex atau robots.txt bukan perlindungan akses dan tidak menjamin konten tak akan ditemukan.
4. Jika hanya tersedia GitHub Pages publik, gunakan untuk materi yang memang aman dipublikasikan dan beri penanda noindex sebagai lapisan tambahan, bukan jaminan. Jangan masukkan data pelanggan, harga internal, nomor pribadi, kredensial, atau informasi operasional rahasia.
5. Untuk mengurangi kemungkinan URL preview mengganggu hasil pencarian BDM Trans, jangan menautkannya dari domain utama, jangan kirim sitemap, gunakan noindex jika sesuai, dan jangan anggap itu cukup untuk privasi. Pilihan terbaik untuk review sensitif tetap preview yang dilindungi akses.
6. Uji website dari ponsel Mas sebelum persetujuan peluncuran: navigasi, isi produk, form, tombol WhatsApp/kontak, kondisi kosong, kesalahan input, dan semua tautan.
7. Lakukan peluncuran hanya setelah Mas menyetujui hasil dan domain tujuan dipastikan.

**Gerbang selesai:** ada URL pratinjau yang bisa direview dengan risiko publikasi yang dipahami; tidak ada klaim bahwa noindex menjadikan situs privat.

### Tahap 4 — Ukur perjalanan calon pelanggan hingga pemesanan

1. Gunakan pencatatan sederhana untuk setiap inquiry: tanggal masuk, sumber, negara/segmen bila diketahui, jenis perjalanan, tanggal yang diminta, status ketersediaan, penawaran, hasil, alasan batal, dan margin.
2. Bedakan inquiry, penawaran, booking terkonfirmasi, perjalanan selesai, pelanggan kembali, dan referral.
3. Tinjau pertanyaan yang sering muncul dan alasan orang tidak melanjutkan.
4. Evaluasi konten berdasarkan kualitas inquiry dan booking, bukan hanya jumlah likes.
5. Minta umpan balik setelah perjalanan dan simpan keluhan untuk memperbaiki SOP.

**Gerbang selesai:** keputusan harga, layanan, konten, dan website mulai didasarkan pada catatan aktual, bukan hanya ingatan atau angka engagement.

### Tahap 5 — Kembangkan produk perjalanan secara selektif

**Mulai hanya setelah layanan awal dapat dipenuhi secara konsisten.**

1. Mas akan memberikan contoh website pembanding untuk membantu mengidentifikasi kategori dan struktur produk yang relevan. Gunakan sebagai referensi riset kategori dan kelengkapan informasi, bukan sebagai sumber untuk menyalin teks, foto, harga, susunan khas, atau desain.
2. Kategori produk yang sama boleh dijual oleh beberapa bisnis; BDM perlu membuat penamaan, copywriting, pilihan, visual, harga, syarat, dan pengalaman sendiri sesuai layanan nyata.
3. Tambahkan paket keluarga/itinerary yang benar-benar memiliki penyedia dan biaya jelas.
4. Tambahkan rekomendasi dining, aktivitas, tiket, atau destinasi hanya bila informasi dapat diperiksa dan membantu pelanggan.
5. Bedakan layanan milik/dioperasikan langsung oleh BDM dari layanan pihak ketiga.
6. Untuk mitra, tetapkan standar kualitas, harga, ketersediaan, pembayaran, pembatalan, dan mekanisme keluhan sebelum menampilkan produk mereka.
7. Jangan membangun marketplace besar hanya karena kategori halaman sudah ada di frontend.

**Gerbang selesai:** tiap produk baru memiliki sumber pasokan yang jelas, informasi akurat, margin yang masuk akal, proses booking, dan penanggung jawab layanan.

### Tahap 6 — Otomasi dan backend

**Belum menjadi prioritas sampai kebutuhan manual terbukti menyulitkan operasi.**

Sebelum memilih atau membangun backend Go + PostgreSQL seperti yang direncanakan dalam README, tentukan kebutuhan nyata berdasarkan proses yang telah berjalan. Kandidat kemampuan di masa depan:
- pengelolaan produk, harga, tanggal, dan ketersediaan;
- permintaan booking dan status konfirmasi;
- data pelanggan dengan akses terbatas;
- notifikasi, invoice, dan rekonsiliasi pembayaran;
- operasi mitra/admin dan pelacakan keluhan.

Autentikasi, pembayaran, penyimpanan data pribadi, backup, kontrol akses, audit log, dan keamanan harus dirancang sebelum data nyata diproses. Jangan membangun sistem pembayaran sebelum kebijakan booking/refund dan proses operasional stabil.

**Gerbang selesai:** ada kebutuhan yang terbukti, spesifikasi, ancaman/risiko yang ditinjau, pengujian, dan rencana deployment serta pemulihan.

### Tahap 7 — Pertumbuhan dan pemasaran berbayar

1. Dahulukan referral, pelanggan kembali, konten pelanggan yang mendapat izin, dan relasi yang bisa dilayani dengan baik.
2. Pertimbangkan iklan hanya setelah sumber inquiry, margin, dan kapasitas pemenuhan terukur.
3. Mulai dari kampanye kecil dengan sasaran dan biaya yang bisa dihentikan; jangan menganggap reach tinggi otomatis menghasilkan keuntungan.
4. Ukur biaya per inquiry yang memenuhi syarat, biaya per booking, margin setelah seluruh biaya, dan tingkat keluhan.
5. Tingkatkan kapasitas/mitra hanya bila standar pelayanan dapat dijaga tanpa membuat janji merek melampaui kenyataan.

**Gerbang selesai:** pertumbuhan didukung oleh margin, kapasitas, dan mutu yang terukur.

---

## 5. Urutan prioritas

| Urutan | Pekerjaan | Alasan |
|---|---|---|
| 1 | Sepakati penawaran dan batas operasional | Mencegah janji yang tidak bisa dipenuhi |
| 2 | Audit aset lama dan validasi Instagram/WhatsApp | Paling dekat dengan bukti permintaan historis dan tidak memerlukan backend |
| 3 | Siapkan kalkulasi biaya, mitra, syarat, dan SOP | Melindungi pelanggan, kas, dan reputasi |
| 4 | Tentukan website MVP dan kanal inquiry | Mengubah minat menjadi inquiry yang bisa ditindaklanjuti |
| 5 | Siapkan pratinjau privat dan review mobile | Mencegah peluncuran tak sengaja dan memberi ruang evaluasi |
| 6 | Catat inquiry sampai margin dan perjalanan selesai | Mengetahui apa yang benar-benar berhasil |
| 7 | Tambah produk/mitra secara selektif | Memperluas pilihan tanpa kehilangan kendali mutu |
| 8 | Bangun backend sesuai kebutuhan terbukti | Menghindari biaya dan kompleksitas terlalu dini |
| 9 | Uji iklan dan pertumbuhan | Dilakukan setelah unit economics dan kapasitas jelas |

## 6. Indikator yang perlu dicatat

Jangan menetapkan target angka sebelum baseline baru dikumpulkan. Catat secara konsisten:

- Instagram: reach, saves, shares, komentar, kunjungan profil, dan pesan yang berasal dari unggahan.
- Inquiry: jumlah pesan, kebutuhan jelas, tanggal perjalanan, segmen/negara bila sukarela diketahui, dan layanan yang ditanyakan.
- Penjualan: penawaran terkirim, booking terkonfirmasi, pembatalan, perjalanan selesai, nilai transaksi, seluruh biaya, dan margin.
- Kualitas: ketepatan waktu, keluhan, umpan balik, izin dokumentasi, referral, dan pelanggan kembali.
- Operasi: jumlah permintaan yang harus ditolak karena kapasitas/mitra belum pasti, pembayaran mitra tepat waktu, dan perubahan biaya.

Jangan gunakan reach, likes, atau komentar sebagai pengganti pendapatan atau bukti kepuasan.

## 7. Risiko utama dan pengaman

- **Permintaan masa lalu tidak otomatis sama dengan permintaan hari ini:** validasi kembali dengan batch konten kecil dan pencatatan inquiry.
- **Merek menjanjikan lebih dari kemampuan operasional:** batasi wilayah/layanan, konfirmasi mitra, dan gunakan syarat tertulis.
- **Kualitas bergantung pada satu orang:** dokumentasikan SOP secara bertahap sebelum mendelegasikan; jangan menambah pengemudi tanpa uji standar layanan.
- **Masalah kepercayaan mitra berbeda dari kepercayaan pelanggan:** komunikasi pemasaran tidak menggantikan penyelesaian kewajiban atau kesepakatan pembayaran.
- **Foto keluarga dan anak berisiko membuka informasi pribadi:** dapatkan izin yang sesuai, hindari detail sensitif dan lokasi/jadwal real-time.
- **Informasi Muslim-friendly tidak akurat:** verifikasi restoran, lokasi salat, dan informasi yang berubah; jangan membuat klaim yang tidak dapat dipastikan.
- **Marketplace dan backend terlalu dini:** jangan mengaktifkan fitur hanya karena halaman desainnya sudah ada.
- **Website terlihat siap padahal booking belum bekerja:** label status dengan jujur dan uji setiap CTA/alur sebelum dipromosikan.
- **Preview dianggap privat padahal dapat diakses publik:** jangan taruh data sensitif di preview publik; noindex bukan kontrol akses.
- **Deposit dijadikan filter calon pelanggan:** deposit tidak membuktikan identitas atau niat baik; gunakan konfirmasi layanan, prosedur tertulis, dan kebijakan refund yang jelas.

## 8. Batas cakupan dokumen ini

Dokumen ini adalah rancangan roadmap. Dokumen ini **tidak** menyatakan bahwa:
- akun Instagram atau WhatsApp telah diaudit;
- statistik historis telah diverifikasi;
- pelanggan baru telah menghubungi atau memesan;
- layanan, mitra, harga, dan ketersediaan telah dikonfirmasi;
- website repository telah terhubung ke `bdmtrans.com`;
- alur booking/pembayaran telah berfungsi;
- halaman sudah lolos uji visual, aksesibilitas, keamanan, atau deployment.

## 9. Langkah berikutnya

1. Tinjau dan setujui atau koreksi arah strategi di atas.
2. Kumpulkan contoh copywriting/foto historis dan metrik yang masih tersedia.
3. Audit website `bdmtrans.com` dan akun Instagram sebagai aset terpisah dari audit repository.
4. Tetapkan layanan awal, wilayah, ketersediaan kendaraan/mitra, kalkulasi biaya, dan syarat booking.
5. Terima website pembanding yang akan Mas kirim; petakan struktur kategori/produk dan kebutuhan informasinya tanpa menyalin ekspresi kreatif.
6. Setelah arah dan kebutuhan produk disetujui, buat checklist implementasi MVP dan kerjakan perubahan kode terkecil yang mendukung jalur inquiry nyata.
7. Perbarui status hanya setelah perubahan dan pengujian terkait benar-benar dilakukan.


---

## 10. Roadmap platform: katalog, konten, lokalisasi, harga, dan reputasi

Bagian ini memperluas roadmap produk dan arsitektur berdasarkan kebutuhan terbaru pemilik. Ini adalah rancangan target, bukan klaim bahwa fitur sudah dibangun atau tersedia.

### 10.1 Prinsip produk: satu katalog, beberapa jenis penawaran

Katalog harus membedakan jenis produk, bukan memaksa semuanya masuk ke satu template halaman.

- **Tour package:** paket dengan rencana perjalanan, durasi, urutan tempat, fasilitas, pengecualian, dan ketentuan.
- **Activity/ticket:** tiket atau aktivitas mandiri yang bisa dibeli tanpa kendaraan atau paket tour.
- **Private transport/transfer:** layanan kendaraan berdasarkan titik, waktu, kendaraan, dan kebutuhan perjalanan.
- **Multi-day/custom trip:** paket beberapa hari atau permintaan khusus yang memerlukan pengecekan dan penawaran.
- **Destination/place guide:** halaman informatif tentang tempat yang dapat ditautkan dari itinerary dan halaman produk.
- **Optional add-ons:** pemberhentian tambahan, waktu tunggu, penjemputan tambahan, atau layanan tambahan yang memang dapat dipenuhi.

Setiap produk harus memiliki status operasional yang jelas: draft, perlu verifikasi, aktif, tidak tersedia, atau dihentikan. Jangan tampilkan produk sebagai dapat dipesan sebelum harga, penyedia, kapasitas, syarat, dan proses pemenuhannya terverifikasi.

### 10.2 Model konten yang saling terhubung

Rancang hubungan antarentitas sejak awal:

- **Product** memiliki kategori, jenis produk, deskripsi, gambar berizin, pilihan/varian, harga atau aturan harga, fasilitas, pengecualian, ketentuan, dan status.
- **Tour itinerary** memiliki hari, urutan stop, waktu perkiraan, durasi, catatan, dan relasi ke halaman destinasi.
- **Destination/place** memiliki nama lokal dan nama alternatif, deskripsi orisinal, lokasi, informasi praktis yang telah diverifikasi, sumber pemeriksaan, gambar berizin, dan halaman terkait.
- **Activity/ticket option** memiliki jenis tiket, peserta yang berlaku, tanggal/jam bila dibatasi, ketentuan penggunaan, serta batasan dan pengecualian.
- **Transfer quote** memiliki lokasi jemput dan tujuan, waktu, kendaraan, jumlah penumpang/bagasi, pemberhentian, waktu tunggu, dan rincian biaya.
- **Review** terhubung ke produk/layanan dan, bila memungkinkan, booking yang telah selesai diverifikasi.
- **Localized content** menyimpan versi yang ditulis khusus untuk tiap locale, bukan satu teks yang diterjemahkan otomatis pada saat ditampilkan.

Contoh: itinerary Lovina Tour dapat menautkan Pantai Lovina ke halaman destinasi tersendiri. Halaman destinasi menjelaskan apa tempat tersebut, daya tarik, konteks/sejarah yang dapat diverifikasi, waktu kunjungan yang disarankan bila sumbernya memadai, serta produk dan panduan relevan. Tautan harus membantu pengguna memahami perjalanan, bukan sekadar menambah link demi SEO.

Konten sejarah, jam operasional, aturan aktivitas, dan informasi halal/ibadah yang dapat berubah harus memiliki proses verifikasi dan tanggal peninjauan. Jangan mengarang fakta atau menyalin teks dari situs referensi.

### 10.3 Strategi bahasa dan lokalisasi manusiawi

Bahasa adalah bagian dari produk dan UX, bukan lapisan terjemahan otomatis.

Target awal yang direncanakan:
- **Bahasa Indonesia (id-ID):** alami, jelas, hangat, dan tidak kaku; gunakan istilah yang benar-benar dipakai pelanggan Indonesia.
- **English (en):** bahasa Inggris internasional yang jelas untuk wisatawan; hindari kalimat yang terasa diterjemahkan kata demi kata.
- **Singapore English / Singlish:** gaya santai yang sesuai konteks Singapura, digunakan secara selektif di microcopy atau kampanye yang tepat. Jangan menambahkan partikel atau ungkapan Singlish secara berlebihan, jangan mencampurnya dengan Mandarin, dan jangan membuat semua halaman terdengar seperti karikatur.
- **Bahasa Melayu Malaysia (ms-MY):** penulisan dan kosakata Malaysia, bukan salinan bahasa Indonesia yang hanya mengganti beberapa kata.
- **Bahasa Arab:** disiapkan sebagai target lokalisasi tersendiri; tentukan locale Arab yang diprioritaskan, arah teks kanan-ke-kiri (RTL), format angka/tanggal, serta aturan harga sebelum implementasi. Jangan menganggap satu versi Arab otomatis cocok untuk semua negara Arab.
- **Pasar India:** siapkan konten bahasa Inggris yang relevan untuk wisatawan India terlebih dahulu bila itu yang dipilih sebagai bahasa awal; jangan menganggap semua orang India menggunakan Hindi atau memiliki agama/kebutuhan yang sama. Bahasa tambahan ditetapkan berdasarkan data pelanggan, bukan asumsi.

Aturan lokalisasi:
1. Setiap locale memiliki copywriting, label UI, pesan validasi, email/notifikasi, syarat pemesanan, SEO title/description, dan teks produk yang ditinjau manusia.
2. Simpan locale dengan kode yang konsisten; jangan menyimpulkan bahasa hanya dari kewarganegaraan.
3. Buat glossary dan style guide per locale: nada, istilah perjalanan, ejaan, kata yang dihindari, format tanggal/waktu, dan aturan sapaan.
4. Gunakan review penutur yang memahami konteks lokal sebelum bahasa diterbitkan. AI boleh membantu membuat draf, tetapi bukan menjadi satu-satunya pemeriksa.
5. Sediakan fallback yang eksplisit jika suatu halaman belum diterjemahkan; jangan mencampur bahasa tanpa sengaja.
6. Uji layout untuk teks panjang, teks Arab RTL, font, navigasi, form, email, dan halaman checkout.
7. Hindari mendeteksi agama dari bahasa atau negara. Informasi Muslim-friendly ditampilkan secara faktual dan relevan, tanpa stereotip.

### 10.4 Bahasa, mata uang, dan harga adalah konsep berbeda

Default awal sesuai arahan pemilik:
- Indonesia → IDR.
- Singapore English/Singapore market → SGD.
- English international → USD sebagai default yang direncanakan.
- Malay Malaysia → MYR.
- Arabic market → mata uang perlu diputuskan berdasarkan negara/market yang dilayani.

Bahasa tidak boleh menjadi satu-satunya penentu mata uang. Pengguna perlu dapat melihat atau memilih pasar/mata uang dengan jelas. Simpan nilai dasar harga dan aturan konversi secara terpisah; jangan mengubah angka harga dengan mengganti label mata uang saja. Tentukan apakah harga per locale ditetapkan secara komersial atau dihitung dari kurs, kapan kurs diperbarui, pembulatan, pajak/biaya, dan harga akhir saat checkout. Harga yang ditampilkan harus konsisten dari kartu produk hingga ringkasan pemesanan.

### 10.5 Mesin aturan harga untuk airport transfer dan transportasi

Jangan hardcode harga transfer sebagai satu angka per mobil. Rancang aturan harga yang dapat diuji dan dijelaskan. Faktor yang perlu dipertimbangkan:

- titik jemput dan tujuan, termasuk zona/rute dan jarak yang relevan;
- jenis kendaraan, kapasitas penumpang, serta kapasitas bagasi;
- tanggal dan waktu layanan, termasuk tarif malam/di luar jam operasional;
- layanan satu arah atau pulang-pergi;
- jumlah dan lokasi pemberhentian tambahan;
- waktu tunggu yang termasuk dalam tarif dan biaya tambahan setelah batas tersebut;
- tambahan layanan seperti penjemputan multi-lokasi, bila benar-benar ditawarkan;
- parkir, tol, biaya akses, biaya bandara, atau biaya eksternal lain bila berlaku;
- pajak, biaya layanan, promosi, serta mata uang;
- aturan minimum harga, pembulatan, masa berlaku penawaran, dan perubahan rute.

Setiap aturan harus mempunyai prioritas yang tidak ambigu, validasi input, rincian harga yang dapat diterangkan, serta versi dan tanggal berlaku. Sebelum mengirim penawaran, sistem harus dapat menunjukkan komponen biaya—bukan hanya angka total yang sulit dijelaskan.

Jangan menganggap jarak garis lurus sebagai biaya rute yang akurat. Gunakan sumber rute/zonasi yang dipilih dan periksa kasus yang membutuhkan konfirmasi manual. Jika rute, waktu, atau ketersediaan tidak dapat dihitung dengan andal, tandai sebagai perlu konfirmasi, bukan mengarang harga otomatis.

**Gerbang harga:** uji skenario dasar, transfer malam, kendaraan berbeda, tujuan berbeda, pemberhentian tambahan satu-dua jam, perubahan jumlah penumpang/bagasi, dan mata uang berbeda. Pemilik menyetujui aturan komersial sebelum harga digunakan untuk booking nyata.

### 10.6 Ulasan di website dan reputasi produk

Tujuan: membangun kumpulan ulasan BDM sendiri agar calon pelanggan dapat menilai pengalaman dan ulasan membantu halaman produk. Ini tidak berarti ulasan di website otomatis menghasilkan rich result/ranking Google.

Rancang:
- ulasan terkait produk atau layanan yang benar-benar digunakan;
- penanda **verified booking/review** hanya bila verifikasi benar-benar dilakukan;
- rating, teks ulasan, tanggal, bahasa asli, dan locale;
- permintaan ulasan setelah layanan selesai, tanpa memaksa pelanggan memberi nilai positif;
- moderasi untuk spam, data pribadi, pelecehan, dan konten yang tidak relevan—bukan menghapus kritik yang sah hanya karena negatif;
- izin penggunaan foto/nama terpisah dari izin mengirim ulasan;
- mekanisme pelaporan dan koreksi, serta perlindungan terhadap ulasan palsu;
- ringkasan rating yang dihitung dari ulasan yang memenuhi aturan;
- schema markup yang sesuai dengan pedoman mesin pencari, hanya untuk konten yang benar-benar terlihat pada halaman dan memenuhi ketentuan yang berlaku.

Jangan mengarang ulasan, memindahkan testimoni pihak lain seolah-olah ditulis untuk BDM, atau menjanjikan bintang/rich snippets di hasil pencarian. Rating dapat meningkatkan kepercayaan dan menyediakan konten yang bermanfaat, tetapi posisi pencarian dan tampilan rich result tidak dijamin. Ulasan pihak pertama untuk bisnis sendiri juga tidak otomatis memenuhi syarat untuk menampilkan rating bintang di Google Search.

### 10.7 UX untuk pencarian, wishlist, akun, dan checkout

Pelajari pola Klook sebagai referensi interaksi, lalu sesuaikan dengan alur BDM:
- pencarian/filter harus membedakan tour, tiket aktivitas, transport, dan paket beberapa hari;
- detail produk menunjukkan harga, pilihan, fasilitas, pengecualian, itinerary, ketentuan, dan ketersediaan yang benar;
- wishlist harus menyimpan pilihan dengan jelas dan memiliki keadaan kosong serta keadaan gagal;
- akun dan riwayat booking hanya diaktifkan penuh setelah autentikasi dan penyimpanan backend aman;
- checkout harus merangkum pilihan, tanggal, peserta, lokasi, add-on, harga, kebijakan, dan langkah berikutnya sebelum pelanggan menyetujui;
- bedakan permintaan penawaran, booking menunggu konfirmasi, booking dikonfirmasi, pembayaran, pembatalan, refund, dan layanan selesai;
- jangan menampilkan ketersediaan real-time, timer kelangkaan, atau status pembayaran palsu;
- semua alur harus mobile-first dan dapat digunakan dengan keyboard/screen reader sejauh relevan.

### 10.8 Arsitektur kode dan kesiapan backend Go + Google Cloud

Target teknis jangka panjang adalah frontend yang tidak terikat pada satu backend, dengan API yang terdokumentasi dan backend Go (Golang) ketika siap. Google Cloud adalah target hosting yang direncanakan, bukan layanan yang dianggap telah dikonfigurasi.

Prinsip:
- pisahkan UI, data produk, aturan harga, alur booking, lokalisasi, dan integrasi eksternal;
- definisikan kontrak API dan skema data sebelum fitur frontend bergantung pada backend tertentu;
- gunakan modular monolith untuk backend awal kecuali kebutuhan terukur membuktikan perlu pemisahan layanan;
- validasi input dan hitung harga/total di server; jangan mempercayai harga dari browser;
- simpan uang dengan tipe dan aturan desimal yang aman, beserta kode mata uang eksplisit;
- gunakan autentikasi, otorisasi, rate limiting, validasi, audit log, backup, observability, dan pengelolaan secrets sebelum menyimpan data pelanggan nyata;
- buat pengujian unit untuk aturan harga, locale, status booking, dan perhitungan total; tambah pengujian integrasi dan end-to-end sesuai tahap;
- dokumentasikan keputusan arsitektur dan alasan perubahan agar kode tidak menjadi tambalan yang saling bertentangan;
- jangan menambahkan microservices, cache, queue, atau infrastruktur kompleks tanpa kebutuhan yang terbukti.

Nama kerja proyek pada tahap desain adalah **Bali Travel**. Nama repository GitHub saat ini tetap `bdm-trans-indonesia` sampai perubahan nama benar-benar dilakukan. Nama kerja internal tidak boleh otomatis muncul sebagai brand publik final.

### 10.9 Urutan implementasi yang disarankan

1. Audit halaman dan kode yang sudah ada; inventarisasi yang dapat dipakai ulang.
2. Buat peta produk dan model konten: tour, ticket/activity, transport, destination, itinerary, review, locale, dan price rule.
3. Tetapkan layanan awal dan contoh produk yang benar-benar bisa dipenuhi; isi data contoh yang jelas ditandai sebagai contoh.
4. Rancang UX halaman inti dengan referensi pola Klook dan konten produk dari riset Bali Golden Tour, tanpa menyalin ekspresi kreatif.
5. Tulis style guide lokalisasi dan glossary; siapkan contoh copy per locale untuk review manusia.
6. Rancang aturan harga transport/transfer dan uji dengan skenario yang disetujui pemilik.
7. Rancang halaman destinasi yang terhubung dengan itinerary dan produk, termasuk proses verifikasi konten.
8. Tentukan desain ulasan dan bukti booking terverifikasi; pisahkan ulasan pelanggan dari izin penggunaan foto.
9. Implementasikan frontend modular, mobile-first, dengan keadaan loading/empty/error dan kontrak data yang konsisten.
10. Definisikan API dan skema backend Go, lalu implementasikan fitur server sesuai prioritas operasional.
11. Uji lokalisasi, perhitungan harga, form, akun, wishlist, checkout, review, keamanan, aksesibilitas, dan SEO sebelum rilis.
12. Lakukan preview terlindungi, review pemilik, dan peluncuran bertahap setelah kriteria lulus.

**Gerbang selesai keseluruhan:** tidak cukup hanya semua halaman terlihat lengkap. Model data, copy per locale, harga, ketersediaan, status booking, ulasan, dan CTA harus akurat; fitur yang belum terhubung harus diberi status jelas dan tidak menyamar sebagai fungsi aktif.


---

## 11. Prioritas peluncuran: tiket dan paket tour dahulu, perencana anggaran kemudian

Bagian ini mencatat arahan terbaru pemilik pada 16 Oktober 2026. Ini memperjelas urutan implementasi; tidak berarti semua fitur atau ketersediaan produk sudah siap.

### 11.1 Urutan komersial tahap awal

**Fokus penjualan pertama:**
1. Tiket aktivitas/tempat wisata yang dapat dijual mandiri, tanpa mewajibkan pelanggan menyewa mobil atau membeli paket tour.
2. Paket tour dengan itinerary dan durasi yang jelas, setelah penyedia, harga, kapasitas, ketentuan, dan proses pemenuhannya diverifikasi.
3. Struktur transportasi dan sewa mobil tetap disiapkan dalam model data/arsitektur, tetapi penjualan langsung dan pemesanan otomatis ditunda sampai ketersediaan armada atau mitra benar-benar dapat dipastikan.
4. Perencana rute dan anggaran perjalanan adalah fase lanjutan, bukan syarat peluncuran pertama.

Urutan ini dimaksudkan untuk membuat penawaran awal lebih fokus dan memungkinkan validasi produk sebelum membangun fitur perencanaan perjalanan yang kompleks.

### 11.2 Perencana perjalanan dan estimasi biaya — fase lanjutan

Visi jangka panjangnya adalah membantu wisatawan menyusun agenda wisata dan memperkirakan pengeluaran aktivitas di luar tiket pesawat, hotel, dan transportasi yang mereka atur sendiri. Contoh alur: wisatawan memilih area/tujuan seperti Kintamani, melihat tempat yang masuk akal untuk dikunjungi, mengatur urutan dan durasi singgah, lalu sistem memvalidasi apakah rute dan batas waktunya memungkinkan.

Fitur ini perlu mencakup:
- daftar destinasi dan aktivitas dengan data lokasi, jam operasional, durasi kunjungan perkiraan, batasan, dan sumber yang diverifikasi;
- rekomendasi rute berdasarkan lokasi, waktu tempuh realistis, waktu kunjungan, jam buka, dan batas perjalanan yang dipilih;
- aturan kelayakan yang jelas untuk memberi tahu apakah kombinasi tujuan dapat dilakukan, tidak searah, terlalu padat, tutup pada waktu tersebut, atau membutuhkan konfirmasi;
- kemampuan mengubah urutan tujuan dan menghitung ulang kelayakan;
- estimasi biaya tiket/aktivitas yang diberi tanggal pemeriksaan dan disclaimer perubahan harga;
- pemisahan biaya aktivitas dari tiket pesawat, hotel, dan transportasi yang tidak dihitung sistem;
- penjelasan mengapa suatu kombinasi direkomendasikan atau ditolak, bukan hanya tombol “bisa/tidak bisa”.

**Jangan membangun mesin ini sekarang.** Sebelum implementasi, tentukan data sumber rute, cara mendapatkan jam buka dan durasi, aturan waktu singgah (misalnya batas waktu kunjungan yang dapat diatur pengguna), perlakuan kemacetan, jam operasional, anak/keluarga, dan bagaimana sistem menangani data yang tidak lengkap. Hindari memberi jaminan rute “pasti bisa” jika data lalu lintas, jam buka, atau waktu tempuh tidak real-time/terverifikasi. Harga tiket harus diverifikasi dan diberi waktu pembaruan; jika tidak tersedia, tampilkan “perlu konfirmasi” atau rentang estimasi yang diberi label jelas.

### 11.3 Referensi Bali Golden Tour dan pemeriksaan fakta

Bali Golden Tour digunakan sebagai salah satu referensi lokal untuk memetakan cakupan produk, kategori paket, urutan itinerary, destinasi, dan topik artikel. Anggapan bahwa sumber itu lebih dekat dengan konteks lokal adalah alasan untuk mempelajarinya, bukan bukti otomatis bahwa setiap informasi di sana benar atau terbaru.

Aturan penggunaan:
- petakan paket dan tempat wisata yang relevan secara luas, tetapi prioritaskan produk yang realistis untuk BDM;
- gunakan kesamaan tujuan/rute wisata sebagai kategori pasar yang wajar, namun tulis itinerary, copy, struktur halaman, dan pengalaman BDM secara mandiri;
- jangan menyalin teks, foto, harga, atau ekspresi desain;
- verifikasi sejarah, budaya, status operasional, harga tiket, aturan kunjungan, dan informasi layanan melalui sumber primer/tepercaya bila tersedia;
- simpan sumber dan tanggal pemeriksaan untuk fakta yang mudah berubah;
- jika dua sumber berbeda, jangan pilih yang paling menarik secara pemasaran; telusuri perbedaan dan tulis dengan atribusi/ketidakpastian yang sesuai;
- buat halaman destinasi dan artikel yang saling terhubung ke paket/tiket yang relevan, tetapi jangan membuat artikel tipis hanya untuk menambah jumlah halaman.

### 11.4 Harga BDM dan perbandingan kompetitor

Pemilik memperkirakan harga BDM untuk beberapa penawaran mungkin sekitar 30–40% lebih tinggi daripada referensi tertentu. Angka tersebut saat ini adalah hipotesis harga, bukan aturan universal yang harus otomatis diterapkan ke semua tiket, paket, atau destinasi.

Sebelum menetapkan harga:
- bandingkan produk yang benar-benar sebanding dari segi fasilitas, durasi, inclusions/exclusions, kualitas penyedia, privasi, layanan, dan kebijakan;
- hitung biaya pasokan, komisi, biaya pembayaran, pajak/biaya lain, risiko pembatalan, dan margin minimum;
- tentukan apakah premium berasal dari layanan/kemudahan yang nyata dan dapat dijelaskan;
- jangan menaikkan harga tiket pihak ketiga secara seragam tanpa memeriksa ketentuan supplier, aturan distribusi, dan nilai yang diterima pelanggan;
- tampilkan harga serta pengecualian secara jujur, dan beri label estimasi bila harga belum dikonfirmasi.

Harga lebih tinggi harus didukung nilai layanan yang bisa dibuktikan, bukan hanya positioning premium.

### 11.5 Ketersediaan transportasi saat belum ada armada sendiri

Karena armada belum dimiliki/dikonfirmasi, website tidak boleh menerima booking transportasi sebagai pesanan yang sudah pasti terpenuhi tanpa pengecekan pemasok.

- Siapkan struktur produk dan form permintaan, tetapi gunakan status seperti **perlu konfirmasi** sampai ada kendaraan/mitra yang menyetujui tanggal dan biaya.
- Buka pemesanan langsung hanya untuk tanggal/layanan yang benar-benar memiliki kapasitas terverifikasi.
- Jika pemilik membutuhkan waktu untuk membangun jaringan mitra, gunakan batas jendela pemesanan yang transparan, daftar tunggu, atau permintaan ketersediaan manual.
- Jangan menandai tanggal sebagai **penuh** kecuali memang penuh; status palsu berisiko merusak kepercayaan dan menciptakan ekspektasi yang salah.
- Jangan menerima uang atau menjanjikan kendaraan sebelum supplier, biaya, syarat, pembatalan, dan penanggung jawab layanan dikonfirmasi.
- Rancang status ketersediaan yang berbeda: tersedia terverifikasi, perlu konfirmasi, tidak tersedia, dan belum dibuka untuk pemesanan.

### 11.6 Deployment GitHub Pages dan batas keamanan preview

GitHub Pages dapat digunakan untuk review mobile dan demonstrasi frontend statis. Namun, jika repository/Pages bersifat publik, konten pada URL tersebut harus dianggap publik; ini bukan tempat untuk menyimpan data pelanggan, kredensial, aturan komersial rahasia, atau data internal pemasok.

Sebelum deployment:
1. periksa branch sumber, konfigurasi Pages/workflow, build command bila ada, path aset, tautan relatif, dan halaman yang menjadi entry point;
2. pastikan data contoh tidak dapat disalahartikan sebagai produk/harga/ketersediaan nyata;
3. pastikan form dan tombol yang belum memiliki backend tidak berpura-pura menyimpan booking atau memproses pembayaran;
4. tambahkan status noindex bila sesuai untuk mengurangi pengindeksan, tetapi jangan menganggapnya sebagai akses privat;
5. uji URL hasil deployment dari ponsel, termasuk navigasi, gambar, CSS/JS, tautan ant halaman, form, error/empty state, dan tampilan mobile;
6. nyatakan deployment berhasil hanya setelah URL dan hasilnya benar-benar diperiksa.

**Tahap implementasi berikutnya setelah roadmap ditinjau:** audit seluruh halaman dan konfigurasi GitHub Pages yang ada; petakan reuse vs perbaikan; susun data model/konten untuk tiket dan paket tour; lalu isi kerangka halaman secara konsisten, satu tahap terverifikasi pada satu waktu. Jangan langsung mengaktifkan backend, pembayaran, perencana anggaran, atau booking transportasi otomatis.


### 11.7 Ketersediaan kalender yang akurat dan komunikasi publik

Ketersediaan harus dibedakan berdasarkan **tanggal, jenis kendaraan, durasi, dan kapasitas yang benar-benar terkonfirmasi**. Jangan membuat pola “penuh” yang seragam untuk semua mobil atau semua tanggal demi membatasi permintaan.

Contoh perilaku yang diharapkan:
- Jika Avanza tidak tersedia pada 28 Oktober, tampilkan tanggal itu sebagai tidak tersedia untuk Avanza.
- Jika Innova masih tersedia pada tanggal yang sama, tawarkan Innova sebagai alternatif; jika tidak, tampilkan alternatif tanggal yang memang tersedia.
- Kalender bulan berikutnya harus mengikuti data ketersediaan yang sebenarnya. Tanggal kosong di antara tanggal penuh harus tetap tampak kosong/tersedia jika memang dapat dipesan.
- Bedakan status **tersedia**, **tidak tersedia**, dan **perlu konfirmasi**. Jangan menyebut tanggal “penuh” jika belum ada data kapasitas yang membuktikannya.
- Jika kapasitas untuk tanggal tertentu belum dibuka atau belum dapat dipastikan, gunakan mekanisme yang jujur dan tidak menyesatkan, seperti “periksa ketersediaan” atau “konfirmasi terlebih dahulu”; jangan menciptakan kesan permintaan tinggi atau kelangkaan palsu.
- Ketersediaan perlu diperiksa ulang sebelum pesanan dianggap terkonfirmasi, dan status/kapasitas harus diperbarui setelah booking diterima agar tidak terjadi pemesanan ganda.

**Batas komunikasi publik:** website dan materi pemasaran hanya membahas layanan, pilihan kendaraan, tanggal, harga, dan ketentuan pelanggan. Jangan menampilkan cerita internal tentang pembangunan kembali bisnis, belum adanya armada, sedang mencari mitra, atau alasan operasional lain yang bukan informasi yang perlu diketahui pelanggan. Informasi yang wajib diketahui agar pelanggan memahami status pesanannya tetap disampaikan secara profesional dan seperlunya; jangan menjanjikan kendaraan sebelum ketersediaannya terkonfirmasi.

---

## 12. Urutan implementasi frontend yang disepakati pemilik — 16 Oktober 2026

Bagian ini memperjelas urutan kerja frontend tanpa membatalkan gerbang operasional dan validasi pada bagian sebelumnya.

### 12.1 Fondasi halaman dan konsistensi lebih dahulu

Sebelum menjadikan Lovina Dolphin Experience sebagai uji produk, audit dan rapikan kerangka situs yang sudah ada. Tujuannya bukan membangun seluruh marketplace operasional sekaligus, melainkan memastikan halaman yang direncanakan memiliki pola navigasi, komponen, responsivitas, aksesibilitas, dan status fungsi yang konsisten.

Urutan kerja:

1. Inventaris seluruh halaman, tautan internal, stylesheet, skrip bersama, komponen header/footer, dan alur yang sudah ada.
2. Tandai setiap halaman: dipakai pada MVP, struktur pendukung, fase berikutnya, atau belum relevan; jangan menghapus halaman hanya karena belum aktif.
3. Tetapkan aturan bersama untuk header/nav, footer, container, jarak judul/subjudul/teks, tombol, kartu, breadcrumb, formulir, pesan validasi, keadaan kosong/error/loading, dan perilaku mobile.
4. Audit setiap halaman menggunakan aturan tersebut; perbaiki inkonsistensi yang terbukti tanpa melakukan redesign menyeluruh yang tidak dibutuhkan.
5. Siapkan struktur halaman publik dan pendukung yang memang tercatat dalam repository, termasuk About, Contact, Search, katalog tiket/aktivitas, Tours, detail produk, Wishlist, Account, Booking, serta kerangka Partner/Admin. Halaman yang hanya fondasi harus jelas statusnya dan tidak boleh menampilkan data sensitif atau berpura-pura menjadi panel operasional aktif.
6. Untuk Wishlist, akun, dan checkout, siapkan struktur UI, state kosong, state gagal, ringkasan pilihan/harga, serta status yang masuk akal. Penyimpanan lintas perangkat, autentikasi, ketersediaan real-time, pembayaran, dan operasi admin tetap menunggu backend yang aman dan pengujian nyata.
7. Periksa metadata dasar, judul dan deskripsi unik yang sesuai halaman, struktur heading, alt gambar, tautan, serta copy yang alami. Jangan menganggap kata kunci saja sebagai bukti SEO atau menulis klaim volume pencarian tanpa riset.
8. Catat hasil audit dan uji pada branch kerja terpisah; jangan mengubah `main` secara langsung. GitHub Pages publik hanya untuk materi yang aman dipublikasikan.

### 12.2 Uji satu produk setelah kerangka konsisten

Setelah fondasi halaman cukup konsisten untuk diuji, gunakan **Lovina Dolphin Experience** sebagai produk uji pertama untuk menguji template dan alur—bukan sebagai tema utama homepage dan bukan alasan untuk mendesain ulang setiap produk secara terpisah.

Alur yang diperiksa: Discover/search atau kategori → daftar produk → detail produk → pilihan/opsi dan informasi harga → permintaan booking/checkout yang benar-benar tersedia → status/halaman akhir. Wishlist diuji sebagai jalur pendukung. Jika tahap tertentu belum terhubung ke backend, tampilkan penjelasan dan tindakan alternatif yang jujur; jangan membuat konfirmasi booking atau pembayaran palsu.

Setelah template dan alur produk lulus pemeriksaan, produk berikutnya harus menggunakan struktur yang sama dan hanya memerlukan data/konten spesifik, kecuali ada kebutuhan produk yang benar-benar berbeda.

### 12.3 Kriteria penerimaan untuk setiap tahap

- Semua tautan internal yang terkait tahap tersebut mengarah ke halaman yang benar.
- Navigasi dan footer konsisten serta dapat digunakan dengan sentuhan pada ponsel.
- Tidak ada horizontal overflow yang tidak disengaja pada lebar layar kecil.
- Form memberi validasi yang dapat dipahami, dan kegagalan tidak diklaim sebagai keberhasilan.
- Data contoh, harga, ulasan, ketersediaan, dan status booking tidak disajikan sebagai fakta nyata tanpa verifikasi.
- Struktur heading, title, description, label form, dan alt gambar diperiksa.
- Hasil pengujian dicatat terpisah dari pekerjaan yang hanya dibuat; browser/mobile dan deployment hanya ditandai terverifikasi setelah benar-benar diperiksa.

### 12.4 Status pekerjaan setelah penetapan urutan ini

Per 17 Oktober 2026, PR #1 telah di-merge ke `preview/bali-trans` melalui commit `fc5b16ee0eb445ab5dc1bfbb2373ddb0b1ada407`; workflow publish dan Pages build/deployment untuk commit tersebut berstatus sukses. PR #2 (link Wishlist pada 33 halaman) kemudian di-squash-merge ke `preview/bali-trans` melalui commit `fb6d9e0a2d3cca00f37cd69b8ab9e26c520bf294`. Saat pembaruan ini dicatat, workflow publish dan Pages build/deployment untuk commit baru masih berjalan. Audit statis terbaru mencakup 35 halaman HTML dan 840 atribut `href`/`src`, tanpa target file lokal yang hilang. URL belum diperiksa secara visual; browser/mobile, aksesibilitas runtime, dan alur end-to-end belum diverifikasi.
