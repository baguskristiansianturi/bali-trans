# SOP Perubahan Repository Bali Trans

Dokumen ini wajib dibaca sebelum mengerjakan setiap permintaan perubahan dari Mas Bagus. Berlaku untuk seluruh pekerjaan di repository ini dan menjadi aturan kerja utama.

## 1. Pahami instruksi sebelum bertindak

1. Baca prompt Mas Bagus sampai selesai.
2. Tentukan secara spesifik halaman, file, komponen, dan hasil yang diminta.
3. Bedakan dengan tegas antara:
   - **Diminta:** perubahan yang disebutkan secara eksplisit.
   - **Di luar lingkup:** perubahan lain, meskipun menurut asisten terlihat perlu atau lebih baik.
4. Jika satu detail penting benar-benar ambigu dan berisiko mengubah hasil, tanyakan satu pertanyaan singkat sebelum mengedit.
5. Jangan mulai mengedit hanya berdasarkan dugaan, kebiasaan, atau ide tambahan dari asisten.

## 2. Aturan utama: jangan mengubah yang tidak diminta

- Ubah **hanya** bagian yang diperlukan untuk memenuhi prompt.
- Jangan mengubah desain, tata letak, urutan section, ukuran atau bentuk card, jarak, warna, font, gambar, carousel, navbar, footer, sticky bar, responsivitas, interaksi, atau perilaku halaman kecuali diminta secara eksplisit.
- Permintaan copywriting/SEO berarti fokus pada teks, metadata, atribut gambar, heading semantik, tautan, dan data SEO yang relevan. Itu **bukan** izin untuk mendesain ulang halaman.
- Permintaan memperbaiki satu komponen berarti jangan menyentuh komponen lain atau halaman lain.
- Jangan melakukan refactor, merapikan kode, mengganti nama, menghapus fitur, memperbarui dependency, atau mengubah cache-busting sebagai pekerjaan sampingan.
- Jangan mengubah homepage ketika tugas menyebut halaman lain.
- Jika perubahan yang diminta tampak membutuhkan dampak tambahan, berhenti dan minta persetujuan sebelum memperluas lingkup.
- Jangan menambahkan “perbaikan sekalian” tanpa izin.

## 3. Amankan titik pemulihan sebelum mengedit

1. Periksa branch dan commit aktif serta perubahan yang sudah ada.
2. Baca dokumen proyek yang relevan, minimal `HANDOFF.md`, `ROADMAP.md`, dan `AUDIT.md` jika konteks tugas membutuhkannya.
3. Catat commit terakhir yang diketahui aman sebelum perubahan dimulai.
4. Jangan menimpa atau membuang pekerjaan yang sudah ada.
5. Jika kondisi branch atau perubahan sebelumnya tidak jelas, hentikan pengeditan dan periksa dahulu.
6. Untuk setiap tugas, buat commit yang terukur dan mudah dipulihkan. Jangan menggabungkan perubahan yang tidak berkaitan dalam satu commit.

## 4. Periksa lingkup dan diff

Sebelum commit:

1. Periksa seluruh file yang berubah.
2. Pastikan setiap perubahan dapat ditelusuri langsung ke instruksi Mas Bagus.
3. Pastikan tidak ada perubahan CSS/layout, halaman lain, aset, atau perilaku yang tidak diminta.
4. Jika ditemukan perubahan di luar lingkup, batalkan hanya perubahan tak diminta tersebut dengan aman. Jangan menutupinya menggunakan patch tambahan.
5. Jangan commit atau deploy apabila diff masih mengandung perubahan yang tidak disetujui.

## 5. Pengujian yang sesuai dengan tugas

- Jalankan pemeriksaan yang relevan dengan bagian yang benar-benar diubah.
- Pastikan halaman lain dan desain yang sudah disetujui tidak ikut berubah jika tugas memiliki risiko lintas halaman.
- Jangan menyatakan pengujian berhasil jika belum dijalankan atau hasilnya belum diperiksa.
- Jika ada kegagalan, laporkan dengan jelas. Jangan memperluas lingkup untuk memperbaikinya tanpa izin.
- Jangan mengklaim pemeriksaan visual di perangkat nyata sudah dilakukan jika belum.

## 6. Commit, deploy, dan verifikasi

