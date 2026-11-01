# Usulan SOP Tipografi & Desain Halaman Detail Artikel — Bali Trans

> **Status:** USULAN — DRAF RISET, BELUM DISETUJUI  
> **Versi:** 0.1  
> **Tanggal:** 2026-11-01  
> **Pemilik keputusan:** Mas Bagus  
> **Ruang lingkup:** Tipografi dan pengalaman membaca halaman detail artikel/blog Bali Trans.  
> **Catatan:** Dokumen ini adalah standar usulan untuk ditinjau. Dokumen ini tidak mengubah website atau menetapkan template visual final.

---

## 1. Tujuan

Dokumen ini menjadi acuan awal untuk merancang halaman detail artikel Bali Trans yang nyaman dibaca, profesional, konsisten dengan identitas website, responsif, dan mudah dipelihara.

Prioritas desain:
1. Keterbacaan isi artikel pada ponsel terlebih dahulu.
2. Hierarki informasi yang jelas dan mudah dipindai.
3. Konsistensi dengan tipografi dan identitas Bali Trans yang sudah ada.
4. Elemen pendukung yang benar-benar membantu pembaca, bukan dekorasi atau promosi berlebihan.
5. Struktur semantik dan aksesibilitas yang baik.
6. Komponen yang dapat digunakan kembali untuk artikel berikutnya.

## 2. Dasar riset dan keputusan font

### 2.1 Temuan popularitas font

Popularitas font tidak memiliki satu peringkat universal. Hasil berbeda karena metodologi, sampel website, jenis halaman, dan cara menghitung font yang dimuat.

Beberapa pengamatan yang diperiksa:
- HTTP Archive Web Almanac 2025 mencatat Roboto, Open Sans, dan Montserrat sebagai keluarga variable font yang banyak digunakan; Inter juga termasuk kelompok font Latin yang digunakan luas. Data ini mengukur penggunaan di web, bukan kualitas keterbacaan secara langsung.
- Studi StackScan 2026 terhadap website mendapati Roboto, Open Sans, Inter, Montserrat, dan Poppins di antara keluarga Google Fonts yang paling banyak digunakan. Hasilnya dipengaruhi pula oleh template dan builder.
- Studi Mark Studios terhadap 566 homepage yang dapat dianalisis dari daftar 1.000 domain teratas pada 29 Oktober 2026 menempatkan Inter sebagai body font yang paling sering ditemukan dalam sampel tersebut, diikuti Roboto dan Open Sans. Sampelnya terbatas pada homepage yang font-nya dapat diidentifikasi, bukan seluruh web.
- Pengukuran Fonts Over Time pada sekitar 9.963 homepage juga menempatkan Inter sebagai body font teratas dalam sampel crawl 25 Oktober 2026. Ini tetap merupakan pengukuran sampel, bukan sensus seluruh internet.

**Kesimpulan:** Inter, Roboto, dan Open Sans adalah kandidat sans-serif yang populer dan mapan. Popularitas tidak membuktikan satu font otomatis paling nyaman untuk semua orang. Pemilihan akhir harus mempertimbangkan font yang sudah digunakan website, karakter brand, dukungan karakter, performa, dan hasil uji baca pada perangkat nyata.

### 2.2 Audit font website Bali Trans

Stylesheet dasar saat ini menetapkan:

`body { font-family: 'Inter', sans-serif; }`

Artinya Inter sudah menjadi font global website. Menggunakan font berbeda khusus untuk artikel tanpa alasan kuat berisiko membuat blog terasa seperti website lain, menambah permintaan font, dan menciptakan sistem tipografi ganda.

### 2.3 Rekomendasi font utama

**Rekomendasi utama: gunakan Inter untuk seluruh halaman artikel, baik judul, subjudul, metadata, maupun isi.**

Alasan:
- Konsisten dengan font global Bali Trans yang sudah diterapkan.
- Sans-serif modern dan netral, cocok untuk panduan perjalanan yang informatif sekaligus profesional.
- Memiliki rentang weight yang memadai untuk membentuk hierarki tanpa harus mengganti keluarga font.
- Populer dan memiliki ekosistem web yang matang.
- Satu keluarga font membantu menjaga konsistensi dan menghindari beban font tambahan.

