# SOP Audit — Audit Setelah Publikasi Artikel

> **Status:** DRAF — gerbang audit dan persetujuan akhir  
> **Versi:** 0.1  
> **Berlaku untuk:** artikel yang sudah berhasil diterbitkan dan dapat dibuka melalui GitHub Pages.

## 1. Gerbang masuk

- [ ] SOP Implementasi selesai.
- [ ] Deployment berhasil.
- [ ] URL artikel publik tersedia.
- [ ] Commit hash dan status deployment dicatat.
- [ ] Pemeriksaan dilakukan pada halaman publik, bukan hanya preview lokal atau source code.

Audit memiliki dua jalur wajib: **UI/UX** dan **kualitas konten, originalitas, serta SEO**.

## 2. Audit UI — tampilan

- [ ] Navbar, breadcrumb, hero, label, ikon, gambar, dan footer tampil benar.
- [ ] Tidak ada teks mentah, karakter `/n`, HTML yang bocor, elemen tumpang tindih, atau komponen terpotong.
- [ ] Tipografi konsisten: ukuran body, heading, bold, italic, tautan, caption, dan note panel.
- [ ] Note panel memiliki border halus, latar lembut, padding yang cukup, dan teks satu tingkat lebih kecil tanpa kehilangan keterbacaan.
- [ ] Warna tautan kontras, konsisten, tidak mengandalkan bold, dan memiliki state hover/focus.
- [ ] Gambar utama dan gambar pendukung memiliki rasio, posisi, caption, kredit, dan fallback yang benar.
- [ ] Jarak antar-section dan lebar konten konsisten.
- [ ] Tampilan mobile, tablet, dan desktop diperiksa sejauh perangkat/sarana tersedia.
- [ ] Tidak ada overflow horizontal atau teks yang terlalu kecil.

## 3. Audit UX — fungsi dan alur

- [ ] Breadcrumb dan seluruh internal link menuju halaman yang tepat.
- [ ] Tautan sumber membuka halaman spesifik yang benar-benar mendukung klaim.
- [ ] Tautan eksternal tidak mengarah ke homepage jika tersedia halaman bukti langsung.
- [ ] Tombol share bekerja dan URL yang dibagikan benar.
- [ ] FAQ tertutup saat awal; membuka satu jawaban menutup jawaban lain.
- [ ] Tag/topik dan related articles relevan serta tidak menuju halaman kosong yang tidak direncanakan.
- [ ] Navigasi mobile dan footer dapat digunakan.
- [ ] Tidak ada CTA, tombol, atau ikon yang tampak aktif tetapi tidak berfungsi.
- [ ] Pengalaman membaca mengalir, mudah dipindai, dan tidak terganggu panel/dekorasi berlebihan.

## 4. Audit originalitas dan fakta

Pemeriksaan originalitas harus memakai lebih dari satu pendekatan. Tidak ada satu alat yang dapat membuktikan orisinalitas mutlak.

- [ ] Pilih alat pemeriksa kemiripan/plagiarisme yang sesuai dengan bahasa Indonesia dan jenis konten.
- [ ] Jalankan pemeriksaan terhadap naskah final, bukan draft lama.
- [ ] Tinjau setiap kemiripan yang ditemukan secara manual; bedakan frasa umum, nama resmi, kutipan yang diatribusikan, dan kemiripan substantif.
- [ ] Periksa kembali sumber primer untuk klaim faktual utama.
- [ ] Pastikan tidak ada kutipan/parafrasa dekat yang tidak diatribusikan.
- [ ] Catat nama alat, tanggal pemeriksaan, ringkasan hasil, dan keterbatasannya.
- [ ] Jangan menyatakan “100% original” hanya berdasarkan skor alat.

Alat dapat berubah ketersediaan, batas gratis, bahasa, dan kebijakan privasi. Sebelum merekomendasikan atau menggunakan layanan, periksa fitur terkini, bahasa yang didukung, cara data disimpan, dan apakah naskah akan dipakai untuk pelatihan. Jangan mengunggah materi rahasia ke layanan pihak ketiga tanpa persetujuan.

## 5. Audit SEO dan teknis

- [ ] Title dan meta description sesuai isi dan tidak duplikat.
- [ ] H1 tunggal dan struktur heading logis.
- [ ] Slug, canonical, robots/indexability, dan sitemap sesuai strategi publikasi.
- [ ] Internal link dan external link relevan serta dapat dibuka.
- [ ] Gambar memiliki nama file dan alt text yang tepat.
- [ ] Structured data valid bila digunakan dan sesuai dengan konten terlihat.
- [ ] Periksa halaman dengan Google Search Console/URL Inspection jika properti dan akses tersedia.
- [ ] Periksa indexing status; jangan menyamakan deployment dengan indexing.
- [ ] Jalankan pemeriksaan SEO on-page dengan alat yang sesuai dan tinjau rekomendasinya secara kritis.
- [ ] Periksa performa/Core Web Vitals dan aksesibilitas dasar menggunakan alat yang sesuai jika dapat diakses.
- [ ] Catat error, skor, URL laporan, tanggal pemeriksaan, serta bagian yang tidak dapat diuji.

## 6. Daftar temuan dan perbaikan

Setiap temuan harus memiliki:
- lokasi/URL dan bagian halaman;
- kategori (UI, UX, originalitas, fakta, SEO, teknis);
- bukti atau hasil pengujian;
- tingkat prioritas;
- tindakan yang disarankan;
- status: OPEN, FIXED, VERIFIED, atau ACCEPTED WITH LIMITATION.

Jangan mengubah desain atau lingkup tambahan tanpa persetujuan. Perbaiki temuan yang disetujui, deploy ulang, lalu ulangi pengujian terkait.

## 7. Persetujuan akhir

Artikel hanya boleh ditandai **SELESAI / APPROVED** jika:
- [ ] Semua checklist wajib lulus.
- [ ] Tidak ada temuan kritis atau tinggi yang masih OPEN.
- [ ] Mas Bagus telah memeriksa halaman live untuk UI/UX dan menyatakan setuju.
- [ ] Originalitas, SEO, sumber, dan teknis telah diperiksa serta hasilnya dicatat.
- [ ] Semua keterbatasan pengujian dijelaskan secara transparan.
- [ ] Commit final dan URL publik dicatat.

Jika seluruh persyaratan terpenuhi, tutup pekerjaan artikel dan lanjutkan ke topik berikutnya. Jika belum, artikel tetap berstatus NEEDS REVISION dan tidak dianggap final.