1. Commit hanya perubahan yang diminta dan sudah diperiksa.
2. Ikuti alur deployment proyek setelah perubahan yang diminta siap untuk dipublikasikan.
3. Periksa status GitHub Actions/deployment sampai ada hasil yang dapat diverifikasi.
4. Jangan menyatakan situs publik sudah diperbarui sebelum deployment berhasil.
5. Berikan commit, status pengujian/deployment, dan URL halaman yang relevan secara ringkas.
6. Jika deployment gagal atau masih berjalan, nyatakan status sebenarnya; jangan menganggap berhasil.

## 7. Pemulihan jika hasil salah

- Gunakan commit aman yang sudah dicatat sebelum tugas dimulai.
- Jika terjadi regresi, hentikan perubahan lanjutan dan pulihkan dari titik aman yang sesuai.
- Jangan membuat banyak patch tambahan untuk menutupi kesalahan yang disebabkan perubahan di luar lingkup.
- Jangan memindahkan branch ke commit lain secara paksa tanpa memastikan commit tujuan, kondisi branch, dan dampaknya.

## 8. Format ringkas sebelum mulai bekerja

Sebelum melakukan edit, pastikan secara internal:

- **Permintaan:** apa tepatnya yang diminta?
- **Target:** file/halaman/komponen mana yang boleh disentuh?
- **Yang harus tetap:** bagian apa saja yang wajib dipertahankan?
- **Titik aman:** commit apa yang menjadi dasar pemulihan?
- **Validasi:** pemeriksaan apa yang relevan dengan tugas ini?

Tidak perlu mengirim rencana panjang kepada Mas Bagus setiap kali. Ajukan pertanyaan hanya jika ada ambiguitas yang benar-benar menghalangi pekerjaan. Setelah lingkup jelas, kerjakan secara langsung dan terbatas.

## 9. Prinsip keputusan

**Instruksi eksplisit Mas Bagus mengalahkan inisiatif asisten.** “Terlihat lebih baik”, “sekalian dirapikan”, atau “mungkin diperlukan” bukan alasan yang sah untuk mengubah hal lain. Jika tidak diminta, jangan ubah.

## 10. SOP breadcrumb, hierarki halaman, dan navigasi

Breadcrumb bukan hiasan dan bukan sekadar daftar nama halaman. Breadcrumb adalah petunjuk posisi konten di dalam struktur informasi website. Sebelum membuat atau mengubah breadcrumb, asisten WAJIB memeriksa struktur halaman, master taxonomy, jenis konten, relasi parent-child, route yang benar-benar tersedia, dan fungsi setiap tingkat.

### 10.1 Tentukan jenis halaman terlebih dahulu

Identifikasi apakah halaman yang dikerjakan adalah:
- halaman utama/landing page;
- halaman indeks atau listing (misalnya Blog, Destinations, kategori);
- halaman detail artikel;
- halaman detail destinasi;
- halaman detail aktivitas/pengalaman;
- halaman layanan, produk, atau booking.

Jangan menyamakan **jenis konten** dengan **kategori konten** atau **objek yang dibahas**. Contoh: artikel blog tentang Pantai Kuta tetap merupakan artikel dalam bagian Blog; Pantai Kuta adalah destinasi yang dibahas; Beaches adalah kategori destinasi. Ketiganya memiliki fungsi berbeda dan tidak boleh dipertukarkan.

### 10.2 Urutan breadcrumb harus mengikuti hierarki informasi

Gunakan urutan dari konteks paling umum menuju item yang sedang dibuka. Untuk artikel yang membahas destinasi, pola yang digunakan adalah:

`Home / Blog / Destinations / [Destination Category] / [Destination Name]`

Contoh untuk artikel Pantai Kuta:

`Home / Blog / Destinations / Beaches / Pantai Kuta`

Makna tiap tingkat:
1. **Home** — pintu kembali ke halaman utama website.
2. **Blog** — bagian editorial tempat artikel diterbitkan.
3. **Destinations** — kelompok/topik destinasi yang menjadi konteks artikel, bukan judul artikel.
4. **Beaches** — kategori destinasi sesuai taxonomy master (misalnya Beaches, bukan dipilih berdasarkan tebakan).
5. **Pantai Kuta** — destinasi spesifik yang sedang dibahas dan menjadi posisi halaman saat ini.

Pola ini adalah hierarki informasi untuk artikel destinasi. Untuk jenis halaman lain, tentukan pola dari struktur master dan parent-child yang berlaku; jangan menyalin pola artikel destinasi secara membabi buta.

### 10.3 Aturan sumber data dan taxonomy