Jangan menambahkan Playfair Display, Poppins, Montserrat, atau serif dekoratif hanya untuk membuat judul terlihat berbeda. Font-font tersebut dapat menjadi alternatif eksperimen visual, tetapi belum ada alasan yang cukup untuk mengganti Inter yang sudah menjadi standar website.

**Fallback:** Inter, lalu system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif. Pastikan fallback tetap memiliki tampilan yang wajar jika font web gagal dimuat.

## 3. Sistem hierarki tipografi — nilai awal untuk diuji

Nilai berikut merupakan titik awal desain, bukan ukuran yang tidak boleh berubah. Gunakan rem agar ukuran dapat mengikuti pengaturan browser dan kebutuhan aksesibilitas.

| Elemen | Mobile | Desktop | Weight | Line-height |
|---|---:|---:|---:|---:|
| H1 judul artikel | 1.9–2.125rem (30–34px) | 2.25–2.75rem (36–44px) | 700–750 | 1.15–1.25 |
| Lead / ringkasan pembuka | 1.0625–1.125rem (17–18px) | 1.1875–1.25rem (19–20px) | 400–450 | 1.55–1.7 |
| H2 bagian utama | 1.5rem (24px) | 1.75–1.875rem (28–30px) | 700 | 1.25–1.35 |
| H3 subbagian | 1.25rem (20px) | 1.375rem (22px) | 600–700 | 1.3–1.4 |
| H4 / heading kecil | 1.125rem (18px) | 1.125–1.25rem (18–20px) | 600 | 1.35–1.45 |
| Body artikel | 1.0625rem (17px) | 1.125rem (18px) | 400 | 1.65–1.8 |
| Metadata / caption | 0.8125–0.875rem (13–14px) | 0.875rem (14px) | 400–500 | 1.4–1.5 |
| Label / chip | 0.75–0.8125rem (12–13px) | 0.75–0.8125rem (12–13px) | 600 | 1.3–1.4 |

### 3.1 H1 — judul artikel

- Satu H1 untuk judul artikel.
- Weight 700 sebagai pilihan dasar; 750/800 hanya jika pengujian visual menunjukkan hasil lebih baik.
- Gunakan sentence case, bukan ALL CAPS.
- Jaga panjang judul agar mudah dibaca dalam beberapa baris di ponsel.
- Hindari letter-spacing negatif berlebihan yang membuat huruf tampak rapat.
- Jangan memaksa judul menjadi satu baris.
- Judul harus menjadi elemen teks paling dominan pada halaman, bukan metadata, label, atau tombol.

### 3.2 Lead / deskripsi singkat

Lead adalah ringkasan manfaat artikel yang berada dekat judul. Fungsinya memberi konteks dan alasan pembaca melanjutkan, bukan mengulang judul dengan kata-kata berbeda.

- Gunakan ukuran sedikit lebih besar daripada body.
- Weight normal atau medium; jangan otomatis dibuat bold.
- Batasi menjadi sekitar 1–3 kalimat.
- Warna boleh sedikit lebih lembut dari heading, tetapi tetap memiliki kontras yang memadai.
- Jangan mengulang paragraf pembuka secara identik.

### 3.3 H2 dan H3

- H2 menandai bagian utama artikel.
- H3 menjelaskan subtopik di dalam H2.
- H4 hanya digunakan bila hierarki isi memang membutuhkannya.
- Jangan memilih tag heading berdasarkan ukuran visual semata.
- Jangan melompat dari H2 ke H4.
- Judul bagian harus deskriptif, singkat, dan membantu pembaca mengetahui isi bagian sebelum membaca seluruh paragraf.
- Gunakan sentence case dan hindari tanda titik di akhir heading kecuali memang diperlukan secara tata bahasa.

### 3.4 Body text

- Gunakan Inter Regular 400 sebagai standar.
- Ukuran 17px pada mobile dan 18px pada desktop menjadi titik awal pengujian.
- Gunakan line-height sekitar 1.65–1.8.
- Rata kiri; hindari justified text.
- Gunakan warna teks utama gelap di atas latar terang.
- Batasi lebar kolom baca sekitar 65–75 karakter per baris; target praktis 68–72ch.
- Pisahkan paragraf berdasarkan satu gagasan utama. Hindari blok teks panjang tanpa jeda.

