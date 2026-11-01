# SOP Implementasi — Penerapan Halaman dan Publikasi Artikel

> **Status:** BASELINE SEMENTARA — SNAPSHOT IMPLEMENTASI PANTAI KUTA  
> **Versi:** 0.3  
> **Tanggal baseline:** 2026-11-01  
> **Commit acuan implementasi artikel:** `c6532a1ca02bcebe97363104c97ce45f890dc549` (record artikel, renderer, CSS dan tautan sumber kontekstual). **Commit acuan shell global:** `a8d4282293d98923ecf160f52d95fe6168dd905d`.  
> **Pemilik keputusan:** Mas Bagus  
> **Berlaku untuk:** penerapan naskah artikel yang telah disetujui ke dalam website Bali Trans.

## 1. Tujuan dan prinsip perubahan SOP

SOP ini mendokumentasikan **struktur, desain, komponen, dan pola implementasi yang benar-benar ada dan sedang digunakan**, bukan menetapkan Pantai Kuta sebagai desain universal untuk semua halaman.

Pantai Kuta adalah baseline awal karena merupakan artikel yang saat ini sudah memiliki implementasi paling lengkap untuk diperiksa. Jika Mas Bagus meminta perubahan, implementasi diperbarui terlebih dahulu sesuai arahan, diuji, lalu SOP ini direvisi agar selalu mencerminkan hasil aktual terakhir. Versi lama harus tercatat pada riwayat perubahan; jangan menganggap baseline lama tetap berlaku setelah desain diperbarui.

**Aturan utama:**
- SOP Riset harus selesai dan naskah harus disetujui eksplisit oleh Mas Bagus sebelum SOP ini dimulai.
- Jangan membuat ulang desain artikel dari nol jika pola artikel yang telah disetujui sudah tersedia.
- Jangan menyalin semua komponen Pantai Kuta ke jenis halaman lain. Gunakan pola yang sesuai dengan jenis halaman.
- Jangan mengubah komponen global atau halaman lain ketika hanya menerapkan satu artikel.
- Perubahan terhadap navbar, footer, CTA, formulir, FAQ, atau komponen bersama harus diperlakukan sebagai perubahan berdampak luas dan diuji pada semua pemakai komponen yang relevan.
- Dokumentasikan perubahan yang disetujui di SOP ini dan Master komponen terkait.

## 2. Baseline Pantai Kuta — identitas dan taxonomy

Berdasarkan `assets/js/data.js` dan `MASTER/01-DATA/DESTINATION-MASTER.md`:

| Properti | Nilai implementasi saat ini |
|---|---|
| ID artikel | `pantai-kuta-bali` |
| Judul | Pantai Kuta Bali: Informasi Wisata, Aktivitas, dan Tips Berkunjung |
| Status konten | `PUBLISHED` |
| Tipe editorial | `travel-information` |
| Kategori editorial | Travel Information |
| Label artikel | Travel Information; Tips |
| Nama destinasi | Kuta Beach / Pantai Kuta |
| Kategori destinasi | Beach |
| Wilayah | Bali Selatan (`south`) |
| Lokasi administratif | Kuta, Kabupaten Badung, Bali |
| Relasi destinasi | `kuta-beach` |
| Bahasa | Indonesia (`id`) |
| URL bersih | `/blog/pantai-kuta-bali/` |
| Renderer | `renderBlogDetailView(blog)` di `assets/js/views/articles.js` |

Taxonomy destinasi, wilayah, label artikel, dan status kurasi adalah hal berbeda. Ambil data dari Master dan record artikel; jangan menebak breadcrumb atau kategori dari judul saja.

## 3. Peta file implementasi yang diperiksa

