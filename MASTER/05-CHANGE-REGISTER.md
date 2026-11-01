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

- Menambahkan [Master Destinasi Bali](./01-DATA/DESTINATION-MASTER.md) berdasarkan bagian Places of Interest pada sitemap Bali Golden Tour sebagai satu-satunya sumber inventaris tahap ini.
- Mencatat nama destinasi dan memasangkan kategori utama serta wilayah wisata luas sebagai pengelompokan awal. Kelompok kabupaten/kota sumber hanya dipakai sebagai petunjuk pemeriksaan, bukan kategori BDM Trans.
- Mencatat aturan pemisahan kategori baku, wilayah, label karakteristik tambahan, dan penanda kurasi seperti Popular Destination.
- Menegaskan bahwa Master merupakan bahan dasar model bisnis, produk, layanan, data, dan fungsi informasi; bukan dokumen rancangan tampilan atau implementasi teknis pada tahap ini.
- Menandai sejumlah penempatan wilayah dan nama destinasi yang masih perlu ditinjau bersama. Status dokumen adalah INVENTARIS AWAL — PERLU PENINJAUAN BERSAMA, bukan data final yang seluruhnya telah disahkan.
- Memperbarui indeks Master dan Daftar Pekerjaan agar tindak lanjut peninjauan destinasi tetap terlihat.
- Cakupan: dokumentasi saja. Tidak ada perubahan pada kode website, data runtime, desain, alamat halaman, aset, atau konfigurasi penerapan.