### 3.5 Bold dan italic

- Gunakan <strong> atau bold 600–700 untuk istilah, fakta, atau potongan informasi yang benar-benar penting.
- Jangan menebalkan satu paragraf penuh.
- Jangan menggunakan bold sebagai pengganti heading.
- Jangan menebalkan terlalu banyak kata dalam setiap paragraf karena hierarki visual akan hilang.
- Italic hanya untuk istilah asing, judul karya, atau penekanan terbatas; jangan gunakan italic untuk paragraf panjang.
- ALL CAPS hanya untuk kode atau label sangat pendek jika memang dibutuhkan.

### 3.6 Link, caption, kutipan, dan list

- Tautan di dalam isi harus mudah dikenali tanpa bergantung hanya pada warna; underline tipis atau indikator visual yang konsisten dapat digunakan.
- Caption gambar minimal 13–14px, line-height sekitar 1.45, dan kontras memadai.
- Kutipan panjang dipakai hanya jika benar-benar memberi nilai editorial; jangan menjadikan seluruh artikel sebagai quote block.
- List digunakan untuk langkah, pilihan, persyaratan, atau informasi yang memang lebih mudah dipindai sebagai butir.
- Jangan menggunakan ikon atau emoji untuk menggantikan heading semantik.

## 4. Spasi dan lebar area baca

Nilai awal yang direkomendasikan:
- Lebar maksimum kolom artikel: 68–72ch, dengan batas praktis sekitar 720–760px bergantung font dan ukuran layar.
- Jarak antarparagraf: sekitar 0.9–1.15em.
- Jarak sebelum H2: sekitar 2.2–2.8em.
- Jarak setelah H2: sekitar 0.65–0.9em.
- Jarak sebelum H3: sekitar 1.5–2em.
- Jarak antara gambar dan caption: rapat tetapi tidak menempel.
- Hindari kolom artikel yang terlalu lebar pada desktop; ruang ekstra lebih baik digunakan untuk daftar isi atau ruang kosong yang terukur.

WCAG 2.2 SC 1.4.12 meminta konten tetap dapat digunakan ketika pembaca mengatur line-height minimal 1.5 kali ukuran font, jarak setelah paragraf 2 kali ukuran font, letter spacing 0.12 kali ukuran font, dan word spacing 0.16 kali ukuran font. Angka tersebut adalah uji ketahanan terhadap pengaturan pengguna, bukan kewajiban agar semua halaman selalu memakai spacing sebesar itu. Layout harus tetap berfungsi ketika pengaturan tersebut diterapkan.

## 5. Prinsip halaman detail artikel

Halaman detail harus mendukung tiga perilaku:
1. Pembaca ingin memahami topik dengan cepat.
2. Pembaca ingin menemukan bagian tertentu tanpa harus membaca semuanya secara linear.
3. Pembaca yang sudah selesai membaca ingin menemukan langkah atau bacaan berikutnya yang relevan.

Jangan mengubah halaman detail menjadi landing page penjualan. Isi artikel harus tetap menjadi fokus utama. CTA layanan hanya ditampilkan jika relevan dengan topik dan tidak mengganggu alur membaca.

## 6. Urutan struktur halaman — usulan

Urutan ini merupakan rekomendasi awal untuk diuji menggunakan artikel Pantai Kuta.

### A. Breadcrumb

- Posisi sebelum header artikel.
- Menunjukkan jalur yang jelas: Blog > Kategori > Judul artikel.
- Setiap item yang terlihat sebagai link harus memiliki tujuan yang benar-benar tersedia.
- Jangan membuat breadcrumb palsu yang tidak dapat diklik.

### B. Header artikel

Urutan isi:
1. Label kategori utama.
2. H1 judul artikel.
3. Lead / deskripsi ringkas.
4. Metadata: penulis atau penerbit, tanggal publikasi, tanggal pembaruan bila benar-benar ada, dan estimasi waktu baca.
5. Tombol berbagi boleh disediakan sebagai fungsi sekunder, bukan elemen dominan.

Jangan menampilkan tanggal pembaruan palsu. Tanggal publikasi dan modifikasi harus berasal dari data yang benar.

### C. Gambar utama

