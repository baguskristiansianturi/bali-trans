# TYPOGRAPHY SOP — BALI TRANS
**Status:** DRAF USULAN — menunggu persetujuan  
**Versi:** 0.1  
**Tanggal:** 1 November 2026

## 1. Tujuan dan cakupan
Dokumen ini menjadi standar dasar tipografi global Bali Trans untuk seluruh halaman, komponen, dan breakpoint: homepage, navigasi, katalog, layanan, detail produk/tur, artikel, formulir, notifikasi, dan footer. Halaman boleh memiliki variasi hierarki, tetapi tidak boleh menetapkan sistem font yang saling bertentangan.

## 2. Prinsip
- Gunakan satu keluarga font utama: **Inter**, karena sudah digunakan pada website.
- Prioritaskan keterbacaan, hierarki yang jelas, konsistensi, dan performa.
- Gunakan sentence case; hindari paragraf full uppercase, italic panjang, dan teks rata kanan-kiri.
- Batasi panjang baris isi bacaan sekitar 65–75 karakter bila ruang memungkinkan.
- Gunakan bobot tebal untuk penekanan selektif, bukan seluruh paragraf.
- Ukuran di bawah adalah baseline yang perlu diuji pada perangkat nyata; komponen boleh memakai ukuran kontekstual dalam rentang yang wajar.

## 3. Skala tipografi dasar
| Peran | Mobile | Desktop | Weight | Line-height |
|---|---:|---:|---:|---:|
| Display/Hero H1 | 30–36px | 40–48px | 700–800 | 1.15–1.25 |
| Page H1 | 30–34px | 36–44px | 700–750 | 1.18–1.25 |
| Section H2 | 24–26px | 28–32px | 700–750 | 1.25–1.35 |
| Subsection H3 | 20px | 22–24px | 600–700 | 1.3–1.4 |
| Minor H4 | 18px | 18–20px | 600 | 1.35–1.45 |
| Body | 16–17px | 16–18px | 400 | 1.6–1.8 |
| Lead / summary | 17–18px | 18–20px | 400–500 | 1.55–1.7 |
| UI / form text | 14–16px | 14–16px | 400–600 | 1.4–1.55 |
| Caption / metadata | 12–14px | 13–14px | 400–500 | 1.4–1.5 |
| Small label | 11–13px | 11–13px | 600–700 | 1.3–1.4 |

## 4. Bobot font
- 300: hanya untuk kebutuhan khusus dan ukuran besar; jangan untuk teks isi.
- 400: teks isi dan deskripsi normal.
- 500: teks UI atau lead yang memerlukan sedikit penekanan.
- 600: label, tombol, subjudul kecil.
- 700: heading dan penekanan penting.
- 800: display atau CTA yang memang memerlukan penekanan kuat.
Hindari memakai 900 secara berlebihan.

## 5. Implementasi teknis
- Definisikan design tokens terpusat untuk font family, font size, weight, line-height, dan warna teks.
- Komponen menggunakan tokens; hindari menyalin nilai acak ke banyak stylesheet.
- Gunakan rem/em dan clamp() untuk skala responsif bila sesuai.
- CSS halaman harus di-scope dengan class root halaman agar tidak merusak halaman lain.
- Jangan menambahkan font family kedua tanpa alasan desain yang disetujui.
- Pastikan fallback sans-serif tersedia dan font tidak menjadi satu-satunya penentu layout.

## 6. Aksesibilitas dan UX
- Kontras teks mengikuti WCAG 2.2 AA sebagai target.
- Konten harus tetap terbaca saat pengguna memperbesar teks dan saat text spacing diubah.
- Pastikan tidak ada clipping, overlap, horizontal overflow, atau tombol/label yang terlalu kecil pada mobile.
- Gunakan heading semantik berurutan; satu H1 utama per halaman.
- Isi artikel rata kiri, paragraf memiliki jarak konsisten, dan daftar mudah dipindai.
- Jangan menyampaikan informasi penting hanya melalui warna atau accordion tertutup.

## 7. Aturan khusus artikel
- Body artikel: baseline 17px mobile dan 18px desktop, line-height sekitar 1.7–1.8.
- H1 artikel: 30–34px mobile, 36–44px desktop.
- Lead: 17–18px mobile, 19–20px desktop.
- H2: 24px mobile, 28–30px desktop.
- H3: 20px mobile, 22px desktop.
- Kolom bacaan: target 68–72ch; desktop boleh memakai TOC samping bila struktur artikel cukup panjang.
- TOC mobile menggunakan disclosure yang jelas dan tidak menyembunyikan heading di isi artikel.

## 8. Approval & perubahan
Dokumen ini masih draf. Jangan menganggap seluruh website sudah menerapkan standar sampai disetujui dan rollout dilakukan. Perubahan skala global harus diuji lintas halaman dan perangkat; pengecualian halaman wajib memiliki alasan dan scope CSS yang jelas.
