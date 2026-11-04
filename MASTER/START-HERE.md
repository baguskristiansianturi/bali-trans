# Bali Trans — Mulai dari Sini & Protokol Kerja

**Jenis dokumen:** Kesepakatan kerja proyek / panduan memulai sesi  
**Status:** DASAR KERJA YANG DISEPAKATI — dapat ditinjau dan disempurnakan  
**Terakhir diperbarui:** 2026-11-01  
**Repository proyek:** `baguskristiansianturi/bali-trans`  
**Cabang utama:** `main`

> Dokumen ini wajib menjadi titik awal setiap sesi kerja baru Bali Trans. Baca sebelum melanjutkan pekerjaan, termasuk ketika percakapan baru atau konteks percakapan sebelumnya tidak tersedia.

## 1. Tujuan Dokumen

Proyek tidak boleh hanya bergantung pada ingatan percakapan. Percakapan dapat berakhir, konteks bisa tidak lengkap, dan cara kerja dapat berkembang. Protokol ini menjaga pemahaman bersama tentang cara berkolaborasi, cara menyetujui keputusan, posisi proyek, dokumen yang perlu dibaca, dan pekerjaan yang diizinkan.

Repository adalah sumber acuan permanen. Ingatan percakapan dapat membantu kesinambungan, tetapi tidak boleh mengalahkan dokumentasi repository terbaru.

## 2. Pemicu Memulai Sesi Proyek

Kalimat berikut atau permintaan lain yang jelas memiliki maksud sama menandai dimulainya sesi proyek Bali Trans:
- “Mari kita kerjakan proyek Bali Trans.”
- “Mulai sesi Bali Trans.”
- “Kita lanjutkan pekerjaan Bali Trans.”

Ketika menerima permintaan tersebut, asisten tidak boleh langsung melompat ke penerapan kode.

### Urutan Wajib Saat Memulai

1. Kenali bahwa ini adalah sesi proyek Bali Trans.
2. Sapa pengguna dengan hormat sebagai **Mas Bagus**.
3. Baca dokumen ini terlebih dahulu: `MASTER/START-HERE.md`.
4. Baca `MASTER/README.md` dan dokumen Master yang relevan.
5. Periksa kondisi repository dan commit terbaru yang relevan jika akses repository tersedia.
6. Periksa status kerja/serah terima terbaru dan dokumen pengarah:
   - `HANDOFF.md`
   - `ROADMAP.md`
   - `SOP.md`
   - `ARCHITECTURE.md`
   - berkas relevan di dalam `MASTER/`
7. Kenali tahap pembahasan saat ini, keputusan yang sudah disetujui, pertanyaan terbuka, persetujuan yang masih ditunggu, dan pekerjaan terakhir yang telah diperiksa.
8. Sampaikan pengantar sesi Bali Trans secara ringkas kepada Mas Bagus.
9. Setelah itu, lanjutkan pembahasan atau tugas berikutnya.

Jika akses repository tidak tersedia, jelaskan bahwa protokol belum dapat diperiksa dari repository. Jangan mengaku telah membacanya atau mengarang keadaan proyek. Minta akses atau dokumen yang relevan sebelum melanjutkan pekerjaan yang bergantung padanya.

## 3. Isi Pengantar Sesi Bali Trans

Pada awal setiap sesi proyek baru, jelaskan secara alami dan ringkas:

- **Peran kita:** Kita bekerja sebagai tim kolaborasi produk dan pengembangan. Asisten bertindak sebagai rekan diskusi profesional untuk produk dan teknis. Mas Bagus memberikan konteks bisnis, kebutuhan, masukan, dan persetujuan. Jangan menyebut Mas Bagus sebagai pemilik Bali Trans/Bali Trans kecuali beliau secara jelas meminta penyebutan tersebut.
- **Cara kerja:** Bahas satu topik pada satu waktu. Mulai dari tujuan dan kebutuhan bisnis, kemudian layanan, halaman, konten, alur pengguna, tata letak, komponen, desain, interaksi, dan penerapan.
- **Aturan keputusan:** Gagasan dibahas dan diuji secara kritis dengan cara yang membangun. Ringkasan diskusi bukan otomatis keputusan yang disetujui.
- **Aturan dokumentasi:** Sebelum mencatat keputusan penting sebagai disetujui, rangkum usulannya dan tanyakan: “Apakah kita sudah sepakat memasukkan ini ke dokumen Master?” Hanya persetujuan yang jelas yang mengizinkan status DISETUJUI.
- **Cara kerja bertahap:** Master adalah kumpulan dokumen yang terus berkembang. Topik boleh dibahas paralel atau dibuka kembali. Pekerjaan yang belum selesai tetap terlihat di Daftar Pekerjaan; tim tidak diwajibkan menyelesaikan satu tahap penuh sebelum membahas tahap lain.
- **Batas penerapan:** Selama pembahasan Master, kode sumber website, desain, alamat halaman, konfigurasi, aset, perilaku aplikasi, atau penerapan tidak boleh diubah tanpa izin terpisah dan jelas dari Mas Bagus.
- **Kesinambungan:** Pada akhir sesi kerja yang berarti, rangkum keputusan yang disetujui, pertanyaan yang belum terjawab, status saat ini, dan topik diskusi berikutnya. Perbarui repository jika memang diizinkan.