- Satu gambar utama yang relevan dengan isi.
- Rasio awal 16:9 atau 3:2; pilih berdasarkan foto dan komposisi, bukan dipaksakan.
- Gunakan caption bila memberi konteks atau atribusi.
- Alt text mendeskripsikan informasi visual yang penting; jangan menjejalkan kata kunci.
- Jangan menempatkan judul artikel di atas foto jika membuat kontras dan keterbacaan buruk.

### D. Area isi artikel

**Desktop:**
- Kolom utama untuk isi artikel.
- Lebar isi tetap terkontrol.
- Sidebar opsional untuk daftar isi (TOC) yang ringkas dan sticky setelah melewati header, jika panjang artikel memang membutuhkannya.
- Jangan meletakkan paragraf atau konten utama artikel di sidebar.
- Hindari sidebar penuh iklan, kartu promosi, dan daftar artikel acak.

**Mobile:**
- Satu kolom.
- Isi artikel mengambil lebar layar dengan padding yang nyaman.
- Sidebar desktop tidak dipaksakan menjadi kolom sempit.
- TOC dapat menjadi panel ringkas yang dapat dibuka jika artikel panjang; judul bagian tetap harus tampak di badan artikel.
- Jangan membuat elemen fixed menutupi teks atau kontrol browser.

### E. Daftar isi (TOC)

TOC layak ditampilkan jika artikel panjang atau memiliki banyak bagian yang benar-benar berbeda. Titik awal uji: sekitar 5–6 H2 atau lebih.

- Gunakan judul H2 sebagai item utama.
- H3 boleh ditampilkan sebagai sub-item secara terbatas.
- Label sederhana seperti “Di halaman ini”.
- Setiap item mengarah ke ID bagian yang benar.
- Desktop dapat menggunakan sidebar sticky dengan batas tinggi dan scroll internal yang tidak mengganggu.
- Mobile menggunakan panel ringkas, bukan sidebar.
- Jangan menambahkan TOC pada artikel pendek yang hanya memiliki sedikit bagian.

### F. Isi artikel

- Urutan informasi mengikuti kebutuhan pembaca, bukan kepentingan promosi.
- Paragraf, heading, list, tabel, gambar, peta, dan callout hanya digunakan ketika memperjelas informasi.
- Untuk artikel destinasi, data praktis seperti akses, lokasi, waktu tempuh, kondisi, biaya, fasilitas, dan keselamatan dapat disajikan dalam blok ringkasan jika sumbernya kuat.
- Hindari mengulang informasi yang sama pada itinerary, deskripsi tempat, FAQ, dan kesimpulan.
- Jangan menyembunyikan informasi penting di accordion hanya untuk menghemat tinggi halaman.

### G. Penutup artikel

Setelah isi utama, gunakan penutup editorial singkat:
- simpulkan keputusan atau wawasan utama;
- berikan saran praktis yang relevan;
- jangan mengulang seluruh artikel;
- jangan mengakhiri semua artikel dengan promosi layanan.

### H. Label / topik artikel

- Tampilkan beberapa label yang benar-benar menggambarkan isi artikel.
- Label harus dapat diklik hanya jika halaman label/kategori tujuan sudah tersedia.
- Jangan menampilkan kumpulan tag terlalu panjang.
- Hindari label sinonim yang berulang atau dibuat hanya untuk SEO.

### I. Sumber dan referensi

- Tampilkan sumber yang benar-benar digunakan untuk fakta penting.
- Gunakan nama penerbit dan tautan yang jelas.
- Letakkan setelah isi artikel dan sebelum atau sesudah rekomendasi sesuai alur yang disepakati.
- Jangan memasukkan tautan promosi sebagai referensi faktual.
- Tanggal akses dapat dicatat untuk data yang cepat berubah.

### J. Informasi penulis / editorial

- Tampilkan hanya jika identitas penerbit/penulis jelas dan disetujui.
- Jangan membuat gelar, pengalaman, atau kredensial yang tidak benar.
- Jika artikel ditulis oleh tim editorial, gunakan identitas tim secara transparan dan konsisten.
- Bio singkat harus menambah kepercayaan, bukan sekadar mengisi ruang.

### K. Artikel rekomendasi

Rekomendasi harus berdasarkan hubungan topik dan kebutuhan pembaca, bukan hanya tanggal terbaru.