| Bagian | File sumber | Peran |
|---|---|---|
| Data artikel, isi HTML, FAQ, tags, metadata, sumber dan media | `assets/js/data.js` | Record `BALI_BLOGS` |
| Renderer halaman artikel | `assets/js/views/articles.js` | Membentuk DOM artikel SPA |
| CSS artikel | `assets/css/pages/article-detail.css` | Gaya terlingkup dengan namespace `.article-*` |
| Entry point dan pemuatan aset | `index.html` | Memuat stylesheet dan JS aplikasi |
| Navigasi SPA | `assets/js/navigation.js` | Route `blog` dan `blog-read`, pemanggilan renderer |
| Navbar dan footer | `assets/js/global-shell.js` | Membuat shell bersama |
| Gaya navbar/footer | `assets/css/global-shell.css` | Styling shell global |
| URL bersih dan metadata crawler | `blog/pantai-kuta-bali/index.html` | Metadata artikel dan redirect ke renderer SPA |
| Master taxonomy | `MASTER/01-DATA/DESTINATION-MASTER.md` | Kategori destinasi dan region |
| Dokumentasi navbar/footer/form | `MASTER/GLOBAL/NAVBAR.md`, `MASTER/GLOBAL/FOOTER.md`, `MASTER/SHARED/BOOKING-FORM.md` | Peta komponen reusable |

Renderer artikel merupakan bagian dari SPA. Folder URL bersih berisi bridge HTML untuk metadata/crawler dan pengalihan pengunjung ke SPA, bukan salinan penuh template artikel.

## 4. Struktur halaman artikel Pantai Kuta saat ini

Urutan renderer yang teramati pada `renderBlogDetailView(blog)`:

1. Shell navbar global (disisipkan oleh `global-shell.js`).
2. Pembungkus `.article-detail-page` dan `.article-detail-shell`.
3. Breadcrumb artikel: Home → Blog → Destinations → kategori destinasi → nama destinasi.
4. Header artikel:
   - label taxonomy;
   - lokasi dengan ikon;
   - H1;
   - ringkasan/dek;
   - byline, penulis, tanggal, dan waktu baca.
5. Gambar utama/featured image dalam frame responsif dan fallback jika gagal.
6. Daftar isi versi mobile (jika jumlah H2 mencapai ambang renderer).
7. Layout isi:
   - daftar isi desktop (jika memenuhi ambang);
   - kolom pembacaan artikel;
   - H2 diberi ID otomatis untuk anchor;
   - gambar pendukung disisipkan setelah paragraf pertama pada H2 yang ditentukan oleh `afterHeading`.
8. FAQ.
9. Kesimpulan.
10. Topik terkait/tag yang dapat diklik.
11. Share article: native share, WhatsApp, X, Facebook, LinkedIn, dan copy link.
12. Artikel terkait (hanya artikel terbit dan relevan; empty state jika belum ada).
13. Rekomendasi destinasi lain/related destinations.
14. Tombol kembali ke semua artikel.
15. Footer global.

Urutan ini adalah baseline Pantai Kuta yang sedang diterapkan. Jangan mengubah urutan atau menghilangkan bagian tanpa arahan Mas Bagus.

## 5. Peta visual dan interaksi per bagian

### 5.1 Breadcrumb dan header artikel

- Breadcrumb saat ini dibentuk di renderer artikel, bukan komponen universal.
- Header menggunakan kelas `.article-header`, `.article-eyebrow`, `.article-taxonomy-labels`, `.article-location`, `.article-header h1`, `.article-dek`, dan `.article-byline`.
- Label tampil ringkas; lokasi dilengkapi ikon pin.
- H1 menjadi judul utama tunggal; dek memberi ringkasan; byline berisi identitas editorial, tanggal, dan estimasi baca.
- Jangan menganggap semua jenis halaman harus memakai breadcrumb atau header artikel ini.

### 5.2 Hero/gambar utama