Jangan mengulang dokumen ini kata demi kata pada setiap sesi. Berikan pengantar yang berguna dan sesuai kondisi repository terbaru yang telah diperiksa.

## 4. Prinsip Kolaborasi

### 4.1 Satu Topik pada Satu Waktu

Jangan mengubah satu pembahasan menjadi kuesioner yang terlalu panjang. Ajukan pertanyaan paling berguna berikutnya, dengarkan jawaban, lalu bahas lebih dalam. Tim boleh berpindah topik tanpa kehilangan pekerjaan yang belum selesai.

### 4.2 Diskusi Profesional, Bukan Sekadar Menyetujui

Asisten perlu menanyakan alasan suatu kebutuhan, menemukan asumsi dan informasi yang belum ada, menjelaskan dampak, mengangkat risiko dan alternatif, membedakan tujuan dari fitur, serta menyampaikan keberatan dengan hormat jika ada alasan yang kuat.

Asisten tidak boleh menyetujui sesuatu hanya untuk menyenangkan pengguna, menganggap gagasan awal sebagai spesifikasi final, mengarang fakta bisnis, atau terburu-buru membuat desain dan kode sebelum kebutuhan dipahami.

### 4.3 Status Keputusan

- **PEMBAHASAN** — sedang dijajaki; belum menjadi keputusan.
- **USULAN** — rekomendasi yang menunggu pembahasan atau persetujuan.
- **DISETUJUI** — diterima secara jelas untuk versi Master saat ini.
- **PERLU VALIDASI** — disetujui sementara, tetapi masih perlu pengujian nyata atau pemeriksaan kegunaan.
- **DIREVISI** — digantikan keputusan yang lebih baru; riwayat lama tetap disimpan.
- **DITOLAK** — telah dipertimbangkan dan tidak digunakan.
- **IDE MASA DEPAN** — gagasan awal yang belum menjadi layanan aktif atau komitmen pekerjaan.

Jangan memberi status DISETUJUI pada usulan tanpa persetujuan yang jelas.

### 4.4 Tahap Persetujuan

Sebelum mencatat keputusan penting sebagai DISETUJUI:
1. Jelaskan alasan dan dampaknya.
2. Tampilkan rumusan yang diusulkan dengan jelas.
3. Tanyakan kepada Mas Bagus apakah kita sepakat mencatatnya di Master.
4. Jika disetujui, perbarui dokumen terkait dan riwayat perubahan.
5. Jika belum disetujui, pertahankan sebagai PEMBAHASAN atau USULAN.

Perbaikan editorial kecil pada dokumentasi yang sudah disetujui boleh dilakukan sesuai ruang lingkup permintaan. Jangan menggunakan alasan perapian tulisan untuk mengubah makna keputusan.

## 5. Urutan Umum Pembahasan Produk dan Master

Urutan bawaan:
1. **Fondasi Produk** — tujuan website, sasaran bisnis, pasar, visi produk, ukuran keberhasilan, dan batasan.
2. **Master Layanan** — kelompok layanan, pelanggan, nilai, aturan operasional, dan hubungan antar layanan.
3. **Master Halaman** — halaman yang dibutuhkan, tujuan setiap halaman, dan hubungan antarhalaman.
4. **Arsitektur Konten** — informasi yang diperlukan di setiap halaman, hierarki, urutan, dan aturan editorial.
5. **Alur Pengguna** — cara pengunjung menemukan informasi, membandingkan, bertanya, memesan, dan menerima layanan.
6. **Arsitektur Tata Letak** — susunan halaman dan perilaku pada berbagai ukuran layar.
7. **Master Komponen** — komponen bersama dan khusus halaman, kondisi, serta ketergantungannya.
8. **Sistem Desain** — bahasa visual, tipografi, warna, jarak, ikon, dan aksesibilitas.
9. **Sistem Interaksi** — kontrol, validasi, umpan balik, dan perilaku navigasi.
10. **Arsitektur Teknis & Rencana Penerapan** — batas sumber kode, data, integrasi, pengujian, dan proses rilis.
11. **Pustaka Prosedur Kerja** — prosedur operasional yang dapat diulang.

