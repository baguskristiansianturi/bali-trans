# 05 — Daftar Perubahan Master

Daftar ini mencatat perubahan pada Cetak Biru Master dan menghubungkannya dengan commit penerapan jika perubahan kode juga dilakukan.

Daftar ini bukan tempat menyimpan pekerjaan tertunda dan tidak boleh berisi kode percobaan atau tugas penerapan yang belum disetujui.

## Format Catatan Perubahan

Untuk setiap pembaruan Master, catat:
- Tanggal.
- Komponen atau kelompok halaman yang terdampak.
- Dokumen Master yang diubah.
- Status/versi sebelumnya.
- Status/versi terbaru.
- Alasan dan instruksi yang menjadi dasar perubahan.
- Commit penerapan jika kode ikut berubah.
- Pemeriksaan yang dilakukan.
- Status penerapan website jika kode website berubah.

## Catatan Awal

### 2026-11-01 — Inventaris Awal Cetak Biru Master

- Membuat folder dokumentasi `MASTER/`.
- Mencatat pola penerapan SPA dan halaman mandiri yang sudah ada.
- Memetakan header, footer, navigasi bawah perangkat seluler, pencarian, bahasa dan mata uang, akun, breadcrumb/hero, serta formulir pemesanan bersama pada tingkat awal.
- Mencatat kelompok halaman dan kepemilikan sumber teknis berdasarkan struktur repository dan dokumentasi arsitektur yang tersedia.
- Mencatat pengecualian yang diketahui dan bagian pemetaan yang masih belum jelas.
- Tidak ada perubahan HTML, CSS, JavaScript, data, aset, alamat halaman, perilaku aplikasi, atau konfigurasi penerapan.
- Versi dasar penerapan: `a8d4282293d98923ecf160f52d95fe6168dd905d`.
- Pemeriksaan: struktur repository dan sumber/dokumentasi yang dirujuk telah diperiksa; pembaruan ini tidak mencakup perubahan tampilan website secara langsung.

### 2026-11-01 — Catatan Awal Fondasi Produk dan Master Layanan

- Menambahkan [Fondasi Produk](./PRODUCT-FOUNDATION.md) yang mencatat posisi premium ramah Muslim, pasar global yang inklusif, kelompok pelanggan, nilai dukungan ramah Muslim, pengalaman pengemudi premium, prinsip harga, dan fungsi website sebagai sumber informasi wisata.
- Menambahkan [Master Layanan](./SERVICE-MASTER.md) yang mencatat kategori Transportasi Privat dengan empat jenis layanan saat ini: Antar-Jemput Bandara, Antar-Jemput Pelabuhan, Transfer Antarkota, dan Wisata Privat Bali.
- Menambahkan [Daftar Ide Masa Depan](./FUTURE-IDEAS.md), yang mencatat Transfer Bali–Jawa sebagai IDE MASA DEPAN, bukan layanan aktif, halaman, atau tugas penerapan.
- Menambahkan [Daftar Pekerjaan](./WORK-REGISTER.md) untuk melacak pembahasan dan pekerjaan dokumentasi yang belum selesai secara bertahap.
- Memperbarui indeks Master dan titik pemeriksaan sesi agar mengarah ke dokumen baru.
- Status: dasar awal dari hasil diskusi telah dicatat; tujuan utama website dan sejumlah detail operasional/komersial masih perlu dibahas dan divalidasi.
- Cakupan: dokumentasi saja. Tidak ada perubahan HTML, CSS, JavaScript, data runtime, alamat halaman, desain, konfigurasi penerapan, atau perilaku website.
- Pemeriksaan: berkas Markdown yang baru dibuat dan diperbarui telah dibaca kembali dari GitHub; tautan dokumentasi dan catatan status diperiksa.

### 2026-11-01 — Struktur Pengetahuan Master dan Daftar Dokumen