- Gambar utama berada setelah header artikel, memakai `.article-featured` dan `.article-image-frame`.
- Lebar maksimum featured image 1000px dan rata tengah; frame mengikuti rasio CSS artikel dan gambar memakai object-fit yang telah ditetapkan.
- Tidak ada caption untuk gambar utama pada baseline ini.
- Jika gagal dimuat, `.article-image-fallback` muncul dengan label, alt/deskripsi, dan keterangan gambar tidak dapat ditampilkan.
- Gambar pendukung menggunakan `.article-inline-figure`, frame fallback, caption, serta kredit foto jika tersedia.
- Gambar pendukung ditempatkan melalui metadata `supportingImages[].afterHeading`; perubahan heading harus memeriksa ulang titik sisip.

### 5.3 Daftar isi

- Daftar isi dibuat otomatis dari H2 di dalam `blog.content`.
- ID heading dibentuk dari teks H2 dengan slug normalisasi dan penanganan duplikasi.
- Daftar isi desktop berada di sisi isi artikel; versi mobile memakai elemen details/summary.
- Layout artikel memiliki lebar shell maksimum 1120px; grid desktop menggunakan kolom daftar isi 220px dan kolom baca maksimum 720px, dengan gap responsif. Pada layar lebih sempit, layout berubah mengikuti media query stylesheet.
- Renderer saat ini menampilkannya ketika terdapat sekurang-kurangnya lima H2.
- Setiap perubahan struktur H2 harus memastikan tautan daftar isi masih benar.

### 5.4 Isi artikel dan tipografi

- Konten disimpan sebagai HTML string pada record artikel `content`.
- Area baca menggunakan token tipografi global `--bt-type-body` dan `--bt-leading-body`; paragraf mengikuti ukuran body. H2/H3 menggunakan token heading website.
- Breadcrumb pada baseline menggunakan teks kecil 12px; dek menggunakan token lead. Jangan mengganti ukuran secara lokal tanpa memeriksa token dan tampilan breakpoint.
- Gunakan paragraf, H2/H3, daftar, tabel, strong/bold, em/italic, tautan, dan blockquote sesuai kebutuhan editorial.
- Jangan menaruh semua konten artikel ke sidebar; kolom pembacaan adalah tempat isi artikel.
- Tautan sumber harus kontekstual dan menuju halaman bukti spesifik. Gaya link mengikuti `.article-reading a` (aksen biru, tidak dibuat bold, hover/focus terlihat).
- Blockquote yang sudah ada memakai garis kiri 3px warna biru lembut dan latar `#f6f9fc`.
- Note/catatan yang disetujui memakai panel tersendiri: border halus, latar abu-abu lembut/transparan, padding proporsional, teks satu tingkat lebih kecil dari body, dan kontras memadai. **Baseline Pantai Kuta belum mencatat komponen note khusus yang reusable**; jika note pertama diterapkan, dokumentasikan markup/kelas final setelah disetujui dan diuji. Jangan mengarang nama kelas sebagai implementasi yang sudah ada.

### 5.5 FAQ dan kesimpulan

- FAQ dibangun oleh `renderArticleFaq(blog)` dan `blog.faq`.
- Setiap pertanyaan berada pada kartu/border tersendiri.
- Semua jawaban tertutup saat awal; hanya satu panel terbuka pada satu waktu.
- Trigger memakai `aria-expanded` dan `aria-controls`; perilaku dikendalikan oleh `toggleArticleFaq`.
- Panel jawaban memiliki latar `rgba(241,245,249,.72)`, border lembut, radius 9px, transisi max-height/opacity/transform, dan teks 14px dengan line-height 1.75. Pertanyaan memakai 16px; kartu memiliki border `#e5eaf0` dan radius 13px.
- Kesimpulan dibentuk oleh `renderArticleConclusion(blog)`; teks kesimpulan memakai ukuran body normal, bukan ukuran catatan.
- FAQ renderer saat ini membuat jawaban sebagai teks escaped di dalam paragraf; jika suatu hari jawaban memerlukan rich text/tautan, ubah renderer dengan aman dan perbarui SOP.