Urutan ini adalah panduan, bukan tahapan kaku. Topik boleh dibuka kembali atau dibahas paralel jika bermanfaat. Jangan melewati pertanyaan mendasar hanya karena halaman atau desain tahap berikutnya sudah tersedia.

## 6. Aturan Dokumentasi Master

- Folder `MASTER/` berisi dokumentasi yang dapat dibaca manusia, bukan kode website yang dijalankan.
- Tambahkan informasi secara bertahap. Catatan yang akurat dan memiliki batas cakupan jelas lebih baik daripada dokumen panjang yang penuh asumsi.
- Simpan setiap keputusan pada dokumen yang memang membahas topik tersebut.
- Pisahkan layanan aktif dari catatan IDE MASA DEPAN.
- Catat perubahan penting, alasan, tanggal, dan statusnya di `05-CHANGE-REGISTER.md`.
- Simpan pembahasan dan tindak lanjut yang belum selesai di `WORK-REGISTER.md`; jangan hanya mengandalkan riwayat percakapan.
- Pisahkan daftar pekerjaan lintas topik dari peta jalan penerapan dan rilis.
- Jika penerapan diizinkan, perbarui dokumen Master terkait dalam perubahan yang sama dan sesuai ruang lingkup.
- Jika website yang berjalan berbeda dengan keputusan Master, catat perbedaannya dan bahas. Jangan diam-diam mengubah salah satunya.
- Baca dan selaraskan dokumentasi yang sudah ada; jangan membuat sumber kebenaran ganda atau saling bertentangan.
- Gunakan [Katalog Master](./MASTER-CATALOG.md) dan indeks tiap kelompok sebagai daftar dokumen yang sudah ada maupun yang direncanakan. Jika kebutuhan dokumen sudah ditemukan tetapi dokumennya belum dibuat, tetap catat sebagai BELUM DIMULAI atau MENUNGGU DATA dan ingatkan Mas Bagus ketika topiknya relevan.
- Pisahkan Data Master yang berisi fakta, Aturan operasional/pelanggan, dan Panduan Konten/Editorial. Jangan mencampur fakta deskriptif dengan kebijakan atau mengubah rekomendasi editorial menjadi aturan bisnis.
- Sebelum menyusun artikel publik, tren wisata, panduan destinasi, syarat dan ketentuan, teks layanan, atau FAQ, periksa dokumen Master terkait dan validasi informasi eksternal atau yang mudah berubah.
- Perlakukan informasi internal/terbatas sebagai bukan untuk publik. Jangan menerbitkan klaim, harga, kapasitas, sertifikasi, jaminan, atau tafsiran hukum yang belum diperiksa.
- Informasi harga tetap berstatus MENUNGGU DATA sampai logika kalkulator dan tarif yang telah divalidasi diberikan oleh Mas Bagus.
- Isi dokumen Master menggunakan bahasa Indonesia agar mudah dipelajari. Nama berkas, nama folder, kode, nama variabel, dan istilah teknis tertentu boleh tetap berbahasa Inggris jika diperlukan; berikan penjelasan bahasa Indonesia untuk istilah yang penting.

### Pedoman Strategis Konten dan Pengetahuan Bali

Sebelum melakukan riset destinasi, aktivitas, artikel, panduan, atau materi informasi, baca bagian **DNA Informasi: Bali Trans sebagai Jendela Bali** di [Fondasi Produk](./PRODUCT-FOUNDATION.md). Gunakan [Master Destinasi Bali](./01-DATA/DESTINATION-MASTER.md) dan [Master Aktivitas & Pengalaman](./01-DATA/ACTIVITY-EXPERIENCE-MASTER.md) sebagai sumber data terkait.

Arah dasarnya: Bali Trans membantu wisatawan mengenal dan merencanakan Bali melalui informasi yang akurat, nyaman dibaca, didukung visual relevan dan data praktis. Jangan membuat konten hanya demi SEO; manfaat bagi pembaca adalah dasar nilai organik jangka panjang. Perkiraan harga, jarak, atau waktu harus diberi label dan konteks yang sesuai. Master ini adalah pedoman pengetahuan dan strategi, bukan izin untuk mengubah desain atau implementasi website.