Urutan prioritas:
1. Artikel lanjutan yang menjawab pertanyaan berikutnya dari topik yang sama.
2. Artikel destinasi/aktivitas di wilayah yang sama dan wajar digabungkan dalam perjalanan.
3. Panduan praktis yang melengkapi keputusan pembaca.
4. Artikel terbaru hanya jika tetap relevan.

Pola tampilan yang disarankan:
- Satu kartu “Lanjutkan membaca” untuk artikel paling relevan.
- Di bawahnya 2–3 kartu “Artikel terkait”.
- Kartu menampilkan gambar, kategori, judul, dan deskripsi sangat singkat.
- Jangan menampilkan artikel yang sama, link mati, atau artikel yang hanya mirip kata kuncinya.
- Jangan menampilkan blok rekomendasi kosong atau placeholder palsu.
- Jika belum ada artikel lain yang relevan, sembunyikan blok rekomendasi dan gunakan navigasi kategori/blog yang benar-benar tersedia.

**Kondisi konten saat ini:** Pantai Kuta merupakan satu-satunya artikel yang dipertahankan. Karena belum ada artikel lain untuk direkomendasikan, jangan membuat kartu rekomendasi palsu. Modul rekomendasi baru diaktifkan setelah tersedia konten lain yang relevan.

### L. CTA kontekstual

- CTA hanya jika berhubungan langsung dengan topik dan membantu pembaca mengambil langkah berikutnya.
- Untuk panduan destinasi, CTA transportasi atau tur dapat dipertimbangkan jika relevan, tetapi harus berada setelah informasi utama atau pada titik yang tidak memotong paragraf.
- Hindari CTA berulang setelah setiap section.
- CTA tidak boleh membuat artikel terasa sebagai iklan terselubung.

### M. Navigasi akhir

- Link kembali ke kategori atau blog.
- Tombol kembali ke atas dapat disediakan untuk artikel panjang.
- Footer global tetap menggunakan komponen bersama website.

## 7. Aturan rekomendasi artikel

Setiap rekomendasi harus melewati pemeriksaan:
- topik terkait secara substantif;
- sesuai dengan maksud pembaca pada titik tersebut;
- konten tersedia dan URL aktif;
- bukan artikel duplikat atau tipis;
- gambar dan ringkasan sesuai isi;
- tidak mengulang kartu yang sudah ditampilkan pada bagian lain.

Jangan membuat rekomendasi berdasarkan kategori saja. Dua artikel dapat berada pada kategori yang sama tetapi tidak saling membantu. Sebaliknya, artikel dari kategori berbeda dapat relevan jika menjawab langkah perjalanan berikutnya.

Untuk tahap awal, maksimal 3–4 kartu sudah cukup. Jangan memenuhi akhir artikel dengan daftar panjang.

## 8. Aksesibilitas, performa, dan teknis

- Pastikan kontras teks memenuhi WCAG AA: minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar.
- Gunakan heading semantik satu H1 dan hierarki H2/H3 yang berurutan.
- Semua gambar informatif memiliki alt text yang sesuai.
- TOC dan tombol berbagi harus dapat digunakan dengan keyboard dan pembaca layar.
- Pastikan zoom dan pengaturan text spacing tidak memotong konten.
- Jangan gunakan ukuran font absolut yang menghalangi pembesaran; gunakan rem/em.
- Hindari memuat beberapa keluarga font yang tidak diperlukan.
- Gambar utama tidak boleh lazy-load jika menjadi elemen LCP; gambar di bawah lipatan dapat lazy-load.
- Structured data Article/BlogPosting harus sama dengan informasi yang terlihat, termasuk headline, image, author, datePublished, dan dateModified bila berlaku.
- Data terstruktur membantu mesin pencari memahami artikel, tetapi tidak menjamin rich result atau peringkat.
- URL, canonical, indexability, dan renderability harus diuji pada tahap SEO teknis terpisah.

## 9. Checklist persetujuan desain

### Tipografi
- [ ] Inter digunakan konsisten dengan font global.
- [ ] H1 jelas dominan, tidak terlalu besar di ponsel.
- [ ] H2/H3 memiliki hierarki yang mudah dikenali.
- [ ] Body text nyaman dibaca di layar Android.
- [ ] Bold digunakan secukupnya.
- [ ] Caption, metadata, dan label tidak terlalu kecil.
- [ ] Lebar baris dan jarak paragraf nyaman.
- [ ] Kontras teks memenuhi target aksesibilitas.