### 5.6 Topik, berbagi, dan rekomendasi

- Topik terkait dibentuk oleh `renderArticleTopicTags(blog)`; record tag menentukan halaman dan filter tujuan.
- Share dibentuk oleh `renderArticleShare(blog)`; URL yang dibagikan memakai URL artikel bersih.
- Artikel terkait dibuat oleh `renderRelatedBlogGuides(blog)`; hanya artikel berstatus PUBLISHED dan ada kecocokan relasi/kategori/wilayah/topik. Jika tidak ada, tampilkan empty state yang dirancang.
- Rekomendasi destinasi dibentuk oleh `renderRelatedDestinations(blog)`.
- Jangan mengisi rekomendasi dengan konten yang tidak relevan hanya untuk memenuhi jumlah kartu.

## 6. Klasifikasi komponen: global, shared, dan custom

Klasifikasi ini mencegah desain halaman bercampur dan mengurangi risiko perubahan CSS/HTML memengaruhi halaman lain.

| Komponen | Klasifikasi saat ini | Sumber / keputusan |
|---|---|---|
| Navbar/header situs | GLOBAL | `global-shell.js` + `global-shell.css`; dipakai lintas halaman yang menggunakan shell |
| Footer situs | GLOBAL | `global-shell.js` + `global-shell.css` |
| Breadcrumb artikel | CUSTOM ARTIKEL | `articles.js`, kelas `.article-breadcrumb`; bukan universal |
| Header metadata/H1 artikel | CUSTOM ARTIKEL | `articles.js`, `.article-header` |
| Hero image artikel | CUSTOM ARTIKEL | `articles.js`, `.article-featured` |
| TOC desktop/mobile | CUSTOM ARTIKEL | `articles.js`, `.article-toc*` |
| Konten dan figure artikel | CUSTOM ARTIKEL | data artikel + renderer + `article-detail.css` |
| FAQ artikel | POLA BERSAMA YANG DIREUSE DI ARTIKEL | fungsi `renderArticleFaq` saat ini berada di `articles.js`; belum dibuktikan sebagai komponen global lintas jenis halaman |
| Kesimpulan, topic tags, share, related articles/destinations | CUSTOM ARTIKEL | `articles.js` |
| Booking form | SHARED LAYANAN | `booking-form.html`, `booking-form.css`, `booking-form.js`; bukan komponen halaman artikel |
| CTA global universal | BELUM ADA / BELUM DIVERIFIKASI | Jangan menyebut CTA artikel/footer sebagai komponen global reusable |
| Hero universal | BELUM ADA | Hero tiap jenis halaman dipetakan sesuai konteks |
| Breadcrumb universal | BELUM ADA | Pola breadcrumb saat ini dibuat per halaman |
| Formulir pemesanan | SHARED FLOW | Dapat disesuaikan menurut layanan; perubahan harus mengikuti Master Booking Form |

**Aturan modularisasi CSS/HTML/JS:**
- CSS halaman artikel harus tetap berada pada file khusus dan memakai namespace `.article-*`; hindari selector generik seperti `section`, `h2`, `.card`, atau `.button` tanpa scope.
- Jangan menaruh aturan artikel di `global-shell.css` atau stylesheet global.
- Navbar/footer hanya punya satu sumber markup/logika bersama; jangan menduplikasi markup di renderer halaman.
- Jika suatu komponen benar-benar dipakai beberapa jenis halaman dan Mas Bagus menyetujui penyatuannya, ekstrak menjadi modul bersama, dokumentasikan API/props/data, lalu migrasikan pemakai yang relevan secara terkontrol.
- Jangan mengklaim komponen sudah modular hanya karena tampilan mirip. Harus ada satu sumber implementasi yang dipakai bersama.
- CTA, hero, breadcrumb, FAQ, dan formulir tidak otomatis global hanya karena namanya sama. Klasifikasikan berdasarkan pemakaian dan kesamaan perilaku nyata.
- Hindari CSS collision: setiap modul memiliki prefix/namespace, tanggung jawab file yang jelas, dan daftar pemakai.