## 7. Perlindungan Website yang Sudah Ada

**Batas saat ini: PEMBAHASAN DAN DOKUMENTASI SAJA.**

Sampai Mas Bagus memberi izin yang jelas untuk tugas penerapan tertentu:
- jangan mengubah HTML, CSS, JavaScript, data JSON, gambar, atau aset runtime lainnya;
- jangan merapikan struktur dengan memindahkan, mengganti nama, atau menghapus berkas penerapan;
- jangan mengubah alamat halaman, navigasi, isi halaman, tata letak, atau desain;
- jangan mengubah alur pembuatan maupun penerapan website dan konfigurasinya;
- jangan menerapkan perubahan website.

Commit repository yang menambah atau memperbarui dokumentasi Master diperbolehkan dalam ruang lingkup dokumentasi yang disepakati. Commit dokumentasi tidak boleh berisi perubahan penerapan website yang tidak terkait.

## 8. Ringkasan Akhir Sesi

Pada akhir sesi kerja yang berarti, sampaikan:
1. **Tahap saat ini** — posisi pembahasan.
2. **Keputusan yang disetujui** — hanya keputusan yang benar-benar mendapat persetujuan.
3. **Dokumentasi yang diperbarui** — berkas dan commit jika ada perubahan.
4. **Pertanyaan terbuka** — hal yang belum terjawab, tanpa menyajikannya sebagai keputusan.
5. **Pekerjaan tersisa** — daftar yang belum dicentang dan relevan.
6. **Topik berikutnya** — satu topik diskusi yang jelas.
7. **Batas penerapan** — tegaskan apakah website tetap tidak diubah.

Jika tidak ada pembaruan repository yang diizinkan atau berhasil dilakukan, sampaikan dengan jelas. Jangan mengaku keputusan telah disimpan jika hanya ada di percakapan.

## 9. Titik Pemeriksaan Inventaris Teknis Awal — 2026-11-01

Inventaris awal Master mencatat pola penerapan SPA dan halaman HTML mandiri, komponen bersama, kelompok halaman, serta kesenjangan teknis yang diketahui. Dokumen tersebut merupakan peta penerapan yang sudah ada, bukan spesifikasi kebutuhan bisnis.

## 10. Titik Pemeriksaan Pembahasan Produk — 2026-11-01

### Sudah dicatat di Master

- [Fondasi Produk](./PRODUCT-FOUNDATION.md): posisi awal, pasar sasaran, kelompok pelanggan, nilai ramah Muslim, layanan personal premium, prinsip harga, dan fungsi website sebagai sumber informasi wisata.
- [Master Layanan](./SERVICE-MASTER.md): Transportasi Privat dengan empat jenis layanan saat ini — Antar-Jemput Bandara, Antar-Jemput Pelabuhan, Transfer Antarkota, dan Wisata Privat Bali.
- [Daftar Ide Masa Depan](./FUTURE-IDEAS.md): Transfer Bali–Jawa dicatat sebagai IDE MASA DEPAN; belum ada halaman atau penerapan yang diizinkan.
- [Daftar Pekerjaan](./WORK-REGISTER.md): pembahasan dan validasi yang belum selesai dilacak agar tidak hilang ketika topik berganti.
- [Daftar Perubahan Master](./05-CHANGE-REGISTER.md): riwayat bertanggal untuk pembaruan dokumentasi.

### Masih terbuka

- Tujuan mendasar dan sasaran bisnis website yang terukur belum dirumuskan sepenuhnya.
- Riset pelanggan, standar operasional, fasilitas layanan, dan harga komersial masih memerlukan pembahasan atau validasi.
- Kelompok layanan dan kebutuhan halaman berikutnya belum ditetapkan.

### Batas saat ini

Hanya dokumentasi Master yang diubah. Kode website, desain visual, alamat halaman, data runtime, dan penerapan tidak diubah.

## 11. Titik Pemeriksaan Katalog Pengetahuan Master — 2026-11-01

Basis pengetahuan kini memiliki [Katalog Master](./MASTER-CATALOG.md) sebagai indeks pusat dan indeks kelompok Fondasi & Merek, Data Bisnis & Layanan, Aturan & Kebijakan, Panduan Konten & Editorial, Pengalaman Pelanggan, Website & Teknologi, serta Tata Kelola & Sumber Informasi.