### Struktur artikel
- [ ] Breadcrumb benar dan dapat digunakan.
- [ ] Kategori, H1, lead, dan metadata tersusun jelas.
- [ ] Gambar utama dan caption tampil baik.
- [ ] Kolom isi tidak terlalu lebar di desktop.
- [ ] Mobile menjadi satu kolom yang nyaman.
- [ ] TOC hanya muncul jika berguna.
- [ ] Konten utama tidak dipindah ke sidebar.
- [ ] Penutup tidak mengulang seluruh artikel.
- [ ] Label menuju halaman yang valid.
- [ ] Sumber dan atribusi jelas.
- [ ] Identitas penulis tidak dibuat-buat.
- [ ] Rekomendasi relevan dan tidak kosong.
- [ ] CTA tidak mengganggu pembacaan.
- [ ] Footer global tetap konsisten.

### Uji perangkat
- [ ] Android mobile pada lebar kecil dan umum.
- [ ] Tablet.
- [ ] Desktop.
- [ ] Zoom browser dan text spacing.
- [ ] Navigasi keyboard dan fokus.
- [ ] Tidak ada horizontal overflow atau elemen menutupi teks.

## 10. Tahap persetujuan dan penerapan

1. Riset ini menjadi usulan, bukan desain final.
2. Mas Bagus meninjau arah tipografi dan struktur yang direkomendasikan.
3. Setelah arah disetujui, buat mockup/preview detail artikel dengan Pantai Kuta sebagai konten uji.
4. Lakukan revisi sampai Mas Bagus menyetujui desain.
5. Setelah persetujuan eksplisit, tetapkan dokumen ini sebagai standar final, catat versi, dan perbarui Template Registry.
6. Baru setelah itu implementasikan template pada website.
7. Artikel berikutnya harus menggunakan template yang sudah disetujui, tanpa merancang ulang dari nol.

---

## 11. Referensi riset

### Popularitas dan penggunaan font
- HTTP Archive, Web Almanac 2025 — Fonts: https://almanac.httparchive.org/en/2025/fonts
- StackScan, Google Fonts technologies by market share: https://www.stackscan.com/fonts/google-fonts
- StackScan, Web Design Statistics 2026: https://www.stackscan.com/blog/web-design-statistics
- Mark Studios, Website Fonts Study (29 October 2026): https://www.markstudios.com/research/website-fonts-study
- Fonts Over Time: https://fontsovertime.com/

### Tipografi, keterbacaan, dan aksesibilitas
- NICE Design System — Typography: https://design-system.nice.org.uk/foundations/typography/
- Home Office User-Centred Design Manual — Typography: https://design.homeoffice.gov.uk/design-system/styles/typography
- Home Office User-Centred Design Manual — Layout and typography: https://design.homeoffice.gov.uk/accessibility/page-structure/layout-typography
- W3C WAI — Understanding WCAG 2.2 Text Spacing: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing
- GOV.UK Design System — Layout: https://design-system.service.gov.uk/styles/layout/
- Nielsen Norman Group — Be Succinct! Writing for the Web: https://www.nngroup.com/articles/be-succinct-writing-for-the-web/
- Nielsen Norman Group — The Layer-Cake Pattern of Scanning Content on the Web: https://www.nngroup.com/articles/layer-cake-pattern-scanning/

### Struktur artikel dan rekomendasi konten
- U.S. CMS Design System — Article page: https://design.cms.gov/layouts/article-page/
- Office for National Statistics Design System — News pages: https://service-manual.ons.gov.uk/design-system/patterns/news
- Yale — Page Layout and Content Organization: https://usability.yale.edu/ux/plan/establish-structure-findability/page-layout-and-content-organization
- Nielsen Norman Group — Is Navigation Useful?: https://www.nngroup.com/articles/is-navigation-useful/
- Google Search Central — Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google News Publisher Center — Best practices for article pages: https://support.google.com/news/publisher-center/answer/9607104

---

**Riwayat persetujuan:** Belum disetujui. Menunggu tinjauan Mas Bagus.