- Menambahkan [Katalog Master](./MASTER-CATALOG.md) sebagai indeks pusat dokumen yang sudah ada dan yang direncanakan.
- Menambahkan indeks kelompok di `00-FOUNDATION/`, `01-DATA/`, `02-RULES/`, `03-GUIDELINES/`, `04-EXPERIENCE/`, `05-WEBSITE/`, dan `06-GOVERNANCE/`.
- Menambahkan [Master Armada](./01-DATA/FLEET-MASTER.md) untuk mencatat informasi awal kendaraan dari diskusi, sambil menandai pertanyaan tentang model, kategori Xpander, cara menghitung kursi, dan bagasi sebagai hal yang belum terjawab.
- Memperbarui README Master, Daftar Pekerjaan, dan Mulai dari Sini agar dokumen yang belum dibuat tetap terlihat.
- Menetapkan pemisahan kelompok data faktual, aturan operasional/pelanggan, panduan editorial, pengalaman pelanggan, arsitektur teknis, dan tata kelola/verifikasi sumber.
- Dokumentasi harga telah diidentifikasi tetapi berstatus MENUNGGU DATA sampai kalkulator dan tarif tervalidasi dari Mas Bagus tersedia.
- Status: inventaris dokumentasi dibuat; sebagian besar dokumen dalam daftar masih berupa indeks atau belum dimulai, bukan kebijakan dan spesifikasi yang telah lengkap atau disetujui.
- Cakupan: dokumentasi saja. Tidak ada perubahan kode website, data runtime, alamat halaman, desain, aset, atau konfigurasi penerapan.

### 2026-11-01 — Penggunaan Bahasa Indonesia pada Dokumentasi Master

- Mengubah dokumen inti, indeks kelompok, dan panduan kerja Master ke bahasa Indonesia agar mudah dipelajari Mas Bagus.
- Nama berkas, folder, kode, dan istilah teknis tertentu tetap dipertahankan dalam bahasa Inggris jika diperlukan untuk menjaga kesesuaian dengan struktur repository.
- Menetapkan bahasa Indonesia sebagai bahasa utama seluruh isi dokumentasi Master berikutnya.
- Cakupan: dokumentasi saja; tidak ada perubahan pada website atau proses penerapannya.


### 2026-11-01 — Aturan Fungsi Data dan Inventaris Destinasi Bali

- Menambahkan [Master Destinasi Bali](./01-DATA/DESTINATION-MASTER.md) berdasarkan bagian Places of Interest pada sitemap Bali Golden Tour sebagai acuan awal inventaris.
- Mencatat nama destinasi dan memasangkan kategori utama serta wilayah wisata luas sebagai pengelompokan awal. Kelompok kabupaten/kota sumber hanya dipakai sebagai petunjuk pemeriksaan, bukan kategori BDM Trans.
- Mencatat aturan pemisahan kategori baku, wilayah, label karakteristik tambahan, dan penanda kurasi seperti Popular Destination.
- Menegaskan bahwa Master merupakan bahan dasar model bisnis, produk, layanan, data, dan fungsi informasi; bukan dokumen rancangan tampilan atau implementasi teknis pada tahap ini.
- Menandai sejumlah penempatan wilayah dan nama destinasi yang masih perlu ditinjau bersama. Status dokumen pada tahap awal adalah INVENTARIS AWAL — PERLU PENINJAUAN BERSAMA, bukan data final yang seluruhnya telah disahkan.
- Memperbarui indeks Master dan Daftar Pekerjaan agar tindak lanjut peninjauan destinasi tetap terlihat.
- Cakupan: dokumentasi saja. Tidak ada perubahan pada kode website, data runtime, desain, alamat halaman, aset, atau konfigurasi penerapan.


### 2026-11-01 — Perluasan Inventaris Pantai Bali

- Memperluas [Master Destinasi Bali](./01-DATA/DESTINATION-MASTER.md) dari daftar awal Bali Golden Tour dengan penelusuran tambahan terhadap data Dinas Pariwisata Provinsi Bali, dokumen resmi daerah, dan direktori destinasi pantai.
- Menambahkan inventaris pantai yang dikelompokkan menurut Bali Selatan, Bali Timur, Bali Utara, Bali Barat, serta kelompok pulau Nusa Penida, Nusa Lembongan, dan Nusa Ceningan.
- Menambahkan catatan alias untuk mengurangi entri ganda, serta memisahkan objek pesisir yang bukan pantai sebagai kategori tersendiri.
- Menegaskan bahwa inventaris ini berisi nama dan pengelompokan saja; bukan deskripsi destinasi, prioritas artikel, status populer, atau rekomendasi wisata.
- Menandai nama/lokasi yang belum pasti sebagai perlu validasi. Inventaris tidak mengklaim setiap garis pantai kecil di Bali telah terdata.
- Memperbarui Daftar Pekerjaan untuk melanjutkan audit nama, alias, dan wilayah.
- Cakupan: dokumentasi Master saja. Tidak ada perubahan kode website, tampilan, fitur, data runtime, atau konfigurasi penerapan.
- Commit dokumen destinasi: `fcf7a17c83b9371549f2b89b2636dadf799b697e`.