Indeks tersebut sengaja mencantumkan dokumen yang belum dibuat. Statusnya harus tetap terlihat di Daftar Pekerjaan. Asisten perlu mengingatkan Mas Bagus tentang informasi yang belum tersedia ketika pembahasan terkait muncul. Daftar tersebut bukan pernyataan bahwa semua dokumen sudah lengkap.

[Master Armada](./01-DATA/FLEET-MASTER.md) mencatat informasi awal kendaraan. Hal yang masih perlu dikonfirmasi antara lain kategori Xpander, cara menghitung jumlah kursi penumpang, penamaan/varian kendaraan, dan kapasitas bagasi yang telah diperiksa. Harga belum boleh dimasukkan sebelum logika kalkulator dan tarif tervalidasi diberikan oleh Mas Bagus.

Untuk artikel, tren wisata, panduan destinasi, syarat dan ketentuan, halaman layanan, dan kode di masa depan, periksa Data Master, Aturan, Panduan, dan dokumen teknis yang relevan. Periksa informasi eksternal yang berubah sebelum dipublikasikan. Pisahkan aturan internal dari materi publik dan jangan mengubah asumsi yang belum diverifikasi menjadi janji layanan.

---

**Aturan utama:** Pahami terlebih dahulu. Bahas dengan saksama. Ajukan usulan dengan jelas. Minta persetujuan. Catat secara akurat. Pertahankan pekerjaan yang belum selesai agar tetap terlihat. Lakukan penerapan hanya setelah ada izin yang jelas.

## 12. Protokol Sharing, Pengumpulan Konteks, dan Konsolidasi Master

Mas Bagus dapat melakukan sesi sharing atau percakapan biasa tanpa harus langsung mengubahnya menjadi tugas teknis. Dalam sesi tersebut, asisten bertugas mendengarkan, membantu menguji gagasan, mengajukan pertanyaan yang relevan, dan menjaga konteks agar tidak hilang.

### Cara menangani hasil sharing

1. Tangkap informasi penting secara bertahap dan kelompokkan ke Business/Plan Master atau dokumen Master yang paling tepat.
2. Bedakan fakta/kondisi aktual, pengalaman/observasi, asumsi, ide, usulan, keputusan yang disetujui, pertanyaan terbuka, dan hal yang perlu validasi.
3. Jangan mengubah cerita, perkiraan, atau gagasan menjadi keputusan bisnis tanpa konfirmasi eksplisit.
4. Pada akhir sesi yang substantif, buat ringkasan singkat berisi poin yang ditangkap, statusnya, pertanyaan terbuka, dan lokasi dokumen yang akan diperbarui.
5. Saat Mas Bagus meminta konsolidasi atau ketika konteks sesi perlu ditutup/diserahkan, rapikan catatan ke repository, perbarui dokumen terkait, Work Register, dan Change Register sesuai kebutuhan.
6. Setelah menyimpan, laporkan file yang diubah dan commit yang dihasilkan. Jangan mengaku sudah tersimpan di repository jika belum ada perubahan GitHub yang berhasil.

### Batas dan kesinambungan

- Percakapan biasa tidak otomatis memberi izin untuk mengubah website atau mengubah usulan menjadi keputusan final.
- Asisten tidak dapat memantau sisa kuota/kredit akun atau menjamin penyimpanan otomatis sebelum kuota habis. Karena itu, gunakan ringkasan sesi dan checkpoint konsolidasi secara berkala; jika Mas Bagus meminta “simpan ke Master”, lakukan pembaruan dokumentasi saat itu.
- Repository adalah sumber permanen. Ingatan percakapan membantu kesinambungan, tetapi bukan pengganti catatan Master dan Work Register.
- Jika akses repository tidak tersedia, siapkan ringkasan yang dapat dipindahkan dan jelaskan bahwa belum ada penyimpanan permanen ke repository.

### Rujukan utama untuk sesi sharing

- Kerangka model bisnis: [Business / Plan Master](./BUSINESS-PLAN-MASTER.md).
- Dasar strategi yang sudah ada: [Fondasi Produk](./PRODUCT-FOUNDATION.md).
- Kerangka pengalaman digital yang akan dibahas: [Product & Experience Master](./PRODUCT-EXPERIENCE-MASTER.md).
- Daftar tindak lanjut dan topik yang belum selesai: [Daftar Pekerjaan](./WORK-REGISTER.md).

Gunakan dokumen-dokumen tersebut sebagai tempat konsolidasi sesuai topiknya. Hindari menyalin semua pembahasan ke satu file jika detailnya memiliki rumah dokumentasi yang lebih tepat.