- Periksa `MASTER` dan data master yang relevan sebelum menentukan kategori, nama, atau parent.
- Gunakan ID dan relasi taxonomy yang kanonis untuk menentukan kategori; label tampilan boleh berupa bentuk jamak/terjemahan yang ditetapkan di master.
- Jangan mengarang kategori, parent, slug, nama destinasi, atau jalur navigasi.
- Bedakan label editorial/display (misalnya “Pantai Kuta”) dari nama data destinasi (misalnya “Kuta Beach”) sesuai konvensi konten yang sudah dipakai.
- Jika master data belum lengkap atau status halaman masih PLANNED/UNVERIFIED, breadcrumb boleh menjelaskan konteks hierarki hanya jika memang diperlukan dan datanya didukung. Jangan membuat tautan seolah-olah route sudah tersedia.
- Jangan mengubah taxonomy master hanya untuk menyesuaikan satu breadcrumb tanpa kebutuhan dan persetujuan yang jelas.

### 10.4 Fungsi tautan setiap item

- Item ancestor hanya boleh berupa tautan jika route tujuan benar-benar ada, aktif, dan dapat dibuka.
- Item yang belum memiliki route harus ditampilkan sebagai teks biasa; jangan membuat href palsu, `#` yang tampak seperti navigasi, atau route tebakan.
- Item terakhir adalah current page/item dan harus ditandai sebagai posisi saat ini (misalnya `aria-current="page"`); secara default bukan tautan.
- Pastikan tautan mengarah ke halaman parent yang benar, bukan selalu ke Home atau indeks Blog.
- Jika breadcrumb bersifat informatif sementara karena parent page belum dibuat, jangan menyebutnya sebagai navigasi aktif.

### 10.5 Checklist sebelum menyelesaikan breadcrumb

Asisten harus memeriksa semua hal berikut:
1. Apakah jenis halaman sudah dikenali dengan benar?
2. Apakah urutannya bergerak dari konteks umum ke konteks spesifik?
3. Apakah Blog/Editorial dibedakan dari Destinations/Services dan kategori objek?
4. Apakah kategori dan parent berasal dari master data?
5. Apakah nama item terakhir sesuai objek yang benar-benar dibahas?
6. Apakah setiap tautan memiliki route aktif yang valid?
7. Apakah current item ditandai dengan benar dan tidak diberi tautan palsu?
8. Apakah breadcrumb konsisten dengan halaman sejenis?
9. Apakah perubahan hanya menyentuh breadcrumb/data yang diminta, tanpa mengubah layout lain?
10. Apakah hasil diuji pada URL halaman yang tepat setelah deployment?

Jika satu jawaban belum dapat dipastikan, periksa repository/master data lebih dahulu. Jangan menebak lalu menunggu Mas Bagus menemukan kesalahannya.

## 11. SOP khusus produksi artikel dan konten SEO

Sebelum membuat, menulis, mengubah data, atau melakukan coding untuk artikel BDM Trans:

1. **Langkah pertama sebelum membuat artikel baru atau memperbarui artikel yang ada adalah membaca `MASTER/03-GUIDELINES/ARTICLE-PRODUCTION-SOP.md` dari awal sampai akhir.** Jangan mulai riset, menulis, mengubah data artikel, atau coding sebelum SOP tersebut diperiksa. Aturan ini berlaku untuk artikel kedua dan seterusnya, termasuk artikel Pantai Melasti dan destinasi lain.
2. Wajib membaca DNA Informasi di `MASTER/PRODUCT-FOUNDATION.md` serta Master Destinasi, Master Aktivitas & Pengalaman, atau Data Master lain yang relevan.
3. Wajib melakukan riset kata kunci dan analisis kompetitor pada hasil Google halaman pertama dan kedua sejauh dapat diakses; catat strategi, kekuatan, kelemahan, dan content gap sebelum menulis. Ikuti gaya editorial BDM Trans dan gunakan target pembaca dari Master. Naskah wajib minimal 800 kata isi artikel; kurang dari 800 kata otomatis gagal checklist dan tidak boleh dinyatakan selesai/publikasi. Wajib menyelesaikan sumber, Article Brief, outline, naskah, metadata, dan Image Manifest sesuai SOP sebelum coding.
4. Coding harus menggunakan template dan arsitektur artikel yang benar-benar berlaku di repository; jangan membuat layout baru sebagai konsekuensi otomatis dari permintaan SEO.
5. Terapkan standar media terbaru di SOP artikel: satu gambar utama tanpa caption, minimal dua gambar pendukung bercaption di tengah artikel, nama file deskriptif, alt text alami, dan fallback teks di dalam frame jika gambar gagal dimuat.
6. Semua halaman yang menggunakan FAQ wajib memakai pola accordion bersama di SOP artikel: setiap pertanyaan berupa kartu mandiri ber-border lembut; seluruh jawaban tertutup saat awal; hanya satu jawaban terbuka; pertanyaan mengikuti ukuran teks body; jawaban satu tingkat lebih kecil; panel jawaban berlatar transparan lembut dengan transisi halus; dan memilih pertanyaan lain otomatis menutup jawaban sebelumnya. Kesimpulan tetap memakai ukuran teks body.
7. Perubahan artikel tetap tunduk pada aturan lingkup, diff, pengujian, commit, deployment, dan verifikasi dalam dokumen ini.
8. Standar gambar versi 0.2 dan standar FAQ versi 0.4 telah dikonfirmasi Mas Bagus dan wajib diterapkan pada artikel berikutnya serta halaman lain yang menggunakan FAQ.