### 2026-11-01 — Perluasan Inventaris Waterfall, Mountain, dan Lake

- Memperluas [Master Destinasi Bali](./01-DATA/DESTINATION-MASTER.md) dengan inventaris kategori Waterfall, Mountain, dan Lake.
- Waterfall dikelompokkan menurut wilayah wisata luas dan mencatat hubungan kompleks/alias yang perlu diperiksa.
- Mountain diperluas menggunakan data statistik gunung menurut kabupaten/kota serta daftar puncak yang ditemukan pada sumber destinasi/pendakian. Status jalur dan kelayakan aktivitas tidak dianggap otomatis.
- Lake mencatat empat danau utama yang disebut dalam sumber pemerintah: Batur, Beratan, Buyan, dan Tamblingan. Waduk, embung, dan kolam alami dibedakan.
- Nama yang belum pasti ditandai perlu validasi; inventaris bukan pernyataan bahwa seluruh tempat dapat dikunjungi atau dijual sebagai aktivitas.
- Memperbarui Katalog Master dan Daftar Pekerjaan.
- Cakupan: dokumentasi Master saja. Tidak ada perubahan kode website, tampilan, fitur, data runtime, atau konfigurasi penerapan.


### 2026-11-01 — Perluasan Kategori Destinasi Lainnya

- Memperluas [Master Destinasi Bali](./01-DATA/DESTINATION-MASTER.md) dengan inventaris kerja Temple, Rice Terrace, Village, Forest, National Park, Mangrove, Cliff, Hill / Viewpoint, Gate / Landmark, Garden / Park, Hot Spring, Museum, Market, serta Farm / Plantation.
- Menambahkan kelompok wilayah dan catatan alias/relasi kawasan untuk membantu menghindari entri ganda.
- Menegaskan batas cakupan: inventaris pura bukan daftar seluruh tempat suci di Bali; desa, persawahan, hutan, dan kawasan alam luas tidak otomatis merupakan titik kunjungan komersial.
- Nama generik, lokasi meragukan, serta fasilitas yang status operasionalnya belum dipastikan ditandai untuk validasi.
- Memperbarui Katalog Master dan Daftar Pekerjaan.
- Cakupan: dokumentasi Master saja. Tidak ada perubahan website, tampilan, fitur, atau konfigurasi deployment.


### 2026-11-01 — DNA Informasi BDM Trans dan Kerangka Aktivitas & Pengalaman

- Memperluas [Fondasi Produk](./PRODUCT-FOUNDATION.md) dengan arah strategis BDM Trans sebagai jendela bagi wisatawan untuk mengenal, memahami, dan merencanakan Bali.
- Mencatat prinsip informasi: akurat, nyaman dibaca dengan bahasa santai dan ceria, diperkuat visual relevan, serta dilengkapi data praktis seperti lokasi, jarak/waktu tempuh, dan kisaran biaya yang diberi label perkiraan bila belum pasti.
- Menegaskan bahwa manfaat informasi bagi pengunjung tetap menjadi tujuan meskipun mereka tidak membeli layanan; kepercayaan, kunjungan organik, dan SEO diharapkan tumbuh dari kegunaan konten.
- Membuat [Master Aktivitas & Pengalaman](./01-DATA/ACTIVITY-EXPERIENCE-MASTER.md) sebagai kerangka untuk menginventarisasi aktivitas, gambaran pengalaman, lokasi, wilayah, alias, dan data perencanaan.
- Menambahkan aturan agar aktivitas yang belum cocok dengan kelompok umum ditampung sementara pada Aktivitas Lainnya / Belum Dikelompokkan, bukan dipaksakan menjadi kategori baru.
- Mencatat cooking class, surfing lesson/school, dan pengalaman budaya/pembelajaran sebagai contoh aktivitas yang perlu diperiksa; contoh tersebut belum menjadi inventaris terverifikasi.
- Memperbarui indeks Data, Katalog Master, Daftar Pekerjaan, dan protokol Mulai dari Sini agar strategi menjadi acuan kerja berikutnya.
- Batas cakupan: dokumentasi Master saja. Tidak ada pencarian operator, SOP pelaksanaan penyedia, penetapan paket/tarif jual, atau perubahan website, desain, data runtime, maupun konfigurasi deployment.
- Pemeriksaan: seluruh berkas yang diperbarui telah dibaca kembali dari GitHub; format Markdown dan keberadaan tautan utama diperiksa. Commit dokumentasi terakhir diverifikasi.