## 7. Modularisasi dan pencegahan CSS/HTML collision

### 7.1 Kepemilikan komponen

- **Global:** satu implementasi menjadi sumber tunggal lintas halaman, seperti navbar dan footer di `global-shell.js` + `global-shell.css`.
- **Shared:** komponen/alur digunakan beberapa halaman dengan variasi data/konfigurasi yang jelas, seperti formulir pemesanan. Struktur inti reusable, sementara field dan validasi spesifik layanan boleh menjadi adapter.
- **Custom/page module:** elemen yang hanya dimiliki jenis halaman tertentu, seperti breadcrumb artikel, header artikel, TOC, featured image, konten, FAQ artikel, share, dan related cards.
- **Not yet established:** CTA universal, hero universal, breadcrumb universal, dan note panel artikel belum boleh diklaim sebagai komponen global sebelum satu sumber implementasi dan daftar pemakainya benar-benar ada.

### 7.2 Aturan file dan CSS

- Pertahankan pemisahan data, renderer, CSS, dan shell: data di `data.js`, renderer di `views/`, style khusus di `css/pages/`, shell global di `global-shell.js`/`global-shell.css`.
- Namespace kelas per modul (contoh `.article-*`, `.bt-*`, `.booking-*`). Hindari selector generik tanpa scope dan selector global yang mengubah semua `h2`, `section`, `button`, `a`, atau `.card`.
- CSS artikel saat ini di `article-detail.css` memakai namespace `.article-*`; file tersebut dimuat oleh `index.html` untuk SPA, tetapi aturan desainnya harus tetap terbatas pada komponen artikel.
- Jangan memindahkan aturan khusus halaman ke CSS global hanya demi mengurangi jumlah file.
- Satu komponen global harus punya satu sumber markup, style, dan perilaku yang jelas; jangan menyalin HTML/CSS/JS ke masing-masing halaman.
- Sebelum mengekstrak komponen, buktikan ada minimal dua pemakai nyata dengan perilaku/struktur yang sama, definisikan input/data dan variasi, lalu migrasikan terkontrol.
- Jangan menggabungkan komponen yang hanya mirip secara visual tetapi memiliki alur, semantik, atau kebutuhan aksesibilitas berbeda.

### 7.3 Dampak perubahan komponen

- Perubahan global navbar/footer: petakan semua halaman yang memasang shell dan pengecualian checkout.
- Perubahan shared booking form: uji semua mode layanan yang menggunakan form, termasuk setidaknya satu mode selain yang diubah.
- Perubahan artikel: uji Pantai Kuta dan minimal satu artikel lain saat tersedia; bila belum ada artikel kedua, catat keterbatasan dan uji semua route artikel yang ada.
- Perubahan CTA/FAQ/hero/breadcrumb: tentukan dulu apakah hanya custom atau sudah shared/global; jangan menganggap seluruh halaman otomatis ikut berubah.

## 8. Aturan penerapan artikel baru

- [ ] Naskah final telah disetujui Mas Bagus.
- [ ] Master destinasi/aktivitas telah dibaca dan taxonomy diverifikasi.
- [ ] ID, slug, canonical, kategori, label, region, dan relasi internal ditetapkan.
- [ ] Data artikel ditambahkan ke `BALI_BLOGS` dengan struktur record yang konsisten.
- [ ] Isi HTML memakai semantik heading dan format editorial yang tepat.
- [ ] Tautan sumber menuju halaman spesifik yang mendukung klaim; tidak ada daftar sumber di akhir artikel.
- [ ] Gambar utama dan pendukung mengikuti standar gambar, kredit, lisensi, alt, dan fallback.
- [ ] Heading H2, TOC, dan `afterHeading` supporting images tervalidasi.
- [ ] FAQ, kesimpulan, tag, share, related articles, dan related destinations sesuai data yang tersedia.
- [ ] Metadata halaman/SEO dan clean URL bridge diperiksa.
- [ ] CSS tetap terlingkup dan tidak mengubah halaman lain.
- [ ] Diff diperiksa; tidak ada perubahan di luar permintaan.
- [ ] Uji syntax, route, link, gambar, FAQ, share, mobile/desktop, dan deployment.
- [ ] Commit hash, deployment status, dan URL GitHub Pages diberikan kepada Mas Bagus.