## 12. SOP Destination Hub, kategori, dan sinkronisasi publikasi

Destination Hub adalah katalog destinasi, bukan halaman artikel. Kartu destinasi hanya boleh membuka artikel yang benar-benar sudah dipublikasikan dan memiliki relasi ke satu record destinasi Master.

### 12.1 Sumber data dan angka kategori

- Master taxonomy dan identitas tempat: `content/bali-master-data.json`.
- Artikel dan konten yang dirender: `BALI_BLOGS` di `assets/js/data.js`.
- Artikel harus memiliki `publicationStatus: 'PUBLISHED'` dan `relatedDestinationId` yang cocok dengan ID destinasi Master.
- Record Master yang dipakai sebagai destinasi publik harus bertipe `record_kind: 'place'`; record `area_group` atau `combined_place_activity` tidak boleh otomatis menjadi kartu destinasi tunggal.
- Angka All Destinations dan setiap kategori dihitung otomatis dari relasi artikel berstatus PUBLISHED ke record Master. Jangan mengetik angka kategori secara manual atau menghitung seluruh inventaris Master sebagai jumlah destinasi terbit.
- Kategori tetap dirender dari Master walaupun jumlah artikel terbitnya nol. Pilihan kategori kosong harus menampilkan empty state yang informatif, bukan menghilangkan kategori.

### 12.2 Definisi Latest

- Latest pada Destination Hub berarti destinasi yang paling baru ditambahkan ke data Master, bukan artikel yang paling baru diunggah atau diedit.
- Untuk record baru, isi `master_added_at` dengan tanggal penambahan ke Master (format ISO `YYYY-MM-DD`). Jika data destinasi diperbarui secara substantif, isi `master_updated_at` tanpa mengubah `master_added_at`.
- Urutkan koleksi Latest berdasarkan `master_added_at` terbaru. Untuk record lama yang belum memiliki timestamp, urutan posisi record di array Master menjadi fallback; record baru harus ditambahkan di bagian akhir sampai timestamp tersedia.
- Latest tetap hanya menampilkan record yang memiliki artikel PUBLISHED dan relasi aktif. Record Master yang belum memiliki artikel tidak boleh membuka halaman yang belum ada.

### 12.3 Checklist wajib setiap artikel destinasi diterbitkan, diperbarui, atau ditarik

- [ ] Status publikasi artikel disetel dengan benar: PUBLISHED hanya setelah gerbang publikasi artikel lulus.
- [ ] `relatedDestinationId` cocok dengan satu ID destinasi Master yang benar.
- [ ] Record Master memiliki kategori utama `primary_category_id`, `record_kind: 'place'`, dan wilayah yang sesuai.
- [ ] Tanggal `master_added_at` tersedia untuk destinasi baru; tanggal `master_updated_at` hanya berubah bila data Master berubah substantif.
- [ ] Angka All Destinations dan kategori berubah otomatis sesuai status publikasi; tidak ada angka manual yang perlu disunting.
- [ ] Tab kategori yang berisi destinasi menampilkan kartu yang benar dan tautan menuju artikel yang tepat.
- [ ] Kategori dengan jumlah nol tetap terlihat dan menampilkan empty state.
- [ ] Latest mengurutkan berdasarkan data Master, bukan tanggal unggah artikel.
- [ ] Periksa hasil di mobile dan desktop serta uji tautan kartu setelah deployment.

Checklist ini wajib dijalankan kembali setelah artikel destinasi baru diterbitkan, status publikasi berubah, relasi Master berubah, atau artikel ditarik dari publikasi.