### 2026-11-01 — Draf SOP Produksi Artikel & SEO Organik

- Membaca protokol Master, Fondasi Produk, indeks Panduan Konten & Editorial, Tata Kelola Sumber, serta SOP perubahan repository, Roadmap, Arsitektur, dan Handoff.
- Meneliti pedoman resmi Google Search Central mengenai people-first content, SEO starter, kebijakan spam, AI search, title links, snippets/meta descriptions, gambar, tautan, canonicalization, structured data, sitemap, dan page experience.
- Meneliti panduan Yoast mengenai SEO analysis, readability, keyphrase placement/density, internal linking, image SEO, alt text, dan title attribute.
- Membuat [SOP Produksi Artikel & SEO Organik](./03-GUIDELINES/ARTICLE-PRODUCTION-SOP.md) versi 0.1 yang mencakup gerbang membaca Master, search intent, riset sumber, orisinalitas, kerangka heading, metadata, tautan, spesifikasi gambar dan Image Manifest, structured data, coding, checklist publikasi, serta pemantauan organik.
- Mencatat status sebagai USULAN — DRAF UNTUK DITINJAU. Angka dimensi dan ukuran file gambar merupakan standar produksi internal yang diusulkan, bukan persyaratan ranking Google.
- Menambahkan kewajiban merujuk SOP artikel sebelum membuat atau menerapkan artikel pada SOP perubahan repository.
- Memperbarui indeks Panduan Konten, Katalog Master, README Master, dan Daftar Pekerjaan.
- Catatan riset penting: tidak ada jaminan “100% original” yang dapat dikeluarkan alat pemeriksa; target internal adalah tidak menyalin, memberi nilai tambah, menyimpan atribusi, dan melakukan pemeriksaan manual. Skor Yoast adalah alat bantu, bukan jaminan ranking. Tautan WhatsApp adalah CTA, bukan sumber referensi.
- Catatan pembaruan Google yang relevan: panduan AI Search menegaskan SEO fundamental tetap berlaku; tidak perlu trik AEO/GEO khusus atau file AI khusus. Google menghapus FAQ rich result mulai 7 Mei 2026.
- Cakupan: dokumentasi SOP dan indeks saja. Tidak ada perubahan layout, template visual, artikel publik, kode website, data runtime, URL publik, aset, atau konfigurasi deployment.
- Status: menunggu tinjauan Mas Bagus sebelum draf ini dinaikkan menjadi SOP final.

### 2026-11-01 — Arah Empat SOP Artikel dan Kerangka Master Bisnis/Pengalaman

- Mencatat persetujuan arah restrukturisasi produksi artikel dari tiga menjadi empat tahap: Perencanaan & Brief, Riset & Penulisan, Implementasi, serta Audit, Publikasi & Evaluasi.
- Membuat [Rencana Restrukturisasi SOP](./03-GUIDELINES/PRODUKSI-ARTIKEL/00-RENCANA-RESTRUKTURISASI.md) tanpa menghapus atau mengganti tiga SOP yang sudah ada.
- Menambahkan arah pengembangan ke masing-masing SOP yang ada dan memperbarui indeks SOP serta SOP repository.
- Membuat [Business / Plan Master](./BUSINESS-PLAN-MASTER.md) sebagai kerangka induk untuk mengumpulkan hasil sharing model bisnis tanpa menduplikasi dokumen detail.
- Membuat [Product & Experience Master](./PRODUCT-EXPERIENCE-MASTER.md) sebagai kerangka area standar pengalaman digital; token dan aturan visual final belum ditetapkan.
- Memperbarui [Mulai dari Sini](./START-HERE.md) dengan protokol menangkap, mengklasifikasikan, merangkum, dan mengonsolidasikan hasil sesi sharing.
- Memperbarui Katalog Master dan Daftar Pekerjaan agar seluruh tindak lanjut tetap terlihat.
- Status: arah empat SOP dan kerangka Master disetujui; detail bisnis dan standar produk masih akan dibahas. Perubahan ini tidak menyatakan seluruh SOP final telah direstrukturisasi.
- Cakupan: dokumentasi Markdown saja. Tidak ada perubahan HTML, CSS, JavaScript, data runtime, desain, URL publik, aset, atau konfigurasi deployment.