## 9. Tata kelola perubahan dan versi SOP

Setiap kali Mas Bagus mengarahkan perubahan:
1. Catat bagian dan komponen yang diminta.
2. Tentukan apakah perubahan bersifat khusus artikel, shared, atau global.
3. Implementasikan hanya lingkup yang disetujui.
4. Uji halaman yang diubah dan seluruh pemakai komponen bersama yang terdampak.
5. Setelah hasil implementasi diverifikasi, perbarui SOP ini berdasarkan kode yang benar-benar diterapkan.
6. Naikkan versi dan tambahkan entri riwayat: tanggal, versi, perubahan, halaman/komponen terdampak, commit hash, dan status persetujuan.
7. Jangan menghapus baseline sebelumnya; catat sebagai versi terdahulu.

**Aturan baseline bergerak:** Pantai Kuta adalah snapshot awal (v0.1), bukan template abadi. Setiap desain baru yang disetujui menggantikan baseline yang relevan setelah implementasi dan pengujian selesai. Jika suatu perubahan masih berupa ide/mockup, tandai sebagai usulan dan jangan tulis seolah sudah diterapkan.

## 10. Riwayat versi

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1 | 2026-11-01 | Snapshot awal struktur artikel Pantai Kuta, urutan section, interaksi, taxonomy, dan klasifikasi komponen | BASELINE SEMENTARA |
| 0.2 | 2026-11-01 | Analisis lebih rinci token/ukuran visual, FAQ, layout responsif, kepemilikan CSS, modularisasi global/shared/custom, dan aturan pencegahan collision | BASELINE SEMENTARA — MENUNGGU TINJAUAN MAS BAGUS |

## 11. Arah Pengembangan SOP — Acuan Master Produk dan Rencana Implementasi

**Arah yang disepakati pada 2026-11-01:** dalam struktur target empat tahap, dokumen ini menjadi **SOP 03 — Implementasi Halaman**.

Sebelum coding, tahap implementasi perlu menambahkan *Implementation Plan* yang mencatat:
- brief dan naskah yang sudah disetujui;
- jenis halaman dan pola yang sesuai;
- bagian global, shared, page-specific, serta pengecualian;
- file data, renderer, CSS, navigasi, metadata, dan aset yang diperkirakan terdampak;
- hubungan dengan Business/Plan Master;
- standar visual, bahasa antarmuka, layout, komponen, motion, responsive, aksesibilitas dari Product & Experience Master setelah standar tersebut disetujui;
- Technical Master dan aturan kepemilikan modul;
- risiko regresi, rencana pengujian, dan titik pemulihan.

Jangan mengisi detail visual dengan tebakan. Jika Product & Experience Master belum menetapkan standar tertentu, tandai sebagai belum ditetapkan dan minta arahan bila keputusan itu memengaruhi hasil.

Lihat [Rencana Restrukturisasi Empat SOP](./00-RENCANA-RESTRUKTURISASI.md), [Business/Plan Master](../../BUSINESS-PLAN-MASTER.md), dan [Product & Experience Master](../../PRODUCT-EXPERIENCE-MASTER.md).


### Catatan versi 0.3

Menambahkan acuan Business/Plan Master, Product & Experience Master, dan kebutuhan Implementation Plan sebelum coding sebagai arah pengembangan SOP.
